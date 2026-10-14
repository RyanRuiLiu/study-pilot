/*
 * 课件：每门课的已完成 / 总数，与「快速完成」。
 *
 * 数字来自只读的课件进度查询，与执行同源（同一套完成判据）——
 * 显示的可做数就是点下去会做的数。
 *
 * 点「快速完成」就是对那门课课件动手的授权。它写平台、不可撤销，
 * 因此按钮文案直说做了什么，类别也只发课件（COURSEWARE_KINDS）——
 * 不会碰到任何要交的东西。
 */

import { getCourseware, runNow } from '../../src/ui-bridge';
import type { CoursewareProgress, QueryOutcome } from '../../src/ui-bridge';
import { COURSEWARE_KINDS } from '../../src/ui/scopes.ts';

/** 运行期间的按钮集合：跑的时候全部禁掉（后台也会拒并发，这里只是别让人白点）。 */
const buttons: HTMLButtonElement[] = [];

function statusLine(): HTMLElement | null {
  return document.getElementById('courseware-status');
}

function setStatus(text: string, tone: 'idle' | 'busy' | 'error'): void {
  const el = statusLine();
  if (el === null) return;
  el.textContent = text;
  el.classList.toggle('is-busy', tone === 'busy');
  el.classList.toggle('is-error', tone === 'error');
}

function setEnabled(enabled: boolean): void {
  for (const button of buttons) button.disabled = !enabled;
}

/** 一门课一行：课名、已学 x/y、「快速完成」。 */
function buildRow(entry: CoursewareProgress): HTMLElement {
  const row = document.createElement('div');
  row.className = 'cw-row';

  const name = document.createElement('span');
  name.className = 'cw-name';
  name.textContent = entry.courseName;

  const progress = document.createElement('span');
  progress.className = 'cw-progress';
  progress.textContent = `已学 ${entry.done}/${entry.total}`;
  progress.title = `未完成且能自动做的 ${entry.pending} 项`;

  const button = document.createElement('button');
  button.className = 'btn quiet';
  button.type = 'button';
  button.textContent = '快速完成';
  if (entry.pending === 0) {
    button.disabled = true;
    button.title = '这门课没有要做的课件了';
  }
  button.addEventListener('click', () => {
    setStatus(`正在完成「${entry.courseName}」的课件…`, 'busy');
    void runNow(
      {
        setStatus,
        setEnabled,
        refresh: () => renderCourseware(),
      },
      { kinds: COURSEWARE_KINDS, group: entry.courseName },
    );
  });

  buttons.push(button);
  row.append(name, progress, button);
  return row;
}

export async function renderCourseware(
  read?: Promise<QueryOutcome<CoursewareProgress[]>>,
): Promise<void> {
  const listEl = document.getElementById('courseware-list');
  if (listEl === null) return;

  buttons.length = 0;
  let outcome: QueryOutcome<CoursewareProgress[]>;
  try {
    outcome = await (read ?? getCourseware());
  } catch (error) {
    listEl.replaceChildren();
    setStatus(error instanceof Error ? error.message : String(error), 'error');
    return;
  }

  listEl.replaceChildren();

  if (outcome.status === 'error') {
    const note = document.createElement('p');
    note.className = 'note';
    note.textContent =
      outcome.reason === 'NOT_LOGGED_IN'
        ? '未登录——先在浏览器里登录慕课平台。'
        : `读取失败：${outcome.message}`;
    listEl.append(note);
    syncAllButton();
    return;
  }

  if (outcome.value.length === 0) {
    const note = document.createElement('p');
    note.className = 'note';
    note.textContent = '尚未选择参与任务的课程（见上方「账号与课程」）。';
    listEl.append(note);
    syncAllButton();
    return;
  }

  listEl.append(...outcome.value.map(buildRow));

  /*
   * 做不了的那些如实说一句：未实测的单元类型、平台没给时长的视频，
   * 以及没配 AI 时的讨论。不说的话，「已学 x/y」的差数会显得像丢了一样。
   */
  const cannot = outcome.value.reduce((sum, entry) => sum + entry.cannot, 0);
  setStatus(cannot > 0 ? `另有 ${cannot} 项暂时做不了（需要 AI 或平台数据不全），留在平台上手动完成。` : '', 'idle');

  syncAllButton();
}

/** 「全部快速完成」：只发课件类别，不带课程。 */
function syncAllButton(): void {
  const all = document.getElementById('courseware-all');
  if (!(all instanceof HTMLButtonElement)) return;
  all.disabled = buttons.length === 0 || buttons.every((button) => button.disabled);

  if (all.dataset.bound === 'yes') return;
  all.dataset.bound = 'yes';
  all.addEventListener('click', () => {
    setStatus('正在完成全部课程的课件…', 'busy');
    void runNow(
      {
        setStatus,
        setEnabled,
        refresh: () => renderCourseware(),
      },
      { kinds: COURSEWARE_KINDS },
    );
  });
}

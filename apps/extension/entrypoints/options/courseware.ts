/*
 * 课件：每门课的已完成 / 总数，与「快速完成」。
 *
 * 数字来自只读的课件进度查询，与执行同源（同一套完成判据）——
 * 显示的可做数就是点下去会做的数。
 *
 * 点「快速完成」就是对那门课课件动手的授权。它写平台、不可撤销，
 * 因此按钮文案直说做了什么，类别也只发课件（COURSEWARE_KINDS）——
 * 不会碰到任何要交的东西。
 *
 * 执行期间进度与「停止」都在这门课自己那行：行内小字报「正在执行 6/40 · 单元」，
 * 按钮就地变身「停止」。结果用底部浮层（toast）提示——一句话可能很长，
 * 塞进行里放不下，为它常驻一行又不值。
 *
 * 停止在下一个安全点生效：不再发新的写请求，正在飞的落地即止。
 */

import { getCourseware, runNow, stopRun, subscribeRunState } from '../../src/ui-bridge';
import type { CoursewareProgress, QueryOutcome } from '../../src/ui-bridge';
import { progressLine, runningItem, stoppedLine, STOPPING_TEXT } from '../../src/ui/run-view.ts';
import { COURSEWARE_KINDS } from '../../src/ui/scopes.ts';
import { renderOverview } from './overview.ts';
import { toast } from './toast.ts';

/** 运行期间的按钮集合：跑的时候全部禁掉（后台也会拒并发，这里只是别让人白点）。 */
const buttons: HTMLButtonElement[] = [];

/** 每门课那行里的「正在执行」小字与按钮，按课程名索引；重画时整体换新。 */
const currents = new Map<string, HTMLElement>();
const buttonsOfCourse = new Map<string, HTMLButtonElement>();

/*
 * 运行结果用浮层提示。进度不停在这一层——那是行内小字的事；
 * 「正在执行」这类过程文案也不必弹（busy 一律跳过）。
 */
function setStatus(text: string, tone: 'idle' | 'busy' | 'error'): void {
  if (tone === 'busy' || text === '') return;
  toast(text);
}

function setEnabled(enabled: boolean): void {
  for (const button of buttons) {
    button.disabled = !enabled || button.dataset.empty === 'yes';
  }
  if (enabled) {
    /*
     * 收尾已由发起方写（runNow 的 setStatus）：本页的标记在这里复位，
     * 收尾分支才不会再补一句「已停止」——同一件事弹两次。
     */
    localRun = false;
    stopping = false;
    stoppedHere = false;
  }
}

/**
 * 重读课件与概览：两处显示的是同一份数，共用一次读取才不会不一致。
 * 跑完一轮之后、课程勾选变动之后都用它（后者的调用见 courses.ts）。
 */
export async function refreshCourseViews(): Promise<void> {
  const fresh = getCourseware();
  await Promise.all([renderCourseware(fresh), renderOverview(fresh)]);
}

/*
 * 订阅运行状态：正在跑的那一项落在它所属课程那一行上——行内小字报进度，
 * 按钮就地变身「停止」。别处发起的轮次（比如弹窗的待办执行）同样按课落到行里，
 * 停也就近可停。
 *
 * 「正在完成『课程名』…」那句文案曾经写死在点击处，而 runNow 起手就会
 * 用「正在执行」覆盖它——从来没有显示过；推送比那句话准得多。
 */
let watching = false;
/** 这一轮是本页发起的（与弹窗的 localRun 同一含义）：收尾文案归 runNow */
let localRun = false;
/** 按过停止、那一轮还没收尾：行里显示「正在停止」，不再被进度盖掉 */
let stopping = false;
/** 本页按过停止、并确认停到了一轮：若不归本页报结果，收尾时补一句「已停止」 */
let stoppedHere = false;
/** 最后一次「还在跑」快照里的完成数。跑完时进度被清空，收尾文案从这里数 */
let lastFinished = 0;
function watchRun(): void {
  if (watching) return;
  watching = true;

  subscribeRunState((state) => {
    const running = state.platforms.some((platform) => platform.state === 'running');
    // 收尾了就撤下停止态——下面的还原循环才走得对
    if (!running) stopping = false;
    if (running) {
      lastFinished = state.platforms.reduce((sum, platform) => sum + platform.finished, 0);
    }

    // 正在跑的那一项（读取与措辞与弹窗共用同一份）
    const step = runningItem(state);

    // 行内小字：只有跑的那门课有；停止收尾中冻结（「正在停止…」由点击处写）
    for (const [course, el] of currents) {
      if (running && stopping) continue;
      const text = running && step !== null && step.course === course ? progressLine(step) : undefined;
      el.hidden = text === undefined;
      if (text !== undefined) el.textContent = text;
    }

    // 按钮：跑的那门课把「快速完成」换成「停止」；跑完了还原
    for (const [course, button] of buttonsOfCourse) {
      if (running && step !== null && course === step.course) {
        button.dataset.mode = 'stop';
        button.textContent = '停止';
        button.title = '停止执行：不再发新的写请求';
        if (!stopping) button.disabled = false;
      } else if (button.dataset.mode === 'stop') {
        delete button.dataset.mode;
        button.textContent = '快速完成';
        button.disabled = button.dataset.empty === 'yes';
        button.title = button.dataset.emptyTitle ?? '';
      }
    }

    if (running) return;
    /*
     * 收尾了：本页发起的那轮由 runNow 报结果（localRun）——这里不补，
     * 同一件事弹两次很难看；只有旁观者（别处发起、用户在这里停的）需要这一句。
     */
    const stopped = stoppedHere;
    stoppedHere = false;
    if (stopped && !localRun) toast(stoppedLine(lastFinished));
  });
}

/** 一门课一行：课名、已学 x/y、运行时的进度与「停止」。 */
function buildRow(entry: CoursewareProgress): HTMLElement {
  const row = document.createElement('div');
  row.className = 'cw-row';

  const name = document.createElement('span');
  name.className = 'cw-name';
  name.textContent = entry.courseName;

  const progress = document.createElement('span');
  progress.className = 'cw-progress';
  if (entry.unread === true) {
    /*
     * 结构没读到，只说事实：平台没有返回这门课的结构。实测（2026-10-15）
     * 这种课的共同点是「已不在平台的课程列表里」——多半是退课/下架留下的
     * 旧记录，刷新课程列表即可清掉。不猜别的原因。
     */
    progress.textContent = '读不到内容';
    progress.title = '平台没有返回这门课的结构；点上方「读取课程列表」刷新后，已不在你课程里的旧记录会被清掉';
  } else if (entry.total === 0) {
    // 结构读到了但是空的（实测：课程列表里它的课时数本身就是 0）
    progress.textContent = '读不到内容';
    progress.title = '平台返回的结构是空的（0 章节 0 单元）';
  } else {
    progress.textContent = `已学 ${entry.done}/${entry.total}`;
    progress.title = `未完成且能自动做的 ${entry.pending} 项`;
  }

  /*
   * 运行小字：跑这门课时写在这里（订阅推送更新）。
   * 挂在行上而不是别处——点的是这一行，进度与「停止」也都该在这一行。
   */
  const current = document.createElement('span');
  current.className = 'cw-current';
  current.hidden = true;
  currents.set(entry.courseName, current);

  const button = document.createElement('button');
  button.className = 'btn quiet';
  button.type = 'button';
  button.textContent = '快速完成';
  if (entry.pending === 0) {
    button.disabled = true;
    button.dataset.empty = 'yes';
    button.dataset.emptyTitle =
      entry.total === 0 ? '这门课没有读到内容' : '这门课没有要做的课件了';
    button.title = button.dataset.emptyTitle;
  }
  buttonsOfCourse.set(entry.courseName, button);

  button.addEventListener('click', () => {
    // 同一枚按钮两种身份：跑着的时候它是「停止」
    if (button.dataset.mode === 'stop') {
      button.disabled = true;
      stopping = true;
      current.hidden = false;
      current.textContent = STOPPING_TEXT;
      void stopRun().then((result) => {
        if (result.stopped) {
          stoppedHere = true;
          return;
        }
        // 没停到（多半是刚好已经跑完）：整行还原，别挂着「正在停止」
        stopping = false;
        delete button.dataset.mode;
        button.textContent = '快速完成';
        button.disabled = button.dataset.empty === 'yes';
        button.title = button.dataset.emptyTitle ?? '';
        current.hidden = true;
      });
      return;
    }
    stopping = false; // 新一轮开始：上一轮留下的停止态不该算到它头上
    localRun = true;
    void runNow(
      {
        setStatus,
        setEnabled,
        refresh: refreshCourseViews,
      },
      { kinds: COURSEWARE_KINDS, group: entry.courseName },
    );
  });

  buttons.push(button);
  row.append(name, progress, current, button);
  return row;
}

/** 列表区里的一句说明。 */
function note(text: string): HTMLElement {
  const el = document.createElement('p');
  el.className = 'note';
  el.textContent = text;
  return el;
}

export async function renderCourseware(
  read?: Promise<QueryOutcome<CoursewareProgress[]>>,
): Promise<void> {
  const listEl = document.getElementById('courseware-list');
  if (listEl === null) return;

  watchRun();

  buttons.length = 0;
  currents.clear();
  buttonsOfCourse.clear();

  let outcome: QueryOutcome<CoursewareProgress[]>;
  try {
    outcome = await (read ?? getCourseware());
  } catch (error) {
    listEl.replaceChildren(note(error instanceof Error ? error.message : String(error)));
    return;
  }

  listEl.replaceChildren();

  if (outcome.status === 'error') {
    listEl.append(
      note(
        outcome.reason === 'NOT_LOGGED_IN'
          ? '未登录——先在浏览器里登录慕课平台。'
          : `读取失败：${outcome.message}`,
      ),
    );
    return;
  }

  if (outcome.value.length === 0) {
    listEl.append(note('尚未选择参与任务的课程（见上方「账号与课程」）。'));
    return;
  }

  listEl.append(...outcome.value.map(buildRow));

  /*
   * 做不了的那些如实说一句，并把两种原因分开：只差 AI 的可以行动
   * （去下面配 AI），平台数据不全的只能手动。混成一句「需要 AI 或
   * 平台数据不全」，用户既不知道是哪一种，也不知道自己能做什么。
   */
  const cannot = outcome.value.reduce((sum, entry) => sum + entry.cannot, 0);
  if (cannot > 0) {
    const needsAi = outcome.value.reduce((sum, entry) => sum + entry.needsAi, 0);
    const blocked = cannot - needsAi;
    const parts: string[] = [];
    if (needsAi > 0) parts.push(`${needsAi} 项讨论需要配置 AI 后才会做（见下方「AI 连接」）`);
    if (blocked > 0) parts.push(`${blocked} 项平台数据不全，留在平台上手动完成`);
    listEl.append(note(`另有 ${cannot} 项暂时做不了：${parts.join('；')}。`));
  }
}

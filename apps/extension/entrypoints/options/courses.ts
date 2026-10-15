/*
 * 账号与课程：登录态、读取课程列表、勾选参与。
 *
 * 「参与」是任务的范围：弹窗的待办与课件区都只读勾选过的课程。
 *
 * 合并规则在平台包里（mergeCourses）：读取时只沿用用户做过的勾选，
 * 新出现的课程一律不勾——不然刷新一下就把用户没同意过的课拖进了任务范围。
 */

import { coursePageUrl } from '@study-pilot/platform-mooc';
import { getCourses, getSession, getSettings, refreshCourses, updateSettings } from '../../src/ui-bridge';
import type { Settings } from '../../src/ui-bridge';
import { formatTermRange } from '../../src/ui/format.ts';
import { refreshCourseViews } from './courseware.ts';
import { toast } from './toast.ts';

type SelectedCourse = Settings['mooc']['courses'][number];

function buildRow(course: SelectedCourse): HTMLElement {
  const row = document.createElement('label');
  row.className = 'course-row';
  row.classList.toggle('is-off', !course.enabled);

  const check = document.createElement('input');
  check.type = 'checkbox';
  check.checked = course.enabled;

  /*
   * 点课程名打开学习页；点勾选框只切换参与。
   * 名链接嵌在 label 里：给链接加 stopPropagation，避免点击被 label 吞掉又翻转勾选。
   */
  const name = document.createElement('a');
  name.className = 'course-name';
  name.href = coursePageUrl(course);
  name.target = '_blank';
  name.rel = 'noreferrer';
  name.textContent = course.name;
  name.addEventListener('click', (event) => event.stopPropagation());

  const meta = document.createElement('span');
  meta.className = 'course-meta';
  const range = formatTermRange(course.startTime, course.endTime);
  const parts = [course.schoolName, range];
  // 未选课的课读取不到内容（平台不给结构），在列表里如实标出来
  if (course.hasEnroll === false) parts.push('未选课');
  meta.textContent = parts.filter(Boolean).join(' · ');

  row.append(check, name, meta);

  check.addEventListener('change', () => {
    // 弱化态跟着勾选走：勾上就不灰，取消就灰（不等重画）
    row.classList.toggle('is-off', !check.checked);
    void toggle(course.termId, check.checked);
  });

  return row;
}

/** 切换某门课的参与状态：整份课程列表一起写回（数组是整体替换的契约）。 */
async function toggle(termId: number, enabled: boolean): Promise<void> {
  const settings = await getSettings();
  const courses = settings.mooc.courses.map((course) =>
    course.termId === termId ? { ...course, enabled } : course,
  );
  await updateSettings({ mooc: { courses } });
  toast(enabled ? '已加入任务范围' : '已移出任务范围');
  // 参与范围变了：课件区与状态行都按它算——一起重读
  void refreshCourseViews();
}

/** 列表里的一句说明；error 为真时用警示色（读取失败如实说）。 */
function note(text: string, error = false): HTMLElement {
  const el = document.createElement('p');
  el.className = error ? 'note is-error' : 'note';
  el.textContent = text;
  return el;
}

export async function renderCourses(): Promise<void> {
  const listEl = document.getElementById('course-list');
  if (listEl === null) return;

  let reads: [Awaited<ReturnType<typeof getSession>>, Awaited<ReturnType<typeof getCourses>>, Settings];
  try {
    reads = await Promise.all([getSession(), getCourses(), getSettings()]);
  } catch (error) {
    listEl.replaceChildren(note(error instanceof Error ? error.message : String(error), true));
    return;
  }
  const [session, courses, settings] = reads;

  // 列表以配置为准（哪门课参与、带定位字段），平台读到的新列表在「读取」时并进来
  const byTerm = new Map(settings.mooc.courses.map((course) => [course.termId, course]));
  const rows = courses
    .map((brief) => byTerm.get(brief.termId))
    .filter((course): course is SelectedCourse => course !== undefined)
    .map(buildRow);

  /*
   * 状态信息分两处：卡头右侧只放加载完成后的状态（见 status-line.ts），
   * 其余一切（未登录指引、读不到、空列表）都在这块内容区里说。
   */
  listEl.replaceChildren();
  if (!session.loggedIn) {
    listEl.append(note('未登录——先在浏览器中登录慕课平台，登录后再读取课程列表。'));
    if (rows.length > 0) listEl.append(...rows);
    return;
  }
  if (rows.length === 0) {
    listEl.append(note('尚未读取到课程。点击「读取课程列表」从平台获取，获取后勾选要参与的课程。'));
    return;
  }
  listEl.append(...rows);
}

/**
 * 「读取课程列表」按钮：去平台拉一次，写回配置后重画。
 * 行进跟随：按钮禁用 + 内容区一行说明（与课件卡的操作同一种语言）；
 * 完成或失败后重画列表，说明自然退场。
 */
export function initCourseActions(): void {
  const button = document.getElementById('refresh-courses');
  button?.addEventListener('click', () => {
    if (button instanceof HTMLButtonElement) button.disabled = true;
    const listEl = document.getElementById('course-list');
    const running = note('正在读取课程列表…');
    if (listEl !== null) listEl.prepend(running);
    void refreshCourses()
      .then(async (result) => {
        if (result.ok) toast(`已读取 ${result.courses.length} 门课程`);
        else toast(`读取失败：${result.message ?? result.reason}`);
        await renderCourses();
      })
      .catch(async (error: unknown) => {
        toast(`读取失败：${error instanceof Error ? error.message : String(error)}`);
        // 让行进说明退场，列表回到现状——不然它会一直挂着「正在读取」
        await renderCourses();
      })
      .finally(() => {
        if (button instanceof HTMLButtonElement) button.disabled = false;
      });
  });
}

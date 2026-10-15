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

function renderSession(sessionText: HTMLElement, loggedIn: boolean): void {
  /*
   * 只在需要动作时说话：登录了就不显示这行——「已登录」在页头概览里
   * 已经有一份，同一件事不必在两处宣布。
   */
  sessionText.hidden = loggedIn;
  sessionText.textContent = loggedIn ? '' : '未登录——先在浏览器里登录慕课平台，再回来读取课程列表。';
}

function buildRow(course: SelectedCourse): HTMLElement {
  const row = document.createElement('label');
  row.className = 'course-row';

  const check = document.createElement('input');
  check.type = 'checkbox';
  check.checked = course.enabled;

  const body = document.createElement('span');
  body.className = 'course-body';

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
  // 未选课的课读不到内容（平台不给结构），在列表里如实标出来
  if (course.hasEnroll === false) parts.push('未选课');
  meta.textContent = parts.filter(Boolean).join(' · ');

  body.append(name, meta);
  row.append(check, body);

  check.addEventListener('change', () => {
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
  // 参与范围变了：课件区只列参与中的课程，概览的计数也按它算——两处一起重读
  void refreshCourseViews();
}

/** 列表里的一句说明。 */
function note(text: string): HTMLElement {
  const el = document.createElement('p');
  el.className = 'note';
  el.textContent = text;
  return el;
}

export async function renderCourses(): Promise<void> {
  const listEl = document.getElementById('course-list');
  const sessionEl = document.getElementById('session-text');
  if (listEl === null || sessionEl === null) return;

  let reads: [Awaited<ReturnType<typeof getSession>>, Awaited<ReturnType<typeof getCourses>>, Settings];
  try {
    reads = await Promise.all([getSession(), getCourses(), getSettings()]);
  } catch (error) {
    listEl.replaceChildren(note(error instanceof Error ? error.message : String(error)));
    return;
  }
  const [session, courses, settings] = reads;
  renderSession(sessionEl, session.loggedIn);

  // 列表以配置为准（哪门课参与、带定位字段），平台读到的新列表在「读取」时并进来
  const byTerm = new Map(settings.mooc.courses.map((course) => [course.termId, course]));
  const rows = courses
    .map((brief) => byTerm.get(brief.termId))
    .filter((course): course is SelectedCourse => course !== undefined)
    .map(buildRow);

  listEl.replaceChildren();
  if (rows.length === 0) {
    listEl.append(note('还没有课程。点「读取课程列表」从平台读取，读回来之后勾选要参与的。'));
    return;
  }
  listEl.append(...rows);
}

/** 「读取课程列表」按钮：去平台拉一次，写回配置后重画。 */
export function initCourseActions(): void {
  const button = document.getElementById('refresh-courses');
  button?.addEventListener('click', () => {
    if (button instanceof HTMLButtonElement) button.disabled = true;
    void refreshCourses()
      .then(async (result) => {
        if (result.ok) toast(`已读取 ${result.courses.length} 门课程`);
        else toast(`读取失败：${result.message ?? result.reason}`);
        await renderCourses();
      })
      .catch((error: unknown) => {
        toast(`读取失败：${error instanceof Error ? error.message : String(error)}`);
      })
      .finally(() => {
        if (button instanceof HTMLButtonElement) button.disabled = false;
      });
  });
}

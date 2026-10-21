/*
 * 账号与课程：登录态、读取课程列表、勾选参与。
 *
 * 「参与」是任务的范围：弹窗的待办与课件区都只读勾选过的课程。
 *
 * 合并规则在平台包里（mergeCourses）：读取时只沿用用户做过的勾选，
 * 新出现的课程一律不勾——不然刷新一下就把用户没同意过的课拖进了任务范围。
 */

import { coursePageUrl } from '@study-pilot/platform-mooc';
import { getCourses, getSession, getSettings, refreshCourses, updateSettings } from '../../src/ui-bridge.ts';
import type { Settings } from '../../src/ui-bridge.ts';
import { errorText, formatTermRange } from '../../src/ui/format.ts';
import { refreshCourseViews } from './courseware.ts';
import { loginNote, note, MOOC_LOGIN_URL } from './note.ts';
import { skeletonBlock } from './skeleton.ts';
import { markStatusLineLoading } from './status-line.ts';
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
    const next = check.checked;
    // 弱化态跟着勾选走：勾上就不灰，取消就灰（不等重画）
    row.classList.toggle('is-off', !next);
    void toggle(course.termId, next).catch((error: unknown) => {
      // 写配置失败：勾选退回原样并说一句——否则界面显示已勾、配置其实没变
      check.checked = !next;
      row.classList.toggle('is-off', next);
      toast(`未能更新参与范围：${errorText(error)}`);
    });
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

export async function renderCourses(): Promise<void> {
  const listEl = document.getElementById('course-list');
  if (listEl === null) return;

  /*
   * 读取与处理都在这一个 try 里：后台未接住的异常会以「兜底拒绝」的形状回来
   * （见 router.ts），那形状不是课程数组——处理放到 try 外的话，.map 会炸在
   * catch 之外，页面就永久停在骨架且不给任何错误。
   */
  let rows: HTMLElement[];
  let session: Awaited<ReturnType<typeof getSession>>;
  let settings: Settings;
  try {
    const [readSession, courses, readSettings] = await Promise.all([getSession(), getCourses(), getSettings()]);
    session = readSession;
    settings = readSettings;
    // 列表以配置为准（哪门课参与、带定位字段），平台读到的新列表在「读取」时并进来
    const byTerm = new Map(settings.mooc.courses.map((course) => [course.termId, course]));
    rows = courses
      .map((brief) => byTerm.get(brief.termId))
      .filter((course): course is SelectedCourse => course !== undefined)
      .map(buildRow);
  } catch (error) {
    listEl.replaceChildren(note(errorText(error), true));
    return;
  }

  /*
   * 状态信息分两处：卡头右侧只放加载完成后的状态（见 status-line.ts），
   * 其余一切（未登录指引、读不到、空列表）都在这块内容区里说。
   */
  listEl.replaceChildren();
  if (!session.loggedIn) {
    listEl.append(loginNote('未登录，在浏览器登录慕课后读取课程列表。', MOOC_LOGIN_URL));
    if (rows.length > 0) listEl.append(...rows);
    return;
  }
  if (rows.length === 0) {
    listEl.append(note('尚未读取到课程，点击「读取课程列表」获取并勾选要参与的课程。'));
    return;
  }
  listEl.append(...rows);
}

/**
 * 「读取课程列表」按钮：**把首次加载原样再跑一遍**。
 *
 * 进入等待：点击那一刻，课程列表、卡头状态行、课件区三块同时换骨架
 * （整块慕课数据的刷新入口，等待从同一刻开始）。
 *
 * 落定与首次加载同一套长相：
 *   成功   → 列表落定为新内容（合并写回之后）；状态行与课件区随后重读落定
 *            （写先于读：提前发起会按旧范围算）；
 *   未登录 → 列表落定为「未登录」指引（少做了一步，给去处，不带责备）；
 *   失败   → 列表落定为错误行「读取失败：<原因>」——如实落在区域里。
 *
 * 失败不回落旧列表、不另弹失败 toast：那两种做法都会让「点了读取但没读成」
 * 看起来像「什么都没发生」（Ryan 指出与首次加载不一致）。toast 只留动作回执
 * （已读取 N 门）。
 */
export function initCourseActions(): void {
  const button = document.getElementById('refresh-courses');
  button?.addEventListener('click', () => {
    if (button instanceof HTMLButtonElement) button.disabled = true;
    const listEl = document.getElementById('course-list');
    if (listEl !== null) listEl.replaceChildren(skeletonBlock());
    const coursewareEl = document.getElementById('courseware-list');
    if (coursewareEl !== null) coursewareEl.replaceChildren(skeletonBlock());
    markStatusLineLoading();
    void refreshCourses()
      .then((result) => {
        if (result.ok) {
          toast(`已读取 ${result.courses.length} 门课程`);
          void renderCourses();
        } else if (result.reason === 'NOT_LOGGED_IN') {
          listEl?.replaceChildren(loginNote('未登录，在浏览器登录慕课后读取课程列表。', MOOC_LOGIN_URL));
        } else {
          listEl?.replaceChildren(note(`读取失败：${result.message ?? result.reason}`, true));
        }
        void refreshCourseViews();
      })
      .catch((error: unknown) => {
        listEl?.replaceChildren(note(`读取失败：${errorText(error)}`, true));
        void refreshCourseViews();
      })
      .finally(() => {
        if (button instanceof HTMLButtonElement) button.disabled = false;
      });
  });
}

/*
 * 智慧树「账号与课程」卡：读取课程列表、勾选参与。
 *
 * 「参与」是任务的范围：弹窗的待办与课件区都只算勾选过的课程。
 *
 * 与慕课那张卡的差别：课程行没有学期时间轴可显示，课程名也不做站外链接——
 * 平台的课程入口参数（secret）只在库内使用，学习页 URL 随课程世代而异
 * （新旧两代前端域名不同），在没核实到统一形态之前不给用户一个可能打不开的链接。
 * 行内给的是平台当前进度文案（如 27.2%），那是读取时如实取回的事实。
 *
 * 状态行语义与慕课一致：卡头右侧只放加载完成后的状态（见 zhihuishu-status-line.ts），
 * 未登录指引与读取失败都落在列表区里说。
 */

import { getZhsCourses, getZhsSession, refreshZhsCourses, updateSettings, getSettings } from '../../src/ui-bridge';
import type { ZhihuishuCourse } from '../../src/ui-bridge';
import { errorText } from '../../src/ui/format.ts';
import { refreshZhsCourseViews } from './zhihuishu-courseware.ts';
import { note } from './note.ts';
import { markZhsStatusLineLoading } from './zhihuishu-status-line.ts';
import { skeletonBlock } from './skeleton.ts';
import { toast } from './toast.ts';

function buildRow(course: ZhihuishuCourse): HTMLElement {
  const row = document.createElement('label');
  row.className = 'course-row';
  row.classList.toggle('is-off', !course.enabled);

  const check = document.createElement('input');
  check.type = 'checkbox';
  check.checked = course.enabled;

  const name = document.createElement('span');
  name.className = 'course-name';
  name.textContent = course.name;

  const meta = document.createElement('span');
  meta.className = 'course-meta';
  // 学校与进度文案都是读取时取回的平台事实；没有就只显示有的那个
  meta.textContent = [course.schoolName, course.progressText].filter(Boolean).join(' · ');

  row.append(check, name, meta);

  check.addEventListener('change', () => {
    row.classList.toggle('is-off', !check.checked);
    void toggle(course.courseId, check.checked);
  });

  return row;
}

/** 切换某门课的参与状态：整份课程列表一起写回（数组是整体替换的契约）。 */
async function toggle(courseId: number, enabled: boolean): Promise<void> {
  const settings = await getSettings();
  const courses = settings.zhihuishu.courses.map((course) =>
    course.courseId === courseId ? { ...course, enabled } : course,
  );
  await updateSettings({ zhihuishu: { courses } });
  toast(enabled ? '已加入任务范围' : '已移出任务范围');
  // 参与范围变了：课件区与状态行都按它算——一起重读
  void refreshZhsCourseViews();
}

export async function renderZhsCourses(): Promise<void> {
  const listEl = document.getElementById('zhs-course-list');
  if (listEl === null) return;

  let reads: [Awaited<ReturnType<typeof getZhsSession>>, Awaited<ReturnType<typeof getZhsCourses>>];
  try {
    reads = await Promise.all([getZhsSession(), getZhsCourses()]);
  } catch (error) {
    listEl.replaceChildren(note(errorText(error), true));
    return;
  }
  const [session, courses] = reads;
  const rows = courses.map(buildRow);

  listEl.replaceChildren();
  if (!session.loggedIn) {
    listEl.append(note('未登录——先在浏览器中登录智慧树，登录后再读取课程列表。'));
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
 * 「读取课程列表」按钮：**把首次加载原样再跑一遍**（与慕课同一条交互标准）。
 *
 * 进入等待：点击那一刻，课程列表、卡头状态行、课件区三块同时换骨架；
 * 落定与首次加载同一套长相：成功 → 列表落定为新内容，状态行与课件区随后重读；
 * 未登录 → 列表落为未登录指引；失败 → 列表落为错误行——不回落旧列表、
 * 不另弹失败 toast（那都会让「点了没读成」看起来像什么都没发生）。
 */
export function initZhsCourseActions(): void {
  const button = document.getElementById('zhs-refresh-courses');
  button?.addEventListener('click', () => {
    if (button instanceof HTMLButtonElement) button.disabled = true;
    const listEl = document.getElementById('zhs-course-list');
    if (listEl !== null) listEl.replaceChildren(skeletonBlock());
    const coursewareEl = document.getElementById('zhs-courseware-list');
    if (coursewareEl !== null) coursewareEl.replaceChildren(skeletonBlock());
    markZhsStatusLineLoading();
    void refreshZhsCourses()
      .then((result) => {
        if (result.ok) {
          toast(`已读取 ${result.courses.length} 门课程`);
          void renderZhsCourses();
        } else if (result.reason === 'NOT_LOGGED_IN') {
          listEl?.replaceChildren(note('未登录——先在浏览器中登录智慧树，登录后再读取课程列表。'));
        } else {
          listEl?.replaceChildren(note(`读取失败：${result.message ?? result.reason}`, true));
        }
        void refreshZhsCourseViews();
      })
      .catch((error: unknown) => {
        listEl?.replaceChildren(note(`读取失败：${errorText(error)}`, true));
        void refreshZhsCourseViews();
      })
      .finally(() => {
        if (button instanceof HTMLButtonElement) button.disabled = false;
      });
  });
}

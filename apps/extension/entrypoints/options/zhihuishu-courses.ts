/*
 * 智慧树「账号与课程」卡：读取课程列表、勾选参与。
 *
 * 「参与」是任务的范围：弹窗的待办与课程任务卡都只算勾选过的课程。
 *
 * 与慕课那张卡同一形状：课程名链到平台上的页面（这里是成绩分析页），
 * 行内给学校与开课区间。学习页入口（secret）只在库内使用、URL 随课程世代而异
 * （新旧两代前端域名不同），因此列表里不拿它拼一个可能打不开的链接。
 * 平台给的进度文案（如 27.2%）也不在这里转述：它与四张板块卡的组件口径时常
 * 打架，原文只在成绩分析页有解释（见课程任务卡的对齐说明）。
 *
 * 状态行语义与慕课一致：卡头右侧只放加载完成后的状态（见 zhihuishu-status-line.ts），
 * 未登录指引与读取失败都落在列表区里说。
 *
 * 时序（与慕课同一套）：骨架 → 一次会话判定（cookie ＋ 服务端探问）→ 终态一次渲染。
 * 判定必须先于任何内容落到页面上，否则会「先闪出一批行、再整块消失」。
 */

import { getZhsCourses, getZhsSession, refreshZhsCourses, updateSettings, getSettings } from '../../src/ui-bridge.ts';
import type { ZhihuishuCourse } from '../../src/ui-bridge.ts';
import { errorText, formatTermRange } from '../../src/ui/format.ts';
import { ZHS_SESSION_EXPIRED } from '@study-pilot/platform-zhs';
import { reportPageUrl } from '../../src/adapters/zhihuishu/pages.ts';
import { markZhsTasksLoading, refreshZhsTaskViews } from './zhihuishu-course-tasks.ts';
import { loginNote, note, ZHS_LOGIN_URL } from './note.ts';
import { createRenderScope, isLatest, nextRenderToken } from './render-guard.ts';
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

  /*
   * 点课程名打开成绩分析页；点勾选框只切换参与。
   * 与慕课那份同一条形状（courses.ts 同位置）：名链接嵌在 label 里，
   * 给链接加 stopPropagation，避免点击被 label 吞掉又翻转勾选。
   */
  const name = document.createElement('a');
  name.className = 'course-name';
  name.href = reportPageUrl(course.recruitId, course.courseId);
  name.target = '_blank';
  name.rel = 'noreferrer';
  name.textContent = course.name;
  name.title = '打开这门课的成绩分析页';
  name.addEventListener('click', (event) => event.stopPropagation());

  const meta = document.createElement('span');
  meta.className = 'course-meta';
  /*
   * 学校 · 学期区间——与慕课的勾选行同一形状（courses.ts 同位置）。
   * 原先这里放平台给的 progress（如 "100.0%"）：同一个数在平台的**课程卡**上说的
   * 是另一件事，与四张板块卡的组件口径时常打架（实测：一门课报 100.0%，
   * 组件里视频远没看完）。平台原文只在成绩分析页有解释，列表里不转述它。
   */
  meta.textContent = [course.schoolName, formatTermRange(course.startTime, course.endTime)]
    .filter(Boolean)
    .join(' · ');

  row.append(check, name, meta);

  check.addEventListener('change', () => {
    const next = check.checked;
    row.classList.toggle('is-off', !next);
    // 与慕课同一条：读改写期间锁住，避免两次勾选交错后旧值盖掉新值
    check.disabled = true;
    void toggle(course.courseId, next)
      .catch((error: unknown) => {
        // 与慕课同一处置：写配置失败就退回勾选并说一句
        check.checked = !next;
        row.classList.toggle('is-off', next);
        toast(`未能更新参与范围：${errorText(error)}`);
      })
      .finally(() => {
        check.disabled = false;
      });
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
  // 参与范围变了：课程任务卡与状态行都按它算——一起重读
  void refreshZhsTaskViews();
}

/**
 * 课程区的唯一渲染状态；首次加载与刷新走同一个函数（理由见慕课那张卡的注释）。
 */
export type ZhsCourseListStatus =
  | { kind: 'expired' }
  | { kind: 'failed'; message: string }
  | null;

const zhsCoursesScope = createRenderScope();

export async function renderZhsCourses(status: ZhsCourseListStatus = null): Promise<void> {
  const listEl = document.getElementById('zhs-course-list');
  if (listEl === null) return;

  /*
   * 读取与处理都在这一个 try 里：后台未接住的异常会以「兜底拒绝」的形状回来
   * （见 router.ts），那形状不是课程数组——处理放到 try 外的话，.map 会炸在
   * catch 之外，页面就永久停在骨架且不给任何错误。
   */
  const token = nextRenderToken(zhsCoursesScope);
  let session: Awaited<ReturnType<typeof getZhsSession>>;
  let rows: HTMLElement[];
  try {
    const [readSession, courses] = await Promise.all([getZhsSession(), getZhsCourses()]);
    session = readSession;
    rows = courses.map(buildRow);
  } catch (error) {
    if (!isLatest(zhsCoursesScope, token)) return;
    listEl.replaceChildren(note(errorText(error), true));
    return;
  }
  if (!isLatest(zhsCoursesScope, token)) return;

  listEl.replaceChildren();
  // 有状态就只显示状态、不列课程（与慕课同一规则，见那边的注释）
  if (!session.loggedIn) {
    listEl.append(
      session.expired
        ? loginNote(`${ZHS_SESSION_EXPIRED}。`, ZHS_LOGIN_URL)
        : loginNote('未登录，在浏览器登录智慧树后读取课程列表。', ZHS_LOGIN_URL),
    );
    return;
  }
  if (status?.kind === 'expired') {
    listEl.append(loginNote(`${ZHS_SESSION_EXPIRED}。`, ZHS_LOGIN_URL));
    return;
  }
  if (status?.kind === 'failed') {
    listEl.append(note(`读取失败：${status.message}`, true));
    return;
  }
  if (rows.length === 0) {
    listEl.append(note('尚未读取到课程，点击「读取课程列表」获取并勾选要参与的课程。'));
    return;
  }
  listEl.append(...rows);
}

/**
 * 「读取课程列表」按钮：**把首次加载原样再跑一遍**（与慕课同一条交互标准）。
 *
 * 进入等待：点击那一刻，课程列表、卡头状态行、课程任务卡三块同时换骨架；
 * 落定与首次加载走同一个渲染函数（renderZhsCourses）：成功 → 重新渲染列表；
 * 未登录 / 失效 / 失败 → 只留那行状态，不列课程（与慕课同一条规则）。
 * 不另弹失败 toast：toast 只留动作回执（已读取 N 门）。
 */
export function initZhsCourseActions(): void {
  const button = document.getElementById('zhs-refresh-courses');
  button?.addEventListener('click', () => {
    if (button instanceof HTMLButtonElement) button.disabled = true;
    const listEl = document.getElementById('zhs-course-list');
    if (listEl !== null) listEl.replaceChildren(skeletonBlock());
    markZhsTasksLoading();
    markZhsStatusLineLoading();
    void refreshZhsCourses()
      .then((result) => {
        if (result.ok) {
          toast(`已读取 ${result.courses.length} 门课程`);
          void renderZhsCourses();
        } else if (result.reason === 'NOT_LOGGED_IN') {
          void renderZhsCourses({ kind: 'expired' });
        } else {
          void renderZhsCourses({ kind: 'failed', message: result.message ?? result.reason });
        }
        void refreshZhsTaskViews();
      })
      .catch((error: unknown) => {
        void renderZhsCourses({ kind: 'failed', message: errorText(error) });
        void refreshZhsTaskViews();
      })
      .finally(() => {
        if (button instanceof HTMLButtonElement) button.disabled = false;
      });
  });
}

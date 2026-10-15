/*
 * 账号与课程卡头里的状态行（标题右侧，与读取按钮同一行）。
 *
 *   账号与课程   已登录 · 5 门课程参与 · 待交 18 项 · 课件剩 985 项   [读取课程列表]
 *
 * 只负责**加载完成后的状态**：读取期间卡头立一条骨架占位（与课件卡同一种
 * 等待语言，不写字）；读取失败或未登录时卡头保持空白——「正在读取…」那句
 * 说明只在内容区出现一次；未登录的指引也放内容区（见 courses.ts），
 * 因为那是一句要读进去的话，不是一行状态。
 *
 * 数字来自与课件区共用的同一条平台读取（courseware 响应），不另发消息；
 * 数字读不到时头部只留本地事实（已登录 · N 门参与），失败细节由课件卡自己报。
 *
 * 将来加第二个平台时，这一行就是各平台分区自己的头部；待交数到那时再
 * 考虑上移到平台切换 tab 的徽标（GitHub 同款做法），现在不做。
 */

import { getCourseware, getSession, getSettings } from '../../src/ui-bridge';
import type { CoursewareSummary, QueryOutcome } from '../../src/ui-bridge';

export async function renderStatusLine(
  coursewareRead?: Promise<QueryOutcome<CoursewareSummary>>,
): Promise<void> {
  const el = document.getElementById('session-text');
  if (el === null) return;

  let loggedIn = false;
  let enabled = 0;
  try {
    const [session, settings] = await Promise.all([getSession(), getSettings()]);
    loggedIn = session.loggedIn;
    enabled = settings.mooc.courses.filter((course) => course.enabled).length;
  } catch {
    el.textContent = '';
    return;
  }

  // 未登录：卡头空白，指引在内容区
  if (!loggedIn) {
    el.textContent = '';
    return;
  }

  if (enabled === 0) {
    el.textContent = '已登录 · 未选择课程';
    return;
  }

  /*
   * 要等平台读取了：先在最终位置立起骨架（等的是同一份数，与课件卡
   * 同一种等待语言），落定后同一刻换成文字——内容不从虚无里冒出来。
   */
  el.textContent = '';
  el.classList.add('is-loading');

  const parts = ['已登录', `${enabled} 门课程参与`];
  const courseware = await (coursewareRead ?? getCourseware());
  if (courseware.status === 'ok') {
    const count = courseware.value.pending.auto + courseware.value.pending.manual;
    parts.push(count === 0 ? '暂无待交' : `待交 ${count} 项`);
    const left = courseware.value.courses.reduce((sum, entry) => sum + entry.pending, 0);
    parts.push(left === 0 ? '课件已清' : `课件剩 ${left} 项`);
  }

  el.classList.remove('is-loading');
  el.textContent = parts.join(' · ');
}

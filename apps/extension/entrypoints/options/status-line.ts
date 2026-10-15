/*
 * 账号与课程卡里的状态行：一行说清「现在是什么状态」。
 *
 *   已登录 · 5 门课程参与 · 待交 18 项 · 课件剩 985 项
 *
 * 登录态与课程数来自本地（会话 cookie 与设置），待交与课件来自同一条平台
 * 读取——与课件区共用同一份 courseware 响应，不另发消息。未登录时这行换成
 * 一句行动指引：它就长在「账号与课程」卡里，指的就是这张卡的事。
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
  } catch (error) {
    el.textContent = error instanceof Error ? error.message : '读取失败';
    return;
  }

  if (!loggedIn) {
    el.textContent = '未登录——先在浏览器里登录慕课平台，再回来读取课程列表。';
    return;
  }

  const parts = ['已登录', enabled === 0 ? '未选择课程' : `${enabled} 门课程参与`];

  if (enabled > 0) {
    const courseware = await (coursewareRead ?? getCourseware());
    if (courseware.status === 'ok') {
      const count = courseware.value.pending.auto + courseware.value.pending.manual;
      parts.push(count === 0 ? '暂无待交' : `待交 ${count} 项`);
      const left = courseware.value.courses.reduce((sum, entry) => sum + entry.pending, 0);
      parts.push(left === 0 ? '课件已清' : `课件剩 ${left} 项`);
    } else {
      parts.push('待交与课件读取失败');
    }
  }

  el.textContent = parts.join(' · ');
}

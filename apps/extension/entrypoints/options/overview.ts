/*
 * 概览：只读一行，回答「我现在是什么状态」。
 *
 * 数据来源两处：登录态与参与课程数走本地查询（会话 cookie 与设置），
 * 待交计数与课件剩余来自同一条平台读取（一次快照现算两份数，不缓存）。
 *
 * 平台那一份由入口读取后传进来（见 main.ts）：课件区与这里用的是
 * 同一个响应——各发各的消息会让页面一打开就读两遍快照。
 */

import { getCourseware, getSession, getSettings } from '../../src/ui-bridge';
import type { CoursewareSummary, QueryOutcome } from '../../src/ui-bridge';

export async function renderOverview(
  coursewareRead?: Promise<QueryOutcome<CoursewareSummary>>,
): Promise<void> {
  const el = document.getElementById('overview-text');
  if (el === null) return;
  el.textContent = '正在读取…';

  const parts: string[] = [];

  try {
    const [session, settings] = await Promise.all([getSession(), getSettings()]);
    const enabled = settings.mooc.courses.filter((course) => course.enabled).length;

    parts.push(session.loggedIn ? '已登录' : '未登录');
    parts.push(enabled === 0 ? '未选择课程' : `${enabled} 门课程参与`);

    if (session.loggedIn && enabled > 0) {
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
  } catch (error) {
    parts.push(error instanceof Error ? error.message : '读取失败');
  }

  el.textContent = parts.join(' · ');
}

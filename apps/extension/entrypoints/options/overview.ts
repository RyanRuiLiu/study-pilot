/*
 * 概览：只读一行，回答「我现在是什么状态」。
 *
 * 三份数据各有来源：登录态与参与课程数走后台查询，
 * 待交计数与课件剩余走平台读取（各一次，现读现算，不缓存）。
 *
 * 课件那一份由入口读取后传进来：课件区要同一份数，
 * 各读各的会让页面一打开就发两遍同样的请求。
 */

import { getCourseware, getPending, getSession, getSettings } from '../../src/ui-bridge';
import type { CoursewareProgress, QueryOutcome } from '../../src/ui-bridge';

export async function renderOverview(
  coursewareRead?: Promise<QueryOutcome<CoursewareProgress[]>>,
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
      const [pending, courseware] = await Promise.all([
        getPending(),
        coursewareRead ?? getCourseware(),
      ]);

      if (pending.status === 'ok') {
        const count = pending.value.auto + pending.value.manual;
        parts.push(count === 0 ? '暂无待交' : `待交 ${count} 项`);
      } else {
        parts.push('待办读取失败');
      }

      if (courseware.status === 'ok') {
        const left = courseware.value.reduce((sum, entry) => sum + entry.pending, 0);
        parts.push(left === 0 ? '课件已清' : `课件剩 ${left} 项`);
      } else {
        parts.push('课件读取失败');
      }
    }
  } catch (error) {
    parts.push(error instanceof Error ? error.message : '读取失败');
  }

  el.textContent = parts.join(' · ');
}

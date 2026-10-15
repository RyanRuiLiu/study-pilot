/*
 * 智慧树「账号与课程」卡头里的状态行（标题右侧，与读取按钮同一行）。
 *
 *   账号与课程   已登录 · 2 门课程参与 · 待学 122 项   [读取课程列表]
 *
 * 与慕课那份同一条规则：只负责**加载完成后的状态**；读取期间立骨架、
 * 失败与未登录保持空白（那句话在内容区出现一次，见 zhihuishu-courses.ts）。
 *
 * 数字与课件区共用同一条平台读取（ZHS_COURSEWARE_SUMMARY），不另发消息；
 * 读不到时头部只留本地事实（已登录 · N 门参与），失败细节由课件卡自己报。
 */

import { getZhsCourseware, getZhsSession, getSettings } from '../../src/ui-bridge';
import type { ZhsCoursewareSummary, QueryOutcome } from '../../src/ui-bridge';

/**
 * 卡头状态行立刻进入等待（骨架守位）。
 * 两处调用：本行自己的重读（renderZhsStatusLine 内部），以及
 * 「读取课程列表」点击那一刻——三块区域要同一刻进入等待。
 */
export function markZhsStatusLineLoading(): void {
  const el = document.getElementById('zhs-session-text');
  if (el === null) return;
  el.textContent = '';
  el.classList.add('is-loading');
}

export async function renderZhsStatusLine(
  coursewareRead?: Promise<QueryOutcome<ZhsCoursewareSummary>>,
): Promise<void> {
  const el = document.getElementById('zhs-session-text');
  if (el === null) return;

  let loggedIn = false;
  let enabled = 0;
  try {
    const [session, settings] = await Promise.all([getZhsSession(), getSettings()]);
    loggedIn = session.loggedIn;
    enabled = settings.zhihuishu.courses.filter((course) => course.enabled).length;
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

  // 要等平台读取了：先在最终位置立起骨架，落定后同一刻换成文字
  markZhsStatusLineLoading();

  const parts = ['已登录', `${enabled} 门课程参与`];
  const courseware = await (coursewareRead ?? getZhsCourseware());
  if (courseware.status === 'ok') {
    const pending = courseware.value.pendingTotal;
    parts.push(pending === 0 ? '任务已清' : `待学 ${pending} 项`);
  }

  el.classList.remove('is-loading');
  el.textContent = parts.join(' · ');
}

/*
 * 设置页的动作：手动运行、申请权限、测试连接等。
 *
 * 从 options/main.ts 按原有分节搬出。
 */

import { chatOrigin } from '@study-pilot/ai';
import { testAiConnection } from '../../src/ai';
import { ensureHostPermission } from '../../src/ai/permission';
import { getSettings } from '../../src/settings';
import { REJECTION_MESSAGES, sendToBackground } from '../../src/platform/messaging';
import { moocSettings } from '../../src/platforms/mooc/settings.ts';
import { current, render, setCurrent, toast } from '../../src/settings/page-state.ts';


// ---------- 动作 ----------

/**
 * 申请 AI 接口所在域名的主机权限。
 *
 * 必须在点击事件里调用：浏览器的权限申请要求用户手势。
 * 只申请当前填写的那个源；换地址后需要重新申请（旧权限不会顺延）。
 */
export async function requestAiPermission(): Promise<void> {
  const origin = chatOrigin(current.ai.baseUrl);
  if (!origin) {
    toast('先填写接口地址（以 http:// 或 https:// 开头）');
    return;
  }
  toast(`正在申请 ${origin} 的权限…`);
  const result = await ensureHostPermission(origin);
  if (result === 'granted') toast(`已授权 ${origin}`);
  else if (result === 'denied') toast('未授权：无法向你填写的地址发请求');
  else toast('当前环境不支持申请权限，请在扩展页面里操作');
}

/** 用当前配置发一次最小请求，把结果如实回报。 */
export async function checkAiConnection(): Promise<void> {
  toast('正在测试连接…');
  const result = await testAiConnection(current);
  toast(result.ok ? `可用：${result.text.slice(0, 24)}` : `失败：${result.reason}`);
}

export function describeRejection(reason: string): string {
  return REJECTION_MESSAGES[reason as keyof typeof REJECTION_MESSAGES] ?? `执行失败：${reason}`;
}

/**
 * 主动读取课程列表。
 *
 * 这是用户按下按钮触发的，因此总是真的去平台拉一次，不用缓存——
 * 他想看到的是此刻的状态，不是昨天存下来的。
 * 后台的按天缓存只服务于自动任务，两处互不影响。
 */
export async function refreshCourses(): Promise<void> {
  toast('正在读取课程列表');
  const response = await sendToBackground({ type: 'REFRESH_COURSES' });
  if (!response.ok) {
    toast(describeRejection(response.reason));
    /*
     * 后台报未登录时同步刷新登录状态行。
     *
     * 长时间闲置后出现「课程读不出」时，登录行可能还挂着旧的「已登录」
     * ——那是按本地 cookie 读的。让两处一致，用户才不会对着
     * 「已登录 + 请先登录」各自矛盾的两行字。
     */
    if (response.reason === 'NOT_LOGGED_IN') moocSettings.onLoginChanged?.();
    return;
  }
  setCurrent(await getSettings());
  render();
  toast(`已读取 ${response.courses.length} 门课程`);
}
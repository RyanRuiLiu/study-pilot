/*
 * 设置页里属于外壳的动作：AI 权限申请与连通性测试。
 *
 * 平台自己的动作（读取课程列表等）住在各平台的设置分区里——外壳不认识它们，
 * 换平台时这一页不需要改。
 */

import { chatOrigin } from '@study-pilot/ai';
import { testAiConnection } from '../../src/ai';
import { ensureHostPermission } from '../../src/ai/permission';
import { current, toast } from '../../src/settings/page-state.ts';

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

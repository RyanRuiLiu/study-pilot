/*
 * 智慧树会话。
 *
 * 登录事实的来源是服务端的表��：`getLoginUserInfo`（免签接口，源码 qf 白名单里）。
 * 它同时给出 **uuid（设备号）**——页面把它存进 localStorage 的 CASLOGC 当设备身份，
 * 进度上报的第 10 位 token 就是 `uuid + "zhs"`（2026-10-16 实测：换成本地随机值
 * 会被服务端以「参数解码发生错误」拒绝）。因此本模块只认这一个来源，不自己造。
 *
 * 与慕课会话的差别：这里没有 cookie 解析、也没有「持久凭证换新会话」那套——
 * 智慧树的会话恢复行为尚未实测取证（未登录形态的响应长什么样）。
 * 在那之前不做推测性的恢复逻辑；未登录就是未登录，如实返回。
 */

import { isSuccessCode, type ZhsClient } from './client.ts';

export interface ZhsSession {
  /** 是否处于登录态 */
  loggedIn: boolean;
  /** 设备号（报告的 token 用料）。未登录为空串 */
  uuid: string;
}

/**
 * getLoginUserInfo 的已实测形态（登录态）：
 *   { result: { realName, headPicUrl, uuid, username }, code: <成功码>, message: null }
 * 成功码复用 client 的统一判定（首页族用 200）。
 * 未登录形态未实测——按「非成功码或没有 uuid」处理为未登录。
 * 这个判断的服务端语义待补测（见 FINDINGS 的待办清单）。
 */
export async function readSession(client: ZhsClient): Promise<ZhsSession> {
  const body = (await client.call('loginUserInfo')) as {
    code?: unknown;
    result?: { uuid?: unknown } | null;
  };
  if (typeof body.code !== 'number' || !isSuccessCode(body.code) || body.result == null) {
    return { loggedIn: false, uuid: '' };
  }
  const uuid = body.result.uuid;
  if (typeof uuid !== 'string' || uuid.length === 0) return { loggedIn: false, uuid: '' };
  return { loggedIn: true, uuid };
}

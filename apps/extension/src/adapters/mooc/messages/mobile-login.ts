/*
 * 设置页「保存并登录」的后台实现。
 *
 * 放在后台而不是设置页直接 fetch：扩展页直接发往 sdk.reg.163.com 的请求
 * 会带 `Origin: chrome-extension://…` 和浏览器 UA，服务端回「非法请求」。
 * 后台出站走 `client.send`（先等 DNR 规则就绪），规则会把这两个头去掉/
 * 换成 App 的 WebView UA。
 *
 * 只回成功或错误原话；mob-token 留在后台，不进消息响应。
 */

import { loginMobileSession } from '@study-pilot/platform-mooc';
import type { MessageHandler } from '../../../protocol.ts';
import type { MoocMessageDeps } from './deps.ts';
import type { MoocRequest, MoocResponseMap } from './payload.ts';

type Request = Extract<MoocRequest, { type: 'MOOC_MOBILE_LOGIN' }>;

export function mobileLoginCommand(deps: MoocMessageDeps): MessageHandler {
  return async (request, sendResponse) => {
    const { account, password, aId, uniqueId } = request as Request;
    const result = await loginMobileSession(
      { send: deps.client.send, origin: deps.client.origin },
      { account, password, aId, uniqueId },
    );
    const response: MoocResponseMap['MOOC_MOBILE_LOGIN'] = result.ok
      ? { ok: true }
      : { ok: false, message: result.error.message };
    sendResponse(response);
  };
}

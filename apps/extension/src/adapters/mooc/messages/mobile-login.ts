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

import type { MessageHandler } from '../../../protocol.ts';
import type { MoocMessageDeps } from './deps.ts';
import type { MoocResponseMap } from './payload.ts';

export function mobileLoginCommand(deps: MoocMessageDeps): MessageHandler {
  return async (_request, sendResponse) => {
    let response: MoocResponseMap['MOOC_MOBILE_LOGIN'];
    try {
      // 走客户端那枚带缓存的 provider，而不是另起一次 loginMobileSession：
      // 设置页登录成功后，后续取答案必须复用同一枚 mob-token，不能再次登录。
      const provider = deps.client.mobileSession;
      if (provider === undefined) {
        response = { ok: false, message: '移动端登录尚未配置账号密码' };
      } else {
        const result = await provider({ refresh: true });
        response = result.ok ? { ok: true } : { ok: false, message: result.error.message };
      }
    } catch (error) {
      response = { ok: false, message: error instanceof Error ? error.message : String(error) };
    }
    sendResponse(response);
  };
}

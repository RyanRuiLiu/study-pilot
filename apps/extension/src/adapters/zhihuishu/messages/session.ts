/*
 * ZHS_SESSION：登录态。
 *
 * 两个来源叠起来才叫「能用」：cookie 证明曾经登录（readSession），服务端的一次
 * 只读探问证明现在还认（probeSession）。只有 cookie 时，界面会出现「账号卡说已登录、
 * 列表说登录已失效」——同一条事实两种说法。探问遇网络问题保留 cookie 的结论。
 */

import type { MessageHandler } from '../../../protocol.ts';
import { probeSession, readSession } from '@study-pilot/platform-zhs';
import type { ZhsMessageDeps } from './deps.ts';
import type { ZhsResponseMap } from './payload.ts';

export function zhsSessionCommand(deps: ZhsMessageDeps): MessageHandler {
  return async (_request, sendResponse) => {
    const session = await readSession(deps.readCookie);
    if (!session.loggedIn) {
      sendResponse({ loggedIn: false } satisfies ZhsResponseMap['ZHS_SESSION']);
      return;
    }
    const probe = await probeSession(deps.client);
    sendResponse(
      probe === 'auth'
        ? { loggedIn: false, expired: true }
        : { loggedIn: true } satisfies ZhsResponseMap['ZHS_SESSION'],
    );
  };
}

/* ZHS_SESSION：登录态（只在读得到 uuid 时算登录，判据在平台包的 readSession）。 */

import type { MessageHandler } from '../../../protocol.ts';
import { readSession } from '@study-pilot/platform-zhs';
import type { ZhsMessageDeps } from './deps.ts';
import type { ZhsResponseMap } from './payload.ts';

export function zhsSessionCommand(deps: ZhsMessageDeps): MessageHandler {
  return async (_request, sendResponse) => {
    const session = await readSession(deps.client);
    sendResponse({ loggedIn: session.loggedIn } satisfies ZhsResponseMap['ZHS_SESSION']);
  };
}

/*
 * 登录态。
 *
 * 必须问过服务端才算数：本地 cookie 只能证明「过去某一刻登录过」。浏览器长期驻留
 * （启动加速、后台运行）会让会话级 cookie 活过服务端会话的寿命，此时照读 cookie
 * 必然误报「已登录」。课程列表的未登录形态（result 为 null）才是服务端的表态：
 * 可疑时先续期一次，仍可疑才如实报未登录。pageSize 压到 1，这次探问只为「认不认得我」。
 */

import { COURSE_TYPE, getCourses } from '@study-pilot/platform-mooc';
import type { MessageHandler } from '../../../protocol.ts';
import { ensureSession, renewSession } from '@study-pilot/platform-mooc';
import type { MoocMessageDeps } from './deps.ts';
import type { MoocResponseMap } from './payload.ts';

export function sessionCommand(deps: MoocMessageDeps): MessageHandler {
  return async (_request, sendResponse) => {
    const session = await ensureSession(deps.host, deps.client.send, deps.client.origin);
    if (!session.loggedIn) {
      sendResponse(session satisfies MoocResponseMap['MOOC_SESSION']);
      return;
    }

    const probe = await getCourses(deps.client, { courseType: COURSE_TYPE.MOOC, pageSize: 1 });
    if (probe.ok || probe.error.kind !== 'auth') {
      sendResponse(session satisfies MoocResponseMap['MOOC_SESSION']);
      return;
    }

    const { renewed, session: renewedSession } = await renewSession(
      deps.host,
      deps.client.send,
      deps.client.origin,
    );
    if (renewed) {
      const afterRenewal = await getCourses(deps.client, {
        courseType: COURSE_TYPE.MOOC,
        pageSize: 1,
      });
      if (afterRenewal.ok || afterRenewal.error.kind !== 'auth') {
        sendResponse(renewedSession satisfies MoocResponseMap['MOOC_SESSION']);
        return;
      }
    }

    sendResponse({ loggedIn: false, userId: 0, token: session.token } satisfies MoocResponseMap['MOOC_SESSION']);
  };
}

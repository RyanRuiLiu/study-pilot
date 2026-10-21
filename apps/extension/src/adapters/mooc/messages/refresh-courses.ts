/*
 * 主动去平台重新拉一次课程列表并写回配置。
 *
 * 总是真的拉一次，不走缓存——用户点它就是想看此刻的状态。
 *
 * 长时间闲置后 cookie 可能还活着而服务端会话已死，那时平台回的是未登录形态的空数据；
 * refreshCourses 遇到该形态会抛 SessionExpiredError，编排随即续期并重读一次，
 * 确认救不回来才报 NOT_LOGGED_IN。
 */

import type { MessageHandler } from '../../../protocol.ts';
import { ensureSession } from '@study-pilot/platform-mooc';
import { recoveryFailure, withSessionRecovery } from '@study-pilot/platform-mooc';
import type { MoocMessageDeps } from './deps.ts';
import type { MoocResponseMap } from './payload.ts';

export function refreshCoursesCommand(deps: MoocMessageDeps): MessageHandler {
  return async (_request, sendResponse) => {
    const session = await ensureSession(deps.host, deps.client.send, deps.client.origin, deps.client);
    if (!session.loggedIn) {
      sendResponse({ ok: false, reason: 'NOT_LOGGED_IN' } satisfies MoocResponseMap['MOOC_REFRESH_COURSES']);
      return;
    }

    const outcome = await withSessionRecovery(() => deps.refreshCourses(), deps.renew);
    if (!outcome.ok) {
      const failure = recoveryFailure(outcome);
      sendResponse({
        ok: false,
        reason: failure.reason ?? 'FETCH_FAILED',
        message: failure.message,
      } satisfies MoocResponseMap['MOOC_REFRESH_COURSES']);
      return;
    }

    const result = outcome.value;
    if (!result.ok) {
      // 失败原因必须带回去，否则界面只能显示一个笼统的失败
      sendResponse({
        ok: false,
        reason: 'FETCH_FAILED',
        message: result.message,
      } satisfies MoocResponseMap['MOOC_REFRESH_COURSES']);
      return;
    }

    sendResponse(
      (result.courses.length > 0
        ? { ok: true, courses: result.courses }
        : // 空列表要带上自己的说法：界面把失败如实落进区域，不能只交回一个原因代码
          { ok: false, reason: 'NO_SELECTED_COURSE', message: '平台没有返回任何课程' }) satisfies MoocResponseMap['MOOC_REFRESH_COURSES'],
    );
  };
}

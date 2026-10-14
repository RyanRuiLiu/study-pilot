/*
 * 全部单元明细。
 *
 * 成功与失败分开：没有任何单元（比如尚未勾选课程）与「逐个课程读取时出错」是两件事。
 * 未登录时不往下走，原因与待办汇总相同。
 *
 * 与待办汇总共用 loadSnapshot，因此读完之后快照也是新的——否则会出现「界面看到的是
 * 新数据、下次启动判断用的是旧数据」这种说不清的状态。
 */

import type { MessageHandler } from '../../../protocol.ts';
import { getSettings } from '../../../settings';
import { recoveryFailure, withSessionRecovery } from '../recovery.ts';
import { ensureSession } from '../session';
import { toUnitDetails } from '../to-messages';
import type { MoocMessageDeps } from './deps.ts';
import type { MoocResponseMap } from './payload.ts';

export function unitDetailsCommand(deps: MoocMessageDeps): MessageHandler {
  return async (_request, sendResponse) => {
    const settings = await getSettings();
    const session = await ensureSession(deps.host);

    if (!session.loggedIn) {
      sendResponse({
        status: 'error',
        reason: 'NOT_LOGGED_IN',
        message: '尚未登录慕课平台',
      } satisfies MoocResponseMap['UNIT_DETAILS']);
      return;
    }

    try {
      const outcome = await withSessionRecovery(
        () => deps.loadSnapshot(deps.selectedCourses(settings), session.userId),
        deps.renew,
      );
      if (!outcome.ok) {
        sendResponse({ status: 'error', ...recoveryFailure(outcome) } satisfies MoocResponseMap['UNIT_DETAILS']);
        return;
      }
      sendResponse({ status: 'ok', value: toUnitDetails(outcome.value) } satisfies MoocResponseMap['UNIT_DETAILS']);
    } catch (error) {
      sendResponse({
        status: 'error',
        message: error instanceof Error ? error.message : String(error),
      } satisfies MoocResponseMap['UNIT_DETAILS']);
    }
  };
}

/*
 * 课件进度（每门课的完成计数）。
 *
 * 与单元明细共用 loadSnapshot：读一次，界面上的数字与真正的执行用同一份事实。
 * 未登录时不往下走，原因与其余读取相同。
 */

import { hasTextGenerator } from '@study-pilot/application';
import type { MessageHandler } from '../../../protocol.ts';
import { getSettings } from '../../../settings';
import {
  ensureSession,
  recoveryFailure,
  summarizeCourseware,
  withSessionRecovery,
} from '@study-pilot/platform-mooc';
import type { MoocMessageDeps } from './deps.ts';
import type { MoocResponseMap } from './payload.ts';

export function coursewareSummaryCommand(deps: MoocMessageDeps): MessageHandler {
  return async (_request, sendResponse) => {
    const settings = await getSettings();
    const session = await ensureSession(deps.host);

    if (!session.loggedIn) {
      sendResponse({
        status: 'error',
        reason: 'NOT_LOGGED_IN',
        message: '尚未登录慕课平台',
      } satisfies MoocResponseMap['COURSEWARE_SUMMARY']);
      return;
    }

    try {
      const outcome = await withSessionRecovery(
        () => deps.loadSnapshot(deps.selectedCourses(settings), session.userId),
        deps.renew,
      );
      if (!outcome.ok) {
        sendResponse({ status: 'error', ...recoveryFailure(outcome) } satisfies MoocResponseMap['COURSEWARE_SUMMARY']);
        return;
      }
      sendResponse({
        status: 'ok',
        value: summarizeCourseware(outcome.value, hasTextGenerator(settings)),
      } satisfies MoocResponseMap['COURSEWARE_SUMMARY']);
    } catch (error) {
      sendResponse({
        status: 'error',
        message: error instanceof Error ? error.message : String(error),
      } satisfies MoocResponseMap['COURSEWARE_SUMMARY']);
    }
  };
}

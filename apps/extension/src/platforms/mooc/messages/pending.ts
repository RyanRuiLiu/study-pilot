/*
 * 要交的东西（测验 / 作业 / 互评 / 自评 / 考试）。
 *
 * 成功与失败必须分开返回：曾经「取不到就当作 0」，界面显示「没有要交的东西」，
 * 而真实情况可能是请求被拒——两种状态对用户的含义完全不同。
 *
 * 未登录时不往下走：平台接口以用户为维度，拿 userId = 0 去查得到的是「查不到」，
 * 会被当成读取失败，而真实原因是没登录。
 *
 * 正在执行时不重新拉取，只回现有快照：执行那一轮自己就在写快照，两边同时拉会互相
 * 覆盖，而用户看到的正好是被抹掉的那一份。执行结束后界面会自己重读一次。
 */

import type { MessageHandler } from '../../../protocol.ts';
import { getSettings } from '../../../settings';
import { derivePlan } from '../plan';
import { readSnapshot } from '../read';
import { recoveryFailure, withSessionRecovery } from '../recovery.ts';
import { ensureSession } from '../session';
import { toPendingSummary } from '../to-messages';
import type { MoocMessageDeps } from './deps.ts';
import type { MoocResponseMap } from './payload.ts';

export function pendingCommand(deps: MoocMessageDeps): MessageHandler {
  return async (_request, sendResponse) => {
    const settings = await getSettings();
    const session = await ensureSession(deps.host);

    if (!session.loggedIn) {
      sendResponse({
        status: 'error',
        reason: 'NOT_LOGGED_IN',
        message: '尚未登录慕课平台',
      } satisfies MoocResponseMap['PENDING_SUMMARY']);
      return;
    }

    if ((await deps.shell.runState()).live === 'running') {
      const cached = await readSnapshot().catch(() => null);
      const plan = cached ? derivePlan(cached, settings) : { auto: [], manual: [] };
      sendResponse({
        status: 'ok',
        running: true,
        value: toPendingSummary(plan, settings.schedule.keepOverdueDays),
      } satisfies MoocResponseMap['PENDING_SUMMARY']);
      return;
    }

    try {
      /*
       * 用户主动打开弹窗就是「现在想看看有什么要做」，因此无条件拉最新并更新快照。
       * 拉取带会话恢复：这是「长时间不点扩展后显示暂无待办」的现场路径。
       */
      const outcome = await withSessionRecovery(
        () => deps.loadSnapshot(deps.selectedCourses(settings), session.userId),
        deps.renew,
      );
      if (!outcome.ok) {
        sendResponse({ status: 'error', ...recoveryFailure(outcome) } satisfies MoocResponseMap['PENDING_SUMMARY']);
        return;
      }
      sendResponse({
        status: 'ok',
        value: toPendingSummary(derivePlan(outcome.value, settings), settings.schedule.keepOverdueDays),
      } satisfies MoocResponseMap['PENDING_SUMMARY']);
    } catch (error) {
      sendResponse({
        status: 'error',
        message: error instanceof Error ? error.message : String(error),
      } satisfies MoocResponseMap['PENDING_SUMMARY']);
    }
  };
}

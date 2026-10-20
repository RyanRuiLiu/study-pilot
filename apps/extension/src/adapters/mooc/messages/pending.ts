/*
 * 要交的东西（测验 / 作业 / 互评 / 自评 / 考试）。
 *
 * 成功与失败必须分开返回：曾经「取不到就当作 0」，界面显示「没有要交的东西」，
 * 而真实情况可能是请求被拒——两种状态对用户的含义完全不同。
 *
 * 未登录时不往下走：平台接口以用户为维度，拿 userId = 0 去查得到的是「查不到」，
 * 会被当成读取失败，而真实原因是没登录。
 *
 * 每次调用都从平台读一次最新数据：读是只读的，不存在两份读取互相覆盖的问题。
 */

import type { MessageHandler } from '../../../protocol.ts';
import { getSettings } from '../../../settings';
import { aiTextAvailable } from '../../../ai/permission.ts';
import { derivePlan, ensureSession, recoveryFailure, withSessionRecovery } from '@study-pilot/platform-mooc';
import { toPendingSummary } from '../to-messages';
import type { MoocMessageDeps } from './deps.ts';
import type { MoocResponseMap } from './payload.ts';

export function pendingCommand(deps: MoocMessageDeps): MessageHandler {
  return async (_request, sendResponse) => {
    const settings = await getSettings();
    const session = await ensureSession(deps.host, deps.client.send, deps.client.origin);

    if (!session.loggedIn) {
      sendResponse({
        status: 'error',
        reason: 'NOT_LOGGED_IN',
        message: '未登录',
      } satisfies MoocResponseMap['MOOC_PENDING_SUMMARY']);
      return;
    }

    try {
      /*
       * 用户主动打开弹窗就是「现在想看看有什么要做」，因此无条件去平台拉最新一份。
       * 拉取带会话恢复：这是「长时间不点扩展后显示暂无待办」的现场路径。
       */
      const outcome = await withSessionRecovery(
        () => deps.loadSnapshot(deps.selectedCourses(settings), session.userId),
        deps.renew,
      );
      if (!outcome.ok) {
        sendResponse({ status: 'error', ...recoveryFailure(outcome) } satisfies MoocResponseMap['MOOC_PENDING_SUMMARY']);
        return;
      }
      sendResponse({
        status: 'ok',
        value: toPendingSummary(
          // 与执行侧同一个实测判断：权限不在时讨论单元不进清单，免得
          // 界面展示「可代劳」、执行时却一条条失败
          derivePlan(outcome.value, settings, Date.now(), await aiTextAvailable(settings)),
          settings.mooc.keepOverdueDays,
        ),
      } satisfies MoocResponseMap['MOOC_PENDING_SUMMARY']);
    } catch (error) {
      sendResponse({
        status: 'error',
        message: error instanceof Error ? error.message : String(error),
      } satisfies MoocResponseMap['MOOC_PENDING_SUMMARY']);
    }
  };
}

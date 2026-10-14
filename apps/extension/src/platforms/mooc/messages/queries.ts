/*
 * 查询类请求：待办汇总、单元明细、诊断、状态与示例通知。
 *
 * 从 `router.ts` 分开的判据是「会不会改变状态」：这些分支只读，共用会话
 * 与快照读取；而会话、课程刷新、执行那几个分支会写或改配置，留在 router.ts。
 *
 * 分支体来自 router.ts（原样搬运），因此开头同样把 deps 解构成同名局部变量。
 */

import {
  getOpenQuizInfo,
  getQuizBank,
} from '@study-pilot/platform-mooc';
import { getSettings } from '../../../settings';
import { ensureSession } from '../session';
import type { BackgroundRequest } from '../../../browser/messaging';
import { notifySample } from '../reminder';
import { readSnapshot } from '../read';
import { derivePlan } from '../plan';
import { toPendingSummary, toUnitDetails } from '../to-messages';
import { recoveryFailure, withSessionRecovery } from '../recovery.ts';
import type { SendResponse } from '../../../browser/messaging';
import type { MoocMessageDeps } from './deps.ts';

export async function handleQuery(
  deps: MoocMessageDeps,
  request: BackgroundRequest | undefined,
  sendResponse: SendResponse,
): Promise<boolean> {
  const { renew, loadSnapshot, selectedCourses } = deps;

  switch (request?.type) {
        case 'PENDING_SUMMARY': {
          /*
           * 成功与失败必须分开返回。
           *
           * 曾经的做法是「取不到就当作 0」，前台于是显示「暂无待办」——
           * 而真实情况可能是请求被拒。这两种状态对用户的含义完全不同，
           * 混在一起会让问题被掩盖。
           */
          const settingsForPending = await getSettings();
          const pendingSession = await ensureSession();

          /*
           * 未登录时不往下走。
           *
           * 平台的接口以用户为维度，拿 userId = 0 去查得到的是「查不到」
           * 而不是「没登录」，用户看到的就是一句笼统的失败，会以为网络有问题。
           * 这里把它与真正的失败分开，前台据此提示去登录。
           */
          if (!pendingSession.loggedIn) {
            sendResponse({ status: 'error', reason: 'NOT_LOGGED_IN', message: '尚未登录慕课平台' });
            break;
          }

          const coursesForPending = selectedCourses(settingsForPending);

          /*
           * 正在执行时不重新拉取，只回现有快照。
           *
           * 执行那一轮自己就在写快照，两边同时拉会互相覆盖——后写的把先写的
           * 结果抹掉，而用户看到的正好是被抹掉的那一份，却无从知道。
           * 而且此刻他更该看到的是「正在执行」，不是一份正在被改写的清单。
           *
           * 执行结束后弹窗会自己重读一次待办（跟随轮询看到不是 running 就重读），
           * 所以省掉的这次请求不会被漏掉。
           */
          if ((await deps.shell.runState()).live === 'running') {
            const cached = await readSnapshot().catch(() => null);
            const plan = cached
              ? derivePlan(cached, settingsForPending)
              : { auto: [], manual: [] };

            sendResponse({
              status: 'ok',
              running: true,
              value: toPendingSummary(
                plan,
                settingsForPending.schedule.keepOverdueDays,
              ),
            });
            break;
          }

          try {
            /*
             * 用户主动打开弹窗就是「现在想看看有什么要做」。
             * 因此这里无条件拉最新并更新快照——不受「今天是否已拉过」约束。
             * 那条约束只用于浏览器启动时的自动触发，目的是省请求；
             * 用户明确表达了想看，省这一步就违背了他的意图。
             *
             * 拉取带会话恢复：这是「长时间不点扩展后显示暂无待办」的
             * 现场路径。失效会话拿回的是未登录形态的空数据，不恢复的话
             * 上一行会以 status: ok 交出去，界面上便是一句「暂无待办」；
             * 恢复失败才以 NOT_LOGGED_IN 交出去，弹窗据此显示登录入口。
             */
            const pendingOutcome = await withSessionRecovery(
              () => loadSnapshot(coursesForPending, pendingSession.userId),
              renew,
            );
            if (!pendingOutcome.ok) {
              sendResponse({ status: 'error', ...recoveryFailure(pendingOutcome) });
              break;
            }
            const snapshot = pendingOutcome.value;
            sendResponse({
              status: 'ok',
              value: toPendingSummary(
                derivePlan(snapshot, settingsForPending),
                settingsForPending.schedule.keepOverdueDays,
              ),
            });
          } catch (error) {
            sendResponse({
              status: 'error',
              message: error instanceof Error ? error.message : String(error),
            });
          }
          break;
        }

        /*
     * 发一条示例通知。
     *
     * 桌面通知是否真的送达，不由扩展决定——系统可能把它静音、可能没授予
     * 权限、可能被专注模式挡住。给一个手动入口，用户才能自己确认，
     * 而不是遇到「设了提醒却从没收到过」时只能猜。
     *
     * 内容取自当前账号的真实待办，用与实际检查同一套措辞，
     * 因此看到的就是真正会收到的那种通知。
     */
    case 'NOTIFY_SAMPLE': {
      const [snapshot, settings] = await Promise.all([readSnapshot(), getSettings()]);
      // 必须经 sendResponse 交回：直接 return 的是这个异步函数自己，
      // 调用方只能等到通道关闭，拿到的是「后台无响应」
      sendResponse({ ok: true, hasContent: await notifySample(snapshot, settings) });
      break;
    }

    case 'UNIT_DETAILS': {
          /*
           * 同样是成功与失败分开：没有任何单元（比如尚未勾选课程）
           * 与「逐个课程读取时出错」是两件事。
           */
          const settings = await getSettings();
          const session = await ensureSession();

          /*
           * 未登录时不往下走。原因与待办汇总相同：拿 userId = 0 去查
           * 得到的是「查不到」，会被当成读取失败，而真实原因是没登录。
           */
          if (!session.loggedIn) {
            sendResponse({ status: 'error', reason: 'NOT_LOGGED_IN', message: '尚未登录慕课平台' });
            break;
          }

          try {
            /*
             * 与待办汇总一样：用户主动打开设置页就是现在想看，
             * 无条件拉最新并更新快照。
             *
             * 这里与待办汇总共用 loadSnapshot，因此打开设置页之后，
             * 快照也是新的 —— 下一次浏览器启动的自动判断会基于它。
             * 若两处各拉各的，就会出现「弹窗看到的是新数据、
             * 启动判断用的是旧数据」这种说不清的状态。
             *
             * 恢复路径与待办汇总同源：先续期再重读，救不回来才报登录失效。
             */
            const unitOutcome = await withSessionRecovery(
              () => loadSnapshot(selectedCourses(settings), session.userId),
              renew,
            );
            if (!unitOutcome.ok) {
              sendResponse({ status: 'error', ...recoveryFailure(unitOutcome) });
              break;
            }
            sendResponse({ status: 'ok', value: toUnitDetails(unitOutcome.value) });
          } catch (error) {
            sendResponse({
              status: 'error',
              message: error instanceof Error ? error.message : String(error),
            });
          }
          break;
        }

        case 'TASK_STATE': {
          /*
           * 状态与判据一起给。
           *
           * 界面不再自己拿 `runningSince !== null` 猜「在不在跑」：那个字段
           * 在浏览器被强杀后会留着没人清，猜出来是「正在执行」，而实际什么
           * 都没发生。判据归后台（scheduler.liveRunState），界面只负责显示。
           */
          const { state, live } = await deps.shell.runState();
        sendResponse({ state, live });
          break;
        }

    case 'QUIZ_BANK': {
      // 题库：前台按它填充选项，因此只回数据，索引由前台构造（纯函数）
      const bank = await getQuizBank(deps.client, request.termId);
      sendResponse(
        bank.ok
          ? { status: 'ok', value: bank.value }
          : { status: 'error', message: bank.error.message },
      );
      break;
    }

    case 'QUIZ_INFO': {
      const info = await getOpenQuizInfo(deps.client, request.tid);
      sendResponse(
        info.ok
          ? { status: 'ok', value: info.value }
          : { status: 'error', message: info.error.message },
      );
      break;
    }

    default:
      return false;
  }

  return true;
}
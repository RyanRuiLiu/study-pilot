/*
 * 调度：按平台跑一轮自动执行。
 *
 * 这里只做四件事——**什么时候跑、跑哪个平台、每步之间刷心跳、运行状态与中断恢复**。
 * 它**不认识任何平台字段**：该做什么由平台自己说（plan），怎么做由平台自己做（run），
 * 因此新增一个平台不需要改这个文件。
 *
 * 一轮里的顺序（与用户看到的行为一致）：
 *   总开关 → 能否开始（防重入/中断） → 逐平台：前置条件 → 计划 → 只做 auto 项 → 收尾
 */

import { getSettings } from '../settings';
import type { PlatformTasks } from '@study-pilot/application';
import { canStartRun, claimRun, releaseRun } from './runtime/scheduler';
import {
  beginRun,
  clearAwaitingLogin,
  finishRun,
  getTaskState,
  markAwaitingLogin,
  recordRunFailure,
  touchRun,
} from './runtime/task-state';
import {
  beginPlatform,
  completeItem,
  enterItem,
  finishPlatform,
} from './runtime/run-state';

export interface SchedulerDeps {
  /**
   * 本轮要跑的平台。
   *
   * 用函数而不是数组：每次运行现建实例，平台自己的"本轮状态"（计划、结果）
   * 就不会跨轮残留。有哪些平台由装配层决定，调度层不知道。
   */
  platforms: () => PlatformTasks[];
}

export async function autoRun(deps: SchedulerDeps): Promise<void> {
  const settings = await getSettings();
  if (!settings.enabled) return;

  const now = Date.now();
  const state = await getTaskState();
  if (!canStartRun(state, now)) return;
  // 上一轮仍在本进程里跑着（闹钟与登录变化可以同时到达）：不并发起第二轮
  if (!claimRun()) return;

  /*
   * 因登录挂起的结论先记在这里，收尾之后才落盘。
   *
   * finishRun 会把 awaitingLogin 一并清掉（它假定本轮正常结束），
   * 若在循环里落标记，会被本轮自己的收尾立刻抹掉——挂起就没人记得了。
   */
  let suspendedLogin = false;

  try {
    for (const platform of deps.platforms()) {
      if (!(await platform.isReady())) {
        suspendedLogin = true;
        continue;
      }
      await clearAwaitingLogin();

      await beginRun(now);
      try {
        /*
         * 每一步之前刷新心跳。
         *
         * 一轮执行里有好几次网络往返。心跳过期会让界面把「正在跑」读成
         * 「上次没结束」——那是用户最容易被误导的地方，他会以为扩展卡住了，
         * 而实际上一切正常。刷心跳只是一次本地存储写入，相比一次接口调用
         * 可以忽略。
         */
        await touchRun();

        const plan = await platform.plan(now);
        if (plan.needsLogin === true) suspendedLogin = true;

        // 需要人到场确认的项不在这里做：无人值守时做不了，硬做就是替用户承诺
        const queue = plan.items.filter((entry) => entry.mode === 'auto');

        // 总数先落定，界面立刻能画出「0 / 7」
        await beginPlatform(platform.id, platform.name, queue.length, Date.now());
        for (const item of queue) {
          await enterItem(platform.id, platform.name, { course: item.group, title: item.title }, Date.now());
          // 长动作（课件上报）会把心跳传进去：它自己按平台节奏刷新
          const outcome = await platform.run(item, touchRun);
          await completeItem(
            platform.id,
            platform.name,
            { course: item.group, title: item.title },
            outcome.status,
            outcome.message ?? '',
            Date.now(),
          );
          await touchRun();
        }

        await finishPlatform(platform.id, platform.name);
      } finally {
        await finishRun();
      }
    }

    // 已在 beginRun 之后收尾完毕，此刻落挂起标记不会再被 finishRun 抹掉
    if (suspendedLogin) await markAwaitingLogin();
  } catch (error) {
    /*
     * 一轮的失败记下来，而不是向上抛。
     *
     * 调用它的是闹钟与登录事件，那里没有人在等一个答案；从前抛出去等于
     * 扔进 `.catch(() => undefined)`，于是「读不到课程」「会话已失效」「平台
     * 改了字段」三种情况在界面上都与「今天没有要做的事」一模一样。
     * 界面只如实显示这一条记录，不自己推断任何原因。
     */
    await recordRunFailure(error instanceof Error ? error.message : String(error));
  } finally {
    releaseRun();
  }
}

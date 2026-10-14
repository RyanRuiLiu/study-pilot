/*
 * 「跑一轮」这一个用例。
 *
 * 它以前有两份实现：自动那一侧在 run-tasks.ts，手动那一侧在 router.ts。两份都在做
 * 同一件事——先问能不能开始、再逐平台问计划、只做 mode 为 auto 的项、每步之间刷心跳。
 * 差别只在**怎么报告**：自动那一侧没人在等答案（失败记进状态），手动那一侧要一句话
 * 给按钮。于是合成一个：流程一份，报告由 mode 与返回值决定。
 *
 * 这个文件不碰存储、也不碰宿主：状态与进度都走端口（TaskStorePort / ProgressPort），
 * 平台实例由装配层给。因此它能在 Node 里用假端口跑完整路径（见 test/round.test.ts）。
 *
 * 两处合并时定下来的行为，写在下面各自的注释里，不靠读代码猜：
 *   1. 认领（本进程内的同步闸门）从模块级变量改成 runner 自己的字段——同一个进程里
 *      两个 runner 互不干扰，测试也不用靠顺序去清全局状态。
 *   2. runningSince 现在覆盖整轮（原先自动那一侧是**每个平台**一次 begin/finish）。
 *      原来在两个平台之间那一小段里，持久标记是空着的，另一个进程可以挤进来起第二轮；
 *      现在整轮持有它。这是修掉一个窗口，不是语义新加。
 *   3. 进度记录两个模式都做（原先只有自动那一侧记）。同一条流程就该留同样的痕迹；
 *      手动那一侧以前在界面上什么都不显示这件事，没有理由。
 */

import type { RunState, TaskState } from './model.ts';
import type { ConfigPort, PlatformTasks, ProgressPort, TaskStorePort } from './ports.ts';
import { beginPlatform, completeItem, enterItem, finishPlatform } from './progress.ts';
import {
  beginRun,
  canStartRun,
  finishRun,
  recordRunFailure,
  setAwaitingLogin,
  touchRun,
} from './state.ts';

/** 失败的一项，原样交给载体去说。 */
export interface RunFailure {
  name: string;
  detail: string;
}

/** 一轮的结局。载体按它决定怎么呈现（消息响应、日志、退出码）。 */
export type RoundResult =
  /** 总开关关着。只有自动那一侧看它：手动执行是用户明确要求的，不看开关 */
  | { status: 'disabled' }
  | { status: 'rejected'; reason: 'ALREADY_RUNNING' }
  | { status: 'not-logged-in' }
  | { status: 'no-course' }
  | { status: 'nothing-to-do' }
  | { status: 'finished'; done: number; manual: number; failed: RunFailure[] }
  /** 一轮抛错。自动那一侧已把原因记进状态；手动那一侧由载体决定怎么报 */
  | { status: 'failed'; message: string };

export type RoundMode = 'auto' | 'manual';

export interface RoundDeps {
  /**
   * 本轮要跑的平台。
   *
   * 用函数而不是数组：每次运行现建实例，平台自己的「本轮状态」（计划、结果）就不会
   * 跨轮残留。有哪些平台由装配层决定，用例不知道。
   */
  platforms: () => PlatformTasks[];
  config: ConfigPort;
  tasks: TaskStorePort;
  progress: ProgressPort;
}

export interface Runner {
  /** 跑一轮。同一进程里并发调用时，后来者得到 ALREADY_RUNNING。 */
  runRound(mode: RoundMode): Promise<RoundResult>;
}

export function createRunner(deps: RoundDeps): Runner {
  /*
   * 本进程内的一轮认领。
   *
   * 跨进程的持久标记（state.ts 的 canStartRun）管不了同一进程内的并发：「查状态 →
   * 落状态」之间隔着网络 await，闹钟、登录变化与手动按钮都在同一个 worker 里，
   * 可以一起穿过那个窗口。这里补一道同步的。
   */
  let claimed = false;

  return {
    async runRound(mode: RoundMode): Promise<RoundResult> {
      const config = await deps.config.read();
      if (mode === 'auto' && !config.enabled) return { status: 'disabled' };

      const now = Date.now();
      if (!canStartRun(await deps.tasks.read(), now)) {
        return { status: 'rejected', reason: 'ALREADY_RUNNING' };
      }
      if (claimed) return { status: 'rejected', reason: 'ALREADY_RUNNING' };
      claimed = true;

      const heartbeat = async (): Promise<void> => {
        await deps.tasks.write(touchRun(await deps.tasks.read(), Date.now()));
      };
      const settle = async (next: (state: TaskState) => TaskState): Promise<void> => {
        await deps.tasks.write(next(await deps.tasks.read()));
      };
      const show = async (next: (state: RunState) => RunState): Promise<void> => {
        await deps.progress.publish(next(await deps.progress.snapshot()));
      };

      /*
       * 因登录挂起的结论先记在这里，收尾之后才落盘。
       *
       * finishRun 会把 awaitingLogin 一并清掉（它假定本轮正常结束），若在循环里落标记，
       * 会被本轮自己的收尾立刻抹掉——挂起就没人记得了。
       */
      let suspendedLogin = false;
      let noCourse = false;
      let done = 0;
      let manual = 0;
      const failed: RunFailure[] = [];

      await settle((state) => beginRun(state, now));
      try {
        try {
          for (const platform of deps.platforms()) {
            if (!(await platform.isReady())) {
              // 手动执行有人正在等答案：立刻告诉他去登录，别让他等一轮空跑
              if (mode === 'manual') return { status: 'not-logged-in' };
              suspendedLogin = true;
              continue;
            }
            await settle((state) => setAwaitingLogin(state, false));

            // 每一步之前刷新心跳：心跳过期会让界面把「正在跑」读成「上次没结束」
            await heartbeat();

            const plan = await platform.plan(now);
            if (plan.needsLogin === true) {
              if (mode === 'manual') return { status: 'not-logged-in' };
              suspendedLogin = true;
            }
            if (plan.blocked === 'no-course') {
              noCourse = true;
              continue;
            }

            // 需要人到场确认的项不在这里做：无人值守时做不了，硬做就是替用户承诺
            const queue = plan.items.filter((entry) => entry.mode === 'auto');
            manual += plan.items.length - queue.length;

            // 总数先落定，界面立刻能画出「0 / 7」
            await show((state) => beginPlatform(state, platform, queue.length, Date.now()));
            for (const item of queue) {
              const where = { course: item.group, title: item.title };
              await show((state) => enterItem(state, platform, where, Date.now()));
              // 长动作（课件上报）会把心跳传进去：它自己按平台节奏刷新
              const outcome = await platform.run(item, heartbeat);
              await show((state) =>
                completeItem(state, platform, where, outcome.status, outcome.message ?? '', Date.now()),
              );
              if (outcome.status === 'done') done += 1;
              if (outcome.status === 'failed') {
                failed.push({ name: item.title, detail: outcome.message ?? '平台拒绝了这次操作' });
              }
              await heartbeat();
            }
            await show((state) => finishPlatform(state, platform));
          }
        } finally {
          await settle((state) => finishRun(state, Date.now()));
        }

        // 收尾之后才落：finishRun 会清掉它，早落就没人记得了
        if (suspendedLogin) await settle((state) => setAwaitingLogin(state, true));

        if (mode === 'manual') {
          if (done === 0 && failed.length === 0 && manual === 0) {
            return noCourse ? { status: 'no-course' } : { status: 'nothing-to-do' };
          }
        }
        return { status: 'finished', done, manual, failed };
      } catch (error) {
        /*
         * 一轮的失败记下来，而不是向上抛。
         *
         * 自动那一侧的调用者是闹钟与登录事件，那里没有人在等一个答案；从前抛出去等于
         * 扔进 `.catch(() => undefined)`，于是「读不到课程」「会话已失效」「平台改了字段」
         * 三种情况在界面上都与「今天没有要做的事」一模一样。
         *
         * 手动那一侧有人在等：只在返回值里给，不写运行状态——那是自动执行的账。
         */
        const message = error instanceof Error ? error.message : String(error);
        if (mode === 'auto') await settle((state) => recordRunFailure(state, message, Date.now()));
        return { status: 'failed', message };
      } finally {
        claimed = false;
      }
    },
  };
}

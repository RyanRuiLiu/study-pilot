/*
 * 「跑一轮」这一个用例。
 *
 * 唯一能发起执行的是人：弹窗上的「立即执行」、课件页上的「快速完成」、命令行的 run。
 * 自动触发（启动、闹钟、登录补跑）已随自动执行一起删掉——这个用例因此只回答
 * 一件事：把选中范围内能做的做完，然后如实报告结果。
 *
 * 「选中范围」由调用方给：类别（kinds，取值由平台定义，本层不解释，只做字符串比较）
 * 与课程（group，就是 PlanItem.group）。不给就是全部。为什么筛选不在界面层做：
 * 界面不许认识平台字段，而「只做课件」「只做待办那几类」这类话必须由某一层
 * 把它翻译成对计划项的过滤——放这里，平台与界面都不用互相认识。
 *
 * 这个文件不碰存储、也不碰宿主：状态与进度都走端口（TaskStorePort / ProgressPort），
 * 平台实例由装配层给。因此它能在 Node 里用假端口跑完整路径（见 test/round.test.ts）。
 *
 * 并发有两个闸门，各管一段：
 *   本进程内的认领     runner 自己的字段。同一个进程里两个 runner 互不干扰
 *   跨进程的持久标记   canStartRun 读存储里的 runningSince
 *
 * 一条行为约定写在这，不靠读代码猜：runningSince 覆盖整轮。曾经（自动执行的年代）
 * 是每个平台一次 begin/finish，两个平台之间那一小段里持久标记是空着的，
 * 另一个进程可以挤进来起第二轮。整轮持有它修掉的是这个窗口，不是语义新加。
 */

import type { RunState, TaskState } from './model.ts';
import type { PlatformTasks, ProgressPort, TaskStorePort } from './ports.ts';
import { beginPlatform, completeItem, enterItem, finishPlatform } from './progress.ts';
import {
  beginRun,
  canStartRun,
  finishRun,
  recordRunFailure,
  touchRun,
} from './state.ts';

/** 失败的一项，原样交给载体去说。 */
export interface RunFailure {
  name: string;
  detail: string;
}

/** 执行范围。什么都不给表示全部。 */
export interface RunSelection {
  /** 只做这些类别。取值由平台定义，本层只做字符串比较 */
  kinds?: string[];
  /** 只做这个课程（即 PlanItem.group） */
  group?: string;
}

/** 一轮的结局。载体按它决定怎么呈现（消息响应、日志、退出码）。 */
export type RoundResult =
  | { status: 'rejected'; reason: 'ALREADY_RUNNING' }
  | { status: 'not-logged-in' }
  | { status: 'no-course' }
  | { status: 'nothing-to-do' }
  | { status: 'finished'; done: number; manual: number; failed: RunFailure[] }
  /** 一轮抛错。原因记进状态，同时也交给调用方怎么报 */
  | { status: 'failed'; message: string };

export interface RoundDeps {
  /**
   * 本轮要跑的平台。
   *
   * 用函数而不是数组：每次运行现建实例，平台自己的「本轮状态」（计划、结果）就不会
   * 跨轮残留。有哪些平台由装配层决定，用例不知道。
   */
  platforms: () => PlatformTasks[];
  tasks: TaskStorePort;
  progress: ProgressPort;
}

export interface Runner {
  /** 跑一轮。同一进程里并发调用时，后来者得到 ALREADY_RUNNING。 */
  runRound(selection?: RunSelection): Promise<RoundResult>;
}

/** 这一项在不在范围内。范围为空表示全都要。 */
function inSelection(item: { kind: string; group: string }, selection: RunSelection | undefined): boolean {
  if (selection === undefined) return true;
  if (selection.kinds !== undefined && !selection.kinds.includes(item.kind)) return false;
  if (selection.group !== undefined && item.group !== selection.group) return false;
  return true;
}

export function createRunner(deps: RoundDeps): Runner {
  /*
   * 本进程内的一轮认领。
   *
   * 跨进程的持久标记（state.ts 的 canStartRun）管不了同一进程内的并发：「查状态 →
   * 落状态」之间隔着网络 await，同一时刻的两个调用方都在同一个 worker 里，
   * 可以一起穿过那个窗口。这里补一道同步的。
   */
  let claimed = false;

  return {
    async runRound(selection?: RunSelection): Promise<RoundResult> {
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

      let noCourse = false;
      let done = 0;
      let manual = 0;
      const failed: RunFailure[] = [];

      await settle((state) => beginRun(state, now));
      try {
        try {
          for (const platform of deps.platforms()) {
            if (!(await platform.isReady())) {
              // 有人在等答案：立刻告诉他去登录，别让他等一轮空跑
              return { status: 'not-logged-in' };
            }

            // 每一步之前刷新心跳：心跳过期会让界面把「正在跑」读成「上次没结束」
            await heartbeat();

            const plan = await platform.plan(now);
            if (plan.needsLogin === true) return { status: 'not-logged-in' };
            if (plan.blocked === 'no-course') {
              noCourse = true;
              continue;
            }

            /*
             * 范围之内且能做的排进队列；范围内的其余项记进「待你处理」。
             *
             * 范围之外的项一律不提：点「快速完成课件」的人不该在结果里
             * 读到「还有几份作业要写」——他没问这个。
             */
            const scoped = plan.items.filter((item) => inSelection(item, selection));
            const queue = scoped.filter((entry) => entry.mode === 'auto');
            manual += scoped.length - queue.length;

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

        if (done === 0 && failed.length === 0 && manual === 0) {
          return noCourse ? { status: 'no-course' } : { status: 'nothing-to-do' };
        }
        return { status: 'finished', done, manual, failed };
      } catch (error) {
        /*
         * 一轮的失败记下来，同时也交给调用方。
         *
         * 记进状态那份给界面用（「上一次执行出了问题」在下次打开时还能看见）；
         * 返回值给正在等的人一句准确的话。两条都留，因为它们服务两个时刻。
         */
        const message = error instanceof Error ? error.message : String(error);
        await settle((state) => recordRunFailure(state, message, Date.now()));
        return { status: 'failed', message };
      } finally {
        claimed = false;
      }
    },
  };
}

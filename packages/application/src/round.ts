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

import type { RunSelection, RunState, TaskState } from './model.ts';
import type { PlatformTasks, ProgressPort, RunControl, TaskStorePort } from './ports.ts';
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
  /** 项的平台类别（PlanItem.kind）：载体的措辞按它分轻重（课件没上报不算失败） */
  kind: string;
  detail: string;
}

/** 一轮的结局。载体按它决定怎么呈现（消息响应、日志、退出码）。 */
export type RoundResult =
  | { status: 'rejected'; reason: 'ALREADY_RUNNING' }
  | { status: 'not-logged-in' }
  | { status: 'no-course' }
  | { status: 'nothing-to-do' }
  | {
      status: 'finished';
      done: number;
      manual: number;
      failed: RunFailure[];
      /** 人按了停止提前收的尾：done 是停下前做完的那部分 */
      stopped?: boolean;
    }
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
  /**
   * 请求停止正在跑的一轮。返回是否真有在跑的一轮（没有就什么都不做）。
   *
   * 语义是「不再有新的写」：项间的循环与长动作内部的安全点都会看到这个信号，
   * 下一个安全点即中断（安全点 = 即将发出写请求之前）。正在飞的请求让它落地，
   * 已完成的写不回退——一次提交停到一半，比多做一项危险得多。
   */
  stop(): boolean;
}

/** 这一项在不在范围内。范围为空表示全都要。 */
function inSelection(
  item: { id: string; kind: string; group: string },
  selection: RunSelection | undefined,
): boolean {
  if (selection === undefined) return true;
  if (selection.ids !== undefined && !selection.ids.includes(item.id)) return false;
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

  /** 「停止」按钮按过。每轮开始时复位；只在项间检查（见 Runner.stop 的说明）。 */
  let stopRequested = false;

  return {
    async runRound(selection?: RunSelection): Promise<RoundResult> {
      const now = Date.now();
      if (!canStartRun(await deps.tasks.read(), now)) {
        return { status: 'rejected', reason: 'ALREADY_RUNNING' };
      }
      if (claimed) return { status: 'rejected', reason: 'ALREADY_RUNNING' };
      claimed = true;
      stopRequested = false;

      const heartbeat = async (): Promise<void> => {
        await deps.tasks.write(touchRun(await deps.tasks.read(), Date.now()));
      };
      // 停止柄：长动作在安全点问它一句（见 Runner.stop 的说明）
      const control: RunControl = { stopped: () => stopRequested };
      const settle = async (next: (state: TaskState) => TaskState): Promise<void> => {
        await deps.tasks.write(next(await deps.tasks.read()));
      };
      const show = async (next: (state: RunState) => RunState): Promise<void> => {
        await deps.progress.publish(next(await deps.progress.snapshot()));
      };

      let noCourse = false;
      let done = 0;
      let manual = 0;
      let stopped = false;
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

            const plan = await platform.plan(now, selection);
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
              // 项间这道闸；长动作内部还有自己的安全点（control 一路传下去）
              if (stopRequested) {
                stopped = true;
                break;
              }
              const where = { course: item.group, title: item.title, kind: item.kind };
              await show((state) => enterItem(state, platform, where, Date.now()));
              // 长动作会一并拿到心跳与停止柄
              const outcome = await platform.run(item, heartbeat, control);
              await show((state) =>
                completeItem(state, platform, where, outcome.status, outcome.message ?? '', Date.now()),
              );
              if (outcome.status === 'done') done += 1;
              if (outcome.status === 'failed') {
                failed.push({
                  name: item.title,
                  kind: item.kind,
                  detail: outcome.message ?? '平台拒绝了这次操作',
                });
              }
              await heartbeat();
            }
            await show((state) => finishPlatform(state, platform));
            /*
             * 补认一次：最后一项执行期间按的停止没有「下一轮」可触发项间检查，
             * 不在这里认，整轮就会报成「完成 N 项」而不是「已停止」。
             */
            if (stopRequested) stopped = true;
            if (stopped) break;
          }
        } finally {
          await settle((state) => finishRun(state, Date.now()));
        }

        // 停过的一轮怎么都是「跑过」，不像无事可做
        if (stopped) return { status: 'finished', done, manual, failed, stopped };
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

    stop(): boolean {
      if (!claimed) return false;
      stopRequested = true;
      return true;
    },
  };
}

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
 * 并发按平台成对存在（平台任务相互独立）：
 *   本进程内的认领     runner 自己的字段（按平台），同一平台的两个调用方互斥
 *   跨进程的持久标记   canStartRun 按平台读存储里的 runningSince
 *   存储读改写         runner 内的串行队列——两平台同时在飞时，各自的状态写不互相踩
 *
 * 一条行为约定写在这，不靠读代码猜：每个平台的 begin/finish 成对覆盖它自己那一轮
 * （包括各种提前返回）；runningSince 是**该平台**的防重入标记，不是全局锁——
 * 智慧树在跑不占慕课的门。
 */

import type { RunFailureAction, RunSelection, RunState, TaskState } from './model.ts';
import type { PlatformTasks, ProgressPort, RunControl, TaskStorePort } from './ports.ts';
import { beginPlatform, completeItem, enterItem, finishPlatform } from './progress.ts';
import {
  beginRun,
  canStartRun,
  clearPlatformFailure,
  finishRun,
  recordPlatformFailure,
  touchRun,
} from './state.ts';

/**
 * 「这家没登录」的那一句。留痕与失败项共用一份：两处各写一遍，措辞会漂移。
 *
 * 句子里不写平台名：留痕是按平台存的、界面那一格本来就写着是哪一家。
 * 写进去会渲染成「上次执行失败：慕课：登录已失效…」——两个冒号。
 */
const SESSION_EXPIRED = '登录已失效，需重新登录';

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
  /** 跑一轮。同一进程里对同一平台并发调用时，后来者得到 ALREADY_RUNNING（平台之间互不影响）。 */
  runRound(selection?: RunSelection): Promise<RoundResult>;
  /**
   * 请求停止某平台正在跑的一轮。返回是否真有在跑的一轮（没有就什么都不做）。
   *
   * 按平台：一家的停止不打断另一家（平台任务相互独立）。语义是「不再有新的写」：
   * 项间的循环与长动作内部的安全点都会看到这个信号，下一个安全点即中断
   * （安全点 = 即将发出写请求之前）。正在飞的请求让它落地，已完成的写不回退——
   * 一次提交停到一半，比多做一项危险得多。
   */
  stop(platformId: string): boolean;
}

/** 这一项在不在范围内。范围为空表示全都要。 */function inSelection(
  item: { id: string; kind: string; group: string },
  selection: RunSelection | undefined,
): boolean {
  if (selection === undefined) return true;
  if (selection.ids !== undefined && !selection.ids.includes(item.id)) return false;
  if (selection.kinds !== undefined && !selection.kinds.includes(item.kind)) return false;
  if (selection.group !== undefined && item.group !== selection.group) return false;
  return true;
}

/**
 * 从抛出的错误上取「下一步」动作。
 *
 * 结构性约定（不是平台知识）：错误对象可以附一个
 * `action: { platformId, label, url }`，三个字段都是非空字符串就原样搬进状态
 * （界面据此给一个跳转钮）；否则当没有——壳只搬运，不解释，也不替平台兜底造句。
 */
function runFailureActionOf(error: unknown): RunFailureAction | null {
  if (typeof error !== 'object' || error === null) return null;
  const action = (error as { action?: unknown }).action;
  if (typeof action !== 'object' || action === null) return null;
  const { platformId, label, url } = action as { platformId?: unknown; label?: unknown; url?: unknown };
  if (typeof platformId !== 'string' || platformId.length === 0) return null;
  if (typeof label !== 'string' || label.length === 0) return null;
  if (typeof url !== 'string' || url.length === 0) return null;
  return { platformId, label, url };
}

export function createRunner(deps: RoundDeps): Runner {
  /*
   * 本进程内的认领（按平台）。
   *
   * 跨进程的持久标记（state.ts 的 canStartRun）管不了同一进程内的并发：「查状态 →
   * 落状态」之间隔着网络 await，同一时刻的两个调用方都在同一个 worker 里，
   * 可以一起穿过那个窗口。这里补一道同步的——认领是**按平台**的：
   * 一家在跑不占另一家的门（平台任务相互独立）。
   */
  const claimed = new Set<string>();

  /** 按下的停止（按平台）。每轮开始时清掉自己平台的那条；只在项间检查（见 Runner.stop）。 */
  const stopRequests = new Set<string>();

  /*
   * 状态读改写的串行队列。
   *
   * 平台相互独立之后，两个平台的轮次可能同时在飞；两份「读 → 改 → 写」
   * 交错会丢更新（后写的赢）。队列保证每一次读改写原子地执行——存储端口
   * 本身不需要锁，这一层就是锁。
   */
  let tail: Promise<unknown> = Promise.resolve();
  const serialize = <T>(task: () => Promise<T>): Promise<T> => {
    const next = tail.then(task, task);
    tail = next.catch(() => undefined);
    return next;
  };

  return {
    async runRound(selection?: RunSelection): Promise<RoundResult> {
      const all = deps.platforms();
      const targets =
        selection?.platformId !== undefined
          ? all.filter((platform) => platform.id === selection.platformId)
          : all;

      /*
       * 点名的平台不存在（id 拼错，或这个载体根本没装这家）必须说清楚。
       * 放它走下去，结局是「没有可执行的事项」——用户会以为这家真的无事可做。
       */
      if (selection?.platformId !== undefined && targets.length === 0) {
        return {
          status: 'failed',
          message:
            all.length === 0
              ? '这个载体没有装任何平台'
              : `不认识的平台 id：${selection.platformId}（可用的：${all.map((platform) => platform.id).join(' / ')}）`,
        };
      }

      const now = Date.now();
      const snapshot = await deps.tasks.read();
      for (const platform of targets) {
        if (!canStartRun(snapshot, platform.id, now) || claimed.has(platform.id)) {
          return { status: 'rejected', reason: 'ALREADY_RUNNING' };
        }
      }
      for (const platform of targets) {
        claimed.add(platform.id);
        stopRequests.delete(platform.id);
      }

      const settle = (next: (state: TaskState) => TaskState): Promise<void> =>
        serialize(async () => {
          await deps.tasks.write(next(await deps.tasks.read()));
        });
      const show = (next: (state: RunState) => RunState): Promise<void> =>
        serialize(async () => {
          await deps.progress.publish(next(await deps.progress.snapshot()));
        });

      let noCourse = false;
      let done = 0;
      let manual = 0;
      let stopped = false;
      const failed: RunFailure[] = [];
      /** 这一轮里「这家需要先登录」的平台。不当场返回，见循环后的汇总。 */
      const loginBlocked: PlatformTasks[] = [];
      /** 此刻在跑哪个平台：抛错时给失败归属用（平台自己给的 action.platformId 优先）。 */
      let currentPlatform: PlatformTasks | null = null;

      try {
        for (const platform of all) {
          // 范围里点名了平台时，其余平台整家跳过（界面每次执行都点名）
          if (selection?.platformId !== undefined && platform.id !== selection.platformId) continue;
          currentPlatform = platform;

          /** 停止柄与心跳都按平台走：一家的停止不打断另一家（见 Runner.stop 的说明）。 */
          const control: RunControl = { stopped: () => stopRequests.has(platform.id) };
          const heartbeat = (): Promise<void> =>
            serialize(async () => {
              await deps.tasks.write(touchRun(await deps.tasks.read(), platform.id, Date.now()));
            });

          // 该平台的一轮：begin → …… → finally finish（走哪种提前返回都不留残标记）
          await settle((state) => beginRun(state, platform.id, Date.now()));
          try {
            /*
             * 一家没登录不拦另一家。这里原来是整轮 `return`：前面平台已经做完的项、
             * 已经攒下的失败全跟着丢，而排在后面的平台连一次都不试——两家都配好的时候，
             * 一门课的会话过期就把另一门课的整轮变成一句笼统的「未登录」。
             * 改成记下这一家、走完循环再汇总（只剩一家时结局与原来一致）。
             */
            if (!(await platform.isReady())) {
              loginBlocked.push(platform);
              continue;
            }

            // 每一步之前刷新心跳：心跳过期会让界面把「正在跑」读成「上次没结束」
            await heartbeat();

            /*
             * 时刻按家取，不用整轮开头那个：第二轮 plan 可能已经是几分钟后，
             * 拿过期时刻判「截止/过期/待办保留天数」会一家对一家错。
             */
            const plan = await platform.plan(Date.now(), selection);
            if (plan.needsLogin === true) {
              loginBlocked.push(platform);
              continue;
            }
            // 计划是本轮最长的一段网络读取，回来先补一次心跳再往下走
            await heartbeat();
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
            /** 这一轮在这家做出的失败数：决定它过去的留痕该不该清 */
            let failedHere = 0;
            for (const item of queue) {
              // 项间这道闸；长动作内部还有自己的安全点（control 一路传下去）
              if (control.stopped()) {
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
                failedHere += 1;
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
             * 这家跑完了（队列正常走完）：它过去的失败留痕已经被这一轮的结果取代。
             * 半途停止不算「交代过」——不在这里清（下一次干净的一轮会清）。
             * 这一轮自己就做出了失败的项也不算交代过：留着它，界面的「上次执行出了
             * 问题」才说得出刚发生的事，而不是把证据擦掉。
             */
            if (!control.stopped() && failedHere === 0) {
              await settle((state) => clearPlatformFailure(state, platform.id));
            }
            /*
             * 补认一次：最后一项执行期间按的停止没有「下一轮」可触发项间检查，
             * 不在这里认，整轮就会报成「完成 N 项」而不是「已停止」。
             */
            if (control.stopped()) stopped = true;
            if (stopped) break;
          } finally {
            await settle((state) => finishRun(state, platform.id, Date.now()));
          }
        }

        /*
         * 「这家要先登录」在这里说话，而且只在它自己那一格里说：
         *   全都堵着、这轮什么都没做成 → 仍报「未登录」，界面那个「去登录」入口照旧
         *     （只点名一家、而它那一家没登录时，结局与改动前一致）；
         *   只堵住一部分 → 如实报这一轮做出来的部分，并给每家各自留下失败留痕，
         *     不让一句笼统的「未登录」盖掉另一家已经做完的结果。
         */
        if (loginBlocked.length > 0) {
          for (const platform of loginBlocked) {
            await settle((state) =>
              recordPlatformFailure(state, platform.id, SESSION_EXPIRED, Date.now()),
            );
          }
          if (
            loginBlocked.length === targets.length &&
            done === 0 &&
            manual === 0 &&
            failed.length === 0
          ) {
            return { status: 'not-logged-in' };
          }
          for (const platform of loginBlocked) {
            failed.push({ name: platform.name, kind: 'session', detail: SESSION_EXPIRED });
          }
        }

        // 停过的一轮怎么都是「跑过」，不像无事可做
        if (stopped) return { status: 'finished', done, manual, failed, stopped };
        if (done === 0 && failed.length === 0 && manual === 0) {
          return noCourse ? { status: 'no-course' } : { status: 'nothing-to-do' };
        }
        return { status: 'finished', done, manual, failed };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        /*
         * 抛错中止时先把范围内各平台的进度卡收尾。
         *
         * 正常路径的 finishPlatform 在循环里逐家跑；抛错把循环直接打断，
         * 那一步就永远不执行——界面会停在「正在执行」，而这一轮已经死了
         * （实测：智慧树 -12 中止后，进度卡挂着 running）。收尾用 {id,name}
         * 轻对象即可：finishPlatform 按 id 归位，不依赖平台实例。
         * 平台自己的运行标记由上面那层 finally 收（begin/finish 成对）。
         *
         * 收尾的写自己也可能失败（存储坏了）。那时也不能让它把这一轮变成一个
         * rejection：runRound 的契约是「必返 RoundResult」，命令行那边没有兜底捕获，
         * 而本轮的失败原因已经拿到手了——进度卡收不回来是界面下一步的事。
         */
        try {
          for (const platform of all) {
            if (selection?.platformId !== undefined && platform.id !== selection.platformId) continue;
            await show((state) => finishPlatform(state, { id: platform.id, name: platform.name }));
          }
          /*
           * 一轮的失败记下来（按平台），同时也交给调用方。
           *
           * 归属：平台自己给的 action.platformId 最可信；其次「此刻在跑的平台」；
           * 还没有进到任何平台就抛了（罕见）就取选择里点名的平台；都无 → 不落平台表，
           * 只把消息交回给调用方（不猜归属）。
           */
          const action = runFailureActionOf(error);
          const platformId = action?.platformId ?? currentPlatform?.id ?? selection?.platformId;
          if (platformId !== undefined) {
            await settle((state) => recordPlatformFailure(state, platformId, message, Date.now(), action));
          }
        } catch {
          // 收尾没做成也不改本轮结局：已经是失败了，再抛只会把原因换成「写存储时炸了」
        }
        return { status: 'failed', message };
      } finally {
        for (const platform of targets) claimed.delete(platform.id);
      }
    },

    stop(platformId: string): boolean {
      if (!claimed.has(platformId)) return false;
      stopRequests.add(platformId);
      return true;
    },
  };
}

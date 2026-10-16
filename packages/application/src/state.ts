/*
 * 跨次运行那一份状态的**迁移规则**（按平台独立）。
 *
 * 全是纯函数：状态进、状态出，不碰存储。存取由 `TaskStorePort` 负责（见 ports.ts），
 * 因此换载体时不会出现第二份状态机，测试也不用造假存储就能把每种迁移钉住。
 *
 * 每个平台各记一份运行状态（键 = PlatformTasks.id）：
 *   runningSince   该平台这一轮的开始时刻（防重入用，不是断点——没做过的事不需要
 *                  「接着」，下次执行会重新读到它们）
 *   heartbeatAt    该平台的最近心跳（死/活判据）
 *   lastFinishedAt 该平台最近一次正常结束
 *   failure        该平台最近一次失败留痕（失败与「下一步」是平台级的事实）
 * 为什么按平台拆：平台之间相互独立——一家在跑不占另一家的门，各自的失败只呈现
 * 给自己家、也只由自己家跑完一轮来清。同一份存储上并发轮次的读改写由用例层
 * 串行化（round.ts 的队列），存储端口本身不需要锁。
 *
 * 早先还记过「因未登录挂起」——那是自动执行的补做机制，触发已随自动执行一起
 * 删掉：现在未登录当场就答复调用方，没有「等登录后补一次」这回事。
 */

import type { LiveRunState, PlatformRunState, RunFailureAction, TaskState } from './model.ts';

/** 空状态。首次运行与「这个平台还没跑过」都用它。 */
export const EMPTY_STATE: TaskState = { platforms: {} };

/** 一个平台还没出现过时的默认运行状态（只读底座；一切写入都换新对象）。 */
const EMPTY_PLATFORM: PlatformRunState = {
  runningSince: null,
  heartbeatAt: null,
  lastFinishedAt: null,
  failure: null,
};

/**
 * 把任意的存储值（旧版本的、手写的、缺字段的）归一成当前形状。
 *
 * 显式取形状：旧版本留下的顶层字段（拿 runningSince/lastError 那代）不入内；
 * 平台条目缺字段以空底座补齐。载体只负责把存储里的值原样递进来。
 */
export function normalizeTaskState(stored: unknown): TaskState {
  const raw = (stored ?? {}) as { platforms?: Record<string, Partial<PlatformRunState>> };
  const platforms: Record<string, PlatformRunState> = {};
  for (const [id, entry] of Object.entries(raw.platforms ?? {})) {
    platforms[id] = { ...EMPTY_PLATFORM, ...(entry ?? {}) };
  }
  return { platforms };
}

/** 取某平台的运行状态；没出现过按空值算（不预先造条目）。 */
function stateOf(state: TaskState, platformId: string): PlatformRunState {
  return state.platforms[platformId] ?? EMPTY_PLATFORM;
}

/** 换掉某平台的运行状态（整体换新，不改旧对象）。 */
function withPlatform(state: TaskState, platformId: string, next: PlatformRunState): TaskState {
  return { ...state, platforms: { ...state.platforms, [platformId]: next } };
}

/**
 * 心跳超时。
 *
 * 取两分钟：单个动作（一次接口调用）通常几秒内返回，一轮完整执行里
 * 每一步之前都会刷新心跳，两分钟没动静只能是线程已经不在了。
 * 宁可多等一会儿也不要误报中断——误报会让用户以为扩展坏了。
 */
const HEARTBEAT_TIMEOUT_MS = 120_000;

/**
 * 由持久状态推出「该平台此刻在做什么」。
 *
 * 这是**唯一**的判据：界面不自己拿 `runningSince !== null` 去猜。
 * 曾经弹窗就是这么猜的，于是浏览器被强杀之后，那个残留标记让弹窗一直
 * 显示「正在执行」，而实际什么都不会发生——状态与显示分离，用户无从判断。
 */
export function liveRunState(state: TaskState, platformId: string, now: number = Date.now()): LiveRunState {
  const platform = stateOf(state, platformId);
  if (platform.runningSince === null) return 'idle';

  const beat = platform.heartbeatAt ?? platform.runningSince;
  return now - beat <= HEARTBEAT_TIMEOUT_MS ? 'running' : 'interrupted';
}

/**
 * 该平台此刻是否可以开始一轮执行。
 *
 * 只有「确实还在跑」才拦得住。中断的那一轮不算：它的线程早就不在了。
 * 判据曾经写成 `runningSince === null`，于是浏览器被强杀一次之后，那个没人
 * 清的残留标记会把执行永久锁死——每次点执行都回 ALREADY_RUNNING，
 * 而界面还在说「正在执行」。现在与界面共用 `liveRunState` 这一个判据。
 */
export function canStartRun(state: TaskState, platformId: string, now: number = Date.now()): boolean {
  return liveRunState(state, platformId, now) !== 'running';
}

/** 标记该平台本轮开始。同时落下第一次心跳。 */
export function beginRun(state: TaskState, platformId: string, now: number = Date.now()): TaskState {
  return withPlatform(state, platformId, { ...stateOf(state, platformId), runningSince: now, heartbeatAt: now });
}

/**
 * 刷新该平台的心跳。执行过程中每一步之前调用，说明这一轮还活着。
 *
 * 已经结束的轮次不再续：一个迟到的回调不该把一个中断的标记又写活。
 */
export function touchRun(state: TaskState, platformId: string, now: number = Date.now()): TaskState {
  const platform = stateOf(state, platformId);
  if (platform.runningSince === null) return state;
  return withPlatform(state, platformId, { ...platform, heartbeatAt: now });
}

/** 标记该平台本轮结束。心跳一并清掉，免得下一轮被读成「还在跑」。 */
export function finishRun(state: TaskState, platformId: string, now: number = Date.now()): TaskState {
  return withPlatform(state, platformId, {
    ...stateOf(state, platformId),
    runningSince: null,
    heartbeatAt: null,
    lastFinishedAt: now,
    // 失败留痕不在这里清：由「该平台自己跑完一轮」来清（见 clearPlatformFailure）
  });
}

/**
 * 记下某平台这一轮的失败（连带「下一步」动作与时刻）。
 * 替换该平台此前那条；其它平台的状态不动。
 *
 * 后台跑在没有控制台可看的地方（生产构建把 console 换成空函数）。不记下来的话，
 * 「什么都没做」与「试了但失败了」在界面上完全一样，而后者用户本来可以当场处理
 * （完成验证、重新登录、去设置里补地址）。
 */
export function recordPlatformFailure(
  state: TaskState,
  platformId: string,
  message: string,
  now: number = Date.now(),
  action: RunFailureAction | null = null,
): TaskState {
  return withPlatform(state, platformId, {
    ...stateOf(state, platformId),
    failure: { message, action, at: now },
    lastFinishedAt: now,
  });
}

/**
 * 清掉某平台的失败留痕（该平台刚跑完一轮、没有失败）。
 * 没有留痕时原样返回同一对象——与 touchRun 同一先例：无变化就不落盘。
 */
export function clearPlatformFailure(state: TaskState, platformId: string): TaskState {
  const platform = stateOf(state, platformId);
  if (platform.failure === null) return state;
  return withPlatform(state, platformId, { ...platform, failure: null });
}

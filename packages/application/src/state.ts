/*
 * 跨次运行那一份状态的**迁移规则**。
 *
 * 全是纯函数：状态进、状态出，不碰存储。存取由 `TaskStorePort` 负责（见 ports.ts），
 * 因此换载体时不会出现第二份状态机，测试也不用造假存储就能把每种迁移钉住。
 *
 * 只保留两件事：
 *   runningSince   这一轮的开始时刻（防重入用，不是断点——没做过的事不需要
 *                  「接着」，下一轮检查会重新读到它们）
 *   awaitingLogin  是否因未登录而挂起，等登录后补一次
 *
 * 早先还记过 lastRunDate、doneTids、pending 三样，现在都不需要了：执行与否由
 * 「这次读回来有没有可自动完成的项」决定，而每次都会重新读，所以「今天跑过没有」
 * 不再是一个有意义的判据——它只会让新发布的作业在当天被跳过。同理，做过哪些
 * 也不必记，下一轮检查自然看不到它们。
 */

import type { LiveRunState, TaskState } from './model.ts';

/** 空状态。首次运行与「这个平台还没跑过」都用它。 */
export const EMPTY_STATE: TaskState = {
  runningSince: null,
  heartbeatAt: null,
  lastFinishedAt: null,
  awaitingLogin: false,
  lastError: null,
};

/**
 * 心跳超时。
 *
 * 取两分钟：单个动作（一次接口调用）通常几秒内返回，一轮完整执行里
 * 每一步之前都会刷新心跳，两分钟没动静只能是线程已经不在了。
 * 宁可多等一会儿也不要误报中断——误报会让用户以为扩展坏了。
 */
export const HEARTBEAT_TIMEOUT_MS = 120_000;

/**
 * 由持久状态推出「此刻在做什么」。
 *
 * 这是**唯一**的判据：界面不自己拿 `runningSince !== null` 去猜。
 * 曾经弹窗就是这么猜的，于是浏览器被强杀之后，那个残留标记让弹窗一直
 * 显示「正在执行」，而实际什么都不会发生——状态与显示分离，用户无从判断。
 */
export function liveRunState(state: TaskState, now: number = Date.now()): LiveRunState {
  if (state.runningSince === null) {
    return state.awaitingLogin ? 'awaiting-login' : 'idle';
  }

  const beat = state.heartbeatAt ?? state.runningSince;
  return now - beat <= HEARTBEAT_TIMEOUT_MS ? 'running' : 'interrupted';
}

/**
 * 此刻是否可以开始一次自动执行。
 *
 * 只有「确实还在跑」才拦得住。中断的那一轮不算：它的线程早就不在了。
 * 判据曾经写成 `runningSince === null`，于是浏览器被强杀一次之后，那个没人
 * 清的残留标记会把后台永久锁死——每一轮 alarm 静默返回、手动执行永远回
 * ALREADY_RUNNING，而界面还在说「下次检查时接着做」。现在与界面共用
 * `liveRunState` 这一个判据，两边不会对同一份存储各说一套。
 */
export function canStartRun(state: TaskState, now: number = Date.now()): boolean {
  return liveRunState(state, now) !== 'running';
}

/** 标记本轮开始。同时落下第一次心跳。 */
export function beginRun(state: TaskState, now: number = Date.now()): TaskState {
  return { ...state, runningSince: now, heartbeatAt: now };
}

/**
 * 刷新心跳。执行过程中每一步之前调用，说明这一轮还活着。
 *
 * 已经结束的轮次不再续：一个迟到的回调不该把一个中断的标记又写活。
 */
export function touchRun(state: TaskState, now: number = Date.now()): TaskState {
  if (state.runningSince === null) return state;
  return { ...state, heartbeatAt: now };
}

/** 标记本轮结束。心跳一并清掉，免得下一轮被读成「还在跑」。 */
export function finishRun(state: TaskState, now: number = Date.now()): TaskState {
  return {
    ...state,
    runningSince: null,
    heartbeatAt: null,
    lastFinishedAt: now,
    awaitingLogin: false,
    // 这一轮正常结束了：上一轮的失败已经被它取代
    lastError: null,
  };
}

/**
 * 记下这一轮的失败原因。
 *
 * 自动执行跑在没有控制台可看的地方（生产构建把 console 换成空函数），
 * 也没有正在等的界面。不记下来的话，「今天什么都没做」与「试了但失败了」
 * 在界面上完全一样，而后者用户本来可以当场处理（重新登录、去设置里补地址）。
 */
export function recordRunFailure(state: TaskState, message: string, now: number = Date.now()): TaskState {
  return { ...state, lastError: message, lastFinishedAt: now };
}

/**
 * 标记或清除「因未登录而挂起」。
 *
 * 值没变就原样返回：调用方据此可以跳过一次无用的落盘（载体侧就是这么用的）。
 */
export function setAwaitingLogin(state: TaskState, value: boolean): TaskState {
  if (state.awaitingLogin === value) return state;
  return { ...state, awaitingLogin: value };
}

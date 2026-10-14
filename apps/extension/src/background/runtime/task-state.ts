/*
 * 后台任务的持久状态（存在 browser.storage.local 里）。
 *
 * 只保留两件事：
 *   runningSince   这一轮的开始时刻（防重入用，不是断点——没做过的事不需要
 *                  「接着」，下一轮检查会重新读到它们）
 *   awaitingLogin  是否因未登录而挂起，等登录后补一次
 *
 * 早先还记过 lastRunDate、doneTids、pending 三样，现在都不需要了：
 * 执行与否由「这次读回来有没有可自动完成的项」决定，而每次都会重新读，
 * 所以「今天跑过没有」不再是一个有意义的判据——它只会让新发布的作业
 * 在当天被跳过。同理，做过哪些也不必记，下一轮检查自然看不到它们。
 *
 * 判据不在这里：`scheduler.ts` 只把这份状态读成结论，因此它是纯的、可直接测。
 */

import { KEYS } from '../../keys.ts';
import type { TaskState } from '../../protocol.ts';

const STATE_KEY = KEYS.taskState;

/** 跨次运行保留的状态。 */
export const EMPTY_STATE: TaskState = {
  runningSince: null,
  heartbeatAt: null,
  lastFinishedAt: null,
  awaitingLogin: false,
  lastError: null,
};

// ---------- 状态读写 ----------

function storageArea() {
  return browser.storage.local;
}

async function readState(): Promise<TaskState> {
  const raw = await storageArea().get(STATE_KEY);
  return { ...EMPTY_STATE, ...((raw[STATE_KEY] as Partial<TaskState> | undefined) ?? {}) };
}

async function writeState(state: TaskState): Promise<void> {
  await storageArea().set({ [STATE_KEY]: state });
}

export async function getTaskState(): Promise<TaskState> {
  return readState();
}

/** 标记本轮开始。同时落下第一次心跳。 */
export async function beginRun(now: number = Date.now()): Promise<void> {
  const state = await readState();
  await writeState({ ...state, runningSince: now, heartbeatAt: now });
}

/**
 * 刷新心跳。执行过程中每一步之前调用，说明这一轮还活着。
 *
 * 已经结束的轮次不再续：一个迟到的回调不该把一个中断的标记又写活。
 */
export async function touchRun(now: number = Date.now()): Promise<void> {
  const state = await readState();
  if (state.runningSince === null) return;
  await writeState({ ...state, heartbeatAt: now });
}

/** 标记本轮结束。心跳一并清掉，免得下一轮被读成「还在跑」。 */
export async function finishRun(now: number = Date.now()): Promise<void> {
  const state = await readState();
  await writeState({
    ...state,
    runningSince: null,
    heartbeatAt: null,
    lastFinishedAt: now,
    awaitingLogin: false,
    // 这一轮正常结束了：上一轮的失败已经被它取代
    lastError: null,
  });
}

/**
 * 记下这一轮的失败原因。
 *
 * 自动执行跑在 service worker 里：没有可看的控制台（生产构建把 console 换成
 * 空函数），也没有正在等的界面。不记下来的话，「今天什么都没做」与
 * 「试了但失败了」在界面上完全一样，而后者用户本来可以当场处理
 * （重新登录、去设置里补地址）。
 */
export async function recordRunFailure(message: string, now: number = Date.now()): Promise<void> {
  const state = await readState();
  await writeState({ ...state, lastError: message, lastFinishedAt: now });
}

/** 标记本轮因未登录而挂起。 */
export async function markAwaitingLogin(): Promise<void> {
  const state = await readState();
  await writeState({ ...state, awaitingLogin: true });
}

/** 清除挂起标记。 */
export async function clearAwaitingLogin(): Promise<void> {
  const state = await readState();
  if (!state.awaitingLogin) return;
  await writeState({ ...state, awaitingLogin: false });
}

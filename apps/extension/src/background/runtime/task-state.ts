/*
 * 跨次运行那一份状态的存取（载体侧）。
 *
 * 迁移规则在 @study-pilot/application 的 state.ts（纯函数）。这里只有两件事：
 *   1. 实现 TaskStorePort：整体读一份、整体写一份；
 *   2. 留几个顺手方法（beginRun / touchRun / …），它们就是「读 → 迁移 → 写」三行，
 *      规则一行都不在这。
 *
 * 没有存储项、直接读写 storage.local：状态是一个整体，必须拿到完整的一份再整体写回。
 */

import {
  EMPTY_STATE,
  beginRun as migrateBeginRun,
  finishRun as migrateFinishRun,
  recordRunFailure as migrateRecordRunFailure,
  setAwaitingLogin,
  touchRun as migrateTouchRun,
  type TaskState,
  type TaskStorePort,
} from '@study-pilot/application';
import { KEYS } from '../../keys.ts';

const STATE_KEY = KEYS.taskState;

function storageArea() {
  return browser.storage.local;
}

async function read(): Promise<TaskState> {
  const raw = await storageArea().get(STATE_KEY);
  return { ...EMPTY_STATE, ...((raw[STATE_KEY] as Partial<TaskState> | undefined) ?? {}) };
}

async function write(state: TaskState): Promise<void> {
  await storageArea().set({ [STATE_KEY]: state });
}

/** 状态端口：应用层与厂商适配器通过它读写，不直接碰存储。 */
export const taskStore: TaskStorePort = { read, write };

/** 供界面与外壳读当前状态。 */
export async function getTaskState(): Promise<TaskState> {
  return await read();
}

/** 标记本轮开始。同时落下第一次心跳。 */
export async function beginRun(now: number = Date.now()): Promise<void> {
  await write(migrateBeginRun(await read(), now));
}

/** 刷新心跳。已经结束的轮次不再续（规则见 state.ts）。 */
export async function touchRun(now: number = Date.now()): Promise<void> {
  await write(migrateTouchRun(await read(), now));
}

/** 标记本轮结束。 */
export async function finishRun(now: number = Date.now()): Promise<void> {
  await write(migrateFinishRun(await read(), now));
}

/** 记下这一轮的失败原因。 */
export async function recordRunFailure(message: string, now: number = Date.now()): Promise<void> {
  await write(migrateRecordRunFailure(await read(), message, now));
}

/** 标记本轮因未登录而挂起。 */
export async function markAwaitingLogin(): Promise<void> {
  await write(setAwaitingLogin(await read(), true));
}

/** 清除挂起标记。值没变就不落盘。 */
export async function clearAwaitingLogin(): Promise<void> {
  const current = await read();
  const next = setAwaitingLogin(current, false);
  if (next !== current) await write(next);
}

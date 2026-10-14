/*
 * 跨次运行那一份状态的存取（载体侧）。
 *
 * 迁移规则在 @study-pilot/application 的 state.ts（纯函数）。这里只有两件事：
 *   1. 实现 TaskStorePort：整体读一份、整体写一份；
 *   2. 给外壳留两个读/写口：读当前状态（界面与登录触发要看），记一次失败
 *      （监听器注册失败时唯一的可见处）。
 * 其余「读 → 迁移 → 写」的组合都在用例里（round.ts），载体不再各留一份。
 *
 * 没有存储项、直接读写 storage.local：状态是一个整体，必须拿到完整的一份再整体写回。
 */

import {
  EMPTY_STATE,
  recordRunFailure as migrateRecordRunFailure,
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

/** 状态端口：应用层通过它读写，不直接碰存储。 */
export const taskStore: TaskStorePort = { read, write };

/** 供界面与外壳读当前状态。 */
export async function getTaskState(): Promise<TaskState> {
  return await read();
}

/** 记下失败原因。入口侧监听器注册失败时用它——那是用户唯一能看见的地方。 */
export async function recordRunFailure(message: string, now: number = Date.now()): Promise<void> {
  await write(migrateRecordRunFailure(await read(), message, now));
}

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
  SHELL_PLATFORM_ID,
  normalizeTaskState,
  recordPlatformFailure as migrateRecordPlatformFailure,
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
  // 归一在应用层（迁移规则一处写）；存储里是什么都接得住
  return normalizeTaskState(raw[STATE_KEY]);
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

/** 记下外壳自己的失败（入口侧监听器注册失败时用）。非平台事件记在 SHELL_PLATFORM_ID 名下。 */
export async function recordRunFailure(message: string, now: number = Date.now()): Promise<void> {
  await write(migrateRecordPlatformFailure(await read(), SHELL_PLATFORM_ID, message, now));
}

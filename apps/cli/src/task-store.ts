/*
 * 跨次运行状态的存储（命令行载体）。
 *
 * 迁移规则在 @study-pilot/application 的 state.ts；这里只把它落到一个 JSON 文件上。
 *
 * 命令行为什么需要它：进程跑完就退，而「上一轮是不是没跑完」（中断判定）、
 * 「上一轮的失败原因」都跨次保留才有意义。读出来一律以 EMPTY_STATE 为骨架补齐，
 * 文件可能是手写的、旧版本的、缺字段的。
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { EMPTY_STATE, type TaskState, type TaskStorePort } from '@study-pilot/application';

export function createFileTaskStore(file: string): TaskStorePort {
  return {
    read: async () => {
      if (!existsSync(file)) return { ...EMPTY_STATE };
      const stored = JSON.parse(readFileSync(file, 'utf8')) as Partial<TaskState>;
      return { ...EMPTY_STATE, ...stored };
    },
    write: async (state) => {
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, `${JSON.stringify(state, null, 2)}\n`);
    },
  };
}

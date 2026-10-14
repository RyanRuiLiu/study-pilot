/*
 * 配置文件（命令行载体的 ConfigPort）。
 *
 * 形状、默认值与规范化都在 @study-pilot/application；这里只把它落到一个 JSON 文件上。
 * 读进来一律经过 normalize：文件可能是手写的、旧版本的、缺字段的，规范化负责补齐；
 * 写出去按「先合并再规范化」走，因此手改过的字段不会被一次 update 抹掉。
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import {
  DEFAULT_SETTINGS,
  mergeWithBase,
  normalize,
  type ConfigPort,
  type Settings,
} from '@study-pilot/application';

export function createFileConfigStore(file: string): ConfigPort {
  const read = (): Settings =>
    existsSync(file) ? normalize(JSON.parse(readFileSync(file, 'utf8'))) : normalize(DEFAULT_SETTINGS);

  return {
    read: async () => read(),
    update: async (patch) => {
      const next = normalize(mergeWithBase(read(), patch));
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, `${JSON.stringify(next, null, 2)}\n`);
      return next;
    },
  };
}

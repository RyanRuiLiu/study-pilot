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
  /*
   * 读不进去要说清是哪个文件、能怎么补救。裸的 JSON.parse 报错（「Unexpected token o…」）
   * 只说了解析失败，不说失败在谁身上——配置文件就在 .probe/ 里，多半是手改过的。
   */
  const read = (): Settings => {
    if (!existsSync(file)) return normalize(DEFAULT_SETTINGS);
    let parsed: unknown;
    try {
      parsed = JSON.parse(readFileSync(file, 'utf8'));
    } catch (error) {
      throw new Error(
        `配置文件不是合法 JSON：${file}（修好这一份，或删掉它重新跑 courses 勾选）——` +
          `${error instanceof Error ? error.message : String(error)}`,
      );
    }
    return normalize(parsed);
  };

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

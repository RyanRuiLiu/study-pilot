/**
 * 配置读写。
 *
 * 存储里可能躺着任何历史形状的数据（旧版本、手工改坏的、半写入的），
 * 所以读取时一律以 {@link DEFAULT_SETTINGS} 为骨架做深合并：
 *   - 缺字段 → 补默认值
 *   - 多字段 → 丢弃（schema 是唯一权威，脏字段不跟着代码走）
 *   - 类型不符 → 回退默认值，而不是把脏数据喂给业务代码
 */

import { storage } from 'wxt/utils/storage';
import { DEFAULT_SETTINGS, SETTINGS_VERSION, type Settings } from './schema';

const item = storage.defineItem<Settings>('local:study-pilot-settings', {
  fallback: DEFAULT_SETTINGS,
});

/**
 * 以 `base` 为骨架合并 `patch`。
 *
 * - 对象：逐键递归，只保留 `base` 里存在的键
 * - 数组：整体替换（课程列表是用户数据，不做逐项合并）
 * - 原始值：类型一致才采纳
 */
function mergeWithBase<T>(base: T, patch: unknown): T {
  if (patch === null || patch === undefined) return base;

  if (Array.isArray(base)) {
    return (Array.isArray(patch) ? patch : base) as T;
  }

  if (typeof base === 'object' && base !== null) {
    if (typeof patch !== 'object' || patch === null || Array.isArray(patch)) return base;
    const source = patch as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(base as Record<string, unknown>)) {
      out[key] = mergeWithBase(value, source[key]);
    }
    return out as T;
  }

  return (typeof patch === typeof base ? patch : base) as T;
}

/** 把任意来源的数据规范成合法配置。 */
export function normalize(raw: unknown): Settings {
  const merged = mergeWithBase(DEFAULT_SETTINGS, raw);
  return { ...merged, version: SETTINGS_VERSION };
}

export async function getSettings(): Promise<Settings> {
  return normalize(await item.getValue());
}

/** 整体写入（写入前会先规范化）。 */
export async function saveSettings(next: Settings): Promise<Settings> {
  const normalized = normalize(next);
  await item.setValue(normalized);
  return normalized;
}

/** 局部更新：传入的部分结构会合并到当前配置上。 */
export async function updateSettings(patch: unknown): Promise<Settings> {
  const current = await getSettings();
  return saveSettings(mergeWithBase(current, patch));
}

export async function resetSettings(): Promise<Settings> {
  await item.setValue(DEFAULT_SETTINGS);
  return DEFAULT_SETTINGS;
}

/** 订阅配置变化，返回取消订阅函数。 */
export function watchSettings(listener: (next: Settings) => void): () => void {
  return item.watch((value) => listener(normalize(value)));
}

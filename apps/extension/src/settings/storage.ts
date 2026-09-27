/**
 * 配置读写。
 *
 * 配置的形状、默认值与规范化都在 ./schema.ts，这里只负责让它落到存储上：
 * 读、写、订阅。
 *
 * 分开的理由是可测。规范化是纯逻辑，测试要能直接调它；而这个文件顶层会
 * 建立存储项（读 browser.runtime），导入即产生副作用，测试环境里会直接抛错。
 * 两者放在一起，纯逻辑就跟着一起不可测了。
 *
 * 存储里可能躺着任何历史形状的数据（旧版本、手工改坏的、半写入的），
 * 读取时一律以 DEFAULT_SETTINGS 为骨架做深合并，见 normalize。
 */

import { storage } from 'wxt/utils/storage';
import { DEFAULT_SETTINGS, mergeWithBase, normalize, type Settings } from './schema';

const item = storage.defineItem<Settings>('local:study-pilot-settings', {
  fallback: DEFAULT_SETTINGS,
});

export async function getSettings(): Promise<Settings> {
  return normalize(await item.getValue());
}

/** 整体写入（写入前会先规范化）。 */
export async function saveSettings(next: Settings): Promise<Settings> {
  const normalized = normalize(next);
  await item.setValue(normalized);
  return normalized;
}

/** 局部更新：传入的部分结构会深合并到当前配置上。 */
export async function updateSettings(patch: unknown): Promise<Settings> {
  const current = await getSettings();
  return saveSettings(mergeWithBase(current, patch));
}

/**
 * 恢复默认设置。
 *
 * 写入与返回的都是 `normalize` 出来的**副本**，不是 DEFAULT_SETTINGS 本身。
 *
 * 调用方拿到返回值后会直接改它——设置页每个控件都是就地赋值再落盘，这是
 * 既有的做法。若这里把模块级常量交出去，用户恢复默认之后随手改任意一项，
 * 改的就是常量本身；之后同一次会话里再点「恢复默认设置」，恢复出来的
 * 是他刚改过的值，fallback 与评语兜底也跟着一起变。给副本就没这回事。
 */
export async function resetSettings(): Promise<Settings> {
  const next = normalize(DEFAULT_SETTINGS);
  await item.setValue(next);
  return next;
}

/** 订阅配置变化，返回取消订阅函数。 */
export function watchSettings(listener: (next: Settings) => void): () => void {
  return item.watch((value) => listener(normalize(value)));
}

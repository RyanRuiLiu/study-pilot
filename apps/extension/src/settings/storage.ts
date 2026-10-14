/**
 * 配置读写。
 *
 * 配置的形状、默认值与规范化都在 @study-pilot/application（config/），
 * 这里只负责让它落到存储上：
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
import { KEYS } from '../keys.ts';
import {
  DEFAULT_SETTINGS,
  mergeWithBase,
  normalize,
  type ConfigPort,
  type Settings,
} from '@study-pilot/application';

const item = storage.defineItem<Settings>(KEYS.settings, {
  fallback: DEFAULT_SETTINGS,
});

export async function getSettings(): Promise<Settings> {
  return normalize(await item.getValue());
}

/** 整体写入（写入前会先规范化）。 */
async function saveSettings(next: Settings): Promise<Settings> {
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
 * 配置端口（应用层真正要的那两个动作）。
 *
 * 载体把这一份交给应用层与厂商适配器，它们从此不再直接读存储：换一个载体
 * 时只换这个实现，应用层一行不动。
 *
 * 只有 read 与 update。reset 与 watch 是载体自己的事——前者是设置页的按钮，
 * 后者用来重挂定时器，应用层从不调用，放进端口只会变成没人实现的假接口。
 */
export const configStore: ConfigPort = {
  read: getSettings,
  update: updateSettings,
};

/** 订阅配置变化，返回取消订阅函数。 */
export function watchSettings(listener: (next: Settings) => void): () => void {
  return item.watch((value) => listener(normalize(value)));
}

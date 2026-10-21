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

/*
 * 写队列：updateSettings 是「读-改-写」，两次调用并发时后写者会基于旧读覆盖
 * 前写者（经典丢失更新：快速连点两个勾选框，先点的那个被后点的静默改回去）。
 * 唯一写路径处用一条 promise 链做互斥：每个写入等前一个落定后再读当前值、再写。
 */
let writeQueue: Promise<unknown> = Promise.resolve();

/**
 * 跨页面上下文也串行：打开两个设置页（或设置页与后台同时改配置）时，
 * 各自模块里的 writeQueue 互不相识。Web Locks 在同一扩展源的所有上下文之间
 * 互斥，把「读-改-写」整体罩住；浏览器不支持时退化为单上下文队列。
 */
async function withWriteLock<T>(run: () => Promise<T>): Promise<T> {
  const locks = typeof navigator === 'undefined' ? undefined : navigator.locks;
  if (locks === undefined) return run();
  return (await locks.request('study-pilot-settings-write', run)) as T;
}

/** 局部更新：传入的部分结构会深合并到当前配置上。写入串行，不丢更新。 */
export async function updateSettings(patch: unknown): Promise<Settings> {
  const next = writeQueue.then(() =>
    withWriteLock(async () => {
      const current = await getSettings();
      return saveSettings(mergeWithBase(current, patch));
    }),
  );
  // 队列自身吞掉拒绝，免得一次失败卡死后续写入；调用方仍拿到真实的 Promise
  writeQueue = next.catch(() => undefined);
  return next;
}

/**
 * 配置端口（应用层真正要的那两个动作）。
 *
 * 载体把这一份交给应用层与厂商适配器，它们从此不再直接读存储：换一个载体
 * 时只换这个实现，应用层一行不动。
 *
 * 只有 read 与 update。reset / watch 之类不在这里——应用层从不调用，
 * 放进端口只会变成没人实现的假接口；载体侧也不再提供（旧版为定时器
 * 时代留的 watchSettings 已随之一并删除）。
 */
export const configStore: ConfigPort = {
  read: getSettings,
  update: updateSettings,
};

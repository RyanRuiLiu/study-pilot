/*
 * 快照的读写。
 *
 * 与用户配置分开存放：配置是用户的意图，快照是运行时的观测结果。
 * 混在一起会让「恢复默认设置」把观测数据也一起清掉，
 * 也会让配置的迁移逻辑被无关字段拖累。
 */

import { storage } from 'wxt/utils/storage';
import { dateKey } from '../../runtime/scheduler';
import { SNAPSHOT_VERSION, type Snapshot } from './types.ts';

const item = storage.defineItem<Snapshot | null>('local:study-pilot-snapshot', {
  fallback: null,
});

/**
 * 读快照。
 *
 * 返回 null 表示「确实还没存过快照」（首次安装），这与「读不出来」是两件事，
 * 所以不在这里吞掉存储异常——它抛出来由调用方处理。
 * 把两者合并成一个 null，排查时就说不出到底发生过什么。
 */
export async function readSnapshot(): Promise<Snapshot | null> {
  const snapshot = await item.getValue();
  if (!snapshot) return null;
  // 结构版本对不上：这份缓存不可用，丢弃即可——下次读取会重写一份
  return snapshot.version === SNAPSHOT_VERSION ? snapshot : null;
}

export async function writeSnapshot(snapshot: Snapshot): Promise<void> {
  await item.setValue(snapshot);
}

/** 用当前时间构造一份快照的元信息。 */
export function snapshotStamp(now: number = Date.now()): {
  version: number;
  fetchedAt: number;
  fetchedDate: string;
} {
  return { version: SNAPSHOT_VERSION, fetchedAt: now, fetchedDate: dateKey(now) };
}

/** 今天是否已经全量拉取过。 */
export function fetchedToday(snapshot: Snapshot | null, now: number = Date.now()): boolean {
  return snapshot !== null && snapshot.fetchedDate === dateKey(now);
}

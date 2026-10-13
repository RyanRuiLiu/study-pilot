/*
 * 平台注册表。
 *
 * 装配点：核心与看板都不 import 具体平台包，只认这张表与中立模型。
 * 加第二个平台时，这里加一行。
 */

import type { Course, Platform, Task } from '../domain/task';
import type { SnapshotCourse } from '../background/mooc/snapshot';
import { MOOC_PLATFORM, toCourse, toTasks } from './mooc';

export interface PlatformAdapter {
  platform: Platform;
  /** 把本地观测结果映射成中立模型 */
  toCourse(course: SnapshotCourse): Course;
  toTasks(course: SnapshotCourse): Task[];
}

export const PLATFORMS: readonly PlatformAdapter[] = [
  { platform: MOOC_PLATFORM, toCourse, toTasks },
];

/** 按平台 id 取 adapter。没有对应平台时返回 null，由调用方决定怎么呈现。 */
export function adapterOf(platformId: string): PlatformAdapter | null {
  return PLATFORMS.find((adapter) => adapter.platform.id === platformId) ?? null;
}

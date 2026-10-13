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

/*
 * 一条必须写下来的边界：中立模型只承载**展示得出来的东西**。
 *
 * 干跑（第 30 轮）发现：把后台的计划层直接改成消费 `Task[]` 会丢判据——
 * 计划要用的「互评评价窗口开没开」「考试窗口」「剩余配额」，中立模型里没有，
 * 我建模型时只留了展示所需的字段。硬改只有两条路，都不好：
 *   - 把平台字段塞回中立模型 → 中立模型不再是中立的
 *   - 丢掉判据 → 行为悄悄变错（例如窗口没开也去提交互评）
 *
 * 因此分工是：
 *   中立模型      「这件事是什么、谁来做、做到哪了」——展示与分组
 *   adapter/平台层「能不能做、按什么条件做、怎么发请求」——可行性判断与执行
 *
 * 计划层要接到多平台时，扩的是 adapter（例如让 adapter 给出可执行动作），
 * 而不是把平台条件搬进中立模型。这条边界不靠文档记着——它就写在这里，
 * 改到这里的人（或 AI）会先看到它。
 */

export const PLATFORMS: readonly PlatformAdapter[] = [
  { platform: MOOC_PLATFORM, toCourse, toTasks },
];

/** 按平台 id 取 adapter。没有对应平台时返回 null，由调用方决定怎么呈现。 */
export function adapterOf(platformId: string): PlatformAdapter | null {
  return PLATFORMS.find((adapter) => adapter.platform.id === platformId) ?? null;
}

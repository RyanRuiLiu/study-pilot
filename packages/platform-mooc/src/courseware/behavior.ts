/*
 * 课件单元的行为接口。
 *
 * 一种类型一个实现，统一注册在 `index.ts` 的注册表里。「哪些类型支持、
 * 各自怎么做」只有注册表一处来源：计划层与执行层都不认识具体类型，
 * 新增一种类型只需加一个模块加一行注册。
 */

import type { Result } from '@study-pilot/core';
import type { TransportError } from '@study-pilot/transport';
import type { MoocClient } from '../client.ts';
import type { CourseUnit } from '../types.ts';

/** 一次行为的结果。 */
export type BehaviorOutcome =
  /** 已上报，等平台记账 */
  | 'reported'
  /** 结构里缺少必需数据（例如视频没有时长），没有上报 */
  | 'skipped';

export interface UnitBehavior {
  /** 课件单元类型，取 `UNIT_TYPE` 的值 */
  readonly type: number;
  /**
   * 结构里的数据够不够执行它。
   *
   * 不够就不进计划：否则那条事项会每轮重现、永远做不掉，
   * 而用户只看到「它又出现了」。
   */
  ready(unit: CourseUnit): boolean;
  /** 执行。成败都经 Result 表达，不抛异常 */
  run(client: MoocClient, unit: CourseUnit): Promise<Result<BehaviorOutcome, TransportError>>;
}

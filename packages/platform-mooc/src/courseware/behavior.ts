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

/**
 * 生成一段文本（讨论留言）。失败时**不要**返回替代文案——这里没有「固定文案」
 * 这回事：讨论单元必须由 AI 写出内容，写不出来就如实失败，交人处理。
 */
export type TextGenerator = (
  request: { task: string; input: string },
) => Promise<{ ok: true; text: string } | { ok: false; reason: string }>;

/**
 * 执行课件行为需要的能力。
 *
 * 行为自己声明需要什么（`needs`），调用方声明具备什么（这里）。两者对不上时
 * 该类型**不进计划**——与其写一条永远失败的待办，不如让用户看到
 * 「需要先配置 AI」。
 */
export interface CoursewareCapabilities {
  /** 是否具备文本生成能力（配置了 AI） */
  text: boolean;
}

export interface CoursewareContext {
  generateText?: TextGenerator;
}

export interface UnitBehavior {
  /** 课件单元类型，取 `UNIT_TYPE` 的值 */
  readonly type: number;
  /**
   * 这个行为需要什么能力。缺省表示不需要额外能力。
   * 目前只有讨论需要 `text`。
   */
  readonly needs?: 'text';
  /**
   * 结构里的数据够不够执行它。
   *
   * 不够就不进计划：否则那条事项会每轮重现、永远做不掉，
   * 而用户只看到「它又出现了」。
   */
  ready(unit: CourseUnit): boolean;
  /** 执行。成败都经 Result 表达，不抛异常 */
  run(
    client: MoocClient,
    unit: CourseUnit,
    context: CoursewareContext,
  ): Promise<Result<BehaviorOutcome, TransportError>>;
}

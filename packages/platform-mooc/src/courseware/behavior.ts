/*
 * 课件单元的行为接口。
 *
 * 一种类型一个实现，统一注册在 `index.ts` 的注册表里。「哪些类型支持、
 * 各自怎么做」只有注册表一处来源：计划层与执行层都不认识具体类型，
 * 新增一种类型只需加一个模块加一行注册。
 */

import type { Result } from '@study-pilot/core';
import type { TransportError } from '@study-pilot/transport';
import type { RunControl } from '@study-pilot/application';
import type { MoocClient } from '../client.ts';
import type { CourseUnit } from '../types.ts';

/**
 * 讨论预取的结论：成功带生成的文本；失败带原因（生成内部已重试过，
 * 不再二次重试）。`stopped` 把「按停止键中断」与真失败分开——前者按跳过呈现。
 *
 * 定义在这里而不是 discuss.ts：它是行为契约的一部分（`CoursewareContext`
 * 用它），放那边会和本文件的接口形成文件级环（边界检查 R7 会拦下）。
 */
export type DiscussPrep =
  | { ok: true; text: string }
  | { ok: false; reason: string; stopped?: true };

/** 一次行为的结果。 */
export type BehaviorOutcome =
  /** 已上报，等平台记账 */
  | 'reported'
  /** 结构里缺少必需数据（例如视频没有时长），没有上报 */
  | 'skipped'
  /** 按停止键中断，没有上报 */
  | 'stopped';

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
  /**
   * 讨论回复的预取（unit.contentId → 取题+生成的结论）。执行编排在开始前
   * 并发预取（生成不占平台配额、单元间无顺序依赖，而一条约 5 秒）；
   * 讨论行为 run 时优先取用。不给就现场生成，行为语义不变。
   */
  preparedReplies?: Map<number, DiscussPrep>;
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
    /** 停止柄：在发出写请求之前问一句（见 application 的 RunControl） */
    control: RunControl,
  ): Promise<Result<BehaviorOutcome, TransportError>>;
}

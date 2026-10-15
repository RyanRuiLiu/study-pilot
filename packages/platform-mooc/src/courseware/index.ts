/*
 * 课件单元的完成。
 *
 * 平台把「课件学到哪」当一等公民指标，而客户端只有一处进度写入点：
 * `courseRpcBean.saveMocContentLearn`。它由课件页在播放、翻页、答题、打开讨论时
 * 调用——每一种类型记录的东西不同（视频记观看时长、文档记浏览时长、
 * 随堂测验记作答、讨论记回复），因此这里按类型分派，尽量做到与真人留下的记录一致。
 *
 * 本目录的分工
 * ------------
 *   behavior.ts   行为的接口（一种类型一个实现）
 *   reports.ts    上报的唯一出口（报文形状只有这一处）
 *   resource.ts   单元资源（文档页数）
 *   video / document / text / unit-quiz / discuss   各类型的行为
 *
 * **唯一来源**：`BEHAVIORS` 是「支持哪些类型、各自怎么做」的唯一清单。
 * 计划层只用 `isCompletable`，执行层只调 `completeUnit`，都不认识具体类型；
 * 新增一种类型 = 加一个模块 + 在清单里加一行。
 *
 * 判断与执行分开：`isUnitComplete` / `isCompletable` 是纯函数（只读结构），
 * `completeUnit` 才写平台。
 */

import { ok, type Result } from '@study-pilot/core';
import { NEVER_STOPPED, type RunControl } from '@study-pilot/application';
import type { TransportError } from '@study-pilot/transport';
import type { MoocClient } from '../client.ts';
import type { CourseUnit } from '../types.ts';
import type { BehaviorOutcome, CoursewareCapabilities, CoursewareContext, UnitBehavior } from './behavior.ts';
import { discussBehavior } from './discuss.ts';
import { documentBehavior } from './document.ts';
import { textBehavior } from './text.ts';
import { unitQuizBehavior } from './unit-quiz.ts';
import { videoBehavior } from './video.ts';

/** 支持的类型与各自的做法。新增类型只改这一处。 */
export const BEHAVIORS: readonly UnitBehavior[] = [
  videoBehavior,
  documentBehavior,
  textBehavior,
  unitQuizBehavior,
  discussBehavior,
];

const BY_TYPE = new Map(BEHAVIORS.map((behavior) => [behavior.type, behavior]));

/** 单元是否已完成。只看结构里的字段，不发请求。 */
export function isUnitComplete(unit: CourseUnit): boolean {
  return unit.completePercent >= 1;
}

/**
 * 这个单元此刻能不能执行。
 *
 * 两个条件：注册表里有它，且**行为需要的能力当前具备**。
 * 例如讨论需要 AI 生成回复，没有配置 AI 时它就进不了计划——
 * 这样用户看到的是「未完成、需要自己处理」，而不是一条每轮都失败的自动项。
 */
export function isCompletable(
  unit: CourseUnit,
  capabilities: CoursewareCapabilities = { text: false },
): boolean {
  const behavior = BY_TYPE.get(unit.contentType);
  if (!behavior || !behavior.ready(unit)) return false;
  if (behavior.needs === 'text') return capabilities.text;
  return true;
}

/**
 * 执行一个单元的完成行为。
 *
 * 没有登记的类型的单元返回 `skipped`，不发任何请求——平台对这种类型怎么记账
 * 没有实测过，宁可不做也不猜。
 *
 * `context` 里可以注入文本生成器（AI）。视频/文档/测验等行为不依赖它，
 * 讨论单元没有它则不进计划（见 isCompletable）——不会在缺 AI 时留下一半的记录。
 */
export async function completeUnit(
  client: MoocClient,
  unit: CourseUnit,
  context: CoursewareContext = {},
  /** 停止柄：讨论的「生成 + 发帖」两步之间会问它一句 */
  control: RunControl = NEVER_STOPPED,
): Promise<Result<BehaviorOutcome, TransportError>> {
  const behavior = BY_TYPE.get(unit.contentType);
  if (!behavior || !behavior.ready(unit)) return ok('skipped');
  return behavior.run(client, unit, context, control);
}

export type {
  BehaviorOutcome,
  CoursewareCapabilities,
  CoursewareContext,
  TextGenerator,
  UnitBehavior,
} from './behavior.ts';

/**
 * 讨论回复的字数上限。AI 提示词与发布前校验共用这一个数——
 * 出口在这里，因为它是「讨论行为」的契约，不是载体自己的事。
 */
export { DISCUSS_REPLY_MAX_CHARS } from './discuss.ts';

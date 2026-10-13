/**
 * 课件单元的完成。
 *
 * 平台把「课件学到哪」当一等公民指标（课程带 `totalLearnedTime`、单元带
 * `learnTime`），而客户端只有一处进度写入点：`courseRpcBean.saveMocContentLearn`
 * （`core/modules/ad72e09e….js` 里的串行队列，队列里唯一的方法就是它）。
 * 因此标记完成既不需要播放器，也不需要页面——一条请求一个单元。
 *
 * 本模块只回答「怎么发」，不回答「该不该发」——后者在 task-plan。
 *
 * 报文取最小集：能省的字段都实测省过（见 docs/platforms/courseware.md 第 6 节），
 * 保留下来的每个值都来自课程结构，本模块不自造任何取值。
 */

import { ok, type Result } from '@study-pilot/core';
import type { TransportError } from '@study-pilot/transport';
import type { MoocClient } from './client.ts';
import { ENDPOINTS } from './endpoints.ts';
import type { CourseUnit } from './types.ts';

/** 课件单元类型。取值与含义见 docs/platforms/course-model.md 第 3 节。 */
export const UNIT_TYPE = {
  VIDEO: 1,
  VIDEO_SRT: 2,
  PDF: 3,
  TEXT: 4,
  QUESTION: 5,
  DISCUSS: 6,
  LIVE: 7,
  COLUMN_CONTENT: 8,
  RELATED_LIVE: 9,
  MUSIC_VIDEO: 10,
  MUSIC_EXERCISE: 11,
  MUSIC_HOMEWORK: 12,
  INTERACTIVE_COURSEWARE: 15,
} as const;

/**
 * 可以上报完成的类型。
 *
 * 视频、文档、文本、随堂测验：实测立即记账。
 * 讨论：同样由客户端在打开单元时上报，但平台是**延迟记账**
 * （一例约 12 分钟后完成，另一例 20 分钟后仍未记上），因此放进计划，
 * 记账结果由下一轮快照确认，见 docs/platforms/courseware.md 第 6 节。
 *
 * 其余类型（字幕、直播、专栏、音乐类、互动课件）在账号的课程里没有出现过，
 * 没有实测，不猜——见 course-model.md 第 7 节。
 */
export const COMPLETABLE_TYPES: ReadonlySet<number> = new Set([
  UNIT_TYPE.VIDEO,
  UNIT_TYPE.PDF,
  UNIT_TYPE.TEXT,
  UNIT_TYPE.QUESTION,
  UNIT_TYPE.DISCUSS,
]);

/** 单元是否已完成。只看结构里的字段，不发请求。 */
export function isUnitComplete(unit: CourseUnit): boolean {
  return unit.completePercent >= 1;
}

/**
 * 这个单元此刻能不能上报完成。
 *
 * 两个条件：类型在可上报集合里，且报文能构造出来（视频必须有平台给的时长）。
 * 计划只收下这里为真的单元——否则会出现一条永远做不掉、每轮都重现的事项。
 */
export function isCompletable(unit: CourseUnit): boolean {
  return COMPLETABLE_TYPES.has(unit.contentType) && buildUnitReport(unit) !== null;
}

/**
 * 构造上报报文。
 *
 * 视频要给出位置与本次学时才会被记为「学过」；其余类型只报 `finished`。
 *
 * 视频没有时长时返回 null：那是「平台没说这段视频有多长」，
 * 与其编一个数，不如不报。
 */
export function buildUnitReport(unit: CourseUnit): Record<string, unknown> | null {
  const base = { unitId: unit.unitId, finished: true, contentType: unit.contentType };
  if (unit.contentType !== UNIT_TYPE.VIDEO) return base;
  if (unit.durationInSeconds === null || unit.durationInSeconds <= 0) return null;
  return {
    ...base,
    videoTime: unit.durationInSeconds,
    learnedVideoTimeCount: unit.durationInSeconds,
  };
}

/** `completeUnit` 的两种正常结局。 */
export type CompleteOutcome =
  /** 已上报，等待平台记账 */
  | 'reported'
  /** 结构里缺少完成它所必需的数据，没有上报 */
  | 'skipped';

/**
 * 把一个课件单元上报为已学。
 *
 * 不在这里复核：调用方读到的下一份结构就是结果，没记上的单元会再次进入计划。
 * 并发限制（code -2）由 RPC 客户端统一退避重试。
 */
export async function completeUnit(
  client: MoocClient,
  unit: CourseUnit,
): Promise<Result<CompleteOutcome, TransportError>> {
  const dto = buildUnitReport(unit);
  if (!dto) return ok('skipped');

  const call = await client.rpc.call<boolean>(
    ENDPOINTS.completeUnit.bean,
    ENDPOINTS.completeUnit.method,
    { dto },
  );
  if (!call.ok) return call;
  return ok('reported');
}

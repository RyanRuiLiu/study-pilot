/**
 * 作业的读取：阶段判定与取作业信息、答卷。
 *
 * 从 `review.ts` 移出。对外仍从 `review.ts` 导出，导入方不必改。
 */

import type { Result } from '@study-pilot/core';
import type { TransportError } from '@study-pilot/transport';
import { callRead, type MoocClient } from './client.ts';
import { ENDPOINTS } from './endpoints.ts';
import type { HomeworkInfo, HomeworkPaper } from './types.ts';

/** 作业所处的阶段。取值与源码 `edu.u.CONST` 一致。 */
export const HOMEWORK_PHASE = {
  /** 尚未截止，可以作答与提交 */
  SUBMIT: 1,
  /** 截止后、成绩发布前，处于互评期 */
  EVALUATION: 2,
  /** 成绩已发布 */
  SCORE: 3,
  /** 教师批改 */
  TEACHER: 4,
} as const;

export type HomeworkPhase = (typeof HOMEWORK_PHASE)[keyof typeof HOMEWORK_PHASE];

/**
 * 计算作业当前所处的阶段。
 *
 * 与源码 `edu.u._$currentEvaluatePhase` 的判定一致：
 *
 *   o._$currentEvaluatePhase = function (e) {
 *     var t = o._$getCurServerTime(), n = e.deadline, i = e.evaluateScoreReleaseTime;
 *     if (t < n) a = o.CONST.HW_PHASE_SUBMIT;
 *     else if (t >= i) a = o.CONST.HW_PHASE_SCORE;
 *     else a = o.CONST.HW_PHASE_EVALUATION;
 *     return a;
 *   };
 *
 * 源码取的是服务端时间（`timeRpcBean.currentTime`）。实测服务端与本机相差
 * 数百毫秒，而作业的截止与发布时间以天为单位，直接使用本机时间不影响判定。
 */
export function currentEvaluatePhase(
  input: { deadline?: number | null; evaluateScoreReleaseTime?: number | null },
  now: number = Date.now(),
): HomeworkPhase {
  const deadline = input.deadline ?? 0;
  const releaseTime = input.evaluateScoreReleaseTime ?? 0;

  if (now < deadline) return HOMEWORK_PHASE.SUBMIT;
  if (releaseTime > 0 && now >= releaseTime) return HOMEWORK_PHASE.SCORE;
  return HOMEWORK_PHASE.EVALUATION;
}

export async function getHomeworkInfo(
  client: MoocClient,
  tid: number,
): Promise<Result<HomeworkInfo, TransportError>> {
  return callRead<HomeworkInfo>(
    client,
    ENDPOINTS.homeworkInfo.bean,
    ENDPOINTS.homeworkInfo.method,
    { tid, isDraft: false },
  );
}

/**
 * 取作业答卷。
 *
 * 参考答案位于 `subjectiveQList[].judgeDtos[].msg`，是含图片与评分标准的富文本。
 * 它与 `withStdAnswerAndAnalyse` 无关：实测该参数取 true 或 false，
 * `judgeDtos` 都会返回，而 `stdAnswer` 与 `sampleAnswerJson` 始终为 null
 * ——主观题本就没有单一标准答案，评分依据就是 `judgeDtos`。
 *
 * 请求字段与顺序来自源码 `COM_Cache_HomeworkCache._$getOpenHomeworkPaper`
 * （core bundle 的 9404c040 模块）：{tid, evaluateId, withStdAnswerAndAnalyse, phase, aid, appId}。
 */
export async function getHomeworkPaper(
  client: MoocClient,
  tid: number,
  options: {
    aid?: number;
    evaluateId?: number | null;
    /** 阶段。省略时按当前时间计算 */
    phase?: HomeworkPhase;
    /** 计算阶段所需的时间字段，来自 getHomeworkInfo */
    timing?: { deadline?: number | null; evaluateScoreReleaseTime?: number | null };
  } = {},
): Promise<Result<HomeworkPaper, TransportError>> {
  const phase = options.phase ?? currentEvaluatePhase(options.timing ?? {});

  return callRead<HomeworkPaper>(
    client,
    ENDPOINTS.homeworkPaper.bean,
    ENDPOINTS.homeworkPaper.method,
    {
      tid,
      evaluateId: options.evaluateId ?? null,
      withStdAnswerAndAnalyse: true,
      phase,
      aid: options.aid,
    },
  );
}

/**
 * 由工作项的 `test` 字段派生状态。
 *
 * 从 `structure.ts` 移出：解析是「把平台数据读成领域对象」，状态是
 * 「由对象得出判断」，两者改动的原因不同——平台加一个字段改解析，
 * 判据变化改这里。对外仍从 `structure.ts` 导出，导入方不必改。
 */

import type { CourseWork, WorkFlags } from './types.ts';

/**
 * 由 `test` 字段派生状态。
 *
 * 判据说明：
 *   - 支持互评：`enableEvaluation === true` 且 `evaluateJudgeType != null`。
 *     只判断前者不够——存在 `enableEvaluation` 为 true 但 `evaluateJudgeType`
 *     为 null 的节点，那种情况实际没有互评入口。
 *
 *   - 已提交：`usedTryCount > 0` 或 `userScore != null`。两者都可能单独缺失，
 *     所以取「或」而不是「与」。
 *
 *   - 考试不报 `usedTryCount`，它用 `userSubmitStatus`（1 为已提交，
 *     null 或 0 为未提交）。两种字段名都要认，否则考试永远显示「未提交」——
 *     而做过之后页面上会显示成绩，两处对不上。
 *
 *   - 考试的 `trytime` 相当于作业的 `totalTryCount`，同义不同名。
 */
export function deriveStatus(work: CourseWork, now: number = Date.now()): WorkFlags {
  const test = work.test;
  const start = test.evaluateStart ?? null;
  const end = test.evaluateEnd ?? null;

  const usedTries = Number(test.usedTryCount ?? 0);
  const submitStatus = Number(test.userSubmitStatus ?? 0);

  return {
    reviewable: test.enableEvaluation === true && test.evaluateJudgeType != null,
    submitted: usedTries > 0 || submitStatus > 0 || test.userScore != null,
    reviewOpen: start !== null && end !== null && now >= start && now <= end,
    overdue: test.deadline != null && now > test.deadline,
  };
}

/**
 * 筛选出当前可以提交互评的作业：支持互评，且互评窗口尚未关闭。
 * 不检查「已提交」——一份作业可以评多个人，评过之后仍可继续评。
 */
export function filterReviewable(
  works: CourseWork[],
  now: number = Date.now(),
): CourseWork[] {
  return works.filter((work) => {
    const status = deriveStatus(work, now);
    return status.reviewable && !(work.test.evaluateEnd != null && now > work.test.evaluateEnd);
  });
}

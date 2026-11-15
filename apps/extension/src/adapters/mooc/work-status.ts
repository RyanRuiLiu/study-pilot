/*
 * 由快照里的字段推出单元的展示状态。
 *
 * 快照里是原始事实（做没做、截止时间、得分、互评进度），
 * 而界面要的是「未提交」「互评阶段」这样的说法。这层转换放在一处，
 * 弹窗与设置页才能说法一致——它们曾经各写一遍，于是同一个单元
 * 在两处显示不同的状态。
 *
 * 判据全部来自快照字段，不引入额外请求。这也是为什么快照要带这些字段
 * 而不是只带一个结论：结论会随当下时间变化（今天未提交、明天就是已过截止），
 * 而事实不会。
 */

import { WORK_STATUS, type WorkStatus } from './messages/payload.ts';
import type { SnapshotWork } from '@study-pilot/platform-mooc';

/**
 * 一个单元此刻的状态。
 *
 * 判据顺序（与平台自己的阶段划分同构，源码 examlist chunk 8017-8031 的
 * SCORE_PUB_STATUS 与阶段逻辑）：
 *   1. 互评窗口开着 → 互评期显示。**窗口内的 userScore 是互评给分的实况，
 *      不是终局分**（2026-11-08/15 现场实证：评分期 userScore=51.5、
 *      scorePubStatus=0 未确认），不能显示成「成绩已公布」。
 *   2. 分数成为「已公布」的条件 = scorePubStatus 确认（=2）。没有该字段的
 *      类型（测验、旧作业——实测 DTO 不带），有分即公布，行为不变。
 */
export function describeWorkStatus(work: SnapshotWork, now: number = Date.now()): WorkStatus {
  const inEvaluateWindow =
    work.evaluateStart !== null &&
    work.evaluateEnd !== null &&
    now >= work.evaluateStart &&
    now <= work.evaluateEnd;
  if (inEvaluateWindow) {
    if (work.evaluateDone !== null && work.evaluateTotal !== null && work.evaluateDone >= work.evaluateTotal) {
      return WORK_STATUS.REVIEWED;
    }
    return WORK_STATUS.REVIEWING;
  }

  const published = work.score !== null && (work.scorePubStatus === null || work.scorePubStatus === 2);
  if (published) return WORK_STATUS.SCORED;

  if (!work.submitted) {
    // 截止时间缺失时按「还能做」处理：平台确实有这类无截止的单元
    if (work.deadline !== null && work.deadline <= now) return WORK_STATUS.OVERDUE;
    return WORK_STATUS.UNSUBMITTED;
  }

  // 已提交：互评窗口已关，平台未确认公布 → 等待公布
  return WORK_STATUS.WAITING;
}

/**
 * 状态的补充说明，用于 title 提示。
 *
 * 几个说法之间的差别不是自明的，尤其「互评阶段」与「互评已完成」：
 * 前者是你还要去评别人，后者是你已经评够，分数确定了、只等公布。
 *
 * 只解释状态本身，不说「谁来处理」——处置那一行已经回答了要不要动手，
 * 这里再说一遍，两处说法迟早会打架。
 */
export function describeStatusDetail(status: WorkStatus): string {
  switch (status) {
    case WORK_STATUS.UNSUBMITTED:
      return '尚未提交，截止前仍可完成。';
    case WORK_STATUS.OVERDUE:
      return '已过截止时间且未提交。平台不接受逾期提交，无法补做。';
    case WORK_STATUS.REVIEWING:
      return '作业已提交，正处于互评期。完成平台要求的评阅份数后方计入成绩。';
    case WORK_STATUS.REVIEWED:
      return '互评份数已达标。分数由互评结果决定，等待公布。';
    case WORK_STATUS.WAITING:
      return '互评期已结束，等待成绩公布。';
    case WORK_STATUS.SCORED:
      return '成绩已公布。';
  }
}

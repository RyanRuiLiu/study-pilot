/*
 * 由快照里的字段推出单元的展示状态。
 *
 * 快照存的是原始事实（做没做、截止时间、得分、互评进度），
 * 而界面要的是「未提交」「互评阶段」这样的说法。这层转换放在一处，
 * 弹窗与设置页才能说法一致——它们曾经各写一遍，于是同一个单元
 * 在两处显示不同的状态。
 *
 * 判据全部来自快照字段，不引入额外请求。这也是为什么快照要存这些字段
 * 而不是只存一个结论：结论会随当下时间变化（今天未提交、明天就是已过截止），
 * 而事实不会。
 */

import { WORK_STATUS, type WorkStatus } from '../platform/messaging';
import type { SnapshotWork } from './snapshot';

const DAY_MS = 24 * 60 * 60 * 1000;


/**
 * 一个单元此刻的状态。
 *
 * 顺序即优先级：有分数最高，其次是没提交的两种，最后才是与互评有关的。
 */
export function describeWorkStatus(work: SnapshotWork, now: number = Date.now()): WorkStatus {
  /*
   * 有分数就是已公布。
   * 这一点不能靠阶段判断：测验的 phase 永远为空，先前用阶段判据时，
   * 测验拿到分数后仍显示「已提交」。
   */
  if (work.score !== null) return WORK_STATUS.SCORED;

  if (!work.submitted) {
    // 截止时间缺失时按「还能做」处理：平台确实有这类无截止的单元
    if (work.deadline !== null && work.deadline <= now) return WORK_STATUS.OVERDUE;
    return WORK_STATUS.UNSUBMITTED;
  }

  // 已提交：先看互评窗口，再看评够没有
  const end = work.evaluateEnd;
  if (end !== null && now <= end) {
    /*
     * 互评期内要区分「还要去评别人」与「已经评够了」。
     *
     * 早先这里只回一个「互评阶段」，于是评够 5/5 之后仍显示同一个说法。
     * 那不只是不够精确：用户看到「互评阶段」会以为还有事要做，
     * 而实际分数已经定了，剩下的只是等公布。
     *
     * 未评够、或份数还没查过（两者都是 null）时按需处理显示。
     */
    if (work.evaluateDone !== null && work.evaluateTotal !== null && work.evaluateDone >= work.evaluateTotal) {
      return WORK_STATUS.REVIEWED;
    }
    return WORK_STATUS.REVIEWING;
  }

  return WORK_STATUS.WAITING;
}

/**
 * 距离截止还有几天。已过截止返回负数。
 */
export function daysLeft(deadline: number | null, now: number = Date.now()): number | null {
  if (deadline === null) return null;
  return Math.ceil((deadline - now) / DAY_MS);
}

/**
 * 状态的补充说明，用于 title 提示。
 *
 * 几个说法之间的差别不是自明的，尤其「互评阶段」与「互评已完成」：
 * 前者是你还要去评别人，后者是你已经评够，分数确定了、只等公布。
 *
 * 说明里不假设开关状态：「测验会由扩展处理」这种说法只在自动完成测验
 * 开着时才成立，而关着的时候这条说明同样显示。改成条件式表述，
 * 两种情况都准确。
 */
export function describeStatusDetail(status: WorkStatus): string {
  switch (status) {
    case WORK_STATUS.UNSUBMITTED:
      return '尚未提交。开启自动完成后测验会被自动处理，作业需要你完成。';
    case WORK_STATUS.OVERDUE:
      return '已过截止时间且未提交。平台不接受逾期提交，无法补做。';
    case WORK_STATUS.REVIEWING:
      return '作业已提交，正处于互评期。评够平台要求的份数才计入成绩。';
    case WORK_STATUS.REVIEWED:
      return '互评份数已达标。分数由互评结果决定，之后只等公布。';
    case WORK_STATUS.WAITING:
      return '互评期已结束，等待成绩公布。';
    case WORK_STATUS.SCORED:
      return '成绩已公布。';
  }
}

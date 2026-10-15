/*
 * 单个工作项 → 能做还是只能人工。
 *
 * 课件单元不在这里：它不是「待办」（没有截止时间），见 `courseware.ts`。
 *
 * 判据只有平台事实：截止过没过、卷子交没交、互评窗口开没开。
 * 「用户允不允许」不在这层：授权在点击那一刻（见 application 的 round.ts）。
 */

import type { SnapshotCourse, SnapshotWork } from '../read/index.ts';
import { isExam, type ManualItem, type WorkAutoAction } from './types.ts';

/**
 * 某个单元此刻是否处于互评期。
 *
 * 快照里存了互评窗口的两端，直接用它们判断，不必再引入阶段计算——
 * 阶段计算需要提交截止与成绩发布时间，而窗口两端更直接。
 */
function inReviewWindow(work: SnapshotWork, now: number): boolean {
  const start = work.evaluateStart;
  const end = work.evaluateEnd;
  if (start === null || end === null) return false;
  return now >= start && now <= end;
}

/** 计划一个工作项的结果。 */
export interface WorkPlan {
  auto: WorkAutoAction[];
  manual: ManualItem[];
}

export function planWork(course: SnapshotCourse, work: SnapshotWork, now: number): WorkPlan {
  const auto: WorkAutoAction[] = [];
  const manual: ManualItem[] = [];

  /*
   * 考试。
   *
   * 不进自动：考试与测验用同一套接口，技术上可以支持，但考试通常
   * 只有一次作答机会（切屏会被计数、倒计时不可暂停），
   * 不该代为点击提交。作答页上有填充与评分依据，提交由用户自己完成。
   *
   * 过了截止的同样标出来——那时候做也做不了了，但用户该知道自己漏了。
   */
  if (isExam(work.type)) {
    if (!work.submitted) {
      const past = work.deadline !== null && work.deadline <= now;
      manual.push({ course, work, deadline: work.deadline, reason: past ? 'exam-overdue' : 'exam' });
    }
    return { auto, manual };
  }

  if (work.type === 'quiz') {
    if (work.submitted) return { auto, manual };

    /*
     * 未提交的测验分两种。已过截止的平台不允许开卷，扩展做不了，
     * 只能让用户知道已经晚了；没过截止的排进 auto——客观题，能作答也能提交。
     */
    if (work.deadline !== null && work.deadline <= now) {
      manual.push({ course, work, deadline: work.deadline, reason: 'quiz-overdue' });
    } else {
      auto.push({ kind: 'quiz', course, work, remaining: 0 });
    }
    return { auto, manual };
  }

  // 作业
  if (!work.submitted) {
    /*
     * 主观题，没有可自动填写的答案。
     *
     * 但要区分过没过截止：过了的平台上交不上去，界面上该说「无法补做」
     * 而不是「需要你完成」——后者会让用户点进去、写完、然后发现交不了。
     */
    const past = work.deadline !== null && work.deadline <= now;
    manual.push({
      course,
      work,
      deadline: work.deadline,
      reason: past ? 'homework-overdue' : 'homework-unsubmitted',
    });
    return { auto, manual };
  }

  /*
   * 已提交的作业：看互评与自评。
   *
   * 不用「是否处于互评窗口内」一刀切。窗口过了并不代表不用管：
   * 没评够配额、没做自评，同样会影响成绩。过了截止只是说明
   * 平台不再接受——那更要告诉用户，而不是当作无事发生。
   */
  const inWindow = inReviewWindow(work, now);

  /*
   * 互评：配额未知时不排进计划。
   * 那说明上一次读取没拿到进度（请求失败或还没查过），
   * 此时开始取待评答卷会占用一份配额——startOneSubmissionEvaluate
   * 是有副作用的，它会让服务端把一份答卷分配给你。
   */
  if (work.evaluateTotal !== null && work.evaluateDone !== null && work.reviewable) {
    const remaining = work.evaluateTotal - work.evaluateDone;
    if (remaining > 0) {
      if (!inWindow) {
        manual.push({ course, work, deadline: work.evaluateEnd, reason: 'review-overdue' });
      } else {
        auto.push({ kind: 'review', course, work, remaining });
      }
    }
  }

  // 自评与互评共用同一份答卷，但配额各自独立
  if (work.selfDone === false) {
    if (!inWindow) {
      manual.push({ course, work, deadline: work.evaluateEnd, reason: 'self-overdue' });
    } else {
      auto.push({ kind: 'self', course, work, remaining: 0 });
    }
  }

  return { auto, manual };
}

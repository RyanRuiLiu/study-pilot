/*
 * 把后台的内部结构转成界面要的消息格式。
 *
 * 单独立一层是为了让「平台是什么样」与「界面说什么话」分开：
 * 后台的判断基于快照与计划，界面要的是带文案的条目。若把它们揉在一起，
 * 界面文案的调整会牵动判断逻辑，而判断逻辑一改又要回头核对所有文案。
 *
 * 这里的函数都是纯的：给定计划与快照，输出消息对象，不碰网络也不碰存储。
 */

import type { PendingEntry, PendingKind, PendingSummary, UnitDetail } from '../platform/messaging';
import { isExam, OVERDUE_REASONS, type AutoAction, type ManualItem, type Plan } from './task-plan';
import type { Snapshot, SnapshotCourse, SnapshotWork } from './snapshot';
import { describeStatusDetail, describeWorkStatus } from './work-status';

/**
 * 自动项的三个类别 → 界面上的待办类别。
 *
 * 三种事各有各的去处：测验填答案、互评给同学打分、自评给自己的打分。
 * 早先用「是测验就 submit-quiz、否则 evaluate-homework」两分支，
 * 于是自评被显示成「互评作业」——点进去会发现评的是自己，
 * 与标题说的不是一回事。
 */
const AUTO_KIND: Record<AutoAction['kind'], PendingKind> = {
  quiz: 'submit-quiz',
  review: 'evaluate-homework',
  self: 'self-evaluate',
};

/**
 * 人工项的原因 → 界面上的待办类别。
 *
 * 一一对应，没有兜底分支：先前那个兜底会把「关掉自动答题的测验」
 * 显示成考试，因为它的 reason 是笼统的 task-disabled，只能落在最后。
 */
const MANUAL_KIND: Record<ManualItem['reason'], PendingKind> = {
  'homework-unsubmitted': 'submit-homework',
  'homework-overdue': 'submit-homework',
  'quiz-overdue': 'submit-quiz',
  'quiz-disabled': 'submit-quiz',
  'review-overdue': 'evaluate-homework',
  'review-disabled': 'evaluate-homework',
  'self-overdue': 'self-evaluate',
  'self-disabled': 'self-evaluate',
  exam: 'submit-exam',
  'exam-overdue': 'submit-exam',
};

/**
 * 过期项在待办里保留多久，单位天。
 *
 * 过期项不长期留在弹窗里。它的用处是「让用户知道自己漏了什么」，
 * 而这件事说一次就够了。挂一学期会攒出几十条不会被查看的记录，
 * 把真正要做的事挤下去。
 *
 * 保留几天由设置给出（ScheduleSettings.keepOverdueDays，默认 3 天）。
 *
 * 要看更早的，去设置页的「单元明细」：那里列全部单元，带状态与得分，
 * 全学期可查。弹窗回答「我现在做什么」，明细回答「这门课我做到哪了」，
 * 两者分工不同，因此不需要在弹窗里保留历史。
 */
/** 这条待办是否已经旧到不该再出现在弹窗里。 */
function isStaleOverdue(entry: PendingEntry, keepDays: number, now: number): boolean {
  if (!entry.overdue) return false;
  // 没有截止时间的过期项无从判断新旧，保留
  if (entry.deadline <= 0) return false;
  const age = now - entry.deadline;
  return age > keepDays * 24 * 60 * 60 * 1000;
}

/** 弹窗与明细共用的跳转定位。 */
function courseLocator(course: SnapshotCourse) {
  return {
    courseId: course.courseId,
    schoolShortName: course.schoolShortName,
    mode: course.mode,
    termId: course.termId,
  };
}

/**
 * 计划 → 弹窗待办。
 *
 * 两类都列出，但标注了各自会被怎么处理：
 *   能自动完成的标 auto，用户知道不必动手
 *   只能人工的标 manual，那才是真的要去做的
 *   已过截止的单列，它不是「待做」而是「已经漏了」
 *
 * 只列人工项是不行的：用户会以为某项测验「不存在」，而它正等待自动完成。
 * 全都列成一样也不行：那就回到了先前那种「看到未提交却不知道该不该管」的状态。
 */
export function toPendingSummary(plan: Plan, keepDays: number, now: number = Date.now()): PendingSummary {
  const entries: PendingEntry[] = [];

  for (const action of plan.auto) {
    const { course, work } = action;
    entries.push({
      /*
       * 三件事各有各的类别，不能合并。
       * 先前写成「是测验就 submit-quiz、否则 evaluate-homework」，
       * 于是自评被显示成「互评作业」——那是给同学的作业打分，
       * 与给自己的作业打分是完全不同的两件事。
       */
      kind: AUTO_KIND[action.kind],
      handling: 'auto',
      overdue: false,
      testId: work.tid,
      courseName: course.courseName,
      chapterName: work.chapterName,
      name: work.name,
      examId: work.examId,
      /*
       * 自动项取提交截止，互评与自评取互评截止。
       * 这与 task-plan 里把事项分进 auto 时的判断依据一致：
       * 测验要赶的是提交截止，评分要赶的是互评截止。
       */
      status: describeWorkStatus(work, now),
      statusDetail: describeStatusDetail(describeWorkStatus(work, now)),
      deadline:
        action.kind === 'quiz' ? (work.deadline ?? 0) : (work.evaluateEnd ?? 0),
      evaluateDone: action.kind === 'review' ? work.evaluateDone : null,
      evaluateTotal: action.kind === 'review' ? work.evaluateTotal : null,
      course: courseLocator(course),
    });
  }

  for (const item of plan.manual) {
    const { course, work, reason } = item;
    entries.push({
      // 每一类原因对应一件具体的事，不再有一对多的兜底分支
      kind: MANUAL_KIND[reason],
      handling: 'manual',
      /*
       * 四种过了截止的情形都要标出来。
       * 它们共有的含义是「平台上已经做不了了」，界面据此改说法，
       * 不再催用户去做一件做不了的事。
       */
      overdue: OVERDUE_REASONS.has(reason),
      testId: work.tid,
      courseName: course.courseName,
      chapterName: work.chapterName,
      name: work.name,
      examId: work.examId,
      status: describeWorkStatus(work, now),
      statusDetail: describeStatusDetail(describeWorkStatus(work, now)),
      deadline: item.deadline ?? 0,
      evaluateDone: null,
      evaluateTotal: null,
      course: courseLocator(course),
    });
  }

  /*
   * 去掉旧到不该再留的过期项。
   *
   * 放在排序之前：过期项的截止时间在过去，按时间升序它们会全部排在
   * 最前面。而用户打开弹窗是要看「现在做什么」，让三十天前的一份测验
   * 占着第一行是本末倒置。剩下的过期项也会被界面上单独归入一段，
   * 不混在待办里。
   */
  const live = entries.filter((entry) => !isStaleOverdue(entry, keepDays, now));

  /*
   * 排序分两层：未过期的按截止时间升序（越早到期越靠前，用户照顺序做），
   * 过期的排在最后。没有截止时间的排在各自的末尾——那类不紧急。
   */
  live.sort((a, b) => {
    if (a.overdue !== b.overdue) return a.overdue ? 1 : -1;
    const da = a.deadline > 0 ? a.deadline : Number.POSITIVE_INFINITY;
    const db = b.deadline > 0 ? b.deadline : Number.POSITIVE_INFINITY;
    return da - db;
  });

  return {
    auto: live.filter((e) => e.handling === 'auto').length,
    manual: live.filter((e) => e.handling === 'manual' && !e.overdue).length,
    overdue: live.filter((e) => e.overdue).length,
    entries: live,
  };
}

/**
 * 快照 → 设置页单元明细。
 *
 * 列出全部单元，不只是待办：这个页面的用途是「看清这门课我做到哪了」，
 * 所以已完成的也要在，而且带着得分，用户能对着分数确认。
 *
 * 考试与作业一样列出。考试曾经被排除，理由是「平台没有它的作答页」——
 * 那句话在接通考试之后就不成立了：考试有专门的答卷页，地址需要 examId，
 * 而 examId 随快照一起存了下来。排除它会让明细里缺一整类内容，
 * 用户在这门课到底考没考过就查不到。
 */
export function toUnitDetails(snapshot: Snapshot, now: number = Date.now()): UnitDetail[] {
  const details: UnitDetail[] = [];

  for (const course of snapshot.courses) {
    for (const work of course.works) {
      const status = describeWorkStatus(work, now);
      details.push({
        termId: course.termId,
        courseName: course.courseName,
        chapterName: work.chapterName,
        tid: work.tid,
        name: work.name,
        type: work.type,
        examId: work.examId,
        status,
        statusDetail: describeStatusDetail(status),
        submitted: work.submitted,
        score: work.score,
        totalScore: work.totalScore,
        deadline: work.deadline,
        evaluateDone: work.evaluateDone,
        evaluateTotal: work.evaluateTotal,
        courseId: course.courseId,
        schoolShortName: course.schoolShortName,
        mode: course.mode,
      });
    }
  }

  return details;
}

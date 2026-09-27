/*
 * 由快照派生出「该做什么」。
 *
 * 这是一个纯函数：给定快照与当前时刻，返回该自动做的、以及只能人工做的。
 * 不碰网络、不碰存储，因此可以放心地反复调用，也容易测。
 *
 * 两件事必须分清
 * --------------
 *   能自动的  —— 测验作答、互评、自评。拉回最新数据确认后立刻做掉。
 *   只能人工的 —— 作业主观题、已过截止的测验、考试。扩展做不了，
 *                 唯一能做的是在合适的时候提醒用户。
 *
 * 把它们混成一个「待办列表」是之前的问题所在：用户看到「待提交」，
 * 却不知道这一条到底会不会被自动处理，因为答案取决于今天是不是执行日。
 */

import type { Settings } from '../settings';
import type { Snapshot, SnapshotCourse, SnapshotWork } from './snapshot';

const DAY_MS = 24 * 60 * 60 * 1000;

/** 一件能自动完成的事。 */
export interface AutoAction {
  kind: 'quiz' | 'review' | 'self';
  course: SnapshotCourse;
  work: SnapshotWork;
  /** 互评还差几份；kind 为 review 时有值 */
  remaining: number;
}

/**
 * 哪些原因意味着「平台上已经做不了了」。
 *
 * 这四种都是过了某个截止时间：测验过了提交截止平台不允许开卷，
 * 作业过了提交截止平台不收，互评与自评过了互评截止则不再计分。
 *
 * 定义在 reason 旁边而不是各个使用处：先前提醒模块自己维护了一份
 * 只有两种的判据，后来新增互评与自评过期时就漏掉了它，
 * 于是那两项被当成「待你处理」报给用户——而它们根本做不了。
 */
export const OVERDUE_REASONS: ReadonlySet<ManualItem['reason']> = new Set([
  'homework-overdue',
  'quiz-overdue',
  'review-overdue',
  'self-overdue',
  'exam-overdue',
]);

/**
 * 是不是考试。
 *
 * 考试分客观题与主观题两种类型，而多数判断只关心「是不是考试」。
 * 把这两个字符串的比较收在一处，免得散落到各处——漏掉一个就会出现
 * 「主观题考试被当成作业」这类只在一半情况下发作的问题。
 *
 * 放在这个文件而不是 snapshot.ts：后者顶层要建立存储项，
 * 导入它就会拉起浏览器 API；而这里是纯逻辑，测试可以自由导入。
 */
export function isExam(type: SnapshotWork['type']): boolean {
  return type === 'exam-objective' || type === 'exam-subjective';
}

/** 一件只能由用户自己做的事。 */
export interface ManualItem {
  course: SnapshotCourse;
  work: SnapshotWork;
  /** 该看哪个截止时间 */
  deadline: number | null;
  /**
   * 为什么需要人工。每种情况界面上的说法与去处都不同，所以要分开。
   *
   *   homework-unsubmitted  主观题做不了，但还来得及自己写
   *   homework-overdue      同上，但已过提交截止，平台不收
   *   quiz-overdue          测验过了截止，平台不允许开卷
   *   review-overdue        作业过了互评截止但没评够，会影响成绩
   *   quiz-disabled         测验本可自动完成，但自动答题没开
   *   review-disabled       互评本可自动完成，但自动互评没开
   *   self-disabled         自评本可自动完成，但自动自评没开
   *   self-overdue          作业过了互评截止但自评没做，会影响成绩
   *   exam                  考试，尚未截止；扩展不自动作答
   *   exam-overdue          考试已过截止
   *
   * 曾经这里只有一个笼统的 task-disabled，于是界面无法判断被关掉的是
   * 哪一项，把它一律当成考试显示。分开之后每一条都能给出准确说法。
   */
  reason:
    | 'homework-unsubmitted'
    | 'homework-overdue'
    | 'quiz-overdue'
    | 'review-overdue'
    | 'self-overdue'
    | 'quiz-disabled'
    | 'review-disabled'
    | 'self-disabled'
    | 'exam'
    | 'exam-overdue';
}

export interface Plan {
  /** 能自动完成的。为空表示这一轮不需要写平台 */
  auto: AutoAction[];
  /** 只能人工的。用于提醒 */
  manual: ManualItem[];
}

/** 判断一个时刻是否落在提醒窗口内。 */
function withinWindow(deadline: number | null, advanceDays: number, now: number): boolean {
  if (deadline === null) return false;
  if (deadline <= now) return false;
  return deadline - now <= advanceDays * DAY_MS;
}

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

/** 当前哪些自动任务开着。 */
interface TaskSwitches {
  quiz: boolean;
  review: boolean;
  self: boolean;
}

function readSwitches(settings: Settings): TaskSwitches {
  return {
    quiz: settings.mooc.background.autoQuiz.enabled,
    review: settings.mooc.background.autoReview.enabled,
    self: settings.mooc.background.autoSelfEvaluate.enabled,
  };
}

/**
 * 派生本轮计划。
 *
 * **必须结合功能开关**：把某件事排进 auto 意味着「扩展会去做」，
 * 而这件事只有在对应开关打开时才成立。若不看开关就排进去，
 * 界面会显示「将自动完成」而实际上永远不会发生——
 * 用户既不会收到提醒（因为它被当作自动项），也不会去动手。
 *
 * 关掉的项进 manual 而不是被丢掉：那件事仍然没做，用户仍然要处理，
 * 只是从「扩展代劳」变成「自己动手」。
 *
 * auto 里的事项按「先做快的」排序：测验排在互评前面。测验一次请求就能定结果，
 * 而互评要逐份取、逐份提交；万一中途浏览器被关掉，先做完那些能做完的。
 */
export function derivePlan(
  snapshot: Snapshot,
  settings: Settings,
  now: number = Date.now(),
): Plan {
  const on = readSwitches(settings);
  const auto: AutoAction[] = [];
  const manual: ManualItem[] = [];

  for (const course of snapshot.courses) {
    for (const work of course.works) {
      /*
       * 考试。
       *
       * 不进自动：考试与测验用同一套接口，技术上可以支持，但考试通常
       * 通常只有一次作答机会（切屏会被计数、倒计时不可暂停），
       * 不该由后台代为点击提交。作答页上有填充与评分依据，提交由用户自己完成。
       *
       * 过了截止的同样标出来——那时候再提醒也做不了了，但用户该知道自己漏了。
       */
      if (isExam(work.type)) {
        if (!work.submitted) {
          const past = work.deadline !== null && work.deadline <= now;
          manual.push({
            course,
            work,
            deadline: work.deadline,
            reason: past ? 'exam-overdue' : 'exam',
          });
        }
        continue;
      }

      if (work.type === 'quiz') {
        if (work.submitted) continue;

        /*
         * 未提交的测验分三种。
         * 已过截止的平台不允许开卷，扩展做不了，只能提醒用户已经晚了。
         * 未过截止的看自动答题是否开启：开着就排进 auto，否则交给用户，
         * 而交给用户时要说明「打开那个开关就会被自动处理」——
         * 否则他会以为这件事无论如何都得亲手做。
         */
        if (work.deadline !== null && work.deadline <= now) {
          manual.push({ course, work, deadline: work.deadline, reason: 'quiz-overdue' });
        } else if (on.quiz) {
          auto.push({ kind: 'quiz', course, work, remaining: 0 });
        } else {
          manual.push({ course, work, deadline: work.deadline, reason: 'quiz-disabled' });
        }
        continue;
      }

      // 作业
      if (!work.submitted) {
        /*
         * 主观题，没有可自动填写的答案。这一点与开关无关。
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
        continue;
      }

      /*
       * 已提交的作业：看互评与自评。
       *
       * 不再用「是否处于互评窗口内」一刀切。窗口过了并不代表不用管：
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
          } else if (on.review) {
            auto.push({ kind: 'review', course, work, remaining });
          } else {
            manual.push({ course, work, deadline: work.evaluateEnd, reason: 'review-disabled' });
          }
        }
      }

      // 自评与互评共用同一份答卷，但配额各自独立
      if (work.selfDone === false) {
        if (!inWindow) {
          manual.push({ course, work, deadline: work.evaluateEnd, reason: 'self-overdue' });
        } else if (on.self) {
          auto.push({ kind: 'self', course, work, remaining: 0 });
        } else {
          manual.push({ course, work, deadline: work.evaluateEnd, reason: 'self-disabled' });
        }
      }
    }
  }

  /*
   * 测验排前面。一次请求就能定结果，而互评要逐份取逐份交；
   * 中途被关掉时，先保证那些能一次做完的已经做完。
   */
  auto.sort((a, b) => {
    const weight = (k: AutoAction['kind']) => (k === 'quiz' ? 0 : k === 'self' ? 1 : 2);
    return weight(a.kind) - weight(b.kind);
  });

  return { auto, manual };
}

/**
 * 是否值得去拉一次最新数据。
 *
 * 判据分三层，从省到费：
 *   1. 当前自动任务全关 → 只会提醒，不会写平台。快照足够，不必拉。
 *      例外：今天还没拉过，那要拉一次，否则快照会越来越旧。
 *   2. 快照里存在「能自动完成」的事项 → 拉。它们是能被消灭的，
 *      而且越早做掉越好。
 *   3. 今天还没拉过 → 拉。这是发现新作业的唯一手段。
 *      本地快照永远不知道今天多了什么。
 *
 * 注意第 1 层：用户把三个自动任务都关掉、只留提醒时，仍然需要每天拉一次。
 * 否则提醒会基于越来越旧的快照，说「还有 2 天」而实际已经截至。
 */
export function shouldRefresh(
  snapshot: Snapshot | null,
  settings: Settings,
  fetchedToday: boolean,
  now: number = Date.now(),
): boolean {
  // 没有快照，什么都判断不了
  if (snapshot === null) return true;

  const taskEnabled =
    settings.mooc.background.autoQuiz.enabled ||
    settings.mooc.background.autoReview.enabled ||
    settings.mooc.background.autoSelfEvaluate.enabled;

  if (taskEnabled) {
    // 有能被消灭的事项就去拉，不必等满一天
    const { auto } = derivePlan(snapshot, settings, now);
    if (auto.length > 0) return true;
  }

  // 兜底：每天至少拉一次，用来发现新发布的作业
  return !fetchedToday;
}

/** 计划里能自动完成的部分是否为空。 */
export function planIsEmpty(plan: Plan): boolean {
  return plan.auto.length === 0 && plan.manual.length === 0;
}

/** 供提醒使用：筛出落在窗口内的手工项。 */
export function dueManualItems(plan: Plan, advanceDays: number, now: number): ManualItem[] {
  return plan.manual.filter((item) => withinWindow(item.deadline, advanceDays, now));
}


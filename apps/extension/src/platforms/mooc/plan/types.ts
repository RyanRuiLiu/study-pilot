/*
 * 计划的类型与判据。
 *
 * 放在 `task-plan/` 下而不是 `snapshot.ts`：后者顶层要建立存储项，
 * 导入它就会拉起浏览器 API；这些是纯逻辑，测试可以自由导入。
 */

import type { CourseUnit } from '@study-pilot/platform-mooc';
import type { SnapshotCourse, SnapshotWork } from '../read';

/**
 * 一件能自动完成的事。
 *
 * 两种形态：作业/测验/考试上的，与课件单元上的。用可辨识联合而不是
 * 「两个字段都在、其中一个为空」——后者让每个使用处都得先判空，
 * 漏一处就是运行时崩溃。
 */
export type AutoAction = WorkAutoAction | CoursewareAutoAction;

/** 作业、测验、考试上的自动项。 */
export interface WorkAutoAction {
  kind: 'quiz' | 'review' | 'self';
  course: SnapshotCourse;
  work: SnapshotWork;
  /** 互评还差几份；kind 为 review 时有值 */
  remaining: number;
}

/** 课件单元上的自动项。 */
export interface CoursewareAutoAction {
  kind: 'courseware';
  course: SnapshotCourse;
  unit: CourseUnit;
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

/** 当前哪些自动任务开着。 */
export interface TaskSwitches {
  courseware: boolean;
  quiz: boolean;
  review: boolean;
  self: boolean;
}

/**
 * 哪些原因意味着「平台上已经做不了了」。
 *
 * 这几种都是过了某个截止时间：测验过了提交截止平台不允许开卷，
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
 */
export function isExam(type: SnapshotWork['type']): boolean {
  return type === 'exam-objective' || type === 'exam-subjective';
}

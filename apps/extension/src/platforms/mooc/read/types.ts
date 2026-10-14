/*
 * 一次读取的结果结构。
 *
 * 取什么、不取什么
 * ----------------
 * 只取判断所需的字段：做没做、截止时间、互评进度。不取题干、不取答案、
 * 不取得分明细——那些对判断没有用，取了只是扩大泄漏面。
 */

import type { CourseUnit } from '@study-pilot/platform-mooc';

/** 一个单元项在快照里的样子。 */
export interface SnapshotWork {
  tid: number;
  name: string;
  chapterName: string;
  /**
   * 考试自身的 id，仅考试有。
   *
   * 答卷页地址需要它，而它不属于任何单元，只能随快照一起存下来。
   */
  examId: number | null;
  type: 'quiz' | 'homework' | 'exam-objective' | 'exam-subjective';
  /** 做没做。测验看 usedTryCount，作业看是否交过 */
  submitted: boolean;
  /** 提交截止 */
  deadline: number | null;
  /** 互评窗口起点 */
  evaluateStart: number | null;
  /** 互评截止 */
  evaluateEnd: number | null;
  /** 成绩发布时间 */
  evaluateScoreRelease: number | null;
  score: number | null;
  totalScore: number | null;
  /** 这份作业是否带互评环节 */
  reviewable: boolean;
  /** 互评已完成的份数；未查过为 null */
  evaluateDone: number | null;
  /** 互评配额；未查过为 null */
  evaluateTotal: number | null;
  /** 自评是否已完成；未查过为 null */
  selfDone: boolean | null;
}

export interface SnapshotCourse {
  termId: number;
  /** 拼跳转地址用 */
  courseId: number;
  schoolShortName: string;
  mode: number;
  courseName: string;
  works: SnapshotWork[];
  /**
   * 课件单元。
   *
   * 与 works 是两套东西：works 是「要交的作业/测验/考试」，units 是「要看的内容」。
   * 这里原样存结构里的单元——字段本来就少，而「能不能上报完成」由
   * `isCompletable` 判断，快照不重复那套规则。
   */
  units: CourseUnit[];
}

export interface Snapshot {
  courses: SnapshotCourse[];
}

/**
 * 拉取时需要的课程信息。
 *
 * 只列真正用到的字段，而不是要求一个完整的 CourseSummary。理由是调用方
 * 持有的是用户配置里的课程（只有 termId、课程名与定位信息），
 * 为了凑齐接口类型去编造 schoolName、coverUrl 之类的字段，
 * 等于在代码里写下不存在的事实。
 */
export interface InspectCourse {
  termId: number;
  courseId: number;
  schoolShortName: string;
  /** 课程模式。缺失时为 null，快照里记 -1 表示未知 */
  mode: number | null;
  /** 课程名。为空时回退到平台返回的名字 */
  name: string;
}

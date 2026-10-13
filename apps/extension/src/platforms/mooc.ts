/*
 * mooc 平台的中立映射。
 *
 * 输入是**本地快照**（后台读回来的观测结果），不是原始接口响应：快照里已经
 * 是归一化过的领域字段，adapter 只负责把它翻译成中立模型。
 *
 * 这一层是唯一允许出现平台字段的地方（`termId`、`contentType`、平台地址拼法）。
 * 看板只认中立模型，因此换平台时改的是这个文件，不是看板。
 */

import {
  isUnitComplete,
  UNIT_TYPE,
  workPageUrl,
  type CourseUnit,
} from '@study-pilot/platform-mooc';
import type { Course, Platform, Task, TaskKind } from '../domain/task';
import { taskId } from '../domain/task';
import type { SnapshotCourse, SnapshotWork } from '../background/mooc/snapshot';

export const MOOC_PLATFORM: Platform = { id: 'mooc', name: '慕课' };

/** 课件单元类型 → 任务类别。未实测过的类型不映射（宁可不展示也不猜）。 */
const UNIT_KIND: Record<number, TaskKind> = {
  [UNIT_TYPE.VIDEO]: 'video',
  [UNIT_TYPE.PDF]: 'document',
  [UNIT_TYPE.TEXT]: 'text',
  [UNIT_TYPE.QUESTION]: 'quiz',
  [UNIT_TYPE.DISCUSS]: 'discuss',
};

/**
 * 工作项类型 → 地址用的页面类型。
 *
 * 平台的地址按这四个值拼（`#/learn/quiz|hw|examObject|examSubjective`），
 * 与快照里的 type 一一对应，因此是恒等映射——写出来是为了把「拼地址用的值」
 * 与「看板用的类别」这两件事分开：前者的取值由平台决定，后者由我们决定。
 */
type WorkPageKind = 'quiz' | 'homework' | 'exam-objective' | 'exam-subjective';

const WORK_PAGE_KIND: Record<SnapshotWork['type'], WorkPageKind> = {
  quiz: 'quiz',
  homework: 'homework',
  'exam-objective': 'exam-objective',
  'exam-subjective': 'exam-subjective',
};

/** 工作项类型 → 任务类别。 */
const WORK_KIND: Record<SnapshotWork['type'], TaskKind> = WORK_PAGE_KIND;

export function toCourse(course: SnapshotCourse): Course {
  return {
    platformId: MOOC_PLATFORM.id,
    courseId: course.courseId,
    termId: course.termId,
    name: course.courseName,
  };
}

/** 一个课件单元 → 任务。不能映射的类型返回 null。 */
function unitToTask(course: SnapshotCourse, unit: CourseUnit): Task | null {
  const kind = UNIT_KIND[unit.contentType];
  if (!kind) return null;

  return {
    id: taskId(MOOC_PLATFORM.id, course.courseId, kind, unit.unitId),
    platformId: MOOC_PLATFORM.id,
    courseId: course.courseId,
    kind,
    title: unit.name,
    /*
     * 讨论要 AI 写留言，因此是 assisted；其余课件单元一条请求就能完成。
     * 这与 platform-mooc 的 `UNIT_TYPE` 注册表（BEHAVIORS 的 needs）一一对应。
     */
    mode: kind === 'discuss' ? 'assisted' : 'auto',
    state: isUnitComplete(unit) ? 'done' : 'todo',
  };
}

/** 一个工作项 → 任务（可能不止一条：已提交的作业还会派生互评与自评）。 */
function workToTasks(course: SnapshotCourse, work: SnapshotWork): Task[] {
  const tasks: Task[] = [];
  const kind = WORK_KIND[work.type];
  const link = workPageUrl(course, WORK_PAGE_KIND[work.type], work.tid, work.examId ?? undefined);

  /*
   * 工作项本身。
   *
   * 主观题只能人工写（homework 一律 manual）；考试不自动提交（两种题型都 manual，
   * 只有一次作答机会，不该由后台代点）；测验未提交时可由后台完成。
   */
  const mode = kind === 'quiz' ? 'auto' : 'manual';
  const state = work.submitted ? 'done' : 'todo';
  tasks.push({
    id: taskId(MOOC_PLATFORM.id, course.courseId, kind, work.tid),
    platformId: MOOC_PLATFORM.id,
    courseId: course.courseId,
    kind,
    title: work.name,
    dueAt: work.deadline ?? undefined,
    score: work.score ?? undefined,
    maxScore: work.totalScore ?? undefined,
    mode,
    state,
    link,
  });

  /*
   * 互评与自评：只有已提交、支持互评、且平台报过配额的作业才有。
   * 它们是**独立的任务**而不是工作项的一个字段——要不要做、做没做完
   * 都与「交没交」不同，混在一起看板就只能显示一半。
   */
  if (work.submitted && work.reviewable && work.evaluateTotal !== null && work.evaluateDone !== null) {
    const remaining = work.evaluateTotal - work.evaluateDone;
    tasks.push({
      id: taskId(MOOC_PLATFORM.id, course.courseId, 'peer-review', work.tid),
      platformId: MOOC_PLATFORM.id,
      courseId: course.courseId,
      kind: 'peer-review',
      title: `${work.name}（互评）`,
      dueAt: work.evaluateEnd ?? undefined,
      mode: 'auto',
      state: remaining > 0 ? 'todo' : 'done',
      link,
    });
  }

  if (work.submitted && work.reviewable && work.selfDone !== null) {
    tasks.push({
      id: taskId(MOOC_PLATFORM.id, course.courseId, 'self-review', work.tid),
      platformId: MOOC_PLATFORM.id,
      courseId: course.courseId,
      kind: 'self-review',
      title: `${work.name}（自评）`,
      dueAt: work.evaluateEnd ?? undefined,
      mode: 'auto',
      state: work.selfDone ? 'done' : 'todo',
      link,
    });
  }

  return tasks;
}

/** 一门课的全部任务。 */
export function toTasks(course: SnapshotCourse): Task[] {
  const tasks = course.works.flatMap((work) => workToTasks(course, work));
  for (const unit of course.units) {
    const task = unitToTask(course, unit);
    if (task) tasks.push(task);
  }
  return tasks;
}

/*
 * 看板的数据：把慕课的快照读成一行行。
 *
 * **直接消费慕课自己的字段**，不经过任何中立模型：平台的快照长什么样，
 * 这里就按什么取值。各网站的协议与字段本来就不同，硬压成一种形状只会多出
 * 一层要维护的映射——这一层已经删掉了。
 *
 * 行（BoardItem）是**本文件内部的展示形状**：把「工作项」与「课件单元」排成同一种
 * 列表所需的几个字段，在这里就地算好。它交给概览的是文字与枚举，
 * 表格、排序与标签颜色都由壳层负责（见 entrypoints/options/overview.ts）。
 */

import { UNIT_TYPE, workPageUrl, type CourseUnit } from '@study-pilot/platform-mooc';
import type { SnapshotCourse, SnapshotWork } from './read';
import { dueLine } from '../../ui/format';
import { describeStatusDetail, describeWorkStatus } from './work-status.ts';

/** 工作项类别（平台的 work.type 原样）。 */
const WORK_LABEL: Record<SnapshotWork['type'], string> = {
  quiz: '测验',
  homework: '作业',
  'exam-objective': '考试（客观）',
  'exam-subjective': '考试（主观）',
};

/** 课件单元类别（平台的 contentType）。未实测的类型不标，宁可空着也不猜。 */
const UNIT_LABEL: Record<number, string> = {
  [UNIT_TYPE.VIDEO]: '视频',
  [UNIT_TYPE.PDF]: '文档',
  [UNIT_TYPE.TEXT]: '文本',
  [UNIT_TYPE.QUESTION]: '随堂测验',
  [UNIT_TYPE.DISCUSS]: '讨论',
};

type BoardMode = 'auto' | 'assisted' | 'manual';
type BoardState = 'todo' | 'done' | 'late';


export interface BoardItem {
  id: string;
  courseId: number;
  /** 课程名。概览的左树按它分组，不让界面自己去查课程 */
  course: string;
  title: string;
  kind: string;
  mode: BoardMode;
  state: BoardState;
  /** 状态标签：工作项用平台的说法（未提交 / 互评 2/5…），课件单元没有更多话说，留空 */
  status: string;
  /** 状态的补充说明。几个相近说法的区别不自明，写在悬停里 */
  statusDetail: string;
  /** 截止时间（毫秒）；0 表示平台没给。只用于排序 */
  due: number;
  /** 截止的显示文字；空串表示这一行不显示时间 */
  dueLabel: string;
  /** 得分的显示文字；空串表示没有得分 */
  scoreLabel: string;
  /** 互评 / 自评进度（只有支持互评的作业才有） */
  review?: string;
  href?: string;
}

/** 工作项 → 行。做法按平台事实判断：未提交的测验后台能做完，其余只能人工。 */
function workRow(course: SnapshotCourse, work: SnapshotWork): BoardItem {
  const status = describeWorkStatus(work);
  const late = !work.submitted && work.deadline !== null && work.deadline > 0 && work.deadline < Date.now();
  const review =
    work.reviewable && work.evaluateTotal !== null && work.evaluateDone !== null
      ? `互评 ${work.evaluateDone}/${work.evaluateTotal}${work.selfDone === null ? '' : work.selfDone ? '，自评已完成' : '，自评未做'}`
      : undefined;

  const dueLabel = dueLine(work.deadline ?? 0);

  return {
    id: `work-${work.tid}`,
    courseId: course.courseId,
    course: course.courseName,
    title: work.name,
    status,
    statusDetail: describeStatusDetail(status),
    dueLabel,
    kind: WORK_LABEL[work.type],
    mode: work.type === 'quiz' && !work.submitted ? 'auto' : 'manual',
    state: work.submitted ? 'done' : late ? 'late' : 'todo',
    due: work.deadline ?? 0,
    /*
     * 只有真的有了分数才写这一格。未提交时显示「— / 20」是在说「这里本该有个分数」，
     * 而那一列的作用恰恰是让人扫出哪些已经出分——没出的留空，眼睛才能跳过去。
     */
    scoreLabel: work.score === null || work.totalScore === null ? '' : `${work.score} / ${work.totalScore}`,
    review,
    href: workPageUrl(course, work.type, work.tid, work.examId ?? undefined),
  };
}

/** 课件单元 → 行。讨论要 AI 写留言，因此是"需要你确认"，其余一条请求即可完成。 */
function unitRow(course: SnapshotCourse, unit: CourseUnit): BoardItem {
  return {
    id: `unit-${unit.unitId}`,
    courseId: course.courseId,
    course: course.courseName,
    title: unit.name,
    /*
     * 课件单元没有比「已完成 / 未完成」更多的话要说，因此这一格留空。
     * 先前这里写的是与状态同一套字，于是概览那一列读作「未完成 · 未完成」。
     */
    status: '',
    statusDetail: '',
    dueLabel: '',
    scoreLabel: '',
    kind: UNIT_LABEL[unit.contentType] ?? '课件',
    mode: unit.contentType === UNIT_TYPE.DISCUSS ? 'assisted' : 'auto',
    state: unit.completePercent >= 1 ? 'done' : 'todo',
    due: 0,
  };
}

export function boardItems(course: SnapshotCourse): BoardItem[] {
  return [
    ...course.works.map((work) => workRow(course, work)),
    ...course.units.map((unit) => unitRow(course, unit)),
  ];
}

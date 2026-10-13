/*
 * 看板的展示：文案标签、筛选、分组渲染。
 *
 * **直接消费慕课自己的字段**，不经过任何中立模型：平台的快照长什么样，
 * 这里就按什么渲染。各网站的协议与字段本来就不同，硬压成一种形状只会多出
 * 一层要维护的映射——这一层已经删掉了。
 *
 * 行（BoardItem）是**本文件内部的展示形状**：把「工作项」与「课件单元」排成同一种
 * 列表所需的几个字段，在这里就地算好。它不出这个文件，因此不是跨层映射。
 */

import { UNIT_TYPE, workPageUrl, type CourseUnit } from '@study-pilot/platform-mooc';
import type { Snapshot, SnapshotCourse, SnapshotWork } from '../../src/background/mooc/snapshot';
import { formatDate, relativeDay } from '../../src/features/format';

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

export type BoardMode = 'auto' | 'assisted' | 'manual';
export type BoardState = 'todo' | 'done' | 'late';

export const MODE_LABEL: Record<BoardMode, string> = {
  auto: '自动完成',
  assisted: '需要你确认',
  manual: '需要你做',
};

export const STATE_LABEL: Record<BoardState, string> = {
  todo: '未完成',
  done: '已完成',
  late: '已过截止',
};

export interface BoardItem {
  id: string;
  courseId: number;
  title: string;
  kind: string;
  mode: BoardMode;
  state: BoardState;
  /** 截止时间（毫秒）；0 表示平台没给 */
  due: number;
  score?: { got: number | null; max: number | null };
  /** 互评 / 自评进度（只有支持互评的作业才有） */
  review?: string;
  href?: string;
}

export interface Filters {
  /** 'all' 或课程 id */
  courseId: string;
  /** 'all' 或类别标签 */
  kind: string;
  /** 'all' 或做法 */
  mode: string;
  /** 默认 `open`（未完成 + 已过截止）：打开看板是要看「还剩什么」 */
  state: 'open' | 'todo' | 'late' | 'done' | 'all';
}

export const DEFAULT_FILTERS: Filters = { courseId: 'all', kind: 'all', mode: 'all', state: 'open' };

export const STATE_FILTERS: Array<{ value: Filters['state']; label: string }> = [
  { value: 'open', label: '未完成与已过截止' },
  { value: 'todo', label: '只看未完成' },
  { value: 'late', label: '只看已过截止' },
  { value: 'done', label: '只看已完成' },
  { value: 'all', label: '全部状态' },
];

/** 工作项 → 行。做法按平台事实判断：未提交的测验后台能做完，其余只能人工。 */
function workRow(course: SnapshotCourse, work: SnapshotWork): BoardItem {
  const late = !work.submitted && work.deadline !== null && work.deadline > 0 && work.deadline < Date.now();
  const review =
    work.reviewable && work.evaluateTotal !== null && work.evaluateDone !== null
      ? `互评 ${work.evaluateDone}/${work.evaluateTotal}${work.selfDone === null ? '' : work.selfDone ? '，自评已完成' : '，自评未做'}`
      : undefined;

  return {
    id: `work-${work.tid}`,
    courseId: course.courseId,
    title: work.name,
    kind: WORK_LABEL[work.type],
    mode: work.type === 'quiz' && !work.submitted ? 'auto' : 'manual',
    state: work.submitted ? 'done' : late ? 'late' : 'todo',
    due: work.deadline ?? 0,
    score: work.totalScore === null ? undefined : { got: work.score, max: work.totalScore },
    review,
    href: workPageUrl(course, work.type, work.tid, work.examId ?? undefined),
  };
}

/** 课件单元 → 行。讨论要 AI 写留言，因此是"需要你确认"，其余一条请求即可完成。 */
function unitRow(course: SnapshotCourse, unit: CourseUnit): BoardItem {
  return {
    id: `unit-${unit.unitId}`,
    courseId: course.courseId,
    title: unit.name,
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

export function filterItems(items: BoardItem[], filters: Filters): BoardItem[] {
  const matchesState = (item: BoardItem): boolean => {
    if (filters.state === 'all') return true;
    if (filters.state === 'open') return item.state !== 'done';
    return item.state === filters.state;
  };

  return items.filter(
    (item) =>
      (filters.courseId === 'all' || item.courseId === Number(filters.courseId)) &&
      (filters.kind === 'all' || item.kind === filters.kind) &&
      (filters.mode === 'all' || item.mode === filters.mode) &&
      matchesState(item),
  );
}

/** 可选的类别：由当前数据里真正出现过的类别组成，不列平台可能有的全部。 */
export function kindOptions(view: Snapshot | null): string[] {
  if (view === null) return [];
  const seen = new Set<string>();
  for (const course of view.courses) for (const item of boardItems(course)) seen.add(item.kind);
  return [...seen];
}

/** 排序：未完成的在前，其次按截止（没有截止的排后），同档按标题稳定。 */
export function orderItems(items: BoardItem[]): BoardItem[] {
  const rank = (item: BoardItem): number => (item.state === 'done' ? 2 : item.state === 'late' ? 1 : 0);
  return [...items].sort((left, right) => {
    if (rank(left) !== rank(right)) return rank(left) - rank(right);
    const leftDue = left.due > 0 ? left.due : Number.MAX_SAFE_INTEGER;
    const rightDue = right.due > 0 ? right.due : Number.MAX_SAFE_INTEGER;
    if (leftDue !== rightDue) return leftDue - rightDue;
    return left.id.localeCompare(right.id);
  });
}

function row(item: BoardItem): HTMLElement {
  const element = document.createElement('div');
  element.className = 'sp-task';
  element.dataset.state = item.state;
  element.dataset.mode = item.mode;

  const main = document.createElement('div');
  main.className = 'sp-task-main';

  const title = document.createElement(item.href ? 'a' : 'span');
  title.className = 'sp-task-title';
  title.textContent = item.title;
  // 用元素自身与属性写，不依赖浏览器全局：测试里（linkedom）也能直接建出来
  if (item.href !== undefined) {
    title.setAttribute('href', item.href);
    title.setAttribute('target', '_blank');
    title.setAttribute('rel', 'noreferrer');
  }

  const kind = document.createElement('span');
  kind.className = 'sp-chip';
  kind.textContent = item.kind;

  const mode = document.createElement('span');
  mode.className = `sp-chip is-${item.mode}`;
  mode.textContent = MODE_LABEL[item.mode];

  const state = document.createElement('span');
  state.className = `sp-chip is-${item.state}`;
  state.textContent = STATE_LABEL[item.state];

  main.append(title, kind, mode, state);

  const meta = document.createElement('div');
  meta.className = 'sp-task-meta';

  if (item.due > 0) {
    const due = document.createElement('span');
    due.className = 'sp-task-due';
    due.textContent = `${relativeDay(item.due)}（${formatDate(item.due)}）`;
    meta.append(due);
  }
  if (item.score !== undefined) {
    const score = document.createElement('span');
    score.className = 'sp-task-score';
    score.textContent = `得分 ${item.score.got ?? '—'} / ${item.score.max ?? '—'}`;
    meta.append(score);
  }
  if (item.review !== undefined) {
    const review = document.createElement('span');
    review.className = 'sp-task-review';
    review.textContent = item.review;
    meta.append(review);
  }

  element.append(main, meta);
  return element;
}

function group(course: SnapshotCourse | undefined, items: BoardItem[]): HTMLElement {
  const section = document.createElement('section');
  section.className = 'sp-group';

  const head = document.createElement('p');
  head.className = 'sp-group-head';

  const name = document.createElement('span');
  name.textContent = course?.courseName ?? `课程 ${items[0]?.courseId ?? ''}`;

  const count = document.createElement('span');
  count.className = 'sp-group-count';
  const open = items.filter((item) => item.state !== 'done').length;
  count.textContent = open > 0 ? `${items.length} 项，${open} 项未完成` : `${items.length} 项，全部完成`;

  head.append(name, count);
  section.append(head);
  for (const item of orderItems(items)) section.append(row(item));
  return section;
}

/** 渲染整块看板。`items` 已经过筛选。 */
export function renderBoard(app: HTMLElement, view: Snapshot | null, items: BoardItem[]): void {
  app.replaceChildren();

  if (view === null || view.courses.length === 0) {
    app.append(note('还没有数据。让后台跑一次检查（设置页的「执行与诊断」），或先打开一次弹窗。'));
    return;
  }

  if (items.length === 0) {
    app.append(note('当前筛选下没有任务。'));
    return;
  }

  app.append(summaryLine(items));

  const byCourse = new Map<number, BoardItem[]>();
  for (const item of items) {
    const bucket = byCourse.get(item.courseId);
    if (bucket) bucket.push(item);
    else byCourse.set(item.courseId, [item]);
  }

  for (const [courseId, list] of byCourse) {
    app.append(group(view.courses.find((course) => course.courseId === courseId), list));
  }
}

/**
 * 顶部那行计数。
 *
 * 按「谁来做」分开数而不合成一个「待办 9 项」：用户要知道的是其中几件
 * 后台会代做、几件要自己动手——合成一个数字就把这个差别抹掉了。
 */
function summaryLine(items: BoardItem[]): HTMLElement {
  // 已过截止的既不能被自动完成、也不能由用户补做，因此不计进「谁来做」，只单独点出来
  const count = (mode: BoardMode): number =>
    items.filter((item) => item.state === 'todo' && item.mode === mode).length;

  const parts = [`共 ${items.filter((item) => item.state !== 'done').length} 项`, `会自动完成 ${count('auto')}`];
  const assisted = count('assisted');
  if (assisted > 0) parts.push(`需要确认 ${assisted}`);
  parts.push(`需要你做 ${count('manual')}`);

  const late = items.filter((item) => item.state === 'late').length;
  if (late > 0) parts.push(`已过截止 ${late}`);

  const element = document.createElement('p');
  element.className = 'sp-summary';
  element.textContent = parts.join(' · ');
  return element;
}

function note(text: string): HTMLElement {
  const element = document.createElement('p');
  element.className = 'sp-empty';
  element.textContent = text;
  return element;
}

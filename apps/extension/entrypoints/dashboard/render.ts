/*
 * 看板的展示：文案标签、筛选、分组渲染。
 *
 * 只认中立模型（`domain/task.ts`），因此不 import 任何平台包——
 * 换平台时这个文件不需要改。
 */

import type { Course, DashboardView, Task, TaskKind, TaskMode, TaskState } from '../../src/domain/task';
import { formatDate, relativeDay } from '../../src/features/format';

export const KIND_LABEL: Record<TaskKind, string> = {
  video: '视频',
  document: '文档',
  text: '文本',
  discuss: '讨论',
  quiz: '测验',
  homework: '作业',
  'exam-objective': '考试（客观）',
  'exam-subjective': '考试（主观）',
  'peer-review': '互评',
  'self-review': '自评',
};

export const MODE_LABEL: Record<TaskMode, string> = {
  auto: '自动完成',
  assisted: '需要你确认',
  manual: '需要你做',
};

export const STATE_LABEL: Record<TaskState, string> = {
  todo: '未完成',
  done: '已完成',
  failed: '失败',
};

export interface Filters {
  /** 'all' 或课程 id */
  courseId: string;
  /** 'all' 或 TaskKind */
  kind: string;
  /** 'all' 或 TaskMode */
  mode: string;
  /**
   * 状态筛选。
   *
   * 默认是 `open`（未完成 + 失败）：用户打开看板是要看「还剩什么」，
   * 已完成的一大片会把要紧的挤下去。
   */
  state: 'open' | 'todo' | 'failed' | 'done' | 'all';
}

export const DEFAULT_FILTERS: Filters = {
  courseId: 'all',
  kind: 'all',
  mode: 'all',
  state: 'open',
};

function matchesState(task: Task, state: Filters['state']): boolean {
  if (state === 'all') return true;
  if (state === 'open') return task.state !== 'done';
  return task.state === state;
}

export function filterTasks(tasks: Task[], filters: Filters): Task[] {
  return tasks.filter(
    (task) =>
      (filters.courseId === 'all' || task.courseId === Number(filters.courseId)) &&
      (filters.kind === 'all' || task.kind === filters.kind) &&
      (filters.mode === 'all' || task.mode === filters.mode) &&
      matchesState(task, filters.state),
  );
}

function row(task: Task): HTMLElement {
  const element = document.createElement('div');
  element.className = 'row';
  element.dataset.state = task.state;
  element.dataset.mode = task.mode;

  const main = document.createElement('div');
  main.className = 'row-main';

  const title = document.createElement(task.link ? 'a' : 'span');
  title.className = 'row-title';
  title.textContent = task.title;
  if (title instanceof HTMLAnchorElement && task.link) {
    title.href = task.link;
    title.target = '_blank';
    title.rel = 'noreferrer';
  }

  const kind = document.createElement('span');
  kind.className = 'chip';
  kind.textContent = KIND_LABEL[task.kind];

  const mode = document.createElement('span');
  mode.className = `chip is-${task.mode}`;
  mode.textContent = MODE_LABEL[task.mode];

  const state = document.createElement('span');
  state.className = `chip is-${task.state}`;
  state.textContent = STATE_LABEL[task.state];

  main.append(title, kind, mode, state);

  const meta = document.createElement('div');
  meta.className = 'row-meta';

  if (task.dueAt) {
    const due = document.createElement('span');
    due.className = 'due';
    due.textContent = `${relativeDay(task.dueAt)}（${formatDate(task.dueAt)}）`;
    meta.append(due);
  }
  if (task.score !== undefined || task.maxScore !== undefined) {
    const score = document.createElement('span');
    score.className = 'score';
    score.textContent = `得分 ${task.score ?? '—'} / ${task.maxScore ?? '—'}`;
    meta.append(score);
  }

  element.append(main, meta);
  return element;
}

function group(course: Course | undefined, tasks: Task[]): HTMLElement {
  const section = document.createElement('section');
  section.className = 'group';

  const head = document.createElement('p');
  head.className = 'group-head';

  const name = document.createElement('span');
  name.textContent = course?.name ?? `课程 ${tasks[0]?.courseId ?? ''}`;

  const count = document.createElement('span');
  count.className = 'count';
  const open = tasks.filter((task) => task.state !== 'done').length;
  count.textContent = open > 0 ? `${tasks.length} 项，${open} 项未完成` : `${tasks.length} 项，全部完成`;

  head.append(name, count);
  section.append(head);
  for (const task of tasks) section.append(row(task));
  return section;
}

/** 渲染整块看板。`view.tasks` 已经过筛选。 */
export function renderBoard(app: HTMLElement, view: DashboardView, tasks: Task[]): void {
  app.replaceChildren();

  if (view.courses.length === 0) {
    app.append(
      note('还没有数据。让后台跑一次检查（设置页的「执行与诊断」），或先打开一次弹窗。'),
    );
    return;
  }

  if (tasks.length === 0) {
    app.append(note('当前筛选下没有任务。'));
    return;
  }

  const byCourse = new Map<number, Task[]>();
  for (const task of tasks) {
    const bucket = byCourse.get(task.courseId);
    if (bucket) bucket.push(task);
    else byCourse.set(task.courseId, [task]);
  }

  for (const [courseId, list] of byCourse) {
    app.append(group(view.courses.find((course) => course.courseId === courseId), list));
  }
}

function note(text: string): HTMLElement {
  const element = document.createElement('p');
  element.className = 'empty';
  element.textContent = text;
  return element;
}

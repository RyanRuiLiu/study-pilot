/*
 * 看板的展示：文案标签、筛选、分组渲染。
 *
 * 只认中立模型（`domain/task.ts`），因此不 import 任何平台包——
 * 换平台时这个文件不需要改。
 */

import type { Course, DashboardView, Task, TaskKind, TaskMode, TaskState } from '../../src/domain/task';
import { orderTasks, summarize } from '../../src/domain/plan';
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

/**
 * 状态筛选的选项。
 *
 * 「未完成与失败」放在第一个，因为它是默认视图：用户打开看板是要看还剩什么，
 * 已完成的一大片会把要紧的挤下去。想全看时才去改。
 */
export const STATE_FILTERS: Array<{ value: Filters['state']; label: string }> = [
  { value: 'open', label: '未完成与失败' },
  { value: 'todo', label: '只看未完成' },
  { value: 'failed', label: '只看失败' },
  { value: 'done', label: '只看已完成' },
  { value: 'all', label: '全部状态' },
];

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
  element.className = 'sp-task';
  element.dataset.state = task.state;
  element.dataset.mode = task.mode;

  const main = document.createElement('div');
  main.className = 'sp-task-main';

  const title = document.createElement(task.link ? 'a' : 'span');
  title.className = 'sp-task-title';
  title.textContent = task.title;
  /*
   * 用 setAttribute 而不是 title.href / instanceof HTMLAnchorElement：
   * 靠元素自身与属性写，不依赖浏览器全局，测试里（linkedom）也能直接建出来。
   */
  if (task.link !== undefined) {
    title.setAttribute('href', task.link);
    title.setAttribute('target', '_blank');
    title.setAttribute('rel', 'noreferrer');
  }

  const kind = document.createElement('span');
  kind.className = 'sp-chip';
  kind.textContent = KIND_LABEL[task.kind];

  const mode = document.createElement('span');
  mode.className = `sp-chip is-${task.mode}`;
  mode.textContent = MODE_LABEL[task.mode];

  const state = document.createElement('span');
  state.className = `sp-chip is-${task.state}`;
  state.textContent = STATE_LABEL[task.state];

  main.append(title, kind, mode, state);

  const meta = document.createElement('div');
  meta.className = 'sp-task-meta';

  if (task.dueAt) {
    const due = document.createElement('span');
    due.className = 'sp-task-due';
    due.textContent = `${relativeDay(task.dueAt)}（${formatDate(task.dueAt)}）`;
    meta.append(due);
  }
  if (task.score !== undefined || task.maxScore !== undefined) {
    const score = document.createElement('span');
    score.className = 'sp-task-score';
    score.textContent = `得分 ${task.score ?? '—'} / ${task.maxScore ?? '—'}`;
    meta.append(score);
  }

  element.append(main, meta);
  return element;
}

function group(course: Course | undefined, tasks: Task[]): HTMLElement {
  const section = document.createElement('section');
  section.className = 'sp-group';

  const head = document.createElement('p');
  head.className = 'sp-group-head';

  const name = document.createElement('span');
  name.textContent = course?.name ?? `课程 ${tasks[0]?.courseId ?? ''}`;

  const count = document.createElement('span');
  count.className = 'sp-group-count';
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

  app.append(summaryLine(tasks));

  /*
   * 分组前先排序：排序规则在 domain/plan.ts 里（与执行面共用同一份判断），
   * 这里只负责按课程切开。
   */
  const byCourse = new Map<number, Task[]>();
  for (const task of orderTasks(tasks)) {
    const bucket = byCourse.get(task.courseId);
    if (bucket) bucket.push(task);
    else byCourse.set(task.courseId, [task]);
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
function summaryLine(tasks: Task[]): HTMLElement {
  const summary = summarize(tasks);
  const parts = [
    `可自动完成 ${summary.auto}`,
    `需要确认 ${summary.assisted}`,
    `需要你做 ${summary.manual}`,
  ];
  if (summary.failed > 0) parts.push(`失败 ${summary.failed}`);
  if (summary.done > 0) parts.push(`已完成 ${summary.done}`);

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

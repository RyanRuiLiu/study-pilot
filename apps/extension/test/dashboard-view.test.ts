/*
 * 看板结构的 DOM 级核对。
 *
 * 验的是「这一屏里到底有哪几个东西、写的是什么字」：顶部计数、按课程分组与组内计数、
 * 任务行与做法标签、单元明细那张表（来源标注、按钮、明细行），以及筛选控件本身。
 * 不看截图，也不靠人眼。
 *
 * 为什么用 linkedom：仓库已有先例（guidance.test.ts、popup-view.test.ts），
 * 这里不需要布局与样式。为什么不加载真实 Shoelace 组件：同 popup-view.test.ts，
 * 把两个副作用模块换成空模块，验的是构造器输出的标签与文字。
 */

import { readFileSync } from 'node:fs';
import { parseHTML } from 'linkedom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@shoelace-style/shoelace/dist/components/button/button.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/spinner/spinner.js', () => ({}));

import type { DashboardView, Task } from '../src/domain/task';
import { summarize } from '../src/domain/plan';
import {
  DEFAULT_FILTERS,
  filterTasks,
  KIND_LABEL,
  MODE_LABEL,
  renderBoard,
  STATE_FILTERS,
} from '../entrypoints/dashboard/render';
import { detailsView } from '../entrypoints/dashboard/details';

const page = parseHTML('<!doctype html><html><body><div id="app"></div></body></html>');
Object.assign(globalThis, { window: page.window, document: page.document });

const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.now();

function host(): HTMLElement {
  return globalThis.document.getElementById('app')!;
}

/** 一件任务。只写关心的字段，其余给固定值。 */
function task(fields: Partial<Task> & { id: string; courseId: number; title: string }): Task {
  return {
    platformId: 'mooc',
    kind: 'quiz',
    mode: 'auto',
    state: 'todo',
    ...fields,
  };
}

/*
 * 两门课、四件事：课件单元不算明细里的一行（它不是要交的东西），
 * 已完成的作业算（明细要回答「这门课我做到哪了」，包括做过什么）。
 */
const TASKS: Task[] = [
  task({
    id: 'a',
    courseId: 1,
    title: '第一章测验',
    dueAt: NOW + DAY,
    link: 'https://x/quiz',
  }),
  task({ id: 'b', courseId: 1, kind: 'video', title: '第一章视频' }),
  task({
    id: 'c',
    courseId: 2,
    kind: 'homework',
    mode: 'manual',
    state: 'done',
    title: '第二章作业',
    dueAt: NOW,
    score: 85,
    maxScore: 100,
  }),
  task({
    id: 'd',
    courseId: 2,
    kind: 'exam-objective',
    mode: 'manual',
    title: '期中考试',
    dueAt: NOW + 2 * DAY,
  }),
];

const VIEW: DashboardView = {
  fetchedAt: NOW,
  courses: [
    { platformId: 'mooc', courseId: 1, name: '课程一' },
    { platformId: 'mooc', courseId: 2, name: '课程二' },
  ],
  tasks: TASKS,
};

function textOf(root: HTMLElement, selector: string): string {
  return root.querySelector(selector)?.textContent ?? '';
}

beforeEach(() => {
  host().replaceChildren();
});

describe('看板结构', () => {
  it('按课程分组，组内给出条数与未完成数', () => {
    const root = host();
    const visible = filterTasks(TASKS, DEFAULT_FILTERS);
    renderBoard(root, VIEW, visible);

    // 默认只看未完成与失败，因此已完成的作业不在这三行里
    expect(visible.map((entry) => entry.id)).toEqual(['a', 'b', 'd']);

    const groups = Array.from(root.querySelectorAll('.sp-group'));
    expect(groups).toHaveLength(2);
    expect(groups.map((group) => textOf(group as HTMLElement, '.sp-group-head'))).toEqual([
      '课程一2 项，2 项未完成',
      '课程二1 项，1 项未完成',
    ]);
    expect(root.querySelectorAll('.sp-task')).toHaveLength(3);
  });

  it('计数就是 domain/plan.ts 的 summarize，不在页面里另数一遍', () => {
    const root = host();
    const visible = filterTasks(TASKS, DEFAULT_FILTERS);
    renderBoard(root, VIEW, visible);

    const summary = summarize(visible);
    const parts = [
      `可自动完成 ${summary.auto}`,
      `需要确认 ${summary.assisted}`,
      `需要你做 ${summary.manual}`,
    ];
    if (summary.failed > 0) parts.push(`失败 ${summary.failed}`);
    if (summary.done > 0) parts.push(`已完成 ${summary.done}`);

    expect(textOf(root, '.sp-summary')).toBe(parts.join(' · '));
  });

  it('任务行带状态与做法两个通道，标题是可达的链接', () => {
    const root = host();
    renderBoard(root, VIEW, filterTasks(TASKS, DEFAULT_FILTERS));

    const first = root.querySelector('.sp-task')!;
    expect(first.getAttribute('data-state')).toBe('todo');
    expect(first.getAttribute('data-mode')).toBe('auto');
    expect(textOf(first as HTMLElement, '.sp-task-title')).toBe('第一章测验');
    expect(first.querySelector('.sp-task-title')?.getAttribute('href')).toBe('https://x/quiz');

    // 类别、做法、状态三个标签：做法与状态各自带着自己的配色类
    expect(
      Array.from(first.querySelectorAll('.sp-chip')).map((chip) => chip.textContent),
    ).toEqual([KIND_LABEL.quiz, MODE_LABEL.auto, '未完成']);

    // 已完成的那一行带得分，且格式与明细里的一致
    renderBoard(root, VIEW, filterTasks(TASKS, { ...DEFAULT_FILTERS, state: 'all' }));
    const all = Array.from(root.querySelectorAll('.sp-task'));
    expect(all).toHaveLength(4);
    const done = all.find((row) => row.getAttribute('data-state') === 'done')!;
    expect(textOf(done as HTMLElement, '.sp-task-title')).toBe('第二章作业');
    expect(textOf(done as HTMLElement, '.sp-task-score')).toBe('得分 85 / 100');
  });

  it('筛选控件是四个带标签的下拉，默认状态是一个真实存在的选项', () => {
    const shell = parseHTML(
      readFileSync(new URL('../entrypoints/dashboard/index.html', import.meta.url), 'utf8'),
    );

    for (const [id, label] of [
      ['course', '课程'],
      ['kind', '类别'],
      ['mode', '做法'],
      ['state', '状态'],
    ] as const) {
      const select = shell.document.getElementById(id);
      expect(select?.tagName).toBe('SELECT');
      // 每个下拉外面套着一个带文字说明的 label，页面上才知道这个框筛的是什么
      expect(select?.parentElement?.textContent).toContain(label);
    }

    // 固定项的来源：类别与做法来自各自唯一的标签表，状态来自 STATE_FILTERS
    expect(Object.keys(KIND_LABEL)).toContain('exam-objective');
    expect(Object.keys(MODE_LABEL)).toEqual(['auto', 'assisted', 'manual']);
    expect(STATE_FILTERS.map((entry) => entry.value)).toContain(DEFAULT_FILTERS.state);

    // 通知点击落到这个锚点上（见 background/wiring.ts），它必须在页面里存在
    expect(shell.document.getElementById('unit-details')).not.toBeNull();
  });
});

describe('看板上的单元明细', () => {
  it('打开时用本地快照画一份，来源与时刻写在表上面', () => {
    const view = detailsView(() => undefined);
    view.renderSnapshot(VIEW);

    const source = textOf(view.element, '.sp-details-source');
    expect(source).toContain('来自本地快照');
    expect(source).toContain('上次读取');

    // 快照那一份只列测验、作业与考试：视频这类课件单元不在明细里
    const names = Array.from(view.element.querySelectorAll('.sp-details-name')).map(
      (cell) => cell.textContent,
    );
    expect(names).toContain('测验与作业');
    expect(names).toContain('第一章测验');
    expect(names).toContain('第二章作业');
    expect(names).not.toContain('第一章视频');

    expect(view.element.querySelectorAll('.sp-details-row')).toHaveLength(3);
    expect(
      Array.from(view.element.querySelectorAll('.sp-details-course')).map((el) => el.textContent),
    ).toEqual(['课程一', '课程二']);
  });

  it('明细行带上状态、截止与得分，整行可点', () => {
    const view = detailsView(() => undefined);
    view.renderSnapshot(VIEW);

    const rows = Array.from(view.element.querySelectorAll('.sp-details-row'));
    const quiz = rows.find((row) => row.id === 'unit-a')!;
    expect(quiz.getAttribute('href')).toBe('https://x/quiz');
    expect(textOf(quiz as HTMLElement, '.sp-details-status')).toBe('未完成');
    expect(quiz.querySelector('.sp-details-status')?.classList.contains('is-active')).toBe(true);

    const homework = rows.find((row) => row.id === 'unit-c')!;
    expect(textOf(homework as HTMLElement, '.sp-details-status')).toBe('已完成');
    expect(textOf(homework as HTMLElement, '.sp-details-score')).toBe('85 / 100');
  });

  it('「读取最新明细」是唯一的取值入口，没点之前不发请求', () => {
    const view = detailsView(() => undefined);
    view.renderSnapshot(VIEW);

    const read = view.element.querySelector('sl-button');
    expect(read?.textContent).toBe('读取最新明细');
    // 按钮在明细区顶部，来源标注的右边
    expect(textOf(view.element, '.sp-details-bar')).toContain('来自本地快照');

    // 表头只出现一次，且四列与页面上的顺序一致
    expect(
      Array.from(view.element.querySelectorAll('.sp-details-head > span')).map(
        (cell) => cell.textContent,
      ),
    ).toEqual(['测验与作业', '状态', '截止', '得分 / 满分']);
  });
});

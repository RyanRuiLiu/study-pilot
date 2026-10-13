/*
 * 看板与明细的 DOM 级核对。
 *
 * 夹具用**平台的快照原样字段**（SnapshotWork / CourseUnit）——看板不再经过中立模型，
 * 因此这些断言同时钉住了「没有映射层」这件事。
 * 真实 Shoelace 在 linkedom 下会崩（Lit 走 node 构建）；这里验的是构造器输出的标签与文字。
 */

import { parseHTML } from 'linkedom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@shoelace-style/shoelace/dist/components/button/button.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/spinner/spinner.js', () => ({}));

import { UNIT_TYPE, type CourseUnit } from '@study-pilot/platform-mooc';
import type { Snapshot, SnapshotCourse, SnapshotWork } from '../src/platforms/mooc/read';
import {
  boardItems,
  DEFAULT_FILTERS,
  filterItems,
  kindOptions,
  orderItems,
  renderBoard,
} from '../entrypoints/dashboard/render';
import { detailsView } from '../entrypoints/dashboard/details';

const page = parseHTML('<!doctype html><html><body><div id="app"></div></body></html>');
Object.assign(globalThis, { window: page.window, document: page.document });

function work(overrides: Partial<SnapshotWork> = {}): SnapshotWork {
  return {
    tid: 900,
    name: '第三单元作业',
    chapterName: '第三章',
    examId: null,
    type: 'homework',
    submitted: false,
    deadline: 1_800_000_000_000,
    evaluateStart: null,
    evaluateEnd: null,
    evaluateScoreRelease: null,
    score: null,
    totalScore: null,
    reviewable: false,
    evaluateDone: null,
    evaluateTotal: null,
    selfDone: null,
    ...overrides,
  };
}

function unit(overrides: Partial<CourseUnit> = {}): CourseUnit {
  return {
    unitId: 1000,
    contentId: 2000,
    termId: 1,
    lessonId: 1,
    lessonName: '1.1',
    name: '1.1 二极管',
    contentType: UNIT_TYPE.VIDEO,
    durationInSeconds: 500,
    completePercent: 0,
    viewStatus: 0,
    ...overrides,
  };
}

function course(overrides: Partial<SnapshotCourse> = {}): SnapshotCourse {
  return {
    termId: 1,
    courseId: 1001753142,
    schoolShortName: 'NTU',
    mode: 0,
    courseName: '模拟电子技术',
    works: [],
    units: [],
    ...overrides,
  };
}

function snapshot(courses: SnapshotCourse[]): Snapshot {
  return { version: 1, fetchedAt: 1_700_000_000_000, fetchedDate: '2026-10-14', courses };
}

let app: HTMLElement;
beforeEach(() => {
  app = page.document.createElement('div');
});

describe('快照 → 行（直接用平台字段）', () => {
  it('工作项：类别取平台 type；未提交的测验自动、作业需你做', () => {
    const items = boardItems(
      course({
        works: [work({ tid: 1, type: 'quiz', name: '单元测验' }), work({ tid: 2, name: '单元作业' })],
      }),
    );
    expect(items[0]).toMatchObject({ title: '单元测验', kind: '测验', mode: 'auto', state: 'todo' });
    expect(items[1]).toMatchObject({ title: '单元作业', kind: '作业', mode: 'manual', state: 'todo' });
  });

  it('工作项：已提交即已完成，并带得分与互评进度', () => {
    const items = boardItems(
      course({
        works: [
          work({
            submitted: true,
            score: 88,
            totalScore: 100,
            reviewable: true,
            evaluateDone: 2,
            evaluateTotal: 5,
            selfDone: false,
          }),
        ],
      }),
    );
    expect(items[0]?.state).toBe('done');
    expect(items[0]?.score).toEqual({ got: 88, max: 100 });
    expect(items[0]?.review).toContain('互评 2/5');
    expect(items[0]?.review).toContain('自评未做');
  });

  it('工作项：没交且过了截止 → 已过截止', () => {
    expect(boardItems(course({ works: [work({ deadline: 1 })] }))[0]?.state).toBe('late');
  });

  it('课件单元：看满即完成；讨论需要你确认，其余自动', () => {
    const items = boardItems(
      course({
        units: [
          unit({ unitId: 1, name: '看过的视频', completePercent: 1 }),
          unit({ unitId: 2, name: '讨论区', contentType: UNIT_TYPE.DISCUSS }),
          unit({ unitId: 3, name: 'PPT', contentType: UNIT_TYPE.PDF }),
        ],
      }),
    );
    expect(items[0]).toMatchObject({ kind: '视频', state: 'done', mode: 'auto' });
    expect(items[1]).toMatchObject({ kind: '讨论', mode: 'assisted' });
    expect(items[2]).toMatchObject({ kind: '文档', mode: 'auto' });
  });
});

describe('筛选与排序', () => {
  const items = boardItems(
    course({
      works: [work({ tid: 1, type: 'quiz', name: '测验' }), work({ tid: 2, submitted: true, name: '交过的作业' })],
      units: [unit({ unitId: 3, name: '视频' })],
    }),
  );

  it('默认只看未完成（含已过截止）', () => {
    expect(filterItems(items, { ...DEFAULT_FILTERS }).map((i) => i.title)).toEqual(['测验', '视频']);
  });

  it('按状态、类别、做法、课程筛', () => {
    expect(filterItems(items, { ...DEFAULT_FILTERS, state: 'done' }).map((i) => i.title)).toEqual(['交过的作业']);
    expect(filterItems(items, { ...DEFAULT_FILTERS, kind: '视频' }).map((i) => i.title)).toEqual(['视频']);
    expect(filterItems(items, { ...DEFAULT_FILTERS, mode: 'auto' }).map((i) => i.title)).toEqual(['测验', '视频']);
    expect(filterItems(items, { ...DEFAULT_FILTERS, courseId: '999' })).toHaveLength(0);
  });

  it('类别下拉只列数据里真的出现过的类别', () => {
    expect(kindOptions(snapshot([course({ works: [work({ type: 'quiz' })], units: [unit()] })]))).toEqual([
      '测验',
      '视频',
    ]);
    expect(kindOptions(null)).toEqual([]);
  });

  it('排序：未完成在前、已完成沉底、按截止升序、没有截止的排后', () => {
    const ordered = orderItems([
      boardItems(course({ works: [work({ tid: 1, submitted: true, name: '完成' })] }))[0]!,
      boardItems(course({ units: [unit({ unitId: 2, name: '没截止' })] }))[0]!,
      boardItems(course({ works: [work({ tid: 3, name: '晚', deadline: Date.now() + 900_000 })] }))[0]!,
      boardItems(course({ works: [work({ tid: 4, name: '早', deadline: Date.now() + 100_000 })] }))[0]!,
    ]);
    expect(ordered.map((i) => i.title)).toEqual(['早', '晚', '没截止', '完成']);
  });
});

describe('看板渲染', () => {
  it('顶部计数按「谁来做」分开数，并单独点出已过截止', () => {
    const view = snapshot([
      course({
        works: [work({ tid: 1, type: 'quiz' }), work({ tid: 2 }), work({ tid: 3, deadline: 1 })],
        units: [unit({ unitId: 4 })],
      }),
    ]);
    renderBoard(app, view, filterItems(boardItems(view.courses[0]!), DEFAULT_FILTERS));

    const summary = app.querySelector('.sp-summary')?.textContent ?? '';
    expect(summary).toContain('共 4 项');
    expect(summary).toContain('会自动完成 2');
    expect(summary).toContain('需要你做 1');
    expect(summary).toContain('已过截止 1');
  });

  it('按课程分组，组头写课程名与未完成数；行里有标题、类别、截止', () => {
    const view = snapshot([course({ works: [work({ tid: 7, name: '第三单元作业' })] })]);
    renderBoard(app, view, boardItems(view.courses[0]!));

    expect(app.querySelector('.sp-group-head')?.textContent).toContain('模拟电子技术');
    expect(app.querySelector('.sp-group-count')?.textContent).toBe('1 项，1 项未完成');
    const row = app.querySelector('.sp-task');
    expect(row?.querySelector('.sp-task-title')?.textContent).toBe('第三单元作业');
    expect(row?.querySelector('.sp-chip')?.textContent).toBe('作业');
    expect(row?.querySelector('.sp-task-due')).not.toBeNull();
  });

  it('没有数据与筛完为空，各给一句说明', () => {
    renderBoard(app, null, []);
    expect(app.querySelector('.sp-empty')?.textContent).toContain('还没有数据');

    const view = snapshot([course({ works: [work({ submitted: true })] })]);
    renderBoard(app, view, []);
    expect(app.querySelector('.sp-empty')?.textContent).toBe('当前筛选下没有任务。');
  });
});

describe('明细区', () => {
  it('打开时用快照画一份，标注来源与时间', () => {
    const details = detailsView(() => {});
    details.renderSnapshot(snapshot([course({ works: [work({ tid: 9, name: '第三单元作业' })] })]));

    expect(details.element.textContent).toContain('来自本地快照');
    expect(details.element.textContent).toContain('第三单元作业');
    expect(details.element.textContent).toContain('读取最新明细');
  });

  it('没有快照时说还没读过，而不是画一张空表', () => {
    const details = detailsView(() => {});
    details.renderSnapshot(null);
    expect(details.element.textContent).toContain('还没有读取过数据');
  });
});

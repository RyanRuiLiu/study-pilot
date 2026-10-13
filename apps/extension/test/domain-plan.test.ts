/*
 * 计划语义的测试。
 *
 * 这一层是「谁来做、先后如何」的**唯一**判断处：执行面与看板都调它。
 * 因此它错了不会报错，只会让两边一起错——而且看起来还挺自洽。
 * 这里逐条钉住计数与排序规则。
 */

import { describe, expect, it } from 'vitest';
import type { Task, TaskMode, TaskState } from '../src/domain/task';
import { autoTasks, orderTasks, summarize } from '../src/domain/plan';

let seq = 0;
function task(mode: TaskMode, state: TaskState, overrides: Partial<Task> = {}): Task {
  seq += 1;
  return {
    id: `mooc:1:video:${seq}`,
    platformId: 'mooc',
    courseId: 1,
    kind: 'video',
    title: `任务 ${seq}`,
    mode,
    state,
    ...overrides,
  };
}

describe('计数', () => {
  it('按「谁来做」分开数，已完成的单独算', () => {
    const summary = summarize([
      task('auto', 'todo'),
      task('auto', 'todo'),
      task('assisted', 'todo'),
      task('manual', 'todo'),
      task('auto', 'done'),
      task('auto', 'failed'),
    ]);

    expect(summary).toEqual({ auto: 2, assisted: 1, manual: 1, failed: 1, done: 1 });
  });

  it('失败的不重复计入「可自动完成」——它需要人看', () => {
    const summary = summarize([task('auto', 'failed'), task('auto', 'failed')]);
    expect(summary.auto).toBe(0);
    expect(summary.failed).toBe(2);
  });

  it('空列表不炸', () => {
    expect(summarize([])).toEqual({ auto: 0, assisted: 0, manual: 0, failed: 0, done: 0 });
  });
});

describe('排序', () => {
  it('未完成在前，已完成的沉底', () => {
    const ordered = orderTasks([task('auto', 'done'), task('manual', 'todo')]);
    expect(ordered.map((t) => t.state)).toEqual(['todo', 'done']);
  });

  it('未完成里按「离自动完成越近越靠前」', () => {
    const ordered = orderTasks([task('manual', 'todo'), task('auto', 'todo'), task('assisted', 'todo')]);
    expect(ordered.map((t) => t.mode)).toEqual(['auto', 'assisted', 'manual']);
  });

  it('同做法按截止时间，没有截止的排在后面', () => {
    const ordered = orderTasks([
      task('auto', 'todo'),
      task('auto', 'todo', { dueAt: 200 }),
      task('auto', 'todo', { dueAt: 100 }),
    ]);
    expect(ordered.map((t) => t.dueAt)).toEqual([100, 200, undefined]);
  });

  it('其余都相同时按 id 稳定排序，避免渲染顺序抖动', () => {
    const a = task('auto', 'todo', { id: 'mooc:1:video:b' });
    const b = task('auto', 'todo', { id: 'mooc:1:video:a' });
    expect(orderTasks([a, b]).map((t) => t.id)).toEqual(['mooc:1:video:a', 'mooc:1:video:b']);
  });

  it('不改动传入的数组', () => {
    const input = [task('manual', 'todo'), task('auto', 'todo')];
    orderTasks(input);
    expect(input[0]?.mode).toBe('manual');
  });
});

describe('这一轮能自动做的', () => {
  it('只有 auto 且未完成的算数', () => {
    const tasks = [
      task('auto', 'todo'),
      task('auto', 'done'),
      task('auto', 'failed'),
      task('assisted', 'todo'),
      task('manual', 'todo'),
    ];
    expect(autoTasks(tasks)).toHaveLength(1);
  });
});

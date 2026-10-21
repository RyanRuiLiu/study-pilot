/* 命令行收尾句：停止的一轮必须说出来，不能只说「完成 N 项」。 */

import { describe, expect, it } from 'vitest';
import { finishedLine } from '../src/report.ts';

describe('finishedLine', () => {
  it('正常跑完：报完成与手动数', () => {
    expect(finishedLine({ status: 'finished', done: 3, manual: 1, failed: [] })).toBe(
      '完成 3 项，需手动处理 1 项',
    );
  });

  it('按了停止：明确说已停止', () => {
    expect(
      finishedLine({ status: 'finished', done: 3, manual: 1, failed: [], stopped: true }),
    ).toBe('已停止：完成 3 项，需手动处理 1 项');
  });
});

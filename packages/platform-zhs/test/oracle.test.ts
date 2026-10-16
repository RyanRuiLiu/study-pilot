/* 神谕判据的形态核对（喂真机响应样本形态）。 */

import { describe, expect, it } from 'vitest';
import { askOracle, judge } from '../src/oracle.ts';
import type { ZhsClient } from '../src/client.ts';

/** 真机响应形态（.probe/zhs-verify/page.html，五题全满分那一次）。 */
const FULL = {
  '1120788156': { score: '2', done: 'true' },
  '1120788144': { score: '2', done: 'true' },
  '1120788160': { score: '2', done: 'true' },
  '1120788146': { score: '2', done: 'true' },
  '1120788162': { score: '2', done: 'true' },
};

describe('judge', () => {
  it('全满分且总分吻合 → 通过', () => {
    const verdict = judge({ rt: FULL, questionIds: Object.keys(FULL), totalScore: 10 });
    expect(verdict).toEqual({ pass: true, scoreSum: 10, asked: 5, missing: [], zeroScored: [] });
  });

  it('神谕缺题 → 不通过，并列出缺了哪几题', () => {
    const verdict = judge({
      rt: { '1': { score: '2', done: 'true' } },
      questionIds: ['1', '2'],
      totalScore: 4,
    });
    expect(verdict.pass).toBe(false);
    expect(verdict.missing).toEqual(['2']);
    expect(verdict.asked).toBe(2);
  });

  it('得了 0 分 → 不通过，并列出哪几题', () => {
    const verdict = judge({
      rt: { '1': { score: '0', done: 'true' }, '2': { score: '2', done: 'true' } },
      questionIds: ['1', '2'],
      totalScore: 4,
    });
    expect(verdict.pass).toBe(false);
    expect(verdict.zeroScored).toEqual(['1']);
    expect(verdict.scoreSum).toBe(2);
  });

  it('totalScore 缺失 → 判据失效，一律不通过（不许默认放行）', () => {
    const verdict = judge({ rt: FULL, questionIds: Object.keys(FULL), totalScore: null });
    expect(verdict.pass).toBe(false);
  });

  it('分数之和对不上总分（部分给分/题不全）→ 不通过', () => {
    const verdict = judge({
      rt: { '1': { score: '2', done: 'true' }, '2': { score: '1', done: 'true' } },
      questionIds: ['1', '2'],
      totalScore: 4,
    });
    expect(verdict.pass).toBe(false);
    expect(verdict.scoreSum).toBe(3);
  });

  it('分数解析不出（形态变了）→ 记进 missing，不通过', () => {
    const verdict = judge({ rt: { '1': { score: '满分' } }, questionIds: ['1'], totalScore: 2 });
    expect(verdict.pass).toBe(false);
    expect(verdict.missing).toEqual(['1']);
  });

  it('一道题都没问 → 不通过（空集不能算「全对」）', () => {
    expect(judge({ rt: {}, questionIds: [], totalScore: 0 }).pass).toBe(false);
  });

  it('数字题号与字符串题号都能对上响应键', () => {
    const verdict = judge({ rt: { '9000000015': { score: '2' } }, questionIds: [9000000015], totalScore: 2 });
    expect(verdict.pass).toBe(true);
  });
});

describe('askOracle', () => {
  it('载荷形态：questionIds 是数字数组的 JSON 串，userId 一并带上', async () => {
    const calls: Array<{ name: string; payload: unknown }> = [];
    const client: ZhsClient = {
      call: async (name, payload) => {
        calls.push({ name, payload });
        return { status: '200', rt: FULL };
      },
    };
    const rt = await askOracle(client, {
      recruitId: 900004,
      userId: 900000009,
      examId: 90000006,
      stuExamId: 9000000037,
      questionIds: [9000000015, 1120783436],
    });
    expect(calls[0]).toEqual({
      name: 'examQuestionDoneState',
      payload: {
        recruitId: 900004,
        userId: 900000009,
        examId: 90000006,
        stuExamId: 9000000037,
        questionIds: '[9000000015,1120783436]',
      },
    });
    expect(rt).toEqual(FULL);
  });
});

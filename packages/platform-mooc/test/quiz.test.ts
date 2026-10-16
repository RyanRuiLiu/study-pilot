/*
 * 测验：答案从卷面自身构造（2026-10-17 换接口后的唯一方式）。
 *
 * 答案与题目是同一个对象上的两组字段——选择类看选项的正确标记
 * （`optionDtos[].answer === true`），填空类看标准答案文本（`stdAnswer`）。
 * 没有题库 RPC、没有跨源匹配；两处都没有答案的题如实计入 unresolved。
 */

import { describe, expect, it } from 'vitest';
import { buildAnswerIndex, buildAnswers, fillAnswersFromBank, hasAnswer } from '../src/quiz.ts';
import type { PaperQuestion, QuizPaper } from '../src/types.ts';

const TID = 900000001;

/** 一份卷面：单选、多选、判断（选项带正确标记）+ 一道填空题（stdAnswer）。 */
function paper(): QuizPaper {
  return {
    tid: TID,
    objectiveQList: [
      {
        id: 700000001,
        type: 1,
        optionDtos: [
          { id: 90000000000001, content: '甲', answer: true },
          { id: 900000000000001, content: '乙', answer: false },
          { id: 900000000000002, content: '丙', answer: false },
        ],
      },
      {
        id: 700000002,
        type: 2,
        optionDtos: [
          { id: 90000000000002, content: '甲', answer: true },
          { id: 90000000000004, content: '乙', answer: true },
          { id: 90000000000003, content: '丙', answer: false },
        ],
      },
      {
        id: 700000003,
        type: 4,
        optionDtos: [
          { id: 18755666866460, content: '正确', answer: true },
          { id: 118755666866460, content: '错误', answer: false },
        ],
      },
      { id: 700000004, type: 3, optionDtos: null, stdAnswer: '时间' },
    ],
  };
}

describe('buildAnswers（答案来自卷面自身）', () => {
  it('每一道题都能构造出答案（选择类与填空类都在内）', () => {
    const target = paper();
    const result = buildAnswers(target);

    expect(result.total).toBe(4);
    expect(result.matched).toBe(4);
    expect(result.unresolved).toEqual([]);
  });

  it('选择类：optIds 就是卷面上被标记为正确的选项', () => {
    const target = paper();
    buildAnswers(target, { now: 1700000000000 });
    const byQid = new Map(target.answers!.map((answer) => [answer.qid, answer]));

    expect(byQid.get(700000001)!.optIds).toEqual([90000000000001]);
    // 多选：全部正确项都选上
    expect(byQid.get(700000002)!.optIds).toHaveLength(2);
    // 判断：一个
    expect(byQid.get(700000003)!.optIds).toEqual([18755666866460]);
    for (const answer of target.answers!) {
      if (answer.qid !== 700000004) expect(answer.time).toBe(1700000000000);
    }
  });

  it('填空类：形状取自真机提交回读（optIds 为 null、文本在 content.content）', () => {
    const target = paper();
    buildAnswers(target);
    const fill = target.answers!.find((answer) => answer.qid === 700000004)!;

    expect(fill.type).toBe(3);
    expect(fill.optIds).toBeNull();
    expect(fill.content).toEqual({ content: '时间', attachments: null });
  });

  it('既无正确标记也无标准答案的题记入 unresolved，且不产出空答案条目', () => {
    const target: QuizPaper = {
      tid: TID,
      objectiveQList: [
        {
          id: 700000005,
          type: 1,
          optionDtos: [
            { id: 'x', content: '甲' },
            { id: 'y', content: '乙' },
          ],
        },
      ],
    };
    const result = buildAnswers(target);

    expect(result.matched).toBe(0);
    expect(result.total).toBe(1);
    expect(result.unresolved).toEqual([700000005]);
    expect(target.answers).toEqual([]);
  });

  it('只有空白的标准答案不算答案', () => {
    const target: QuizPaper = {
      tid: TID,
      objectiveQList: [{ id: 700000006, type: 3, optionDtos: null, stdAnswer: '   ' }],
    };
    const result = buildAnswers(target);

    expect(result.unresolved).toEqual([700000006]);
    expect(target.answers).toEqual([]);
  });
});

/*
 * 题库：未提交的卷的答案来源（2026-10-17 实测——平台对随堂测验随卷下发答案，
 * 对单元测验在提交前一份都不给；题库与作答状态无关，按**选项 id** 对齐）。
 */
describe('题库补答案（fillAnswersFromBank）', () => {
  it('按选项 id 给卷面上没带答案的题补正确标记；卷面已有的题不动', () => {
    const index = buildAnswerIndex([
      { id: 9001, type: 1, optionDtos: [{ id: 101, answer: true }, { id: 102, answer: false }] },
    ]);
    const questions: PaperQuestion[] = [
      // 卷面自己的标记是权威：题库里就算有不同口径也不覆盖
      { id: 11, type: 1, optionDtos: [{ id: 101, answer: false }, { id: 102, answer: true }] },
      { id: 12, type: 1, optionDtos: [{ id: 101 }, { id: 102 }] },
    ];

    const filled = fillAnswersFromBank(questions, index);

    expect(hasAnswer(filled[0]!)).toBe(true);
    expect(filled[0]!.optionDtos?.map((o) => o.answer)).toEqual([false, true]);
    expect(filled[1]!.optionDtos?.map((o) => o.answer)).toEqual([true, false]);
  });

  it('题库里没有的题原样返回（仍是没有答案），不猜', () => {
    const index = buildAnswerIndex([
      { id: 9001, type: 1, optionDtos: [{ id: 999, answer: true }] },
    ]);
    const questions: PaperQuestion[] = [
      { id: 13, type: 1, optionDtos: [{ id: 201 }, { id: 202 }] },
    ];

    const filled = fillAnswersFromBank(questions, index);

    expect(hasAnswer(filled[0]!)).toBe(false);
    expect(filled[0]).toBe(questions[0]);
  });

  it('buildAnswers 带 answerIndex 时把补到的答案写进提交载荷', () => {
    const target: QuizPaper = {
      tid: TID,
      objectiveQList: [
        { id: 21, type: 1, optionDtos: [{ id: 301 }, { id: 302 }] },
        { id: 22, type: 3, optionDtos: null, stdAnswer: null },
      ],
    };
    const index = buildAnswerIndex([
      { id: 9001, type: 1, optionDtos: [{ id: 301, answer: false }, { id: 302, answer: true }] },
    ]);

    const result = buildAnswers(target, { answerIndex: index });

    expect(result.matched).toBe(1);
    expect(result.unresolved).toEqual([22]);
    expect(target.answers).toEqual([{ qid: 21, type: 1, optIds: [302], time: expect.any(Number) }]);
  });
});

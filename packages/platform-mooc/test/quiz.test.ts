/*
 * 答案构造测试。
 *
 * 数据是合成的，不是抓来的
 * ------------------------
 * 这里验的是结构性质，不是某份真实题库的内容：
 *
 *   选项 id 全局唯一
 *   试卷的选项能在题库里找到
 *   判断题的答案只有一个选项
 *   找不到答案的题记入 unresolved 而不产出空条目
 *
 * 这些性质用构造的数据就能完整覆盖，而真实题库既不属于本项目、
 * 也不该进仓库。原先这里读的是 fixtures/captures/ 下的抓包样本，
 * 那些文件已从仓库移除。
 *
 * id 的形态沿用实测结论（选项 id 为 15 位左右的整数、题 id 为 10 位），
 * 因为「按 id 字符串匹配」这件事本身是实测确立的——换成小整数测不出
 * 大整数在 JSON 与 JS 之间是否会被精度截断。
 */

import { describe, expect, it } from 'vitest';
import { buildAnswerIndex, buildAnswers } from '../src/quiz.ts';
import type { BankQuestion, QuizPaper } from '../src/types.ts';

/** 一门课的题库：三道题，含单选、多选、判断。 */
const bank: BankQuestion[] = [
  {
    id: 1258540425,
    type: 1,
    optionDtos: [
      { id: 18755666866459, content: '甲', answer: true },
      { id: 118755666866459, content: '乙', answer: false },
      { id: 218755666866459, content: '丙', answer: false },
      { id: 318755666866459, content: '丁', answer: false },
    ],
  },
  {
    id: 1258540426,
    type: 2,
    optionDtos: [
      { id: 23253559148631, content: '甲', answer: true },
      { id: 13253559148631, content: '乙', answer: true },
      { id: 23253559148632, content: '丙', answer: false },
      { id: 33253559148632, content: '丁', answer: false },
    ],
  },
  {
    id: 1258540427,
    type: 4,
    optionDtos: [
      { id: 18755666866460, content: '正确', answer: true },
      { id: 118755666866460, content: '错误', answer: false },
    ],
  },
];

/**
 * 同一门课的一份试卷。
 *
 * 题 id 与题库不同空间——这正是实测结论之一，因此这里也照实构造：
 * 试卷用自己的一套题 id，只有选项 id 与题库共享。
 */
const paper: QuizPaper = {
  tid: 900000001,
  objectiveQList: [
    {
      id: 700000001,
      type: 1,
      optionDtos: [
        { id: '18755666866459', content: '甲' },
        { id: '118755666866459', content: '乙' },
        { id: '218755666866459', content: '丙' },
        { id: '318755666866459', content: '丁' },
      ],
    },
    {
      id: 700000002,
      type: 2,
      optionDtos: [
        { id: '23253559148631', content: '甲' },
        { id: '13253559148631', content: '乙' },
        { id: '23253559148632', content: '丙' },
        { id: '33253559148632', content: '丁' },
      ],
    },
    {
      id: 700000003,
      type: 4,
      optionDtos: [
        { id: '18755666866460', content: '正确' },
        { id: '118755666866460', content: '错误' },
      ],
    },
  ],
};

const answerIndex = buildAnswerIndex(bank);

describe('buildAnswerIndex', () => {
  it('题库里的选项 id 全局唯一，不需要按题目分组', () => {
    const ids = bank.flatMap((question) =>
      (question.optionDtos ?? []).map((option) => String(option.id)),
    );
    expect(ids.length).toBeGreaterThan(0);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('索引覆盖题库中的每一个选项', () => {
    const total = bank.reduce((sum, question) => sum + (question.optionDtos ?? []).length, 0);
    expect(answerIndex.size).toBe(total);
  });

  it('索引保留真假两种取值', () => {
    const values = [...answerIndex.values()];
    expect(values).toContain(true);
    expect(values).toContain(false);
  });
});

describe('选项 id 的跨空间可用性', () => {
  it('试卷的每一个选项都能在题库索引中找到', () => {
    const paperOptionIds = (paper.objectiveQList ?? []).flatMap((question) =>
      (question.optionDtos ?? []).map((option) => String(option.id)),
    );

    expect(paperOptionIds.length).toBeGreaterThan(0);
    const missing = paperOptionIds.filter((id) => !answerIndex.has(id));
    expect(missing).toEqual([]);
  });

  it('试卷题 id 与题库题 id 不同空间，只有选项 id 共享', () => {
    const bankIds = new Set(bank.map((q) => String(q.id)));
    const paperIds = (paper.objectiveQList ?? []).map((q) => String(q.id));
    expect(paperIds.some((id) => bankIds.has(id))).toBe(false);
  });
});

describe('buildAnswers', () => {
  it('为试卷上的每一道题都构造出答案', () => {
    const target: QuizPaper = { ...paper };
    const result = buildAnswers(target, answerIndex);

    expect(result.total).toBe((paper.objectiveQList ?? []).length);
    expect(result.matched).toBe(result.total);
    expect(result.unresolved).toEqual([]);
  });

  it('答案条目结构符合接口要求', () => {
    const target: QuizPaper = { ...paper };
    buildAnswers(target, answerIndex, 1700000000000);

    expect(Array.isArray(target.answers)).toBe(true);
    expect(target.answers!.length).toBeGreaterThan(0);

    for (const answer of target.answers!) {
      expect(typeof answer.qid).toBe('number');
      expect(Array.isArray(answer.optIds)).toBe(true);
      expect(answer.optIds.length).toBeGreaterThan(0);
      expect(answer.time).toBe(1700000000000);
    }
  });

  it('选中的选项 id 都属于试卷自身，且被题库标记为正确', () => {
    const target: QuizPaper = { ...paper };
    buildAnswers(target, answerIndex);

    const paperOptions = new Map<string, unknown>();
    for (const question of target.objectiveQList ?? []) {
      for (const option of question.optionDtos ?? []) {
        paperOptions.set(String(option.id), option);
      }
    }

    for (const answer of target.answers!) {
      for (const optionId of answer.optIds) {
        expect(paperOptions.has(String(optionId))).toBe(true);
        expect(answerIndex.get(String(optionId))).toBe(true);
      }
    }
  });

  it('多选题把全部正确选项都选上', () => {
    const multi = (paper.objectiveQList ?? []).find((q) => q.type === 2);
    expect(multi).toBeDefined();

    const target: QuizPaper = { tid: paper.tid, objectiveQList: [multi!] };
    const result = buildAnswers(target, answerIndex);

    expect(result.matched).toBe(1);
    expect(target.answers![0].optIds).toHaveLength(2);
  });

  it('判断题只选一个选项', () => {
    const judgment = (paper.objectiveQList ?? []).find((q) => q.type === 4);
    expect(judgment).toBeDefined();

    const target: QuizPaper = { tid: paper.tid, objectiveQList: [judgment!] };
    const result = buildAnswers(target, answerIndex);

    expect(result.matched).toBe(1);
    expect(target.answers![0].optIds).toHaveLength(1);
  });

  it('题目选项不在索引中时记入 unresolved 且不产出空答案条目', () => {
    const target: QuizPaper = {
      tid: 1,
      objectiveQList: [
        {
          id: 999,
          type: 1,
          optionDtos: [
            { id: 'not-in-bank-1', content: '甲' },
            { id: 'not-in-bank-2', content: '乙' },
          ],
        },
      ],
    };
    const result = buildAnswers(target, answerIndex);

    expect(result.matched).toBe(0);
    expect(result.total).toBe(1);
    expect(result.unresolved).toEqual([999]);
    expect(target.answers).toEqual([]);
  });
});

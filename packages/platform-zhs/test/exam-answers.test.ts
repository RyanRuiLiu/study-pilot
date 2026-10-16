/* 答案键：建键（弹题通道 → 正解）、两级匹配（选项 id / 题干+选项文本）、覆盖率与作答计划。
 *
 * 夹具是**合成**数据（形状按真机响应，内容不是平台原题）：
 * 真机金样本留在 .probe/ 下不进仓库，跨副本、换 id、缺键这些分支用合成卷面才跑得全。
 */

import { describe, expect, it } from 'vitest';
import {
  MIN_ATTEMPTS_FOR_PROBE,
  answerKeyFromPopupExam,
  coverageOf,
  matchPaper,
  mergeKeys,
  normalizeQuestionText,
  planAnswering,
  type AnswerKey,
  type PaperQuestion,
} from '../src/exam-answers.ts';

/** 弹题通道响应（popupAnswer/lessonPopupExam）的一片段：单选题 + 多选题。 */
const POPUP = [
  {
    testQuestion: {
      name: '示例判断题甲。（ ）',
      questionOptions: [
        { id: 900000001, content: '对', result: '0' },
        { id: 900000002, content: '错', result: '1' },
      ],
    },
  },
  {
    testQuestion: {
      name: '<p>示例题干甲（ ）</p>',
      questionOptions: [
        { id: 900000003, content: '示例选项乙', result: '1' },
        { id: 900000004, content: '示例选项丙', result: '1' },
        { id: 900000005, content: '示例选项甲', result: '0' },
      ],
    },
  },
  // 通道没给正解的条目：不进键（宁缺勿错）
  {
    testQuestion: {
      name: '没有正解的题（ ）',
      questionOptions: [{ id: 999, content: '甲', result: null }],
    },
  },
];

/** 真机卷面形状：题号为空，只有 eid + 题干 + 选项 id（顺序已打乱）。 */
const PAPER: PaperQuestion[] = [
  {
    eid: 'eid-A',
    text: '示例判断题甲。（ ）',
    options: [
      { id: '900000001', text: '对' },
      { id: '900000002', text: '错' },
    ],
  },
  {
    eid: 'eid-B',
    text: '示例题干甲（ ）',
    options: [
      { id: '900000005', text: '示例选项甲' },
      { id: '900000004', text: '示例选项丙' },
      { id: '900000003', text: '示例选项乙' },
    ],
  },
];

describe('normalizeQuestionText', () => {
  it('剥标签、去空白与中英标点', () => {
    expect(normalizeQuestionText('<p>示例题干甲（ ）</p>')).toBe('示例题干甲');
    expect(normalizeQuestionText(' A  B。，、？ ')).toBe('AB');
  });
});

describe('answerKeyFromPopupExam', () => {
  it('只收 result="1" 的选项；没有正解的条目不进键', () => {
    const key = answerKeyFromPopupExam(POPUP);
    expect(key.correctOptionIds.sort()).toEqual(['900000002', '900000003', '900000004']);
    expect(key.entries).toHaveLength(2);
    const multi = key.entries.find((entry) => entry.question.startsWith('示例课程己'));
    expect(multi?.correct.sort()).toEqual(['900000003', '900000004']);
    expect(multi?.correctTexts.sort()).toEqual(['示例选项乙', '示例选项丙'].sort());
  });

  it('空输入建出空键（不是错键）', () => {
    const key = answerKeyFromPopupExam([]);
    expect(key).toMatchObject({ version: 1, correctOptionIds: [], entries: [] });
  });
});

describe('matchPaper', () => {
  it('选项 id 口径：同一份题的多次开卷（只换序）整卷命中，多选给全部正解', () => {
    const key = answerKeyFromPopupExam(POPUP);
    const match = matchPaper(PAPER, key);
    expect(match.missing).toHaveLength(0);
    expect(match.answers).toEqual([
      { eid: 'eid-A', optionIds: ['900000002'] },
      { eid: 'eid-B', optionIds: ['900000004', '900000003'] },
    ]);
    expect(coverageOf(PAPER, match)).toBe(1);
  });

  it('题干口径：换副本后选项 id 重发，用正解选项文本落回本卷的 id', () => {
    const key = answerKeyFromPopupExam(POPUP);
    const freshCopy: PaperQuestion[] = [
      {
        eid: 'eid-new-A',
        text: '示例判断题甲。 ( )',   // 空格与半角括号都变了
        options: [
          { id: '7001', text: '对' },
          { id: '7002', text: '错' },
        ],
      },
      {
        eid: 'eid-new-B',
        text: '<p>示例题干甲（ ）</p>',
        options: [
          { id: '8001', text: '示例选项丙' },
          { id: '8002', text: '示例选项乙' },
          { id: '8003', text: '示例选项甲' },
        ],
      },
    ];
    const match = matchPaper(freshCopy, key);
    expect(match.missing).toHaveLength(0);
    expect(match.answers).toEqual([
      { eid: 'eid-new-A', optionIds: ['7002'] },
      { eid: 'eid-new-B', optionIds: ['8001', '8002'] },
    ]);
  });

  it('两级都不中就是缺键：不进答案，进 missing', () => {
    const key = answerKeyFromPopupExam(POPUP);
    const stranger: PaperQuestion[] = [
      { eid: 'eid-x', text: '这门课没见过的题（ ）', options: [{ id: '9001', text: '甲' }] },
      // 题干一样，但本卷选项里没有那条正解文本（对不上就是不同题）
      { eid: 'eid-A', text: '示例判断题甲。（ ）', options: [{ id: '9002', text: '也许' }] },
    ];
    const match = matchPaper(stranger, key);
    expect(match.answers).toHaveLength(0);
    expect(match.missing.map((q) => q.eid)).toEqual(['eid-x', 'eid-A']);
    expect(coverageOf(stranger, match)).toBe(0);
  });

  it('空键套卷面：全缺（覆盖率 0）', () => {
    const match = matchPaper(PAPER, answerKeyFromPopupExam([]));
    expect(match.answers).toHaveLength(0);
    expect(match.missing).toHaveLength(PAPER.length);
  });
});

describe('planAnswering', () => {
  const key = answerKeyFromPopupExam(POPUP);

  it('键全覆盖 → 直接作答（这一轮只有一次提交）', () => {
    const plan = planAnswering({ paper: PAPER, key, remainingAttempts: 1 });
    expect(plan.kind).toBe('answer');
    if (plan.kind === 'answer') expect(plan.coverage).toBe(1);
  });

  it('缺键 + 机会 ≥ 2 → 按门槛走探路后重做', () => {
    const partial = mergeKeys([key, { version: 1, correctOptionIds: [], entries: [] }]);
    const plan = planAnswering({
      paper: [...PAPER, { eid: 'eid-C', text: '缺键的题（ ）', options: [{ id: '1', text: '甲' }] }],
      key: partial,
      remainingAttempts: MIN_ATTEMPTS_FOR_PROBE,
    });
    expect(plan.kind).toBe('probe-then-redo');
    if (plan.kind === 'probe-then-redo') expect(plan.missing.map((q) => q.eid)).toEqual(['eid-C']);
  });

  it('缺键 + 只剩 1 次机会（部分期末）→ 不自动作答，只报缺口', () => {
    const plan = planAnswering({
      paper: [...PAPER, { eid: 'eid-C', text: '缺键的题（ ）', options: [{ id: '1', text: '甲' }] }],
      key,
      remainingAttempts: 1,
    });
    expect(plan.kind).toBe('report-only');
    if (plan.kind === 'report-only') expect(plan.coverage).toBeCloseTo(2 / 3);
  });

  it('没有键：机会够就探路，不够就只报', () => {
    expect(planAnswering({ paper: PAPER, key: null, remainingAttempts: 3 }).kind).toBe('probe-then-redo');
    expect(planAnswering({ paper: PAPER, key: null, remainingAttempts: 1 }).kind).toBe('report-only');
  });
});

describe('mergeKeys', () => {
  it('多来源取并集（历史提交 / 重做卷 / 同课副本）', () => {
    const a: AnswerKey = { version: 1, correctOptionIds: ['1'], entries: [{ question: 'q1', correct: ['1'], correctTexts: ['甲'] }] };
    const b: AnswerKey = { version: 1, correctOptionIds: ['2'], entries: [{ question: 'q1', correct: ['2'], correctTexts: ['乙'] }, { question: 'q2', correct: ['3'], correctTexts: [] }] };
    const merged = mergeKeys([a, b]);
    expect(merged.correctOptionIds.sort()).toEqual(['1', '2']);
    expect(merged.entries.find((entry) => entry.question === 'q1')?.correct.sort()).toEqual(['1', '2']);
    expect(merged.entries.find((entry) => entry.question === 'q1')?.correctTexts.sort()).toEqual(['乙', '甲'].sort());
    expect(merged.entries.find((entry) => entry.question === 'q2')?.correct).toEqual(['3']);
  });
});

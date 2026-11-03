/* 答案键：建键（弹题通道按 questionId 对齐 → 正解）、匹配（题号直取 / 选项 id 集合精确包含）、覆盖率与作答计划。
 *
 * 夹具是**合成**数据（形状按真机响应，内容不是平台原题）：
 * 真机金样本留在 .probe/ 下不进仓库，图片题、换序、缺键这些分支用合成卷面才跑得全。
 * 2026-11-04 起键按数字题号对齐（弹题回包 testQuestion.questionId），题干不再参与匹配——
 * 图片题的题干是 <img>，文本口径在它面前必然塌（数字信号处理 7 张卷 16-27% 的事故）。
 */

import { describe, expect, it } from 'vitest';
import {
  MIN_ATTEMPTS_FOR_PROBE,
  answerKeyFromPopupExam,
  coverageOf,
  matchPaper,
  planAnswering,
  type PaperQuestion,
} from '../src/exam-answers.ts';

/**
 * 弹题通道响应（popupAnswer/lessonPopupExam）的一片段：单选 + 多选 + **无题干的题**。
 * 无题干（题干是图片）正是真机事故的形态——对齐靠 questionId，不靠题干。
 */
const POPUP = [
  {
    testQuestion: {
      questionId: 1110000001,
      name: '<p>示例单选题一：甲必然属于乙。（ ）</p>',
      questionOptions: [
        { id: 900000001, content: '对', result: '0' },
        { id: 900000002, content: '错', result: '1' },
      ],
    },
  },
  {
    testQuestion: {
      questionId: 1110000002,
      name: '<p>示例多选题二的特征包括（ ）</p>',
      questionOptions: [
        { id: 900000004, content: '甲特征', result: '1' },
        { id: 900000005, content: '乙特征', result: '1' },
        { id: 900000006, content: '丙特征', result: '0' },
      ],
    },
  },
  {
    testQuestion: {
      questionId: 1110000003,
      name: '', // 图片题：弹题侧不带题干（真机形态）
      questionOptions: [
        { id: 900000007, content: '', result: '1' },
        { id: 900000008, content: '', result: '0' },
      ],
    },
  },
  // 通道没给正解的条目：不进键（宁缺勿错）
  {
    testQuestion: {
      questionId: 1110000004,
      name: '没有正解的题（ ）',
      questionOptions: [{ id: 999, content: '甲', result: null }],
    },
  },
  // 连题号都没有的条目：没法对齐，同样不进键
  { testQuestion: { name: '没有题号的题（ ）', questionOptions: [{ id: 998, result: '1' }] } },
];

/** 开卷卷面形状：只有 eid + 选项 id（questionId 恒 null；顺序与收割那一卷不同——每次尝试重排）。 */
const PAPER: PaperQuestion[] = [
  {
    eid: 'eid-A',
    questionId: null,
    options: [{ id: '900000001' }, { id: '900000002' }],
  },
  {
    eid: 'eid-B',
    questionId: null,
    options: [{ id: '900000006' }, { id: '900000005' }, { id: '900000004' }],
  },
  {
    eid: 'eid-C',
    questionId: null,
    options: [{ id: '900000008' }, { id: '900000007' }],
  },
];

describe('answerKeyFromPopupExam', () => {
  it('按 questionId 建条目，只收 result="1" 的选项；无正解/无题号的条目不进键', () => {
    const key = answerKeyFromPopupExam(POPUP);
    expect(key.version).toBe(2);
    expect(key.entries.map((entry) => entry.questionId)).toEqual([1110000001, 1110000002, 1110000003]);
    const multi = key.entries.find((entry) => entry.questionId === 1110000002);
    expect(multi?.correct.sort()).toEqual(['900000004', '900000005']);
  });

  it('空输入建出空键（不是错键）', () => {
    expect(answerKeyFromPopupExam([])).toEqual({ version: 2, entries: [] });
  });
});

describe('matchPaper', () => {
  it('开卷卷面（只有 eid）：选项 id 集合精确包含整卷命中，多选给全部正解，按本卷选项序作答', () => {
    const key = answerKeyFromPopupExam(POPUP);
    const match = matchPaper(PAPER, key);
    expect(match.missing).toHaveLength(0);
    expect(match.answers).toEqual([
      { eid: 'eid-A', optionIds: ['900000002'] },
      { eid: 'eid-B', optionIds: ['900000005', '900000004'] },
      { eid: 'eid-C', optionIds: ['900000007'] },
    ]);
    expect(coverageOf(PAPER, match)).toBe(1);
  });

  it('回顾卷面（带题号）：按题号直取', () => {
    const key = answerKeyFromPopupExam(POPUP);
    const looked: PaperQuestion[] = [
      { eid: '', questionId: 1110000002, options: [{ id: '900000004' }, { id: '900000005' }, { id: '900000006' }] },
    ];
    const match = matchPaper(looked, key);
    expect(match.missing).toHaveLength(0);
    expect(match.answers).toEqual([{ eid: '', optionIds: ['900000004', '900000005'] }]);
  });

  it('图片题（弹题侧无题干）照样对齐——2026-11-04 覆盖塌陷事故的回归钉', () => {
    const key = answerKeyFromPopupExam(POPUP);
    const imageOnly: PaperQuestion[] = [
      { eid: 'eid-img', questionId: null, options: [{ id: '900000007' }, { id: '900000008' }] },
    ];
    const match = matchPaper(imageOnly, key);
    expect(match.missing).toHaveLength(0);
    expect(match.answers).toEqual([{ eid: 'eid-img', optionIds: ['900000007'] }]);
  });

  it('本卷选项凑不齐某题的全部正解 id（多选只中一半）就是不确定：进 missing', () => {
    const key = answerKeyFromPopupExam(POPUP);
    const collided: PaperQuestion[] = [
      {
        eid: 'eid-collide',
        questionId: null,
        options: [{ id: '900000004' }, { id: '900000099' }], // 只有所属题正解的一半，凑不满
      },
    ];
    const match = matchPaper(collided, key);
    expect(match.answers).toHaveLength(0);
    expect(match.missing.map((question) => question.eid)).toEqual(['eid-collide']);
    expect(coverageOf(collided, match)).toBe(0);
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
    const plan = planAnswering({
      paper: [...PAPER, { eid: 'eid-D', questionId: null, options: [{ id: '1' }] }],
      key,
      remainingAttempts: MIN_ATTEMPTS_FOR_PROBE,
    });
    expect(plan.kind).toBe('probe-then-redo');
    if (plan.kind === 'probe-then-redo') expect(plan.missing.map((q) => q.eid)).toEqual(['eid-D']);
  });

  it('缺键 + 只剩 1 次机会（部分期末）→ 不自动作答，只报缺口', () => {
    const plan = planAnswering({
      paper: [...PAPER, { eid: 'eid-D', questionId: null, options: [{ id: '1' }] }],
      key,
      remainingAttempts: 1,
    });
    expect(plan.kind).toBe('report-only');
    if (plan.kind === 'report-only') expect(plan.coverage).toBeCloseTo(3 / 4);
  });

  it('没有键：机会够就探路，不够就只报', () => {
    expect(planAnswering({ paper: PAPER, key: null, remainingAttempts: 3 }).kind).toBe('probe-then-redo');
    expect(planAnswering({ paper: PAPER, key: null, remainingAttempts: 1 }).kind).toBe('report-only');
  });
});

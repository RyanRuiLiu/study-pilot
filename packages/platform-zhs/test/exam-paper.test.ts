/* 卷面解析与作答报文的形态核对（喂真机样本形态，逐字段对照）。 */

import { describe, expect, it } from 'vitest';
import { buildAnswerBody, parseLookedPaper, parsePaper, questionIdsOf } from '../src/exam-paper.ts';

/** 卷面响应样本（形态取自 .probe/zhs-sbx-submit 的真实开卷响应）。 */
const PAPER = {
  examBase: {
    id: 'FfGh0002',
    workExamParts: [
      {
        questionDtos: [
          {
            eid: 'aG9sZGluZy9zbGFzaA==',
            name: '示例单选：甲是（ ）的活动',
            questionType: { id: 1 },
            questionOptions: [
              { id: 900000011, content: '正例' },
              { id: 900000012, content: '反例' },
            ],
          },
        ],
      },
      {
        questionDtos: [
          {
            eid: 'c2xhc2gvaG9sZGluZw==',
            name: '多选题样本',
            questionType: { id: 2 },
            questionOptions: [{ id: 900000013, content: 'A' }],
          },
        ],
      },
    ],
  },
};

describe('parsePaper', () => {
  it('摊平多个 part，eid / 题干 / 选项（id 转字符串）都取到', () => {
    const paper = parsePaper(PAPER);
    expect(paper).toHaveLength(2);
    expect(paper[0]).toEqual({
      eid: 'aG9sZGluZy9zbGFzaA==',
      text: '示例单选：甲是（ ）的活动',
      questionType: 1,
      questionId: null, // 开卷不给题号（平台锁在交卷之后）
      options: [
        { id: '900000011', text: '正例' },
        { id: '900000012', text: '反例' },
      ],
    });
    expect(paper[1]!.questionType).toBe(2);
  });

  it('开卷卷面里题号恒为 null（平台锁在交卷之后）', () => {
    expect(parsePaper(PAPER).every((question) => question.questionId === null)).toBe(true);
  });

  it('一道题都认不出来就抛错（空卷面绝不能变成一次交卷）', () => {
    /*
     * 下游是 planAnswering：0 题的卷面覆盖率算 1、计划判 `answer`，
     * 再往下就是 submit 一张白卷——交卷即刻计分，收不回来。
     * 所以形态读不出来必须在这里响。
     */
    const broken = { examBase: { workExamParts: [{ questionDtos: [{ name: '缺 eid' }] }] } };
    expect(() => parsePaper(broken)).toThrow(/读不出任何一道题/);
    expect(() => parsePaper(null)).toThrow(/读不出任何一道题/);
    expect(() => parsePaper({})).toThrow(/读不出任何一道题/);
    expect(() => parsePaper({ examBase: { workExamParts: null } })).toThrow(/读不出任何一道题/);
    expect(() => parsePaper({ examBase: { workExamParts: [{ questionDtos: 'x' }] } })).toThrow(
      /读不出任何一道题/,
    );
  });

  it('单题形态不符只跳那道题，其余照常答（不是整卷作废）', () => {
    const mixed = {
      examBase: {
        workExamParts: [
          {
            questionDtos: [
              { name: '缺 eid 的那道' },
              {
                eid: 'aG9sZGluZy9zbGFzaA==',
                name: '示例单选：甲是（ ）的活动',
                questionType: { id: 1 },
                questionOptions: [{ id: 900000011, content: '正例' }],
              },
            ],
          },
        ],
      },
    };
    expect(parsePaper(mixed).map((question) => question.eid)).toEqual(['aG9sZGluZy9zbGFzaA==']);
  });
});

describe('parseLookedPaper（lookHomework：字段与开卷互补）', () => {
  /** 实测形态：题号是 int、eid 是 null、题干与选项照旧有。 */
  const LOOKED = {
    examBase: {
      workExamParts: [
        {
          questionDtos: [
            {
              id: 1000000001,
              eid: null,
              name: '示例单选二：乙属于（ ）的思维活动。',
              questionType: { id: 1, name: '单选题' },
              questionOptions: [
                { id: 900000011, content: '成立' },
                { id: 900000012, content: '不成立' },
              ],
            },
          ],
        },
      ],
    },
  };

  it('取到数字题号（eid 为 null 也不影响）', () => {
    const looked = parseLookedPaper(LOOKED);
    expect(looked).toEqual([
      {
        questionId: 1000000001,
        text: '示例单选二：乙属于（ ）的思维活动。',
        options: [
          { id: '900000011', text: '成立' },
          { id: '900000012', text: '不成立' },
        ],
      },
    ]);
    expect(questionIdsOf(looked)).toEqual([1000000001]);
  });

  it('开卷响应喂进来会解出空表——两个接口互补，不是同形', () => {
    expect(parseLookedPaper(PAPER)).toEqual([]);
    expect(questionIdsOf(parseLookedPaper(PAPER))).toEqual([]);
  });

  it('没有题号的题跳过', () => {
    expect(parseLookedPaper({ examBase: { workExamParts: [{ questionDtos: [{ id: null, name: 'x' }] }] } })).toEqual([]);
  });
});

describe('buildAnswerBody', () => {
  const base = {
    examId: 'FfGh0002',
    recruitId: 470001,
    stuExamId: 'AbCd0001',
    schoolId: 1001,
    courseId: 1000009999,
  };

  it('逐字段对齐真机形态（fromType=3、三个空串字段、answer 逗号分隔）', () => {
    const body = buildAnswerBody({ ...base, answers: [{ eid: 'eid-1', optionIds: ['900000011'], questionType: 1 }] });
    expect(JSON.parse(body)).toEqual([
      {
        examId: 'FfGh0002',
        recruitId: 470001,
        stuExamId: 'AbCd0001',
        eid: 'eid-1',
        schoolId: 1001,
        deviceId: '',
        examType: '',
        fromType: 3,
        answer: '900000011',
        dataIds: '',
        questionType: 1,
      },
    ]);
  });

  it('多选：选项 id 逗号分隔', () => {
    const body = buildAnswerBody({ ...base, answers: [{ eid: 'e', optionIds: ['1', '2'], questionType: 2 }] });
    expect((JSON.parse(body) as Array<{ answer: string }>)[0]!.answer).toBe('1,2');
  });

  it('没有 eid 或没有选项的作答不进报文（空数组是合法结果）', () => {
    const body = buildAnswerBody({
      ...base,
      answers: [
        { eid: '', optionIds: ['1'], questionType: 1 },
        { eid: 'e', optionIds: [], questionType: 1 },
      ],
    });
    expect(JSON.parse(body)).toEqual([]);
  });
});

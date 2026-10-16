/* 卷面解析与作答报文的形态核对（喂真机样本形态，逐字段对照）。 */

import { describe, expect, it } from 'vitest';
import { buildAnswerBody, parseLookedPaper, parsePaper, questionIdsOf } from '../src/exam-paper.ts';

/** 卷面响应样本（形态取自 .probe/zhs-sbx-submit 的真实开卷响应）。 */
const PAPER = {
  examBase: {
    id: 'DEMOb002',
    workExamParts: [
      {
        questionDtos: [
          {
            eid: 'ZGVtby10b2tlbi0wMDAwMg==',
            name: '示例填空题乙（ ）的人类活动',
            questionType: { id: 1 },
            questionOptions: [
              { id: 900000006, content: '示例选项戊' },
              { id: 900000007, content: '示例选项丁' },
            ],
          },
        ],
      },
      {
        questionDtos: [
          {
            eid: 'ZGVtby10b2tlbi0wMDAwMQ==',
            name: '多选题样本',
            questionType: { id: 2 },
            questionOptions: [{ id: 900000008, content: 'A' }],
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
      eid: 'ZGVtby10b2tlbi0wMDAwMg==',
      text: '示例填空题乙（ ）的人类活动',
      questionType: 1,
      questionId: null, // 开卷不给题号（平台锁在交卷之后）
      options: [
        { id: '900000006', text: '示例选项戊' },
        { id: '900000007', text: '示例选项丁' },
      ],
    });
    expect(paper[1]!.questionType).toBe(2);
  });

  it('开卷卷面里题号恒为 null（平台锁在交卷之后）', () => {
    expect(parsePaper(PAPER).every((question) => question.questionId === null)).toBe(true);
  });

  it('没有 eid 的题跳过（作答认 eid，缺了就答不了）', () => {
    const broken = { examBase: { workExamParts: [{ questionDtos: [{ name: '缺 eid' }] }] } };
    expect(parsePaper(broken)).toEqual([]);
  });

  it('形状不对的层级逐层退化到空表，不抛错', () => {
    expect(parsePaper(null)).toEqual([]);
    expect(parsePaper({})).toEqual([]);
    expect(parsePaper({ examBase: { workExamParts: null } })).toEqual([]);
    expect(parsePaper({ examBase: { workExamParts: [{ questionDtos: 'x' }] } })).toEqual([]);
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
              id: 9000000015,
              eid: null,
              name: '示例填空题丙（ ）创意思维活动和方法。',
              questionType: { id: 1, name: '单选题' },
              questionOptions: [
                { id: 900000006, content: '有效' },
                { id: 900000007, content: '无效' },
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
        questionId: 9000000015,
        text: '示例填空题丙（ ）创意思维活动和方法。',
        options: [
          { id: '900000006', text: '有效' },
          { id: '900000007', text: '无效' },
        ],
      },
    ]);
    expect(questionIdsOf(looked)).toEqual([9000000015]);
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
    examId: 'DEMOb002',
    recruitId: 900004,
    stuExamId: 'DEMOa001',
    schoolId: 9001,
    courseId: 9000000002,
  };

  it('逐字段对齐真机形态（fromType=3、三个空串字段、answer 逗号分隔）', () => {
    const body = buildAnswerBody({ ...base, answers: [{ eid: 'eid-1', optionIds: ['900000006'], questionType: 1 }] });
    expect(JSON.parse(body)).toEqual([
      {
        examId: 'DEMOb002',
        recruitId: 900004,
        stuExamId: 'DEMOa001',
        eid: 'eid-1',
        schoolId: 9001,
        deviceId: '',
        examType: '',
        fromType: 3,
        answer: '900000006',
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

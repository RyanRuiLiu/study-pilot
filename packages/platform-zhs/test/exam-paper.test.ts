/* 卷面解析与作答报文的形态核对（喂真机样本形态，逐字段对照）。 */

import { describe, expect, it } from 'vitest';
import { buildAnswerBody, parsePaper } from '../src/exam-paper.ts';

/** 卷面响应样本（形态取自 .probe/zhs-sbx-submit 的真实开卷响应）。 */
const PAPER = {
  examBase: {
    id: 'y79mmz7e',
    workExamParts: [
      {
        questionDtos: [
          {
            eid: 'k2uP47Bb3qoDu2W/4F3YPw==',
            name: '创新就是（ ）的人类活动',
            questionType: { id: 1 },
            questionOptions: [
              { id: 561505107, content: '无中生有' },
              { id: 561505108, content: '循规蹈矩' },
            ],
          },
        ],
      },
      {
        questionDtos: [
          {
            eid: 'AmJ0uOZd7bfyM6mshp2GLg==',
            name: '多选题样本',
            questionType: { id: 2 },
            questionOptions: [{ id: 561505116, content: 'A' }],
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
      eid: 'k2uP47Bb3qoDu2W/4F3YPw==',
      text: '创新就是（ ）的人类活动',
      questionType: 1,
      options: [
        { id: '561505107', text: '无中生有' },
        { id: '561505108', text: '循规蹈矩' },
      ],
    });
    expect(paper[1]!.questionType).toBe(2);
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

describe('buildAnswerBody', () => {
  const base = {
    examId: 'y79mmz7e',
    recruitId: 473310,
    stuExamId: 'wDOALWxA',
    schoolId: 6729,
    courseId: 1000006163,
  };

  it('逐字段对齐真机形态（fromType=3、三个空串字段、answer 逗号分隔）', () => {
    const body = buildAnswerBody({ ...base, answers: [{ eid: 'eid-1', optionIds: ['561505107'], questionType: 1 }] });
    expect(JSON.parse(body)).toEqual([
      {
        examId: 'y79mmz7e',
        recruitId: 473310,
        stuExamId: 'wDOALWxA',
        eid: 'eid-1',
        schoolId: 6729,
        deviceId: '',
        examType: '',
        fromType: 3,
        answer: '561505107',
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

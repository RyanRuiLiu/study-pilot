/*
 * 学习页地址：拼接与解析。
 *
 * 地址里的三个参数各自决定前台行为，任何一个解析错都会让功能作用到错误的单元：
 *   tid   决定读哪个课题库
 *   view  决定挂载做题助手还是得分指导
 *   id    决定取哪一份试卷或作业
 * 因此这里把各种真实形态与畸形输入都钉住。
 *
 * 拼与解共用一张路由表，所以还钉一条往返性质：拼出来的地址再解析回来，
 * 必须得到同一个作答区。平台改路由时只有一处要改，而漏改另一处会被这条测试抓住。
 */

import { describe, expect, it } from 'vitest';
import { parseWorkLocation, workPageUrl, type WorkKind } from '../src/course-url.ts';

const LEARN_BASE = 'https://www.icourse163.org/learn/NTU-9000000014';
const COURSE = {
  courseId: 9000000014,
  schoolShortName: 'NTU',
  mode: 0,
  termId: 9000000030,
};

describe('解析页面地址', () => {
  it('解析测验页', () => {
    const result = parseWorkLocation(`${LEARN_BASE}?tid=9000000030#/learn/quiz?id=9000000019`);
    expect(result).toEqual({
      termId: 9000000030,
      view: 'quiz',
      contentId: 9000000019,
    });
  });

  it('解析作业页', () => {
    const result = parseWorkLocation(`${LEARN_BASE}?tid=9000000030#/learn/hw?id=9000000020`);
    expect(result).toEqual({
      termId: 9000000030,
      view: 'homework',
      contentId: 9000000020,
    });
  });

  it('两种考试各自解析，eid 不参与', () => {
    expect(
      parseWorkLocation(`${LEARN_BASE}?tid=1#/learn/examObject?eid=7&id=2&examType=0`).view,
    ).toBe('exam-objective');
    expect(
      parseWorkLocation(`${LEARN_BASE}?tid=1#/learn/examSubjective?eid=7&id=2`).view,
    ).toBe('exam-subjective');
  });

  it('SPOC 路径同样解析', () => {
    const result = parseWorkLocation(
      'https://www.icourse163.org/spoc/learn/NTU-9000000014?tid=9000000030#/learn/quiz?id=1',
    );
    expect(result.view).toBe('quiz');
    expect(result.termId).toBe(9000000030);
  });

  it('其它视图归为 other', () => {
    const result = parseWorkLocation(`${LEARN_BASE}?tid=9000000030#/learn/announce`);
    expect(result.view).toBe('other');
    expect(result.contentId).toBeNull();
  });

  it('没有 hash 时视图为 other 且内容 id 为空', () => {
    const result = parseWorkLocation(`${LEARN_BASE}?tid=9000000030`);
    expect(result).toEqual({ termId: 9000000030, view: 'other', contentId: null });
  });

  it('缺少 tid 时 termId 为空', () => {
    const result = parseWorkLocation(`${LEARN_BASE}#/learn/quiz?id=9000000019`);
    expect(result.termId).toBeNull();
    expect(result.contentId).toBe(9000000019);
  });

  it('缺少 id 时 contentId 为空', () => {
    const result = parseWorkLocation(`${LEARN_BASE}?tid=9000000030#/learn/quiz`);
    expect(result.contentId).toBeNull();
  });

  it('非数字与负数一律视为缺失', () => {
    expect(parseWorkLocation(`${LEARN_BASE}?tid=abc#/learn/quiz?id=xyz`)).toEqual({
      termId: null,
      view: 'quiz',
      contentId: null,
    });
    expect(parseWorkLocation(`${LEARN_BASE}?tid=-1#/learn/quiz?id=-5`)).toEqual({
      termId: null,
      view: 'quiz',
      contentId: null,
    });
    expect(parseWorkLocation(`${LEARN_BASE}?tid=0#/learn/quiz?id=0`)).toEqual({
      termId: null,
      view: 'quiz',
      contentId: null,
    });
  });
});

describe('拼出来再认回去', () => {
  const cases: Array<[WorkKind, number | undefined]> = [
    ['quiz', undefined],
    ['homework', undefined],
    ['exam-objective', 7],
    ['exam-subjective', 7],
  ];

  it.each(cases)('%s', (kind, examId) => {
    const href = workPageUrl(COURSE, kind, 9000000019, examId);

    expect(parseWorkLocation(href)).toEqual({
      termId: COURSE.termId,
      view: kind,
      contentId: 9000000019,
    });
  });

  it('课程模式不同只会换前缀，作答区照样认得出来', () => {
    for (const mode of [0, 10, 15, 20, 30]) {
      const href = workPageUrl({ ...COURSE, mode }, 'quiz', 1);
      expect(parseWorkLocation(href).view).toBe('quiz');
    }
  });
});

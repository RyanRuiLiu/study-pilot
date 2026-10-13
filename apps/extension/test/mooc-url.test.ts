/*
 * 学习页地址解析测试。
 *
 * 地址里的三个参数各自决定前台行为，任何一个解析错都会让功能作用到错误的单元：
 *   tid  决定读哪个课题库
 *   view 决定挂载做题助手还是作业答案
 *   id   决定取哪一份试卷或作业
 * 因此这里把各种真实形态与畸形输入都钉住。
 */

import { describe, expect, it } from 'vitest';
import { parseMoocLocation } from '../src/platform/mooc/url';

const LEARN_BASE = 'https://www.icourse163.org/learn/NTU-9000000014';

describe('parseMoocLocation', () => {
  it('解析测验页', () => {
    const result = parseMoocLocation(`${LEARN_BASE}?tid=9000000030#/learn/quiz?id=9000000019`);
    expect(result).toEqual({
      termId: 9000000030,
      view: 'quiz',
      contentId: 9000000019,
    });
  });

  it('解析作业页', () => {
    const result = parseMoocLocation(`${LEARN_BASE}?tid=9000000030#/learn/hw?id=9000000020`);
    expect(result).toEqual({
      termId: 9000000030,
      view: 'homework',
      contentId: 9000000020,
    });
  });

  it('SPOC 路径同样解析', () => {
    const result = parseMoocLocation(
      'https://www.icourse163.org/spoc/learn/NTU-9000000014?tid=9000000030#/learn/quiz?id=1',
    );
    expect(result.view).toBe('quiz');
    expect(result.termId).toBe(9000000030);
  });

  it('其它视图归为 other', () => {
    const result = parseMoocLocation(`${LEARN_BASE}?tid=9000000030#/learn/announce`);
    expect(result.view).toBe('other');
    expect(result.contentId).toBeNull();
  });

  it('没有 hash 时视图为 other 且内容 id 为空', () => {
    const result = parseMoocLocation(`${LEARN_BASE}?tid=9000000030`);
    expect(result).toEqual({ termId: 9000000030, view: 'other', contentId: null });
  });

  it('缺少 tid 时 termId 为空', () => {
    const result = parseMoocLocation(`${LEARN_BASE}#/learn/quiz?id=9000000019`);
    expect(result.termId).toBeNull();
    expect(result.contentId).toBe(9000000019);
  });

  it('缺少 id 时 contentId 为空', () => {
    const result = parseMoocLocation(`${LEARN_BASE}?tid=9000000030#/learn/quiz`);
    expect(result.contentId).toBeNull();
  });

  it('非数字与负数一律视为缺失', () => {
    expect(parseMoocLocation(`${LEARN_BASE}?tid=abc#/learn/quiz?id=xyz`)).toEqual({
      termId: null,
      view: 'quiz',
      contentId: null,
    });
    expect(parseMoocLocation(`${LEARN_BASE}?tid=-1#/learn/quiz?id=-5`)).toEqual({
      termId: null,
      view: 'quiz',
      contentId: null,
    });
    expect(parseMoocLocation(`${LEARN_BASE}?tid=0#/learn/quiz?id=0`)).toEqual({
      termId: null,
      view: 'quiz',
      contentId: null,
    });
  });
});

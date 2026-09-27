/*
 * 展示格式化的分层测试。
 *
 * 参数契约是「非空数字，0 表示平台未提供」。测试围绕这个契约展开：
 * 正常值给出可读文本，0 给出空串——空串表示「没有这项数据」，
 * 由调用方决定是否整段省略，而不是在这里拼出占位文本。
 */

import { describe, expect, it } from 'vitest';
import { coursePageUrl, describeCourseMode, learnPagePrefix } from '@study-pilot/platform-mooc';
import { formatMonth, formatTermRange } from '../src/features/format';

describe('formatMonth', () => {
  it('正常时间戳输出 YYYY-MM', () => {
    expect(formatMonth(new Date(2026, 8, 27).getTime())).toBe('2026-09');
  });

  it('月份补零', () => {
    expect(formatMonth(new Date(2026, 0, 5).getTime())).toBe('2026-01');
  });

  it('0 表示未提供，返回空串', () => {
    expect(formatMonth(0)).toBe('');
  });

  it('负数视为无效，返回空串', () => {
    expect(formatMonth(-1)).toBe('');
  });
});

describe('formatTermRange', () => {
  it('两端都有值时给出区间', () => {
    const start = new Date(2026, 2, 1).getTime();
    const end = new Date(2026, 6, 1).getTime();
    expect(formatTermRange(start, end)).toBe('2026-03 至 2026-07');
  });

  it('两端都未提供时返回空串', () => {
    expect(formatTermRange(0, 0)).toBe('');
  });

  it('只缺开始时间时给出「至 …」', () => {
    expect(formatTermRange(0, new Date(2026, 6, 1).getTime())).toBe('至 2026-07');
  });

  it('只缺结束时间时给出「… 起」', () => {
    expect(formatTermRange(new Date(2026, 2, 1).getTime(), 0)).toBe('2026-03 起');
  });
});

describe('coursePageUrl', () => {
  it('路径段是学校简称加课程 id，不是课程 shortName', () => {
    // 实测：模拟电子技术 shortName 为 NTU021，而实际地址用 NTU-1001753142
    expect(
      coursePageUrl({
        courseId: 1001753142,
        schoolShortName: 'NTU',
        mode: 0,
        termId: 1487834456,
      }),
    ).toBe('https://www.icourse163.org/learn/NTU-1001753142?tid=1487834456');
  });

  it('SPOC 走 /spoc/learn/', () => {
    expect(
      coursePageUrl({
        courseId: 1467539170,
        schoolShortName: 'NTU',
        mode: 15,
        termId: 1488277459,
      }),
    ).toBe('https://www.icourse163.org/spoc/learn/NTU-1467539170?tid=1488277459');
  });
});

describe('describeCourseMode 与 learnPagePrefix', () => {
  it('各模式给出平台的叫法', () => {
    expect(describeCourseMode(0)).toBe('MOOC');
    expect(describeCourseMode(10)).toBe('SPOC 同步');
    expect(describeCourseMode(15)).toBe('SPOC 异步');
    expect(describeCourseMode(20)).toBe('SPOC 独立');
    expect(describeCourseMode(30)).toBe('ROOC');
  });

  it('未提供的模式返回空串，由调用方决定是否省略', () => {
    expect(describeCourseMode(-1)).toBe('');
  });

  it('MOOC 用 /learn/，其余用 /spoc/learn/', () => {
    expect(learnPagePrefix(0)).toBe('/learn/');
    expect(learnPagePrefix(10)).toBe('/spoc/learn/');
    expect(learnPagePrefix(15)).toBe('/spoc/learn/');
    expect(learnPagePrefix(20)).toBe('/spoc/learn/');
    expect(learnPagePrefix(30)).toBe('/spoc/learn/');
  });
});

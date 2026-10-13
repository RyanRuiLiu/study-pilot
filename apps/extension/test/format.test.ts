/*
 * 展示格式化的分层测试。
 *
 * 参数契约是「非空数字，0 表示平台未提供」。测试围绕这个契约展开：
 * 正常值给出可读文本，0 给出空串——空串表示「没有这项数据」，
 * 由调用方决定是否整段省略，而不是在这里拼出占位文本。
 */

import { describe, expect, it, vi } from 'vitest';
import { coursePageUrl, describeCourseMode, learnPagePrefix } from '@study-pilot/platform-mooc';
import {
  daysBetween,
  formatMonth,
  formatTermRange,
  isUrgent,
  relativeDay,
} from '../src/features/format';

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

/*
 * 自然日的算法容易写成 24 小时周期，而后者在跨天的边界上会给出错误结论。
 * 下面每组都针对一种真实误判。
 */
describe('自然日：daysBetween / relativeDay / isUrgent', () => {
  const at = (y: number, m: number, d: number, h: number, min = 0) =>
    new Date(y, m - 1, d, h, min).getTime();

  it('按日历上的日子算，不按 24 小时周期', () => {
    // 22:00 到次日 20:00 只隔 22 小时，但那是「明天」
    expect(daysBetween(at(2026, 9, 30, 20), at(2026, 9, 29, 22))).toBe(1);
  });

  it('跨过零点就算相隔一天，哪怕只过了半小时', () => {
    /*
     * 这是「日历上的日子」的定义本身：9-29 23:00 与 9-30 00:30 分属两天，
     * 因此相隔 1 天。要钉住的是这个定义，而不是 24 小时周期——
     * 后者会把这两者算成 0（同一天），从而把「昨天就该交」显示成「今天」。
     */
    expect(daysBetween(at(2026, 9, 30, 0, 30), at(2026, 9, 29, 23))).toBe(1);
    // 同一天内无论相隔多久都是 0
    expect(daysBetween(at(2026, 9, 30, 23, 59), at(2026, 9, 30, 0, 1))).toBe(0);
  });

  it('相对说法覆盖昨天到今天的三档', () => {
    vi.setSystemTime(at(2026, 9, 30, 10));
    expect(relativeDay(at(2026, 9, 29, 20))).toBe('已过期 1 天');
    expect(relativeDay(at(2026, 9, 30, 23))).toBe('今天');
    expect(relativeDay(at(2026, 10, 1, 8))).toBe('明天');
    expect(relativeDay(at(2026, 10, 2, 8))).toBe('后天');
    expect(relativeDay(at(2026, 10, 9, 8))).toBe('9 天后');
  });

  it('没有截止时间时给出说法，而不是「已过期」', () => {
    expect(relativeDay(0)).toBe('无截止时间');
    expect(isUrgent(0)).toBe(false);
  });

  it('只有今天到期与已过期算紧急，明天不算', () => {
    vi.setSystemTime(at(2026, 9, 30, 22));
    expect(isUrgent(at(2026, 9, 30, 23, 59))).toBe(true);
    expect(isUrgent(at(2026, 9, 29, 23))).toBe(true);
    // 今天 22:00 看明天 20:00：还有一整天，不该上红色
    expect(isUrgent(at(2026, 10, 1, 20))).toBe(false);
  });
});

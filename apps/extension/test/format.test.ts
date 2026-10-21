/*
 * 时间展示的判据：自然日口径，以及「平台没给时间」的统一处理。
 *
 * 自然日那几条来自实际误报：按 24 小时周期算，今天 22:00 看明天 20:00 的截止
 * 会被标成「紧急」，而那是明天的事。
 */

import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  daysBetween,
  formatClock,
  formatDate,
  formatDateTime,
  formatTermRange,
  isUrgent,
  relativeDay,
} from '../src/ui/format.ts';

const at = (day: number, hour: number, minute = 0): number =>
  new Date(2026, 9, day, hour, minute, 0, 0).getTime();

afterEach(() => {
  vi.useRealTimers();
});

describe('自然日口径', () => {
  it('今天 22:00 看明天 20:00：隔一天，不紧急', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 21, 22, 0, 0));
    expect(isUrgent(at(22, 20))).toBe(false);
    expect(relativeDay(at(22, 20))).toBe('明天');
    expect(daysBetween(at(22, 20), at(21, 22))).toBe(1);
  });

  it('今天到点前算紧急；已过期说出几天', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 21, 22, 0, 0));
    expect(isUrgent(at(21, 23))).toBe(true);
    expect(relativeDay(at(21, 10))).toBe('今天');
    expect(relativeDay(at(20, 10))).toBe('已过期 1 天');
  });
});

describe('平台没给时间', () => {
  it('0 与非有限值一样：空串或「无截止时间」，不渲染成 NaN', () => {
    for (const value of [0, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(formatDate(value)).toBe('');
      expect(formatDateTime(value)).toBe('');
      expect(formatClock(value)).toBe('');
      expect(relativeDay(value)).toBe('无截止时间');
      expect(isUrgent(value)).toBe(false);
    }
  });

  it('学期区间两端都缺时给空串，一端缺时写明', () => {
    expect(formatTermRange(0, 0)).toBe('');
    expect(formatTermRange(at(1, 0), 0)).toBe('2026-10 起');
    expect(formatTermRange(0, at(1, 0))).toBe('至 2026-10');
  });
});

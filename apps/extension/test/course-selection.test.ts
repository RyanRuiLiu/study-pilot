/*
 * 课程合并时的勾选规则。
 *
 * 这里锁住的是一条产品决定：**勾选是用户给的授权，扩展不替他勾**。
 *
 * 之所以值得写测试，是因为它被改错过一次：早先按「学期区间覆盖当下」
 * 自动勾选，于是首次读取课程列表之后，作用范围就由默认值定了；
 * 又因为设置页每次打开都会重新读取课程列表，点「恢复默认设置」清空课程
 * 之后那几门正在开课的课又被勾了回来，用户看到的是「恢复默认没生效」。
 */

import { describe, expect, it } from 'vitest';
import type { CourseSummary } from '@study-pilot/platform-mooc';
import { mergeCourses } from '../src/background/course-selection';
import type { SelectedCourse } from '../src/settings';

/** 学期区间盖住当下的课程。按旧规则它会被自动勾上。 */
const TERM_START = 1_700_000_000_000;
const TERM_END = 1_900_000_000_000;

function summary(over: Partial<CourseSummary> = {}): CourseSummary {
  return {
    courseId: 1,
    name: '模拟电子技术',
    shortName: 'EE101',
    termId: 1487834456,
    mode: 0,
    courseType: 1,
    schoolName: '某大学',
    schoolShortName: 'UNI',
    coverUrl: '',
    startTime: null,
    endTime: null,
    publishStatus: null,
    lessonsCount: null,
    enrollCount: null,
    ...over,
  };
}

function selected(over: Partial<SelectedCourse> = {}): SelectedCourse {
  return {
    courseId: 1,
    termId: 1487834456,
    name: '模拟电子技术',
    shortName: 'EE101',
    mode: 0,
    schoolName: '某大学',
    schoolShortName: 'UNI',
    coverUrl: '',
    startTime: 0,
    endTime: 0,
    lessonsCount: 0,
    enrollCount: 0,
    enabled: false,
    ...over,
  };
}

describe('新出现的课程一律不勾', () => {
  it('正在开课的课程也不勾', () => {
    const merged = mergeCourses(
      [],
      [summary({ startTime: TERM_START, endTime: TERM_END })],
    );
    expect(merged[0].enabled).toBe(false);
  });

  it('首次读到多门在上的课程，一门都不勾', () => {
    const merged = mergeCourses(
      [],
      [1, 2, 3, 4, 5, 6].map((n) =>
        summary({ termId: n, startTime: TERM_START, endTime: TERM_END }),
      ),
    );
    expect(merged.filter((course) => course.enabled)).toHaveLength(0);
  });

  it('恢复默认清空课程后再读取，勾选仍然是空的', () => {
    const merged = mergeCourses(
      [],
      [summary({ termId: 1, startTime: TERM_START, endTime: TERM_END })],
    );
    expect(merged.every((course) => !course.enabled)).toBe(true);
  });
});

describe('用户自己做过的选择原样保留', () => {
  it('勾过的课程保持勾选', () => {
    const merged = mergeCourses([selected({ termId: 7, enabled: true })], [summary({ termId: 7 })]);
    expect(merged[0].enabled).toBe(true);
  });

  it('取消过的课程不会被重新勾上', () => {
    const merged = mergeCourses(
      [selected({ termId: 7, enabled: false })],
      [summary({ termId: 7, startTime: TERM_START, endTime: TERM_END })],
    );
    expect(merged[0].enabled).toBe(false);
  });

  it('只有第一次见到的那些课程走默认值，已记录的照旧', () => {
    const merged = mergeCourses(
      [selected({ termId: 7, enabled: true })],
      [summary({ termId: 7 }), summary({ termId: 8, startTime: TERM_START, endTime: TERM_END })],
    );
    expect(merged.map((course) => [course.termId, course.enabled])).toEqual([
      [7, true],
      [8, false],
    ]);
  });
});

describe('字段归一化', () => {
  it('平台未提供的数值记 0，mode 记 -1', () => {
    const merged = mergeCourses([], [summary({ mode: null })]);
    expect(merged[0]).toMatchObject({
      mode: -1,
      startTime: 0,
      endTime: 0,
      lessonsCount: 0,
      enrollCount: 0,
    });
  });

  it('平台给出的数值原样保留', () => {
    const merged = mergeCourses(
      [],
      [summary({ mode: 10, startTime: 111, endTime: 222, lessonsCount: 12, enrollCount: 34 })],
    );
    expect(merged[0]).toMatchObject({
      mode: 10,
      startTime: 111,
      endTime: 222,
      lessonsCount: 12,
      enrollCount: 34,
    });
  });

  it('已经从账号里消失的课程不留在这份列表里', () => {
    const merged = mergeCourses([selected({ termId: 99, enabled: true })], [summary({ termId: 7 })]);
    expect(merged.map((course) => course.termId)).toEqual([7]);
  });
});

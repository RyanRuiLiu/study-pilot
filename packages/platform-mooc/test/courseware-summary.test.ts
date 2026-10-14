/*
 * 课件进度的计数（summarizeCourseware）。
 *
 * 这份数字直接显示给用户（「已学 1/5」），也决定「快速完成」点下去做几项。
 * 它必须与执行的判据同源：done 用 isUnitComplete、pending 用 isCompletable，
 * 否则会出现「显示 3 项可做、实际做了 2 项」这种对不上。
 */

import { describe, expect, it } from 'vitest';
import { UNIT_TYPE, summarizeCourseware, type CourseUnit } from '../src/index.ts';
import type { Snapshot } from '../src/policy/read/types.ts';

function unitOf(overrides: Partial<CourseUnit> = {}): CourseUnit {
  return {
    unitId: 1001,
    contentId: 2002,
    termId: 3003,
    lessonId: 3004,
    lessonName: '1.1 课时',
    name: '示例单元',
    contentType: UNIT_TYPE.VIDEO,
    durationInSeconds: 500,
    completePercent: 0,
    viewStatus: 0,
    ...overrides,
  };
}

function snapshotOf(units: CourseUnit[]): Snapshot {
  return {
    courses: [
      {
        termId: 1,
        courseId: 100,
        schoolShortName: 'NTU',
        mode: 0,
        courseName: '模拟电子技术',
        works: [],
        units,
      },
    ],
  };
}

describe('课件进度计数', () => {
  it('已完成的、能做的、做不了的分开数', () => {
    const units = [
      unitOf({ unitId: 1, completePercent: 1 }), // 已完成
      unitOf({ unitId: 2 }), // 视频，未完成 → 能做
      unitOf({ unitId: 3, contentType: UNIT_TYPE.PDF, durationInSeconds: null }), // 文档不论时长 → 能做
      unitOf({ unitId: 4, contentType: UNIT_TYPE.LIVE }), // 未实测的类型 → 做不了
      unitOf({ unitId: 5, durationInSeconds: null }), // 视频没有时长 → 做不了
    ];

    expect(summarizeCourseware(snapshotOf(units), false)).toEqual([
      { courseName: '模拟电子技术', done: 1, total: 5, pending: 2, cannot: 2 },
    ]);
  });

  it('没有 AI 时讨论单元算「做不了」；配了 AI 就算可做', () => {
    const units = [unitOf({ unitId: 1, contentType: UNIT_TYPE.DISCUSS, durationInSeconds: null })];

    expect(summarizeCourseware(snapshotOf(units), false)[0]).toMatchObject({ pending: 0, cannot: 1 });
    expect(summarizeCourseware(snapshotOf(units), true)[0]).toMatchObject({ pending: 1, cannot: 0 });
  });

  it('每门课各一条，顺序与快照一致', () => {
    const snapshot: Snapshot = {
      courses: [
        { termId: 1, courseId: 1, schoolShortName: 'A', mode: 0, courseName: '电路', works: [], units: [unitOf()] },
        { termId: 2, courseId: 2, schoolShortName: 'B', mode: 0, courseName: '模电', works: [], units: [] },
      ],
    };

    expect(summarizeCourseware(snapshot, false).map((entry) => entry.courseName)).toEqual(['电路', '模电']);
  });
});

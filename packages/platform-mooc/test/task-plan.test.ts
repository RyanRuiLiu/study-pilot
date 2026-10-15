/*
 * 计划派生的完整组合测试。
 *
 * 这里要回答的是「每一种平台状态，会落到哪里」。组合数不少，逐一人工
 * 验证不可靠，所以写成参数化的表格：每一行是一个具体处境，右边写明它
 * 应当落到哪里。
 *
 * 为什么值得这么细
 * ----------------
 * 一个真实的作业会经历「未交 → 已交 → 互评期 → 互评期结束 → 出分」
 * 五个阶段。少考虑一种，就会出现「界面上说能做、实际不会」或者
 * 「明明还能做却告诉用户已经放弃了」这类错误——而这两类错误用户
 * 都看不出来是 bug，只会以为扩展不好用。
 *
 * 开关已经不在了：没过截止的测验/互评/自评一律排进 auto，授权在点击那一刻
 * （见 application 的 round.ts）。这份表格因此只描述平台事实。
 */

import { describe, expect, it } from 'vitest';
import { UNIT_TYPE, type CourseUnit } from '../src/types.ts';
import { derivePlan, type Plan } from '../src/policy/plan/index.ts';
import type { Snapshot, SnapshotCourse, SnapshotWork } from '../src/policy/read/types.ts';
import type { Settings } from '@study-pilot/application';

const DAY = 24 * 60 * 60 * 1000;
const NOW = new Date(2026, 8, 26, 10, 0, 0).getTime();

/** 一份最小可用的设置：AI 关着（讨论单元因此不进计划）、没有课程、默认评语。 */
const SETTINGS: Settings = {
  version: 6,
  ai: { enabled: false, model: '', apiKey: '' },
  mooc: { courses: [], reviewComment: 'x', keepOverdueDays: 3 },
};

function work(overrides: Partial<SnapshotWork> & { tid: number }): SnapshotWork {
  return {
    name: `单元 ${overrides.tid}`,
    chapterName: '第1章',
    examId: null,
    type: 'quiz',
    submitted: false,
    deadline: NOW + 3 * DAY,
    evaluateStart: null,
    evaluateEnd: null,
    evaluateScoreRelease: null,
    score: null,
    totalScore: 100,
    reviewable: false,
    evaluateDone: null,
    evaluateTotal: null,
    selfDone: null,
    ...overrides,
  };
}

function snapshot(works: SnapshotWork[], units: CourseUnit[] = []): Snapshot {
  const course: SnapshotCourse = {
    termId: 1,
    courseId: 100,
    schoolShortName: 'NTU',
    mode: 0,
    courseName: '测试课程',
    works,
    units,
  };
  return { courses: [course] };
}

/** 计划的简写，便于在表格里写期望值。 */
function shape(plan: Plan): string {
  if (plan.auto.length === 0 && plan.manual.length === 0) return '空';
  const auto = plan.auto.map((a) => a.kind).join('+');
  const manual = plan.manual.map((m) => m.reason).join('+');
  return [auto && `自动:${auto}`, manual && `人工:${manual}`].filter(Boolean).join(' ');
}

// ---------- 测验 ----------

describe('测验', () => {
  const cases: Array<[string, Partial<SnapshotWork>, string]> = [
    ['未做、未过截止', {}, '自动:quiz'],
    ['未做、已过截止', { deadline: NOW - DAY }, '人工:quiz-overdue'],
    ['已做、有分', { submitted: true, score: 90 }, '空'],
    ['已做、无分', { submitted: true }, '空'],
    ['未做、无截止时间', { deadline: null }, '自动:quiz'],
  ];

  for (const [name, patch, expected] of cases) {
    it(`${name} → ${expected}`, () => {
      const plan = derivePlan(snapshot([work({ tid: 1, ...patch })]), SETTINGS, NOW);
      expect(shape(plan)).toBe(expected);
    });
  }
});

// ---------- 作业：未提交 ----------

describe('作业（未提交）', () => {
  const hw = (patch: Partial<SnapshotWork> = {}) =>
    work({ tid: 2, type: 'homework', reviewable: true, ...patch });

  const cases: Array<[string, Partial<SnapshotWork>, string]> = [
    ['未交、未过截止', {}, '人工:homework-unsubmitted'],
    ['未交、已过截止', { deadline: NOW - DAY }, '人工:homework-overdue'],
  ];

  for (const [name, patch, expected] of cases) {
    it(`${name} → ${expected}`, () => {
      expect(shape(derivePlan(snapshot([hw(patch)]), SETTINGS, NOW))).toBe(expected);
    });
  }
});

// ---------- 作业：已提交，互评期内 ----------

describe('作业（已交、互评期内）', () => {
  const inWindow = {
    type: 'homework' as const,
    submitted: true,
    reviewable: true,
    deadline: NOW - DAY,
    evaluateStart: NOW - DAY,
    evaluateEnd: NOW + 5 * DAY,
  };

  const cases: Array<[string, Partial<SnapshotWork>, string]> = [
    [
      '互评未够、自评未做',
      { ...inWindow, evaluateDone: 2, evaluateTotal: 5, selfDone: false },
      // 顺序是 quiz → self → review，自评在互评之前
      '自动:self+review',
    ],
    [
      '互评未够、自评已做',
      { ...inWindow, evaluateDone: 0, evaluateTotal: 5, selfDone: true },
      '自动:review',
    ],
    [
      '互评已够、自评未做',
      { ...inWindow, evaluateDone: 5, evaluateTotal: 5, selfDone: false },
      '自动:self',
    ],
    [
      '互评已够、自评已做',
      { ...inWindow, evaluateDone: 5, evaluateTotal: 5, selfDone: true },
      '空',
    ],
    [
      '这份作业不带互评、自评未做',
      { ...inWindow, reviewable: false, evaluateDone: 0, evaluateTotal: 0, selfDone: false },
      '自动:self',
    ],
    [
      '配额未知（上次没查到，通常因请求失败）',
      { ...inWindow, evaluateDone: null, evaluateTotal: null, selfDone: null },
      '空',
    ],
  ];

  for (const [name, patch, expected] of cases) {
    it(`${name} → ${expected}`, () => {
      expect(shape(derivePlan(snapshot([work({ tid: 2, ...patch })]), SETTINGS, NOW))).toBe(
        expected,
      );
    });
  }
});

// ---------- 作业：已提交，互评期已过 ----------

describe('作业（已交、互评期已过）', () => {
  /*
   * 这一组是先前完全漏掉的。过了互评期并不代表没事了：
   * 没评够配额、没做自评，都会影响成绩，而扩展那时什么都没说。
   */
  const past = {
    type: 'homework' as const,
    submitted: true,
    reviewable: true,
    deadline: NOW - 10 * DAY,
    evaluateStart: NOW - 10 * DAY,
    evaluateEnd: NOW - 3 * DAY,
  };

  const cases: Array<[string, Partial<SnapshotWork>, string]> = [
    [
      '没评够（已做不了）',
      { ...past, evaluateDone: 1, evaluateTotal: 5, selfDone: true },
      '人工:review-overdue',
    ],
    [
      '自评没做（已做不了）',
      { ...past, evaluateDone: 5, evaluateTotal: 5, selfDone: false },
      '人工:self-overdue',
    ],
    [
      '没评够且自评没做',
      { ...past, evaluateDone: 0, evaluateTotal: 5, selfDone: false },
      '人工:review-overdue+self-overdue',
    ],
    [
      '都做完了、有分',
      { ...past, evaluateDone: 5, evaluateTotal: 5, selfDone: true, score: 88 },
      '空',
    ],
    [
      '都做完了、还没出分',
      { ...past, evaluateDone: 5, evaluateTotal: 5, selfDone: true },
      '空',
    ],
  ];

  for (const [name, patch, expected] of cases) {
    it(`${name} → ${expected}`, () => {
      expect(shape(derivePlan(snapshot([work({ tid: 2, ...patch })]), SETTINGS, NOW))).toBe(
        expected,
      );
    });
  }
});

// ---------- 考试 ----------

describe('考试', () => {
  it('未参加 → 归用户，不承诺代做', () => {
    const exam = work({ tid: 3, type: 'exam-objective' });
    expect(shape(derivePlan(snapshot([exam]), SETTINGS, NOW))).toBe('人工:exam');
  });

  it('已参加 → 不出现', () => {
    const exam = work({ tid: 3, type: 'exam-objective', submitted: true });
    expect(shape(derivePlan(snapshot([exam]), SETTINGS, NOW))).toBe('空');
  });
});

// ---------- 多项共存 ----------

describe('一份作业同时需要互评与自评', () => {
  const hw = () =>
    work({
      tid: 2,
      type: 'homework',
      submitted: true,
      reviewable: true,
      deadline: NOW - DAY,
      evaluateStart: NOW - DAY,
      evaluateEnd: NOW + 5 * DAY,
      evaluateDone: 0,
      evaluateTotal: 5,
      selfDone: false,
    });

  it('生成两条独立的事项，都排进自动', () => {
    const plan = derivePlan(snapshot([hw()]), SETTINGS, NOW);
    expect(plan.auto.map((a) => a.kind)).toEqual(['self', 'review']);
    expect(plan.manual).toEqual([]);
  });

  it('执行顺序上测验在前、自评居中、互评最后', () => {
    const quiz = work({ tid: 1 });
    const plan = derivePlan(snapshot([hw(), quiz]), SETTINGS, NOW);
    expect(plan.auto.map((a) => a.kind)).toEqual(['quiz', 'self', 'review']);
  });
});

// ---------- 计划的自洽 ----------

describe('计划的自洽', () => {
  it('每一项要么进 auto、要么进 manual，两半互斥；已完成的项两半都不进', () => {
    const snap = snapshot([
      work({ tid: 1 }), // 测验没交 → auto
      work({ tid: 2, type: 'exam-objective' }), // 考试 → manual
      work({ tid: 3, type: 'quiz', submitted: true }), // 已交 → 都不进
      work({ tid: 4, type: 'homework' }), // 作业没交 → manual
    ]);
    const plan = derivePlan(snap, SETTINGS, NOW);

    const autoTids = new Set(
      plan.auto.flatMap((a) => (a.kind === 'courseware' ? [] : [a.work.tid])),
    );
    for (const item of plan.manual) expect(autoTids.has(item.work.tid)).toBe(false);
    expect(plan.auto.map((a) => a.kind)).toEqual(['quiz']);
    expect(plan.manual.map((m) => m.work.tid).sort()).toEqual([2, 4]);
  });
});

// ---------- 课件单元 ----------

function unitOf(overrides: Partial<CourseUnit> = {}): CourseUnit {
  return {
    unitId: 900,
    contentId: 901,
    termId: 1,
    lessonId: 902,
    lessonName: '1.1 课时',
    name: '示例视频',
    contentType: 1,
    durationInSeconds: 500,
    completePercent: 0,
    viewStatus: 0,
    ...overrides,
  };
}

describe('课件单元', () => {
  it('收下未完成且能上报的单元', () => {
    const plan = derivePlan(
      snapshot([], [
        unitOf({ unitId: 1 }),
        unitOf({ unitId: 2, completePercent: 1, viewStatus: 5 }),
        // 未实测的类型不猜
        unitOf({ unitId: 3, contentType: 7 }),
        // 视频没有时长：构不出报文，收下会变成永远做不掉的事项
        unitOf({ unitId: 4, durationInSeconds: null }),
        // 文档只需一个请求，没有时长概念
        unitOf({ unitId: 5, contentType: 3, durationInSeconds: null }),
      ]),
      SETTINGS,
      NOW,
    );

    expect(plan.auto.map((a) => (a.kind === 'courseware' ? a.unit.unitId : a.kind))).toEqual([1, 5]);
    expect(plan.manual).toHaveLength(0);
  });

  it('课件排在最前面：一条请求就完事，先做完最便宜的', () => {
    const works = [work({ tid: 11 })];
    const plan = derivePlan(snapshot(works, [unitOf({ unitId: 1 })]), SETTINGS, NOW);
    expect(plan.auto.map((a) => a.kind)).toEqual(['courseware', 'quiz']);
  });
});

// ---------- 讨论单元：能力由实测决定 ----------

describe('讨论单元：textAvailable 的实测覆盖设置推断', () => {
  const discuss = () =>
    unitOf({ unitId: 10, contentType: UNIT_TYPE.DISCUSS, durationInSeconds: null });
  const aiOn: Settings = {
    ...SETTINGS,
    ai: { enabled: true, model: 'glm-4-flash', apiKey: 'k' },
  };

  it('设置齐（缺省推断）：讨论进自动项', () => {
    expect(shape(derivePlan(snapshot([], [discuss()]), aiOn, NOW))).toBe('自动:courseware');
  });

  it('实测覆写为 false（如权限被撤回）：不进计划——进了必失败，那是浪费一轮', () => {
    expect(shape(derivePlan(snapshot([], [discuss()]), aiOn, NOW, false))).toBe('空');
  });

  it('实测覆写为 true：覆盖设置推断（承载方说可用就是可用）', () => {
    expect(shape(derivePlan(snapshot([], [discuss()]), SETTINGS, NOW, true))).toBe(
      '自动:courseware',
    );
  });
});

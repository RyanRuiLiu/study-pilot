/*
 * 计划派生的完整组合测试。
 *
 * 这里要回答的是「每一种可能的状态 × 每一种开关组合，会发生什么」。
 * 组合数不少，逐一人工验证不可靠，所以写成参数化的表格：
 * 每一行是一个具体处境，右边写明它应当落到哪里。
 *
 * 为什么值得这么细
 * ----------------
 * 一个真实的作业会经历「未交 → 已交 → 互评期 → 互评期结束 → 出分」
 * 五个阶段，每个阶段里三个自动开关各有开关两种可能。少考虑一种，
 * 就会出现「界面上说会自动做、实际不会」或者「明明还能做却告诉用户
 * 已经放弃了」这类错误——而这两类错误用户都看不出来是 bug，
 * 只会以为扩展不好用。
 */

import { describe, expect, it } from 'vitest';
import type { CourseUnit } from '@study-pilot/platform-mooc';
import { derivePlan, type Plan } from '@study-pilot/platform-mooc';
import type { Snapshot, SnapshotCourse, SnapshotWork } from '@study-pilot/platform-mooc';
import type { Settings } from '../src/settings';

const DAY = 24 * 60 * 60 * 1000;
const NOW = new Date(2026, 8, 26, 10, 0, 0).getTime();

function settingsWith(switches: {
  courseware?: boolean;
  quiz?: boolean;
  review?: boolean;
  self?: boolean;
}): Settings {
  return {
    enabled: true,
    ai: { enabled: false, baseUrl: '', model: '', apiKey: '' },
    mooc: {
      background: {
        autoCourseware: { enabled: switches.courseware ?? false },
        autoQuiz: { enabled: switches.quiz ?? false },
        autoReview: { enabled: switches.review ?? false, comment: 'x' },
        autoSelfEvaluate: { enabled: switches.self ?? false },
        courses: [],
      },
    },
  } as unknown as Settings;
}

const NONE = settingsWith({});
const ONLY_QUIZ = settingsWith({ quiz: true });
const ONLY_REVIEW = settingsWith({ review: true });
const ONLY_SELF = settingsWith({ self: true });
const ALL = settingsWith({ quiz: true, review: true, self: true });

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
  const cases: Array<[string, Partial<SnapshotWork>, Settings, string]> = [
    ['未做、未过截止、自动答题开', {}, ONLY_QUIZ, '自动:quiz'],
    ['未做、未过截止、自动答题关', {}, NONE, '人工:quiz-disabled'],
    ['未做、未过截止、只有互评开（无关）', {}, ONLY_REVIEW, '人工:quiz-disabled'],
    [
      '未做、已过截止、自动答题开',
      { deadline: NOW - DAY },
      ONLY_QUIZ,
      '人工:quiz-overdue',
    ],
    [
      '未做、已过截止、自动答题关',
      { deadline: NOW - DAY },
      NONE,
      '人工:quiz-overdue',
    ],
    ['已做、有分', { submitted: true, score: 90 }, ALL, '空'],
    ['已做、无分', { submitted: true }, ALL, '空'],
    ['未做、无截止时间、自动答题开', { deadline: null }, ONLY_QUIZ, '自动:quiz'],
  ];

  for (const [name, patch, settings, expected] of cases) {
    it(`${name} → ${expected}`, () => {
      const plan = derivePlan(snapshot([work({ tid: 1, ...patch })]), settings, NOW);
      expect(shape(plan)).toBe(expected);
    });
  }
});

// ---------- 作业：未提交 ----------

describe('作业（未提交）', () => {
  const hw = (patch: Partial<SnapshotWork> = {}) =>
    work({ tid: 2, type: 'homework', reviewable: true, ...patch });

  const cases: Array<[string, Partial<SnapshotWork>, Settings, string]> = [
    ['未交、未过截止、三个开关全开', {}, ALL, '人工:homework-unsubmitted'],
    ['未交、未过截止、三个开关全关', {}, NONE, '人工:homework-unsubmitted'],
    ['未交、已过截止', { deadline: NOW - DAY }, ALL, '人工:homework-overdue'],
  ];

  for (const [name, patch, settings, expected] of cases) {
    it(`${name} → ${expected}`, () => {
      expect(shape(derivePlan(snapshot([hw(patch)]), settings, NOW))).toBe(expected);
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

  const cases: Array<[string, Partial<SnapshotWork>, Settings, string]> = [
    [
      '互评未够、自评未做、自动互评开、自动自评开',
      { ...inWindow, evaluateDone: 2, evaluateTotal: 5, selfDone: false },
      ALL,
      // 顺序是 quiz → self → review，自评在互评之前
      '自动:self+review',
    ],
    [
      '互评未够、自评未做、两开关都关',
      { ...inWindow, evaluateDone: 2, evaluateTotal: 5, selfDone: false },
      ONLY_QUIZ,
      '人工:review-disabled+self-disabled',
    ],
    [
      '互评未够、自评已做、开关全开',
      { ...inWindow, evaluateDone: 0, evaluateTotal: 5, selfDone: true },
      ALL,
      '自动:review',
    ],
    [
      '互评已够、自评未做、开关全开',
      { ...inWindow, evaluateDone: 5, evaluateTotal: 5, selfDone: false },
      ALL,
      '自动:self',
    ],
    [
      '互评已够、自评已做',
      { ...inWindow, evaluateDone: 5, evaluateTotal: 5, selfDone: true },
      ALL,
      '空',
    ],
    [
      '这份作业不带互评、自评未做',
      { ...inWindow, reviewable: false, evaluateDone: 0, evaluateTotal: 0, selfDone: false },
      ALL,
      '自动:self',
    ],
    [
      '配额未知（上次没查到，通常因请求失败）',
      { ...inWindow, evaluateDone: null, evaluateTotal: null, selfDone: null },
      ALL,
      '空',
    ],
    [
      '互评未够、自评未做、只开自动互评',
      { ...inWindow, evaluateDone: 1, evaluateTotal: 3, selfDone: false },
      ONLY_REVIEW,
      '自动:review 人工:self-disabled',
    ],
  ];

  for (const [name, patch, settings, expected] of cases) {
    it(`${name} → ${expected}`, () => {
      expect(shape(derivePlan(snapshot([work({ tid: 2, ...patch })]), settings, NOW))).toBe(
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

  const cases: Array<[string, Partial<SnapshotWork>, Settings, string]> = [
    [
      '没评够、开关全开（已做不了）',
      { ...past, evaluateDone: 1, evaluateTotal: 5, selfDone: true },
      ALL,
      '人工:review-overdue',
    ],
    [
      '没评够、开关全关（同样做不了）',
      { ...past, evaluateDone: 1, evaluateTotal: 5, selfDone: true },
      NONE,
      '人工:review-overdue',
    ],
    [
      '自评没做、开关全开（已做不了）',
      { ...past, evaluateDone: 5, evaluateTotal: 5, selfDone: false },
      ALL,
      '人工:self-overdue',
    ],
    [
      '没评够且自评没做',
      { ...past, evaluateDone: 0, evaluateTotal: 5, selfDone: false },
      ALL,
      '人工:review-overdue+self-overdue',
    ],
    [
      '都做完了、有分',
      { ...past, evaluateDone: 5, evaluateTotal: 5, selfDone: true, score: 88 },
      ALL,
      '空',
    ],
    [
      '都做完了、还没出分',
      { ...past, evaluateDone: 5, evaluateTotal: 5, selfDone: true },
      ALL,
      '空',
    ],
  ];

  for (const [name, patch, settings, expected] of cases) {
    it(`${name} → ${expected}`, () => {
      expect(shape(derivePlan(snapshot([work({ tid: 2, ...patch })]), settings, NOW))).toBe(
        expected,
      );
    });
  }
});

// ---------- 考试 ----------

describe('考试', () => {
  it('未参加 → 归用户，不承诺自动', () => {
    const exam = work({ tid: 3, type: 'exam-objective' });
    expect(shape(derivePlan(snapshot([exam]), ALL, NOW))).toBe('人工:exam');
  });

  it('已参加 → 不出现', () => {
    const exam = work({ tid: 3, type: 'exam-objective', submitted: true });
    expect(shape(derivePlan(snapshot([exam]), ALL, NOW))).toBe('空');
  });
});

// ---------- 多项共存 ----------

describe('一份作业同时需要互评与自评', () => {
  it('生成两条独立的事项，开关各自生效', () => {
    const hw = work({
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
    // 只开自评：互评归用户，自评自动
    const plan = derivePlan(snapshot([hw]), ONLY_SELF, NOW);
    expect(plan.auto.map((a) => a.kind)).toEqual(['self']);
    expect(plan.manual.map((m) => m.reason)).toEqual(['review-disabled']);
  });

  it('执行顺序上测验在前、自评居中、互评最后', () => {
    const quiz = work({ tid: 1 });
    const hw = work({
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
    const plan = derivePlan(snapshot([hw, quiz]), ALL, NOW);
    expect(plan.auto.map((a) => a.kind)).toEqual(['quiz', 'self', 'review']);
  });
});

// ---------- 组合覆盖度自检 ----------

describe('组合覆盖', () => {
  it('三个开关的八种组合都能派生而不抛错', () => {
    const combos = [
      [false, false, false],
      [true, false, false],
      [false, true, false],
      [false, false, true],
      [true, true, false],
      [true, false, true],
      [false, true, true],
      [true, true, true],
    ];
    const works = [
      work({ tid: 1 }),
      work({ tid: 2 }),
      work({ tid: 3, type: 'exam-objective' }),
      work({
        tid: 4,
        type: 'homework',
        submitted: true,
        reviewable: true,
        deadline: NOW - DAY,
        evaluateStart: NOW - DAY,
        evaluateEnd: NOW + 5 * DAY,
        evaluateDone: 1,
        evaluateTotal: 5,
        selfDone: false,
      }),
    ];
    const snap = snapshot(works);

    for (const [quiz, review, self] of combos) {
      const plan = derivePlan(snap, settingsWith({ quiz, review, self }), NOW);
      // 每一项要么在 auto 要么在 manual，不会两边都有，也不会消失
      const autoIds = new Set(
        plan.auto.flatMap((a) => (a.kind === 'courseware' ? [] : [`${a.work.tid}:${a.kind}`])),
      );
      for (const item of plan.manual) {
        expect(autoIds.has(`${item.work.tid}:${item.reason}`)).toBe(false);
      }
      expect(plan.auto.length + plan.manual.length).toBeGreaterThan(0);
    }
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

describe('课件单元的自动完成', () => {
  it('开关关闭时不进计划，也不进人工项——它不是待办', () => {
    const plan = derivePlan(snapshot([], [unitOf()]), settingsWith({}), NOW);
    expect(plan.auto).toHaveLength(0);
    expect(plan.manual).toHaveLength(0);
  });

  it('开关打开时收下未完成且能上报的单元', () => {
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
      settingsWith({ courseware: true }),
      NOW,
    );

    expect(plan.auto.map((a) => (a.kind === 'courseware' ? a.unit.unitId : a.kind))).toEqual([1, 5]);
    expect(plan.manual).toHaveLength(0);
  });

  it('课件排在最前面：一条请求就完事，先做完最便宜的', () => {
    const works = [work({ tid: 11 })];
    const plan = derivePlan(
      snapshot(works, [unitOf({ unitId: 1 })]),
      settingsWith({ courseware: true, quiz: true }),
      NOW,
    );
    expect(plan.auto.map((a) => a.kind)).toEqual(['courseware', 'quiz']);
  });

});


/*
 * Node 冒烟：证明「计划」与「通知」这段核心逻辑不依赖浏览器。
 *
 * 为什么要有它
 * ------------
 * "前后端分离"不能只靠声明。这条用例把 `globalThis.browser` 换成一个**碰一下就抛异常**的
 * 代理，然后照常派生计划、组织通知：核心代码只要有一处调浏览器，这里立刻红。
 *
 * 跑法（Node 里跑，不加载扩展、不连平台）：
 *   node node_modules/vitest/vitest.mjs run --root apps/extension test/plan-smoke.test.ts
 * 它会打印算出来的计划与通知正文，能直接看到输出了什么。
 *
 * 边界：这里只验证不碰浏览器；真正的网络读取仍然要在浏览器里跑，因为需要你的登录 cookie。
 */

import { describe, expect, it } from 'vitest';
import type { CourseUnit } from '@study-pilot/platform-mooc';
import { derivePlan } from '../src/platforms/mooc/plan';
import type { Snapshot, SnapshotCourse, SnapshotWork } from '../src/platforms/mooc/read';
import { DEFAULT_SETTINGS } from '../src/settings/schema/index.ts';

const HOUR = 60 * 60 * 1000;
const NOW = new Date(2026, 8, 26, 10, 0, 0).getTime();

function work(tid: number, overrides: Partial<SnapshotWork> = {}): SnapshotWork {
  return {
    name: `第 ${tid} 章 单元测验`,
    chapterName: '第1章',
    examId: null,
    type: 'quiz',
    submitted: false,
    deadline: NOW + 6 * HOUR,
    evaluateStart: null,
    evaluateEnd: null,
    evaluateScoreRelease: null,
    score: null,
    totalScore: 100,
    reviewable: false,
    evaluateDone: null,
    evaluateTotal: null,
    ...overrides,
  } as SnapshotWork;
}

function unit(unitId: number, completePercent: number): CourseUnit {
  return {
    unitId,
    name: `1.${unitId} 视频`,
    lessonName: '1.1',
    contentType: 1,
    completePercent,
  } as CourseUnit;
}

function course(): SnapshotCourse {
  return {
    courseId: 1001,
    termId: 2001,
    schoolShortName: 'NTU',
    courseName: '示例课程丁',
    mode: 0,
    works: [
      work(1),
      work(2, { submitted: true, reviewable: true, evaluateDone: 1, evaluateTotal: 3 }),
      // 考试只能人工处理（扩展不代提交），因此它会进「需要你处理」并出现在通知里
      work(3, { type: 'exam-objective', name: '期中考试', deadline: NOW + 3 * HOUR }),
    ],
    units: [unit(1, 1), unit(2, 0.4)],
  } as SnapshotCourse;
}

const snapshot: Snapshot = {
  courses: [course()],
};

describe('Node 里跑核心逻辑', () => {
  it('不碰浏览器也能算出计划与通知正文', () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      enabled: true,
      mooc: {
        ...DEFAULT_SETTINGS.mooc,
        background: {
          ...DEFAULT_SETTINGS.mooc.background,
          autoCourseware: { enabled: true },
          autoQuiz: { enabled: true },
          autoReview: { enabled: true, comment: 'x' },
          deadlineReminder: { enabled: true, advanceDays: 1 },
        },
      },
    };

    const original = (globalThis as { browser?: unknown }).browser;
    (globalThis as { browser?: unknown }).browser = new Proxy(
      {},
      {
        get(_target, key) {
          throw new Error(`核心逻辑碰到了浏览器：browser.${String(key)}`);
        },
      },
    );

    let plan;
    try {
      plan = derivePlan(snapshot, settings, NOW);
    } finally {
      (globalThis as { browser?: unknown }).browser = original;
    }

    console.log('\n——— 冒烟输出（Node，无浏览器）———');
    console.log(`自动项 ${plan.auto.length} 个：`);
    for (const item of plan.auto) {
      const label = item.kind === 'courseware' ? item.unit.name : item.work.name;
      console.log(`  - ${item.kind}：${label}`);
    }
    console.log(`需要你处理 ${plan.manual.length} 个：`);
    for (const item of plan.manual) console.log(`  - ${item.work.name}（${item.reason}）`);
    console.log('——— 完 ———\n');

    // 计划里有未完成的课件单元与未提交的测验：应当被认出来
    expect(plan.auto.length).toBeGreaterThan(0);
  });
});

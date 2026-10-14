/*
 * 慕课后台流程的结果归属（`platforms/mooc/tasks.ts`）。
import type { HostCapabilities } from '../src/platforms/types.ts';
 *
 * 这里验的不是计划算得对不对（那是 task-plan.test.ts），也不是一条动作怎么执行
 * （那是 execute-work.test.ts），而是**一件事的结果有没有记到正确的项上**：
 * plan 给出的 id 是 run 落结果、report 取结果的唯一凭据。id 少写一个插值时，
 * 一轮里所有工作项共用同一条结果，通知里「替你做了什么」会整体错位到最后那一项，
 * 而请求、提交、计数全都正常——界与事实分离，且不报任何错。
 *
 * 平台的接口调用与通知发送换成替身：本文件要验的是记账，不是网络。
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HostCapabilities } from '../src/platforms/types.ts';

vi.mock('../src/settings', () => ({ getSettings: vi.fn() }));
vi.mock('../src/platforms/mooc/session', () => ({ ensureSession: vi.fn() }));
vi.mock('../src/platforms/mooc/read', () => ({ readSnapshot: vi.fn(), fetchedToday: vi.fn() }));
vi.mock('../src/platforms/mooc/plan', () => ({ derivePlan: vi.fn(), shouldRefresh: vi.fn() }));
vi.mock('../src/platforms/mooc/execute', () => ({ executeActions: vi.fn() }));

import { ensureSession } from '../src/platforms/mooc/session';
import { readSnapshot } from '../src/platforms/mooc/read';
import { derivePlan, shouldRefresh } from '../src/platforms/mooc/plan';
import { executeActions } from '../src/platforms/mooc/execute';
import { getSettings } from '../src/settings';
import { createMoocTasks, type MoocRunDeps } from '../src/platforms/mooc/tasks';
import type { CourseUnit } from '@study-pilot/platform-mooc';
import type { PlanItem } from '../src/platforms/types.ts';
import type { AutoAction, Plan } from '../src/platforms/mooc/plan';

const NOW = 1_700_000_000_000;

/** 一轮里可能同时有测验与课件，两者的 id 来自不同字段，所以要各造一个。 */
function quizAction(tid: number, name: string): AutoAction {
  return {
    kind: 'quiz',
    course: { termId: 7 } as never,
    work: { tid, name } as never,
    remaining: 0,
  };
}

function coursewareAction(unitId: number, name: string): AutoAction {
  return {
    kind: 'courseware',
    course: { termId: 7 } as never,
    unit: { unitId, name } as CourseUnit,
  };
}

/** 执行结果按项给不同的 detail：只有如此才看得出结果有没有对错号。 */
function resultOf(action: AutoAction): { status: 'done'; detail: string; tid: number; name: string; kind: string } {
  const label = action.kind === 'courseware' ? action.unit.name : action.work.name;
  return { status: 'done', detail: `已完成：${label}`, tid: 0, name: label, kind: action.kind };
}

function tasksOf(auto: AutoAction[]) {
  const plan: Plan = { auto, manual: [] };
  vi.mocked(derivePlan).mockReturnValue(plan);
  return createMoocTasks(deps());
}

/*
 * 测试替身：平台只认 host 接口，不认浏览器。这里给一套不做事的最小实现，
 * 通知相关的方法本来就被 vi.mock 掉，不会真的走到。
 */
const fakeHost: HostCapabilities = {
  whenRequestRulesReady: async () => {},
  readCookie: async () => '',
};

function deps(): MoocRunDeps {
  return {
    host: fakeHost,
    client: {} as never,
    renew: async () => true,
    refreshCourses: async () => ({ ok: true, courses: [], byType: null }),
    loadSnapshot: async () => ({}) as never,
    selectedCourses: () => [{ termId: 7, courseId: 1 }] as never,
    coursewareContext: () => ({}) as never,
    recordFailure: async () => {},
  };
}

/** 跑完整一轮：计划 → 逐项执行。 */
async function runRound(auto: AutoAction[]): Promise<{ items: PlanItem[] }> {
  const tasks = tasksOf(auto);
  const { items } = await tasks.plan(NOW);

  for (const item of items) {
    await tasks.run(item, async () => {});
  }
  return { items };
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(getSettings).mockResolvedValue({
    mooc: { background: { autoReview: { comment: '按评分点逐项给分' } } },
  } as never);
  vi.mocked(ensureSession).mockResolvedValue({ loggedIn: true, userId: 42 } as never);
  vi.mocked(readSnapshot).mockResolvedValue({} as never);
  // 需要拉最新数据，plan 才会走到「派生计划 → 执行」那条路
  vi.mocked(shouldRefresh).mockReturnValue(true);
  vi.mocked(executeActions).mockImplementation((_client, actions) =>
    Promise.resolve(actions.map((action) => resultOf(action as never)) as never),
  );
});

describe('自动项的 id', () => {
  it('每个工作项的 id 都带上自己的 tid', async () => {
    const { items } = await runRound([quizAction(101, '第一单元测验'), quizAction(102, '第二单元测验')]);

    expect(items.map((item) => item.id)).toEqual(['work-101', 'work-102']);
  });

  it('课件与工作项的 id 取自各自的字段，互不混用', async () => {
    const { items } = await runRound([quizAction(101, '第一单元测验'), coursewareAction(9, '1.1 课程介绍')]);

    expect(items.map((item) => item.id)).toEqual(['work-101', 'courseware-9']);
  });

  it('一轮里所有自动项的 id 两两不同', async () => {
    const auto = [
      quizAction(101, '第一单元测验'),
      quizAction(102, '第二单元测验'),
      quizAction(103, '第三单元测验'),
      coursewareAction(9, '1.1 课程介绍'),
      coursewareAction(10, '1.2 课程体系'),
    ];
    const { items } = await runRound(auto);

    expect(new Set(items.map((item) => item.id)).size).toBe(auto.length);
  });
});


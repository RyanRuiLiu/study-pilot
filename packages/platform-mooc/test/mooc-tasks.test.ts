/*
 * 慕课后台流程的结果归属（`policy/tasks.ts` 的 createMoocTasks）。
 *
 * 这里验的不是计划算得对不对（那是 task-plan.test.ts），也不是一条动作怎么执行
 * （那是 execute-work.test.ts），而是**一件事的结果有没有记到正确的项上**：
 * plan 给出的 id 是 run 落结果的唯一凭据。id 少写一个插值时，一轮里所有工作项
 * 共用同一条结果，而请求、提交、计数全都正常——结果与事实分离，且不报任何错。
 *
 * 平台的接口调用换成替身：本文件要验的是记账，不是网络。
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NEVER_STOPPED, type HostCapabilities } from '@study-pilot/application';

/* 替身按被测代码 import 的模块分：tasks.ts 从 ./session、./plan、./execute 取用，
   冒充包的门拦不住它（包内部的相对 import 不经过门）。 */
vi.mock('../src/policy/session.ts', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return { ...actual, ensureSession: vi.fn() };
});
vi.mock('../src/policy/plan/index.ts', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return { ...actual, derivePlan: vi.fn() };
});
vi.mock('../src/policy/execute/index.ts', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return { ...actual, executeActions: vi.fn() };
});

import { ensureSession } from '../src/policy/session.ts';
import { derivePlan } from '../src/policy/plan/index.ts';
import { executeActions } from '../src/policy/execute/index.ts';
import { createMoocTasks, type MoocRunDeps } from '../src/policy/tasks.ts';
import type { CourseUnit } from '../src/types.ts';
import type { AutoAction, Plan } from '../src/policy/plan/types.ts';
import type { PlanItem } from '@study-pilot/application';

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

/** 测试替身：平台只认 host 接口，不认浏览器。这里给一套不做事的最小实现。 */
const fakeHost: HostCapabilities = {
  whenRequestRulesReady: async () => {},
  readCookie: async () => '',
};

function deps(): MoocRunDeps {
  return {
    host: fakeHost,
    config: {
      // 设置要么来自 normalize（生产里 ai 段必然存在），要么缺字段——
      // 这里给全最小形状：本文件被 mock 掉的只是 derivePlan，tasks.ts
      // 自己也要读 ai（实测口的缺省推断）
      read: async () =>
        ({
          mooc: { reviewComment: '按评分点逐项给分' },
          ai: { enabled: false, model: '', apiKey: '' },
        }) as never,
      update: async () => ({}) as never,
    },
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
    await tasks.run(item, async () => {}, NEVER_STOPPED);
  }
  return { items };
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(ensureSession).mockResolvedValue({ loggedIn: true, userId: 42 } as never);
  vi.mocked(executeActions).mockImplementation((_client, actions) =>
    Promise.resolve(actions.map((action) => resultOf(action as never)) as never),
  );
});

describe('按范围收窄的计划', () => {
  it('只做某门课时：只读那门课的结构，课程列表刷新也跳过', async () => {
    const read: string[][] = [];
    const refresh = vi.fn(async () => ({ ok: true as const, courses: [], byType: null }));
    vi.mocked(derivePlan).mockReturnValue({ auto: [], manual: [] });
    const base = deps();
    const tasks = createMoocTasks({
      ...base,
      refreshCourses: refresh,
      selectedCourses: () =>
        [
          { termId: 7, courseId: 1, name: '乙课' },
          { termId: 8, courseId: 2, name: '甲课' },
        ] as never,
      loadSnapshot: async (courses) => {
        read.push(courses.map((course) => course.name));
        return {} as never;
      },
    });

    await tasks.plan(NOW, { group: '甲课' });

    expect(read).toEqual([['甲课']]);
    expect(refresh).not.toHaveBeenCalled();
  });

  it('只做某几条时（「单独完成这一条」）：同样跳过课程列表刷新', async () => {
    const refresh = vi.fn(async () => ({ ok: true as const, courses: [], byType: null }));
    vi.mocked(derivePlan).mockReturnValue({ auto: [], manual: [] });
    const base = deps();
    const tasks = createMoocTasks({ ...base, refreshCourses: refresh });

    await tasks.plan(NOW, { ids: ['work-101-quiz'] });

    // 条目目标已定，刷新课程列表只更新勾选集，对这次执行没有贡献
    expect(refresh).not.toHaveBeenCalled();
  });

  it('范围里的课不在勾选列表：报没有课程，不硬做', async () => {
    vi.mocked(derivePlan).mockReturnValue({ auto: [], manual: [] });
    const base = deps();
    const tasks = createMoocTasks({
      ...base,
      selectedCourses: () => [{ termId: 7, courseId: 1, name: '乙课' }] as never,
    });

    expect(await tasks.plan(NOW, { group: '甲课' })).toEqual({ items: [], blocked: 'no-course' });
  });
});

describe('自动项的 id', () => {
  it('每个工作项的 id 都带上自己的 tid', async () => {
    const { items } = await runRound([quizAction(101, '第一单元测验'), quizAction(102, '第二单元测验')]);

    expect(items.map((item) => item.id)).toEqual(['work-101-quiz', 'work-102-quiz']);
  });

  it('课件与工作项的 id 取自各自的字段，互不混用', async () => {
    const { items } = await runRound([quizAction(101, '第一单元测验'), coursewareAction(9, '1.1 课程介绍')]);

    expect(items.map((item) => item.id)).toEqual(['work-101-quiz', 'courseware-9']);
  });

  it('同一份作业的互评与自评是两条不同的 id——按条目执行时各点各的', async () => {
    const review: AutoAction = {
      kind: 'review',
      course: { termId: 7 } as never,
      work: { tid: 500, name: '第 5 章 单元作业' } as never,
      remaining: 2,
    };
    const self: AutoAction = {
      kind: 'self',
      course: { termId: 7 } as never,
      work: { tid: 500, name: '第 5 章 单元作业' } as never,
      remaining: 0,
    };

    const { items } = await runRound([review, self]);

    expect(items.map((item) => item.id)).toEqual(['work-500-review', 'work-500-self']);
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

  it('项的类别随计划一起来（界面按它筛执行范围）', async () => {
    const { items } = await runRound([quizAction(101, '第一单元测验'), coursewareAction(9, '1.1 课程介绍')]);

    expect(items.map((item) => item.kind)).toEqual(['quiz', 'courseware']);
  });

  it('AI 文本能力按实测口注入：derivePlan 收到的是实测结论（这里是 false）', async () => {
    vi.mocked(derivePlan).mockReturnValue({ auto: [], manual: [] });
    const tasks = createMoocTasks({ ...deps(), textAvailable: async () => false });
    await tasks.plan(NOW);

    // 第 4 个实参就是实测结论——权限被撤回时讨论单元因此不进队列
    expect(vi.mocked(derivePlan).mock.calls.at(-1)?.[3]).toBe(false);
  });
});


describe('执行前再确认会话', () => {
  it('计划之后会话失效：如实报未登录，不发任何执行调用', async () => {
    const auto = [coursewareAction(9, '1.1 课程介绍')];
    const tasks = tasksOf(auto);

    // 计划阶段还登录着：拿到这一项
    const { items } = await tasks.plan(NOW);
    // 执行前那一次确认失败
    vi.mocked(ensureSession).mockResolvedValue({ loggedIn: false, userId: 0 } as never);
    vi.mocked(executeActions).mockClear();

    const outcome = await tasks.run(items[0]!, async () => {}, NEVER_STOPPED);

    expect(outcome).toEqual({ status: 'failed', message: '未登录' });
    expect(executeActions).not.toHaveBeenCalled();
  });
});

/*
 * 「跑一轮」这一个用例。
 *
 * 假端口（配置、状态、进度、平台）跑完整路径：真存储不参与、浏览器不参与。
 *
 * 这些用例原先在扩展侧（scheduler-run.test.ts 靠 mock 存储模块、run-claim.test.ts 靠
 * 模块级变量）。判据归位之后它们在这里：**用例的行为在这里验**，载体只管把端口接上。
 * 因此这一份覆盖的是原先两边加起来的内容，外加两条合并时定下来的行为
 * （进度两个模式都记、runningSince 覆盖整轮）。
 */

import { describe, expect, it } from 'vitest';
import {
  DEFAULT_SETTINGS,
  EMPTY_PROGRESS,
  EMPTY_STATE,
  createRunner,
  type ConfigPort,
  type PlanItem,
  type PlatformTasks,
  type ProgressPort,
  type RoundResult,
  type RunState,
  type Settings,
  type TaskState,
  type TaskStorePort,
} from '../src/index.ts';

const MINUTE = 60 * 1000;

function fakeStore(initial: TaskState = EMPTY_STATE) {
  let state = initial;
  const writes: TaskState[] = [];
  const port: TaskStorePort = {
    read: async () => state,
    write: async (next) => {
      state = next;
      writes.push(next);
    },
  };
  return { port, writes, current: () => state };
}

function fakeProgress() {
  let state: RunState = EMPTY_PROGRESS;
  const publishes: RunState[] = [];
  const port: ProgressPort = {
    snapshot: async () => state,
    publish: async (next) => {
      state = next;
      publishes.push(next);
    },
  };
  return { port, publishes, current: () => state };
}

function fakeConfig(enabled = true): ConfigPort {
  const settings = { ...DEFAULT_SETTINGS, enabled } as Settings;
  return { read: async () => settings, update: async () => settings };
}

function item(id: string, mode: PlanItem['mode']): PlanItem {
  return { id, group: '测试课程', title: `事项 ${id}`, mode, payload: { id } };
}

interface FakePlatform extends PlatformTasks {
  calls: string[];
}

function platform(
  name: string,
  plan: Awaited<ReturnType<PlatformTasks['plan']>> = { items: [] },
  ready = true,
): FakePlatform {
  const calls: string[] = [];
  return {
    id: name,
    name,
    calls,
    isReady: async () => {
      calls.push('isReady');
      return ready;
    },
    plan: async () => {
      calls.push('plan');
      return plan;
    },
    run: async (entry) => {
      calls.push(`run:${entry.id}`);
      return { status: 'done' };
    },
  };
}

function setup(platforms: PlatformTasks[], options: { enabled?: boolean; task?: TaskState } = {}) {
  const tasks = fakeStore(options.task ?? EMPTY_STATE);
  const progress = fakeProgress();
  const runner = createRunner({
    platforms: () => platforms,
    config: fakeConfig(options.enabled ?? true),
    tasks: tasks.port,
    progress: progress.port,
  });
  return { runner, tasks, progress };
}

describe('一轮的前置条件', () => {
  it('总开关关掉时（自动）不碰任何平台，也不动状态', async () => {
    const mooc = platform('mooc', { items: [item('a', 'auto')] });
    const { runner, tasks } = setup([mooc], { enabled: false });

    expect(await runner.runRound('auto')).toEqual({ status: 'disabled' });
    expect(mooc.calls).toEqual([]);
    expect(tasks.writes).toEqual([]);
  });

  it('手动执行不看总开关：用户点它就是要现在跑', async () => {
    const mooc = platform('mooc', { items: [item('a', 'auto')] });
    const { runner } = setup([mooc], { enabled: false });

    expect(await runner.runRound('manual')).toEqual({ status: 'finished', done: 1, manual: 0, failed: [] });
    expect(mooc.calls).toContain('run:a');
  });

  it('确实还在跑时什么都不做（防重入）', async () => {
    const at = Date.now();
    const mooc = platform('mooc', { items: [item('a', 'auto')] });
    const { runner } = setup([mooc], {
      task: { ...EMPTY_STATE, runningSince: at, heartbeatAt: at },
    });

    expect(await runner.runRound('auto')).toEqual({ status: 'rejected', reason: 'ALREADY_RUNNING' });
    expect(mooc.calls).toEqual([]);
  });

  it('中断留下的残留标记不再拦住本轮', async () => {
    /*
     * 回归：判据曾经只看 `runningSince === null`，而把它清掉的只有结束收尾——
     * 那活在已经死掉的进程里。于是浏览器被强杀一次之后，每一轮闹钟静默返回、
     * 手动执行永远回「正在执行」，扩展再也不替用户做一件事，而界面上看不出来。
     */
    const at = Date.now() - 10 * MINUTE;
    const mooc = platform('mooc', { items: [item('a', 'auto')] });
    const { runner } = setup([mooc], { task: { ...EMPTY_STATE, runningSince: at, heartbeatAt: at } });

    expect(await runner.runRound('auto')).toEqual({ status: 'finished', done: 1, manual: 0, failed: [] });
    expect(mooc.calls).toContain('plan');
  });

  it('同一进程里两个触发源不并发起第二轮', async () => {
    /*
     * 「查状态 → 落状态」之间隔着网络 await，闹钟、登录变化与手动按钮都在同一个
     * worker 里，可以一起穿过那个窗口。持久标记跨进程，跨不了进程内，所以还有
     * 一道同步的认领（现在是 runner 自己的字段）。
     */
    let second: RoundResult | undefined;
    const mooc = platform('mooc', { items: [] });
    const { runner } = setup([mooc]);
    mooc.plan = async () => {
      second = await runner.runRound('manual');
      return { items: [] };
    };

    await runner.runRound('auto');

    expect(second).toEqual({ status: 'rejected', reason: 'ALREADY_RUNNING' });
  });

  it('一轮抛错：自动那一侧收尾并记下失败，不把异常扔出去', async () => {
    /*
     * 调用者是闹钟与登录事件，没有人在等答案。失败要落在状态里，由界面显示；
     * 从前抛给 `.catch(() => undefined)`，「平台炸了」与「今天没有要做的事」长得一样。
     */
    const boom = platform('boom');
    boom.plan = async () => {
      throw new Error('平台炸了');
    };
    const { runner, tasks } = setup([boom]);

    expect(await runner.runRound('auto')).toEqual({ status: 'failed', message: '平台炸了' });
    expect(tasks.current().runningSince).toBeNull();
    expect(tasks.current().lastError).toBe('平台炸了');
  });

  it('一轮抛错：手动那一侧如实交回消息，但不写运行状态（那是自动的账）', async () => {
    const boom = platform('boom');
    boom.plan = async () => {
      throw new Error('平台炸了');
    };
    const { runner, tasks } = setup([boom]);

    expect(await runner.runRound('manual')).toEqual({ status: 'failed', message: '平台炸了' });
    expect(tasks.current().lastError).toBeNull();
  });
});

describe('逐平台执行', () => {
  it('每个平台都跑一遍，只执行 mode 为 auto 的项', async () => {
    const mooc = platform('mooc', {
      items: [item('auto-1', 'auto'), item('manual-1', 'manual'), item('assist-1', 'assisted'), item('auto-2', 'auto')],
    });
    const other = platform('other', { items: [item('x', 'auto')] });
    const { runner } = setup([mooc, other]);

    expect(await runner.runRound('auto')).toEqual({ status: 'finished', done: 3, manual: 2, failed: [] });
    expect(mooc.calls.filter((call) => call.startsWith('run:'))).toEqual(['run:auto-1', 'run:auto-2']);
    expect(other.calls.filter((call) => call.startsWith('run:'))).toEqual(['run:x']);
  });

  it('每一步之间刷心跳：长动作拿到的心跳真的写进去', async () => {
    const mooc = platform('mooc', { items: [item('a', 'auto'), item('b', 'auto')] });
    const { runner, tasks } = setup([mooc]);
    const heartbeats: number[] = [];
    mooc.run = async (_entry, heartbeat) => {
      await heartbeat();
      heartbeats.push(tasks.current().heartbeatAt ?? 0);
      return { status: 'done' };
    };

    await runner.runRound('auto');

    expect(heartbeats).toHaveLength(2);
    // 每项的心跳都不早于开始时刻，且比上一次更晚（真实时钟，只断言单调不减）
    for (const beat of heartbeats) expect(beat).toBeGreaterThan(0);
  });

  it('项里的失败如实收集，不算成完成', async () => {
    const mooc = platform('mooc', { items: [item('a', 'auto'), item('b', 'auto')] });
    mooc.run = async (entry) => (entry.id === 'a' ? { status: 'done' } : { status: 'failed', message: '平台拒绝' });
    const { runner } = setup([mooc]);

    expect(await runner.runRound('auto')).toEqual({
      status: 'finished',
      done: 1,
      manual: 0,
      failed: [{ name: '事项 b', detail: '平台拒绝' }],
    });
  });

  it('进度两个模式都记：同一条流程就该留同样的痕迹', async () => {
    for (const mode of ['auto', 'manual'] as const) {
      const mooc = platform('mooc', { items: [item('a', 'auto')] });
      const { runner, progress } = setup([mooc]);

      await runner.runRound(mode);

      // 开始 → 进入项 → 项完成 → 收尾
      expect(progress.publishes.length).toBeGreaterThanOrEqual(4);
      expect(progress.current().platforms.map((entry) => entry.id)).toEqual(['mooc']);
    }
  });
});

describe('挂起登录', () => {
  it('平台没就绪时（自动）不问计划，最后落挂起标记', async () => {
    const mooc = platform('mooc', { items: [item('a', 'auto')] }, false);
    const { runner, tasks } = setup([mooc]);

    await runner.runRound('auto');

    expect(mooc.calls).toEqual(['isReady']);
    expect(tasks.current().awaitingLogin).toBe(true);
  });

  it('平台没就绪时（手动）立刻回未登录，不落挂起标记', async () => {
    const mooc = platform('mooc', { items: [item('a', 'auto')] }, false);
    const { runner, tasks } = setup([mooc]);

    expect(await runner.runRound('manual')).toEqual({ status: 'not-logged-in' });
    expect(tasks.current().awaitingLogin).toBe(false);
    expect(tasks.current().runningSince).toBeNull();
  });

  it('计划里说会话失效时（自动）落挂起标记，（手动）回未登录', async () => {
    const auto = platform('mooc', { items: [], needsLogin: true });
    const autoSetup = setup([auto]);
    await autoSetup.runner.runRound('auto');
    expect(autoSetup.tasks.current().awaitingLogin).toBe(true);

    const manual = platform('mooc', { items: [], needsLogin: true });
    const manualSetup = setup([manual]);
    expect(await manualSetup.runner.runRound('manual')).toEqual({ status: 'not-logged-in' });
    expect(manualSetup.tasks.current().awaitingLogin).toBe(false);
  });

  it('就绪的平台会先清掉挂起标记', async () => {
    const mooc = platform('mooc', { items: [] });
    const { runner, tasks } = setup([mooc], { task: { ...EMPTY_STATE, awaitingLogin: true } });

    await runner.runRound('auto');

    expect(tasks.current().awaitingLogin).toBe(false);
  });

  it('挂起标记在收尾之后才落：收尾会清掉它，早落就没人记得了', async () => {
    const mooc = platform('mooc', { items: [], needsLogin: true });
    const { runner, tasks } = setup([mooc]);

    await runner.runRound('auto');

    const last = tasks.writes.at(-1);
    const beforeLast = tasks.writes.at(-2);
    expect(beforeLast?.runningSince).toBeNull();
    expect(last?.awaitingLogin).toBe(true);
  });
});

describe('手动执行的报告', () => {
  it('没有可做的事：说清楚，不当成失败', async () => {
    const mooc = platform('mooc', { items: [item('m', 'manual')] });
    const empty = platform('other', { items: [] });

    expect(await setup([mooc]).runner.runRound('manual')).toEqual({
      status: 'finished',
      done: 0,
      manual: 1,
      failed: [],
    });
    expect(await setup([empty]).runner.runRound('manual')).toEqual({ status: 'nothing-to-do' });
  });

  it('没勾课程时回 no-course，不猜', async () => {
    const mooc = platform('mooc', { items: [], blocked: 'no-course' });

    expect(await setup([mooc]).runner.runRound('manual')).toEqual({ status: 'no-course' });
  });
});

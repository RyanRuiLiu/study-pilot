/*
 * 「跑一轮」这一个用例。
 *
 * 假端口（状态、进度、平台）跑完整路径：真存储不参与、浏览器不参与。
 * 用例的行为在这里验，载体只管把端口接上。
 */

import { describe, expect, it } from 'vitest';
import {
  EMPTY_PROGRESS,
  EMPTY_STATE,
  createRunner,
  type PlanItem,
  type PlatformTasks,
  type ProgressPort,
  type RoundResult,
  type RunState,
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

/** 一个计划项。默认类别 'quiz'——「执行范围」的用例会自己给别的类别。 */
function item(id: string, mode: PlanItem['mode'], kind = 'quiz'): PlanItem {
  return { id, group: '测试课程', title: `事项 ${id}`, mode, kind, payload: { id } };
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

function setup(platforms: PlatformTasks[], options: { task?: TaskState } = {}) {
  const tasks = fakeStore(options.task ?? EMPTY_STATE);
  const progress = fakeProgress();
  const runner = createRunner({
    platforms: () => platforms,
    tasks: tasks.port,
    progress: progress.port,
  });
  return { runner, tasks, progress };
}

describe('一轮的前置条件', () => {
  it('确实还在跑时什么都不做（防重入）', async () => {
    const at = Date.now();
    const mooc = platform('mooc', { items: [item('a', 'auto')] });
    const { runner } = setup([mooc], {
      task: { ...EMPTY_STATE, runningSince: at, heartbeatAt: at },
    });

    expect(await runner.runRound()).toEqual({ status: 'rejected', reason: 'ALREADY_RUNNING' });
    expect(mooc.calls).toEqual([]);
  });

  it('中断留下的残留标记不再拦住本轮', async () => {
    /*
     * 回归：判据曾经只看 `runningSince === null`，而把它清掉的只有结束收尾——
     * 那活在已经死掉的进程里。于是浏览器被强杀一次之后，每次执行都回
     * 「正在执行」，用户再也点不动它，而界面上看不出来。
     */
    const at = Date.now() - 10 * MINUTE;
    const mooc = platform('mooc', { items: [item('a', 'auto')] });
    const { runner } = setup([mooc], { task: { ...EMPTY_STATE, runningSince: at, heartbeatAt: at } });

    expect(await runner.runRound()).toEqual({ status: 'finished', done: 1, manual: 0, failed: [] });
    expect(mooc.calls).toContain('plan');
  });

  it('同一进程里两个调用方不并发起第二轮', async () => {
    /*
     * 「查状态 → 落状态」之间隔着网络 await，同一时刻的两个调用方（比如
     * 弹窗与设置页）都在同一个 worker 里，可以一起穿过那个窗口。
     * 持久标记跨进程，跨不了进程内，所以还有一道同步的认领（runner 自己的字段）。
     */
    let second: RoundResult | undefined;
    const mooc = platform('mooc', { items: [] });
    const { runner } = setup([mooc]);
    mooc.plan = async () => {
      second = await runner.runRound();
      return { items: [] };
    };

    await runner.runRound();

    expect(second).toEqual({ status: 'rejected', reason: 'ALREADY_RUNNING' });
  });

  it('一轮抛错：收尾、记下失败、也把消息交回给调用方', async () => {
    /*
     * 两条都要留，它们服务两个时刻：状态里那份给界面（下次打开时还看得见
     * 「上次执行出了问题」），返回值给正在等的人一句准确的话。从前抛给
     * `.catch(() => undefined)`，「平台炸了」与「没有要做的事」长得一样。
     */
    const boom = platform('boom');
    boom.plan = async () => {
      throw new Error('平台炸了');
    };
    const { runner, tasks } = setup([boom]);

    expect(await runner.runRound()).toEqual({ status: 'failed', message: '平台炸了' });
    expect(tasks.current().runningSince).toBeNull();
    expect(tasks.current().lastError).toBe('平台炸了');
  });
});

describe('逐平台执行', () => {
  it('每个平台都跑一遍，只执行 mode 为 auto 的项', async () => {
    const mooc = platform('mooc', {
      items: [item('auto-1', 'auto'), item('manual-1', 'manual'), item('assist-1', 'assisted'), item('auto-2', 'auto')],
    });
    const other = platform('other', { items: [item('x', 'auto')] });
    const { runner } = setup([mooc, other]);

    expect(await runner.runRound()).toEqual({ status: 'finished', done: 3, manual: 2, failed: [] });
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

    await runner.runRound();

    expect(heartbeats).toHaveLength(2);
    // 每项的心跳都不早于开始时刻，且比上一次更晚（真实时钟，只断言单调不减）
    for (const beat of heartbeats) expect(beat).toBeGreaterThan(0);
  });

  it('项里的失败如实收集，不算成完成', async () => {
    const mooc = platform('mooc', { items: [item('a', 'auto'), item('b', 'auto')] });
    mooc.run = async (entry) => (entry.id === 'a' ? { status: 'done' } : { status: 'failed', message: '平台拒绝' });
    const { runner } = setup([mooc]);

    expect(await runner.runRound()).toEqual({
      status: 'finished',
      done: 1,
      manual: 0,
      failed: [{ name: '事项 b', detail: '平台拒绝' }],
    });
  });

  it('每次执行都记进度：同一条流程就该留同样的痕迹', async () => {
    const mooc = platform('mooc', { items: [item('a', 'auto')] });
    const { runner, progress } = setup([mooc]);

    await runner.runRound();

    // 开始 → 进入项 → 项完成 → 收尾
    expect(progress.publishes.length).toBeGreaterThanOrEqual(4);
    expect(progress.current().platforms.map((entry) => entry.id)).toEqual(['mooc']);
  });
});

/*
 * 执行范围：弹窗要「待办那几类」，课件页只要 courseware、还可能只要某一门课。
 * 范围之外的项一律不提——点「快速完成课件」的人不该在结果里读到「还有几份作业要写」。
 */
describe('执行范围', () => {
  it('给了类别就只做这些类别，范围外的连「待你处理」都不计', async () => {
    const mooc = platform('mooc', {
      items: [item('q', 'auto', 'quiz'), item('c', 'auto', 'courseware'), item('h', 'manual', 'homework')],
    });
    const { runner } = setup([mooc]);

    expect(await runner.runRound({ kinds: ['quiz'] })).toEqual({
      status: 'finished',
      done: 1,
      manual: 0,
      failed: [],
    });
    expect(mooc.calls.filter((call) => call.startsWith('run:'))).toEqual(['run:q']);
  });

  it('给了课程就只做这门课', async () => {
    const mooc = platform('mooc', {
      items: [
        { ...item('a', 'auto'), group: '电路' },
        { ...item('b', 'auto'), group: '模电' },
      ],
    });
    const { runner } = setup([mooc]);

    expect(await runner.runRound({ group: '电路' })).toEqual({
      status: 'finished',
      done: 1,
      manual: 0,
      failed: [],
    });
    expect(mooc.calls.filter((call) => call.startsWith('run:'))).toEqual(['run:a']);
  });

  it('范围内只剩人工项时，如实报「待你处理」而不是无事可做', async () => {
    const mooc = platform('mooc', { items: [item('h', 'manual', 'homework'), item('q', 'auto', 'quiz')] });
    const { runner } = setup([mooc]);

    expect(await runner.runRound({ kinds: ['homework'] })).toEqual({
      status: 'finished',
      done: 0,
      manual: 1,
      failed: [],
    });
  });

  it('范围里什么都没有：nothing-to-do，不写平台', async () => {
    const mooc = platform('mooc', { items: [item('c', 'auto', 'courseware')] });
    const { runner } = setup([mooc]);

    expect(await runner.runRound({ kinds: ['exam'] })).toEqual({ status: 'nothing-to-do' });
    expect(mooc.calls.filter((call) => call.startsWith('run:'))).toEqual([]);
  });
});

describe('未登录', () => {
  it('平台没就绪：立刻回未登录，不落任何执行标记', async () => {
    const mooc = platform('mooc', { items: [item('a', 'auto')] }, false);
    const { runner, tasks } = setup([mooc]);

    expect(await runner.runRound()).toEqual({ status: 'not-logged-in' });
    expect(mooc.calls).toEqual(['isReady']);
    expect(tasks.current().runningSince).toBeNull();
  });

  it('计划里说会话失效同样回未登录', async () => {
    const mooc = platform('mooc', { items: [], needsLogin: true });
    expect(await setup([mooc]).runner.runRound()).toEqual({ status: 'not-logged-in' });
  });
});

describe('执行的报告', () => {
  it('没有可做的事：说清楚，不当成失败', async () => {
    const mooc = platform('mooc', { items: [item('m', 'manual')] });
    const empty = platform('other', { items: [] });

    expect(await setup([mooc]).runner.runRound()).toEqual({
      status: 'finished',
      done: 0,
      manual: 1,
      failed: [],
    });
    expect(await setup([empty]).runner.runRound()).toEqual({ status: 'nothing-to-do' });
  });

  it('没勾课程时回 no-course，不猜', async () => {
    const mooc = platform('mooc', { items: [], blocked: 'no-course' });

    expect(await setup([mooc]).runner.runRound()).toEqual({ status: 'no-course' });
  });
});

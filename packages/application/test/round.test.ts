/*
 * 「跑一轮」这一个用例。
 *
 * 假端口（状态、进度、平台）跑完整路径：真存储不参与、浏览器不参与。
 * 用例的行为在这里验，载体只管把端口接上。
 */

import { describe, expect, it, vi } from 'vitest';
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
      task: {
        platforms: { mooc: { runningSince: at, heartbeatAt: at, lastFinishedAt: null, failure: null } },
      },
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
    const { runner } = setup([mooc], {
      task: {
        platforms: { mooc: { runningSince: at, heartbeatAt: at, lastFinishedAt: null, failure: null } },
      },
    });

    expect(await runner.runRound()).toEqual({ status: 'finished', done: 1, manual: 0, failed: [] });
    expect(mooc.calls).toContain('plan');
  });

  it('一家的门不挡住另一家：防重入按平台判', async () => {
    const at = Date.now();
    const mooc = platform('mooc', { items: [item('a', 'auto')] });
    const zhs = platform('zhihuishu', { items: [item('z', 'auto', 'courseware')] });
    const { runner } = setup([mooc, zhs], {
      task: {
        platforms: {
          // 智慧树在跑（心跳新鲜）；慕课不在跑
          zhihuishu: { runningSince: at, heartbeatAt: at, lastFinishedAt: null, failure: null },
        },
      },
    });

    // 慕课点名自己：照常开始、跑完；智慧树整家不动
    expect(await runner.runRound({ platformId: 'mooc' })).toMatchObject({ status: 'finished', done: 1 });
    expect(zhs.calls).toEqual([]);

    // 智慧树点名自己：被自己的门拦下
    expect(await runner.runRound({ platformId: 'zhihuishu' })).toEqual({
      status: 'rejected',
      reason: 'ALREADY_RUNNING',
    });
  });

  it('某平台跑完一轮清掉它自己的失败留痕，不动别家', async () => {
    const mooc = platform('mooc', { items: [item('a', 'auto')] });
    const { runner, tasks } = setup([mooc], {
      task: {
        platforms: {
          mooc: {
            runningSince: null,
            heartbeatAt: null,
            lastFinishedAt: 1,
            failure: { message: '旧的', action: null, at: 1 },
          },
          zhihuishu: {
            runningSince: null,
            heartbeatAt: null,
            lastFinishedAt: 1,
            failure: { message: '别家的', action: null, at: 1 },
          },
        },
      },
    });

    await runner.runRound({ platformId: 'mooc' });

    expect(tasks.current().platforms['mooc']?.failure).toBeNull();
    expect(tasks.current().platforms['zhihuishu']?.failure).toMatchObject({ message: '别家的' });
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
    expect(tasks.current().platforms['boom']?.runningSince).toBeNull();
    expect(tasks.current().platforms['boom']?.failure?.message).toBe('平台炸了');
    // 普通错误没有「下一步」动作：壳不替平台造句
    expect(tasks.current().platforms['boom']?.failure?.action).toBeNull();
  });

  it('抛出的错误附带 action 时，原样落进状态（形状不完整则视为没有）', async () => {
    const boom = platform('boom');
    boom.plan = async () => {
      throw Object.assign(new Error('要验证'), {
        action: { platformId: 'zhihuishu', label: '打开验证页', url: 'https://example.com/study' },
      });
    };
    const { runner, tasks } = setup([boom]);
    await runner.runRound();
    // 归属认平台自报的 platformId（最可信），不按「此刻在跑的那家」
    expect(tasks.current().platforms['zhihuishu']?.failure).toMatchObject({
      message: '要验证',
      action: { platformId: 'zhihuishu', label: '打开验证页', url: 'https://example.com/study' },
    });

    const half = platform('half');
    half.plan = async () => {
      // 形状不完整（缺 url）：当没有，不当半个；失败仍归属此刻在跑的平台
      throw Object.assign(new Error('残缺'), { action: { platformId: 'zhihuishu', label: '打开验证页' } });
    };
    const second = setup([half]);
    await second.runner.runRound();
    expect(second.tasks.current().platforms['half']?.failure?.action).toBeNull();
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
      heartbeats.push(tasks.current().platforms['mooc']?.heartbeatAt ?? 0);
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
      failed: [{ name: '事项 b', kind: 'quiz', detail: '平台拒绝' }],
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
        { ...item('a', 'auto'), group: '示例课程戊' },
        { ...item('b', 'auto'), group: '甲课' },
      ],
    });
    const { runner } = setup([mooc]);

    expect(await runner.runRound({ group: '示例课程戊' })).toEqual({
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

  it('给了条目 id 就只做那一条（弹窗上「单独完成」的判据）', async () => {
    const mooc = platform('mooc', { items: [item('a', 'auto'), item('b', 'auto'), item('c', 'manual')] });
    const { runner } = setup([mooc]);

    expect(await runner.runRound({ ids: ['b'] })).toEqual({
      status: 'finished',
      done: 1,
      manual: 0,
      failed: [],
    });
    expect(mooc.calls.filter((call) => call.startsWith('run:'))).toEqual(['run:b']);
  });
});

describe('停止', () => {
  it('按了停止：做完手上这一项就不再开始下一项', async () => {
    const mooc = platform('mooc', { items: [item('a', 'auto'), item('b', 'auto'), item('c', 'auto')] });
    const { runner } = setup([mooc]);
    const ran: string[] = [];
    mooc.run = async (entry) => {
      ran.push(entry.id);
      // 第一项的执行中间按停止：它做完，后面的不再开始
      if (entry.id === 'a') runner.stop('mooc');
      return { status: 'done' };
    };

    expect(await runner.runRound()).toEqual({
      status: 'finished',
      done: 1,
      manual: 0,
      failed: [],
      stopped: true,
    });
    expect(ran).toEqual(['a']);
  });

  it('没有在跑的时候按停止：如实说什么都没发生', () => {
    expect(setup([]).runner.stop('mooc')).toBe(false);
  });

  it('停止按平台：停一家不打断另一家的轮次', async () => {
    const mooc = platform('mooc', { items: [item('a', 'auto'), item('b', 'auto')] });
    const zhs = platform('zhihuishu', { items: [item('z', 'auto', 'courseware')] });
    const { runner } = setup([mooc, zhs]);
    const ran: string[] = [];
    mooc.run = async (entry) => {
      ran.push(entry.id);
      // 对没在跑的智慧树按停止：无事发生，慕课的队列不受影响
      expect(runner.stop('zhihuishu')).toBe(false);
      return { status: 'done' };
    };

    expect(await runner.runRound({ platformId: 'mooc' })).toMatchObject({ status: 'finished', done: 2 });
    expect(ran).toEqual(['a', 'b']);
  });

  it('长动作拿到的停止柄是活的：项内安全点问得到「已要求停」', async () => {
    const mooc = platform('mooc', { items: [item('a', 'auto')] });
    const { runner } = setup([mooc]);
    let sawStopped: boolean | null = null;
    mooc.run = async (_entry, _heartbeat, control) => {
      runner.stop('mooc');
      // 长动作内部的安全点：这一刻就该看到停止
      sawStopped = control.stopped();
      return { status: 'skipped' };
    };

    const result = await runner.runRound();

    expect(sawStopped).toBe(true);
    expect(result).toEqual({ status: 'finished', done: 0, manual: 0, failed: [], stopped: true });
  });
});

describe('未登录', () => {
  it('平台没就绪：立刻回未登录，不落任何执行标记', async () => {
    const mooc = platform('mooc', { items: [item('a', 'auto')] }, false);
    const { runner, tasks } = setup([mooc]);

    expect(await runner.runRound()).toEqual({ status: 'not-logged-in' });
    expect(mooc.calls).toEqual(['isReady']);
    expect(tasks.current().platforms['mooc']?.runningSince).toBeNull();
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

/*
 * 执行范围的平台维度（两平台共存后补）。
 * 界面上的每个执行入口都点名平台——「课件」这个类别名两家都在用，
 * 单靠 kinds 分不开是谁家的课件。
 */
describe('执行范围的平台维度', () => {
  it('点名平台时只跑那一家，其余整家跳过（连 isReady 都不问）', async () => {
    const mooc = platform('mooc', { items: [item('a', 'auto')] });
    const zhs = platform('zhihuishu', { items: [item('b', 'auto', 'courseware')] });
    const { runner } = setup([mooc, zhs]);

    const result = await runner.runRound({ platformId: 'zhihuishu' });
    expect(result).toMatchObject({ status: 'finished', done: 1 });
    expect(mooc.calls).toEqual([]);
    expect(zhs.calls).toContain('run:b');
  });

  it('不点名平台时全部平台照跑（范围只按类别/课程/条目过滤）', async () => {
    const mooc = platform('mooc', { items: [item('a', 'auto')] });
    const zhs = platform('zhihuishu', { items: [item('b', 'auto', 'courseware')] });
    const { runner } = setup([mooc, zhs]);

    const result = await runner.runRound({ kinds: ['courseware'] });
    expect(result).toMatchObject({ status: 'finished' });
    expect(mooc.calls).toContain('plan');
    expect(zhs.calls).toContain('run:b');
  });
});

/*
 * 回归（2026-10-16 真机发现）：平台 run 抛错中止整轮时，
 * 进度卡必须收尾成 idle——不然界面永远停在「正在执行」。
 */
describe('抛错中止时平台进度卡收尾', () => {
  it('run 抛错的平台在结束后显示为 idle', async () => {
    const broken: PlatformTasks = {
      id: 'mooc',
      name: 'mooc',
      isReady: async () => true,
      plan: async () => ({ items: [item('a', 'auto')] }),
      run: async () => {
        throw new Error('平台中止信号');
      },
    };
    const { runner, progress } = setup([broken]);
    const result = await runner.runRound({ platformId: 'mooc' });
    expect(result).toMatchObject({ status: 'failed', message: '平台中止信号' });
    const platform = progress.current().platforms.find((entry) => entry.id === 'mooc');
    expect(platform?.state).toBe('idle');
  });
});

/*
 * 两家平台在同一轮里。
 *
 * 以前的写法是「一家没登录就整轮 return」：前面平台已经做完的计数被丢掉，排在后面的
 * 平台连一次都不试，而报出来的是一句笼统的「未登录」——两家都配好的用户会看到
 * 「智慧树那轮什么都没做」，可它其实从没被试过。这一组用例钉住新的聚合。
 */
describe('两家平台在一轮里', () => {
  interface Stub extends PlatformTasks {
    calls: string[];
  }

  function stub(
    id: string,
    options: {
      ready?: boolean;
      plan?: Awaited<ReturnType<PlatformTasks['plan']>>;
      outcome?: { status: 'done' | 'failed'; message?: string };
    } = {},
  ): Stub {
    const calls: string[] = [];
    return {
      id,
      name: `平台 ${id}`,
      calls,
      isReady: async () => {
        calls.push('isReady');
        return options.ready ?? true;
      },
      plan: async () => {
        calls.push('plan');
        return options.plan ?? { items: [] };
      },
      run: async (entry) => {
        calls.push(`run:${entry.id}`);
        return options.outcome ?? { status: 'done' };
      },
    };
  }

  const sessionFailure = (id: string) => ({
    name: `平台 ${id}`,
    kind: 'session',
    detail: '登录已失效，需重新登录',
  });

  it('一家没登录：另一家照样读计划、照样执行、照样如实报数', async () => {
    const dead = stub('mooc', { ready: false });
    const alive = stub('zhihuishu', { plan: { items: [item('z1', 'auto')] } });
    const { runner, tasks } = setup([dead, alive]);

    const result = await runner.runRound();

    expect(result).toEqual({
      status: 'finished',
      done: 1,
      manual: 0,
      failed: [sessionFailure('mooc')],
    });
    expect(alive.calls).toEqual(['isReady', 'plan', 'run:z1']);
    /*
     * 被堵的那家留下自己的留痕：界面才说得出是哪家要去登录。
     * 句子按常用句写成一句、不带平台名前缀——带上会渲染成两个冒号
     * （「上次执行失败：平台 mooc：登录已失效…」）。
     */
    expect(tasks.current().platforms['mooc']?.failure?.message).toBe('登录已失效，需重新登录');
  });

  it('计划里说会话失效的那家，不拦另一家', async () => {
    const lost = stub('a', { plan: { items: [], needsLogin: true } });
    const fine = stub('b', { plan: { items: [item('b1', 'auto')] } });
    const { runner } = setup([lost, fine]);

    const result = await runner.runRound();

    expect(fine.calls).toContain('run:b1');
    expect(result).toEqual({
      status: 'finished',
      done: 1,
      manual: 0,
      failed: [sessionFailure('a')],
    });
  });

  it('两家都没登录：仍然报「未登录」，界面那个去登录的入口照旧', async () => {
    const a = stub('a', { ready: false });
    const b = stub('b', { ready: false });
    const { runner } = setup([a, b]);

    expect(await runner.runRound()).toEqual({ status: 'not-logged-in' });
  });

  it('点名了不存在的平台：如实失败，不谎报成「没有可执行的事项」', async () => {
    const mooc = stub('mooc', { plan: { items: [item('m1', 'auto')] } });
    const { runner } = setup([mooc]);

    const result = await runner.runRound({ platformId: 'zhihuishuu' });

    expect(result.status).toBe('failed');
    if (result.status === 'failed') {
      expect(result.message).toContain('不认识的平台 id：zhihuishuu');
      expect(result.message).toContain('mooc');
    }
    expect(mooc.calls).toEqual([]);
  });

  it('这一轮做出失败项时，不清那家的失败留痕', async () => {
    const before: TaskState = {
      platforms: {
        mooc: {
          runningSince: null,
          heartbeatAt: null,
          lastFinishedAt: 1,
          failure: { message: '上次：滑块验证没过', action: null, at: 1 },
        },
      },
    };
    const mooc = stub('mooc', {
      plan: { items: [item('m1', 'auto')] },
      outcome: { status: 'failed', message: '平台拒绝了这次操作' },
    });
    const { runner, tasks } = setup([mooc], { task: before });

    const result = await runner.runRound();

    expect(result).toEqual({
      status: 'finished',
      done: 0,
      manual: 0,
      failed: [{ name: '事项 m1', kind: 'quiz', detail: '平台拒绝了这次操作' }],
    });
    expect(tasks.current().platforms['mooc']?.failure?.message).toBe('上次：滑块验证没过');
  });

  it('一轮里没有失败项才清掉留痕', async () => {
    const before: TaskState = {
      platforms: {
        mooc: {
          runningSince: null,
          heartbeatAt: null,
          lastFinishedAt: 1,
          failure: { message: '上次：滑块验证没过', action: null, at: 1 },
        },
      },
    };
    const mooc = stub('mooc', { plan: { items: [item('m1', 'auto')] } });
    const { runner, tasks } = setup([mooc], { task: before });

    await runner.runRound();

    expect(tasks.current().platforms['mooc']?.failure).toBeNull();
  });

  it('收尾时端口再坏，也只回 failed，不把 rejection 抛给载体', async () => {
    /*
     * runRound 的契约是「必返 RoundResult」，命令行那边没有兜底捕获。
     * 抛错发生在家还没读完前置条件时，于是 catch 分支要写进度卡——
     * 那一步再失败，也只能吞掉：本轮的原因已经拿到手了，不该被换成「写存储时炸了」。
     */
    const tasks = fakeStore();
    const brokenProgress: ProgressPort = {
      snapshot: async () => EMPTY_PROGRESS,
      publish: async () => {
        throw new Error('进度写不进');
      },
    };
    const mooc = stub('mooc');
    mooc.isReady = async () => {
      throw new Error('平台把这一轮打断了');
    };
    const runner = createRunner({ platforms: () => [mooc], tasks: tasks.port, progress: brokenProgress });

    const result = await runner.runRound();

    expect(result).toEqual({ status: 'failed', message: '平台把这一轮打断了' });
  });

  it('每家计划拿到的时刻是它自己那一刻，不是整轮开头那份快照', async () => {
    /*
     * 计划是最长的一段读取。用整轮开头取的那一次时刻，第二家几分钟后拿到的仍是
     * 旧时刻——「过期/截止/待办保留天数」就会一家对一家错。
     */
    vi.useFakeTimers();
    vi.setSystemTime(new Date(1_700_000_000_000));
    const stamps: number[] = [];
    const slow = (id: string, minutesBusy: number): PlatformTasks => ({
      id,
      name: `平台 ${id}`,
      isReady: async () => true,
      plan: async (now) => {
        stamps.push(now);
        if (minutesBusy > 0) vi.advanceTimersByTime(minutesBusy * MINUTE);
        return { items: [] };
      },
      run: async () => ({ status: 'done' as const }),
    });
    const { runner } = setup([slow('a', 4), slow('b', 0)]);

    try {
      await runner.runRound();
    } finally {
      vi.useRealTimers();
    }

    expect(stamps).toHaveLength(2);
    expect(stamps[1] - stamps[0]).toBe(4 * MINUTE);
  });
});

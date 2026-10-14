/*
 * 调度路径的真实测试。
 *
 * 这是唯一没有覆盖的核心路径：什么时候跑、跑哪个平台、只做哪些项、心跳与挂起登录怎么落盘。
 * 平台用假的（只关心调度层问了什么、怎么处理回答），总开关用 mock。
 *
 * 调度状态只 mock **读写存储的那几个**（getTaskState / beginRun / touchRun / finishRun /
 * clearAwaitingLogin / markAwaitingLogin），**判据走真实实现**：canStartRun 与 claimRun
 * 判的就是「这一刻能不能开始一轮」，把它们换成 vi.fn() 等于把要验的东西一起换掉，
 * 测试只剩「我调用了你」——曾经就是这样，残留的中断标记把后台永久锁死而没有一条测试变红。
 * 存储里那份状态本身的读写在 task-state.test.ts 里单独验。
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../src/settings', () => ({ getSettings: vi.fn() }));
vi.mock('../src/background/runtime/scheduler', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../src/background/runtime/scheduler')>();
  return {
    ...actual,
    getTaskState: vi.fn(),
    beginRun: vi.fn(),
    touchRun: vi.fn(),
    finishRun: vi.fn(),
    clearAwaitingLogin: vi.fn(),
    markAwaitingLogin: vi.fn(),
    recordRunFailure: vi.fn(),
  };
});

import { autoRun } from '../src/background/run-tasks';
import { getSettings } from '../src/settings';
import {
  beginRun,
  clearAwaitingLogin,
  finishRun,
  getTaskState,
  markAwaitingLogin,
  recordRunFailure,
  touchRun,
} from '../src/background/runtime/scheduler';
import type { PlanItem, PlatformTasks } from '../src/platforms/types.ts';

const getSettingsMock = vi.mocked(getSettings);
const getTaskStateMock = vi.mocked(getTaskState);
const MINUTE = 60 * 1000;

/*
 * autoRun 走的是真实时钟，所以这些状态得相对「现在」构造。
 * 写死一个日期会让这条测试第二天就变成验另一件事。
 */
function stateIdle(): object {
  return { runningSince: null, heartbeatAt: null, lastFinishedAt: null, awaitingLogin: false };
}

function stateWhileRunning(): object {
  const at = Date.now();
  return { runningSince: at, heartbeatAt: at, lastFinishedAt: null, awaitingLogin: false };
}

function stateWhileInterrupted(): object {
  const at = Date.now() - 10 * MINUTE;
  return { runningSince: at, heartbeatAt: at, lastFinishedAt: null, awaitingLogin: false };
}

interface FakePlatform extends PlatformTasks {
  calls: string[];
}

function item(id: string, mode: PlanItem['mode']): PlanItem {
  return { id, group: '测试课程', title: `事项 ${id}`, mode, payload: { id } };
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

beforeEach(() => {
  vi.clearAllMocks();
  getSettingsMock.mockResolvedValue({ enabled: true } as never);
  getTaskStateMock.mockResolvedValue(stateIdle() as never);
});

describe('一轮调度的前置条件', () => {
  it('总开关关掉时不碰任何平台', async () => {
    getSettingsMock.mockResolvedValue({ enabled: false } as never);
    const mooc = platform('mooc', { items: [item('a', 'auto')] });

    await autoRun({ platforms: () => [mooc] });

    expect(mooc.calls).toEqual([]);
    expect(beginRun).not.toHaveBeenCalled();
  });

  it('确实还在跑时什么都不做（防重入）', async () => {
    getTaskStateMock.mockResolvedValue(stateWhileRunning() as never);
    const mooc = platform('mooc', { items: [item('a', 'auto')] });

    await autoRun({ platforms: () => [mooc] });

    expect(mooc.calls).toEqual([]);
    expect(beginRun).not.toHaveBeenCalled();
  });

  it('中断留下的残留标记不再拦住本轮', async () => {
    /*
     * 回归：判据曾经只看 `runningSince === null`，而把它清掉的只有 finishRun——
     * 那活在已经死掉的进程里。于是浏览器被强杀一次之后，每一轮闹钟静默返回、
     * 手动执行永远回「正在执行」，扩展再也不替用户做一件事，而界面上看不出来。
     */
    getTaskStateMock.mockResolvedValue(stateWhileInterrupted() as never);
    const mooc = platform('mooc', { items: [item('a', 'auto')] });

    await autoRun({ platforms: () => [mooc] });

    expect(mooc.calls).toContain('plan');
    expect(beginRun).toHaveBeenCalledTimes(1);
  });

  it('同一进程里两个触发源不并发起第二轮', async () => {
    /*
     * 「查状态 → 落状态」之间隔着网络 await，闹钟、登录变化与手动按钮都在
     * 同一个 worker 里，可以一起穿过那个窗口。持久标记跨进程，跨不了进程内，
     * 所以还有一道同步的认领。这里让外层在 await 中间再触发一轮，内层必须让路。
     */
    const inner = platform('inner', { items: [] });
    const outer = platform('outer', { items: [] });
    let fired = false;
    outer.plan = async () => {
      if (!fired) {
        fired = true;
        await autoRun({ platforms: () => [inner] });
      }
      return { items: [] };
    };

    await autoRun({ platforms: () => [outer] });

    expect(fired).toBe(true);
    expect(inner.calls).toEqual([]);
  });

  it('一轮里的抛错不逃出 autoRun：照常收尾，并把失败如实记下', async () => {
    /*
     * 调用它的是闹钟与登录事件，没有人在等答案。从前这里把异常抛给
     * `.catch(() => undefined)`，于是「平台炸了」与「今天确实没有要做的事」
     * 在界面上完全一样——现在失败落在运行状态里，由弹窗显示。
     */
    const boom = platform('boom');
    boom.plan = async () => {
      throw new Error('平台炸了');
    };

    await expect(autoRun({ platforms: () => [boom] })).resolves.toBeUndefined();
    expect(finishRun).toHaveBeenCalledTimes(1);
    expect(recordRunFailure).toHaveBeenCalledWith('平台炸了');
  });
});

describe('逐平台执行', () => {
  it('每个平台都跑一遍，只执行 mode 为 auto 的项', async () => {
    const mooc = platform('mooc', {
      items: [item('auto-1', 'auto'), item('manual-1', 'manual'), item('assist-1', 'assisted'), item('auto-2', 'auto')],
    });
    const other = platform('other', { items: [item('x', 'auto')] });

    await autoRun({ platforms: () => [mooc, other] });

    expect(mooc.calls.filter((call) => call.startsWith('run:'))).toEqual(['run:auto-1', 'run:auto-2']);
    expect(other.calls.filter((call) => call.startsWith('run:'))).toEqual(['run:x']);
  });

  it('只执行需要自动完成的项，需要人到场的项不碰', async () => {
    const mooc = platform('mooc', { items: [item('auto-1', 'auto'), item('manual-1', 'manual')] });

    await autoRun({ platforms: () => [mooc] });

    expect(mooc.calls).toContain('run:auto-1');
    expect(mooc.calls.some((call) => call.includes('manual-1'))).toBe(false);
  });

  it('每一步之间刷心跳：长动作拿到心跳回调', async () => {
    const mooc = platform('mooc', { items: [item('a', 'auto'), item('b', 'auto')] });

    await autoRun({ platforms: () => [mooc] });

    // 计划前一次 + 每项之后各一次
    expect(vi.mocked(touchRun).mock.calls.length).toBeGreaterThanOrEqual(3);
  });
});

describe('挂起登录', () => {
  it('平台没就绪时不问计划，最后落挂起标记', async () => {
    const mooc = platform('mooc', { items: [item('a', 'auto')] }, false);

    await autoRun({ platforms: () => [mooc] });

    expect(mooc.calls).toEqual(['isReady']);
    expect(markAwaitingLogin).toHaveBeenCalledTimes(1);
  });

  it('计划里说会话失效时同样落挂起标记', async () => {
    const mooc = platform('mooc', { items: [], needsLogin: true });

    await autoRun({ platforms: () => [mooc] });

    expect(markAwaitingLogin).toHaveBeenCalledTimes(1);
  });

  it('就绪的平台会先清掉挂起标记', async () => {
    const mooc = platform('mooc', { items: [] });

    await autoRun({ platforms: () => [mooc] });

    expect(clearAwaitingLogin).toHaveBeenCalledTimes(1);
    expect(markAwaitingLogin).not.toHaveBeenCalled();
  });

  it('挂起标记在收尾之后才落：finishRun 会清掉它，早落就没人记得了', async () => {
    const order: string[] = [];
    vi.mocked(finishRun).mockImplementation(async () => {
      order.push('finishRun');
    });
    vi.mocked(markAwaitingLogin).mockImplementation(async () => {
      order.push('markAwaitingLogin');
    });
    // 未就绪的平台不会 beginRun，因此这里要的是「跑起来之后才发现会话失效」那种
    const mooc = platform('mooc', { items: [], needsLogin: true });

    await autoRun({ platforms: () => [mooc] });

    expect(order).toEqual(['finishRun', 'markAwaitingLogin']);
  });
});

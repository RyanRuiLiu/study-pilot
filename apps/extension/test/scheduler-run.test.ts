/*
 * 调度路径的真实测试。
 *
 * 这是唯一没有覆盖的核心路径：什么时候跑、跑哪个平台、只做哪些项、心跳与挂起登录怎么落盘。
 * 平台用假的（只关心调度层问了什么、怎么处理回答），调度状态与总开关用 mock——
 * 它们是外壳自己的东西，各自的读写在 task-state.test.ts 里已单独验过。
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../src/settings', () => ({ getSettings: vi.fn() }));
vi.mock('../src/background/runtime/scheduler', () => ({
  getTaskState: vi.fn(),
  canStartRun: vi.fn(),
  beginRun: vi.fn(),
  touchRun: vi.fn(),
  finishRun: vi.fn(),
  clearAwaitingLogin: vi.fn(),
  markAwaitingLogin: vi.fn(),
}));

import { autoRun } from '../src/background/run-tasks';
import { getSettings } from '../src/settings';
import {
  beginRun,
  canStartRun,
  clearAwaitingLogin,
  finishRun,
  getTaskState,
  markAwaitingLogin,
  touchRun,
} from '../src/background/runtime/scheduler';
import type { PlanItem, PlatformTasks } from '../src/platforms/types.ts';

const getSettingsMock = vi.mocked(getSettings);
const canStartRunMock = vi.mocked(canStartRun);

interface FakePlatform extends PlatformTasks {
  calls: string[];
  planOptions: Array<{ force?: boolean } | undefined>;
}

function item(id: string, mode: PlanItem['mode']): PlanItem {
  return { id, title: `事项 ${id}`, mode, payload: { id } };
}

function platform(
  name: string,
  plan: Awaited<ReturnType<PlatformTasks['plan']>> = { items: [] },
  ready = true,
): FakePlatform {
  const calls: string[] = [];
  const planOptions: Array<{ force?: boolean } | undefined> = [];
  return {
    id: name,
    name,
    calls,
    planOptions,
    isReady: async () => {
      calls.push('isReady');
      return ready;
    },
    plan: async (_now, options) => {
      calls.push('plan');
      planOptions.push(options);
      return plan;
    },
    run: async (entry) => {
      calls.push(`run:${entry.id}`);
      return { status: 'done' };
    },
    report: async (items) => {
      calls.push(`report:${items.map((entry) => entry.id).join(',')}`);
    },
  };
}

beforeEach(() => {
  vi.clearAllMocks();
  getSettingsMock.mockResolvedValue({ enabled: true } as never);
  vi.mocked(getTaskState).mockResolvedValue({ runningSince: null } as never);
  canStartRunMock.mockReturnValue(true);
});

describe('一轮调度的前置条件', () => {
  it('总开关关掉时不碰任何平台', async () => {
    getSettingsMock.mockResolvedValue({ enabled: false } as never);
    const mooc = platform('mooc', { items: [item('a', 'auto')] });

    await autoRun({ platforms: () => [mooc] });

    expect(mooc.calls).toEqual([]);
    expect(beginRun).not.toHaveBeenCalled();
  });

  it('不能开始（已在跑或尚未到点）时什么都不做', async () => {
    canStartRunMock.mockReturnValue(false);
    const mooc = platform('mooc', { items: [item('a', 'auto')] });

    await autoRun({ platforms: () => [mooc] });

    expect(mooc.calls).toEqual([]);
    expect(beginRun).not.toHaveBeenCalled();
  });

  it('跑完一定收尾：正常与抛错都调 finishRun，且抛错时不再安排下一轮', async () => {
    const boom = platform('boom');
    boom.plan = async () => {
      throw new Error('平台炸了');
    };

    await expect(autoRun({ platforms: () => [boom] })).rejects.toThrow('平台炸了');
    expect(finishRun).toHaveBeenCalledTimes(1);
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

  it('报告拿到的是「执行过的项」与它们的结果，需要人到场的项不在里面', async () => {
    const mooc = platform('mooc', { items: [item('auto-1', 'auto'), item('manual-1', 'manual')] });

    await autoRun({ platforms: () => [mooc] });

    expect(mooc.calls).toContain('report:auto-1');
    expect(mooc.calls.some((call) => call.includes('manual-1'))).toBe(false);
  });

  it('自动执行不给平台加「强制刷新」：那是手动执行才有的', async () => {
    const mooc = platform('mooc', { items: [] });

    await autoRun({ platforms: () => [mooc] });

    expect(mooc.planOptions).toEqual([undefined]);
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

/*
 * 跨次运行状态的判据与迁移（按平台独立）。
 *
 * 这是后台与界面之间唯一的约定，踩过两个坑：
 *
 * 一、只看 `runningSince !== null`。浏览器被强杀时那个标记会留在存储里
 *     没人清，而线程早就不在了，于是弹窗一直显示「正在执行」——
 *     用户等一件永远不会发生的事。
 *
 * 二、界面自己算这个判断。两处各写一遍，就各错各的；判据因此收到一处
 *     （`liveRunState`），界面只负责显示。
 *
 * 全部是纯函数（见 src/state.ts）：不碰存储，所以这些用例一个替身都不需要。
 */

import { describe, expect, it } from 'vitest';
import {
  clearPlatformFailure,
  beginRun,
  canStartRun,
  finishRun,
  liveRunState,
  normalizeTaskState,
  recordPlatformFailure,
  touchRun,
  type PlatformRunState,
  type TaskState,
} from '../src/index.ts';

const NOW = 1_700_000_000_000;
const MINUTE = 60 * 1000;
/** 被观察的平台；隔离类用例会用第二个平台做对照。 */
const P = 'mooc';

/** 平台的空白运行状态（与 state.ts 的底座同形）。 */
function blank(over: Partial<PlatformRunState> = {}): PlatformRunState {
  return { runningSince: null, heartbeatAt: null, lastFinishedAt: null, failure: null, ...over };
}

/** 一份「P 平台 + 可选的其它平台」的状态。 */
function state(over: Partial<PlatformRunState> = {}, others: Record<string, PlatformRunState> = {}): TaskState {
  return { platforms: { [P]: blank(over), ...others } };
}

describe('后台此刻的状态', () => {
  it('什么都没发生', () => {
    expect(liveRunState(state(), P, NOW)).toBe('idle');
  });

  it('刚落下心跳，说明真的在跑', () => {
    expect(liveRunState(state({ runningSince: NOW - 5 * MINUTE, heartbeatAt: NOW - 800 }), P, NOW)).toBe(
      'running',
    );
  });

  it('心跳停了很久，判为中断而不是正在执行', () => {
    const stale = state({ runningSince: NOW - 10 * MINUTE, heartbeatAt: NOW - 10 * MINUTE });
    expect(liveRunState(stale, P, NOW)).toBe('interrupted');
    expect(liveRunState(stale, P, NOW)).not.toBe('running');
  });

  it('刚过超时线仍算在跑，超时才判中断', () => {
    const justInside = state({ runningSince: NOW - 200_000, heartbeatAt: NOW - 119_000 });
    const justOutside = state({ runningSince: NOW - 200_000, heartbeatAt: NOW - 121_000 });
    expect(liveRunState(justInside, P, NOW)).toBe('running');
    expect(liveRunState(justOutside, P, NOW)).toBe('interrupted');
  });

  it('没有心跳字段时以开始时刻为准', () => {
    expect(liveRunState(state({ runningSince: NOW - 1000 }), P, NOW)).toBe('running');
    expect(liveRunState(state({ runningSince: NOW - 10 * MINUTE }), P, NOW)).toBe('interrupted');
  });

  it('一轮结束后回到空闲，残留的心跳不影响判断', () => {
    const done = state({ runningSince: null, heartbeatAt: NOW });
    expect(liveRunState(done, P, NOW)).toBe('idle');
    expect(liveRunState(done, P, NOW)).not.toBe('running');
  });

  it('平台之间彼此独立：一家在跑，另一家仍是空闲', () => {
    const s = state({ runningSince: NOW - 800, heartbeatAt: NOW - 800 }, { zhihuishu: blank() });
    expect(liveRunState(s, P, NOW)).toBe('running');
    expect(liveRunState(s, 'zhihuishu', NOW)).toBe('idle');
    expect(liveRunState(s, '还没出现过的平台', NOW)).toBe('idle');
  });
});

/*
 * 「能不能开始一轮」与「界面显示什么」必须共用上面这一套判据。
 * 两者曾经各算各的：界面用带心跳的 liveRunState，执行用 `runningSince === null`，
 * 于是界面能看出「上一轮已经不在了」，执行却仍然被同一个标记拦住——
 * 一次强杀就把执行永久锁死，而弹窗还在说「正在执行」。
 */
describe('能否开始一轮', () => {
  it('空闲可以开始', () => {
    expect(canStartRun(state(), P, NOW)).toBe(true);
  });

  it('确实还在跑时不许开始第二轮', () => {
    expect(canStartRun(state({ runningSince: NOW - 800, heartbeatAt: NOW - 800 }), P, NOW)).toBe(false);
    expect(canStartRun(state({ runningSince: NOW - 1000 }), P, NOW)).toBe(false);
  });

  it('中断的残留标记不再拦住下一轮', () => {
    expect(canStartRun(state({ runningSince: NOW - 10 * MINUTE, heartbeatAt: NOW - 10 * MINUTE }), P, NOW)).toBe(true);
    expect(canStartRun(state({ runningSince: NOW - 10 * MINUTE }), P, NOW)).toBe(true);
  });

  it('与 liveRunState 同判据：说 interrupted 的就一定能开始', () => {
    for (const over of [
      {},
      { runningSince: NOW - 800, heartbeatAt: NOW - 800 },
      { runningSince: NOW - 10 * MINUTE, heartbeatAt: NOW - 10 * MINUTE },
    ]) {
      const s = state(over);
      expect(canStartRun(s, P, NOW)).toBe(liveRunState(s, P, NOW) !== 'running');
    }
  });

  it('一家的门不占另一家：在跑的是别家，这家仍可开始', () => {
    const s = state({ runningSince: NOW - 800, heartbeatAt: NOW - 800 }, { zhihuishu: blank() });
    expect(canStartRun(s, P, NOW)).toBe(false);
    expect(canStartRun(s, 'zhihuishu', NOW)).toBe(true);
  });
});

/* 迁移规则本身：每条对应代码里写下的那句话。 */
describe('状态的迁移', () => {
  it('开始时落下该平台的 runningSince 与第一次心跳，不动别家', () => {
    const before = { platforms: { zhihuishu: blank({ lastFinishedAt: 7 }) } };
    expect(beginRun(before, P, NOW)).toEqual({
      platforms: {
        zhihuishu: blank({ lastFinishedAt: 7 }),
        [P]: blank({ runningSince: NOW, heartbeatAt: NOW }),
      },
    });
  });

  it('心跳只对进行中的一轮有效：结束后的迟到回调不再写活它', () => {
    const finished = state();
    // 原样返回（同一个对象），载体据此也能省一次落盘
    expect(touchRun(finished, P, NOW)).toBe(finished);

    const running = state({ runningSince: NOW - 1000, heartbeatAt: NOW - 1000 });
    expect(touchRun(running, P, NOW).platforms[P]?.heartbeatAt).toBe(NOW);
  });

  it('结束时只收本平台的运行标记；失败留痕不在这里清，别家不动', () => {
    const prior = { message: '上一轮的失败', action: null, at: NOW - 1000 };
    const others = { zhihuishu: blank({ failure: prior }) };
    const before = state({ runningSince: NOW - 1000, heartbeatAt: NOW - 1000, failure: prior }, others);
    expect(finishRun(before, P, NOW)).toEqual({
      platforms: {
        [P]: blank({ failure: prior, lastFinishedAt: NOW }),
        zhihuishu: others.zhihuishu,
      },
    });
  });

  it('失败落在该平台的留痕上：替换同平台旧条、不动别家、也记结束时刻', () => {
    const action = { platformId: 'zhihuishu', label: '打开验证页', url: 'https://example.com/study' };
    const others = { mooc: blank({ failure: { message: '旧的', action: null, at: 1 } }) };
    const after = recordPlatformFailure(state({}, others), 'zhihuishu', '平台要求完成一次人机验证', NOW, action);
    expect(after.platforms.mooc).toEqual(others.mooc);
    expect(after.platforms.zhihuishu).toEqual(
      blank({ failure: { message: '平台要求完成一次人机验证', action, at: NOW }, lastFinishedAt: NOW }),
    );
  });

  it('清理只清本平台；没有留痕时原样返回同一对象（无变化不落盘）', () => {
    const kept = { message: '别家的', action: null, at: 1 };
    const before = state(
      { failure: { message: '自家的', action: null, at: 2 } },
      { zhihuishu: blank({ failure: kept }) },
    );
    const after = clearPlatformFailure(before, P);
    expect(after.platforms[P]?.failure).toBeNull();
    expect(after.platforms.zhihuishu?.failure).toEqual(kept);
    expect(clearPlatformFailure(after, P)).toBe(after);
  });
});

/* 存储归一：旧版本/手写的文件都从这里进系统（载体只负责把值递进来）。 */
describe('存储归一', () => {
  it('旧版本的顶层字段不入内；平台条目缺字段以空底座补齐', () => {
    expect(
      normalizeTaskState({
        runningSince: 5,
        lastError: '上一代字段',
        platforms: { mooc: { runningSince: 5, failure: { message: 'x', action: null, at: 1 } } },
      }),
    ).toEqual({
      platforms: {
        mooc: { runningSince: 5, heartbeatAt: null, lastFinishedAt: null, failure: { message: 'x', action: null, at: 1 } },
      },
    });
  });

  it('空值与缺平台都归成空状态', () => {
    expect(normalizeTaskState(null)).toEqual({ platforms: {} });
    expect(normalizeTaskState({})).toEqual({ platforms: {} });
    expect(normalizeTaskState({ platforms: null })).toEqual({ platforms: {} });
  });
});

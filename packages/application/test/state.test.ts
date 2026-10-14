/*
 * 跨次运行状态的判据与迁移。
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
  EMPTY_STATE,
  beginRun,
  canStartRun,
  finishRun,
  liveRunState,
  recordRunFailure,
  setAwaitingLogin,
  touchRun,
  type TaskState,
} from '../src/index.ts';

const NOW = 1_700_000_000_000;
const MINUTE = 60 * 1000;

function state(over: Partial<TaskState> = {}): TaskState {
  return { ...EMPTY_STATE, ...over };
}

describe('后台此刻的状态', () => {
  it('什么都没发生', () => {
    expect(liveRunState(state(), NOW)).toBe('idle');
  });

  it('刚落下心跳，说明真的在跑', () => {
    expect(
      liveRunState(state({ runningSince: NOW - 5 * MINUTE, heartbeatAt: NOW - 800 }), NOW),
    ).toBe('running');
  });

  it('心跳停了很久，判为中断而不是正在执行', () => {
    expect(
      liveRunState(state({ runningSince: NOW - 10 * MINUTE, heartbeatAt: NOW - 10 * MINUTE }), NOW),
    ).toBe('interrupted');
    expect(
      liveRunState(state({ runningSince: NOW - 10 * MINUTE, heartbeatAt: NOW - 10 * MINUTE }), NOW),
    ).not.toBe('running');
  });

  it('刚过超时线仍算在跑，超时才判中断', () => {
    const justInside = state({ runningSince: NOW - 200_000, heartbeatAt: NOW - 119_000 });
    const justOutside = state({ runningSince: NOW - 200_000, heartbeatAt: NOW - 121_000 });
    expect(liveRunState(justInside, NOW)).toBe('running');
    expect(liveRunState(justOutside, NOW)).toBe('interrupted');
  });

  it('没有心跳字段时以开始时刻为准', () => {
    expect(liveRunState(state({ runningSince: NOW - 1000 }), NOW)).toBe('running');
    expect(liveRunState(state({ runningSince: NOW - 10 * MINUTE }), NOW)).toBe('interrupted');
  });

  it('等登录与空闲分开：前者在登录后会自己补做', () => {
    expect(liveRunState(state({ awaitingLogin: true }), NOW)).toBe('awaiting-login');
  });

  it('运行中的优先级高于等登录', () => {
    expect(
      liveRunState(state({ runningSince: NOW, heartbeatAt: NOW, awaitingLogin: true }), NOW),
    ).toBe('running');
  });

  it('一轮结束后回到空闲，残留的心跳不影响判断', () => {
    expect(liveRunState(state({ runningSince: null, heartbeatAt: NOW }), NOW)).toBe('idle');
    expect(liveRunState(state({ runningSince: null, heartbeatAt: NOW }), NOW)).not.toBe('running');
  });
});

/*
 * 「能不能开始一轮」与「界面显示什么」必须共用上面这一套判据。
 * 两者曾经各算各的：界面用带心跳的 liveRunState，执行用 `runningSince === null`，
 * 于是界面能看出「上一轮已经不在了」，执行却仍然被同一个标记拦住——
 * 一次强杀就把后台永久锁死，而弹窗还在说「下次检查时接着做」。
 */
describe('能否开始一轮', () => {
  it('空闲与等登录都可以开始', () => {
    expect(canStartRun(state(), NOW)).toBe(true);
    expect(canStartRun(state({ awaitingLogin: true }), NOW)).toBe(true);
  });

  it('确实还在跑时不许开始第二轮', () => {
    expect(canStartRun(state({ runningSince: NOW - 800, heartbeatAt: NOW - 800 }), NOW)).toBe(false);
    expect(canStartRun(state({ runningSince: NOW - 1000 }), NOW)).toBe(false);
  });

  it('中断的残留标记不再拦住下一轮', () => {
    expect(
      canStartRun(state({ runningSince: NOW - 10 * MINUTE, heartbeatAt: NOW - 10 * MINUTE }), NOW),
    ).toBe(true);
    expect(canStartRun(state({ runningSince: NOW - 10 * MINUTE }), NOW)).toBe(true);
  });

  it('与 liveRunState 同判据：说 interrupted 的就一定能开始', () => {
    for (const over of [
      {},
      { awaitingLogin: true },
      { runningSince: NOW - 800, heartbeatAt: NOW - 800 },
      { runningSince: NOW - 10 * MINUTE, heartbeatAt: NOW - 10 * MINUTE },
      { runningSince: NOW, heartbeatAt: NOW, awaitingLogin: true },
    ]) {
      const s = state(over);
      expect(canStartRun(s, NOW)).toBe(liveRunState(s, NOW) !== 'running');
    }
  });
});

/* 迁移规则本身：四条，每条对应代码里写下的那句话。 */
describe('状态的迁移', () => {
  it('开始时落下 runningSince 与第一次心跳', () => {
    expect(beginRun(state(), NOW)).toEqual({
      runningSince: NOW,
      heartbeatAt: NOW,
      lastFinishedAt: null,
      awaitingLogin: false,
      lastError: null,
    });
  });

  it('心跳只对进行中的一轮有效：结束后的迟到回调不再写活它', () => {
    const finished = state({ runningSince: null, heartbeatAt: null });
    // 原样返回（同一个对象），载体据此也能省一次落盘
    expect(touchRun(finished, NOW)).toBe(finished);

    const running = state({ runningSince: NOW - 1000, heartbeatAt: NOW - 1000 });
    expect(touchRun(running, NOW).heartbeatAt).toBe(NOW);
  });

  it('结束时清掉心跳、挂起标记与上一轮的失败', () => {
    const before = state({
      runningSince: NOW - 1000,
      heartbeatAt: NOW - 1000,
      awaitingLogin: true,
      lastError: '上一轮的失败',
    });
    expect(finishRun(before, NOW)).toEqual({
      runningSince: null,
      heartbeatAt: null,
      lastFinishedAt: NOW,
      awaitingLogin: false,
      lastError: null,
    });
  });

  it('失败只改 lastError 与结束时刻，不动运行标记', () => {
    const before = state({ runningSince: NOW - 1000, heartbeatAt: NOW - 1000 });
    expect(recordRunFailure(before, '网络断了', NOW)).toEqual({
      runningSince: NOW - 1000,
      heartbeatAt: NOW - 1000,
      lastFinishedAt: NOW,
      awaitingLogin: false,
      lastError: '网络断了',
    });
  });

  it('挂起标记值没变时原样返回，调用方据此跳过落盘', () => {
    const idle = state();
    expect(setAwaitingLogin(idle, false)).toBe(idle);
    expect(setAwaitingLogin(idle, true).awaitingLogin).toBe(true);

    const waiting = state({ awaitingLogin: true });
    expect(setAwaitingLogin(waiting, true)).toBe(waiting);
    expect(setAwaitingLogin(waiting, false).awaitingLogin).toBe(false);
  });
});

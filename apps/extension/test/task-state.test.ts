/*
 * 「此刻后台在做什么」的判据。
 *
 * 这是后台与界面之间唯一的约定，踩过两个坑：
 *
 * 一、只看 `runningSince !== null`。浏览器被强杀时那个标记会留在存储里
 *     没人清，而线程早就不在了，于是弹窗一直显示「正在执行」——
 *     用户等一件永远不会发生的事。
 *
 * 二、界面自己算这个判断。两处各写一遍，就各错各的；判据因此收到后台
 *     一处（`liveRunState`），界面只负责显示。
 */

import { describe, expect, it } from 'vitest';
import { EMPTY_STATE, liveRunState, type TaskState } from '../src/background/scheduler';

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

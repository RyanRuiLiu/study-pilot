/*
 * 本进程内的执行权。
 *
 * 跨进程的持久判据在 @study-pilot/application 的 state.ts（`canStartRun`）；
 * 这一道是同一个 worker 内的同步闸门：「检查标记 → 落标记」之间隔着网络 await，
 * 闹钟、登录变化与手动按钮可能一起穿过那个窗口，然后并发起两轮去写平台。
 */

import { describe, expect, it } from 'vitest';
import { claimRun, releaseRun } from '../src/background/runtime/scheduler';

describe('本进程内的执行权', () => {
  it('一轮没结束前，第二个触发源拿不到执行权', () => {
    expect(claimRun()).toBe(true);
    expect(claimRun()).toBe(false);
    releaseRun();
    expect(claimRun()).toBe(true);
    releaseRun();
  });
});

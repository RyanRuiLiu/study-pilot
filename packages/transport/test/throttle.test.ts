/**
 * 节流器测试。
 *
 * 节流器的作用是防止触发平台的全局限流与并发限制，出错的方式很隐蔽：
 * 要么没真正串行（并发被拒），要么漏掉了间隔（被限流），
 * 两者都不会在单次手工测试里暴露出来。所以这里用假时钟把时序钉死。
 */

import { describe, expect, it } from 'vitest';
import { createThrottle, DEFAULT_MIN_GAP_MS } from '../src/throttle.ts';

/** 可控时钟：sleep 不真的等待，而是把时间往前拨。 */
function fakeClock(): {
  now: () => number;
  sleep: (ms: number) => Promise<void>;
  elapsed: () => number;
} {
  let t = 0;
  return {
    now: () => t,
    sleep: async (ms: number) => {
      t += ms;
    },
    elapsed: () => t,
  };
}

describe('createThrottle', () => {
  it('任务严格串行，不会并发', async () => {
    const clock = fakeClock();
    const throttle = createThrottle({ minGapMs: 0, now: clock.now, sleep: clock.sleep });

    const events: string[] = [];
    const task = (name: string) => async () => {
      events.push(`${name}:start`);
      // 用真实的微任务让出，模拟异步请求体
      await Promise.resolve();
      await Promise.resolve();
      events.push(`${name}:end`);
      return name;
    };

    const results = await Promise.all([
      throttle.run(task('a')),
      throttle.run(task('b')),
      throttle.run(task('c')),
    ]);

    expect(events).toEqual([
      'a:start',
      'a:end',
      'b:start',
      'b:end',
      'c:start',
      'c:end',
    ]);
    expect(results).toEqual(['a', 'b', 'c']);
  });

  it('相邻请求之间保持最小间隔', async () => {
    const clock = fakeClock();
    const throttle = createThrottle({ minGapMs: 1000, now: clock.now, sleep: clock.sleep });

    await throttle.run(async () => undefined);
    const afterFirst = clock.elapsed();

    await throttle.run(async () => undefined);
    const afterSecond = clock.elapsed();

    // 首个任务不需要等待——前面没有请求
    expect(afterFirst).toBe(0);
    // 第二个任务补足 1000ms 间隔
    expect(afterSecond).toBe(1000);
  });

  it('任务自身耗时计入间隔，不会额外等待', async () => {
    const clock = fakeClock();
    const throttle = createThrottle({ minGapMs: 1000, now: clock.now, sleep: clock.sleep });

    await throttle.run(async () => {
      // 请求本身花了 800ms
      await clock.sleep(800);
    });
    await throttle.run(async () => undefined);

    // 800ms 已过，只需补 200ms
    expect(clock.elapsed()).toBe(1000);
  });

  it('单个任务失败不会卡死队列', async () => {
    const clock = fakeClock();
    const throttle = createThrottle({ minGapMs: 0, now: clock.now, sleep: clock.sleep });

    const failed = throttle.run(async () => {
      throw new Error('boom');
    });
    await expect(failed).rejects.toThrow('boom');

    await expect(throttle.run(async () => 'ok')).resolves.toBe('ok');
  });

  it('pending() 反映排队中的任务数', async () => {
    const clock = fakeClock();
    const throttle = createThrottle({ minGapMs: 0, now: clock.now, sleep: clock.sleep });

    expect(throttle.pending()).toBe(0);
    const all = Promise.all([
      throttle.run(async () => undefined),
      throttle.run(async () => undefined),
    ]);
    expect(throttle.pending()).toBe(2);
    await all;
    expect(throttle.pending()).toBe(0);
  });

  it('默认间隔为常量值', async () => {
    const clock = fakeClock();
    const throttle = createThrottle({ now: clock.now, sleep: clock.sleep });

    await throttle.run(async () => undefined);
    await throttle.run(async () => undefined);

    expect(clock.elapsed()).toBe(DEFAULT_MIN_GAP_MS);
  });
});

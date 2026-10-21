/*
 * 进度推送的断线容错：页面在推送那一刻关掉，不能把正在跑的一轮打断。
 *
 * 端口在关闭与收到下一次推送之间有窗口；postMessage 对已关闭的端口会抛。
 * 抛出去会穿过 ProgressPort，把一轮执行变成「执行失败」——真正的原因只是关了个页面。
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';

const g = globalThis as unknown as {
  browser?: unknown;
};

const store = {
  get: vi.fn(async () => ({})),
  set: vi.fn(async () => undefined),
};
g.browser = { storage: { local: store } };

const { attachRunStatePort, progressStore } = await import('../src/background/runtime/run-state.ts');

const STATE = { platforms: [] };

beforeEach(() => {
  store.get.mockClear();
  store.set.mockClear();
});

describe('进度推送', () => {
  it('端口在推送时抛错：丢掉它，不把异常带进执行', async () => {
    const postMessage = vi
      .fn()
      // 建立连接时的那一份快照正常送达
      .mockImplementationOnce(() => undefined)
      .mockImplementation(() => {
        throw new Error('port closed');
      });
    const port = { name: 'run-state', postMessage, onDisconnect: { addListener: vi.fn() } };

    attachRunStatePort(port);
    await vi.waitFor(() => expect(postMessage).toHaveBeenCalledTimes(1));

    // 两次发布都不该抛；第一次推送失败后该端口被丢掉，第二次不再推给它
    await expect(progressStore.publish(STATE as never)).resolves.toBeUndefined();
    await expect(progressStore.publish(STATE as never)).resolves.toBeUndefined();
    expect(postMessage).toHaveBeenCalledTimes(2);
  });
});

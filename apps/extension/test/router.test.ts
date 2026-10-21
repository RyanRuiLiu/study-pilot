/*
 * 消息路由的关闭页面边界。
 *
 * 页面可能在处理器跑完之前关掉；这时 sendResponse 会抛「message port closed」。
 * 路由必须把它当作「没人接收」，而不是让 catch 再回一次又抛成未处理拒绝。
 */

import { describe, expect, it, vi } from 'vitest';
import { fakeBrowser } from 'wxt/testing/fake-browser';

type Listener = (
  message: unknown,
  sender: { id?: string },
  sendResponse: (response?: unknown) => void,
) => boolean | void;

const listeners: Listener[] = [];
// 路由读的是 WXT 注入的全局 browser（测试环境里就是 fakeBrowser）
fakeBrowser.runtime.id = 'ext';
fakeBrowser.runtime.onMessage.addListener = ((listener: Listener) => {
  listeners.push(listener);
}) as typeof fakeBrowser.runtime.onMessage.addListener;

const { registerMessageHandler } = await import('../src/background/messages/router.ts');

function register(runRound: () => Promise<unknown>): Listener {
  listeners.length = 0;
  registerMessageHandler({
    handlers: {},
    runner: { runRound: vi.fn(runRound), stop: () => false },
  } as never);
  return listeners[0]!;
}

async function tick(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe('消息路由', () => {
  it('响应端口已关闭：不抛、不落成未处理拒绝', async () => {
    const listener = register(async () => ({ status: 'nothing-to-do' }));
    let attempts = 0;
    const sendResponse = (): void => {
      attempts += 1;
      throw new Error('message port closed');
    };

    expect(listener({ type: 'RUN_SCHEDULED_TASKS' }, { id: 'ext' }, sendResponse)).toBe(true);
    await tick();

    // 仍然尝试回了一次，异常被路由吞掉
    expect(attempts).toBe(1);
  });

  it('处理器抛错且端口也关闭：只尝试一次失败响应，不二次抛出', async () => {
    const listener = register(async () => {
      throw new Error('平台炸了');
    });
    let attempts = 0;
    const sendResponse = (): void => {
      attempts += 1;
      throw new Error('message port closed');
    };

    listener({ type: 'RUN_SCHEDULED_TASKS' }, { id: 'ext' }, sendResponse);
    await tick();

    expect(attempts).toBe(1);
  });

  it('不是自家扩展发来的消息：不响应', () => {
    const listener = register(async () => ({ status: 'nothing-to-do' }));
    const sendResponse = vi.fn();

    expect(listener({ type: 'TASK_STATE' }, { id: 'someone-else' }, sendResponse)).toBe(false);
    expect(sendResponse).not.toHaveBeenCalled();
  });
});

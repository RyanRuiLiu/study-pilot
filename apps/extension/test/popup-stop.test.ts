/*
 * 弹窗状态行的停止与收尾归属。
 *
 * 三件事一起钉住：
 *   - 按停止的是一次消息往返；期间切走 tab，停止结果仍归**点击时的平台**；
 *   - 停止请求本身失败时，按钮要复位、状态行要说出来（不能永远停在「正在停止」）；
 *   - 同一平台的两次状态读取乱序回来时，旧的那份不许覆盖新的。
 */

import { parseHTML } from 'linkedom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const bridge = vi.hoisted(() => ({
  getTaskState: vi.fn(),
  stopRun: vi.fn(),
  subscribeRunState: vi.fn(),
}));

vi.mock('../src/ui-bridge.ts', () => bridge);

const window = parseHTML(
  '<!doctype html><html><body>' +
    '<div id="state-line" class="state is-blank">' +
    '<span id="state-text"></span>' +
    '<a id="state-action" hidden></a>' +
    '<button id="stop-run"></button>' +
    '</div>' +
    '<button id="run-now"></button>' +
    '<div id="todo-text"></div><div id="zhs-todo-text"></div>' +
    '</body></html>',
);
const g = globalThis as unknown as {
  document: Document;
  window?: unknown;
  HTMLButtonElement?: unknown;
  HTMLAnchorElement?: unknown;
  HTMLElement?: unknown;
};
g.document = window.document as unknown as Document;
g.window = window;
g.HTMLButtonElement = window.HTMLButtonElement;
g.HTMLAnchorElement = window.HTMLAnchorElement;
g.HTMLElement = window.HTMLElement;

function element(id: string): HTMLElement {
  return (globalThis as unknown as { document: Document }).document.getElementById(id) as unknown as HTMLElement;
}

function idle() {
  return { live: 'idle' as const, state: { platforms: {} } };
}

function failure(message: string) {
  return { live: 'idle' as const, state: { platforms: { mooc: { failure: { message, action: null, at: 1 } } } } };
}

function deferred<T>(): { promise: Promise<T>; resolve: (value: T) => void; reject: (error: unknown) => void } {
  let resolve!: (value: T) => void;
  let reject!: (error: unknown) => void;
  const promise = new Promise<T>((ok, fail) => {
    resolve = ok;
    reject = fail;
  });
  return { promise, resolve, reject };
}

async function flush(): Promise<void> {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

type StatusModule = typeof import('../entrypoints/popup/status.ts');

async function load(): Promise<{ mod: StatusModule; listener: (state: unknown) => void }> {
  vi.resetModules();
  for (const fn of Object.values(bridge)) fn.mockReset();
  let listener: (state: unknown) => void = () => undefined;
  bridge.subscribeRunState.mockImplementation((fn: (state: unknown) => void) => {
    listener = fn;
    return () => undefined;
  });
  bridge.getTaskState.mockResolvedValue(idle());
  const mod = await import('../entrypoints/popup/status.ts');
  mod.watchRunState();
  return { mod, listener };
}

function runningMooc(finished: number) {
  return {
    platforms: [
      { id: 'mooc', name: '慕课', state: 'running', startedAt: 1, total: 5, finished, current: 'x', items: [] },
    ],
  };
}

beforeEach(() => {
  bridge.getTaskState.mockReset();
  bridge.stopRun.mockReset();
  bridge.subscribeRunState.mockReset();
});

describe('停止的归属', () => {
  it('点停止后切走 tab：结果仍记在点击时的那家名下', async () => {
    const { mod, listener } = await load();
    const stopped = deferred<{ stopped: boolean }>();
    bridge.stopRun.mockReturnValue(stopped.promise);

    listener(runningMooc(2));
    (element('stop-run') as unknown as HTMLButtonElement).click();
    expect(bridge.stopRun).toHaveBeenCalledWith('mooc');

    // 用户切到智慧树，停止响应这时才回来
    mod.setStatusPlatform('zhihuishu');
    await flush();
    stopped.resolve({ stopped: true });
    await flush();

    // 切回慕课：收尾句属于慕课，而不是响应回来时停留的智慧树
    mod.setStatusPlatform('mooc');
    await flush();
    expect(element('state-text').textContent).toBe('已停止：完成 2 项');
  });

  it('停止请求失败：按钮复位、状态行说出原因', async () => {
    await load();
    bridge.stopRun.mockRejectedValue(new Error('后台断了'));
    const button = element('stop-run') as unknown as HTMLButtonElement;
    button.disabled = false;

    button.click();

    await vi.waitFor(() => expect(button.disabled).toBe(false));
    expect(element('state-text').textContent).toContain('后台断了');
  });
});

describe('别家跑完的通知', () => {
  it('当前 tab 之外的平台跑完，也要通知入口（它记脏、切回去再读）', async () => {
    const { mod, listener } = await load();
    const idleHandler = vi.fn();
    mod.setFollowIdleHandler(idleHandler);

    listener(runningMooc(2));
    listener({ platforms: [] });

    expect(idleHandler).toHaveBeenCalledWith('mooc');
  });
});

describe('状态读取的时序', () => {
  it('旧响应晚到：不许覆盖同一平台更新的那一份', async () => {
    const { mod } = await load();
    const older = deferred<unknown>();
    const newer = deferred<unknown>();
    bridge.getTaskState.mockReturnValueOnce(older.promise).mockReturnValueOnce(newer.promise);

    mod.setStatusPlatform('mooc');
    mod.setStatusPlatform('mooc');

    newer.resolve(failure('新的失败'));
    await flush();
    older.resolve(failure('旧的失败'));
    await flush();

    expect(element('state-text').textContent).toBe('上次执行失败：新的失败');
  });
});

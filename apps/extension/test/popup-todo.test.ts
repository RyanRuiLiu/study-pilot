/*
 * 弹窗待办区的取数出口：会话与配置那两次读 reject 时，要让失败可见。
 *
 * 这条路径原先没有出口（裸 await）——后台重启或端口失效时待办区空白，
 * 看起来像「确实没有待办」。两个平台各一份实现，因此两边都钉。
 *
 * DOM 只在模块加载前挂一次：elements.ts 在导入时就抓住了容器元素，
 * 每个用例重挂一个新 document 会让它继续写旧节点。
 */

import { parseHTML } from 'linkedom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const bridge = vi.hoisted(() => ({
  getSession: vi.fn(),
  getSettings: vi.fn(),
  getPending: vi.fn(),
  getZhsSession: vi.fn(),
  getZhsPending: vi.fn(),
  runNow: vi.fn(),
}));

vi.mock('../src/ui-bridge.ts', () => bridge);

const window = parseHTML(
  '<!doctype html><html><body>' +
    '<div id="todo-text" class="todo is-loading"></div>' +
    '<div id="zhs-todo-text" class="todo is-loading"></div>' +
    '</body></html>',
);
const g = globalThis as unknown as {
  document: Document;
  HTMLButtonElement?: unknown;
  HTMLAnchorElement?: unknown;
  HTMLElement?: unknown;
};
g.document = window.document as unknown as Document;
// elements.ts 用 instanceof 判元素类型：这些构造器挂在 linkedom 的 window 上，不在 Node 全局
g.HTMLButtonElement = window.HTMLButtonElement;
g.HTMLAnchorElement = window.HTMLAnchorElement;
g.HTMLElement = window.HTMLElement;

const { renderTodo } = await import('../entrypoints/popup/todo.ts');
const { renderZhsTodo } = await import('../entrypoints/popup/zhihuishu-todo.ts');

function resetArea(id: string): void {
  const el = (globalThis as unknown as { document: Document }).document.getElementById(id);
  el?.replaceChildren();
  el?.classList.add('is-loading');
}

function textOf(id: string): string {
  const document = (globalThis as unknown as { document: Document }).document;
  return document.getElementById(id)?.textContent ?? '';
}

beforeEach(() => {
  resetArea('todo-text');
  resetArea('zhs-todo-text');
  for (const fn of Object.values(bridge)) fn.mockReset();
  bridge.getSettings.mockResolvedValue({
    mooc: { courses: [{ enabled: true }] },
    zhihuishu: { courses: [{ enabled: true }] },
  });
});

describe('待办区的取数出口', () => {
  it('慕课：会话读取 reject 时待办区说「读取失败」', async () => {
    bridge.getSession.mockRejectedValueOnce(new Error('后台断了'));
    await renderTodo();
    expect(textOf('todo-text')).toContain('读取失败：后台断了');
  });

  it('智慧树：会话读取 reject 时待办区说「读取失败」', async () => {
    bridge.getZhsSession.mockRejectedValueOnce(new Error('后台断了'));
    await renderZhsTodo();
    expect(textOf('zhs-todo-text')).toContain('读取失败：后台断了');
  });
});

/*
 * 两个平台卡头状态行：每一个出口都要撤掉骨架。
 *
 * 这里只钉「骨架不留」这一件事——它曾经在三条早退路径上漏过，后来补了第四条
 * （消息通道 reject）。两家各有一份实现，因此两边都钉。
 */

import { parseHTML } from 'linkedom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const bridge = vi.hoisted(() => ({
  getSession: vi.fn(async () => ({ loggedIn: true })),
  getSettings: vi.fn(async () => ({ mooc: { courses: [{ enabled: true }] }, zhihuishu: { courses: [{ enabled: true }, { enabled: false }] } })),
  getCourseware: vi.fn(),
  getZhsSession: vi.fn(async () => ({ loggedIn: true })),
  getZhsCourseTasks: vi.fn(),
}));

vi.mock('../src/ui-bridge.ts', () => bridge);

const { renderStatusLine } = await import('../entrypoints/options/status-line.ts');
const { renderZhsStatusLine } = await import('../entrypoints/options/zhihuishu-status-line.ts');

function mount(): void {
  const { document } = parseHTML(
    '<!doctype html><html><body>' +
      '<div id="session-text" class="is-loading"></div>' +
      '<div id="zhs-session-text" class="is-loading"></div>' +
      '</body></html>',
  );
  (globalThis as unknown as { document: Document }).document = document as unknown as Document;
}

function el(id: string): HTMLElement {
  const document = (globalThis as unknown as { document: Document }).document;
  return document.getElementById(id) as unknown as HTMLElement;
}

beforeEach(() => {
  mount();
  bridge.getCourseware.mockReset().mockResolvedValue({
    status: 'ok',
    value: { pending: { auto: 2, manual: 1 }, courses: [] },
  });
  bridge.getZhsCourseTasks.mockReset().mockResolvedValue({
    status: 'ok',
    value: { pendingTotal: 7 },
  });
});

describe('慕课卡头状态行的骨架', () => {
  it('读课程进度失败（reject）时保留本地事实，并撤掉骨架', async () => {
    bridge.getCourseware.mockRejectedValueOnce(new Error('后台断了'));
    await renderStatusLine();
    expect(el('session-text').textContent).toBe('已登录 · 1 门课程参与');
    expect(el('session-text').classList.contains('is-loading')).toBe(false);
  });

  it('读成功时写出数字并撤掉骨架', async () => {
    await renderStatusLine();
    expect(el('session-text').textContent).toBe('已登录 · 1 门课程参与 · 待交 3 项 · 课件已完成');
    expect(el('session-text').classList.contains('is-loading')).toBe(false);
  });

  it('未登录时卡头空白，骨架同样撤掉', async () => {
    bridge.getSession.mockResolvedValueOnce({ loggedIn: false });
    await renderStatusLine();
    expect(el('session-text').textContent).toBe('');
    expect(el('session-text').classList.contains('is-loading')).toBe(false);
  });
});

describe('智慧树卡头状态行的骨架', () => {
  it('读课程任务失败（reject）时保留本地事实，并撤掉骨架', async () => {
    bridge.getZhsCourseTasks.mockRejectedValueOnce(new Error('后台断了'));
    await renderZhsStatusLine();
    expect(el('zhs-session-text').textContent).toBe('已登录 · 1 门课程参与');
    expect(el('zhs-session-text').classList.contains('is-loading')).toBe(false);
  });

  it('读成功时写出数字并撤掉骨架', async () => {
    await renderZhsStatusLine();
    expect(el('zhs-session-text').textContent).toBe('已登录 · 1 门课程参与 · 可代为完成 7 项');
    expect(el('zhs-session-text').classList.contains('is-loading')).toBe(false);
  });
});

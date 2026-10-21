/*
 * 账号与课程卡头的状态行：每一个出口都要撤掉骨架。
 *
 * 这里只钉「骨架不留」这一件事——它曾经在三条早退路径上漏过，现在补了第四条
 * （消息通道 reject）。文案内容由界面自己决定，不在这条测试的责任里。
 */

import { parseHTML } from 'linkedom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const bridge = vi.hoisted(() => ({
  getSession: vi.fn(async () => ({ loggedIn: true })),
  getSettings: vi.fn(async () => ({ mooc: { courses: [{ enabled: true }] } })),
  getCourseware: vi.fn(async () => ({ status: 'ok' as const, value: { pending: { auto: 2, manual: 1 }, courses: [] } })),
}));

vi.mock('../src/ui-bridge.ts', () => bridge);

const { renderStatusLine } = await import('../entrypoints/options/status-line.ts');

function mount(): HTMLElement {
  const { document } = parseHTML('<!doctype html><html><body><div id="session-text" class="is-loading"></div></body></html>');
  (globalThis as unknown as { document: Document }).document = document as unknown as Document;
  return document.getElementById('session-text') as unknown as HTMLElement;
}

beforeEach(() => {
  bridge.getSession.mockClear();
  bridge.getSettings.mockClear();
  bridge.getCourseware.mockClear();
  bridge.getCourseware.mockResolvedValue({
    status: 'ok',
    value: { pending: { auto: 2, manual: 1 }, courses: [] },
  });
});

describe('状态行的骨架', () => {
  it('读课程进度失败（reject）时保留本地事实，并撤掉骨架', async () => {
    const el = mount();
    bridge.getCourseware.mockRejectedValueOnce(new Error('后台断了'));
    await renderStatusLine();
    expect(el.textContent).toBe('已登录 · 1 门课程参与');
    expect(el.classList.contains('is-loading')).toBe(false);
  });

  it('读成功时写出数字并撤掉骨架', async () => {
    const el = mount();
    await renderStatusLine();
    expect(el.textContent).toBe('已登录 · 1 门课程参与 · 待交 3 项 · 课件已完成');
    expect(el.classList.contains('is-loading')).toBe(false);
  });

  it('未登录时卡头空白，骨架同样撤掉', async () => {
    const el = mount();
    bridge.getSession.mockResolvedValueOnce({ loggedIn: false });
    await renderStatusLine();
    expect(el.textContent).toBe('');
    expect(el.classList.contains('is-loading')).toBe(false);
  });
});

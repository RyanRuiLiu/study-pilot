/*
 * 平台 tab 的初始落点：记忆值优先，读不到记忆时落在第一个 tab。
 *
 * 读记忆是一次消息往返；通道断（后台重启）时是 reject。没有出口的话
 * 整个 initTabs 抛出，页面停在「哪个 tab 都没选中」的状态。
 */

import { parseHTML } from 'linkedom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const bridge = vi.hoisted(() => ({
  getSettings: vi.fn(),
  updateSettings: vi.fn(async () => undefined),
}));

vi.mock('../src/ui-bridge.ts', () => bridge);

const window = parseHTML(
  '<!doctype html><html><body>' +
    '<div id="tabs">' +
    '<button class="tab" data-tab="mooc" role="tab" aria-selected="false" tabindex="-1"></button>' +
    '<button class="tab" data-tab="zhihuishu" role="tab" aria-selected="false" tabindex="-1"></button>' +
    '</div>' +
    '<section id="panel-mooc"></section><section id="panel-zhihuishu" hidden></section>' +
    '</body></html>',
);
(globalThis as unknown as { document: Document }).document = window.document as unknown as Document;

const { initTabs } = await import('../src/ui/tabs.ts');

function doc(): Document {
  return (globalThis as unknown as { document: Document }).document;
}

function selected(): string | null {
  return doc().querySelector('.tab[aria-selected="true"]')?.getAttribute('data-tab') ?? null;
}

beforeEach(() => {
  bridge.getSettings.mockReset();
  bridge.updateSettings.mockReset().mockResolvedValue(undefined);
});

describe('tab 初始落点', () => {
  it('读记忆失败：落在第一个 tab，页面照常可用', async () => {
    bridge.getSettings.mockRejectedValueOnce(new Error('后台断了'));
    await initTabs();
    expect(selected()).toBe('mooc');
    expect(doc().getElementById('panel-mooc')?.hasAttribute('hidden')).toBe(false);
  });

  it('有记忆值时回到那一页（并让它的面板可见）', async () => {
    bridge.getSettings.mockResolvedValueOnce({ ui: { activeTab: 'zhihuishu' } });
    await initTabs();
    expect(selected()).toBe('zhihuishu');
    expect(doc().getElementById('panel-zhihuishu')?.hasAttribute('hidden')).toBe(false);
  });

  it('点已经选中的 tab：不重跑钩子，也不重复写记忆', async () => {
    bridge.getSettings.mockResolvedValueOnce({ ui: { activeTab: 'mooc' } });
    const onActivate = vi.fn();
    await initTabs({ onActivate });
    expect(onActivate).toHaveBeenCalledTimes(1);

    const active = doc().querySelector<HTMLElement>('.tab[data-tab="mooc"]');
    active?.dispatchEvent(new window.Event('click', { bubbles: true }));

    expect(onActivate).toHaveBeenCalledTimes(1);
    expect(bridge.updateSettings).not.toHaveBeenCalled();
  });
});

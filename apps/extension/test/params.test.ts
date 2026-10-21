/*
 * 设置页「任务与参数」的写失败：评语与 AI 三项都要说出来。
 *
 * 改动即保存；失败不回滚（输入框保留原字），但必须让人知道「没存上」——
 * 否则以为已保存的评语不会出现在下一次互评里，AI 配置也在原地踏步。
 */

import { parseHTML } from 'linkedom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const bridge = vi.hoisted(() => ({
  getSettings: vi.fn(),
  updateSettings: vi.fn(),
}));

vi.mock('../src/ui-bridge.ts', () => bridge);

const window = parseHTML(
  '<!doctype html><html><body>' +
    '<input id="review-comment" />' +
    '<input id="ai-enabled" type="checkbox" />' +
    '<input id="ai-model" />' +
    '<input id="ai-api-key" />' +
    '<span id="ai-status"></span>' +
    '<div id="toast"></div>' +
    '</body></html>',
);
const g = globalThis as unknown as {
  document: Document;
  window?: unknown;
  HTMLInputElement?: unknown;
  HTMLButtonElement?: unknown;
  HTMLAnchorElement?: unknown;
  HTMLElement?: unknown;
};
g.document = window.document as unknown as Document;
g.window = window;
g.HTMLInputElement = window.HTMLInputElement;
g.HTMLButtonElement = window.HTMLButtonElement;
g.HTMLAnchorElement = window.HTMLAnchorElement;
g.HTMLElement = window.HTMLElement;

const { initToast } = await import('../entrypoints/options/toast.ts');
const { renderParams } = await import('../entrypoints/options/params.ts');

const SETTINGS = {
  ai: { enabled: false, model: 'glm-4-flash', apiKey: 'k' },
  mooc: { reviewComment: '默认评语', courses: [], keepOverdueDays: 3 },
};

function doc(): Document {
  return (globalThis as unknown as { document: Document }).document;
}

beforeEach(() => {
  initToast(doc().getElementById('toast') as unknown as HTMLElement);
  for (const fn of Object.values(bridge)) fn.mockReset();
  bridge.getSettings.mockResolvedValue(SETTINGS);
  bridge.updateSettings.mockResolvedValue(SETTINGS);
});

describe('设置页的写失败', () => {
  it('读配置失败：状态位说「读取设置失败」', async () => {
    bridge.getSettings.mockRejectedValueOnce(new Error('后台断了'));
    await renderParams();
    expect(doc().getElementById('ai-status')?.textContent).toContain('读取设置失败');
  });

  it('评语保存失败：提示「未能保存评语」', async () => {
    await renderParams();
    bridge.updateSettings.mockRejectedValueOnce(new Error('存储写不进去'));
    const comment = doc().getElementById('review-comment') as unknown as HTMLInputElement;
    comment.value = '新评语';
    comment.dispatchEvent(new window.Event('change'));
    await vi.waitFor(() =>
      expect(doc().getElementById('toast')?.textContent).toContain('未能保存评语'),
    );
  });

  it('AI 设置保存失败：状态位说「未能保存 AI 设置」', async () => {
    await renderParams();
    bridge.updateSettings.mockRejectedValueOnce(new Error('存储写不进去'));
    const enabled = doc().getElementById('ai-enabled') as unknown as HTMLInputElement;
    enabled.checked = true;
    enabled.dispatchEvent(new window.Event('change'));
    await vi.waitFor(() =>
      expect(doc().getElementById('ai-status')?.textContent).toContain('未能保存 AI 设置'),
    );
  });
});

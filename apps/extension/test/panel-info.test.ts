/*
 * 面板信息行：取不到就不显示，且不落成未处理异常。
 *
 * 信息行只是附加信息（总分）；它由内容脚本在每次 DOM 变化时触发一次，
 * 消息通道断掉时若让 reject 穿出去，就是一个没人处理的异常。
 */

import { parseHTML } from 'linkedom';
import { describe, expect, it, vi } from 'vitest';

const data = vi.hoisted(() => ({
  loadQuizInfo: vi.fn(),
  loadFillAnswers: vi.fn(),
}));
vi.mock('../src/features/mooc/quiz/data.ts', () => data);

const window = parseHTML('<!doctype html><html><body></body></html>');
const g = globalThis as unknown as {
  document: Document;
  window?: unknown;
  HTMLElement?: unknown;
  HTMLButtonElement?: unknown;
};
g.document = window.document as unknown as Document;
g.window = window;
g.HTMLElement = window.HTMLElement;
g.HTMLButtonElement = window.HTMLButtonElement;

const { createActivePanel, loadPanelInfo, retargetPanel } = await import(
  '../src/features/mooc/quiz/panel.ts'
);

function panel() {
  return createActivePanel({ termId: 1, quizId: 2 }, { onFill: () => undefined, onSubmit: () => undefined });
}

describe('面板信息行', () => {
  it('取数 reject：保持占位为空，函数正常返回', async () => {
    data.loadQuizInfo.mockRejectedValueOnce(new Error('后台断了'));
    const p = panel();
    await expect(loadPanelInfo(p)).resolves.toBeUndefined();
    expect(p.infoSlot.textContent).toBe('');
  });

  it('取到总分就写进占位', async () => {
    data.loadQuizInfo.mockResolvedValueOnce({ totalScore: 100 });
    const p = panel();
    await loadPanelInfo(p);
    expect(p.infoSlot.textContent).toContain('总分：');
    expect(p.infoSlot.textContent).toContain('100 分');
  });

  it('换到另一份测验：清掉旧卷的总分，重新取新的', async () => {
    data.loadQuizInfo.mockResolvedValueOnce({ totalScore: 100 });
    const p = panel();
    await loadPanelInfo(p);
    expect(p.infoSlot.textContent).toContain('100 分');

    data.loadQuizInfo.mockResolvedValueOnce({ totalScore: 50 });
    retargetPanel(p, { termId: 1, quizId: 3 });
    expect(p.infoSlot.textContent).toBe('');

    await loadPanelInfo(p);
    expect(p.infoSlot.textContent).toContain('50 分');
  });
});

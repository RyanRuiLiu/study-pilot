/*
 * 填充的反馈与「换卷」边界。
 *
 * 两件都在界面上看不出来、但会误导用户的事：
 *   - 正确项已经选中时再点填充，原先报「已选中 0 项」——像什么都没发生；
 *   - 取答案期间换了测验，旧卷的答案不该点进新页面。
 */

import { parseHTML } from 'linkedom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

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
  HTMLInputElement?: unknown;
};
g.document = window.document as unknown as Document;
g.window = window;
g.HTMLElement = window.HTMLElement;
g.HTMLButtonElement = window.HTMLButtonElement;
g.HTMLInputElement = window.HTMLInputElement;

const { createActivePanel, retargetPanel } = await import('../src/features/mooc/quiz/panel.ts');
const { fill } = await import('../src/features/mooc/quiz/actions.ts');

function panel() {
  return createActivePanel({ termId: 1, quizId: 2 }, { onFill: () => undefined, onSubmit: () => undefined });
}

function mountQuestion(checked: boolean): HTMLInputElement {
  const document = (globalThis as unknown as { document: Document }).document;
  const item = document.createElement('div');
  item.className = 'u-questionItem';
  const input = document.createElement('input');
  input.type = 'radio';
  input.id = 'op_1_101';
  input.name = 'op_1';
  input.checked = checked;
  item.append(input);
  document.body.append(item);
  return input;
}

function deferred<T>(): { promise: Promise<T>; resolve: (value: T) => void } {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((ok) => {
    resolve = ok;
  });
  return { promise, resolve };
}

beforeEach(() => {
  const document = (globalThis as unknown as { document: Document }).document;
  document.body.replaceChildren();
  data.loadQuizInfo.mockReset();
  data.loadFillAnswers.mockReset();
});

describe('填充的反馈', () => {
  it('正确项本来就是选中状态：如实说「原本已选」，而不是 0 项', async () => {
    const p = panel();
    mountQuestion(true);
    data.loadFillAnswers.mockResolvedValueOnce({
      ok: true,
      value: { options: new Map([['101', true]]), blanks: [] },
    });

    await fill(p);

    expect(p.handle.root.textContent).toContain('已选中 1 项');
    expect(p.handle.root.textContent).toContain('其中 1 项原本已选');
  });
});

describe('取答案期间换卷', () => {
  it('结果回来时已换卷：不点任何选项，也不报「已选中」', async () => {
    const p = panel();
    const input = mountQuestion(false);
    const answers = deferred<{ ok: true; value: { options: Map<string, boolean>; blanks: string[] } }>();
    data.loadFillAnswers.mockReturnValueOnce(answers.promise);

    const pending = fill(p);
    retargetPanel(p, { termId: 1, quizId: 3 });
    answers.resolve({ ok: true, value: { options: new Map([['101', true]]), blanks: [] } });
    await pending;

    expect(input.checked).toBe(false);
    expect(p.handle.root.textContent).not.toContain('已选中');
  });
});

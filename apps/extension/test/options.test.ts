/*
 * 页面选项识别。
 *
 * input 的 id 形如 `op_<题id>_<选项id><加载时间戳>`，尾串每次刷新都会变；
 * 选项 id 就是要在题库/卷面索引里查的那个键，认错一位就会点错选项，
 * 因此把真实取样过的几种形状都钉住。
 */

import { parseHTML } from 'linkedom';
import { beforeEach, describe, expect, it } from 'vitest';
import { collectQuestions, optionIdOf } from '../src/features/mooc/quiz/options.ts';

function mount(body: string): void {
  const { document } = parseHTML(`<!doctype html><html><body>${body}</body></html>`);
  (globalThis as unknown as { document: Document }).document = document as unknown as Document;
}

function inputAt(index: number): HTMLInputElement {
  const document = (globalThis as unknown as { document: Document }).document;
  const all = Array.from(document.querySelectorAll<HTMLInputElement>('input'));
  const node = all[index];
  if (!node) throw new Error(`没有第 ${index + 1} 个 input`);
  return node;
}

beforeEach(() => {
  mount(`
    <div class="u-questionItem">
      <input type="radio" id="op_3373000000_2600000000000011792175000000" name="op_33730000001792175000000">
      <input type="radio" id="op_3373000000_3600000000000021792175000000" name="op_33730000001792175000000">
    </div>
    <div class="u-questionItem">
      <input type="checkbox" id="op_3373000001_2600000000000031792175000001" name="op_33730000011792175000001">
    </div>
  `);
});

describe('optionIdOf', () => {
  it('从 id 里剥掉加载时间戳，得到选项 id', () => {
    expect(optionIdOf(inputAt(0))).toBe('260000000000001');
    expect(optionIdOf(inputAt(1))).toBe('360000000000002');
    expect(optionIdOf(inputAt(2))).toBe('260000000000003');
  });

  it('格式不是 op_ 开头时返回 null，不猜', () => {
    mount('<div class="u-questionItem"><input type="radio" id="q1_a"></div>');
    expect(optionIdOf(inputAt(0))).toBeNull();
  });
});

describe('collectQuestions', () => {
  it('识别填空题的 textarea 作答控件（它不是 input）', () => {
    mount(`
      <div class="m-FillBlank u-questionItem">
        <div class="j-answer">
          <div class="u-baseinputui"><textarea class="j-textarea inputtxt"></textarea></div>
        </div>
      </div>
    `);

    const questions = collectQuestions();

    expect(questions).toHaveLength(1);
    expect(questions[0]!.inputs).toHaveLength(0);
    // blank 存的是待填的控件本身（后续填充要它），不是值
    expect((questions[0]!.blank as HTMLElement).tagName).toBe('TEXTAREA');
  });

  it('两种控件都没有的题目（如主观题）不收集', () => {
    mount('<div class="u-questionItem"><div class="j-richTxt">试述…</div></div>');
    expect(collectQuestions()).toHaveLength(0);
  });

  it('按 DOM 顺序收集有输入控件的题目，跳过没有的', () => {
    mount(`
      <div class="u-questionItem"></div>
      <div class="u-questionItem">
        <input type="radio" id="op_1_1011700000000000" name="op_11700000000000">
      </div>
    `);

    const questions = collectQuestions();

    expect(questions).toHaveLength(1);
    expect(questions[0]!.inputs).toHaveLength(1);
    expect(optionIdOf(questions[0]!.inputs[0]!)).toBe('101');
  });
});

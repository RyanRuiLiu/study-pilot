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
      <input type="radio" id="op_3373856520_2604308845837051792175000000" name="op_33738565201792175000000">
      <input type="radio" id="op_3373856520_3604308845837051792175000000" name="op_33738565201792175000000">
    </div>
    <div class="u-questionItem">
      <input type="checkbox" id="op_3373856521_2604308845837061792175000001" name="op_33738565211792175000001">
    </div>
  `);
});

describe('optionIdOf', () => {
  it('从 id 里剥掉加载时间戳，得到选项 id', () => {
    expect(optionIdOf(inputAt(0))).toBe('260430884583705');
    expect(optionIdOf(inputAt(1))).toBe('360430884583705');
    expect(optionIdOf(inputAt(2))).toBe('260430884583706');
  });

  it('格式不是 op_ 开头时返回 null，不猜', () => {
    mount('<div class="u-questionItem"><input type="radio" id="q1_a"></div>');
    expect(optionIdOf(inputAt(0))).toBeNull();
  });
});

describe('collectQuestions', () => {
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

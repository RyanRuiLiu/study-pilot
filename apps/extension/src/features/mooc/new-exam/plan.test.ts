/*
 * 填充计划纯函数：卷面顺序 + 答案映射 → 点击步骤。
 *
 * 形状取自真机（2026-11-08 期中测试 getPaper + 填充索引，留痕
 * .probe/newexam-live/），值已换成合成样例。位次映射是这条链唯一的
 * 新判据：第 i 道客观题的第 j 个选项 = 页面该题第 j 个选项块。
 */

import { describe, expect, it } from 'vitest';
import { buildFillPlan } from './plan.ts';

describe('buildFillPlan', () => {
  it('按位次产出点击步骤；覆盖数与客观题数分开计', () => {
    const questions = [
      { type: 1, optionIds: [111, 112, 113, 114] }, // 单选
      { type: 1, optionIds: [211, 212, 213, 214] },
      { type: 4, optionIds: [311, 312] }, // 判断
      { type: 10, optionIds: [] }, // 主观：无选项，不进计划
    ];
    const plan = buildFillPlan(questions, {
      '113': true, // 第1题选 C（第3个）
      '214': true, // 第2题选 D
      '311': true, // 第3题选 A
    });

    expect(plan).toEqual({
      steps: [
        { questionIndex: 0, optionIndex: 2 },
        { questionIndex: 1, optionIndex: 3 },
        { questionIndex: 2, optionIndex: 0 },
      ],
      covered: 3,
      objective: 3,
    });
  });

  it('映射里没有的题不进计划（covered 不虚计）', () => {
    const plan = buildFillPlan(
      [{ type: 1, optionIds: [111, 112] }, { type: 1, optionIds: [211, 212] }],
      { '211': true },
    );
    expect(plan.steps).toEqual([{ questionIndex: 1, optionIndex: 0 }]);
    expect(plan.covered).toBe(1);
    expect(plan.objective).toBe(2);
  });

  it('全空映射：零步骤、零覆盖，客观题数照实', () => {
    const plan = buildFillPlan([{ type: 1, optionIds: [111, 112] }], {});
    expect(plan).toEqual({ steps: [], covered: 0, objective: 1 });
  });
});

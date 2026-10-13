/*
 * 选项 id 的还原。
 *
 * 页面上的 input id 形如 `op_<题id>_<选项id><加载时间戳>`，尾串每次刷新都变。
 * 还原错了不是显示问题——它会让「填充答案」选中错误的选项，而症状要到提交后
 * 看到分数才知道。因此这里把三种形态都钉住：尾串存在、缺失、以及不该被识别
 * 的输入。
 */

import { describe, expect, it } from 'vitest';
import { optionIdOf } from '../src/features/mooc/quiz/options';

/** optionIdOf 只读 id 与 name，因此用普通对象即可，不需要 DOM。 */
const input = (id: string, name: string) => ({ id, name }) as HTMLInputElement;

/** 按页面的构成规则拼出 id 与 name：尾串只出现在 id 里。 */
function optionInput(questionId: string, optionId: string, stamp: string) {
  return input(`op_${questionId}_${optionId}${stamp}`, `op_${questionId}${stamp}`);
}

describe('optionIdOf', () => {
  it('按 name 与 id 的差异剥掉加载时间戳', () => {
    expect(optionIdOf(optionInput('12345', '67891', '1730000000000'))).toBe('67891');
  });

  it('选项 id 与时间戳都由数字组成时仍然正确', () => {
    // 两个数字段首尾相接，无法靠「非数字」切分——必须靠 name 的差异
    expect(optionIdOf(optionInput('1', '2', '3'))).toBe('2');
  });

  it('尾串不存在时原样取选项段', () => {
    expect(optionIdOf(input('op_12345_67891', 'op_12345'))).toBe('67891');
  });

  it('name 与 id 不匹配时不猜尾串，整段当选项 id', () => {
    // name 不是 id 的前缀：无法判断尾串，宁可不剥
    expect(optionIdOf(input('op_12345_67891', 'op_99999'))).toBe('67891');
  });

  it('不是选项输入（前缀不符）时返回 null', () => {
    expect(optionIdOf(input('answer_12345', 'answer_12345'))).toBeNull();
    expect(optionIdOf(input('', ''))).toBeNull();
  });

  it('缺少选项段的格式返回 null', () => {
    expect(optionIdOf(input('op_12345', 'op_12345'))).toBeNull();
    expect(optionIdOf(input('op_12345_', 'op_12345'))).toBeNull();
    expect(optionIdOf(input('op__67891', 'op_'))).toBeNull();
  });
});

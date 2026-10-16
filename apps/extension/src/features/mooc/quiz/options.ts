/*
 * 页面侧：收集可作答的题目、识别选项 id。
 *
 * 纯 DOM 与字符串逻辑，不碰接口，因此可以单独测。
 *
 * 两种作答控件（实测 2026-10-17，军事理论单元测验）：
 *   选择类（单选/多选/判断）——input[type=radio|checkbox]，选项 id 在 input 的 id 里；
 *   填空类——一个 textarea（class 为 j-textarea inputtxt，父级 u-baseinputui；
 *     平台新式分块里的填空组件也是 Input.TextArea）。填空题没有选项 id，
 *     答案只能按题目在卷面中的显示顺序对（见 actions.ts 的填充）。
 */

/** 选项输入框。用元素类型限定，不依赖类名。 */
const OPTION_SELECTOR = 'input[type=radio], input[type=checkbox]';

/** 填空题的作答控件。用元素类型限定，不依赖类名。 */
const BLANK_SELECTOR = 'textarea';

export interface PageQuestion {
  /** 选择类的选项控件；填空题为空数组 */
  inputs: HTMLInputElement[];
  /** 填空题的作答控件；选择类为 null */
  blank: HTMLTextAreaElement | null;
}

/** 收集页面上可作答的题目，保持 DOM 顺序。 */
export function collectQuestions(): PageQuestion[] {
  const questions: PageQuestion[] = [];

  for (const item of document.querySelectorAll('.u-questionItem')) {
    const inputs = Array.from(item.querySelectorAll<HTMLInputElement>(OPTION_SELECTOR));
    const blank = item.querySelector<HTMLTextAreaElement>(BLANK_SELECTOR);
    // 两种控件都没有的题目（如主观题）不收集
    if (inputs.length === 0 && blank === null) continue;
    questions.push({ inputs, blank });
  }

  return questions;
}

/**
 * 从页面选项元素提取选项 id。
 *
 * input id 形如 `op_<题id>_<选项id><加载时间戳>`，尾串每次刷新都会变。
 * 通过同题选项的 `name`（等于 `op_<题id><尾串>`）与 `id` 的差异把它剥掉，
 * 因此不需要假设尾串的长度或内容。
 */
export function optionIdOf(input: HTMLInputElement): string | null {
  const { id, name } = input;
  if (!id.startsWith('op_')) return null;

  const rest = id.slice(3);
  const separator = rest.indexOf('_');
  if (separator <= 0) return null;

  const questionId = rest.slice(0, separator);
  let optionPart = rest.slice(separator + 1);

  const namePrefix = `op_${questionId}`;
  const suffix = name.startsWith(namePrefix) ? name.slice(namePrefix.length) : '';
  if (suffix.length > 0 && optionPart.endsWith(suffix)) {
    optionPart = optionPart.slice(0, -suffix.length);
  }

  return optionPart.length > 0 ? optionPart : null;
}

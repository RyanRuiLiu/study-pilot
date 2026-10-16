/*
 * 页面侧：收集可作答的题目、识别选项 id。
 *
 * 纯 DOM 与字符串逻辑，不碰接口，因此可以单独测。
 */

/** 选项输入框。用元素类型限定，不依赖类名。 */
const OPTION_SELECTOR = 'input[type=radio], input[type=checkbox]';

export interface PageQuestion {
  inputs: HTMLInputElement[];
}

/** 收集页面上可作答的题目，保持 DOM 顺序。 */
export function collectQuestions(): PageQuestion[] {
  const questions: PageQuestion[] = [];

  for (const item of document.querySelectorAll('.u-questionItem')) {
    const inputs = Array.from(item.querySelectorAll<HTMLInputElement>(OPTION_SELECTOR));
    if (inputs.length === 0) continue;
    questions.push({ inputs });
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

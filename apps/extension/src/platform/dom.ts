/*
 * 页面元素的取值。
 *
 * 入口脚本要用的容器元素由同目录的 html 提供，两边是一对。
 * 取不到就说明构建产物与模板对不上，此时立刻抛错比让后面每一行都去猜
 * null 更直接：报错点就是断链的那一处。
 *
 * 可选元素（没有也能继续跑）不走这里，仍然用 querySelector + 判空。
 */

/** 按选择器取必需元素；取不到立即抛错。 */
export function required<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`页面缺少元素：${selector}`);
  return element;
}

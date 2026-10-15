/*
 * 设置页列表区的一句说明（唯一实现）。
 *
 * courses 与 courseware 原先各写了一份逐字相同的 note()——同一件事
 * 两份实现，改一处漏一处只是时间问题；合成这一份，两处都从这里取。
 */

/** 一句说明；error 为真时用警示色（读取失败如实说）。 */
export function note(text: string, error = false): HTMLElement {
  const el = document.createElement('p');
  el.className = error ? 'note is-error' : 'note';
  el.textContent = text;
  return el;
}

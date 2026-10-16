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

/**
 * 「未登录」那一句 ＋ 去登录的按钮。
 *
 * 与弹窗的 `loginPrompt` 同一手法、同一措辞（`前往登录`）：**光给一句话等于让
 * 用户自己猜去哪儿登录**——而这里恰恰是他除了登录什么都做不了的状态，
 * 更该把入口直接递到手上。
 */
export function loginNote(text: string, href: string): HTMLElement[] {
  const link = document.createElement('a');
  link.className = 'btn';
  link.href = href;
  link.target = '_blank';
  link.rel = 'noreferrer';
  link.textContent = '前往登录';
  return [note(text), link];
}

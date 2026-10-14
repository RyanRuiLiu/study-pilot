/*
 * 弹窗引用的元素集中一处：各模块不各自 getElementById，
 * 元素 id 改名时只有这里要跟。
 */

export const stateEl = document.getElementById('state-text');
export const todoEl = document.getElementById('todo-text') as HTMLElement;
export const runBtn = document.getElementById('run-now') as HTMLButtonElement | null;
export const settingsBtn = document.getElementById('open-settings');

/** 写一行文本；状态行为空时收起——它占一整行，空着会多出一条空白带。 */
export function setText(el: HTMLElement | null, text: string): void {
  if (!el) return;
  el.textContent = text;
  if (el === stateEl) el.classList.toggle('f-dn', text === '');
}

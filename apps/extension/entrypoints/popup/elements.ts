/*
 * 弹窗引用的元素集中一处：各模块不各自 getElementById，
 * 元素 id 改名时只有这里要跟。
 */

export const stateEl = document.getElementById('state-text');
export const stateLine = document.getElementById('state-line');
export const stopBtn = document.getElementById('stop-run') as HTMLButtonElement | null;
export const todoEl = document.getElementById('todo-text') as HTMLElement;
export const runBtn = document.getElementById('run-now') as HTMLButtonElement | null;
export const settingsBtn = document.getElementById('open-settings');

/** 写一行文本；状态行没有内容时整行收起（零高），有内容时滑开——见 style.css 里 .state 的说明。 */
export function setText(el: HTMLElement | null, text: string): void {
  if (!el) return;
  el.textContent = text;
  if (el === stateEl) stateLine?.classList.toggle('is-blank', text === '');
}

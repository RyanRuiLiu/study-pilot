/*
 * 弹窗引用的元素集中一处：各模块不各自 getElementById，
 * 元素 id 改名时只有这里要跟。
 */

/** 按 id 取按钮；取不到或不是按钮就是 null——不拿 `as` 硬断类型。 */
function button(id: string): HTMLButtonElement | null {
  const el = document.getElementById(id);
  return el instanceof HTMLButtonElement ? el : null;
}

export const stateEl = document.getElementById('state-text');
export const stateLine = document.getElementById('state-line');
export const stopBtn = button('stop-run');
/** 失败的「下一步」动作位（平台在错误上附带 action 时现身，见 status.ts）。 */
export const stateActionEl =
  document.getElementById('state-action') instanceof HTMLAnchorElement
    ? (document.getElementById('state-action') as HTMLAnchorElement)
    : null;
export const todoEl = document.getElementById('todo-text');
export const zhsTodoEl = document.getElementById('zhs-todo-text');
export const runBtn = button('run-now');
export const settingsBtn = document.getElementById('open-settings');

/**
 * 写一行文本；状态行没有内容时整行收起（零高），有内容时滑开——见 style.css 里 .state 的说明。
 * 同时把全文挂到 title：进度句单行省略、长出错句折行，悬停都能看全。
 */
export function setText(el: HTMLElement | null, text: string): void {
  if (!el) return;
  el.textContent = text;
  el.title = text;
  if (el === stateEl) stateLine?.classList.toggle('is-blank', text === '');
}

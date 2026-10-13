/*
 * 弹窗里的元素引用与一处文案写入。
 *
 * 元素由同一个 `index.html` 提供。集中在这里的理由与"一处来源"相同：
 * 多个模块各自 `getElementById` 时，改了 id 就要全仓库搜一遍。
 * 版本号也在这里写入：取自 manifest，避免两处各写一份而不同步。
 */

export const stateEl = document.getElementById('state-text');
export const todoEl = document.getElementById('todo-text') as HTMLElement;
export const runBtn = document.getElementById('run-now') as HTMLButtonElement | null;
export const settingsBtn = document.getElementById('open-settings');

const versionEl = document.getElementById('version');
if (versionEl) versionEl.textContent = `v${browser.runtime.getManifest().version}`;

export function setText(el: HTMLElement | null, text: string): void {
  if (!el) return;
  el.textContent = text;
  // 状态行空着时不占位：它是一行独立元素，占着会多出一条空白带
  if (el === stateEl) el.classList.toggle('f-dn', text === '');
}

/*
 * 平台 tab 条的行为——设置页与弹窗共用一份（长相在 components.css）。
 *
 * 三件事：
 *   记忆——打开回到上次停留的 tab（settings.ui.activeTab，随切随写）；
 *   按需——只有「第一次切到」才让所属页面去取数（通用零请求、智慧树占位）；
 *   无障碍——W3C APG 的 tabs 模式：role=tablist/tab/tabpanel（在各方 HTML 里）、
 *   roving tabindex、←/→/Home/End。
 *
 * 取数钩子由入口传进来（本文件不认识 courses/courseware，只管 tab）。
 * 记忆值在页面上不存在时（弹窗没有「通用」）回落到第一个 tab——
 * 这就是规格 13.2 里「落到 general 按 mooc 处理」的实现。
 */

import { getSettings, updateSettings } from '../ui-bridge';

export type TabId = 'general' | 'mooc' | 'zhihuishu';

const TAB_IDS: readonly string[] = ['general', 'mooc', 'zhihuishu'];

function isTabId(value: string | undefined): value is TabId {
  return value !== undefined && TAB_IDS.includes(value);
}

export interface TabsHooks {
  /** 某 tab 第一次成为当前 tab（取数的时机；通用与智慧树没有要取的数） */
  onFirstActivate?: (id: TabId) => void;
  /** 每次切换都调用（如弹窗按 tab 更新「全部执行」的可用性） */
  onActivate?: (id: TabId) => void;
}

/** 装配 tab 条。DOM 约定：`.tabs > .tab[data-tab]` 与 `#panel-<id>[data-tab]`。 */
export async function initTabs(hooks: TabsHooks = {}): Promise<void> {
  const tabsEl = document.getElementById('tabs');
  if (tabsEl === null) return;

  const tabs = Array.from(tabsEl.querySelectorAll<HTMLButtonElement>('.tab'));
  const firstTab = tabs[0];
  if (firstTab === undefined) return;
  const first = firstTab.dataset.tab;
  // DOM 约定（data-tab）被破坏时不猜：没有可激活的 tab 就什么都不做
  if (!isTabId(first)) return;

  const panels = new Map<TabId, HTMLElement>();
  for (const tab of tabs) {
    const id = tab.dataset.tab;
    if (!isTabId(id)) continue;
    const panel = document.getElementById(`panel-${id}`);
    if (panel !== null) panels.set(id, panel);
  }

  /** 已经取过数的 tab：同一次打开内切回不重读（重开一切重来） */
  const activated = new Set<TabId>();

  function activate(id: TabId, moveFocus = false): void {
    for (const tab of tabs) {
      const on = tab.dataset.tab === id;
      tab.classList.toggle('is-active', on);
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
    }
    for (const [panelId, panel] of panels) panel.hidden = panelId !== id;

    if (moveFocus) tabs.find((tab) => tab.dataset.tab === id)?.focus();

    hooks.onActivate?.(id);
    if (!activated.has(id)) {
      activated.add(id);
      hooks.onFirstActivate?.(id);
    }
  }

  function switchTo(tab: HTMLButtonElement): void {
    const id = tab.dataset.tab;
    if (!isTabId(id)) return;
    activate(id);
    void updateSettings({ ui: { activeTab: id } });
  }

  tabsEl.addEventListener('click', (event) => {
    const target = (event.target as HTMLElement).closest<HTMLButtonElement>('.tab');
    if (target !== null) switchTo(target);
  });

  // ←/→ 绕圈，Home/End 到两端（APG 的建议做法）；焦点跟着走、切换即刻生效
  tabsEl.addEventListener('keydown', (event) => {
    const current = tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true');
    if (current < 0) return;
    let next: number | null = null;
    if (event.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
    else if (event.key === 'ArrowRight') next = (current + 1) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    if (next === null) return;
    event.preventDefault();
    const target = tabs[next];
    if (target !== undefined) {
      switchTo(target);
      target.focus();
    }
  });

  const settings = await getSettings();
  // 记忆值由 normalize 收敛过（类型即契约，不再重复校验）；
  // 它在当前页面上不存在时（弹窗没有「通用」）落到第一个 tab。
  const remembered = settings.ui.activeTab;
  const initial = tabs.some((tab) => tab.dataset.tab === remembered) ? remembered : first;
  activate(initial);
}

/*
 * 通用浮动面板。
 *
 * 提供统一的外观与交互：可拖动、可最小化、无关闭按钮。
 * 位置状态不持久化，页面刷新后回到默认位置。
 */

const PANEL_MIN_WIDTH = 220;

export interface PanelOptions {
  /** 面板元素 id，同时用于去重 */
  id: string;
  title: string;
  /** 面板宽度，默认 260 */
  width?: number;
  /** 距视口右侧距离，默认 24 */
  right?: number;
  /** 纵向位置比例，默认 0.3（中部偏上） */
  topRatio?: number;
}

export interface PanelHandle {
  root: HTMLElement;
  body: HTMLElement;
  /** 更新状态行文本 */
  setStatus: (text: string) => void;
  destroy: () => void;
}

/** 面板样式。一次性注入，避免每个面板重复定义。 */
const STYLE_ID = 'study-pilot-panel-style';

function ensureStyle(): void {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .sp-panel {
      position: fixed;
      box-sizing: border-box;
      background: var(--sp-paper2, #ffffff);
      border: 1px solid var(--sp-line, #e4e7ec);
      border-radius: 14px;
      box-shadow: 0 10px 30px rgba(16, 24, 40, 0.14), 0 2px 6px rgba(16, 24, 40, 0.06);
      font-size: 13px;
      color: var(--sp-ink, #101828);
      z-index: 2147483647;
      overflow: hidden;
      user-select: none;
    }
    .sp-panel-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 9px 10px 9px 14px;
      background: var(--sp-accent, #0d9488);
      color: #fff;
      font-weight: 600;
      cursor: move;
    }
    .sp-panel-title {
      font-size: 13px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sp-panel-min {
      flex: none;
      width: 24px;
      height: 24px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: none;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.18);
      color: #fff;
      cursor: pointer;
      font: inherit;
      line-height: 1;
    }
    .sp-panel-min:hover { background: rgba(255, 255, 255, 0.32); }
    .sp-panel-body { padding: 12px; box-sizing: border-box; }
    .sp-panel-hint {
      font-size: 12px;
      line-height: 1.6;
      color: var(--sp-ink-faint, #98a2b3);
      margin-bottom: 10px;
    }
    .sp-panel-status {
      padding: 10px 12px;
      border-top: 1px solid var(--sp-line, #e4e7ec);
      font-size: 12px;
      line-height: 1.6;
      color: var(--sp-ink-soft, #475467);
      user-select: text;
      word-break: break-all;
    }
    .sp-panel-button {
      display: block;
      width: 100%;
      box-sizing: border-box;
      margin: 0 0 8px;
      padding: 10px 14px;
      font: inherit;
      font-size: 13px;
      font-weight: 600;
      color: #fff;
      border: 1px solid transparent;
      border-radius: 8px;
      cursor: pointer;
    }
    .sp-panel-button:disabled { opacity: 0.6; cursor: not-allowed; }
    .sp-panel-button[data-kind="fill"] { background: var(--sp-accent, #0d9488); }
    .sp-panel-button[data-kind="submit"] { background: #0f766e; }
    .sp-panel-info {
      margin-bottom: 10px;
      padding: 8px 10px;
      background: var(--sp-paper3, #f9fafb);
      border: 1px solid var(--sp-line, #e4e7ec);
      border-radius: 8px;
      font-size: 12px;
      line-height: 1.7;
      color: var(--sp-ink-soft, #475467);
      user-select: text;
    }
    .sp-panel-info-row { display: flex; justify-content: space-between; gap: 10px; }
    .sp-panel-info-row > span:first-child { color: var(--sp-ink-faint, #98a2b3); flex: none; }
    .sp-panel-info-row > span:last-child { text-align: right; word-break: break-all; }
    .sp-panel-info-row[data-warn="1"] > span:last-child { color: #d92d20; font-weight: 600; }
  `;
  document.head.append(style);
}

/** 创建面板。同 id 的面板已存在时先移除旧节点。 */
export function createPanel(options: PanelOptions): PanelHandle {
  ensureStyle();
  document.getElementById(options.id)?.remove();

  const root = document.createElement('div');
  root.id = options.id;
  root.className = 'sp-panel';
  root.style.right = `${options.right ?? 24}px`;
  root.style.top = `${Math.round((options.topRatio ?? 0.3) * 100)}%`;
  root.style.width = `${Math.max(PANEL_MIN_WIDTH, options.width ?? 260)}px`;

  const bar = document.createElement('div');
  bar.className = 'sp-panel-bar';

  const title = document.createElement('span');
  title.className = 'sp-panel-title';
  title.textContent = options.title;

  const minimize = document.createElement('button');
  minimize.type = 'button';
  minimize.className = 'sp-panel-min';
  minimize.textContent = '\u2013';
  minimize.setAttribute('aria-label', '最小化');

  const body = document.createElement('div');
  body.className = 'sp-panel-body';

  // 状态行由面板自己管理并固定在底部，调用方不需要关心它的位置
  const status = document.createElement('div');
  status.className = 'sp-panel-status';
  status.textContent = '';

  let minimized = false;
  minimize.addEventListener('click', () => {
    minimized = !minimized;
    body.style.display = minimized ? 'none' : 'block';
    status.style.display = minimized ? 'none' : 'block';
    minimize.textContent = minimized ? '\u25a1' : '\u2013';
  });
  minimize.addEventListener('mousedown', (event) => event.stopPropagation());

  bar.append(title, minimize);
  root.append(bar, body, status);
  document.body.append(root);

  // 拖动：起点时把 right 定位换算成 left，之后只用 left/top
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let originLeft = 0;
  let originTop = 0;

  const onMouseMove = (event: MouseEvent): void => {
    if (!dragging) return;
    const left = originLeft + event.clientX - startX;
    const top = originTop + event.clientY - startY;
    // 限制在视口内，避免拖出屏幕后无法找回
    root.style.left = `${Math.min(Math.max(left, 0), window.innerWidth - 60)}px`;
    root.style.top = `${Math.min(Math.max(top, 0), window.innerHeight - 40)}px`;
  };

  const onMouseUp = (): void => {
    dragging = false;
  };

  bar.addEventListener('mousedown', (event) => {
    const rect = root.getBoundingClientRect();
    dragging = true;
    root.style.right = 'auto';
    root.style.left = `${rect.left}px`;
    root.style.top = `${rect.top}px`;
    startX = event.clientX;
    startY = event.clientY;
    originLeft = rect.left;
    originTop = rect.top;
    event.preventDefault();
  });

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);

  return {
    root,
    body,
    setStatus(text: string) {
      status.textContent = text;
    },
    destroy() {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      root.remove();
    },
  };
}

/** 创建一个面板内的按钮。 */
export function panelButton(
  label: string,
  kind: 'fill' | 'submit',
  onClick: () => void,
): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'sp-panel-button';
  button.dataset.kind = kind;
  button.textContent = label;
  button.addEventListener('click', onClick);
  return button;
}

/** 信息行的一项。 */
export interface PanelInfoItem {
  label: string;
  value: string;
  /** 是否为需要注意的取值，例如已过截止时间 */
  warn?: boolean;
}

/**
 * 创建面板内的信息行。
 *
 * 数据来自接口，只做展示。返回的元素可以放在面板任意位置，
 * 也支持后续替换子节点来更新内容。
 */
export function panelInfo(items: PanelInfoItem[]): HTMLElement {
  const box = document.createElement('div');
  box.className = 'sp-panel-info';

  for (const item of items) {
    const row = document.createElement('div');
    row.className = 'sp-panel-info-row';
    if (item.warn) row.dataset.warn = '1';

    const label = document.createElement('span');
    label.textContent = item.label;

    const value = document.createElement('span');
    value.textContent = item.value;

    row.append(label, value);
    box.append(row);
  }

  return box;
}

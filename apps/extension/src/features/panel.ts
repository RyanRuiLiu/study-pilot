/*
 * 通用浮动面板。
 *
 * 提供统一的结构与交互：可拖动、可最小化、无关闭按钮。
 * 位置状态不持久化，页面刷新后回到默认位置。
 *
 * 面板与得分指导都注入到慕课页面里，因此都关在 shadow root 中（见 isolated.ts）。
 * 调用方拿到的 `body` 已经在 shadow root 里面，往里 append 的元素自动被隔离。
 *
 * 这一块的外观同样是组件给的：卡片是 sl-card，标题条上的按钮是 sl-button，
 * 底部状态行是 sl-alert，动作排是 sl-button。样式文件只管位置与等宽
 * （见 panel.css），不画颜色与边框。
 */

import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';

import type SlButton from '@shoelace-style/shoelace/dist/components/button/button.js';
import panelStyles from './panel.css?inline';
import { attachIsolated } from './isolated.ts';

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
  /** 更新状态行文本；空串表示此刻没有要说的事 */
  setStatus: (text: string) => void;
  destroy: () => void;
}

/** 创建面板。同 id 的面板已存在时先移除旧节点。 */
export function createPanel(options: PanelOptions): PanelHandle {
  document.getElementById(options.id)?.remove();

  const root = document.createElement('div');
  root.id = options.id;
  root.style.right = `${options.right ?? 24}px`;
  root.style.top = `${Math.round((options.topRatio ?? 0.3) * 100)}%`;
  root.style.width = `${Math.max(PANEL_MIN_WIDTH, options.width ?? 260)}px`;
  const shadow = attachIsolated(root, panelStyles);

  const card = document.createElement('sl-card');

  const head = document.createElement('div');
  head.slot = 'header';
  head.className = 'head';

  const title = document.createElement('span');
  title.className = 'head-title';
  title.textContent = options.title;

  const minimize = document.createElement('sl-button');
  minimize.size = 'small';
  minimize.textContent = '收起';
  minimize.setAttribute('aria-label', '最小化');

  const body = document.createElement('div');

  /*
   * 状态行是 sl-alert：它本来就是「一句此刻的事实」这个语义。
   * 没有事要报的时候整条不占位——空着的提示条会让人以为还在等结果。
   */
  const status = document.createElement('sl-alert');
  status.variant = 'neutral';
  status.open = true;
  status.hidden = true;
  status.style.marginTop = 'var(--sl-spacing-small)';

  let minimized = false;
  minimize.addEventListener('click', () => {
    minimized = !minimized;
    body.hidden = minimized;
    status.hidden = minimized || status.textContent === '';
    minimize.textContent = minimized ? '展开' : '收起';
  });
  // 按钮在标题条里，而标题条是拖动区：点按钮不该把面板拖着走
  minimize.addEventListener('mousedown', (event) => event.stopPropagation());

  head.append(title, minimize);
  card.append(head, body, status);
  shadow.append(card);
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

  head.addEventListener('mousedown', (event) => {
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
      status.hidden = text === '' || minimized;
    },
    destroy() {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      root.remove();
    },
  };
}

/**
 * 面板里的一个动作。
 *
 * 两种处境对应组件库的两种 variant：`fill` 是「填进去但还没交」，
 * `submit` 是「交给平台」——后者用 success，让两个动作在颜色上就分得开。
 */
export function panelButton(
  label: string,
  kind: 'fill' | 'submit',
  onClick: () => void,
): SlButton {
  const element = document.createElement('sl-button');
  element.variant = kind === 'submit' ? 'success' : 'primary';
  element.textContent = label;
  element.addEventListener('click', onClick);
  return element;
}

/** 信息行的一项。 */
export interface PanelInfoItem {
  label: string;
  value: string;
}

/**
 * 面板内的信息行。
 *
 * 数据来自接口，只做展示。用原生 `<dl>`：一个名目配一个值，
 * 语义与外观都由浏览器与主题的默认值给，这里不加任何样式类。
 */
export function panelInfo(items: PanelInfoItem[]): HTMLElement {
  const box = document.createElement('dl');
  box.style.margin = '0';

  for (const item of items) {
    const label = document.createElement('dt');
    label.textContent = item.label;

    const value = document.createElement('dd');
    value.textContent = item.value;

    box.append(label, value);
  }

  return box;
}

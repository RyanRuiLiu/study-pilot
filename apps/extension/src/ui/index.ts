/*
 * 组件层（唯一入口）。
 *
 * 只做一件事：把「界面上有什么」变成 DOM，而且**只用 Shoelace 的组件**。
 * 状态行是 sl-alert，分组清单是 sl-card + sl-divider，时间是 sl-tag，
 * 动作是 sl-button / sl-button-group，转圈是 sl-spinner。
 * 组件的外观一律由官方主题（themes/light.css）给，这里不重画任何一件控件。
 *
 * 为什么是自定义元素
 * ------------------
 * 弹窗是扩展页，用不着隔离；但同一套组件将来要注入慕课页面（就地出现的那种面板），
 * 那时既要不受宿主样式影响，也不能污染宿主。自定义元素的 shadow DOM 天然满足这两点。
 *
 * 注册
 * ----
 * 这里 import 的是用到的组件模块，副作用即注册。不用 autoloader：
 * 它靠扫描 DOM 决定加载什么，而组件清单在编译期就已知。
 *
 * 与页面的分工
 * ------------
 * 本文件不认识业务，也不取数：按钮点击后做什么、清单里放哪几条，由页面决定
 * （见 entrypoints/popup/view.ts）。这样注入面板将来能复用同一批构造器。
 */

import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/button-group/button-group.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import '@shoelace-style/shoelace/dist/components/tag/tag.js';


/** 状态行的语气。`busy` 是「正在做事」，`error` 是需要人看一眼的失败。 */
export type Tone = 'idle' | 'busy' | 'error';

/** 语气到官方 variant：中性、主色、危险，组件库已经把这三种处境画好了。 */
const ALERT_VARIANT: Record<Tone, 'neutral' | 'primary' | 'danger'> = {
  idle: 'neutral',
  busy: 'primary',
  error: 'danger',
};

/**
 * 一句话的状态行。
 *
 * 用 sl-alert 而不是自己画一道带色边的纸条：它就是官方的「一句状态说明」，
 * 三种 variant 对应三种处境，深浅由主题给。`open` 常开、不给关闭按钮，
 * 因为它不是一条要人处理的提醒，而是这一屏此刻的事实。
 */

export function statusLine(
  text: string,
  options: { tone?: Tone; loading?: boolean } = {},
): HTMLElement {
  const alert = document.createElement('sl-alert');
  alert.variant = ALERT_VARIANT[options.tone ?? 'idle'];
  alert.open = true;

  const body = document.createElement('span');
  body.textContent = text;
  if (options.loading === true) {
    const spin = document.createElement('sl-spinner');
    alert.append(spin, body);
  } else {
    alert.append(body);
  }
  return alert;
}

export interface ButtonOptions {
  label: string;
  /** 给了地址就是链接按钮（Shoelace 的 href 形态），否则是普通按钮 */
  href?: string;
  variant?: 'primary' | 'default' | 'neutral' | 'text';
  /**
   * 描边代替填充。用在次要场合：同一行里它不与主操作抢注意力。
   */
  outline?: boolean;
  size?: 'small' | 'medium';
  disabled?: boolean;
  /** 悬停说明。这句话会被用户读到，按界面文案对待 */
  title?: string;
  onClick?: () => void;
}

/** 按钮。`href` 与 `onClick` 二选一：一个是去处，一个是动作。 */
export function button(options: ButtonOptions): HTMLElement {
  const element = document.createElement('sl-button');
  element.setAttribute('size', options.size ?? 'small');

  if (options.variant !== undefined && options.variant !== 'default') {
    element.setAttribute('variant', options.variant);
  }
  if (options.outline === true) element.setAttribute('outline', '');
  if (options.disabled === true) element.setAttribute('disabled', '');
  if (options.href !== undefined) {
    element.setAttribute('href', options.href);
    // 去处都在扩展内部或平台页上，一律新开一页：弹窗一关就没了，不该顶着看
    element.setAttribute('target', '_blank');
    element.setAttribute('rel', 'noreferrer');
  }
  if (options.title !== undefined) element.setAttribute('title', options.title);

  element.textContent = options.label;
  if (options.onClick) element.addEventListener('click', options.onClick);
  return element;
}

/**
 * 计数一行。
 *
 * 数字**不是这里数出来的**：各平台的数法不同（慕课按「会自动完成 / 需你处理 / 已过期」），
 * 调用方把算好的分项文字交进来，这里只负责排成一句话。组件不认识任何平台的计数模型。
 */
export function countLine(parts: string[]): HTMLElement {
  const line = document.createElement('p');
  line.className = 'sp-count';
  line.textContent = parts.join(' · ');
  return line;
}








/** 表格里的一行：要印出来的那几格文字。 */
export interface DataRow {
  cells: string[];
}

/**
 * 静态表格：表头是文字，每格也是文字。
 *
 * 运行页的两张表与关于页的权限表都是这一种，先前各写一遍建表头的循环。
 * 概览那张表不在这里：它的表头是可点的排序按钮、格子里有链接与标签，
 * 那些都不是纯文字，硬塞进这一个函数只会把它变成带满开关的第二套实现。
 */
export function dataTable(headers: string[], rows: DataRow[]): HTMLTableElement {
  const table = document.createElement('table');
  table.className = 'sp-table';

  const headRow = document.createElement('tr');
  for (const label of headers) {
    const cell = document.createElement('th');
    cell.scope = 'col';
    cell.textContent = label;
    headRow.append(cell);
  }
  const thead = document.createElement('thead');
  thead.append(headRow);

  const tbody = document.createElement('tbody');
  for (const row of rows) {
    const tr = document.createElement('tr');
    for (const text of row.cells) {
      const cell = document.createElement('td');
      cell.textContent = text;
      tr.append(cell);
    }
    tbody.append(tr);
  }

  table.append(thead, tbody);
  return table;
}
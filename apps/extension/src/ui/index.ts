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

import { dueLine, isUrgent } from './format';

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
/** 就地改写一条状态行：只换文字与 variant，不重挂元素（重挂会重播出场动画）。 */
export function setStatusLine(status: HTMLElement, text: string, tone: Tone = 'idle'): void {
  (status as unknown as { variant: string }).variant = ALERT_VARIANT[tone];
  status.textContent = text;
}

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
  line.textContent = parts.join(' · ');
  return line;
}

/** 整行可点的链接。去处一律新开一页：弹窗一关就没了，不该顶着当前页看。 */
function anchor(href: string): HTMLAnchorElement {
  const element = document.createElement('a');
  element.href = href;
  element.target = '_blank';
  element.rel = 'noreferrer';
  return element;
}

/** 一条待办要渲染的最小信息。组件不认识任何平台的模型，只认这三项。 */
interface TaskRowItem {
  title: string;
  /** 截止时间（毫秒）；0 表示没有截止时间，此时不显示时间 */
  due: number;
  /** 可跳转地址；缺省时这一行不可点 */
  href?: string;
}

/**
 * 一组待办：组名、组名后面那句数量、以及这一组里的条目。
 *
 * 先前是一整条不分组的清单，三门课的待办混在一起：「哪门课还欠着多少」
 * 这一眼看不出来，而那恰恰是点开弹窗要问的第一件事。
 */
export interface TaskGroup {
  title: string;
  /**
   * 组名后面那句（弹窗里是「没做完的 / 一共」）。
   *
   * 由调用方算好交进来：怎么数法各平台不同，组件不认识任何计数模型，
   * 与 countLine 的分工一样。
   */
  count: string;
  rows: TaskRowItem[];
}

/**
 * 一组一张卡片：卡片头是组名与那句数量，里面一行一条，行与行之间用官方分隔线。
 *
 * 「还剩多久」用 sl-tag 标在行尾，紧急的那几条换成 danger——
 * 这两件事都是组件库现成的画法，不再自己发明一道色条。
 */
export function taskGroups(groups: TaskGroup[], emptyText: string): HTMLElement {
  if (groups.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = emptyText;
    return empty;
  }

  const wrap = document.createElement('div');
  wrap.className = 'sp-stack';
  for (const group of groups) {
    const card = document.createElement('sl-card');

    const head = document.createElement('div');
    head.slot = 'header';
    head.className = 'sp-line';
    const title = document.createElement('span');
    title.className = 'sp-fill';
    title.textContent = group.title;
    head.append(title);
    const count = document.createElement('sl-tag');
    count.size = 'small';
    count.variant = 'neutral';
    count.textContent = group.count;
    head.append(count);

    const body = document.createElement('div');
    group.rows.forEach((row, index) => {
      if (index > 0) body.append(document.createElement('sl-divider'));
      body.append(taskRow(row));
    });

    card.append(head, body);
    wrap.append(card);
  }
  return wrap;
}

/** 一条待办：标题 + 还剩多久。有地址就整行可点。 */
function taskRow(row: TaskRowItem): HTMLElement {
  const line = document.createElement('div');
  line.className = 'sp-line sp-item';

  if (row.href === undefined) {
    const title = document.createElement('span');
    title.className = 'sp-fill';
    title.textContent = row.title;
    line.append(title);
  } else {
    const link = anchor(row.href);
    link.className = 'sp-fill';
    link.textContent = row.title;
    line.append(link);
  }

  if (row.due > 0) {
    const when = document.createElement('sl-tag');
    when.size = 'small';
    when.variant = isUrgent(row.due) ? 'danger' : 'neutral';
    when.textContent = dueLine(row.due);
    line.append(when);
  }
  return line;
}

/** 一排动作。官方组件就是 sl-button-group：并排、共用边框、首尾圆角。 */
export function actionRow(controls: HTMLElement[]): HTMLElement {
  const group = document.createElement('sl-button-group');
  group.append(...controls);
  return group;
}

/** 底部入口：一排等宽按钮。与 actionRow 同一种组件，只是语义上用在页脚。 */
export function navBar(controls: HTMLElement[]): HTMLElement {
  const nav = document.createElement('footer');
  const group = actionRow(controls);
  group.style.display = 'flex';
  nav.append(group);
  return nav;
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

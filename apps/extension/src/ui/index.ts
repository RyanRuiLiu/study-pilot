/*
 * 组件层（唯一入口）。
 *
 * 只做一件事：把「界面上有什么」变成 DOM。控件来自 Shoelace（自定义元素，
 * 自带 shadow DOM 与成品设计），取值来自 tokens.css，排版类来自 components.css。
 *
 * 为什么是自定义元素
 * ------------------
 * 弹窗是扩展页，用不着隔离；但同一套组件将来要注入慕课页面（就地出现的那种面板），
 * 那时既要不受宿主样式影响，也不能污染宿主。自定义元素的 shadow DOM 天然满足这两点，
 * 而 Shoelace 的默认样式省掉了从零画控件这件事。
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

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';

import type { PlanSummary } from '../domain/plan';
import type { Task } from '../domain/task';
import { formatClock, isUrgent, relativeDay } from '../features/format';

/** 状态行的语气。`busy` 是「正在做事」，`error` 是需要人看一眼的失败。 */
export type Tone = 'idle' | 'busy' | 'error';

/** 一句话的状态行；`loading` 时在文字前加一个转圈。 */
export function statusLine(
  text: string,
  options: { tone?: Tone; loading?: boolean } = {},
): HTMLElement {
  const line = document.createElement('p');
  line.className = 'sp-status';
  line.dataset.tone = options.tone ?? 'idle';

  if (options.loading) {
    const spin = document.createElement('sl-spinner');
    spin.className = 'sp-spinner';
    line.append(spin);
  }

  const body = document.createElement('span');
  body.className = 'sp-status-text';
  body.textContent = text;
  line.append(body);
  return line;
}

export interface ButtonOptions {
  label: string;
  /** 给了地址就是链接按钮（Shoelace 的 href 形态），否则是普通按钮 */
  href?: string;
  variant?: 'primary' | 'default';
  /** 悬停说明。这句话会被用户读到，按界面文案对待 */
  title?: string;
  onClick?: () => void;
}

/** 按钮。`href` 与 `onClick` 二选一：一个是去处，一个是动作。 */
export function button(options: ButtonOptions): HTMLElement {
  const element = document.createElement('sl-button');
  element.className = 'sp-button';
  element.setAttribute('size', 'small');

  if (options.variant === 'primary') element.setAttribute('variant', 'primary');
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
 * 数字**不是这里数出来的**：调用方把 domain/plan.ts 的 summarize 结果交进来，
 * 这里只负责把它排成一句话。理由见 plan.ts 的文件头——两处各数一遍迟早对不上。
 */
export function countLine(summary: PlanSummary): HTMLElement {
  const open = summary.auto + summary.assisted + summary.manual + summary.failed;
  const parts = [
    `共 ${open} 项`,
    `可自动完成 ${summary.auto}`,
    `需要确认 ${summary.assisted}`,
    `需要你做 ${summary.manual}`,
  ];
  if (summary.failed > 0) parts.push(`失败 ${summary.failed}`);

  const line = document.createElement('p');
  line.className = 'sp-count';
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

/** 一条待办：标题 + 还剩多久。有可跳转的地址就整行可点。 */
export function taskRow(task: Task): HTMLLIElement {
  const item = document.createElement('li');
  item.className = 'sp-item';

  const body: HTMLElement =
    task.link === undefined ? document.createElement('span') : anchor(task.link);
  body.className = 'sp-item-body';

  const line = document.createElement('span');
  line.className = 'sp-item-line';

  const title = document.createElement('span');
  title.className = 'sp-item-title';
  title.textContent = task.title;

  const due = task.dueAt ?? 0;
  const when = document.createElement('span');
  when.className = 'sp-item-when';
  when.textContent = `${relativeDay(due)} ${formatClock(due)}`.trim();
  if (isUrgent(due)) when.dataset.urgent = 'true';

  line.append(title, when);
  body.append(line);
  item.append(body);
  return item;
}

/** 列表。空的时候给一句话，不留一片空白。 */
export function taskList(rows: HTMLLIElement[], emptyText: string): HTMLElement {
  if (rows.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'sp-empty';
    empty.textContent = emptyText;
    return empty;
  }

  const list = document.createElement('ol');
  list.className = 'sp-list';
  list.append(...rows);
  return list;
}

/** 一排动作。用在状态行下面：这一屏只剩一个能推进的动作时放它。 */
export function actionRow(controls: HTMLElement[]): HTMLElement {
  const row = document.createElement('div');
  row.className = 'sp-actions';
  row.append(...controls);
  return row;
}

/** 底部入口：一排等宽的按钮。 */
export function navBar(controls: HTMLElement[]): HTMLElement {
  const nav = document.createElement('footer');
  nav.className = 'sp-nav';
  nav.append(...controls);
  return nav;
}

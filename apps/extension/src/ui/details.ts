/*
 * 组件层：逐单元明细表。
 *
 * 这里只做表：四列、按课程分段、每行可点。数据从哪来由页面决定——
 * 看板的一份可能来自本地快照，也可能是刚从平台拉到的，两处内容相同、
 * 可信度不同，因此表头之外还有一个说明数据来源的位置（见 detailSource）。
 *
 * 行的取值由页面的适配层算好（名称、状态文案、时间、得分），这里不认识
 * 任何平台字段：状态文案与跳转地址都是别人给的字符串。
 */

/** 状态那一路的语气。`warn` 是需要人看一眼的处境。 */
type DetailTone = 'ok' | 'active' | 'warn';

/** 明细里的一行。可点的行给 href，不可点的留空。 */
export interface DetailRow {
  /** 稳定标识，用于锚点与测试定位 */
  key: string;
  name: string;
  status: string;
  tone: DetailTone;
  /** 悬停说明。状态有几种相近说法，区别写在这里 */
  statusTitle: string;
  when: string;
  whenTitle?: string;
  /** 得分 / 满分。没有分数时不显示这一格 */
  score?: string;
  scoreTitle?: string;
  href?: string;
}

/** 一门课名下的一组明细行。 */
export interface DetailGroup {
  course: string;
  rows: DetailRow[];
}

const COLUMNS: Array<[string, string]> = [
  ['sp-details-name', '测验与作业'],
  ['sp-details-status', '状态'],
  ['sp-details-when', '截止'],
  ['sp-details-score', '得分 / 满分'],
];

function cell(className: string, text: string, title?: string): HTMLElement {
  const element = document.createElement('span');
  element.className = className;
  element.textContent = text;
  if (title !== undefined) element.title = title;
  return element;
}

/** 表头。列的含义不标注的话，「等待互评完成」与「互评阶段」的区别只能靠猜。 */
function head(): HTMLElement {
  const element = document.createElement('div');
  element.className = 'sp-details-head';
  for (const [className, label] of COLUMNS) element.append(cell(className, label));
  return element;
}

function row(item: DetailRow): HTMLElement {
  const element = document.createElement(item.href === undefined ? 'div' : 'a');
  element.className = 'sp-details-row';
  element.id = `unit-${item.key}`;

  /*
   * 用 setAttribute 而不是 element.href / instanceof HTMLAnchorElement：
   * 这一层将来要挂进 shadow root，也可能在没有浏览器全局的测试里跑，
   * 靠属性写就只依赖元素本身。
   */
  if (item.href !== undefined) {
    element.setAttribute('href', item.href);
    element.setAttribute('target', '_blank');
    element.setAttribute('rel', 'noreferrer');
    element.setAttribute('title', `打开「${item.name}」`);
  }

  const status = cell('sp-details-status', item.status, item.statusTitle);
  status.classList.add(`is-${item.tone}`);

  element.append(
    cell('sp-details-name', item.name),
    status,
    cell('sp-details-when', item.when, item.whenTitle),
  );
  if (item.score !== undefined) element.append(cell('sp-details-score', item.score, item.scoreTitle));
  return element;
}

/**
 * 整张明细表。空的时候给一句话，不留一个空表头。
 *
 * `emptyText` 由页面给：同一个空表在看板与别处的原因不同，说法也就不同。
 */
export function detailTable(groups: DetailGroup[], emptyText: string): HTMLElement {
  const element = document.createElement('div');
  element.className = 'sp-details';

  if (groups.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'sp-hint';
    empty.textContent = emptyText;
    element.append(empty);
    return element;
  }

  element.append(head());
  for (const group of groups) {
    const title = document.createElement('div');
    title.className = 'sp-details-course';
    title.textContent = group.course;
    element.append(title);
    for (const item of group.rows) element.append(row(item));
  }
  return element;
}

/**
 * 数据来源与时间。
 *
 * 「来自本地快照（上次读取 …）」与「平台最新（读取于 …）」必须分开写：
 * 两处内容长得一样，不说清来源，用户无从分辨看到的是哪一份。
 */
export function detailSource(text: string): HTMLElement {
  const element = document.createElement('p');
  element.className = 'sp-details-source';
  element.textContent = text;
  return element;
}

/*
 * 看板页入口。
 *
 * 数据只来自本地快照（经后台读），本页**打开时不向平台发请求**：
 * 看板是「停下来看」的地方，不该因为打开它就产生网络活动。
 * 单元明细是唯一的例外，它由用户按「读取最新明细」显式触发，见 details.ts。
 * 快照有多旧由页面上那行「上次读取」如实说明。
 *
 * 快照是**平台的原样数据**（慕课的字段），看板直接按它渲染，中间没有中立模型。
 * 装配与生命周期在这里，展示逻辑在同目录的 render.ts（看板本体）与 details.ts（明细）。
 */

import '../../src/ui/tokens.css';
import '../../src/ui/theme.css';
import '../../src/ui/components.css';
import './style.css';

import type { Snapshot } from '../../src/platforms/mooc/read';
import { sendToBackground } from '../../src/platform/messaging';
import { required } from '../../src/ui/dom';
import { formatDateTime } from '../../src/features/format';
import {
  boardItems,
  DEFAULT_FILTERS,
  filterItems,
  kindOptions,
  MODE_LABEL,
  STATE_FILTERS,
  type BoardItem,
  type Filters,
} from './render.ts';
import { renderBoard } from './render.ts';
import { detailsView } from './details.ts';

const app = required<HTMLElement>('#app');
const fetchedEl = required<HTMLElement>('#fetched');
const courseEl = required<HTMLSelectElement>('#course');
const kindEl = required<HTMLSelectElement>('#kind');
const modeEl = required<HTMLSelectElement>('#mode');
const stateEl = required<HTMLSelectElement>('#state');
const reloadEl = required<HTMLElement>('#reload');
const detailsSlot = required<HTMLElement>('#details-app');

let view: Snapshot | null = null;
let filters: Filters = { ...DEFAULT_FILTERS };

/*
 * 明细区。它读过平台之后会让看板本体重读一次快照——
 * 后台读明细时顺手刷新了快照，不重读两块画面就来自两个时刻。
 */
const details = detailsView(() => {
  void refreshBoard();
});
detailsSlot.append(details.element);

function option(value: string, label: string): HTMLOptionElement {
  const element = document.createElement('option');
  element.value = value;
  element.textContent = label;
  return element;
}

/** 按当前数据重建下拉项：课程与类别跟着快照走，做法与状态是固定集合。 */
function fillOptions(): void {
  courseEl.replaceChildren(
    option('all', '全部课程'),
    ...(view?.courses ?? []).map((course) => option(String(course.courseId), course.courseName)),
  );
  kindEl.replaceChildren(
    option('all', '全部类别'),
    ...kindOptions(view).map((kind) => option(kind, kind)),
  );
  modeEl.replaceChildren(
    option('all', '全部做法'),
    ...Object.entries(MODE_LABEL).map(([value, label]) => option(value, label)),
  );
  stateEl.replaceChildren(...STATE_FILTERS.map(({ value, label }) => option(value, label)));

  courseEl.value = filters.courseId;
  kindEl.value = filters.kind;
  modeEl.value = filters.mode;
  stateEl.value = filters.state;
}

function allItems(): BoardItem[] {
  return (view?.courses ?? []).flatMap(boardItems);
}

/**
 * 画看板本体。
 *
 * 明细区不在这里重画：它有自己的来源标注（快照 / 平台最新），
 * 每次筛选都把它拉回快照那一份，用户刚点出来的最新明细就白读了。
 */
function paintBoard(): void {
  fetchedEl.textContent = view !== null && view.fetchedAt
    ? `上次读取：${formatDateTime(view.fetchedAt)}`
    : '还没有读取过数据';
  renderBoard(app, view, filterItems(allItems(), filters));
}

/**
 * 重读本地快照，并重画看板本体与筛选条。
 *
 * 「重读快照」按钮与明细拉完平台之后都走这里；失败时如实写在那行状态上，
 * 保留当前画面，不清空用户正在看的东西。
 */
async function refreshBoard(): Promise<void> {
  try {
    const outcome = await sendToBackground({ type: 'DASHBOARD' });
    if (outcome.status !== 'ok') {
      fetchedEl.textContent = `读取失败：${outcome.message}`;
      return;
    }
    view = outcome.value;
  } catch (error) {
    fetchedEl.textContent = `读取失败：${error instanceof Error ? error.message : String(error)}`;
    return;
  }
  fillOptions();
  paintBoard();
}

/** 打开时的第一屏：读本地快照，再用它画明细区的第一份。 */
async function load(): Promise<void> {
  fetchedEl.textContent = '正在读取本地快照';
  await refreshBoard();
  details.renderSnapshot(view);
  scrollToAnchor();
}

/**
 * 跳到地址里指定的锚点。
 *
 * 通知点进来时带的是 #unit-details，而这一页的内容是异步铺开的：
 * 浏览器原生的锚点定位发生在数据到达之前，之后看板与明细把文档撑高，
 * 用户就落在别处了。因此数据都画完之后再对准一次。
 */
function scrollToAnchor(): void {
  const id = window.location.hash.replace(/^#/, '');
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY);
}

for (const [element, key] of [
  [courseEl, 'courseId'],
  [kindEl, 'kind'],
  [modeEl, 'mode'],
  [stateEl, 'state'],
] as const) {
  element.addEventListener('change', () => {
    filters = { ...filters, [key]: element.value };
    paintBoard();
  });
}

reloadEl.addEventListener('click', () => {
  void refreshBoard();
});

void load();

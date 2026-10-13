/*
 * 看板页入口。
 *
 * 数据只来自本地快照（经后台读），本页**不向平台发任何请求**：
 * 看板是「停下来看」的地方，不该因为打开它就产生网络活动。
 * 快照有多旧由页面上那行「上次读取」如实说明。
 *
 * 装配与生命周期在这里，展示逻辑在同目录的 `render.ts`。
 */

import '../../src/ui/tokens.css';
import './style.css';

import { sendToBackground } from '../../src/platform/messaging';
import { required } from '../../src/ui/dom';
import { formatDateTime } from '../../src/features/format';
import type { DashboardView } from '../../src/domain/task';
import {
  DEFAULT_FILTERS,
  filterTasks,
  KIND_LABEL,
  MODE_LABEL,
  type Filters,
} from './render.ts';
import { renderBoard } from './render.ts';

const app = required<HTMLElement>('#app');
const fetchedEl = required<HTMLElement>('#fetched');
const courseEl = required<HTMLSelectElement>('#course');
const kindEl = required<HTMLSelectElement>('#kind');
const modeEl = required<HTMLSelectElement>('#mode');
const stateEl = required<HTMLSelectElement>('#state');
const reloadEl = required<HTMLButtonElement>('#reload');

let view: DashboardView = { fetchedAt: 0, courses: [], tasks: [] };
let filters: Filters = { ...DEFAULT_FILTERS };

function option(value: string, label: string): HTMLOptionElement {
  const element = document.createElement('option');
  element.value = value;
  element.textContent = label;
  return element;
}

/** 按当前数据重建下拉项：课程随快照变，类别与做法是固定集合。 */
function fillOptions(): void {
  courseEl.replaceChildren(
    option('all', '全部课程'),
    ...view.courses.map((course) => option(String(course.courseId), course.name)),
  );
  kindEl.replaceChildren(
    option('all', '全部类别'),
    ...Object.entries(KIND_LABEL).map(([value, label]) => option(value, label)),
  );
  modeEl.replaceChildren(
    option('all', '全部做法'),
    ...Object.entries(MODE_LABEL).map(([value, label]) => option(value, label)),
  );
  stateEl.replaceChildren(
    option('open', '未完成与失败'),
    option('todo', '只看未完成'),
    option('failed', '只看失败'),
    option('done', '只看已完成'),
    option('all', '全部状态'),
  );

  courseEl.value = filters.courseId;
  kindEl.value = filters.kind;
  modeEl.value = filters.mode;
  stateEl.value = filters.state;
}

function paint(): void {
  fetchedEl.textContent = view.fetchedAt
    ? `上次读取：${formatDateTime(view.fetchedAt)}`
    : '还没有读取过数据';
  renderBoard(app, view, filterTasks(view.tasks, filters));
}

async function load(): Promise<void> {
  fetchedEl.textContent = '正在读取本地快照';
  /*
   * 未登录或没有快照时后台会以 ok + 空值回答（那不是失败）；
   * 真正的失败（例如后台没起来）在这里如实说出来。
   */
  try {
    const outcome = await sendToBackground({ type: 'DASHBOARD' });
    view = outcome.status === 'ok' ? outcome.value : { fetchedAt: 0, courses: [], tasks: [] };
    if (outcome.status !== 'ok') fetchedEl.textContent = `读取失败：${outcome.message}`;
  } catch (error) {
    view = { fetchedAt: 0, courses: [], tasks: [] };
    fetchedEl.textContent = `读取失败：${error instanceof Error ? error.message : String(error)}`;
    return;
  }
  fillOptions();
  paint();
}

for (const [element, key] of [
  [courseEl, 'courseId'],
  [kindEl, 'kind'],
  [modeEl, 'mode'],
  [stateEl, 'state'],
] as const) {
  element.addEventListener('change', () => {
    filters = { ...filters, [key]: element.value };
    paint();
  });
}

reloadEl.addEventListener('click', () => {
  void load();
});

void load();

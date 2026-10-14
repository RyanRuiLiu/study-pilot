/*
 * 概览页：这是"还剩什么"的主视图。
 *
 * 结构只用官方组件，按官方文档的用法：
 *   sl-select + sl-option   状态筛选（默认「全部」，含已完成）
 *   sl-button              读取最新：向平台读一次（只读）
 *   sl-split-panel         左树 + 右详情
 *   sl-tree / sl-tree-item 课程 → 章节，节点文字自带计数
 *   sl-details             每个章节一块，里面是它的项
 *   sl-tag / sl-badge      类别与状态（颜色来自组件自带的 variant）
 *
 * 表格是自画的东西，已经删掉：一行就是"标题 + 几个标签"，不需要画表格。
 * 本文件只管摆放（用了 .sp-toolbar / .sp-stack 两个只有 display/gap 的类），
 * 颜色、圆角、阴影、字号全部来自官方主题。
 */

import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js';
import '@shoelace-style/shoelace/dist/components/tree/tree.js';
import '@shoelace-style/shoelace/dist/components/tree-item/tree-item.js';
import '@shoelace-style/shoelace/dist/components/details/details.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import '@shoelace-style/shoelace/dist/components/tag/tag.js';

import type { OverviewRow, PlatformViews } from '../../src/platforms/types.ts';
import { formatDateTime } from '../../src/ui/format';

export interface OverviewView {
  host: HTMLElement;
  reload: () => Promise<void>;
  setBusy: (busy: boolean) => void;
}

type Filter = 'all' | 'todo' | 'late' | 'done';

const FILTERS: Array<{ value: Filter; label: string }> = [
  { value: 'all', label: '全部' },
  { value: 'todo', label: '未完成' },
  { value: 'late', label: '已过截止' },
  { value: 'done', label: '已完成' },
];

/** 状态徽章：颜色只由组件自带的 variant 给，不另立第二套色。 */
function stateBadge(row: OverviewRow): HTMLElement {
  const badge = document.createElement('sl-badge');
  badge.setAttribute('pill', '');
  if (row.state === 'done') {
    badge.setAttribute('variant', 'success');
    badge.textContent = '已完成';
  } else if (row.state === 'late') {
    badge.setAttribute('variant', 'danger');
    badge.textContent = '已过截止';
  } else {
    badge.setAttribute('variant', 'neutral');
    badge.textContent = '未完成';
  }
  return badge;
}

/** 项与项之间用「，」而不是中点：中点拼接是仪表盘写法，不是人话。 */
function lineText(row: OverviewRow): string {
  return [row.progress, row.status, row.due, row.score].filter((part) => part !== '').join('，');
}

/** 一行：标题、类别、状态、补充信息。有地址就整行可点。 */
function itemRow(row: OverviewRow): HTMLElement {
  const line = document.createElement(row.href === '' ? 'div' : 'a');
  line.className = 'sp-item-line';
  if (row.href !== '') {
    line.setAttribute('href', row.href);
    line.setAttribute('target', '_blank');
    line.setAttribute('rel', 'noreferrer');
  }

  const title = document.createElement('span');
  title.textContent = row.title;
  if (row.statusDetail !== '') title.setAttribute('title', row.statusDetail);

  const kind = document.createElement('sl-tag');
  kind.setAttribute('size', 'small');
  kind.textContent = row.kind;

  const detail = document.createElement('span');
  detail.className = 'sp-item-when';
  detail.textContent = lineText(row);

  line.append(title, kind, stateBadge(row), detail);
  return line;
}

/** 按「课程/章节」切组，保持原有顺序。 */
function byChapter(rows: OverviewRow[]): Map<string, OverviewRow[]> {
  const groups = new Map<string, OverviewRow[]>();
  for (const row of rows) {
    const key = `${row.course}/${row.group}`;
    const bucket = groups.get(key);
    if (bucket === undefined) groups.set(key, [row]);
    else bucket.push(row);
  }
  return groups;
}

/** 每次重画都重新问平台要一次数据（平台实现只读本地快照，不发请求）。 */
export function mountOverview(platforms: PlatformViews[]): OverviewView {
  const host = document.createElement('div');
  host.className = 'sp-stack';

  const filter = document.createElement('sl-select');
  filter.setAttribute('size', 'small');
  for (const option of FILTERS) {
    const item = document.createElement('sl-option');
    item.setAttribute('value', option.value);
    item.textContent = option.label;
    filter.append(item);
  }
  filter.value = 'all';

  const refresh = document.createElement('sl-button');
  refresh.setAttribute('size', 'small');
  refresh.textContent = '读取最新';
  refresh.setAttribute('title', '向平台读一次当前状态与得分，只读，不会改动平台上的任何数据');

  const source = document.createElement('small');
  source.textContent = '还没有读取过数据';

  const toolbar = document.createElement('div');
  toolbar.className = 'sp-toolbar';
  toolbar.append(filter, refresh, source);

  const tree = document.createElement('sl-tree');
  const treeBox = document.createElement('div');
  treeBox.className = 'sp-stack';
  treeBox.append(tree);

  const detail = document.createElement('div');
  detail.className = 'sp-stack';

  const panel = document.createElement('sl-split-panel');
  panel.setAttribute('position', '26');
  const right = document.createElement('div');
  right.setAttribute('slot', 'end');
  right.className = 'sp-stack';
  right.append(detail);
  panel.append(treeBox, right);

  host.append(toolbar, panel);

  let rows: OverviewRow[] = [];
  /** 选中的范围：空串表示全部课程；课程名表示该课；「课程/章节」表示该章节。 */
  let scope = '';

  function visible(): OverviewRow[] {
    const inScope = rows.filter((row) => {
      if (scope === '') return true;
      return scope === row.course || scope === `${row.course}/${row.group}`;
    });
    if (filter.value === 'all') return inScope;
    return inScope.filter((row) => row.state === filter.value);
  }

  function paintTree(): void {
    tree.replaceChildren();

    const all = document.createElement('sl-tree-item');
    all.textContent = `全部课程 ${rows.length} 项`;
    all.setAttribute('data-key', '');
    if (scope === '') all.setAttribute('selected', '');
    tree.append(all);

    const courses = new Map<string, OverviewRow[]>();
    for (const row of rows) {
      const bucket = courses.get(row.course);
      if (bucket === undefined) courses.set(row.course, [row]);
      else bucket.push(row);
    }

    for (const [course, list] of courses) {
      const open = list.filter((row) => row.state !== 'done').length;
      const node = document.createElement('sl-tree-item');
      node.textContent = `${course} ${open}/${list.length}`;
      node.setAttribute('data-key', course);
      if (scope === course) node.setAttribute('selected', '');

      for (const [key, groupRows] of byChapter(list)) {
        const group = key.slice(course.length + 1);
        const openRows = groupRows.filter((row) => row.state !== 'done').length;
        const leaf = document.createElement('sl-tree-item');
        leaf.textContent = `${group} ${openRows}/${groupRows.length}`;
        leaf.setAttribute('data-key', key);
        if (scope === key) leaf.setAttribute('selected', '');
        node.append(leaf);
      }

      tree.append(node);
    }
  }

  function paintDetail(): void {
    detail.replaceChildren();
    const list = visible();

    if (list.length === 0) {
      const none = document.createElement('p');
      none.textContent = '这个范围里没有项。';
      detail.append(none);
      return;
    }

    for (const [key, groupRows] of byChapter(list)) {
      const open = groupRows.filter((row) => row.state !== 'done').length;
      const details = document.createElement('sl-details');
      details.setAttribute('summary', `${key} ${open}/${groupRows.length}`);
      details.setAttribute('open', '');
      const box = document.createElement('div');
      box.className = 'sp-stack';
      for (const row of groupRows) box.append(itemRow(row));
      details.append(box);
      detail.append(details);
    }
  }

  function paint(): void {
    paintTree();
    paintDetail();
  }

  async function reload(): Promise<void> {
    const parts = await Promise.all(platforms.map((platform) => platform.overview()));
    rows = parts.flatMap((part) => part.rows);

    const first = parts[0];
    if (first === undefined) source.textContent = '没有配置平台';
    else if ('error' in first.source) source.textContent = `读取失败：${first.source.error}`;
    else if (first.source.at === 0) source.textContent = '还没有读取过数据';
    else source.textContent = `上次读取 ${formatDateTime(first.source.at)}`;

    paint();
  }

  filter.addEventListener('sl-change', paint);
  tree.addEventListener('sl-selection-change', (event) => {
    const selection = (event as CustomEvent<{ selection: HTMLElement[] }>).detail.selection;
    scope = selection[0]?.getAttribute('data-key') ?? '';
    paint();
  });
  refresh.addEventListener('click', () => {
    refresh.setAttribute('disabled', '');
    void Promise.all(platforms.map((platform) => platform.refresh()))
      .then(() => reload())
      .finally(() => refresh.removeAttribute('disabled'));
  });

  return {
    host,
    reload,
    setBusy: (busy) => {
      if (busy) refresh.setAttribute('disabled', '');
      else refresh.removeAttribute('disabled');
    },
  };
}

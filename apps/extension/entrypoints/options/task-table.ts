/*
 * 概览的那张任务表。
 *
 * 只管两件事：表头与排序、把行画出来。范围过滤不在这里——那是左树的事，
 * 由概览页决定「现在看的是哪一批」，这一层只负责把交进来的行排好序。
 *
 * 单独成文件不只是因为行数：sortable 的表头与无障碍属性是这张表的全部技术含量，
 * 它与「数据从哪来、树的层级怎么长」是两类问题，混在一起两边都读不动。
 */

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/tag/tag.js';

import type { OverviewRow } from '../../src/platforms/types.ts';

/**
 * 带上平台归属的行。
 *
 * `platformId` 由概览页在收集数据时补上：左树选中的是某个平台下的节点，
 * 而契约里的行只说自己属于哪门课，不知道是谁交的。
 */
export type ScopedRow = OverviewRow & { platformId: string };

/**
 * 可排序的列。`key` 是行上的字段名，排序直接读它，不做第二套映射。
 *
 * 得分不在其中：那一格是「20 / 20」这种显示文字，按它排序会把 5 分排在 20 分前面。
 * 要按分数排就得有一个数值字段，而那等于再造一份平台字段的中立映射。
 */
type SortKey = 'course' | 'title' | 'kind' | 'mode' | 'state' | 'dueAt';

interface Column {
  key: SortKey | 'score';
  label: string;
  /** 数字列右对齐，扫数值时视线不用跳 */
  numeric?: boolean;
}

const COLUMNS: Column[] = [
  { key: 'course', label: '课程' },
  { key: 'title', label: '项目' },
  { key: 'kind', label: '类别' },
  { key: 'mode', label: '做法' },
  { key: 'state', label: '状态' },
  { key: 'dueAt', label: '截止' },
  { key: 'score', label: '得分', numeric: true },
];

/** 状态三档的显示文字与左缘色条同源，表格里不再各写一份。 */
const STATE_LABEL: Record<OverviewRow['state'], string> = {
  todo: '未完成',
  late: '已过截止',
  done: '已完成',
};

const STATE_RANK: Record<OverviewRow['state'], number> = { todo: 0, late: 1, done: 2 };

/** 做法：判断用枚举，显示用这一份文字，标签语气也从这里给。 */
const MODE_LABEL: Record<OverviewRow['mode'], string> = {
  auto: '自动完成',
  assisted: '需要你确认',
  manual: '需要你做',
};

const MODE_VARIANT: Record<OverviewRow['mode'], 'primary' | 'neutral' | 'warning'> = {
  auto: 'primary',
  assisted: 'neutral',
  manual: 'warning',
};

export interface TaskTable {
  host: HTMLTableElement;
  /** 画这些行并返回实际画出的条数：工具栏那句「显示 N / M 项」要的是这个 */
  render: (rows: ScopedRow[]) => number;
}

export function mountTaskTable(): TaskTable {
  const host = document.createElement('table');
  host.className = 'sp-table sp-table-fixed';

  /** 默认按截止升序：打开这一页要看的是「最近要交的」 */
  let sort: { key: SortKey; up: boolean } = { key: 'dueAt', up: true };

  const head = document.createElement('tr');
  for (const column of COLUMNS) {
    const cell = document.createElement('th');
    cell.scope = 'col';
    cell.dataset.key = column.key;
    if (column.numeric === true) cell.className = 'num';
    if (column.key === 'score') {
      cell.textContent = column.label;
    } else {
      const key = column.key;
      const sorter = document.createElement('sl-button');
      sorter.variant = 'text';
      sorter.size = 'small';
      sorter.textContent = column.label;
      sorter.addEventListener('click', () => {
        sort = sort.key === key ? { key, up: !sort.up } : { key, up: true };
        paint();
      });
      cell.append(sorter);
    }
    head.append(cell);
  }
  const thead = document.createElement('thead');
  thead.append(head);
  const tbody = document.createElement('tbody');
  host.append(thead, tbody);

  /** 当前这一批行：点表头换排序时原地重画，不必回概览页再要一次 */
  let rows: ScopedRow[] = [];

  function ordered(): ScopedRow[] {
    const direction = sort.up ? 1 : -1;
    return [...rows].sort((left, right) => {
      if (sort.key === 'state') return (STATE_RANK[left.state] - STATE_RANK[right.state]) * direction;
      if (sort.key === 'dueAt') {
        // 没有截止的排到最后，不受升降序影响：它们不是「更晚」，只是「没有时间」
        const leftDue = left.dueAt === 0 ? Number.MAX_SAFE_INTEGER : left.dueAt;
        const rightDue = right.dueAt === 0 ? Number.MAX_SAFE_INTEGER : right.dueAt;
        if (leftDue !== rightDue) return (leftDue - rightDue) * direction;
        return left.title.localeCompare(right.title);
      }
      if (sort.key === 'mode') {
        const byMode = MODE_LABEL[left.mode].localeCompare(MODE_LABEL[right.mode], 'zh-Hans-CN');
        return byMode !== 0 ? byMode * direction : left.title.localeCompare(right.title);
      }
      const field = left[sort.key];
      const byField = field.localeCompare(right[sort.key], 'zh-Hans-CN');
      return byField !== 0 ? byField * direction : left.title.localeCompare(right.title);
    });
  }

  function paint(): number {
    for (const column of COLUMNS) {
      if (column.key === 'score') continue;
      const cell = thead.querySelector(`th[data-key="${column.key}"]`);
      if (cell !== null) {
        cell.setAttribute('aria-sort', sort.key === column.key ? (sort.up ? 'ascending' : 'descending') : 'none');
      }
    }

    tbody.replaceChildren();
    for (const row of ordered()) {
      tbody.append(rowElement(row));
    }
    return tbody.children.length;
  }

  function rowElement(row: ScopedRow): HTMLTableRowElement {
    const tr = document.createElement('tr');
    tr.append(cell(row.course), titleCell(row), cell(row.kind), modeCell(row.mode), stateCell(row), cell(row.due), scoreCell(row.score));
    return tr;
  }

  function cell(text: string): HTMLTableCellElement {
    const td = document.createElement('td');
    td.textContent = text;
    return td;
  }

  function titleCell(row: ScopedRow): HTMLTableCellElement {
    const td = document.createElement('td');
    if (row.href === '') {
      td.textContent = row.title;
      return td;
    }
    const link = document.createElement('a');
    link.href = row.href;
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.textContent = row.title;
    td.append(link);
    return td;
  }

  function modeCell(mode: OverviewRow['mode']): HTMLTableCellElement {
    const td = document.createElement('td');
    const tag = document.createElement('sl-tag');
    tag.size = 'small';
    tag.variant = MODE_VARIANT[mode];
    tag.textContent = MODE_LABEL[mode];
    td.append(tag);
    return td;
  }

  /*
   * 状态那一格：先说三态，后面接平台自己的说法。
   *
   * `status` 为空表示平台对这一行没有比三态更多的话（课件单元就是这种），
   * 此时只印三态——「未完成 · 未完成」是同一句话说两遍。
   * 相近说法的区别（互评阶段与互评已完成）放在悬停里，来自 statusDetail。
   */
  function stateCell(row: OverviewRow): HTMLTableCellElement {
    const td = document.createElement('td');
    const label = STATE_LABEL[row.state];
    td.textContent = row.status === '' ? label : `${label} · ${row.status}`;
    if (row.statusDetail !== '') td.title = row.statusDetail;
    return td;
  }

  function scoreCell(text: string): HTMLTableCellElement {
    const td = document.createElement('td');
    td.className = 'num';
    td.textContent = text;
    return td;
  }

  return {
    host,
    render(next: ScopedRow[]): number {
      rows = next;
      return paint();
    },
  };
}

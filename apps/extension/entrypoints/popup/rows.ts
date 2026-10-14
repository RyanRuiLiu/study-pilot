/*
 * 弹窗里的「行」：把平台的待办条目变成清单上的一行。
 *
 * 与 view.ts 的分工：这里只管一行长什么样（标题、类别、状态、截止）与谁排在前面，
 * 不管整屏怎么摆。行是目录式的一行：标题在左，类别与状态、截止依次靠右。
 */

import type { PendingEntry, PendingSummary } from '../../src/browser/messaging';
import { relativeDay } from '../../src/ui/format.ts';

/** 一门课里最多列几项，多的交给概览。 */
const PER_GROUP = 3;

/** 类别只有五种，说法照平台自己的分法，不另造词。 */
const KIND_LABEL: Record<PendingEntry['kind'], string> = {
  'submit-quiz': '测验',
  'submit-homework': '作业',
  'evaluate-homework': '互评',
  'self-evaluate': '自评',
  'submit-exam': '考试',
};

/**
 * 一句话说清「要交的东西有多少、其中多少不用你管」。
 *
 * 先前这里是「共 3 项 · 会自动完成 1 · 需你处理 2」这种用中点拼接的标签串：
 * 读起来像仪表盘，不像人说话。改用陈述句，信息一个不少。
 */
export function summarySentence(summary: PendingSummary): string {
  const head = `有 ${summary.entries.length} 项要交`;
  const auto = summary.auto > 0 ? `，其中 ${summary.auto} 项会自动完成` : '';
  const manual = summary.manual > 0 ? `，${summary.manual} 项要你自己做` : '';
  const overdue = summary.overdue > 0 ? `，${summary.overdue} 项已过期` : '';
  return `${head}${auto}${manual}${overdue}。`;
}

/** 一行里左侧那段「谁来做 / 已过期」——颜色由组件自带的 variant 给，不另立一套色。 */
function stateBadge(entry: PendingEntry): HTMLElement {
  const badge = document.createElement('sl-badge');
  badge.setAttribute('pill', '');
  if (entry.overdue) {
    badge.setAttribute('variant', 'danger');
    badge.textContent = '已过期';
  } else if (entry.handling === 'auto') {
    badge.setAttribute('variant', 'neutral');
    badge.textContent = '会自动完成';
  } else {
    badge.setAttribute('variant', 'warning');
    badge.textContent = '要你做';
  }
  return badge;
}

/** 课程那一行：名字在左，这一门有几项要交在右。 */
export function courseHeading(name: string, count: number): HTMLElement {
  const row = document.createElement('div');
  row.className = 'group';
  const title = document.createElement('strong');
  title.textContent = name;
  const badge = document.createElement('sl-badge');
  badge.textContent = String(count);
  row.append(title, badge);
  return row;
}

/** 一项一行：标题、类别与状态、截止。可点的整行是链接。 */
export function entryRow(entry: PendingEntry): HTMLElement {
  const row = document.createElement(entry.href === undefined ? 'div' : 'a');
  row.className = 'item';
  if (entry.href !== undefined) {
    row.setAttribute('href', entry.href);
    row.setAttribute('target', '_blank');
    row.setAttribute('rel', 'noreferrer');
  }

  const title = document.createElement('span');
  title.className = 'item-title';
  title.textContent = entry.name;

  const meta = document.createElement('span');
  meta.className = 'item-meta';
  const kind = document.createElement('sl-tag');
  kind.setAttribute('size', 'small');
  kind.textContent = KIND_LABEL[entry.kind];
  meta.append(kind, stateBadge(entry));

  const when = document.createElement('span');
  when.className = 'item-when';
  when.textContent = entry.deadline > 0 ? relativeDay(entry.deadline) : '';

  row.append(title, meta, when);
  return row;
}

export interface CourseGroup {
  course: string;
  rows: PendingEntry[];
}

/** 按课程分组；组的先后由各自最紧要的那件事决定。 */
export function byCourse(entries: PendingEntry[], now: number): CourseGroup[] {
  const groups = new Map<string, PendingEntry[]>();
  for (const entry of entries) {
    const bucket = groups.get(entry.courseName);
    if (bucket === undefined) groups.set(entry.courseName, [entry]);
    else bucket.push(entry);
  }

  return [...groups.entries()]
    .map(([course, rows]) => ({ course, rows: byUrgency(rows, now) }))
    .sort((left, right) => {
      const leftTop = left.rows[0];
      const rightTop = right.rows[0];
      if (leftTop === undefined || rightTop === undefined) return 0;
      const a = rank(leftTop, now);
      const b = rank(rightTop, now);
      return a[0] - b[0] || a[1] - b[1] || left.course.localeCompare(right.course, 'zh-Hans-CN');
    });
}

/** 排序用的两段键：先按「是否已过期」，再按截止时刻。 */
function rank(entry: PendingEntry, now: number): [number, number] {
  if (entry.overdue || (entry.deadline > 0 && entry.deadline < now)) return [1, 0];
  if (entry.deadline > 0) return [0, entry.deadline];
  return [0, Number.MAX_SAFE_INTEGER];
}

/** 组内排序：过期的排在最后，其余按截止升序，没有截止的排在最后。 */
function byUrgency(entries: PendingEntry[], now: number): PendingEntry[] {
  return [...entries].sort((left, right) => {
    const a = rank(left, now);
    const b = rank(right, now);
    return a[0] - b[0] || a[1] - b[1];
  });
}

export { PER_GROUP };

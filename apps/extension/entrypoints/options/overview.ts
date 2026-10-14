/*
 * 概览页：左树 + 一张表。
 *
 * 布局照的是邮件客户端与文件管理器那一类（master-detail）：左边选范围，右边看内容。
 * 树的层级是 **平台 → 课程 → 类别**，也就是用户脑子里的分组方式；表格里一行一件事。
 *
 * 原来这里有两块重复内容（任务清单与单元明细，都在列单元、各有刷新按钮与
 * 「上次读取」）。现在合成一张表：明细的得分就是「得分」列，两处读取入口
 * 合成右上角那一个「读取最新」。
 *
 * 表格本身（表头、排序、无障碍属性）在 task-table.ts。这一层只做三件事：
 * 读数据、让树从数据里长出来、把选中范围交给表。
 *
 * 数据全部来自本地快照：打开这一页不向平台发请求（隐私承诺里写着这条）。
 * 要读平台只有「读取最新」那一个显式动作，而且任一平台正在执行时它被禁用——
 * 两边同时写快照会互相覆盖，用户看到的会是半新半旧的那一份。
 */

import '@shoelace-style/shoelace/dist/components/tree/tree.js';
import '@shoelace-style/shoelace/dist/components/tree-item/tree-item.js';
import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js';
import '@shoelace-style/shoelace/dist/components/switch/switch.js';

import type { PlatformOverview, PlatformViews } from '../../src/platforms/types.ts';
import { button } from '../../src/ui';
import { formatDateTime } from '../../src/ui/format';
import { mountTaskTable, type ScopedRow } from './task-table.ts';

export interface OverviewView {
  host: HTMLElement;
  /** 重新读一遍本地快照并重画。执行结束后由推送触发，不等用户手动刷新 */
  reload: () => Promise<void>;
  /** 有没有平台正在执行：决定「读取最新」能不能点 */
  setBusy: (busy: boolean) => void;
}

/** 选中范围。三个字段由浅到深，null 表示这一层没收窄。 */
interface Scope {
  platform: string | null;
  course: string | null;
  kind: string | null;
}

const ALL: Scope = { platform: null, course: null, kind: null };

/** 悬停说明。正常与「等这一轮结束」两种状态各有一句，这一句两边共用，改措辞只有一处要动。 */
const REFRESH_HINT = '向平台读一次最新状态，读到的得分与截止会立刻更新到这张表';

export function mountOverview(platforms: PlatformViews[]): OverviewView {
  const tree = document.createElement('sl-tree');
  tree.selection = 'single';

  const taskTable = mountTaskTable();
  const meta = document.createElement('span');
  const refreshButton = button({
    label: '读取最新',
    variant: 'primary',
    size: 'medium',
    title: REFRESH_HINT,
    onClick: () => {
      void refresh();
    },
  });
  const onlyOpen = document.createElement('sl-switch');
  onlyOpen.checked = true;
  onlyOpen.textContent = '只看没做完的';

  let overviews: PlatformOverview[] = [];
  let rows: ScopedRow[] = [];
  let scope: Scope = ALL;

  const aside = document.createElement('div');
  aside.className = 'sp-side';
  aside.append(tree);

  const panel = document.createElement('sl-split-panel');
  panel.position = 22;
  panel.style.flex = '1';
  const sideSlot = document.createElement('div');
  sideSlot.slot = 'start';
  sideSlot.append(aside);
  const mainSlot = document.createElement('div');
  mainSlot.slot = 'end';
  mainSlot.className = 'sp-main';

  const toolbar = document.createElement('div');
  toolbar.className = 'sp-toolbar';
  toolbar.append(meta, onlyOpen, refreshButton);
  mainSlot.append(toolbar, taskTable.host);
  panel.append(sideSlot, mainSlot);

  const host = document.createElement('div');
  host.className = 'sp-overview';
  host.append(panel);

  /*
   * 树由数据本身长出来：有哪几门课、出现过哪几类，就列哪几项。
   *
   * 标签写进 textContent 而不是 label 属性：sl-tree-item 没有 label 这个属性，
   * 它把默认插槽里的文本当标签、把子树项挪进子容器。写属性的话整棵树是空的。
   */
  function paintTree(): void {
    tree.replaceChildren();
    for (const overview of overviews) {
      const platformNode = document.createElement('sl-tree-item');
      platformNode.textContent = overview.name;
      platformNode.expanded = true;
      platformNode.dataset.platform = overview.id;

      const byCourse = new Map<string, Set<string>>();
      for (const row of overview.rows) {
        const kinds = byCourse.get(row.course) ?? new Set<string>();
        kinds.add(row.kind);
        byCourse.set(row.course, kinds);
      }
      for (const [course, kinds] of byCourse) {
        const courseNode = document.createElement('sl-tree-item');
        courseNode.textContent = `${course} ${countOf(overview, course, null)}`;
        courseNode.dataset.platform = overview.id;
        courseNode.dataset.course = course;
        for (const kind of [...kinds].sort()) {
          const kindNode = document.createElement('sl-tree-item');
          kindNode.textContent = `${kind} ${countOf(overview, course, kind)}`;
          kindNode.dataset.platform = overview.id;
          kindNode.dataset.course = course;
          kindNode.dataset.kind = kind;
          courseNode.append(kindNode);
        }
        platformNode.append(courseNode);
      }
      tree.append(platformNode);
    }
  }

  /** 括号里那对数字是「没做完的 / 一共的」：扫一眼就知道哪门课值得点进去 */
  function countOf(overview: PlatformOverview, course: string, kind: string | null): string {
    const picked = overview.rows.filter((row) => row.course === course && (kind === null || row.kind === kind));
    return `(${picked.filter((row) => row.state !== 'done').length}/${picked.length})`;
  }

  /*
   * 组件事件是 sl-selection-change，detail.selection 是选中项数组。
   * 写成 sl-select 的话监听永远不触发，表格也就不会跟着左树收窄。
   */
  tree.addEventListener('sl-selection-change', (event) => {
    const selected = (event as CustomEvent<{ selection: HTMLElement[] }>).detail.selection[0];
    if (selected === undefined) return;
    scope = {
      platform: selected.dataset.platform ?? null,
      course: selected.dataset.course ?? null,
      kind: selected.dataset.kind ?? null,
    };
    paintTable();
  });

  onlyOpen.addEventListener('sl-change', paintTable);

  function paintTable(): void {
    const open = onlyOpen.checked === true;
    const picked = rows.filter(
      (row) =>
        (scope.platform === null || row.platformId === scope.platform) &&
        (scope.course === null || row.course === scope.course) &&
        (scope.kind === null || row.kind === scope.kind) &&
        (!open || row.state !== 'done'),
    );
    meta.textContent = `显示 ${taskTable.render(picked)} / ${rows.length} 项 · ${sourceText()}`;
  }

  /*
   * 数据来源一一说清。
   *
   * 每个平台各自记自己那次读取：合并成一句「上次读取」在有两个平台时会说谎——
   * 其中一个是刚读的、另一个是一周前读的，而这一栏的作用就是让人判断能不能信。
   * 只有一个平台时不写平台名，那一行本来就属于它。
   */
  function sourceText(): string {
    const parts = overviews.map((overview) => {
      const label = overviews.length > 1 ? `${overview.name} ` : '';
      if ('error' in overview.source) return `${label}读取失败：${overview.source.error}`;
      if (overview.source.at === 0) return `${label}还没有读取过`;
      return `${label}上次读取 ${formatDateTime(overview.source.at)}`;
    });
    return parts.join(' · ');
  }

  async function reload(): Promise<void> {
    overviews = await Promise.all(platforms.map((platform) => platform.overview()));
    rows = overviews.flatMap((overview) => overview.rows.map((row) => ({ ...row, platformId: overview.id })));
    paintTree();
    paintTable();
  }

  async function refresh(): Promise<void> {
    refreshButton.setAttribute('disabled', '');
    try {
      for (const platform of platforms) await platform.refresh();
    } finally {
      // 只收回自己刚设的那个禁用：能不能读由推送那一侧的 setBusy 说，这里不替它决定
      refreshButton.removeAttribute('disabled');
    }
    await reload();
  }

  /**
   * 执行中禁用「读取最新」。
   *
   * 那一轮自己就在写快照，两边同时读会互相覆盖，用户看到的是半新半旧的那一份，
   * 而且没有任何地方会说明这件事。禁用时说清楚为什么禁用，别让人对着灰按钮猜。
   */
  function setBusy(busy: boolean): void {
    if (busy) {
      refreshButton.setAttribute('disabled', '');
      refreshButton.setAttribute('title', '有平台正在执行，等这一轮结束再读');
    } else {
      refreshButton.removeAttribute('disabled');
      refreshButton.setAttribute('title', REFRESH_HINT);
    }
  }

  return { host, reload, setBusy };
}

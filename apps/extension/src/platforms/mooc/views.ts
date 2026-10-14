/*
 * 慕课的看板分区（前台半边）。
 *
 * 这里是"慕课在看板里长什么样"的全部：筛选条、清单、单元明细，以及它们各自的按钮。
 * 外壳只给一个容器，它不认识 courseId、类别、做法、状态这些字段——那些是慕课的事。
 *
 * 打开时只读本地快照（不向平台发请求）；单元明细是唯一会发请求的地方，由按钮显式触发。
 * 页内锚点 `#unit-details` 也由这里创建：它是慕课明细自己的段落标记。
 * 通知的深链用的是外壳那个稳定的容器 `#platforms`（见 background/wiring.ts）。
 */

import { formatDateTime } from '../../features/format';
import { sendToBackground } from '../../platform/messaging';
import { button } from '../../ui';
import type { PlatformViews } from '../types.ts';
import {
  boardItems,
  DEFAULT_FILTERS,
  filterItems,
  kindOptions,
  MODE_LABEL,
  renderBoard,
  STATE_FILTERS,
  type BoardItem,
  type Filters,
} from './board.ts';
import { detailsView } from './details.ts';
import type { Snapshot } from './read';

/*
 * 选项。选中状态在**创建时**用属性写死，而不是建完再回填 `select.value`：
 * 后者依赖宿主实现（测试里用的 linkedom 把它实现为只读），而属性写法两边都成立。
 */
function option(value: string, label: string, selected = false): HTMLOptionElement {
  const element = document.createElement('option');
  element.value = value;
  element.textContent = label;
  if (selected) element.setAttribute('selected', '');
  return element;
}

function labelled(text: string, control: HTMLElement): HTMLLabelElement {
  const label = document.createElement('label');
  label.className = 'filter';
  label.append(text, control);
  return label;
}

export const moocViews: PlatformViews = {
  id: 'mooc',
  name: '中国大学 MOOC',

  async render(host: HTMLElement): Promise<number> {
    let filters: Filters = { ...DEFAULT_FILTERS };
    let snapshot: Snapshot | null = null;

    const courseEl = document.createElement('select');
    const kindEl = document.createElement('select');
    const modeEl = document.createElement('select');
    const stateEl = document.createElement('select');
    const fetchedEl = document.createElement('span');
    fetchedEl.className = 'fetched';

    const bar = document.createElement('div');
    bar.className = 'filters';
    bar.append(
      labelled('课程', courseEl),
      labelled('类别', kindEl),
      labelled('做法', modeEl),
      labelled('状态', stateEl),
      button({
        label: '重读快照',
        outline: true,
        size: 'medium',
        title: '只读本地快照，不向平台发请求',
        onClick: () => {
          void paint();
        },
      }),
      fetchedEl,
    );

    const board = document.createElement('div');

    /*
     * 单元明细。看板回答「整体还剩什么」，明细是这份答案的逐项展开。
     * `onRefreshed` 在读过平台之后触发：后台读明细时顺手刷新了快照，
     * 不重画清单两块画面就来自两个时刻。
     */
    const details = detailsView(() => {
      void paint();
    });
    const detailsSection = document.createElement('section');
    detailsSection.className = 'sp-section';
    detailsSection.id = 'unit-details';

    const detailsTitle = document.createElement('h2');
    detailsTitle.className = 'sp-section-title';
    detailsTitle.textContent = '单元明细';

    const detailsDesc = document.createElement('p');
    detailsDesc.className = 'sp-section-desc';
    detailsDesc.textContent =
      '已勾选课程下的全部测验、作业与考试。打开时显示本地快照里的那一份，点「读取最新明细」读取平台上此刻的状态与得分。';

    detailsSection.append(detailsTitle, detailsDesc, details.element);
    host.append(bar, board, detailsSection);

    function fillOptions(): void {
      courseEl.replaceChildren(
        option('all', '全部课程', filters.courseId === 'all'),
        ...(snapshot?.courses ?? []).map((course) =>
          option(String(course.courseId), course.courseName, String(course.courseId) === filters.courseId),
        ),
      );
      kindEl.replaceChildren(
        option('all', '全部类别', filters.kind === 'all'),
        ...kindOptions(snapshot).map((kind) => option(kind, kind, kind === filters.kind)),
      );
      modeEl.replaceChildren(
        option('all', '全部做法', filters.mode === 'all'),
        ...Object.entries(MODE_LABEL).map(([value, label]) => option(value, label, value === filters.mode)),
      );
      stateEl.replaceChildren(
        ...STATE_FILTERS.map(({ value, label }) => option(value, label, value === filters.state)),
      );
    }

    function allItems(): BoardItem[] {
      return (snapshot?.courses ?? []).flatMap(boardItems);
    }

    /** 画清单与筛选条。明细区不在这里重画：它有自己的来源标注（快照 / 平台最新）。 */
    async function paint(): Promise<number> {
      try {
        const outcome = await sendToBackground({ type: 'DASHBOARD' });
        if (outcome.status !== 'ok') {
          fetchedEl.textContent = `读取失败：${outcome.message}`;
          return 0;
        }
        snapshot = outcome.value;
      } catch (error) {
        fetchedEl.textContent = `读取失败：${error instanceof Error ? error.message : String(error)}`;
        return 0;
      }

      fetchedEl.textContent = snapshot?.fetchedAt
        ? `上次读取：${formatDateTime(snapshot.fetchedAt)}`
        : '还没有读取过数据';
      fillOptions();
      renderBoard(board, snapshot, filterItems(allItems(), filters));
      return snapshot?.fetchedAt ?? 0;
    }

    for (const [element, key] of [
      [courseEl, 'courseId'],
      [kindEl, 'kind'],
      [modeEl, 'mode'],
      [stateEl, 'state'],
    ] as const) {
      element.addEventListener('change', () => {
        filters = { ...filters, [key]: element.value };
        void paint();
      });
    }

    const fetchedAt = await paint();
    // 明细区的第一份用同一份快照画，两块画面因此来自同一时刻
    details.renderSnapshot(snapshot);
    return fetchedAt;
  },
};

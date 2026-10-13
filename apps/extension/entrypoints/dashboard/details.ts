/*
 * 看板上的单元明细。
 *
 * 完整明细（平台的状态说法、互评进度、成绩公布）只有向平台读一次才有；
 * 看板的原则是「打开时不产生网络活动」，因此这里分两份：
 *   打开时    用本地快照的中立模型渲染，标注「来自本地快照（上次读取 …）」
 *   点按钮后  向平台读一次，换成完整明细，标注「平台最新（读取于 …）」
 * 两份都写清来源与时间——内容长得一样、可信度不同，不标出来用户无从分辨。
 *
 * 快照那一份只列测验、作业与考试：明细表回答的是「这门课我做到哪了」，
 * 与看板本体的任务列表分工不同。课件单元在平台上没有这样的状态可言。
 */

import type { DashboardView, Task, TaskKind } from '../../src/domain/task';
import { formatDateTime } from '../../src/features/format';
import { sendToBackground } from '../../src/platform/messaging';
import { button } from '../../src/ui';
import {
  detailSource,
  detailTable,
  type DetailGroup,
  type DetailRow,
} from '../../src/ui/details.ts';
import { unitGroups } from './unit-rows.ts';

/** 快照那一份列出的类别，与平台那一份的范围一致：测验、作业、两种考试。 */
const WORK_KINDS: TaskKind[] = ['quiz', 'homework', 'exam-objective', 'exam-subjective'];

export interface DetailsView {
  element: HTMLElement;
  /** 用本地快照画一份。打开时与「重读快照」之后都走它。 */
  renderSnapshot: (view: DashboardView) => void;
}

/** 中立模型里只有三种状态，说法也照它说，不假装知道平台的那套。 */
function stateOf(task: Task): { text: string; tone: DetailRow['tone'] } {
  if (task.state === 'done') return { text: '已完成', tone: 'ok' };
  if (task.state === 'failed') return { text: '失败', tone: 'warn' };

  const late = task.dueAt !== undefined && task.dueAt > 0 && task.dueAt < Date.now();
  return { text: late ? '未完成，已过截止' : '未完成', tone: late ? 'warn' : 'active' };
}

function snapshotRow(task: Task): DetailRow {
  const state = stateOf(task);
  const scored = task.maxScore !== undefined;

  return {
    key: task.id,
    name: task.title,
    status: state.text,
    tone: state.tone,
    statusTitle: '来自本地快照的中立状态，只有未完成、已完成与失败三种',
    when: task.dueAt ? formatDateTime(task.dueAt) : '无',
    score: scored ? `${task.score ?? '—'} / ${task.maxScore}` : undefined,
    scoreTitle: scored ? `得分 ${task.score ?? '—'}，满分 ${task.maxScore}` : undefined,
    href: task.link,
  };
}

/** 快照那一份：按课程分组，顺序沿用课程与任务的既有顺序。 */
function snapshotGroups(view: DashboardView): DetailGroup[] {
  const groups: DetailGroup[] = [];
  for (const course of view.courses) {
    const rows = view.tasks
      .filter((task) => task.courseId === course.courseId && WORK_KINDS.includes(task.kind))
      .map(snapshotRow);
    if (rows.length > 0) groups.push({ course: course.name, rows });
  }
  return groups;
}

function hint(text: string): HTMLElement {
  const element = document.createElement('p');
  element.className = 'sp-hint';
  element.textContent = text;
  return element;
}

/**
 * 明细区。
 *
 * `onRefreshed` 在平台那一份拉回来之后调用：后台读明细时顺手刷新了本地快照，
 * 看板本体因此要重读一次，否则两块画面来自两个时刻。
 */
export function detailsView(onRefreshed: () => void): DetailsView {
  let current: DashboardView = { fetchedAt: 0, courses: [], tasks: [] };

  const source = detailSource('还没有读取过数据');
  const read = button({
    label: '读取最新明细',
    variant: 'primary',
    size: 'medium',
    title: '向平台读一次当前状态与得分，只读，不会改动平台上的任何数据',
    onClick: () => {
      void pull();
    },
  });

  const bar = document.createElement('div');
  bar.className = 'sp-details-bar';
  bar.append(source, read);

  const body = document.createElement('div');
  const element = document.createElement('div');
  element.append(bar, body);

  function paintSnapshot(): void {
    source.textContent = current.fetchedAt
      ? `来自本地快照（上次读取 ${formatDateTime(current.fetchedAt)}）`
      : '还没有读取过数据';
    body.replaceChildren(detailTable(snapshotGroups(current), '本地快照里还没有测验与作业。'));
  }

  /**
   * 向平台读一次。
   *
   * 这是本页唯一会发请求的地方，因此只由用户点按钮触发，并在来源那行写明
   * 读到了什么时刻的数据。失败也改写在同一行上——重画整块会把上一次的
   * 内容一起抹掉，而用户需要知道的是「刚才那次读取的结果」。
   */
  async function pull(): Promise<void> {
    read.setAttribute('disabled', '');
    source.textContent = '正在向平台读取…';

    try {
      const outcome = await sendToBackground({ type: 'UNIT_DETAILS' });

      if (outcome.status === 'error') {
        body.replaceChildren();
        if (outcome.reason === 'NOT_LOGGED_IN') {
          // 会话过期不是错误，是「需要重新登录一次」，因此给的是去处
          source.textContent = '平台明细未读取：登录状态已失效';
          body.append(
            hint('需要重新登录慕课平台后才能读取单元明细。'),
            button({
              label: '前往登录',
              href: 'https://www.icourse163.org/',
              outline: true,
              size: 'medium',
            }),
          );
          return;
        }
        source.textContent = `平台明细读取失败：${outcome.message}`;
        return;
      }

      source.textContent = `平台最新（读取于 ${formatDateTime(Date.now())}）`;
      body.replaceChildren(detailTable(unitGroups(outcome.value), '平台上没有可列出的单元。'));
      onRefreshed();
    } catch (error) {
      source.textContent = `平台明细读取失败：${
        error instanceof Error ? error.message : String(error)
      }`;
      body.replaceChildren();
    } finally {
      read.removeAttribute('disabled');
    }
  }

  paintSnapshot();

  return {
    element,
    renderSnapshot: (view) => {
      current = view;
      paintSnapshot();
    },
  };
}

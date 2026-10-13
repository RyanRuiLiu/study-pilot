/*
 * 弹窗内容的摆法。
 *
 * 分工：本文件决定「这一屏放哪几个东西、按什么顺序、写什么字」，控件怎么长
 * （Shoelace 组件 + tokens.css 的取值）在 src/ui/。取数与事件由 main.ts 传进来，
 * 因此这里不碰 browser 全局，测试可以在 linkedom 里直接把 DOM 建出来核对。
 *
 * 数据全部来自平台自己的待办汇总（PENDING_SUMMARY）：条目、计数、跳转地址都在里面。
 * 这里不认识"中立模型"——各平台的字段本来就不同，硬压成一种形状只会多出一层要维护的映射。
 */

import { MOOC_ORIGIN } from '@study-pilot/platform-mooc';
import type { PendingEntry, PendingSummary, TaskStatus } from '../../src/platform/messaging';
import { formatDateTime } from '../../src/features/format';
import { actionRow, button, countLine, navBar, statusLine, taskList, taskRow, type Tone } from '../../src/ui';

/** 这一屏只回答「现在先做哪几件」，多的不在这里铺开。 */
const TOP_COUNT = 5;

export interface PopupData {
  /** 后台此刻的运行状态，由后台的 TASK_STATE 判定，界面不自己猜 */
  live: TaskStatus['live'];
  /** 平台自己的待办汇总；未登录或读取失败时为 null（状态行已说明原因） */
  summary: PendingSummary | null;
  /** 需要重新登录。与一般失败分开：这里给的是去处，不是原因 */
  notLoggedIn: boolean;
  /**
   * 清单取自执行之前。
   *
   * 后台在执行期间刻意不重新拉取（两边同时写快照会互相覆盖），此时它回过来说明了这一点。
   * 带出来是为了把「清单为什么没跟着动」讲清楚，而不是让用户以为界面卡住了。
   */
  staleList: boolean;
  /** 读取失败的原因；null 表示没有失败 */
  error: string | null;
}

export interface PopupHandlers {
  /** 看板页地址，由入口用 runtime.getURL 给出 */
  dashboardUrl: string;
  onSettings: () => void;
}

export interface PopupView {
  /** 就地改写状态行。执行中与执行结果走它，不重画整屏 */
  setStatus: (text: string, tone: Tone) => void;
}

/**
 * 谁最紧要：已过截止的排在最后，其余按截止时间升序，没有截止的排在有截止的后面。
 *
 * 过期项排在最后不是藏起来，是别占住第一行：平台上已经做不了了，
 * 而用户打开弹窗是要看「现在还能做什么」。它们仍然在清单里，
 * 加上日期本身就是提醒（见 format.ts 的相对说法）。
 */
function byUrgency(entries: PendingEntry[], now: number): PendingEntry[] {
  const rank = (entry: PendingEntry): [number, number] => {
    if (entry.overdue) return [2, 0];
    if (entry.deadline > 0 && entry.deadline < now) return [2, 0];
    if (entry.deadline > 0) return [0, entry.deadline];
    return [1, 0];
  };

  return [...entries].sort((left, right) => {
    const [leftBucket, leftAt] = rank(left);
    const [rightBucket, rightAt] = rank(right);
    if (leftBucket !== rightBucket) return leftBucket - rightBucket;
    return leftAt - rightAt;
  });
}

function statusText(data: PopupData): string {
  if (data.error !== null) return data.error;
  if (data.notLoggedIn) return '登录状态已失效，需要重新登录慕课平台后才能读取待办。';
  if (data.live === 'running') {
    return data.staleList ? '正在执行，下面是执行前的清单，结束后会自动刷新' : '正在执行';
  }
  if (data.live === 'interrupted') return '上次运行未结束，下次检查时接着做';
  if (data.live === 'awaiting-login') return '等待登录，登录后接着完成';
  const fetchedAt = data.summary?.fetchedAt ?? 0;
  return fetchedAt > 0 ? `上次读取：${formatDateTime(fetchedAt)}` : '还没有读取过数据';
}

function statusTone(data: PopupData): Tone {
  if (data.error !== null || data.notLoggedIn) return 'error';
  return data.live === 'running' ? 'busy' : 'idle';
}

/** 计数：用平台自己的分项（会自动完成 / 需你处理 / 已过期），外壳不另算一遍。 */
function countParts(summary: PendingSummary): string[] {
  const parts = [`共 ${summary.entries.length} 项`, `会自动完成 ${summary.auto}`, `需你处理 ${summary.manual}`];
  if (summary.overdue > 0) parts.push(`已过期 ${summary.overdue}`);
  return parts;
}

/** 画整屏。取数失败或需要登录时不画清单：状态行已经说明了原因，清单谁都不信。 */
export function renderPopup(
  root: HTMLElement,
  data: PopupData,
  handlers: PopupHandlers,
): PopupView {
  const parts: HTMLElement[] = [statusLine(statusText(data), { tone: statusTone(data) })];

  if (data.notLoggedIn) {
    parts.push(
      actionRow([
        button({
          label: '前往登录',
          href: `${MOOC_ORIGIN}/`,
          title: '打开慕课平台登录页',
        }),
      ]),
    );
  } else if (data.error === null && data.summary !== null) {
    const entries = byUrgency(data.summary.entries, Date.now());
    parts.push(countLine(countParts(data.summary)));
    parts.push(
      taskList(
        entries.slice(0, TOP_COUNT).map((entry) =>
          taskRow({ title: entry.name, due: entry.deadline, href: entry.href }),
        ),
        '暂无待办。',
      ),
    );
  }

  parts.push(
    navBar([
      button({ label: '看板', href: handlers.dashboardUrl, title: '打开看板：整体还剩什么' }),
      button({ label: '设置', onClick: handlers.onSettings, title: '打开设置：它怎么运行' }),
    ]),
  );

  root.replaceChildren(...parts);
  return { setStatus: (text, tone) => setStatus(root, text, tone) };
}

/** 数据到达之前的过渡：状态行加一个转圈。 */
export function renderLoading(root: HTMLElement, text: string): void {
  root.replaceChildren(statusLine(text, { loading: true }));
}

/** 就地改写状态行：只换那一行，清单与入口不动。 */
function setStatus(root: HTMLElement, text: string, tone: Tone): void {
  const current = root.querySelector('.sp-status');
  if (current) current.replaceWith(statusLine(text, { tone }));
}

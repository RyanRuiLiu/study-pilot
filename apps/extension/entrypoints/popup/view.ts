/*
 * 弹窗内容的摆法。
 *
 * 分工：本文件决定「这一屏放哪几个东西、按什么顺序、写什么字」，控件怎么长
 * （Shoelace 组件 + tokens.css 的取值）在 src/ui/。取数与事件由 main.ts 传进来，
 * 因此这里不碰 browser 全局，测试可以在 linkedom 里直接把 DOM 建出来核对。
 *
 * 计数不在这里数：条数一律来自 domain/plan.ts 的 summarize（唯一来源）。
 */

import { MOOC_ORIGIN } from '@study-pilot/platform-mooc';
import { summarize } from '../../src/domain/plan';
import type { Task } from '../../src/domain/task';
import type { TaskStatus } from '../../src/platform/messaging';
import { formatDateTime } from '../../src/features/format';
import { actionRow, button, countLine, navBar, statusLine, taskList, taskRow, type Tone } from '../../src/ui';

/** 这一屏只回答「现在先做哪几件」，多的不在这里铺开。 */
const TOP_COUNT = 5;

export interface PopupData {
  /** 后台此刻的运行状态，由后台的 TASK_STATE 判定，界面不自己猜 */
  live: TaskStatus['live'];
  /** 中立模型里的全部任务，来自读本地快照的 DASHBOARD */
  tasks: Task[];
  /** 快照的读取时刻；0 表示还没读过 */
  fetchedAt: number;
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
 * 待办 = 未完成、且有截止时间的任务。
 *
 * 课件单元（视频、文档、随堂测验）没有截止时间，后台一件件做掉即可，
 * 不算用户要交的东西；把它们算进来会让计数与清单都被它们撑满。
 */
function pending(tasks: Task[]): Task[] {
  return tasks.filter((task) => task.state !== 'done' && task.dueAt !== undefined);
}

/**
 * 谁最紧要：按截止时间升序，已过截止的排在最后。
 *
 * 过期项排在最后不是藏起来，是别占住第一行：平台上已经做不了了，
 * 而用户打开弹窗是要看「现在还能做什么」。它们仍然在清单里，
 * 加上日期本身就是提醒（见 format.ts 的相对说法）。
 */
function byUrgency(tasks: Task[], now: number): Task[] {
  return [...tasks].sort((left, right) => {
    const leftLate = (left.dueAt ?? 0) < now;
    const rightLate = (right.dueAt ?? 0) < now;
    if (leftLate !== rightLate) return leftLate ? 1 : -1;
    return (left.dueAt ?? 0) - (right.dueAt ?? 0);
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
  return data.fetchedAt > 0 ? `上次读取：${formatDateTime(data.fetchedAt)}` : '还没有读取过数据';
}

function statusTone(data: PopupData): Tone {
  if (data.error !== null || data.notLoggedIn) return 'error';
  return data.live === 'running' ? 'busy' : 'idle';
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
  } else if (data.error === null) {
    const open = pending(data.tasks);
    parts.push(countLine(summarize(open)));
    parts.push(
      taskList(
        byUrgency(open, Date.now())
          .slice(0, TOP_COUNT)
          .map((task) => taskRow(task)),
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

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
import type { PendingSummary, TaskStatus } from '../../src/browser/messaging';
import { formatDateTime } from '../../src/ui/format';
import { button, statusLine, type Tone } from '../../src/ui';
import { byCourse, courseHeading, entryRow, summarySentence } from './rows.ts';

/**
 * 一门课在这一屏里最多铺几张纸条。
 *
 * 弹窗只回答「现在先做哪几件」：三门课各欠七八项时，把二十条排在这里
 * 等于让人滚半天，而滚完也记不住。每组三条足够看出这一组的形势，
 * 剩下的由下面那句「另有 N 项」领去概览。
 */
const PER_GROUP = 3;

export interface PopupData {
  /** 后台此刻的运行状态，由后台的 TASK_STATE 判定，界面不自己猜 */
  live: TaskStatus['live'];
  /** 平台自己的待办汇总；未登录或读取失败时为 null（状态行已说明原因） */
  summary: PendingSummary | null;
  /**
   * 课件单元的完成情况，来自同一份快照。
   *
   * 只说「要交的东西」不够：没事可交的时候，用户真正想知道的是「还剩多少没看」，
   * 而这件事只有快照里的 completePercent 知道。
   */
  courseware: { unfinished: number; total: number } | null;
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
  /**
   * 上一轮自动执行记下的失败原因；null 表示没有需要交代的失败。
   *
   * 由后台记录（`scheduler.recordRunFailure`），界面只负责显示。没有它的话，
   * 「今天什么都没做」与「试了但失败了」看起来一样。
   */
  lastError: string | null;
}

export interface PopupHandlers {
  /** 主页面（概览标签）地址，由入口用 runtime.getURL 给出 */
  pageUrl: string;
  onSettings: () => void;
}

export interface PopupView {
  /** 就地改写状态行。执行中与执行结果走它，不重画整屏 */
  setStatus: (text: string, tone: Tone) => void;
}



/**
 * 状态那一句说什么。平静时是"上次读取 …"，其余按后台给的状态与错误如实说，
 * 界面不解释、也不改写成更好听的说法。
 */
function statusText(data: PopupData): string {
  if (data.error !== null) return data.error;
  if (data.notLoggedIn) return '登录状态已失效，需要重新登录慕课平台后才能读取待办。';
  if (data.live === 'running') {
    return data.staleList ? '正在执行，下面是执行前的清单，结束后会自动刷新' : '正在执行';
  }
  if (data.live === 'interrupted') return '上次运行未结束，下次检查时接着做';
  if (data.live === 'awaiting-login') return '等待登录，登录后接着完成';
  // 后台记下的失败：原因照原文显示，界面不解释、也不改写成一个更好听的说法
  if (data.lastError !== null) return `上次执行没有完成：${data.lastError}`;
  const fetchedAt = data.summary?.fetchedAt ?? 0;
  return fetchedAt > 0 ? `上次读取：${formatDateTime(fetchedAt)}` : '还没有读取过数据';
}

function statusTone(data: PopupData): Tone {
  /*
   * 上一次执行留下的失败也算「需要注意」：它有实际内容要说（平台回了什么错），
   * 用一行灰色小字说出来会被当成背景信息划过去。平静状态只剩「上次读取 …」。
   */
  if (data.error !== null || data.notLoggedIn || data.lastError !== null) return 'error';
  return data.live === 'running' ? 'busy' : 'idle';
}

/** 一句不需要被当成告警的说明。 */
function note(text: string): HTMLElement {
  const element = document.createElement('p');
  element.className = 'sp-note';
  element.textContent = text;
  return element;
}

/**
 * 状态那一句该长什么样。
 *
 * 平静状态（只是"上次读取 …"）用一行小字，不用 sl-alert：那是带底色的整块提示，
 * 每次打开弹窗都弹出这么一块，只会把真正要看的清单往下挤。
 * 忙碌、出错、需要登录时才用告警条——那时它确实要人注意。
 */
function statusElement(text: string, tone: Tone): HTMLElement {
  return tone === 'idle' ? note(text) : statusLine(text, { tone });
}

/** 画整屏。取数失败或需要登录时不画清单：状态行已经说明了原因，清单谁都不信。 */
export function renderPopup(
  root: HTMLElement,
  data: PopupData,
  handlers: PopupHandlers,
): PopupView {
  const status = statusElement(statusText(data), statusTone(data));
  const parts: HTMLElement[] = [status];
  if (data.notLoggedIn) {
    parts.push(
      button({
        label: '前往登录',
        href: `${MOOC_ORIGIN}/`,
        title: '打开慕课平台登录页',
      }),
    );
  } else if (data.error === null && data.summary !== null) {
    const entries = data.summary.entries;

    if (entries.length === 0) {
      const none = document.createElement('p');
      none.textContent = '没有要交的东西。';
      parts.push(none);

      /*
       * 无事可交时补一句「还剩什么」：用户打开弹窗本来是想知道今天还有什么事没做，
       * 只说「没有要交的」等于什么都没说。单元的完成度只在快照里。
       */
      if (data.courseware !== null && data.courseware.unfinished > 0) {
        const left = document.createElement('small');
        left.textContent = `还有 ${data.courseware.unfinished} 项课件没看完，共 ${data.courseware.total} 项，概览里能按课程看。`;
        parts.push(left);
      }
    } else {
      const note = document.createElement('small');
      note.textContent = summarySentence(data.summary);
      parts.push(note);

      const groups = byCourse(entries, Date.now());
      for (const group of groups) {
        parts.push(courseHeading(group.course, group.rows.length));
        for (const entry of group.rows.slice(0, PER_GROUP)) parts.push(entryRow(entry));
      }

      const hidden = groups.reduce((sum, group) => sum + Math.max(0, group.rows.length - PER_GROUP), 0);
      if (hidden > 0) {
        const more = document.createElement('small');
        more.textContent = `另有 ${hidden} 项没列出来，概览里能看全部。`;
        parts.push(more);
      }
    }
  }

  const foot = document.createElement('div');
  foot.className = 'foot';
  foot.append(
    button({ label: '概览', variant: 'text', href: handlers.pageUrl, title: '打开概览：整体还剩什么' }),
    button({ label: '设置', variant: 'text', onClick: handlers.onSettings, title: '打开设置：它怎么运行' }),
  );
  parts.push(foot);

  root.replaceChildren(...parts);
  /*
   * 就地改写状态：整块重建而不是改属性。
   *
   * 状态会在「忙碌」与「平静」之间来回（跑完一轮就降回平静），两者的元素类型不同，
   * 因此这里记住**当前**那一个再替换——否则第二次更新落在已经被换掉的旧元素上，
   * 界面上什么都不会变。
   */
  let current = status;
  return {
    setStatus: (text, tone) => {
      const next = statusElement(text, tone);
      current.replaceWith(next);
      current = next;
    },
  };
}

/** 数据到达之前的过渡：状态行加一个转圈。 */
export function renderLoading(root: HTMLElement, text: string): void {
  root.replaceChildren(statusLine(text, { loading: true }));
}

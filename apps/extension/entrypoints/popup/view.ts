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
import type { PendingEntry, PendingSummary, TaskStatus } from '../../src/browser/messaging';
import { formatDateTime } from '../../src/ui/format';
import { relativeDay } from '../../src/ui/format.ts';
import { button, statusLine, type Tone } from '../../src/ui';

/**
 * 一门课在这一屏里最多铺几张纸条。
 *
 * 弹窗只回答「现在先做哪几件」：三门课各欠七八项时，把二十条排在这里
 * 等于让人滚半天，而滚完也记不住。每组三条足够看出这一组的形势，
 * 剩下的由下面那句「另有 N 项」领去概览。
 */
const PER_COURSE = 3;

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
 * 谁最紧要：已过截止的排在最后，其余按截止时间升序，没有截止的排在有截止的后面。
 *
 * 过期项排在最后不是藏起来，是别占住第一行：平台上已经做不了了，
 * 而用户打开弹窗是要看「现在还能做什么」。它们仍然在清单里，
 * 加上日期本身就是提醒（见 format.ts 的相对说法）。
 */
function urgencyRank(entry: PendingEntry, now: number): [number, number] {
  if (entry.overdue) return [2, 0];
  if (entry.deadline > 0 && entry.deadline < now) return [2, 0];
  if (entry.deadline > 0) return [0, entry.deadline];
  return [1, 0];
}

function byUrgency(entries: PendingEntry[], now: number): PendingEntry[] {
  return [...entries].sort((left, right) => {
    const [leftBucket, leftAt] = urgencyRank(left, now);
    const [rightBucket, rightAt] = urgencyRank(right, now);
    if (leftBucket !== rightBucket) return leftBucket - rightBucket;
    if (leftAt !== rightAt) return leftAt - rightAt;
    return left.name.localeCompare(right.name, 'zh-Hans-CN');
  });
}

/** 一组：一门课和它欠着的那些事，外加「这一组排第几」的两个依据。 */
interface CourseGroup {
  course: string;
  rows: PendingEntry[];
  /** 这一组里最紧要那件事的档位与时刻，与 urgencyRank 同源；组间按它排 */
  rank: number;
  at: number;
}

/**
 * 按课程分好组。
 *
 * 分组而不是排成一条按时间来的长清单，是因为这一屏要先回答「哪门课欠得多、
 * 欠的是什么」；时间只在组内排序用。组的先后按各自最紧要的那件事排，
 * 于是第一组永远是眼下最该看的课。
 */
function byCourse(entries: PendingEntry[], now: number): CourseGroup[] {
  const grouped = new Map<string, CourseGroup>();

  for (const entry of entries) {
    const [rank, at] = urgencyRank(entry, now);
    const group = grouped.get(entry.courseName);
    if (group === undefined) {
      grouped.set(entry.courseName, { course: entry.courseName, rows: [entry], rank, at });
      continue;
    }
    group.rows.push(entry);
    if (rank < group.rank || (rank === group.rank && at < group.at)) {
      group.rank = rank;
      group.at = at;
    }
  }

  return [...grouped.values()]
    .sort(
      (left, right) =>
        left.rank - right.rank ||
        left.at - right.at ||
        left.course.localeCompare(right.course, 'zh-Hans-CN'),
    )
    .map((group) => ({ ...group, rows: byUrgency(group.rows, now) }));
}

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

/**
 * 一句话说清「要交的东西有多少、其中多少不用你管」。
 *
 * 先前这里是「共 3 项 · 会自动完成 1 · 需你处理 2」这种用中点拼接的标签串：
 * 读起来像仪表盘，不像人说话。改用陈述句，信息一个不少。
 */
function summarySentence(summary: PendingSummary): string {
  const head = `有 ${summary.entries.length} 项要交`;
  const auto = summary.auto > 0 ? `，其中 ${summary.auto} 项会自动完成` : '';
  const manual = summary.manual > 0 ? `，${summary.manual} 项要你自己做` : '';
  const overdue = summary.overdue > 0 ? `，${summary.overdue} 项已过期` : '';
  return `${head}${auto}${manual}${overdue}。`;
}

/** 类别只有五种，说法照平台自己的分法，不另造词。 */
const KIND_LABEL: Record<PendingEntry['kind'], string> = {
  'submit-quiz': '测验',
  'submit-homework': '作业',
  'evaluate-homework': '互评',
  'self-evaluate': '自评',
  'submit-exam': '考试',
};

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
function courseHeading(name: string, count: number): HTMLElement {
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
function entryRow(entry: PendingEntry): HTMLElement {
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
        for (const entry of group.rows.slice(0, PER_COURSE)) parts.push(entryRow(entry));
      }

      const hidden = groups.reduce((sum, group) => sum + Math.max(0, group.rows.length - PER_COURSE), 0);
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

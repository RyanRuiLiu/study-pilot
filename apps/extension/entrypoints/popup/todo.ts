/*
 * 待办区：取数、分组、空/失败/未登录三种状态的呈现。
 *
 * 布局依据：用户打开弹窗的动作是「看有什么要交，然后点进去做」。
 * 因此待办是主体，按课程归拢——回答的是「这门课我还要交什么」，
 * 而不是「按时间最紧的是哪条」；课程内部再按截止升序。
 *
 * 三种情况分别呈现，不混为一谈：
 *   失败            显示失败原因
 *   成功但无事可办   显示「暂无待办」——这是确切结论，不是读取不出
 *   成功且有事项     逐条列出，过期项单独一段垫底
 *
 * 界面只经 src/ui-bridge.ts 取数：getPending / getSettings / WORK_STATUS。
 */

import { getPending, getSettings, WORK_STATUS } from '../../src/ui-bridge';
import type { PendingEntry } from '../../src/ui-bridge';
import { formatClock, formatDate, isUrgent, relativeDay } from '../../src/ui/format.ts';
import { todoEl } from './elements.ts';

/** 每类待办对应什么，以及点进去打开哪个页面（href 由平台拼好，这里不拼 URL）。 */
const KIND_TEXT: Record<PendingEntry['kind'], string> = {
  'submit-quiz': '单元测验',
  'submit-homework': '单元作业',
  'evaluate-homework': '互评作业',
  'self-evaluate': '自评作业',
  'submit-exam': '考试',
};

/**
 * 处置说法。这一格要回答的是「这条我要不要管」，说清两件事：
 * **要不要你动手、点了执行会不会替你完成**。
 *
 * 措辞按正式文案处理：不用「扩展」作主语（那是开发者的说法）；
 * 「评分」不简作「评」（简称在固定搭配里才成立，这里不是）。
 */
function handlingText(entry: PendingEntry): string {
  if (entry.overdue) {
    // 已过截止的说清后果：用户可能仍去点它、然后发现做不了
    return '已过截止，无法补做';
  }
  if (entry.handling === 'auto') {
    // 互评类带进度：还差几份直接关系到会不会影响成绩
    if (entry.kind === 'evaluate-homework' && entry.evaluateTotal !== null && entry.evaluateDone !== null) {
      const left = entry.evaluateTotal - entry.evaluateDone;
      return `执行时替你评分，还差 ${left} 份`;
    }
    return '执行时替你完成';
  }
  // 人工项要说明只有用户能做，否则他会以为等着就会被处理
  return '需要你完成';
}

/**
 * 构造一条待办。两行：
 *   上行  任务名  [阶段]        还剩多久
 *   下行  处置                  具体日期
 *
 * 阶段只在有真阶段时显示（互评阶段、成绩已公布……）；「未提交」是通用说法，
 * 处置那一格已经回答了要不要动手，再挂一个标签只是噪音。
 *
 * 相对时间与具体日期分列两行，是为了不把一行撑成三行：
 * 相对说法让人一眼判断远近，具体日期用来核对。
 */
function buildRow(entry: PendingEntry): HTMLElement {
  /*
   * 过期项不做成链接：点进去也做不了（平台不接受逾期提交）。
   * 给一个能点的东西等于邀请用户点进去也无法处理，
   * 而这一行要传达的正是「这件事已经结束」。
   */
  const row = entry.overdue ? document.createElement('div') : document.createElement('a');
  row.className = 'todo-row';

  if (row instanceof HTMLAnchorElement) {
    row.href = entry.href;
    row.target = '_blank';
    row.rel = 'noreferrer';
    row.title = `打开${KIND_TEXT[entry.kind]}页面`;
  } else {
    row.title = entry.statusDetail;
  }

  // 上行：任务名、阶段（可选）、相对时间
  const line = document.createElement('span');
  line.className = 'todo-line';

  const name = document.createElement('span');
  name.className = 'todo-name';
  name.textContent = entry.name;
  line.append(name);

  if (entry.status !== WORK_STATUS.UNSUBMITTED) {
    const phase = document.createElement('span');
    phase.className = 'todo-phase';
    phase.textContent = entry.status;
    line.append(phase);
  }

  const when = document.createElement('span');
  when.className = 'todo-when';
  if (isUrgent(entry.deadline)) when.classList.add('is-urgent');
  when.textContent = `${relativeDay(entry.deadline)} ${formatClock(entry.deadline)}`.trim();
  line.append(when);

  // 下行：处置与具体日期
  const sub = document.createElement('span');
  sub.className = 'todo-sub';

  const handling = document.createElement('span');
  handling.className = 'todo-handling';
  if (entry.overdue) handling.classList.add('is-overdue');
  else if (entry.handling === 'auto') handling.classList.add('is-auto');
  handling.textContent = handlingText(entry);

  const date = document.createElement('span');
  date.className = 'todo-date';
  date.textContent = formatDate(entry.deadline);

  sub.append(handling, date);
  row.append(line, sub);
  return row;
}

/** 一句提示文案的段落元素。 */
function note(className: string, text: string): HTMLElement {
  const element = document.createElement('p');
  element.className = className;
  element.textContent = text;
  return element;
}

/**
 * 覆盖待办区的内容。
 *
 * 统一走这里，是为了不遗漏加载态：待办区在数据到达前先显示一句
 * 「正在获取最新数据」。若某个分支直接 replaceChildren，那句提示
 * 会一直留在页面上，与真正的内容并存。
 */
function writeTodo(children: Node[]): void {
  todoEl.classList.remove('is-loading');
  todoEl.replaceChildren(...children);
}

/** 待办区呈现失败状态。 */
function setTodoError(message: string): void {
  writeTodo([note('todo-error', `读取失败：${message}`)]);
}

/**
 * 待办区呈现「需要登录」。
 *
 * 与失败状态在样式与措辞上都分开：失败是一句解释，这里是给一个去处。
 * 会话 cookie 是会话级的，关浏览器几天再打开就会过期，
 * 用户遇到的多半是这种情况——他并没有做错什么，只是需要重新登录一次。
 */
function showLoginPrompt(): void {
  const box = document.createElement('div');
  box.className = 'todo-login';

  const text = note('todo-login-text', '登录状态已失效，需要重新登录慕课平台后才能读取待办。');

  const link = document.createElement('a');
  link.className = 'todo-login-link';
  link.href = 'https://www.icourse163.org/';
  link.target = '_blank';
  link.rel = 'noreferrer';
  link.textContent = '前往登录';

  box.append(text, link);
  writeTodo([box]);
}

/** 按课程归拢，课程内保持后台给出的截止时间升序。 */
function groupByCourse(entries: PendingEntry[]): Map<string, PendingEntry[]> {
  const grouped = new Map<string, PendingEntry[]>();
  for (const entry of entries) {
    const bucket = grouped.get(entry.courseName);
    if (bucket) bucket.push(entry);
    else grouped.set(entry.courseName, [entry]);
  }
  return grouped;
}

function buildGroup(title: string, entries: PendingEntry[], overdue: boolean): HTMLElement {
  const group = document.createElement('section');
  group.className = overdue ? 'todo-group is-overdue' : 'todo-group';

  const head = document.createElement('p');
  head.className = 'todo-course';

  const name = document.createElement('span');
  name.textContent = title;

  const count = document.createElement('span');
  count.className = 'todo-count';
  count.textContent = `${entries.length} 项`;

  head.append(name, count);
  group.append(head);
  for (const entry of entries) group.append(buildRow(entry));
  return group;
}

/** 渲染待办。 */
export async function renderTodo(): Promise<void> {
  const settings = await getSettings();
  const courses = settings.mooc.courses.filter((course) => course.enabled);
  if (courses.length === 0) {
    writeTodo([note('todo-empty', '尚未选择参与任务的课程。请到「更多」里读取课程列表并勾选。')]);
    return;
  }

  let outcome;
  try {
    /*
     * 不传课程列表：后台从配置里自己取。
     * 前台传过去的那份可能比存储里的旧（比如刚在设置页改过），
     * 而「读哪些课」这种事以配置为准才不会两边不一致。
     */
    outcome = await getPending();
  } catch (error) {
    setTodoError(error instanceof Error ? error.message : String(error));
    return;
  }

  if (outcome.status === 'error') {
    /*
     * 未登录与读取失败要分开说。未登录不是出错，是少做了一步：
     * 待办读不到是因为平台不知道该给谁读。
     */
    if (outcome.reason === 'NOT_LOGGED_IN') showLoginPrompt();
    else setTodoError(outcome.message);
    return;
  }

  /*
   * 过期项单独一段，不参与课程分组。
   *
   * 它们已经做不了了，混在待办里会占住第一屏——而用户打开弹窗是要看
   * 「现在做什么」。分开之后主列表只剩能做的事，过期项放在最后，
   * 既不挡住要紧的，也没被藏起来（他该知道自己漏了什么）。
   * 后台已经滤掉三天以上前的过期项（保留天数见设置），因此这一段不会累积。
   */
  const live = outcome.value.entries.filter((entry) => !entry.overdue);
  const overdue = outcome.value.entries.filter((entry) => entry.overdue);

  if (live.length === 0 && overdue.length === 0) {
    writeTodo([note('todo-empty', '暂无待办。')]);
    return;
  }

  writeTodo([]);
  for (const [courseName, list] of groupByCourse(live)) {
    todoEl.append(buildGroup(courseName, list, false));
  }
  if (overdue.length > 0) todoEl.append(buildGroup('已过截止', overdue, true));
}

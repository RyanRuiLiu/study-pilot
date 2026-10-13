/*
 * 待办区：取数、分组、空/失败/未登录三种状态的呈现。
 *
 * 布局依据：用户打开弹窗的动作是「看有什么要交，然后点进去做」。
 * 因此待办是主体，且按截止时间分档——回答的是「我先做什么」，
 * 而不是「这门课有什么」。
 *
 * 一条待办本身的构造见 `todo-row.ts`。
 */

import { sendToBackground, type PendingEntry } from '../../src/platform/messaging';
import type { Settings } from '../../src/settings';
import { todoEl } from './elements.ts';
import { buildRow, note } from './todo-row.ts';

/**
 * 覆盖待办区的内容。
 *
 * 统一走这里，是为了不遗漏加载态：待办区在数据到达前先显示一句
 * 「正在获取最新数据」，而弹窗每次打开都要拉一次，约两秒。
 * 若某个分支直接 replaceChildren，那句提示会一直留在页面上，
 * 与真正的内容并存。
 */
function writeTodo(children: Node[]): void {
  todoEl.classList.remove('is-loading');
  todoEl.replaceChildren(...children);
}

/** 待办区呈现失败状态。 */
function setTodoError(message: string): void {
  writeTodo([]);
  const box = document.createElement('div');
  box.className = 'todo-error';
  box.textContent = `读取失败：${message}`;
  todoEl.append(box);
}

/**
 * 待办区呈现「需要登录」。
 *
 * 与失败状态在样式与措辞上都分开：失败是一句解释，这里是给一个去处。
 * 会话 cookie 是会话级的，关浏览器几天再打开就会过期，
 * 用户遇到的多半是这种情况——他并没有做错什么，只是需要重新登录一次。
 */
function showLoginPrompt(): void {
  writeTodo([]);

  const box = document.createElement('div');
  box.className = 'todo-login';

  const text = document.createElement('p');
  text.className = 'todo-login-text';
  text.textContent = '登录状态已失效，需要重新登录慕课平台后才能读取待办。';

  const link = document.createElement('a');
  link.className = 'todo-login-link';
  link.href = 'https://www.icourse163.org/';
  link.target = '_blank';
  link.rel = 'noreferrer';
  link.textContent = '前往登录';

  box.append(text, link);
  todoEl.append(box);
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

/**
 * 渲染待办。
 *
 * 按课程分组：用户的注意力单位是「这门课我还要交什么」，按课程归拢
 * 比按时间平铺更贴近他做完一门再换下一门的方式。
 *
 * 三种情况分别呈现，不混为一谈：
 *   失败           显示失败原因
 *   成功但无事可办  显示「暂无待办」——这是确切结论，不是读取不出
 *   成功且有事项    逐条列出
 */
export async function renderTodo(settings: Settings): Promise<void> {
  const courses = settings.mooc.background.courses.filter((course) => course.enabled);
  if (courses.length === 0) {
    writeTodo([
      note('todo-empty', '尚未选择参与任务的课程。请到设置页读取课程列表并勾选。'),
    ]);
    return;
  }

  let outcome;
  try {
    /*
     * 不传课程列表：后台从配置里自己取。
     * 前台传过去的那份可能比存储里的旧（比如刚在设置页改过），
     * 而「读哪些课」这种事以配置为准才不会两边不一致。
     */
    outcome = await sendToBackground({ type: 'PENDING_SUMMARY' });
  } catch (error) {
    setTodoError(error instanceof Error ? error.message : String(error));
    return;
  }

  if (outcome.status === 'error') {
    /*
     * 未登录与读取失败要分开说。
     *
     * 未登录不是出错，是少做了一步：待办读不到是因为平台不知道该给谁读。
     * 尤其它发生在会话过期之后——用户什么都没做错，只是浏览器关了几天。
     * 所以这里给的是去处（一个能点开的登录页），不是一句错误提示。
     */
    if (outcome.reason === 'NOT_LOGGED_IN') showLoginPrompt();
    else setTodoError(outcome.message);
    return;
  }

  /*
   * 后台正在执行时，这一份取自执行前的快照（后台刻意不再重新拉取，
   * 免得与执行互相覆盖）。说明来源与后续，否则用户看到清单迟迟不变，
   * 会以为扩展没有反应。
   */
  writeTodo(
    outcome.running
      ? [note('todo-running', '正在执行，下面是执行前的清单，结束后会自动刷新')]
      : [],
  );

  /*
   * 过期项单独一段，不参与课程分组。
   *
   * 它们已经做不了了，混在待办里会占住第一屏——而用户打开弹窗是要看
   * 「现在做什么」。分开之后主列表只剩能做的事，过期项放在最后，
   * 既不挡住要紧的，也没被藏起来（他该知道自己漏了什么）。
   * 后台已经滤掉三天以上前的过期项，所以这一段不会累积。
   */
  const live = outcome.value.entries.filter((entry) => !entry.overdue);
  const overdue = outcome.value.entries.filter((entry) => entry.overdue);

  if (live.length === 0 && overdue.length === 0) {
    todoEl.append(note('todo-empty', '暂无待办。'));
    return;
  }

  for (const [courseName, list] of groupByCourse(live)) {
    todoEl.append(buildGroup(courseName, list, false));
  }
  if (overdue.length > 0) todoEl.append(buildGroup('已过截止', overdue, true));
}

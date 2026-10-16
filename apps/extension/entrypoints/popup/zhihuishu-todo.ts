/*
 * 智慧树待办区：取数、按课程归拢、空/失败/未登录三种状态的呈现。
 *
 * 四格与慕课同构（同一格回答同一个问题），装什么由数据形态定：
 *   行1 左：名称 + 阶段徽标      右：这件事的时间量（有截止说剩余时间，没有说时长）
 *   行2 左：处置句 + [执行]      右：落在课程的哪一处（有截止说日期，没有说章节名）
 * 教程视频没有截止时间（学习窗口由课程整体规定，数据未接），右列就靠时长与
 * 章节名撑起来——**空着一格与「没有这项信息」在界面上长得一样**，
 * 不能让它替数据说话。
 *
 * 「执行」只做这一条（把 itemId 发给后台）；全部执行在顶栏，作用于本 tab 的
 * 平台（platformId 见 main.ts）。
 */

import { getSettings, getZhsPending, getZhsSession, runNow } from '../../src/ui-bridge';
import type { ZhsPendingEntry, ZhsPendingKind } from '../../src/ui-bridge';
import { errorText, formatClock, formatDate, isUrgent, relativeDay } from '../../src/ui/format.ts';
import { zhsTodoEl } from './elements.ts';
import { createTodoArea } from './todo-area.ts';
import { setRunning, statusWriterFor } from './status.ts';

/** 时长文案：分钟为主，不足一分钟明确说，不四舍五入成「0 分钟」。 */
function durationText(sec: number): string {
  if (sec < 60) return '不足 1 分钟';
  return `约 ${Math.round(sec / 60)} 分钟`;
}

/**
 * 类别的次序：**测试在前、教程视频在后**（2026-10-17 Ryan 定）。
 *
 * 只在**组内排序**用，不做分组——分组与慕课一致（只按课程一层，
 * 见 `todo-area` 的 `buildGroup` 与慕课那份 `groupByCourse`）。
 * 类别本身由每一行的名称说清（「第三章单元测试」/「因果图结构」），
 * 慕课也是这么做的（它的类别只进 aria-label，不占位置）。
 */
const KIND_ORDER: Record<ZhsPendingKind, number> = { quiz: 0, courseware: 1 };

function buildRow(entry: ZhsPendingEntry): HTMLElement {
  const item = document.createElement('div');
  item.className = 'todo-item';
  /*
   * 悬停提示承担「四个位置放不下的细节」——与慕课的 `statusDetail` 同一角色：
   * 整行的完整文本在这里，格子里被省略号截掉的部分由它补齐。
   */
  /*
   * 整行可点开去平台——与慕课同一手法：透明长链接垫底（`.todo-open` 铺满整行），
   * 而不是把 <a> 套住所有内容（第二行里有真正的 <button>，按钮套在链接里点击语义会打架）。
   * 落点由载荷给出；测验给的是列表页，点开不会建答卷（见 payload 的 href 说明）。
   */
  const open = document.createElement('a');
  open.className = 'todo-open';
  open.href = entry.href;
  open.target = '_blank';
  open.rel = 'noreferrer';
  open.setAttribute('aria-label', `打开${entry.name}页面`);
  item.append(open);

  item.title = [entry.chapterName, entry.name, entry.sec > 0 ? durationText(entry.sec) : '']
    .filter((part) => part !== '')
    .join(' · ');

  // 行 1：单元名 + 「未学习」徽标
  const line = document.createElement('span');
  line.className = 'todo-line';

  const name = document.createElement('span');
  name.className = 'todo-name';
  name.textContent = entry.name;
  line.append(name);

  const phase = document.createElement('span');
  phase.className = 'todo-phase';
  phase.textContent = entry.status;
  line.append(phase);

  /*
   * 行 1 右列 = 「这件事的时间量」，与慕课同一格同一角色。
   *
   * 有截止的（单元测试）说还剩多久；没有截止的说这件事本身要多久（视频时长）。
   * 两者都是这一格该回答的问题，不是两种字段硬塞——平台给不出截止时，
   * 硬留空等于让整格作废，而「这条要看 11 分钟」是真有用的信息。
   * 两样都没有就留空：宁可空着，也不编一个数出来。
   */
  const when = document.createElement('span');
  when.className = 'todo-when';
  if (entry.deadline !== null) {
    if (isUrgent(entry.deadline)) when.classList.add('is-urgent');
    when.textContent = `${relativeDay(entry.deadline)} ${formatClock(entry.deadline)}`.trim();
  } else if (entry.sec > 0) {
    when.textContent = durationText(entry.sec);
  }

  // 行 2：处置 +「执行」
  const sub = document.createElement('span');
  sub.className = 'todo-sub';

  const handling = document.createElement('span');
  handling.className = 'todo-handling is-auto';
  handling.textContent = '可代为完成';
  sub.append(handling);

  const button = document.createElement('button');
  button.className = 'todo-run';
  button.type = 'button';
  button.textContent = '执行';
  button.title = '仅执行此条，不影响其他待办';
  button.addEventListener('click', () => {
    void runNow(
      {
        setStatus: statusWriterFor('zhihuishu'),
        setEnabled: (enabled) => setRunning(!enabled),
        refresh: () => renderZhsTodo(),
      },
      { platformId: 'zhihuishu', ids: [entry.itemId] },
    );
  });
  sub.append(button);

  /*
   * 行 2 右列 = 这一条**落在课程的哪一处**。
   *
   * 有截止的（单元测试）仍是日期——那是这一格在慕课那边的角色。
   * 教程视频没有截止（学习窗口由课程整体规定，数据未接），空着会让右下角
   * 常年缺一块，而「它属于哪一章」是这一格放得下的真信息：章节名。
   * 两样都没有就留空——宁可空着，也不编一个值出来。
   */
  const date = document.createElement('span');
  date.className = 'todo-date';
  date.textContent = entry.deadline !== null ? formatDate(entry.deadline) : entry.chapterName;

  item.append(line, when, sub, date);
  return item;
}

/** 一句提示文案的段落元素。 */
/**
 * 待办区的公共件（空/失败/需登录/分组）在 todo-area.ts；这里给三样差别：
 * 容器、登录去处、以及一行怎么渲染（buildRow 在本文件）。
 */
const area = createTodoArea<ZhsPendingEntry>({
  element: () => zhsTodoEl,
  loginText: '登录已失效，需重新登录智慧树。',
  loginHref: 'https://www.zhihuishu.com/',
});

/** 渲染智慧树待办。 */
export async function renderZhsTodo(): Promise<void> {
  /*
   * **未登录先于「没勾课程」判**：没登录时什么都做不了，而「没勾课程」是下一步的事。
   * 顺序反了会把人指向一个他到了也做不成事的地方——Ryan 报的正是这个：
   * 登录已失效时弹窗说的是「尚未选择参与任务的课程」，而真相与课程无关。
   * 慕课那份同一条次序，两处一起改（ruling 见那边同位置注释）。
   */
  const session = await getZhsSession();
  if (!session.loggedIn) {
    area.loginPrompt();
    return;
  }

  const settings = await getSettings();
  const courses = settings.zhihuishu.courses.filter((course) => course.enabled);
  if (courses.length === 0) {
    area.write([area.note('todo-empty', '尚未选择参与任务的课程，在「更多」中读取并勾选。')]);
    return;
  }

  let outcome;
  try {
    outcome = await getZhsPending();
  } catch (error) {
    area.error(errorText(error));
    return;
  }

  if (outcome.status === 'error') {
    // 未登录与读取失败分开说（与慕课同一规则）
    if (outcome.reason === 'NOT_LOGGED_IN') area.loginPrompt();
    else area.error(outcome.message);
    return;
  }

  const entries = outcome.value.entries;
  if (entries.length === 0) {
    area.write([area.note('todo-empty', '暂无待办。')]);
    return;
  }

  /*
   * 一层归拢：只按课程分组（与慕课一致，见 `todo-area` 的 `buildGroup`）。
   * 两类事混在同一组里，靠每行的名称说清自己是什么（「第三章单元测试」/
   * 「因果图结构」）——类别不另占一层结构，KIND_ORDER 只调组内次序。
   *
   * 课程的次序按**首次出现**定（后台已按章节自然序给出，这里保持顺序，不重排）。
   */
  const grouped = new Map<string, ZhsPendingEntry[]>();
  for (const entry of entries) {
    const bucket = grouped.get(entry.courseName);
    if (bucket) bucket.push(entry);
    else grouped.set(entry.courseName, [entry]);
  }

  area.write([]);
  for (const [courseName, list] of grouped) {
    // 组内只调次序（测试在前），不改变类别次序之外的相对位置——sort 是稳定的
    list.sort((left, right) => KIND_ORDER[left.kind] - KIND_ORDER[right.kind]);
    zhsTodoEl?.append(area.buildGroup(courseName, list, buildRow));
  }
  // 读不到的课如实列出——「读不到」与「没有要看的」长得不一样，不能混为一谈
  for (const unread of outcome.value.unreadCourses) {
    zhsTodoEl?.append(area.note('todo-error', `${unread.courseName}：读取失败（${unread.reason}），未列入待办。`));
  }
}

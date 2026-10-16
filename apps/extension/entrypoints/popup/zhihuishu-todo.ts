/*
 * 智慧树待办区：取数、按课程归拢、空/失败/未登录三种状态的呈现。
 *
 * 与慕课待办区的差别全来自数据形态：单元没有截止时间（学习窗口由课程整体
 * 规定），因此没有时间列与过期段——列出来的就是「这门课还剩哪些没看」。
 * 行仍然是两行两列：
 *   行1 左：单元名 + 「未学习」徽标         右：时长
 *   行2 左：处置句 + [执行]                右：章节名
 *
 * 「执行」只做这一条（把 itemId 发给后台）；全部执行在顶栏，作用于本 tab 的
 * 平台（platformId 见 main.ts）。
 */

import { getSettings, getZhsPending, runNow } from '../../src/ui-bridge';
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
   * 悬停提示承担「四个位置放不下的细节」——与慕课的 `statusDetail` 同一角色。
   * 章节名与视频时长原来各占一格，对齐之后那两格还给了时间列（剩余时间 / 具体日期），
   * 它们的信息不丢，移到这里。
   */
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

  // 行 2 右列：具体日期。与慕课同一格同一角色（都由 deadline 派生）
  const date = document.createElement('span');
  date.className = 'todo-date';
  date.textContent = entry.deadline !== null ? formatDate(entry.deadline) : '';

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
  const settings = await getSettings();
  const courses = settings.zhihuishu.courses.filter((course) => course.enabled);
  if (courses.length === 0) {
    area.write([area.note('todo-empty', '尚未选择参与任务的课程，在「更多」的智慧树页读取并勾选。')]);
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
   * 两级归拢：课程 → 类别。同类的事看的信息不一样（视频看时长、测试看章节），
   * 混在一起排就没法给同一行定一套字段。
   *
   * 课程与类别的出现次序都按**首次出现**定（后台已按章节自然序给出，
   * 这里保持顺序，不重排）；类别在组内按 KIND_ORDER 固定次序。
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

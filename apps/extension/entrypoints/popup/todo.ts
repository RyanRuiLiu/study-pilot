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
 *   成功且有事项     逐条列出，按课程归拢，过期项垫在所属课程最后
 *
 * 界面只经 src/ui-bridge.ts 取数：getPending / getSettings。
 */

import { getPending, getSession, getSettings, runNow } from '../../src/ui-bridge.ts';
import type { PendingEntry } from '../../src/ui-bridge.ts';
import { errorText, formatClock, formatDate, isUrgent, relativeDay } from '../../src/ui/format.ts';
import { MOOC_LOGIN_URL } from '../../src/ui/login.ts';
import { todoEl } from './elements.ts';
import { createTodoArea } from './todo-area.ts';
import { setRunning, statusWriterFor } from './status.ts';

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
      // 数据异常时已评份数可能大于配额；界面不报「尚差 -1 份」
      const left = Math.max(0, entry.evaluateTotal - entry.evaluateDone);
      return `可代为评分，尚差 ${left} 份`;
    }
    return '可代为完成';
  }
  // 人工项要说明只有用户能做，否则他会以为等着就会被处理
  return '需手动完成';
}

/**
 * 构造一条待办。
 *
 * 两行两列（列定义在 components.css）：
 *   行1 左：任务名 + 阶段徽标（徽标跟在标题后）   右：剩余时间
 *   行2 左：处置句 + [执行]（执行跟在文字后）     右：具体日期
 *
 * 「状态贴文字、时间归右列」：徽标与「执行」跟着各自修饰的文字，
 * 右列只放时间——有没有「执行」、徽标多宽，右列都不横移。
 *
 * 阶段始终显示（「未提交」也显示）：每一行右列的落点一致。
 * 相对时间与具体日期分列两行：相对说法判远近，具体日期用来核对。
 *
 * 能替你完成的那部分（handling 为 auto）在处置句尾跟一个小「执行」按钮，
 * 点它只做这一条（把 entry.itemIds 发给后台；互评与自评合成的一行
 * 会两条一起做，见 to-messages 的合并说明）。叫「执行」不叫「完成」：
 * 互评点一次只评一份，说「完成」是吹牛，而「执行」与顶栏「全部执行」
 * 同一套词——全部 vs 单条。
 *
 * 「整行点击去平台」由一个透明的长链接垫底实现（.todo-open 铺满整行），
 * 而不是把 <a> 套在所有内容外面：第二行里有一个真正的 <button>，
 * 按钮套在链接里点击语义会打架（点按钮顺带跳转、读屏也读不明白）。
 * 链接垫底、按钮抬一层，两件事各归各。
 */
function buildRow(entry: PendingEntry): HTMLElement {
  const item = document.createElement('div');
  item.className = 'todo-item';
  item.title = entry.statusDetail;

  /*
   * 每一行都能点开去平台，包括已过截止的：平台自己会把关（不接受逾期提交），
   * 而点进去仍能看清当时要交什么、老师给了什么反馈。
   * 能不能点是「这件事做不做得成」之外的另一回事，不该跟着它变——
   * 时灵时不灵的行比多点一次更让人困惑。
   */
  const open = document.createElement('a');
  open.className = 'todo-open';
  open.href = entry.href;
  open.target = '_blank';
  open.rel = 'noreferrer';
  open.setAttribute('aria-label', `打开${KIND_TEXT[entry.kind]}页面`);
  item.append(open);

  // 行 1：任务名 + 阶段徽标
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

  // 行 1 右列：剩余时间
  const when = document.createElement('span');
  when.className = 'todo-when';
  if (isUrgent(entry.deadline)) when.classList.add('is-urgent');
  when.textContent = `${relativeDay(entry.deadline)} ${formatClock(entry.deadline)}`.trim();

  // 行 2：处置（后面跟「执行」按钮）
  const sub = document.createElement('span');
  sub.className = 'todo-sub';

  const handling = document.createElement('span');
  handling.className = 'todo-handling';
  if (entry.overdue) handling.classList.add('is-overdue');
  else if (entry.handling === 'auto') handling.classList.add('is-auto');
  handling.textContent = handlingText(entry);
  sub.append(handling);

  if (entry.handling === 'auto') {
    const button = document.createElement('button');
    button.className = 'todo-run';
    button.type = 'button';
    button.textContent = '执行';
    button.title = '仅执行此条，不影响其他待办';
    button.addEventListener('click', () => {
      void runNow(
        {
          setStatus: statusWriterFor('mooc'),
          setEnabled: (enabled) => setRunning(!enabled, 'mooc'),
          refresh: () => renderTodo(),
        },
        // 点名平台：这一条属于慕课，别家平台上碰巧同 id 的事项不该被带上
        { platformId: 'mooc', ids: entry.itemIds },
      );
    });
    sub.append(button);
  }

  // 行 2 右列：具体日期
  const date = document.createElement('span');
  date.className = 'todo-date';
  date.textContent = formatDate(entry.deadline);

  item.append(line, when, sub, date);
  return item;
}

/**
 * 待办区的公共件（空/失败/需登录/分组）在 todo-area.ts；这里给三样差别：
 * 容器、登录去处、以及一行怎么渲染（buildRow 在本文件）。
 */
const area = createTodoArea<PendingEntry>({
  element: () => todoEl,
  loginText: '登录已失效，需重新登录慕课。',
  loginHref: MOOC_LOGIN_URL,
});

/**
 * 按课程归拢。组内未完的在前、过期的垫后（两段各自保持后台给出的
 * 截止时间升序）；只有过期项的课程排在最后——它已经没有要做的事了。
 */
function groupByCourse(entries: PendingEntry[]): Map<string, PendingEntry[]> {
  const grouped = new Map<string, PendingEntry[]>();
  const append = (entry: PendingEntry) => {
    const bucket = grouped.get(entry.courseName);
    if (bucket) bucket.push(entry);
    else grouped.set(entry.courseName, [entry]);
  };
  for (const entry of entries) if (!entry.overdue) append(entry);
  for (const entry of entries) if (entry.overdue) append(entry);
  return grouped;
}

/** 渲染待办。 */
export async function renderTodo(): Promise<void> {
  /*
   * **未登录先于「没勾课程」判**：没登录时什么都做不了，而「没勾课程」是下一步的事。
   * 顺序反了会把人指向一个他到了也做不成事的地方——智慧树那份同一条次序
   * （Ryan 报的正是这个：登录已失效时弹窗说的是「尚未选择参与任务的课程」）。
   */
  let session: Awaited<ReturnType<typeof getSession>>;
  let settings: Awaited<ReturnType<typeof getSettings>>;
  try {
    // 两次读都要护住：消息通道断（后台重启）时是 reject，先前会落成未处理的异常、弹窗空白
    [session, settings] = await Promise.all([getSession(), getSettings()]);
  } catch (error) {
    area.error(errorText(error));
    return;
  }
  if (!session.loggedIn) {
    area.loginPrompt();
    return;
  }

  const courses = settings.mooc.courses.filter((course) => course.enabled);
  if (courses.length === 0) {
    area.write([area.note('todo-empty', '尚未选择参与任务的课程，在「更多」中读取并勾选。')]);
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
    area.error(errorText(error));
    return;
  }

  if (outcome.status === 'error') {
    /*
     * 未登录与读取失败要分开说。未登录不是出错，是少做了一步：
     * 待办读不到是因为平台不知道该给谁读。
     */
    if (outcome.reason === 'NOT_LOGGED_IN') area.loginPrompt();
    else area.error(outcome.message);
    return;
  }

  /*
   * 过期项不单独成段：属于哪门课就垫在那门课的最后。
   * 「这门课还剩什么、漏了什么」在一处看完，不用拿课程名在两个列表间对。
   * 后台已经滤掉三天以上前的过期项（保留天数见设置），因此不会累积。
   */
  const entries = outcome.value.entries;
  if (entries.length === 0) {
    area.write([area.note('todo-empty', '暂无待办。')]);
    return;
  }

  area.write([]);
  for (const [courseName, list] of groupByCourse(entries)) {
    todoEl?.append(area.buildGroup(courseName, list, buildRow));
  }
}

/*
 * 智慧树待办区：取数、按课程归拢、空/失败/未登录三种状态的呈现。
 *
 * 分组与慕课同一层（只按课程）；**板块是组内次序**（教程视频 → 单元测试 →
 * 见面课 → 期末考试，定义在 adapters/zhihuishu/boards.ts，与设置页四张卡同一份）。
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

import { getSettings, getZhsPending, getZhsSession, runNow } from '../../src/ui-bridge.ts';
import type { Settings, ZhsPendingEntry, ZhsPendingKind } from '../../src/ui-bridge.ts';
import { boardOrder } from '../../src/adapters/zhihuishu/boards.ts';
import { formatClock, formatDate, isUrgent, relativeDay } from '../../src/ui/format.ts';
import { ZHS_LOGIN_URL } from '../../src/ui/login.ts';
import { zhsTodoEl } from './elements.ts';
import { renderTodoFlow, showTodoLogin } from './todo-flow.ts';
import { createTodoArea } from './todo-area.ts';
import { setRunning, statusWriterFor } from './status.ts';

/** 时长文案：分钟为主，不足一分钟明确说，不四舍五入成「0 分钟」。 */
/** 每类待办对应什么（aria 标签与慕课同一句式：只说明点进去打开哪类页面）。 */
const KIND_TEXT: Record<ZhsPendingKind, string> = {
  courseware: '教程视频',
  quiz: '单元测试',
  meetWatch: '见面课观看',
  meetQuiz: '见面课测验',
  finalExam: '期末考试',
};

function durationText(sec: number): string {
  if (sec < 60) return '不足 1 分钟';
  return `约 ${Math.round(sec / 60)} 分钟`;
}

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
  open.setAttribute('aria-label', `打开${KIND_TEXT[entry.kind]}页面`);
  item.append(open);

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
  /*
   * 期末考试没开考时，这一格说「M-D 开考」：说「还剩多少天到截止」会让人
   * 以为现在就能做（设计文档 §2.1 的期末条目）。开考后走下面两条常规分支。
   */
  if (entry.opensAt !== null && Date.now() < entry.opensAt) {
    when.textContent = `${formatDate(entry.opensAt)} 开考`;
  } else if (entry.deadline !== null) {
    if (isUrgent(entry.deadline)) when.classList.add('is-urgent');
    when.textContent = `${relativeDay(entry.deadline)} ${formatClock(entry.deadline)}`.trim();
  } else if (entry.sec > 0) {
    when.textContent = durationText(entry.sec);
  }

  // 行 2：处置 +「执行」
  const sub = document.createElement('span');
  sub.className = 'todo-sub';

  /*
   * 按钮只发给能代做的：期末考试不自动；见面课测验不自动（只有一次机会）；
   * 直播中的在线场次与现场签到由载荷标 `manual`（本人看/本人到场）。
   * 其余都只做「只读展示 + 可点」，处置句用慕课人工项同一套词汇
   * 「需手动完成」——按钮在那儿就等于许诺能把这件事做掉。
   */
  const handling = document.createElement('span');
  if (entry.manual === true || entry.kind === 'finalExam' || entry.kind === 'meetQuiz') {
    handling.className = 'todo-handling';
    handling.textContent = '需手动完成';
    sub.append(handling);
    item.append(line, when, sub, buildDate(entry));
    return item;
  }
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
        setEnabled: (enabled) => setRunning(!enabled, 'zhihuishu'),
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
  item.append(line, when, sub, buildDate(entry));
  return item;
}

/** 行 2 右列：这一条落在课程的哪一处（有截止说日期，没有说章节名）。 */
function buildDate(entry: ZhsPendingEntry): HTMLElement {
  const date = document.createElement('span');
  date.className = 'todo-date';
  date.textContent = entry.deadline !== null ? formatDate(entry.deadline) : entry.chapterName;
  return date;
}

/** 一句提示文案的段落元素。 */
/**
 * 待办区的公共件（空/失败/需登录/分组）在 todo-area.ts；这里给三样差别：
 * 容器、登录去处、以及一行怎么渲染（buildRow 在本文件）。
 */
const area = createTodoArea<ZhsPendingEntry>({
  element: () => zhsTodoEl,
  loginText: '登录已失效，需重新登录智慧树。',
  loginHref: ZHS_LOGIN_URL,
});

/** 渲染智慧树待办。 */
export const ZHS_LOGIN_TEXTS = {
  missing: '未登录，在浏览器登录智慧树后执行。',
  expired: '登录已失效，需重新登录智慧树。',
} as const;

/** 与慕课同一个理由：首帧落定登录态，切换 tab 不闪骨架。 */
export function showZhsLogin(session: { loggedIn: boolean; expired?: true }): void {
  showTodoLogin(area, session, ZHS_LOGIN_TEXTS.missing, ZHS_LOGIN_TEXTS.expired);
}

export async function renderZhsTodo(): Promise<void> {
  await renderTodoFlow(area, {
    readSession: getZhsSession,
    readSettings: getSettings,
    hasSelectedCourses: (settings) => (settings as Settings).zhihuishu.courses.some((course) => course.enabled),
    readPending: getZhsPending,
    loginMissingText: ZHS_LOGIN_TEXTS.missing,
    loginExpiredText: ZHS_LOGIN_TEXTS.expired,
    show: (value) => {
      /*
       * 一层归拢：**只按课程分组**，与慕课同一层（见 todo-area 的 buildGroup 与慕课那份）。
       * 板块是**组内次序**，不是分组轴：教程视频 → 单元测试 → 见面课 → 期末考试，
       * 取值与次序定义在 adapters/zhihuishu/boards.ts——设置页四张卡用的是同一份。
       * 课程的次序按首次出现定（后台已按章节自然序给出），这里保持，不重排。
       */
      const grouped = new Map<string, ZhsPendingEntry[]>();
      for (const entry of value.entries) {
        const bucket = grouped.get(entry.courseName);
        if (bucket) bucket.push(entry);
        else grouped.set(entry.courseName, [entry]);
      }
      area.write([]);
      for (const [courseName, list] of grouped) {
        // 组内只调次序（按板块），不改变同一板块内的相对位置——sort 是稳定的
        list.sort((left, right) => boardOrder(left.kind) - boardOrder(right.kind));
        zhsTodoEl?.append(area.buildGroup(courseName, list, buildRow));
      }
      // 读不到的课如实列出——「读不到」与「没有要看的」长得不一样，不能混为一谈
      for (const unread of value.unreadCourses) {
        zhsTodoEl?.append(area.note('todo-error', unread.courseName + '：读取失败（' + unread.reason + '），未列入待办。'));
      }
    },
  });
}

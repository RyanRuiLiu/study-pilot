/*
 * 一条待办的构造：类别文案、处置说法、两行结构。
 *
 * 与整区渲染分开，是因为这一件事本身就够复杂：类别决定去哪个页面，
 * 处置说法要回答「要不要你动手」，时间与日期各占一行。
 */

import { workPageUrl } from '@study-pilot/platform-mooc';
import type { PendingEntry } from '../../src/platform/messaging';
import { formatClock, formatDate, isUrgent, relativeDay } from '../../src/features/format';

/**
 * 每类待办对应什么，以及点进去打开哪个页面。
 *
 * 互评与自评分开：两者都在互评期开放、点进去也是同一个页面，
 * 但一个是给同学打分、一个是给自己打分。合并成「互评作业」
 * 会让人点进去才发现评的是自己。
 *
 * view 是拼地址用的页面类型，与平台的路由一一对应。考试的两种题型
 * 各自有答卷页，而它们的 id 需要 eid 才拼得出来，因此考试还带 examId。
 * 考试的待办不区分题型时按客观题处理——它至少能打开答卷页，
 * 而主观题页少一个参数打不开。
 */
const KIND_TEXT: Record<
  PendingEntry['kind'],
  { label: string; view: 'quiz' | 'homework' | 'exam-objective' | 'exam-subjective' }
> = {
  'submit-quiz': { label: '单元测验', view: 'quiz' },
  'submit-homework': { label: '单元作业', view: 'homework' },
  'evaluate-homework': { label: '互评作业', view: 'homework' },
  'self-evaluate': { label: '自评作业', view: 'homework' },
  'submit-exam': { label: '考试', view: 'exam-objective' },
};

/**
 * 处置说法。这一格要回答的是「这条我要不要管」。
 *
 * 每个说法都要说清两件事：**要不要你动手、会不会自己发生**。
 * 只说「未提交」是不够的——用户无从判断这一条要不要管。
 *
 * 「将自动处理」不承诺具体时刻：运行期间每 30 分钟检查一次，
 * 而具体到第几分钟无法预知，因此只说明它会发生。
 *
 * 措辞按正式文案处理：
 *   - 不用「扩展」作主语。那是开发者的说法，用户看不出它指什么
 *   - 「评分」不简作「评」。简称在固定搭配里才成立，这里不是
 */
export function handlingText(entry: PendingEntry): string {
  if (entry.overdue) {
    /*
     * 已过截止的要说清后果。「已过截止」听起来只是个状态，
     * 用户可能仍去点它、然后发现做不了。补上「无法补做」省掉这一步。
     */
    return '已过截止，无法补做';
  }

  if (entry.handling === 'auto') {
    /*
     * 互评类带进度：还差几份直接关系到会不会影响成绩，
     * 而「会自动处理」这句话本身不说明差多少。
     */
    if (
      entry.kind === 'evaluate-homework' &&
      entry.evaluateTotal !== null &&
      entry.evaluateDone !== null
    ) {
      const left = entry.evaluateTotal - entry.evaluateDone;
      return `将自动评分，还需 ${left} 份`;
    }
    return '将自动处理';
  }

  // 人工项要说明只有用户能做，否则他会以为等着就会被处理
  return '需要你完成';
}

/**
 * 构造一条待办。两行：
 *   上行  任务名  [阶段]        还剩多久
 *   下行  处置                  具体日期
 *
 * 阶段与处置是两个独立的信息，都要给出：
 *   阶段   这份作业走到哪一步了（互评阶段）
 *   处置   这一条要不要你动手（需要你完成 / 将自动处理）
 *
 * 相对时间与具体日期分列两行，是为了不把一行撑成三行：
 * 相对说法让人一眼判断远近，具体日期用来核对。
 * 截止时间写进 dataset，供排序与测试使用。
 */
export function buildRow(entry: PendingEntry): HTMLElement {
  const text = KIND_TEXT[entry.kind];
  const deadline = entry.deadline;

  /*
   * 过期项不做成链接：点进去也做不了，平台不接受逾期提交。
   * 给一个能点的东西等于邀请用户点进去也无法处理，
   * 而这一行要传达的正是「这件事已经结束」。
   */
  const link = entry.overdue ? document.createElement('div') : document.createElement('a');
  link.className = 'todo-row';
  link.dataset.deadline = String(deadline);
  link.dataset.handling = entry.overdue ? 'overdue' : entry.handling;

  if (link instanceof HTMLAnchorElement) {
    link.href = workPageUrl(entry.course, text.view, entry.testId, entry.examId ?? undefined);
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.title = `打开${text.label}页面`;
  } else {
    link.title = entry.statusDetail;
  }

  const line = document.createElement('span');
  line.className = 'todo-line';

  const name = document.createElement('span');
  name.className = 'todo-name';
  name.textContent = entry.name;

  const phase = document.createElement('span');
  phase.className = 'todo-phase';
  phase.textContent = entry.status;

  const when = document.createElement('span');
  when.className = 'todo-when';
  if (isUrgent(deadline)) when.classList.add('is-urgent');
  when.textContent = `${relativeDay(deadline)} ${formatClock(deadline)}`.trim();

  line.append(name, phase, when);

  const sub = document.createElement('span');
  sub.className = 'todo-sub';

  const handling = document.createElement('span');
  handling.className = 'todo-handling';
  if (entry.overdue) handling.classList.add('is-overdue');
  else if (entry.handling === 'auto') handling.classList.add('is-auto');
  handling.textContent = handlingText(entry);

  const date = document.createElement('span');
  date.className = 'todo-date';
  date.textContent = formatDate(deadline);

  sub.append(handling, date);
  link.append(line, sub);
  return link;
}

/** 一句提示文案的段落元素。 */
export function note(className: string, text: string): HTMLElement {
  const element = document.createElement('p');
  element.className = className;
  element.textContent = text;
  return element;
}

/*
 * 页面内「查看答案」块（测验与考试统一）。
 *
 * 与得分指导共用一套注入骨架（`inject.ts`：幂等、换卷、就位、迟到、空块），
 * 本文件给这一族的三样东西：来源、页面判据、块渲染，外加**对齐规则**。
 *
 * 数据来自后台 `loadViewAnswers`（只读）：页面正在显示的卷当题面，最近一份
 * 已提交的卷当答案，两者按题目 id 对齐——平台对未提交的卷不给答案（实测），
 * 随机抽题时两次作答的题目不同，抽不到的题如实没有块，不拿别的题顶。
 *
 * 文案取自站点自己的答卷查看页（「参考答案：」「答案解析：」，源码核对）。
 * 页面自己已展示答案的题不重复注入：测验成绩页用「参考答案」，考试查看页
 * 用「正确答案」，两种都认（判据看内容，不看类名）。
 *
 * 局限（如实）：只呈现客观题；主观题的标准答案在作业管线的评分点里，
 * 由得分指导那一侧出面。考试作答中（examObject）平台自己在服务端扣着答案
 * （实测 withStdAnswerAndAnalyse=true 也只回 null，showAnalysis=false），
 * 因此作答中的考试页没有块可注入——这不是缺数据，是平台不发。
 */

import type { AnswerRow } from '@study-pilot/platform-mooc';
import { TOKENS } from '../../../ui/tokens.ts';
import { renderRichText } from './block.ts';
import { clearBlocks, injectBlocks } from './inject.ts';
import {
  ANALYSIS_LABEL,
  ANSWERS_FAMILY,
  ANSWERS_LABEL,
  ANSWER_MARK_ATTRIBUTE,
  SITE_ANSWER_LABELS,
  answersSource,
  siteText,
} from './markers.ts';

/** 取页面这道题的题面与答案（答案可能没有——去重后的行里 answer 为 null）。 */
export type AnswerLoader = (tid: number) => Promise<AnswerRow[] | null>;

/** 页面自己是否已经在这道题旁展示答案（只看页面自己的内容，注入块不算）。 */
function selfShowsAnswers(item: HTMLElement): boolean {
  const text = siteText(item);
  return SITE_ANSWER_LABELS.some((label) => text.includes(label));
}

/**
 * 页面题目与数据的对齐：**按显示顺序**。
 *
 * 平台自己就是按卷面数组的顺序渲染的。页面的题号是**渲染序**，不是卷面的
 * `position`——实测一份随机抽题的测验：卷面 position 是 3,4,8,10,11，页面题号
 * 却是 1..5；早先按「题号 = position + 1」对齐，正是把上一次作答的答案错插到
 * 这次题目上的原因。因此这里用「第 i 个题目节点 ↔ 数据第 i 项」——
 * 与平台渲染的对应关系一致。
 *
 * 数据比页面短时（题面还没渲染齐），多出来的题目节点这一轮没有数据，等下一次评估。
 */
function pairByDisplayOrder(items: HTMLElement[], rows: AnswerRow[]): Map<HTMLElement, AnswerRow> {
  const paired = new Map<HTMLElement, AnswerRow>();
  const count = Math.min(items.length, rows.length);

  for (let index = 0; index < count; index += 1) {
    paired.set(items[index] as HTMLElement, rows[index] as AnswerRow);
  }
  return paired;
}

/**
 * 一块答案的渲染：参考答案 + 答案解析。样式与得分指导同族（TOKENS，内联隔离）。
 *
 * 这道题没有答案（已提交的那份卷里没有它）就返回 null，不注入空块。
 */
function buildAnswersBlock(row: AnswerRow, source: string): HTMLElement | null {
  const answered = row.answer;
  if (answered === null) return null;

  const correct = (answered.optionDtos ?? [])
    .map((option, index) => ({ option, letter: String.fromCharCode(65 + index) }))
    .filter(({ option }) => option.answer === true)
    .map(({ option, letter }) => {
      const text = String(option.content ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      // 内容是图片的选项没有文字，平台自己的答案就是选项字母（考试查看页「正确答案：A」同款）
      return text !== '' ? text : letter;
    });
  const stdAnswer = typeof answered.stdAnswer === 'string' ? answered.stdAnswer.trim() : '';
  const reference = correct.length > 0 ? correct.join('、') : stdAnswer;
  const analyseHtml = String(answered.analyse ?? '').trim();
  if (reference === '' && analyseHtml === '') return null;

  const block = document.createElement('div');
  block.setAttribute(ANSWER_MARK_ATTRIBUTE, '1');
  block.setAttribute('data-study-pilot-answer-source', source);
  block.style.cssText = [
    `margin-top:${TOKENS.space12}`,
    `padding:${TOKENS.space12} ${TOKENS.space16}`,
    `background:${TOKENS.accentWash}`,
    `border:1px solid ${TOKENS.lineOnWash}`,
    `border-left:${TOKENS.space4} solid ${TOKENS.accent}`,
    `border-radius:${TOKENS.radiusMd}`,
    `font-size:${TOKENS.textMd}`,
    `line-height:1.7`,
    `color:${TOKENS.inkSoft}`,
  ].join(';');

  const head = document.createElement('p');
  head.style.cssText = `font-weight:600;color:${TOKENS.accent};margin:0;`;
  head.textContent = ANSWERS_LABEL;
  block.append(head);

  if (reference !== '') {
    const line = document.createElement('p');
    line.style.cssText = `margin:${TOKENS.space4} 0 0;color:${TOKENS.ink};`;
    line.textContent = reference;
    block.append(line);
  }

  if (analyseHtml !== '') {
    const label = document.createElement('p');
    label.style.cssText = `margin:${TOKENS.space8} 0 0;color:${TOKENS.inkFaint};`;
    label.textContent = ANALYSIS_LABEL;
    block.append(label);
    // 解析与得分指导的评分依据同信任级别（平台老师可写的富文本）：走同一套白名单净化
    const rich = renderRichText(analyseHtml);
    rich.style.cssText = `margin:${TOKENS.space4} 0 0;color:${TOKENS.ink};`;
    block.append(rich);
  }

  return block;
}

/** 把「查看答案」插入页面（幂等，可以随页面变动反复调用）。 */
export async function injectAnswers(load: AnswerLoader, tid: number): Promise<void> {
  await injectBlocks({
    source: answersSource(tid),
    load: () => load(tid),
    selfShows: selfShowsAnswers,
    build: buildAnswersBlock,
    pair: pairByDisplayOrder,
  });
}

/** 移除全部答案块（离开答卷查看类页面时调用）。 */
export function removeAnswers(): void {
  clearBlocks(ANSWERS_FAMILY);
}

/*
 * 页面内「查看答案」块（测验与考试统一）。
 *
 * 与得分指导同一套注入机制（取数端口、幂等、按卷匹配、插入题干之后），
 * 差别只有两点：数据来自**既有答卷**（后台 loadSubmittedPaper，只读——绝不
 * 新开一份，那在考试上等价于点「开始考试」），块的内容是答案。
 *
 * 文案取自站点自己的答卷查看页（「参考答案：」「答案解析：」，源码核对）。
 * 站点自己已展示答案的题不重复注入（与得分指导同一条判据：看内容，不看类名）。
 *
 * 局限（如实）：只呈现客观题；主观题的标准答案在作业管线的评分点里，
 * 由得分指导那一侧出面。
 */

import type { PaperQuestion } from '@study-pilot/platform-mooc';
import { ANSWER_MARK_ATTRIBUTE, injectedBlocks } from './markers.ts';
import { anchorOf, matchQuestions, normalizePage, questionItems } from './page.ts';

/** 取一份既有答卷的题目（答案随题面）。 */
export type AnswerLoader = (tid: number) => Promise<PaperQuestion[] | null>;

/** 答案块的来源标识（`answers:tid`）——与得分指导的 `homework:tid` 分属两族，互不干扰。 */
export function answersSource(tid: number): string {
  return `answers:${tid}`;
}

const ANSWER_LABEL = '参考答案';
const ANALYSIS_LABEL = '答案解析';

/** 页面自己是否已经在这道题旁展示答案（只看内容）。 */
function selfShowsAnswers(item: HTMLElement): boolean {
  return (item.textContent ?? '').includes(ANSWER_LABEL);
}

/** 一块答案的渲染：参考答案（正确选项文本 / 填空标准答案）+ 答案解析。 */
function buildAnswersBlock(question: PaperQuestion, source: string): HTMLElement {
  const block = document.createElement('div');
  block.setAttribute(ANSWER_MARK_ATTRIBUTE, '1');
  block.setAttribute('data-study-pilot-answer-source', source);
  block.style.cssText =
    'margin:8px 0 4px;padding:8px 12px;background:#f7f7f7;border-left:2px solid #00cc7e;font-size:13px;line-height:1.7;color:#333;';

  const correct = (question.optionDtos ?? [])
    .filter((option) => option.answer === true)
    .map((option) => String(option.content ?? '').replace(/<[^>]*>/g, ' ').trim())
    .filter((text) => text !== '');
  const stdAnswer = typeof question.stdAnswer === 'string' ? question.stdAnswer.trim() : '';
  const reference = correct.length > 0 ? correct.join('、') : stdAnswer;

  if (reference !== '') {
    const line = document.createElement('p');
    line.style.cssText = 'margin:0;';
    const label = document.createElement('strong');
    label.textContent = `${ANSWER_LABEL}：`;
    line.append(label, document.createTextNode(reference));
    block.append(line);
  }

  const analyse = String(question.analyse ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (analyse !== '') {
    const line = document.createElement('p');
    line.style.cssText = 'margin:4px 0 0;';
    const label = document.createElement('strong');
    label.textContent = `${ANALYSIS_LABEL}：`;
    line.append(label, document.createTextNode(analyse));
    block.append(line);
  }

  return block;
}

/** 与 injectGuidance 同构的注入流程；取不到答案就不注入（原因由调用方如实呈现）。 */
export async function injectAnswers(load: AnswerLoader, tid: number): Promise<void> {
  const source = answersSource(tid);
  if (questionItems().length === 0) return;

  // 换卷时先把别的卷留下的块清掉（本卷的块保留，后面按题跳过）
  for (const block of document.querySelectorAll(`[data-study-pilot-answer-source^="answers:"]`)) {
    if (block.getAttribute('data-study-pilot-answer-source') !== source) block.remove();
  }
  if (!normalizePage(source)) return;

  const questions = await load(tid);
  if (!questions || questions.length === 0) return;

  // 答案与题面出自同一份卷，沿用「按题干文本对齐」的既有机制
  for (const [item, question] of matchQuestions(questionItems(), questions)) {
    if (selfShowsAnswers(item)) continue;
    if (injectedBlocks(item).some((b) => b.getAttribute('data-study-pilot-answer-source') === source)) {
      continue;
    }

    const anchor = anchorOf(item);
    if (!anchor) continue;
    const block = buildAnswersBlock(question, source);
    if (block.childElementCount > 0) anchor.insertAdjacentElement('afterend', block);
  }
}

/** 移除全部答案块（离开答卷查看类页面时调用）。 */
export function removeAnswers(): void {
  for (const block of document.querySelectorAll('[data-study-pilot-answer-source^="answers:"]')) {
    block.remove();
  }
}

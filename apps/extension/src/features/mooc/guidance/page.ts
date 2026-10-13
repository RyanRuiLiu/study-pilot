/*
 * 页面侧：找到题目节点、判断页面是否已展示评分依据、把题目与依据对上、定好插入点。
 *
 * 只在页面自己没有展示评分依据时注入
 * --------------------------------
 * 给别人打分的互评页面上每题都列着「得分指导」，再注入一份既重复又干扰阅读；
 * 而查看自己已提交的作业——包括成绩公布——站点只给分数与评语，评分依据要由
 * 本模块补上。两者的区别要看页面内容，不能看类名：已提交的作业每道题都带
 * `analysisMode`，`.u-evaluateItem` 在「查看评价结果」时也出现，按类名判断会
 * 把用户真正需要的那些页面一起挡掉。
 */

import type { PaperQuestion } from '@study-pilot/platform-mooc';
import { SELECTORS } from '../selectors';
import {
  GUIDANCE_LABEL,
  blockSource,
  hasCurrentBlock,
  injectedBlocks,
} from './markers.ts';

/** 页面上的题目节点。 */
export function questionItems(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(SELECTORS.questionItem));
}

/**
 * 页面自己是否已经在展示这道题的评分依据。
 *
 * 只看站点自己的容器：注入块插在 .j-title 之后，不会落进 .j-answer 或
 * .j-evaluate 里，因此这里不会把刚注入的内容当成「页面已经展示」。
 */
export function selfShowsGuidance(item: HTMLElement): boolean {
  const containers = [SELECTORS.answerArea, SELECTORS.evaluateModule]
    .map((selector) => item.querySelector<HTMLElement>(selector))
    .filter((node): node is HTMLElement => node !== null);

  return containers.some((node) => (node.textContent ?? '').includes(GUIDANCE_LABEL));
}

/**
 * 整理一道题上的注入块，返回它是否还需要注入。
 *
 * 两种块要清掉：站点自己展示评分依据的题目（不重复展示），以及来源不是当前
 * 这份卷的块（换单元时站点未必带走它们）。
 */
export function normalizeItem(item: HTMLElement, source: string): boolean {
  const siteShows = selfShowsGuidance(item);

  for (const block of injectedBlocks(item)) {
    if (siteShows || blockSource(block) !== source) block.remove();
  }

  return !siteShows && !hasCurrentBlock(item, source);
}

/** 整理整页的注入块，返回是否还有题目需要注入。 */
export function normalizePage(source: string): boolean {
  let needed = false;

  for (const item of questionItems()) {
    if (normalizeItem(item, source)) needed = true;
  }

  return needed;
}

/** 读取页面上的题号。题号缺失时返回 null。 */
export function positionOf(item: HTMLElement): number | null {
  const positionNode = item.querySelector('.position');
  const text = (positionNode?.textContent ?? '').trim();
  const parsed = Number(text);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

/**
 * 题目与评分依据的对应关系。
 *
 * 优先按题号：接口的 `position` 从 0 开始，页面题号从 1 开始，相差 1。
 *
 * 但必须**两边都能按号**才用题号。页面是异步渲染的，题号可能还没写进去；
 * 此时若拿数组下标顶替（`positionOf(item) ?? index + 1`），就会出现一半按号、
 * 一半按顺序的局面：比如第 1 题已带题号「2」、第 2 题的题号还是空的，两题都
 * 落到第 2 题的依据上，第 1 题的依据则哪都不出现。用户看到的就是
 * 「得分指导的题号和题目对不上」，刷新（题号已齐）后恢复正常。
 *
 * 因此：有一边读不到编号时，读不到的那几道这一轮先跳过，等题号渲染出来
 * 由下一次评估补上；只有两边都完全没有编号时，才退回按展示顺序对，
 * 此时按接口自己的 position 排序，不依赖数组给过来的顺序。
 */
export function matchQuestions(
  items: HTMLElement[],
  questions: PaperQuestion[],
): Map<HTMLElement, PaperQuestion> {
  const matched = new Map<HTMLElement, PaperQuestion>();

  const everyQuestionNumbered = questions.every((question) => typeof question.position === 'number');
  const pageHasNumbers = items.some((item) => positionOf(item) !== null);

  if (everyQuestionNumbered && pageHasNumbers) {
    const byNumber = new Map<number, PaperQuestion>();
    for (const question of questions) {
      byNumber.set((question.position as number) + 1, question);
    }

    for (const item of items) {
      const number = positionOf(item);
      // 这一题的题号还没渲染出来：不猜，下一次评估再说
      if (number === null) continue;
      const question = byNumber.get(number);
      if (question) matched.set(item, question);
    }
    return matched;
  }

  const ordered = everyQuestionNumbered
    ? [...questions].sort((a, b) => (a.position as number) - (b.position as number))
    : questions;
  const pairs = Math.min(items.length, ordered.length);
  for (let index = 0; index < pairs; index += 1) {
    matched.set(items[index] as HTMLElement, ordered[index] as PaperQuestion);
  }
  return matched;
}

/** 块要插在哪：题干之后。题干还没渲染出来时返回 null。 */
export function anchorOf(item: HTMLElement): Element | null {
  return (
    item.querySelector(SELECTORS.richText)?.closest('.j-title') ??
    item.querySelector(SELECTORS.answerArea)
  );
}

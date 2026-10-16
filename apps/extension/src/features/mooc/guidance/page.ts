/*
 * 页面侧：找到题目节点、整理题上的注入块、把题目与数据对上、定好插入点。
 *
 * 本文件不知道块的种类——「页面自己是否已展示」由调用方给判据（看内容，
 * 不看类名），这里只管时序与归属：哪些块该清、哪道题还需要注入。
 */

import { SELECTORS } from '../selectors.ts';
import { blockSource, hasCurrentBlock, injectedBlocks, sourceFamily } from './markers.ts';

/** 题目至少要有卷面序号，注入端靠它与页面题号对齐。 */
export interface Positioned {
  position?: number | null;
}

/** 页面上的题目节点。 */
export function questionItems(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(SELECTORS.questionItem));
}

/**
 * 整理一道题上的注入块，返回它是否还需要注入。
 *
 * 两种块要清掉：
 *   - 页面自己已展示这块内容的题（不重复展示，判据由 `selfShows` 给）；
 *   - 本族里属于别的卷的块（换卷时站点未必带走这些外来节点）。
 * 别的族的块不动：主观考试页上得分指导与查看答案共存，互不越权。
 * 来源不明的块（旧版本注入）无从归属，一并清掉。
 */
export function normalizeItem(
  item: HTMLElement,
  source: string,
  selfShows: (item: HTMLElement) => boolean,
): boolean {
  const siteShows = selfShows(item);
  const family = sourceFamily(source);

  for (const block of injectedBlocks(item)) {
    const own = blockSource(block);
    if (own === null || (sourceFamily(own) === family && (siteShows || own !== source))) {
      block.remove();
    }
  }

  return !siteShows && !hasCurrentBlock(item, source);
}

/** 整理整页的注入块，返回是否还有题目需要注入。 */
export function normalizePage(
  source: string,
  selfShows: (item: HTMLElement) => boolean,
): boolean {
  let needed = false;

  for (const item of questionItems()) {
    if (normalizeItem(item, source, selfShows)) needed = true;
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
 * 题目与数据的对应关系。
 *
 * 优先按题号：接口的 `position` 从 0 开始，页面题号从 1 开始，相差 1。
 *
 * 但必须**两边都能按号**才用题号。页面是异步渲染的，题号可能还没写进去；
 * 此时若拿数组下标顶替（`positionOf(item) ?? index + 1`），就会出现一半按号、
 * 一半按顺序的局面：比如第 1 题已带题号「2」、第 2 题的题号还是空的，两题都
 * 落到第 2 题的数据上，第 1 题的数据则哪都不出现。用户看到的就是
 * 「块里的题号和题目对不上」，刷新（题号已齐）后恢复正常。
 *
 * 因此：有一边读不到编号时，读不到的那几道这一轮先跳过，等题号渲染出来
 * 由下一次评估补上；只有两边都完全没有编号时，才退回按展示顺序对，
 * 此时按接口自己的 position 排序，不依赖数组给过来的顺序。
 */
export function matchQuestions<Q extends Positioned>(
  items: HTMLElement[],
  questions: Q[],
): Map<HTMLElement, Q> {
  const matched = new Map<HTMLElement, Q>();

  const everyQuestionNumbered = questions.every((question) => typeof question.position === 'number');
  const pageHasNumbers = items.some((item) => positionOf(item) !== null);

  if (everyQuestionNumbered && pageHasNumbers) {
    const byNumber = new Map<number, Q>();
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
    matched.set(items[index] as HTMLElement, ordered[index] as Q);
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

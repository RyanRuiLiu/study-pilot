/*
 * 注入块的标记与站点文案。
 *
 * 标记要能回答两件事：这一块是本次注入的，以及它属于哪一份作业。
 * 后者不能省：学习页是 hash 路由的单页应用，切换单元不重新加载文档，
 * 站点未必带走注入块；「已经注入过」的判断若只认「题目里有没有块」，
 * 上一单元的得分指导就会被当成当前单元的，一直留在页面上。
 */

/** 块存在与否的标记。 */
export const ANSWER_MARK_ATTRIBUTE = 'data-study-pilot-answer';

/** 块属于哪一份作业（`homework:tid`）。空值表示来源不明，按别的作业处理。 */
export const ANSWER_SOURCE_ATTRIBUTE = 'data-study-pilot-answer-source';

/**
 * 得分指导的标题文案。取自页面语言包（KEY_LEARN_SCORING_GUIDANCE）。
 * 同一句话也用来判断页面自己是不是已经在展示评分依据。
 */
export const GUIDANCE_LABEL = '得分指导';

/**
 * 一份作业的标识（`homework:tid`）。
 *
 * 前缀是「族」：注入块按族区分归属，换卷时只清理本族的旧块。
 * 主观题考试页与作业页共用这一族（同一个取卷管线），因此前缀不叫 exam。
 */
export function answerSource(tid: number): string {
  return `homework:${tid}`;
}

/** 某个题目里已注入的块。 */
export function injectedBlocks(item: HTMLElement): HTMLElement[] {
  return Array.from(item.querySelectorAll<HTMLElement>(`[${ANSWER_MARK_ATTRIBUTE}]`));
}

/** 块是哪一份作业的。旧版本注入的块没有来源属性，返回 null，按别的作业处理。 */
export function blockSource(block: HTMLElement): string | null {
  return block.getAttribute(ANSWER_SOURCE_ATTRIBUTE);
}

/** 该题是否已经有当前这份作业的块。 */
export function hasCurrentBlock(item: HTMLElement, source: string): boolean {
  return injectedBlocks(item).some((block) => blockSource(block) === source);
}

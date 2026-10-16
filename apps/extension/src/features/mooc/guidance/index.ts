/*
 * 作业页的得分指导：取卷端口 + 本族的渲染与判据。
 *
 * 数据来源：`getHomeworkPaperDto` 响应的 `subjectiveQList[].judgeDtos[]`。
 * 每道题可以有一个或多个评分点，每个评分点的 `msg` 是含图片与文字的富文本，
 * `maxScore` 是该评分点的满分。作业题没有 `stdAnswer`（实测恒为 null），
 * 评分依据就是这些评分点。
 *
 * 文案与结构取自网站自身，不自创：
 *   标题 得分指导：  满分 xxx 分   （KEY_LEARN_SCORING_GUIDANCE 等）
 *
 * 时序与归属规则在 `inject.ts`（与「查看答案」共用一份）；本文件只给这一族
 * 的三样东西：来源、页面判据、块渲染。分工：标记与站点文案见 `markers.ts`，
 * 页面识别见 `page.ts`，块渲染见 `block.ts`，生产用的取卷实现见 `loader.ts`
 * （那个文件才碰消息通道，本文件保持纯 DOM，因此可以在 Node 里用假取卷端口直接测）。
 */

import type { PaperQuestion } from '@study-pilot/platform-mooc';
import { buildAnswerBlock } from './block.ts';
import { clearBlocks, injectBlocks } from './inject.ts';
import { GUIDANCE_LABEL, HOMEWORK_FAMILY, answerSource } from './markers.ts';
import { matchQuestions } from './page.ts';
import { SELECTORS } from '../selectors.ts';

/**
 * 取一份卷的题目。
 *
 * 作为端口注入而不是在模块里直接用消息通道：内容脚本不建客户端，
 * 取数集中在后台（那里的节流是唯一的）。测试注入假实现即可，不必 mock 浏览器。
 */
export type QuestionLoader = (tid: number) => Promise<PaperQuestion[] | null>;

// 注入标记是这一层的公开契约（调用方要靠它识别与清理注入块）
export * from './markers.ts';

/**
 * 页面自己是否已经在展示这道题的评分依据。
 *
 * 只看站点自己的容器：注入块插在 .j-title 之后，不会落进 .j-answer 或
 * .j-evaluate 里，因此这里不会把刚注入的内容当成「页面已经展示」。
 *
 * 给别人打分的互评页面上每题都列着「得分指导」，再注入一份既重复又干扰阅读；
 * 而查看自己已提交的作业——包括成绩公布——站点只给分数与评语，评分依据要由
 * 本模块补上。两者的区别要看页面内容，不能看类名：已提交的作业每道题都带
 * `analysisMode`，`.u-evaluateItem` 在「查看评价结果」时也出现，按类名判断会
 * 把用户真正需要的那些页面一起挡掉。
 */
function selfShowsGuidance(item: HTMLElement): boolean {
  const containers = [SELECTORS.answerArea, SELECTORS.evaluateModule]
    .map((selector) => item.querySelector<HTMLElement>(selector))
    .filter((node): node is HTMLElement => node !== null);

  return containers.some((node) => (node.textContent ?? '').includes(GUIDANCE_LABEL));
}

/** 把得分指导插入页面（幂等，可以随页面变动反复调用）。 */
export async function injectGuidance(load: QuestionLoader, tid: number): Promise<void> {
  await injectBlocks({
    source: answerSource(tid),
    load: () => load(tid),
    selfShows: selfShowsGuidance,
    build: buildAnswerBlock,
    // 作业卷的 position 就是卷面序（页面题号 = position + 1），按题号对齐
    pair: (items, questions) => matchQuestions(items, questions),
  });
}

/** 移除已注入的得分指导块（在途的取数一并作废）。 */
export function removeGuidance(): void {
  clearBlocks(HOMEWORK_FAMILY);
}

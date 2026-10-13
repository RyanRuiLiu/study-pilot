/*
 * 作业页与考试页的得分指导：取卷、插入、幂等与生命周期。
 *
 * 数据来源：`getOpenHomeworkPaperDto` 响应的 `subjectiveQList[].judgeDtos[]`。
 * 每道题可以有一个或多个评分点，每个评分点的 `msg` 是含图片与文字的富文本，
 * `maxScore` 是该评分点的满分。作业题没有 `stdAnswer`（实测恒为 null），
 * 评分依据就是这些评分点。
 *
 * 文案与结构取自网站自身，不自创：
 *   标题 得分指导：  满分 xxx 分   （KEY_LEARN_SCORING_GUIDANCE 等）
 *
 * 分工：标记与站点文案见 `markers.ts`，页面识别见 `page.ts`，
 * 块渲染见 `block.ts`，取卷见 `paper.ts`。
 */

import type { MoocClient } from '@study-pilot/platform-mooc';
import { buildAnswerBlock } from './block.ts';
import { ANSWER_MARK_ATTRIBUTE, answerSource } from './markers.ts';
import { anchorOf, matchQuestions, normalizeItem, normalizePage, questionItems } from './page.ts';
import { loadExamQuestions, loadHomeworkQuestions } from './paper.ts';

// 注入标记是这一层的公开契约（调用方要靠它识别与清理注入块）
export * from './markers.ts';

/**
 * 当前挂载的目标，以及是否卸载过。
 *
 * 取卷是异步的：换了单元或切到别的页面，上一次的结果就过时了。但它不能仅仅
 * 因为「又调了一次挂载」就作废——同一单元的重复挂载很常见（页面每次变动都会
 * 重新评估一遍），那样每次都在等一个安静的窗口，注入会一直轮不上。
 * 因此只在目标换了卷、或期间卸载过时才作废。
 */
let requestedSource: string | null = null;
let unmountCount = 0;

/** 一次取卷的凭据，用于回来时判断结果是否还作数。 */
interface InjectionRequest {
  source: string;
  unmountCount: number;
}

/** 记下这次取卷的目标，并取回判断过时所需的凭据。 */
function beginRequest(source: string): InjectionRequest {
  requestedSource = source;
  return { source, unmountCount };
}

/** 这次取卷的结果是否已经过时（目标换卷，或期间卸载过）。 */
function isStale(request: InjectionRequest): boolean {
  return requestedSource !== request.source || unmountCount !== request.unmountCount;
}

/**
 * 把得分指导插入页面。
 *
 * 幂等：当前卷已注入的题目会被跳过，因此可以反复调用（页面异步渲染时需要）。
 *
 * 两道清理在同一处完成：站点自己展示了评分依据的题目不重复注入（正在给别人
 * 打分的互评页就是这样），页面上留着别的卷的块时先清掉（换单元不会重新加载
 * 文档，站点未必带走注入块，见 `markers.ts`）。否则「有没有注入过」的判断会把
 * 上一单元的内容当成当前单元的。
 *
 * 作业与考试的取卷接口不同，但返回的题目结构相同（都带 judgeDtos），
 * 因此注入逻辑共用一套。
 */
export async function injectHomeworkAnswers(
  client: MoocClient,
  tid: number,
  kind: 'homework' | 'exam' = 'homework',
): Promise<void> {
  const source = answerSource(kind, tid);

  if (questionItems().length === 0) return;

  // 先整理一遍：换单元留下的旧块此时就该消失，不必等取卷回来
  if (!normalizePage(source)) return;

  const request = beginRequest(source);

  const questions =
    kind === 'exam' ? await loadExamQuestions(client, tid) : await loadHomeworkQuestions(client, tid);

  // 取卷期间又换了单元，或页面被卸载：这次结果已经过时
  if (isStale(request)) return;
  if (!questions || questions.length === 0) return;

  // 取卷期间站点可能重建过题目节点，按现在的 DOM 重新对一次
  for (const [item, question] of matchQuestions(questionItems(), questions)) {
    if (!normalizeItem(item, source)) continue;

    // 题干还没渲染出来：不插到题目之外（那会看起来属于下一题），等下一次评估
    const anchor = anchorOf(item);
    if (!anchor) continue;

    anchor.insertAdjacentElement('afterend', buildAnswerBlock(question, source));
  }
}

/** 移除已注入的得分指导块。 */
export function removeHomeworkAnswers(): void {
  // 在途的取卷请求一并作废：否则它回来时会把刚清掉的块又插回去
  requestedSource = null;
  unmountCount++;

  for (const block of document.querySelectorAll(`[${ANSWER_MARK_ATTRIBUTE}]`)) {
    block.remove();
  }
}

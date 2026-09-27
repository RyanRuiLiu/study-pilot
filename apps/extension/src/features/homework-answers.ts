/*
 * 作业页得分指导展示。
 *
 * 数据来源：`getOpenHomeworkPaperDto` 响应的 `subjectiveQList[].judgeDtos[]`。
 * 每道题可以有一个或多个评分点，每个评分点的 `msg` 是含图片与文字的富文本，
 * `maxScore` 是该评分点的满分。作业题没有 `stdAnswer`（实测恒为 null），
 * 评分依据就是这些评分点。
 *
 * 文案与结构取自网站自身，不做自创：
 *
 *   标题       KEY_LEARN_SCORING_GUIDANCE = 得分指导：
 *   满分       KEY_LEARN_FULL_MARKS       = 满分
 *   分数单位   KEY_LEARN_SCORE_POINTS     = 分
 *   作答内容   KEY_LEARN_ANSWER           = 回答：
 *   该题得分   KEY_LEARN_SCORE_QUESTION   = 该题得分：
 *
 * 网站的互评界面（learn_homework bundle 的 EvaluateItemUI）用这样的结构呈现每个评分点：
 *
 *   <div class="u-point">
 *     <div class="breif f-fc6">
 *       <p class="f-fc3">得分指导：</p>
 *       <div class="f-richEditorText">${x.msg}</div>
 *     </div>
 *     <div class="detail">
 *       <p class="f-fc3">请给予评分：(满分 ${x.maxScore} 分)</p>
 *       ...
 *     </div>
 *   </div>
 *
 * 本模块复现其中的信息部分（得分指导与满分），去掉只有评分者才需要的打分控件。
 *
 * 题目对应关系按 position 建立，不按数组下标：页面题号从 1 开始，接口的
 * `position` 从 0 开始，下标在题目顺序变化时会错位。
 */

import {
  currentEvaluatePhase,
  getHomeworkInfo,
  getHomeworkPaper,
  getQuizPaper,
  type MoocClient,
  type PaperQuestion,
} from '@study-pilot/platform-mooc';
import { CLASS_ANALYSIS_MODE, SELECTORS } from './selectors';

const MARK_ATTRIBUTE = 'data-study-pilot-answer';

/** 判断当前页面是否处于批改或互评状态。 */
export function isReviewMode(): boolean {
  const items = Array.from(document.querySelectorAll<HTMLElement>(SELECTORS.questionItem));

  // 全部题目都带批改标记，说明整卷已批改
  if (items.length > 0 && items.every((item) => item.classList.contains(CLASS_ANALYSIS_MODE))) {
    return true;
  }

  // 互评流程页面上会挂载互评组件，此时页面自身已展示答案与评分入口
  return document.querySelector('.u-evaluateItem') !== null;
}

/** 从富文本中提取图片地址与纯文本。 */
function parseRichText(html: string): { images: string[]; text: string } {
  const container = document.createElement('div');
  container.innerHTML = html;

  const images: string[] = [];
  for (const image of container.querySelectorAll('img')) {
    const src = image.getAttribute('src');
    if (src) images.push(src);
  }

  // 富文本里夹带的零宽字符与方向控制符会干扰阅读
  const text = (container.textContent ?? '')
    .replace(/[\u200b\u200c\u200d\u200e\u200f\u202a-\u202e]/g, '')
    .trim();
  return { images, text };
}

/** 构造一道题的得分指导块。 */
function buildAnswerBlock(question: PaperQuestion): HTMLElement {
  const block = document.createElement('div');
  block.setAttribute(MARK_ATTRIBUTE, '1');
  block.style.cssText = [
    'margin-top:12px',
    'padding:12px 14px',
    'background:#f0fdfa',
    'border:1px solid #e4e7ec',
    'border-left:4px solid #0d9488',
    'border-radius:10px',
    'font-size:13px',
    'line-height:1.7',
    'color:#475467',
  ].join(';');

  const judges = question.judgeDtos ?? [];

  const head = document.createElement('div');
  head.style.cssText = 'font-weight:600;color:#0d9488;margin-bottom:8px';
  head.textContent = '得分指导：';
  if (question.score != null) {
    const score = document.createElement('span');
    score.style.cssText = 'font-weight:400;color:#98a2b3';
    score.textContent = `（本题 ${question.score} 分）`;
    head.append(score);
  }
  block.append(head);

  let hasContent = false;

  judges.forEach((judge, index) => {
    const { images, text } = parseRichText(judge.msg ?? '');
    if (images.length === 0 && !text) return;
    hasContent = true;

    if (judges.length > 1) {
      const label = document.createElement('div');
      label.style.cssText = 'color:#98a2b3;margin:8px 0 4px';
      label.textContent = `满分 ${judge.maxScore ?? 0} 分`;
      block.append(label);
    } else if (judge.maxScore != null) {
      const label = document.createElement('div');
      label.style.cssText = 'color:#98a2b3;margin:0 0 4px';
      label.textContent = `满分 ${judge.maxScore} 分`;
      block.append(label);
    }

    for (const src of images) {
      const image = document.createElement('img');
      image.src = src;
      image.loading = 'lazy';
      image.style.cssText =
        'display:block;max-width:100%;border:1px solid #e4e7ec;border-radius:8px;margin-bottom:6px';
      block.append(image);
    }

    if (text) {
      const paragraph = document.createElement('div');
      paragraph.style.whiteSpace = 'pre-wrap';
      paragraph.textContent = text;
      block.append(paragraph);
    }
  });

  // judgeDtos 为空说明这份作业没有配置评分依据，属于数据本身的情况
  if (!hasContent) {
    const empty = document.createElement('div');
    empty.style.color = '#98a2b3';
    empty.textContent = '这份作业未配置得分指导';
    block.append(empty);
  }

  return block;
}

/** 读取页面上的题号。题号缺失时返回 null。 */
function positionOf(item: HTMLElement): number | null {
  const positionNode = item.querySelector('.position');
  const text = (positionNode?.textContent ?? '').trim();
  const parsed = Number(text);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

/**
 * 把得分指导插入页面。
 *
 * 幂等：已注入的题目会被跳过，因此可以反复调用（页面异步渲染时需要）。
 * 处于批改或互评页面时改而移除已有注入。
 *
 * 作业与考试的取卷接口不同，但返回的题目结构相同（都带 judgeDtos）：
 *   作业  getOpenHomeworkInfo + getOpenHomeworkPaperDto
 *   考试  getOpenQuizPaperDto，aid 传 0 由服务端创建答卷
 * 因此这里按类型选数据源，注入逻辑共用一套。
 */
export async function injectHomeworkAnswers(
  client: MoocClient,
  tid: number,
  kind: 'homework' | 'exam' = 'homework',
): Promise<void> {
  const items = Array.from(document.querySelectorAll<HTMLElement>(SELECTORS.questionItem));
  if (items.length === 0) return;

  if (isReviewMode()) {
    removeHomeworkAnswers();
    return;
  }

  if (items.every((item) => item.querySelector(`[${MARK_ATTRIBUTE}]`))) return;

  const questions = kind === 'exam' ? await loadExamQuestions(client, tid) : await loadHomeworkQuestions(client, tid);
  if (!questions || questions.length === 0) return;

  // 按 position 建立索引，接口的 position 从 0 开始
  const byPosition = new Map<number, PaperQuestion>();
  for (const question of questions) {
    const position = question.position ?? byPosition.size;
    byPosition.set(position + 1, question);
  }

  items.forEach((item, index) => {
    if (item.querySelector(`[${MARK_ATTRIBUTE}]`)) return;

    const position = positionOf(item) ?? index + 1;
    const question = byPosition.get(position);
    if (!question) return;

    const anchor =
      item.querySelector(SELECTORS.richText)?.closest('.j-title') ??
      item.querySelector(SELECTORS.answerArea) ??
      item;
    anchor.insertAdjacentElement('afterend', buildAnswerBlock(question));
  });
}

/** 取作业的题目。任一步失败返回 null，由调用方决定不注入。 */
async function loadHomeworkQuestions(
  client: MoocClient,
  tid: number,
): Promise<PaperQuestion[] | null> {
  const info = await getHomeworkInfo(client, tid);
  if (!info.ok) return null;

  const paper = await getHomeworkPaper(client, tid, {
    aid: info.value.aid ?? undefined,
    phase: currentEvaluatePhase(info.value),
  });
  if (!paper.ok) return null;

  return paper.value.subjectiveQList ?? paper.value.objectiveQList ?? [];
}

/**
 * 取考试的题目。
 *
 * aid 传 0：考试没有草稿态，服务端会为该用户创建答卷并返回题目。
 * 这一步是只读之外唯一会产生副作用的调用，但它只是"开始这份答卷"，
 * 与页面上点「开始考试」等价，不会替用户作答或提交。
 */
async function loadExamQuestions(
  client: MoocClient,
  tid: number,
): Promise<PaperQuestion[] | null> {
  const paper = await getQuizPaper(client, tid, 0);
  if (!paper.ok) return null;

  return paper.value.subjectiveQList ?? paper.value.objectiveQList ?? [];
}

/** 移除已注入的得分指导块。 */
export function removeHomeworkAnswers(): void {
  for (const block of document.querySelectorAll(`[${MARK_ATTRIBUTE}]`)) {
    block.remove();
  }
}

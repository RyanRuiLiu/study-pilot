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
 * 评分依据整段渲染，不把图片与文字拆开：公式在富文本里就是行内小图，
 * 拆开会把符号从句子中间抽走（见 renderRichText）。
 *
 * 一题有多个评分点时，每点单独成块并用分隔线隔开——示例课程丁的作业题就是
 * 三四个评分点、每点都带图，首尾相接时读不出哪句属于哪一点。
 *
 * 题目对应关系按 position 建立，不按数组下标：页面题号从 1 开始，接口的
 * `position` 从 0 开始，下标在题目顺序变化时会错位。
 *
 * 注入块必须记得自己属于哪一份卷
 * ------------------------------
 * 学习页是 hash 路由的单页应用，切换单元不重新加载文档：站点只更新它自己
 * 渲染的那部分 DOM，而注入块是插进题目节点里的外来节点，站点重渲染时未必
 * 会带走它。若「已经注入过」的判断只认「题目里有没有块」，上一单元的得分
 * 指导就会被当成当前单元的，一直留在页面上，直到用户手动刷新。
 *
 * 因此每个块都带上来源（`kind:tid`）：来源对不上，先清掉再注入。
 * 取卷是异步的，而且换单元时前一次请求可能还在路上——它回来时若目标已经
 * 换了卷、或页面已被卸载，这次结果就作废，不能让它把旧卷的评分标准写进
 * 新单元的题目。
 *
 * 只在页面自己没有展示评分依据时注入
 * --------------------------------
 * 给别人打分的互评页面上每题都列着「得分指导」，再注入一份既重复又干扰阅读；
 * 而查看自己已提交的作业——包括成绩公布——站点只给分数与评语，评分依据要由
 * 本模块补上。两者的区别要看页面内容，不能看类名：已提交的作业每道题都带
 * `analysisMode`，`.u-evaluateItem` 在「查看评价结果」时也出现，按类名判断会
 * 把用户真正需要的那些页面一起挡掉。
 */

import {
  currentEvaluatePhase,
  getHomeworkInfo,
  getHomeworkPaper,
  getQuizPaper,
  type MoocClient,
  type PaperQuestion,
} from '@study-pilot/platform-mooc';
import { SELECTORS } from './selectors';

/** 块存在与否的标记。 */
export const ANSWER_MARK_ATTRIBUTE = 'data-study-pilot-answer';

/** 块属于哪一份卷（`kind:tid`）。空值表示来源不明，按别的卷处理。 */
export const ANSWER_SOURCE_ATTRIBUTE = 'data-study-pilot-answer-source';

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

/** 一份卷的标识。kind 要参与：考试与作业走不同的取卷接口。 */
function answerSource(kind: 'homework' | 'exam', contentId: number): string {
  return `${kind}:${contentId}`;
}

/** 页面上的题目节点。 */
function questionItems(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(SELECTORS.questionItem));
}

/** 某个题目里已注入的块。 */
function injectedBlocks(item: HTMLElement): HTMLElement[] {
  return Array.from(item.querySelectorAll<HTMLElement>(`[${ANSWER_MARK_ATTRIBUTE}]`));
}

/** 块是哪一份卷的。旧版本注入的块没有来源属性，返回 null，按别的卷处理。 */
function blockSource(block: HTMLElement): string | null {
  return block.getAttribute(ANSWER_SOURCE_ATTRIBUTE);
}

/** 该题是否已经有当前这份卷的块。 */
function hasCurrentBlock(item: HTMLElement, source: string): boolean {
  return injectedBlocks(item).some((block) => blockSource(block) === source);
}

/**
 * 得分指导的标题文案。取自页面语言包（KEY_LEARN_SCORING_GUIDANCE）。
 * 同一句话也用来判断页面自己是不是已经在展示评分依据。
 */
const GUIDANCE_LABEL = '得分指导';

/**
 * 页面自己是否已经在展示这道题的评分依据。
 *
 * 网站给别人打分的互评界面上，每题都列着「得分指导」：此时再注入一份既重复
 * 又干扰阅读。而查看自己已提交的作业（含成绩公布）时，站点只给分数与评语，
 * 评分依据要靠本模块补上——按类名判断做不到这件事：`analysisMode` 只说明
 * 整卷已批改，`.u-evaluateItem` 在「查看评价结果」时同样出现。
 *
 * 只看站点自己的容器：注入块插在 .j-title 之后，不会落进 .j-answer 或
 * .j-evaluate 里，因此这里不会把刚注入的内容当成「页面已经展示」。
 */
function selfShowsGuidance(item: HTMLElement): boolean {
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
function normalizeItem(item: HTMLElement, source: string): boolean {
  const siteShows = selfShowsGuidance(item);

  for (const block of injectedBlocks(item)) {
    if (siteShows || blockSource(block) !== source) block.remove();
  }

  return !siteShows && !hasCurrentBlock(item, source);
}

/** 文本节点与元素节点的 nodeType。用数字而不是 Node 常量：测试环境里没有 Node 全局。 */
const TEXT_NODE = 3;
const ELEMENT_NODE = 1;

/** 富文本里夹带的零宽字符与方向控制符会干扰阅读，逐段去掉。 */
function stripInvisible(node: Node): void {
  for (const child of Array.from(node.childNodes)) {
    if (child.nodeType === TEXT_NODE) {
      const text = child.textContent ?? '';
      const cleaned = text.replace(/[\u200b\u200c\u200d\u200e\u200f\u202a-\u202e]/g, '');
      if (cleaned !== text) child.textContent = cleaned;
    } else if (child.nodeType === ELEMENT_NODE) {
      stripInvisible(child);
    }
  }
}

/**
 * 把评分依据的富文本整段渲染进来。
 *
 * 不能把图片与文字分开取：评分依据里的公式就是行内小图（实测 18×22 上下）。
 * 分开取会把它们从句子中间抽出来堆成一列，正文则把符号丢掉——
 * 「因为〔R_i〕很大，〔C_1〕示例片段乙〔f_L〕示例片段丙」
 * 会变成「因为很大，示例片段乙示例片段丙」，读者无从理解。
 * 站点自己也是整段渲染的（EvaluateItemUI 把 msg 直接放进 .f-richEditorText）。
 *
 * 只做三件事：去掉可执行的节点与事件属性、把图片限制在块宽之内、
 * 清掉夹带的零宽字符。结构保持原样，因此段落的相对位置与站点一致。
 */
function renderRichText(html: string): HTMLElement {
  const container = document.createElement('div');
  container.innerHTML = html;

  for (const node of container.querySelectorAll('script, style, link, iframe')) node.remove();

  for (const element of container.querySelectorAll<HTMLElement>('*')) {
    for (const attribute of Array.from(element.attributes)) {
      if (/^on/i.test(attribute.name)) element.removeAttribute(attribute.name);
    }
  }

  for (const image of container.querySelectorAll<HTMLImageElement>('img')) {
    image.loading = 'lazy';
    image.style.maxWidth = '100%';
    image.style.height = 'auto';
    image.style.verticalAlign = 'middle';
  }

  stripInvisible(container);

  return container;
}

/** 构造一道题的得分指导块。`source` 记录它属于哪一份卷。 */
function buildAnswerBlock(question: PaperQuestion, source: string): HTMLElement {
  const block = document.createElement('div');
  block.setAttribute(ANSWER_MARK_ATTRIBUTE, '1');
  block.setAttribute(ANSWER_SOURCE_ATTRIBUTE, source);
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
  head.textContent = `${GUIDANCE_LABEL}：`;
  if (question.score != null) {
    const score = document.createElement('span');
    score.style.cssText = 'font-weight:400;color:#98a2b3';
    score.textContent = `（本题 ${question.score} 分）`;
    head.append(score);
  }
  block.append(head);

  let hasContent = false;

  judges.forEach((judge, index) => {
    const content = renderRichText(judge.msg ?? '');
    const hasText = (content.textContent ?? '').trim().length > 0;
    const hasImage = content.querySelector('img') !== null;
    if (!hasText && !hasImage) return;
    hasContent = true;

    /*
     * 一个评分点一个块。示例课程丁这类作业一题有三四个评分点（满分各 6/6/3 分），
     * 每点的评分标准都带图，首尾相接时会连成一片、分不清哪句属于哪点，
     * 因此后续的点之间加一条分隔线。
     */
    const point = document.createElement('div');
    if (index > 0) {
      point.style.cssText = 'margin-top:10px;padding-top:10px;border-top:1px solid #e4e7ec';
    }

    // 只有多评分点时才把 0 分也写出来：单点评分依据缺失满分时没什么可说的
    const maxScore = judge.maxScore ?? (judges.length > 1 ? 0 : null);
    if (maxScore != null) {
      const label = document.createElement('div');
      label.style.cssText = 'color:#98a2b3;margin:0 0 4px';
      label.textContent = `满分 ${maxScore} 分`;
      point.append(label);
    }

    point.append(content);
    block.append(point);
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
 * 幂等：当前卷已注入的题目会被跳过，因此可以反复调用（页面异步渲染时需要）。
 *
 * 两道清理在同一处完成：站点自己展示了评分依据的题目不重复注入（正在给别人
 * 打分的互评页就是这样），页面上留着别的卷的块时先清掉（换单元不会重新加载
 * 文档，站点未必带走注入块，见文件头）。否则「有没有注入过」的判断会把上一
 * 单元的内容当成当前单元的。
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

  // 按 position 建立索引，接口的 position 从 0 开始
  const byPosition = new Map<number, PaperQuestion>();
  for (const question of questions) {
    const position = question.position ?? byPosition.size;
    byPosition.set(position + 1, question);
  }

  // 取卷期间站点可能重建过题目节点，按现在的 DOM 注入
  questionItems().forEach((item, index) => {
    if (!normalizeItem(item, source)) return;

    const position = positionOf(item) ?? index + 1;
    const question = byPosition.get(position);
    if (!question) return;

    const anchor =
      item.querySelector(SELECTORS.richText)?.closest('.j-title') ??
      item.querySelector(SELECTORS.answerArea) ??
      item;
    anchor.insertAdjacentElement('afterend', buildAnswerBlock(question, source));
  });
}

/** 整理整页的注入块，返回是否还有题目需要注入。 */
function normalizePage(source: string): boolean {
  let needed = false;

  for (const item of questionItems()) {
    if (normalizeItem(item, source)) needed = true;
  }

  return needed;
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
  // 在途的取卷请求一并作废：否则它回来时会把刚清掉的块又插回去
  requestedSource = null;
  unmountCount++;

  for (const block of document.querySelectorAll(`[${ANSWER_MARK_ATTRIBUTE}]`)) {
    block.remove();
  }
}

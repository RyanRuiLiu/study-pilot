/*
 * 渲染一个得分指导块。
 *
 * 评分依据整段渲染，不把图片与文字拆开：公式在富文本里就是行内小图，
 * 拆开会把符号从句子中间抽走。站点自己也是整段渲染的（EvaluateItemUI 把
 * msg 直接放进 .f-richEditorText）。
 *
 * 一题有多个评分点时，每点单独成块并用分隔线隔开——模电的作业题就是
 * 三四个评分点、每点都带图，首尾相接时读不出哪句属于哪一点。
 */

import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';

import type { PaperQuestion } from '@study-pilot/platform-mooc';
import guidanceStyles from './guidance.css?inline';
import { attachIsolated } from '../../isolated.ts';
import { ANSWER_MARK_ATTRIBUTE, ANSWER_SOURCE_ATTRIBUTE, GUIDANCE_LABEL } from './markers.ts';

/** 文本节点与元素节点的 nodeType。用数字而不是 Node 常量：测试环境里没有 Node 全局。 */
const TEXT_NODE = 3;
const ELEMENT_NODE = 1;

/**
 * 要清掉的零宽字符与方向控制符。
 *
 * 两个部分，逐字符删除，语义与逐码点去字符一致：
 *   - 零宽空格/非连接符与方向控制符（U+200B/200C/200E/200F、U+202A–202E）
 *   - U+200D 零宽连接符
 *
 * U+200D 用「或」而不是并进字符类：字符类里出现连接符时，它会被读成
 * 「把前后字符连成一个序列」（no-misleading-character-class 报的就是这个
 * 读法），而这里要的只是把这个码点本身删掉，写成或项才不会误导读者。
 * 带 u 标志：方向控制符按码位解释，不按 UTF-16 码元。
 */
const INVISIBLE = /[\u200b\u200c\u200e\u200f\u202a-\u202e]|\u200d/gu;

/**
 * 富文本里夹带的零宽字符与方向控制符会干扰阅读，逐段去掉。
 */
function stripInvisible(node: Node): void {
  for (const child of Array.from(node.childNodes)) {
    if (child.nodeType === TEXT_NODE) {
      const text = child.textContent ?? '';
      const cleaned = text.replace(INVISIBLE, '');
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
 * 「因为〔R_i〕很大，〔C_1〕取值较小时对〔f_L〕下限截止频率影响不大」
 * 会变成「因为很大，取值较小时对下限截止频率影响不大」，读者无从理解。
 *
 * 只做三件事：去掉可执行的节点与事件属性、把图片改成懒加载、清掉夹带的零宽字符。
 * 结构保持原样，因此段落的相对位置与站点一致；图片的尺寸由 guidance.css 管。
 */
function renderRichText(html: string): HTMLElement {
  const container = document.createElement('div');
  container.className = 'content';
  container.innerHTML = html;

  for (const node of container.querySelectorAll('script, style, link, iframe')) node.remove();

  for (const element of container.querySelectorAll<HTMLElement>('*')) {
    for (const attribute of Array.from(element.attributes)) {
      if (/^on/i.test(attribute.name)) element.removeAttribute(attribute.name);
    }
  }

  for (const image of container.querySelectorAll<HTMLImageElement>('img')) {
    image.loading = 'lazy';
  }

  stripInvisible(container);

  return container;
}

/** 构造一道题的得分指导块。`source` 记录它属于哪一份卷。 */
export function buildAnswerBlock(question: PaperQuestion, source: string): HTMLElement {
  const host = document.createElement('div');
  host.setAttribute(ANSWER_MARK_ATTRIBUTE, '1');
  host.setAttribute(ANSWER_SOURCE_ATTRIBUTE, source);
  // 内容来自平台富文本，与页面里其它节点同名（.content、.title…）。
  // 关进 shadow root 之后两边互不干扰，站点的样式也不会把这一块改歪。
  const shadow = attachIsolated(host, guidanceStyles);

  /*
   * 容器是 sl-alert：它就是「一句要人注意的事实」这个语义，
   * 浅底、边、圆角都由官方主题给，不再自己画一道左边框。
   */
  const alert = document.createElement('sl-alert');
  alert.variant = 'primary';
  alert.open = true;

  const head = document.createElement('strong');
  head.textContent = `${GUIDANCE_LABEL}：`;
  if (question.score != null) {
    const score = document.createElement('span');
    score.textContent = `（本题 ${question.score} 分）`;
    head.append(score);
  }
  alert.append(head);
  shadow.append(alert);

  const judges = question.judgeDtos ?? [];
  let hasContent = false;

  judges.forEach((judge) => {
    const content = renderRichText(judge.msg ?? '');
    const hasText = (content.textContent ?? '').trim().length > 0;
    const hasImage = content.querySelector('img') !== null;
    if (!hasText && !hasImage) return;
    hasContent = true;

    /*
     * 一个评分点一个块。模电这类作业一题有三四个评分点（满分各 6/6/3 分），
     * 每点的评分标准都带图，首尾相接时会连成一片、分不清哪句属于哪点，
     * 因此点与点之间放一条官方分隔线。判据是「前面已经排了几点」，
     * 空点在上面就被 return 掉了，不会多出一条线。
     */
    if (alert.querySelectorAll('.point').length > 0) alert.append(document.createElement('sl-divider'));

    const point = document.createElement('div');
    point.className = 'point';

    // 只有多评分点时才把 0 分也写出来：单点评分依据缺失满分时没什么可说的
    const maxScore = judge.maxScore ?? (judges.length > 1 ? 0 : null);
    if (maxScore != null) {
      const label = document.createElement('small');
      label.textContent = `满分 ${maxScore} 分`;
      point.append(label, document.createElement('br'));
    }

    point.append(content);
    alert.append(point);
  });

  // judgeDtos 为空说明这份作业没有配置评分依据，属于数据本身的情况
  if (!hasContent) {
    const empty = document.createElement('div');
    empty.textContent = '这份作业未配置得分指导';
    alert.append(empty);
  }

  return host;
}

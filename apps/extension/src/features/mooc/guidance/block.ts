/*
 * 渲染一个得分指导块。
 *
 * 评分依据整段渲染，不把图片与文字拆开：公式在富文本里就是行内小图，
 * 拆开会把符号从句子中间抽走。站点自己也是整段渲染的（EvaluateItemUI 把
 * msg 直接放进 .f-richEditorText）。
 *
 * 一题有多个评分点时，每点单独成块并用分隔线隔开——示例课程丁的作业题就是
 * 三四个评分点、每点都带图，首尾相接时读不出哪句属于哪一点。
 *
 * 样式写成内联而不是类名：这块注入在**别人的页面**上，扩展自己的样式表
 * 在那里不可用——内联是它的隔离手段，不是将就。但取值不手抄：颜色、圆角、
 * 间距一律取 src/ui/tokens.ts（src/ui/tokens.css 的 TS 镜像，由
 * test/tokens-parity.test.ts 逐条核对）。
 */

import type { PaperQuestion } from '@study-pilot/platform-mooc';
import { TOKENS } from '../../../ui/tokens.ts';
import { ANSWER_MARK_ATTRIBUTE, ANSWER_SOURCE_ATTRIBUTE, GUIDANCE_LABEL } from './markers.ts';

/** 文本节点与元素节点的 nodeType。用数字而不是 Node 常量：测试环境里没有 Node 全局。 */
const TEXT_NODE = 3;
const ELEMENT_NODE = 1;

/*
 * 富文本按白名单净化。
 *
 * 为什么当作不可信：`msg` 是平台上的富文本（课程老师/助教可写），而块渲染在
 * icourse163 页面自身的 DOM 里——不净化就等于在平台的源里执行它。旧的
 * 「删几个标签 + 剥 on* 属性」管不住 javascript: 链接、object/form、
 * style 里的 url() 信标这些，因此改成结构性白名单：
 *
 *   名单外、但文字可读的  → 拆掉元素本身，文字留下（链接、未知标签走这条）
 *   整个丢弃            → 代码与控件类元素连内容一起丢（拿出来的只会是代码）
 *   属性                → 除 img 的四个以外一律剥掉（含 style 与 on*）
 *   URL                 → 只放行显式 https:（公式图都在平台 CDN 上）
 */

/** 允许保留的元素。其余元素拆掉留字，或按 DROPPED_TAGS 整体丢弃。 */
const ALLOWED_TAGS = new Set([
  'p', 'br', 'div', 'span',
  'b', 'strong', 'i', 'em', 'u', 's', 'sub', 'sup', 'code', 'pre', 'blockquote',
  'ul', 'ol', 'li',
  'table', 'thead', 'tbody', 'tr', 'td', 'th',
  'img',
]);

/** 每个元素允许保留的属性。img 的 src 另行做协议检查。 */
const ALLOWED_ATTRS: Record<string, ReadonlySet<string>> = {
  img: new Set(['src', 'alt', 'width', 'height']),
};

/** 整体丢弃（含内容）：代码、样式与控件类元素，文字内容没有可读价值。 */
const DROPPED_TAGS = new Set([
  'script', 'style', 'template', 'noscript', 'title', 'head',
  'link', 'meta', 'base', 'iframe', 'frame', 'object', 'embed', 'applet',
  'form', 'input', 'button', 'select', 'textarea', 'option',
  'audio', 'video', 'source', 'track', 'canvas', 'svg', 'math',
]);

/** 只放行显式 https:。javascript:、data:、vbscript:、协议相对等一概拒绝。 */
function safeUrl(raw: string): string | null {
  const value = raw.trim();
  return /^https:\/\//i.test(value) ? value : null;
}

function sanitizeTree(container: HTMLElement): void {
  for (const element of Array.from(container.querySelectorAll<HTMLElement>('*'))) {
    const tag = element.tagName.toLowerCase();

    if (DROPPED_TAGS.has(tag)) {
      element.remove();
      continue;
    }

    if (!ALLOWED_TAGS.has(tag)) {
      // 拆掉元素本身，文字与子节点留在原处——读起来还是完整的句子
      element.replaceWith(...Array.from(element.childNodes));
      continue;
    }

    const allowed = ALLOWED_ATTRS[tag];
    for (const attribute of Array.from(element.attributes)) {
      const name = attribute.name.toLowerCase();
      if (tag === 'img' && name === 'src') {
        const safe = safeUrl(attribute.value);
        if (safe === null) element.removeAttribute('src');
        else element.setAttribute('src', safe);
        continue;
      }
      if (allowed?.has(name)) continue;
      element.removeAttribute(attribute.name);
    }
  }
}

/** 富文本里夹带的零宽字符与方向控制符会干扰阅读，逐段去掉。 */
function stripInvisible(node: Node): void {
  for (const child of Array.from(node.childNodes)) {
    if (child.nodeType === TEXT_NODE) {
      const text = child.textContent ?? '';
      const cleaned = text.replace(/[​‌‍‎‏‪-‮]/g, '');
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
 *
 * 只做三件事：按白名单净化（见 ALLOWED_TAGS 一段）、把图片限制在块宽之内、
 * 清掉夹带的零宽字符。结构保持原样，因此段落的相对位置与站点一致。
 */
export function renderRichText(html: string): HTMLElement {
  const container = document.createElement('div');
  container.innerHTML = html;

  sanitizeTree(container);

  for (const image of container.querySelectorAll<HTMLImageElement>('img')) {
    image.loading = 'lazy';
    image.style.maxWidth = '100%';
    image.style.height = 'auto';
    image.style.verticalAlign = 'middle';
  }

  stripInvisible(container);

  return container;
}

/** 构造一道题的得分指导块。`source` 记录它属于哪一份作业。 */
export function buildAnswerBlock(question: PaperQuestion, source: string): HTMLElement {
  const block = document.createElement('div');
  block.setAttribute(ANSWER_MARK_ATTRIBUTE, '1');
  block.setAttribute(ANSWER_SOURCE_ATTRIBUTE, source);
  block.style.cssText = [
    `margin-top:${TOKENS.space12}`,
    `padding:${TOKENS.space12} ${TOKENS.space16}`,
    `background:${TOKENS.accentWash}`,
    `border:1px solid ${TOKENS.line}`,
    `border-left:${TOKENS.space4} solid ${TOKENS.accent}`,
    `border-radius:${TOKENS.radiusMd}`,
    `font-size:${TOKENS.textMd}`,
    'line-height:1.7',
    `color:${TOKENS.inkSoft}`,
  ].join(';');

  const judges = question.judgeDtos ?? [];

  const head = document.createElement('div');
  head.style.cssText = `font-weight:600;color:${TOKENS.accent};margin-bottom:${TOKENS.space8}`;
  head.textContent = `${GUIDANCE_LABEL}：`;
  if (question.score != null) {
    const score = document.createElement('span');
    score.style.cssText = `font-weight:400;color:${TOKENS.inkFaint}`;
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
      point.style.cssText = `margin-top:${TOKENS.space12};padding-top:${TOKENS.space12};border-top:1px solid ${TOKENS.line}`;
    }

    // 只有多评分点时才把 0 分也写出来：单点评分依据缺失满分时没什么可说的
    const maxScore = judge.maxScore ?? (judges.length > 1 ? 0 : null);
    if (maxScore != null) {
      const label = document.createElement('div');
      label.style.cssText = `color:${TOKENS.inkFaint};margin:0 0 ${TOKENS.space4}`;
      label.textContent = `满分 ${maxScore} 分`;
      point.append(label);
    }

    point.append(content);
    block.append(point);
  });

  // judgeDtos 为空说明这份作业没有配置评分依据，属于数据本身的情况
  if (!hasContent) {
    const empty = document.createElement('div');
    empty.style.color = TOKENS.inkFaint;
    empty.textContent = '这份作业未配置得分指导';
    block.append(empty);
  }

  return block;
}

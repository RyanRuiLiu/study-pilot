/*
 * 注入块的标记、族与站点文案。
 *
 * 标记要能回答两件事：这一块是本次注入的，以及它属于哪一份卷。
 * 后者不能省：学习页是 hash 路由的单页应用，切换单元不重新加载文档，
 * 站点未必带走注入块；「已经注入过」的判断若只认「题目里有没有块」，
 * 上一单元的块就会被当成当前单元的，一直留在页面上。
 *
 * 来源写成 `族:卷号`（`homework:123` / `answers:456`）。族把两条注入链路隔开：
 * 主观考试页上两族共存（得分指导 + 查看答案），各自的块与卸载凭据互不干扰，
 * 任何一侧都不许清掉另一侧的块。
 */

/** 块存在与否的标记。 */
export const ANSWER_MARK_ATTRIBUTE = 'data-study-pilot-answer';

/** 块属于哪一份卷（`homework:tid` / `answers:tid`）。空值表示来源不明，按本族的旧块处理。 */
export const ANSWER_SOURCE_ATTRIBUTE = 'data-study-pilot-answer-source';

/** 作业页得分指导的族。 */
export const HOMEWORK_FAMILY = 'homework';

/** 答卷查看页「查看答案」的族。 */
export const ANSWERS_FAMILY = 'answers';

/**
 * 得分指导的标题文案。取自页面语言包（KEY_LEARN_SCORING_GUIDANCE）。
 * 同一句话也用来判断页面自己是不是已经在展示评分依据。
 */
export const GUIDANCE_LABEL = '得分指导';

/**
 * 「查看答案」块的标题文案，站点答卷查看页自己的用词（源码核对）。
 * 也用来判断页面自己是不是已经在展示答案。
 */
export const ANSWERS_LABEL = '参考答案';

/** 站点自己的答案解析标题。 */
export const ANALYSIS_LABEL = '答案解析';

/**
 * 页面自己展示答案时用的词：测验成绩页用「参考答案」，考试查看页用「正确答案」。
 * 两种都算页面自己展示过了，不重复注入。
 */
export const SITE_ANSWER_LABELS: readonly string[] = [ANSWERS_LABEL, '正确答案'];

/** 一份作业的标识。 */
export function answerSource(tid: number): string {
  return `${HOMEWORK_FAMILY}:${tid}`;
}

/** 一份答卷的标识（「查看答案」用的既有答卷）。 */
export function answersSource(tid: number): string {
  return `${ANSWERS_FAMILY}:${tid}`;
}

/** 来源属于哪一族。来源不明（旧版本注入的块）返回 null。 */
export function sourceFamily(source: string | null): string | null {
  if (source === null) return null;
  const at = source.indexOf(':');
  return at === -1 ? null : source.slice(0, at);
}

/** 某个题目里已注入的块。 */
export function injectedBlocks(item: HTMLElement): HTMLElement[] {
  return Array.from(item.querySelectorAll<HTMLElement>(`[${ANSWER_MARK_ATTRIBUTE}]`));
}

/** 块是哪一份卷的。旧版本注入的块没有来源属性，返回 null。 */
export function blockSource(block: HTMLElement): string | null {
  return block.getAttribute(ANSWER_SOURCE_ATTRIBUTE);
}

/** 该题是否已经有当前这份卷的块。 */
export function hasCurrentBlock(item: HTMLElement, source: string): boolean {
  return injectedBlocks(item).some((block) => blockSource(block) === source);
}

/**
 * 题目节点上**页面自己的**文本，注入块的部分不算。
 *
 * 判断「页面自己是否已展示这块内容」必须用这个而不是 item.textContent：
 * 注入块就挂在题目节点里，块里带着站点自己的标题词（如「参考答案」），
 * 直接读 textContent 会把自己的块当成页面自己展示过的，下一次评估把块删掉，
 * 表现为「块闪一下就不见了」。
 */
const TEXT_NODE = 3;
const ELEMENT_NODE = 1;

export function siteText(item: HTMLElement): string {
  let text = '';
  for (const child of Array.from(item.childNodes)) {
    if (child.nodeType === TEXT_NODE) {
      text += child.textContent ?? '';
    } else if (child.nodeType === ELEMENT_NODE) {
      const element = child as HTMLElement;
      if (element.hasAttribute(ANSWER_MARK_ATTRIBUTE)) continue;
      text += siteText(element);
    }
  }
  return text;
}

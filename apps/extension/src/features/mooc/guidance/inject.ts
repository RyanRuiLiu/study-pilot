/*
 * 注入骨架：得分指导与「查看答案」共用的一份时序与归属规则。
 *
 * 两条链路只有三处不同——来源是哪一族的哪一份卷、页面自己是否已展示这块内容、
 * 以及块怎么渲染。其余规则完全一样，因此只写一份：
 *
 *   幂等   当前来源已注入的题跳过（页面每次变动都会重走一遍）
 *   换卷   本族里属于别的卷的块清掉（换卷不重新加载文档，站点未必带走外来节点）
 *   就位   题干还没渲染出来时这一轮跳过，等下一次评估（不插到题目之外）
 *   迟到   取数回来时若来源已变、或本族被卸载过，这次结果作废
 *   空块   渲染结果为 null（没有可展示的内容）就不注入
 *
 * 族把两条链路隔开：主观考试页上两族共存，各自只清理自己的块。
 * 卸载凭据按族记：一侧卸载不影响另一侧在途的取数。
 */

import {
  ANSWER_MARK_ATTRIBUTE,
  blockSource,
  sourceFamily,
} from './markers.ts';
import { anchorOf, normalizeItem, normalizePage, questionItems } from './page.ts';

export interface BlockInjection<Q> {
  /** 来源标识（`族:卷号`），也写进块的来源属性。 */
  source: string;
  /** 取这一份卷的数据。取不到返回 null，由本模块决定不注入。 */
  load: () => Promise<Q[] | null>;
  /** 页面自己是否已展示这道题的这块内容（判据看内容，不看类名）。 */
  selfShows: (item: HTMLElement) => boolean;
  /** 渲染一块；没有可展示的内容时返回 null。 */
  build: (data: Q, source: string) => HTMLElement | null;
  /**
   * 页面题目与数据的对齐规则。**必给**：这是各族的*数据事实*，不是实现偏好——
   * 作业卷的 position 就是卷面序（页面题号 = position + 1）；随机抽题的测验里
   * position 是题目在题库里的序号（实测 3,4,8,10,11），页面题号却是渲染序（1..5），
   * 只能按显示顺序对齐。骨架只管时序与归属，对齐规则由各族给出。
   */
  pair: (items: HTMLElement[], data: Q[]) => Map<HTMLElement, Q>;
}

interface FamilyState {
  /** 当前挂载的来源。 */
  current: string | null;
  /** 本族被卸载过多少次；在途取数靠它判断结果是否已作废。 */
  unmounts: number;
}

const families = new Map<string, FamilyState>();

function stateOf(family: string): FamilyState {
  const existing = families.get(family);
  if (existing !== undefined) return existing;
  const created: FamilyState = { current: null, unmounts: 0 };
  families.set(family, created);
  return created;
}

interface InjectionRequest {
  family: string;
  source: string;
  unmounts: number;
}

function beginRequest(family: string, source: string): InjectionRequest {
  const state = stateOf(family);
  state.current = source;
  return { family, source, unmounts: state.unmounts };
}

/** 这次取数的结果是否已经过时（换卷，或本族期间卸载过）。 */
function isStale(request: InjectionRequest): boolean {
  const state = stateOf(request.family);
  return state.current !== request.source || state.unmounts !== request.unmounts;
}

/**
 * 把一份卷的块注入页面。
 *
 * 幂等：当前来源已注入的题会被跳过，因此可以反复调用（页面异步渲染时需要）。
 * 页面已经走了别族的路由时（来源为别的族）也一样成立——各族只看自己的块。
 */
export async function injectBlocks<Q>(injection: BlockInjection<Q>): Promise<void> {
  const { source, load, selfShows, build, pair } = injection;
  const family = sourceFamily(source) ?? source;

  if (questionItems().length === 0) return;

  // 先整理一遍：换卷留下的旧块此时就该消失，不必等取数回来
  if (!normalizePage(source, selfShows)) return;

  const request = beginRequest(family, source);

  const data = await load();

  // 取数期间又换了卷，或页面被卸载：这次结果已经过时
  if (isStale(request)) return;
  if (!data || data.length === 0) return;

  // 取数期间站点可能重建过题目节点，按现在的 DOM 重新对一次
  for (const [item, entry] of pair(questionItems(), data)) {
    if (!normalizeItem(item, source, selfShows)) continue;

    // 题干还没渲染出来：不插到题目之外（那会看起来属于下一题），等下一次评估
    const anchor = anchorOf(item);
    if (!anchor) continue;

    const block = build(entry, source);
    if (block !== null) anchor.insertAdjacentElement('afterend', block);
  }
}

/** 移除本族的全部块，并让在途的取数作废（离开这条路线的页面时调用）。 */
export function clearBlocks(family: string): void {
  const state = stateOf(family);
  state.current = null;
  state.unmounts += 1;

  for (const block of document.querySelectorAll<HTMLElement>(`[${ANSWER_MARK_ATTRIBUTE}]`)) {
    if (sourceFamily(blockSource(block)) === family) block.remove();
  }
}

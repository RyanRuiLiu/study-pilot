/*
 * 自动项的执行顺序：先做最便宜的。
 *
 * 课件单元一条请求就完事，测验一次请求就能定结果，互评要逐份取逐份提交。
 * 中途被关掉时，先保证那些能一次做完的已经做完。
 */

import type { AutoAction } from './types.ts';

const WEIGHT: Record<AutoAction['kind'], number> = {
  courseware: 0,
  quiz: 1,
  self: 2,
  review: 3,
};

export function byCheapest(a: AutoAction, b: AutoAction): number {
  return WEIGHT[a.kind] - WEIGHT[b.kind];
}

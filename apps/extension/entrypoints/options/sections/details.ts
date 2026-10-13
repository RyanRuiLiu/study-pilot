/*
 * 设置区：details。
 *
 * 从 options/main.ts 的 render() 搬出；表达式原样，只在开头取一次配置。
 */

import { platform, section } from '../ui.ts';
import { unitDetailsView } from '../unit-details.ts';
import { current } from '../state.ts';

export function detailsSection(): HTMLElement {
  return section('details', '单元明细', '已勾选课程下的全部单元。状态取自平台，截止列为该单元的截止时间，得分列为你已得的分数。', [
      platform('已勾选课程', '当前课程', [unitDetailsView()]),
    ]);
}
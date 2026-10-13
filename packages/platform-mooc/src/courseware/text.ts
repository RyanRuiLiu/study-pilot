/*
 * 文本（富文本）单元。
 *
 * 真人的行为：打开即完成。客户端在渲染完成时直接上报
 * `{unitId, finished:true, contentType:4}`（`RichTextUnit.__reset`），
 * 不产生任何时长记录——认证成绩页上这类单元的「完成详情」本来就是空的。
 * 因此这里与真人完全一致，没有额外行为。
 */

import { ok } from '@study-pilot/core';
import { UNIT_TYPE } from '../types.ts';
import type { UnitBehavior } from './behavior.ts';
import { completionDto, postLearnInfo } from './reports.ts';

export const textBehavior: UnitBehavior = {
  type: UNIT_TYPE.TEXT,
  ready: () => true,
  async run(client, unit) {
    const result = await postLearnInfo(client, completionDto(unit));
    return result.ok ? ok('reported') : result;
  },
};

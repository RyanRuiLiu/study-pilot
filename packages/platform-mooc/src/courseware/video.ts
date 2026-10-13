/*
 * 视频单元。
 *
 * 真人的行为：播放器每 60 秒上报一次（当前位置 + 本次学时），播到结尾再报
 * 一次 `finished`（`index.js:10485` 起定时器、`10835` 构造报文、`10878` 结尾）。
 * 平台把这些上报**累加**成「观看时长」，并在位置到结尾时判定完成。
 *
 * 我们一次性报「位置 = 时长，本次学时 = 时长」：平台记下的观看时长等于
 * 完整看一遍的量。同一单元重复上报会让时长叠加——那是平台自己的记账方式，
 * 真人重看也会这样，不做特殊处理。
 *
 * 报文学与客户端播放结束时的那一条逐字段一致（`__recordVideoTime`），
 * 只是 `learnedVideoTimeCount` 取整段时长而非一个上报周期。
 */

import { ok } from '@study-pilot/core';
import { UNIT_TYPE } from '../types.ts';
import type { UnitBehavior } from './behavior.ts';
import { baseDto, postLearnInfo } from './reports.ts';

export const videoBehavior: UnitBehavior = {
  type: UNIT_TYPE.VIDEO,
  ready: (unit) => (unit.durationInSeconds ?? 0) > 0,
  async run(client, unit) {
    const seconds = unit.durationInSeconds ?? 0;
    const result = await postLearnInfo(client, {
      ...baseDto(unit),
      finished: true,
      videoTime: seconds,
      learnedVideoTimeCount: seconds,
    });
    return result.ok ? ok('reported') : result;
  },
};

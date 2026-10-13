/*
 * 文档单元。
 *
 * 真人的行为（`PdfUnit.__recordTextPage`，index.js:14799 附近）：
 * 阅读器每翻一页上报一次 `{unitId, finished: 当前页==总页数, contentType:3,
 * index, pageNum, lastLearnTime, learnedVideoTimeCount: 距上次上报的秒数}`。
 * 平台据此得到「浏览时长」与进度（进度 = 当前页 ÷ 总页数）。
 *
 * 实测（docs/platforms/courseware.md 第 6 节）：
 *   - 进度确实按页码推进：报第 1 页 → 1/7，报第 7 页 → 7/7；
 *   - `learnedVideoTimeCount` 记的是**上报的秒数**，不是真实间隔——
 *     7 页各报 30 秒、真实只花 20 秒，平台记为 4 分钟。
 *
 * 因此这里逐页上报、每页声明一个合理的阅读秒数，让「浏览时长」与真人阅读同量级。
 * 请求间隔不由本模块管：`postLearnInfo` 走共享节流器，`-2` 由 RPC 层退避重试。
 */

import { ok } from '@study-pilot/core';
import { UNIT_TYPE } from '../types.ts';
import type { UnitBehavior } from './behavior.ts';
import { baseDto, completionDto, postLearnInfo } from './reports.ts';
import { getUnitResource } from './resource.ts';

/**
 * 每页声明的阅读秒数。
 *
 * 页面越多、总时长越大：12 页 ≈ 6 分钟，与真人翻完一份 PPT 的量级一致。
 * 只有一个来源——改这里就是改全部文档的浏览时长，不存在第二处。
 */
export const SECONDS_PER_PAGE = 30;

export const documentBehavior: UnitBehavior = {
  type: UNIT_TYPE.PDF,
  ready: () => true,
  async run(client, unit) {
    const resource = await getUnitResource(client, unit);
    const pages = resource.ok ? resource.value.textPages : null;

    /*
     * 拿不到页数时退回「打开即完成」——真人打开单页文档也只需一次上报。
     * 不猜页数：编一个数字会让进度与平台上的页数对不上。
     */
    if (pages === null || pages <= 1) {
      const result = await postLearnInfo(client, completionDto(unit));
      return result.ok ? ok('reported') : result;
    }

    for (let page = 1; page <= pages; page += 1) {
      const result = await postLearnInfo(client, {
        ...baseDto(unit),
        finished: page === pages,
        index: page - 1,
        pageNum: page,
        lastLearnTime: Date.now(),
        learnedVideoTimeCount: SECONDS_PER_PAGE,
      });
      if (!result.ok) return result;
    }
    return ok('reported');
  },
};

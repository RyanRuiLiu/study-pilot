/*
 * 文档单元。
 *
 * 真人的行为（`PdfUnit.__recordTextPage`，index.js:14799 附近）：
 * 阅读器每翻一页上报一次 `{unitId, finished: 当前页==总页数, contentType:3,
 * index, pageNum, lastLearnTime, learnedVideoTimeCount: 距上次上报的秒数}`。
 * 平台据此得到「浏览时长」与进度（进度 = 当前页 ÷ 总页数）。
 *
 * 实测：
 *   - 进度确实按页码推进：报第 1 页 → 1/7，报第 7 页 → 7/7；
 *   - `learnedVideoTimeCount` 记的是**上报的秒数**，不是真实间隔——
 *     7 页各报 30 秒、真实只花 20 秒，平台记为 4 分钟。
 *
 * 因此这里逐页上报、每页声明一个合理的阅读秒数，让「浏览时长」与真人阅读同量级。
 * 请求间隔不由本模块管：`postLearnInfo` 走共享节流器，`-2` 由 RPC 层退避重试。
 */

import { err, ok } from '@study-pilot/core';
import { apiError } from '@study-pilot/transport';
import { UNIT_TYPE } from '../types.ts';
import type { UnitBehavior } from './behavior.ts';
import { baseDto, postLearnInfo } from './reports.ts';
import { getUnitResource } from './resource.ts';

/**
 * 每页声明的阅读秒数。
 *
 * 页面越多、总时长越大：12 页 ≈ 6 分钟，与真人翻完一份 PPT 的量级一致。
 * 只有一个来源——改这里就是改全部文档的浏览时长，不存在第二处。
 */
const SECONDS_PER_PAGE = 30;

export const documentBehavior: UnitBehavior = {
  type: UNIT_TYPE.PDF,
  ready: () => true,
  async run(client, unit) {
    /*
     * 唯一路径：取页数 → 逐页上报（末页 finished）。
     *
     * 页数拿不到时返回失败，不退化成「一条完成上报」——那样进度会与平台上的
     * 页数对不上，而用户看到的是「已完成」。宁可失败让他手动处理。
     */
    const resource = await getUnitResource(client, unit);
    if (!resource.ok) return resource;
    const pages = resource.value.textPages;
    if (pages === null) {
      return err(apiError(-1, '平台没有给出这份文档的总页数，无法按页上报'));
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

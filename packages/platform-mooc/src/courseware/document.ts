/*
 * 文档单元。
 *
 * 真人的行为（`PdfUnit.__recordTextPage`，index.js:14799 附近）：
 * 阅读器每翻一页上报一次 `{unitId, finished: 当前页==总页数, contentType:3,
 * index, pageNum, lastLearnTime, learnedVideoTimeCount: 距上次上报的秒数}`。
 * 平台据此得到「浏览时长」与进度（进度 = 当前页 ÷ 总页数）。
 *
 * 实测：
 *   - 进度按 pageNum 记，**接受跳报**：只发「第 1 页 + 末页」两条，进度同样
 *     走满（2026-10-15 以「PPT 5.1」实测：发完两条即从待办消失）；
 *   - `learnedVideoTimeCount` 记的是**上报的秒数**，不是真实间隔——
 *     声明多少记多少，累加即总时长。
 *
 * 因此这里发首末两条、声明合理的阅读秒数（合计 ≈ 页数 × 30 秒）：
 * 时长与逐页上报的总量一致，请求数却从 页数+1 降到 3（含取页数）。
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
     * 唯一路径：取页数 → 首末两报。
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

    /*
     * 首末两报，而不是逐页：真人「打开文档（第 1 页）→ 拖到结尾（末页）」
     * 本来就会产生这两条。两条账都不依赖中间态——时长按声明秒数累加
     * （首报 30 秒、末报 (页数-1)×30 秒，总量与逐页一致），进度按 pageNum
     * 记（末报即 页数/页数）。页数越多省得越多。
     */
    const reports =
      pages === 1
        ? [{ pageNum: 1, finished: true, seconds: SECONDS_PER_PAGE }]
        : [
            { pageNum: 1, finished: false, seconds: SECONDS_PER_PAGE },
            { pageNum: pages, finished: true, seconds: (pages - 1) * SECONDS_PER_PAGE },
          ];

    for (const report of reports) {
      const result = await postLearnInfo(client, {
        ...baseDto(unit),
        finished: report.finished,
        index: report.pageNum - 1,
        pageNum: report.pageNum,
        lastLearnTime: Date.now(),
        learnedVideoTimeCount: report.seconds,
      });
      if (!result.ok) return result;
    }
    return ok('reported');
  },
};

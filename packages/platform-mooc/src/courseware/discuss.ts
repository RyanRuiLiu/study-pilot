/*
 * 讨论单元。
 *
 * 真人的行为：打开单元 → 客户端上报完成
 * （`ForumUnit.__reset`：`{unitId, finished:true, contentType:6}`）→ 参与讨论时
 * 在帖下发表回复（`AddReply.__addReplyHandle` → DWR `MocForumBean.addReply`）。
 *
 * 认证成绩页上这类单元的「完成详情」显示的是**回复数/被赞数**：只标完成
 * 会留下一条「回复数:0」的记录，与真人对不上。因此这里两件事都做：
 * 先发一条回复，再上报完成。
 *
 * 回复文案是占位的一句，接 AI 之后换成生成内容；位置只有这一处。
 */

import { err, ok, type Result } from '@study-pilot/core';
import { apiError, DwrEncoder, isDwrSuccess, type TransportError } from '@study-pilot/transport';
import type { MoocClient } from '../client.ts';
import { DWR_ENDPOINTS } from '../endpoints.ts';
import { UNIT_TYPE } from '../types.ts';
import type { UnitBehavior } from './behavior.ts';
import { completionDto, postLearnInfo } from './reports.ts';

/** 讨论回复文案。接入 AI 之前先用这一句。 */
export const REPLY_TEXT = '已学习本节内容。';

/**
 * 在帖子下发一条回复。
 *
 * 报文形态取自真实抓包与源码：
 *
 * ```
 * c0-e1=number:<postId>
 * c0-e2=string:<p>回复内容</p>
 * c0-e3=number:0
 * c0-param0=Object_Object:{postId:reference:c0-e1,content:reference:c0-e2,anonymous:reference:c0-e3}
 * c0-param1=Array:[]        ← 编辑器图片附件，为空数组（源码 `_$formatEditorUrlsGids`）
 * ```
 *
 * 第二个参数不能省：实测只发 `c0-param0` 时服务端回
 * `java.lang.IllegalArgumentException: Missing method or missing parameter converters`。
 *
 * 顶层对象用**内联字面量**、字段引用 `c0-eN`，与互评那条通道的写法一致
 * （见 review.ts 的 submitEvaluation）：把对象本身注册成引用会得到另一种形状，
 * 虽然 DWR 也认，但与真实报文不一致，没有理由偏离。
 */
async function postReply(
  client: MoocClient,
  postId: number,
  text: string,
): Promise<Result<void, TransportError>> {
  const encoder = new DwrEncoder();
  const postIdRef = encoder.number(postId);
  const contentRef = encoder.string(`<p>${text}</p>`);
  const anonymousRef = encoder.number(0);

  const response = await client.dwr.call(
    DWR_ENDPOINTS.addReply.bean,
    DWR_ENDPOINTS.addReply.method,
    [
      ...encoder.build(),
      `c0-param0=Object_Object:{postId:${postIdRef},content:${contentRef},anonymous:${anonymousRef}}`,
      'c0-param1=Array:[]',
    ],
  );
  if (!response.ok) return response;
  if (!isDwrSuccess(response.value.raw)) {
    return err(apiError(-1, '发表回复失败'));
  }
  return ok(undefined);
}

export const discussBehavior: UnitBehavior = {
  type: UNIT_TYPE.DISCUSS,
  // 回复要带帖子 id；没有它只能标完成，那与真人不一样
  ready: (unit) => unit.contentId > 0,
  async run(client, unit) {
    const replied = await postReply(client, unit.contentId, REPLY_TEXT);
    if (!replied.ok) return replied;

    const result = await postLearnInfo(client, completionDto(unit));
    return result.ok ? ok('reported') : result;
  },
};

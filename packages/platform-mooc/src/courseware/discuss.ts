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
 * 回复文案由调用方注入的生成器（AI）写出，**没有固定文案兜底**：
 * 生成失败时先由上层重试，仍失败就如实返回错误——这一步不完成，
 * 留给用户手动处理，不写一条假装学过的留言。
 *
 * **题目来源**：不是单元名。单元名往往只是「讨论3.4」这种编号，把它喂给模型，
 * 模型只能围着编号编（实测发生过）。真正的题目在讨论帖的正文里，见 `resource.ts`。
 * 拿不到正文、或正文只有编号时**直接失败**，不生成。
 */

import { err, ok, type Result } from '@study-pilot/core';
import type { RunControl } from '@study-pilot/application';
import { apiError, DwrEncoder, isDwrSuccess, type TransportError } from '@study-pilot/transport';
import type { MoocClient } from '../client.ts';
import { DWR_ENDPOINTS } from '../endpoints.ts';
import { UNIT_TYPE, type CourseUnit } from '../types.ts';
import type { CoursewareContext, DiscussPrep, UnitBehavior } from './behavior.ts';
import { completionDto, postLearnInfo } from './reports.ts';
import { getUnitResource, type UnitPost } from './resource.ts';

/** 富文本转纯文本：标签、常见实体与多余空白都去掉。 */
function plain(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * 只有编号、没有题目的形态：「3.4 讨论题」「讨论 3.4」「第5章 讨论」。
 *
 * 这类正文能通过长度检查，却给不出任何可回答的内容——放过去就是让模型编。
 */
const BARE_LABEL = /^[\s\d、.．:：;；,，章节课时讨论题思考练习第个（）()【】\-—]+$/;

/**
 * 讨论回复的字数上限。
 *
 * 平台**没有下发**这个值（2026-10-15 查证）：学习页回复编辑器不设任何长度规则
 * （`RichEditItem` 给编辑器的配置只有 value/focus/height，提交前只查非空）；
 * 帖子对象（`getLessonUnitLearnVo`）、论坛配置（`getMocForumDto`）、回复列表与
 * 提交协议里都没有上限字段；真机页面也无字数提示（抓包存于 .probe/discuss
 * 与 .probe/forum-panel）。因此 500 是我们的产品参数（借平台「课程评价」
 * 的同值上限）。AI 提示词与这里校验**共用这一个数**：超限由提示词事前规避，
 * 这里只做发布前的最后一道闸（见 apps/extension/src/ai/tasks/discuss-reply.ts）。
 */
export const DISCUSS_REPLY_MAX_CHARS = 500;

/**
 * 从讨论帖取出题目正文。取不到返回 `null`（调用方据此失败）。
 */
function discussionQuestion(post: UnitPost): string | null {
  const content = plain(post.content);
  if (content.length < 6) return null;
  if (BARE_LABEL.test(content)) return null;
  return content;
}

/** 生成的内容发出去之前过一遍：这段校验是模型与平台之间的最后一道闸。 */
function sanitize(generated: string): string | null {
  const text = generated
    .replace(/```[\s\S]*?```/g, ' ') // 代码块：讨论区不适合放代码
    .replace(/https?:\/\/\S+/g, ' ') // 链接：可能是模型编的
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length < 2 || text.length > DISCUSS_REPLY_MAX_CHARS) return null;
  return text;
}

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
  /*
   * DWR 的字符串值按百分号编码发出（真实抓包里是 `%3Cp%3E…%3C%2Fp%3E`）。
   * 互评评语走的是同一条约定（见 review.ts 的 submitEvaluation），这里保持一致。
   */
  const contentRef = encoder.string(encodeURIComponent(`<p>${text}</p>`));
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

/**
 * 取题并生成一条回复（**不写平台**）。
 *
 * 单独拿出来是为了让执行编排**并发预取**：一次 glm-4-flash 生成实测约 5 秒
 * （2026-10-15），比平台上任何一条请求都贵，而生成不占平台配额（走 AI 域名）、
 * 单元之间也没有顺序依赖。发帖（写）不在这一步里，永远逐条串行。
 */
export async function prepareDiscussReply(
  client: MoocClient,
  unit: CourseUnit,
  context: CoursewareContext,
  control: RunControl,
): Promise<DiscussPrep> {
  if (!context.generateText) {
    return { ok: false, reason: '未配置 AI，无法生成讨论回复' };
  }

  /*
   * 题目取自讨论帖正文。拿不到、或正文只有编号时直接失败——
   * 这两种情况下模型给不出贴题的留言，与其污染帖子，不如交人工。
   */
  const resource = await getUnitResource(client, unit);
  if (!resource.ok) {
    return { ok: false, reason: `读取讨论帖失败：${resource.error.message}` };
  }
  if (!resource.value.post) {
    return { ok: false, reason: '平台没有返回讨论帖内容，无法确定讨论题' };
  }
  const question = discussionQuestion(resource.value.post);
  if (!question) {
    return { ok: false, reason: '讨论帖正文为空或只有编号，无法生成贴题的留言' };
  }

  // 停止键：停下来就不再花一次生成
  if (control.stopped()) {
    return { ok: false, reason: '按停止键中断，未生成', stopped: true };
  }

  /*
   * 生成失败如实返回原因：上层会重试（在生成内部），仍失败就记为失败交人处理。
   * 这里**不写替代文案**——一条假装学过的留言比一条失败记录更糟。
   */
  const generated = await context.generateText({
    task: 'discuss-reply',
    input: `讨论题：${question}`,
  });
  if (!generated.ok) {
    return { ok: false, reason: `AI 生成讨论回复失败：${generated.reason}` };
  }
  return { ok: true, text: generated.text };
}

export const discussBehavior: UnitBehavior = {
  type: UNIT_TYPE.DISCUSS,
  // 回复由 AI 生成：没有这个能力就不该进计划（见 courseware/index.ts 的 isCompletable）
  needs: 'text',
  // 回复要带帖子 id
  ready: (unit) => unit.contentId > 0,
  async run(client, unit, context, control) {
    /*
     * 回复优先取预取结果（执行编排会先并发把生成做完，见 execute/index.ts）；
     * 没有预取就现场生成。两条路各只生成一次——预取失败带着原因，
     * 不再重试第二次。
     */
    const prep =
      context.preparedReplies?.get(unit.contentId) ??
      (await prepareDiscussReply(client, unit, context, control));

    if (!prep.ok) {
      if (prep.stopped === true) return ok('stopped');
      return err(apiError(-1, prep.reason));
    }

    const text = sanitize(prep.text);
    if (!text) {
      return err(apiError(-1, `AI 生成的讨论回复不合规（为空、超过 ${DISCUSS_REPLY_MAX_CHARS} 字或含链接）`));
    }

    // 停止键：AI 生成期间按的停止，在这一步生效——不再写帖子
    if (control.stopped()) return ok('stopped');

    const replied = await postReply(client, unit.contentId, text);
    if (!replied.ok) return replied;

    const result = await postLearnInfo(client, completionDto(unit));
    return result.ok ? ok('reported') : result;
  },
};

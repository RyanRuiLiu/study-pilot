/*
 * 单元的资源信息（DWR `CourseBean.getLessonUnitLearnVo`）。
 *
 * 页面打开一个单元时调的就是它。这里取**别处拿不到**的字段：
 *   - 文档的总页数 `textPages`：逐页上报要知道末页是哪一页；
 *   - 讨论帖的 `title` / `content`：**真正的讨论题在这里**。
 *     单元名往往只是「讨论3.4」这种编号，把它当题目喂给模型，模型只能围着编号编。
 *
 * 参数与返回形态取自真实抓包：`c0-param0..3 = contentId, contentType,
 * isPreview, unitId`；返回体里 `s0.textPages=7`、`s0.content="<p>…</p>"`。
 *
 * 注意 DWR 把非 ASCII 转义成 `\uXXXX`（实测：题目正文就是这样），
 * 因此字符串必须按 JSON 字符串解码，否则拿到的是 `\u5982\u4F55…` 这种原文。
 */

import { ok, type Result } from '@study-pilot/core';
import { type TransportError } from '@study-pilot/transport';
import type { MoocClient } from '../client.ts';
import { DWR_ENDPOINTS } from '../endpoints.ts';
import type { CourseUnit } from '../types.ts';

/** 讨论帖。讨论单元的题目就是它的正文。 */
export interface UnitPost {
  title: string;
  /** 富文本，未去标签 */
  content: string;
}

export interface UnitResource {
  /** 文档总页数。缺失或为 0 表示平台没给这个数 */
  textPages: number | null;
  /** 讨论帖。不是讨论单元时为 null */
  post: UnitPost | null;
}

/**
 * 取出 DWR 对象里的字符串字段。
 *
 * 匹配 `sN.field="…"`：DWR 的字符串是合法 JSON 字符串（含 `\uXXXX` 转义），
 * 因此用 `JSON.parse` 解码。字段不存在或解码失败都返回 `null`，
 * 由调用方决定是失败还是忽略——这里不造默认值。
 */
function dwrString(raw: string, field: string): string | null {
  const matched = raw.match(new RegExp(`s\\d+\\.${field}=("(?:[^"\\\\]|\\\\.)*")`));
  if (!matched) return null;
  try {
    const value = JSON.parse(matched[1]) as unknown;
    return typeof value === 'string' ? value : null;
  } catch {
    return null;
  }
}

export async function getUnitResource(
  client: MoocClient,
  unit: CourseUnit,
): Promise<Result<UnitResource, TransportError>> {
  const response = await client.dwr.call(
    DWR_ENDPOINTS.unitResource.bean,
    DWR_ENDPOINTS.unitResource.method,
    [
      `c0-param0=number:${unit.contentId}`,
      `c0-param1=number:${unit.contentType}`,
      'c0-param2=number:0',
      `c0-param3=number:${unit.unitId}`,
    ],
  );
  if (!response.ok) return response;

  const raw = response.value.raw;
  const pages = Number(raw.match(/textPages[=:](\d+)/)?.[1] ?? 0);
  const title = dwrString(raw, 'title');
  const content = dwrString(raw, 'content');

  return ok({
    textPages: pages > 0 ? pages : null,
    post: title !== null && content !== null ? { title, content } : null,
  });
}

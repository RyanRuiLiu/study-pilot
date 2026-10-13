/*
 * 单元的资源信息（DWR `CourseBean.getLessonUnitLearnVo`）。
 *
 * 页面打开一个单元时调的就是它。这里只取**别处拿不到**的字段：文档的总页数
 * `textPages`——逐页上报需要知道末页是哪一页，而 `.rpc` 侧没有这个字段。
 *
 * 参数与返回形态取自真实抓包：`c0-param0..3 = contentId, contentType,
 * isPreview, unitId`，返回体里 `textPages:7`。
 */

import { ok, type Result } from '@study-pilot/core';
import { type TransportError } from '@study-pilot/transport';
import type { MoocClient } from '../client.ts';
import { DWR_ENDPOINTS } from '../endpoints.ts';
import type { CourseUnit } from '../types.ts';

export interface UnitResource {
  /** 文档总页数。缺失或为 0 表示平台没给这个数 */
  textPages: number | null;
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

  /*
   * DWR 把对象字段写成 `sN.textPages=7;`，实测抓包里也存在 `textPages:7` 的形态。
   * 两种都认：解析失败只影响「逐页上报」这一条更真实的行为，
   * 调用方会退回「打开即完成」。
   */
  const matched = response.value.raw.match(/textPages[=:](\d+)/);
  const pages = matched ? Number(matched[1]) : 0;
  return ok({ textPages: pages > 0 ? pages : null });
}

/*
 * 课件单元的「学习上报」出口。
 *
 * 无论哪种类型、无论上报的是完成还是进度，最终都经 `postLearnInfo` 一处发出。
 * 集中在这里的原因：平台只认这一个接口（`courseRpcBean.saveMocContentLearn`），
 * 报文形状一旦写散，各类型的字段就会各自漂移，而写错的表现只是
 * 「平台不记账」——界面上看不出是哪一处写的。
 *
 * 字段取值一律来自课程结构或平台下发的配置，本模块不自造数据。
 * 报文与取值以平台自己的实现与实测为准（抓取产物不入库）。
 */

import { ok, type Result } from '@study-pilot/core';
import type { TransportError } from '@study-pilot/transport';
import type { MoocClient } from '../client.ts';
import { ENDPOINTS } from '../endpoints.ts';
import type { CourseUnit } from '../types.ts';

/**
 * 上报公共字段：单元与类型。
 *
 * 只放所有类型都有的两个字段。`finished`、页码、时长等由各类型自己加——
 * 它们的语义各不相同，硬塞进公共部分只会让调用处互相迁就。
 */
export function baseDto(unit: CourseUnit): Record<string, unknown> {
  return { unitId: unit.unitId, contentType: unit.contentType };
}

/**
 * 发一条学习上报。
 *
 * 并发限制（code -2）由 RPC 客户端统一退避重试，间隔由共享节流器控制，
 * 这里不写任何等待。
 */
export async function postLearnInfo(
  client: MoocClient,
  dto: Record<string, unknown>,
): Promise<Result<void, TransportError>> {
  const call = await client.rpc.call<boolean>(
    ENDPOINTS.completeUnit.bean,
    ENDPOINTS.completeUnit.method,
    { dto },
  );
  if (!call.ok) return call;
  return ok(undefined);
}

/** 只报完成的报文。文本与讨论用它；文档不走这条（拿不到页数时如实失败，见 document.ts）。 */
export function completionDto(unit: CourseUnit): Record<string, unknown> {
  return { ...baseDto(unit), finished: true };
}

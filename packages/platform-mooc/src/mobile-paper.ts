/**
 * 移动端取卷（官方 App 的接口）。
 *
 * 平台对进行中的单元测验在网页侧隐藏答案：`getOpenQuizPaperDto` 即使带
 * `withStdAnswerAndAnalyse: true`，`submitStatus=1` 时也返回 0 个 `answer`。
 * 同一个 `aId` 用移动端接口并带上 App 的 `mob-token`，则下发
 * `objectiveQList[].optionDtos[].answer`（2026-10-23 实测 5/5）。
 *
 * 这里只读：**必须传已有的 active aId**。`aId=0` 在移动端同样会新建答卷，
 * 等价于点「开始测验」；调用方只能把网页取卷已经拿到的 aid 传进来。
 *
 * 凭证由调用方从当前网页登录会话现取（`fetchMobToken`），不落盘。
 * 只放在查询串里，不写日志、不拼进错误文本。
 */

import { err, ok, type Result } from '@study-pilot/core';
import {
  apiError,
  DEFAULT_TIMEOUT_MS,
  httpError,
  networkError,
  parseError,
  startOutboundTimeout,
  timeoutError,
  type TransportError,
} from '@study-pilot/transport';
import type { MoocClient } from './client.ts';
import { MOBILE_ENDPOINTS } from './endpoints.ts';
import type { QuizPaper } from './types.ts';

/** App 侧请求头。实测不带也能成功；带上是为了与真实 App 的报文形状一致。 */
const MOBILE_HEADERS: Record<string, string> = {
  'edu-app-channel': 'ucmooc_offical',
  'edu-app-type': 'android',
  'edu-app-version': '5.6.1',
};

interface MobileEnvelope {
  status?: { code?: number; message?: string };
  results?: { mocPaperDto?: QuizPaper | null };
}

/**
 * 读一份进行中/已提交答卷的移动端版本。
 *
 * `aId` 必须是已有的答卷 id；调用方负责保证它来自网页取卷或 getOpenQuizInfo，
 * 不能拿 0 调这里。
 */
export async function getMobileQuizPaper(
  client: MoocClient,
  token: string,
  tid: number,
  aid: number,
): Promise<Result<QuizPaper, TransportError>> {
  const trimmed = token.trim();
  if (trimmed === '') return err(apiError(-1, '还没检测到官网登录，无法获取移动端凭证'));
  if (!Number.isFinite(aid) || aid <= 0) return err(apiError(-1, '没有可用于移动端取卷的答卷 id'));

  const query = new URLSearchParams({
    testId: String(tid),
    isExercise: 'false',
    aId: String(aid),
    withStdAnswerAndAnalyse: 'true',
    'mob-token': trimmed,
  });

  const timeout = startOutboundTimeout(DEFAULT_TIMEOUT_MS);
  try {
    const response = await client.send(`${client.origin}${MOBILE_ENDPOINTS.paper.path}?${query}`, {
      method: 'POST',
      headers: MOBILE_HEADERS,
      credentials: 'include',
      signal: timeout.signal,
    });
    const raw = await response.text();
    if (!response.ok) return err(httpError(response.status, raw));

    let envelope: MobileEnvelope;
    try {
      envelope = JSON.parse(raw) as MobileEnvelope;
    } catch {
      return err(parseError(raw));
    }

    const code = envelope.status?.code;
    if (code !== 0) {
      return err(apiError(typeof code === 'number' ? code : -1, envelope.status?.message ?? '移动端取卷失败', raw));
    }

    const dto = envelope.results?.mocPaperDto;
    if (dto === null || dto === undefined || typeof dto !== 'object') return err(parseError(raw));
    return ok(dto);
  } catch (cause) {
    return err(timeout.timedOut() ? timeoutError(DEFAULT_TIMEOUT_MS) : networkError(cause));
  } finally {
    timeout.dispose();
  }
}

/**
 * 用当前网页登录会话取移动端 mob-token。
 *
 * 用户先在官网用手机号/密码登录（官网自己走 URS 加密流程），
 * 扩展只读网页会话：GET /passport/reg/getMobToken.do（2026-10-23 实测
 * 返回 320 位十六进制，课程列表 code=0）。不碰密码，也不重放登录请求。
 */
export async function fetchMobToken(client: MoocClient): Promise<Result<string, TransportError>> {
  const timeout = startOutboundTimeout(DEFAULT_TIMEOUT_MS);
  try {
    const response = await client.send(`${client.origin}/passport/reg/getMobToken.do`, {
      method: 'GET',
      credentials: 'include',
      signal: timeout.signal,
    });
    const raw = await response.text();
    if (!response.ok) return err(httpError(response.status, raw));

    let envelope: { code?: number; message?: string; result?: string | null };
    try {
      envelope = JSON.parse(raw) as typeof envelope;
    } catch {
      return err(parseError(raw));
    }
    if (envelope.code !== 0) {
      return err(apiError(typeof envelope.code === 'number' ? envelope.code : -1, envelope.message ?? '当前网页会话未登录'));
    }
    const token = envelope.result;
    if (typeof token !== 'string' || token.length < 100) {
      return err(apiError(-1, '当前网页会话未登录，请先在官网完成登录'));
    }
    return ok(token);
  } catch (cause) {
    return err(timeout.timedOut() ? timeoutError(DEFAULT_TIMEOUT_MS) : networkError(cause));
  } finally {
    timeout.dispose();
  }
}

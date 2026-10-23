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
 * 这个能力是可选的：没有配置 `mob-token` 时，调用方走原来的网页路径。
 * 凭证只放在查询串里，不写日志、不拼进错误文本。
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

/**
 * App 的固定应用标识（不是账号凭证）。来源：手机 App 登录请求的 `appId`/`utid`，
 * 2026-10-23 从真实 HAR 提取；换 App 大版本时可能需要同步。
 */
export const MOBILE_APP_ID =
  'EABB51F70D27DC1E7D87C84F7FA2F049DC63B04C64F6472113D9262C52760DCD3FE15EBB30456EBC73E8A6319D8E6B76FAB3398001EE522BEEE4390C7C2497BAFF11C43E64E8C5FE00F86F315390B46356994B673796601C05E66A1A4F7CEDCA9ADCD34BB0946747B7C59107EA14C5A4';

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

interface UrsLoginEnvelope {
  code?: number;
  message?: string;
  results?: { mobToken?: string | null } | null;
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
  if (trimmed === '') return err(apiError(-1, '未配置移动端 mob-token'));
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
 * 用 43 位 `ursToken` 换新的 `mob-token`。
 *
 * 这是 App 登录链的最后一步（HAR 实测 2026-10-23）：
 *   POST /mob/ucmooc/0/0/passport/ursCellphoneLogin/v1
 *   ursToken=...&mob-token=&appId=...
 * `ursToken` 可重复换取；返回的 384 位 token 用于后续 `/mob/course/*`。
 * 只登录/续期，不取卷、不提交。
 */
export async function exchangeUrsTokenForMobToken(
  client: MoocClient,
  ursToken: string,
): Promise<Result<string, TransportError>> {
  const trimmed = ursToken.trim();
  if (trimmed === '') return err(apiError(-1, '未配置 ursToken'));

  const timeout = startOutboundTimeout(DEFAULT_TIMEOUT_MS);
  try {
    const response = await client.send(`${client.origin}${MOBILE_ENDPOINTS.ursLogin.path}`, {
      method: 'POST',
      headers: {
        ...MOBILE_HEADERS,
        'Accept-Language': 'zh-CN',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: new URLSearchParams({ ursToken: trimmed, 'mob-token': '', appId: MOBILE_APP_ID }).toString(),
      credentials: 'include',
      signal: timeout.signal,
    });
    const raw = await response.text();
    if (!response.ok) return err(httpError(response.status, raw));

    let envelope: UrsLoginEnvelope;
    try {
      envelope = JSON.parse(raw) as UrsLoginEnvelope;
    } catch {
      return err(parseError(raw));
    }

    const code = envelope.code;
    if (code !== 0) {
      return err(apiError(typeof code === 'number' ? code : -1, envelope.message ?? 'ursToken 换取失败', raw));
    }
    const token = envelope.results?.mobToken;
    if (typeof token !== 'string' || token.length < 100) return err(parseError(raw));
    return ok(token);
  } catch (cause) {
    return err(timeout.timedOut() ? timeoutError(DEFAULT_TIMEOUT_MS) : networkError(cause));
  } finally {
    timeout.dispose();
  }
}

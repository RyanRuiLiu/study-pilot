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
import { sessionExpired } from './auth.ts';
import { MOBILE_ENDPOINTS } from './endpoints.ts';
import type { QuizPaper } from './types.ts';
import { loginUrsByPassword, URS_CLIENT_ID, type UrsPasswordCredentials } from './urs/password-login.ts';

/** 移动端这几跳只需要出站与站点地址，不需要整只客户端。 */
export type MobilePaperClient = Pick<MoocClient, 'send' | 'origin'>;

/** App 侧请求头。实测不带也能成功；带上是为了与真实 App 的报文形状一致。 */
const MOBILE_HEADERS: Record<string, string> = {
  'edu-app-channel': 'ucmooc_offical',
  'edu-app-type': 'android',
  'edu-app-version': '5.6.1',
};

/**
 * App 的固定应用标识（不是账号凭证）。来源：手机 App 登录抓包的 `appId`
 * （2026-10-23 真实 HAR），2026-10-26 复测换发仍回 `code:0`。换 App 大版本时可能需要同步。
 */
export const MOBILE_APP_ID =
  'EABB51F70D27DC1E7D87C84F7FA2F049DC63B04C64F6472113D9262C52760DCD3FE15EBB30456EBC73E8A6319D8E6B76FAB3398001EE522BEEE4390C7C2497BAFF11C43E64E8C5FE00F86F315390B46356994B673796601C05E66A1A4F7CEDCA9ADCD34BB0946747B7C59107EA14C5A4';

interface UrsLoginEnvelope {
  code?: number;
  message?: string;
  results?: { mobToken?: string | null } | null;
}

/**
 * 用 URS 的 `ursToken` 注册一个移动端会话，换出 384 位 `mobToken`。
 *
 * App 登录链的最后一步（抓包实测 2026-10-23；2026-10-26 复测同一 `ursToken` 依然可用，
 * 且每次换发得到**不同**的 mobToken、旧的同款仍能读卷）：
 *
 *   POST /mob/ucmooc/0/0/passport/ursCellphoneLogin/v1
 *   ursToken=…&mob-token=&appId=…
 *
 * `ursToken` 是账号级的登录凭证（`yd_` + 40 hex），可重复使用；返回的 384 位
 * `mobToken` 才是 `/mob/course/*` 认的会话凭证——`getMobToken.do` 给的 320 位那族
 * 会被回 `-10012`（见 auth.ts）。
 *
 * 副作用：这一步等价于「在移动端登录一次」，会顶掉账号上原有的移动端会话
 * （用户手机 App 会收到重新登录提示）。所以只在真要取答案时调，不做轮询。
 *
 * `appId` 必须与 `ursToken` 同一产品：传统 URS 账密登录的 token 要用
 * `URS_CLIENT_ID`，App 抓包的 UNS token 才用 `MOBILE_APP_ID`（2026-10-27 实测；
 * 混用回 `code:1000 urs token无效`）。
 */
export async function exchangeUrsTokenForMobToken(
  client: MobilePaperClient,
  ursToken: string,
  appId: string = MOBILE_APP_ID,
): Promise<Result<string, TransportError>> {
  const trimmed = ursToken.trim();
  if (trimmed === '') return err(apiError(-1, '没有移动端登录凭证（ursToken），无法注册移动端会话'));

  const timeout = startOutboundTimeout(DEFAULT_TIMEOUT_MS);
  try {
    const response = await client.send(`${client.origin}${MOBILE_ENDPOINTS.ursLogin.path}`, {
      method: 'POST',
      headers: {
        ...MOBILE_HEADERS,
        'Accept-Language': 'zh-CN',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: new URLSearchParams({
        ursToken: trimmed,
        'mob-token': '',
        appId,
      }).toString(),
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
      return err(apiError(typeof code === 'number' ? code : -1, envelope.message ?? '移动端会话注册失败', raw));
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
  client: MobilePaperClient,
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
 * 账密自动登录：URS 手机号+密码 → `ursToken` → 384 位移动端 `mobToken`。
 *
 * 这是扩展设置页「移动端登录」与后台取答案共用的一条链。换发会顶掉手机上
 * 原有的 App 会话——这正是官方移动登录的语义，不额外轮询、不预先登录。
 */
export async function loginMobileSession(
  client: MobilePaperClient,
  credentials: UrsPasswordCredentials,
  options: { randomHex?: (length: number) => string } = {},
): Promise<Result<string, TransportError>> {
  const session = await loginUrsByPassword(client.send, credentials, options);
  if (!session.ok) return session;
  return exchangeUrsTokenForMobToken(client, session.value.token, URS_CLIENT_ID);
}

/**
 * 用当前网页登录会话取移动端 mob-token。
 *
 * 用户先在官网用手机号/密码登录（官网自己走 URS 加密流程），
 * 扩展只读网页会话：GET /passport/reg/getMobToken.do（2026-10-23 实测
 * 返回 320 位十六进制，课程列表 code=0）。不碰密码，也不重放登录请求。
 */
export async function fetchMobToken(client: MobilePaperClient): Promise<Result<string, TransportError>> {
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
      // `code:0` 而 result 为空＝平台的不认形态（见 auth.ts），归 auth 而不是 api
      return err(sessionExpired(raw));
    }
    return ok(token);
  } catch (cause) {
    return err(timeout.timedOut() ? timeoutError(DEFAULT_TIMEOUT_MS) : networkError(cause));
  } finally {
    timeout.dispose();
  }
}

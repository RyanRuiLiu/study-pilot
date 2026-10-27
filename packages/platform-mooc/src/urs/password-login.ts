/*
 * 官方 UNS 手机号+密码登录（icourse App 的账密登录链第一跳）。
 *
 * 链路（2026-10-27 在 5.6.1 上逐跳验证）：
 *   1. POST /uns/sdk/app/v1/ini，用 p1/p2/p3 信封取安装级 appId；
 *   2. POST /uns/sdk/login/mob/pwd/v1/login，p1 里带 username/isMd5/pwd，
 *      返回 `yd_` + 40 hex 的 UNS token；
 *   3. 用 `URS_CLIENT_ID` 把 token 换成 384 位 mob-token（见 mobile-paper.ts）。
 *
 * 与旧的 legacy URS（`/interfaces/yd/pwdlogin.do`）的关键差别不在协议，
 * 而在服务端的会话槽：legacy 账密登录会顶掉手机 App；UNS 的平板画像也仍落
 * 手机槽（2026-10-28 实测会顶掉另一台手机）。`platform: 'web'` 的网页/PC
 * 画像另占一槽，手机与平板都不受影响；`ydUniqueId` 可以传空串，所以普通
 * 用户不需要抓手机 ZXID。
 *
 * 凭证不落盘、不写日志、不拼进错误文本；p1 在发出前用 SM4 加密。
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
  type FetchLike,
  type TransportError,
} from '@study-pilot/transport';
import {
  buildUnsCommonPayload,
  buildUnsHeaders,
  decryptUnsResponse,
  UNS_INIT_PATH,
  UNS_ORIGIN,
  UNS_PASSWORD_LOGIN_PATH,
  type UnsDeviceInstall,
  type UnsKeyPair,
} from './uns.ts';

export { URS_CLIENT_ID } from './uns.ts';

const UNS_OK = 200;

export interface UnsPasswordCredentials {
  account: string;
  password: string;
  /** 本机扩展安装级 Android ID（16 位十六进制）；缺省时随机生成 */
  aId?: string;
  /** 本机扩展安装级安装 id（40 位十六进制）；缺省时随机生成 */
  uniqueId?: string;
}

export interface UnsSession {
  /** `yd_` + 40 位十六进制，换发移动端 mobToken 用 */
  token: string;
  /** 163 主账号（yd.xxx@163.com） */
  ssn: string;
  /** 手机账号（手机号@mobile.163.com） */
  mobileAccount: string;
}

export interface UnsPasswordLoginOptions {
  /** 测试注入的十六进制随机源（ID/reqId） */
  randomHex?: (length: number) => string;
  /** 测试注入的字节随机源（smkey/smIv） */
  randomBytes?: (length: number) => Uint8Array;
  /** 测试注入的 RSA 密钥；生产环境不传 */
  keys?: UnsKeyPair;
}

const defaultRandomBytes = (length: number): Uint8Array => {
  const bytes = new Uint8Array(length);
  globalThis.crypto.getRandomValues(bytes);
  return bytes;
};

const defaultRandomHex = (length: number): string => {
  const bytes = defaultRandomBytes(length);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
};

interface UnsEnvelope {
  result?: unknown;
  msg?: unknown;
  data?: unknown;
  enc?: unknown;
  key?: unknown;
  iv?: unknown;
}

/** 拼登录 p1：字段名与官方 App 一致（`pwd` 明文、`isMd5:0`）。 */
export function buildUnsLoginPayload(
  credentials: Pick<UnsPasswordCredentials, 'account' | 'password'>,
  install: UnsDeviceInstall,
  now: number,
  reqId: string,
): Record<string, unknown> {
  return {
    username: credentials.account,
    isMd5: 0,
    pwd: credentials.password,
    ...buildUnsCommonPayload(install, now, reqId),
  };
}

function resultCode(value: unknown): number | null {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && /^\d+$/.test(value)) return Number.parseInt(value, 10);
  return null;
}

async function postEnvelope(
  send: FetchLike,
  path: string,
  payload: unknown,
  body: unknown,
  randomBytes: (length: number) => Uint8Array,
  keys: UnsKeyPair | undefined,
  signal: AbortSignal,
): Promise<Result<UnsEnvelope, TransportError>> {
  const headers = buildUnsHeaders(payload, randomBytes, keys);
  const response = await send(`${UNS_ORIGIN}${path}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      Connection: 'close',
    },
    body: JSON.stringify(body),
    signal,
  });
  const raw = await response.text();
  if (!response.ok) return err(httpError(response.status, raw));
  try {
    return ok(JSON.parse(raw) as UnsEnvelope);
  } catch {
    return err(parseError(raw));
  }
}

function envelopeError(envelope: UnsEnvelope, stage: string, fallback: string, raw: string): TransportError {
  const code = resultCode(envelope.result);
  const message = typeof envelope.msg === 'string' && envelope.msg !== '' ? envelope.msg : fallback;
  return apiError(code ?? -1, `${stage}：${message}`, raw);
}

/**
 * 官方 UNS 账密登录。
 *
 * `send` 走调用方的出站层（扩展里是 client.send，带 Origin/Cookie 规则）；
 * 返回的 token 只能通过 `URS_CLIENT_ID` 换发移动端会话。
 */
export async function loginUnsByPassword(
  send: FetchLike,
  credentials: UnsPasswordCredentials,
  options: UnsPasswordLoginOptions = {},
): Promise<Result<UnsSession, TransportError>> {
  if (!/^1\d{10}$/.test(credentials.account)) {
    return err(apiError(-1, '手机号格式不正确，需要 11 位大陆手机号'));
  }
  if (credentials.password === '') return err(apiError(-1, '密码不能为空'));

  const randomHex = options.randomHex ?? defaultRandomHex;
  const randomBytes = options.randomBytes ?? defaultRandomBytes;
  const install: UnsDeviceInstall = {
    aId: credentials.aId ?? randomHex(8),
    uniqueId: credentials.uniqueId ?? randomHex(20),
  };

  const timeout = startOutboundTimeout(DEFAULT_TIMEOUT_MS);
  try {
    const initPayload = buildUnsCommonPayload(install, Date.now(), randomHex(16));
    const init = await postEnvelope(
      send,
      UNS_INIT_PATH,
      initPayload,
      { sdv: {}, utid: '', rtid: randomHex(16) },
      randomBytes,
      options.keys,
      timeout.signal,
    );
    if (!init.ok) return init;

    const initCode = resultCode(init.value.result);
    if (initCode !== UNS_OK) {
      return err(envelopeError(init.value, 'UNS 初始化', 'UNS 初始化失败', JSON.stringify(init.value)));
    }
    let initData: { appId?: unknown } | null;
    try {
      initData = decryptUnsResponse<{ appId?: unknown }>(init.value, options.keys);
    } catch {
      return err(parseError(JSON.stringify(init.value)));
    }
    const appId = typeof initData?.appId === 'string' ? initData.appId : '';
    if (appId === '') return err(parseError(JSON.stringify(init.value)));

    const loginPayload = buildUnsLoginPayload(credentials, install, Date.now(), randomHex(16));
    const login = await postEnvelope(
      send,
      UNS_PASSWORD_LOGIN_PATH,
      loginPayload,
      { utid: appId, rtid: randomHex(16) },
      randomBytes,
      options.keys,
      timeout.signal,
    );
    if (!login.ok) return login;

    const loginCode = resultCode(login.value.result);
    if (loginCode !== UNS_OK) {
      return err(envelopeError(login.value, 'UNS 登录', 'UNS 登录失败', JSON.stringify(login.value)));
    }
    let data: { token?: unknown; ssn?: unknown; aliasuser?: unknown } | null;
    try {
      data = decryptUnsResponse<{ token?: unknown; ssn?: unknown; aliasuser?: unknown }>(
        login.value,
        options.keys,
      );
    } catch {
      return err(parseError(JSON.stringify(login.value)));
    }
    const token = typeof data?.token === 'string' ? data.token : '';
    const ssn = typeof data?.ssn === 'string' ? data.ssn : '';
    const mobileAccount = typeof data?.aliasuser === 'string' ? data.aliasuser : '';
    if (!/^yd_[0-9a-f]{40}$/.test(token) || ssn === '' || mobileAccount === '') {
      return err(parseError(JSON.stringify(login.value)));
    }
    return ok({ token, ssn, mobileAccount });
  } catch (cause) {
    return err(timeout.timedOut() ? timeoutError(DEFAULT_TIMEOUT_MS) : networkError(cause));
  } finally {
    timeout.dispose();
  }
}

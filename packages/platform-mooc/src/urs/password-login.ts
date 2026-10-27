/**
 * 正式 URS 手机号+密码登录（icourse 的 App 登录链第一跳）。
 *
 * 不是自制协议：请求形状、字段顺序、AES/ECB/PKCS5Padding 与 MD5 口令
 * 全部来自官方 4.12.0 的 `com.netease.loginapi`（`library/e.work`、
 * `library/vo/r.onPreSerialize`、`library/vo/v`、`URSdkImpl` 的 pwdlogin 分支），
 * 产品口令（客户端 id / AES key）来自 4.26.1 在官方 initSdk 后写入的
 * `NELoginConfig`（2026-10-27 提取；同日起从本机 PC 复测通过）。
 *
 * 它返回的 `token`（`yd_` + 40 hex）在换发移动端会话时 **`appId` 必须用
 * 本文件的 `URS_CLIENT_ID`**；用 App 抓包里的 `appId` 会被回“urs token无效”
 * （2026-10-27 实测）。换发成功即得到 384 位 `mobToken`，可直接读
 * `paperDetail` 的官方答案。
 *
 * 凭证不落盘、不写日志、不拼进错误文本。
 */

import { err, md5hex, ok, type Result } from '@study-pilot/core';
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
import { aes128EcbDecryptHex, aes128EcbEncryptHex, aesKeyFromHex } from './aes.ts';

export const URS_LOGIN_ORIGIN = 'https://sdk.reg.163.com';
export const URS_PASSWORD_LOGIN_PATH = '/interfaces/yd/pwdlogin.do';
/** 官方产品 `edumooc_client` 的客户端 id（URS initSdk 下发）。 */
export const URS_CLIENT_ID =
  '5A628216489A6CF86F2890898ED620804859F7613325A31AA9FA58E1B5206CBF1357988F9BBF7444F8C4089965276261A907209E92AFDB94D9686F55C600B9A6';
/** 同一产品的 AES-128 密钥（32 位十六进制文本）。 */
const URS_CLIENT_KEY = '4cf8b82d04d0ca838fe0db6bf03488db';
const URS_PRODUCT = 'edumooc_client';
const URS_PASSWORD_OK = 201;

export interface UrsPasswordCredentials {
  account: string;
  password: string;
}

export interface UrsSession {
  /** `yd_` + 40 位十六进制，换发移动端 mobToken 用 */
  token: string;
  /** 163 主账号（yd.xxx@163.com） */
  ssn: string;
  /** 手机账号（手机号@mobile.163.com） */
  mobileAccount: string;
}

export interface UrsPasswordLoginOptions {
  /** 测试注入的随机源 */
  randomHex?: (length: number) => string;
}

const defaultRandomHex = (length: number): string => {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
};

/** 纯函数：按官方字段顺序拼出 AES 前的参数串。 */
export function buildUrsPasswordParams(
  credentials: UrsPasswordCredentials,
  uniqueId: string,
  requestId: string,
): string {
  const params: Array<[string, string | number]> = [
    ['rtid', requestId],
    ['androidID', uniqueId],
    ['carrier', '中国移动'],
    ['network', 'wifi'],
    ['pdtVersion', '4.12.0'],
    ['mac', '02:00:00:00:00:00'],
    ['resolution', '1080x2340'],
    ['uniqueID', uniqueId],
    ['uniqueID_cf', uniqueId],
    ['imei', ''],
    ['product', URS_PRODUCT],
    ['deviceType', 'PCAM10'],
    ['systemName', 'Android'],
    ['systemVersion', '11'],
    ['isEmulator', 0],
    ['loginException', 0],
    ['needLeakInfo', 0],
    ['ignorelock', 1],
    ['mobile', credentials.account],
    ['password', md5hex(credentials.password)],
    ['isMd5', 1],
  ];
  return params.map(([key, value]) => `${key}=${value}`).join('&');
}

export async function loginUrsByPassword(
  send: FetchLike,
  credentials: UrsPasswordCredentials,
  options: UrsPasswordLoginOptions = {},
): Promise<Result<UrsSession, TransportError>> {
  if (!/^1\d{10}$/.test(credentials.account)) {
    return err(apiError(-1, '手机号格式不正确，需要 11 位大陆手机号'));
  }
  if (credentials.password === '') return err(apiError(-1, '密码不能为空'));

  const randomHex = options.randomHex ?? defaultRandomHex;
  const uniqueId = randomHex(16);
  const requestId = randomHex(16);
  const plain = buildUrsPasswordParams(credentials, uniqueId, requestId);
  const key = aesKeyFromHex(URS_CLIENT_KEY);
  const body = `params=${aes128EcbEncryptHex(new TextEncoder().encode(plain), key)}&id=${URS_CLIENT_ID}`;

  const timeout = startOutboundTimeout(DEFAULT_TIMEOUT_MS);
  try {
    const response = await send(`${URS_LOGIN_ORIGIN}${URS_PASSWORD_LOGIN_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      body,
      signal: timeout.signal,
    });
    const raw = await response.text();
    if (!response.ok) return err(httpError(response.status, raw));

    let envelope: { result?: unknown; msg?: unknown };
    try {
      envelope = JSON.parse(raw) as { result?: unknown; msg?: unknown };
    } catch {
      return err(parseError(raw));
    }
    const result = typeof envelope.result === 'string' ? Number.parseInt(envelope.result, 10) : envelope.result;
    const message = typeof envelope.msg === 'string' ? envelope.msg : '';
    if (result !== URS_PASSWORD_OK) {
      return err(apiError(typeof result === 'number' ? result : -1, message || 'URS 登录失败', raw));
    }
    if (message === '') return err(parseError(raw));

    let decrypted: string;
    try {
      decrypted = new TextDecoder().decode(aes128EcbDecryptHex(message, key));
    } catch {
      return err(parseError(raw));
    }
    const fields = new URLSearchParams(decrypted);
    const token = fields.get('token') ?? '';
    const ssn = fields.get('ssn') ?? '';
    const mobileAccount = fields.get('ydAccount') ?? '';
    if (!/^yd_[0-9a-f]{40}$/.test(token) || ssn === '' || mobileAccount === '') {
      return err(parseError(raw));
    }
    return ok({ token, ssn, mobileAccount });
  } catch (cause) {
    return err(timeout.timedOut() ? timeoutError(DEFAULT_TIMEOUT_MS) : networkError(cause));
  } finally {
    timeout.dispose();
  }
}

/**
 * 手机扫码登录流（平台 Web 前端的正源协议，端点见 endpoints.ts 的 QR_LOGIN_ENDPOINTS）。
 *
 * 为什么要碰它：`mob-token` 绑的是账号的手机侧会话，被「其他设备登录」顶掉后
 * `paperDetail/v1` 回 -10012，而 `getMobToken.do` 是粘性的（同会话重复调指纹一致，
 * 2026-10-26 实测）——网页重登/续期都换不动它。扫码确认是账号级登录动作，是
 * 「手机重登」的程序化等价物：能不能换发新移动端凭证，由本模块的函数去实测。
 *
 * 只描述协议，不含任何处置策略；扫码要人用手机 App 完成，扩展里它只能是
 * 显式动作（与写操作同级对待），不自动触发。
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
import { QR_LOGIN_ENDPOINTS } from './endpoints.ts';

/** poll.do 的 codeStatus（core.js 的 d 常量表，取值原样来自平台源码）。 */
export const QR_SCAN_STATUS = {
  NOT_SCAN: 0,
  SCAN_NOT_CONFIRM: 1,
  CONFIRMED: 2,
  EXPIRED: 3,
  SCAN_BY_OTHER_APP: 4,
} as const;

export type QrScanStatus = (typeof QR_SCAN_STATUS)[keyof typeof QR_SCAN_STATUS];

interface CodeEnvelope {
  code?: number;
  result?: { codeUrl?: string | null; pollKey?: string | null } | null;
  message?: string;
}

interface PollEnvelope {
  code?: number;
  result?: { codeStatus?: number; token?: string | null } | null;
  message?: string;
}

export interface QrCode {
  /** 二维码图片地址（平台生成的 PNG），给用户扫的 */
  codeUrl: string;
  pollKey: string;
}

/** 取一张登录二维码。width/height 照平台前端（182/182）。 */
export async function fetchQrLoginCode(
  client: MoocClient,
  width = 182,
  height = 182,
): Promise<Result<QrCode, TransportError>> {
  const query = new URLSearchParams({ width: String(width), height: String(height) });
  const timeout = startOutboundTimeout(DEFAULT_TIMEOUT_MS);
  try {
    const response = await client.send(`${client.origin}${QR_LOGIN_ENDPOINTS.code.path}?${query}`, {
      method: 'GET',
      credentials: 'include',
      signal: timeout.signal,
    });
    const raw = await response.text();
    if (!response.ok) return err(httpError(response.status, raw));
    let envelope: CodeEnvelope;
    try {
      envelope = JSON.parse(raw) as CodeEnvelope;
    } catch {
      return err(parseError(raw));
    }
    const result = envelope.result;
    if (envelope.code !== 0 || typeof result?.codeUrl !== 'string' || typeof result.pollKey !== 'string') {
      return err(apiError(envelope.code ?? -1, envelope.message ?? '二维码获取失败', raw));
    }
    return ok({ codeUrl: result.codeUrl, pollKey: result.pollKey });
  } catch (cause) {
    return err(timeout.timedOut() ? timeoutError(DEFAULT_TIMEOUT_MS) : networkError(cause));
  } finally {
    timeout.dispose();
  }
}

/** 问一次扫码状态。CONFIRMED 时回 token。 */
export async function pollQrLoginStatus(
  client: MoocClient,
  pollKey: string,
): Promise<Result<{ status: QrScanStatus; token: string | null }, TransportError>> {
  const query = new URLSearchParams({ pollKey });
  const timeout = startOutboundTimeout(DEFAULT_TIMEOUT_MS);
  try {
    const response = await client.send(`${client.origin}${QR_LOGIN_ENDPOINTS.poll.path}?${query}`, {
      method: 'GET',
      credentials: 'include',
      signal: timeout.signal,
    });
    const raw = await response.text();
    if (!response.ok) return err(httpError(response.status, raw));
    let envelope: PollEnvelope;
    try {
      envelope = JSON.parse(raw) as PollEnvelope;
    } catch {
      return err(parseError(raw));
    }
    if (envelope.code !== 0) {
      return err(apiError(envelope.code ?? -1, envelope.message ?? '扫码状态读取失败', raw));
    }
    const status = (envelope.result?.codeStatus ?? QR_SCAN_STATUS.NOT_SCAN) as QrScanStatus;
    return ok({ status, token: envelope.result?.token ?? null });
  } catch (cause) {
    return err(timeout.timedOut() ? timeoutError(DEFAULT_TIMEOUT_MS) : networkError(cause));
  } finally {
    timeout.dispose();
  }
}

/**
 * 用确认后的 token 换发 cookie（平台前端在这一步整页跳转，本函数只取响应、
 * 不落地页面：cookie 由 fetch 的 credentials 通道照常写入）。
 */
export async function confirmQrLogin(
  client: MoocClient,
  token: string,
  returnUrl: string,
): Promise<Result<{ finalUrl: string }, TransportError>> {
  const query = new URLSearchParams({ token, returnUrl });
  const timeout = startOutboundTimeout(DEFAULT_TIMEOUT_MS);
  try {
    const response = await client.send(
      `${client.origin}${QR_LOGIN_ENDPOINTS.changeCookie.path}?${query}`,
      { method: 'GET', credentials: 'include', redirect: 'follow', signal: timeout.signal },
    );
    return ok({ finalUrl: response.url });
  } catch (cause) {
    return err(timeout.timedOut() ? timeoutError(DEFAULT_TIMEOUT_MS) : networkError(cause));
  } finally {
    timeout.dispose();
  }
}

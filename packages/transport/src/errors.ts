/**
 * 传输层错误模型。
 *
 * 把失败分成可判别的几类，调用方才能决定怎么反应：
 * 「未登录」要提示用户去登录，「被限流」要退避重试，「响应格式变了」要报警，
 * 而「网络断了」什么都不用做、等下一次即可。
 */

export type TransportErrorKind =
  /** fetch 本身抛异常：断网、DNS、跨域被拒 */
  | 'network'
  /** HTTP 状态码不是 2xx */
  | 'http'
  /** 响应不是合法 JSON（通常是登录失效被重定向到 HTML 页面） */
  | 'parse'
  /** 业务错误码：响应是 JSON 但 `code !== 0` */
  | 'api';

export interface TransportError {
  kind: TransportErrorKind;
  /** 面向开发者的说明，不含敏感信息 */
  message: string;
  /** kind === 'http' 时的状态码 */
  status?: number;
  /** kind === 'api' 时的业务错误码 */
  code?: number;
  /** 原始响应片段，便于排查（已截断） */
  raw?: string;
}

const RAW_LIMIT = 300;

export function networkError(cause: unknown): TransportError {
  return {
    kind: 'network',
    message: cause instanceof Error ? cause.message : String(cause),
  };
}

export function httpError(status: number, raw?: string): TransportError {
  return {
    kind: 'http',
    message: `HTTP ${status}`,
    status,
    raw: raw?.slice(0, RAW_LIMIT),
  };
}

export function parseError(raw: string): TransportError {
  return {
    kind: 'parse',
    message: '响应不是合法 JSON（可能是登录态失效被重定向，或平台改了响应格式）',
    raw: raw.slice(0, RAW_LIMIT),
  };
}

export function apiError(code: number, message?: string, raw?: string): TransportError {
  return {
    kind: 'api',
    message: message || `业务错误码 ${code}`,
    code,
    raw: raw?.slice(0, RAW_LIMIT),
  };
}

/** 服务端并发限制错误码。实测遇到它时应退避后重试。 */
export const CONCURRENCY_LIMIT_CODE = -2;

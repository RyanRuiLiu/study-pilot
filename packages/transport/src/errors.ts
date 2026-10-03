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
  | 'api'
  /**
   * 服务端视角的未登录：响应是 `code: 0` 的「成功」，但数据是空壳
   * （外层 code 正常、内层业务数据为 null 的形态）。
   *
   * 平台对失效会话不报错也不重定向，回的就是这种壳（实测见
   * docs/platforms/mooc.md 第 3 节）。把它从「api」里分出来，是因为
   * 它的处置完全不同：续期一次会话再重读通常就能好，而不是让用户
   * 对着一句「读取失败」猜原因。哪些字段为 null 算「空壳」由领域层
   * 判定——本层不认识任何业务概念。
   */
  | 'auth';

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

/**
 * 服务端视角的未登录。
 *
 * 由领域层在识别出未登录形态的响应时构造（transport 自己看不出
 * 「result 为 null」意味着什么），错误种类归在这里，处置逻辑才能
 * 按种类路由：auth 失败先续期会话重读一次，其余失败如实上报。
 */
export function unauthenticatedError(raw?: string): TransportError {
  return {
    kind: 'auth',
    message: '平台会话已失效（返回了未登录形态的数据）',
    raw: raw?.slice(0, RAW_LIMIT),
  };
}

/** 服务端并发限制错误码。实测遇到它时应退避后重试。 */
export const CONCURRENCY_LIMIT_CODE = -2;

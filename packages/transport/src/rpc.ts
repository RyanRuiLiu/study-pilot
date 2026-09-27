/**
 * `.rpc` 接口调用。
 *
 * 请求形态（与页面一致）：
 *   POST {origin}/web/j/{Bean}.{method}.rpc?csrfKey={NTESSTUDYSI}
 *   头：Timestamp / Nonce / System / Auth-Signature / Content-Type
 *
 * URL 与 csrfKey 的来源是页面里的这段（`index.web.js` 偏移 195839）：
 *
 * ```js
 * if (/\.rpc$/.test(t)) {
 *   var r = document.cookie.split(';').reduce(...);   // 解析 cookie
 *   t += "?csrfKey=" + r["NTESSTUDYSI"]               // 注意：未做 URL 编码
 * }
 * n.url = t;
 * if (n.isNeedAuth) n.headers = Object.assign({}, n.headers, this.geneAuthHeaders(n))
 * ```
 *
 * 因此这里**不**对 token 做 `encodeURIComponent` —— 页面就是这么拼的，
 * 而且它是 32 位十六进制，编码与否结果相同。保持原样减少不必要的差异。
 */

import { err, ok, type Md5HexFn, type Result } from '@study-pilot/core';
import {
  CONCURRENCY_LIMIT_CODE,
  apiError,
  httpError,
  networkError,
  parseError,
  type TransportError,
} from './errors.ts';
import { buildAuthHeaders } from './sign.ts';
import { createThrottle, type Throttle } from './throttle.ts';

/**
 * 平台响应信封。
 * 字段取自实测的响应结构（抓取产物不入库，结论记在 docs/platforms/mooc.md）。
 */
export interface RpcEnvelope<T = unknown> {
  code: number;
  message?: string | null;
  result?: T;
  traceId?: string | null;
  /** 平台埋点字段，无业务含义 */
  sampled?: unknown;
}

export type FetchLike = (url: string, init?: RequestInit) => Promise<Response>;
export type TokenProvider = () => string | Promise<string>;

export interface RpcClientOptions {
  /** 站点 origin，例如 `https://www.icourse163.org` */
  origin: string;
  /** 注入 fetch，便于测试与在不同宿主环境复用 */
  fetch: FetchLike;
  /** 取 NTESSTUDYSI。未登录时平台也会下发匿名值，所以拿不到空串才是异常 */
  getToken: TokenProvider;
  /** MD5 实现。浏览器传 `@study-pilot/core` 的 `md5hex`，Node 可传 crypto 版 */
  md5: Md5HexFn;
  /**
   * 节流器。**同一站点的所有出站请求必须共享同一个实例**，
   * 传入以便与 DWR 客户端复用（见 `createThrottle` 的说明）。
   */
  throttle?: Throttle;
  /** 遇到并发限制（code -2）时的最大重试次数，默认 3 */
  maxRetries?: number;
  /** 重试间隔基数，实际间隔按第几次重试线性放大，默认 1200ms */
  retryDelayMs?: number;
  /** 注入睡眠，便于测试 */
  sleep?: (ms: number) => Promise<void>;
}

export interface RpcClient {
  /** 调用接口并返回完整信封，`code` 由调用方判断。 */
  callEnvelope<T = unknown>(
    bean: string,
    method: string,
    body?: Record<string, unknown>,
  ): Promise<Result<RpcEnvelope<T>, TransportError>>;
  /**
   * 调用接口，仅在 `code === 0` 时返回 `result`。
   * 需要区分不同的非零 `code` 时用 {@link RpcClient.callEnvelope}。
   */
  call<T = unknown>(
    bean: string,
    method: string,
    body?: Record<string, unknown>,
  ): Promise<Result<T, TransportError>>;
}

const defaultSleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function createRpcClient(options: RpcClientOptions): RpcClient {
  const { origin, fetch, getToken, md5 } = options;
  const throttle = options.throttle ?? createThrottle({});
  const maxRetries = options.maxRetries ?? 3;
  const retryDelayMs = options.retryDelayMs ?? 1200;
  const sleep = options.sleep ?? defaultSleep;

  /** 发一次请求，不含重试。 */
  async function attempt<T>(
    bean: string,
    method: string,
    body: Record<string, unknown>,
  ): Promise<Result<RpcEnvelope<T>, TransportError>> {
    const token = await getToken();
    const url = `${origin}/web/j/${bean}.${method}.rpc?csrfKey=${token}`;
    const headers = buildAuthHeaders(body, md5);

    let response: Response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: { ...headers },
        body: JSON.stringify(body),
        credentials: 'include',
      });
    } catch (cause) {
      return err(networkError(cause));
    }

    let text: string;
    try {
      text = await response.text();
    } catch (cause) {
      return err(networkError(cause));
    }

    if (!response.ok) return err(httpError(response.status, text));

    try {
      return ok(JSON.parse(text) as RpcEnvelope<T>);
    } catch {
      return err(parseError(text));
    }
  }

  async function callEnvelope<T>(
    bean: string,
    method: string,
    body: Record<string, unknown> = {},
  ): Promise<Result<RpcEnvelope<T>, TransportError>> {
    for (let round = 0; ; round++) {
      const result = await throttle.run(() => attempt<T>(bean, method, body));

      // 只有"服务端并发限制"值得重试；其它失败重试没有意义
      const throttled = result.ok && result.value.code === CONCURRENCY_LIMIT_CODE;
      if (!throttled || round >= maxRetries) return result;

      await sleep(retryDelayMs * (round + 1));
    }
  }

  return {
    callEnvelope,
    async call<T>(bean: string, method: string, body: Record<string, unknown> = {}) {
      const envelope = await callEnvelope<T>(bean, method, body);
      if (!envelope.ok) return envelope;
      const { code, message, result } = envelope.value;
      if (code !== 0) return err(apiError(code, message ?? undefined));
      return ok(result as T);
    },
  };
}

/** 当前排队中的请求数，用于诊断节流是否在正常工作。 */
export function pendingCount(throttle: Throttle): number {
  return throttle.pending();
}

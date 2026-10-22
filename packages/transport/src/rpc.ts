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

import { err, ok, type FetchLike, type Md5HexFn, type Result } from '@study-pilot/core';
import {
  CONCURRENCY_LIMIT_CODE,
  apiError,
  httpError,
  networkError,
  parseError,
  timeoutError,
  unauthenticatedError,
  type TransportError,
} from './errors.ts';
import { buildAuthHeaders } from './sign.ts';
import { createThrottle, type Throttle } from './throttle.ts';
import { startOutboundTimeout } from './timeout.ts';

/**
 * 平台响应信封。
 * 字段取自实测的响应结构（抓取产物不入库）。
 */
export interface RpcEnvelope<T = unknown> {
  code: number;
  message?: string | null;
  result?: T;
  traceId?: string | null;
  /** 平台埋点字段，无业务含义 */
  sampled?: unknown;
}

/**
 * `FetchLike` 定义在 `@study-pilot/core`：平台协议与模型调用两个包都要注入
 * `fetch`，类型只能有一处。这里保持对外导出不变。
 */
export type { FetchLike } from '@study-pilot/core';
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
  /**
   * 单次出站的时间上界（**含响应体读取**），默认 20000ms。
   *
   * 必须有上界：节流器是全站串行的，一个挂死的请求会把后面所有出站一直压在队列里，
   * 界面看起来就是「整站冻住」，直到浏览器自己放弃（可能要几分钟）。
   */
  timeoutMs?: number;
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

/** 单次出站的时间上界。平台正常响应在秒级，20 秒还不回就是挂了。RPC 与 DWR 共用这一个数。 */
export const DEFAULT_TIMEOUT_MS = 20_000;

export function createRpcClient(options: RpcClientOptions): RpcClient {
  const { origin, fetch, getToken, md5 } = options;
  const throttle = options.throttle ?? createThrottle({});
  const maxRetries = options.maxRetries ?? 3;
  const retryDelayMs = options.retryDelayMs ?? 1200;
  const sleep = options.sleep ?? defaultSleep;
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  /** 发一次请求，不含重试。 */
  async function attempt<T>(
    bean: string,
    method: string,
    body: Record<string, unknown>,
  ): Promise<Result<RpcEnvelope<T>, TransportError>> {
    /*
     * 取 token 也会失败：浏览器侧它读的是 cookie，权限被撤、profile 被清都可能 reject。
     * 放在 try 之外就等于让异常穿过 Result 契约，调用方拿到的是 rejection 而不是可判别的失败。
     */
    let token: string;
    try {
      token = await getToken();
    } catch (cause) {
      return err(networkError(cause));
    }

    const url = `${origin}/web/j/${bean}.${method}.rpc?csrfKey=${token}`;
    const headers = buildAuthHeaders(body, md5);
    // 序列化失败（循环引用等）是实现的问题，不降级成 Result——降级只会把它藏得更深
    const payload = JSON.stringify(body);

    const timeout = startOutboundTimeout(timeoutMs);
    const failure = (cause: unknown): TransportError =>
      timeout.timedOut() ? timeoutError(timeoutMs) : networkError(cause);

    try {
      let response: Response;
      try {
        response = await fetch(url, {
          method: 'POST',
          headers: { ...headers },
          body: payload,
          credentials: 'include',
          signal: timeout.signal,
        });
      } catch (cause) {
        return err(failure(cause));
      }

      let text: string;
      try {
        text = await response.text();
      } catch (cause) {
        // 响应头到手不等于请求完成：读体卡住同样要按超时算
        return err(failure(cause));
      }

      if (!response.ok) {
        /*
         * HTTP 401 是标准里的「未认证」，平台用它表示会话不认人了：
         * 归到 auth（而不是 http），处置路径才会走到「续期 → 重读 → 仍不行才报登录」。
         * 403 不并进来：它也可能是权限/风控，语义不是「换个登录就好」。
         */
        if (response.status === 401) return err(unauthenticatedError(text));
        return err(httpError(response.status, text));
      }

      try {
        return ok(JSON.parse(text) as RpcEnvelope<T>);
      } catch {
        return err(parseError(text));
      }
    } finally {
      timeout.dispose();
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

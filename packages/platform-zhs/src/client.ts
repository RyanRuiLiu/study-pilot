/*
 * 智慧树领域客户端。
 *
 * 把「取钥 + 签名 + 节流 + 错误分类」组装成对接口清单的一次调用。
 * 只做组装与协议翻译，不含业务判断（课程/单元那些在各自的模块里）。
 *
 * 运行环境要求：`fetch` 由调用方注入（扩展后台传全局 fetch；测试传替身），
 * 不碰 DOM、不碰 `browser.*`——与 platform-mooc 的同一条边界。
 *
 * 取钥按模块缓存：页面自己也是这么做的（`q = q || labc(module)`），
 * 同一会话内一把钥签一族请求。取到的 sl 只活在内存里，不落任何存储。
 */

import { createThrottle, DEFAULT_MIN_GAP_MS, type FetchLike } from '@study-pilot/transport';
import { ZHS_ENDPOINTS, ZHS_HOSTS, type ZhsEndpointName } from './endpoints.ts';
import { recoverCKey, rsaPublicEncrypt, wrapSignedBody } from './sign.ts';

/**
 * 常规浏览器 UA。浏览器载体用不到（请求天然带自己的 UA），
 * 自建请求的环境（Node 载体）要用它——平台按 UA 判来源。写成一处。
 */
export const BROWSER_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';

/** 响应是 HTTP 层面的失败（非 200）。 */
export class ZhsHttpError extends Error {
  readonly status: number;
  constructor(status: number) {
    super(`智慧树接口 HTTP ${status}`);
    this.name = 'ZhsHttpError';
    this.status = status;
  }
}

/**
 * 业务层的拒绝：响应 200 但 `code !== 0`。
 *
 * 码值由平台定义（实测见过：-1 参数解码/内容错误、-5 提交参数错误、
 * -10 多端播放警告、-12 网易易盾人机验证、421 无权限）。client 原样携带，
 * 由策略层决定怎么处置——这里不解释。
 */
export class ZhsApiError extends Error {
  readonly code: number;
  constructor(code: number, message: string) {
    super(message || `智慧树接口返回 code=${code}`);
    this.name = 'ZhsApiError';
    this.code = code;
  }
}

export interface ZhsClientOptions {
  fetch: FetchLike;
  /** 出站请求最小间隔。只有测试才需要改它 */
  minGapMs?: number;
  /** 注入时钟（时间戳与测试） */
  now?: () => number;
  /**
   * 密钥还原原语。默认 {@link recoverCKey}；测试注入替身——
   * 真 sl 只有服务端能签，测试造不出，注入是与 mooc 注入 md5 相同的先例。
   */
  recoverKey?: (sl: string) => Promise<Uint8Array<ArrayBuffer>>;
}

export interface ZhsClient {
  /**
   * 发一次调用，返回解析后的响应体（调用方按各自接口的形状取用 data/result）。
   * 失败一律抛：HTTP 非 200 抛 {@link ZhsHttpError}；响应 `code !== 0` 抛 {@link ZhsApiError}。
   */
  call(name: ZhsEndpointName, payload?: Record<string, unknown>): Promise<unknown>;
}

export function createZhsClient(options: ZhsClientOptions): ZhsClient {
  const throttle = createThrottle({ minGapMs: options.minGapMs ?? DEFAULT_MIN_GAP_MS });
  const now = options.now ?? Date.now;
  const recoverKey = options.recoverKey ?? recoverCKey;

  /** 每模块一把钥；缓存的是 Promise，并发调用不会重复取钥。 */
  const keys = new Map<number, Promise<Uint8Array<ArrayBuffer>>>();

  function keyFor(module: number): Promise<Uint8Array<ArrayBuffer>> {
    let entry = keys.get(module);
    if (entry === undefined) {
      entry = (async () => {
        const uid = await rsaPublicEncrypt(
          new TextEncoder().encode(JSON.stringify({ module })),
        );
        const response = await throttle.run(() =>
          options.fetch(
            `${ZHS_HOSTS.key}${ZHS_ENDPOINTS.keyFetch.path}?uid=${encodeURIComponent(uid)}`,
            {
              method: 'GET',
              headers: { accept: 'application/json', 'user-agent': BROWSER_USER_AGENT },
              credentials: 'include',
            },
          ),
        );
        if (response.status !== 200) throw new ZhsHttpError(response.status);
        const body = (await response.json()) as { rt?: { sl?: unknown } };
        const sl = body.rt?.sl;
        if (typeof sl !== 'string' || sl.length === 0) {
          throw new ZhsApiError(-1, '取钥失败：c/has 未返回 sl');
        }
        return recoverKey(sl);
      })();
      // 取钥失败不留在缓存里——下次调用应该重试，而不是永远拿到那个失败的 Promise
      entry.catch(() => keys.delete(module));
      keys.set(module, entry);
    }
    return entry;
  }

  return {
    async call(name, payload = {}) {
      const endpoint = ZHS_ENDPOINTS[name];
      const url = `${ZHS_HOSTS[endpoint.host]}${endpoint.path}`;

      let requestUrl = url;
      let init: RequestInit;

      if (endpoint.module === undefined) {
        init = {
          method: endpoint.method,
          headers: { accept: 'application/json', 'user-agent': BROWSER_USER_AGENT },
          credentials: 'include',
        };
      } else {
        const stamp = now();
        const inner = endpoint.stampInside === true ? { ...payload, dateFormate: stamp } : { ...payload };
        const body = await wrapSignedBody(inner, await keyFor(endpoint.module), {
          field: endpoint.stampField ?? 'dateFormate',
          value: stamp,
        });
        if (endpoint.method === 'GET') {
          requestUrl = `${url}?${body}`;
          init = {
            method: 'GET',
            headers: { accept: 'application/json', 'user-agent': BROWSER_USER_AGENT },
            credentials: 'include',
          };
        } else {
          init = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/x-www-form-urlencoded',
              'user-agent': BROWSER_USER_AGENT,
            },
            body,
            credentials: 'include',
          };
        }
      }

      const response = await throttle.run(() => options.fetch(requestUrl, init));
      if (response.status !== 200) throw new ZhsHttpError(response.status);

      const parsed = (await response.json()) as { code?: unknown; message?: unknown };
      const code = parsed.code;
      if (typeof code === 'number' && code !== 0) {
        throw new ZhsApiError(code, typeof parsed.message === 'string' ? parsed.message : '');
      }
      return parsed;
    },
  };
}

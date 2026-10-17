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

/**
 * 成功码判定（唯一一处）。各族各用一个成功码——不是兜底，是抓包事实：
 *   学习族（studyservice）：`code: 0`（"请求成功"）；
 *   首页族（onlineservice）：`code: 200`（响应同时带 result 字段）。
 * 其余值（负数、4xx、5xx）都是拒绝，由 {@link ZhsApiError} 原样携带。
 */
function isSuccessCode(code: number): boolean {
  return code === 0 || code === 200;
}

/**
 * 从响应信封里取「拒绝码」；不是拒绝就返回 null。
 *
 * **两套信封，差别是实测出来的（2026-10-17 真机）**：
 *   - 学习族 / 首页族：字段是 `code`（数字）；
 *   - **考试族 / 移动端：没有 `code`，用 `status`**——成功是**字符串** `"200"`，
 *     失败是字符串 `"-1"` 或数字 `-1`（实测两形都有：`{"msg":"2","status":"-1"}` 与
 *     `{"msg":"传入参数异常","status":-1}`）。
 *
 * 只看 `code` 会让考试族的失败**静默通过**（`code` 是 undefined，`typeof` 检查直接放过）——
 * 这条是被真机抓出来的：清单请求失败时返回的正是 `status:"-1"`。
 *
 * 两个字段都没有时不表态（返回 null）——不是兜底，是「这个响应没有码字段」这个事实；
 * 真有那种端点，它本来就不靠信封表态。
 */
function rejectionCode(parsed: { code?: unknown; status?: unknown }): number | null {
  if (typeof parsed.code === 'number') return isSuccessCode(parsed.code) ? null : parsed.code;
  const status = typeof parsed.status === 'string' ? Number(parsed.status) : parsed.status;
  if (typeof status === 'number' && Number.isFinite(status)) return status === 200 ? null : status;
  return null;
}

export interface ZhsClient {
  /**
   * 发一次调用，返回解析后的响应体（调用方按各自接口的形状取用 data/result）。
   * 失败一律抛：HTTP 非 200 抛 {@link ZhsHttpError}；响应 code 非成功码抛 {@link ZhsApiError}。
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
        /*
         * 免签端点。GET（如遗留的 getLoginUserInfo）不带参数；
         * POST（移动端 appstudent 那一族，如神谕）走**明文表单体**——
         * 实测它只吃 application/x-www-form-urlencoded。
         */
        const headers: Record<string, string> = {
          accept: 'application/json',
          'user-agent': BROWSER_USER_AGENT,
          /*
           * 平台自己的 ajax 都带这一枚（抓包实证：见面课页发的
           * `listTeachMeetingStu` 就带着它）——服务端缺它会 500。
           */
          'x-requested-with': 'XMLHttpRequest',
        };
        init = { method: endpoint.method, headers, credentials: 'include' };
        if (endpoint.method === 'POST') {
          headers['content-type'] = 'application/x-www-form-urlencoded';
          init.body = new URLSearchParams(
            Object.entries(payload).map(([name, value]) => [name, String(value)]),
          ).toString();
        }
      } else {
        const stamp = now();
        const inner = endpoint.stampInside === true ? { ...payload, dateFormate: stamp } : { ...payload };
        const body = await wrapSignedBody(
          inner,
          await keyFor(endpoint.module),
          // stampField 缺省 = 外层不带时间戳（考试族形态）；不回退到任何字段名
          endpoint.stampField === undefined ? undefined : { field: endpoint.stampField, value: stamp },
        );
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

      const parsed = (await response.json()) as {
        code?: unknown;
        status?: unknown;
        message?: unknown;
        /** 平台自己的说明字段（考试族用它；源码逐字：`$message.error(o.msg)`） */
        msg?: unknown;
      };
      const rejected = rejectionCode(parsed);
      if (rejected !== null) {
        // 平台给了说明就原样带出——丢掉它，界面上只剩一个冷冰冰的 code
        const detail =
          typeof parsed.msg === 'string' && parsed.msg !== ''
            ? parsed.msg
            : typeof parsed.message === 'string'
              ? parsed.message
              : '';
        throw new ZhsApiError(rejected, detail);
      }
      return parsed;
    },
  };
}

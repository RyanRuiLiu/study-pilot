/*
 * 智慧树领域客户端。
 *
 * 把「取钥 + 签名 + 节流 + 超时 + 错误分类」组装成对接口清单的一次调用。
 * 只做组装与协议翻译，不含业务判断（课程/单元那些在各自的模块里）。
 *
 * 运行环境要求：`fetch` 由调用方注入（扩展后台传全局 fetch；测试传替身），
 * 不碰 DOM、不碰 `browser.*`——与 platform-mooc 的同一条边界。
 *
 * 每次出站都有时间上界（transport 的 `DEFAULT_TIMEOUT_MS`，含读响应体）。
 * 慕课那条链早就有了，这一族先前没有：挂住的请求会把整轮停在原地，
 * 界面既不出结果也不报失败。
 *
 * 取钥按模块缓存：页面自己也是这么做的（`q = q || labc(module)`），
 * 同一会话内一把钥签一族请求。取到的 sl 只活在内存里，不落任何存储。
 */

import {
  BROWSER_USER_AGENT,
  createThrottle,
  DEFAULT_TIMEOUT_MS,
  startOutboundTimeout,
  timeoutMessage,
  type FetchLike,
} from '@study-pilot/transport';
import { ZHS_ENDPOINTS, ZHS_HOSTS, type ZhsEndpointName } from './endpoints.ts';
import { recoverCKey, rsaPublicEncrypt, wrapSignedBody } from './sign.ts';

/**
 * 常规浏览器 UA。浏览器载体用不到（请求天然带自己的 UA），
 * 自建请求的环境（Node 载体）要用它——平台按 UA 判来源。
 *
 * 定义在 transport（那才是「一处」），本包只是按自己的消费者再转导出一份，
 * 与慕课包的做法一致：留两份逐字节相同的字符串，改 UA 时必然漂移。
 */
export { BROWSER_USER_AGENT };

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

/**
 * 出站超过时间上界仍未返回（或被掐在读体上）。
 *
 * 为什么要有这一类：这条链上没有上界时，一次挂住的请求会把整轮停在原地——
 * 界面既不出结果也不报失败，人只能关掉扩展。有了上界就有个说得出口的结论。
 * 句子与慕课那条链同一个来源（transport 的 `timeoutMessage`）；
 * 只是这一族用抛而不是 Result——抛还是返回是各层自己的契约，措辞不必各造一份。
 */
export class ZhsTimeoutError extends Error {
  constructor(timeoutMs: number) {
    super(timeoutMessage(timeoutMs));
    this.name = 'ZhsTimeoutError';
  }
}

/** 会话失效对用户的那句话（CONTRIBUTING 常用句；平台名随包）。全包只此一处。 */
export const ZHS_SESSION_EXPIRED = '登录已失效，需重新登录智慧树';

/**
 * 平台拒绝这次登录：HTTP 401 与 403。
 *
 * 两个都有实测：2026-10-21 会话过期后，签名网关回 **401**，
 * `loginUserInfo` 回 **403 + `{"code":403,"message":"未登录"}`**；同年 10-17
 * 考试族遇到 SSO 过期时则是 302 到 passport、拿回一段 HTML（按非 JSON 解析失败处理）。
 * 归成一个类型，处置才只有一条：停轮、引导重新登录。
 *
 * 消息直接用那句话：读取路径把 `error.message` 原样呈现给用户，
 * 这里若留「智慧树接口 HTTP 401」，界面上就只有协议状态码。
 */
export class ZhsAuthError extends Error {
  readonly status: number;
  constructor(status: number) {
    super(ZHS_SESSION_EXPIRED);
    this.name = 'ZhsAuthError';
    this.status = status;
  }
}

export interface ZhsClientOptions {
  fetch: FetchLike;
  /** 出站请求最小间隔。只有测试才需要改它 */
  minGapMs?: number;
  /**
   * 单次出站（发出 + 读体）的时间上界，默认 transport 那一个数（20 秒）。
   * 注入替身的测试要它变小，真实调用一律用默认。
   */
  timeoutMs?: number;
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
  /*
   * 节奏按端点表里的 `pace` 分两桶（2026-10-23 实测）：
   *   read  50ms 间隔、并发 4 —— 只读端点 0ms 连续 20 次、并发 8 全部成功；
   *   write 200ms 间隔、串行 —— 写侧没有新实测，沿用历史 -12 门对应的保守值。
   * 分类只写在端点表一处；这里只是按它选桶，业务代码不写数字。
   * 测试传 `minGapMs: 0` 时两桶都按 0（测的是行为，不是节奏）。
   */
  const readThrottle = createThrottle({ minGapMs: options.minGapMs ?? 50, concurrency: 4 });
  const writeThrottle = createThrottle({ minGapMs: options.minGapMs ?? 200, concurrency: 1 });
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const now = options.now ?? Date.now;
  const recoverKey = options.recoverKey ?? recoverCKey;

  /**
   * 发一次请求，返回解析后的 JSON。超时同时罩住「发出」与「读体」——
   * 只罩前一步的话，卡在读体照样没有上界。
   *
   * 状态码先判、再解析：非 200 的响应体常常不是 JSON（302 到登录页就是一段 HTML），
   * 先解析会把「401 未登录」变成一句 `Unexpected token '<'`。
   */
  async function sendJson(url: string, init: RequestInit): Promise<unknown> {
    const timeout = startOutboundTimeout(timeoutMs);
    try {
      const response = await options.fetch(url, { ...init, signal: timeout.signal });
      if (response.status === 401 || response.status === 403) throw new ZhsAuthError(response.status);
      if (response.status !== 200) throw new ZhsHttpError(response.status);
      return await response.json();
    } catch (cause) {
      if (timeout.timedOut()) throw new ZhsTimeoutError(timeoutMs);
      throw cause;
    } finally {
      timeout.dispose();
    }
  }

  /** 每模块一把钥；缓存的是 Promise，并发调用不会重复取钥。 */
  const keys = new Map<number, Promise<Uint8Array<ArrayBuffer>>>();

  function keyFor(module: number): Promise<Uint8Array<ArrayBuffer>> {
    let entry = keys.get(module);
    if (entry === undefined) {
      entry = (async () => {
        const uid = await rsaPublicEncrypt(
          new TextEncoder().encode(JSON.stringify({ module })),
        );
        const body = await readThrottle.run(() =>
          sendJson(`${ZHS_HOSTS.key}${ZHS_ENDPOINTS.keyFetch.path}?uid=${encodeURIComponent(uid)}`, {
            method: 'GET',
            headers: { accept: 'application/json', 'user-agent': BROWSER_USER_AGENT },
            credentials: 'include',
          }),
        );
        const sl = (body as { rt?: { sl?: unknown } }).rt?.sl;
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

      const paceThrottle = endpoint.pace === 'write' ? writeThrottle : readThrottle;
      const body = await paceThrottle.run(() => sendJson(requestUrl, init));

      const parsed = body as {
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

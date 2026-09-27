/**
 * DWR 协议客户端。
 *
 * 平台的互评接口不走 `.rpc`，走的是 DWR（Direct Web Remoting）的纯文本调用：
 *
 * ```
 * POST {origin}/dwr/call/plaincall/{Bean}.{method}.dwr
 * Content-Type: text/plain
 *
 * callCount=1
 * scriptSessionId=${scriptSessionId}190
 * httpSessionId={NTESSTUDYSI}
 * c0-scriptName={Bean}
 * c0-methodName={method}
 * c0-id=0
 * c0-e1=string:123
 * c0-param0=Object_Object:{evaluateId:reference:c0-e1}
 * batchId=1700000000000
 * ```
 *
 * 协议细节的来源与可信度：
 *
 * | 项 | 来源 | 可信度 |
 * |---|---|---|
 * | 报文骨架（callCount / scriptSessionId / c0-* / batchId） | 真实抓包，上一代实现据此跑通 | 高 |
 * | `scriptSessionId` 用字面量 `${scriptSessionId}190` 不做握手 | 同上 | 高 |
 * | `httpSessionId` 取 `NTESSTUDYSI` | 同上 | 高 |
 * | 参数编码形式（`string:` / `Object_Object:` / `reference:`） | 同上 | 高 |
 *
 * **未经验证的部分**：本轮没有重新抓包，因此以上均为沿用既有结论。
 * 平台若改动 DWR 版本或参数编码，这里会静默失败（表现为返回体里没有
 * `_remoteHandleCallback(...,true)`）。诊断时先打印原始响应体。
 */

import { err, ok, type Result } from '@study-pilot/core';
import { networkError, type TransportError } from './errors.ts';
import { createThrottle, type Throttle } from './throttle.ts';
import type { FetchLike, TokenProvider } from './rpc.ts';

export const DWR_CONTENT_TYPE = 'text/plain';

/** DWR 响应：原始文本加元信息。DWR 没有结构化错误码，判定靠正则匹配回调。 */
export interface DwrResponse {
  ok: boolean;
  /** HTTP 是否 2xx（不代表业务成功） */
  httpOk: boolean;
  /** 本次调用的 batchId */
  batchId: number;
  /** 原始响应体，业务判定一律基于它 */
  raw: string;
}

export interface DwrClientOptions {
  origin: string;
  fetch: FetchLike;
  getToken: TokenProvider;
  /** 必须与 RPC 客户端共用同一个节流器，见 createThrottle 说明 */
  throttle?: Throttle;
  /** 注入时钟，便于测试 */
  now?: () => number;
}

export interface DwrClient {
  /** 发起一次 DWR 调用。`paramLines` 是已编码好的 `c0-paramN=...` 行。 */
  call(bean: string, method: string, paramLines: string[]): Promise<Result<DwrResponse, TransportError>>;
}

/**
 * DWR 参数编码器。
 *
 * DWR 的参数是**位置式**的：复合值必须拆成 `c0-eN` 临时变量，
 * 再用 `reference:c0-eN` 引用。手写这套字符串极易出错（编号错位、
 * 引用指向错误的变量），所以这里把它封装成按调用顺序自动编号的编码器。
 *
 * 两种产出形式的区别很重要：
 *   - `ref*` 方法会**占用一个 c0-eN 编号**并返回 `reference:c0-eN`
 *   - `literal*` 方法是**内联字面量**，不占编号，直接嵌在别处
 * `c0-paramN` 顶层参数按既有报文用的是内联字面量，与真实请求一致。
 */
export class DwrEncoder {
  private readonly lines: string[] = [];
  private counter = 1;

  private register(literal: string): string {
    const name = `c0-e${this.counter++}`;
    this.lines.push(`${name}=${literal}`);
    return `reference:${name}`;
  }

  /** 内联字符串字面量，不占编号 */
  literalString(value: string): string {
    return `string:${value}`;
  }

  /** 内联数字字面量，不占编号 */
  literalNumber(value: number): string {
    return `number:${value}`;
  }

  /** 内联布尔字面量，不占编号 */
  literalBoolean(value: boolean): string {
    return `boolean:${value}`;
  }

  /** 注册一个字符串值，返回引用 */
  string(value: string): string {
    return this.register(this.literalString(value));
  }

  /** 注册一个数字值，返回引用 */
  number(value: number): string {
    return this.register(this.literalNumber(value));
  }

  /** 注册一个布尔值，返回引用 */
  boolean(value: boolean): string {
    return this.register(this.literalBoolean(value));
  }

  /** 注册 null，返回引用 */
  nullValue(): string {
    return this.register('null:null');
  }

  /** 注册一个对象，字段值应为 `reference:...` 或内联字面量 */
  object(entries: Record<string, string>): string {
    const body = Object.entries(entries)
      .map(([key, value]) => `${key}:${value}`)
      .join(',');
    return this.register(`Object_Object:{${body}}`);
  }

  /** 注册一个数组 */
  array(items: string[]): string {
    return this.register(`Array:[${items.join(',')}]`);
  }

  /** 声明一个顶层参数。`value` 通常是内联字面量或引用。 */
  param(index: number, value: string): void {
    this.lines.push(`c0-param${index}=${value}`);
  }

  /** 产出最终报文行（不含协议骨架行）。 */
  build(): string[] {
    return [...this.lines];
  }
}

export function createDwrClient(options: DwrClientOptions): DwrClient {
  const { origin, fetch, getToken } = options;
  const throttle = options.throttle ?? createThrottle({});
  const now = options.now ?? Date.now;

  return {
    async call(bean, method, paramLines) {
      return throttle.run(async () => {
        const token = await getToken();
        const batchId = now();
        const body =
          [
            'callCount=1',
            // 无需真正握手：页面原样发出这个字面量模板，服务端接受
            'scriptSessionId=${scriptSessionId}190',
            `httpSessionId=${token}`,
            `c0-scriptName=${bean}`,
            `c0-methodName=${method}`,
            'c0-id=0',
            ...paramLines,
            `batchId=${batchId}`,
          ].join('\n') + '\n';

        const url = `${origin}/dwr/call/plaincall/${bean}.${method}.dwr`;

        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'content-type': DWR_CONTENT_TYPE },
            body,
            credentials: 'include',
          });
          const raw = await response.text();
          return ok<DwrResponse>({
            ok: response.ok,
            httpOk: response.ok,
            batchId,
            raw,
          });
        } catch (cause) {
          return err(networkError(cause));
        }
      });
    },
  };
}

/**
 * 判断 DWR 调用是否成功。
 *
 * 服务端成功时用 `dwr.engine._remoteHandleCallback(...)` 回传结果，
 * 失败时用 `dwr.engine._remoteHandleException(...)` 回传异常。
 *
 * 注意**不能**假设回调的返回值是 `true`：返回值取决于接口——
 * 提交类接口返回布尔，而查询类接口返回对象或数组。早先的实现写成
 * 匹配 `,true)`，于是所有返回对象的接口都被误判为失败。
 */
export function isDwrSuccess(raw: string): boolean {
  if (raw.includes('_remoteHandleException')) return false;
  return raw.includes('_remoteHandleCallback');
}

/**
 * 取出回调载荷的原始文本。
 *
 * 返回 `null` 表示响应里没有回调（调用失败或返回体结构变了）。
 * 这里只做定位，不解析——载荷可能是对象、数组或标量，
 * 交给具体业务函数按自己的结构处理。
 */
export function extractDwrPayload(raw: string): string | null {
  const match = raw.match(/_remoteHandleCallback\('[^']*','[^']*',([\s\S]*?)\);/);
  return match ? match[1] : null;
}

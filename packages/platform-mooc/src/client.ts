/**
 * MOOC 领域客户端。
 *
 * 把 transport 层的 RPC / DWR 两个通道组装起来，并**强制它们共享同一个节流器**：
 * 平台的频率限制是全站统一的，`.rpc` 与 `.dwr` 共用一条配额，
 * 各自持有节流器会导致实际出站速率翻倍并触发限流。
 *
 * 本模块只做组装，不含任何业务逻辑。
 */

import {
  createDwrClient,
  createRpcClient,
  createThrottle,
  DEFAULT_MIN_GAP_MS,
  type DwrClient,
  type FetchLike,
  type RpcClient,
  type TokenProvider,
} from '@study-pilot/transport';
import type { Md5HexFn } from '@study-pilot/core';

/** 站点 origin。所有接口路径都相对它拼接。 */
export const MOOC_ORIGIN = 'https://www.icourse163.org';

export interface MoocClientOptions {
  fetch: FetchLike;
  /** 取 NTESSTUDYSI。未登录时平台也会下发匿名值 */
  getToken: TokenProvider;
  /** MD5 实现。浏览器传 `@study-pilot/core` 的 `md5hex`，Node 环境可用 crypto 版 */
  md5: Md5HexFn;
  origin?: string;
  /** 出站请求最小间隔。只有测试才需要改它 */
  minGapMs?: number;
}

export interface MoocClient {
  rpc: RpcClient;
  dwr: DwrClient;
  origin: string;
}

export function createMoocClient(options: MoocClientOptions): MoocClient {
  const origin = options.origin ?? MOOC_ORIGIN;
  const throttle = createThrottle({
    minGapMs: options.minGapMs ?? DEFAULT_MIN_GAP_MS,
  });

  return {
    origin,
    rpc: createRpcClient({
      origin,
      fetch: options.fetch,
      getToken: options.getToken,
      md5: options.md5,
      throttle,
    }),
    dwr: createDwrClient({
      origin,
      fetch: options.fetch,
      getToken: options.getToken,
      throttle,
    }),
  };
}

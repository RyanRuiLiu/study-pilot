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
import { err } from '@study-pilot/core';
import { MOOC_SESSION_EXPIRED } from './auth.ts';

/** 站点 origin。所有接口路径都相对它拼接。 */
export const MOOC_ORIGIN = 'https://www.icourse163.org';

/**
 * 站点首页：界面上「去登录」的去处（登录入口在首页导航里，没有独立登录页）。
 *
 * 与 `MOOC_ORIGIN` 是两个用途：这个带尾斜杠、给人点；那个不带、拼接口前缀用。
 * 语义不同就不合并——改请求锚点不该顺手改掉界面去处，反之亦然。
 * 平台地址属平台事实，因此值放在平台包里，载体只转出。
 */
export const MOOC_LOGIN_URL = 'https://www.icourse163.org/';

/**
 * 平台按常规浏览器 UA 判来源（非浏览器 UA 会被回绝）。
 *
 * 定义在 transport 的 user-agent.ts（两个平台包共用一份，注释与理由在那里）；
 * 慕课包从这里转出，扩展与命令行照旧从本包取。
 */
export { BROWSER_USER_AGENT } from '@study-pilot/transport';

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
  /**
   * 本客户端用的出站环境（载体的 fetch，扩展那边还包着「等规则生效 + 回绝重发」）。
   *
   * 交出来是因为会话恢复那一次静默 GET 也必须走同一套出站规则：绕过去自己发，
   * 在命令行/代理域这类载体上就会带着错的 Origin、发到错的站点。
   */
  send: FetchLike;
}

export function createMoocClient(options: MoocClientOptions): MoocClient {
  const origin = options.origin ?? MOOC_ORIGIN;
  const throttle = createThrottle({
    minGapMs: options.minGapMs ?? DEFAULT_MIN_GAP_MS,
  });

  const rpc = createRpcClient({
    origin,
    fetch: options.fetch,
    getToken: options.getToken,
    md5: options.md5,
    throttle,
  });

  return {
    origin,
    send: options.fetch,
    /*
     * auth 类失败统一换成平台那句话再交出去。
     *
     * transport 只判「这是未认证」（kind: 'auth'），它不知道平台名；
     * 每个读取点自己拼句子又会拼出几种说法。这里一次换掉，下游（续期编排、
     * 界面、命令行）拿到的就是同一句「登录已失效，需重新登录慕课」。
     */
    rpc: {
      ...rpc,
      call: async <T>(bean: string, method: string, body: Record<string, unknown> = {}) => {
        const result = await rpc.call<T>(bean, method, body);
        if (!result.ok && result.error.kind === 'auth') {
          return err({ ...result.error, message: MOOC_SESSION_EXPIRED });
        }
        return result;
      },
    },
    dwr: createDwrClient({
      origin,
      fetch: options.fetch,
      getToken: options.getToken,
      throttle,
    }),
  };
}

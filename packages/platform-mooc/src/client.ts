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
import { err, type Result } from '@study-pilot/core';
import type { TransportError } from '@study-pilot/transport';
import { MOOC_SESSION_EXPIRED, sessionExpired } from './auth.ts';
import { ENDPOINTS } from './endpoints.ts';

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
  /**
   * 账密换移动端会话。配置了账号密码的载体注入；平台包只在取答案需要
   * `mob-token` 时调用，不预先登录、不轮询。
   */
  mobileSession?: MobileSessionProvider;
}

/** 取一枚新的移动端 mob-token。`refresh` 用于 -10012 后强制重登。 */
export type MobileSessionProvider = (options?: { refresh?: boolean }) => Promise<
  Result<string, TransportError>
>;

/**
 * 移动端会话的载体存储（可选）。
 *
 * 扩展用 `chrome.storage.session`：只存内存、浏览器关闭即清，不落盘；
 * 但能跨 service worker 重启复用，避免每次回收都重新登录顶掉另一台设备。
 */
export interface MobileSessionStore {
  load: () => Promise<string | null>;
  save: (token: string) => Promise<void>;
  clear: () => Promise<void>;
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
  /** 有账密配置时由载体注入；没有则沿用网页会话取 320 位 token 的旧路径。 */
  mobileSession?: MobileSessionProvider;
}

export function createMoocClient(options: MoocClientOptions): MoocClient {
  const origin = options.origin ?? MOOC_ORIGIN;
  /*
   * 节奏按端点表的 `pace` 分两桶（2026-10-23 实测）：读 50ms/并发 4，
   * 写 200ms/串行。分类只在端点表一处，这里按名字查表选桶。
   */
  const readThrottle = createThrottle({ minGapMs: options.minGapMs ?? 50, concurrency: 4 });
  const writeThrottle = createThrottle({ minGapMs: options.minGapMs ?? DEFAULT_MIN_GAP_MS, concurrency: 1 });
  const paceOf = new Map<string, 'read' | 'write'>();
  for (const endpoint of Object.values(ENDPOINTS) as Array<{ bean: string; method: string; pace?: 'read' | 'write' }>) {
    paceOf.set(`${endpoint.bean}.${endpoint.method}`, endpoint.pace ?? 'read');
  }
  const base = { origin, fetch: options.fetch, getToken: options.getToken, md5: options.md5 };
  const rpcRead = createRpcClient({ ...base, throttle: readThrottle });
  const rpcWrite = createRpcClient({ ...base, throttle: writeThrottle });

  return {
    origin,
    send: options.fetch,
    ...(options.mobileSession === undefined ? {} : { mobileSession: options.mobileSession }),
    /*
     * auth 类失败统一换成平台那句话再交出去。
     *
     * transport 只判「这是未认证」（kind: 'auth'），它不知道平台名；
     * 每个读取点自己拼句子又会拼出几种说法。这里一次换掉，下游（续期编排、
     * 界面、命令行）拿到的就是同一句「登录已失效，需重新登录慕课」。
     */
    rpc: {
      ...rpcRead,
      call: async <T>(bean: string, method: string, body: Record<string, unknown> = {}) => {
        const chosen = paceOf.get(`${bean}.${method}`) === 'write' ? rpcWrite : rpcRead;
        const result = await chosen.call<T>(bean, method, body);
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
      throttle: writeThrottle,
    }),
  };
}

/**
 * 读类 RPC 的统一入口：code = 0 但 `result` 为空 ＝ 未登录形态（实测 2026-10-03）。
 *
 * 为什么要一个入口：`.rpc` 的 `call()` 直接返回 `result`，取到 null 的读取点
 * 要么崩在属性访问上、要么把 null 当成空数据继续走（界面显示「暂无」而不是去登录）。
 * 判定放在这一处，新增读取点默认就是对的。
 *
 * **写类不走这里**：写接口的成功形状没有逐个实测过（`saveDraft` / `submitQuiz`
 * 没有抓到成功样本），拿「result 为空」去判它们的登录态可能是误判。
 */
export async function callRead<T>(
  client: MoocClient,
  bean: string,
  method: string,
  body: Record<string, unknown> = {},
): Promise<Result<T, TransportError>> {
  const result = await client.rpc.call<T>(bean, method, body);
  if (!result.ok) return result;
  if (result.value === null || result.value === undefined) return err(sessionExpired());
  return result;
}

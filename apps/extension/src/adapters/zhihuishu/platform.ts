/*
 * 智慧树在本载体上的装配点。
 *
 * 厂商那半（客户端怎么建、任务怎么跑、要不要请求头改写）在
 * `createZhsRuntime` 里；这里只补本载体的一件东西：消息处理器表
 * （消息的形状是本载体的契约，平台不认它）——与慕课那份同一分法。
 */

import { createZhsRuntime } from '@study-pilot/platform-zhs';
import type { ConfigPort, PlatformTasks, PlatformWiring } from '@study-pilot/application';
import { browserCapabilities } from '../../browser/capabilities.ts';
import type { MessageHandlers } from '../../protocol.ts';
import type { ZhsMessageDeps } from './messages/deps.ts';
import { zhihuishuHandlers } from './messages/handlers.ts';

/** 本载体给出的东西：只有它自己拥有的能力。 */
export interface ZhsEnv {
  config: ConfigPort;
}

export interface ZhsPlatform {
  /** 与慕课处理器合并进同一条路由；`*` 兜底由合并处补 */
  handlers: Omit<MessageHandlers, '*'>;
  /** 要跑一轮时的平台实例 */
  tasks: () => PlatformTasks;
  /** 外壳要观察的信号：登录靠 CASLOGC cookie 判（browserCapabilities.readCookie）、无请求头规则 */
  wiring: PlatformWiring;
}

export function createZhihuishuPlatform(env: ZhsEnv): ZhsPlatform {
  // fetch 由本载体提供：扩展后台的全局 fetch（含 cookie、走浏览器网络栈）
  const runtime = createZhsRuntime({
    config: env.config,
    fetch: (url, init) => fetch(url, init),
    readCookie: browserCapabilities.readCookie,
  });

  const deps: ZhsMessageDeps = {
    config: env.config,
    client: runtime.client,
    readCookie: browserCapabilities.readCookie,
  };

  return {
    handlers: zhihuishuHandlers(deps),
    tasks: runtime.tasks,
    wiring: runtime.wiring,
  };
}

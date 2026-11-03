/*
 * 智慧树在本载体上的装配点。
 *
 * 厂商那半（客户端怎么建、任务怎么跑、要不要请求头改写）在
 * `createZhsRuntime` 里；这里只补本载体的一件东西：消息处理器表
 * （消息的形状是本载体的契约，平台不认它）——与慕课那份同一分法。
 */

import { createZhsRuntime } from '@study-pilot/platform-zhs';
import { readTaskData, withTaskData, type ConfigPort, type PlatformTasks, type PlatformWiring } from '@study-pilot/application';
import { browserCapabilities } from '../../browser/capabilities.ts';
import { taskStore } from '../../background/runtime/task-state.ts';
import type { MessageHandlers } from '../../protocol.ts';
import type { ZhsMessageDeps } from './messages/deps.ts';
import { zhihuishuHandlers } from './messages/handlers.ts';

/** 本载体给出的东西：只有它自己拥有的能力。 */
export interface ZhsEnv {
  config: ConfigPort;
}

export interface ZhsPlatform {
  /** 与慕课处理器合并进同一条路由；没人认领的 type 由外壳路由回「处理不了」 */
  handlers: MessageHandlers;
  /** 要跑一轮时的平台实例 */
  tasks: () => PlatformTasks;
  /** 外壳要观察的信号：登录靠 CASLOGC cookie 判（browserCapabilities.readCookie）、无请求头规则 */
  wiring: PlatformWiring;
}

export function createZhihuishuPlatform(env: ZhsEnv): ZhsPlatform {
  /*
   * 逐任务跨次留痕落在 TaskState 的 zhihuishu 条目上（迁移规则在 application
   * 的 state.ts，这里只把读写口接到本载体的 taskStore）。
   */
  const taskData = {
    read: async (taskId: string) => readTaskData(await taskStore.read(), 'zhihuishu', taskId),
    write: async (taskId: string, value: unknown) =>
      taskStore.write(withTaskData(await taskStore.read(), 'zhihuishu', taskId, value)),
  };

  // fetch 由本载体提供：扩展后台的全局 fetch（含 cookie、走浏览器网络栈）
  const runtime = createZhsRuntime({
    config: env.config,
    fetch: (url, init) => fetch(url, init),
    readCookie: browserCapabilities.readCookie,
    taskData,
  });

  const deps: ZhsMessageDeps = {
    config: env.config,
    client: runtime.client,
    readCookie: browserCapabilities.readCookie,
    refreshCourses: runtime.refreshCourses,
  };

  return {
    handlers: zhihuishuHandlers(deps),
    tasks: runtime.tasks,
    wiring: runtime.wiring,
  };
}

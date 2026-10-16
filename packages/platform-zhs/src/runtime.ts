/*
 * 智慧树在本载体上的运行件（厂商那半的装配点）。
 *
 * 载体只调工厂：客户端的构造（fetch 注入、取钥缓存）与「平台任务怎么建」
 * 都是厂商的事实，第二个载体不必抄一遍——与 createMoocRuntime 同一条边界。
 *
 * 与慕课的差别只有一处：这里没有文本生成器——智慧树的请求凭
 * `credentials:'include'` 自带凭证，任务里也没有需要生成文本的单元。
 * cookie 读取用于会话判定（CASLOGC，见 session.ts），由载体注入。
 */

import type { ConfigPort, PlatformTasks, PlatformWiring } from '@study-pilot/application';
import type { FetchLike } from '@study-pilot/transport';
import { createZhsClient, type ZhsClient } from './client.ts';
import { refreshCourses } from './courses.ts';
import { ZHS_REQUEST_RULES } from './policy/net-rules.ts';
import { createZhsTasks } from './policy/tasks.ts';
import type { CookieReader } from './session.ts';

export interface ZhsRuntimeEnv {
  /** 配置端口：由载体实现（扩展侧是浏览器存储，命令行侧是文件） */
  config: ConfigPort;
  fetch: FetchLike;
  /** 读 cookie 的宿主能力（会话判定；扩展侧是 browser.cookies，命令行侧是会话文件） */
  readCookie: CookieReader;
}

export interface ZhsRuntime {
  /** 消息处理器共用的客户端（会话/课程/概要读取用同一把钥缓存） */
  client: ZhsClient;
  /**
   * 去平台重拉课程列表并写回配置（合并规则见 courses.ts）。
   *
   * 与慕课的 `refreshCourses` 同一位置、同一件事：载体（扩展处理器、命令行命令）
   * 只负责把失败原因翻成自己的说法，不重写读取与合并。
   */
  refreshCourses: () => ReturnType<typeof refreshCourses>;
  /**
   * 跑一轮时的平台实例（每次调用现建，与慕课同一形状）。
   *
   * 实例持有本轮状态（如按轮清空的 isApply 缓存，见 policy/tasks.ts），
   * 因此「一轮一个」；跨轮共享的只有下面这个 client 的取钥缓存。
   */
  tasks: () => PlatformTasks;
  /** 外壳要观察的信号：本平台没有请求头改写需求（实测，见 net-rules.ts） */
  wiring: PlatformWiring;
}

export function createZhsRuntime(env: ZhsRuntimeEnv): ZhsRuntime {
  const client = createZhsClient({ fetch: env.fetch });
  return {
    client,
    refreshCourses: () => refreshCourses(client, env.config),
    tasks: () => createZhsTasks({ config: env.config, client, readCookie: env.readCookie }),
    wiring: { id: 'zhihuishu', requestRules: ZHS_REQUEST_RULES },
  };
}

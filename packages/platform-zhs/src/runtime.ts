/*
 * 智慧树在本载体上的运行件（厂商那半的装配点）。
 *
 * 载体只调工厂：客户端的构造（fetch 注入、取钥缓存）与「平台任务怎么建」
 * 都是厂商的事实，第二个载体不必抄一遍——与 createMoocRuntime 同一条边界。
 *
 * 与慕课的差别只有一处：这里没有 cookie 读取与文本生成器——智慧树的请求
 * 凭 `credentials:'include'` 自带凭证，任务里也没有需要生成文本的单元；
 * 等真出现需要它们的功能再加，不放占位参数。
 */

import type { ConfigPort, PlatformTasks, PlatformWiring } from '@study-pilot/application';
import type { FetchLike } from '@study-pilot/transport';
import { createZhsClient, type ZhsClient } from './client.ts';
import { ZHS_REQUEST_RULES } from './policy/net-rules.ts';
import { createZhsTasks } from './policy/tasks.ts';

export interface ZhsRuntimeEnv {
  /** 配置端口：由载体实现（扩展侧是浏览器存储，命令行侧是文件） */
  config: ConfigPort;
  fetch: FetchLike;
}

export interface ZhsRuntime {
  /** 消息处理器共用的客户端（会话/课程/概要读取用同一把钥缓存） */
  client: ZhsClient;
  /**
   * 跑一轮时的平台实例。
   *
   * 与慕课的「每轮现建」有一处不同：这里的实例**没有**本轮状态可残留
   * （计划与结果每次调用现算），因此共用一个实例、顺带共用取钥缓存；
   * 慕课那边现建是因为它持有题库缓存之类的东西。
   */
  tasks: () => PlatformTasks;
  /** 外壳要观察的信号：本平台没有请求头改写需求（实测，见 net-rules.ts） */
  wiring: PlatformWiring;
}

export function createZhsRuntime(env: ZhsRuntimeEnv): ZhsRuntime {
  const client = createZhsClient({ fetch: env.fetch });
  return {
    client,
    tasks: () => createZhsTasks({ config: env.config, client }),
    wiring: { id: 'zhihuishu', requestRules: ZHS_REQUEST_RULES },
  };
}

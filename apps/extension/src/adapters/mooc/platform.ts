/*
 * 慕课在本载体上的装配点。
 *
 * 厂商那半（客户端怎么建、哪些课程算勾选、讨论单元要不要文本能力、登录 cookie 叫什么）
 * 在 @study-pilot/platform-mooc 的 createMoocRuntime 里——那是慕课的事实，第二个载体
 * 不必抄一遍。这里只补两件本载体的事：
 *   1. 文本生成器用的是扩展侧的 AI 用例（提示词与重试在 apps/extension/src/ai/）；
 *   2. 消息处理器表（消息的形状是本载体的契约，平台不认它）。
 */

import { createMoocRuntime } from '@study-pilot/platform-mooc';
import type { ConfigPort, HostCapabilities, PlatformTasks, PlatformWiring } from '@study-pilot/application';
import { createTextGenerator } from '../../ai';
import type { MessageHandlers } from '../../protocol.ts';
import type { MoocMessageDeps } from './messages/deps.ts';
import { moocHandlers } from './messages/handlers.ts';

/** 本载体给出的东西：只有它自己拥有的能力。 */
export interface MoocEnv {
  host: HostCapabilities;
  /** 配置端口：由载体实现（扩展侧是浏览器存储，命令行侧是文件） */
  config: ConfigPort;
  shell: MoocMessageDeps['shell'];
}

export interface MoocPlatform {
  handlers: MessageHandlers;
  /** 要跑一轮时的平台实例（现建，避免本轮状态跨轮残留） */
  tasks: () => PlatformTasks;
  /** 外壳要观察的信号：登录凭证 cookie 与请求头规则 */
  wiring: PlatformWiring;
}

export function createMoocPlatform(env: MoocEnv): MoocPlatform {
  const runtime = createMoocRuntime({
    host: env.host,
    config: env.config,
    recordFailure: env.shell.recordFailure,
    textGenerator: createTextGenerator,
  });

  // 消息处理器要的就是运行件那几样，加上外壳自己的运行状态口
  const deps: MoocMessageDeps = { ...runtime, shell: env.shell };

  return {
    handlers: moocHandlers(deps),
    tasks: runtime.tasks,
    wiring: runtime.wiring,
  };
}

/*
 * 应用级消息契约——**唯一的装配点**。
 *
 * 这里是全项目唯一把"外壳的命令"和"各平台的命令"合到一起的地方：
 *   - 外壳命令（手动跑一轮、运行状态）：与平台无关，形状在 protocol.ts；
 *   - 平台命令（登录态、课程、待办、明细）：形状由各平台自己给出，
 *     慕课那份在 adapters/mooc/messages/payload.ts。
 *
 * 为什么只有这一个地方知道全部命令：加第二个平台时，只有这里要加一行
 * （合并它的请求类型与响应映射）。别处——界面、后台路由、平台内部——都只认自己那一半。
 *
 * 界面侧不要直接用它：界面走 src/ui-bridge.ts，那是"只看数据"的入口。
 */

import type { RunState } from '@study-pilot/application';
import type {
  AnySendResponse,
  JobRejection,
  MessageHandler,
  MessageHandlers,
  RunScheduledTasksResponse,
  TaskStatus,
} from './protocol.ts';
import type { MoocRequest, MoocResponseMap } from './adapters/mooc/messages/payload.ts';

export * from './protocol.ts';
/** 界面要的视图模型：定义在平台里，这里转出，界面只认这一个来源。 */
export type { Snapshot } from '@study-pilot/platform-mooc';
export type { MoocSession } from '@study-pilot/platform-mooc';
export type { CoursewareProgress } from '@study-pilot/platform-mooc';
export type { RunState } from '@study-pilot/application';
export type {
  MoocRequest,
  MoocResponseMap,
  PendingEntry,
  PendingKind,
  PendingSummary,
  UnitDetail,
  WorkStatus,
} from './adapters/mooc/messages/payload.ts';
export { WORK_STATUS } from './adapters/mooc/messages/payload.ts';

/** 外壳自己的命令。 */
export type ShellRequest =
  /** 执行一轮。kinds / group / ids 是范围（见 application 的 RunSelection），不给就是全部 */
  | { type: 'RUN_SCHEDULED_TASKS'; kinds?: string[]; group?: string; ids?: string[] }
  /** 停止正在执行的一轮：做完手上这一项就不再开始下一项 */
  | { type: 'STOP_RUN' }
  /** 后台此刻在不在跑、上一轮记下的失败 */
  | { type: 'TASK_STATE' }
  /** 运行状态快照（进度与逐项记录） */
  | { type: 'RUN_STATE' };

export interface ShellResponseMap {
  RUN_SCHEDULED_TASKS: RunScheduledTasksResponse;
  STOP_RUN: { stopped: boolean };
  TASK_STATE: TaskStatus;
  RUN_STATE: RunState;
}

/** 全部请求：外壳 + 各平台。 */
export type AppRequest = ShellRequest | MoocRequest;

/** 全部响应：请求的 type 同时是键。 */
export interface AppResponseMap extends ShellResponseMap, MoocResponseMap {}

type RequestOf<K extends AppRequest['type']> = Extract<AppRequest, { type: K }>;

/** 向后台发送请求。返回类型由 type 推导，调用方不需要类型断言。 */
export async function sendToBackground<K extends AppRequest['type']>(
  request: RequestOf<K>,
): Promise<AppResponseMap[K]> {
  const response = (await browser.runtime.sendMessage(request)) as AppResponseMap[K] | undefined;
  if (response === undefined) {
    throw new Error(`后台未处理该请求：${request.type}`);
  }
  return response;
}

/** 后台侧的处理器签名与处理器表（外壳按 type 分发，平台实现自己那几条）。 */
export type { AnySendResponse, JobRejection, MessageHandler, MessageHandlers };

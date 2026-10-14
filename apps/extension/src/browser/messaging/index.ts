/*
 * 前台与后台之间的消息协议（装配点）。
 *
 * 用可辨识联合加响应类型映射，替代裸字符串消息。
 * 调用方在编译期即可知道每个请求的响应形状，改协议时漏改一处会被类型检查拦下。
 *
 * 约定：请求对象的 `type` 字段同时是 `ResponseMap` 的键，
 * 因此新增一个请求必须同时补一条响应类型，无法只改一半。
 *
 * 分工：`envelope.ts` 放通用部分（查询结果、拒绝原因、发送入口），
 * `mooc.ts` 放平台载荷；本文件只把请求与响应绑在一起，并对外导出。
 */

import type {
  BankQuestion,
  CourseSummary,
  OpenQuizInfo,
  PaperQuestion,
} from '@study-pilot/platform-mooc';
import type { Snapshot } from '../../platforms/mooc/read';

/** DASHBOARD 的载荷就是它；弹窗要算「还剩多少课件」时也要用同一个类型 */
export type { Snapshot };
import type { MoocSession } from '../../platforms/mooc/session';
import type {
  JobRejection,
  QueryOutcome,
  RunScheduledTasksResponse,
  TaskStatus,
} from './envelope.ts';
import type { PendingSummary, UnitDetail } from './mooc.ts';
import type { RunState } from '../../background/runtime/run-state';

// ---------- 请求 ----------

/** 查询当前登录态。 */
interface SessionRequest {
  type: 'SESSION';
}

/** 读取已保存的课程列表。 */
interface CoursesRequest {
  type: 'COURSES';
}

/** 从平台重新拉取课程列表并写回配置。 */
interface RefreshCoursesRequest {
  type: 'REFRESH_COURSES';
}

export type BackgroundRequest =
  | SessionRequest
  | CoursesRequest
  | RefreshCoursesRequest
  | { type: 'RUN_SCHEDULED_TASKS' }
  | { type: 'TASK_STATE' }
  /** 运行状态快照（进度、逐项记录、最近几轮）。实时性由端口推送保证 */
  | { type: 'RUN_STATE' }
  /** 请求停止某个平台的那一轮；在两项之间生效 */
  | { type: 'STOP_PLATFORM_RUN'; platformId: string }
  | { type: 'PENDING_SUMMARY' }
  | { type: 'UNIT_DETAILS' }
  | { type: 'NOTIFY_SAMPLE' }
  /*
   * 前台要用的平台数据一律经这里取。
   *
   * 内容脚本不建自己的客户端：两个上下文各有一个节流器时互不知情，
   * 并发发请求会撞上平台的并发限制。
   */
  | { type: 'QUIZ_BANK'; termId: number }
  | { type: 'QUIZ_INFO'; tid: number }
  /** 得分指导要的题目（作业或考试） */
  | { type: 'UNIT_QUESTIONS'; kind: 'homework' | 'exam'; tid: number }
  /** 看板要的课程与任务（中立模型），只读本地快照 */
  | { type: 'DASHBOARD' }
  /*
   * 提交单元测验。前台点「提交答案」走这里，而不是自己调写接口：
   * 写入只从后台发出，理由同上，且写入不可逆。
   */
  | { type: 'SUBMIT_QUIZ'; quizId: number; termId: number };

// ---------- 响应 ----------

export interface ResponseMap {
  SESSION: MoocSession;
  COURSES: CourseSummary[];
  REFRESH_COURSES:
    | { ok: true; courses: CourseSummary[] }
    | { ok: false; reason: JobRejection; message?: string };
  RUN_SCHEDULED_TASKS: RunScheduledTasksResponse;
  TASK_STATE: TaskStatus;
  RUN_STATE: RunState;
  STOP_PLATFORM_RUN: { ok: true };
  PENDING_SUMMARY: QueryOutcome<PendingSummary>;
  UNIT_DETAILS: QueryOutcome<UnitDetail[]>;
  NOTIFY_SAMPLE: { ok: true; hasContent: boolean };
  QUIZ_BANK: QueryOutcome<BankQuestion[]>;
  QUIZ_INFO: QueryOutcome<OpenQuizInfo>;
  UNIT_QUESTIONS: QueryOutcome<PaperQuestion[]>;
  DASHBOARD: QueryOutcome<Snapshot | null>;
  SUBMIT_QUIZ: { ok: true; matched: number } | { ok: false; message: string };
}

// 对外只留这一个入口，调用方不必知道内部如何分文件
export * from './envelope.ts';
export * from './mooc.ts';

type RequestOf<K extends BackgroundRequest['type']> = Extract<BackgroundRequest, { type: K }>;

/**
 * 向后台发送请求。返回类型由 `type` 推导，调用方不需要写类型断言。
 *
 * 放在这个文件而不是 envelope.ts：它要用 ResponseMap，而 envelope 只装与请求无关的形状；
 * 两者分开之后，envelope 不再 import index，原本的循环依赖随之消失。
 */
export async function sendToBackground<K extends BackgroundRequest['type']>(
  request: RequestOf<K>,
): Promise<ResponseMap[K]> {
  const response = (await browser.runtime.sendMessage(request)) as ResponseMap[K] | undefined;
  if (response === undefined) {
    throw new Error(`后台未处理该请求：${request.type}`);
  }
  return response;
}

/**
 * 回响应给前台。
 *
 * 泛型参数是请求的 `type`，响应的形状因此由 `ResponseMap` 单向约束：
 * 外壳里自己回的那一条（手动执行一轮）必须是 `SendResponse<'RUN_SCHEDULED_TASKS'>`，
 * 回错字段编译期就红。曾经这里收的是 `unknown`，「形状由 ResponseMap 约束」
 * 只是注释里的愿望——后台改了响应、协议类型没跟着改，两边都不报错。
 *
 * 平台处理器仍收宽松版本（它们按 type 分发，键在运行时才知道），
 * 每条协议的实际形状由各自的响应测试钉住。
 */
export type SendResponse<K extends BackgroundRequest['type'] = BackgroundRequest['type']> = (
  response: ResponseMap[K],
) => void;

/** 宽松的回响应入口，只用于分发处那一层。 */
export type AnySendResponse = (response?: unknown) => void;

/**
 * 一个消息处理器。
 *
 * 处理器由**平台**提供（外壳只负责按 type 分发），因此它拿到的是协议里的
 * 请求对象与回响应入口，不认识外壳的其它东西。
 */
export type MessageHandler = (
  request: BackgroundRequest,
  sendResponse: AnySendResponse,
) => Promise<void>;

/** 平台的处理器表：按请求 type 索引；\`*\` 是兜底（处理该平台自己的查询类请求）。 */
export type MessageHandlers = Partial<Record<BackgroundRequest['type'], MessageHandler>> & {
  '*': MessageHandler;
};

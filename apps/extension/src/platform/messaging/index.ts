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

import type { CourseSummary } from '@study-pilot/platform-mooc';
import type { MoocSession } from '../mooc/session';
import type {
  DiagnoseReport,
  JobRejection,
  QueryOutcome,
  RunScheduledTasksResponse,
  TaskStatus,
} from './envelope.ts';
import type { PendingSummary, UnitDetail } from './mooc.ts';

// ---------- 请求 ----------

/** 查询当前登录态。 */
export interface SessionRequest {
  type: 'SESSION';
}

/** 读取已保存的课程列表。 */
export interface CoursesRequest {
  type: 'COURSES';
}

/** 从平台重新拉取课程列表并写回配置。 */
export interface RefreshCoursesRequest {
  type: 'REFRESH_COURSES';
}

export type BackgroundRequest =
  | SessionRequest
  | CoursesRequest
  | RefreshCoursesRequest
  | { type: 'RUN_SCHEDULED_TASKS' }
  | { type: 'TASK_STATE' }
  | { type: 'RESET_TASK_STATE' }
  | { type: 'PENDING_SUMMARY' }
  | { type: 'DIAGNOSE' }
  | { type: 'UNIT_DETAILS' }
  | { type: 'NOTIFY_SAMPLE' };

// ---------- 响应 ----------

export interface ResponseMap {
  SESSION: MoocSession;
  COURSES: CourseSummary[];
  REFRESH_COURSES:
    | { ok: true; courses: CourseSummary[] }
    | { ok: false; reason: JobRejection; message?: string };
  RUN_SCHEDULED_TASKS: RunScheduledTasksResponse;
  TASK_STATE: TaskStatus;
  RESET_TASK_STATE: { ok: true };
  PENDING_SUMMARY: QueryOutcome<PendingSummary>;
  DIAGNOSE: DiagnoseReport;
  UNIT_DETAILS: QueryOutcome<UnitDetail[]>;
  NOTIFY_SAMPLE: { ok: true; hasContent: boolean };
}

export type BackgroundResponse<K extends keyof ResponseMap> = ResponseMap[K];

// 对外只留这一个入口，调用方不必知道内部如何分文件
export * from './envelope.ts';
export * from './mooc.ts';

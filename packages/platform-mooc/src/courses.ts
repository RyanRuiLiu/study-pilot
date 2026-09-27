/**
 * 课程列表。
 *
 * 响应结构有个容易踩的坑：信封里的 `result` **不是数组**，而是
 * `{ pagination, result: [...] }` 双层结构。直接当数组用会得到 undefined，
 * 且不会报错——所以这里显式解一层。
 *
 * 实测确认（2026-09-26）：该端点返回 `code: 0`，两层结构如下：
 * ```
 * { code: 0, result: { pagination: {...}, result: [ { id, name, termPanel: {...} } ] } }
 * ```
 *
 * 课程分两类，由 `courseType` 参数区分，必须分别请求再合并——
 * 只取一类会漏掉另一类课程。
 */

import { ok, type Result } from '@study-pilot/core';
import type { TransportError } from '@study-pilot/transport';
import type { MoocClient } from './client.ts';
import { COURSE_TYPE, ENDPOINTS, type CourseType } from './endpoints.ts';
import type { CourseSummary } from './types.ts';

/** 原始课程项。字段名以实测响应为准。 */
interface RawCourse {
  id: number;
  name: string;
  /** 课程简称，形如 NTU021 */
  shortName?: string | null;
  imgUrl?: string | null;
  /** 课程模式：0 MOOC、10/15/20 SPOC、30 ROOC */
  mode?: number | null;
  /** 1 MOOC、2 SPOC */
  courseType?: number | null;
  schoolPanel?: { name?: string | null; shortName?: string | null } | null;
  termPanel?: {
    id?: number;
    startTime?: number | null;
    endTime?: number | null;
    publishStatus?: number | null;
    /** 课程下的课时数 */
    lessonsCount?: number | null;
    /** 已选人数 */
    enrollCount?: number | null;
  } | null;
}

interface CourseListPayload {
  result?: RawCourse[];
}

export interface GetCoursesOptions {
  courseType?: CourseType;
  pageSize?: number;
}

/** 把一个原始课程项归一化成 {@link CourseSummary}。 */
function toSummary(raw: RawCourse): CourseSummary {
  const term = raw.termPanel ?? {};
  return {
    courseId: raw.id,
    name: raw.name,
    shortName: raw.shortName ?? '',
    // 没有 termId 的课程无法参与后台任务（所有接口都以 termId 为单位）
    termId: term.id ?? 0,
    mode: raw.mode ?? null,
    courseType: raw.courseType ?? null,
    schoolName: raw.schoolPanel?.name ?? '',
    schoolShortName: raw.schoolPanel?.shortName ?? '',
    coverUrl: raw.imgUrl ?? '',
    startTime: term.startTime ?? null,
    endTime: term.endTime ?? null,
    publishStatus: term.publishStatus ?? null,
    lessonsCount: term.lessonsCount ?? null,
    enrollCount: term.enrollCount ?? null,
  };
}

/**
 * 取当前账号的课程列表。
 *
 * 只返回带 `termId` 的课程——没有学期 id 的课程在本项目的所有后续接口里都用不了。
 */
export async function getCourses(
  client: MoocClient,
  options: GetCoursesOptions = {},
): Promise<Result<CourseSummary[], TransportError>> {
  const payload = await client.rpc.call<CourseListPayload>(
    ENDPOINTS.courseList.bean,
    ENDPOINTS.courseList.method,
    {
      type: 30,
      p: 1,
      psize: options.pageSize ?? 50,
      courseType: options.courseType ?? COURSE_TYPE.MOOC,
    },
  );

  if (!payload.ok) return payload;
  const list = payload.value?.result ?? [];
  return ok(list.map(toSummary).filter((course) => course.termId > 0));
}

/**
 * 取课程列表，并把中间结果一并返回。
 *
 * 仅用于诊断：课程列表在界面上出现缺失时，需要区分是「请求返回空」
 * 还是「解析后为空」，两者的处理方式完全不同。
 */
export async function getCoursesWithTrace(
  client: MoocClient,
  options: GetCoursesOptions = {},
): Promise<{
  request: Record<string, unknown>;
  envelope?: unknown;
  rawCount?: number;
  parsedCount?: number;
  error?: string;
}> {
  const request = {
    type: 30,
    p: 1,
    psize: options.pageSize ?? 50,
    courseType: options.courseType ?? COURSE_TYPE.MOOC,
  };

  const payload = await client.rpc.call<CourseListPayload>(
    ENDPOINTS.courseList.bean,
    ENDPOINTS.courseList.method,
    request,
  );

  if (!payload.ok) {
    return { request, error: `${payload.error.kind}: ${payload.error.message}` };
  }

  const list = payload.value?.result ?? [];
  const parsed = list.map(toSummary).filter((course) => course.termId > 0);

  return {
    request,
    envelope: payload.value,
    rawCount: list.length,
    parsedCount: parsed.length,
  };
}


/** 同时取 MOOC 与 SPOC 两边的课程。 */
export async function getAllCourses(
  client: MoocClient,
  pageSize = 50,
): Promise<Result<CourseSummary[], TransportError>> {
  const mooc = await getCourses(client, { courseType: COURSE_TYPE.MOOC, pageSize });
  if (!mooc.ok) return mooc;

  const spoc = await getCourses(client, { courseType: COURSE_TYPE.SPOC, pageSize });
  if (!spoc.ok) return spoc;

  return ok([...mooc.value, ...spoc.value]);
}

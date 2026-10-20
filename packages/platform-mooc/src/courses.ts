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

import { ok, err, type Result } from '@study-pilot/core';
import { unauthenticatedError, type TransportError } from '@study-pilot/transport';
import type { MoocClient } from './client.ts';
import { COURSE_TYPE, ENDPOINTS, type CourseType } from './endpoints.ts';
import type { CourseSummary } from './types.ts';

/** 原始课程项。字段名以实测响应为准。 */
interface RawCourse {
  id: number;
  name: string;
  /** 课程简称，形如 DEMO001 */
  shortName?: string | null;
  imgUrl?: string | null;
  /** 课程模式：0 MOOC、10/15/20 SPOC、30 ROOC */
  mode?: number | null;
  /**
   * 条目上的产品类型（COURSE_PRODUCT_TYPE：1 课程、2 考研、3 专栏、308 教材）。
   * 与请求参数的 courseType（1|2，MOOC/SPOC 分类）同名不同义——平台源码确认。
   */
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
    /** 当前账号是否已选这门课：平台据此决定给不给结构（见 structure.ts） */
    hasEnroll?: boolean | null;
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
    // 平台没给时按 true：不凭缺失把课排除掉（见 CourseSummary 的注释）
    hasEnroll: term.hasEnroll ?? true,
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
 * 课程列表的未登录形态判定，getCourses 用它。
 *
 * 内层 result 为 `null` 时平台在说「我不认得你」；空数组才是
 * 「认得，但确实没有课程」（实测 2026-10-03）。
 * 吞掉 null 当空列表，失效会话就会被上层当成「确实没有课程」。
 */
function authedCourseList(
  payload: CourseListPayload,
): Result<RawCourse[], TransportError> {
  if (payload?.result == null) return err(unauthenticatedError());
  return ok(payload.result);
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
  const list = authedCourseList(payload.value);
  if (!list.ok) return list;
  return ok(list.value.map(toSummary).filter((course) => course.termId > 0));
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

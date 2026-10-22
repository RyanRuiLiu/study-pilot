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
import { parseError, type TransportError } from '@study-pilot/transport';
import { sessionExpired } from './auth.ts';
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
  /** 总数（分页用）：只做「还要不要下一页」的判断，不参与课程字段 */
  pagination?: { total?: number | null } | null;
}

export interface GetCoursesOptions {
  courseType?: CourseType;
  pageSize?: number;
  /** 最多翻几页（默认取满）。登录探问只要第一页，别为一个「认不认得我」翻完整张表 */
  maxPages?: number;
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
 * 三种响应要分开（2026-10-21 真机实测，页大小 1 翻到第 6 页时暴露）：
 *   · 整个 `result` 为 `null` → 平台不认得这个会话，**未登录**；
 *   · `result.result` 为 `null` → **这一页没有数据**（翻到末尾就是这种形状，
 *     pagination 里 totleCount 仍是真实总数）。旧写法把它也当未登录，于是
 *     刚登录的账号在翻到空页那一刻被判成「未登录」；
 *   · `result.result` 是数组 → 正常一页（空数组是「认得但确实没有课程」）。
 * 吞掉 null 当空列表，失效会话会被上层当成「确实没有课程」；反过来把空页
 * 当成未登录，会把活着会话判死——两个方向都错。
 */
function authedCourseList(
  payload: CourseListPayload | null | undefined,
  page: number,
): Result<RawCourse[], TransportError> {
  if (payload == null) return err(sessionExpired());
  if (payload.result == null) {
    /*
     * 内层 result 为 null 有两种含义，靠页码与总数分开（2026-10-21 真机）：
     *   · 翻到末尾的空页：pagination 里有真实总数（实测第 10 页 totleCount=5），
     *     或者这已经不是第一页——是「没有下一页」，不是「不认得你」；
     *   · 第一页且没有任何总数：才是未登录形态（实测 2026-10-03，匿名会话）。
     * 早先把两者都当未登录，页大小 1 的登录探问翻到空页就把活会话判死了。
     */
    const total = payload.pagination?.total;
    if (page > 1 || (typeof total === 'number' && Number.isFinite(total) && total > 0)) return ok([]);
    return err(sessionExpired());
  }
  if (!Array.isArray(payload.result)) {
    return err(parseError('课程列表：result 不是数组（平台回的形状与预期不符）'));
  }
  return ok(payload.result);
}

/**
 * 取当前账号的课程列表。
 *
 * 只返回带 `termId` 的课程——没有学期 id 的课程在本项目的所有后续接口里都用不了。
 */
/** 分页上限：一页 50、最多 20 页（1000 门课）。超过就报错，不静默截断。 */
const MAX_PAGES = 20;

export async function getCourses(
  client: MoocClient,
  options: GetCoursesOptions = {},
): Promise<Result<CourseSummary[], TransportError>> {
  const pageSize = options.pageSize ?? 50;
  const courses: CourseSummary[] = [];
  const seen = new Set<number>();
  let fetched = 0;

  const lastPage = Math.min(options.maxPages ?? MAX_PAGES, MAX_PAGES);
  for (let page = 1; page <= lastPage; page += 1) {
    const payload = await client.rpc.call<CourseListPayload>(
      ENDPOINTS.courseList.bean,
      ENDPOINTS.courseList.method,
      {
        type: 30,
        p: page,
        psize: pageSize,
        courseType: options.courseType ?? COURSE_TYPE.MOOC,
      },
    );

    if (!payload.ok) return payload;
    const list = authedCourseList(payload.value, page);
    if (!list.ok) return list;

    // 列表本身对了，个别条目可能不是对象：跳过，不让空指针炸掉整个列表
    const rows = list.value.filter((raw): raw is RawCourse => raw !== null && typeof raw === 'object');
    fetched += rows.length;
    for (const raw of rows) {
      const course = toSummary(raw);
      if (!Number.isFinite(course.termId) || course.termId <= 0) continue;
      if (seen.has(course.termId)) continue;
      seen.add(course.termId);
      courses.push(course);
    }

    /*
     * 不足一页＝没有下一页（实测结论之外的保单）。满页时看总数：
     * 总数不可用时宁可多取一页空页，也不把第一页当成全部。
     */
    const total = payload.value?.pagination?.total;
    if (rows.length < pageSize) return ok(courses);
    if (typeof total === 'number' && Number.isFinite(total) && fetched >= total) return ok(courses);
  }

  /*
   * 两种「翻到上限」：调用方**明确**限定页数（登录探问）时按取到的返回；
   * 默认上限是保护，撞上它说明表大得超出预期，如实报错，不静默截断。
   */
  if (options.maxPages !== undefined) return ok(courses);
  return err(parseError(`课程列表超过 ${MAX_PAGES} 页，未取全`));
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

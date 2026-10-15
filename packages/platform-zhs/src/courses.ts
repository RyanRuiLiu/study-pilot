/*
 * 共享课列表：读取与合并。
 *
 * 接口形态（2026-10-16 抓包解密核对）：
 *   POST student/course/share/queryShareCourseInfo（首页族 module 13）
 *   载荷 {status: 0, pageNo, pageSize}；响应 result.courseOpenDtos[]
 *   每条给出 courseId / recruitId / courseName / schoolName / progress / secret——
 *   secret 是学习页入口参数（十六进制串），执行与读取都要它。
 *
 * 合并规则与慕课同一条：**只沿用用户做过的勾选，新出现的课程一律不勾**——
 * 刷新一下就把用户没同意过的课拖进任务范围，是错的。
 */

import type { ZhihuishuCourse } from '@study-pilot/application';
import type { ZhsClient } from './client.ts';

/** 平台给出的课程事实（读取那一刻的样子）。 */
export interface ZhsCourseBrief {
  courseId: number;
  recruitId: number;
  /** 学习页入口参数（十六进制串） */
  secret: string;
  name: string;
  schoolName: string;
  /** 平台给出的进度文案（如 "27.2%"） */
  progressText: string;
}

/** 读一次共享课（进行中）。分页给足一页——课程列表按「门」算，几十门封顶。 */
export async function getShareCourses(client: ZhsClient): Promise<ZhsCourseBrief[]> {
  const body = (await client.call('shareCourses', { status: 0, pageNo: 1, pageSize: 50 })) as {
    result?: { courseOpenDtos?: Array<Record<string, unknown>> | null } | null;
  };
  const list = body.result?.courseOpenDtos ?? [];
  return list
    .filter((entry) => typeof entry.courseId === 'number' && typeof entry.recruitId === 'number')
    .map((entry) => ({
      courseId: entry.courseId as number,
      recruitId: entry.recruitId as number,
      secret: typeof entry.secret === 'string' ? entry.secret : '',
      name: typeof entry.courseName === 'string' ? entry.courseName : '',
      schoolName: typeof entry.schoolName === 'string' ? entry.schoolName : '',
      progressText: typeof entry.progress === 'string' ? entry.progress : '',
    }));
}

/**
 * 把新读到的列表并进用户的选择：已勾的沿用勾选，新课程补进来但不勾。
 *
 * 字段以新读的为准（进度、学校名这些是平台随学期变的），
 * 用户只拥有一个字段：enabled。
 */
export function mergeCourses(
  fresh: ZhsCourseBrief[],
  existing: ZhihuishuCourse[],
): ZhihuishuCourse[] {
  const enabledByCourse = new Map(existing.map((course) => [course.courseId, course.enabled]));
  return fresh.map((brief) => ({
    courseId: brief.courseId,
    recruitId: brief.recruitId,
    secret: brief.secret,
    name: brief.name,
    schoolName: brief.schoolName,
    progressText: brief.progressText,
    // 见过的课程沿用勾选；新课程默认不勾
    enabled: enabledByCourse.get(brief.courseId) ?? false,
  }));
}

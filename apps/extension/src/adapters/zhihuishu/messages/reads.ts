/*
 * 智慧树的读取原语：按勾选的课程收集单元表。
 *
 * 课件概要（每门课一行）与待办（逐单元一条）看的是**同一份读取结果**——
 * 都由这里收一次，上层各自映射。各读各的会让设置页一开就发两遍同样的请求，
 * 而两处显示的是同一件事（慕课那边靠 CoursewareSummary 合并也是这个理由）。
 *
 * 一门课读不成（缺入口参数、平台拒绝）不牵连其他课：如实记成 unread，
 * 由各自的呈现层决定怎么说——不拿空数据冒充「这门课没有内容」。
 */

import type { ZhihuishuCourse } from '@study-pilot/application';
import { getCourseUnits, unitItemId, type ZhsClient, type ZhsUnit } from '@study-pilot/platform-zhs';

export interface CourseUnits {
  course: ZhihuishuCourse;
  /** 读成时为单元表；unread 为 true 时是空数组 */
  units: ZhsUnit[];
  /** 这门课没读成的原因（界面如实显示；读成时为 null） */
  unreadReason: string | null;
}

export async function collectUnits(
  client: ZhsClient,
  courses: ZhihuishuCourse[],
): Promise<CourseUnits[]> {
  const results: CourseUnits[] = [];
  for (const course of courses) {
    if (course.secret.length === 0) {
      results.push({ course, units: [], unreadReason: '缺少课程入口参数，先读取课程列表' });
      continue;
    }
    try {
      const units = await getCourseUnits(client, {
        recruitAndCourseId: course.secret,
        recruitId: course.recruitId,
      });
      results.push({ course, units, unreadReason: null });
    } catch (error) {
      results.push({
        course,
        units: [],
        unreadReason: error instanceof Error ? error.message : String(error),
      });
    }
  }
  return results;
}

/** 按课程分组的单元条目（待办与课件共用的形状）。 */
export { unitItemId };

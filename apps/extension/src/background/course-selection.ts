/**
 * 课程列表的合并。
 *
 * 平台每次读取都返回完整列表，而配置里那份还记着用户的勾选。
 * 合并时唯一需要判断的地方是 `enabled`。
 *
 * 抽成纯函数是为了能直接测：这段判断决定后台任务的作用范围，
 * 而它所在的 `refreshCourses` 依赖网络与浏览器存储，测不了。
 */

import type { CourseSummary } from '@study-pilot/platform-mooc';
import type { SelectedCourse } from '../settings';

/**
 * 把平台返回的课程合并成配置里的课程列表。
 *
 * `enabled` 只沿用用户自己做过的选择，**第一次见到的课程一律不勾**。
 *
 * 理由：勾选是一份「哪些课程允许扩展替我动手」的授权名单。一门课正在开课，
 * 只说明它现在可以学，不说明用户愿意让扩展在这门课上提交测验、给同学的
 * 作业打分。按学期时间替他勾上，等于让默认值决定了写入范围。
 *
 * 更早的版本按「学期区间覆盖当下」自动勾选，由此产生过一个用户可见的假象：
 * 点「恢复默认设置」清空课程之后，设置页一打开就重新读取课程列表，
 * 正在开课的那几门又被勾了回来——看起来像恢复默认没生效。
 *
 * 字段归一化在这里一并做：平台未提供的数值记 0，`mode` 记 -1
 * （界面据此不显示类型标签），读取侧因此不必再判空。
 */
export function mergeCourses(
  previous: SelectedCourse[],
  courses: CourseSummary[],
): SelectedCourse[] {
  const chosen = new Map(previous.map((course) => [course.termId, course.enabled]));

  return courses.map((course) => ({
    courseId: course.courseId,
    termId: course.termId,
    name: course.name,
    shortName: course.shortName,
    mode: course.mode ?? -1,
    schoolName: course.schoolName,
    schoolShortName: course.schoolShortName,
    coverUrl: course.coverUrl,
    startTime: course.startTime ?? 0,
    endTime: course.endTime ?? 0,
    lessonsCount: course.lessonsCount ?? 0,
    enrollCount: course.enrollCount ?? 0,
    // 注意 false 也要被沿用：用户取消勾选是一门课的决定，
    // 不能因为「假值」就被当成没记录过而重新赋予默认。
    enabled: chosen.get(course.termId) ?? false,
  }));
}

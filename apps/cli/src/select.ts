/*
 * `courses --select` 的勾选切换（纯函数）。
 *
 * 两个平台同一套语义：多选模型，每门课一个开关，`--select` 是**切换**
 * （再跑一次即反向）。命令行只有这一个动作能同时表达「勾上」与「取消」。
 *
 * 慕课早先按「课程卡片一次只有一门参与」写成单选（勾上它即取消其余）——
 * 那是旧界面的形态；现在扩展的设置页每门课一个勾选框，配置与执行范围都
 * 支持多门同时参与。命令行必须与它一致，否则同一份配置在两个渠道里语义不同。
 */

export interface CourseToggle<T> {
  /** 切换后的完整列表（数组是整体替换的契约，不原地改） */
  courses: T[];
  /** 这门课切换后的参与状态 */
  enabled: boolean;
  /** 列表里有没有这门课 */
  found: boolean;
}

export function toggleCourse<T extends { enabled: boolean }>(
  courses: readonly T[],
  isTarget: (course: T) => boolean,
): CourseToggle<T> {
  const target = courses.find(isTarget);
  if (target === undefined) {
    return { courses: [...courses], enabled: false, found: false };
  }
  const enabled = !target.enabled;
  return {
    courses: courses.map((course) => (isTarget(course) ? { ...course, enabled } : course)),
    enabled,
    found: true,
  };
}

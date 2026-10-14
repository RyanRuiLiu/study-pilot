/*
 * 课件单元 → 自动项。
 *
 * 与 works 不同，课件单元不是「待办」：没有截止时间，不做也不会错过什么，
 * 因此开关关着时直接跳过，不进 manual——把「可以代劳」说成「需要你处理」
 * 会让待办列表变长，而用户并不知道那些其实只是「没开启自动完成」。
 */

import { isCompletable, isUnitComplete } from '../../courseware/index.ts';
import type { SnapshotCourse } from '../read/index.ts';
import type { CoursewareAutoAction } from './types.ts';

/**
 * @param textAvailable 是否具备 AI 文本能力：讨论单元需要它，没有就不进计划，
 *                      否则那会是一条每轮都失败的自动项。
 */
export function planCourseware(
  course: SnapshotCourse,
  textAvailable: boolean,
): CoursewareAutoAction[] {
  const capabilities = { text: textAvailable };
  const auto: CoursewareAutoAction[] = [];

  /*
   * 收下的条件是 isUnitComplete 为假且 isCompletable 为真：
   * 已完成的不必再做，不能上报的（未实测的类型、平台没给时长的视频）
   * 不进计划，否则它们会每轮重现、永远做不掉。
   */
  for (const unit of course.units) {
    if (!isUnitComplete(unit) && isCompletable(unit, capabilities)) {
      auto.push({ kind: 'courseware', course, unit });
    }
  }

  return auto;
}

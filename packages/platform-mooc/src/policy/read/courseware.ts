/*
 * 每门课的课件进度（只读派生）。
 *
 * 课件区要显示「已学 / 总数」与可做数，好让「快速完成」点下去之前心里有数。
 * 判据与执行完全同源：done 用 isUnitComplete、pending 用 isCompletable——
 * 数字因此不会出现「显示 3 项可做、点下去做了 2 项」这类对不上的情况。
 *
 * 纯函数：快照进、计数出。不碰网络也不碰存储，测试零替身。
 */

import { isCompletable, isUnitComplete } from '../../courseware/index.ts';
import type { Snapshot } from './types.ts';

export interface CoursewareProgress {
  courseName: string;
  /** 已完成的单元数 */
  done: number;
  /** 课件单元总数（结构里给出的全部单元） */
  total: number;
  /** 未完成且此刻能做的数——点「快速完成」会做的就是这个数 */
  pending: number;
  /**
   * 未完成但此刻做不了的数：未实测的类型、平台没给时长的视频，
   * 以及没配 AI 时的讨论。界面据此说明「为什么不是全部」。
   */
  cannot: number;
}

/**
 * @param textAvailable 是否具备 AI 文本能力。讨论单元需要它——没有时那些单元
 *                      算「做不了」，与计划层把它们排除在外的判据一致。
 */
export function summarizeCourseware(snapshot: Snapshot, textAvailable: boolean): CoursewareProgress[] {
  const capabilities = { text: textAvailable };
  return snapshot.courses.map((course) => {
    let done = 0;
    let pending = 0;
    for (const unit of course.units) {
      if (isUnitComplete(unit)) done += 1;
      else if (isCompletable(unit, capabilities)) pending += 1;
    }
    return {
      courseName: course.courseName,
      done,
      total: course.units.length,
      pending,
      cannot: course.units.length - done - pending,
    };
  });
}

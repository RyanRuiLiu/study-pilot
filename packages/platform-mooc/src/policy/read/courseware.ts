/*
 * 每门课的课件进度（只读派生）。
 *
 * 课件区要显示「已学 / 总数」与可做数，好让「快速完成」点下去之前心里有数。
 * 判据与执行完全同源：done 用 isUnitComplete、pending 用 isCompletable——
 * 数字因此不会出现「显示 3 项可做、点下去做了 2 项」这类对不上的情况。
 *
 * 纯函数：快照进、计数出。不碰网络也不碰存储，测试零替身。
 */

import { BEHAVIORS, isCompletable, isUnitComplete } from '../../courseware/index.ts';
import type { CourseUnit } from '../../types.ts';
import type { Snapshot } from './types.ts';

/** 这个单元是不是「只差 AI」：类型支持、数据齐全，只是留言需要生成。 */
function needsText(unit: CourseUnit): boolean {
  const behavior = BEHAVIORS.find((entry) => entry.type === unit.contentType);
  return behavior !== undefined && behavior.needs === 'text' && behavior.ready(unit);
}

export interface CoursewareProgress {
  /** 课程学期 id：界面按它把行对齐到设置里的课程（同名不同学期的课不能用名字当键） */
  termId: number;
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
  /**
   * cannot 里「只差 AI」的那部分：讨论单元的留言必须由 AI 写，
   * 没配就走不了。界面据此给出可行动的那句话（去配 AI），
   * 而不是把所有做不了的都笼统称作「平台数据不全」。
   */
  needsAi: number;
  /**
   * 这门课的结构没读到（由调用方补的行，summarizeCourseware 本身不产出）：
   * 从未学过的课平台不回结构，静默跳过会让它从界面上凭空消失——
   * 用户勾选了它却什么都看不到，比看到一行「读不到」更费解。
   */
  unread?: boolean;
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
    let needsAi = 0;
    for (const unit of course.units) {
      if (isUnitComplete(unit)) done += 1;
      else if (isCompletable(unit, capabilities)) pending += 1;
      else if (!textAvailable && needsText(unit)) needsAi += 1;
    }
    return {
      termId: course.termId,
      courseName: course.courseName,
      done,
      total: course.units.length,
      pending,
      cannot: course.units.length - done - pending,
      needsAi,
    };
  });
}

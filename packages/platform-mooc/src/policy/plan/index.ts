/*
 * 由快照派生出「该做什么」。
 *
 * 这是一个纯函数：给定快照与当前时刻，返回能做的、以及只能人工的。
 * 不碰网络、不碰存储，因此可以放心地反复调用，也容易测。
 *
 * 两件事必须分清
 * --------------
 *   能做的  —— 测验作答、互评、自评、课件单元。范围被选中时直接做掉。
 *   只能人工的 —— 作业主观题、已过截止的测验、考试。扩展做不了，
 *                 唯一能做的是列出来让用户自己处理。
 *
 * 早先这里还要看四个开关（用户预授权「允许扩展做哪几类」）。开关已删：
 * 授权移到了点击那一刻——弹窗发起时给 kinds，课件页只给 courseware。
 * 计划层因此只管如实排出「能做的」，不替任何人预授权。
 *
 * 把它们混成一个「待办列表」是之前的问题所在：用户看到「待提交」，
 * 却不知道这一条到底会不会被处理。现在这一点由界面标注（能替你做 / 需要你完成）。
 *
 * 分工：本文件只做遍历与编排；单个工作项见 `work.ts`，课件单元见
 * `courseware.ts`，类型与判据见 `types.ts`，顺序见 `order.ts`。
 */

import { hasTextGenerator, type Settings } from '@study-pilot/application';
import type { Snapshot } from '../read/index.ts';
import { planCourseware } from './courseware.ts';
import { byCheapest } from './order.ts';
import type { AutoAction, ManualItem, Plan } from './types.ts';
import { planWork } from './work.ts';

export * from './types.ts';

/**
 * 派生本轮计划。
 *
 * 能做的都排进来。是否真的执行由调用方选的范围决定（见 application 的
 * round.ts）——那是「谁在点、点了哪一类」的事，与计划无关。
 */
export function derivePlan(
  snapshot: Snapshot,
  settings: Settings,
  now: number = Date.now(),
): Plan {
  const textAvailable = hasTextGenerator(settings);
  const auto: AutoAction[] = [];
  const manual: ManualItem[] = [];

  for (const course of snapshot.courses) {
    for (const work of course.works) {
      const planned = planWork(course, work, now);
      auto.push(...planned.auto);
      manual.push(...planned.manual);
    }

    auto.push(...planCourseware(course, textAvailable));
  }

  auto.sort(byCheapest);
  return { auto, manual };
}

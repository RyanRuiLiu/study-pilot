/*
 * 由快照派生出「该做什么」。
 *
 * 这是一个纯函数：给定快照与当前时刻，返回该自动做的、以及只能人工做的。
 * 不碰网络、不碰存储，因此可以放心地反复调用，也容易测。
 *
 * 两件事必须分清
 * --------------
 *   能自动的  —— 测验作答、互评、自评、课件单元。拉回最新数据确认后立刻做掉。
 *   只能人工的 —— 作业主观题、已过截止的测验、考试。扩展做不了，
 *                 唯一能做的是在合适的时候提醒用户。
 *
 * 把它们混成一个「待办列表」是之前的问题所在：用户看到「待提交」，
 * 却不知道这一条到底会不会被自动处理，因为答案取决于今天是不是执行日。
 *
 * 分工：本文件只做遍历与编排；单个工作项见 `work.ts`，课件单元见
 * `courseware.ts`，类型与判据见 `types.ts`，顺序见 `order.ts`。
 */

import { hasTextGenerator, type Settings } from '@study-pilot/application';
import type { Snapshot } from '../read/index.ts';
import { planCourseware } from './courseware.ts';
import { byCheapest } from './order.ts';
import type { AutoAction, ManualItem, Plan, TaskSwitches } from './types.ts';
import { planWork } from './work.ts';

export * from './types.ts';

function readSwitches(settings: Settings): TaskSwitches {
  return {
    courseware: settings.mooc.background.autoCourseware.enabled,
    quiz: settings.mooc.background.autoQuiz.enabled,
    review: settings.mooc.background.autoReview.enabled,
    self: settings.mooc.background.autoSelfEvaluate.enabled,
  };
}

/**
 * 派生本轮计划。
 *
 * **必须结合功能开关**：把某件事排进 auto 意味着「扩展会去做」，
 * 而这件事只有在对应开关打开时才成立。若不看开关就排进去，
 * 界面会显示「将自动完成」而实际上永远不会发生——
 * 用户既不会收到提醒（因为它被当作自动项），也不会去动手。
 *
 * 关掉的项进 manual 而不是被丢掉：那件事仍然没做，用户仍然要处理，
 * 只是从「扩展代劳」变成「自己动手」。
 */
export function derivePlan(
  snapshot: Snapshot,
  settings: Settings,
  now: number = Date.now(),
): Plan {
  const on = readSwitches(settings);
  const textAvailable = hasTextGenerator(settings);
  const auto: AutoAction[] = [];
  const manual: ManualItem[] = [];

  for (const course of snapshot.courses) {
    for (const work of course.works) {
      const planned = planWork(course, work, on, now);
      auto.push(...planned.auto);
      manual.push(...planned.manual);
    }

    if (on.courseware) auto.push(...planCourseware(course, textAvailable));
  }

  auto.sort(byCheapest);
  return { auto, manual };
}


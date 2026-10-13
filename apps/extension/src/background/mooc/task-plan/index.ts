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

import { hasTextGenerator } from '../../../ai';
import type { Settings } from '../../../settings';
import type { Snapshot } from '../snapshot';
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

/**
 * 是否值得去拉一次最新数据。
 *
 * 判据分三层，从省到费：
 *   1. 当前自动任务全关 → 只会提醒，不会写平台。快照足够，不必拉。
 *      例外：今天还没拉过，那要拉一次，否则快照会越来越旧。
 *   2. 快照里存在「能自动完成」的事项 → 拉。它们是能被消灭的，
 *      而且越早做掉越好。
 *   3. 今天还没拉过 → 拉。这是发现新作业的唯一手段。
 *      本地快照永远不知道今天多了什么。
 *
 * 注意第 1 层：用户把四个自动任务都关掉、只留提醒时，仍然需要每天拉一次。
 * 否则提醒会基于越来越旧的快照，说「还有 2 天」而实际已经截至。
 */
export function shouldRefresh(
  snapshot: Snapshot | null,
  settings: Settings,
  fetchedToday: boolean,
  now: number = Date.now(),
): boolean {
  // 没有快照，什么都判断不了
  if (snapshot === null) return true;

  const taskEnabled =
    settings.mooc.background.autoCourseware.enabled ||
    settings.mooc.background.autoQuiz.enabled ||
    settings.mooc.background.autoReview.enabled ||
    settings.mooc.background.autoSelfEvaluate.enabled;

  if (taskEnabled) {
    // 有能被消灭的事项就去拉，不必等满一天
    const { auto } = derivePlan(snapshot, settings, now);
    if (auto.length > 0) return true;
  }

  // 兜底：每天至少拉一次，用来发现新发布的作业
  return !fetchedToday;
}

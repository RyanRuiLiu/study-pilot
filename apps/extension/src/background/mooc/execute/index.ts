/*
 * 执行：把计划里「能自动完成」的事项做掉。
 *
 * 本文件只负责写，不做「该不该做」的判断——那个判断在 task-plan/ 里，
 * 依据是刚拉回来的快照。这样分开之后，写入的触发条件是显式的：
 * 只有 plan.auto 非空才会走到这里。
 *
 * 执行过程中仍有一些读取（题库、答卷、评测进度），但它们与判断用的读取
 * 性质不同：那些是完成这一件事所必需的，缺了就无法作答或评分。
 * 「为了决定要不要做而读」与「做的时候不得不读」是两回事，前者在 inspect。
 *
 * 逐项落盘
 * --------
 * 每完成一项就回调一次 onProgress，由调用方把结果写进状态。
 * 中途关掉浏览器时，已完成的不会重做。
 *
 * 分工：工作项见 `work.ts`，课件单元见 `courseware.ts`，
 * 题库缓存见 `bank.ts`，结果形状见 `types.ts`。
 */

import type { CoursewareContext, MoocClient } from '@study-pilot/platform-mooc';
import type { AutoAction } from '../task-plan';
import { BankCache } from './bank.ts';
import { runCourseware } from './courseware.ts';
import type { ExecResult } from './types.ts';
import { runQuiz, runReview, runSelf } from './work.ts';

export * from './types.ts';

/**
 * 执行计划里全部可自动完成的事项。
 *
 * 逐项进行，每项完成后回调，由调用方落盘。单项失败不中断整轮——
 * 一门课的接口出错不该让别的课也做不成。
 */
export async function executeActions(
  client: MoocClient,
  actions: AutoAction[],
  evaluatorId: number,
  comment: string,
  onProgress?: (result: ExecResult) => Promise<void>,
  /**
   * 课件行为的上下文（AI 文本生成器）。
   *
   * 由调用方从设置构造：没有配置 AI 时是 undefined，讨论单元本来也不会进计划，
   * 因此这里不必再判空——真出现时行为会如实返回失败。
   */
  courseware: CoursewareContext = {},
): Promise<ExecResult[]> {
  const bank = new BankCache();
  const results: ExecResult[] = [];

  for (const action of actions) {
    let result: ExecResult;
    try {
      if (action.kind === 'courseware') {
        result = await runCourseware(client, action, courseware);
      } else if (action.kind === 'quiz') {
        result = await runQuiz(client, action, bank);
      } else if (action.kind === 'self') {
        result = await runSelf(client, action, evaluatorId, comment);
      } else {
        result = await runReview(client, action, evaluatorId, comment);
      }
    } catch (error) {
      const target =
        action.kind === 'courseware'
          ? { tid: action.unit.unitId, name: action.unit.name }
          : { tid: action.work.tid, name: action.work.name };
      result = {
        ...target,
        kind: action.kind,
        status: 'failed',
        detail: error instanceof Error ? error.message : String(error),
      };
    }

    results.push(result);
    if (onProgress) await onProgress(result);
  }

  return results;
}

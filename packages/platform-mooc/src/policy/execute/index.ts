/*
 * 执行：把计划里「能自动完成」的事项做掉。
 *
 * 本文件只负责写，不做「该不该做」的判断——那个判断在 policy/plan/ 里，
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
 * 结果形状见 `types.ts`。
 */

import { NEVER_STOPPED, type RunControl } from '@study-pilot/application';
import type { MoocClient } from '../../client.ts';
import type { CoursewareContext, DiscussPrep } from '../../courseware/index.ts';
import { prepareDiscussReply } from '../../courseware/discuss.ts';
import { UNIT_TYPE } from '../../types.ts';
import type { AutoAction, CoursewareAutoAction } from '../plan/index.ts';
import { runCourseware } from './courseware.ts';
import type { ExecResult } from './types.ts';
import { runQuiz, runReview, runSelf } from './work.ts';

export * from './types.ts';

/**
 * 讨论预取的并发上限。
 *
 * 2 是保守值：智谱免费档的并发限制窄，而生成走的是 AI 域名、不占平台
 * 那条「串行 + 200ms」的配额。宁可两个两个地做，不冒 429 的险。
 */
const DISCUSS_PREFETCH_CONCURRENCY = 2;

/**
 * 并发预取讨论回复（只读帖 + 生成，不写平台）。
 *
 * 一条 glm-4-flash 生成实测约 5 秒（2026-10-15）——比平台上任何一条请求
 * 都贵，而单元之间没有顺序依赖，串行等它就是白白串起来。发帖不在这里：
 * 写仍然按原顺序逐条走上面的循环。
 */
async function prepareDiscussReplies(
  client: MoocClient,
  actions: CoursewareAutoAction[],
  courseware: CoursewareContext,
  control: RunControl,
): Promise<Map<number, DiscussPrep>> {
  const prepared = new Map<number, DiscussPrep>();
  const queue = [...actions];

  const worker = async (): Promise<void> => {
    for (;;) {
      // 停止键：不再开新的生成（手上正在飞的那一条落地即止）
      if (control.stopped()) return;
      const action = queue.shift();
      if (action === undefined) return;
      if (prepared.has(action.unit.contentId)) continue;
      prepared.set(
        action.unit.contentId,
        await prepareDiscussReply(client, action.unit, courseware, control),
      );
    }
  };

  const workers = Math.min(DISCUSS_PREFETCH_CONCURRENCY, queue.length);
  await Promise.all(Array.from({ length: workers }, worker));
  return prepared;
}

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
  /** 停止柄：长动作在每个安全点问它一句（见 application 的 RunControl） */
  control: RunControl = NEVER_STOPPED,
): Promise<ExecResult[]> {
  const results: ExecResult[] = [];

  /*
   * 讨论的生成先并发预取：AI 不占平台配额、单元间没有顺序依赖，而一条
   * 约 5 秒——这是整轮里最大的单项开销。写（发帖、上报）不在预取里，
   * 仍在下面的循环里逐条串行。
   */
  if (courseware.generateText !== undefined) {
    const discussActions = actions.filter(
      (action): action is CoursewareAutoAction =>
        action.kind === 'courseware' && action.unit.contentType === UNIT_TYPE.DISCUSS,
    );
    if (discussActions.length > 0) {
      courseware = {
        ...courseware,
        preparedReplies: await prepareDiscussReplies(client, discussActions, courseware, control),
      };
    }
  }

  for (const action of actions) {
    let result: ExecResult;
    try {
      if (action.kind === 'courseware') {
        result = await runCourseware(client, action, courseware, control);
      } else if (action.kind === 'quiz') {
        result = await runQuiz(client, action, control);
      } else if (action.kind === 'self') {
        result = await runSelf(client, action, evaluatorId, comment, control);
      } else {
        result = await runReview(client, action, evaluatorId, comment, control);
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

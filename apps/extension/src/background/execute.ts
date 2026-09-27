/*
 * 执行：把计划里「能自动完成」的事项做掉。
 *
 * 本文件只负责写，不做「该不该做」的判断——那个判断在 task-plan.ts 里，
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
 */

import {
  buildAnswerIndex,
  buildAnswers,
  buildEvaluationItems,
  currentEvaluatePhase,
  getEvaluationDetail,
  getHomeworkInfo,
  getHomeworkPaper,
  getQuizBank,
  getQuizPaper,
  nextSubmission,
  saveDraft,
  submitEvaluation,
  submitQuiz,
  type MoocClient,
} from '@study-pilot/platform-mooc';
import type { AutoAction } from './task-plan';

/** 单次执行中互评的循环上限。正常不会触及，仅用于防止接口异常导致死循环。 */
const REVIEW_LOOP_LIMIT = 40;

/**
 * 一项的执行结果。
 *
 * done    已自动完成
 * skipped 时机变了，这次不用做（比如自评已被完成）
 * failed  出错，需要人工看一眼
 */
export interface ExecResult {
  tid: number;
  name: string;
  kind: AutoAction['kind'];
  status: 'done' | 'skipped' | 'failed';
  /** 结果说明，会出现在通知里 */
  detail: string;
}

/**
 * 题库缓存。
 *
 * 按 termId 缓存，一轮之内同一门课只请求一次。题库是整门课的题目加答案，
 * 卷子里每道题都要靠它比对，逐题去查会成倍放大请求量。
 */
class BankCache {
  private readonly loaded = new Map<number, Map<string, boolean>>();

  async get(client: MoocClient, termId: number): Promise<Map<string, boolean> | null> {
    const cached = this.loaded.get(termId);
    if (cached) return cached;

    const bank = await getQuizBank(client, termId);
    if (!bank.ok) return null;

    const index = buildAnswerIndex(bank.value);
    this.loaded.set(termId, index);
    return index;
  }
}

/** 自动完成一个单元测验。 */
async function runQuiz(
  client: MoocClient,
  action: AutoAction,
  bank: BankCache,
): Promise<ExecResult> {
  const base = { tid: action.work.tid, name: action.work.name, kind: action.kind } as const;

  /*
   * 「开始测验」这一步也走接口，不需要人工点。
   * 页面上那个按钮做的事就是调取卷接口并传 aid = 0，
   * 服务端据此为该用户新建一份答题表单。
   * 已有进行中的答卷时返回的就是那一份，没有则新建。
   */
  const paper = await getQuizPaper(client, action.work.tid, 0);
  if (!paper.ok) {
    return { ...base, status: 'failed', detail: `取卷失败：${paper.error.message}` };
  }

  const index = await bank.get(client, action.course.termId);
  if (!index) {
    return { ...base, status: 'failed', detail: '题库读取失败，无法核对答案' };
  }

  const built = buildAnswers(paper.value, index);
  if (built.total === 0) {
    return { ...base, status: 'skipped', detail: '这份答卷没有客观题' };
  }
  if (built.unresolved.length > 0) {
    // 题库覆盖不全时不做部分提交：部分作答会拿到低于预期的分数
    return {
      ...base,
      status: 'failed',
      detail: `${built.unresolved.length} 道题未在题库中找到答案，已跳过以免得到低分`,
    };
  }

  await saveDraft(client, paper.value);
  const submitted = await submitQuiz(client, paper.value);
  if (!submitted.ok) {
    return { ...base, status: 'failed', detail: `提交失败：${submitted.error.message}` };
  }

  return { ...base, status: 'done', detail: `已提交 ${built.total} 道客观题` };
}

/**
 * 自动完成一个作业的自评。
 *
 * 自评与互评走同一套接口，差别只在评的是自己的作业：
 * 评测对象的 evaluateJudgeType 为 3（互评为 2），答卷用对象自带的
 * answerformId，不需要服务端分配。
 *
 * 分数按满分给：自评是给自己的作业打分，平台允许按自己的判断填写。
 */
async function runSelf(
  client: MoocClient,
  action: AutoAction,
  evaluatorId: number,
  comment: string,
): Promise<ExecResult> {
  const base = { tid: action.work.tid, name: action.work.name, kind: action.kind } as const;

  const info = await getHomeworkInfo(client, action.work.tid);
  if (!info.ok) {
    return { ...base, status: 'failed', detail: `读取作业信息失败：${info.error.message}` };
  }

  const phase = currentEvaluatePhase(info.value);
  if (phase !== 2) {
    return { ...base, status: 'skipped', detail: '已不在互评期内' };
  }

  const detail = await getEvaluationDetail(client, action.work.tid, evaluatorId);
  if (!detail.ok) {
    return { ...base, status: 'failed', detail: `读取评测进度失败：${detail.error.message}` };
  }

  const self = detail.value.self;
  if (!self) return { ...base, status: 'skipped', detail: '这份作业没有自评环节' };
  if (self.done) return { ...base, status: 'skipped', detail: '自评已完成' };

  const paper = await getHomeworkPaper(client, action.work.tid, {
    aid: self.answerformId,
    evaluateId: self.evaluateId,
    phase,
  });
  if (!paper.ok) {
    return { ...base, status: 'failed', detail: `取自评答卷失败：${paper.error.message}` };
  }

  const questions = paper.value.subjectiveQList ?? paper.value.objectiveQList ?? [];
  if (questions.length === 0) {
    return { ...base, status: 'skipped', detail: '这份作业没有可评的题目' };
  }

  const items = buildEvaluationItems({ subjectiveQList: questions }, comment);
  const result = await submitEvaluation(client, self.evaluateId, action.work.tid, items);
  if (!result.ok) {
    return { ...base, status: 'failed', detail: `提交自评失败：${result.error.message}` };
  }

  return { ...base, status: 'done', detail: `已提交 ${items.length} 项自评评分` };
}

/**
 * 自动完成一个作业的互评。
 *
 * 完成条件是「已完成份数达到平台要求的配额」，配额由 getEvaluateDetail 的
 * totalEvaluateCount 给出，页面上对应「请至少为 N 份作业进行评分」那句话。
 * 不做固定份数，否则会出现少评而影响成绩。
 */
async function runReview(
  client: MoocClient,
  action: AutoAction,
  evaluatorId: number,
  comment: string,
): Promise<ExecResult> {
  const base = { tid: action.work.tid, name: action.work.name, kind: action.kind } as const;

  const info = await getHomeworkInfo(client, action.work.tid);
  if (!info.ok) {
    return { ...base, status: 'failed', detail: `读取作业信息失败：${info.error.message}` };
  }

  const phase = currentEvaluatePhase(info.value);
  if (phase !== 2) {
    return { ...base, status: 'skipped', detail: '已不在互评期内' };
  }

  const detail = await getEvaluationDetail(client, action.work.tid, evaluatorId);
  if (!detail.ok) {
    return { ...base, status: 'failed', detail: `读取互评进度失败：${detail.error.message}` };
  }

  const { required, remaining } = detail.value;
  if (required === 0) return { ...base, status: 'skipped', detail: '这份作业不需要互评' };
  if (remaining === 0) {
    return { ...base, status: 'skipped', detail: `互评已完成 ${required} / ${required} 份` };
  }

  const paper = await getHomeworkPaper(client, action.work.tid, {
    aid: info.value.aid ?? undefined,
    phase,
  });
  if (!paper.ok) {
    return { ...base, status: 'failed', detail: `取作业答卷失败：${paper.error.message}` };
  }

  const questions = paper.value.subjectiveQList ?? paper.value.objectiveQList ?? [];
  if (questions.length === 0) {
    return { ...base, status: 'skipped', detail: '这份作业没有可评的题目' };
  }

  const items = buildEvaluationItems({ subjectiveQList: questions }, comment);

  const limit = Math.min(remaining, REVIEW_LOOP_LIMIT);
  let completed = 0;

  for (let index = 0; index < limit; index++) {
    const next = await nextSubmission(client, action.work.tid, evaluatorId);
    if (!next.ok) {
      return completed > 0
        ? { ...base, status: 'done', detail: `已评 ${completed} 份，后续取卷失败` }
        : { ...base, status: 'failed', detail: `取待评答卷失败：${next.error.message}` };
    }

    // 服务端不再分配属正常结束：配额已满，或已无人可评
    const submission = next.value.next;
    if (!submission || submission.evaluateId <= 0) break;

    const result = await submitEvaluation(client, submission.evaluateId, action.work.tid, items);
    if (!result.ok) {
      return completed > 0
        ? { ...base, status: 'done', detail: `已评 ${completed} 份，后续提交失败` }
        : { ...base, status: 'failed', detail: `提交互评失败：${result.error.message}` };
    }

    completed++;
  }

  if (completed >= remaining) {
    return { ...base, status: 'done', detail: `已提交 ${completed} 份互评` };
  }

  /*
   * 没评够说明服务端已没有可分配的答卷。
   * 如实报告差多少——这是真实情况，不该说成"已完成"。
   */
  const stillNeeded = remaining - completed;
  if (completed > 0) {
    return {
      ...base,
      status: 'failed',
      detail: `已评 ${completed} 份，还差 ${stillNeeded} 份但暂无可评答卷`,
    };
  }
  return { ...base, status: 'skipped', detail: '当前没有可评的答卷，下次会再试' };
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
): Promise<ExecResult[]> {
  const bank = new BankCache();
  const results: ExecResult[] = [];

  for (const action of actions) {
    let result: ExecResult;
    try {
      if (action.kind === 'quiz') {
        result = await runQuiz(client, action, bank);
      } else if (action.kind === 'self') {
        result = await runSelf(client, action, evaluatorId, comment);
      } else {
        result = await runReview(client, action, evaluatorId, comment);
      }
    } catch (error) {
      result = {
        tid: action.work.tid,
        name: action.work.name,
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

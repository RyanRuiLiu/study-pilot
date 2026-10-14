/*
 * 作业、测验、考试上的自动项：答题、自评、互评。
 *
 * 三条路都返回 `ExecResult`，不抛异常；成败都如实写在 `detail` 里，
 * 因为它会原样出现在通知中。
 */

import {
  buildAnswers,
  buildEvaluationItems,
  currentEvaluatePhase,
  getEvaluationDetail,
  getHomeworkInfo,
  getHomeworkPaper,
  getQuizPaper,
  nextSubmission,
  submitEvaluation,
  submitQuiz,
  type MoocClient,
} from '@study-pilot/platform-mooc';
import type { WorkAutoAction } from '../plan';
import type { BankCache } from './bank.ts';
import type { ExecResult } from './types.ts';

/** 单次执行中互评的循环上限。正常不会触及，仅用于防止接口异常导致死循环。 */
const REVIEW_LOOP_LIMIT = 40;

/** 自动完成一个单元测验。 */
export async function runQuiz(
  client: MoocClient,
  action: WorkAutoAction,
  bank: BankCache,
): Promise<ExecResult> {
  const base = { tid: action.work.tid, name: action.work.name, kind: action.kind } as const;

  /*
   * 先读题库，再开卷。
   *
   * 取卷带 `aid = 0`，服务端据此为该用户**新建一份答题表单**——这一步已经落在
   * 平台上了，撤不回来。把它放在题库核对之前，就会出现「开卷后发现答案凑不齐、
   * 于是放弃」：那份卷还留着，用户自己去做时看到的是已经开好的卷子。
   * 读取题库没有副作用，所以它先走。计划阶段对 `startOneSubmissionEvaluate`
   * 用的是同一条判据（见 plan/work.ts 里的说明）。
   */
  const index = await bank.get(client, action.course.termId);
  if (!index) {
    return { ...base, status: 'failed', detail: '题库读取失败，无法核对答案' };
  }

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
export async function runSelf(
  client: MoocClient,
  action: WorkAutoAction,
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
export async function runReview(
  client: MoocClient,
  action: WorkAutoAction,
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
      /*
       * 已经评了几份就如实报几份，但结局是 failed：配额没评够就不是完成。
       * 记成 done 会让三处一起说谎——通知说「已完成」、本轮计数把它算进成功、
       * 运行记录里那一行也标成绿。用户看到的是一个还差着份数的作业。
       */
      return {
        ...base,
        status: 'failed',
        detail:
          completed > 0
            ? `已评 ${completed} 份，后续取卷失败：${next.error.message}`
            : `取待评答卷失败：${next.error.message}`,
      };
    }

    // 服务端不再分配属正常结束：配额已满，或已无人可评
    const submission = next.value.next;
    if (!submission || submission.evaluateId <= 0) break;

    const result = await submitEvaluation(client, submission.evaluateId, action.work.tid, items);
    if (!result.ok) {
      // 同上：评够之前的任何一次失败都不是完成
      return {
        ...base,
        status: 'failed',
        detail:
          completed > 0
            ? `已评 ${completed} 份，后续提交失败：${result.error.message}`
            : `提交互评失败：${result.error.message}`,
      };
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

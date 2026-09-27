/**
 * 单元测验。
 *
 * 提交流程（由真实请求样本 save-draft-real.json 与 submit-real.json 对照得出）：
 *
 * 1. 取卷 `getQuizPaper(tid, aid = 0)`。`aid` 传 0 时服务端会创建答题表单并返回真实 aid。
 * 2. 用题库答案构造 `answers`，形如 `[{ qid, type, optIds, time }]`。
 * 3. 保存草稿 `saveDraft(paper)`，此时请求**携带** answers。
 * 4. 提交 `submitQuiz(paper)`，此时请求的 `answers` 为 **null**、`submitType` 为 **1**。
 *
 * 第 3、4 步的差异是这套接口最容易写错的地方：提交请求不携带答案，
 * 答案由服务端从草稿读取。把带答案的对象直接交给提交接口会被判为无效提交。
 *
 * 答案匹配的难点：试卷题目的 id 与题库题目的 id 属于**不同空间**，
 * 不能直接对应。可行做法是先按题干文本匹配题目，再按选项文本匹配选项，
 * 得到选项在**试卷侧**的 id。
 */

import { ok, type Result } from '@study-pilot/core';
import type { TransportError } from '@study-pilot/transport';
import type { MoocClient } from './client.ts';
import { ENDPOINTS } from './endpoints.ts';
import type {
  BankQuestion,
  PaperAnswer,
  QuizAnswerForm,
  QuizInfo,
  QuizPaper,
} from './types.ts';

// ---------- 取数 ----------

export async function getQuizInfo(
  client: MoocClient,
  tid: number,
): Promise<Result<QuizInfo, TransportError>> {
  return client.rpc.call<QuizInfo>(ENDPOINTS.quizInfo.bean, ENDPOINTS.quizInfo.method, {
    tid,
    targetAid: null,
    isDraft: false,
  });
}

/** 开考信息。响应顶层的 `aid` 才是当前活跃答卷。 */
export interface OpenQuizInfo {
  tid: number | string;
  /**
   * 当前未完成的答卷 id。这是读写作答时应当使用的 aid。
   *
   * 注意不要用 `targetAnswerform.aid` 代替它：后者是最近一次**已提交**的记录，
   * 与当前答卷不是同一份。用错 aid 会导致写入落到另一份答卷上，
   * 表现为「保存返回成功但页面看不到」。
   */
  aid?: number | null;
  targetAnswerform?: QuizAnswerForm | null;
  totalTryCount?: number | null;
  usedTryCount?: number | null;
  [key: string]: unknown;
}

/**
 * 取测验的开考信息。页面进入做题页时调用的就是这个接口。
 */
export async function getOpenQuizInfo(
  client: MoocClient,
  tid: number,
): Promise<Result<OpenQuizInfo, TransportError>> {
  return client.rpc.call<OpenQuizInfo>(
    ENDPOINTS.openQuizInfo.bean,
    ENDPOINTS.openQuizInfo.method,
    { tid, targetAid: null, isDraft: false },
  );
}

/** 取整门课题库，含标准答案。 */
export async function getQuizBank(
  client: MoocClient,
  termId: number,
): Promise<Result<BankQuestion[], TransportError>> {
  const payload = await client.rpc.call<BankQuestion[]>(
    ENDPOINTS.quizBank.bean,
    ENDPOINTS.quizBank.method,
    { termId },
  );
  if (!payload.ok) return payload;
  return ok(payload.value ?? []);
}

/**
 * 取测验试卷。
 *
 * `aid` 传 0 时服务端会为该用户创建一份答题表单；传已有 aid 则返回该次答卷，
 * 属于纯读取。
 */
export async function getQuizPaper(
  client: MoocClient,
  tid: number,
  aid = 0,
): Promise<Result<QuizPaper, TransportError>> {
  return client.rpc.call<QuizPaper>(ENDPOINTS.quizPaper.bean, ENDPOINTS.quizPaper.method, {
    tid,
    aid,
    withStdAnswerAndAnalyse: false,
  });
}

// ---------- 答案构造 ----------

/** 选项 id 到该选项是否为正确答案。 */
export type AnswerIndex = Map<string, boolean>;

/**
 * 由题库建立「选项 id 到是否为正确答案」的索引。
 *
 * 选项 id 全局唯一（实测 1040 个选项无重复），因此不需要按题目分组，
 * 也不需要先把题库题目与试卷题目对应起来。
 */
export function buildAnswerIndex(bank: BankQuestion[]): AnswerIndex {
  const index = new Map<string, boolean>();
  for (const question of bank) {
    for (const option of question.optionDtos ?? []) {
      index.set(String(option.id), option.answer === true);
    }
  }
  return index;
}

export interface BuildAnswersResult {
  /** 成功构造答案的题目数 */
  matched: number;
  /** 试卷上的客观题总数 */
  total: number;
  /** 未能在索引中找到答案的题目 id，出现即说明题库与试卷不匹配 */
  unresolved: number[];
}

/**
 * 用选项 id 索引填充 `paper.answers`，返回匹配统计。
 *
 * 试卷选项 id 与题库选项 id 属于同一空间，因此直接按 id 查答案即可。
 * 不需要匹配题干，也就不受富文本标签、选项乱序、以及判断题没有选项文本的影响。
 *
 * 就地修改 `paper.answers`，因为后续的 `saveDraft` 需要同一个对象。
 */
export function buildAnswers(
  paper: QuizPaper,
  answerIndex: AnswerIndex,
  now: number = Date.now(),
): BuildAnswersResult {
  const questions = paper.objectiveQList ?? [];
  const answers: PaperAnswer[] = [];
  const unresolved: number[] = [];

  for (const question of questions) {
    const optIds = (question.optionDtos ?? [])
      .filter((option) => answerIndex.get(String(option.id)) === true)
      .map((option) => option.id);

    if (optIds.length === 0) {
      unresolved.push(question.id);
      continue;
    }

    answers.push({
      qid: question.id,
      type: question.type,
      optIds,
      time: now,
    });
  }

  paper.answers = answers;
  return { matched: answers.length, total: questions.length, unresolved };
}

// ---------- 写操作 ----------
//
// 以下两个函数会改变服务端状态。调用前请确认目标单元已过期且已提交，
// 具体约束见 docs/development.md。
//
// 请求体形态来自页面源码（core.js 偏移 1523207 的 COM_Cache_TestBaseCache）：
//
//   r._$saveDraftAnswers = function(t, n, i){
//     e._$request({
//       url: "/web/j/mocQuizRpcBean.saveDraftAnswers.rpc",
//       method: "post",
//       data: JSON.stringify({ paperDto: t, preview: n }),
//       isNeedAuth: !0,
//     })
//   };
//
//   r._$submitAnswers = function(t, n){
//     t.answers.forEach(...)                      // 仅清理 emoji，不置 null
//     e._$request({
//       url: "/web/j/mocQuizRpcBean.submitAnswers.rpc",
//       data: JSON.stringify({ paperDto: t, preview: n }),
//       isNeedAuth: !0,
//     })
//   };
//
// 两个接口的请求体都是 { paperDto, preview }，**preview 不可省略**；
// 且提交时 answers 保留原样，并不清空。

/**
 * 保存草稿。请求携带 `answers`，答案由此落到服务端答题表单。
 */
export async function saveDraft(
  client: MoocClient,
  paper: QuizPaper,
): Promise<Result<void, TransportError>> {
  const payload = await client.rpc.call<unknown>(
    ENDPOINTS.saveDraft.bean,
    ENDPOINTS.saveDraft.method,
    { paperDto: paper, preview: false },
  );
  if (!payload.ok) return payload;
  return ok(undefined);
}

/**
 * 提交试卷。
 *
 * 沿用取卷时服务端返回的表单对象，只补上 `submitType`。
 * 页面在提交前把 `submitType` 设为 `NORMAL`，其值为 1
 * （同一 bundle 内 `var u = { NORMAL: 1, AUTO: 2, CHEAT: 3 }`）。
 */
export async function submitQuiz(
  client: MoocClient,
  paper: QuizPaper,
): Promise<Result<void, TransportError>> {
  const payload: QuizPaper = {
    ...paper,
    submitType: paper.submitType ?? 1,
  };
  const result = await client.rpc.call<unknown>(
    ENDPOINTS.submitQuiz.bean,
    ENDPOINTS.submitQuiz.method,
    { paperDto: payload, preview: false },
  );
  if (!result.ok) return result;
  return ok(undefined);
}

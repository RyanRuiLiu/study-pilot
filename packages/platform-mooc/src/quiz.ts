/**
 * 单元测验（随堂测验与章节测验同一条路径）。
 *
 * 提交流程（页面源码 `COM_Cache_TestBaseCache` + 本仓库实测）：
 *
 * 1. 取卷 `getQuizPaper(tid, aid = 0)`。`aid` 传 0 时服务端会创建答题表单并返回真实 aid；
 *    真实提交要传 `getOpenQuizInfo` 顶层的 aid。取卷**带 `withStdAnswerAndAnalyse: true`**
 *    ——在该模式下答案随卷面一起下发（见下）。
 * 2. **答案来自卷面自身**（2026-10-17 换接口，Ryan 定；实测多门课逐字节核对过）：
 *      · 选择类（单选/多选/判断）：`optionDtos[].answer === true` 即正确答案，
 *        选项 id 与旧的题库口径一致（抽样 14/14 吻合）；
 *      · 填空类：`stdAnswer` 为标准答案文本（如「时间」）。
 *    不再有题库 RPC、全局选项索引与跨源匹配——旧链路（getQuestionListByTermId +
 *    按 id 索引）已随本次换接口退役。卷面既没有正确标记也没有标准答案的题
 *    **如实计为取不到答案**，不猜、不用题干文本匹配（Ryan：禁止不确定的匹配）。
 * 3. `answers` 形状（客户端源码 + 真机提交回读双重取证，2026-10-17）：
 *    选择类 `[{ qid, type, optIds: [选项 id…], time }]`；
 *    填空类 `[{ qid, type, optIds: null, content: { content: '标准答案', attachments: null }, time }]`。
 *    出处：学习端测验 UI 分块（97580.*.chunk.js）的答案格式化函数——
 *    `填空/主观/OJ ? (content || {}) : (optIds || [])`（`pnpm probe src grep optIds` 可复现）。
 * 4. 提交 `submitQuiz(paper)`：请求体 `{paperDto, preview}`，**answers 原样保留**
 *    （页面只对 `content` 做一次 emoji 清理），`submitType` 为 1。
 *
 * `saveDraft(paper)` 是可选旁路，提交不依赖它：实测草稿写入在真实账号上不生效，
 * 而提交体携带的 answers 有效——实测一次提交
 * 13 道题全部计入成绩。早期文档「提交不携带答案、answers 为 null」与页面源码冲突，已作废。
 */

import { ok, type Result } from '@study-pilot/core';
import type { TransportError } from '@study-pilot/transport';
import type { MoocClient } from './client.ts';
import { ENDPOINTS } from './endpoints.ts';
import type { PaperAnswer, QuizAnswerForm, QuizInfo, QuizPaper } from './types.ts';

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
  /*
   * withStdAnswerAndAnalyse: true —— 答案随卷面下发（选项正确标记 + 填空 stdAnswer）。
   * 固定 true 是取超集：实测存在只有 true 才给填空 stdAnswer 的卷（模电，2026-10-17）。
   */
  return client.rpc.call<QuizPaper>(ENDPOINTS.quizPaper.bean, ENDPOINTS.quizPaper.method, {
    tid,
    aid,
    withStdAnswerAndAnalyse: true,
  });
}

// ---------- 答案构造 ----------

export interface BuildAnswersResult {
  /** 成功构造答案的题目数 */
  matched: number;
  /** 试卷上的客观题总数 */
  total: number;
  /** 取不到答案（无正确标记、也无标准答案）的题目 id */
  unresolved: number[];
}

/**
 * 从卷面自身构造 `paper.answers`，返回匹配统计。
 *
 * 答案与题目在同一个对象上（取卷已带 withStdAnswerAndAnalyse，见 getQuizPaper）：
 *   · 选择类：选项上的 `answer === true`；
 *   · 填空类：题目的 `stdAnswer` 文本。
 * 两者都没有的题计入 `unresolved`——调用方据此如实失败，不猜。
 *
 * 就地修改 `paper.answers`，因为提交（以及可选的草稿保存）读的是同一个对象。
 */
export function buildAnswers(paper: QuizPaper, now: number = Date.now()): BuildAnswersResult {
  const questions = paper.objectiveQList ?? [];
  const answers: PaperAnswer[] = [];
  const unresolved: number[] = [];

  for (const question of questions) {
    const optIds = (question.optionDtos ?? [])
      .filter((option) => option.answer === true)
      .map((option) => option.id);

    if (optIds.length > 0) {
      answers.push({ qid: question.id, type: question.type, optIds, time: now });
      continue;
    }

    // 填空类：标准答案文本在卷面题目上（形状取自真机提交的回读，见文件头）
    const std = typeof question.stdAnswer === 'string' ? question.stdAnswer.trim() : '';
    if (std !== '') {
      answers.push({
        qid: question.id,
        type: question.type,
        optIds: null,
        content: { content: std, attachments: null },
        time: now,
      });
      continue;
    }

    unresolved.push(question.id);
  }

  paper.answers = answers;
  return { matched: answers.length, total: questions.length, unresolved };
}

// ---------- 写操作 ----------
//
// 以下两个函数会改变服务端状态。调用前请确认目标单元已过期且已提交。
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
 * 取一份既有答卷的题目（连同答案），供「查看答案」用。
 *
 * 统一用于测验与考试（客观题）：两者共用 mocQuizRpcBean 一族——
 *   ① `getQuizInfo(tid)` 顶层的 `targetAnswerform.aid` 是当前活跃/最近一份答卷；
 *      从未作答时为 null（没有既有答卷就如实说明，不新开一份：开卷在考试上是
 *      「开始考试」的副作用，绝不能为看答案触发）。
 *   ② 用该 aid 取卷并带 `withStdAnswerAndAnalyse: true`：对已存在的答卷是纯读，
 *      答案随卷面下发（选项标记 / stdAnswer / 主观题 analyse）。
 *
 * 门控如实呈现：平台在未到放答案的时点不会给答案（卷面没有标记），
 * 调用方据 `unanswered` / 无答案计数如实显示，绝不猜。
 *
 * @param aid 指定看哪一份答卷（考试页 URL 里的 targetAid）；缺省取 targetAnswerform。
 */
export async function loadSubmittedPaper(
  client: MoocClient,
  tid: number,
  aid?: number,
): Promise<
  | { ok: true; aid: number; paper: QuizPaper }
  | { ok: false; reason: 'no-submission' | 'fetch-failed'; message: string }
> {
  let targetAid = aid ?? null;
  if (targetAid === null) {
    const info = await getQuizInfo(client, tid);
    if (!info.ok) {
      return { ok: false, reason: 'fetch-failed', message: info.error.message };
    }
    const form = (info.value as { targetAnswerform?: { aid?: unknown } | null }).targetAnswerform;
    const candidate = typeof form?.aid === 'number' ? form.aid : null;
    if (candidate === null) {
      return { ok: false, reason: 'no-submission', message: '还没有作答过，没有可查看的答卷' };
    }
    targetAid = candidate;
  }

  const paper = await getQuizPaper(client, tid, targetAid);
  if (!paper.ok) {
    return { ok: false, reason: 'fetch-failed', message: paper.error.message };
  }
  return { ok: true, aid: targetAid, paper: paper.value };
}

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

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

import { err, ok, type Result } from '@study-pilot/core';
import { apiError, type TransportError } from '@study-pilot/transport';
import type { MoocClient } from './client.ts';
import { ENDPOINTS } from './endpoints.ts';
import type { PaperAnswer, PaperQuestion, QuizAnswerForm, QuizInfo, QuizPaper } from './types.ts';

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

// ---------- 题库（未提交的卷的答案来源） ----------

/**
 * 整门课的题库（每题带选项与正确性）。参数 `{termId}`。
 *
 * 为什么留着它：平台对答案分两道门（2026-10-17 实测，同门课对照）——
 *   · **随堂测验**（课件里的练习）：未作答的卷也随卷下发答案；
 *   · **单元测验**（测验与作业里的计分测验）：提交前一份答案都不给
 *     （进行中的卷 submitStatus=1，withStdAnswerAndAnalyse=true 也只回 null；
 *     现开一份新卷同样为 null）。
 * 题库与作答状态无关，是单元测验在提交前的答案来源。两边的**选项 id 属于同一
 * 空间**（全站唯一，实测题库里能查到卷面每个选项的 id），因此按选项 id 查即可，
 * 不需要题干匹配，也不受富文本与选项乱序影响。
 *
 * 覆盖不到的地方如实承认：题库里没有的新题、以及以图片为内容的选项（答案是
 * 选项字母，不是文字）。
 */
export async function getQuizBank(
  client: MoocClient,
  termId: number,
): Promise<Result<PaperQuestion[], TransportError>> {
  const payload = await client.rpc.call<PaperQuestion[]>(
    ENDPOINTS.quizBank.bean,
    ENDPOINTS.quizBank.method,
    { termId },
  );
  if (!payload.ok) return payload;
  // code=0 但回的不是数组（实测少见）：如实失败，不拿它去迭代
  if (!Array.isArray(payload.value)) return err(apiError(-1, '题库返回的形状不是题目列表'));
  return ok(payload.value);
}

/** 选项 id → 是否为正确答案。 */
export type AnswerIndex = Map<string, boolean>;

/** 由题库建立「选项 id → 是否为正确答案」。选项 id 全站唯一，不必按题目分组。 */
export function buildAnswerIndex(bank: PaperQuestion[]): AnswerIndex {
  const index = new Map<string, boolean>();
  for (const question of bank) {
    for (const option of question.optionDtos ?? []) {
      index.set(String(option.id), option.answer === true);
    }
  }
  return index;
}

/** 这道题卷面上有没有答案（正确选项标记，或填空类的标准答案）。 */
export function hasAnswer(question: PaperQuestion): boolean {
  if ((question.optionDtos ?? []).some((option) => option.answer === true)) return true;
  return typeof question.stdAnswer === 'string' && question.stdAnswer.trim() !== '';
}

/**
 * 用题库给**卷面没带答案**的题补上正确标记（按选项 id 查）。
 *
 * 卷面已经带答案的题原样保留：卷面是本次作答的权威，题库只补未提交时的缺口。
 * 题库里也查不到的题原样返回（仍是没有答案），由调用方如实呈现，不猜。
 * 返回新对象，不改服务端响应本身。
 */
export function fillAnswersFromBank(
  questions: PaperQuestion[],
  index: AnswerIndex,
): PaperQuestion[] {
  return questions.map((question) => {
    if (hasAnswer(question)) return question;

    const options = question.optionDtos ?? [];
    const known = options.some((option) => index.has(String(option.id)));
    if (!known) return question;

    return {
      ...question,
      optionDtos: options.map((option) => ({
        ...option,
        answer: index.get(String(option.id)) ?? null,
      })),
    };
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
export interface BuildAnswersOptions {
  /** 卷面没带答案的题用题库补（未提交的单元测验就没有答案，见 getQuizBank）。 */
  answerIndex?: AnswerIndex;
  now?: number;
}

export function buildAnswers(paper: QuizPaper, options: BuildAnswersOptions = {}): BuildAnswersResult {
  const now = options.now ?? Date.now();
  const questions =
    options.answerIndex === undefined
      ? (paper.objectiveQList ?? [])
      : fillAnswersFromBank(paper.objectiveQList ?? [], options.answerIndex);
  // 补过答案后写回卷面：提交读的是卷面上的这一份
  if (options.answerIndex !== undefined) paper.objectiveQList = questions;
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

/**
 * 构造提交用的答案：卷面自带答案直接用，缺的用题库按选项 id 补。
 *
 * 随堂测验的卷面自带答案，这一步不会读题库；单元测验的卷面不带，就读题库补。
 * 补完仍缺的题如实计入 unresolved——调用方据此不提交，不猜。
 */
export async function buildAnswersWithBank(
  client: MoocClient,
  termId: number,
  paper: QuizPaper,
  now: number = Date.now(),
): Promise<Result<BuildAnswersResult, TransportError>> {
  const questions = paper.objectiveQList ?? [];
  if (!questions.some((question) => !hasAnswer(question))) {
    return ok(buildAnswers(paper, { now }));
  }

  const bank = await getQuizBank(client, termId);
  if (!bank.ok) return bank;
  return ok(buildAnswers(paper, { answerIndex: buildAnswerIndex(bank.value), now }));
}

/** 响应顶层的 aid（当前活跃答卷）。0 或缺失表示没有。 */
function aidOf(value: unknown): number | null {
  const aid = (value as { aid?: unknown } | null | undefined)?.aid;
  return typeof aid === 'number' && aid > 0 ? aid : null;
}

// ---------- 做题助手：填充用的选项索引 ----------

/**
 * 填充助手用的索引：选项 id → 是否为正确答案。
 *
 * 两个来源按优先级合并（卷面是自己的权威，题库补未提交时的缺口）：
 *   · 先铺**题库**（跨次作答可用，单元测验在提交前只有它有答案）；
 *   · 再用**页面当前这份卷**自己的标记覆盖（本次作答的权威；随堂测验的卷面带答案）。
 *
 * 只读：当前卷取 `getQuizInfo` 顶层的 aid（页面正在做的那份）。**绝不 aid = 0**——
 * 那会在服务端新建一份答题表单，等价于点「开始测验」。
 */
export async function buildFillIndex(
  client: MoocClient,
  tid: number,
  termId: number,
): Promise<Result<AnswerIndex, TransportError>> {
  const index = new Map<string, boolean>();

  const bank = await getQuizBank(client, termId);
  if (!bank.ok) return bank;
  for (const [optionId, correct] of buildAnswerIndex(bank.value)) index.set(optionId, correct);

  const info = await getQuizInfo(client, tid);
  if (!info.ok) return info;

  const aid = aidOf(info.value);
  if (aid !== null) {
    const paper = await getQuizPaper(client, tid, aid);
    if (!paper.ok) return paper;
    for (const question of paper.value.objectiveQList ?? []) {
      for (const option of question.optionDtos ?? []) {
        if (option.answer === true || option.answer === false) {
          index.set(String(option.id), option.answer);
        }
      }
    }
  }

  return ok(index);
}

// ---------- 作答并提交（唯一实现） ----------

/**
 * 一次「作答并提交」的结果。
 *
 * 做成判别联合而不是「错误文本」：调用方要按结果决定状态（提交了=完成、
 * 没有客观题=跳过、取不到答案=失败），靠字符串比对来区分是脆的。
 */
export type QuizSubmitOutcome =
  | { status: 'submitted'; matched: number; total: number }
  | { status: 'stopped'; matched: number; total: number }
  | { status: 'no-objective' }
  | { status: 'failed'; message: string };

export interface QuizSubmitHooks {
  /**
   * 提交前最后一道闸。返回 false 则中止（不再提交）。
   * 无人值守的执行传停止键；用户点按钮的场景不需要。
   */
  beforeSubmit?: () => boolean;
}

/**
 * 作答并提交一份测验。
 *
 * **唯一实现**：无人值守的自动执行与做题助手的「提交答案」按钮都走这里，
 * 不允许在别处再写一份（两处的判据——主观题守卫、取不到答案不交——必须一致）。
 *
 * 步骤：取卷（`aid = 0`；已有进行中的答卷时返回的就是那一份）→ 含主观题不交
 * （只交客观部分=残缺答卷）→ 组答案（卷面自带优先，缺的用题库按选项 id 补）→
 * 有题取不到答案就**一道都不交**（部分作答会拿到低于预期的分数）→ 提交。
 */
export async function answerAndSubmitQuiz(
  client: MoocClient,
  tid: number,
  termId: number,
  hooks: QuizSubmitHooks = {},
): Promise<QuizSubmitOutcome> {
  const paper = await getQuizPaper(client, tid, 0);
  if (!paper.ok) return { status: 'failed', message: `取卷失败：${paper.error.message}` };

  const subjective = (paper.value.subjectiveQList ?? []).length;
  if (subjective > 0) {
    return { status: 'failed', message: `这份测验含 ${subjective} 道主观题，需人工作答，不自动提交` };
  }

  const builtResult = await buildAnswersWithBank(client, termId, paper.value);
  if (!builtResult.ok) return { status: 'failed', message: `取答案失败：${builtResult.error.message}` };
  const built = builtResult.value;

  if (built.total === 0) return { status: 'no-objective' };
  if (built.unresolved.length > 0) {
    return {
      status: 'failed',
      message: `${built.unresolved.length} 道题取不到答案（卷面既无正确选项标记、也无标准答案），已跳过以免得到低分`,
    };
  }

  if (hooks.beforeSubmit !== undefined && !hooks.beforeSubmit()) {
    return { status: 'stopped', matched: built.matched, total: built.total };
  }

  const submitted = await submitQuiz(client, paper.value);
  if (!submitted.ok) return { status: 'failed', message: `提交失败：${submitted.error.message}` };

  return { status: 'submitted', matched: built.matched, total: built.total };
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

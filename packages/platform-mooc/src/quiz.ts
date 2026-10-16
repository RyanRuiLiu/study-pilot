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

/*
 * 卷面 + 题库 → 带答案的题（**唯一实现**）
 * -----------------------------------------
 * 填充（做题助手）与提交（一键执行、面板的提交按钮）都从这里取答案，
 * 不允许在别处再写一套补缺——两处曾经各写一遍，一道题在两处会得到不同的答案。
 *
 * 规则只有一条：**卷面自带的答案是权威**（本次作答的事实）；卷面没带的
 * （未提交的单元测验，平台在提交前不给），用题库按**该题型自己的键**补齐：
 *
 *   选择类 / 判断题 —— 选项 id。选项 id 全站唯一，题库与卷面同一空间
 *     （实测：本卷 9 道选择/判断全部命中，且命中的题库题 testId 都等于本卷）。
 *   填空类 —— **同卷题号**。填空题没有选项，选项 id 这条键用不上；题库题的
 *     `testId` 是它归属的那份卷、`position` 是该卷内的题号，实测与本卷题
 *     一一对应（军事理论第二章单元测验 12/12，含 3 道填空题的 stdAnswer）。
 *     **不需要、也不允许用题干文本去匹配**（Ryan 定）。
 *
 * 两条键都取不到的题保持没有答案，由调用方如实处理（提交时计入 unresolved，不猜）。
 */

/**
 * 填空题标准答案里表示「多个可接受答案」的分隔符。
 *
 * 名字与值都取自平台源码（pub/s/core.js:18961、rc/main/assets 分块:1843）：
 *   FILL_BLANK_SPLITCHAR: "##%_YZPRLFH_%##"
 *   FILL_BLANK_SPLITCHARREG: /(##%_YZPRLFH_%##)/g
 *   展示时 C = f.stdAnswer?.split(s.FILL_BLANK_SPLITCHAR) || [];
 *         N = C.length ? C.join("或") : f.stdAnswer;   // 「马其诺或马奇诺」
 * 即：这是「同义答案」，学生填其中任一个都算对；提交取第一个。
 */
const FILL_BLANK_SPLITCHAR = '##%_YZPRLFH_%##';

/** 取填空题标准答案里的第一个可接受答案（平台展示为「甲或乙」时取「甲」）。 */
export function firstFillAnswer(stdAnswer: string): string {
  return stdAnswer.split(FILL_BLANK_SPLITCHAR)[0]?.trim() ?? '';
}

/** 这道题有没有答案（正确选项标记，或标准答案文本）。 */
export function hasAnswer(question: PaperQuestion): boolean {
  if ((question.optionDtos ?? []).some((option) => option.answer === true)) return true;
  return typeof question.stdAnswer === 'string' && question.stdAnswer.trim() !== '';
}

/**
 * 把题库的答案并进卷面（**唯一实现**；规则见本段文件头）。
 *
 * 索引建一次（选项 id → 题；「同卷题号」→ 题），再逐题查——题库最大见过
 * 一千三百多题，逐题全表扫是 O(n×m)。
 * 卷面已带答案的题原样保留；没带的按题型各自的键到题库取；再取不到就不给。
 * 返回新对象，不改服务端响应。
 */
export function resolveAnswers(
  questions: PaperQuestion[],
  bank: PaperQuestion[],
  tid: number,
): PaperQuestion[] {
  const byOptionId = new Map<string, PaperQuestion>();
  const bySameTestPosition = new Map<number, PaperQuestion>();
  for (const entry of bank) {
    for (const option of entry.optionDtos ?? []) byOptionId.set(String(option.id), entry);
    if (entry.testId === tid && typeof entry.position === 'number') {
      bySameTestPosition.set(entry.position, entry);
    }
  }

  return questions.map((question) => {
    if (hasAnswer(question)) return question;

    const options = question.optionDtos ?? [];

    // 填空类：按「同卷题号」取库中题的 stdAnswer（填空题没有选项，选项 id 这条键用不上）
    if (options.length === 0) {
      if (typeof question.position !== 'number') return question;
      const fromBank = bySameTestPosition.get(question.position);
      const answer = typeof fromBank?.stdAnswer === 'string' ? firstFillAnswer(fromBank.stdAnswer) : '';
      return answer === '' ? question : { ...question, stdAnswer: answer };
    }

    // 选择类 / 判断题：按选项 id 找库中同题，再把标记逐一抄到卷面选项上
    const fromBank = options
      .map((option) => byOptionId.get(String(option.id)))
      .find((entry) => entry !== undefined);
    if (fromBank === undefined) return question;

    const marks = new Map(
      (fromBank.optionDtos ?? []).map((option) => [String(option.id), option.answer ?? null]),
    );
    if (!options.some((option) => marks.has(String(option.id)))) return question;
    return {
      ...question,
      optionDtos: options.map((option) => ({
        ...option,
        answer: marks.get(String(option.id)) ?? null,
      })),
    };
  });
}

/** 整卷是否都已经有答案（都齐了就不必读题库）。 */
export function paperHasAllAnswers(questions: PaperQuestion[]): boolean {
  return questions.every((question) => hasAnswer(question));
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
  now?: number;
}

export function buildAnswers(paper: QuizPaper, options: BuildAnswersOptions = {}): BuildAnswersResult {
  const now = options.now ?? Date.now();
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

/**
 * 构造提交用的答案：先把答案并齐（resolveAnswers，唯一实现），再按卷面构造提交载荷。
 *
 * 随堂测验的卷面自带答案，这一步不会读题库；单元测验的卷面不带，读题库按题型
 * 各自的键补齐。补完仍缺的题如实计入 unresolved——调用方据此不提交，不猜。
 */
export async function buildAnswersWithBank(
  client: MoocClient,
  termId: number,
  paper: QuizPaper,
  now: number = Date.now(),
): Promise<Result<BuildAnswersResult, TransportError>> {
  const questions = paper.objectiveQList ?? [];
  if (!paperHasAllAnswers(questions)) {
    const bank = await getQuizBank(client, termId);
    if (!bank.ok) return bank;
    paper.objectiveQList = resolveAnswers(questions, bank.value, paper.tid);
  }
  return ok(buildAnswers(paper, { now }));
}

/** 响应顶层的 aid（当前活跃答卷）。0 或缺失表示没有。 */
function aidOf(value: unknown): number | null {
  const aid = (value as { aid?: unknown } | null | undefined)?.aid;
  return typeof aid === 'number' && aid > 0 ? aid : null;
}

// ---------- 做题助手：填充用的答案 ----------

/**
 * 填充助手要的两样东西：
 *   options —— 选项 id → 是否正确（选择类/判断题，页面是 radio/checkbox）；
 *   blanks  —— 填空题的答案文本，**按题目在卷面中的显示顺序**（页面是 contenteditable，
 *              没有 id 可查，按显示顺序对；平台的渲染顺序就是卷面数组的顺序）。
 *
 * 答案来自 resolveAnswers——与提交**同一份实现**，不在这里另写一套补缺。
 *
 * 只读：当前卷取 getQuizInfo 顶层的 aid（页面正在做的那份）。**绝不 aid = 0**——
 * 那会在服务端新建一份答题表单，等价于点「开始测验」。
 */
export interface FillAnswers {
  options: AnswerIndex;
  blanks: Array<string | null>;
}

export async function buildFillIndex(
  client: MoocClient,
  tid: number,
  termId: number,
): Promise<Result<FillAnswers, TransportError>> {
  const info = await getQuizInfo(client, tid);
  if (!info.ok) return info;

  const aid = aidOf(info.value);
  if (aid === null) return err(apiError(-1, '没有正在作答的卷，页面上没有可作答的题目'));

  const paper = await getQuizPaper(client, tid, aid);
  if (!paper.ok) return paper;

  const shown = paper.value.objectiveQList ?? [];
  let resolved = shown;
  if (!paperHasAllAnswers(shown)) {
    const bank = await getQuizBank(client, termId);
    if (!bank.ok) return bank;
    resolved = resolveAnswers(shown, bank.value, tid);
  }

  const options = new Map<string, boolean>();
  for (const question of resolved) {
    for (const option of question.optionDtos ?? []) {
      if (option.answer === true || option.answer === false) {
        options.set(String(option.id), option.answer);
      }
    }
  }

  const blanks = resolved
    .filter((question) => (question.optionDtos ?? []).length === 0)
    .map((question) => {
      const answer = typeof question.stdAnswer === 'string' ? question.stdAnswer.trim() : '';
      return answer === '' ? null : answer;
    });

  return ok({ options, blanks });
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

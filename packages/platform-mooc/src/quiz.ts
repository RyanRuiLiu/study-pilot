/**
 * 单元测验（随堂测验与章节测验同一条路径）。
 *
 * 提交流程（页面源码 `COM_Cache_TestBaseCache` + 本仓库实测）：
 *
 * 1. 取卷 `getQuizPaper(tid, aid = 0)`。`aid` 传 0 时服务端会创建答题表单并返回真实 aid；
 *    真实提交要传 `getOpenQuizInfo` 顶层的 aid。取卷**带 `withStdAnswerAndAnalyse: true`**
 *    ——在该模式下答案随卷面一起下发（见下）。
 * 2. **答案来源**（2026-10-23 起）：
 *      · **随堂测验**（课件里的练习）：卷面自带答案——
 *        选择类看 `optionDtos[].answer === true`，填空类看 `stdAnswer`（如「时间」）；
 *      · **单元测验**（测验与作业里的计分测验）：网页在提交前一份答案都不给；
 *        用移动端 `paperDetail/v1` + 用户配置的 `mob-token` 读同一 aId，平台会下发
 *        官方答案（2026-10-23 实测 5/5）。
 *    没有 `mob-token`、或移动端取不到答案时**如实失败**，不再调用已下线的
 *    `getQuestionListByTermId`（实测 -1004）。不猜、不用题干文本匹配。
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
import { callRead, type MoocClient } from './client.ts';
import { ENDPOINTS } from './endpoints.ts';
import { fetchMobToken, getMobileQuizPaper } from './mobile-paper.ts';
import type { PaperAnswer, PaperQuestion, QuizInfo, QuizPaper } from './types.ts';

// ---------- 取数 ----------

export async function getQuizInfo(
  client: MoocClient,
  tid: number,
): Promise<Result<QuizInfo, TransportError>> {
  return callRead<QuizInfo>(client, ENDPOINTS.quizInfo.bean, ENDPOINTS.quizInfo.method, {
    tid,
    targetAid: null,
    isDraft: false,
  });
}

/**
 * 取测验的开考信息。页面进入做题页时调用的就是这个接口，
 * 响应顶层的 `aid` 才是当前活跃答卷；`getQuizInfo` 顶层的 aid 在
 * 进行中卷上可能为 0（2026-10-23 实测）。
 */
export async function getOpenQuizInfo(
  client: MoocClient,
  tid: number,
): Promise<Result<QuizInfo, TransportError>> {
  return callRead<QuizInfo>(client, ENDPOINTS.openQuizInfo.bean, ENDPOINTS.openQuizInfo.method, {
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
   * 固定 true 是取超集：实测存在只有 true 才给填空 stdAnswer 的卷（2026-10-17 实测）。
   */
  return callRead<QuizPaper>(client, ENDPOINTS.quizPaper.bean, ENDPOINTS.quizPaper.method, {
    tid,
    aid,
    withStdAnswerAndAnalyse: true,
  });
}

/**
 * 读移动端凭证。没配、读失败都按空串处理——移动端答案源是可选的，
 * 不能因为它挡住原有的网页路径。
 */
async function mobileTokenOf(client: MoocClient): Promise<string> {
  if (client.getMobileToken !== undefined) {
    try {
      const configured = (await client.getMobileToken()).trim();
      if (configured !== '') return configured;
    } catch {
      // 配置读失败时继续尝试网页会话
    }
  }

  /*
   * 没有保存的 token 时，直接读网页登录会话换一个。用户只需要在官网页面上
   * 登录（和平时用网站一样），不需要任何手动 token 步骤。
   */
  const fetched = await fetchMobToken(client);
  return fetched.ok ? fetched.value : '';
}

/**
 * 把移动端卷面上的答案标记并回网页卷面。
 *
 * 两边是同一份答卷、同一批 qid/选项 id；按 id 对齐，不按题号或题干。
 * 只抄答案字段，提交用的 `answers`、`submitType` 等仍以网页卷面为准。
 */
export function mergeMobileAnswers(target: QuizPaper, mobile: QuizPaper): void {
  const byQid = new Map<number, PaperQuestion>();
  for (const question of mobile.objectiveQList ?? []) byQid.set(question.id, question);

  target.objectiveQList = (target.objectiveQList ?? []).map((question) => {
    const source = byQid.get(question.id);
    if (source === undefined) return question;
    const sourceOptions = new Map(
      (source.optionDtos ?? []).map((option) => [String(option.id), option.answer]),
    );
    return {
      ...question,
      stdAnswer: source.stdAnswer ?? question.stdAnswer,
      optionDtos: (question.optionDtos ?? []).map((option) => {
        const mark = sourceOptions.get(String(option.id));
        // 移动端没给这道选项的标记时保留原样，不能把它清成 null
        return mark === undefined || mark === null
          ? option
          : { ...option, answer: mark };
      }),
    };
  });
}

/** 选项 id → 是否为正确答案。 */
export type AnswerIndex = Map<string, boolean>;

/** 这道题有没有答案（正确选项标记，或标准答案文本）。 */
export function hasAnswer(question: PaperQuestion): boolean {
  if ((question.optionDtos ?? []).some((option) => option.answer === true)) return true;
  return typeof question.stdAnswer === 'string' && question.stdAnswer.trim() !== '';
}

/** 整卷是否都已经有答案。 */
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
 * 答案来自移动端卷面；没有 token 时只认网页卷面自带的答案。
 *
 * 只读：当前卷取 getOpenQuizInfo 顶层的 aid（页面正在做的那份）。**绝不 aid = 0**——
 * 那会在服务端新建一份答题表单，等价于点「开始测验」。
 */
export interface FillAnswers {
  options: AnswerIndex;
  blanks: Array<string | null>;
}

function fillFromQuestions(resolved: PaperQuestion[]): FillAnswers {
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

  return { options, blanks };
}

export async function buildFillIndex(
  client: MoocClient,
  tid: number,
  _termId: number,
): Promise<Result<FillAnswers, TransportError>> {
  /*
   * 开考信息优先用 getOpenQuizInfo：进行中的卷在 getQuizInfo 顶层可能报 aid=0，
   * 拿它去取卷会以为「没有正在作答的卷」。两个接口都读不到时才如实失败。
   */
  const open = await getOpenQuizInfo(client, tid);
  const info = open.ok ? open : await getQuizInfo(client, tid);
  if (!info.ok) return info;

  const aid = aidOf(info.value);
  if (aid === null) return err(apiError(-1, '没有正在作答的卷，页面上没有可作答的题目'));

  /*
   * 有 mob-token 时先走移动端：进行中的单元测验，网页取卷不给答案，
   * 移动端对同一 aid 会下发官方答案（2026-10-23 实测）。
   */
  const token = await mobileTokenOf(client);
  let mobileFailure: string | null = null;
  if (token !== '') {
    const mobile = await getMobileQuizPaper(client, token, tid, aid);
    if (mobile.ok) {
      const questions = mobile.value.objectiveQList ?? [];
      if (questions.length > 0) return ok(fillFromQuestions(questions));
      mobileFailure = '移动端返回了空卷';
    } else {
      mobileFailure = mobile.error.message;
    }
  }

  const paper = await getQuizPaper(client, tid, aid);
  if (!paper.ok) return paper;

  const shown = paper.value.objectiveQList ?? [];
  if (paperHasAllAnswers(shown)) return ok(fillFromQuestions(shown));

  /*
   * 网页卷面没有答案，旧题库接口已下线（getQuestionListByTermId → -1004）。
   * 不再调用它兜底；把真正可执行的下一步说清楚。
   */
  return err(
    apiError(
      -1,
      token === ''
        ? '还没检测到官网登录。请先在官网登录（设置页「账号登录」可打开登录页），扩展会自动获取移动端凭证。'
        : `移动端取答案失败：${mobileFailure ?? '未返回答案'}；网页题库接口已下线，没有可用的兜底来源。`,
    ),
  );
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
 * （只交客观部分=残缺答卷）→ 组答案（卷面自带优先，缺的用移动端同一 aid 的官方
 * 答案补）→ 有题取不到答案就**一道都不交**（部分作答会拿到低于预期的分数）→ 提交。
 */
export async function answerAndSubmitQuiz(
  client: MoocClient,
  tid: number,
  _termId: number,
  hooks: QuizSubmitHooks = {},
): Promise<QuizSubmitOutcome> {
  const paper = await getQuizPaper(client, tid, 0);
  if (!paper.ok) return { status: 'failed', message: `取卷失败：${paper.error.message}` };

  /*
   * 进行中的单元测验：网页卷面没有答案，移动端对同一 aid 有。
   * 只读指定 aid，绝不拿 0 调移动端；失败时如实报错，不再回退到已下线的题库。
   */
  const token = await mobileTokenOf(client);
  let mobileFailure: string | null = null;
  const mobileAid = typeof paper.value.aid === 'number' ? paper.value.aid : 0;
  if (token !== '' && mobileAid > 0) {
    const mobile = await getMobileQuizPaper(client, token, tid, mobileAid);
    if (mobile.ok) mergeMobileAnswers(paper.value, mobile.value);
    else mobileFailure = mobile.error.message;
  }

  const subjective = (paper.value.subjectiveQList ?? []).length;
  if (subjective > 0) {
    return { status: 'failed', message: `这份测验含 ${subjective} 道主观题，需人工作答，不自动提交` };
  }

  const built = buildAnswers(paper.value);

  if (built.total === 0) return { status: 'no-objective' };
  if (built.unresolved.length > 0) {
    const hint =
      token === ''
        ? '还没检测到官网登录；请先在官网登录后再试（设置页可打开登录页）'
        : `移动端取答案失败：${mobileFailure ?? '未返回答案'}；网页题库接口已下线`;
    return {
      status: 'failed',
      message: `${built.unresolved.length} 道题取不到答案（${hint}），已跳过以免得到低分`,
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

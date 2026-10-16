/*
 * 单元测试的答卷会话（「1× 直发」形态；2026-10-17 定稿）。
 *
 * 一条线性会话，两种进法：
 *
 *   有键 → 开卷 → 套键作答 → **过神谕** → 交卷 →（回读由调用方做）
 *   无键 → 查门槛（剩余次数 / 客观题）→ 开卷 → 首答探路 → 交卷
 *          → lookHomework 取题号 → 弹题通道换正解 → 建键 → 申请重做
 *          → 重开卷 → 套键作答 → 过神谕 → 交卷
 *
 * 三个安全事实（都来自实测或平台源码，改这段之前先读）：
 *
 *  1. **开卷是一次显式动作**：`student/doHomework` 一调即建答卷，无二次确认
 *     （FINDINGS §六）。所以它只出现在执行路径里，绝不"顺手打开"。
 *
 *  2. **交卷不可逆**：`answer/submit` 即刻计分。所以交卷前有两道闸——
 *     神谕验证（平台自己说这卷现在值满分），以及停止信号。
 *
 *  3. **留最后一次**：缺键且剩余 < 2 时不动手（`MIN_ATTEMPTS_FOR_PROBE`）。
 *     机会只在**没把握的一枪**上省着用；过得了神谕的一枪是确定的满分，剩几次都交。
 *
 * 「过神谕」拿不到入参时（会话没 userId、这卷从没交过、数字 id 缺失）**不是跳过闸门，
 * 而是如实记进结果文案**——使用者要知道这一枪有没有被平台确认过。
 */

import type { RunControl, RunOutcome } from '@study-pilot/application';
import { ZhsApiError, ZhsHttpError, type ZhsClient } from '../client.ts';
import {
  answerKeyFromPopupExam,
  matchPaper,
  MIN_ATTEMPTS_FOR_PROBE,
  planAnswering,
  remainingAttempts,
  type AnswerKey,
} from '../exam-answers.ts';
import {
  buildAnswerBody,
  parseLookedPaper,
  parsePaper,
  questionIdsOf,
  type AnswerPayload,
  type LookedQuestion,
} from '../exam-paper.ts';
import { askOracle, judge } from '../oracle.ts';
import { ZhsRoundHalt } from './execute.ts';

/** 一张卷的入口参数（清单 + 章节测验条目合成）。 */
export interface ExamTarget {
  recruitId: number;
  courseId: number;
  schoolId: number;
  /** 清单条目 id：开卷/回顾的 `studentExamId`，作答报文与交卷的 `stuExamId` */
  listId: string;
  /** 8 字符串 examId：开卷/回顾的 `examId` */
  examKey: string;
  /** 数字 examId（神谕入参）；0 = 拿不到（章节 DTO 缺失） */
  examIdNum: number;
  /** 数字 stuExamId（神谕入参）；0 = 拿不到 */
  stuExamIdNum: number;
}

export interface ExamRunInput {
  target: ExamTarget;
  /** 会话 userId（神谕入参）；null = CASLOGC 里没有，验证做不了 */
  userId: number | null;
  /** 答案键；null = 缺键，走探路重做 */
  key: AnswerKey | null;
  /** 该卷已解锁的数字题号（`lookHomework`）；空 = 这卷还没交过 */
  questionIds: readonly number[];
  /** 该卷总分（清单 `totalScore`）；null = 拿不到，神谕判据失效 */
  totalScore: number | null;
  /** 建键时喂弹题通道的课时 id（该章第一个课时） */
  popupLessonId: number;
  /**
   * 这卷**已经交过一次**（清单「已提交」页签里的未满分卷）。
   *
   * Ryan 口径（2026-10-17）：这种卷不重打第一枪——题号早就解锁，
   * 直接收割建键 → 申请重做 → 重开卷定分。它与"从没交过"的区别只有这一步：
   * **必须先申请重做再开卷**，否则开到的是那份已交的卷面。
   */
  alreadySubmitted?: boolean;
}

/** 会话失效（CAS SSO 过期）的去处：站点首页（登录入口在导航里）。 */
const LOGIN_URL = 'https://www.zhihuishu.com';

/**
 * SSO 过期时考试族 `302 → passport`，浏览器里表现为「拿到了一个不是 JSON 的东西」。
 * 这不是业务失败，是「要人重新登录一次」——按整轮中止处理并给出动作位。
 */
function isSessionFailure(error: unknown): boolean {
  if (error instanceof ZhsApiError || error instanceof ZhsHttpError) return false;
  return error instanceof SyntaxError;
}

function sessionHalt(): ZhsRoundHalt {
  // 文案照抄 CONTRIBUTING「常用句」：「登录已失效，需重新登录慕课。」智慧树同句换平台名
  return new ZhsRoundHalt('登录已失效，需重新登录智慧树', {
    platformId: 'zhihuishu',
    label: '打开登录页',
    url: LOGIN_URL,
  });
}

/** 统一的失败翻译：会话失效 → 停轮；其余原样返回给结果文案。 */
function failed(error: unknown): RunOutcome {
  return { status: 'failed', message: error instanceof Error ? error.message : String(error) };
}

/** 开卷：**建答卷**（不可逆的副作用只有"多了一份未交的答卷"，不会计分）。 */
export async function openExamPaper(
  client: ZhsClient,
  target: ExamTarget,
): Promise<ReturnType<typeof parsePaper>> {
  const body = await client.call('examDoHomework', {
    recruitId: target.recruitId,
    examId: target.examKey,
    studentExamId: target.listId,
    schoolId: target.schoolId,
    courseId: target.courseId,
  });
  return parsePaper((body as { rt?: unknown }).rt);
}

/** 回顾：取数字题号（同时也带回题面/选项，两处口径同源）。 */
async function readLookedPaper(client: ZhsClient, target: ExamTarget) {
  const body = await client.call('examLookHomework', {
    recruitId: target.recruitId,
    studentExamId: target.listId,
    examId: target.examKey,
    schoolId: target.schoolId,
    courseId: target.courseId,
  });
  return parseLookedPaper((body as { rt?: unknown }).rt);
}

/*
 * 作答与交卷的**业务码在 `rt.statu` 里**，外层 `status` 只说这次 HTTP 调用通没通。
 * 平台源码（1.184ad30c22bdba34ce6c.js:22563、27731-27743）：
 *
 *   answer/saveStudentAnswer：`statu == 1` 成功；`-10` 要图形验证码；`-20` 被禁用
 *   answer/submit          ：`statu == 0` 成功；`-1` 是「作业已提交，不可重复提交」
 *
 * **两处的成功值相反**（一个 1 一个 0）——这是两个接口各自的约定，不是笔误，别写混。
 * 不检查它就会把「要验证码」「被禁用」「重复交卷」统统当成功收下，而那正是本仓
 * 明令禁止的吞错。
 */
const SAVE_STATU_OK = 1;
/** 交卷成功有**两个**值：0 = 成功并给出分数，1 = 成功但不显示分数（转问卷）。源码逐字两分支都在。 */
const SUBMIT_STATU_OK = new Set([0, 1]);
/** 作答被平台挂起（要人机验证 / 被禁用）：继续跑只会加重风控。 */
const SAVE_STATU_GATE = new Set([-10, -20]);

function statuOf(body: unknown): number | null {
  const rt = (body as { rt?: unknown } | null | undefined)?.rt as { statu?: unknown } | null | undefined;
  const raw = rt?.statu;
  const parsed = typeof raw === 'string' ? Number(raw) : raw;
  return typeof parsed === 'number' && Number.isFinite(parsed) ? parsed : null;
}

/** 逐题作答（一题一次，与真实客户端同节奏）。 */
async function saveAnswers(
  client: ZhsClient,
  target: ExamTarget,
  answers: readonly AnswerPayload[],
): Promise<void> {
  for (const answer of answers) {
    if (answer.eid === '' || answer.optionIds.length === 0) continue; // 空作答不发（不污染答卷）
    const stuExamAnswer = buildAnswerBody({
      answers: [answer],
      examId: target.examKey,
      recruitId: target.recruitId,
      stuExamId: target.listId,
      schoolId: target.schoolId,
      courseId: target.courseId,
    });
    const body = await client.call('examSaveAnswer', { stuExamAnswer, recruitId: target.recruitId });
    const statu = statuOf(body);
    if (statu === SAVE_STATU_OK) continue;
    if (statu !== null && SAVE_STATU_GATE.has(statu)) {
      // 平台源码：-10 → emit("captchaForAnswer")、-20 → emit("disableForAnswer")
      throw new ZhsRoundHalt(statu === -10 ? '需完成人机验证' : '无法继续作答：平台已禁用');
    }
    throw new ZhsApiError(statu ?? -1, `作答失败：平台返回 ${statu ?? '无 statu'}`);
  }
}

/** 交卷。`achieveCount` = 已作答题数（真实客户端也这么传）。 */
async function submit(client: ZhsClient, target: ExamTarget, achieveCount: number): Promise<void> {
  const body = await client.call('examSubmit', {
    recruitId: target.recruitId,
    examId: target.examKey,
    stuExamId: target.listId,
    achieveCount,
  });
  const statu = statuOf(body);
  if (statu !== null && SUBMIT_STATU_OK.has(statu)) return;
  throw new ZhsApiError(
    statu ?? -1,
    statu === -1 ? '交卷失败：作业已提交，不可重复提交' : `交卷失败：平台返回 ${statu ?? '无 statu'}`,
  );
}

export interface OracleGate {
  /** 这次交卷前有没有真的被平台确认过 */
  verified: boolean;
  /** 给结果文案用的一句话 */
  note: string;
}

/**
 * 交卷前的神谕闸。
 *
 * 入参齐 → 问一次，判满即通过；不通过就**不交**（保住那次机会）。
 * 入参不齐 → 不猜也不假装通过，`verified: false` 并说清缺什么。
 */
async function passOracleGate(client: ZhsClient, input: ExamRunInput): Promise<OracleGate | RunOutcome> {
  const { target, userId, questionIds, totalScore } = input;
  if (userId === null) return { verified: false, note: '未过平台确认：会话缺少 userId' };
  if (target.examIdNum === 0 || target.stuExamIdNum === 0) {
    return { verified: false, note: '未过平台确认：缺少数字卷号' };
  }
  if (questionIds.length === 0) return { verified: false, note: '未过平台确认：尚无题号' };

  const rt = await askOracle(client, {
    recruitId: target.recruitId,
    userId,
    examId: target.examIdNum,
    stuExamId: target.stuExamIdNum,
    questionIds,
  });
  const verdict = judge({ rt, questionIds, totalScore });
  if (verdict.pass) return { verified: true, note: `平台确认满分：${verdict.scoreSum}/${totalScore}` };

  const reasons: string[] = [];
  if (totalScore === null) reasons.push('清单未给总分');
  if (verdict.missing.length > 0) reasons.push(`${verdict.missing.length} 题未回分`);
  if (verdict.zeroScored.length > 0) reasons.push(`${verdict.zeroScored.length} 题 0 分`);
  if (totalScore !== null && verdict.scoreSum !== totalScore) {
    reasons.push(`得分 ${verdict.scoreSum} 与总分 ${totalScore} 不符`);
  }
  return { status: 'failed', message: `未交卷：平台确认未通过，${reasons.join('，')}` };
}

/** 几个内部小步骤都返回「结果 + 失败二选一」，用这一个守卫分流。 */
function isOutcome<T extends object>(value: T | RunOutcome): value is RunOutcome {
  return 'status' in value;
}

/** 键套卷面 → 逐题作答报文（题型随题带回）。 */
function planToAnswers(
  paper: ReturnType<typeof parsePaper>,
  answers: ReadonlyArray<{ eid: string; optionIds: string[] }>,
): AnswerPayload[] {
  const typeByEid = new Map(paper.map((question) => [question.eid, question.questionType]));
  return answers.map((answer) => ({
    eid: answer.eid,
    optionIds: answer.optionIds,
    questionType: typeByEid.get(answer.eid) ?? 0,
  }));
}

/** 首答探路用：每题取卷面第一个选项（确定、可见、不隐藏意图）。 */
function firstOptionAnswers(paper: ReturnType<typeof parsePaper>): AnswerPayload[] {
  return paper
    .filter((question) => question.options.length > 0)
    .map((question) => ({ eid: question.eid, optionIds: [question.options[0]!.id], questionType: question.questionType }));
}

/**
 * 跑完一张卷。
 *
 * 返回值就是给使用者看的结果：`done` 里带上「有没有过神谕」，`skipped` 说清为什么没动手。
 */
export async function executeExam(
  client: ZhsClient,
  input: ExamRunInput,
  control: RunControl,
): Promise<RunOutcome> {
  if (control.stopped()) return { status: 'skipped', message: '已停止' };
  try {
    if (input.alreadySubmitted === true) return await runAfterSubmit(client, input, control);
    return input.key === null ? await runWithoutKey(client, input, control) : await runWithKey(client, input, control);
  } catch (error) {
    if (error instanceof ZhsRoundHalt) throw error;
    // 作答接口也挂易盾：源码 `if (o.code && -12 == o.code) → yuDuninstance`。
    // 与视频线同一条处置：整轮停止、如实告知，不在这里做任何验证规避。
    if (error instanceof ZhsApiError && error.code === -12) throw new ZhsRoundHalt('需完成人机验证');
    if (isSessionFailure(error)) throw sessionHalt();
    return failed(error);
  }
}

/** 有键：一次开卷、一次交卷。 */
async function runWithKey(client: ZhsClient, input: ExamRunInput, control: RunControl): Promise<RunOutcome> {
  const paper = await openExamPaper(client, input.target);
  /*
   * 要不要作答由 `planAnswering` 判（模块 3 的唯一判断处，别在这里另写一遍）。
   * 本路径只接受 `answer`：键来自这卷自己，覆盖不全是异常；`probe-then-redo`
   * 那条路由 runWithoutKey 负责，它才掌握剩余次数。
   *
   * 覆盖率**只能对着卷面算**（键比的是本题的选项 id），所以「覆盖不全就不开卷」
   * 做不到——要先开卷才知道。留下的代价是**一份未作答的草稿**：不计分、不消耗
   * 作答机会（平台的消耗点在 submit），下次执行再读同一份。可以接受，但别把它
   * 说成「什么都没发生」。
   */
  const plan = planAnswering({ paper, key: input.key, remainingAttempts: MIN_ATTEMPTS_FOR_PROBE });
  if (plan.kind !== 'answer') {
    return { status: 'failed', message: `未作答：答案键覆盖 ${Math.round(plan.coverage * 100)}%` };
  }

  if (control.stopped()) return { status: 'skipped', message: '已停止' };
  await saveAnswers(client, input.target, planToAnswers(paper, plan.answers));

  const gate = await passOracleGate(client, input);
  if (isOutcome(gate)) return gate;

  // 安全点：交卷是这一轮唯一的不可逆动作，落在这里的停止信号必须生效
  if (control.stopped()) return { status: 'skipped', message: '已停止：未交卷' };
  await submit(client, input.target, plan.answers.length);
  return { status: 'done', message: `已交卷：${plan.answers.length} 题，${gate.note}` };
}

/**
 * 收割建键（**纯只读**）：`lookHomework` 取全题号 → 弹题通道按题号换正解。
 *
 * 这是第一期唯一的键来源（设计文档 §7-5：不落盘，用完即弃）。它**不消耗任何
 * 作答机会**——这也是「已交未满分的卷不重打第一枪」能成立的原因。
 */
async function harvestKey(
  client: ZhsClient,
  target: ExamTarget,
  lessonId: number,
): Promise<{
  key: AnswerKey;
  questionIds: number[];
  questionCount: number;
  /** 回顾卷面——用来在动重做**之前**预判键的覆盖率 */
  looked: readonly LookedQuestion[];
}> {
  const looked = await readLookedPaper(client, target);
  const questionIds = questionIdsOf(looked);
  if (questionIds.length === 0) {
    return { key: { version: 1, correctOptionIds: [], entries: [] }, questionIds, questionCount: 0, looked };
  }

  const feedBody = (await client.call('popupExam', {
    lessonId,
    recruitId: target.recruitId,
    courseId: target.courseId,
    questionIds: questionIds.join(','),
  })) as { data?: { lessonTestQuestionUseInterfaceDtos?: unknown } | null };
  const key = answerKeyFromPopupExam(
    (feedBody.data?.lessonTestQuestionUseInterfaceDtos ?? []) as Parameters<typeof answerKeyFromPopupExam>[0],
  );
  return { key, questionIds, questionCount: questionIds.length, looked };
}

/**
 * 用**回顾卷面**预判键的覆盖率，决定要不要动重做。
 *
 * 为什么这一判可靠：选项 id 在多次开卷之间稳定（重做换序不换 id，真机 12 分 → 100 分
 * 那一批实证），所以「键覆盖得了回顾卷面」等价于「覆盖得了重做后的新卷面」。
 *
 * 为什么值得先判：申请重做要花掉一次机会。键覆盖不全时花掉它，换来的是
 * **一份没作答的新卷**——等于白花。这几行就是「留最后一次」在代码里的落点。
 */
function keyCoversLookedPaper(key: AnswerKey, looked: readonly LookedQuestion[]): { ok: boolean; coverage: number } {
  const asPaper = looked.map((question) => ({
    eid: String(question.questionId),
    text: question.text,
    options: question.options,
  }));
  const match = matchPaper(asPaper, key);
  return { ok: match.missing.length === 0, coverage: asPaper.length === 0 ? 0 : match.answers.length / asPaper.length };
}

/**
 * 动重做之前的门槛：剩余次数够不够、是不是客观题。
 * 两条都不通过就给一句给人看的话（**两条路径共用**，别在两处各判一遍）。
 */
async function redoGate(client: ZhsClient, target: ExamTarget): Promise<{ remaining: number } | RunOutcome> {
  const redoBody = (await client.call('examRedoNum', { recruitId: target.recruitId, examId: target.examKey })) as {
    rt?: unknown;
  };
  const remaining = remainingAttempts(redoBody.rt);

  const objectBody = (await client.call('examIsObject', { examId: target.examKey })) as { rt?: unknown };
  if (Number(objectBody.rt) !== 1) return { status: 'skipped', message: '需手动完成：非客观题' };
  if (remaining < MIN_ATTEMPTS_FOR_PROBE) {
    return { status: 'skipped', message: `需手动完成：仅剩 ${remaining} 次作答机会` };
  }
  return { remaining };
}

/**
 * 收割建键并**先判覆盖率**——两者都是只读，不花任何机会。
 *
 * 先判再动重做的理由：申请重做要花掉一次机会，键覆盖不全时花掉它，
 * 换来的是一份没作答的新卷，等于白花。这是「留最后一次」在代码里的落点。
 */
async function prepareKey(
  client: ZhsClient,
  target: ExamTarget,
  lessonId: number,
): Promise<{ key: AnswerKey; questionIds: number[] } | RunOutcome> {
  const harvested = await harvestKey(client, target, lessonId);
  if (harvested.questionCount === 0) return { status: 'failed', message: '未申请重做：回顾未取到题号' };

  const preview = keyCoversLookedPaper(harvested.key, harvested.looked);
  if (!preview.ok) {
    return { status: 'failed', message: `未申请重做：答案键覆盖 ${Math.round(preview.coverage * 100)}%` };
  }
  return { key: harvested.key, questionIds: harvested.questionIds };
}

/** 已交未满分：收割建键 → 申请重做 → 重开卷定分（不重打第一枪）。 */
async function runAfterSubmit(client: ZhsClient, input: ExamRunInput, control: RunControl): Promise<RunOutcome> {
  const { target } = input;

  const gate = await redoGate(client, target);
  if (isOutcome(gate)) return gate;

  const prepared = await prepareKey(client, target, input.popupLessonId);
  if (isOutcome(prepared)) return prepared;

  if (control.stopped()) return { status: 'skipped', message: '已停止' };
  const redoApply = (await client.call('examApplyRedo', {
    recruitId: target.recruitId,
    examId: target.examKey,
    description: '',
    courseId: target.courseId,
  })) as { rt?: unknown };
  if (Number(redoApply.rt) !== 1) {
    // 后半句是平台自己的失败文案（源码 1.184ad30c22bdba34ce6c.js:11835 字面量），照抄
    return { status: 'failed', message: '申请重做失败：保存申请信息失败，请重新保存' };
  }

  const settled = await runWithKey(client, { ...input, key: prepared.key, questionIds: prepared.questionIds }, control);
  return settled.status === 'done' ? { status: 'done', message: `重做定分：${settled.message}` } : settled;
}

/** 缺键：先看门槛，再走「探路 → 收割 → 重做定分」。 */
async function runWithoutKey(client: ZhsClient, input: ExamRunInput, control: RunControl): Promise<RunOutcome> {
  const { target } = input;

  const gate = await redoGate(client, target);
  if (isOutcome(gate)) return gate;

  // ① 探路一枪：无键可用，如实按卷面第一项作答——它的作用只是解锁题号
  if (control.stopped()) return { status: 'skipped', message: '已停止' };
  const probePaper = await openExamPaper(client, target);
  const probeAnswers = firstOptionAnswers(probePaper);
  await saveAnswers(client, target, probeAnswers);
  if (control.stopped()) return { status: 'skipped', message: '已停止：未交卷' };
  await submit(client, target, probeAnswers.length);

  // ② 收割建键（只读），并先判覆盖率——都不花机会
  const prepared = await prepareKey(client, target, input.popupLessonId);
  if (isOutcome(prepared)) return prepared;

  // ③ 申请重做（分数覆盖）
  if (control.stopped()) return { status: 'skipped', message: '已停止' };
  const redoApply = (await client.call('examApplyRedo', {
    recruitId: target.recruitId,
    examId: target.examKey,
    description: '',
    courseId: target.courseId,
  })) as { rt?: unknown };
  if (Number(redoApply.rt) !== 1) {
    return { status: 'failed', message: '申请重做失败：保存申请信息失败，请重新保存' };
  }

  // ④ 重开卷定分：这一次才是要留下的分数
  const settle = await runWithKey(
    client,
    { ...input, key: prepared.key, questionIds: prepared.questionIds },
    control,
  );
  return settle.status === 'done'
    ? { status: 'done', message: `探路后重做定分：${settle.message}` }
    : settle;
}

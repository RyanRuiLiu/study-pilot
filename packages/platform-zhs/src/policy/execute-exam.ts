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
  remainingAttempts,
  type AnswerKey,
} from '../exam-answers.ts';
import { buildAnswerBody, parseLookedPaper, parsePaper, questionIdsOf, type AnswerPayload } from '../exam-paper.ts';
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
  return new ZhsRoundHalt('需重新登录智慧树', { platformId: 'zhihuishu', label: '打开智慧树登录', url: LOGIN_URL });
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
    await client.call('examSaveAnswer', { stuExamAnswer, recruitId: target.recruitId });
  }
}

/** 交卷。`achieveCount` = 已作答题数（真实客户端也这么传）。 */
async function submit(client: ZhsClient, target: ExamTarget, achieveCount: number): Promise<void> {
  await client.call('examSubmit', {
    recruitId: target.recruitId,
    examId: target.examKey,
    stuExamId: target.listId,
    achieveCount,
  });
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
  if (userId === null) return { verified: false, note: '会话里没有 userId，未过神谕' };
  if (target.examIdNum === 0 || target.stuExamIdNum === 0) {
    return { verified: false, note: '拿不到数字卷号，未过神谕' };
  }
  if (questionIds.length === 0) return { verified: false, note: '这卷还没有题号（从没交过），未过神谕' };

  const rt = await askOracle(client, {
    recruitId: target.recruitId,
    userId,
    examId: target.examIdNum,
    stuExamId: target.stuExamIdNum,
    questionIds,
  });
  const verdict = judge({ rt, questionIds, totalScore });
  if (verdict.pass) return { verified: true, note: `神谕确认满分（${verdict.scoreSum}/${totalScore}）` };

  const reasons: string[] = [];
  if (totalScore === null) reasons.push('清单没给总分，判据失效');
  if (verdict.missing.length > 0) reasons.push(`${verdict.missing.length} 题没回分`);
  if (verdict.zeroScored.length > 0) reasons.push(`${verdict.zeroScored.length} 题 0 分`);
  if (verdict.scoreSum !== totalScore && totalScore !== null) reasons.push(`得分 ${verdict.scoreSum} ≠ 总分 ${totalScore}`);
  return {
    status: 'failed',
    message: `神谕未通过，未交卷（${reasons.join('；')}）`,
  };
}

function isOutcome(value: OracleGate | RunOutcome): value is RunOutcome {
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
    if (isSessionFailure(error)) throw sessionHalt();
    return failed(error);
  }
}

/** 有键：一次开卷、一次交卷。 */
async function runWithKey(client: ZhsClient, input: ExamRunInput, control: RunControl): Promise<RunOutcome> {
  const paper = await openExamPaper(client, input.target);
  const match = matchPaper(paper, input.key!);
  if (match.missing.length > 0) {
    /*
     * 覆盖率**只能对着卷面算**（键比的是本题的选项 id），所以「覆盖不全就不开卷」
     * 做不到——要先开卷才知道。留下的代价是**一份未作答的草稿**：不计分、不消耗
     * 作答机会（平台的消耗点在 submit），下次执行再读同一份。可以接受，但别把它
     * 说成「什么都没发生」。
     */
    const percent = Math.round((match.answers.length / Math.max(paper.length, 1)) * 100);
    return { status: 'failed', message: `答案键覆盖不全（${percent}%），未作答也未交卷` };
  }

  if (control.stopped()) return { status: 'skipped', message: '已停止' };
  await saveAnswers(client, input.target, planToAnswers(paper, match.answers));

  const gate = await passOracleGate(client, input);
  if (isOutcome(gate)) return gate;

  // 安全点：交卷是这一轮唯一的不可逆动作，落在这里的停止信号必须生效
  if (control.stopped()) return { status: 'skipped', message: '已停止（未交卷）' };
  await submit(client, input.target, match.answers.length);
  return { status: 'done', message: `已交卷（${match.answers.length} 题）· ${gate.note}` };
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
): Promise<{ key: Awaited<ReturnType<typeof answerKeyFromPopupExam>>; questionIds: number[]; questionCount: number }> {
  const looked = await readLookedPaper(client, target);
  const questionIds = questionIdsOf(looked);
  if (questionIds.length === 0) return { key: { version: 1, correctOptionIds: [], entries: [] }, questionIds, questionCount: 0 };

  const feedBody = (await client.call('popupExam', {
    lessonId,
    recruitId: target.recruitId,
    courseId: target.courseId,
    questionIds: questionIds.join(','),
  })) as { data?: { lessonTestQuestionUseInterfaceDtos?: unknown } | null };
  const key = answerKeyFromPopupExam(
    (feedBody.data?.lessonTestQuestionUseInterfaceDtos ?? []) as Parameters<typeof answerKeyFromPopupExam>[0],
  );
  return { key, questionIds, questionCount: questionIds.length };
}

/** 已交未满分：收割建键 → 申请重做 → 重开卷定分（不重打第一枪）。 */
async function runAfterSubmit(client: ZhsClient, input: ExamRunInput, control: RunControl): Promise<RunOutcome> {
  const { target } = input;
  const redoBody = (await client.call('examRedoNum', { recruitId: target.recruitId, examId: target.examKey })) as {
    rt?: unknown;
  };
  const remaining = remainingAttempts(redoBody.rt);

  const objectBody = (await client.call('examIsObject', { examId: target.examKey })) as { rt?: unknown };
  if (Number(objectBody.rt) !== 1) {
    return { status: 'skipped', message: '非客观题（平台走二维码通道），只提醒不动手' };
  }
  if (remaining < MIN_ATTEMPTS_FOR_PROBE) {
    return { status: 'skipped', message: `只剩 ${remaining} 次作答机会，留给你手动做` };
  }

  const harvested = await harvestKey(client, target, input.popupLessonId);
  if (harvested.questionCount === 0) {
    return { status: 'failed', message: '回顾没拿到题号（这卷可能不在可回顾状态），不申请重做' };
  }

  if (control.stopped()) return { status: 'skipped', message: '已停止' };
  const redoApply = (await client.call('examApplyRedo', {
    recruitId: target.recruitId,
    examId: target.examKey,
    description: '',
    courseId: target.courseId,
  })) as { rt?: unknown };
  if (Number(redoApply.rt) !== 1) {
    return { status: 'failed', message: '申请重做未成功（平台文案：保存申请信息失败，请重新保存）' };
  }

  const settled = await runWithKey(
    client,
    { ...input, key: harvested.key, questionIds: harvested.questionIds },
    control,
  );
  return settled.status === 'done' ? { status: 'done', message: `重做定分：${settled.message}` } : settled;
}

/** 缺键：先看门槛，再走「探路 → 收割 → 重做定分」。 */
async function runWithoutKey(client: ZhsClient, input: ExamRunInput, control: RunControl): Promise<RunOutcome> {
  const { target } = input;

  const redoBody = (await client.call('examRedoNum', { recruitId: target.recruitId, examId: target.examKey })) as {
    rt?: unknown;
  };
  const remaining = remainingAttempts(redoBody.rt);

  const objectBody = (await client.call('examIsObject', { examId: target.examKey })) as { rt?: unknown };
  if (Number(objectBody.rt) !== 1) {
    return { status: 'skipped', message: '非客观题（平台走二维码通道），只提醒不动手' };
  }
  if (remaining < MIN_ATTEMPTS_FOR_PROBE) {
    return { status: 'skipped', message: `答案键缺失且只剩 ${remaining} 次作答机会，留给你手动做` };
  }

  // ① 探路一枪：无键可用，如实按卷面第一项作答——它的作用只是解锁题号
  if (control.stopped()) return { status: 'skipped', message: '已停止' };
  const probePaper = await openExamPaper(client, target);
  const probeAnswers = firstOptionAnswers(probePaper);
  await saveAnswers(client, target, probeAnswers);
  if (control.stopped()) return { status: 'skipped', message: '已停止（未交卷）' };
  await submit(client, target, probeAnswers.length);

  // ② 收割建键（只读）
  const harvested = await harvestKey(client, target, input.popupLessonId);
  if (harvested.questionCount === 0) {
    return { status: 'failed', message: '探路已交卷，但回读没拿到题号——不申请重做（避免白花一次机会）' };
  }

  // ③ 申请重做（分数覆盖）
  if (control.stopped()) return { status: 'skipped', message: '已停止' };
  const redoApply = (await client.call('examApplyRedo', {
    recruitId: target.recruitId,
    examId: target.examKey,
    description: '',
    courseId: target.courseId,
  })) as { rt?: unknown };
  if (Number(redoApply.rt) !== 1) {
    return { status: 'failed', message: '申请重做未成功（平台文案：保存申请信息失败，请重新保存）' };
  }

  // ④ 重开卷定分：这一次才是要留下的分数
  const settle = await runWithKey(
    client,
    { ...input, key: harvested.key, questionIds: harvested.questionIds },
    control,
  );
  return settle.status === 'done'
    ? { status: 'done', message: `探路后重做定分：${settle.message}` }
    : settle;
}

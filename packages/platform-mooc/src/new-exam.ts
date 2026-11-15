/*
 * 新版考试（平台现行的新考试体系，与旧版期中/期末考试并行）。
 *
 * 与旧版考试（课程结构 `mocTermDto.exams`，答卷页 `#/learn/examObject`）三处完全
 * 不同（2026-11-08 真机 + 前端源码，镜像在 .probe/mooc-src/）：
 *
 *  1. **列表在独立接口** `courseBean.getNewExamList.rpc`（form 表单 `termId=…`），
 *     课程结构 DTO 的 `exams` 里没有它们——只读结构永远看不见这类考试。
 *  2. **进入入口分叉**（examlist 页 chunk 49318 的「进入」按钮 onClick 逐字）：
 *       无草稿 → `#/learn/newExamAgreement?eid={考试id}`（协议页）；
 *       有草稿 → `/mooc/main/newExam?aid={draftAid}&eid={id}&sn=&cid=&tid=[&isSpoc=1]`。
 *     协议页打开**不建卷**：NewExamAgreement chunk 里建卷调用
 *     （`mocExamDraftBean.publishExam`）只挂在「开始考试」按钮的 onClick 上，
 *     且按钮要先勾学术诚信条款才可点；页面加载（useEffect）只发只读请求。
 *  3. **答卷页是独立站点区** `/mooc/main/newExam`，不在 /learn 的 hash 路由里。
 *
 * 取卷（`mm-tiku/web/j/mocExamBean.getPaper.rpc`）**不下发答案**（同日源码逐行 +
 * 开考实测：stdAnswer/optionDtos.answer 全 null）：全族没有任何答案请求旗标，
 * 网页作答纯用户输入，stdAnswer 只在出分后的导出链路出现。客观题的答案走
 * **移动端接口**（与单元测验同一条已验证通道，见 fill 索引的调用方），test id
 * 空间两体系共享（getOpenQuizInfo 实测认新考试的 objectTestId）。
 *
 * 一次作答机会（tryTime）与计分属性使得这一类与旧版考试同一处置：
 * **只读展示、不自动执行**（plan 的 isExam 已覆盖）。
 */

import { err, ok, type Result } from '@study-pilot/core';
import {
  apiError,
  DEFAULT_TIMEOUT_MS,
  httpError,
  networkError,
  startOutboundTimeout,
  timeoutError,
  type TransportError,
} from '@study-pilot/transport';
import type { MoocClient } from './client.ts';
import { ENDPOINTS } from './endpoints.ts';

/** 新版考试条目（列表接口的归一化结果）。 */
export interface NewExamListItem {
  /** 考试 id（进入协议页的 eid；答卷页的 eid） */
  eid: number;
  name: string;
  /** 毫秒时刻；取不到为 null */
  releaseTime: number | null;
  /** 提交截止（毫秒） */
  deadline: number | null;
  totalScore: number | null;
  /** 已公布的成绩；未公布为 null */
  userScore: number | null;
  /** 评分公布状态（0/1/2，见 SnapshotWork.scorePubStatus） */
  scorePubStatus: number | null;
  /** 已用掉的作答机会 */
  usedTryCount: number | null;
  /** 作答机会总数 */
  tryTime: number | null;
  /** 未交的草稿答卷 id；有它时官方「进入」直达答卷页，没有则先去协议页 */
  draftAid: number | null;
  /** 客观题部分的 test id（填充索引的入口参数；提交不自动化） */
  objectTestId: number | null;
  /** 主观题部分的 test id（互评/自评的评测对象；拍照上传一类，必须人工） */
  subjectTestId: number | null;
  /** 互评（评分阶段）窗口开始；毫秒，取不到为 null */
  evaluateStart: number | null;
  /** 互评（评分阶段）窗口截止；毫秒，取不到为 null */
  evaluateEnd: number | null;
}

/**
 * 读一个学期的新版考试列表。
 *
 * 信封事实（2026-11-08 真机，同一账号同刻两个学期）：`{code:0, result:null}`
 * = 该学期没有新版考试；有考试时 `result` 是数组。**不能**沿用
 * `callRead` 的「null 即会话失效」——那会把「没有新版考试」报成未登录。
 * 会话有效性由调用方保证（inspect 先读结构再读这里，结构失败已拦）。
 */
export async function getNewExamList(
  client: MoocClient,
  termId: number,
): Promise<Result<NewExamListItem[], TransportError>> {
  const payload = await client.rpc.call<unknown>(
    ENDPOINTS.newExamList.bean,
    ENDPOINTS.newExamList.method,
    { termId },
  );
  if (!payload.ok) return payload;
  if (payload.value === null || payload.value === undefined) return ok([]);
  if (!Array.isArray(payload.value)) {
    return err(apiError(-1, '新版考试列表：result 不是数组（平台回的形状与预期不符）'));
  }

  const items: NewExamListItem[] = [];
  for (const raw of payload.value as Array<Record<string, unknown> | null>) {
    if (raw === null || typeof raw !== 'object') continue;
    const eid = Number(raw.id);
    if (!Number.isFinite(eid) || eid <= 0) continue; // 没有 eid 挂不上任何入口
    items.push({
      eid,
      name: typeof raw.name === 'string' ? raw.name : '',
      releaseTime: asMs(raw.releaseTime),
      deadline: asMs(raw.deadline),
      totalScore: asNumber(raw.totalScore),
      userScore: asNumber(raw.userScore),
      scorePubStatus: asNumber(raw.scorePubStatus),
      usedTryCount: asNumber(raw.usedTryCount),
      tryTime: asNumber(raw.tryTime),
      draftAid: asNumber(raw.draftAid),
      objectTestId: asNumber(raw.objectTestId),
      subjectTestId: asNumber(raw.subjectTestId),
      evaluateStart: asMs(raw.evaluateStart),
      evaluateEnd: asMs(raw.evaluateEnd),
    });
  }
  return ok(items);
}

// ---------- 答卷页取卷（2026-11-08 开考实测，留痕 .probe/newexam-live/） ----------

/** 评分点（与旧系统 judgeDtos 同构：富文本 + 满分）。 */
export interface NewExamJudgePoint {
  /** 评分依据的富文本（含行内图片） */
  msg: string;
  maxScore: number;
}

/** 一道题：作答与展示所需的全部（其余字段不取——题面由页面自己渲染）。 */
export interface NewExamPaperQuestion {
  id: number;
  /** 题型 id（实测：1=单选、4=判断、10=主观） */
  type: number;
  score: number;
  /** 该题 testId（同一卷的客观题部分共用 objectTestId；填充索引的入口参数） */
  testId: number;
  /** 选项 id，**按卷面顺序**（填充面板按此序映射页面选项位次） */
  optionIds: number[];
  /** 评分点：主观题随卷下发（实测 type=10 有、1/4 为 null） */
  judgeDtos: NewExamJudgePoint[] | null;
}

/** 一份已开卷的答卷（getPaper 归一化结果）。 */
export interface NewExamPaper {
  /** 答卷 id（mm-tiku 空间；旧测验信息端点同样认它，实测互认） */
  aid: number;
  examId: number;
  /** 客观题部分的 testId（各题一致；填充索引用） */
  testId: number;
  /** 全部题目，**卷面顺序**（页面渲染顺序与之逐位一致，实测 14/14） */
  questions: NewExamPaperQuestion[];
  /** 1 = 作答中 */
  submitStatus: number;
}

/**
 * 取一份已开卷的新版考试答卷。
 *
 * 三步链，每步都单独实测过（2026-11-08 开考现场，留痕 .probe/newexam-live/）：
 *   ① getPaperIntroduce({examId}) —— 协议页自己的加载调用（纯读），objectTestId 在响应里；
 *   ② getOpenQuizInfo({tid: objectTestId}) —— 旧测验信息端点**认新考试的 test id**，
 *      顶层的 aid 就是活跃答卷（新旧答卷空间共享，实测互认）；未开卷时 aid 为 0/null；
 *   ③ getPaper({examId, answerformId: aid}) —— 完整卷面（judgeDtos + 选项序）。
 *
 * 报文格式（源码 chunk 97580 的请求包装器逐字）：mm-tiku 族走 **form 表单**
 * （application/x-www-form-urlencoded，值为 JSON.stringify(对象) / String(标量)），
 * csrfKey 拼在查询串上；JSON body 会被网关以「不支持类型:application/json」拒收。
 * ②是 /web/j 旧族，走标准 rpc；①③是 mm-tiku form。本函数是纯读，绝不替用户开卷。
 */
export async function getNewExamPaper(
  client: MoocClient,
  examId: number,
): Promise<Result<NewExamPaper, TransportError>> {
  /** mm-tiku 的 form 直发：路径取自端点表（唯一来源），报文为表单（见上）。 */
  const callTiku = async (
    endpoint: { bean: string; method: string; pathPrefix?: string },
    params: Record<string, unknown>,
  ): Promise<Result<Record<string, unknown>, TransportError>> => {
    const token = await client.getToken();
    const form = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      form.set(key, typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value));
    }
    const timeout = startOutboundTimeout(DEFAULT_TIMEOUT_MS);
    try {
      const response = await client.send(
        `${client.origin}${endpoint.pathPrefix ?? ''}/web/j/${endpoint.bean}.${endpoint.method}.rpc?csrfKey=${token}`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' },
          body: form.toString(),
          credentials: 'include',
          signal: timeout.signal,
        },
      );
      const text = await response.text();
      if (!response.ok) return err(httpError(response.status, text));
      const parsed = JSON.parse(text) as { code?: unknown; message?: unknown; result?: unknown };
      if (parsed.code !== 0) {
        return err(
          apiError(
            typeof parsed.code === 'number' ? parsed.code : -1,
            typeof parsed.message === 'string' ? parsed.message : undefined,
            text,
          ),
        );
      }
      return ok((parsed.result ?? {}) as Record<string, unknown>);
    } catch (cause) {
      return err(timeout.timedOut() ? timeoutError(DEFAULT_TIMEOUT_MS) : networkError(cause));
    } finally {
      timeout.dispose();
    }
  };

  const intro = await callTiku(ENDPOINTS.newExamPaperIntro, { examId });
  if (!intro.ok) return intro;
  const objectTestId = asNumber(intro.value?.objectTestId);
  if (objectTestId === null) {
    return err(apiError(-1, '新版考试：介绍响应里没有客观题部分 id（平台回的形状与预期不符）'));
  }

  const open = await client.rpc.call<{ aid?: unknown }>(
    ENDPOINTS.openQuizInfo.bean,
    ENDPOINTS.openQuizInfo.method,
    { tid: objectTestId, targetAid: null, isDraft: false },
  );
  if (!open.ok) return open;
  const aid = asNumber(open.value?.aid);
  if (aid === null || aid <= 0) {
    return err(apiError(-1, '这场考试还没有作答中的答卷（尚未开始或已交）'));
  }

  const paper = await callTiku(ENDPOINTS.newExamPaper, { examId, answerformId: aid });
  if (!paper.ok) return paper;

  const value = paper.value;
  const paperAid = asNumber(value.aid);
  if (paperAid === null) {
    return err(apiError(-1, '新版考试取卷：响应里没有答卷 id（平台回的形状与预期不符）'));
  }
  const rawQuestions = Array.isArray(value.questions) ? value.questions : null;
  if (rawQuestions === null || rawQuestions.length === 0) {
    return err(apiError(-1, '新版考试取卷：响应里没有题目列表（平台回的形状与预期不符）'));
  }

  const testIds = new Set<number>();
  const questions: NewExamPaperQuestion[] = [];
  for (const raw of rawQuestions as Array<Record<string, unknown> | null>) {
    if (raw === null || typeof raw !== 'object') continue;
    const id = asNumber(raw.id);
    const type = asNumber(raw.type);
    if (id === null || type === null) continue;
    const testId = asNumber(raw.testId);
    if (testId !== null) testIds.add(testId);

    const rawOptions = Array.isArray(raw.optionDtos) ? raw.optionDtos : [];
    const optionIds: number[] = [];
    for (const option of rawOptions as Array<Record<string, unknown> | null>) {
      const optionId = asNumber(option?.id);
      if (optionId !== null) optionIds.push(optionId);
    }

    const rawJudges = Array.isArray(raw.judgeDtos) ? raw.judgeDtos : null;
    const judgeDtos =
      rawJudges === null
        ? null
        : rawJudges
            .map((j) => {
              const msg = typeof (j as { msg?: unknown } | null)?.msg === 'string' ? (j as { msg: string }).msg : null;
              const maxScore = asNumber((j as { maxScore?: unknown } | null)?.maxScore);
              return msg !== null && msg !== '' && maxScore !== null ? { msg, maxScore } : null;
            })
            .filter((j): j is NewExamJudgePoint => j !== null);
    const judged = judgeDtos !== null && judgeDtos.length > 0 ? judgeDtos : null;

    questions.push({
      id,
      type,
      score: asNumber(raw.score) ?? 0,
      testId: testId ?? 0,
      optionIds,
      judgeDtos: judged,
    });
  }
  if (questions.length === 0) {
    return err(apiError(-1, '新版考试取卷：题目列表一条都读不出（平台回的形状与预期不符）'));
  }
  const [sharedTestId] = testIds;
  return ok({
    aid: paperAid,
    examId,
    testId: sharedTestId ?? 0,
    questions,
    submitStatus: asNumber(value.submitStatus) ?? 0,
  });
}

function asNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function asMs(value: unknown): number | null {
  const parsed = asNumber(value);
  return parsed !== null && parsed > 0 ? parsed : null;
}

/**
 * 单元作业（含互评）接口。
 *
 * 互评走 DWR 而不是 .rpc。完成一份互评需要三步：
 *
 *   1. `getEvaluateDetail`  读该作业的互评配额与已完成份数
 *   2. `nextSubmission`     取下一份待评答卷，服务端会把一份答卷分配给自己
 *   3. `submitEvaluation`   提交评分
 *
 * 判定调用是否成功一律基于响应文本，而不是 HTTP 状态码——
 * DWR 即使业务失败也返回 200。
 *
 * 报文结构取自真实抓包（大物第三单元 testId 1258704159）与本轮实测响应。
 */

import { ok, type Result } from '@study-pilot/core';
import {
  DwrEncoder,
  extractDwrPayload,
  isDwrSuccess,
  type TransportError,
} from '@study-pilot/transport';
import type { MoocClient } from './client.ts';
import { DWR_ENDPOINTS } from './endpoints.ts';
// 本文件仍要用到移出后的这三样：解析 DWR、判断评测类型、构造提交体
import { EVALUATE_JUDGE_TYPE, groupDwrObjects, parseDwrObjectVariables } from './dwr-parse.ts';
import type { EvaluationItem } from './evaluation-items.ts';

// ---------- 取数 ----------

/** 服务端分配的待评答卷。 */
export interface NextSubmission {
  evaluateId: number;
  /** 答题表单 id */
  aid: number;
  /** 1 表示未评，2 表示已评 */
  status: number;
  testId: number;
}

export interface SubmissionProgress {
  next: NextSubmission | null;
  total: number;
  max: number;
  completed: number;
}

/**
 * 一次互评任务的进度。
 *
 * 平台对互评的要求是「至少为若干份作业评分」，页面上写明「不评或者少评都会
 * 直接影响作业成绩和证书发放」。这个数量由服务端给出，即 `required`。
 * 因此判断互评任务是否做完的依据是「已完成份数是否达到配额」，而不是别的。
 */
export interface EvaluationProgress {
  testId: number;
  /** 需要完成的份数，对应响应的 totalEvaluateCount */
  required: number;
  /** 已完成的份数，对应 completedEvaluates 的长度 */
  completed: number;
  /** 还需完成的份数；已达标为 0 */
  remaining: number;
  /** 进行中的那一份；null 表示还没有开始评分 */
  started: { evaluateId: number; answerformId: number } | null;
  /** 服务端是否还有足够的答卷可分配 */
  enoughAnswer: boolean;
  /**
   * 自评那一份；null 表示这份作业没有自评环节。
   *
   * 自评与互评走同一套接口，区别只在评测对象的 evaluateJudgeType：
   * 2 是互评，3 是自评。自评指向自己的作业，不需要服务端分配。
   *
   * done 来自评测对象的 status：实测未自评时为 1。
   * 不能靠「self 是否存在」判断是否评过——评完之后这一项依然在响应里。
   */
  self: { evaluateId: number; answerformId: number; done: boolean } | null;
}

/**
 * 统计 DWR 响应中数组的元素个数。
 *
 * 服务端把数组拆成逐项赋值，形如 `s0[0]=s4;s0[1]=s5;`，
 * 因此取下标的最大值加一即为长度。
 */
export function countDwrArray(raw: string, arrayName: string): number {
  const pattern = new RegExp(`${arrayName}\\[(\\d+)\\]\\s*=`, 'g');
  let maxIndex = -1;

  for (const match of raw.matchAll(pattern)) {
    maxIndex = Math.max(maxIndex, Number(match[1]));
  }

  return maxIndex + 1;
}

/**
 * 读某个作业的互评进度。
 *
 * 参数与源码一致：`_$getEvaluateDetail(homeworkId, evaluatorId)`。
 */
export async function getEvaluationDetail(
  client: MoocClient,
  testId: number,
  evaluatorId: number,
): Promise<Result<EvaluationProgress, TransportError>> {
  const encoder = new DwrEncoder();
  const response = await client.dwr.call(
    DWR_ENDPOINTS.evaluateDetail.bean,
    DWR_ENDPOINTS.evaluateDetail.method,
    [
      `c0-param0=${encoder.literalString(String(testId))}`,
      `c0-param1=${encoder.literalString(String(evaluatorId))}`,
    ],
  );
  if (!response.ok) return response;

  const raw = response.value.raw;
  const payload = extractDwrPayload(raw) ?? '';

  const required = Number(payload.match(/totalEvaluateCount:(\d+)/)?.[1] ?? 0);
  const enoughAnswer = /enoughAnswer:true/.test(payload);

  // completedEvaluates 是数组，长度由 s0[n]= 的赋值个数决定
  const completedRef = payload.match(/completedEvaluates:(s\d+)/)?.[1];
  const completed = completedRef ? countDwrArray(raw, completedRef) : 0;

  // startedEvaluate 是单个对象引用，其 status 为 1 才表示这份答卷处于进行中
  const startedRef = payload.match(/startedEvaluate:(s\d+)/)?.[1];
  let started: EvaluationProgress['started'] = null;
  if (startedRef) {
    const evaluateId = Number(raw.match(new RegExp(`${startedRef}\\.evaluateId=(-?\\d+)`))?.[1] ?? 0);
    const answerformId = Number(
      raw.match(new RegExp(`${startedRef}\\.answerformId=(-?\\d+)`))?.[1] ?? 0,
    );
    const status = Number(raw.match(new RegExp(`${startedRef}\\.status=(-?\\d+)`))?.[1] ?? 0);
    if (evaluateId > 0 && status === 1) started = { evaluateId, answerformId };
  }

  /*
   * 自评。响应里所有评测对象混在一起，靠 evaluateJudgeType 区分：
   * 3 是自评，指向用户自己的作业。逐个对象查，取第一个匹配的。
   *
   * status 为 1 表示还没评（实测未自评的自评对象 status=1，
   * 已评的互评对象 status=2），据此判断是否已完成。
   */
  let self: EvaluationProgress['self'] = null;
  for (const fields of groupDwrObjects(raw).values()) {
    if (Number(fields.evaluateJudgeType ?? 0) !== EVALUATE_JUDGE_TYPE.SELF) continue;
    const evaluateId = Number(fields.evaluateId ?? 0);
    const answerformId = Number(fields.answerformId ?? 0);
    if (evaluateId > 0 && answerformId > 0) {
      self = { evaluateId, answerformId, done: Number(fields.status ?? 0) !== 1 };
      break;
    }
  }

  return ok({
    testId,
    required,
    completed,
    remaining: Math.max(0, required - completed),
    started,
    enoughAnswer,
    self,
  });
}

/**
 * 取下一份待评答卷。
 *
 * 注意副作用：服务端会把某份答卷分配给当前用户。
 * 互评窗口已关闭的单元调用它是安全的；窗口开启时会真的占用一份。
 */
export async function nextSubmission(
  client: MoocClient,
  testId: number,
  evaluatorId: number,
): Promise<Result<SubmissionProgress, TransportError>> {
  const encoder = new DwrEncoder();
  const response = await client.dwr.call(
    DWR_ENDPOINTS.nextSubmission.bean,
    DWR_ENDPOINTS.nextSubmission.method,
    [
      `c0-param0=${encoder.literalString(String(testId))}`,
      `c0-param1=${encoder.literalString(String(evaluatorId))}`,
    ],
  );
  if (!response.ok) return response;

  const raw = response.value.raw;
  const fields = parseDwrObjectVariables(raw);
  const evaluateId = Number(fields.evaluateId ?? 0);

  const payload = extractDwrPayload(raw) ?? '';
  const total = Number(payload.match(/total:(-?\d+)/)?.[1] ?? 0);
  const max = Number(payload.match(/max:(-?\d+)/)?.[1] ?? 0);
  const completed = Number(payload.match(/completed:(-?\d+)/)?.[1] ?? 0);

  return ok({
    next:
      evaluateId > 0
        ? {
            evaluateId,
            aid: Number(fields.answerformId ?? 0),
            status: Number(fields.status ?? 0),
            testId: Number(fields.testId ?? testId),
          }
        : null,
    total,
    max,
    completed,
  });
}

/**
 * 提交一份互评。写操作。
 *
 * 报文结构取自真实抓包（在大物第三单元的互评页实测）：
 *
 *   c0-param0 = Object_Object:{
 *     evaluateId: string:<evaluateId>,
 *     testId:     number:<testId>,
 *     qitems:     Array:[ Object_Object:{
 *       qid:                  number:<题目 id>,
 *       qcomment:             string:<URL 编码的评语>,
 *       answerCanViewComment: boolean:<答题者是否可见>,
 *       jitems:               Array:[ Object_Object:{
 *         jid:    string:<评分点 id>,
 *         jscore: string:<该评分点的分数>
 *       } ]
 *     } ]
 *   }
 *   c0-param1 = boolean:<是否只存草稿>
 *
 * `jid` 与 `jscore` 都是字符串，与页面上 `data-jid` 和 `input.value` 的类型一致。
 * 前端源码 `EvaluateItemUI._$getEvaluateData` 只覆写 `qcomment`、
 * `answerCanViewComment` 与 `jitems` 三项，评测对象本身的其余字段由服务端下发，
 * 因此这里也只传这四项。
 */
export async function submitEvaluation(
  client: MoocClient,
  evaluateId: number,
  testId: number,
  items: EvaluationItem[],
  options: { saveDraft?: boolean } = {},
): Promise<Result<boolean, TransportError>> {
  const encoder = new DwrEncoder();

  const evaluateIdRef = encoder.string(String(evaluateId));
  const testIdRef = encoder.number(testId);

  const itemRefs = items.map((item) => {
    const viewCommentRef = encoder.boolean(item.answerCanViewComment);
    const jidRef = encoder.string(item.jid);
    const jscoreRef = encoder.string(String(item.jscore));
    const judgeRef = encoder.object({ jid: jidRef, jscore: jscoreRef });
    const judgesRef = encoder.array([judgeRef]);
    const commentRef = encoder.string(encodeURIComponent(item.comment));
    const qidRef = encoder.number(item.qid);

    return encoder.object({
      qid: qidRef,
      qcomment: commentRef,
      answerCanViewComment: viewCommentRef,
      jitems: judgesRef,
    });
  });

  const qitemsRef = encoder.array(itemRefs);

  const response = await client.dwr.call(
    DWR_ENDPOINTS.submitEvaluate.bean,
    DWR_ENDPOINTS.submitEvaluate.method,
    [
      ...encoder.build(),
      `c0-param0=Object_Object:{evaluateId:${evaluateIdRef},testId:${testIdRef},qitems:${qitemsRef}}`,
      `c0-param1=boolean:${options.saveDraft === true}`,
    ],
  );
  if (!response.ok) return response;

  return ok(isDwrSuccess(response.value.raw));
}

// 读取、评分项与 DWR 解析已按域移出，这里保持唯一出口，导入方不受影响
export * from './homework-read.ts';
export * from './evaluation-items.ts';
export * from './dwr-parse.ts';
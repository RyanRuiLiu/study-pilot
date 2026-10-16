/*
 * 神谕：交卷前的官方确认（移动端 `appstudent` 的草稿判分）。
 *
 * 平台事实（2026-10-17 逐条真机探得，见设计文档 §1.4）：
 *   - 宿主 `appstudent.zhihuishu.com/appstudent`，**免签明文表单**；
 *   - `questionIds` 必填（缺 → HTTP 400「缺少必要的参数」）；
 *   - **只认数字题号**（喂 eid 报 `fastjson JSONException: parseInt error`）；
 *   - `userId` 必填（缺 → 500 NumberFormatException）；
 *   - 响应 `{"rt":{"<题号>":{"score":"2","done":"true"}}}`；
 *   - **判分是草稿实况，不是上次交卷的存档**——两次真机对照：存错解 `score:0`、
 *     存正解 `score:2`。所以它能在 `submit` 之前当验证器用。
 *
 * ★ 用法边界（写死在这里，防止后来者扩大用途）：
 *   本模块**只做验证**——喂的是「我自己这张卷、我自己已持有的题号」。
 *   **绝不用它做「试错定位题号」或「逐选项试答案」**：那是已被废止的
 *   IDOR 式枚举（设计文档 §3 模块 3、FINDINGS §二十五），不实现、不使用、不产品化。
 *   历史上 `.probe/zhs-sbx-submit/eval-window.js` 就是那套手法的脚本。
 */

import type { ZhsClient } from './client.ts';

export interface OracleVerdict {
  /** 每一题都答对、都判了分，且总分与卷面总分吻合 */
  pass: boolean;
  /** 神谕给出的逐题得分之和 */
  scoreSum: number;
  /** 本次问的题数 */
  asked: number;
  /** 神谕没回、或回了但分数解析不出的题号（→ 不算通过） */
  missing: string[];
  /** 得了 0 分的题号 */
  zeroScored: string[];
}

/**
 * 把神谕响应与卷面总分比出结论（纯函数）。
 *
 * 判据 = `Σ每题得分 == totalScore` 且每题都有回、没有 0 分。
 *
 * **`totalScore` 缺失 = 判据失效 = 不通过**（不是「跳过」）：这时候放行，
 * 交出去的那一枪就是没把握的一枪，而这一次机会是不可逆的。
 */
export function judge(input: {
  rt: unknown;
  questionIds: readonly (string | number)[];
  totalScore: number | null;
}): OracleVerdict {
  const table = (input.rt ?? {}) as Record<string, unknown>;
  const missing: string[] = [];
  const zeroScored: string[] = [];
  let scoreSum = 0;

  for (const raw of input.questionIds) {
    const id = String(raw);
    const entry = table[id] as { score?: unknown } | null | undefined;
    const score = entry === null || entry === undefined ? Number.NaN : Number(entry.score);
    if (!Number.isFinite(score)) {
      missing.push(id);
      continue;
    }
    scoreSum += score;
    if (score === 0) zeroScored.push(id);
  }

  const asked = input.questionIds.length;
  const answeredFully = asked > 0 && missing.length === 0;
  const pass =
    answeredFully && zeroScored.length === 0 && input.totalScore !== null && scoreSum === input.totalScore;

  return { pass, scoreSum, asked, missing, zeroScored };
}

/** 问一次神谕，返回 `rt`（逐题得分表）。失败按 client 的既有语义抛，**不吞**。 */
export async function askOracle(
  client: ZhsClient,
  input: {
    recruitId: number;
    /** CASLOGC 的 userId；调用方必须已经确认它不是 null（这里不做兜底） */
    userId: number;
    examId: number;
    stuExamId: number;
    questionIds: readonly number[];
  },
): Promise<unknown> {
  const body = await client.call('examQuestionDoneState', {
    recruitId: input.recruitId,
    userId: input.userId,
    examId: input.examId,
    stuExamId: input.stuExamId,
    questionIds: JSON.stringify(input.questionIds),
  });
  return (body as { rt?: unknown }).rt;
}

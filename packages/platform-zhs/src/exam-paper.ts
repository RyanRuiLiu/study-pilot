/*
 * 卷面与作答报文（考试族的结构层，无 IO）。
 *
 * 两个平台事实决定了这一层的形状（2026-10-16／17 真机，证据在
 * `.probe/zhs-sbx-submit/eval-close-loop.js` 与 net-ch2.jsonl）：
 *
 *  1. **作答用 `eid` 定位题目，不是数字题号**。数字题号只在交卷之后由
 *     `student/lookHomework` 下发；而 `eid` 开卷卷面上就有。所以「答题」这条链
 *     完全不需要题号——题号只有三处要：建键（弹题通道）、神谕、题号台账。
 *
 *  2. **选项 id 在卷面里是数字，键里是字符串**。`exam-answers.ts` 的键口径统一
 *     用字符串（`String(id)`），所以这里出口一律转字符串；比对才有意义。
 *
 * 报文里的常量（`fromType: 3`、空的 `deviceId`/`examType`/`dataIds`）是**实测形态**，
 * 照抄——它们不是「暂时空着」，是真实客户端就这么发的。
 */

import type { PaperOption, PaperQuestion } from './exam-answers.ts';

/** 一次作答的报文元素（`saveStudentAnswer` 的 `stuExamAnswer` 数组的一项）。 */
export interface AnswerPayload {
  eid: string;
  /** 本题要选的**卷面侧**选项 id */
  optionIds: string[];
  /** 题型 id（卷面 `questionType.id`，作答报文要带） */
  questionType: number;
}

/** 一道题的原始 DTO 与它的选项（两个接口共用的走法）。 */
interface RawQuestion {
  eid: string;
  questionId: number | null;
  text: string;
  questionType: number;
  options: PaperOption[];
}

/**
 * 走一遍 `rt.examBase.workExamParts[].questionDtos[]`。
 *
 * 两个接口的响应**外壳同形、字段互补**，所以走法是共用的、取舍不同：
 *
 * | 字段 | `doHomework`（开卷） | `lookHomework`（交卷后） |
 * |---|---|---|
 * | `eid` | 有（base64 串） | **null** |
 * | `id`（数字题号） | **null** | 有（int） |
 * | `name` / `questionOptions` / `questionType` | 有 | 有 |
 *
 * 这是平台的设计：**题号与 eid 一个在前一个在后，凑齐一份题要两个接口**。
 * 所以别写「一个解析器吃两种响应」——那会把互补当成同形，拿 lookHomework
 * 解出空表来（2026-10-17 真机核对，两个方向都验过）。
 */
function walkQuestions(rt: unknown): RawQuestion[] {
  const base = (rt as { examBase?: unknown } | null | undefined)?.examBase as
    | { workExamParts?: unknown }
    | null
    | undefined;
  const parts = base?.workExamParts;
  if (!Array.isArray(parts)) return [];

  const out: RawQuestion[] = [];
  for (const part of parts as Array<{ questionDtos?: unknown } | null>) {
    const dtos = part?.questionDtos;
    if (!Array.isArray(dtos)) continue;
    for (const dto of dtos as Array<Record<string, unknown> | null>) {
      if (dto === null || typeof dto !== 'object') continue;

      const options: PaperOption[] = [];
      const rawOptions = dto.questionOptions;
      if (Array.isArray(rawOptions)) {
        for (const option of rawOptions as Array<Record<string, unknown> | null>) {
          if (option === null || typeof option !== 'object') continue;
          if (option.id === null || option.id === undefined) continue;
          options.push({
            id: String(option.id),
            text: typeof option.content === 'string' ? option.content : '',
          });
        }
      }

      const type = (dto.questionType as { id?: unknown } | null | undefined)?.id;
      out.push({
        eid: typeof dto.eid === 'string' ? dto.eid : '',
        questionId: typeof dto.id === 'number' && Number.isFinite(dto.id) ? dto.id : null,
        text: typeof dto.name === 'string' ? dto.name : '',
        questionType: typeof type === 'number' && Number.isFinite(type) ? type : 0,
        options,
      });
    }
  }
  return out;
}

/**
 * 卷面一道题（开卷）：`exam-answers.ts` 的形状 + 作答报文要的题型 id。
 *
 * 是 `PaperQuestion` 的**扩展**（多一个字段），所以能直接喂 `matchPaper`——
 * 题型是答卷层的事，不往答案键模块里塞。
 */
export interface PaperQuestionFull extends PaperQuestion {
  /** 题型 id（卷面 `questionType.id`）；取不到给 0——**0 不是任何真实题型**，出现即形态变了 */
  questionType: number;
  /**
   * 开卷恒为 null——平台把数字题号锁在交卷之后（实测 50/50 全 null）。
   * 字段留在类型上是为了让「这卷有没有题号」这件事显式可见，
   * 而不是让调用方去猜为什么 `questionIdsOf` 返回空。
   */
  questionId: null;
}

/** 交卷后回顾的一道题（`lookHomework`）：题号有、`eid` 为 null。 */
export interface LookedQuestion {
  /** 数字题号（int，十位数亿量级）——神谕与弹题通道的入口参数 */
  questionId: number;
  text: string;
  options: PaperOption[];
}

/**
 * `student/doHomework` 的响应 → 卷面（作答用）。
 * 没有 `eid` 的题跳过——作答认 eid，缺了就答不了。
 */
export function parsePaper(rt: unknown): PaperQuestionFull[] {
  return walkQuestions(rt)
    .filter((question) => question.eid !== '')
    .map((question) => ({
      eid: question.eid,
      text: question.text,
      options: question.options,
      questionType: question.questionType,
      questionId: null,
    }));
}

/**
 * `student/lookHomework` 的响应 → 已交卷的题（取题号与题面用）。
 * 没有数字题号的题跳过——这个接口的价值就在题号。
 */
export function parseLookedPaper(rt: unknown): LookedQuestion[] {
  const out: LookedQuestion[] = [];
  for (const question of walkQuestions(rt)) {
    if (question.questionId === null) continue;
    out.push({ questionId: question.questionId, text: question.text, options: question.options });
  }
  return out;
}

/** 已交卷各题的数字题号（神谕与弹题通道的入口参数）。 */
export function questionIdsOf(paper: readonly LookedQuestion[]): number[] {
  return paper.map((question) => question.questionId);
}

export interface BuildAnswerBodyInput {
  answers: readonly AnswerPayload[];
  /** 8 字符串 examId（`examBase.id`，dohomework 路由的 t2） */
  examId: string;
  recruitId: number;
  /** 清单条目 id（dohomework 路由的 t1） */
  stuExamId: string;
  schoolId: number;
  courseId: number;
}

/**
 * 组 `answer/saveStudentAnswer` 的 `stuExamAnswer` 字段值（JSON 字符串）。
 *
 * 没有 eid 或没有选项的作答**不进报文**——空作答发上去只会污染答卷，
 * 而我们要的是「要么按正解答，要么不答」。返回空数组是合法结果，
 * 由调用方判断（空数组意味着这一轮没有可交的东西）。
 */
export function buildAnswerBody(input: BuildAnswerBodyInput): string {
  const rows = input.answers
    .filter((answer) => answer.eid !== '' && answer.optionIds.length > 0)
    .map((answer) => ({
      examId: input.examId,
      recruitId: input.recruitId,
      stuExamId: input.stuExamId,
      eid: answer.eid,
      schoolId: input.schoolId,
      deviceId: '',
      examType: '',
      fromType: 3,
      answer: answer.optionIds.join(','),
      dataIds: '',
      questionType: answer.questionType,
    }));
  return JSON.stringify(rows);
}

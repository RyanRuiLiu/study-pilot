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

/**
 * 卷面一道题：`exam-answers.ts` 的形状 + 作答报文要的题型 id。
 *
 * 是 `PaperQuestion` 的**扩展**（多一个字段），所以能直接喂 `matchPaper`——
 * 题型是答卷层的事，不往答案键模块里塞。
 */
export interface PaperQuestionFull extends PaperQuestion {
  /** 题型 id（卷面 `questionType.id`）；取不到给 0——**0 不是任何真实题型**，出现即形态变了 */
  questionType: number;
}

/** `student/doHomework` 的响应 → 卷面。形状不对的层级逐层退化，取不到的题跳过。 */
export function parsePaper(rt: unknown): PaperQuestionFull[] {
  const base = (rt as { examBase?: unknown } | null | undefined)?.examBase as
    | { workExamParts?: unknown }
    | null
    | undefined;
  const parts = base?.workExamParts;
  if (!Array.isArray(parts)) return [];

  const paper: PaperQuestionFull[] = [];
  for (const part of parts as Array<{ questionDtos?: unknown } | null>) {
    const dtos = part?.questionDtos;
    if (!Array.isArray(dtos)) continue;
    for (const dto of dtos as Array<Record<string, unknown> | null>) {
      if (dto === null || typeof dto !== 'object') continue;
      const eid = typeof dto.eid === 'string' ? dto.eid : '';
      if (eid === '') continue; // 没有 eid 就无法作答——跳过，不造题

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
      paper.push({
        eid,
        text: typeof dto.name === 'string' ? dto.name : '',
        options,
        questionType: typeof type === 'number' && Number.isFinite(type) ? type : 0,
      });
    }
  }
  return paper;
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

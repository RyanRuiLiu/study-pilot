/**
 * 评分项：把作业题目转成提交互评所需的评分项。
 *
 * 从 `review.ts` 移出。对外仍从 `review.ts` 导出，导入方不必改。
 */

import type { HomeworkPaper, PaperQuestion } from './types.ts';

/** 单个评分项。字段名与 DWR 报文一致，不要改名。 */
export interface EvaluationItem {
  /** 题目 id */
  qid: number;
  /** 评分点 id。来自该题的 `judgeDtos[].id` */
  jid: string;
  /** 题目满分 */
  qscore: number;
  /** 实际给分 */
  jscore: number;
  /** 评语 */
  comment: string;
  /** 是否允许答题者查看评语 */
  answerCanViewComment: boolean;
}

/**
 * 由作业答卷构造评分项，每题给满分并附统一评语。
 *
 * 一题可能有多个评分点（`judgeDtos`），此时逐个展开，每个评分点单独给分。
 * 题目没有评分点时 `jid` 取空串，表示该题按整体评分，这也是一种正常的形态，
 * 作业里存在只有整体分、没有细分评分点的题目。
 */
export function buildEvaluationItems(
  paper: Pick<HomeworkPaper, 'subjectiveQList' | 'objectiveQList'>,
  comment: string,
  options: { answerCanViewComment?: boolean } = {},
): EvaluationItem[] {
  const questions: PaperQuestion[] = paper.subjectiveQList ?? paper.objectiveQList ?? [];
  const viewComment = options.answerCanViewComment ?? true;
  const items: EvaluationItem[] = [];

  for (const question of questions) {
    const qscore = question.score ?? 0;
    const judges = question.judgeDtos ?? [];

    if (judges.length === 0) {
      items.push({
        qid: question.id,
        jid: '',
        qscore,
        jscore: qscore,
        comment,
        answerCanViewComment: viewComment,
      });
      continue;
    }

    for (const judge of judges) {
      items.push({
        qid: question.id,
        jid: String(judge.id ?? ''),
        qscore,
        jscore: judge.maxScore ?? qscore,
        comment,
        answerCanViewComment: viewComment,
      });
    }
  }

  return items;
}

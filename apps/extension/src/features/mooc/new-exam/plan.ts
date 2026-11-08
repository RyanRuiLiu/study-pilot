/*
 * 新版考试填充计划的纯函数：卷面题目 + 答案映射 → 点击步骤。
 *
 * 输入两侧都来自既有通道：题目序与选项序来自 getPaper（卷面顺序，实测与页面
 * 渲染顺序逐位一致），正确标记来自填充索引（移动端答案通道，与单元测验同一份）。
 * 映射按**位次**对齐：第 i 道客观题的第 j 个选项 = 页面上该题的第 j 个选项块。
 * 没有正确标记的题不进计划，由调用方如实报告——答案不猜。
 */

/** 卷面一道客观题（来自 getNewExamPaper 的 questions，取作答所需的两样）。 */
export interface PlanQuestion {
  type: number;
  optionIds: number[];
}

/** 一个点击步骤：第 questionIndex 道题的第 optionIndex 个选项（两者都 0 起）。 */
export interface ClickStep {
  questionIndex: number;
  optionIndex: number;
}

export interface FillPlan {
  steps: ClickStep[];
  /** 有正确标记的客观题数 */
  covered: number;
  /** 客观题总数（单选/判断；主观与无选项题不算） */
  objective: number;
}

export function buildFillPlan(questions: PlanQuestion[], answerMap: Record<string, boolean>): FillPlan {
  const steps: ClickStep[] = [];
  let covered = 0;
  let objective = 0;

  for (const [questionIndex, question] of questions.entries()) {
    if (question.optionIds.length === 0) continue; // 主观题：无选项可点
    objective++;
    let hit = false;
    for (const [optionIndex, optionId] of question.optionIds.entries()) {
      if (answerMap[String(optionId)] !== true) continue;
      steps.push({ questionIndex, optionIndex });
      hit = true;
    }
    if (hit) covered++;
  }

  return { steps, covered, objective };
}

/*
 * 取卷：作业与考试两条数据源。
 *
 * 两者的接口不同，但返回的题目结构相同（都带 `judgeDtos`），
 * 因此注入逻辑只有一套。
 *
 *   作业  getOpenHomeworkInfo + getOpenHomeworkPaperDto
 *   考试  getOpenQuizPaperDto，aid 传 0 由服务端创建答卷
 */

import {
  currentEvaluatePhase,
  getHomeworkInfo,
  getHomeworkPaper,
  getQuizPaper,
  type MoocClient,
  type PaperQuestion,
} from '@study-pilot/platform-mooc';

/** 取作业的题目。任一步失败返回 null，由调用方决定不注入。 */
export async function loadHomeworkQuestions(
  client: MoocClient,
  tid: number,
): Promise<PaperQuestion[] | null> {
  const info = await getHomeworkInfo(client, tid);
  if (!info.ok) return null;

  const paper = await getHomeworkPaper(client, tid, {
    aid: info.value.aid ?? undefined,
    phase: currentEvaluatePhase(info.value),
  });
  if (!paper.ok) return null;

  return paper.value.subjectiveQList ?? paper.value.objectiveQList ?? [];
}

/**
 * 取考试的题目。
 *
 * aid 传 0：考试没有草稿态，服务端会为该用户创建答卷并返回题目。
 * 这一步是只读之外唯一会产生副作用的调用，但它只是"开始这份答卷"，
 * 与页面上点「开始考试」等价，不会替用户作答或提交。
 */
export async function loadExamQuestions(
  client: MoocClient,
  tid: number,
): Promise<PaperQuestion[] | null> {
  const paper = await getQuizPaper(client, tid, 0);
  if (!paper.ok) return null;

  return paper.value.subjectiveQList ?? paper.value.objectiveQList ?? [];
}

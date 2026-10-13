/*
 * 取一份卷的题目（作业或考试），供得分指导注入用。
 *
 * 为什么放在后台：内容脚本不持客户端。两个上下文各有一个节流器时互不知情，
 * 并发发请求会撞平台的并发限制；把取数集中到后台，节流也只有一处。
 *
 * 作业与考试的接口不同，但返回的题目结构相同（都带 judgeDtos）：
 *   作业  getHomeworkInfo + getHomeworkPaperDto
 *   考试  getOpenQuizPaperDto，aid 传 0 由服务端创建答卷
 */

import {
  currentEvaluatePhase,
  getHomeworkInfo,
  getHomeworkPaper,
  getQuizPaper,
  type PaperQuestion,
} from '@study-pilot/platform-mooc';
import type { QueryOutcome } from '../../platform/messaging';
import type { RouterDeps } from './router.ts';

export async function handleUnitQuestions(
  deps: RouterDeps,
  kind: 'homework' | 'exam',
  tid: number,
): Promise<QueryOutcome<PaperQuestion[]>> {
  if (kind === 'exam') {
    /*
     * aid 传 0：考试没有草稿态，服务端会为该用户创建答卷并返回题目。
     * 这是本模块唯一会产生副作用的调用，但与在页面上点「开始考试」等价。
     */
    const paper = await getQuizPaper(deps.client, tid, 0);
    return paper.ok
      ? { status: 'ok', value: paper.value.subjectiveQList ?? paper.value.objectiveQList ?? [] }
      : { status: 'error', message: paper.error.message };
  }

  const info = await getHomeworkInfo(deps.client, tid);
  if (!info.ok) return { status: 'error', message: info.error.message };

  const paper = await getHomeworkPaper(deps.client, tid, {
    aid: info.value.aid ?? undefined,
    phase: currentEvaluatePhase(info.value),
  });
  if (!paper.ok) return { status: 'error', message: paper.error.message };

  return { status: 'ok', value: paper.value.subjectiveQList ?? paper.value.objectiveQList ?? [] };
}

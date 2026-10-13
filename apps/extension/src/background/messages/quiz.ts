/*
 * 提交单元测验——平台写入的唯一入口之一。
 *
 * 为什么放在后台而不是内容脚本里
 * ------------------------------
 * 内容脚本与后台是两个执行上下文，各自建的客户端也各有节流器、互不知情。
 * 写入只要散到两边，就可能并发打到平台，撞上并发限制（-2）。
 * 因此写入一律从后台发出，前台只发一条消息。
 *
 * 答案当场从题库重新构造，不读草稿：实测草稿写入在当前环境下不生效，
 * 而提交体携带的 answers 是有效的（一次提交 13 道题全部计入成绩）。
 */

import {
  buildAnswerIndex,
  buildAnswers,
  getOpenQuizInfo,
  getQuizBank,
  getQuizPaper,
  submitQuiz,
} from '@study-pilot/platform-mooc';
import type { RouterDeps } from './router.ts';

export type SubmitQuizResult = { ok: true; matched: number } | { ok: false; message: string };

export async function handleSubmitQuiz(
  deps: RouterDeps,
  quizId: number,
  termId: number,
): Promise<SubmitQuizResult> {
  /*
   * 要用 getOpenQuizInfo 的顶层 aid：取卷接口传 0 返回的未必是页面正在用的那一份，
   * targetAnswerform.aid 则是最近一次已提交的记录。
   */
  const info = await getOpenQuizInfo(deps.client, quizId);
  const aid = info.ok && typeof info.value.aid === 'number' && info.value.aid > 0 ? info.value.aid : null;
  if (aid === null) return { ok: false, message: '未找到进行中的答卷' };

  const paper = await getQuizPaper(deps.client, quizId, aid);
  if (!paper.ok) return { ok: false, message: `取卷失败：${paper.error.message}` };

  const bank = await getQuizBank(deps.client, termId);
  if (!bank.ok) return { ok: false, message: `题库读取失败：${bank.error.message}` };

  const built = buildAnswers(paper.value, buildAnswerIndex(bank.value));
  if (built.total === 0) return { ok: false, message: '这份答卷没有客观题，无法自动作答' };
  if (built.unresolved.length > 0) {
    // 题库覆盖不全时不提交：部分作答会拿到低于预期的分数
    return {
      ok: false,
      message: `${built.unresolved.length} 道题未能在题库中找到答案，已中止提交`,
    };
  }

  const submitted = await submitQuiz(deps.client, paper.value);
  if (!submitted.ok) return { ok: false, message: `提交失败：${submitted.error.message}` };

  return { ok: true, matched: built.matched };
}

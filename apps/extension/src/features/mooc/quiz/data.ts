/*
 * 取数：题库、测验信息。
 *
 * 都经消息向后台取，不在内容脚本里建客户端：两个上下文各有一个节流器时
 * 互不知情，并发发请求会撞上平台的并发限制。
 *
 * 各有一份缓存，理由相同——同一页面上会反复用到，而它们在一次作答里不会变。
 */

import { buildAnswerIndex, type AnswerIndex, type OpenQuizInfo } from '@study-pilot/platform-mooc';
import { sendToBackground } from '../../../platform/messaging';

let cachedBank: { termId: number; index: AnswerIndex } | null = null;

export async function loadAnswerIndex(termId: number): Promise<AnswerIndex> {
  if (cachedBank?.termId === termId) return cachedBank.index;

  const outcome = await sendToBackground({ type: 'QUIZ_BANK', termId });
  // 取不到就按空题库走：填充会如实报「题库缺答案」，而不是假装成功
  const index = buildAnswerIndex(outcome.status === 'ok' ? outcome.value : []);
  cachedBank = { termId, index };
  return index;
}

/** 缓存的测验信息，用于展示总分。 */
let cachedInfo: { tid: number; fetchedAt: number; value: OpenQuizInfo } | null = null;

/** 测验信息的缓存时长。页面停留期间这些数据不会变化，取一分钟足够。 */
const INFO_TTL_MS = 60_000;

/** 取测验信息。命中缓存时不重复请求。 */
export async function loadQuizInfo(tid: number): Promise<OpenQuizInfo | null> {
  const now = Date.now();
  if (cachedInfo && cachedInfo.tid === tid && now - cachedInfo.fetchedAt < INFO_TTL_MS) {
    return cachedInfo.value;
  }

  const outcome = await sendToBackground({ type: 'QUIZ_INFO', tid });
  if (outcome.status !== 'ok') return null;

  cachedInfo = { tid, fetchedAt: now, value: outcome.value };
  return outcome.value;
}

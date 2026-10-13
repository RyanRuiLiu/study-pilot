/*
 * 取数：题库、当前答卷 id、测验信息。
 *
 * 三份数据各有缓存，理由都是「同一页面上会反复用到，而它们在一次作答里不会变」。
 */

import {
  buildAnswerIndex,
  getOpenQuizInfo,
  getQuizBank,
  type AnswerIndex,
  type MoocClient,
  type OpenQuizInfo,
} from '@study-pilot/platform-mooc';

let cachedBank: { termId: number; index: AnswerIndex } | null = null;

export async function loadAnswerIndex(client: MoocClient, termId: number): Promise<AnswerIndex> {
  if (cachedBank?.termId === termId) return cachedBank.index;

  const result = await getQuizBank(client, termId);
  const index = buildAnswerIndex(result.ok ? result.value : []);
  cachedBank = { termId, index };
  return index;
}

/** 缓存的测验信息，用于展示总分。 */
let cachedInfo: { tid: number; fetchedAt: number; value: OpenQuizInfo } | null = null;

/** 测验信息的缓存时长。页面停留期间这些数据不会变化，取一分钟足够。 */
const INFO_TTL_MS = 60_000;

/** 取测验信息。命中缓存时不重复请求。 */
export async function loadQuizInfo(client: MoocClient, tid: number): Promise<OpenQuizInfo | null> {
  const now = Date.now();
  if (cachedInfo && cachedInfo.tid === tid && now - cachedInfo.fetchedAt < INFO_TTL_MS) {
    return cachedInfo.value;
  }

  const info = await getOpenQuizInfo(client, tid);
  if (!info.ok) return null;

  cachedInfo = { tid, fetchedAt: now, value: info.value };
  return info.value;
}

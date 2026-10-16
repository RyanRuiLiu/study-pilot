/*
 * 取数：填充用的选项索引、测验信息。
 *
 * 都经消息向后台取，不在内容脚本里建客户端（两个上下文各有一个节流器时
 * 互不知情，并发发请求会撞上平台的并发限制）。
 *
 * 各有一份缓存，理由相同——同一页面上会反复用到，一次作答里它们不会变。
 */

import type { AnswerIndex, OpenQuizInfo } from '@study-pilot/platform-mooc';
import { sendToBackground } from '../../../messages.ts';

let cachedIndex: { key: string; index: AnswerIndex } | null = null;

/**
 * 选项 id → 是否为正确答案（后台合并：题库打底、页面当前这份卷覆盖。
 * 详见平台的 buildFillIndex）。
 */
export async function loadAnswerIndex(tid: number, termId: number): Promise<AnswerIndex> {
  const key = `${tid}:${termId}`;
  if (cachedIndex?.key === key) return cachedIndex.index;

  const outcome = await sendToBackground({ type: 'MOOC_QUIZ_FILL_INDEX', tid, termId });
  // 取不到就按空索引走：填充会如实报「没有答案」，而不是假装成功
  const index = new Map<string, boolean>(
    outcome.status === 'ok' ? Object.entries(outcome.value) : [],
  );
  cachedIndex = { key, index };
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

  const outcome = await sendToBackground({ type: 'MOOC_QUIZ_INFO', tid });
  if (outcome.status !== 'ok') return null;

  cachedInfo = { tid, fetchedAt: now, value: outcome.value };
  return outcome.value;
}

/*
 * 题库缓存。
 *
 * 按 termId 缓存，一轮之内同一门课只请求一次。题库是整门课的题目加答案，
 * 卷子里每道题都要靠它比对，逐题去查会成倍放大请求量。
 */

import { buildAnswerIndex, getQuizBank, type MoocClient } from '@study-pilot/platform-mooc';

export class BankCache {
  private readonly loaded = new Map<number, Map<string, boolean>>();

  async get(client: MoocClient, termId: number): Promise<Map<string, boolean> | null> {
    const cached = this.loaded.get(termId);
    if (cached) return cached;

    const bank = await getQuizBank(client, termId);
    if (!bank.ok) return null;

    const index = buildAnswerIndex(bank.value);
    this.loaded.set(termId, index);
    return index;
  }
}

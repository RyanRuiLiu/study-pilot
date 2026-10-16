/*
 * 「查看答案」的取数（loadViewAnswers）。
 *
 * 盯住三件事（2026-10-17 真机取证）：
 *   1. 作答页看的是**当前这份卷**（getQuizInfo 顶层 aid），它与 `targetAnswerform.aid`
 *      （最近一次已提交的记录）不是同一份；
 *   2. 答案只对已提交的卷下发，因此作答页的答案按题目 id 取自已提交的那份，
 *      抽不到的题 answer 为 null（随机抽题时两次作答的题目不同）；
 *   3. **绝不新开一份卷**：所有取卷请求的 aid 都不为 0。
 */

import { describe, expect, it } from 'vitest';
import { md5hex } from '@study-pilot/core';
import { createMoocClient } from '../src/client.ts';
import { loadViewAnswers } from '../src/quiz.ts';
import type { QuizPaper } from '../src/types.ts';

const TID = 1247900569;
const TOKEN = 'test-token';
const CURRENT_AID = 3538814063;
const SUBMITTED_AID = 3426750568;

/** 一份卷面：题目 id 与 position 由调用方给出（position 是题库序号，不是页面题号）。 */
function paper(aid: number, questions: Array<{ id: number; correct: string }>): QuizPaper {
  return {
    tid: TID,
    aid,
    objectiveQList: questions.map((q) => ({
      id: q.id,
      type: 1,
      optionDtos: [
        { id: q.id * 10, content: '错误项', answer: null },
        { id: q.id * 10 + 1, content: q.correct, answer: true },
      ],
    })),
  };
}

interface StubOptions {
  /** getQuizInfo 的 result（顶层 aid = 当前卷，targetAnswerform.aid = 已提交的那份）。 */
  info: Record<string, unknown>;
  /** 按 aid 分发的取卷结果。 */
  papers?: Map<number, QuizPaper>;
}

/** 记录每次请求；getQuizInfo 与 getOpenQuizPaperDto 分开应答，取卷按 aid 分发。 */
function clientStub({ info, papers = new Map() }: StubOptions) {
  const calls: Array<{ bean: string; body: Record<string, unknown> }> = [];
  const client = createMoocClient({
    fetch: (async (url: string, init?: RequestInit) => {
      const path = new URL(url).pathname;
      const bean = path.split('/').pop() ?? '';
      const body = JSON.parse(String(init?.body ?? '{}')) as Record<string, unknown>;
      calls.push({ bean, body });

      const result = bean.includes('getQuizInfo')
        ? info
        : (papers.get(Number(body.aid)) ?? null);
      return new Response(JSON.stringify({ code: 0, message: '', result }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }) as never,
    getToken: () => TOKEN,
    md5: md5hex,
    minGapMs: 0,
  });
  return {
    client,
    paperCalls: () => calls.filter((c) => c.bean.includes('getOpenQuizPaperDto')),
  };
}

describe('作答页（页面显示当前这份卷）', () => {
  it('题面取当前卷，答案按题目 id 取自已提交的那份；抽不到的题没有答案', async () => {
    const papers = new Map<number, QuizPaper>([
      // 当前这次作答：三题，position 是题库序号（3/4/8），不是页面题号
      [CURRENT_AID, paper(CURRENT_AID, [
        { id: 100, correct: '' },
        { id: 101, correct: '' },
        { id: 102, correct: '' },
      ])],
      // 上次已提交：只覆盖 100 与 102
      [SUBMITTED_AID, paper(SUBMITTED_AID, [
        { id: 100, correct: '甲题答案' },
        { id: 102, correct: '丙题答案' },
      ])],
    ]);
    const { client, paperCalls } = clientStub({
      info: { tid: TID, aid: CURRENT_AID, targetAnswerform: { aid: SUBMITTED_AID } },
      papers,
    });

    const result = await loadViewAnswers(client, TID, 'answering');
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    // 行按**当前卷**的顺序；答案按 id 取自旧卷，抽不到的是 null
    expect(result.value.map((row) => row.question.id)).toEqual([100, 101, 102]);
    const correctOf = (row: (typeof result.value)[number]): string | undefined =>
      row.answer?.optionDtos?.find((option) => option.answer === true)?.content;
    expect(correctOf(result.value[0]!)).toBe('甲题答案');
    expect(result.value[1]!.answer).toBeNull();
    expect(correctOf(result.value[2]!)).toBe('丙题答案');

    // 两次取卷都不是 aid=0（绝不新开卷）
    expect(paperCalls().map((call) => call.body.aid)).toEqual([SUBMITTED_AID, CURRENT_AID]);
  });

  it('没有正在作答的卷时如实失败', async () => {
    const { client } = clientStub({
      info: { tid: TID, aid: 0, targetAnswerform: { aid: SUBMITTED_AID } },
    });

    const result = await loadViewAnswers(client, TID, 'answering');
    expect(result.ok).toBe(false);
  });
});

describe('查看页（页面显示已提交的那份）', () => {
  it('题面与答案同源，取的是已提交的那份', async () => {
    const papers = new Map<number, QuizPaper>([
      [SUBMITTED_AID, paper(SUBMITTED_AID, [{ id: 100, correct: '甲题答案' }])],
    ]);
    const { client, paperCalls } = clientStub({
      info: { tid: TID, aid: 0, targetAnswerform: { aid: SUBMITTED_AID } },
      papers,
    });

    const result = await loadViewAnswers(client, TID, 'review');
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value).toHaveLength(1);
    expect(result.value[0]!.answer).toBe(result.value[0]!.question);
    expect(paperCalls().map((call) => call.body.aid)).toEqual([SUBMITTED_AID]);
  });

  it('从未作答时如实失败，且不发取卷请求', async () => {
    const { client, paperCalls } = clientStub({
      info: { tid: TID, aid: 0, targetAnswerform: null },
    });

    const result = await loadViewAnswers(client, TID, 'review');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.message).toContain('还没有作答过');
    expect(paperCalls()).toHaveLength(0);
  });
});

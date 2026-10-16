/*
 * 作答并提交（answerAndSubmitQuiz）——无人值守的执行与做题助手的提交按钮
 * 共用的唯一实现，因此这里把它的每条判据都钉住：
 *   1. 取卷用 aid = 0（页面上的「开始测验」就是它）；
 *   2. 卷面没带答案时用题库按选项 id 补，补到的答案进提交载荷；
 *   3. 含主观题的卷不交（只交客观部分=残缺答卷）；
 *   4. 有题取不到答案就一道都不交（部分作答会拿到低于预期的分数）；
 *   5. 提交前的停止键拦得住（stopped 时不发提交请求）。
 */

import { describe, expect, it } from 'vitest';
import { md5hex } from '@study-pilot/core';
import { createMoocClient } from '../src/client.ts';
import { answerAndSubmitQuiz } from '../src/quiz.ts';
import type { QuizPaper } from '../src/types.ts';

const TID = 9000000016;
const TERM_ID = 9000000029;
const TOKEN = 'test-token';

function paper(overrides: Partial<QuizPaper> = {}): QuizPaper {
  return {
    tid: TID,
    aid: 3538814063,
    objectiveQList: [
      { id: 11, type: 1, optionDtos: [{ id: 101, answer: true }, { id: 102, answer: false }] },
    ],
    ...overrides,
  };
}

/** 记录请求；getOpenQuizPaperDto 回给定卷面，getQuestionListByTermId 回给定题库，其余回成功。 */
function clientStub(options: { paper: QuizPaper | null; bank?: unknown[]; submitFails?: boolean }) {
  const calls: Array<{ bean: string; body: Record<string, unknown> }> = [];
  const client = createMoocClient({
    fetch: (async (url: string, init?: RequestInit) => {
      const path = new URL(url).pathname;
      const bean = path.split('/').pop() ?? '';
      const body = JSON.parse(String(init?.body ?? '{}')) as Record<string, unknown>;
      calls.push({ bean, body });

      if (bean.includes('getOpenQuizPaperDto')) {
        return new Response(JSON.stringify({ code: 0, message: '', result: options.paper }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });
      }
      if (bean.includes('getQuestionListByTermId')) {
        return new Response(JSON.stringify({ code: 0, message: '', result: options.bank ?? [] }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });
      }
      if (bean.includes('submitAnswers') && options.submitFails === true) {
        return new Response(JSON.stringify({ code: -1, message: '服务端 500', result: null }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({ code: 0, message: '', result: true }), {
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
    submitCalls: () => calls.filter((c) => c.bean.includes('submitAnswers')),
  };
}

describe('answerAndSubmitQuiz', () => {
  it('取卷用 aid = 0：这一步同时就是页面上的「开始测验」', async () => {
    const { client, paperCalls } = clientStub({ paper: paper() });

    const outcome = await answerAndSubmitQuiz(client, TID, TERM_ID);

    expect(outcome).toEqual({ status: 'submitted', matched: 1, total: 1 });
    expect(paperCalls()).toHaveLength(1);
    expect(paperCalls()[0]!.body.aid).toBe(0);
  });

  it('卷面没带答案（未提交的单元测验）时用题库按选项 id 补，补到的答案进提交载荷', async () => {
    const { client, submitCalls } = clientStub({
      paper: paper({
        objectiveQList: [{ id: 11, type: 1, optionDtos: [{ id: 101 }, { id: 102 }] }],
      }),
      bank: [{ id: 9001, type: 1, optionDtos: [{ id: 101, answer: false }, { id: 102, answer: true }] }],
    });

    const outcome = await answerAndSubmitQuiz(client, TID, TERM_ID);

    expect(outcome).toEqual({ status: 'submitted', matched: 1, total: 1 });
    const paperDto = submitCalls()[0]?.body.paperDto as { answers?: unknown };
    expect(paperDto.answers).toEqual([
      { qid: 11, type: 1, optIds: [102], time: expect.any(Number) },
    ]);
  });

  it('含主观题的卷不交：返回失败，也不发提交请求', async () => {
    const { client, submitCalls } = clientStub({
      paper: paper({ subjectiveQList: [{ id: 21, type: 10, plainTextTitle: '试述…' }] }),
    });

    const outcome = await answerAndSubmitQuiz(client, TID, TERM_ID);

    expect(outcome.status).toBe('failed');
    if (outcome.status === 'failed') expect(outcome.message).toContain('主观题');
    expect(submitCalls()).toHaveLength(0);
  });

  it('有题取不到答案（卷面与题库都没有）：一道都不交', async () => {
    const { client, submitCalls } = clientStub({
      paper: paper({
        objectiveQList: [
          { id: 11, type: 1, optionDtos: [{ id: 101, answer: true }] },
          { id: 12, type: 1, optionDtos: [{ id: 103 }, { id: 104 }] },
        ],
      }),
      bank: [],
    });

    const outcome = await answerAndSubmitQuiz(client, TID, TERM_ID);

    expect(outcome.status).toBe('failed');
    if (outcome.status === 'failed') expect(outcome.message).toContain('1 道题取不到答案');
    expect(submitCalls()).toHaveLength(0);
  });

  it('没有客观题：no-objective（调用方按跳过处理）', async () => {
    const { client } = clientStub({ paper: paper({ objectiveQList: [] }) });

    const outcome = await answerAndSubmitQuiz(client, TID, TERM_ID);

    expect(outcome).toEqual({ status: 'no-objective' });
  });

  it('提交前的停止键拦得住：stopped，不发提交请求', async () => {
    const { client, submitCalls } = clientStub({ paper: paper() });

    const outcome = await answerAndSubmitQuiz(client, TID, TERM_ID, {
      beforeSubmit: () => false,
    });

    expect(outcome).toEqual({ status: 'stopped', matched: 1, total: 1 });
    expect(submitCalls()).toHaveLength(0);
  });

  it('提交失败：failed，原因里带服务端的说法', async () => {
    const { client } = clientStub({ paper: paper(), submitFails: true });

    const outcome = await answerAndSubmitQuiz(client, TID, TERM_ID);

    expect(outcome.status).toBe('failed');
    if (outcome.status === 'failed') expect(outcome.message).toContain('提交失败');
  });
});

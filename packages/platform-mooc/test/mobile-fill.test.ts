import { describe, expect, it } from 'vitest';
import { md5hex } from '@study-pilot/core';
import { createMoocClient } from '../src/client.ts';
import { buildFillIndex, mergeMobileAnswers } from '../src/quiz.ts';
import type { QuizPaper } from '../src/types.ts';

const TID = 900000001;
const TERM_ID = 900000002;

function json(value: unknown): Response {
  return new Response(JSON.stringify(value), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}

describe('移动端答案源接入', () => {
  it('buildFillIndex 用 getOpenQuizInfo 的活跃 aid 读移动端答案', async () => {
    const calls: string[] = [];
    const client = createMoocClient({
      fetch: (async (url: string) => {
        const path = new URL(url).pathname;
        calls.push(path);
        if (path.includes('getOpenQuizInfo')) {
          return json({ code: 0, message: '', result: { tid: TID, aid: 42 } });
        }
        if (path.includes('paperDetail')) {
          return json({
            status: { code: 0, message: '' },
            results: {
              mocPaperDto: {
                tid: TID,
                aid: 42,
                objectiveQList: [
                  { id: 11, type: 1, optionDtos: [{ id: 101, answer: true }, { id: 102, answer: false }] },
                  { id: 12, type: 3, optionDtos: [], stdAnswer: '时间' },
                ],
              },
            },
          });
        }
        throw new Error(`unexpected ${path}`);
      }) as never,
      getToken: () => 'web-token',
      md5: md5hex,
      minGapMs: 0,
      getMobileToken: async () => 'mobile-token',
    });

    const result = await buildFillIndex(client, TID, TERM_ID);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.options.get('101')).toBe(true);
      expect(result.value.options.get('102')).toBe(false);
      expect(result.value.blanks).toEqual(['时间']);
    }
    expect(calls.some((path) => path.includes('paperDetail'))).toBe(true);
    // 不读网页卷，也不读已下线的题库
    expect(calls.some((path) => path.includes('getOpenQuizPaperDto'))).toBe(false);
    expect(calls.some((path) => path.includes('getQuestionListByTermId'))).toBe(false);
  });

  it('mergeMobileAnswers 按 qid + 选项 id 抄答案，不碰提交字段', () => {
    const target: QuizPaper = {
      tid: TID,
      aid: 42,
      submitType: 1,
      objectiveQList: [
        { id: 11, type: 1, optionDtos: [{ id: 101 }, { id: 102 }] },
        { id: 12, type: 3, optionDtos: [], stdAnswer: null },
      ],
    };
    const mobile: QuizPaper = {
      tid: TID,
      aid: 42,
      objectiveQList: [
        { id: 11, type: 1, optionDtos: [{ id: 101, answer: false }, { id: 102, answer: true }] },
        { id: 12, type: 3, optionDtos: [], stdAnswer: '时间' },
      ],
    };

    mergeMobileAnswers(target, mobile);

    expect(target.objectiveQList?.[0]?.optionDtos?.map((o) => o.answer)).toEqual([false, true]);
    expect(target.objectiveQList?.[1]?.stdAnswer).toBe('时间');
    expect(target.submitType).toBe(1);
  });
});

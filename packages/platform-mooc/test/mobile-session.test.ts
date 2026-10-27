import { describe, expect, it } from 'vitest';
import { md5hex } from '@study-pilot/core';
import { createMoocClient } from '../src/client.ts';
import { buildFillIndex } from '../src/quiz.ts';
import type { QuizPaper } from '../src/types.ts';

const TID = 910000001;
const TERM_ID = 910000002;

function json(value: unknown): Response {
  return new Response(JSON.stringify(value), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}

const answeredPaper: QuizPaper = {
  tid: TID,
  aid: 42,
  objectiveQList: [
    { id: 11, type: 1, optionDtos: [{ id: 101, answer: true }, { id: 102, answer: false }] },
  ],
};

describe('账密自动移动端会话', () => {
  it('注入 mobileSession 后不再走网页 320 位 token', async () => {
    const paths: string[] = [];
    const queries: string[] = [];
    const client = createMoocClient({
      fetch: (async (url: string) => {
        const parsed = new URL(url);
        paths.push(parsed.pathname);
        queries.push(parsed.search);
        if (parsed.pathname.includes('getOpenQuizInfo')) return json({ code: 0, message: '', result: { tid: TID, aid: 42 } });
        if (parsed.pathname.includes('paperDetail')) return json({ status: { code: 0, message: '' }, results: { mocPaperDto: answeredPaper } });
        throw new Error(`unexpected ${parsed.pathname}`);
      }) as never,
      getToken: () => 'web-token',
      md5: md5hex,
      minGapMs: 0,
      mobileSession: async () => ({ ok: true, value: 'app-token' }),
    });

    const result = await buildFillIndex(client, TID, TERM_ID);

    expect(result.ok).toBe(true);
    expect(paths.some((path) => path.includes('getMobToken'))).toBe(false);
    expect(queries.some((query) => query.includes('mob-token=app-token'))).toBe(true);
  });

  it('-10012 时用 refresh 强制重登一次再取卷', async () => {
    const refreshFlags: Array<boolean | undefined> = [];
    let paperCalls = 0;
    const client = createMoocClient({
      fetch: (async (url: string) => {
        const parsed = new URL(url);
        if (parsed.pathname.includes('getOpenQuizInfo')) return json({ code: 0, message: '', result: { tid: TID, aid: 42 } });
        if (parsed.pathname.includes('paperDetail')) {
          paperCalls += 1;
          if (paperCalls === 1) {
            return json({ status: { code: -10012, message: '系统检测您的帐号已经于21:40在其他设备上登录' } });
          }
          return json({ status: { code: 0, message: '' }, results: { mocPaperDto: answeredPaper } });
        }
        throw new Error(`unexpected ${parsed.pathname}`);
      }) as never,
      getToken: () => 'web-token',
      md5: md5hex,
      minGapMs: 0,
      mobileSession: async (options) => {
        refreshFlags.push(options?.refresh);
        return { ok: true, value: options?.refresh === true ? 'fresh-token' : 'first-token' };
      },
    });

    const result = await buildFillIndex(client, TID, TERM_ID);

    expect(result.ok).toBe(true);
    expect(refreshFlags).toEqual([undefined, true]);
    expect(paperCalls).toBe(2);
  });

  it('移动端登录失败时如实说明，不退回已下线的题库', async () => {
    const client = createMoocClient({
      fetch: (async (url: string) => {
        const parsed = new URL(url);
        if (parsed.pathname.includes('getOpenQuizInfo')) return json({ code: 0, message: '', result: { tid: TID, aid: 42 } });
        if (parsed.pathname.includes('getOpenQuizPaperDto')) {
          return json({ code: 0, message: '', result: { tid: TID, aid: 42, objectiveQList: [{ id: 11, type: 1, optionDtos: [{ id: 101 }] }] } });
        }
        throw new Error(`unexpected ${parsed.pathname}`);
      }) as never,
      getToken: () => 'web-token',
      md5: md5hex,
      minGapMs: 0,
      mobileSession: async () => ({ ok: false, error: { kind: 'auth', message: '密码错误' } as never }),
    });

    const result = await buildFillIndex(client, TID, TERM_ID);

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.message).toContain('移动端登录失败');
  });
});

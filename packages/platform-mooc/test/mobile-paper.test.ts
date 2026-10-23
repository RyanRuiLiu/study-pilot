import { describe, expect, it } from 'vitest';
import { md5hex } from '@study-pilot/core';
import { createMoocClient } from '../src/client.ts';
import { fetchMobToken, getMobileQuizPaper } from '../src/mobile-paper.ts';
import type { QuizPaper } from '../src/types.ts';

const TID = 900000001;

function clientWith(fetchImpl: (url: string, init?: RequestInit) => Promise<Response>) {
  return createMoocClient({
    fetch: fetchImpl as never,
    getToken: () => 'web-token',
    md5: md5hex,
    minGapMs: 0,
  });
}

function paper(): QuizPaper {
  return {
    tid: TID,
    aid: 42,
    objectiveQList: [
      { id: 11, type: 1, optionDtos: [{ id: 101, answer: true }, { id: 102, answer: false }] },
    ],
  };
}

describe('getMobileQuizPaper', () => {
  it('只带已有 aId，token 走查询串，返回 mocPaperDto', async () => {
    let called = '';
    const client = clientWith(async (url) => {
      called = String(url);
      return new Response(
        JSON.stringify({ status: { code: 0, message: '' }, results: { mocPaperDto: paper() } }),
        { status: 200, headers: { 'content-type': 'application/json' } },
      );
    });

    const result = await getMobileQuizPaper(client, 'mobile-token', TID, 42);

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.objectiveQList?.[0]?.optionDtos?.[0]?.answer).toBe(true);
    const url = new URL(called);
    expect(url.pathname).toBe('/mob/course/paperDetail/v1');
    expect(url.searchParams.get('testId')).toBe(String(TID));
    expect(url.searchParams.get('aId')).toBe('42');
    expect(url.searchParams.get('withStdAnswerAndAnalyse')).toBe('true');
    expect(url.searchParams.get('mob-token')).toBe('mobile-token');
  });

  it('aId=0 直接拒绝，不发请求（不能替用户开卷）', async () => {
    let called = 0;
    const client = clientWith(async () => {
      called++;
      return new Response('{}');
    });

    const result = await getMobileQuizPaper(client, 'mobile-token', TID, 0);

    expect(result.ok).toBe(false);
    expect(called).toBe(0);
  });

  it('业务码非 0 按 api 错误返回，错误文案不带 token', async () => {
    const client = clientWith(
      async () =>
        new Response(JSON.stringify({ status: { code: 100, message: '登录已失效' } }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        }),
    );

    const result = await getMobileQuizPaper(client, 'mobile-token', TID, 42);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.kind).toBe('api');
      expect(result.error.message).toContain('登录已失效');
      expect(result.error.message).not.toContain('mobile-token');
    }
  });

  it('没有 token 时不发请求', async () => {
    let called = 0;
    const client = clientWith(async () => {
      called++;
      return new Response('{}');
    });

    const result = await getMobileQuizPaper(client, '  ', TID, 42);

    expect(result.ok).toBe(false);
    expect(called).toBe(0);
  });
});

describe('fetchMobToken', () => {
  it('用网页会话 GET getMobToken.do，返回 320 位 token', async () => {
    let called = '';
    const client = clientWith(async (url) => {
      called = String(url);
      return new Response(JSON.stringify({ code: 0, message: 'ok', result: 'a'.repeat(320) }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    });

    const result = await fetchMobToken(client);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toHaveLength(320);
    expect(new URL(called).pathname).toBe('/passport/reg/getMobToken.do');
  });

  it('网页会话未登录时返回可执行错误', async () => {
    const client = clientWith(
      async () =>
        new Response(JSON.stringify({ code: 1000, message: '未登录', result: null }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        }),
    );
    const result = await fetchMobToken(client);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.message).toContain('未登录');
  });
});

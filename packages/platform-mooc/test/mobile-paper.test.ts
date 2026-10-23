import { describe, expect, it } from 'vitest';
import { md5hex } from '@study-pilot/core';
import { createMoocClient } from '../src/client.ts';
import {
  exchangeUrsTokenForMobToken,
  getMobileQuizPaper,
  loginWithPasswordForMobToken,
  MOBILE_APP_ID,
} from '../src/mobile-paper.ts';
import type { QuizPaper } from '../src/types.ts';

const TID = 900000001;

function clientWith(fetchImpl: (url: string, init?: RequestInit) => Promise<Response>) {
  return createMoocClient({
    fetch: fetchImpl as never,
    getToken: () => 'web-token',
    md5: md5hex,
    minGapMs: 0,
    getMobileToken: async () => 'mobile-token',
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

describe('exchangeUrsTokenForMobToken', () => {
  it('用 ursToken + 固定 appId 换取 384 位 mob-token', async () => {
    let called = '';
    let body = '';
    const client = clientWith(async (url, init) => {
      called = String(url);
      body = String(init?.body ?? '');
      return new Response(
        JSON.stringify({ code: 0, message: '请求成功', results: { mobToken: 'x'.repeat(384) } }),
        { status: 200, headers: { 'content-type': 'application/json' } },
      );
    });

    const result = await exchangeUrsTokenForMobToken(client, 'urs-token');

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toHaveLength(384);
    expect(new URL(called).pathname).toBe('/mob/ucmooc/0/0/passport/ursCellphoneLogin/v1');
    const params = new URLSearchParams(body);
    expect(params.get('ursToken')).toBe('urs-token');
    expect(params.get('appId')).toBe(MOBILE_APP_ID);
  });

  it('业务码非 0 返回 api 错误，不泄露 ursToken', async () => {
    const client = clientWith(
      async () =>
        new Response(JSON.stringify({ code: 100, message: '账号或者密码错误' }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        }),
    );

    const result = await exchangeUrsTokenForMobToken(client, 'secret-urs-token');

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.kind).toBe('api');
      expect(result.error.message).not.toContain('secret-urs-token');
    }
  });
});

describe('loginWithPasswordForMobToken', () => {
  it('登录后自动取 getMobToken 的 320 位 token', async () => {
    let loginBody = '';
    const client = clientWith(async (url, init) => {
      if (String(url).includes('/passport/reg/icourseLogin.do')) {
        loginBody = String(init?.body ?? '');
        return new Response('<html>ok</html>', { status: 200 });
      }
      if (String(url).includes('/passport/reg/getMobToken.do')) {
        return new Response(JSON.stringify({ code: 0, message: 'ok', result: 'a'.repeat(320) }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });
      }
      throw new Error('unexpected ' + url);
    });

    const result = await loginWithPasswordForMobToken(client, '1529617282', 'secret');
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toHaveLength(320);
    const body = new URLSearchParams(loginBody);
    expect(body.get('username')).toBe('1529617282');
    expect(body.get('passwd')).toBe('secret');
  });

  it('登录失败（页面带 errorCode）返回账号密码错误，不取 token', async () => {
    let tokenCalls = 0;
    const client = clientWith(async (url) => {
      if (String(url).includes('/passport/reg/icourseLogin.do')) {
        return new Response('<html>errorCode=-1</html>', { status: 200 });
      }
      tokenCalls++;
      return new Response('{}', { status: 200 });
    });

    const result = await loginWithPasswordForMobToken(client, 'u', 'p');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.message).toContain('账号或密码错误');
    expect(tokenCalls).toBe(0);
  });
});

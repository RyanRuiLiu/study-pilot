import { describe, expect, it } from 'vitest';
import { md5hex } from '@study-pilot/core';
import { createMoocClient } from '../src/client.ts';
import { exchangeUrsTokenForMobToken, getMobileQuizPaper, MOBILE_APP_ID } from '../src/mobile-paper.ts';
import { URS_CLIENT_ID } from '../src/urs/password-login.ts';
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

  it('移动端会话被顶（-10012）时把码带出来：调用方按码给出路', async () => {
    const client = clientWith(
      async () =>
        new Response(
          JSON.stringify({ status: { code: -10012, message: '系统检测您的帐号已经在其他设备上登录' } }),
          { status: 200, headers: { 'content-type': 'application/json' } },
        ),
    );

    const result = await getMobileQuizPaper(client, 'mobile-token', TID, 42);

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe(-10012);
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

/*
 * 移动端会话注册（ursToken → 384 位 mobToken）。
 * 报文形状取自真实抓包（2026-10-23）与 2026-10-26 的复测；值全部是合成样例。
 */
describe('exchangeUrsTokenForMobToken', () => {
  const URS_TOKEN = 'yd_' + '0'.repeat(40);

  it('按抓包的表单形状 POST：ursToken + 空 mob-token + 固定 appId', async () => {
    let called = '';
    let form = '';
    const client = clientWith(async (url, init) => {
      called = String(url);
      form = String(init?.body ?? '');
      return new Response(
        JSON.stringify({ code: 0, message: '', results: { mobToken: 'b'.repeat(384) } }),
        { status: 200, headers: { 'content-type': 'application/json' } },
      );
    });

    const result = await exchangeUrsTokenForMobToken(client, URS_TOKEN);

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toHaveLength(384);
    expect(new URL(called).pathname).toBe('/mob/ucmooc/0/0/passport/ursCellphoneLogin/v1');
    const params = new URLSearchParams(form);
    expect(params.get('ursToken')).toBe(URS_TOKEN);
    expect(params.get('mob-token')).toBe('');
    expect(params.get('appId')).toBe(MOBILE_APP_ID);
  });

  it('可显式指定 URS 客户端 id 作为 appId（账密链使用）', async () => {
    let form = '';
    const client = clientWith(async (_url, init) => {
      form = String(init?.body ?? '');
      return new Response(
        JSON.stringify({ code: 0, message: '', results: { mobToken: 'b'.repeat(384) } }),
        { status: 200, headers: { 'content-type': 'application/json' } },
      );
    });

    const result = await exchangeUrsTokenForMobToken(client, URS_TOKEN, URS_CLIENT_ID);

    expect(result.ok).toBe(true);
    expect(new URLSearchParams(form).get('appId')).toBe(URS_CLIENT_ID);
  });

  it('没有 ursToken 时不发请求（不去动账号的移动端会话）', async () => {
    let called = 0;
    const client = clientWith(async () => {
      called++;
      return new Response('{}');
    });

    const result = await exchangeUrsTokenForMobToken(client, '  ');

    expect(result.ok).toBe(false);
    expect(called).toBe(0);
  });

  it('被拒时透平台的话，且错误里不带凭证', async () => {
    const client = clientWith(
      async () =>
        new Response(JSON.stringify({ code: 1000, message: 'urs token无效', results: null }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        }),
    );

    const result = await exchangeUrsTokenForMobToken(client, URS_TOKEN);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.kind).toBe('api');
      expect(result.error.code).toBe(1000);
      expect(result.error.message).toContain('urs token无效');
      expect(JSON.stringify(result.error)).not.toContain(URS_TOKEN);
    }
  });
});

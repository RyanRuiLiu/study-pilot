/**
 * RPC 客户端测试。
 *
 * 用假 fetch 把「请求长什么样」和「各种响应怎么分类」钉死。
 * 这些断言的价值在于：平台接口一旦变形，失败会出现在**测试**里，
 * 而不是变成用户侧的静默异常。
 */

import { describe, expect, it, vi } from 'vitest';
import { md5hex } from '@study-pilot/core';
import { createRpcClient, type FetchLike } from '../src/rpc.ts';
import { createThrottle } from '../src/throttle.ts';
import { CONCURRENCY_LIMIT_CODE } from '../src/errors.ts';

const ORIGIN = 'https://www.icourse163.org';
const TOKEN = 'e7f7a05b3c30492ab56fb86dd13a8a9d';

interface Captured {
  url: string;
  init?: RequestInit;
}

/** 造一个假 fetch，返回预设响应并记录请求。 */
function stubFetch(
  responder: (url: string, init?: RequestInit) => Response | Promise<Response>,
): { fetch: FetchLike; calls: Captured[] } {
  const calls: Captured[] = [];
  const fetch: FetchLike = async (url, init) => {
    calls.push({ url, init });
    return responder(url, init);
  };
  return { fetch, calls };
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function makeClient(
  responder: (url: string, init?: RequestInit) => Response | Promise<Response>,
  overrides: { maxRetries?: number; retryDelayMs?: number } = {},
) {
  const { fetch, calls } = stubFetch(responder);
  const client = createRpcClient({
    origin: ORIGIN,
    fetch,
    getToken: () => TOKEN,
    md5: md5hex,
    throttle: createThrottle({ minGapMs: 0 }),
    sleep: async () => undefined,
    ...overrides,
  });
  return { client, calls };
}

describe('请求构造', () => {
  it('URL 带上 csrfKey，且不做 URL 编码', async () => {
    const { client, calls } = makeClient(() => jsonResponse({ code: 0, result: null }));
    await client.call('courseBean', 'getLastLearnedMocTermDto', { termId: 1 });

    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe(
      `${ORIGIN}/web/j/courseBean.getLastLearnedMocTermDto.rpc?csrfKey=${TOKEN}`,
    );
  });

  it('使用 POST 并携带 cookie', async () => {
    const { client, calls } = makeClient(() => jsonResponse({ code: 0 }));
    await client.call('aBean', 'getA');

    expect(calls[0].init?.method).toBe('POST');
    expect(calls[0].init?.credentials).toBe('include');
  });

  it('请求体是 JSON 字符串', async () => {
    const { client, calls } = makeClient(() => jsonResponse({ code: 0 }));
    await client.call('aBean', 'getA', { termId: 42, page: 1 });

    expect(JSON.parse(String(calls[0].init?.body))).toEqual({ termId: 42, page: 1 });
  });

  it('不传 body 时发送空对象', async () => {
    const { client, calls } = makeClient(() => jsonResponse({ code: 0 }));
    await client.call('aBean', 'getA');

    expect(JSON.parse(String(calls[0].init?.body))).toEqual({});
  });

  it('签名头齐全，且不含 edu-script-token', async () => {
    const { client, calls } = makeClient(() => jsonResponse({ code: 0 }));
    await client.call('aBean', 'getA', { x: 1 });

    const headers = calls[0].init?.headers as Record<string, string>;
    expect(headers.Timestamp).toMatch(/^\d+$/);
    expect(headers.Nonce).toMatch(/^\d{4}$/);
    expect(headers.System).toBe('v1');
    expect(headers['Auth-Signature']).toMatch(/^[0-9A-F]{32}$/);
    expect(headers).not.toHaveProperty('edu-script-token');
  });
});

describe('响应分类', () => {
  it('code = 0 时返回 result', async () => {
    const { client } = makeClient(() => jsonResponse({ code: 0, result: { id: 7 } }));
    const result = await client.call<{ id: number }>('aBean', 'getA');

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toEqual({ id: 7 });
  });

  it('code 非 0 时返回 api 错误，且带上业务错误码', async () => {
    const { client } = makeClient(() => jsonResponse({ code: 40001, message: '未登录' }));
    const result = await client.call('aBean', 'getA');

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.kind).toBe('api');
      expect(result.error.code).toBe(40001);
      expect(result.error.message).toBe('未登录');
    }
  });

  it('callEnvelope 保留完整信封，便于调用方自行判断 code', async () => {
    const { client } = makeClient(() =>
      jsonResponse({ code: 40001, message: '未登录', traceId: 't-1' }),
    );
    const result = await client.callEnvelope('aBean', 'getA');

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.code).toBe(40001);
      expect(result.value.traceId).toBe('t-1');
    }
  });

  it('HTTP 500 归为 http 错误', async () => {
    const { client } = makeClient(() => new Response('server error', { status: 500 }));
    const result = await client.call('aBean', 'getA');

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.kind).toBe('http');
      expect(result.error.status).toBe(500);
    }
  });

  it('返回 HTML（登录态失效被重定向）归为 parse 错误', async () => {
    const { client } = makeClient(
      () => new Response('<!DOCTYPE html><title>登录</title>', { status: 200 }),
    );
    const result = await client.call('aBean', 'getA');

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.kind).toBe('parse');
  });

  it('fetch 抛异常归为 network 错误', async () => {
    const { client } = makeClient(() => {
      throw new TypeError('Failed to fetch');
    });
    const result = await client.call('aBean', 'getA');

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.kind).toBe('network');
      expect(result.error.message).toContain('Failed to fetch');
    }
  });
});

describe('并发限制重试', () => {
  it(`code ${CONCURRENCY_LIMIT_CODE} 会重试，随后成功`, async () => {
    let round = 0;
    const { client, calls } = makeClient(() => {
      round++;
      if (round === 1) return jsonResponse({ code: CONCURRENCY_LIMIT_CODE });
      return jsonResponse({ code: 0, result: 'ok' });
    });

    const result = await client.call<string>('aBean', 'getA');

    expect(calls).toHaveLength(2);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe('ok');
  });

  it('重试次数用尽后返回最后一次的 api 错误', async () => {
    const { client, calls } = makeClient(() => jsonResponse({ code: CONCURRENCY_LIMIT_CODE }), {
      maxRetries: 2,
    });

    const result = await client.call('aBean', 'getA');

    expect(calls).toHaveLength(3); // 首次 + 2 次重试
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe(CONCURRENCY_LIMIT_CODE);
  });

  it('其它业务错误码不重试', async () => {
    const { client, calls } = makeClient(() => jsonResponse({ code: 40001 }));
    await client.call('aBean', 'getA');

    expect(calls).toHaveLength(1);
  });

  it('网络错误不重试', async () => {
    const failing = vi.fn(() => {
      throw new Error('offline');
    });
    const { client } = makeClient(failing);
    await client.call('aBean', 'getA');

    expect(failing).toHaveBeenCalledTimes(1);
  });
});

describe('凭证', () => {
  it('每次调用都重新取 token', async () => {
    let token = 'first';
    const { fetch, calls } = stubFetch(() => jsonResponse({ code: 0 }));
    const client = createRpcClient({
      origin: ORIGIN,
      fetch,
      getToken: () => token,
      md5: md5hex,
      throttle: createThrottle({ minGapMs: 0 }),
    });

    await client.call('aBean', 'getA');
    token = 'second';
    await client.call('aBean', 'getA');

    expect(calls[0].url).toContain('csrfKey=first');
    expect(calls[1].url).toContain('csrfKey=second');
  });
});

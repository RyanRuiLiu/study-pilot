/*
 * 模型调用层。
 *
 * 这里要钉住的是两件容易悄悄坏掉的事：
 *   1. **地址归一化**——用户填 `https://api.x.com` 与填 `https://api.x.com/v1`
 *      必须落到同一个端点。写错的话表现是 404，而用户只会以为自己填错了。
 *   2. **失败分类**——配置错、网络不通、对方返回非 2xx、返回体读不懂、超时、
 *      内容为空，六种情况的处置完全不同；混成一种，界面就只能说「AI 出错了」。
 *
 * 另外断言错误消息里不含密钥。
 */

import { describe, expect, it } from 'vitest';
import { chatEndpoint, chatOrigin, createChatClient } from '../src/index.ts';

const KEY = 'sk-secret-key-should-never-appear';

describe('接口地址归一化', () => {
  it('不带 /v1 时补上', () => {
    expect(chatEndpoint('https://api.example.com')).toEqual({
      ok: true,
      value: 'https://api.example.com/v1/chat/completions',
    });
  });

  it('带 /v1 时只补路径', () => {
    expect(chatEndpoint('https://api.example.com/v1')).toEqual({
      ok: true,
      value: 'https://api.example.com/v1/chat/completions',
    });
  });

  it('已经是完整端点时原样使用，末尾斜杠先去掉', () => {
    expect(chatEndpoint('https://api.example.com/v1/chat/completions/')).toEqual({
      ok: true,
      value: 'https://api.example.com/v1/chat/completions',
    });
  });

  it('空地址与非 http 协议在配置阶段就报错', () => {
    expect(chatEndpoint('   ').ok).toBe(false);
    expect(chatEndpoint('ftp://api.example.com').ok).toBe(false);
    expect(chatEndpoint('api.example.com').ok).toBe(false);
  });

  /*
   * 地址钉死在 `AI_BASE_URL`（https），没有一处调用方用 http；
   * 而请求头里带着 `Authorization: Bearer <密钥>`，走 http 等于明文外送，
   * 所以协议收窄到只允许 https。
   */
  it('http 地址在配置阶段就报错（密钥不该走明文）', () => {
    for (const insecure of ['http://api.example.com', 'http://api.example.com/v1']) {
      const result = chatEndpoint(insecure);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.kind).toBe('config');
        expect(result.error.message).toContain('https://');
      }
    }
  });

  it('钉死的智谱地址按「以 /v<N> 结尾」拼成实际端点', () => {
    expect(chatEndpoint('https://open.bigmodel.cn/api/paas/v4')).toEqual({
      ok: true,
      value: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    });
  });

  // 拼接是纯字符串后缀拼接，解析不了的地址或带查询串/锚点的地址都会被拼坏，宁可在配置阶段拒掉
  it('带查询串、锚点或解析不了的地址在配置阶段就报错', () => {
    const cases = [
      'https://api.example.com?key=1',
      'https://api.example.com/v1#frag',
      'https://api exam ple.com/v1',
    ];
    for (const bad of cases) {
      const result = chatEndpoint(bad);
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.error.kind).toBe('config');
    }
  });

  it('取出源，用于只申请这一个域名的主机权限', () => {
    expect(chatOrigin('https://api.example.com/v1')).toBe('https://api.example.com');
    expect(chatOrigin('not a url')).toBeNull();
  });
});

function clientWith(fetchImpl: unknown, overrides: Record<string, unknown> = {}) {
  return createChatClient({
    baseUrl: 'https://api.example.com',
    model: 'demo-model',
    apiKey: KEY,
    fetch: fetchImpl as never,
    ...overrides,
  });
}

const okBody = (content: string) =>
  JSON.stringify({ choices: [{ message: { role: 'assistant', content } }] });

describe('调用', () => {
  it('请求构造正确，并取回助手文本', async () => {
    /*
     * 用对象持有「回调里记下来的那次请求」，不用 `let x: T | null`：
     * 赋值发生在回调里，控制流分析看不到它一定执行过，会把变量收窄成 null。
     */
    const seen: { url?: string; init?: RequestInit } = {};
    const client = clientWith(async (url: string, init: RequestInit) => {
      seen.url = url;
      seen.init = init;
      return new Response(okBody('  你好  '), { status: 200 });
    });

    const result = await client.complete([{ role: 'user', content: '说一句话' }]);

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe('你好');
    expect(seen.url).toBe('https://api.example.com/v1/chat/completions');
    const headers = seen.init?.headers as Record<string, string>;
    expect(headers.Authorization).toBe(`Bearer ${KEY}`);
    const body = JSON.parse(String(seen.init?.body ?? '{}'));
    expect(body.model).toBe('demo-model');
    expect(body.messages).toEqual([{ role: 'user', content: '说一句话' }]);
    expect(body.stream).toBe(false);
  });

  it('缺密钥或模型名时不发请求', async () => {
    let called = false;
    const client = clientWith(
      async () => {
        called = true;
        return new Response('{}', { status: 200 });
      },
      { apiKey: '  ' },
    );

    const result = await client.complete([{ role: 'user', content: 'x' }]);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.kind).toBe('config');
    expect(called).toBe(false);
  });

  it('非 2xx 带上状态码与一小段响应体，且不含密钥', async () => {
    const client = clientWith(async () => new Response('{"error":"invalid api key"}', { status: 401 }));
    const result = await client.complete([{ role: 'user', content: 'x' }]);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.kind).toBe('http');
      expect(result.error.message).toContain('401');
      expect(result.error.message).not.toContain(KEY);
    }
  });

  it('返回体不是 JSON 时报解析失败', async () => {
    const client = clientWith(async () => new Response('<html>502</html>', { status: 200 }));
    const result = await client.complete([{ role: 'user', content: 'x' }]);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.kind).toBe('parse');
  });

  it('返回内容为空时报空', async () => {
    const client = clientWith(async () => new Response(JSON.stringify({ choices: [] }), { status: 200 }));
    const result = await client.complete([{ role: 'user', content: 'x' }]);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.kind).toBe('empty');
  });

  it('网络异常与超时分开：后者按超时处理', async () => {
    const failing = clientWith(async () => {
      throw new Error('connection refused');
    });
    const failed = await failing.complete([{ role: 'user', content: 'x' }]);
    if (!failed.ok) expect(failed.error.kind).toBe('network');

    const hanging = clientWith(
      (_url: string, init: RequestInit) =>
        new Promise((_resolve, reject) => {
          init.signal?.addEventListener('abort', () => reject(new Error('aborted')));
        }),
      { timeoutMs: 20 },
    );
    const timedOut = await hanging.complete([{ role: 'user', content: 'x' }]);
    expect(timedOut.ok).toBe(false);
    if (!timedOut.ok) {
      expect(timedOut.error.kind).toBe('timeout');
      expect(timedOut.error.message).not.toContain(KEY);
    }
  });

  it('响应头已到位、返回体挂死：仍按超时处理（上界必须罩住读体）', async () => {
    const client = clientWith(
      (_url: string, init: RequestInit) =>
        Promise.resolve(
          new Response(
            new ReadableStream<Uint8Array>({
              start(controller) {
                init.signal?.addEventListener('abort', () => controller.error(new Error('aborted')));
                // 永不 enqueue、永不 close：连接建立后对方不再把话说完
              },
            }),
            { status: 200 },
          ),
        ),
      { timeoutMs: 20 },
    );

    const result = await client.complete([{ role: 'user', content: 'x' }]);

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.kind).toBe('timeout');
  });
});

/*
 * 「规则未生效」的重发闸（policy/sync.ts 的出站包装）。
 *
 * 装好后第一次出站会带着扩展自身的 Origin，被平台回「非法跨域请求」；这一层的处置
 * 是等一拍重发一次。对 GET 无所谓，对 POST 就要命：**如果第一次其实已经进了业务**，
 * 重发就是第二次提交。这两条用例把那条界线钉住。
 */

import { describe, expect, it } from 'vitest';
import type { HostCapabilities } from '@study-pilot/application';
import { createPlatformClient } from '../src/policy/sync.ts';

const host: HostCapabilities = {
  whenRequestRulesReady: async () => {},
  readCookie: async () => 'token-abcdef',
};

/** 按第几次出站给不同响应，并记录总次数。 */
function harness(responder: (attempt: number) => Response) {
  let attempt = 0;
  const { client } = createPlatformClient(host, async () => {
    attempt += 1;
    return responder(attempt);
  });
  return { client, attempts: () => attempt };
}

describe('Origin 回绝的重发闸', () => {
  it('第一次被回「非法跨域」：等一拍重发一次，用第二次的结果', async () => {
    const { client, attempts } = harness((attempt) =>
      attempt === 1
        ? new Response('非法跨域请求', { status: 403 })
        : new Response(JSON.stringify({ code: 0, result: 'ok' }), { status: 200 }),
    );

    const result = await client.rpc.call<string>('courseBean', 'getSomething', {});

    expect(attempts()).toBe(2);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe('ok');
  });

  it('正文带着这几个字、但已经是 code 0 的成功信封：不重发（重发就是双写）', async () => {
    const body = JSON.stringify({ code: 0, result: { note: '非法跨域请求已记录' } });
    const { client, attempts } = harness(() => new Response(body, { status: 200 }));

    const result = await client.rpc.call<{ note: string }>('quizBean', 'submitAnswers', { tid: 1 });

    expect(attempts()).toBe(1);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.note).toContain('非法跨域');
  });

  it('非成功正文（业务码非 0）带着这几个字：仍按回绝处理，重发一次', async () => {
    const { client, attempts } = harness((attempt) =>
      attempt === 1
        ? new Response(JSON.stringify({ code: -1, message: '非法跨域请求' }), { status: 200 })
        : new Response(JSON.stringify({ code: 0, result: 'ok' }), { status: 200 }),
    );

    const result = await client.rpc.call<string>('courseBean', 'getSomething', {});

    expect(attempts()).toBe(2);
    expect(result.ok).toBe(true);
  });

  it('正文里没有那句话：一次就够，不重发', async () => {
    const { client, attempts } = harness(() =>
      new Response(JSON.stringify({ code: 0, result: 'ok' }), { status: 200 }),
    );

    await client.rpc.call('courseBean', 'getSomething', {});

    expect(attempts()).toBe(1);
  });
});

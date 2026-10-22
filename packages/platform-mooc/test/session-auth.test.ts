/*
 * 会话失效在慕课侧的**两类信号，同一个说法**。
 *
 *   1. `.rpc` 回 HTTP 401 —— transport 判成 auth（标准语义），平台层换成那句用户文案；
 *   2. 信封 `result` 为 `null` —— 读取层判成 auth（实测 2026-10-03 的未登录形态）。
 *
 * 断言看 message：界面与命令行直接把它端给用户，出现「HTTP 401」就是这条链断了。
 */

import { describe, expect, it } from 'vitest';
import { md5hex } from '@study-pilot/core';
import type { FetchLike } from '@study-pilot/transport';
import { createMoocClient } from '../src/client.ts';
import { getCourses } from '../src/courses.ts';
import { MOOC_SESSION_EXPIRED } from '../src/auth.ts';

function clientWith(fetchImpl: FetchLike) {
  return createMoocClient({
    fetch: fetchImpl,
    getToken: () => 'token',
    md5: md5hex,
    minGapMs: 0,
  });
}

describe('会话失效的说法', () => {
  it('.rpc 回 HTTP 401：auth，且文案是那句用户话，不是协议状态码', async () => {
    const client = clientWith(async () => new Response('unauthorized', { status: 401 }));
    const result = await client.rpc.call('courseBean', 'getLastLearnedMocTermDto', {});
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.kind).toBe('auth');
    expect(result.error.message).toBe(MOOC_SESSION_EXPIRED);
  });

  it('信封 result 为 null：课程读取判成 auth，同一句话', async () => {
    const client = clientWith(
      async () =>
        new Response(JSON.stringify({ code: 0, result: null }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        }),
    );
    const result = await getCourses(client);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.kind).toBe('auth');
    expect(result.error.message).toBe(MOOC_SESSION_EXPIRED);
  });

  it('403 不并进 auth：它可能是权限或风控，措辞不该引导去重新登录', async () => {
    const client = clientWith(async () => new Response('forbidden', { status: 403 }));
    const result = await client.rpc.call('courseBean', 'getLastLearnedMocTermDto', {});
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.kind).toBe('http');
    expect(result.error.message).not.toBe(MOOC_SESSION_EXPIRED);
  });
});

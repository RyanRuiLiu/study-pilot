/*
 * DWR 响应判定的测试。
 *
 * 这里的判据以前写错过：早先的实现假设回调返回值一定是 `true`，
 * 于是所有返回对象或数组的接口都被当成失败。
 * 样本覆盖 DWR 的三种实际形态，钉住判定规则。
 */

import { describe, expect, it } from 'vitest';
import {
  createDwrClient,
  extractDwrPayload,
  isDwrSuccess,
  type DwrClientOptions,
} from '../src/dwr.ts';
import { createThrottle } from '../src/throttle.ts';
import type { FetchLike } from '../src/rpc.ts';

/** 提交类接口：回调返回布尔。 */
const BOOLEAN_OK = [
  '//#DWR-INSERT',
  '//#DWR-REPLY',
  "dwr.engine._remoteHandleCallback('123','0',true);",
  '',
].join('\r\n');

/** 查询类接口：回调返回对象，字段被拆成逐条赋值。 */
const OBJECT_OK = [
  '//#DWR-INSERT',
  '//#DWR-REPLY',
  'var s0={};var s1={};var s4={};s1.needEvaluateHomework=s4;',
  's4.testId=1258000000;s4.name="\\u4F5C\\u4E1A";',
  "dwr.engine._remoteHandleCallback('456','0',{latestUnit:s0,upcoming:s1});",
  '',
].join('\r\n');

/** 查询类接口：回调返回数组。 */
const ARRAY_OK = [
  '//#DWR-REPLY',
  'var s0=[];var s1={};s0[0]=s1;',
  "dwr.engine._remoteHandleCallback('789','0',s0);",
  '',
].join('\r\n');

/** 服务端抛出异常。 */
const EXCEPTION = [
  '//#DWR-REPLY',
  "dwr.engine._remoteHandleException('123','0',{name:'java.lang.Exception',message:'fail'});",
  '',
].join('\r\n');

describe('isDwrSuccess', () => {
  it('回调返回布尔时判定为成功', () => {
    expect(isDwrSuccess(BOOLEAN_OK)).toBe(true);
  });

  it('回调返回对象时判定为成功', () => {
    // 早先的实现只匹配 ,true)，这里会被误判为失败
    expect(isDwrSuccess(OBJECT_OK)).toBe(true);
  });

  it('回调返回数组时判定为成功', () => {
    expect(isDwrSuccess(ARRAY_OK)).toBe(true);
  });

  it('回调返回 false 也是成功——接口执行完了，只是结果为否', () => {
    const raw = "dwr.engine._remoteHandleCallback('1','0',false);";
    expect(isDwrSuccess(raw)).toBe(true);
  });

  it('服务端抛异常时判定为失败', () => {
    expect(isDwrSuccess(EXCEPTION)).toBe(false);
  });

  it('空响应判定为失败', () => {
    expect(isDwrSuccess('')).toBe(false);
    expect(isDwrSuccess(' ')).toBe(false);
  });

  it('HTTP 错误页判定为失败', () => {
    expect(isDwrSuccess('<!DOCTYPE html><html>403</html>')).toBe(false);
  });
});

describe('extractDwrPayload', () => {
  it('取出对象载荷', () => {
    const payload = extractDwrPayload(OBJECT_OK);
    expect(payload).toContain('upcoming:s1');
  });

  it('取出数组载荷', () => {
    expect(extractDwrPayload(ARRAY_OK)).toBe('s0');
  });

  it('取出布尔载荷', () => {
    expect(extractDwrPayload(BOOLEAN_OK)).toBe('true');
  });

  it('没有回调时返回 null', () => {
    expect(extractDwrPayload('//#DWR-REPLY\r\n')).toBeNull();
  });
});

/*
 * 客户端。RPC 与 DWR 共用同一个串行节流器，所以这里同样要求「任何出站都有时间上界」——
 * 一个挂死的 DWR 请求会冻住的不仅是互评，而是整站出站。
 */
const ORIGIN = 'https://www.icourse163.org';

function makeDwr(
  responder: (url: string, init?: RequestInit) => Response | Promise<Response>,
  overrides: Partial<DwrClientOptions> = {},
) {
  const calls: { url: string; init?: RequestInit }[] = [];
  const fetch: FetchLike = async (url, init) => {
    calls.push({ url, init });
    return responder(url, init);
  };
  const client = createDwrClient({
    origin: ORIGIN,
    fetch,
    getToken: () => 'tok-1',
    throttle: createThrottle({ minGapMs: 0 }),
    now: () => 1700000000000,
    ...overrides,
  });
  return { client, calls };
}

describe('createDwrClient', () => {
  it('报文里带上会话 id，响应体原样交出', async () => {
    const { client, calls } = makeDwr(() => new Response(BOOLEAN_OK, { status: 200 }));

    const result = await client.call('reviewBean', 'getLatest', ['c0-param0=number:1']);

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.raw).toContain('_remoteHandleCallback');
    expect(String(calls[0].init?.body)).toContain('httpSessionId=tok-1');
  });

  it('请求挂死：按超时归错', async () => {
    const { client } = makeDwr(
      (_url, init) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () => reject(new Error('aborted')));
        }),
      { timeoutMs: 20 },
    );

    const result = await client.call('reviewBean', 'getLatest', []);

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.kind).toBe('timeout');
  });

  it('响应头已到位、读体挂死：同样按超时归错', async () => {
    const { client } = makeDwr(
      (_url, init) =>
        new Response(
          new ReadableStream<Uint8Array>({
            start(controller) {
              init?.signal?.addEventListener('abort', () => controller.error(new Error('aborted')));
            },
          }),
          { status: 200 },
        ),
      { timeoutMs: 20 },
    );

    const result = await client.call('reviewBean', 'getLatest', []);

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.kind).toBe('timeout');
  });

  it('取 token 失败：一个请求都不发，失败留在 Result 里', async () => {
    const { client, calls } = makeDwr(() => new Response(BOOLEAN_OK, { status: 200 }), {
      getToken: async () => {
        throw new Error('cookies 权限被撤');
      },
    });

    const result = await client.call('reviewBean', 'getLatest', []);

    expect(calls).toHaveLength(0);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.message).toContain('权限被撤');
  });
});

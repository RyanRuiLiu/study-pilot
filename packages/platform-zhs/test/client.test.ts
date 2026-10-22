/*
 * 客户端的机械核对：取钥缓存、签名封装形态、错误映射。
 *
 * 密钥原语注入替身（recoverKey）——真 sl 只有服务端能签，测试造不出；
 * 这与 mooc 客户端注入 md5 是同一个先例。替身返回固定密钥，
 * 于是测试可以用同一把密钥把发出去的密文解开、逐字段核对。
 */

import { describe, expect, it } from 'vitest';
import { createZhsClient, ZHS_SESSION_EXPIRED, ZhsApiError, ZhsAuthError, ZhsHttpError, ZhsTimeoutError } from '../src/client.ts';
import type { FetchLike } from '@study-pilot/transport';

const FIXED_KEY = new Uint8Array(16).fill(7);
const IV = new TextEncoder().encode('1g3qqdh4jvbskb9x');

/** 拆一个 form 串为键值表。 */
function parseForm(body: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const pair of body.split('&')) {
    const eq = pair.indexOf('=');
    out[decodeURIComponent(pair.slice(0, eq))] = decodeURIComponent(pair.slice(eq + 1));
  }
  return out;
}

/** 用测试密钥解开 secretStr → 原对象。 */
async function decryptSecret(secretStr: string): Promise<unknown> {
  const key = await crypto.subtle.importKey('raw', FIXED_KEY, 'AES-CBC', false, ['decrypt']);
  const bytes = Uint8Array.from(atob(secretStr), (ch) => ch.charCodeAt(0));
  const plain = await crypto.subtle.decrypt({ name: 'AES-CBC', iv: IV }, key, bytes);
  return JSON.parse(new TextDecoder().decode(plain));
}

interface Recorded {
  url: string;
  init?: RequestInit;
}

/** 假 fetch：按 URL 片段分派响应，并记录全部调用。 */
function fakeFetch(routes: Array<{ match: string; json: unknown; status?: number }>): {
  fetch: FetchLike;
  calls: Recorded[];
} {
  const calls: Recorded[] = [];
  const fetch: FetchLike = async (url, init) => {
    calls.push({ url, init });
    const route = routes.find((entry) => url.includes(entry.match));
    if (route === undefined) throw new Error(`假 fetch 没有登记 ${url} 的响应`);
    return new Response(JSON.stringify(route.json), {
      status: route.status ?? 200,
      headers: { 'content-type': 'application/json' },
    });
  };
  return { fetch, calls };
}

const KEY_ROUTE = { match: 'app-commserv-user/c/has', json: { rt: { sl: 'fake-sl-for-test' } } };

function makeClient(routes: Array<{ match: string; json: unknown; status?: number }>): {
  client: ReturnType<typeof createZhsClient>;
  calls: Recorded[];
} {
  const { fetch, calls } = fakeFetch([KEY_ROUTE, ...routes]);
  const client = createZhsClient({
    fetch,
    minGapMs: 0,
    now: () => 1792099999000,
    recoverKey: async () => FIXED_KEY,
  });
  return { client, calls };
}

describe('取钥缓存', () => {
  it('同族多次调用只取一次钥', async () => {
    const { client, calls } = makeClient([{ match: 'learning/videolist', json: { code: 0, data: {} } }]);
    await client.call('videoList', { recruitAndCourseId: 'x' });
    await client.call('videoList', { recruitAndCourseId: 'y' });
    const keyCalls = calls.filter((c) => c.url.includes('c/has'));
    expect(keyCalls).toHaveLength(1);
  });

  it('不同族各取各的钥', async () => {
    const { client, calls } = makeClient([
      { match: 'learning/videolist', json: { code: 0, data: {} } },
      { match: 'queryShareCourseInfo', json: { code: 0, data: {} } },
    ]);
    await client.call('videoList', {});
    await client.call('shareCourses', {});
    const keyCalls = calls.filter((c) => c.url.includes('c/has'));
    expect(keyCalls).toHaveLength(2);
  });
});

describe('签名封装形态', () => {
  it('学习族：外层 dateFormate，密文载荷里也有一份同样的时间戳', async () => {
    const { client, calls } = makeClient([{ match: 'learning/videolist', json: { code: 0, data: {} } }]);
    await client.call('videoList', { recruitAndCourseId: 'abc' });
    const post = calls.find((c) => c.url.includes('learning/videolist'));
    const form = parseForm(String(post?.init?.body));
    expect(form.dateFormate).toBe('1792099999000');
    const inner = (await decryptSecret(form.secretStr)) as Record<string, unknown>;
    expect(inner.recruitAndCourseId).toBe('abc');
    expect(inner.dateFormate).toBe(1792099999000);
  });

  it('首页族：外层字段名是 date，密文里不重复放时间戳', async () => {
    const { client, calls } = makeClient([{ match: 'queryShareCourseInfo', json: { code: 0, data: {} } }]);
    await client.call('shareCourses', { status: 0, pageNo: 1, pageSize: 50 });
    const post = calls.find((c) => c.url.includes('queryShareCourseInfo'));
    const form = parseForm(String(post?.init?.body));
    expect(form.date).toBe('1792099999000');
    expect(form.dateFormate).toBeUndefined();
    const inner = (await decryptSecret(form.secretStr)) as Record<string, unknown>;
    expect(inner.dateFormate).toBeUndefined();
    expect(inner.pageSize).toBe(50);
  });

  it('考试族：外层只有 secretStr，时间戳只在密文里', async () => {
    const { client, calls } = makeClient([
      { match: 'student/getStudentHomework', json: { code: 0, rt: { studentHomeworkList: [] } } },
    ]);
    await client.call('examHomeworkList', { recruitId: 470001, courseId: 1000009999, flag: 1 });
    const post = calls.find((c) => c.url.includes('student/getStudentHomework'));
    // 外层形态：一个字段，没有 & 分隔符
    const form = parseForm(String(post?.init?.body));
    expect(Object.keys(form)).toEqual(['secretStr']);
    // 密文里那份时间戳在（stampInside），载荷字段也在
    const inner = (await decryptSecret(form.secretStr!)) as Record<string, unknown>;
    expect(inner.dateFormate).toBe(1792099999000);
    expect(inner.recruitId).toBe(470001);
    expect(inner.flag).toBe(1);
  });

  it('免签 POST（神谕）：明文表单体，不取钥、不发 secretStr', async () => {
    const { client, calls } = makeClient([
      { match: 'getQuestionDoneState', json: { status: '200', rt: {} } },
    ]);
    await client.call('examQuestionDoneState', { recruitId: 470001, questionIds: '[1]' });
    const post = calls.find((c) => c.url.includes('getQuestionDoneState'));
    expect(post?.init?.method).toBe('POST');
    expect(String(post?.init?.body)).toBe('recruitId=470001&questionIds=%5B1%5D');
    expect(calls.filter((c) => c.url.includes('c/has'))).toHaveLength(0);
  });

  it('免签端点不发 secretStr，直接 GET', async () => {
    const { client, calls } = makeClient([{ match: 'getLoginUserInfo', json: { code: 0, result: {} } }]);
    await client.call('loginUserInfo');
    const get = calls.find((c) => c.url.includes('getLoginUserInfo'));
    expect(get?.init?.method).toBe('GET');
    expect(get?.init?.body).toBeUndefined();
    expect(calls.filter((c) => c.url.includes('c/has'))).toHaveLength(0);
  });
});

describe('错误映射', () => {
  it('首页族的成功码是 200，不当作拒绝（抓包事实）', async () => {
    const { client } = makeClient([
      { match: 'queryShareCourseInfo', json: { code: 200, result: { courseOpenDtos: [] } } },
    ]);
    const body = (await client.call('shareCourses', {})) as { code: number };
    expect(body.code).toBe(200);
  });

  it('HTTP 非 200 抛 ZhsHttpError', async () => {
    const { client } = makeClient([{ match: 'learning/videolist', json: {}, status: 500 }]);
    await expect(client.call('videoList', {})).rejects.toBeInstanceOf(ZhsHttpError);
  });

  it('code 非 0 抛 ZhsApiError 并原样带码（-12 人机验证）', async () => {
    const { client } = makeClient([
      { match: 'learning/videolist', json: { code: -12, message: '需要验证', data: null } },
    ]);
    const failure = client.call('videoList', {});
    await expect(failure).rejects.toBeInstanceOf(ZhsApiError);
    await failure.catch((error: ZhsApiError) => {
      expect(error.code).toBe(-12);
      expect(error.message).toBe('需要验证');
    });
  });

  it('考试族用 status 信封：字符串 "200" 是成功，"-1" 是拒绝（真机抓出来的）', async () => {
    const ok = makeClient([
      { match: 'student/getStudentHomework', json: { msg: '请求成功', rt: { studentHomeworkList: [] }, status: '200' } },
    ]);
    await expect(ok.client.call('examHomeworkList', {})).resolves.toMatchObject({
      status: '200',
      msg: '请求成功',
    });

    const bad = makeClient([
      { match: 'student/getStudentHomework', json: { msg: '2', rt: null, status: '-1' } },
    ]);
    await expect(bad.client.call('examHomeworkList', {})).rejects.toBeInstanceOf(ZhsApiError);
  });

  it('status 是数字 -1 同样算拒绝（失败形有两套）', async () => {
    const { client } = makeClient([
      { match: 'student/getStudentHomework', json: { msg: '传入参数异常', status: -1 } },
    ]);
    await expect(client.call('examHomeworkList', {})).rejects.toBeInstanceOf(ZhsApiError);
  });

  it('取钥失败不进缓存：第二次调用会再取', async () => {
    let attempts = 0;
    const fetch: FetchLike = async (url) => {
      if (url.includes('c/has')) {
        attempts += 1;
        if (attempts === 1) return new Response('{}', { status: 502 });
        return new Response(JSON.stringify({ rt: { sl: 'ok' } }), { status: 200 });
      }
      return new Response(JSON.stringify({ code: 0, data: {} }), { status: 200 });
    };
    const client = createZhsClient({ fetch, minGapMs: 0, recoverKey: async () => FIXED_KEY });
    await expect(client.call('videoList', {})).rejects.toBeInstanceOf(ZhsHttpError);
    await client.call('videoList', {});
    expect(attempts).toBe(2);
  });
});

describe('平台自己的说明字段（msg）', () => {
  it('说明在 msg 里：原样带出，不让界面只剩一个 code', async () => {
    // 用免签端点（签名端点要先取钥，替身得额外伺候，与这条要测的事无关）
    const client = createZhsClient({
      fetch: async () =>
        new Response(JSON.stringify({ status: -1, msg: '当前考试暂不可作答' }), { status: 200 }),
      recoverKey: async () => new Uint8Array(16).fill(7),
    });
    await expect(client.call('meetSessions', { recruitId: 1 })).rejects.toMatchObject({
      code: -1,
      message: '当前考试暂不可作答',
    });
  });
});

describe('出站超时', () => {
  /*
   * 挂住的请求要变成一次可说的失败，而不是让整轮停在原地。替身按真 fetch 的行为写：
   * signal 触发时 reject——不 reject 的话，测试里那个 await 永远不落地，
   * 也就测不到「超时被分出来」这件事。
   */
  function hangingFetch(hangMatch: string): FetchLike {
    return (url, init) => {
      if (!url.includes(hangMatch)) {
        return Promise.resolve(
          new Response(JSON.stringify({ rt: { sl: 'fake-sl-for-test' } }), { status: 200 }),
        );
      }
      return new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => reject(new Error('AbortError')));
      });
    };
  }

  const hangingClient = (hangMatch: string) =>
    createZhsClient({
      fetch: hangingFetch(hangMatch),
      minGapMs: 0,
      timeoutMs: 5,
      recoverKey: async () => FIXED_KEY,
    });

  it('业务请求挂住 → 到点上界就抛 ZhsTimeoutError', async () => {
    await expect(hangingClient('learning/videolist').call('videoList', {})).rejects.toBeInstanceOf(
      ZhsTimeoutError,
    );
  });

  it('取钥那一步挂住同样有上界（这一族每个签名请求都先过它）', async () => {
    await expect(hangingClient('app-commserv-user/c/has').call('videoList', {})).rejects.toBeInstanceOf(
      ZhsTimeoutError,
    );
  });

  it('文案给出上界本身：报失败时人能看到等多久才判的', async () => {
    const error = await hangingClient('learning/videolist')
      .call('videoList', {})
      .catch((thrown: unknown) => thrown as Error);
    expect(error).toBeInstanceOf(ZhsTimeoutError);
    expect((error as Error).message).toContain('秒未返回');
  });
});

describe('登录失效的识别', () => {
  const authClient = (status: number, body = '') =>
    createZhsClient({
      fetch: async () => new Response(body, { status }),
      minGapMs: 0,
      recoverKey: async () => FIXED_KEY,
    });

  it('HTTP 401 归成 ZhsAuthError，文案是那句用户话（不是协议状态码）', async () => {
    const error = await authClient(401).call('shareCourses', {}).catch((thrown: unknown) => thrown);
    expect(error).toBeInstanceOf(ZhsAuthError);
    expect((error as Error).message).toBe(ZHS_SESSION_EXPIRED);
    expect((error as ZhsAuthError).status).toBe(401);
  });

  it('HTTP 403 同样算登录问题（实测登录失效时回 403 + 未登录）', async () => {
    const error = await authClient(403, '{"code":403,"message":"未登录"}')
      .call('meetSessions', { recruitId: 1 })
      .catch((thrown: unknown) => thrown);
    expect(error).toBeInstanceOf(ZhsAuthError);
  });

  it('先判状态码再解析：401 带一段 HTML 也不会变成「Unexpected token <」', async () => {
    const error = await authClient(401, '<!DOCTYPE html><title>登录</title>')
      .call('shareCourses', {})
      .catch((thrown: unknown) => thrown);
    expect(error).toBeInstanceOf(ZhsAuthError);
  });

  it('500 带 HTML 归 http 错误，正文不参与解析', async () => {
    const error = await authClient(500, '<html>gateway error</html>')
      .call('shareCourses', {})
      .catch((thrown: unknown) => thrown);
    expect(error).toBeInstanceOf(ZhsHttpError);
    expect(error).not.toBeInstanceOf(ZhsAuthError);
    expect((error as ZhsHttpError).status).toBe(500);
  });
});

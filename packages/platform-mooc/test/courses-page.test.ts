/*
 * 课程列表分页的三种形状，以及登录探问只要一页。
 *
 * 现场（2026-10-21 真机，页大小 1）：翻到第 6 页时平台回
 * `{code:0, result:{result:null, pagination:{…}}}`——**这一页没有数据**。
 * 旧判定把「内层 result 为 null」当成未登录，于是刚登录的账号在翻到空页那一刻
 * 被判成「未登录」，界面同时出现课程列表和「前往登录」。
 */

import { describe, expect, it } from 'vitest';
import { md5hex } from '@study-pilot/core';
import { createMoocClient } from '../src/client.ts';
import { getCourses } from '../src/courses.ts';
import { ensureSession } from '../src/policy/session.ts';
import type { HostCapabilities } from '@study-pilot/application';
import type { FetchLike } from '@study-pilot/transport';

const COURSE = { id: 1000000001, name: '示例课程甲', termPanel: { id: 1400000001 } };

function json(body: unknown): Response {
  return new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' } });
}

/** 按页码给响应：页码 → 内层 result（数组或 null）。记录请求次数。 */
function pagedFetch(pages: Record<number, unknown>): { fetch: FetchLike; count: () => number } {
  let calls = 0;
  const fetch: FetchLike = async (_url, init) => {
    calls += 1;
    const body = JSON.parse(String(init?.body ?? '{}')) as { p?: number };
    const inner = pages[body.p ?? 1];
    // total 给 2：让第一页「还有下一页」，才走得到空页那一格
    return json({ code: 0, result: { result: inner ?? null, pagination: { total: 2 } } });
  };
  return { fetch, count: () => calls };
}

function clientWith(fetch: FetchLike) {
  return createMoocClient({ fetch, getToken: () => 'token', md5: md5hex, minGapMs: 0 });
}

describe('课程列表分页', () => {
  it('翻到空页（内层 result 为 null）是结束，不是未登录', async () => {
    const { fetch, count } = pagedFetch({ 1: [COURSE], 2: null });
    const result = await getCourses(clientWith(fetch), { pageSize: 1 });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.map((course) => course.name)).toEqual(['示例课程甲']);
    expect(count()).toBe(2); // 第一页满 → 再看一页 → 空 → 停
  });

  it('整个 result 为 null 才是未登录（实测 2026-10-03）', async () => {
    const client = createMoocClient({
      fetch: async () => json({ code: 0, result: null }),
      getToken: () => 'token',
      md5: md5hex,
      minGapMs: 0,
    });
    const result = await getCourses(client);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.kind).toBe('auth');
  });

  it('maxPages 只翻一页：登录探问不为「认不认得我」读完整张表', async () => {
    const { fetch, count } = pagedFetch({ 1: [COURSE] });
    await getCourses(clientWith(fetch), { pageSize: 1, maxPages: 1 });
    expect(count()).toBe(1);
  });

  it('内层不是数组：如实报解析失败，不当空列表', async () => {
    const client = createMoocClient({
      fetch: async () => json({ code: 0, result: { result: { 意外: true } } }),
      getToken: () => 'token',
      md5: md5hex,
      minGapMs: 0,
    });
    const result = await getCourses(client);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.kind).toBe('parse');
  });
});

describe('登录探问', () => {
  const host: HostCapabilities = {
    readCookie: async () => '',
    whenRequestRulesReady: async () => undefined,
  };

  it('cookie 读不出用户、服务端认得：一次只读探问即按登录处理', async () => {
    const { fetch, count } = pagedFetch({ 1: [COURSE] });
    const session = await ensureSession(host, async () => new Response('ok'), 'https://www.icourse163.org', clientWith(fetch));
    expect(session.loggedIn).toBe(true);
    expect(count()).toBe(1);
  });
});

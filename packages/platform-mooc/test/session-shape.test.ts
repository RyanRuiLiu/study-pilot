/*
 * 未登录形态的响应识别。
 *
 * 平台对失效会话不报错：课程列表回 `{code:0, result:{result:null}}`，
 * 课程结构回 `{code:0, result:{mocTermDto:null}}`（实测 2026-10-03，
 * 匿名与伪造失效会话一致）。这两个形态曾被当成「空数据」吞掉，
 * 失效会话于是表现为「暂无待办」——这是本仓库花了一整轮排查才定位的
 * 静默失败，这里用测试钉死：null 归 auth，空数组才是真的没有。
 */

import { describe, expect, it } from 'vitest';
import { md5hex } from '@study-pilot/core';
import { createMoocClient } from '../src/client.ts';
import { COURSE_TYPE, getCourses, getCourseStructure } from '../src/index.ts';

const TOKEN = 'deadbeefdeadbeefdeadbeefdeadbeef';

function clientWith(envelopes: Record<string, unknown>) {
  return createMoocClient({
    fetch: (async (url: string) => {
      const path = new URL(url).pathname;
      const body = Object.entries(envelopes).find(([prefix]) => path.includes(prefix))?.[1];
      return new Response(JSON.stringify(body ?? { code: 0, result: null }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }) as never,
    getToken: () => TOKEN,
    md5: md5hex,
    minGapMs: 0,
  });
}

describe('课程列表的未登录形态', () => {
  it('内层 result 为 null 时报 auth，不再当空列表', async () => {
    const client = clientWith({
      'getMyLearnedCoursePanelList': {
        code: 0,
        message: '',
        result: { pagination: { total: 0 }, result: null },
      },
    });
    const result = await getCourses(client, { courseType: COURSE_TYPE.MOOC });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.kind).toBe('auth');
  });

  it('内层 result 为空数组是已登录的真没有，正常返回', async () => {
    const client = clientWith({
      'getMyLearnedCoursePanelList': {
        code: 0,
        message: '',
        result: { pagination: { total: 0 }, result: [] },
      },
    });
    const result = await getCourses(client, { courseType: COURSE_TYPE.MOOC });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toEqual([]);
  });

  it('业务错误码仍归 api，不被误判成登录问题', async () => {
    const client = clientWith({
      'getMyLearnedCoursePanelList': { code: -1, message: '服务异常' },
    });
    const result = await getCourses(client, { courseType: COURSE_TYPE.MOOC });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.kind).toBe('api');
  });
});

describe('课程结构的未登录形态', () => {
  it('mocTermDto 为 null 时报 auth，不再当「没有章节的课程」', async () => {
    const client = clientWith({
      'getLastLearnedMocTermDto': { code: 0, message: '', result: null },
    });
    const result = await getCourseStructure(client, 1400000001);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.kind).toBe('auth');
  });

  it('mocTermDto 有值时正常解析，即便章节为空', async () => {
    const client = clientWith({
      'getLastLearnedMocTermDto': {
        code: 0,
        message: '',
        result: { mocTermDto: { id: 1400000001, chapters: [], exams: [] } },
      },
    });
    const result = await getCourseStructure(client, 1400000001);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.works).toEqual([]);
  });
});

/*
 * 新版考试取卷三步链：getPaperIntroduce → getOpenQuizInfo → getPaper（form 直发）。
 *
 * 响应形状取自真机（2026-11-08 开考现场，留痕 .probe/newexam-live/），值已换成
 * 合成样例。三步各自实测过：①介绍响应带 objectTestId；②旧信息端点认新考试的
 * test id 并给出活跃答卷 aid；③取卷必须带 answerformId（缺它被网关以
 * 「不支持类型:application/json」拒收）。
 */

import { describe, expect, it } from 'vitest';
import { ok } from '@study-pilot/core';
import type { MoocClient } from '../src/client.ts';
import { getNewExamPaper } from '../src/new-exam.ts';

/** 假 client：rpc.call（/web/j 旧族）与 send（mm-tiku form）分别记账。 */
function clientWith(rpcResults: Record<string, unknown>, sendResults: Record<string, unknown>) {
  const calls: Array<{ kind: string; key: string; body?: unknown }> = [];
  const client = {
    rpc: {
      call: async (_bean: string, method: string, _body: Record<string, unknown>) => {
        calls.push({ kind: 'rpc', key: method });
        const r = rpcResults[method];
        if (r === undefined) throw new Error('未预设 ' + method);
        return r;
      },
    },
    send: async (url: string, init?: RequestInit) => {
      const method = /mocExamBean\.([A-Za-z]+)\.rpc/.exec(url)?.[1] ?? '未知';
      calls.push({ kind: 'send', key: method, body: init?.body });
      const r = sendResults[method];
      if (r === undefined) throw new Error('未预设 ' + method);
      return new Response(JSON.stringify(r), { status: 200 });
    },
    origin: 'https://www.icourse163.org',
    getToken: async () => '合成token',
  } as unknown as MoocClient;
  return { client, calls };
}

const INTRO = {
  code: 0,
  result: { objectTestId: 1258000001, subjectTestId: 1258000002, questionCount: 14, totalScore: 100 },
};
const PAPER = {
  code: 0,
  result: {
    aid: 3550000001,
    examId: 1233000001,
    submitStatus: 1,
    questions: [
      {
        id: 3388000001,
        type: 1,
        score: 2,
        testId: 1258000001,
        optionDtos: [{ id: 111 }, { id: 112 }, { id: 113 }, { id: 114 }],
        judgeDtos: null,
      },
      {
        id: 3388000011,
        type: 10,
        score: 20,
        testId: 1258000002,
        optionDtos: null,
        judgeDtos: [{ id: 99, msg: '<p>合成评分标准</p>', maxScore: 20 }],
      },
    ],
  },
};

describe('getNewExamPaper（三步链）', () => {
  it('三步顺序执行并归一：题序保持、选项序保持、judgeDtos 映射', async () => {
    const { client, calls } = clientWith(
      { getOpenQuizInfo: ok({ aid: 3550000001 }) },
      { getPaperIntroduce: INTRO, getPaper: PAPER },
    );
    const result = await getNewExamPaper(client, 1233000001);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(calls.map((c) => c.kind + ':' + c.key)).toEqual([
      'send:getPaperIntroduce',
      'rpc:getOpenQuizInfo',
      'send:getPaper',
    ]);
    expect(result.value.aid).toBe(3550000001);
    expect(result.value.testId).toBe(1258000001);
    expect(result.value.questions.map((q) => q.type)).toEqual([1, 10]);
    expect(result.value.questions[0].optionIds).toEqual([111, 112, 113, 114]);
    expect(result.value.questions[0].judgeDtos).toBeNull();
    expect(result.value.questions[1].judgeDtos).toEqual([{ msg: '<p>合成评分标准</p>', maxScore: 20 }]);
  });

  it('未开卷（openQuizInfo 无 aid）→ 如实报错，不发取卷', async () => {
    const { client, calls } = clientWith(
      { getOpenQuizInfo: ok({ aid: 0 }) },
      { getPaperIntroduce: INTRO, getPaper: PAPER },
    );
    const result = await getNewExamPaper(client, 1233000001);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.message).toContain('还没有作答中的答卷');
    expect(calls.some((c) => c.key === 'getPaper')).toBe(false);
  });

  it('介绍响应缺 objectTestId → 如实报错（形状与预期不符）', async () => {
    const { client } = clientWith({}, { getPaperIntroduce: { code: 0, result: {} } });
    const result = await getNewExamPaper(client, 1233000001);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.message).toContain('客观题部分 id');
  });

  it('form 直发的报文格式：x-www-form-urlencoded，嵌套对象 JSON 序列化', async () => {
    let seen: string | null = null;
    const client = {
      rpc: { call: async () => ok({ aid: 3550000001 }) },
      send: async (url: string, init?: RequestInit) => {
        if (/getPaper.rpc/.test(url)) seen = String(init?.body);
        return new Response(JSON.stringify(/getPaperIntroduce/.test(url) ? INTRO : PAPER), { status: 200 });
      },
      origin: 'https://www.icourse163.org',
      getToken: async () => '合成token',
    } as unknown as MoocClient;
    await getNewExamPaper(client, 1233000001);
    // mm-tiku 的 body 是 URLSearchParams 序列化：标量 String()，无嵌套对象时原样
    expect(seen).toBe('examId=1233000001&answerformId=3550000001');
  });
});

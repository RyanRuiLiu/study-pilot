/*
 * 新版考试列表读取：信封判读与条目归一。
 *
 * 形态取自真机（2026-11-08，courseBean.getNewExamList.rpc，留痕
 * .probe/mooc-new-exam-*.json），值已换成合成样例。两个判据来自真机：
 *  · 信封 {code:0, result:null} = 该学期没有新版考试（同刻另一学期有），
 *    绝不能当未登录；
 *  · result 是数组时按条目归一，缺 id 的条目挂不上任何入口，跳过。
 */

import { describe, expect, it } from 'vitest';
import { err, ok } from '@study-pilot/core';
import type { MoocClient } from '../src/client.ts';
import { getNewExamList } from '../src/new-exam.ts';

/** 假 client：rpc.call 的返回值按用例给定。 */
function clientWith(callResult: unknown): MoocClient {
  return {
    rpc: { call: async () => callResult },
  } as unknown as MoocClient;
}

/** 真机条目形态（值合成）：一场混合题型的新版考试。 */
const RAW_EXAM = {
  id: 1250000001,
  releaseTime: 1793000000000,
  name: '期中测试',
  description: '试卷内容：合成样例。',
  termId: 1400000001,
  deadline: 1794000000000,
  totalScore: 100.0,
  userScore: null,
  scorePubStatus: 0,
  usedTryCount: 0,
  tryTime: 1,
  draftAid: null,
  examType: 1,
  objectTestId: 1250000002,
  subjectTestId: 1250000003,
  evaluateStart: 1793000000000,
  evaluateEnd: 1794000000000,
  objectTest: { id: 1250000002, trytime: 1 },
  subjectTest: { id: 1250000003, trytime: 1 },
};

describe('getNewExamList', () => {
  it('result 为 null → 空列表（不是未登录）', async () => {
    const result = await getNewExamList(clientWith(ok(null)), 1400000001);
    expect(result).toEqual({ ok: true, value: [] });
  });

  it('数组按字段归一', async () => {
    const result = await getNewExamList(clientWith(ok([RAW_EXAM])), 1400000001);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value).toHaveLength(1);
    expect(result.value[0]).toEqual({
      eid: 1250000001,
      name: '期中测试',
      releaseTime: 1793000000000,
      deadline: 1794000000000,
      totalScore: 100,
      userScore: null,
      scorePubStatus: 0,
      usedTryCount: 0,
      tryTime: 1,
      draftAid: null,
      objectTestId: 1250000002,
      subjectTestId: 1250000003,
      evaluateStart: 1793000000000,
      evaluateEnd: 1794000000000,
    });
  });

  it('缺 id 的条目跳过（挂不上任何入口）', async () => {
    const result = await getNewExamList(
      clientWith(ok([{ id: null, name: '无名条目' }, RAW_EXAM])),
      1400000001,
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.map((exam) => exam.eid)).toEqual([1250000001]);
  });

  it('result 形状不对（既非 null 也非数组）→ 如实报错', async () => {
    const result = await getNewExamList(clientWith(ok({ unexpected: true })), 1400000001);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.message).toContain('不是数组');
  });

  it('信封 code 非 0 的失败原样透传', async () => {
    const failure = err({ kind: 'api' as const, message: '没有权限' });
    const result = await getNewExamList(clientWith(failure), 1400000001);
    expect(result).toEqual(failure);
  });
});

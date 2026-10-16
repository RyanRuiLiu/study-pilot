/* 作业清单归一的形态核对（纯函数喂真机样本形态；读取只核对载荷与 flag 映射）。 */

import { describe, expect, it } from 'vitest';
import { getExamList, normalizeHomeworkList } from '../src/exam-list.ts';
import type { ZhsClient } from '../src/client.ts';

describe('normalizeHomeworkList', () => {
  it('两类条目都归一：单元测试带章节名，见面课测验章节名为 null', () => {
    const items = normalizeHomeworkList({
      studentHomeworkList: [
        { id: 'ymVxX7lb', examId: 'e8NaaJzy', examName: '绪论单元测试', meetCourseType: 0, state: 1, cpOrderNumber: '绪论' },
        { id: 'ab12cd34', examId: 'zz99yy88', examName: '10-13 见面课', meetCourseType: 1, state: 4, score: 9, totalScore: 10, cpOrderNumber: null },
      ],
    });
    expect(items).toHaveLength(2);
    expect(items[0]).toEqual({
      id: 'ymVxX7lb',
      examId: 'e8NaaJzy',
      examName: '绪论单元测试',
      meetCourseType: 0,
      state: 1,
      score: null,
      totalScore: null,
      chapterName: '绪论',
    });
    expect(items[1]).toMatchObject({ meetCourseType: 1, state: 4, score: 9, totalScore: 10, chapterName: null });
  });

  it('形状不对返回空表（不是抛错，也不造记录）', () => {
    expect(normalizeHomeworkList({ studentHomeworkList: null })).toEqual([]);
    expect(normalizeHomeworkList({})).toEqual([]);
    expect(normalizeHomeworkList(null)).toEqual([]);
    expect(normalizeHomeworkList({ studentHomeworkList: 'x' })).toEqual([]);
  });

  it('没有 id 的条目跳过——lookHomework 认 id，缺了就用不了', () => {
    expect(normalizeHomeworkList({ studentHomeworkList: [{ examName: '缺 id' }] })).toEqual([]);
  });

  it('score 是 0 与 score 缺失是两件事：0 保留、缺失给 null', () => {
    const [zero, missing] = normalizeHomeworkList({
      studentHomeworkList: [
        { id: 'a', score: 0, totalScore: 100 },
        { id: 'b' },
      ],
    });
    expect(zero!.score).toBe(0);
    expect(missing!.score).toBeNull();
  });
});

describe('getExamList', () => {
  function fakeClient(response: unknown): { client: ZhsClient; calls: Array<{ name: string; payload: unknown }> } {
    const calls: Array<{ name: string; payload: unknown }> = [];
    return {
      calls,
      client: {
        call: async (name, payload) => {
          calls.push({ name, payload });
          return response;
        },
      },
    };
  }

  it('未提交页签 → flag=1；一次取全（pageSize=100）', async () => {
    const { client, calls } = fakeClient({ rt: { studentHomeworkList: [] } });
    await getExamList(client, { recruitId: 473310, courseId: 1000006163, submitted: false });
    expect(calls[0]).toEqual({
      name: 'examHomeworkList',
      payload: { recruitId: 473310, courseId: 1000006163, flag: 1, pageSize: 100, pageNum: 1 },
    });
  });

  it('已提交页签 → flag=2', async () => {
    const { client, calls } = fakeClient({ rt: { studentHomeworkList: [] } });
    await getExamList(client, { recruitId: 473310, courseId: 1000006163, submitted: true });
    expect((calls[0]!.payload as { flag: number }).flag).toBe(2);
  });
});

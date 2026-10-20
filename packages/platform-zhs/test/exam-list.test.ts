/* 作业清单归一的形态核对（纯函数喂真机样本形态；读取只核对载荷与 flag 映射）。 */

import { describe, expect, it } from 'vitest';
import { EXAM_LIST_PAGE_SIZE, getExamList, isActionable, needsWork, normalizeHomeworkList } from '../src/exam-list.ts';
import type { ZhsClient } from '../src/client.ts';

describe('normalizeHomeworkList', () => {
  it('两类条目都归一：单元测试带章节名，见面课测验章节名为 null', () => {
    const items = normalizeHomeworkList({
      studentHomeworkList: [
        { id: 'ymVxX7lb', examId: 'DEMOd004', examName: '绪论单元测试', meetCourseType: 0, state: 1, cpOrderNumber: '绪论' },
        { id: 'ab12cd34', examId: 'zz99yy88', examName: '10-13 见面课', meetCourseType: 1, state: 4, score: 9, totalScore: 10, cpOrderNumber: null },
      ],
    });
    expect(items).toHaveLength(2);
    expect(items[0]).toEqual({
      id: 'ymVxX7lb',
      examId: 'DEMOd004',
      examName: '绪论单元测试',
      meetCourseType: 0,
      state: 1,
      score: null,
      totalScore: null,
      chapterName: '绪论',
      problemNum: null,
      deadline: null,
    });
    expect(items[1]).toMatchObject({ meetCourseType: 1, state: 4, score: 9, totalScore: 10, chapterName: null });
  });

  it('真·空数组给空表——那是「这门课一张卷都没有」', () => {
    expect(normalizeHomeworkList({ studentHomeworkList: [] })).toEqual([]);
  });

  it('形态不符抛错：不拿空表冒充「我没读懂平台回了什么」', () => {
    // 空表会被计划读成「无事可做」，平台变形从此不会自己冒出来
    expect(() => normalizeHomeworkList({ studentHomeworkList: null })).toThrow(/studentHomeworkList/);
    expect(() => normalizeHomeworkList({})).toThrow(/studentHomeworkList/);
    expect(() => normalizeHomeworkList(null)).toThrow(/studentHomeworkList/);
    expect(() => normalizeHomeworkList('x')).toThrow(/studentHomeworkList/);
    expect(() => normalizeHomeworkList({ studentHomeworkList: 'x' })).toThrow(/studentHomeworkList/);
  });

  it('没有 id 的条目跳过——lookHomework 认 id，缺了就用不了', () => {
    expect(normalizeHomeworkList({ studentHomeworkList: [{ examName: '缺 id' }] })).toEqual([]);
  });

  it('截止时间是本地时间串，解析成毫秒（外壳时间列只认毫秒）', () => {
    const [item] = normalizeHomeworkList({
      studentHomeworkList: [{ id: 'a', endDate: '2027-01-20 23:59:59', problemNum: 50 }],
    });
    expect(item!.problemNum).toBe(50);
    expect(item!.deadline).toBe(new Date(2027, 0, 20, 23, 59, 59).getTime());
  });

  it('时间串形态不符给 null，不猜也不拿当前时间凑', () => {
    for (const bad of ['', '2027/01/20', 1792152062540, null, undefined]) {
      const [item] = normalizeHomeworkList({ studentHomeworkList: [{ id: 'a', endDate: bad }] });
      expect(item!.deadline).toBeNull();
    }
  });

  it('分值在响应里是字符串（"100"）而状态是数字——两种都要认', () => {
    const [item] = normalizeHomeworkList({
      studentHomeworkList: [{ id: 'a', state: 4, meetCourseType: 0, score: '10', totalScore: '100' }],
    });
    expect(item).toMatchObject({ state: 4, score: 10, totalScore: 100 });
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

describe('isActionable', () => {
  it('只有 state=1（未动过）可做；4 与 5 都只呈现', () => {
    const at = (state: number) =>
      isActionable({
        id: 'x',
        examId: 'y',
        examName: '',
        meetCourseType: 0,
        state,
        score: null,
        totalScore: null,
        chapterName: null,
        problemNum: null,
        deadline: null,
      });
    expect(at(1)).toBe(true);
    expect(at(4)).toBe(false);
    expect(at(5)).toBe(false);
  });
});

describe('needsWork', () => {
  const at = (state: number): boolean =>
    needsWork({
      id: 'x',
      examId: 'y',
      examName: '',
      meetCourseType: 0,
      state,
      score: null,
      totalScore: null,
      chapterName: null,
      problemNum: null,
      deadline: null,
    });

  it('没动过的与「重做已申请」的都收——后者按 Ryan 口径直接接管', () => {
    expect(at(1)).toBe(true);
    expect(at(5)).toBe(true);
  });

  it('已交的（state=4）不进——它在已交页签里另有一条判据管', () => {
    expect(at(4)).toBe(false);
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

  it('恰好满一页时 complete=false——总数不可信，宁可说没读全', async () => {
    const full = Array.from({ length: EXAM_LIST_PAGE_SIZE }, (_, index) => ({
      id: `id-${index}`,
      examId: 'e',
      examName: '第三章单元测试',
      meetCourseType: 0,
      state: 1,
    }));
    const { client } = fakeClient({ rt: { studentHomeworkList: full } });
    const page = await getExamList(client, { recruitId: 1, courseId: 2, submitted: false });
    expect(page.items).toHaveLength(EXAM_LIST_PAGE_SIZE);
    expect(page.complete).toBe(false);
  });

  it('不足一页时 complete=true（实测最大 20 条，一门课二十章）', async () => {
    const { client } = fakeClient({
      rt: { studentHomeworkList: [{ id: 'a', examId: 'e', examName: 'x', meetCourseType: 0, state: 1 }] },
    });
    const page = await getExamList(client, { recruitId: 1, courseId: 2, submitted: true });
    expect(page.items).toHaveLength(1);
    expect(page.complete).toBe(true);
  });

  it('未提交页签 → flag=1；一次取全（pageSize=100）', async () => {
    const { client, calls } = fakeClient({ rt: { studentHomeworkList: [] } });
    await getExamList(client, { recruitId: 900004, courseId: 9000000002, submitted: false });
    expect(calls[0]).toEqual({
      name: 'examHomeworkList',
      // pageNum 是 0 基（实测 1 回空表）——这条断言就是防手滑改回 1
      payload: { recruitId: 900004, courseId: 9000000002, flag: 1, pageSize: 100, pageNum: 0 },
    });
  });

  it('已提交页签 → flag=2', async () => {
    const { client, calls } = fakeClient({ rt: { studentHomeworkList: [] } });
    await getExamList(client, { recruitId: 900004, courseId: 9000000002, submitted: true });
    expect((calls[0]!.payload as { flag: number }).flag).toBe(2);
  });
});

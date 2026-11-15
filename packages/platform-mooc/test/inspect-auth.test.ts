/*
 * 快照拉取的会话失效记账。
 *
 * inspect 曾把「全部课程都读到未登录形态」吞成一份空快照——弹窗于是
 * 显示「暂无待办」，而真实原因是服务端会话已死。修复后它要区分三种
 * 结局：全会话失效（抛 SessionExpiredError，交编排层续期重读）、
 * 个别课程失败（其余课程照常进快照）、普通失败（照旧报错）。
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ok } from '@study-pilot/core';
import type { TransportError } from '@study-pilot/transport';
import type { CourseStructure } from '../src/types.ts';
import type { NewExamListItem } from '../src/new-exam.ts';
import { inspect } from '../src/policy/read/inspect.ts';
import { SessionExpiredError } from '../src/policy/session.ts';

/** getCourseStructure 的结果按 termId 从这张表里取。 */
const structureResults = new Map<number, ResultLike>();
type ResultLike =
  | { ok: true; value: CourseStructure }
  | { ok: false; error: TransportError };

/* 替身换的是被测代码真正 import 的那个模块：inspect 里 import 的是 ../structure.ts，
   冒充包的门拦不住它。 */
vi.mock('../src/structure.ts', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    getCourseStructure: async (_client: unknown, termId: number) =>
      structureResults.get(termId) ?? failWith('network', '未预设'),
  };
});

/** getNewExamList 的结果按 termId 从这张表里取；缺省 = 该学期没有新版考试。 */
const newExamResults = new Map<number, ExamListLike>();
type ExamListLike =
  | { ok: true; value: NewExamListItem[] }
  | { ok: false; error: TransportError };
vi.mock('../src/new-exam.ts', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    getNewExamList: async (_client: unknown, termId: number) =>
      newExamResults.get(termId) ?? ok([]),
  };
});

/** SPOC 同步课 → 源学期的映射；mode 非 10 照实走自己的 termId（与真实现同判据）。 */
const spocOrigin = new Map<number, number>();
vi.mock('../src/spoc-sync.ts', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    resolveContentTermId: async (_client: unknown, course: { termId: number; mode: number }) => {
      if (course.mode !== 10) return ok(course.termId);
      const origin = spocOrigin.get(course.termId);
      if (origin === undefined) {
        return {
          ok: false,
          error: { kind: 'parse' as const, message: 'SPOC 同步课：页面骨架里没有 window.moocTermDto' },
        };
      }
      return ok(origin);
    },
  };
});

function failWith(kind: TransportError['kind'], message: string) {
  return { ok: false, error: { kind, message } } as ResultLike;
}

function emptyStructure(termId: number): ResultLike {
  return ok({
    termId,
    courseId: 1000 + termId,
    courseName: `课程${termId}`,
    works: [],
    units: [],
  });
}

const authError = failWith('auth', '平台会话已失效');

function course(termId: number) {
  return { termId, courseId: 1000 + termId, schoolShortName: 'UNI', mode: 0, name: `课程${termId}` };
}

describe('inspect 的会话失效记账', () => {
  // 三张替身表都是模块级的：不逐用例清场，前一个用例的预设会漏进后一个
  beforeEach(() => {
    structureResults.clear();
    newExamResults.clear();
    spocOrigin.clear();
  });

  it('全部课程都是未登录形态：抛 SessionExpiredError，而不是交出空快照', async () => {
    structureResults.set(1, authError);
    structureResults.set(2, authError);

    await expect(inspect({} as never, [course(1), course(2)], 7)).rejects.toBeInstanceOf(
      SessionExpiredError,
    );
  });

  it('只有个别课程是未登录形态：其余课程照常进快照', async () => {
    structureResults.set(1, authError);
    structureResults.set(2, emptyStructure(2));

    const snapshot = await inspect({} as never, [course(1), course(2)], 7);
    expect(snapshot.courses.map((c) => c.termId)).toEqual([2]);
  });

  it('全部是普通失败：报原来的错误，不误判成登录问题', async () => {
    structureResults.set(1, failWith('http', 'HTTP 502'));
    structureResults.set(2, failWith('network', '断网'));

    await expect(inspect({} as never, [course(1), course(2)], 7)).rejects.toThrow(
      '全部 2 门课程都读取失败',
    );
  });

  it('全部成功：返回完整快照，不抛任何东西', async () => {
    structureResults.set(1, emptyStructure(1));
    structureResults.set(2, emptyStructure(2));

    const snapshot = await inspect({} as never, [course(1), course(2)], 7);
    expect(snapshot.courses).toHaveLength(2);
  });

  it('新版考试读取失败 → 整门课按失败记账（工作项缺一整类比失败更难发现）', async () => {
    structureResults.set(1, emptyStructure(1));
    newExamResults.set(1, { ok: false, error: { kind: 'api' as const, message: '没有权限' } });

    await expect(inspect({} as never, [course(1)], 7)).rejects.toThrow('全部 1 门课程都读取失败');
  });

  it('新版考试条目进快照：type=exam-new、机会用满即已交', async () => {
    structureResults.set(1, emptyStructure(1));
    newExamResults.set(
      1,
      ok([
        {
          eid: 1250000001,
          name: '期中测试',
          releaseTime: null,
          deadline: 1794000000000,
          totalScore: 100,
          userScore: null,
          usedTryCount: 0,
          tryTime: 1,
          draftAid: null,
          objectTestId: null,
          subjectTestId: null,
          scorePubStatus: null,
          evaluateStart: 1794000001000,
          evaluateEnd: 1794000010000,
        },
        {
          eid: 1250000002,
          name: '已交的合成考试',
          releaseTime: null,
          deadline: null,
          totalScore: 100,
          userScore: null,
          usedTryCount: 1,
          tryTime: 1,
          draftAid: null,
          objectTestId: null,
          subjectTestId: null,
          scorePubStatus: null,
          evaluateStart: 1794000001000,
          evaluateEnd: 1794000010000,
        },
      ]),
    );

    const snapshot = await inspect({} as never, [course(1)], 7);
    const [entry] = snapshot.courses[0]!.works;
    expect(snapshot.courses[0]!.works).toHaveLength(2);
    expect(entry).toMatchObject({
      tid: 1250000001,
      type: 'exam-new',
      examId: 1250000001,
      submitted: false,
      totalTryCount: 1,
    });
    expect(snapshot.courses[0]!.works[1]).toMatchObject({ tid: 1250000002, submitted: true });
  });

  it('SPOC 同步课与本尊都勾选：内容学期只读一次，工作项归到本尊名下', async () => {
    // SPOC（termId=2, mode=10）引用源学期 1；本尊（termId=1）也在勾选里
    spocOrigin.set(2, 1);
    structureResults.set(
      1,
      ok({
        termId: 1,
        courseId: 1001,
        courseName: '示例课程甲',
        works: [],
        units: [
          {
            unitId: 7,
            contentId: 17,
            termId: 1,
            lessonId: 1,
            lessonName: '合成课时',
            name: '合成单元',
            contentType: 0,
            durationInSeconds: 60,
            completePercent: 0,
            viewStatus: 0,
          },
        ],
      }),
    );
    newExamResults.set(1, ok([]));

    const snapshot = await inspect({} as never, [course(1), { ...course(2), mode: 10 }], 7);
    expect(snapshot.courses).toHaveLength(2);
    const byTerm = new Map(snapshot.courses.map((c) => [c.termId, c]));
    expect(byTerm.get(1)!.units).toHaveLength(1);
    expect(byTerm.get(2)!.units).toHaveLength(0);
  });

  it('只有 SPOC 被勾选：源学期的工作项归到它名下（不丢内容）', async () => {
    spocOrigin.set(2, 1);
    structureResults.set(
      1,
      ok({
        termId: 1,
        courseId: 1001,
        courseName: '示例课程甲',
        works: [],
        units: [],
      }),
    );

    const snapshot = await inspect({} as never, [{ ...course(2), mode: 10 }], 7);
    expect(snapshot.courses).toHaveLength(1);
    expect(snapshot.courses[0]!.termId).toBe(2);
    expect(snapshot.courses[0]!.units).toEqual([]);
  });

  it('SPOC 解析失败 → 该课按失败记账，其余课程照常', async () => {
    structureResults.set(1, emptyStructure(1));

    const snapshot = await inspect({} as never, [{ ...course(2), mode: 10 }, course(1)], 7);
    expect(snapshot.courses.map((c) => c.termId)).toEqual([1]);
  });
});

/*
 * 快照拉取的会话失效记账。
 *
 * inspect 曾把「全部课程都读到未登录形态」吞成一份空快照——弹窗于是
 * 显示「暂无待办」，而真实原因是服务端会话已死。修复后它要区分三种
 * 结局：全会话失效（抛 SessionExpiredError，交编排层续期重读）、
 * 个别课程失败（其余课程照常进快照）、普通失败（照旧报错）。
 */

import { describe, expect, it, vi } from 'vitest';
import { err, ok } from '@study-pilot/core';
import type { TransportError } from '@study-pilot/transport';
import type { CourseStructure } from '@study-pilot/platform-mooc';

/*
 * snapshot.ts 顶层会注册存储项，vitest 环境没有 wxt 的 browser 全局，
 * 用一个惰性空实现替身——快照读写本身不在这轮测试范围内。
 */
vi.mock('wxt/utils/storage', () => ({
  storage: {
    defineItem: () => ({
      getValue: async () => null,
      setValue: async () => undefined,
    }),
  },
}));

/** getCourseStructure 的结果按 termId 从这张表里取。 */
const structureResults = new Map<number, ResultLike>();
type ResultLike =
  | { ok: true; value: CourseStructure }
  | { ok: false; error: TransportError };

vi.mock('@study-pilot/platform-mooc', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    getCourseStructure: async (_client: unknown, termId: number) =>
      structureResults.get(termId) ?? failWith('network', '未预设'),
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
  it('全部课程都是未登录形态：抛 SessionExpiredError，而不是交出空快照', async () => {
    const { inspect } = await import('../src/background/mooc/snapshot');
    const { SessionExpiredError } = await import('../src/platform/mooc/session');
    structureResults.set(1, authError);
    structureResults.set(2, authError);

    await expect(inspect({} as never, [course(1), course(2)], 7)).rejects.toBeInstanceOf(
      SessionExpiredError,
    );
  });

  it('只有个别课程是未登录形态：其余课程照常进快照', async () => {
    const { inspect } = await import('../src/background/mooc/snapshot');
    structureResults.set(1, authError);
    structureResults.set(2, emptyStructure(2));

    const snapshot = await inspect({} as never, [course(1), course(2)], 7);
    expect(snapshot.courses.map((c) => c.termId)).toEqual([2]);
  });

  it('全部是普通失败：报原来的错误，不误判成登录问题', async () => {
    const { inspect } = await import('../src/background/mooc/snapshot');
    structureResults.set(1, failWith('http', 'HTTP 502'));
    structureResults.set(2, failWith('network', '断网'));

    await expect(inspect({} as never, [course(1), course(2)], 7)).rejects.toThrow(
      '全部 2 门课程都读取失败',
    );
  });

  it('全部成功：返回完整快照，不抛任何东西', async () => {
    const { inspect } = await import('../src/background/mooc/snapshot');
    structureResults.set(1, emptyStructure(1));
    structureResults.set(2, emptyStructure(2));

    const snapshot = await inspect({} as never, [course(1), course(2)], 7);
    expect(snapshot.courses).toHaveLength(2);
  });
});

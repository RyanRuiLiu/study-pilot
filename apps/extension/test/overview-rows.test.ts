/*
 * 概览行的生成（`platforms/mooc/overview.ts`）。
 *
 * 概览那张表上每一个字都从这里来：状态怎么说、截止显示成什么、得分有没有、
 * 能不能点进去。这里钉的是「快照里的一个事实对应界面上的哪一句」，
 * 而不是渲染——渲染归壳层，跨平台共用一份。
 *
 * 只 mock 消息边界：读快照要走后台，测试里没有后台。
 * 快照的形状、状态判据（work-status）与地址拼接都用真实实现。
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';

/*
 * 只替身 `sendToBackground`，其余导出保持真实：状态判据要从 messaging 取
 * `WORK_STATUS` 那张表，整模块换掉等于把要验的判据一起换掉。
 */
vi.mock('../src/browser/messaging', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../src/browser/messaging')>();
  return { ...actual, sendToBackground: vi.fn() };
});

import { sendToBackground } from '../src/browser/messaging';
import { moocOverview } from '../src/platforms/mooc/overview';
import type { OverviewRow } from '../src/platforms/types';
import { UNIT_TYPE, type CourseUnit } from '@study-pilot/platform-mooc';

const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.now();

function work(overrides: Record<string, unknown> = {}): never {
  return {
    tid: 1001,
    name: '第一单元测验',
    chapterName: '第1章',
    examId: null,
    type: 'quiz',
    submitted: false,
    deadline: NOW + 2 * DAY,
    evaluateStart: null,
    evaluateEnd: null,
    evaluateScoreRelease: null,
    score: null,
    totalScore: 20,
    reviewable: false,
    evaluateDone: null,
    evaluateTotal: null,
    selfDone: null,
    ...overrides,
  } as never;
}

function unit(overrides: Partial<CourseUnit> = {}): CourseUnit {
  return {
    unitId: 9,
    contentId: 90,
    termId: 7,
    lessonId: 3,
    lessonName: '第1讲',
    name: '1.1 课程介绍',
    contentType: UNIT_TYPE.VIDEO,
    durationInSeconds: 300,
    completePercent: 0,
    viewStatus: 0,
    ...overrides,
  };
}

function snapshot(works: unknown[], units: CourseUnit[]): never {
  return {
    version: 1,
    fetchedAt: NOW - 60_000,
    fetchedDate: '2026-10-14',
    courses: [
      {
        termId: 7,
        courseId: 1001753142,
        schoolShortName: 'NTU',
        mode: 0,
        courseName: '模拟电子技术',
        works,
        units,
      },
    ],
  } as never;
}

/** 跑一次概览并返回行，按标题查。 */
async function rows(): Promise<OverviewRow[]> {
  const overview = await moocOverview.overview();
  return overview.rows;
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('来源', () => {
  it('还没读过平台：来源是 0，不伪造一份快照', async () => {
    vi.mocked(sendToBackground).mockResolvedValue({ status: 'ok', value: null } as never);

    expect(await moocOverview.overview()).toMatchObject({ source: { at: 0 }, rows: [] });
  });

  it('读失败：原因原样交出去，不显示成「没有待办」', async () => {
    vi.mocked(sendToBackground).mockResolvedValue({ status: 'error', message: '存储读不出来' } as never);

    const overview = await moocOverview.overview();
    expect(overview.source).toEqual({ error: '存储读不出来' });
    expect(overview.rows).toEqual([]);
  });

  it('读过：把快照的读取时刻带回去', async () => {
    vi.mocked(sendToBackground).mockResolvedValue({ status: 'ok', value: snapshot([], []) } as never);

    expect((await moocOverview.overview()).source).toEqual({ at: NOW - 60_000 });
  });
});

/*
 * 行里的 `mode` 与 `state` 是枚举不是文字：界面上要按它们排序、上色、决定标签语气，
 * 跟着显示文字判断的话，平台改了说法会静默失效。说法本身在 entrypoints/options/overview.ts。
 */
describe('工作项行', () => {
  it('未提交的测验：未完成、后台可代做、未提交，能点进作答页', async () => {
    vi.mocked(sendToBackground).mockResolvedValue({ status: 'ok', value: snapshot([work()], []) } as never);

    const [row] = await rows();
    expect(row).toMatchObject({
      course: '模拟电子技术',
      title: '第一单元测验',
      kind: '测验',
      mode: 'auto',
      state: 'todo',
      status: '未提交',
      score: '',
    });
    expect(row?.href).toContain('#/learn/quiz?id=1001');
  });

  it('已提交且有得分：已完成，得分列写「20 / 20」', async () => {
    vi.mocked(sendToBackground).mockResolvedValue(
      { status: 'ok', value: snapshot([work({ submitted: true, score: 20 })], []) } as never,
    );

    expect((await rows())[0]).toMatchObject({ state: 'done', score: '20 / 20' });
  });

  it('过了截止还没提交：状态是已过截止', async () => {
    vi.mocked(sendToBackground).mockResolvedValue(
      { status: 'ok', value: snapshot([work({ deadline: NOW - DAY })], []) } as never,
    );

    expect((await rows())[0]?.state).toBe('late');
  });

  it('互评进度并进状态里：只说「互评阶段」看不出还差几份', async () => {
    vi.mocked(sendToBackground).mockResolvedValue(
      {
        status: 'ok',
        value: snapshot(
          [
            work({
              type: 'homework',
              submitted: true,
              totalScore: null,
              reviewable: true,
              evaluateDone: 2,
              evaluateTotal: 3,
              selfDone: false,
              evaluateStart: NOW - DAY,
              evaluateEnd: NOW + DAY,
            }),
          ],
          [],
        ),
      } as never,
    );

    const [row] = await rows();
    expect(row?.kind).toBe('作业');
    expect(row?.status).toContain('互评 2/3');
    expect(row?.status).toContain('自评未做');
  });

  it('截止显示成相对说法，且排序用的时间戳还在', async () => {
    vi.mocked(sendToBackground).mockResolvedValue(
      { status: 'ok', value: snapshot([work({ deadline: NOW + 3 * 3600_000 })], []) } as never,
    );

    const [row] = await rows();
    expect(row?.dueAt).toBe(NOW + 3 * 3600_000);
    expect(row?.due).toMatch(/^[^ ]+ \d{2}:\d{2}$/);
  });
});

describe('课件单元行', () => {
  it('未完成的单元：未完成、后台可代做、没有截止也没有得分', async () => {
    vi.mocked(sendToBackground).mockResolvedValue({ status: 'ok', value: snapshot([], [unit()]) } as never);

    expect((await rows())[0]).toMatchObject({
      title: '1.1 课程介绍',
      mode: 'auto',
      state: 'todo',
      // 课件单元没有比三态更多的话，status 留空：概览那一格只印「未完成」一次
      status: '',
      due: '',
      dueAt: 0,
      score: '',
    });
  });

  it('讨论单元要人过目：做法是 assisted，界面把这一档说成「需要你确认」', async () => {
    vi.mocked(sendToBackground).mockResolvedValue(
      { status: 'ok', value: snapshot([], [unit({ contentType: UNIT_TYPE.DISCUSS })]) } as never,
    );

    expect((await rows())[0]?.mode).toBe('assisted');
  });

  it('已学完的单元：已完成', async () => {
    vi.mocked(sendToBackground).mockResolvedValue(
      { status: 'ok', value: snapshot([], [unit({ completePercent: 1 })]) } as never,
    );

    expect((await rows())[0]).toMatchObject({ state: 'done', status: '', statusDetail: '' });
  });
});

describe('读取最新', () => {
  it('向平台读失败时把原因交出去，不假装读到了', async () => {
    vi.mocked(sendToBackground).mockResolvedValue({ status: 'error', message: 'HTTP 403' } as never);

    expect(await moocOverview.refresh()).toEqual({ error: 'HTTP 403' });
  });

  it('读成功后交回这份数据的来源', async () => {
    vi.mocked(sendToBackground)
      .mockResolvedValueOnce({ status: 'ok', value: [] } as never)
      .mockResolvedValueOnce({ status: 'ok', value: snapshot([], []) } as never);

    expect(await moocOverview.refresh()).toEqual({ at: NOW - 60_000 });
  });
});

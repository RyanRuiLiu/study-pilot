/*
 * 课件进度按 termId 对齐课程行：同名不同学期的两门课不能共用一份数字。
 *
 * 真实场景：同一门课重选一次，名字一模一样，termId 不同。按课程名对齐时，
 * 后一学期的行会拿到前一学期的进度——数字看起来正常，但那是另一门课的。
 */

import { describe, expect, it, vi } from 'vitest';

const platform = vi.hoisted(() => ({
  ensureSession: vi.fn(async () => ({ loggedIn: true, userId: 1, token: 't' })),
  withSessionRecovery: vi.fn(async (fn: () => Promise<unknown>) => ({ ok: true, value: await fn() })),
  recoveryFailure: vi.fn(),
  summarizeCourseware: vi.fn(),
  derivePlan: vi.fn(() => ({ auto: [], manual: [] })),
  manualItemId: vi.fn(),
  workPageUrl: vi.fn(),
}));

const settingsModule = vi.hoisted(() => ({
  getSettings: vi.fn(async () => ({
    ai: { enabled: false, model: '', apiKey: '' },
    mooc: { courses: [], reviewComment: 'x', keepOverdueDays: 3, mobileAccount: '', mobilePassword: '' },
  })),
}));

vi.mock('@study-pilot/platform-mooc', () => platform);
vi.mock('../src/settings/index.ts', () => settingsModule);

const { coursewareSummaryCommand } = await import(
  '../src/adapters/mooc/messages/courseware-summary.ts'
);

const COURSES = [
  { termId: 11, courseId: 1, schoolShortName: 'DEMO', mode: 0, courseName: '同名课程' },
  { termId: 22, courseId: 1, schoolShortName: 'DEMO', mode: 0, courseName: '同名课程' },
];

const deps = {
  host: {},
  client: { send: vi.fn(), origin: 'https://www.icourse163.org' },
  renew: vi.fn(),
  refreshCourses: vi.fn(),
  loadSnapshot: vi.fn(async () => ({ courses: [] })),
  selectedCourses: () => COURSES,
  coursewareContext: vi.fn(),
  shell: { recordFailure: vi.fn() },
};

async function ask(): Promise<unknown> {
  return new Promise((resolve) => {
    void coursewareSummaryCommand(deps as never)({}, resolve);
  });
}

describe('课件进度与课程行的对齐', () => {
  it('同名课按 termId 各取各的数字', async () => {
    platform.summarizeCourseware.mockReturnValueOnce([
      { termId: 11, courseName: '同名课程', done: 9, total: 10, pending: 1, cannot: 0, needsAi: 0 },
      { termId: 22, courseName: '同名课程', done: 1, total: 10, pending: 9, cannot: 0, needsAi: 0 },
    ]);

    const response = (await ask()) as { status: string; value: { courses: Array<{ termId: number; done: number }> } };
    expect(response.status).toBe('ok');
    expect(response.value.courses).toEqual([
      expect.objectContaining({ termId: 11, done: 9 }),
      expect.objectContaining({ termId: 22, done: 1 }),
    ]);
  });

  it('读不到结构的课补一行「读不到」，仍带自己的 termId', async () => {
    platform.summarizeCourseware.mockReturnValueOnce([]);
    const response = (await ask()) as { value: { courses: Array<{ termId: number; unread?: boolean }> } };
    expect(response.value.courses).toEqual([
      expect.objectContaining({ termId: 11, unread: true }),
      expect.objectContaining({ termId: 22, unread: true }),
    ]);
  });
});

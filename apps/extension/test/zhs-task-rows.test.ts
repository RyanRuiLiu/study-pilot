/*
 * 智慧树板块行：同名课程（不同报名）的进度不能互相覆盖。
 *
 * 四个板块各有一行「每门课」；行的身份是「课程 × 板块」。按课程名做键时，
 * 同名的两门课后一行会盖掉前一行——那门课在单元测试板块永远看不到进度。
 */

import { parseHTML } from 'linkedom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const bridge = vi.hoisted(() => ({
  getZhsCourseTasks: vi.fn(),
  getTaskState: vi.fn(),
  subscribeRunState: vi.fn(),
  runNow: vi.fn(),
  stopRun: vi.fn(),
}));

vi.mock('../src/ui-bridge.ts', () => bridge);

const window = parseHTML(
  '<!doctype html><html><body>' +
    '<div id="zhs-tasks-list"></div>' +
    '<div id="zhs-tasks-head" hidden><p id="zhs-tasks-status"></p><a id="zhs-tasks-action" hidden></a></div>' +
    '<div id="toast"></div>' +
    '</body></html>',
);
const g = globalThis as unknown as {
  document: Document;
  window?: unknown;
  HTMLButtonElement?: unknown;
  HTMLAnchorElement?: unknown;
  HTMLElement?: unknown;
};
g.document = window.document as unknown as Document;
g.window = window;
g.HTMLButtonElement = window.HTMLButtonElement;
g.HTMLAnchorElement = window.HTMLAnchorElement;
g.HTMLElement = window.HTMLElement;

const { initToast } = await import('../entrypoints/options/toast.ts');
const { renderZhsCourseTasks } = await import('../entrypoints/options/zhihuishu-course-tasks.ts');

function course(courseId: number) {
  return {
    courseId,
    recruitId: courseId + 100,
    courseName: '同名课程',
    video: { done: 0, total: 1 },
    quiz: { done: 0, total: 1 },
    quizNotFull: 0,
    meet: { done: 0, total: 0 },
    meetSessions: null,
    meetSessionsNote: null,
    quizUnreadReason: null,
    finalExam: null,
    finalExamNote: null,
    examListUrl: 'https://example.com/exam',
    studyUrl: 'https://example.com/study',
    pending: 1,
  };
}

function runningQuiz() {
  return {
    platforms: [
      {
        id: 'zhihuishu',
        name: '智慧树',
        state: 'running',
        startedAt: 1,
        total: 2,
        finished: 1,
        current: '第三章单元测试',
        items: [
          {
            platformId: 'zhihuishu',
            course: '同名课程',
            title: '第三章单元测试',
            kind: 'quiz',
            status: 'running',
            detail: '',
            at: 1,
          },
        ],
      },
    ],
  };
}

beforeEach(() => {
  const document = (globalThis as unknown as { document: Document }).document;
  document.getElementById('zhs-tasks-list')?.replaceChildren();
  initToast(document.getElementById('toast') as unknown as HTMLElement);
  for (const fn of Object.values(bridge)) fn.mockReset();
  bridge.getTaskState.mockResolvedValue({ live: 'idle', state: { platforms: {} } });
});

describe('同名课程的两行', () => {
  it('单元测试板块的进度同时落到两门同名课，而不是只更新最后一行', async () => {
    let listener: (state: unknown) => void = () => undefined;
    bridge.subscribeRunState.mockImplementation((fn: (state: unknown) => void) => {
      listener = fn;
      return () => undefined;
    });
    bridge.getZhsCourseTasks.mockResolvedValueOnce({
      status: 'ok',
      value: { courses: [course(1), course(2)], pendingTotal: 2 },
    });

    await renderZhsCourseTasks();
    listener(runningQuiz());

    const document = (globalThis as unknown as { document: Document }).document;
    const visible = Array.from(document.querySelectorAll<HTMLElement>('.cw-current')).filter(
      (el) => !el.hidden,
    );
    expect(visible).toHaveLength(2);
    for (const el of visible) expect(el.textContent).toContain('第三章单元测试');
  });

  it('没有单元测试的课：禁用按钮并说「没有」，不说「都交了且满分」', async () => {
    bridge.getZhsCourseTasks.mockResolvedValueOnce({
      status: 'ok',
      value: {
        courses: [{ ...course(1), quiz: { done: 0, total: 0 }, quizNotFull: 0 }],
        pendingTotal: 1,
      },
    });

    await renderZhsCourseTasks();

    const document = (globalThis as unknown as { document: Document }).document;
    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('button')).filter(
      (button) => button.dataset.board === 'quiz',
    );
    expect(buttons).toHaveLength(1);
    expect(buttons[0]!.disabled).toBe(true);
    expect(buttons[0]!.title).toBe('这门课没有单元测试');
    expect(document.getElementById('zhs-tasks-list')?.textContent).toContain('没有单元测试');
  });
});

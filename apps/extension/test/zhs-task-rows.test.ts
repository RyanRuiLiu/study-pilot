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
  getZhsSession: vi.fn(),
  getZhsCourses: vi.fn(),
  getTaskState: vi.fn(),
  subscribeRunState: vi.fn(),
  runNow: vi.fn(),
  stopRun: vi.fn(),
}));

vi.mock('../src/ui-bridge.ts', () => bridge);

const window = parseHTML(
  '<!doctype html><html><body>' +
    '<div id="zhs-course-list"></div>' +
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
const { renderZhsCourses } = await import('../entrypoints/options/zhihuishu-courses.ts');
const { renderZhsCourseTasks } = await import('../entrypoints/options/zhihuishu-course-tasks.ts');

function course(courseId: number) {
  return {
    courseId,
    recruitId: courseId + 100,
    courseName: '同名课程',
    video: { done: 0, total: 1 },
    videoItemIds: [`zhs-unit-${courseId}`],
    quiz: { done: 0, total: 1 },
    quizItemIds: [`zhs-quiz-${courseId}`],
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

/* 订阅只建立一次（模块里的 watching 门闩），回调接在外面供各用例复用。 */
let listener: (state: unknown) => void = () => undefined;

beforeEach(() => {
  const document = (globalThis as unknown as { document: Document }).document;
  document.getElementById('zhs-tasks-list')?.replaceChildren();
  initToast(document.getElementById('toast') as unknown as HTMLElement);
  for (const fn of Object.values(bridge)) fn.mockReset();
  bridge.getTaskState.mockResolvedValue({ live: 'idle', state: { platforms: {} } });
  bridge.getZhsSession.mockResolvedValue({ loggedIn: true });
  bridge.getZhsCourses.mockResolvedValue([]);
  bridge.subscribeRunState.mockImplementation((fn: (state: unknown) => void) => {
    listener = fn;
    return () => undefined;
  });
});

describe('未登录', () => {
  it('登录指引只在账号与课程卡里出现一次，课程任务区不重复', async () => {
    bridge.getZhsSession.mockResolvedValue({ loggedIn: false });
    bridge.getZhsCourses.mockResolvedValue([
      {
        courseId: 1,
        recruitId: 2,
        secret: 'x',
        name: '示例课程甲',
        schoolName: '示例大学',
        startTime: 0,
        endTime: 0,
        enabled: true,
      },
    ]);
    bridge.getZhsCourseTasks.mockResolvedValue({
      status: 'error',
      reason: 'NOT_LOGGED_IN',
      message: '未登录',
    });

    await renderZhsCourses();
    await renderZhsCourseTasks();

    const document = (globalThis as unknown as { document: Document }).document;
    expect(document.getElementById('zhs-course-list')?.textContent).toContain('未登录');
    expect(document.getElementById('zhs-tasks-list')?.textContent).toBe('');
    expect((document.body.textContent ?? '').match(/未登录/g)).toHaveLength(1);
  });
});

describe('同名课程的两行', () => {
  it('单元测试行的执行只发这一门课的条目 id，不发课程名', async () => {
    bridge.getZhsCourseTasks.mockResolvedValueOnce({
      status: 'ok',
      value: { courses: [course(1), course(2)], pendingTotal: 2 },
    });
    await renderZhsCourseTasks();

    const document = (globalThis as unknown as { document: Document }).document;
    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('button')).filter(
      (button) => button.dataset.board === 'quiz',
    );
    buttons[0]?.dispatchEvent(new window.Event('click', { bubbles: true }));

    expect(bridge.runNow).toHaveBeenCalledTimes(1);
    expect(bridge.runNow.mock.calls[0]?.[1]).toEqual({
      platformId: 'zhihuishu',
      group: '同名课程',
      ids: ['zhs-quiz-1'],
    });
  });

  it('单元测试板块的进度同时落到两门同名课，而不是只更新最后一行', async () => {
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
        courses: [
          { ...course(1), quiz: { done: 0, total: 0 }, quizItemIds: [], quizNotFull: 0 },
        ],
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

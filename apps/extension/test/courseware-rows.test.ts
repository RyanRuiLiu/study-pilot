/*
 * 课件行的进度归属：同名课程（不同学期）各占一行，不能互相覆盖。
 *
 * 运行快照里只有课程名，界面行却按学期区分。若「正在执行」小字按课程名索引，
 * 后一行会覆盖前一行——同名两门课里只有一行收到进度，另一行永远停着。
 */

import { parseHTML } from 'linkedom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const bridge = vi.hoisted(() => ({
  getCourseware: vi.fn(),
  getTaskState: vi.fn(),
  subscribeRunState: vi.fn(),
  runNow: vi.fn(),
  stopRun: vi.fn(),
}));

vi.mock('../src/ui-bridge.ts', () => bridge);

const window = parseHTML(
  '<!doctype html><html><body>' +
    '<div id="courseware-list"></div>' +
    '<p id="courseware-status"></p>' +
    '<a id="courseware-action" hidden></a>' +
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
const { renderCourseware } = await import('../entrypoints/options/courseware.ts');

function course(termId: number) {
  return {
    termId,
    courseName: '同名课程',
    done: 0,
    total: 2,
    pending: 2,
    itemIds: [`courseware-${termId}01`, `courseware-${termId}02`],
    cannot: 0,
    needsAi: 0,
  };
}

function runningState() {
  return {
    platforms: [
      {
        id: 'mooc',
        name: '慕课',
        state: 'running',
        startedAt: 1,
        total: 2,
        finished: 1,
        current: '单元一',
        items: [
          {
            platformId: 'mooc',
            course: '同名课程',
            title: '单元一',
            kind: 'courseware',
            status: 'running',
            detail: '',
            at: 1,
          },
        ],
      },
    ],
  };
}

/*
 * 订阅只建立一次（模块里的 watching 门闩）：把回调接在外面，
 * 后面的用例复用同一份，而不是每次重设 mock 却再也等不到订阅。
 */
let listener: (state: unknown) => void = () => undefined;

beforeEach(() => {
  const document = (globalThis as unknown as { document: Document }).document;
  document.getElementById('courseware-list')?.replaceChildren();
  initToast(document.getElementById('toast') as unknown as HTMLElement);
  for (const fn of Object.values(bridge)) fn.mockReset();
  bridge.getTaskState.mockResolvedValue({ live: 'idle', state: { platforms: {} } });
  bridge.subscribeRunState.mockImplementation((fn: (state: unknown) => void) => {
    listener = fn;
    return () => undefined;
  });
});

describe('同名课程的两行', () => {
  it('点其中一行的执行：只发这一门课的条目 id，不发课程名', async () => {
    bridge.getCourseware.mockResolvedValueOnce({
      status: 'ok',
      value: { courses: [course(1), course(2)], pending: { auto: 0, manual: 0 } },
    });
    await renderCourseware();

    const document = (globalThis as unknown as { document: Document }).document;
    const first = document.querySelector<HTMLButtonElement>('#courseware-list .cw-row .btn');
    first?.dispatchEvent(new window.Event('click', { bubbles: true }));

    expect(bridge.runNow).toHaveBeenCalledTimes(1);
    expect(bridge.runNow.mock.calls[0]?.[1]).toEqual({
      platformId: 'mooc',
      group: '同名课程',
      ids: ['courseware-101', 'courseware-102'],
    });
  });

  it('运行进度同时落到两行，而不是只更新最后一行', async () => {
    bridge.getCourseware.mockResolvedValueOnce({
      status: 'ok',
      value: { courses: [course(1), course(2)], pending: { auto: 0, manual: 0 } },
    });

    await renderCourseware();
    listener(runningState());

    const document = (globalThis as unknown as { document: Document }).document;
    const rows = Array.from(document.querySelectorAll('.cw-row'));
    expect(rows).toHaveLength(2);
    const visible = Array.from(document.querySelectorAll<HTMLElement>('.cw-current')).filter(
      (el) => !el.hidden,
    );
    expect(visible).toHaveLength(2);
    for (const el of visible) expect(el.textContent).toContain('单元一');
  });
});

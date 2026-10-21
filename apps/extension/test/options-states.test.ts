/*
 * 设置页「同一状态在整页里说几遍」的回归。
 *
 * 单看每个模块都是对的：账号卡给登录去处、课件卡/课程任务区各自解释为什么空。
 * 合到一页上就出现同一句话在卡片内、卡片外各写一遍（智慧树未登录的现场）。
 * 这里用真实的 options/index.html 装一遍，按面板数「未登录」——登录指引每个
 * 平台面板只允许出现一次，且带一个「前往登录」。
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parseHTML } from 'linkedom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const bridge = vi.hoisted(() => ({
  getSession: vi.fn(),
  getCourses: vi.fn(),
  getSettings: vi.fn(),
  getCourseware: vi.fn(),
  getTaskState: vi.fn(),
  getZhsSession: vi.fn(),
  getZhsCourses: vi.fn(),
  getZhsCourseTasks: vi.fn(),
  refreshCourses: vi.fn(),
  refreshZhsCourses: vi.fn(),
  updateSettings: vi.fn(),
  runNow: vi.fn(),
  stopRun: vi.fn(),
  subscribeRunState: vi.fn(),
}));

vi.mock('../src/ui-bridge.ts', () => bridge);

const html = readFileSync(
  fileURLToPath(new URL('../entrypoints/options/index.html', import.meta.url)),
  'utf8',
);
const window = parseHTML(html);
const g = globalThis as unknown as {
  document: Document;
  window?: unknown;
  HTMLButtonElement?: unknown;
  HTMLAnchorElement?: unknown;
  HTMLInputElement?: unknown;
  HTMLElement?: unknown;
};
g.document = window.document as unknown as Document;
g.window = window;
g.HTMLButtonElement = window.HTMLButtonElement;
g.HTMLAnchorElement = window.HTMLAnchorElement;
g.HTMLInputElement = window.HTMLInputElement;
g.HTMLElement = window.HTMLElement;

const { initToast } = await import('../entrypoints/options/toast.ts');
const { renderCourses } = await import('../entrypoints/options/courses.ts');
const { renderCourseware } = await import('../entrypoints/options/courseware.ts');
const { renderZhsCourses } = await import('../entrypoints/options/zhihuishu-courses.ts');
const { renderZhsCourseTasks } = await import('../entrypoints/options/zhihuishu-course-tasks.ts');

const SETTINGS = {
  ai: { enabled: false, model: 'glm-4-flash', apiKey: '' },
  mooc: { courses: [], reviewComment: 'x', keepOverdueDays: 3 },
  zhihuishu: { courses: [] },
  ui: { activeTab: 'mooc' },
};

function textOf(id: string): string {
  return (globalThis as unknown as { document: Document }).document.getElementById(id)?.textContent ?? '';
}

function count(text: string, needle: string): number {
  return text.split(needle).length - 1;
}

beforeEach(() => {
  const document = (globalThis as unknown as { document: Document }).document;
  for (const id of ['course-list', 'courseware-list', 'zhs-course-list', 'zhs-tasks-list']) {
    document.getElementById(id)?.replaceChildren();
  }
  initToast(document.getElementById('toast') as unknown as HTMLElement);
  for (const fn of Object.values(bridge)) fn.mockReset();
  bridge.getSettings.mockResolvedValue(SETTINGS);
  bridge.getTaskState.mockResolvedValue({ live: 'idle', state: { platforms: {} } });
  bridge.subscribeRunState.mockReturnValue(() => undefined);
});

describe('未登录：登录指引每个平台面板只出现一次', () => {
  it('慕课面板：账号卡里一次，课件区不重复', async () => {
    bridge.getSession.mockResolvedValue({ loggedIn: false });
    bridge.getCourses.mockResolvedValue([]);
    bridge.getCourseware.mockResolvedValue({
      status: 'error',
      reason: 'NOT_LOGGED_IN',
      message: '未登录',
    });
    // 同时留着一条上次的会话失败：它不该和登录指引一起出现
    bridge.getTaskState.mockResolvedValue({
      live: 'idle',
      state: {
        platforms: {
          mooc: { failure: { message: '登录已失效，需重新登录', action: null, at: 1 } },
        },
      },
    });

    await renderCourses();
    await renderCourseware();

    const panel = textOf('panel-mooc');
    expect(count(panel, '未登录')).toBe(1);
    expect(count(panel, '前往登录')).toBe(1);
    expect(textOf('courseware-list')).not.toContain('未登录');
    expect(textOf('courseware-status')).toBe('');
    expect(panel).not.toContain('上次执行失败');
  });

  it('智慧树面板：账号卡里一次，课程任务区为空', async () => {
    bridge.getZhsSession.mockResolvedValue({ loggedIn: false });
    bridge.getZhsCourses.mockResolvedValue([]);
    bridge.getZhsCourseTasks.mockResolvedValue({
      status: 'error',
      reason: 'NOT_LOGGED_IN',
      message: '未登录',
    });
    bridge.getTaskState.mockResolvedValue({
      live: 'idle',
      state: {
        platforms: {
          zhihuishu: { failure: { message: '登录已失效，需重新登录', action: null, at: 1 } },
        },
      },
    });

    await renderZhsCourses();
    await renderZhsCourseTasks();

    const panel = textOf('panel-zhihuishu');
    expect(count(panel, '未登录')).toBe(1);
    expect(count(panel, '前往登录')).toBe(1);
    expect(textOf('zhs-tasks-list')).toBe('');
    expect(textOf('zhs-tasks-status')).toBe('');
    expect(panel).not.toContain('上次执行失败');
  });
});

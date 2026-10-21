/*
 * 参与勾选的写失败：界面要退回原样并说一句。
 *
 * 勾选是「立即保存」的乐观更新；updateSettings 失败（后台断了、存储写不进）时
 * 如果不回滚，界面显示已勾选、配置其实没变——下一轮执行范围为假，而人以为已经授权。
 * 两个平台各一份实现，两边都钉。
 */

import { parseHTML } from 'linkedom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const bridge = vi.hoisted(() => ({
  getSession: vi.fn(),
  getCourses: vi.fn(),
  refreshCourses: vi.fn(),
  getPending: vi.fn(),
  getCourseware: vi.fn(),
  getTaskState: vi.fn(),
  getZhsSession: vi.fn(),
  getZhsCourses: vi.fn(),
  refreshZhsCourses: vi.fn(),
  getZhsPending: vi.fn(),
  getZhsCourseTasks: vi.fn(),
  runNow: vi.fn(),
  stopRun: vi.fn(),
  subscribeRunState: vi.fn(),
  getSettings: vi.fn(),
  updateSettings: vi.fn(),
}));

vi.mock('../src/ui-bridge.ts', () => bridge);

const window = parseHTML(
  '<!doctype html><html><body>' +
    '<div id="course-list"></div><div id="zhs-course-list"></div><div id="toast"></div>' +
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
const { renderCourses } = await import('../entrypoints/options/courses.ts');
const { renderZhsCourses } = await import('../entrypoints/options/zhihuishu-courses.ts');

const MOOC_COURSE = {
  courseId: 1000000001,
  termId: 1400000001,
  name: '示例课程甲',
  shortName: 'C1',
  mode: 0,
  schoolName: '示例大学',
  schoolShortName: 'DEMO',
  coverUrl: '',
  startTime: 0,
  endTime: 0,
  lessonsCount: 0,
  enrollCount: 0,
  enabled: false,
  hasEnroll: true,
};
const ZHS_COURSE = {
  courseId: 1000009999,
  recruitId: 470001,
  secret: 'hex',
  name: '示例课程乙',
  schoolName: '示例大学',
  startTime: 0,
  endTime: 0,
  enabled: false,
};

function boxes(id: string): NodeListOf<HTMLInputElement> {
  const document = (globalThis as unknown as { document: Document }).document;
  return document.getElementById(id)?.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
}

function toastText(): string {
  const document = (globalThis as unknown as { document: Document }).document;
  return document.getElementById('toast')?.textContent ?? '';
}

beforeEach(() => {
  const document = (globalThis as unknown as { document: Document }).document;
  for (const id of ['course-list', 'zhs-course-list', 'toast']) document.getElementById(id)?.replaceChildren();
  initToast(document.getElementById('toast') as unknown as HTMLElement);
  for (const fn of Object.values(bridge)) fn.mockReset();
  bridge.getSession.mockResolvedValue({ loggedIn: true });
  bridge.getZhsSession.mockResolvedValue({ loggedIn: true });
  bridge.getCourses.mockResolvedValue([MOOC_COURSE]);
  bridge.getZhsCourses.mockResolvedValue([ZHS_COURSE]);
  bridge.getSettings.mockResolvedValue({
    mooc: { courses: [MOOC_COURSE] },
    zhihuishu: { courses: [ZHS_COURSE] },
  });
  bridge.updateSettings.mockRejectedValue(new Error('存储写不进去'));
});

describe('勾选写失败', () => {
  it('慕课：勾选退回原样并提示', async () => {
    await renderCourses();
    const box = boxes('course-list')[0]!;
    box.checked = true;
    box.dispatchEvent(new window.Event('change'));
    await vi.waitFor(() => expect(box.checked).toBe(false));
    expect(toastText()).toContain('未能更新参与范围');
  });

  it('智慧树：勾选退回原样并提示', async () => {
    await renderZhsCourses();
    const box = boxes('zhs-course-list')[0]!;
    box.checked = true;
    box.dispatchEvent(new window.Event('change'));
    await vi.waitFor(() => expect(box.checked).toBe(false));
    expect(toastText()).toContain('未能更新参与范围');
  });
});

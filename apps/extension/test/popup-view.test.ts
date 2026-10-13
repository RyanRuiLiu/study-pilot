/*
 * 弹窗结构的 DOM 级核对。
 *
 * 验的是「这一屏里到底有哪几个东西、写的是什么字」：状态行、计数行、清单条数与顺序、
 * 行里的标题与截止时间、未登录时的去处、以及就地改写状态行时清单不动。
 * 不看截图，也不靠人眼。
 *
 * 数据用平台自己的待办汇总（PendingEntry / PendingSummary）——弹窗不再经过中立模型，
 * 因此夹具也必须是平台的原样字段；这正是这一步要钉住的东西。
 */

import { parseHTML } from 'linkedom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// 真实 Shoelace 组件在 linkedom 下会崩（Lit 走 node 构建）；这里验的是构造器输出的标签与文字
vi.mock('@shoelace-style/shoelace/dist/components/button/button.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/spinner/spinner.js', () => ({}));

import type { PendingEntry, PendingSummary } from '../src/platform/messaging';
import { renderLoading, renderPopup, type PopupData } from '../entrypoints/popup/view';

const page = parseHTML('<!doctype html><html><body><div id="app"></div></body></html>');
Object.assign(globalThis, { window: page.window, document: page.document });

function entry(overrides: Partial<PendingEntry> = {}): PendingEntry {
  return {
    kind: 'submit-quiz',
    handling: 'auto',
    overdue: false,
    href: 'https://www.icourse163.org/learn/x#/learn/quiz?id=1',
    testId: 1,
    courseName: '模拟电子技术',
    chapterName: '第三章',
    name: '单元测验',
    examId: null,
    status: '未提交',
    statusDetail: '',
    deadline: 1_800_000_000_000,
    evaluateDone: null,
    evaluateTotal: null,
    course: { courseId: 1, schoolShortName: 'NTU', mode: 0, termId: 1 },
    ...overrides,
  };
}

function summary(entries: PendingEntry[]): PendingSummary {
  return {
    fetchedAt: 1_700_000_000_000,
    auto: entries.filter((e) => e.handling === 'auto' && !e.overdue).length,
    manual: entries.filter((e) => e.handling === 'manual' && !e.overdue).length,
    overdue: entries.filter((e) => e.overdue).length,
    entries,
  };
}

function data(overrides: Partial<PopupData> = {}): PopupData {
  return { live: 'idle', summary: summary([]), notLoggedIn: false, staleList: false, error: null, ...overrides };
}

const handlers = { dashboardUrl: 'chrome-extension://x/dashboard.html', onSettings: () => {} };

let root: HTMLElement;
beforeEach(() => {
  root = page.document.createElement('div');
});

describe('弹窗这一屏', () => {
  it('计数用平台自己的分项，不在页面里另算', () => {
    renderPopup(root, data({ summary: summary([entry(), entry({ kind: 'submit-homework', handling: 'manual' })]) }), handlers);
    expect(root.querySelector('.sp-count')?.textContent).toBe('共 2 项 · 会自动完成 1 · 需你处理 1');
  });

  it('有已过期项时补一项计数，且它排在最后', () => {
    const overdue = entry({ overdue: true, name: '过期测验', deadline: 1 });
    renderPopup(root, data({ summary: summary([overdue, entry({ name: '还有时间' })]) }), handlers);

    expect(root.querySelector('.sp-count')?.textContent).toContain('已过期 1');
    const names = [...root.querySelectorAll('.sp-item-title')].map((el) => el.textContent);
    expect(names).toEqual(['还有时间', '过期测验']);
  });

  it('未过期的按截止时间升序，最多显示 5 条', () => {
    const many = [5, 4, 3, 2, 1, 0].map((i) => entry({ name: `第 ${i} 件`, deadline: 1_800_000_000_000 + i * 1000 }));
    renderPopup(root, data({ summary: summary(many) }), handlers);

    const names = [...root.querySelectorAll('.sp-item-title')].map((el) => el.textContent);
    expect(names).toHaveLength(5);
    expect(names[0]).toBe('第 0 件');
  });

  it('行显示标题与截止说明；没有截止时间就不显示时间', () => {
    renderPopup(root, data({ summary: summary([entry({ name: '有截止' }), entry({ name: '无截止', deadline: 0 })]) }), handlers);

    const rows = [...root.querySelectorAll('.sp-item')];
    expect(rows[0]?.querySelector('.sp-item-title')?.textContent).toBe('有截止');
    expect(rows[0]?.querySelector('.sp-item-when')).not.toBeNull();
    expect(rows[1]?.querySelector('.sp-item-when')).toBeNull();
  });

  it('行可点：地址来自平台自己带的 href，不在页面里拼 URL', () => {
    renderPopup(root, data({ summary: summary([entry({ href: 'https://example.com/quiz?id=9' })]) }), handlers);
    expect(root.querySelector('a.sp-item-body')?.getAttribute('href')).toBe('https://example.com/quiz?id=9');
  });

  it('没登录时只给去处，不画清单', () => {
    renderPopup(root, data({ notLoggedIn: true }), handlers);
    expect(root.querySelector('.sp-status')?.textContent).toContain('重新登录');
    expect(root.textContent).toContain('前往登录');
    expect(root.querySelectorAll('.sp-item')).toHaveLength(0);
  });

  it('读取失败时状态行说明原因，不画清单', () => {
    renderPopup(root, data({ error: '读取状态失败', summary: null }), handlers);
    expect(root.querySelector('.sp-status')?.textContent).toBe('读取状态失败');
    expect(root.querySelectorAll('.sp-item')).toHaveLength(0);
  });

  it('状态行优先说「后台在跑」与「清单取自执行前」', () => {
    renderPopup(root, data({ live: 'running', staleList: true }), handlers);
    expect(root.querySelector('.sp-status')?.textContent).toContain('执行前的清单');
  });

  it('没有待办时给一句话，不留空白', () => {
    renderPopup(root, data({ summary: summary([]) }), handlers);
    expect(root.querySelector('.sp-empty')?.textContent).toBe('暂无待办。');
  });

  it('两个入口：看板与设置', () => {
    renderPopup(root, data(), handlers);
    expect(root.textContent).toContain('看板');
    expect(root.textContent).toContain('设置');
  });

  it('就地改写状态行时，清单与条数不动', () => {
    const view = renderPopup(root, data({ summary: summary([entry(), entry()]) }), handlers);
    const before = root.querySelectorAll('.sp-item').length;

    view.setStatus('已提交 2 道题', 'idle');

    expect(root.querySelector('.sp-status')?.textContent).toBe('已提交 2 道题');
    expect(root.querySelectorAll('.sp-item').length).toBe(before);
  });
});

describe('数据到达之前', () => {
  it('只画状态行加一个转圈', () => {
    renderLoading(root, '正在获取最新数据');
    expect(root.querySelector('.sp-status')?.textContent).toBe('正在获取最新数据');
    expect(root.querySelectorAll('sl-spinner').length).toBeGreaterThan(0);
    expect(root.querySelectorAll('.sp-item')).toHaveLength(0);
  });
});

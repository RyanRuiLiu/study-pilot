/*
 * 弹窗结构的 DOM 级核对。
 *
 * 验的是「这一屏里到底有哪几个东西、写的是什么字」：状态行、计数行、分组的组头与组内顺序、
 * 行里的标题与截止时间、未登录时的去处、以及就地改写状态行时清单不动。
 * 不看截图，也不靠人眼。选择器跟着组件走：状态行是 sl-alert，一组是一张 sl-card，
 * 一条待办是 .sp-item，「还剩多久」是那一行末尾的 sl-tag。
 *
 * 数据用平台自己的待办汇总（PendingEntry / PendingSummary）——弹窗不再经过中立模型，
 * 因此夹具也必须是平台的原样字段；这正是这一步要钉住的东西。
 */

import { parseHTML } from 'linkedom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// 真实 Shoelace 组件在 linkedom 下会崩（Lit 走 node 构建）；这里验的是构造器输出的标签与文字
vi.mock('@shoelace-style/shoelace/dist/components/button/button.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/button-group/button-group.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/spinner/spinner.js', () => ({}));

import type { PendingEntry, PendingSummary } from '../src/browser/messaging';
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
  return { live: 'idle', lastError: null, summary: summary([]), notLoggedIn: false, staleList: false, error: null, ...overrides };
}

const handlers = { pageUrl: 'chrome-extension://x/options.html#overview', onSettings: () => {} };

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
    const names = [...root.querySelectorAll('.sp-item .sp-fill')].map((el) => el.textContent);
    expect(names).toEqual(['还有时间', '过期测验']);
  });

  it('组内按截止时间升序，每组最多铺三条，多出来的说明去处', () => {
    const many = [5, 4, 3, 2, 1, 0].map((i) => entry({ name: `第 ${i} 件`, deadline: 1_800_000_000_000 + i * 1000 }));
    renderPopup(root, data({ summary: summary(many) }), handlers);

    const names = [...root.querySelectorAll('.sp-item .sp-fill')].map((el) => el.textContent);
    expect(names).toEqual(['第 0 件', '第 1 件', '第 2 件']);
    expect(root.querySelector('sl-card sl-tag')?.textContent).toBe('6 项');
    expect(root.textContent).toContain('另有 3 项');
  });

  it('按课程分组：组头写课程名，两组的先后由各自最紧要的那件事决定', () => {
    const soon = entry({ name: '明天的测验', deadline: Date.now() + 86_400_000 });
    const later = entry({ courseName: '电路原理', name: '下周的测验', deadline: Date.now() + 6 * 86_400_000 });
    renderPopup(root, data({ summary: summary([later, soon]) }), handlers);

    const heads = [...root.querySelectorAll('sl-card [slot="header"]')].map((el) => [
      el.querySelector('.sp-fill')?.textContent,
      el.querySelector('sl-tag')?.textContent,
    ]);
    expect(heads).toEqual([
      ['模拟电子技术', '1 项'],
      ['电路原理', '1 项'],
    ]);
    expect(root.querySelectorAll('sl-card')).toHaveLength(2);
  });

  it('同一门课里的过期项排在组内最后，不抢第一行', () => {
    const items = [
      entry({ name: '过期项', overdue: true, deadline: 1 }),
      entry({ name: '还有时间', deadline: Date.now() + 86_400_000 }),
    ];
    renderPopup(root, data({ summary: summary(items) }), handlers);

    const names = [...root.querySelectorAll('.sp-item .sp-fill')].map((el) => el.textContent);
    expect(names).toEqual(['还有时间', '过期项']);
  });

  it('行显示标题与截止说明；没有截止时间就不显示时间', () => {
    renderPopup(root, data({ summary: summary([entry({ name: '有截止' }), entry({ name: '无截止', deadline: 0 })]) }), handlers);

    const rows = [...root.querySelectorAll('.sp-item')];
    expect(rows[0]?.querySelector('.sp-fill')?.textContent).toBe('有截止');
    expect(rows[0]?.querySelector('sl-tag')).not.toBeNull();
    expect(rows[1]?.querySelector('sl-tag')).toBeNull();
  });

  it('行可点：地址来自平台自己带的 href，不在页面里拼 URL', () => {
    renderPopup(root, data({ summary: summary([entry({ href: 'https://example.com/quiz?id=9' })]) }), handlers);
    expect(root.querySelector('.sp-item a')?.getAttribute('href')).toBe('https://example.com/quiz?id=9');
  });

  it('没登录时只给去处，不画清单', () => {
    renderPopup(root, data({ notLoggedIn: true }), handlers);
    expect(root.querySelector('sl-alert')?.textContent).toContain('重新登录');
    expect(root.textContent).toContain('前往登录');
    expect(root.querySelectorAll('.sp-item')).toHaveLength(0);
  });

  it('读取失败时状态行说明原因，不画清单', () => {
    renderPopup(root, data({ error: '读取状态失败', summary: null }), handlers);
    expect(root.querySelector('sl-alert')?.textContent).toBe('读取状态失败');
    expect(root.querySelectorAll('.sp-item')).toHaveLength(0);
  });

  it('后台记下过失败时，状态行如实说出原因而不是「没有要做的事」', () => {
    renderPopup(root, data({ lastError: '课程列表未刷新：HTTP 403' }), handlers);
    expect(root.querySelector('sl-alert')?.textContent).toBe(
      '上次执行没有完成：课程列表未刷新：HTTP 403',
    );
  });

  it('正在跑的时候先说在跑：失败记录此刻不该抢话', () => {
    renderPopup(root, data({ live: 'running', lastError: '旧的失败' }), handlers);
    expect(root.querySelector('sl-alert')?.textContent).toBe('正在执行');
  });

  it('状态行优先说「后台在跑」与「清单取自执行前」', () => {
    renderPopup(root, data({ live: 'running', staleList: true }), handlers);
    expect(root.querySelector('sl-alert')?.textContent).toContain('执行前的清单');
  });

  it('没有待办时给一句话，不留空白', () => {
    renderPopup(root, data({ summary: summary([]) }), handlers);
    const lines = [...root.querySelectorAll('p')].map((el) => el.textContent);
    expect(lines).toContain('暂无待办。');
  });

  it('两个入口：概览与设置', () => {
    renderPopup(root, data(), handlers);
    expect(root.textContent).toContain('概览');
    expect(root.textContent).toContain('设置');
  });

  it('就地改写状态行时，清单与条数不动', () => {
    const view = renderPopup(root, data({ summary: summary([entry(), entry()]) }), handlers);
    const before = root.querySelectorAll('.sp-item').length;

    // 平静状态是一行小字而不是 sl-alert，因此按文字断言，不绑元素类型
    view.setStatus('已提交 2 道题', 'idle');

    expect(root.textContent).toContain('已提交 2 道题');
    expect(root.querySelectorAll('.sp-item').length).toBe(before);
  });

  it('忙碌降回平静时状态整块换掉，不被旧元素吃掉', () => {
    const view = renderPopup(root, data({ live: 'running' }), handlers);
    expect(root.querySelector('sl-alert')?.textContent).toBe('正在执行');

    view.setStatus('已提交 2 道题', 'idle');

    expect(root.querySelector('sl-alert')).toBeNull();
    expect(root.textContent).toContain('已提交 2 道题');
  });
});

describe('数据到达之前', () => {
  it('只画状态行加一个转圈', () => {
    renderLoading(root, '正在获取最新数据');
    expect(root.querySelector('sl-alert')?.textContent).toBe('正在获取最新数据');
    expect(root.querySelectorAll('sl-spinner').length).toBeGreaterThan(0);
    expect(root.querySelectorAll('.sp-item')).toHaveLength(0);
  });
});

/*
 * 弹窗这一屏的结构与文字。
 *
 * 验的是「有哪几个东西、写的是什么字、顺序对不对」：课程分组与项数、每行的标题/类别/
 * 状态/截止、可点的去处、空状态、以及就地改写状态行。不看截图。
 *
 * 这一版跟着新结构走：清单是目录式（课程一行 + 每项一行），状态与做法用
 * sl-badge / sl-tag 表达（颜色来自组件自带的 variant），行是网格摆放，
 * 计数从「· 拼接的标签串」改成一句陈述。
 */

import { parseHTML } from 'linkedom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@shoelace-style/shoelace/dist/components/button/button.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/badge/badge.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/tag/tag.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/spinner/spinner.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/alert/alert.js', () => ({}));

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
  return {
    live: 'idle',
    lastError: null,
    summary: summary([]),
    courseware: null,
    notLoggedIn: false,
    staleList: false,
    error: null,
    ...overrides,
  };
}

const handlers = { pageUrl: 'chrome-extension://x/options.html#overview', onSettings: () => {} };

/** 行里的标题（第一格）。 */
const titles = (root: HTMLElement): string[] =>
  [...root.querySelectorAll('.item')].map((row) => row.querySelector('.item-title')?.textContent ?? '');

let root: HTMLElement;
beforeEach(() => {
  root = page.document.createElement('div');
});

describe('要交的东西', () => {
  it('一句陈述说清数量与谁来做，不用中点拼接', () => {
    renderPopup(root, data({ summary: summary([entry(), entry({ kind: 'submit-homework', handling: 'manual' })]) }), handlers);

    const note = root.querySelector('small')?.textContent ?? '';
    expect(note).toContain('有 2 项要交');
    expect(note).toContain('1 项会自动完成');
    expect(note).toContain('1 项要你自己做');
    expect(note).not.toContain('·');
  });

  it('已过期单独说出来', () => {
    renderPopup(root, data({ summary: summary([entry({ overdue: true })]) }), handlers);
    expect(root.querySelector('small')?.textContent).toContain('1 项已过期');
  });

  it('按课程分组：组头是课程名与项数', () => {
    renderPopup(
      root,
      data({
        summary: summary([
          entry({ name: '晚一点的', deadline: Date.now() + 7 * 24 * 3600_000 }),
          entry({ courseName: '大学物理', name: '更紧要的', deadline: Date.now() + 3600_000 }),
        ]),
      }),
      handlers,
    );

    const heads = [...root.querySelectorAll('.group')].map((row) => [
      row.querySelector('strong')?.textContent,
      row.querySelector('sl-badge')?.textContent,
    ]);
    expect(heads).toEqual([
      ['大学物理', '1'],
      ['模拟电子技术', '1'],
    ]);
  });

  it('每行：标题、类别、做法徽章、截止；没有截止就不写时间', () => {
    renderPopup(
      root,
      data({
        summary: summary([
          entry({ kind: 'evaluate-homework', handling: 'manual', name: '第三章作业（互评）' }),
          entry({ name: '无截止', deadline: 0 }),
        ]),
      }),
      handlers,
    );

    const rows = [...root.querySelectorAll('.item')];
    expect(rows[0]?.querySelector('.item-title')?.textContent).toBe('第三章作业（互评）');
    expect(rows[0]?.querySelector('sl-tag')?.textContent).toBe('互评');
    expect(rows[0]?.querySelector('sl-badge')?.textContent).toBe('要你做');
    expect(rows[0]?.querySelector('sl-badge')?.getAttribute('variant')).toBe('warning');
    expect(rows[0]?.querySelector('.item-when')?.textContent).not.toBe('');
    expect(rows[1]?.querySelector('.item-when')?.textContent).toBe('');
  });

  it('过期项用 danger 徽章并排在组内最后', () => {
    const overdue = entry({ overdue: true, name: '过期的', deadline: 1 });
    renderPopup(root, data({ summary: summary([overdue, entry({ name: '还有时间' })]) }), handlers);

    const rows = [...root.querySelectorAll('.item')];
    expect(rows.at(-1)?.querySelector('.item-title')?.textContent).toBe('过期的');
    expect(rows.at(-1)?.querySelector('sl-badge')?.getAttribute('variant')).toBe('danger');
  });

  it('一行里按截止时间升序，多出来的说明去处', () => {
    const many = [5, 4, 3, 2, 1, 0].map((i) =>
      entry({ name: `第 ${i} 件`, deadline: Date.now() + (i + 1) * 3600_000 }),
    );
    renderPopup(root, data({ summary: summary(many) }), handlers);

    expect(titles(root)).toEqual(['第 0 件', '第 1 件', '第 2 件']);
    expect(root.textContent).toContain('另有 3 项没列出来');
  });

  it('整行可点：地址来自平台带的 href', () => {
    renderPopup(root, data({ summary: summary([entry({ href: 'https://example.com/x?id=9' })]) }), handlers);
    expect(root.querySelector('.item')?.getAttribute('href')).toBe('https://example.com/x?id=9');
  });

  it('没有要交的东西时，说出还剩多少课件没看完', () => {
    renderPopup(root, data({ courseware: { unfinished: 68, total: 255 } }), handlers);

    expect(root.textContent).toContain('没有要交的东西。');
    expect(root.textContent).toContain('还有 68 项课件没看完');
  });

  it('课件都看完时不提这件事', () => {
    renderPopup(root, data({ courseware: { unfinished: 0, total: 255 } }), handlers);
    expect(root.textContent).not.toContain('课件没看完');
  });
});

describe('页面其余部分', () => {
  it('没登录时给去处，不画清单', () => {
    renderPopup(root, data({ notLoggedIn: true }), handlers);
    expect(root.textContent).toContain('重新登录');
    expect(root.querySelectorAll('.item')).toHaveLength(0);
  });

  it('读取失败时说原因，不画清单', () => {
    renderPopup(root, data({ error: '读取状态失败', summary: null }), handlers);
    expect(root.textContent).toContain('读取状态失败');
    expect(root.querySelectorAll('.item')).toHaveLength(0);
  });

  it('正在跑时先说到哪了', () => {
    renderPopup(root, data({ live: 'running', staleList: true }), handlers);
    expect(root.textContent).toContain('执行前的清单');
  });

  it('底部两个入口', () => {
    renderPopup(root, data(), handlers);
    expect(root.querySelector('.foot')?.textContent).toContain('概览');
    expect(root.querySelector('.foot')?.textContent).toContain('设置');
  });

  it('就地改写状态行不影响清单', () => {
    const view = renderPopup(root, data({ summary: summary([entry(), entry()]) }), handlers);
    const before = root.querySelectorAll('.item').length;

    view.setStatus('已提交 2 道题', 'idle');

    expect(root.textContent).toContain('已提交 2 道题');
    expect(root.querySelectorAll('.item').length).toBe(before);
  });
});

describe('数据到达之前', () => {
  it('只画状态行加转圈', () => {
    renderLoading(root, '正在获取最新数据');
    expect(root.textContent).toContain('正在获取最新数据');
    expect(root.querySelectorAll('.item')).toHaveLength(0);
  });
});

/*
 * 弹窗结构的 DOM 级核对。
 *
 * 验的是「这一屏里到底有哪几个东西、写的是什么字」：状态行、计数、清单条数与顺序、
 * 两个入口，以及它们分别由哪个构造器产出（sl-button / sl-spinner / ol / li）。
 * 不看截图，也不靠人眼。
 *
 * 为什么用 linkedom：仓库已有先例（guidance.test.ts），这里也不需要布局与样式。
 * 为什么不加载真实 Shoelace 组件：在 Node 下 Lit 解析到的是 node 构建，组件首次
 * 更新会去读一个不存在的内部节点（FormControlController.updateValidity）。本测试
 * 验的是构造器输出的标签与文字，组件注册交给入口（src/ui/index.ts 的副作用导入）。
 * 因此把两个副作用模块换成空模块。
 */

import { parseHTML } from 'linkedom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@shoelace-style/shoelace/dist/components/button/button.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/spinner/spinner.js', () => ({}));

import { summarize } from '../src/domain/plan';
import type { Task } from '../src/domain/task';
import { renderLoading, renderPopup, type PopupData } from '../entrypoints/popup/view';

const page = parseHTML('<!doctype html><html><body><div id="app"></div></body></html>');
Object.assign(globalThis, { window: page.window, document: page.document });

const DAY = 24 * 60 * 60 * 1000;
/*
 * 截止时间一律相对此刻算：清单的排序里「已过截止排在最后」是按真实时钟判的，
 * 写死一个时间戳会让整组数据在不同日子落到不同的档里。
 */
const NOW = Date.now();

const HANDLERS = {
  dashboardUrl: 'chrome-extension://test/dashboard.html',
  onSettings: () => undefined,
};

function host(): HTMLElement {
  return globalThis.document.getElementById('app')!;
}

/** 一件任务。只写关心的字段，其余给固定值。 */
function task(fields: Partial<Task> & { id: string; title: string }): Task {
  return {
    platformId: 'mooc',
    courseId: 1,
    kind: 'quiz',
    mode: 'auto',
    state: 'todo',
    ...fields,
  };
}

function data(over: Partial<PopupData> = {}): PopupData {
  return {
    live: 'idle',
    tasks: [],
    fetchedAt: NOW,
    notLoggedIn: false,
    staleList: false,
    error: null,
    ...over,
  };
}

function textOf(root: HTMLElement, selector: string): string {
  return root.querySelector(selector)?.textContent ?? '';
}

beforeEach(() => {
  host().replaceChildren();
});

describe('弹窗结构', () => {
  it('把状态、计数、清单、两个入口按顺序铺出来，控件来自组件层', () => {
    const soon = task({ id: 'a', title: '第一章测验', dueAt: NOW + DAY, link: 'https://x/quiz' });
    const later = task({
      id: 'b',
      title: '第二章作业',
      kind: 'homework',
      mode: 'manual',
      dueAt: NOW + 3 * DAY,
      link: 'https://x/hw',
    });
    const finished = task({ id: 'c', title: '已交的作业', dueAt: NOW + DAY, state: 'done' });
    const courseware = task({ id: 'd', title: '第三章视频', kind: 'video' });

    const root = host();
    renderPopup(root, data({ tasks: [soon, later, finished, courseware] }), HANDLERS);

    // 顺序：状态 → 计数 → 清单 → 入口
    expect([...root.children].map((child) => child.className)).toEqual([
      'sp-status',
      'sp-count',
      'sp-list',
      'sp-nav',
    ]);

    // 清单只认待办：已完成的与没有截止时间的课件都不算
    expect(Array.from(root.querySelectorAll('.sp-item')).map((item) => textOf(item as HTMLElement, '.sp-item-title'))).toEqual([
      '第一章测验',
      '第二章作业',
    ]);

    // 每行是一个可点的语义列表项，不是 div 堆出来的
    const firstRow = root.querySelector('.sp-item');
    expect(firstRow?.tagName).toBe('LI');
    expect(firstRow?.querySelector('a')?.getAttribute('href')).toBe('https://x/quiz');
  });

  it('计数就是 domain/plan.ts 的 summarize，不在页面里另数一遍', () => {
    const tasks = [
      task({ id: 'a', title: '测验', dueAt: NOW + DAY }),
      task({ id: 'b', title: '作业', kind: 'homework', mode: 'manual', dueAt: NOW + DAY }),
      task({ id: 'c', title: '考试', kind: 'exam-objective', mode: 'manual', dueAt: NOW + DAY }),
      task({ id: 'd', title: '失败的', kind: 'homework', mode: 'manual', state: 'failed', dueAt: NOW }),
      task({ id: 'e', title: '已完成的', mode: 'manual', state: 'done', dueAt: NOW }),
    ];
    const root = host();
    renderPopup(root, data({ tasks }), HANDLERS);

    const summary = summarize(tasks.filter((entry) => entry.state !== 'done'));
    expect(textOf(root, '.sp-count')).toBe(
      `共 ${summary.auto + summary.assisted + summary.manual + summary.failed} 项 · ` +
        `可自动完成 ${summary.auto} · 需要确认 ${summary.assisted} · 需要你做 ${summary.manual} · ` +
        `失败 ${summary.failed}`,
    );
  });

  it('清单只放最紧要的 5 项，按截止时间升序，已过截止的排最后', () => {
    const tasks = Array.from({ length: 7 }, (_unused, index) =>
      task({
        id: `t${index}`,
        title: `任务 ${index}`,
        dueAt: NOW + (index + 1) * DAY,
        // Date.now() 远小于这几个截止时间，因此这里全是「还没到期」
      }),
    );
    tasks.push(task({ id: 'late', title: '已过截止的', dueAt: NOW - DAY }));

    const root = host();
    renderPopup(root, data({ tasks }), HANDLERS);

    const titles = Array.from(root.querySelectorAll('.sp-item-title')).map((el) => el.textContent);
    expect(titles).toEqual(['任务 0', '任务 1', '任务 2', '任务 3', '任务 4']);
    expect(titles).not.toContain('已过截止的');
  });

  it('正在执行时状态行用忙色；清单取自执行之前时说明来源', () => {
    const root = host();
    renderPopup(root, data({ live: 'running' }), HANDLERS);

    const status = root.querySelector('.sp-status');
    expect(status?.textContent).toBe('正在执行');
    expect(status?.getAttribute('data-tone')).toBe('busy');

    renderPopup(root, data({ live: 'running', staleList: true }), HANDLERS);
    expect(textOf(root, '.sp-status')).toContain('执行前的清单');
  });

  it('空清单给一句话，不留空白', () => {
    const root = host();
    renderPopup(root, data(), HANDLERS);

    expect(root.querySelector('.sp-list')).toBeNull();
    expect(textOf(root, '.sp-empty')).toBe('暂无待办。');
    expect(textOf(root, '.sp-count')).toBe('共 0 项 · 可自动完成 0 · 需要确认 0 · 需要你做 0');
  });

  it('未登录时不画清单，只给状态行与去处', () => {
    const root = host();
    renderPopup(root, data({ notLoggedIn: true }), HANDLERS);

    expect(textOf(root, '.sp-status')).toContain('需要重新登录');
    expect(root.querySelector('.sp-count')).toBeNull();
    expect(root.querySelector('.sp-list')).toBeNull();

    const login = root.querySelector('.sp-actions sl-button');
    expect(login?.textContent).toBe('前往登录');
    expect(login?.getAttribute('href')).toContain('icourse163.org');
    expect(login?.getAttribute('target')).toBe('_blank');
  });

  it('两个入口是按钮，看板带地址、设置触发回调', () => {
    const root = host();
    let opened = 0;
    renderPopup(root, data(), { dashboardUrl: 'chrome-extension://test/dashboard.html', onSettings: () => { opened += 1; } });

    const navButtons = Array.from(root.querySelectorAll('.sp-nav sl-button'));
    expect(navButtons.map((element) => element.textContent)).toEqual(['看板', '设置']);
    expect(navButtons[0]?.getAttribute('href')).toBe('chrome-extension://test/dashboard.html');

    navButtons[1]?.dispatchEvent(new page.window.Event('click'));
    expect(opened).toBe(1);
  });

  it('加载态是状态行加一个转圈', () => {
    const root = host();
    renderLoading(root, '正在获取最新数据');

    expect(textOf(root, '.sp-status')).toBe('正在获取最新数据');
    expect(root.querySelector('sl-spinner')).not.toBeNull();
  });

  it('写状态只换那一行，清单与入口不动', () => {
    const root = host();
    const view = renderPopup(
      root,
      data({ tasks: [task({ id: 'a', title: '测验', dueAt: NOW + DAY })] }),
      HANDLERS,
    );
    const count = root.querySelector('.sp-count');

    view.setStatus('完成 3 项', 'idle');

    expect(textOf(root, '.sp-status')).toBe('完成 3 项');
    expect(root.querySelector('.sp-status')?.getAttribute('data-tone')).toBe('idle');
    expect(root.querySelector('.sp-count')).toBe(count);
    expect(root.querySelector('.sp-item')).not.toBeNull();
  });
});

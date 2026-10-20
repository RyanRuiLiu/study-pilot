/*
 * 弹窗状态行的平台归属。
 *
 * 状态行只该说「此刻面向的那家平台」的事。一次 renderState 要等后台取数，
 * 期间用户可能已经切走 tab——那时把上一家的失败留痕画到当前这一家的行上，
 * 用户看到的就是「智慧树上次执行失败：<慕课的原因>」这种没说谎但指错人的话。
 *
 * 这里把取数做成可延迟的，专门演这一步：mooc 的响应在切到智慧树之后才回来。
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';

/** 延迟住的取数请求：测试自己决定谁先回来。 */
const queue = vi.hoisted(() => ({
  pending: [] as Array<{ platformId: string; resolve: (value: unknown) => void; reject: (e: unknown) => void }>,
  /** 元素替身：测试只看状态行的文本，其余形状不必收窄 */
  els: {} as Record<string, { textContent: string; title: string }>,
}));

vi.mock('../src/ui-bridge', () => ({
  getTaskState: (platformId: string) =>
    new Promise((resolve, reject) => {
      queue.pending.push({ platformId, resolve, reject });
    }),
  stopRun: async () => ({ stopped: false }),
  subscribeRunState: () => undefined,
}));

vi.mock('../entrypoints/popup/elements.ts', () => {
  const element = (name: string) => {
    const el = {
      textContent: '',
      title: '',
      disabled: false,
      hidden: false,
      href: '',
      // 状态行走的是 classList；停止按钮走的是 addEventListener——都按用到的形状给齐
      classList: {
        added: new Set<string>(),
        removed: new Set<string>(),
        add(...names: string[]): void {
          for (const n of names) this.added.add(n);
        },
        remove(...names: string[]): void {
          for (const n of names) this.removed.add(n);
        },
        toggle(name: string, on?: boolean): void {
          if (on === false) this.removed.add(name);
          else this.added.add(name);
        },
        contains(name: string): boolean {
          return this.added.has(name);
        },
      },
      addEventListener: () => undefined,
    };
    queue.els[name] = el;
    return el;
  };
  const stateEl = element('state');
  const stateLine = element('stateLine');
  return {
    stateEl,
    stateLine,
    stopBtn: element('stop'),
    runBtn: element('run'),
    stateActionEl: element('action'),
    todoEl: element('moocTodo'),
    zhsTodoEl: element('zhsTodo'),
    settingsBtn: element('settings'),
    setText: (el: { textContent: string; title: string } | null, text: string) => {
      if (el === null) return;
      el.textContent = text;
      el.title = text;
    },
  };
});

const statusModule = await import('../entrypoints/popup/status.ts');

/** 一份「这一家有一条失败留痕」的后台状态。 */
const stateWithFailure = (platformId: string, message: string): unknown => ({
  live: 'idle',
  state: { platforms: { [platformId]: { failure: { message, action: null, at: 1 } } } },
});

async function flush(): Promise<void> {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

beforeEach(() => {
  queue.pending.length = 0;
  for (const el of Object.values(queue.els)) {
    el.textContent = '';
    el.title = '';
  }
});

describe('切走 tab 之后才回来的那一份状态', () => {
  it('上一家的失败留痕不画到当前这一家的行上', async () => {
    // 面向慕课发起一次渲染（取数被延迟住）
    statusModule.setStatusPlatform('mooc');
    expect(queue.pending).toHaveLength(1);
    expect(queue.pending[0]?.platformId).toBe('mooc');

    // 用户切到智慧树：又发起一次渲染，此刻状态行归智慧树
    statusModule.setStatusPlatform('zhihuishu');
    expect(queue.pending).toHaveLength(2);

    // 慕课那份现在才回来——它已经过时，不该写任何东西
    queue.pending[0]?.resolve(stateWithFailure('mooc', '滑块验证没过'));
    await flush();
    expect(queue.els.state?.textContent).toBe('');

    // 智慧树那份回来，按它自己说话
    queue.pending[1]?.resolve(stateWithFailure('zhihuishu', '智慧树接口 HTTP 401'));
    await flush();
    expect(queue.els.state?.textContent).toBe('上次执行失败：智慧树接口 HTTP 401');
  });

  it('取数报错同样认时机：过时的那一份不写当前行的字', async () => {
    statusModule.setStatusPlatform('mooc');
    statusModule.setStatusPlatform('zhihuishu');

    queue.pending[0]?.reject(new Error('存储坏了'));
    await flush();
    expect(queue.els.state?.textContent).toBe('');

    queue.pending[1]?.resolve({ live: 'idle', state: { platforms: {} } });
    await flush();
    // 这一家没有失败留痕：按规则清空（而不是留着上一家那句）
    expect(queue.els.state?.textContent).toBe('');
  });

  it('没切走时照常写（守卫不是把正常路径一起关掉）', async () => {
    statusModule.setStatusPlatform('mooc');
    queue.pending[0]?.resolve(stateWithFailure('mooc', '滑块验证没过'));
    await flush();
    expect(queue.els.state?.textContent).toBe('上次执行失败：滑块验证没过');
  });
});

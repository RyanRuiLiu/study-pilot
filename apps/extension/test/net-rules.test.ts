/*
 * 请求头规则的安装（`browser/net-rules.ts`）。
 *
 * 钉住一件踩过的事：动态规则由**浏览器**持久保存，而这个模块的内存状态在
 * service worker 重启后是空的。若按内存里「上一轮我装过什么」去移除，重启后
 * 什么都没移除，再添加同 id 的规则会被浏览器直接拒掉
 * （`Rule with id 1 does not have a unique ID`），表现是所有平台接口一律失败。
 * 因此要移除的 id 必须来自 `getDynamicRules()`。
 *
 * `fakeBrowser` 没有实现 declarativeNetRequest（它实现的是 action / alarms /
 * notifications / runtime / storage / tabs / webNavigation / windows），
 * 所以这里给一个最小的、会**照 Chrome 语义拒绝重复 id** 的替身：
 * 替身会报错，这条测试才有意义。
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fakeBrowser } from 'wxt/testing/fake-browser';

interface Rule {
  id: number;
  priority: number;
  action: unknown;
  condition: { urlFilter: string };
}

/** 浏览器侧的规则表（跨模块重启保持不变，这正是真实行为）。 */
let stored: Rule[] = [];

const ORIGIN = 'https://www.icourse163.org';
const SETS = [{ origin: ORIGIN, paths: ['/web/j/', '/dwr/'] }];

function stubDeclarativeNetRequest(): void {
  const dnr = {
    getDynamicRules: async (): Promise<Rule[]> => stored.map((rule) => ({ ...rule })),
    updateDynamicRules: async (request: {
      removeRuleIds?: number[];
      addRules?: Rule[];
    }): Promise<void> => {
      const removed = new Set(request.removeRuleIds ?? []);
      const kept = stored.filter((rule) => !removed.has(rule.id));
      const added = request.addRules ?? [];
      const ids = new Set(kept.map((rule) => rule.id));
      for (const rule of added) {
        if (ids.has(rule.id)) {
          // 与 Chrome 同样的报错：重复 id 整次调用被拒绝，一条也不会装上
          throw new Error(`Rule with id ${rule.id} does not have a unique ID.`);
        }
        ids.add(rule.id);
      }
      stored = [...kept, ...added];
    },
  };
  Object.defineProperty(fakeBrowser, 'declarativeNetRequest', { value: dnr, configurable: true });
}

/** 重新导入模块：等价于 service worker 被回收后重新起来（内存清空，浏览器侧规则还在）。 */
async function loadFresh(): Promise<(typeof import('../src/browser/net-rules'))['whenNetRulesReady']> {
  vi.resetModules();
  const module = await import('../src/browser/net-rules');
  return module.whenNetRulesReady;
}

beforeEach(() => {
  stubDeclarativeNetRequest();
});

describe('请求头规则安装', () => {
  it('按平台声明的域名与路径各装一条', async () => {
    stored = [];
    const whenReady = await loadFresh();

    await whenReady(SETS);

    expect(stored.map((rule) => rule.id)).toEqual([1, 2]);
    expect(stored.map((rule) => rule.condition.urlFilter)).toEqual([
      'www.icourse163.org/web/j/',
      'www.icourse163.org/dwr/',
    ]);
  });

  it('worker 重启后不重复添加同 id 的规则：移除的 id 取自浏览器实际存在的规则', async () => {
    stored = [];
    const first = await loadFresh();
    await first(SETS);
    expect(stored).toHaveLength(2);

    // 内存状态清空、浏览器侧规则还在——这就是重启后的局面
    const restarted = await loadFresh();

    await expect(restarted(SETS)).resolves.toBeUndefined();
    expect(stored.map((rule) => rule.id)).toEqual([1, 2]);
  });

  it('规则多于两条时全部清干净再装，不留旧的', async () => {
    stored = [];
    const whenReady = await loadFresh();
    await whenReady([{ origin: ORIGIN, paths: ['/a/', '/b/', '/c/', '/d/'] }]);
    expect(stored).toHaveLength(4);

    const restarted = await loadFresh();
    await restarted(SETS);

    expect(stored.map((rule) => rule.condition.urlFilter)).toEqual([
      'www.icourse163.org/web/j/',
      'www.icourse163.org/dwr/',
    ]);
  });
});

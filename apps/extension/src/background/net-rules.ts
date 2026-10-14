/*
 * 出站请求头规则（通用机制）。
 *
 * 规则内容由平台给出（哪些域名、哪两条路径前缀），外壳只负责把它拼成
 * declarativeNetRequest 的形状并安装——`buildRules(sets)` 的入参就是平台声明。
 *
 * 官方 API `declarativeNetRequest` 的 modifyHeaders 会在请求发出前改写请求头，
 * 实测可以把 Origin 改写成平台域名，于是后台无需打开任何标签页即可发请求。
 * 权限要求是 declarativeNetRequestWithHostAccess 而不是基础权限——
 * 后者不能修改请求头。
 *
 * 规则装在动态规则集里（不是 session 规则），因为 session 规则在浏览器
 * 重启后失效，而后台任务恰恰是在浏览器启动时执行的。
 *
 * 平台为什么需要这条规则（Origin 判别来源的实测对比）记录在规则数据那里：
 * 见 `src/platforms/mooc/net-rules.ts`。
 */

import type { Browser } from 'wxt/browser';
import type { NetRuleSet } from '../platforms/types.ts';

/** 动态规则 id。固定值，重复安装时先按 id 移除再添加，保证幂等。 */
const RULE_ID = 1;

/** 规则里用到的类型别名，避免直接引用 chrome 命名空间。 */
type Rule = Browser.declarativeNetRequest.Rule;
type RuleActionType = Browser.declarativeNetRequest.RuleActionType;
type HeaderOperation = Browser.declarativeNetRequest.HeaderOperation;

/**
 * 请求头规则的完整定义。
 *
 * 规则内容由平台给出（哪些域名、哪两条路径前缀）：那是平台的实测事实，
 * 外壳无从判断。这里只负责把它拼成 declarativeNetRequest 的形状。
 *
 * 不限定 resourceTypes。曾经写过 `['xmlhttprequest']`，但那条限制在
 * service worker 里会让规则匹配不上：文档说 xmlhttprequest 覆盖
 * "XMLHttpRequest 和 fetch()"，而那是页面上下文的语境，
 * 后台发起的 fetch 常被归为 other。规则匹配不上时不会报错，
 * 只是 Origin 保持原样，表现为平台回「非法跨域请求」——
 * 排查时很容易误以为是规则没安装。
 * 省略该字段即匹配所有类型，urlFilter 已经把范围收得足够窄。
 */
function buildRules(sets: NetRuleSet[]): Rule[] {
  const rules: Rule[] = [];

  for (const [index, set] of sets.entries()) {
    const action = {
      type: 'modifyHeaders' as RuleActionType,
      requestHeaders: [
        { header: 'Origin', operation: 'set' as HeaderOperation, value: set.origin },
        { header: 'Referer', operation: 'set' as HeaderOperation, value: `${set.origin}/` },
      ],
    };

    for (const [offset, path] of set.paths.entries()) {
      const host = set.origin.replace(/^https?:\/\//, '');
      rules.push({
        id: RULE_ID + index * 10 + offset,
        priority: 1,
        action,
        condition: { urlFilter: `${host}${path}` },
      });
    }
  }

  return rules;
}

/**
 * 确保请求头规则已安装。
 *
 * 幂等：先移除同 id 的旧规则再添加，因此可以每次启动都调用。
 * 失败时返回原因，由调用方决定是否提示——缺这条规则会导致所有后台接口调用被拒。
 */
async function ensureNetRules(sets: NetRuleSet[]): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    await browser.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [RULE_ID, RULE_ID + 1],
      addRules: buildRules(sets),
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : String(error) };
  }
}

/**
 * 等待规则就绪。
 *
 * 安装是异步的，而扩展重载会清空动态规则，重载后的第一个请求必然赶在
 * 安装完成之前发出——那个请求会带着扩展的 Origin 被平台 403 拒掉。
 * 因此所有出站请求都必须先等这一步，而不是与它并发。
 *
 * 只装一次：结果被缓存，后续调用直接复用同一个 Promise。
 */
let readyOnce: Promise<void> | null = null;

export function whenNetRulesReady(sets: NetRuleSet[]): Promise<void> {
  readyOnce ??= ensureNetRules(sets).then((result) => {
    if (!result.ok) {
      // 记下失败原因便于诊断；不阻塞请求，让上层拿到平台的真实响应
      void browser.storage.local.set({ netRulesError: result.message });
    }
  });
  return readyOnce;
}


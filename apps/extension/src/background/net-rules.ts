/*
 * 出站请求头规则。
 *
 * 平台的 .rpc 接口按 Origin 判别来源：
 *
 *   service worker 发的请求   Origin: chrome-extension://<id>   -> 403
 *   页面上下文发的请求         Origin: https://www.icourse163.org -> 200
 *
 * 同一接口、同一签名、同一请求体，差别只在 Origin。实测对比过两者的出站头，
 * 服务端对扩展来源一律拒绝。
 *
 * 官方 API declarativeNetRequest 的 modifyHeaders 会在请求发出前改写请求头，
 * 实测可以把 Origin 改写成平台域名，于是后台无需打开任何标签页即可发请求。
 * 权限要求是 declarativeNetRequestWithHostAccess 而不是基础权限——
 * 后者不能修改请求头。
 *
 * 规则装在动态规则集里（不是 session 规则），因为 session 规则在浏览器
 * 重启后失效，而后台任务恰恰是在浏览器启动时执行的。
 */

import type { Browser } from 'wxt/browser';

/** 动态规则 id。固定值，重复安装时先按 id 移除再添加，保证幂等。 */
const RULE_ID = 1;

/** 平台域名。改写后的 Origin 与 Referer 都指向它。 */
const PLATFORM_ORIGIN = 'https://www.icourse163.org';

/** 规则里用到的类型别名，避免直接引用 chrome 命名空间。 */
type Rule = Browser.declarativeNetRequest.Rule;
type RuleActionType = Browser.declarativeNetRequest.RuleActionType;
type HeaderOperation = Browser.declarativeNetRequest.HeaderOperation;

/**
 * 请求头规则的完整定义。
 *
 * 平台的接口有两条路径前缀，都要覆盖：
 *   /web/j/      .rpc 接口
 *   /dwr/call/   DWR 接口（互评、待办等走这条）
 * 只覆盖其一的话，另一类请求仍会带着扩展的 Origin 被 403 拒掉。
 *
 * 用两条规则而不是把 urlFilter 放宽到整个域名——后者会把图片、脚本等
 * 静态资源的 Origin 一并改掉，没有必要。
 *
 * 不限定 resourceTypes。曾经写过 `['xmlhttprequest']`，但那条限制在
 * service worker 里会让规则匹配不上：文档说 xmlhttprequest 覆盖
 * "XMLHttpRequest 和 fetch()"，而那是页面上下文的语境，
 * 后台发起的 fetch 常被归为 other。规则匹配不上时不会报错，
 * 只是 Origin 保持原样，表现为平台回「非法跨域请求」——
 * 排查时很容易误以为是规则没安装。
 * 省略该字段即匹配所有类型，urlFilter 已经把范围收得足够窄。
 */
function buildRules(): Rule[] {
  const condition = (urlFilter: string) => ({ urlFilter });

  const action = {
    type: 'modifyHeaders' as RuleActionType,
    requestHeaders: [
      { header: 'Origin', operation: 'set' as HeaderOperation, value: PLATFORM_ORIGIN },
      { header: 'Referer', operation: 'set' as HeaderOperation, value: `${PLATFORM_ORIGIN}/` },
    ],
  };

  return [
    { id: RULE_ID, priority: 1, action, condition: condition('icourse163.org/web/j/') },
    { id: RULE_ID + 1, priority: 1, action, condition: condition('icourse163.org/dwr/') },
  ];
}

/**
 * 确保请求头规则已安装。
 *
 * 幂等：先移除同 id 的旧规则再添加，因此可以每次启动都调用。
 * 失败时返回原因，由调用方决定是否提示——缺这条规则会导致所有后台接口调用被拒。
 */
export async function ensureNetRules(): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    await browser.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [RULE_ID, RULE_ID + 1],
      addRules: buildRules(),
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

export function whenNetRulesReady(): Promise<void> {
  readyOnce ??= ensureNetRules().then((result) => {
    if (!result.ok) {
      // 记下失败原因便于诊断；不阻塞请求，让上层拿到平台的真实响应
      void browser.storage.local.set({ netRulesError: result.message });
    }
  });
  return readyOnce;
}

/** 读取当前已安装的动态规则，用于诊断。 */
export async function listNetRules(): Promise<Rule[]> {
  try {
    return await browser.declarativeNetRequest.getDynamicRules();
  } catch {
    return [];
  }
}

/*
 * 出站请求头规则（通用机制）。
 *
 * 规则内容由平台给出（哪些域名、哪几条路径前缀），外壳只负责把它拼成
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
 * 见 `packages/platform-mooc/src/policy/net-rules.ts`。
 */

import type { Browser } from 'wxt/browser';
import type { NetRuleSet } from '@study-pilot/application';

/** 动态规则的起始 id。Chrome 要求 id 唯一且非 0。 */
const RULE_ID = 1;

/** 规则里用到的类型别名，避免直接引用 chrome 命名空间。 */
type Rule = Browser.declarativeNetRequest.Rule;
type RuleActionType = Browser.declarativeNetRequest.RuleActionType;
type HeaderOperation = Browser.declarativeNetRequest.HeaderOperation;

/**
 * 请求头规则的完整定义。
 *
 * 规则内容由平台给出（哪些域名、哪几条路径前缀）：那是平台的实测事实，
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

  for (const set of sets) {
    const requestHeaders: Array<{ header: string; operation: HeaderOperation; value?: string }> = [];
    if (set.stripBrowserHeaders === true) {
      for (const header of [
        'Origin',
        'Referer',
        'Sec-CH-UA',
        'Sec-CH-UA-Mobile',
        'Sec-CH-UA-Platform',
        'Sec-Fetch-Site',
        'Sec-Fetch-Mode',
        'Sec-Fetch-Dest',
      ]) {
        requestHeaders.push({ header, operation: 'remove' as HeaderOperation });
      }
    } else {
      requestHeaders.push(
        { header: 'Origin', operation: 'set' as HeaderOperation, value: set.origin },
        { header: 'Referer', operation: 'set' as HeaderOperation, value: `${set.origin}/` },
      );
    }
    if (set.userAgent !== undefined) {
      requestHeaders.push({
        header: 'User-Agent',
        operation: 'set' as HeaderOperation,
        value: set.userAgent,
      });
    }
    const action = {
      type: 'modifyHeaders' as RuleActionType,
      requestHeaders,
    };

    const host = set.origin.replace(/^https?:\/\//, '');
    for (const path of set.paths) {
      // 顺序编号：按「平台序号 × 10 + 路径序号」算 id 时，一个平台超过 10 条路径
      // 就会与下一个平台的 id 撞上，而 id 冲突是静默的（后写的规则不生效）
      rules.push({
        id: RULE_ID + rules.length,
        priority: 1,
        action,
        condition: { urlFilter: `${host}${path}` },
      });
    }
  }

  return rules;
}

/** 已声明要装的规则集，跨平台累计去重。 */
let declaredSets: NetRuleSet[] = [];
/** 当前这一轮安装。声明没变时所有调用共用它。 */
let ready: Promise<void> | null = null;

/**
 * 装上当前声明的规则。
 *
 * 要移除的 id 从**浏览器里实际存在的规则**取，不记在本模块的内存里。动态规则
 * 由浏览器持久保存（实测：重载扩展后 `getDynamicRules` 仍返回那两条），而
 * service worker 一重启内存就空了——按内存里「上一轮我装过什么」去移除，
 * 重启后等于什么都没移除，再添加同 id 的规则会被直接拒掉
 * （`Rule with id 1 does not have a unique ID`），表现是所有平台接口一律失败。
 * 这个扩展只有这一处写动态规则，因此清空再装是安全的。
 */
async function install(sets: NetRuleSet[]): Promise<void> {
  const rules = buildRules(sets);
  const existing = await browser.declarativeNetRequest.getDynamicRules();
  await browser.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: existing.map((rule) => rule.id),
    addRules: rules,
  });
}

/**
 * 等待请求头规则生效。
 *
 * 动态规则是持久的（见 `install` 的说明），所以这一步只为一种情形存在：
 * **首次安装与升级后**规则还没装上，而第一个请求已经发出——那个请求会带着
 * 扩展自身的 Origin 被平台 403 拒掉。因此所有出站请求都先等这一步，
 * 而不是与它并发。
 *
 * 每个调用方带上自己那份声明，这里累计去重后**只在声明变多时重装一次**。
 * 先前是第一次调用锁死缓存、之后所有调用共用：配合启动时传进来的空数组，
 * 等于每次启动把规则删掉而再没人装回来，表现是所有平台接口一律 HTTP 403，
 * 界面上只剩一句看不出原因的「读取失败」。
 *
 * 装不上就抛：这条规则缺失时每一个平台请求都会被拒，静默继续等于把必然的
 * 失败推迟成一句无法解释的错误。
 */
export function whenNetRulesReady(sets: NetRuleSet[]): Promise<void> {
  const declared = [...new Set([...declaredSets, ...sets])];
  if (declared.length !== declaredSets.length) {
    declaredSets = declared;
    ready = install(declared);
  }
  ready ??= install(declaredSets);
  return ready;
}

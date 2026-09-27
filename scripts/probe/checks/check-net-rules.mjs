/*
 * 验证请求头规则真的在起作用。
 *
 * 判据不是"规则装上了"，而是"带规则发一次请求，平台认不认"。
 * 直接比较两种情形：
 *   1. 直接 fetch（浏览器会把 Origin 设成扩展来源）→ 预期被拒
 *   2. 同样的 fetch 在规则生效后发出            → 预期通过
 *
 * 用法：node scripts/probe/checks/check-net-rules.mjs
 */

import { Session, listTargets, newPageTarget } from '../lib/cdp.mjs';
import { requireExtensionId } from '../lib/ext-id.mjs';

// 扩展 id 由加载路径决定，不同机器不同，因此从浏览器读取而不是写死
const EXT_ID = await requireExtensionId();
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const worker = (await listTargets()).find((t) => t.type === 'service_worker');
if (!worker) {
  console.error('后台 service worker 不在。先打开一次扩展页面唤醒它。');
  process.exit(1);
}

const target = await newPageTarget();
const session = await Session.open(target.webSocketDebuggerUrl);
await session.send('Page.enable');
await session.send('Page.navigate', { url: `chrome-extension://${EXT_ID}/options.html` });
const deadline = Date.now() + 15000;
while (Date.now() < deadline) {
  const r = await session
    .send('Runtime.evaluate', {
      expression:
        '(typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.id) ? 1 : 0',
      returnByValue: true,
    })
    .catch(() => ({ result: { value: 0 } }));
  if (r.result?.value === 1) break;
  await wait(300);
}
await wait(3000);

const probe = async (expr) => {
  const r = await session.send('Runtime.evaluate', {
    expression: expr,
    awaitPromise: true,
    returnByValue: true,
  });
  return r.result?.value ?? r.exceptionDetails?.text ?? '(无返回)';
};

const results = [];
const record = (name, ok, detail) => {
  results.push({ name, ok, detail });
  console.log(`${ok ? '通过' : '失败'}  ${name}${detail ? `  ${detail}` : ''}`);
};

// ---------- 规则是否安装 ----------

console.log('=== 已安装的动态规则 ===');
const rulesJson = await probe(`(async () => {
  const rules = await chrome.declarativeNetRequest.getDynamicRules();
  return JSON.stringify(rules.map(r => ({
    id: r.id,
    urlFilter: r.condition?.urlFilter,
    resourceTypes: r.condition?.resourceTypes ?? '(未限定，匹配所有类型)',
    headers: (r.action?.requestHeaders ?? []).map(h => \`\${h.header}=\${h.value}\`)
  })), null, 1);
})()`);
console.log(rulesJson);

let rules = [];
try {
  rules = JSON.parse(rulesJson);
} catch {
  /* 保持空数组 */
}
record('动态规则已安装', rules.length > 0, `${rules.length} 条`);
record(
  '规则未限定资源类型',
  rules.length > 0 && rules.every((r) => String(r.resourceTypes).startsWith('(未限定')),
  rules.map((r) => r.resourceTypes).join(' / '),
);
record(
  '规则覆盖 .rpc 与 DWR 两条路径',
  rules.some((r) => String(r.urlFilter).includes('/web/j/')) &&
    rules.some((r) => String(r.urlFilter).includes('/dwr/')),
  rules.map((r) => r.urlFilter).join(', '),
);

// ---------- 规则是否真的生效 ----------

console.log('');
console.log('=== 发一次真实请求看平台认不认 ===');

const viaApp = await probe(`(async () => {
  const c = await chrome.cookies.get({ url: "https://www.icourse163.org/", name: "NTESSTUDYSI" });
  if (!c) return JSON.stringify({ skipped: "未登录，无法验证" });
  const res = await chrome.runtime.sendMessage({ type: "REFRESH_COURSES" });
  return JSON.stringify({ ok: res.ok, courses: res.courses?.length ?? 0, message: res.message ?? null });
})()`);
console.log(`  经扩展自身发请求：${viaApp}`);

const viaAppParsed = JSON.parse(viaApp);
if (viaAppParsed.skipped) {
  console.log(`  ${viaAppParsed.skipped}`);
} else {
  record(
    '经扩展发起的请求被平台接受',
    viaAppParsed.ok === true,
    viaAppParsed.ok ? `取到 ${viaAppParsed.courses} 门课` : String(viaAppParsed.message),
  );
}

console.log('');
const failed = results.filter((r) => !r.ok);
console.log(`共 ${results.length} 项，通过 ${results.length - failed.length} 项，失败 ${failed.length} 项。`);

session.close();

/*
 * 验证「只发一次 fetch 能否恢复会话」。
 *
 * 背景：NTESSTUDYSI 与 STUDY_INFO 是会话级 cookie，正常关闭浏览器后消失。
 * 而 NTESSTUDYSI 是所有 API 的 csrfKey，没有它就发不出任何请求。
 * 平台上还留着 NTES_YD_PASSPORT 与 STUDY_PERSIST 两个持久 cookie，
 * 打开 MOOC 页面时会用它们恢复会话。
 *
 * 要确认的是：这次恢复是服务端在收到请求时做的，还是页面 JS 做的。
 * 前者的话扩展可以静默 fetch 完成，不必打开标签页。
 *
 * 做法：先记下当前值 → 删掉两个会话 cookie → 只发 fetch（不开页面）
 *      → 看 cookie 是否被重新下发。
 *
 * 注意：会删掉调试 profile 里的会话 cookie，需要重新登录一次才能恢复。
 * 只对探测专用 profile 使用，不要对日常浏览器的 profile 跑。
 *
 * 用法：node scripts/probe/checks/test-session-refresh.mjs
 */

import { Session, listTargets, newPageTarget } from '../lib/cdp.mjs';
import { requireExtensionId } from '../lib/ext-id.mjs';

// 扩展 id 由加载路径决定，不同机器不同，因此从浏览器读取而不是写死
const EXT_ID = await requireExtensionId();
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const worker = (await listTargets()).find((t) => t.type === 'service_worker');
if (!worker) {
  const p = await newPageTarget();
  const s = await Session.open(p.webSocketDebuggerUrl);
  await s.send('Page.enable');
  await s.send('Page.navigate', { url: `chrome-extension://${EXT_ID}/options.html` });
  s.close();
  await wait(2000);
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
  return r.result?.value ?? r.exceptionDetails?.text;
};

const snapshot = async (label) => {
  const raw = await probe(`(async () => {
    const all = await chrome.cookies.getAll({ domain: "icourse163.org" });
    const find = (n) => all.find((c) => c.name === n);
    const si = find("STUDY_INFO");
    return JSON.stringify({
      NTESSTUDYSI: find("NTESSTUDYSI") ? find("NTESSTUDYSI").value.length : 0,
      STUDY_INFO: si ? si.value.split("|")[2] ?? null : null,
      STUDY_SESS: find("STUDY_SESS") ? find("STUDY_SESS").value.length : 0,
      PASSPORT: find("NTES_YD_PASSPORT") ? find("NTES_YD_PASSPORT").value.length : 0,
      PERSIST: find("STUDY_PERSIST") ? find("STUDY_PERSIST").value.length : 0
    });
  })()`);
  console.log(`${label}：${raw}`);
  return JSON.parse(raw);
};

console.log('=== 初始状态 ===');
const before = await snapshot('  删除前');

if (!before.PASSPORT || !before.PERSIST) {
  console.log('');
  console.log('持久 cookie 不在，无法验证恢复路径。');
  console.log('需要先用真实账号在这个 profile 里登录一次。');
  session.close();
  process.exit(0);
}

console.log('');
console.log('=== 删掉会话级 cookie，模拟「正常关闭浏览器后重开」===');
await probe(`(async () => {
  const names = ["NTESSTUDYSI", "STUDY_INFO", "STUDY_SESS"];
  for (const name of names) {
    await chrome.cookies.remove({ url: "https://www.icourse163.org", name });
  }
  return "done";
})()`);
const cleared = await snapshot('  删除后');
console.log(`  持久 cookie 仍在：PASSPORT=${cleared.PASSPORT} PERSIST=${cleared.PERSIST}`);

console.log('');
console.log('=== 只发一次 fetch，不打开任何页面 ===');
await probe(`(async () => {
  const res = await fetch("https://www.icourse163.org/", { credentials: "include" });
  return JSON.stringify({ status: res.status, setCookie可见: false });
})()`);
await wait(2000);

const afterFetch = await snapshot('  fetch 之后');

console.log('');
console.log('=== 结论 ===');
if (afterFetch.NTESSTUDYSI > 0) {
  console.log('  服务端在收到请求时就恢复了会话，扩展可以静默 fetch 完成。');
} else {
  console.log('  仅靠 fetch 未恢复。说明恢复依赖页面 JS，');
  console.log('  扩展需要真正加载一次 MOOC 页面（可用后台标签页）。');
}

session.close();

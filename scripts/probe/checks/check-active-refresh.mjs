/*
 * 验证「手动打开一定拉到最新数据」。
 *
 * 后台对自动执行做了节流：今天已经完整拉过就不再重复拉。但用户主动打开
 * 弹窗或设置页是「现在就想看」，必须绕过这个节流，否则会看到过期数据。
 *
 * 判据是本地快照的拉取时刻：主动打开之后，它应当变成刚刚。
 *
 * 做法：先把快照的日期戳改旧 → 打开设置页 → 看它是否被更新回今天。
 * 若不更新，说明主动打开走到了节流分支，用户会看到旧数据。
 *
 * 用法：node scripts/probe/checks/check-active-refresh.mjs
 */

import { Session, newPageTarget } from '../lib/cdp.mjs';
import { requireExtensionId } from '../lib/ext-id.mjs';

const EXT_ID = await requireExtensionId();
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const target = await newPageTarget();
const session = await Session.open(target.webSocketDebuggerUrl);
await session.send('Page.enable');
await session.send('Page.navigate', { url: `about:blank` });
await wait(400);
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
await wait(5000);

const probe = async (expr) => {
  const r = await session.send('Runtime.evaluate', {
    expression: expr,
    awaitPromise: true,
    returnByValue: true,
  });
  return r.result?.value;
};

const results = [];
const record = (name, ok, detail) => {
  results.push({ name, ok });
  console.log(`${ok ? '通过' : '失败'}  ${name}${detail ? `  ${detail}` : ''}`);
};

/** 读快照的拉取日期。 */
const readStamp = () =>
  probe(`(async () => {
    const s = (await chrome.storage.local.get("study-pilot-snapshot"))["study-pilot-snapshot"];
    return s ? s.fetchedDate : null;
  })()`);

const today = await probe(`new Date().toLocaleDateString('sv')`);

console.log(`=== 今天：${today} ===`);

// 先看当前状态
const before = await readStamp();
console.log(`  打开设置页后的快照日期：${before ?? '(无快照)'}`);

if (before === null) {
  console.log('');
  console.log('当前没有快照。可能原因：');
  console.log('  - 尚未登录（未登录时不会拉取，因为没有用户身份可查）');
  console.log('  - 尚未选择参与任务的课程');
  console.log('');
  console.log('登录并勾选课程后再跑这个脚本。');
  session.close();
  process.exit(0);
}

/*
 * 把快照日期改成过去，再打开一次页面。
 * 若主动打开确实不受节流限制，日期应当被写回今天。
 */
await probe(`(async () => {
  const k = "study-pilot-snapshot";
  const s = (await chrome.storage.local.get(k))[k];
  s.fetchedDate = "2000-01-01";
  await chrome.storage.local.set({ [k]: s });
  return true;
})()`);

const tampered = await readStamp();
console.log(`  人为改旧后：${tampered}`);
record('测试前置：已把快照日期改旧', tampered === '2000-01-01', tampered);

// 重新打开设置页，触发一次主动刷新
await session.send('Page.reload');
await wait(9000);

const after = await readStamp();
console.log(`  重新打开设置页后：${after}`);
record(
  '主动打开会把快照更新到当前',
  after === today,
  after === today ? '已更新为今天' : `仍为 ${after}，说明主动打开被节流了`,
);

console.log('');
const failed = results.filter((r) => !r.ok);
console.log(`共 ${results.length} 项，通过 ${results.length - failed.length} 项，失败 ${failed.length} 项。`);

session.close();

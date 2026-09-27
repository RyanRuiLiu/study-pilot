/*
 * 真实执行一轮，打印前后状态。
 *
 * 这条命令走的是与用户点「开始执行」完全相同的路径：拉最新状态、
 * 把能自动完成的做完、返回结果。**会真的写平台**，因此只在确认
 * 「现在确实有该做的事」时使用。
 *
 * 想先看会做什么而不写平台，用 dryrun-tasks.mjs。
 *
 * 用法：node scripts/probe/run/run-once.mjs
 */

import { Session, listTargets, newPageTarget } from '../lib/cdp.mjs';
import { requireExtensionId } from '../lib/ext-id.mjs';

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
  await wait(400);
}
await wait(3000);

const call = async (expr) => {
  const r = await session.send('Runtime.evaluate', {
    expression: `(async () => JSON.stringify(await ${expr}))()`,
    awaitPromise: true,
    returnByValue: true,
  });
  return JSON.parse(r.result?.value);
};

/** 打印运行状态。字段与 scheduler 的 TaskState 一致。 */
function show(label, state) {
  console.log(label);
  console.log(
    `  上次结束    ${state.lastFinishedAt ? new Date(state.lastFinishedAt).toLocaleString() : '(从未)'}`,
  );
  console.log(`  中断标记    ${state.runningSince ? '有（上次未结束）' : '无'}`);
  console.log(`  等待登录    ${state.awaitingLogin ? '是' : '否'}`);
}

const before = await call(`chrome.runtime.sendMessage({ type: "TASK_STATE" })`);
show('=== 执行前 ===', before);

console.log('');
console.log('=== 真实执行 ===');

const result = await call(`chrome.runtime.sendMessage({ type: "RUN_SCHEDULED_TASKS" })`);

if (result.ok === false) {
  console.log(`  被拒绝：${result.reason}`);
} else if (result.message) {
  console.log(`  ${result.message}`);
} else {
  console.log(`  完成      ${result.done ?? 0} 项`);
  console.log(`  待你处理  ${result.manual ?? 0} 项`);
  const failed = result.failed ?? [];
  if (failed.length > 0) {
    console.log(`  失败      ${failed.length} 项`);
    for (const item of failed) console.log(`    · ${item.name}  ${item.detail}`);
  }
}

console.log('');
const after = await call(`chrome.runtime.sendMessage({ type: "TASK_STATE" })`);
show('=== 执行后 ===', after);

session.close();

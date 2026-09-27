/*
 * 验证弹窗顶栏在点击「执行」的过程中不会发生位移。
 *
 * 做法：记录点击前各元素的位置，点击后再记录一次，
 * 比较按钮的横坐标是否变化。不是看代码推断，是真的量。
 *
 * 早先这里还量过顶栏上的总开关，那个开关后来移进了设置页，
 * 弹窗顶栏只剩两个按钮。
 *
 * 用法：node scripts/probe/checks/check-bar-stable.mjs
 */

import { writeFileSync } from 'node:fs';
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
await session.send('Emulation.setDeviceMetricsOverride', {
  width: 340,
  height: 640,
  deviceScaleFactor: 2,
  mobile: false,
});
await session.send('Page.navigate', { url: `chrome-extension://${EXT_ID}/popup.html` });
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
await wait(6000);

const probe = async (expr) => {
  const r = await session.send('Runtime.evaluate', {
    expression: expr,
    returnByValue: true,
  });
  return r.result?.value;
};

/** 量出顶栏各元素的位置。 */
const measure = () =>
  probe(`JSON.stringify((() => {
    const out = {};
    for (const sel of ['#run-now', '#open-settings', '#state-text']) {
      const el = document.querySelector(sel);
      if (!el) { out[sel] = null; continue; }
      const r = el.getBoundingClientRect();
      out[sel] = { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) };
    }
    out.runLabel = document.querySelector('#run-now')?.textContent ?? null;
    return out;
  })())`);

const results = [];
const record = (name, ok, detail) => {
  results.push({ name, ok, detail });
  console.log(`${ok ? '通过' : '失败'}  ${name}${detail ? `  ${detail}` : ''}`);
};

const before = JSON.parse(await measure());
console.log('=== 点击前 ===');
console.log(`  执行按钮  left=${before['#run-now'].left}  width=${before['#run-now'].width}  文字「${before.runLabel}」`);
console.log(`  设置按钮  left=${before['#open-settings'].left}`);

// 点下去
await probe(`document.getElementById('run-now').click()`);
await wait(400);

const during = JSON.parse(await measure());
console.log('');
console.log('=== 执行中 ===');
console.log(`  执行按钮  left=${during['#run-now'].left}  width=${during['#run-now'].width}  文字「${during.runLabel}」`);
console.log(`  设置按钮  left=${during['#open-settings'].left}`);

// 等执行完
await wait(20000);

const after = JSON.parse(await measure());
console.log('');
console.log('=== 执行后 ===');
console.log(`  执行按钮  left=${after['#run-now'].left}  width=${after['#run-now'].width}  文字「${after.runLabel}」`);
console.log(`  设置按钮  left=${after['#open-settings'].left}`);

console.log('');
record('按钮文字始终不变', before.runLabel === during.runLabel && before.runLabel === after.runLabel,
  `${before.runLabel} → ${during.runLabel} → ${after.runLabel}`);
record('执行按钮宽度不变', before['#run-now'].width === during['#run-now'].width && before['#run-now'].width === after['#run-now'].width,
  `${before['#run-now'].width} → ${during['#run-now'].width} → ${after['#run-now'].width}`);
record('执行按钮位置不变', before['#run-now'].left === during['#run-now'].left && before['#run-now'].left === after['#run-now'].left,
  `${before['#run-now'].left} → ${during['#run-now'].left} → ${after['#run-now'].left}`);
record('设置按钮位置不变', before['#open-settings'].left === during['#open-settings'].left && before['#open-settings'].left === after['#open-settings'].left,
  `${before['#open-settings'].left} → ${during['#open-settings'].left} → ${after['#open-settings'].left}`);


const shot = await session.send('Page.captureScreenshot', { format: 'png' });
writeFileSync('.probe/bar-after-run.png', Buffer.from(shot.data, 'base64'));
console.log('');
console.log('已保存 .probe/bar-after-run.png');

console.log('');
const failed = results.filter((r) => !r.ok);
console.log(`共 ${results.length} 项，通过 ${results.length - failed.length} 项，失败 ${failed.length} 项。`);

session.close();

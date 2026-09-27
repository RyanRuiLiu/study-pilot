/*
 * 通知点击与锚点定位的自检。
 *
 * 核对：
 *   1. 带 #details 打开设置页时，该分区滚到视口顶部
 *   2. 不带锚点时停在页面顶部
 *   3. 锚点定位后左侧导航的高亮与所处位置一致
 *
 * 用法：node scripts/probe/checks/check-anchor.mjs
 */

import { Session, listTargets, newPageTarget } from '../lib/cdp.mjs';
import { requireExtensionId } from '../lib/ext-id.mjs';

// 扩展 id 由加载路径决定，不同机器不同，因此从浏览器读取而不是写死
const EXT_ID = await requireExtensionId();
const OPTIONS = `chrome-extension://${EXT_ID}/options.html`;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const worker = (await listTargets()).find((t) => t.type === 'service_worker');
if (!worker) {
  const p = await newPageTarget();
  const s = await Session.open(p.webSocketDebuggerUrl);
  await s.send('Page.enable');
  await s.send('Page.navigate', { url: OPTIONS });
  s.close();
  await wait(2000);
}

const target = await newPageTarget();
const session = await Session.open(target.webSocketDebuggerUrl);
await session.send('Page.enable');
await session.send('Emulation.setDeviceMetricsOverride', {
  width: 1100,
  height: 900,
  deviceScaleFactor: 2,
  mobile: false,
});

const results = [];
const record = (name, ok, detail) => {
  results.push({ name, ok, detail });
  console.log(`${ok ? '通过' : '失败'}  ${name}${detail ? `  ${detail}` : ''}`);
};

const probe = async (expr) => {
  const r = await session.send('Runtime.evaluate', {
    expression: expr,
    awaitPromise: true,
    returnByValue: true,
  });
  return r.result?.value;
};

/** 打开一个地址并等它渲染完。 */
async function open(url) {
  // 先清空：同一个调试页面会被反复复用，残留的 hash 与滚动位置会污染结果
  await session.send('Page.navigate', { url: 'about:blank' });
  await wait(600);
  await session.send('Page.navigate', { url });
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
  // 列表数据是异步加载的，多等一会儿
  await wait(7000);
}

// ---------- 带锚点 ----------

await open(`${OPTIONS}#details`);

const anchored = JSON.parse(
  await probe(`JSON.stringify({
    targetTop: Math.round(document.getElementById("details").getBoundingClientRect().top),
    scrollY: Math.round(window.scrollY),
    current: document.querySelector(".toc a.is-current")?.textContent ?? "(无)"
  })`),
);

console.log('=== 带 #details 打开 ===');
console.log(`  目标分区距视口顶部 ${anchored.targetTop}px，页面滚动 ${anchored.scrollY}px`);
console.log(`  左侧高亮项：${anchored.current}`);

record(
  '目标分区已滚到视口顶部',
  Math.abs(anchored.targetTop) < 40,
  `${anchored.targetTop}px`,
);
record('确实发生了滚动', anchored.scrollY > 500, `${anchored.scrollY}px`);
record(
  '左侧高亮与所处位置一致',
  /*
   * 期望值跟着锚点走，不写死。
   *
   * 写死的那次是「执行与诊断」——当时 #details 排在页面末尾。
   * 后来单元明细移到了课程之后，锚点没变、分区位置变了，
   * 于是这条断言开始失败，而界面其实是对的。
   */
  anchored.current === (await probe(`document.querySelector('.toc a[href="#details"]')?.textContent ?? ''`)),
  anchored.current,
);

// ---------- 不带锚点 ----------

await open(OPTIONS);

const plain = JSON.parse(
  await probe(`JSON.stringify({
    scrollY: Math.round(window.scrollY),
    current: document.querySelector(".toc a.is-current")?.textContent ?? "(无)"
  })`),
);

console.log('');
console.log('=== 不带锚点打开 ===');
console.log(`  页面滚动 ${plain.scrollY}px，左侧高亮项：${plain.current}`);

record('不带锚点时停在页面顶部', plain.scrollY === 0, `${plain.scrollY}px`);
record('不带锚点时高亮第一个分区', plain.current === '账号与课程', plain.current);

console.log('');
const failed = results.filter((r) => !r.ok);
console.log(`共 ${results.length} 项，通过 ${results.length - failed.length} 项，失败 ${failed.length} 项。`);

session.close();

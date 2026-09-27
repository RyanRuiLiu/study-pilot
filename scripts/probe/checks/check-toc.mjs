/*
 * 设置页左侧导航的自检。
 *
 * 核对：
 *   1. 导航项与分区一一对应，顺序与标题都对
 *   2. 每项指向的分区真实存在
 *   3. 当前分区被高亮，且滚动后高亮会跟随
 *   4. 导航吸顶偏移量已按页头实际高度写入
 *
 * 用法：node scripts/probe/checks/check-toc.mjs
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
  width: 1100,
  height: 900,
  deviceScaleFactor: 2,
  mobile: false,
});
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

/*
 * 等内容渲染完，而不是固定等若干秒。
 *
 * 设置页要联网拉单元明细，那一次往返有多快取决于网络。原先固定等 7 秒，
 * 网络稍慢就不够，表现为首次运行失败、重跑通过——一个会随机失败的检查
 * 比没有检查更糟，因为它教人忽略失败。
 *
 * 页面在数据落盘后会派发 sp:content-ready，等它即可。仍留一个上限，
 * 免得页面真的卡住时脚本一直挂着。
 */
const ready = await session.send('Runtime.evaluate', {
  expression: `new Promise((resolve) => {
    const done = () => resolve('内容就绪');
    if (document.querySelector('#unit-details')?.children.length > 0) return done();
    document.addEventListener('sp:content-ready', done, { once: true });
    setTimeout(() => resolve('等待超时'), 20000);
  })`,
  awaitPromise: true,
  returnByValue: true,
});
console.log(`页面状态：${ready.result?.value ?? '(未知)'}`);

const probe = async (expr) => {
  const r = await session.send('Runtime.evaluate', {
    expression: expr,
    returnByValue: true,
  });
  return r.result?.value;
};

const results = [];
const record = (name, ok, detail) => {
  results.push({ name, ok, detail });
  console.log(`${ok ? '通过' : '失败'}  ${name}${detail ? `  ${detail}` : ''}`);
};

// ---------- 结构 ----------

const info = JSON.parse(
  await probe(`JSON.stringify({
    toc: Array.from(document.querySelectorAll(".toc a")).map(a => ({
      text: a.textContent,
      href: a.getAttribute("href"),
      current: a.classList.contains("is-current")
    })),
    sections: Array.from(document.querySelectorAll(".section")).map(x => ({
      id: x.id,
      title: x.querySelector(".section-title")?.textContent ?? ""
    })),
    tocTop: getComputedStyle(document.documentElement).getPropertyValue("--toc-top").trim(),
    tocPosition: getComputedStyle(document.querySelector(".toc")).position,
    columns: getComputedStyle(document.querySelector(".layout")).gridTemplateColumns
  })`),
);

console.log('=== 导航项 ===');
for (const item of info.toc) {
  console.log(`  ${item.current ? '●' : '○'} ${item.text}  →  ${item.href}`);
}

record('导航项数与分区数一致', info.toc.length === info.sections.length, `${info.toc.length} vs ${info.sections.length}`);

const mismatched = info.toc.filter((item, i) => {
  const section = info.sections[i];
  return !section || item.text !== section.title || item.href !== `#${section.id}`;
});
record('导航文案与链接指向的分区一致', mismatched.length === 0, mismatched.map((m) => m.text).join(', '));

record('导航为吸顶定位', info.tocPosition === 'sticky', info.tocPosition);
record('吸顶偏移量已写入', info.tocTop !== '' && info.tocTop !== '0px', info.tocTop);
record('两栏布局已生效', /px/.test(info.columns), info.columns);
record('恰好一项高亮', info.toc.filter((i) => i.current).length === 1, info.toc.find((i) => i.current)?.text ?? '(无)');

// ---------- 滚动跟随 ----------

console.log('');
console.log('=== 滚动后高亮是否跟随 ===');

const scrollTo = async (selector) => {
  await probe(`(() => {
    const el = document.querySelector("${selector}");
    if (!el) return "missing";
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top);
    return "ok";
  })()`);
  await wait(600);
  const current = await probe(
    `(document.querySelector(".toc a.is-current")?.textContent ?? "(无)")`,
  );
  return current;
};

for (const id of ['schedule', 'tasks', 'foreground', 'execution']) {
  const current = await scrollTo(`#${id}`);
  const expected = info.sections.find((s) => s.id === id)?.title;
  record(`滚到「${expected}」后该项高亮`, current === expected, current);
}

// 吸顶导航在滚动后仍可见
const stillVisible = await probe(`(() => {
  const el = document.querySelector(".toc");
  const r = el.getBoundingClientRect();
  return JSON.stringify({ top: Math.round(r.top), visible: r.top >= 0 && r.top < 300 });
})()`);
const vis = JSON.parse(stillVisible);
record('滚动到底部后导航仍在视口内', vis.visible, JSON.stringify(vis));

// ---------- 截图 ----------

await probe(`window.scrollTo(0, 0)`);
await wait(500);
const shot = await session.send('Page.captureScreenshot', { format: 'png' });
writeFileSync('.probe/options-toc.png', Buffer.from(shot.data, 'base64'));
console.log('');
console.log('已保存 .probe/options-toc.png');

console.log('');
const failed = results.filter((r) => !r.ok);
console.log(`共 ${results.length} 项，通过 ${results.length - failed.length} 项，失败 ${failed.length} 项。`);

session.close();

/*
 * 核对界面上的控件样式是否一致。
 *
 * 起因：登录状态行里「刷新」与「前往登录」并排，前者是 button、
 * 后者是 a，而两者各写了一套样式，尺寸于是不同——看起来像两个层级的控件。
 * 这类问题靠读 CSS 很难发现（两份规则都"对"），必须量到渲染结果。
 *
 * 做法是按类分组，比较同组元素的实际计算尺寸。
 *
 * 用法：node scripts/probe/checks/check-control-styles.mjs
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
await wait(7000);

const probe = async (expr) => {
  const r = await session.send('Runtime.evaluate', {
    expression: expr,
    returnByValue: true,
  });
  return r.result?.value;
};

const results = [];
const record = (name, ok, detail) => {
  results.push({ name, ok });
  console.log(`${ok ? '通过' : '失败'}  ${name}${detail ? `  ${detail}` : ''}`);
};

/** 量一组元素的计算样式。 */
const measure = (selector) =>
  probe(`JSON.stringify(
    Array.from(document.querySelectorAll(${JSON.stringify(selector)}))
      /*
       * 跳过隐藏元素。隐藏时算出来的高度是 0，拿它去比会得出
       * 「尺寸不一致」的错误结论——而它根本没显示。
       */
      .filter(el => el.getBoundingClientRect().height > 0)
      .map(el => {
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return {
          text: (el.textContent ?? '').trim().slice(0, 12),
          h: Math.round(r.height),
          w: Math.round(r.width),
          padding: cs.paddingTop + ' ' + cs.paddingRight,
          fontSize: cs.fontSize,
          borderColor: cs.borderTopColor,
          color: cs.color,
          background: cs.backgroundColor,
          /* 列表行式的按钮有自己的尺寸，不算进按钮样式的一致性里 */
          isRowLike: el.className.includes('toggle') || el.className.includes('courses')
        };
      })
  )`);

console.log('=== 按钮（button 元素）===');
const buttons = JSON.parse(await measure('button'));
for (const b of buttons) {
  if (!b.text) continue;
  console.log(
    `  ${b.text.padEnd(10)} 高 ${b.h}  内边距 ${b.padding}  字号 ${b.fontSize}  背景 ${b.background}`,
  );
}

console.log('');
console.log('=== 链接形式但外观应为按钮的元素 ===');
const links = JSON.parse(await measure('a.login-link'));
for (const l of links) {
  console.log(
    `  ${l.text.padEnd(10)} 高 ${l.h}  内边距 ${l.padding}  字号 ${l.fontSize}  背景 ${l.background}`,
  );
}

/*
 * 两类比较分开做。
 *
 * 按钮之间的一致性任何情况下都能验；与链接的对比则要求链接可见——
 * 已登录时「前往登录」是隐藏的，那种情况下不能因此判定样本不足而跳过全部检查。
 */
const clickable = buttons.filter((b) => b.text && !b.isRowLike);

if (clickable.length >= 2) {
  const heights = new Set(clickable.map((b) => b.h));
  record('按钮之间高度一致', heights.size === 1, `实际高度：${[...heights].join(' / ')}`);

  const fonts = new Set(clickable.map((b) => b.fontSize));
  record('按钮之间字号一致', fonts.size === 1, [...fonts].join(' / '));
} else {
  console.log('');
  console.log(`（页面上只有 ${clickable.length} 个按钮，无法比较）`);
}

if (links.length > 0 && clickable.length > 0) {
  const heights = new Set([...clickable.map((b) => b.h), ...links.map((l) => l.h)]);
  record(
    '按钮与按钮样式的链接尺寸一致',
    heights.size === 1,
    `按钮 ${clickable[0].h} / 链接 ${links[0].h}`,
  );
} else {
  console.log('');
  console.log('（没有可见的按钮样式链接，跳过与按钮的对比。未登录时才会出现）');
}

// 主要文字对比度
console.log('');
console.log('=== 正文文字与背景 ===');
const textSample = await probe(`(() => {
  const el = document.querySelector('.hint, .opt-desc, .section-desc, p');
  if (!el) return null;
  const cs = getComputedStyle(el);
  return JSON.stringify({ color: cs.color, size: cs.fontSize, text: (el.textContent ?? '').trim().slice(0, 20) });
})()`);
if (textSample) {
  const t = JSON.parse(textSample);
  console.log(`  ${t.color}  ${t.size}  「${t.text}」`);
}

console.log('');
const failed = results.filter((r) => !r.ok);
console.log(`共 ${results.length} 项，通过 ${results.length - failed.length} 项，失败 ${failed.length} 项。`);

session.close();

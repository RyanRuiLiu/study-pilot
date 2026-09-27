/*
 * 验证打包产物能被浏览器加载。
 *
 * 「构建成功」不等于「装得上」——清单格式、图标路径、入口文件
 * 任何一处不对，加载时才会报错。这里真的用 CDP 加载一次 dist 里的目录，
 * 确认拿到扩展 id，再核对几个关键入口是否能打开。
 *
 * 用法：node scripts/probe/checks/verify-package.mjs
 */

import { Session, listTargets, newPageTarget } from '../lib/cdp.mjs';
import { resolve } from 'node:path';

/*
 * 打包产物的位置。
 *
 * 这个文件在 scripts/probe/checks/ 下，而 dist 在项目根，
 * 因此要往上前三层。写少一层会解析成 scripts/dist/…，
 * 报出来的是「File path cannot be resolved」——看不出是路径写错了。
 */
const DIST = resolve(import.meta.dirname, '../../../dist/study-pilot');
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/** 找一个可用的浏览器级 CDP 连接。 */
const targets = await listTargets();
const page = targets.find((t) => t.type === 'page' || t.type === 'service_worker');
if (!page) {
  console.error('没有可连接的调试目标。先跑：pnpm probe:launch');
  process.exit(1);
}

console.log('=== 加载打包产物 ===');
console.log(`  目录：${DIST}`);

// 用浏览器级连接调 Extensions.loadUnpacked
const httpBase = new URL(page.webSocketDebuggerUrl.replace('ws://', 'http://'));
const versionUrl = `http://${httpBase.host}/json/version`;
const version = await fetch(versionUrl).then((r) => r.json());
const browserWs = version.webSocketDebuggerUrl;

const browser = await Session.open(browserWs);
const loaded = await browser.send('Extensions.loadUnpacked', { path: DIST });

const extId = loaded?.id;
console.log(`  扩展 id：${extId}`);
if (!extId) {
  console.error('加载失败，未返回扩展 id');
  process.exit(1);
}
await wait(2500);

const results = [];
const record = (name, ok, detail) => {
  results.push({ name, ok, detail });
  console.log(`${ok ? '通过' : '失败'}  ${name}${detail ? `  ${detail}` : ''}`);
};

// 逐个打开入口，确认产物完整
async function openPage(url) {
  const target = await newPageTarget();
  const session = await Session.open(target.webSocketDebuggerUrl);
  await session.send('Page.enable');
  const errors = [];
  session.on('Runtime.exceptionThrown', (p) => errors.push(p.exceptionDetails?.text ?? ''));
  await session.send('Page.navigate', { url });

  const deadline = Date.now() + 12000;
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
  await wait(4000);

  const probe = async (expr) => {
    const r = await session.send('Runtime.evaluate', {
      expression: expr,
      returnByValue: true,
    });
    return r.result?.value;
  };

  const info = JSON.parse(
    await probe(`JSON.stringify({
      title: document.title,
      bodyText: document.body.innerText.replace(/\\s+/g, " ").slice(0, 120),
      hasStyle: document.styleSheets.length > 0
    })`),
  );

  return { info, errors: errors.filter(Boolean), close: () => session.close() };
}

console.log('');
console.log('=== 打开各入口 ===');

const popup = await openPage(`chrome-extension://${extId}/popup.html`);
console.log(`  弹窗：${popup.info.title}｜样式表 ${popup.info.hasStyle ? '已加载' : '缺失'}`);
if (popup.info.bodyText) console.log(`    内容：${popup.info.bodyText}`);
record('弹窗可打开且有样式', popup.info.hasStyle && popup.errors.length === 0, popup.errors.join(' / '));
popup.close();

const options = await openPage(`chrome-extension://${extId}/options.html`);
console.log(`  设置页：${options.info.title}｜样式表 ${options.info.hasStyle ? '已加载' : '缺失'}`);
record('设置页可打开且有样式', options.info.hasStyle && options.errors.length === 0, options.errors.join(' / '));
options.close();

console.log('');
const failed = results.filter((r) => !r.ok);
console.log(`共 ${results.length} 项，通过 ${results.length - failed.length} 项，失败 ${failed.length} 项。`);
console.log(`扩展 id：${extId}（这次加载的临时 id，你自己装时 id 可能不同）`);

browser.close();

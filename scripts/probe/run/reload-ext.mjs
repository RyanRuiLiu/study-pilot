// 强制重新加载指定的扩展目录。
//
// 背景：--load-extension 在扩展已存在时，Chrome 可能继续使用已注册的副本，
// 于是「重新构建后行为不变」——产物里明明有新代码，运行时却看不到。
// 这会让所有验证结论失效。
//
// CDP 的 Extensions.loadUnpacked 对同一路径再次调用会触发重新加载，
// 用它可以绕过这个缓存。品牌版 Chrome 没有这个域，需用 Chrome for Testing。
//
// 用法：node scripts/probe/run/reload-ext.mjs [扩展目录]

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Session, browserVersion, listTargets } from '../lib/cdp.mjs';

const ROOT = path.resolve(fileURLToPath(new URL('../../..', import.meta.url)));
const dir = path.resolve(process.argv[2] ?? path.join(ROOT, 'apps/extension/.output/chrome-mv3'));

const version = await browserVersion();
const browser = await Session.open(version.webSocketDebuggerUrl);

try {
  const result = await browser.send('Extensions.loadUnpacked', { path: dir });
  console.log(`已重新加载扩展：${result?.id ?? '(未返回 id)'}`);
} catch (error) {
  console.log(`重新加载失败：${String(error)}`);
  console.log('若提示找不到 Extensions 域，说明当前浏览器是品牌版，需改用 Chrome for Testing。');
}

browser.close();

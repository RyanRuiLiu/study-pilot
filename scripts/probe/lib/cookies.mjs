/*
 * 从正在运行的浏览器里取出慕课会话 cookie，落到本地文件。
 *
 * 行业里的同类做法：Playwright 的 storageState、yt-dlp 的 --cookies-from-browser。
 * 我们这里更省事——浏览器是我用 CDP 启动的，直接问它要，不必去解 Chrome 的
 * DPAPI 加密，也不必解析 Cookies 数据库。
 *
 * 只读：不修改任何 cookie，不访问慕课，只把值写到 `.probe/mooc-session.json`（已被 git 忽略）。
 * 打印时只说 cookie 的名字，不打印值。
 *
 * 用法：
 *   node scripts/probe/lib/cookies.mjs                 # 取三个会话 cookie
 *   node scripts/probe/lib/cookies.mjs --all          # 连其它慕课 cookie 一起取（排查用）
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { browserVersion, Session } from './cdp.mjs';

const ORIGIN = 'https://www.icourse163.org';

/** 扩展真正依赖的三个（见 src/platforms/mooc/session.ts 的分工表）。 */
const SESSION_COOKIES = ['NTESSTUDYSI', 'STUDY_INFO', 'STUDY_SESS'];

const wantAll = process.argv.includes('--all');

const version = await browserVersion();
const session = await Session.open(version.webSocketDebuggerUrl);

let cookies;
try {
  const result = await session.send('Storage.getCookies', {});
  cookies = result.cookies;
} finally {
  session.close();
}

const mine = cookies.filter((cookie) => cookie.domain.includes('icourse163.org'));
const picked = wantAll ? mine : mine.filter((cookie) => SESSION_COOKIES.includes(cookie.name));

if (picked.length === 0) {
  console.error('没有取到慕课 cookie：浏览器里可能没登录。先在该浏览器里打开并登录慕课，再跑一次。');
  process.exit(1);
}

const missing = SESSION_COOKIES.filter((name) => !picked.some((cookie) => cookie.name === name));
if (missing.length > 0) {
  console.error(`缺少会话 cookie：${missing.join('、')}。请在浏览器里打开一次慕课页面（会话恢复是服务端行为）。`);
}

mkdirSync('.probe', { recursive: true });
const file = '.probe/mooc-session.json';
writeFileSync(
  file,
  JSON.stringify(
    {
      origin: ORIGIN,
      takenAt: Date.now(),
      cookies: Object.fromEntries(picked.map((cookie) => [cookie.name, cookie.value])),
    },
    null,
    2,
  ),
  'utf8',
);

console.log(`已写入 ${file}（${picked.length} 个 cookie）：${picked.map((c) => c.name).join('、')}`);
if (missing.length > 0) process.exitCode = 1;

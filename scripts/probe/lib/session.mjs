#!/usr/bin/env node
/**
 * 探测会话的保存 / 恢复 / 状态检查。
 *
 * 解决的问题：MOOC 的登录凭证（NTESSTUDYSI / STUDY_SESS / STUDY_INFO）是
 * 会话级 cookie，浏览器一关就没了。如果没有这层工具，每次探测都要重新登录一次，
 * 交接给下一位开发者时更是重灾区。
 *
 * 做法：把浏览器当前的 cookie 快照（**含值**）存在 `.probe/session/cookies.json`，
 * 该目录已被 .gitignore 忽略，不会进仓库。需要时再注入回浏览器。
 *
 * 用法：
 *   node scripts/probe/lib/session.mjs status     # 看当前是否已登录
 *   node scripts/probe/lib/session.mjs save       # 登录后立即保存快照
 *   node scripts/probe/lib/session.mjs restore    # 从快照恢复登录态
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Session, listTargets } from './cdp.mjs';

const ROOT = path.resolve(fileURLToPath(new URL('../../..', import.meta.url)));
const SESSION_DIR = path.join(ROOT, '.probe', 'session');
const SESSION_FILE = path.join(SESSION_DIR, 'cookies.json');

/** 判定登录态的关键 cookie。 */
const AUTH_COOKIES = ['STUDY_SESS', 'STUDY_INFO', 'NTESSTUDYSI'];

function parseArgs(argv) {
  const out = { cmd: argv[0], port: 9222 };
  for (let i = 1; i < argv.length; i++) {
    if (argv[i] === '--port') out.port = Number(argv[++i]);
  }
  return out;
}

/** 在第一个可用的 page target 上执行一段带 Network domain 的逻辑。 */
async function withPage(port, fn) {
  const targets = await listTargets({ port });
  const page = targets.find((t) => t.type === 'page');
  if (!page) throw new Error('没有可用的页面 target，请先运行 pnpm probe:launch');
  const session = await Session.open(page.webSocketDebuggerUrl);
  try {
    await session.send('Network.enable');
    return await fn(session);
  } finally {
    session.close();
  }
}

/** 从 cookie 列表里提炼登录态摘要。 */
function summarize(cookies) {
  const mooc = cookies.filter((c) => (c.domain ?? '').includes('icourse163'));
  const found = AUTH_COOKIES.filter((n) => mooc.some((c) => c.name === n));
  const hasSession = mooc.some((c) => c.name === 'STUDY_SESS' || c.name === 'STUDY_INFO');
  return { mooc, found, hasSession };
}

/** Network.setCookies 只接受这些字段，多余的会被拒绝。 */
function toSetCookieParams(c) {
  const out = {
    name: c.name,
    value: c.value,
    domain: c.domain,
    path: c.path ?? '/',
  };
  if (typeof c.expires === 'number' && c.expires > 0) out.expires = c.expires;
  if (typeof c.httpOnly === 'boolean') out.httpOnly = c.httpOnly;
  if (typeof c.secure === 'boolean') out.secure = c.secure;
  // SameSite=None 必须搭配 secure，否则注入会失败
  if (c.sameSite === 'Strict' || c.sameSite === 'Lax') out.sameSite = c.sameSite;
  else if (c.sameSite === 'None' && c.secure) out.sameSite = 'None';
  return out;
}

const args = parseArgs(process.argv.slice(2));

switch (args.cmd) {
  case 'status': {
    const { found, hasSession, mooc } = await withPage(args.port, async (s) => {
      const { cookies } = await s.send('Network.getAllCookies');
      return summarize(cookies);
    });
    console.log('MOOC cookie 总数：' + mooc.length);
    for (const name of AUTH_COOKIES) {
      const c = mooc.find((x) => x.name === name);
      if (!c) console.log(`  ${name.padEnd(14)} 不存在`);
      else
        console.log(
          `  ${name.padEnd(14)} 有值（${c.value.length} 字符，httpOnly=${c.httpOnly}，session=${!c.expires || c.expires < 0}）`,
        );
    }
    console.log(hasSession ? '\n结论：已登录' : '\n结论：未登录（缺少 STUDY_SESS / STUDY_INFO）');
    if (!hasSession && found.includes('NTESSTUDYSI')) {
      console.log('提示：NTESSTUDYSI 在未登录时也会下发（匿名会话），不能用它判断登录。');
    }
    break;
  }

  case 'save': {
    const cookies = await withPage(args.port, async (s) => {
      const r = await s.send('Network.getAllCookies');
      return r.cookies;
    });
    const { hasSession } = summarize(cookies);
    await mkdir(SESSION_DIR, { recursive: true });
    await writeFile(
      SESSION_FILE,
      JSON.stringify(
        {
          savedAt: new Date().toISOString(),
          loggedIn: hasSession,
          cookies,
        },
        null,
        2,
      ),
    );
    console.log(`已保存 ${cookies.length} 条 cookie -> ${SESSION_FILE}`);
    console.log(hasSession ? '（含登录凭证）' : '（警告：看起来是未登录状态，快照里没有登录凭证）');
    break;
  }

  case 'restore': {
    let snapshot;
    try {
      snapshot = JSON.parse(await readFile(SESSION_FILE, 'utf8'));
    } catch {
      console.error(`没有找到会话快照：${SESSION_FILE}\n先在已登录状态下运行 save。`);
      process.exit(1);
    }
    const params = snapshot.cookies.map(toSetCookieParams);
    const n = await withPage(args.port, async (s) => {
      await s.send('Network.setCookies', { cookies: params });
      const { cookies } = await s.send('Network.getAllCookies');
      return cookies.filter((c) => (c.domain ?? '').includes('icourse163')).length;
    });
    console.log(`已从快照恢复（快照时间 ${snapshot.savedAt}，登录态 ${snapshot.loggedIn}）`);
    console.log(`当前 icourse163 cookie 数：${n}`);
    break;
  }

  default:
    console.error(
      '用法：\n' +
        '  node scripts/probe/lib/session.mjs status    查看登录态\n' +
        '  node scripts/probe/lib/session.mjs save      保存 cookie 快照\n' +
        '  node scripts/probe/lib/session.mjs restore   恢复 cookie 快照',
    );
    process.exit(2);
}

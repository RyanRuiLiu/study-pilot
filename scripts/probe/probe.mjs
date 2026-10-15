#!/usr/bin/env node
/*
 * 探测工具（唯一入口）。
 *
 * 行业标准栈——浏览器驱动、登录态、流量取证三件事都交给成熟工具，本文件只负责
 * 把它们拼成本项目需要的样子：
 *
 *   浏览器      Playwright 管理的 Chromium（`pnpm exec playwright install chromium` 装一次）
 *   登录态      Playwright storageState → .probe/mooc-session.json
 *               （open 时若 profile 里缺 cookie，会自动从导出文件补上，不必人工重登）
 *   流量取证    HAR（trace.har，Chrome DevTools / Fiddler / Charles 都能直接打开）
 *   调接口      page.evaluate(fetch) 在页面上下文里发请求（call 命令；写方法默认拦截）
 *
 * 约定（改这个文件之前先读）：
 *   1. 找接口、抓响应一律用 capture / call，**不要手写临时监听**——时序与缓存
 *      不可控，本项目曾据此把「考试没有接口」当过结论。
 *   2. 产物一律落 .probe/（已在 .gitignore）；结论写进代码注释，别只留在产物里。
 *   3. 探测浏览器（open 起的那个）是唯一长期在跑的东西；其余命令优先附着它，
 *      它不在时就自己起一个、干完即走。capture 要记录 HAR，只能独占启动。
 *   4. 默认只读。call 只放行只读方法，写方法要 --allow-write 显式放行。
 *
 * 用法：pnpm probe <命令>   （完整清单：pnpm probe --help）
 */
import { createHash, randomUUID } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));
const PROFILE = path.join(ROOT, '.probe', 'profile');
const SESSION = path.join(ROOT, '.probe', 'mooc-session.json');
const API_DIR = path.join(ROOT, '.probe', 'api');
const EXT_DIR = path.join(ROOT, 'apps', 'extension', '.output', 'chrome-mv3');

const ORIGIN = 'https://www.icourse163.org';
/** 探测浏览器的固定调试端口。端口本身不可信，attach 前核实对端身份（见 attach()）。 */
const CDP_PORT = 9222;
/**
 * 归属标记：launch() 每次启动写一枚随机值，同时落 profile 目录与本 cookie，
 * attach() 两边对上才认对端。cookie 只挂在 127.0.0.1（就是调试端口自己），不碰站点。
 */
const OWNER_FILE = path.join(PROFILE, '.probe-owner');
const OWNER_COOKIE = 'study-pilot-probe-owner';
const OWNER_URL = `http://127.0.0.1:${CDP_PORT}/`;
/** 判定登录态的三个会话 cookie（NTESSTUDYSI 未登录时也有，另两个才是关键）。 */
const AUTH_COOKIES = ['STUDY_SESS', 'STUDY_INFO', 'NTESSTUDYSI'];
/** 签名盐值与协议版本——唯一出处是 packages/transport/src/sign.ts（按线上源码还原）。 */
const SIGN_SALT = 'fu2s2kxcswgn5hqanx7asmlogyr5wu29';
/** 只读方法前缀白名单：写方法直接拦截，这是硬约束不是建议（账号数据不可逆）。 */
const READONLY_PREFIXES = ['get', 'list', 'search', 'query', 'has', 'is', 'can', 'check', 'page', 'find'];

const rel = (p) => path.relative(ROOT, p) || '.';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function die(message) {
  console.error(message);
  process.exit(1);
}

// ---------------------------------------------------------------- 参数解析

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (token.startsWith('--')) {
      const key = token.slice(2);
      if (key === 'no-ext' || key === 'allow-write' || key === 'help') out[key] = true;
      else if (key === 'eval') (out.eval ??= []).push(argv[++i]);
      else out[key] = argv[++i];
    } else {
      out._.push(token);
    }
  }
  return out;
}

// ---------------------------------------------------------------- 浏览器

function launchArgs({ ext }) {
  // 不要加 --remote-allow-origins=*：那等于允许任意网页来源连 CDP。
  // Playwright 的 Node 客户端不带头带 Origin 的 WebSocket 握手，用不上它。
  const args = ['--no-first-run', '--no-default-browser-check'];
  if (ext && existsSync(EXT_DIR)) {
    args.push(`--disable-extensions-except=${EXT_DIR}`, `--load-extension=${EXT_DIR}`);
  }
  return args;
}

async function launch({ ext = true, cdpPort = null, recordHar = null } = {}) {
  mkdirSync(PROFILE, { recursive: true });
  const context = await chromium.launchPersistentContext(PROFILE, {
    headless: false,
    // 真实窗口尺寸，而不是 Playwright 默认的 1280x720 —— 这个浏览器是给人看的
    viewport: null,
    args: [...launchArgs({ ext }), ...(cdpPort ? [`--remote-debugging-port=${cdpPort}`] : [])],
    ...(recordHar ? { recordHar: { path: recordHar, content: 'embed' } } : {}),
  });
  await injectMissingCookies(context);
  await stampOwner(context);
  return context;
}

/**
 * 给这只浏览器盖归属标记（见 OWNER_FILE 注释）。
 * addCookies 用 URL 挂 cookie，不需要先开页面——启动即封好身份。
 *
 * 文件按 0600 写（安全复查建议）。在 Windows 上 POSIX 权限位基本不生效
 * （Node 只认只读位），这行是跨平台加固；真正的敏感物（会话文件、profile）
 * 同在 .probe/ 下，防泄漏靠的是这个目录本身别外借。
 */
async function stampOwner(context) {
  const token = randomUUID();
  writeFileSync(OWNER_FILE, token, { mode: 0o600 });
  await context.addCookies([{ name: OWNER_COOKIE, value: token, url: OWNER_URL }]);
}

/**
 * 附着到已在运行的探测浏览器（probe open 起的那个）。不在就返回 null。
 *
 * 9222 按**不可信端口**对待：附着前先核实对端是不是我们自己的探测浏览器——
 * 读它 127.0.0.1 域上的归属标记 cookie，与 profile 目录里的副本对上才继续
 * （launch() 每次启动盖的章）。否则，一个抢先占住 9222 的本机进程就能引着
 * 后续命令把登录 cookie 注入它、在它上面签名发请求。核实是**只读**的：
 * 对不上就断开并退出（不悄悄另起一只，否则人会以为在操作开着的那只）。
 */
let usedAttach = false;
async function attach() {
  let browser;
  try {
    browser = await chromium.connectOverCDP(`http://127.0.0.1:${CDP_PORT}`, { timeout: 2000 });
  } catch {
    return null; // 9222 上没有东西在听：正常路径，调用方照常自己起
  }

  const context = browser.contexts()[0];
  let expected = null;
  try {
    expected = readFileSync(OWNER_FILE, 'utf8').trim();
  } catch {
    expected = null;
  }
  const actual =
    context && expected
      ? ((await context.cookies(OWNER_URL).catch(() => []))
          .find((cookie) => cookie.name === OWNER_COOKIE)?.value ?? null)
      : null;
  if (!context || expected === null || actual !== expected) {
    await browser.close().catch(() => undefined); // 只断开连接，不碰对端浏览器
    die(
      [
        '9222 端口被占用，但对端不是本项目的探测浏览器（归属标记对不上）。',
        '拒绝附着：附着会把登录态注入未知进程、并在它上面发请求。',
        '先关掉占用 9222 的程序，再用 pnpm probe open 起探测浏览器。',
      ].join('\n'),
    );
  }

  usedAttach = true;
  return { browser, context };
}

/** 优先附着探测浏览器；不在就自己起一个（干完由调用方 release）。 */
async function acquire({ ext = true } = {}) {
  const attached = await attach();
  if (attached) return { ...attached, owned: false };
  const context = await launch({ ext });
  return { browser: context.browser(), context, owned: true };
}

/**
 * 关掉自己起的浏览器。
 *
 * 正常情况下 context.close() 就会优雅退出；但个别情形（第一次跑时的 profile
 * 迁移、页面挂着对话框）它可能长时间不返回。这里加两级有界兜底，保证命令
 * 永远不会永久挂住：12 秒没关掉就强制关浏览器，30 秒还不行就退出进程并提示。
 */
async function release(handle) {
  if (!handle.owned) return;
  let settled = false;
  const closed = handle.context
    .close()
    .catch(() => undefined)
    .then(() => {
      settled = true;
    });
  const force = setTimeout(() => {
    if (settled) return;
    console.error('（关闭浏览器超时，强制关闭）');
    void handle.browser?.close().catch(() => undefined);
  }, 12_000);
  const bail = setTimeout(() => {
    if (settled) return;
    console.error('（浏览器仍未关闭；退出进程——若窗口还在请手动关掉）');
    process.exit(1);
  }, 30_000);
  await closed;
  clearTimeout(force);
  clearTimeout(bail);
}

/**
 * 打开会话导出里、浏览器 profile 里还缺着的 cookie。
 *
 * 登录事实存两处：浏览器 profile（活的，站点会持续更新它）与
 * .probe/mooc-session.json（导出的快照）。profile 丢了（重装、换机、被清）时
 * 用快照补回来，就不用再人工登录一次。只补「缺的」——profile 里已有的以 profile 为准。
 */
async function injectMissingCookies(context) {
  let cookies;
  try {
    ({ cookies } = JSON.parse(readFileSync(SESSION, 'utf8')));
  } catch {
    return;
  }
  if (!Array.isArray(cookies) || cookies.length === 0) return;
  const existing = await context.cookies();
  const have = new Set(existing.map((c) => `${c.name}|${c.domain}|${c.path}`));
  const missing = cookies.filter((c) => c?.name && !have.has(`${c.name}|${c.domain}|${c.path}`));
  if (missing.length > 0) await context.addCookies(missing);
}

async function isLoggedIn(context) {
  const cookies = await context.cookies();
  return AUTH_COOKIES.every((name) =>
    cookies.some((c) => c.name === name && String(c.domain).includes('icourse163.org')),
  );
}

/** 找一个在 icourse163 源上的页面（页面上下文调接口用）；没有就开一个。 */
async function icoursePage(context) {
  const page = context.pages().find((p) => p.url().startsWith(ORIGIN));
  if (page) return page;
  const fresh = await context.newPage();
  await fresh.goto(`${ORIGIN}/`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  return fresh;
}

// ---------------------------------------------------------------- 会话

async function stateExport(context) {
  /*
   * 全量快照，不按平台裁剪：探测浏览器只有一只、一个登录身份，
   * 慕课与智慧树（以及将来的平台）的登录态都在同一个 storageState 里，
   * 快照就应完整——回注时（injectMissingCookies）才补得全。
   * 各消费方自己按域选：stateCheck 只看 icourse163，CLI 也按域过滤（host.ts）。
   */
  const state = await context.storageState();
  mkdirSync(path.dirname(SESSION), { recursive: true });
  writeFileSync(SESSION, `${JSON.stringify({ cookies: state.cookies, origins: state.origins }, null, 2)}\n`);
  const names = new Set(state.cookies.map((c) => c.name));
  const complete = AUTH_COOKIES.every((n) => names.has(n));
  console.log(`已写入 ${rel(SESSION)}：${state.cookies.length} 条 cookie（全量快照）`);
  if (!complete) console.log('提示：慕课三个会话 cookie 不齐——若在探测浏览器里登录过慕课，重新登录后再导出');
}

async function stateCheck(context) {
  console.log((await isLoggedIn(context)) ? '浏览器：已登录' : '浏览器：未登录（缺会话 cookie）');
  let saved = null;
  try {
    saved = JSON.parse(readFileSync(SESSION, 'utf8'));
  } catch {
    /* 没导出过 */
  }
  if (!saved || !Array.isArray(saved.cookies)) {
    console.log('导出文件：不存在——先跑 pnpm probe state export');
    return;
  }
  const savedOrg = saved.cookies.filter((c) => /(^|\.)icourse163\.org$/.test(String(c.domain)));
  const live = (await context.cookies()).filter((c) => /(^|\.)icourse163\.org$/.test(String(c.domain)));
  const mismatched = AUTH_COOKIES.filter((name) => {
    const liveValues = live.filter((c) => c.name === name).map((c) => c.value);
    const savedValues = savedOrg.filter((c) => c.name === name).map((c) => c.value);
    return liveValues.length > 0 && savedValues.length > 0 && !savedValues.some((v) => liveValues.includes(v));
  });
  const stamp = (() => {
    try {
      return statSync(SESSION).mtime.toLocaleString();
    } catch {
      return '(未知时间)';
    }
  })();
  if (mismatched.length === 0) {
    console.log(`导出文件：与浏览器一致（导出于 ${stamp}）`);
  } else {
    console.log(`导出文件：与浏览器不一致（${mismatched.join('、')}）——读接口回 null 的常见原因`);
    console.log('修复：pnpm probe state export');
  }
}

// ---------------------------------------------------------------- 抓取

function safeName(url, ext) {
  try {
    const u = new URL(url);
    const base = path.basename(u.pathname) || 'index';
    const stem = path.basename(base, path.extname(base)).replace(/[^A-Za-z0-9._-]/g, '_').slice(0, 60) || 'x';
    const tag = createHash('sha1').update(url).digest('hex').slice(0, 8);
    return `${stem}.${tag}${ext}`;
  } catch {
    return `x.${createHash('sha1').update(String(url)).digest('hex').slice(0, 8)}${ext}`;
  }
}

async function saveScriptBody(response, dir, saved) {
  try {
    const name = safeName(response.url(), '.js');
    if (saved.has(name)) return;
    const body = await response.body();
    saved.add(name);
    writeFileSync(path.join(dir, name), body);
  } catch {
    /* 个别响应体拿不到（重定向、中断）属正常 */
  }
}

async function capture(opts) {
  const url = opts.url;
  if (!url) die('capture 需要 --url <URL>（--out <名字> 可指定产物目录，缺省 capture-<时间戳>）');
  const outDir = path.resolve(ROOT, '.probe', opts.out ?? `capture-${Date.now()}`);

  // recordHar 只能在启动时开，所以 capture 必须独占启动；探测浏览器在跑就先让位。
  if (await attach()) {
    die('探测浏览器正在运行——capture 需要独占启动（要记录 HAR）。先关掉它（pnpm probe kill）再采。');
  }

  mkdirSync(path.join(outDir, 'scripts'), { recursive: true });
  const consoleLines = [];
  const savedScripts = new Set();
  let requestCount = 0;

  const context = await launch({ recordHar: path.join(outDir, 'trace.har') });
  try {
    const page = await context.newPage();
    page.on('request', () => {
      requestCount += 1;
    });
    page.on('console', (m) => consoleLines.push({ level: m.type(), text: m.text().slice(0, 2000) }));
    page.on('pageerror', (e) => consoleLines.push({ level: 'pageerror', text: String(e).slice(0, 2000) }));
    const scriptSaves = [];
    page.on('response', (response) => {
      if (/javascript|ecmascript/i.test(response.headers()['content-type'] ?? '')) {
        scriptSaves.push(saveScriptBody(response, path.join(outDir, 'scripts'), savedScripts));
      }
    });

    console.log(`打开 ${url}`);
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    for (const [index, code] of (opts.eval ?? []).entries()) {
      const value = await page.evaluate(code).catch((e) => `执行出错：${e.message}`);
      console.log(`--eval 第 ${index + 1} 段 → ${JSON.stringify(value)?.slice(0, 200) ?? ''}`);
      await sleep(1500);
    }
    await sleep(Number(opts.wait ?? 8000));

    writeFileSync(path.join(outDir, 'page.html'), await page.content());
    writeFileSync(path.join(outDir, 'console.jsonl'), consoleLines.map((l) => JSON.stringify(l)).join('\n'));
    await page.screenshot({ path: path.join(outDir, 'shot.png') });
    await Promise.allSettled(scriptSaves);
  } finally {
    await context.close(); // 关闭时才把 HAR 落盘
  }

  console.log(`采集完成 → ${rel(outDir)}`);
  console.log(`  请求 ${requestCount} ｜ 脚本 ${savedScripts.size} ｜ 控制台 ${consoleLines.length}`);
  console.log('  流量 trace.har（DevTools → Network → Import HAR 打开）；DOM page.html；截图 shot.png');
}

async function harExtract(opts) {
  if (!opts.dir) die('har 需要 --dir <一次 capture 的产物目录名>');
  if (!opts.match) die('har 需要 --match <URL 片段>（取最后一条匹配的响应体）');
  const harPath = path.join(path.resolve(ROOT, '.probe', opts.dir), 'trace.har');
  if (!existsSync(harPath)) die(`找不到 ${rel(harPath)}`);
  const har = JSON.parse(readFileSync(harPath, 'utf8'));
  const hits = (har.log?.entries ?? []).filter((e) => String(e.request?.url).includes(opts.match));
  if (hits.length === 0) die(`HAR 里没有匹配「${opts.match}」的请求`);
  const content = hits[hits.length - 1].response?.content ?? {};
  const body = content.encoding === 'base64' ? Buffer.from(content.text ?? '', 'base64') : Buffer.from(content.text ?? '');
  if (opts.out) {
    const target = path.resolve(ROOT, opts.out);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, body);
    console.log(`匹配 ${hits.length} 条，取最后一条 → ${rel(target)}（${body.length} 字节）`);
  } else if (body.length <= 20000) {
    process.stdout.write(body.toString('utf8'));
  } else {
    die(`匹配到的响应体 ${body.length} 字节，太长——给 --out <文件> 落盘再看`);
  }
}

// ---------------------------------------------------------------- 调接口

function isReadOnlyMethod(method) {
  const m = String(method).toLowerCase();
  return READONLY_PREFIXES.some((p) => m.startsWith(p));
}

async function rpcCall(opts) {
  const { bean, method } = opts;
  if (!bean || !method) die('call 需要 --bean <Bean> --method <方法>');
  if (!isReadOnlyMethod(method) && !opts['allow-write']) {
    die(
      `已拦截：${bean}.${method} 不是只读方法（只放行 ${READONLY_PREFIXES.join('/')} 开头）。\n` +
        '  确需写入时加 --allow-write，并确认该操作不可逆的后果可以接受。',
    );
  }
  const body = opts.body?.startsWith('@')
    ? readFileSync(path.resolve(ROOT, opts.body.slice(1)), 'utf8')
    : (opts.body ?? '{}');

  const handle = await acquire();
  try {
    const page = await icoursePage(handle.context);
    /*
     * 签名逻辑与 packages/transport/src/sign.ts 同源（那边是按线上源码逐行还原的）。
     *
     * csrfKey 写在查询串里是平台自己的协议（见 rpc.ts 的源码引文：页面就是
     * `t += "?csrfKey=" + r["NTESSTUDYSI"]` 这么拼的），不是我们的选择——改放请求头
     * 反而偏离协议。本命令不打印 URL，本文件也不落盘该请求；只有 capture 的 HAR 会
     * 如实记录浏览器流量，而它按平台本就如此。
     */
    const timestamp = Date.now();
    const nonce = Math.floor(9000 * Math.random()) + 1000;
    const signature = createHash('md5')
      .update(body + nonce + timestamp + SIGN_SALT)
      .digest('hex')
      .toUpperCase();
    const headers = {
      Timestamp: String(timestamp),
      Nonce: String(nonce),
      System: 'v1',
      'Auth-Signature': signature,
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const result = await page.evaluate(
      async ({ bean, method, headers, body }) => {
        const token = document.cookie.split('; ').reduce((acc, kv) => {
          const i = kv.indexOf('=');
          if (i > 0) acc[kv.slice(0, i)] = kv.slice(i + 1);
          return acc;
        }, {})['NTESSTUDYSI'];
        if (!token) return { error: '页面里没有 NTESSTUDYSI（未登录？）' };
        const res = await fetch(`/web/j/${bean}.${method}.rpc?csrfKey=${token}`, {
          method: 'POST',
          headers,
          body,
          credentials: 'include',
        });
        return { status: res.status, text: await res.text(), tokenLength: token.length };
      },
      { bean, method, headers, body },
    );
    if (result.error) die(result.error);

    let parsed = null;
    let isJson = true;
    try {
      parsed = JSON.parse(result.text);
    } catch {
      isJson = false;
    }
    const label = `${bean}.${method}`;
    console.log(`HTTP ${result.status}  ${label}（页面上下文，cookie ${result.tokenLength} 字符）`);
    if (isJson) {
      console.log(`code=${parsed.code}  message=${parsed.message ?? ''}`);
      console.log(`result 大小：${JSON.stringify(parsed.result ?? null).length} 字符`);
    } else {
      console.log(result.text.slice(0, 500));
    }

    mkdirSync(API_DIR, { recursive: true });
    const file = path.join(API_DIR, `${label}.${Date.now()}.json`);
    writeFileSync(
      file,
      JSON.stringify(
        {
          requestedAt: new Date().toISOString(),
          bean,
          method,
          requestBody: body,
          httpStatus: result.status,
          response: isJson ? parsed : result.text,
        },
        null,
        2,
      ),
    );
    console.log(`已保存 → ${rel(file)}`);
  } finally {
    await release(handle);
  }
}

// ---------------------------------------------------------------- 扩展

async function findExtensionId(context) {
  let workers = context.serviceWorkers();
  if (workers.length === 0) {
    try {
      await context.waitForEvent('serviceworker', { timeout: 8000 });
    } catch {
      /* 没有也继续，下面统一报错 */
    }
    workers = context.serviceWorkers();
  }
  const worker = workers.find((w) => w.url().startsWith('chrome-extension://'));
  if (worker) return new URL(worker.url()).host;
  const page = context.pages().find((p) => p.url().startsWith('chrome-extension://'));
  if (page) return new URL(page.url()).host;
  die('找不到扩展——构建产物在吗（pnpm build）？探测浏览器里扩展加载了吗？');
}

async function extCommand(opts) {
  const sub = opts._[1];
  if (sub !== 'id' && sub !== 'reload') die('ext 的子命令：id | reload');
  const handle = await attach();
  if (!handle) die('没有运行中的探测浏览器——先 pnpm probe open（它加载的就是最新构建）。');
  const id = await findExtensionId(handle.context);
  if (sub === 'id') {
    console.log(id);
    return;
  }

  /*
   * 首选 CDP 的 Extensions.loadUnpacked：按目录重新加载，等价于 chrome://extensions
   * 的刷新按钮。CDP 规范标注它是实验命令（摘要称要求 --remote-debugging-pipe 与
   * --enable-unsafe-extension-debugging）——但在这套 Chrome for Testing 156 上
   * 实测可用（2026-10-15，出口消息区分过分支）。哪天它开始报错，会自动落到
   * 下面的 runtime.reload（Chrome 扩展 API 自带的「重启扩展」）。
   */
  try {
    const cdp = await handle.browser.newBrowserCDPSession();
    await cdp.send('Extensions.loadUnpacked', { path: EXT_DIR });
    await cdp.detach();
    console.log(`已重载扩展（${id}，CDP loadUnpacked）。`);
    return;
  } catch {
    /* 回退到扩展自己的 runtime.reload */
  }
  const worker = handle.context.serviceWorkers().find((w) => w.url().startsWith('chrome-extension://'));
  if (!worker) die('重载失败：没找到扩展的 service worker。');
  // 重载会终止这个 worker，evaluate 的 reject 属正常。
  await worker.evaluate(() => chrome.runtime.reload()).catch(() => undefined);
  console.log(`已重载扩展（${id}，runtime.reload）。`);
}

// ---------------------------------------------------------------- 其他命令

async function cmdOpen(opts) {
  const ext = !opts['no-ext'];
  const context = await launch({ ext, cdpPort: CDP_PORT });
  console.log('探测浏览器已就绪：');
  console.log(`  扩展  ${ext && existsSync(EXT_DIR) ? rel(EXT_DIR) : '（未加载）'}`);
  console.log(`  CDP   http://127.0.0.1:${CDP_PORT}（其他 probe 命令自动附着）`);
  console.log(`  登录  ${(await isLoggedIn(context)) ? '已登录' : '未登录——请在窗口里登录一次，然后 pnpm probe state export'}`);
  console.log('关闭窗口即退出。');
  await new Promise((resolve) => {
    context.browser().once('disconnected', resolve);
  });
  console.log('探测浏览器已关闭。');
}

async function cmdKill() {
  const handle = await attach();
  if (!handle) {
    console.log('没有运行中的探测浏览器。');
    return;
  }
  /*
   * 注意 Playwright 的语义：对「连接来的」浏览器，browser.close() 只断开连接，
   * 不关浏览器。真正关掉它要走 CDP 的 Browser.close。
   */
  try {
    const cdp = await handle.browser.newBrowserCDPSession();
    await cdp.send('Browser.close').catch(() => undefined);
  } catch {
    await handle.browser.close().catch(() => undefined);
  }
  console.log('已关闭探测浏览器。');
}

async function cmdShot(opts) {
  const url = opts.url;
  if (!url) die('shot 需要 --url <URL>');
  const handle = await acquire();
  try {
    const page = await handle.context.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await sleep(Number(opts.wait ?? 1500));
    const file = opts.out ? path.resolve(ROOT, opts.out) : path.join(ROOT, '.probe', `shot-${Date.now()}.png`);
    mkdirSync(path.dirname(file), { recursive: true });
    await page.screenshot({ path: file });
    console.log(`已截图 → ${rel(file)}`);
  } finally {
    await release(handle);
  }
}

// ---------------------------------------------------------------- 入口

const USAGE = `用法：pnpm probe <命令> [选项]

  open [--no-ext]                        起探测浏览器（持久登录；关窗即退出）
  state export                           把当前登录导出到 .probe/mooc-session.json（Playwright storageState）
  state check                            核对导出文件与浏览器当前登录是否一致
  capture --url <URL> [--out <名字>]     抓取页面 → .probe/<名字>/
      [--wait <毫秒>] [--eval <代码>...]    产物：trace.har + page.html + console.jsonl + shot.png + scripts/
  har --dir <名字> --match <片段> [--out <文件>]
                                         从采集的 HAR 里取出匹配请求的响应体
  call --bean <Bean> --method <方法>     在页面上下文发 .rpc 请求（默认只放行只读方法）
      [--body <JSON|@文件>] [--allow-write]
  ext id | ext reload                    打印扩展 id / 重载扩展（要求探测浏览器在运行）
  shot --url <URL> [--out <文件>]        截图
  kill                                   关闭探测浏览器
`;

async function main() {
  const argv = process.argv.slice(2);
  const command = argv[0];
  const opts = parseArgs(argv);
  if (!command || opts.help || command === '--help') {
    console.log(USAGE);
    return;
  }

  switch (command) {
    case 'open':
      await cmdOpen(opts);
      break;
    case 'kill':
      await cmdKill();
      break;
    case 'shot':
      await cmdShot(opts);
      break;
    case 'capture':
      await capture(opts);
      break;
    case 'har':
      await harExtract(opts);
      break;
    case 'call':
      await rpcCall(opts);
      break;
    case 'ext':
      await extCommand(opts);
      break;
    case 'state': {
      const sub = argv[1];
      if (sub !== 'export' && sub !== 'check') die('state 的子命令：export | check');
      const handle = await acquire({ ext: false });
      try {
        if (sub === 'export') await stateExport(handle.context);
        else await stateCheck(handle.context);
      } finally {
        await release(handle);
      }
      break;
    }
    default:
      die(`未知命令：${command}\n\n${USAGE}`);
  }

  /*
   * 附着模式下（浏览器不是我们起的），连接会吊住事件循环——命令做完进程也不退。
   * 命令已经完成，直接退出；外部浏览器不受影响（自己起的那些由 release 负责关闭）。
   */
  if (usedAttach) {
    await sleep(50);
    process.exit(0);
  }
}

main().catch((error) => {
  console.error(String(error?.stack ?? error));
  process.exit(1);
});

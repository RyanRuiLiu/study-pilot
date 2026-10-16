#!/usr/bin/env node
/*
 * 探测工具（唯一入口）。
 *
 * 行业标准栈——浏览器驱动、登录态、流量取证三件事都交给成熟工具，本文件只负责
 * 把它们拼成本项目需要的样子：
 *
 *   浏览器      Playwright 管理的 Chromium（`pnpm exec playwright install chromium` 装一次）
 *   登录态      Playwright storageState → .probe/browser-session.json
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
 * 标准（Ryan 定，2026-10-17）：**调试一律走本工具**——找接口用 capture（真实页面的 HAR 是
 * 唯一事实源），调已知接口用 call（慕课 .rpc）/ zhs（智慧树，走包内签名与端点表）。
 * 不要为一次问题另写脚本：一次性脚本用完即删，要留下来的能力收进本文件或包内端点表。
 *
 * 用法：pnpm probe <命令>   （完整清单：pnpm probe --help）
 */
import { createHash, randomUUID } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import beautifyPkg from 'js-beautify';

const beautifyJs = beautifyPkg.js;
// 智慧树调试走包内签名客户端与端点表（相对路径导入：根 node_modules 没有 workspace 包；
// Node 24 原生剥类型，直接吃 .ts）。这也是「调试有标准」的一半：协议实现只有包内一份。
import {
  createZhsClient,
  ZHS_ENDPOINTS,
  BROWSER_USER_AGENT as ZHS_USER_AGENT,
} from '../../packages/platform-zhs/src/index.ts';

const ROOT = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));
const PROFILE = path.join(ROOT, '.probe', 'profile');
const SESSION = path.join(ROOT, '.probe', 'browser-session.json');
const API_DIR = path.join(ROOT, '.probe', 'api');
const EXT_DIR = path.join(ROOT, 'apps', 'extension', '.output', 'chrome-mv3');
/** 前端源码镜像目录：raw/ 原样、readable/ 格式化、INDEX.md 索引（本地查阅用） */
const SRC_DIR = path.join(ROOT, '.probe', 'mooc-src');

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
/** 智慧树的会话 cookie（与 platform-zhs/session.ts 同一判据：在、非空即已登录）。 */
const ZHS_AUTH_COOKIE = 'CASLOGC';
/**
 * 智慧树写端点登记表：调用它们默认被拦截，--allow-write 才放行。
 *
 * 名单是显式的（逐个点名比按名字前缀猜可靠——`queryCourse` 是读、
 * `saveStudyInterval` 是写，前缀根本分不出来）。新增写端点时在这里登记。
 *
 * **考试族（2026-10-17 补登）**：这四个当时漏了，`--list` 把它们印成「读」，
 * 于是交卷、建答卷这些不可逆的动作不需要 `--allow-write` 就能发出去。
 * 端点表只写 8 个的时候漏掉情有可原，加了整族再漏就是真缺口：
 *   `examDoHomework` 调用即建答卷（设计文档 §5：任何读取路径不得顺手开卷）；
 *   `examSaveAnswer` 逐题写入；`examSubmit` 即刻计分、不可撤销；
 *   `examApplyRedo` 消耗一次重做机会且分数覆盖原分数。
 * 余下的 `examHomeworkList` / `examLookHomework` / `examRedoNum` / `examIsObject`
 * 是纯读，不登记。
 */
const ZHS_WRITE_ENDPOINTS = new Set([
  'saveStudyInterval',
  'examDoHomework',
  'examSaveAnswer',
  'examSubmit',
  'examApplyRedo',
]);
/** 签名盐值与协议版本——出处是 packages/transport/src/sign.ts（按线上源码还原；
 * 本文件只用于慕课的 .rpc 调试；智慧树的签名在 packages/platform-zhs/src/sign.ts，是另一套协议）。 */
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
      if (key === 'no-ext' || key === 'allow-write' || key === 'help' || key === 'list') out[key] = true;
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
 * .probe/browser-session.json（导出的快照）。profile 丢了（重装、换机、被清）时
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

/** 智慧树登录判定：CASLOGC 在 zhihuishu 域上即已登录（与 platform-zhs/session.ts 同判据）。 */
function zhsLoggedIn(cookies) {
  return cookies.some(
    (c) => c.name === ZHS_AUTH_COOKIE && /(^|\.)zhihuishu\.com$/.test(String(c.domain)),
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
  const liveCookies = await context.cookies();
  const moocLive = await isLoggedIn(context);
  const zhsLive = zhsLoggedIn(liveCookies);
  console.log(`浏览器：慕课 ${moocLive ? '已登录' : '未登录'} ｜ 智慧树 ${zhsLive ? '已登录' : '未登录'}`);
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
  const live = liveCookies.filter((c) => /(^|\.)icourse163\.org$/.test(String(c.domain)));
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
  // 智慧树同一件事：导出文件里的 CASLOGC 与浏览器现值是否一致
  const zhsSaved = saved.cookies.filter((c) => c.name === ZHS_AUTH_COOKIE && /(^|\.)zhihuishu\.com$/.test(String(c.domain)));
  const zhsLiveValue = liveCookies.find((c) => c.name === ZHS_AUTH_COOKIE && /(^|\.)zhihuishu\.com$/.test(String(c.domain)));
  const zhsMismatch =
    zhsSaved.length > 0 && zhsLiveValue !== undefined && !zhsSaved.some((c) => c.value === zhsLiveValue.value);

  if (mismatched.length === 0 && !zhsMismatch) {
    console.log(`导出文件：两家都与浏览器一致（导出于 ${stamp}）`);
  } else {
    const names = [...mismatched, ...(zhsMismatch ? [ZHS_AUTH_COOKIE] : [])];
    console.log(`导出文件：与浏览器不一致（${names.join('、')}）——读接口回 null 的常见原因`);
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

// ---------------------------------------------------------------- 智慧树

/** 智慧树端点表一览：名字 / 方法 / 宿主 / 是否签名 / 读或写。 */
function zhsList() {
  console.log('智慧树端点表（packages/platform-zhs/src/endpoints.ts——签名接口的路径都写在那里）：\n');
  for (const [name, ep] of Object.entries(ZHS_ENDPOINTS)) {
    if (name === 'keyFetch') continue; // 取钥由客户端内部调用，不给人手调
    const signed = ep.module === undefined ? '免签' : `module ${ep.module}`;
    const kind = ZHS_WRITE_ENDPOINTS.has(name) ? '写（要 --allow-write）' : '读';
    console.log(`  ${name.padEnd(18)} ${ep.method.padEnd(4)} ${String(ep.host).padEnd(6)} ${signed.padEnd(10)} ${kind}`);
  }
}

/**
 * 调一个智慧树端点（Node 直发，走包内 createZhsClient：取钥、签名、节流都在包里）。
 *
 * 与慕课 call 的差别是实测事实：智慧树接受直连的签名请求（不需要页面来源，
 * 见 platform-zhs/policy/net-rules.ts），因此不用页面上下文——附着浏览器只为取
 * **活的** cookie（导出文件可能过期，正是 state check 要审的那件事）。cookie 只
 * 从浏览器内存读，不落盘；响应照 call 的惯例存 .probe/api/。
 */
async function zhsCall(opts) {
  const name = opts.endpoint;
  if (!name) die('zhs 需要 --endpoint <名字>（先 --list 看清单）');
  const ep = ZHS_ENDPOINTS[name];
  if (!ep) die(`端点表里没有「${name}」——新接口要先加进 packages/platform-zhs/src/endpoints.ts（--list 看现有清单）`);
  if (ZHS_WRITE_ENDPOINTS.has(name) && !opts['allow-write']) {
    die(
      `已拦截：${name} 是写端点（会改账号上的学习记录）。
` +
        '  确需写入时加 --allow-write，并确认该操作不可逆的后果可以接受。',
    );
  }
  const params = opts.params?.startsWith('@')
    ? JSON.parse(readFileSync(path.resolve(ROOT, opts.params.slice(1)), 'utf8'))
    : JSON.parse(opts.params ?? '{}');

  const handle = await acquire({ ext: false });
  try {
    const cookies = (await handle.context.cookies()).filter((c) =>
      /(^|\.)zhihuishu\.com$/.test(String(c.domain)),
    );
    if (cookies.length === 0) die('浏览器里没有 zhihuishu 的 cookie——先在探测浏览器里登录智慧树');
    // 同名取域最宽的一份（与 CLI host.ts 同一口径；浏览器发送顺序的近似）
    const byName = new Map();
    for (const c of cookies) {
      const prev = byName.get(c.name);
      if (!prev || String(c.domain).length < String(prev.domain).length) byName.set(c.name, c);
    }
    const cookieHeader = [...byName.values()].map((c) => `${c.name}=${c.value}`).join('; ');

    const client = createZhsClient({
      fetch: async (url, init = {}) => {
        const headers = new Headers(init.headers);
        headers.set('cookie', cookieHeader);
        headers.set('user-agent', ZHS_USER_AGENT);
        return await fetch(url, { ...init, headers });
      },
    });

    const started = Date.now();
    let body;
    let rejected = null;
    try {
      body = await client.call(name, params);
    } catch (error) {
      rejected = error; // 拒绝也是调试事实（-12 门、-1 解码错…）：照常打印并归档
      body = null;
    }
    const elapsed = Date.now() - started;

    mkdirSync(API_DIR, { recursive: true });
    const file = path.join(API_DIR, `zhs-${name}.${Date.now()}.json`);
    writeFileSync(
      file,
      JSON.stringify(
        {
          requestedAt: new Date().toISOString(),
          endpoint: name,
          path: ep.path,
          params,
          rejected: rejected === null ? null : { code: rejected.code ?? null, message: rejected.message },
          response: body,
        },
        null,
        2,
      ),
    );

    if (rejected !== null) {
      console.log(`被拒：${name}（${ep.method} ${ep.path}，${elapsed} ms）`);
      console.log(`code=${rejected.code ?? '-'}  message=${rejected.message}`);
      console.log(`已保存 → ${rel(file)}`);
      process.exitCode = 1;
      return;
    }
    console.log(`OK：${name}（${ep.method} ${ep.path}，${elapsed} ms）`);
    console.log(`code=${body?.code ?? '-'}  message=${body?.message ?? ''}`);
    console.log(`响应大小：${JSON.stringify(body ?? null).length} 字符`);
    console.log(`已保存 → ${rel(file)}`);
  } finally {
    await release(handle);
  }
}

// ---------------------------------------------------------------- 源码镜像

/**
 * 前端源码镜像：把 mooc 全站的前端 bundle 一次拉全、格式化、建索引。
 *
 * 目的与标准：要「服务端或源码说了算」时，得能方便地读源码（2026-10-17 Ryan 定）。
 * 一次性脚本不许留在仓库，所以这件事做成本工具的一条正式命令。
 *
 * 覆盖（每次 fetch 全量核对，已下载的不重复拉）：
 *   · /rc/bootstraps/main/bootstrap.js —— SPA 的分块清单，里面列出主应用全部分块；
 *   · --url 给的页面（可多次）——页面引用的脚本（学习页的 core / pt_learn 等）；
 *   · 默认补上首页。
 * 产物：
 *   .probe/mooc-src/raw/<扁平化文件名>        原样（带哈希名，可核对）
 *   .probe/mooc-src/readable/<去哈希名>.js    格式化
 *   .probe/mooc-src/INDEX.md                  来源 URL → 文件，以及关键标记 → 哪些文件命中
 */
/** 出站请求的常规浏览器 UA（与 packages/transport/src/user-agent.ts 同一口径）。 */
const SRC_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';

const SRC_MARKERS = [
  'saveDraftAnswers', 'submitAnswers', 'getOpenQuizPaperDto', 'getQuestionListByTermId',
  'mocQuizRpcBean', 'mocHomeworkRpcBean', 'getLessonUnitLearnVo', 'saveMocContentLearn',
  'TYPE_OBJECTIVE', 'TYPE_SUBJECTIVE', 'ANALYSE_AFTER', 'isNeedAuth',
];

const flattenName = (url) => url.replace(/^https?:\/\//, '').replace(/[^A-Za-z0-9._-]+/g, '_');
const readableNameOf = (flat) => flat.replace(/_[0-9a-f]{8,}(?=\.js$)/gi, '').replace(/^_+/, '');

/** 按域取 cookie：目标是哪个域就只发哪个域的（跨域大礼包会被 CDN/WAF 拒）。 */
function cookiesForHost(entries, host) {
  return entries
    .filter((c) => {
      const domain = String(c.domain ?? '').toLowerCase().replace(/^\./, '');
      return domain !== '' && (host === domain || host.endsWith(`.${domain}`));
    })
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');
}

async function srcCollect(cookieEntries, pages) {
  const urls = new Set();
  const addFromText = (text) => {
    for (const m of text.matchAll(/["'(]([^"')]*?\.js)(?:\?[^"')]*)?["')]/g)) {
      const raw = m[1];
      if (!raw || !/mc\.stu\.126\.net|cmc\.stu\.126\.net|edu-cms\.nosdn/.test(raw)) continue;
      const abs = raw.startsWith('//') ? `https:${raw}` : raw;
      if (abs.endsWith('.js')) urls.add(abs.split('?')[0]);
    }
  };
  const fetchText = async (url) => {
    const host = new URL(url).host;
    const cookie = cookiesForHost(cookieEntries, host);
    const res = await fetch(url, {
      headers: {
        ...(cookie === '' ? {} : { cookie }),
        'user-agent': SRC_USER_AGENT,
        referer: 'https://www.icourse163.org/',
      },
    });
    return res.status === 200 ? await res.text() : '';
  };

  const bootstrap = await fetchText('https://mc.stu.126.net/rc/bootstraps/main/bootstrap.js');
  if (bootstrap === '') throw new Error('bootstrap 拉不下来（CDN 可达性？）');
  mkdirSync(path.join(SRC_DIR, 'raw'), { recursive: true });
  writeFileSync(path.join(SRC_DIR, 'raw', 'bootstrap.js'), bootstrap);
  addFromText(bootstrap);

  for (const page of pages) {
    const html = await fetchText(page);
    if (html !== '') addFromText(html);
  }
  return urls;
}

async function srcFetch(opts) {
  const cookieEntries = (() => {
    try {
      const saved = JSON.parse(readFileSync(SESSION, 'utf8'));
      return (saved.cookies ?? []).filter((c) => typeof c?.name === 'string' && typeof c?.value === 'string');
    } catch {
      return [];
    }
  })();

  const pages = [];
  for (let i = 0; i < process.argv.length; i++) {
    if (process.argv[i] === '--url' && process.argv[i + 1]) pages.push(process.argv[i + 1]);
  }
  if (pages.length === 0) pages.push('https://www.icourse163.org/');

  console.log(`收集脚本清单（bootstrap + ${pages.length} 个页面）…`);
  const urls = await srcCollect(cookieEntries, pages);
  console.log(`发现脚本 ${urls.size} 个`);

  mkdirSync(path.join(SRC_DIR, 'raw'), { recursive: true });
  mkdirSync(path.join(SRC_DIR, 'readable'), { recursive: true });
  const rows = [];
  let downloaded = 0;
  let beautified = 0;
  for (const url of [...urls].sort()) {
    const flat = flattenName(url);
    const rawPath = path.join(SRC_DIR, 'raw', flat);
    const readable = readableNameOf(flat);
    const readablePath = path.join(SRC_DIR, 'readable', readable);
    try {
      if (!existsSync(rawPath) || opts.refetch) {
        const res = await fetch(url, { headers: { 'user-agent': SRC_USER_AGENT } });
        if (res.status !== 200) { rows.push({ url, note: `HTTP ${res.status}` }); continue; }
        writeFileSync(rawPath, await res.text());
        downloaded += 1;
      }
      if (!existsSync(readablePath) || opts.refetch) {
        writeFileSync(readablePath, beautifyJs(readFileSync(rawPath, 'utf8'), { indent_size: 2, max_preserve_newlines: 2 }));
        beautified += 1;
      }
      rows.push({ url, readable: rel(readablePath), size: statSync(rawPath).size });
      process.stdout.write('.');
    } catch (error) {
      rows.push({ url, note: String(error).slice(0, 80) });
    }
  }
  console.log(`\n新下载 ${downloaded}，新格式化 ${beautified}`);

  const markerMap = new Map(SRC_MARKERS.map((m) => [m, []]));
  for (const row of rows) {
    if (!row.readable) continue;
    const text = readFileSync(path.join(ROOT, row.readable), 'utf8');
    for (const marker of SRC_MARKERS) if (text.includes(marker)) markerMap.get(marker).push(path.basename(row.readable));
  }

  const index = [
    '# mooc 前端源码镜像（pnpm probe src fetch 生成）',
    '',
    `更新时间：${new Date().toISOString()}｜文件 ${rows.filter((r) => r.readable).length} 个`,
    '',
    '怎么查：在 readable/ 里按关键词搜（或 `pnpm probe src grep <关键词>`）——',
    'rpc 接口名、常量名、界面文案都能直接搜到，行号与页面源码一一对应（已格式化）。',
    '',
    '## 关键标记 → 文件',
    '',
    ...SRC_MARKERS.map((m) => `- \`${m}\` → ${markerMap.get(m).slice(0, 6).join('、') || '（未命中）'}`),
    '',
    '## 来源 URL → 文件',
    '',
    '| URL | readable | 字节 |',
    '|---|---|---|',
    ...rows.map((r) => (r.note ? `| ${r.url} | ${r.note} | - |` : `| ${r.url} | ${r.readable} | ${r.size} |`)),
    '',
  ].join('\n');
  writeFileSync(path.join(SRC_DIR, 'INDEX.md'), index);
  console.log(`索引写好：${rel(path.join(SRC_DIR, 'INDEX.md'))}`);
}

function srcGrep(opts) {
  const keyword = opts._?.[2] ?? opts.keyword;
  if (!keyword) die('src grep 需要关键词：pnpm probe src grep <关键词>');
  const dir = path.join(SRC_DIR, 'readable');
  if (!existsSync(dir)) die('还没有镜像：先跑 pnpm probe src fetch');
  let shown = 0;
  for (const file of readdirSync(dir)) {
    const lines = readFileSync(path.join(dir, file), 'utf8').split('\n');
    for (let i = 0; i < lines.length && shown < 40; i++) {
      if (lines[i].includes(keyword)) {
        console.log(`${file}:${i + 1}: ${lines[i].trim().slice(0, 200)}`);
        shown += 1;
      }
    }
  }
  if (shown === 0) console.log('（readable/ 里没有命中）');
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
  state export                           把当前登录导出到 .probe/browser-session.json（Playwright storageState）
  state check                            核对导出文件与浏览器当前登录是否一致
  capture --url <URL> [--out <名字>]     抓取页面 → .probe/<名字>/
      [--wait <毫秒>] [--eval <代码>...]    产物：trace.har + page.html + console.jsonl + shot.png + scripts/
  har --dir <名字> --match <片段> [--out <文件>]
                                         从采集的 HAR 里取出匹配请求的响应体
  call --bean <Bean> --method <方法>     在页面上下文发 .rpc 请求（默认只放行只读方法）
      [--body <JSON|@文件>] [--allow-write]
  src fetch [--url <页面>...] [--refetch]  下载 mooc 全站前端源码 → .probe/mooc-src/
                                          （raw/ 原样 + readable/ 格式化 + INDEX.md 索引）
  src grep <关键词>                        在镜像的 readable/ 里搜（文件名:行号）
  zhs --list                             智慧树端点表（名字 / 方法 / 宿主 / 是否签名 / 读或写）
  zhs --endpoint <名字>                  调智慧树接口（Node 直发，走包内签名；附着浏览器取活 cookie）
      [--params '<JSON>|@文件'] [--allow-write]
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
    case 'src': {
      const sub = argv[1] === 'grep' ? 'grep' : 'fetch';
      if (sub === 'grep') srcGrep(opts);
      else await srcFetch(opts);
      break;
    }
    case 'zhs':
      if (opts.list) zhsList();
      else await zhsCall(opts);
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

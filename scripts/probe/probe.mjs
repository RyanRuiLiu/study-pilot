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
// 下载源码用的 UA 也取自正源（相对路径 + .ts，同上）。这里曾自己抄了一份逐字节相同的串：
// UA 要跟着真实浏览器版本走，两处各改必然漂移，而漂移的表现是平台按 UA 把我们认成非浏览器。
import { BROWSER_USER_AGENT as SRC_USER_AGENT } from '../../packages/transport/src/user-agent.ts';
// 慕课的签名件同样取自正源；本脚本只做 .rpc 调试。
// 智慧树的签名是另一套协议，在 packages/platform-zhs/src/sign.ts。
import {
  JSON_CONTENT_TYPE,
  SIGN_SALT,
  SIGN_SYSTEM,
} from '../../packages/transport/src/sign.ts';

const ROOT = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));
const PROFILE = path.join(ROOT, '.probe', 'profile');
const SESSION = path.join(ROOT, '.probe', 'browser-session.json');
const API_DIR = path.join(ROOT, '.probe', 'api');
const EXT_DIR = path.join(ROOT, 'apps', 'extension', '.output', 'chrome-mv3');
/** 前端源码镜像目录：raw/ 原样、readable/ 格式化、INDEX.md 索引（本地查阅用） */
const SRC_DIR = path.join(ROOT, '.probe', 'mooc-src');

const ORIGIN = 'https://www.icourse163.org';
/**
 * 探测浏览器的调试端口。端口本身不可信，attach 前核实对端身份（见 attach()）。
 *
 * 默认 9222；同一台机器上并行跑多个会话/工作区时用环境变量 STUDY_PILOT_PROBE_PORT
 * 分开——项目里的环境变量统一带 STUDY_PILOT_ 前缀（另有 STUDY_PILOT_PROFILE 与
 * STUDY_PILOT_LIVE），不带前缀的名字容易和别处撞。
 * 每个工作区一个端口、各自一份 profile 与登录快照。实测（2026-10-17）：两路会话
 * 都开探针时后开的抢不到端口，看到的会是对方 profile 里的浏览器（登录态对不上）。
 * 归属校验照旧：attach 前必须对得上本工作区的归属标记，不同 profile 的实例不会被误用。
 */
const CDP_PORT = Number(process.env.STUDY_PILOT_PROBE_PORT ?? 9222);
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
/** 只读方法前缀白名单：写方法直接拦截，这是硬约束不是建议（账号数据不可逆）。 */
const READONLY_PREFIXES = ['get', 'list', 'search', 'query', 'has', 'is', 'can', 'check', 'page', 'find'];

const rel = (p) => path.relative(ROOT, p) || '.';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function die(message) {
  console.error(message);
  process.exit(1);
}

/**
 * `--out` 的落点：夹在 .probe/ 内。capture / har / shot 三条命令共用这一条判据，
 * 不要各自再写一份规则。
 *
 * 为什么要夹：这三样产物是**带账号数据**的东西（真实响应体、登录后的页面截图），
 * 而 .gitignore 只忽略 .probe/ 等固定路径——落在外面等于把账号数据写到会被 git
 * 跟踪的路径上，一次 `git add -A` 就进版本库。
 *
 * 判据：两种写法都认——裸名字按老习惯相对仓库根解析，解析后仍在 `.probe/` 内才放行；
 * 写成 `.probe/xxx` 的（har 的老用法就是这么用的）保持原地，不要再套一层 `.probe/.probe/`。
 * 绝对路径或 `..` 越界一律拒绝（不给悄悄改路径的余地）。
 */
function probeOutPath(name, command) {
  const probeDir = path.resolve(ROOT, '.probe');
  const withinProbe = (target) => {
    const within = path.relative(probeDir, target);
    return !(within === '' || within === '..' || within.startsWith(`..${path.sep}`) || path.isAbsolute(within));
  };
  // 先按仓库根解：`.probe/x.json` 这种写法就该落在原地
  const target = [path.resolve(ROOT, name), path.resolve(probeDir, name)].find(withinProbe);
  if (target === undefined) {
    die(
      `${command} 的 --out「${name}」会落在 ${rel(probeDir)}/ 之外，已拒绝写入。\n` +
        `  产物带账号数据，而 .gitignore 只忽略 ${rel(probeDir)}/——落在外面就是可被 git 跟踪的路径。\n` +
        `  改成 ${rel(probeDir)}/ 内的相对路径，或不给 --out（默认本来就落在 ${rel(probeDir)}/ 里）。`,
    );
  }
  return target;
}

// ---------------------------------------------------------------- 参数解析

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (token.startsWith('--')) {
      const key = token.slice(2);
      if (
        key === 'no-ext' ||
        key === 'allow-write' ||
        key === 'help' ||
        key === 'list' ||
        key === 'check' ||
        key === 'preview'
      )
        out[key] = true;
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
   * 各消费方自己按域选：stateCheck 只看 icourse163，命令行按域过滤
   * （packages/adapters-node/src/session-file.ts）。
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
  const outDir = probeOutPath(opts.out ?? `capture-${Date.now()}`, 'capture');

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
    const target = probeOutPath(opts.out, 'har');
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
      System: SIGN_SYSTEM,
      'Auth-Signature': signature,
      'Content-Type': JSON_CONTENT_TYPE,
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
      `已拦截：${name} 是写端点（会改账号上的学习记录）。\n` +
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
    // 同名取域最宽的一份（与 adapters-node 的 session-file.ts 同一口径；浏览器发送顺序的近似）
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
/** 出站请求的常规浏览器 UA 见文件头：取自 packages/transport/src/user-agent.ts（`SRC_USER_AGENT`）。 */

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
  // --out 先验后开浏览器：越界就当场拒绝，不必为一条注定失败的命令弹窗口、把带登录态的页面加载一遍。
  // 缺省路径仍在截图前才定（时间戳含义不变）。
  const outTarget = opts.out ? probeOutPath(opts.out, 'shot') : null;
  const handle = await acquire();
  try {
    const page = await handle.context.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await sleep(Number(opts.wait ?? 1500));
    const file = outTarget ?? path.join(ROOT, '.probe', `shot-${Date.now()}.png`);
    mkdirSync(path.dirname(file), { recursive: true });
    await page.screenshot({ path: file });
    console.log(`已截图 → ${rel(file)}`);
  } finally {
    await release(handle);
  }
}

// ---------------------------------------------------------------- 扩展图标

/*
 * 生成并核对扩展图标（pnpm probe icon）。
 *
 * 为什么生成脚本在本文件里，而不是另起一个一次性脚本
 * -------------------------------------------------
 * 图标是跟着主题走的产物：主题改一次，五个尺寸都得重出。上一版生成脚本
 * （make-icons.mjs）被当作一次性脚本删掉之后，图标就成了没有源文件的二进制——
 * 主题从墨绿换成群青时它没跟上，而脚本里那句「与 tokens.css 的 --accent 一致」
 * 的注释早已不成立（2026-10-17 照这条线索查出）。收进本文件，改主题后跑一次即可。
 *
 * manifest 图标全满幅，商店上传图单独出
 * ----------------------------------
 * 清单里的 16/32/48/96/128 全部铺满画布：它们分别用于工具栏、扩展管理页与
 * 安装弹窗，浏览器不替它们补边框或投影；给其中一张留白，它在同排图标里就会
 * 小一圈（2026-10-21 Ryan 指出的正是 128 那一张）。
 *
 * Chrome 商店列表的图片规范（图形 96x96 + 四周各 16px 透明留白）管的是**上传
 * 到商店的那张 128**，不是 manifest 里的 128。两者因此拆开：manifest 用满幅的
 * public/icon/128.png；商店上传用 .output/store/store-icon-128.png（按 96+16
 * 留白生成）。Edge 加载项的商店 logo 建议 300x300（1:1），生成
 * store-icon-300.png（满幅）。
 *
 * 色值与字体从 tokens.css 现读
 * ---------------------------
 * 不在本文件重抄。手抄必然对不上——上一版就是这么漂的。现读之后，「图标用的是
 * 主题色与主题字体」由机制保证，不再由注释保证（tokens.ts 与 tokens-parity.test.ts
 * 治的是同一个病）。
 */

/** 扩展图标目录。WXT 的约定：public/icon/ 下的 PNG 自动进清单的 icons。 */
const ICON_DIR = path.join(ROOT, 'apps', 'extension', 'public', 'icon');
/**
 * 出这几个尺寸。Chrome 文档给的用途：16 扩展页面的图标与右键菜单、32 Windows
 * 工具栏、48 扩展管理页、128 安装弹窗与商店。96 不在 Chrome 那张表里，是 WXT
 * 约定的补充尺寸（其他 Chromium 浏览器与高分屏用）。
 */
const ICON_SIZES = [16, 32, 48, 96, 128];
/** 主画布。各尺寸都由它逐级折半缩出，五个尺寸保证是同一个形状（主画布始终满幅）。 */
const ICON_MASTER_SIZE = 1024;
/**
 * manifest 图标全部满幅（理由见本节开头）。商店上传图的留白在 STORE_ICON_SPECS
 * 里单独给，不混进清单。
 */
const ICON_CONTENT_RATIOS = { 16: 1, 32: 1, 48: 1, 96: 1, 128: 1 };

/**
 * 商店上传图（不进 manifest）：
 *   128  0.75  Chrome 商店列表图标：图形 96x96 + 四周各 16px 透明留白
 *   300  1     Edge 加载项商店 logo（1:1，建议 300x300），满幅
 */
const STORE_ICON_SPECS = [
  { size: 128, ratio: 0.75 },
  { size: 300, ratio: 1 },
];
/** 圆角占图形的比例。0.22 是应用图标的通行比例（iOS 的连续圆角为 22.37%）。 */
const ICON_RADIUS_RATIO = 0.22;
/**
 * 字母字号占图形的比例，沿用原图标（0.62 × 方块）。
 *
 * 试过 0.76：16px 更清楚，但 128 显得挤，也与原图标的比例断了。新主题的语体是
 * 靠留白、更安静，0.62 更贴。要换只改这一个数（对照图：pnpm probe icon --preview）。
 */
const ICON_LETTER_RATIO = 0.62;
/** 图形上的字母：品牌首字母。 */
const ICON_LETTER = 'S';

/**
 * 从 tokens.css 现读品牌色与字体。
 *
 * 读不到就失败，不退回一个编出来的值：图标是提交进仓库的正式产物，
 * 「某个色」比「主题色」危险得多。
 */
function readBrandTokens() {
  const css = readFileSync(path.join(ROOT, 'apps/extension/src/ui/tokens.css'), 'utf8');
  const pick = (name) => {
    const found = css.match(new RegExp(`${name}:\\s*([^;]+);`));
    if (!found?.[1]) die(`tokens.css 里没有 ${name}，图标无从取色`);
    return found[1].replace(/\s+/g, ' ').trim();
  };
  return {
    accent: pick('--accent'),
    onAccent: pick('--on-accent'),
    font: pick('--font'),
    paper: pick('--paper'),
    paper2: pick('--paper-2'),
    ink: pick('--ink'),
    inkSoft: pick('--ink-soft'),
    inkFaint: pick('--ink-faint'),
    textSm: pick('--text-sm'),
    textMd: pick('--text-md'),
  };
}

/**
 * 起一只**无头**浏览器，给按尺寸出图与量图的命令用（图标、商店素材）。
 *
 * 不走 acquire()：那只带登录 profile、且有窗口是给人看的（见 launch 的注释），
 * 画图与量图两样都不需要——为一块 canvas 弹出窗口，看起来像出事了。
 */
async function withCanvasPage(run) {
  const browser = await chromium.launch({ headless: true });
  try {
    return await run(await browser.newPage());
  } finally {
    await browser.close();
  }
}

async function cmdIcon(opts) {
  const brand = readBrandTokens();
  const dir = opts.dir ? path.resolve(ROOT, opts.dir) : ICON_DIR;
  await withCanvasPage(async (page) => {
    if (!opts.check) await drawIcons(page, dir, brand);
    await checkIcons(page, dir, brand);
    if (opts.preview) await previewIcons(page, dir, brand);
  });
}

/**
 * 在页面里画主画布、缩出各尺寸，写进目录。
 *
 * 默认出 manifest 的那五张；商店上传图用 options 指定尺寸、留白比例与文件名，
 * 两者共用同一份绘制（字母对齐、字体判定、逐级缩放都只写一遍）。
 */
async function drawIcons(page, dir, brand, options = {}) {
  const sizes = options.sizes ?? ICON_SIZES;
  const ratios = options.ratios ?? ICON_CONTENT_RATIOS;
  const nameFor = options.nameFor ?? ((size) => `${size}.png`);
  const drawn = await page.evaluate(
    async ({ brand, letter, masterSize, sizes, ratios, radiusRatio, letterRatio }) => {
      const blank = (w, h) => {
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        return canvas;
      };
      const smoothDraw = (source, size) => {
        const canvas = blank(size, size);
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(source, 0, 0, size, size);
        return canvas;
      };

      /*
       * 主画布始终满幅：留白是**缩放时**按尺寸补的，不是在主画布上留。
       * 这样同一个形状只画一遍，各尺寸的留白比例可以各不相同而不必各画一遍。
       */
      const master = blank(masterSize, masterSize);
      const ctx = master.getContext('2d');
      const content = masterSize;
      const offset = 0;
      const center = masterSize / 2;

      ctx.fillStyle = brand.accent;
      ctx.beginPath();
      ctx.roundRect(offset, offset, content, content, content * radiusRatio);
      ctx.fill();

      /*
       * 字母按**墨迹范围**定位，不用 textBaseline: 'middle'，也不用 textAlign
       * 默认的中心：那两个对的是字体度量线和字宽，而字母的墨迹在两条轴上都不对称
       * （旧版实测垂直方向偏上，128 的图里偏 6px）。actualBoundingBox* 给的是墨迹
       * 四边相对对齐点的距离，用它把墨迹中心压到方块中心。
       */
      const fontSize = Math.round(content * letterRatio);
      ctx.font = `700 ${fontSize}px ${brand.font}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      const ink = ctx.measureText(letter);
      ctx.fillStyle = brand.onAccent;
      ctx.fillText(
        letter,
        center - (ink.actualBoundingBoxRight - ink.actualBoundingBoxLeft) / 2,
        center + (ink.actualBoundingBoxAscent - ink.actualBoundingBoxDescent) / 2,
      );

      /*
       * 报出真正生效的是字体栈里的哪一族。图标是提交进仓库的二进制，换一台机器
       * 重生成时字形可能就变了（栈里的 HarmonyOS Sans SC / MiSans / PingFang SC
       * 多数机器都没装），所以把它报出来，而不是假设。
       * 判法：逐族把候选字体与 monospace 并排量同一个字母，宽度不同即该族存在。
       */
      const families = brand.font.split(',').map((part) => part.trim().replace(/^['"]|['"]$/g, ''));
      const probe = blank(8, 8).getContext('2d');
      probe.font = `700 ${fontSize}px monospace`;
      const monoWidth = probe.measureText(letter).width;
      const resolved =
        families.find((family) => {
          probe.font = `700 ${fontSize}px "${family}", monospace`;
          return Math.abs(probe.measureText(letter).width - monoWidth) > 0.01;
        }) ?? '(栈里的字体都没装，落到浏览器默认无衬线)';

      const out = {};
      for (const size of sizes) {
        const ratio = ratios[size] ?? 1;
        const art = Math.round(size * ratio);
        // 逐级折半再落到目标尺寸：一次缩 64 倍会糊，折半的滤波是可证的
        let current = master;
        let dim = masterSize;
        while (dim % 2 === 0 && dim / 2 >= art) {
          dim /= 2;
          current = smoothDraw(current, dim);
        }
        /*
         * 折半到比目标还小（例如 300 会停在 256）时从主画布直接缩到目标，
         * 不拿 256 往上放——放大插值只会糊，主画布足够大、缩一次是清楚的。
         */
        if (dim !== art) current = smoothDraw(dim < art ? master : current, art);

        if (art === size) {
          out[size] = current.toDataURL('image/png');
          continue;
        }
        // 要留白：把图形贴到 size 见方的透明画布正中（透明是关键——深色工具栏上
        // 才透出底色，而不是一块白方块；旧脚本的注释里记过这个坑）
        const canvas = blank(size, size);
        const ctx2 = canvas.getContext('2d');
        ctx2.imageSmoothingEnabled = true;
        ctx2.imageSmoothingQuality = 'high';
        const pad = Math.round((size - art) / 2);
        ctx2.drawImage(current, pad, pad, art, art);
        out[size] = canvas.toDataURL('image/png');
      }
      return { out, resolved, fontSize };
    },
    {
      brand,
      letter: ICON_LETTER,
      masterSize: ICON_MASTER_SIZE,
      sizes,
      ratios,
      radiusRatio: ICON_RADIUS_RATIO,
      letterRatio: ICON_LETTER_RATIO,
    },
  );

  console.log(`主题色 ${brand.accent}／字母色 ${brand.onAccent}（现读 tokens.css）`);
  console.log(`主画布 ${ICON_MASTER_SIZE}（满幅），字母 ${drawn.fontSize}px`);
  console.log(`字母实际字体：${drawn.resolved}`);

  mkdirSync(dir, { recursive: true });
  for (const size of sizes) {
    const base64 = drawn.out[size].replace(/^data:image\/png;base64,/, '');
    const file = nameFor(size);
    if (!base64) die(`${file} 没画出来`);
    writeFileSync(path.join(dir, file), Buffer.from(base64, 'base64'));
  }
  console.log(`已写入 ${rel(dir)}`);
}

/**
 * 在页面里量一张 PNG（浏览器侧执行，不得引用本文件的任何东西）。
 *
 * colors 是「名字 → 十六进制色」，tolerances 是每个颜色的容差。返回尺寸、不透明与
 * 纯透明像素数、不透明像素的范围、四角像素，以及每个颜色的像素数与包围盒。
 * 图标与商店磁贴共用这一份量法：两边要验的东西不同，量法不必各写一遍。
 * 一像素只归一色，所以颜色按「谁更特别谁在前」排（浅色之间容差要留得下区别）。
 *
 * box 给定时**只有颜色的计数**限定在这块区域里，尺寸/透明度/范围/四角仍是整幅的。
 * 需要它是因为：磁贴的白底（--paper-2）与图标字母（--on-accent）都是 #ffffff，
 * 按颜色分不出「字母画上了」——把计数限定在标记方块内部才问得出这个问题。
 */
function measurePng({ dataUrl, colors, tolerances, box }) {
  const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const near = (r, g, b, target, tolerance) =>
    Math.abs(r - target[0]) <= tolerance &&
    Math.abs(g - target[1]) <= tolerance &&
    Math.abs(b - target[2]) <= tolerance;

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onerror = () => reject(new Error('PNG 解不开'));
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(image, 0, 0);
      const { width, height } = canvas;
      const { data } = ctx.getImageData(0, 0, width, height);

      const targets = Object.entries(colors).map(([name, hex]) => ({
        name,
        rgb: rgb(hex),
        tolerance: tolerances[name],
      }));
      const stats = {};
      for (const target of targets) {
        stats[target.name] = { pixels: 0, left: width, top: height, right: -1, bottom: -1 };
      }

      let opaque = 0;
      let transparent = 0;
      const bounds = { left: width, top: height, right: -1, bottom: -1 };

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;
          const alpha = data[i + 3];
          if (alpha === 0) {
            transparent++;
            continue;
          }
          opaque++;
          bounds.left = Math.min(bounds.left, x);
          bounds.top = Math.min(bounds.top, y);
          bounds.right = Math.max(bounds.right, x);
          bounds.bottom = Math.max(bounds.bottom, y);
          if (alpha < 200) continue; // 抗锯齿的半透明边，算不进任何一色
          if (box && (x < box.left || x > box.right || y < box.top || y > box.bottom)) continue;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          for (const target of targets) {
            if (!near(r, g, b, target.rgb, target.tolerance)) continue;
            const box = stats[target.name];
            box.pixels++;
            box.left = Math.min(box.left, x);
            box.top = Math.min(box.top, y);
            box.right = Math.max(box.right, x);
            box.bottom = Math.max(box.bottom, y);
            break;
          }
        }
      }

      const pixelAt = (x, y) => Array.from(data.slice((y * width + x) * 4, (y * width + x) * 4 + 4));
      resolve({
        width,
        height,
        opaque,
        transparent,
        bounds,
        colors: stats,
        corners: [pixelAt(0, 0), pixelAt(width - 1, 0), pixelAt(0, height - 1), pixelAt(width - 1, height - 1)],
      });
    };
    image.src = dataUrl;
  });
}

/** 某个颜色的包围盒中心相对整幅中心的偏移（像素）。 */
function boxOffset(box, m) {
  return {
    x: (box.left + box.right + 1) / 2 - m.width / 2,
    y: (box.top + box.bottom + 1) / 2 - m.height / 2,
  };
}

/** 一个 [r,g,b] 与一个十六进制色在容差内是否算同色（量回来的像素与 token 比对）。 */
function sameColor(rgb, hex, tolerance) {
  const target = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return rgb.every((channel, index) => Math.abs(channel - target[index]) <= tolerance);
}

/** 判据。每条都对着本节开头要的那件事，凑合过去的核对等于没有核对。 */
function judgeIcon(size, m, contentRatio) {
  const problems = [];
  if (m.width !== size || m.height !== size) {
    problems.push(`尺寸是 ${m.width}x${m.height}，应为 ${size}x${size}`);
  }
  /*
   * 图形范围必须正好落在该尺寸**该有的**那一圈里：满幅尺寸顶到四条边，128 则
   * 是四周各留 16 像素。这条同时管住「尺寸对不上」与「留白比例不对」。
   */
  const art = Math.round(size * contentRatio);
  const pad = Math.round((size - art) / 2);
  const { left, top, right, bottom } = m.bounds;
  const expected = `${pad}..${pad + art - 1}`;
  if (left !== pad || top !== pad || right !== pad + art - 1 || bottom !== pad + art - 1) {
    problems.push(
      `图形范围 x ${left}..${right} / y ${top}..${bottom}，应为 ${expected}` +
        `（图形占画布 ${(contentRatio * 100).toFixed(0)}%）`,
    );
  }
  // 圆角：四个角必须透明，否则画出来是方块
  if (m.corners.some((corner) => corner[3] !== 0)) {
    problems.push(`四角不透明（alpha ${m.corners.map((c) => c[3]).join('/')}），圆角没生效`);
  }
  // 主体是主题色：底色占不透明像素的绝大多数
  const accentRatio = m.colors.accent.pixels / m.opaque;
  if (accentRatio < 0.5) {
    problems.push(`主题色只占不透明像素的 ${(accentRatio * 100).toFixed(1)}%，不像底色`);
  }
  // 字母画上了，且墨迹居中
  const letter = m.colors.letter;
  const offset = boxOffset(letter, m);
  if (letter.pixels === 0) {
    problems.push('找不到字母的像素');
  } else if (Math.abs(offset.x) > 1 || Math.abs(offset.y) > 1) {
    // 容差 1px：墨迹边缘在缩图时落到哪个像素由取整决定，这是栅格化的下限
    problems.push(`字母没居中：中心偏 ${offset.x.toFixed(1)} / ${offset.y.toFixed(1)} px`);
  }
  return { problems, accentRatio, offset };
}

/** 读一张图并量它。图标与商店磁贴都要走这一步。 */
async function measureFile(page, file, colors, tolerances, box = null) {
  const dataUrl = `data:image/png;base64,${readFileSync(file).toString('base64')}`;
  return page.evaluate(measurePng, { dataUrl, colors, tolerances, box });
}

/**
 * 核对目录里的图标：把文件读回来逐像素量。
 *
 * 量的是「说了什么就验什么」，不是「命令没报错就算对」。在页面上量而不在 Node 里
 * 解 PNG：浏览器本来就认 PNG，不必为此引一个解码器。
 */
async function checkIcons(page, dir, brand, options = {}) {
  const sizes = options.sizes ?? ICON_SIZES;
  const ratios = options.ratios ?? ICON_CONTENT_RATIOS;
  const nameFor = options.nameFor ?? ((size) => `${size}.png`);

  console.log(`\n核对 ${rel(dir)}：`);
  let failed = 0;
  for (const size of sizes) {
    const filename = nameFor(size);
    const file = path.join(dir, filename);
    if (!existsSync(file)) {
      console.log(`  ✗ ${filename} 缺失`);
      failed++;
      continue;
    }
    const measured = await measureFile(
      page,
      file,
      { accent: brand.accent, letter: brand.onAccent },
      { accent: 12, letter: 24 },
    );
    const contentRatio = ratios[size] ?? 1;
    const { problems, accentRatio, offset } = judgeIcon(size, measured, contentRatio);
    // 字母墨迹高度：判断工具栏上认不认得出，看的就是这个数（图形范围只是前提）
    const letterBox = measured.colors.letter;
    const letterInk = letterBox.pixels > 0 ? letterBox.bottom - letterBox.top + 1 : 0;
    console.log(
      [
        `  ${problems.length === 0 ? '✓' : '✗'} ${filename}`,
        `图形 ${measured.bounds.left}..${measured.bounds.right}（占 ${(contentRatio * 100).toFixed(0)}%）`,
        `主题色 ${(accentRatio * 100).toFixed(1)}%`,
        `字母墨迹 ${String(letterInk).padStart(3)}px`,
        `字母偏 ${offset.x.toFixed(1)}/${offset.y.toFixed(1)}px`,
      ].join('  '),
    );
    for (const problem of problems) console.log(`      ${problem}`);
    if (problems.length > 0) failed++;
  }
  if (failed > 0) die(`\n${failed} 个图没通过核对。`);
  console.log('  全部通过。');
}

/**
 * 出对照图 → .probe/shots/icon-preview.png
 *
 * 图标必须在**真实尺寸**下判：128 的漂亮不代表 16 的不糊，而 16 才是工具栏上的样子。
 * 所以各尺寸按 1:1 并排摆一遍，再把小尺寸放大摆一遍（放大用最近邻，看的是真实像素，
 * 不是插值出来的假平滑）。浅底与深底各一条：商店规范要求两种底上都看得清。
 */
async function previewIcons(page, dir, brand) {
  const dataUrls = {};
  for (const size of ICON_SIZES) {
    const file = path.join(dir, `${size}.png`);
    if (!existsSync(file)) die(`${rel(file)} 不存在，先出图标再出对照图`);
    dataUrls[size] = `data:image/png;base64,${readFileSync(file).toString('base64')}`;
  }

  const sheet = await page.evaluate(
    async ({ dataUrls, brand, sizes }) => {
      const load = (url) =>
        new Promise((resolve, reject) => {
          const image = new Image();
          image.onerror = () => reject(new Error('PNG 解不开'));
          image.onload = () => resolve(image);
          image.src = url;
        });
      const images = {};
      for (const size of sizes) images[size] = await load(dataUrls[size]);

      const margin = 24;
      const labelWidth = 150;
      const gap = 16;
      const captionHeight = 22;
      const oneToOne = [...sizes].sort((a, b) => b - a); // 大 → 小
      const magnified = [
        { size: 16, factor: 8 },
        { size: 32, factor: 4 },
        { size: 48, factor: 2 },
      ];
      const rowWidth = (widths) => widths.reduce((sum, w) => sum + w, 0) + gap * (widths.length - 1);
      const contentLeft = margin + labelWidth;
      const width =
        contentLeft + Math.max(rowWidth(oneToOne), rowWidth(magnified.map((m) => m.size * m.factor))) + margin;
      const oneHeight = Math.max(...oneToOne) + 24;
      const zoomHeight = Math.max(...magnified.map((m) => m.size * m.factor)) + captionHeight + 16;
      const height = margin * 2 + (oneHeight + gap + oneHeight + gap + zoomHeight + gap + zoomHeight);

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      const label = (bandTop, bandHeight, title, detail, color) => {
        ctx.fillStyle = color;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.font = `600 ${brand.textMd}px ${brand.font}`;
        ctx.fillText(title, margin, bandTop + bandHeight / 2 - 9);
        ctx.font = `${brand.textSm}px ${brand.font}`;
        ctx.fillText(detail, margin, bandTop + bandHeight / 2 + 9);
      };

      let bandTop = margin;
      const bands = [
        { title: '1:1 浅色底', detail: oneToOne.join(' / '), background: brand.paper, ink: brand.inkFaint, kind: 'one' },
        { title: '1:1 深色底', detail: oneToOne.join(' / '), background: brand.ink, ink: brand.paper, kind: 'one' },
        { title: '放大 浅色底', detail: magnified.map((m) => `${m.size}×${m.factor}`).join('  '), background: brand.paper, ink: brand.inkFaint, kind: 'zoom' },
        { title: '放大 深色底', detail: magnified.map((m) => `${m.size}×${m.factor}`).join('  '), background: brand.ink, ink: brand.paper, kind: 'zoom' },
      ];

      for (const band of bands) {
        const bandHeight = band.kind === 'one' ? oneHeight : zoomHeight;
        ctx.fillStyle = band.background;
        ctx.fillRect(0, bandTop, width, bandHeight);
        label(bandTop, bandHeight, band.title, band.detail, band.ink);

        if (band.kind === 'one') {
          let x = contentLeft;
          for (const size of oneToOne) {
            ctx.drawImage(images[size], x, bandTop + (bandHeight - size) / 2, size, size);
            x += size + gap;
          }
        } else {
          let x = contentLeft;
          const groupTop = bandTop + (bandHeight - captionHeight - Math.max(...magnified.map((m) => m.size * m.factor))) / 2;
          for (const { size, factor } of magnified) {
            const side = size * factor;
            // 关掉平滑：放大要看的是真实像素，插值出来的平滑会掩盖糊
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(images[size], x, groupTop, side, side);
            ctx.imageSmoothingEnabled = true;
            ctx.fillStyle = band.ink;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.font = `${brand.textSm}px ${brand.font}`;
            ctx.fillText(`${size}px ×${factor}`, x + side / 2, groupTop + side + 6);
            x += side + gap;
          }
        }
        bandTop += bandHeight + gap;
      }
      return canvas.toDataURL('image/png');
    },
    {
      dataUrls,
      sizes: ICON_SIZES,
      brand,
    },
  );

  const file = path.join(ROOT, '.probe', 'shots', 'icon-preview.png');
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, Buffer.from(sheet.replace(/^data:image\/png;base64,/, ''), 'base64'));
  console.log(`\n对照图 → ${rel(file)}`);
}

// ---------------------------------------------------------------- 商店素材

/*
 * 促销磁贴（pnpm probe store）。
 *
 * 规范出处：developer.chrome.com/docs/webstore/images（2026-10-17 核对原文）。
 * 尺寸是硬要求：小磁贴 440x280 **必填**（没有它的条目会被排在有它的后面），
 * 大磁贴 1400x560 供精选位。同一页的取图建议：Avoid text、Fill the entire
 * region、favor saturated colors、steer clear of large white or light-gray areas、
 * 缩到一半仍要认得出、不要拿截图充数。
 *
 * 这一版（Ryan 2026-10-17 定）：白底 + 蓝色图标 + 深色文字，即旧脚本的结构换成新
 * 主题的色值。两处与上面那页建议相左，都是 Ryan 明确选的，记在这里免得下次有人
 * 「照规范改回去」：
 *   1. 有文字——规范说 Avoid text；
 *   2. 大面积白底——规范说要避开大面积浅色，原文给的理由是 "assume a light gray
 *      backdrop"：商店列表底色是浅灰，纯白磁贴会有点融进背景。
 * 中间试过两版都被否掉：群青满幅 + 白方块标记（像蓝底上浮一张白卡片）、群青满幅 +
 * 白字母（没有方块，标记认不出是图标）。
 *
 * 旧脚本（make-store-assets.mjs，77a2c46 删除）写死的是上一套配色：墨绿 #0f766e、
 * 墨 #101828、纸 #f7f9fb、线 #ccd2d9——这些值现在的 tokens.css 里一个都没有，
 * 所以那批图不只是旧，是整体换了主题。色值一律现读 tokens.css，理由同图标那节。
 * 旧脚本也出过一张 300x300 徽标。Chrome 商店没有这个尺寸，但 Edge 加载项的
 * 商店 logo 建议 300x300（1:1），所以现在与 128 商店图一起生成；两者都不进
 * manifest，只作为后台上传素材（见 STORE_ICON_SPECS）。
 * 页面截图也不在这里：那几张要真实登录态，Ryan 2026-10-17 确认本次不做。
 */

/**
 * 商店素材目录：跟着扩展自己的构建产物走（`.output/`，每次 build 重生）。
 *
 * 从前落在仓库根的 `dist/store/`——那是第三种产物落点（扩展在 apps/extension/.output、
 * 命令行在 apps/cli/dist），多一个顶层目录只让人猜哪个是真的。素材手动上传商店后台，
 * 不进仓库，也不需要进：文案与色值都能从 tokens.css 重生。
 */
const STORE_DIR = path.join(ROOT, 'apps', 'extension', '.output', 'store');
/** 两张磁贴。文件名沿用旧脚本，免得上传时对不上。 */
const STORE_TILES = [
  { name: 'tile-small-440x280.png', width: 440, height: 280 },
  { name: 'tile-large-1400x560.png', width: 1400, height: 560 },
];
/** 品牌名取自 _locales 的 extensionName。 */
const STORE_TITLE = 'Study Pilot';
/**
 * 一句说明。商店描述全文是「学习平台辅助工具（中国大学 MOOC / 智慧树）：
 * 整理课程待办与截止时间，可辅助完成客观题测验」——太长，磁贴放不下，
 * 这里取它的前半句。不用旧版的「截止提醒」：本项目没有定时与通知
 * （见 CONTRIBUTING 的「一轮执行」），「提醒」是那句里唯一会读成承诺的词。
 */
const STORE_SUBTITLE = '课程待办与截止时间';
/** 标记高度、图文间距、标题字号、说明字号各自占磁贴高度的比例，沿用旧脚本调过的值。 */
const STORE_RATIOS = { mark: 0.42, gap: 0.13, title: 0.15, subtitle: 0.56 };

/**
 * 在页面里画一张磁贴（浏览器侧执行，不得引用本文件的任何东西）。
 * 返回 PNG 与这次排版算出来的几个数——核对要拿它们跟磁盘上的像素比对。
 */
async function drawStore({ brand, letter, tiles, title, subtitle, ratios, radiusRatio, letterRatio }) {
  const blank = (w, h) => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    return canvas;
  };

  const drawTile = (width, height) => {
    const canvas = blank(width, height);
    const ctx = canvas.getContext('2d');

    // 满幅纯白底（--paper-2）：铺满整个区域，与主题的「净白页底」一致
    ctx.fillStyle = brand.paper2;
    ctx.fillRect(0, 0, width, height);

    const markSize = Math.round(height * ratios.mark);
    const gap = Math.round(height * ratios.gap);

    /*
     * 标题字号按高度与宽度各推一次、取小的那个。只按高度算的话，小磁贴
     * （高 280）推出的字号会让「Study Pilot」顶到边上——旧脚本踩过这条。
     */
    const titleByHeight = Math.round(height * ratios.title);
    const titleByWidth = Math.round(((width - markSize - gap) * 0.92) / (title.length * 0.56));
    const titleSize = Math.min(titleByHeight, titleByWidth);
    const subtitleSize = Math.round(titleSize * ratios.subtitle);

    const measure = (text, weight, size) => {
      ctx.font = `${weight} ${size}px ${brand.font}`;
      const metrics = ctx.measureText(text);
      return {
        width: metrics.width,
        ascent: metrics.actualBoundingBoxAscent,
        descent: metrics.actualBoundingBoxDescent,
      };
    };
    const titleBox = measure(title, 600, titleSize);
    const subtitleBox = measure(subtitle, 400, subtitleSize);
    const lineGap = Math.round(subtitleSize * 0.5);

    const textWidth = Math.max(titleBox.width, subtitleBox.width);
    const groupWidth = markSize + gap + textWidth;
    const startX = (width - groupWidth) / 2;
    const centerY = height / 2;

    /*
     * 标记＝扩展图标本身：群青圆角方块 + 白色字母。用 Icon_ 那几个比例画，
     * 与 public/icon/ 里那五张的来源是同一组数，方块与字母的比例不会各走各的
     * （这里只有这十来行绘制是重述的，值都从常量来）。
     */
    const markRadius = markSize * radiusRatio;
    ctx.fillStyle = brand.accent;
    ctx.beginPath();
    ctx.roundRect(startX, centerY - markSize / 2, markSize, markSize, markRadius);
    ctx.fill();
    ctx.fillStyle = brand.onAccent;
    ctx.font = `600 ${Math.round(markSize * letterRatio)}px ${brand.font}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    const markInk = ctx.measureText(letter);
    ctx.fillText(
      letter,
      startX + markSize / 2 - (markInk.actualBoundingBoxRight - markInk.actualBoundingBoxLeft) / 2,
      centerY + (markInk.actualBoundingBoxAscent - markInk.actualBoundingBoxDescent) / 2,
    );
    const markRight = startX + markSize;

    /*
     * 文字用墨色两级（--ink 标题 / --ink-soft 说明），与主题里「正文与次级说明」
     * 的分工一致。两行按墨迹高度整体居中：标题有 y/p 这类带下伸部的字母，说明是
     * 汉字，两者的度量线上下留白差得多，按行高排会看着偏。
     */
    const textHeight =
      titleBox.ascent + titleBox.descent + lineGap + subtitleBox.ascent + subtitleBox.descent;
    const titleBaseline = centerY - textHeight / 2 + titleBox.ascent;
    const textX = startX + markSize + gap;

    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = brand.ink;
    ctx.font = `600 ${titleSize}px ${brand.font}`;
    ctx.fillText(title, textX, titleBaseline);
    ctx.fillStyle = brand.inkSoft;
    ctx.font = `400 ${subtitleSize}px ${brand.font}`;
    ctx.fillText(subtitle, textX, titleBaseline + titleBox.descent + lineGap + subtitleBox.ascent);

    return {
      png: canvas.toDataURL('image/png'),
      titleSize,
      subtitleSize,
      markSize,
      markRight,
      textRight: textX + textWidth,
    };
  };

  const out = {};
  for (const tile of tiles) out[tile.name] = drawTile(tile.width, tile.height);
  return out;
}

async function cmdStore(opts) {
  const brand = readBrandTokens();
  await withCanvasPage(async (page) => {
    /*
     * 无论如何都先在内存里画一遍：核对要拿这次排版算出来的数字（标记右缘、
     * 文字右端）与磁盘上的像素比对。画一遍是确定的、也不落盘，所以 --check
     * 照画，只是不写文件——这样「只核不生成」与「生成后再核」用的是同一份排版。
     */
    const drawn = await page.evaluate(drawStore, {
      brand,
      letter: ICON_LETTER,
      tiles: STORE_TILES,
      title: STORE_TITLE,
      subtitle: STORE_SUBTITLE,
      ratios: STORE_RATIOS,
      radiusRatio: ICON_RADIUS_RATIO,
      letterRatio: ICON_LETTER_RATIO,
    });

    /*
     * 商店上传图与促销磁贴落同一个目录：清单图标是满幅的（见文件头），
     * 商店列表按规范需要那张 96+16 留白的 128，Edge 的 logo 要 300 满幅。
     */
    const storeIcons = {
      sizes: STORE_ICON_SPECS.map((spec) => spec.size),
      ratios: Object.fromEntries(STORE_ICON_SPECS.map((spec) => [spec.size, spec.ratio])),
      nameFor: (size) => `store-icon-${size}.png`,
    };

    if (!opts.check) {
      await drawIcons(page, STORE_DIR, brand, storeIcons);
      mkdirSync(STORE_DIR, { recursive: true });
      for (const tile of STORE_TILES) {
        const layout = drawn[tile.name];
        const base64 = layout.png.replace(/^data:image\/png;base64,/, '');
        if (!base64) die(`${tile.name} 没画出来`);
        writeFileSync(path.join(STORE_DIR, tile.name), Buffer.from(base64, 'base64'));
        console.log(
          `  ${tile.name}  ${tile.width}x${tile.height}` +
            `  标记 ${layout.markSize}  标题 ${layout.titleSize}px  说明 ${layout.subtitleSize}px`,
        );
      }
      console.log(`已写入 ${rel(STORE_DIR)}（文案：${STORE_TITLE} / ${STORE_SUBTITLE}）`);
    }

    await checkIcons(page, STORE_DIR, brand, storeIcons);
    await checkTiles(page, brand, drawn);
  });
}

/**
 * 核对磁贴。
 *
 * 验的是「白底 + 蓝色图标 + 深色文字」这件事真的落在像素上：
 *   尺寸    与规范逐像素相符，错一个像素商店就不收
 *   满幅    不能有透明像素（规范：Fill the entire region）
 *   白底    四角是 --paper-2，且它占绝大多数
 *   标记    群青像素构成一个 markSize 见方的方块，位置就在排版算的那一处
 *           （长宽都量，所以「方块大小不对」与「位置不对」都拦得下）
 *   字母    标记方块**内部**要有白色像素——白底的白与字母的白同色，只有限定区域
 *           才问得出「字母画上了没有」这个问题
 *   文字    墨色像素的最右端必须超出标记右缘：只有文字能超出，这一条把「画了字」
 *           与「只画了标记」分开
 *   不溢出  文字块右端不出画布（旧脚本踩过标题顶边，故留了按宽度收字号的算法）
 */
async function checkTiles(page, brand, drawn) {
  console.log(`\n核对 ${rel(STORE_DIR)}：`);
  let failed = 0;
  for (const tile of STORE_TILES) {
    const file = path.join(STORE_DIR, tile.name);
    if (!existsSync(file)) {
      console.log(`  ✗ ${tile.name} 缺失`);
      failed++;
      continue;
    }
    const layout = drawn[tile.name];
    const measured = await measureFile(
      page,
      file,
      { paper: brand.paper2, accent: brand.accent, ink: brand.ink },
      { paper: 6, accent: 12, ink: 12 },
    );
    const problems = [];

    if (measured.width !== tile.width || measured.height !== tile.height) {
      problems.push(`尺寸是 ${measured.width}x${measured.height}，应为 ${tile.width}x${tile.height}`);
    }
    if (measured.transparent !== 0) {
      problems.push(`有 ${measured.transparent} 个透明像素，规范要求铺满整个区域`);
    }
    if (measured.corners.some(([r, g, b]) => !sameColor([r, g, b], brand.paper2, 6))) {
      problems.push(`四角不是白底（${measured.corners.map((c) => c.slice(0, 3).join(',')).join(' / ')}）`);
    }
    const paperRatio = measured.colors.paper.pixels / measured.opaque;
    if (paperRatio < 0.7) {
      problems.push(`白底只占 ${(paperRatio * 100).toFixed(1)}%，底没铺开`);
    }

    // 标记：群青方块的长宽都该是 markSize，左缘落在排版算的那一处
    const mark = measured.colors.accent;
    const markWidth = mark.right - mark.left + 1;
    const markHeight = mark.bottom - mark.top + 1;
    const markLeft = layout.markRight - layout.markSize;
    if (mark.pixels === 0) {
      problems.push('找不到群青像素：图标没画上');
    } else if (Math.abs(markWidth - layout.markSize) > 3 || Math.abs(markHeight - layout.markSize) > 3) {
      problems.push(`标记方块是 ${markWidth}x${markHeight}，应为 ${layout.markSize} 见方`);
    } else if (Math.abs(mark.left - markLeft) > 3) {
      problems.push(`标记左缘在 ${mark.left}，应在 ${markLeft.toFixed(0)}`);
    }

    // 字母：只在标记方块内部数白色像素（白底与字母同色，见本节说明）
    if (mark.pixels > 0) {
      const inset = Math.round(layout.markSize * 0.12);
      const inside = await measureFile(
        page,
        file,
        { letter: brand.onAccent },
        { letter: 6 },
        { left: mark.left + inset, top: mark.top + inset, right: mark.right - inset, bottom: mark.bottom - inset },
      );
      if (inside.colors.letter.pixels === 0) {
        problems.push('标记方块内部没有白色像素：字母没画上');
      }
    }

    const ink = measured.colors.ink;
    if (ink.pixels === 0) {
      problems.push('找不到墨色像素：标题与说明都没画上');
    } else if (ink.right <= layout.markRight) {
      problems.push(`墨色像素最右只到 ${ink.right}，没超出标记右缘 ${layout.markRight.toFixed(0)}：文字没画上`);
    }
    if (layout.textRight > tile.width) {
      problems.push(`文字右端到 ${layout.textRight.toFixed(0)}，超出画布 ${tile.width}：会被截掉`);
    }

    console.log(
      [
        `  ${problems.length === 0 ? '✓' : '✗'} ${tile.name}`,
        `白底 ${(paperRatio * 100).toFixed(1)}%`,
        `标记 ${markWidth}x${markHeight}`,
        `墨色最右 ${ink.right}（标记右缘 ${layout.markRight.toFixed(0)}）`,
        `文字右端 ${layout.textRight.toFixed(0)}`,
      ].join('  '),
    );
    for (const problem of problems) console.log(`      ${problem}`);
    if (problems.length > 0) failed++;
  }
  if (failed > 0) die(`\n${failed} 张磁贴没通过核对。`);
  console.log('  全部通过。');
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
                                         （--out 是 .probe/ 内的相对路径；落在 .probe/ 外一律拒绝——响应体带账号数据）
  call --bean <Bean> --method <方法>     在页面上下文发 .rpc 请求（默认只放行只读方法）
      [--body <JSON|@文件>] [--allow-write]
  src fetch [--url <页面>...] [--refetch]  下载 mooc 全站前端源码 → .probe/mooc-src/
                                          （raw/ 原样 + readable/ 格式化 + INDEX.md 索引）
  src grep <关键词>                        在镜像的 readable/ 里搜（文件名:行号）
  zhs --list                             智慧树端点表（名字 / 方法 / 宿主 / 是否签名 / 读或写）
  zhs --endpoint <名字>                  调智慧树接口（Node 直发，走包内签名；附着浏览器取活 cookie）
      [--params '<JSON>|@文件'] [--allow-write]
  ext id | ext reload                    打印扩展 id / 重载扩展（要求探测浏览器在运行）
  icon [--check] [--preview] [--dir <目录>]
                                         生成扩展图标 → apps/extension/public/icon/
                                         （色值与字体现读 tokens.css；--check 只核对不生成；
                                           --preview 另出对照图 → .probe/shots/icon-preview.png）
  store [--check]                        生成商店上传图与促销磁贴 → apps/extension/.output/store/
                                          （store-icon-128/300 与 440x280/1400x560；
                                           色值与字体现读 tokens.css；--check 只核对不生成）
  shot --url <URL> [--out <文件>]        截图（--out 同上，只认 .probe/ 内的相对路径；缺省 .probe/shot-<时间戳>.png）
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
    case 'icon':
      await cmdIcon(opts);
      break;
    case 'store':
      await cmdStore(opts);
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

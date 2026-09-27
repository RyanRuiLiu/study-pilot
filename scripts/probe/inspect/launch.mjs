#!/usr/bin/env node
/**
 * 启动 / 关闭探测专用浏览器。
 *
 * 用独立 profile（默认 .probe/profile），与扩展调试用的 .dev-profile 隔离：
 *   - 探测过程不会污染扩展调试环境；
 *   - profile 长期保留，登录一次之后后续采集可复用（不需要反复登录）。
 *
 * 浏览器选 Chrome for Testing，不是系统里的品牌版 Chrome。
 * 依据是 Chrome 官方发布说明：
 *
 *   Remove --load-extension command line switch
 *   为了提升安全性，官方品牌版自 Chrome 137 起移除 --load-extension；
 *   未打包扩展改用 chrome://extensions 的「加载已解压的扩展程序」按钮加载。
 *   开发者仍可在 Chromium 与 Chrome For Testing 中使用 --load-extension。
 *
 *   https://support.google.com/chrome/a/answer/10314655
 *
 * 品牌版还有第二个限制：CDP 的 Extensions 域在 Chrome 153 已不存在，
 * 因此 Extensions.loadUnpacked 会返回一个 id 但扩展并不会真正加载，
 * 表现为扩展页面打开后是 ERR_BLOCKED_BY_CLIENT。
 *
 * 安装 Chrome for Testing：
 *   npx @puppeteer/browsers install chrome@stable --path ~/.cache/chrome-for-testing
 *
 * 用法：
 *   node scripts/probe/inspect/launch.mjs                        # 启动（默认带窗口，使用者全程可见）
 *   node scripts/probe/inspect/launch.mjs --extension <目录>     # 顺带加载未打包扩展
 *   node scripts/probe/inspect/launch.mjs --port 9333            # 换端口
 *   node scripts/probe/inspect/launch.mjs --headless             # 无窗口（仅用于纯静态采集）
 *   node scripts/probe/inspect/launch.mjs --kill                 # 关闭该 profile 的实例
 *
 * 默认**有窗口**：目标是真实账号的探测，使用者必须能看见浏览器在做什么。
 * 只有明确知道不需要人工观察时才用 --headless。
 */

import { spawn } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { browserVersion, waitForCdp } from '../lib/cdp.mjs';

const ROOT = path.resolve(fileURLToPath(new URL('../../..', import.meta.url)));

/** Chrome for Testing 的安装根目录。 */
function chromeForTestingRoot() {
  const base =
    process.env.CHROME_FOR_TESTING_PATH ??
    (process.env.USERPROFILE
      ? path.join(process.env.USERPROFILE, '.cache', 'chrome-for-testing')
      : '');
  return base;
}

/**
 * 找 Chrome for Testing 的可执行文件。
 *
 * 官方工具按 `<root>/chrome/<platform-version>/chrome-<platform>/chrome.exe`
 * 布局安装，版本号会随升级变化，因此这里扫描目录而不是写死版本。
 */
function findChromeForTesting() {
  const root = chromeForTestingRoot();
  if (!root || !existsSync(root)) return null;

  const chromeDir = path.join(root, 'chrome');
  if (!existsSync(chromeDir)) return null;

  // 取版本号最大的一个
  const versions = readdirSync(chromeDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
    .reverse();

  for (const version of versions) {
    const candidates = [
      path.join(chromeDir, version, 'chrome-win64', 'chrome.exe'),
      path.join(chromeDir, version, 'chrome-win32', 'chrome.exe'),
      path.join(chromeDir, version, 'chrome-linux64', 'chrome'),
      path.join(chromeDir, version, 'chrome-mac-x64', 'Google Chrome for Testing.app'),
    ];
    for (const candidate of candidates) {
      if (existsSync(candidate)) return candidate;
    }
  }

  return null;
}

/** 系统里的品牌版 Chrome。它不支持 --load-extension，只在没装 CfT 时作为退路。 */
function findBrandedChrome() {
  const candidates = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    process.env.LOCALAPPDATA
      ? path.join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'Application', 'chrome.exe')
      : '',
  ].filter(Boolean);
  return candidates.find((candidate) => existsSync(candidate)) ?? null;
}

function parseArgs(argv) {
  const out = { port: 9222, headless: false, kill: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--port') out.port = Number(argv[++i]);
    else if (a === '--profile') out.profile = argv[++i];
    else if (a === '--headless') out.headless = true;
    else if (a === '--kill') out.kill = true;
    else if (a === '--extension') out.extension = argv[++i];
    else if (a === '--branded') out.branded = true;
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
const profile = path.resolve(args.profile ?? path.join(ROOT, '.probe', 'profile'));

if (args.kill) {
  const { execFileSync } = await import('node:child_process');
  // 注意：PowerShell 的 -like 里反斜杠是字面字符，路径不要做转义，
  // 否则 'C:\\...' 匹配不上实际命令行里的 'C:\...'。
  // Chrome for Testing 的进程名同样是 chrome.exe。
  const script =
    "Get-CimInstance Win32_Process -Filter \"name='chrome.exe'\" | " +
    `Where-Object { $_.CommandLine -like '*${profile}*' } | ` +
    'ForEach-Object { Stop-Process -Id $_.ProcessId -Force }';
  try {
    execFileSync('pwsh', ['-NoProfile', '-Command', script], { stdio: 'inherit' });
    console.log('已关闭探测浏览器');
  } catch (e) {
    console.error('关闭失败：', e.message);
  }
  process.exit(0);
}

// 已经就绪就直接复用，避免开第二个实例
try {
  const v = await browserVersion({ port: args.port, timeoutMs: 1500 });
  console.log(`CDP 已就绪：${v.Browser}  (port ${args.port})`);
  process.exit(0);
} catch {
  // 未就绪，继续启动
}

const cft = findChromeForTesting();
const bin = args.branded ? findBrandedChrome() : (cft ?? findBrandedChrome());

if (!bin) {
  console.error(
    [
      '找不到可用的浏览器。',
      '',
      '请安装 Chrome for Testing（官方支持加载未打包扩展）：',
      '  npx @puppeteer/browsers install chrome@stable --path ~/.cache/chrome-for-testing',
      '',
      `查找位置：${chromeForTestingRoot()}`,
    ].join('\n'),
  );
  process.exit(1);
}

// 品牌版无法加载扩展，此时明确告知，避免出现「扩展加载成功但打不开」的假象
const usingBranded = bin === findBrandedChrome();
if (args.extension && usingBranded) {
  console.error(
    [
      '系统里的 Chrome 是官方品牌版，自 Chrome 137 起已移除 --load-extension，',
      '无法自动加载未打包扩展。',
      '',
      '两种官方做法：',
      '  1. 安装 Chrome for Testing 后重试（推荐）',
      '     npx @puppeteer/browsers install chrome@stable --path ~/.cache/chrome-for-testing',
      '  2. 手动打开 chrome://extensions，开启开发者模式，点「加载已解压的扩展程序」',
      '',
      `扩展目录：${path.resolve(args.extension)}`,
    ].join('\n'),
  );
  process.exit(1);
}

await mkdir(profile, { recursive: true });

const flags = [
  `--remote-debugging-port=${args.port}`,
  `--user-data-dir=${profile}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-features=Translate',
  '--remote-allow-origins=*',
];
// Chrome for Testing 支持 --load-extension，直接用它加载，不依赖 CDP。
if (args.extension) {
  flags.push(`--load-extension=${path.resolve(args.extension)}`);
}
flags.push('about:blank');
if (args.headless) flags.unshift('--headless=new');

const child = spawn(bin, flags, { detached: true, stdio: 'ignore' });
child.unref();

const v = await waitForCdp({ port: args.port, timeoutMs: 30000 });
console.log(
  `探测浏览器已启动：${v.Browser}\n  bin     ${bin}\n  profile ${profile}\n  CDP     http://127.0.0.1:${args.port}`,
);

if (args.extension) {
  const extPath = path.resolve(args.extension);
  console.log(`  扩展    ${extPath}  (通过 --load-extension 加载)`);
}


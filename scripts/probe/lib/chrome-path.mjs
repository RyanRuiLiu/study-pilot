/*
 * 调试宿主浏览器的查找。
 *
 * 只有一个平台可执行文件的路径规则，所以只有一处实现。此前 wxt.config.ts 与
 * launch.mjs 各写了一份，且已经漂开：macOS 那份一个返回 .app 目录、另一个返回
 * 目录里的可执行文件，而同一个开关在两条路上行为不同。
 *
 * 为什么必须用 Chrome for Testing 而不是品牌版：见 docs/development.md 第 12 节。
 */

import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';

/**
 * Chrome for Testing 的安装根目录。
 *
 * 未设置环境变量时取 `@puppeteer/browsers` 的默认位置。
 *
 * @returns {string} 根目录，空串表示这台机器上没有可查的位置
 */
export function chromeForTestingRoot() {
  return (
    process.env.CHROME_FOR_TESTING_PATH ??
    (process.env.USERPROFILE ? path.join(process.env.USERPROFILE, '.cache', 'chrome-for-testing') : '')
  );
}

/**
 * 找 Chrome for Testing 的可执行文件。
 *
 * 官方工具按 `<root>/chrome/<版本>/chrome-<平台>/…` 布局安装，版本号随升级变化，
 * 因此扫描目录而不是写死版本。
 *
 * @returns {string | null} 可执行文件路径，找不到返回 null
 */
export function findChromeForTesting() {
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
      path.join(
        chromeDir,
        version,
        'chrome-mac-x64',
        'Google Chrome for Testing.app',
        'Contents',
        'MacOS',
        'Google Chrome for Testing',
      ),
      path.join(
        chromeDir,
        version,
        'chrome-mac-arm64',
        'Google Chrome for Testing.app',
        'Contents',
        'MacOS',
        'Google Chrome for Testing',
      ),
    ];
    for (const candidate of candidates) {
      if (existsSync(candidate)) return candidate;
    }
  }

  return null;
}

/**
 * 系统里的官方品牌版 Chrome。
 *
 * 它从 137 起不支持 `--load-extension`，**不能**作为调试宿主；这里只用来在报错时
 * 告诉用户「你装的是哪一个，以及为什么不能用它」。
 *
 * @returns {string | null} 可执行文件路径，找不到返回 null
 */
export function findBrandedChrome() {
  const candidates = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    process.env.LOCALAPPDATA
      ? path.join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'Application', 'chrome.exe')
      : '',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].filter(Boolean);
  return candidates.find((candidate) => existsSync(candidate)) ?? null;
}


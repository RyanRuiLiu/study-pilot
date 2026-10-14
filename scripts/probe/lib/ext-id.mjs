/*
 * 找出当前调试浏览器里加载的扩展 id。
 *
 * 不硬编码：Chrome 的扩展 id 由**加载路径**决定，同一个目录在不同机器上
 * 会得到不同的 id。把它写死在脚本里，换一台机器跑就全部失效，
 * 而报错还是「找不到页面」这种看不出原因的形式。
 *
 * 取法是读 service worker 目标的 URL —— 它形如
 * `chrome-extension://<id>/background.js`，只有扩展加载成功才会有这个目标。
 * 所以它同时也是一个「扩展是否已加载」的判据。
 *
 * 扩展页面（popup / options）也可以作为来源，但 service worker 更可靠：
 * 页面可能被用户关掉，而它由浏览器管理，扩展在它就在（被回收时也会
 * 在下次有事件时重新拉起）。
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Session, browserVersion, listTargets } from './cdp.mjs';

const ROOT = path.resolve(fileURLToPath(new URL('../../..', import.meta.url)));

/** 默认的未打包产物目录。 */
export const DEFAULT_EXT_DIR = path.join(ROOT, 'apps/extension/.output/chrome-mv3');

/**
 * 让浏览器按构建产物重新加载扩展，返回它的 id。
 *
 * 这一步同时解决两个坑：
 *   - `--load-extension` 在扩展已注册时可能继续用旧副本，于是「重新构建后
 *     行为不变」，所有验证结论都会失效（项目 README 专门写了这条）；
 *   - 刚重载完 service worker 是休眠的，目标列表里没有它，此时问「扩展 id
 *     是多少」会得出「没装扩展」的错误结论。
 * 只有 Chrome for Testing 有 `Extensions` 域；品牌版上这里会抛，由调用方
 * 给出换浏览器的提示。
 */
export async function loadUnpacked(dir = DEFAULT_EXT_DIR) {
  const version = await browserVersion();
  const browser = await Session.open(version.webSocketDebuggerUrl);
  try {
    const result = await browser.send('Extensions.loadUnpacked', { path: dir });
    return result?.id ?? null;
  } finally {
    browser.close();
  }
}


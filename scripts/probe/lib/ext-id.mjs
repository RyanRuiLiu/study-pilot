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

import { listTargets } from './cdp.mjs';

/** 从目标 URL 里取出扩展 id。 */
function idOf(url) {
  if (!url || !url.startsWith('chrome-extension://')) return null;
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}

/** 取扩展 id；没有加载扩展时返回 null。 */
export async function findExtensionId() {
  const targets = await listTargets();

  const worker = targets.find(
    (t) => t.type === 'service_worker' && (t.url ?? '').startsWith('chrome-extension://'),
  );
  if (worker) return idOf(worker.url);

  const page = targets.find(
    (t) => t.type === 'page' && (t.url ?? '').startsWith('chrome-extension://'),
  );
  return idOf(page?.url);
}

/**
 * 取扩展 id，取不到就带着可执行的说明退出。
 *
 * 会重试若干次。扩展刚被加载时，service worker 需要一点时间注册，
 * 那一刻的目标列表里还没有它——立即去问会得到「没有扩展」这种错误结论，
 * 而实际上只是慢了几百毫秒。
 *
 * 自检脚本都在开头调它。与其让每个脚本各自处理这种情况，
 * 不如在这里重试并给出唯一一句有用的提示。
 */
export async function requireExtensionId() {
  const attempts = 10;

  for (let i = 0; i < attempts; i++) {
    const id = await findExtensionId();
    if (id) return id;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.error('没有找到已加载的扩展。');
  console.error('');
  console.error('先做这两步：');
  console.error('  1. pnpm build');
  console.error('  2. pnpm probe:launch:ext');
  console.error('');
  console.error('宿主必须是 Chrome for Testing。品牌版 Chrome 从 137 起');
  console.error('移除了 --load-extension，且没有 CDP 的 Extensions 域，');
  console.error('无法加载也无法重载扩展。');
  process.exit(1);
}

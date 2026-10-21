/*
 * 装好的扩展在无头 Chromium 里的冒烟：起得来、能开页、没有页面级异常。
 *
 * 只验「装得上、装配没断」——不登录、不碰平台、不写任何数据。
 * 需要先构建（pnpm build）：被测对象是 apps/extension/.output/chrome-mv3。
 *
 * 用完整 Chromium（channel: 'chromium'）+ 新无头模式：headless shell 不支持加载扩展。
 */

import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

// fileURLToPath 而不是 .pathname：Windows 上 pathname 是 /C:/...，拿它去 join 找不到产物
const extDir = fileURLToPath(new URL('../apps/extension/.output/chrome-mv3', import.meta.url));
if (!existsSync(join(extDir, 'manifest.json'))) {
  console.error(`找不到构建产物：${extDir}（先跑 pnpm build）`);
  process.exit(1);
}

const profile = mkdtempSync(join(tmpdir(), 'study-pilot-e2e-'));
const problems = [];

const context = await chromium.launchPersistentContext(profile, {
  headless: true,
  channel: 'chromium',
  args: [`--disable-extensions-except=${extDir}`, `--load-extension=${extDir}`],
});

try {
  // 等工作线程起来：扩展 id 从它的 URL 里取
  const worker =
    context.serviceWorkers()[0] ??
    (await context.waitForEvent('serviceworker', { timeout: 15_000 }).catch(() => null));
  if (!worker) throw new Error('service worker 没起来（扩展可能没装上）');
  const extensionId = new URL(worker.url()).host;

  const watch = (page, label) => {
    page.on('pageerror', (error) => problems.push(`${label} 页面异常：${error.message}`));
  };

  const popup = await context.newPage();
  watch(popup, 'popup');
  await popup.goto(`chrome-extension://${extensionId}/popup.html`);
  await popup.waitForLoadState('domcontentloaded');
  const popupText = await popup.locator('body').innerText();
  if (!popupText.includes('执行')) problems.push('popup 没有渲染出「执行」入口');

  const options = await context.newPage();
  watch(options, 'options');
  await options.goto(`chrome-extension://${extensionId}/options.html`);
  await options.waitForLoadState('domcontentloaded');
  const optionsText = await options.locator('body').innerText();
  for (const label of ['通用', '慕课', '智慧树']) {
    if (!optionsText.includes(label)) problems.push(`options 缺少「${label}」分区`);
  }

  // 留一拍给页面把初始异步读取跑完（未登录时如实报错）；期间任何页面异常都已记入 problems
  await popup.waitForTimeout(500);
} finally {
  await context.close();
  rmSync(profile, { recursive: true, force: true });
}

if (problems.length > 0) {
  console.error('冒烟失败：');
  for (const problem of problems) console.error(`- ${problem}`);
  process.exit(1);
}
console.log('扩展冒烟通过：service worker、popup、options 均正常，无页面异常');

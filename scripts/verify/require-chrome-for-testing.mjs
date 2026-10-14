#!/usr/bin/env node
/*
 * 开发模式的前置检查：调试宿主必须是 Chrome for Testing。
 *
 * 品牌版 Chrome 自 137 起移除了 `--load-extension`，用它启动会看到「扩展加载
 * 成功但打不开」（ERR_BLOCKED_BY_CLIENT），排查半天才发现是宿主不对。
 * 所以 `pnpm dev` 在真正拉起浏览器之前先判一次，不静默退回去。
 *
 * 为什么放在这里而不是 wxt.config.ts：那份配置被读到的场合不只是开发模式
 * （prepare、build、typecheck、test 都读它），在配置里抛错等于让缺浏览器
 * 变成整仓不能构建，CI 也会被迫先装一个浏览器才能跑测试。
 *
 * 用法：node scripts/verify/require-chrome-for-testing.mjs
 */

import { chromeForTestingInstallHint, findChromeForTesting } from '../probe/lib/chrome-path.mjs';

if (!findChromeForTesting()) {
  console.error(chromeForTestingInstallHint());
  process.exit(1);
}

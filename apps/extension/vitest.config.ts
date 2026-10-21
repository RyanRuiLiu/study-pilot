/*
 * 单元测试配置（WXT 官方方案）。
 *
 * `WxtVitest` 插件做四件事：注入浏览器扩展 API 的内存实现（fakeBrowser）、
 * 解析 WXT 生成的路径别名、读取 .wxt 的类型、按 vitest 的方式装配。
 * 之前这里没有任何配置：测试环境里 `browser` 全局不存在，于是凡是碰存储、
 * 定时器与通知的模块都得手写替身——不是它们不重要，是没法测。
 *
 * 不设覆盖率门槛：理由与替代手段见 docs/adr/0005-no-coverage-threshold.md。
 * 这里原有一段 thresholds，但它只在显式 `--coverage` 时生效，门禁从不带这个
 * 参数——一道没人跑的闸就是死配置，而且与 ADR 的口径相反。
 */

import { defineConfig } from 'vitest/config';
import { WxtVitest } from 'wxt/testing/vitest-plugin';

export default defineConfig({
  plugins: [WxtVitest()],
  test: {
    /*
     * 让 `*.css?inline` 在测试里拿到真实文本。
     *
     * vitest 默认不处理 CSS（导入进来是空串），而注入面板与得分指导的样式
     * 正是以 `?inline` 字符串的形式进 shadow root 的——测试要核对「相邻评分点
     * 之间有分隔线」这类事实，读到的必须是真样式表。
     */
    css: true,
  },
});

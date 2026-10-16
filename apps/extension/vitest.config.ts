/*
 * 单元测试配置（WXT 官方方案）。
 *
 * `WxtVitest` 插件做四件事：注入浏览器扩展 API 的内存实现（fakeBrowser）、
 * 解析 WXT 生成的路径别名、读取 .wxt 的类型、按 vitest 的方式装配。
 * 之前这里没有任何配置：测试环境里 `browser` 全局不存在，于是凡是碰存储、
 * 定时器与通知的模块都得手写替身——不是它们不重要，是没法测。
 *
 * 覆盖率的门槛写在这里而不是靠人记得看：见 coverage.thresholds。
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
    coverage: {
      provider: 'v8',
      // 只算产品代码：入口与工具脚本的覆盖率由门禁与真实浏览器验证负责
      include: ['src/**/*.ts'],
      exclude: ['**/*.test.ts', 'src/**/types.ts', 'src/**/*.d.ts'],
      reporter: ['text', 'json-summary'],
      reportsDirectory: '../../coverage/extension',
      /*
       * 门槛取的是**本次实测到的覆盖率**（向下取整），不是一个理想值。
       *
       * 写一个够不着的目标等于把这条检查变成噪音，跑一次红一次，最后所有人
       * 都学会忽略它。它的用途是**棘轮**：只许往上抬。加了测试就顺手把对应
       * 数字提上去，删了测试就会红。
       *
       * 现在的短板集中在页面装配层（`entrypoints/` 下的各页面脚本）：
       * 那些是要在真浏览器里点才看得见对错的东西。
       */
      thresholds: { lines: 47, functions: 42, statements: 47, branches: 48 },
    },
  },
});

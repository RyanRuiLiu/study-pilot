/*
 * 仓库根的 vitest 配置：只做一件事——把各包声明成 project。
 *
 * 为什么需要它：
 *
 *   Stryker 的 vitest runner 在仓库根以「无配置」的方式起一个 vitest 实例
 *   （见上游 vitest-test-runner.js 的 init：config 传的是 options.vitest?.configFile，
 *   本仓库没设，于是 undefined）。没有这份配置时，那个实例把仓库里所有测试文件
 *   都发现一遍，却**不会**加载扩展包自己的 vitest.config.ts——于是
 *   apps/extension 的测试跑在**没有 WxtVitest 插件**的环境里：
 *   scheduler-run / net-rules / alarms 一批测试直接失败，变异门禁的预热跑因此红掉。
 *   （本机实测：`vitest run --root . apps/extension/test` → 13 项失败；
 *    同样的文件在扩展包目录下跑是 252 项全过。）
 *
 *   有了这份配置，那个实例会把每个目录当 project 载入各自的配置：扩展包用
 *   WxtVitest（浏览器 API 的内存实现），各包用默认环境。预热跑于是全绿。
 *
 * 为什么写成不含 import 的普通对象：
 *
 *   仓库根没有 vitest 依赖（各包各自装），所以这里不能 `import { defineConfig }
 *   from 'vitest/config'`——根目录解析不到，配置会加载失败。projects 指向目录，
 *   每个目录自己那份配置（含各自的依赖与插件）由 vitest 各自加载。
 *
 * 对现有命令没有影响：各包的 `vitest run` 以自己的目录为根，找不到根配置就不找
 * （实测：`packages/core` 仍是自己的 5 项测试，不会变成全仓）。
 */

export default {
  test: {
    projects: ['packages/core', 'packages/transport', 'packages/platform-mooc', 'packages/ai', 'apps/extension'],
  },
};

/*
 * 变异测试配置（Stryker + Vitest，report-only）。
 *
 * 目的：现有各条门禁只回答「代码是否符合约定」，没有一条回答「测试是否真的
 * 约束了行为」。变异测试补这一层：把源码改坏，看测试有没有发现。
 *
 * 几个刻意的取值：
 *
 * - `thresholds.break: null`：**不阻断**。这是一条报告性检查，先跑一段看数据，
 *   不因为分数低就让门禁变红。将来要阻断时把这里换成具体分数即可，
 *   适配脚本不需要改。
 * - `mutate` 只圈生产代码：各包的 `packages/<包名>/src/**` 与
 *   `apps/extension/src/**`。测试文件、脚本、wxt entrypoints（靠环境而非断言）
 *   都不在范围内。
 * - `coverageAnalysis: 'perTest'`：vitest runner 的标配，Stryker 只为每个变异体
 *   跑覆盖它的那几个测试，否则整个仓库的测试会被重跑上千遍。
 *
 * 「只对变更文件跑」怎么实现：
 *
 *   原计划用 `--since <ref>`，但 StrykerJS 10 已移除该选项（本机实测：
 *   `stryker run --since main` 报 `error: unknown option '--since'`；
 *   官方配置文档的选项列表里也没有 since）。等价做法有两层：
 *
 *   1. 标准层：`stryker run --incremental`，官方文档的说法是「只对变更过的代码
 *      做变异测试」，结果落在 reports/stryker-incremental.json。代价是首次要
 *      完整跑一遍才有基线。
 *   2. 本配置层：设 `STRYKER_SINCE=<git ref>` 时，在配置里用 `git diff` 算出
 *      相对该 ref 变更过的、且在 mutate 范围内的文件，把它们当成 mutate 列表。
 *      这样第一次跑就只碰变更文件，不需要全量基线。
 *
 * 用法（见报告里的接线清单）：
 *   node node_modules/@stryker-mutator/core/bin/stryker.js run
 *   $env:STRYKER_SINCE='origin/main'; node node_modules/.../stryker.js run
 */

import { execFileSync } from 'node:child_process';

/** 生产代码范围：与 mutate 的默认值一致，git diff 结果也要按它过滤。 */
const MUTATE_SCOPE = ['packages/*/src/**/*.ts', 'apps/extension/src/**/*.ts'];

/**
 * 算出相对 `ref` 变更过的、且在 mutate 范围内的文件。
 *
 * `git diff <ref>` 比较的是 ref 与工作区，所以已提交和未提交的改动都算——
 * 本地「改了几个文件就测几个文件」的场景要的正是这个。
 */
function changedFilesSince(ref) {
  const output = execFileSync(
    'git',
    ['diff', '--name-only', '--diff-filter=ACMR', ref, '--', 'packages', 'apps'],
    { encoding: 'utf8' },
  );
  return output
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter(
      (file) =>
        /^packages\/[^/]+\/src\/.*\.ts$/.test(file) || /^apps\/extension\/src\/.*\.ts$/.test(file),
    );
}

const since = process.env.STRYKER_SINCE;
const mutate = since ? changedFilesSince(since) : MUTATE_SCOPE;

if (since) {
  /* 打印解析结果：只跑变更文件时，「到底跑了哪几个」必须看得见。 */
  console.log(`STRYKER_SINCE=${since} → 只变异 ${mutate.length} 个变更文件：`);
  for (const file of mutate) console.log(`  ${file}`);
}

if (since && mutate.length === 0) {
  /*
   * 变更集为空时 fail fast：继续跑下去 Stryker 会因为「没有可变异文件」报错，
   * 报错信息看不出是「这次没改东西」。
   */
  throw new Error(`STRYKER_SINCE=${since} 之后没有变更的生产代码文件，无需跑变异测试。`);
}

/*
 * pnpm 下必须显式给出插件路径。
 *
 * Stryker 的默认值是 `plugins: ['@stryker-mutator/*']`，它从 core 包自己所在的
 * node_modules 目录里 readdir：`node_modules/.pnpm/@stryker-mutator+core@.../node_modules/@stryker-mutator/`。
 * 那里只有 core 自己的依赖（api / util / instrumenter），vitest-runner 是根
 * 项目的开发依赖，不在其中，于是启动时报
 *   Cannot find TestRunner plugin "vitest". In fact, no TestRunner plugins were loaded.
 * 这里指向本仓库的包装插件（scripts/verify/stryker-vitest-runner.mjs），它再
 * 引用上游 runner。不用 import.meta.resolve 直连上游，是因为包装插件要修一个
 * 上游 bug，见该文件头部的说明与最小复现。
 *
 * 写相对路径而不是 file:// URL：Stryker 对 `.`/绝对路径的插件会自己
 * `pathToFileURL(path.resolve(...))`；而 `new URL(..., import.meta.url)` 那种写法
 * 会被 knip 当成一个解析不到的 import 报出来（实测），多一条无意义的门禁红。
 */
const vitestRunner = './scripts/verify/stryker-vitest-runner.mjs';

const config = {
  testRunner: 'vitest',
  plugins: [vitestRunner],
  /*
   * `coverageAnalysis: 'off'` + `vitest.related: false`：都关掉，理由如下。
   *
   * - related 模式在这个 monorepo 里找不到关联测试（实测 dry run 直接
   *   `Vitest failed to find test files related to mutated files` + `No tests were found`）。
   * - 覆盖归属（perTest）本身不可信：同一个变异体被归到根本不 import 它的测试
   *   文件上（sign.ts 的变异体归到 courseware 的测试）。归属错 → 按它挑测试就
   *   挑错 → 假存活。真正的修法在包装插件里：直接不按测试名挑测试，
   *   `coverageAnalysis` 设成什么都不会再影响死活判定。
   *
   * 代价：每个变异体跑一遍全部测试（只对变更文件跑时仍可接受，见报告耗时），
   * 且不会有可用的 NoCoverage 分类、不能用 ignoreStatic。
   */
  coverageAnalysis: 'off',
  vitest: { related: false },
  mutate,
  thresholds: { high: 80, low: 60, break: null },
  reporters: ['clear-text', 'json'],
  jsonReporter: { fileName: 'reports/mutation/mutation.json' },
  /*
   * 沙箱留在仓库根的 `.stryker-tmp`（Stryker 的默认位置），不能挪进 node_modules：
   * 实测挪到 `node_modules/.cache/stryker` 后 dry run 直接
   *   DryRunExecutor No tests were found
   * 因为 vitest 默认把 node_modules 排除在测试发现之外，测试文件全在沙箱里，
   * 一个都发现不到。
   *
   * 代价是这个目录落在工作区的扫描面里（eslint / remark 不看 .gitignore），
   * 所以两层都要处理：
   *   1. `cleanTempDir: 'always'`：成功失败都删，跑完不留副本；
   *   2. `eslint.config.mjs` 的 ignores 里加 `.stryker-tmp` 的忽略模式
   *      （remark 适配脚本的忽略表同样要加）。
   *
   * **绝不要在沙箱里跑 pnpm/npm 命令**（血泪教训，2026-10-14 实际发生）：
   * `symlinkNodeModules` 默认为 true，沙箱里的 node_modules 是**指回真实仓库的
   * junction**。在沙箱里跑 `pnpm install` / `pnpm exec` / `pnpm -r test` 时，包管理器
   * 会通过 junction 改写**真实** node_modules：当时全仓的依赖软链被改成指向
   * `.stryker-tmp/sandbox-XXXX/...`，沙箱一删，真实树就断了（`check-all` 红三条、
   * `pnpm test` 触发失败的 install）。修法：删掉沙箱，在仓库根重跑
   * `CI=true pnpm install`。所以 `testRunner: 'command'` 配 pnpm 命令这条路线是
   * 不可用的——它每次变异体运行都会触发 install，失败一次就记成「变异体被杀」。
   *
   * 另一个看起来能隔离的方案 `symlinkNodeModules: false` 实测**不可用**：关掉之后
   * 沙箱里没有 node_modules，依赖解析不到，dry run 只跑到 78 个测试（健康时 319 个），
   * 漏跑的测试会让变异体假存活——正是这次要修的那类问题。
   */
  tempDirName: '.stryker-tmp',
  cleanTempDir: 'always',
  /*
   * 沙箱里不需要的大目录，复制它们只会拖慢启动。
   * 注意**不能**忽略 `.wxt`：apps/extension/tsconfig.json 的 extends 指向
   * `./.wxt/tsconfig.json`，缺了它 vite 在转换 entrypoints 时会直接报
   * TSConfckParseError: EXTENDS_RESOLVE，整个 dry run 失败（实测）。
   */
  ignorePatterns: ['dist', '.output', '.probe', '.reverse', 'docs', 'reports'],
  timeoutMS: 10000,
  /* 本机同时还有别的验证在跑，固定留 4 个 worker，不用默认的核数减一。 */
  concurrency: 4,
};

export default config;

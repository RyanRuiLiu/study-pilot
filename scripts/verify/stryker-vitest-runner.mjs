/*
 * vitest runner 的一层薄包装：关掉「按测试名挑测试」这一步。
 *
 * 为什么需要（实测出来的上游 bug）：
 *   vitest 5 的 testNamePattern 只匹配**叶子测试名**，而
 *   @stryker-mutator/vitest-runner@10 传的是它自己拼的「describe 与 it 用空格
 *   相连」的全名。两边对不上 → 测试文件被收集但所有测试都被 skip →
 *   run() 返回 0 个测试结果 → Stryker 把变异体记成 Survived，报告字段
 *   testsCompleted=0。这是**假存活**，会让变异分数偏低且不可信。
 *
 *   最小复现（不需要 Stryker，直接把两种名字丢给 vitest）：
 *     cd packages/transport
 *     node node_modules/vitest/vitest.mjs run test/sign.test.ts -t "serializeForSign 的空值语义 假值一律变空串"
 *       → Tests  26 skipped (26)        ← runner 传来的全名，一个都不匹配
 *     node node_modules/vitest/vitest.mjs run test/sign.test.ts -t "假值一律变空串"
 *       → Tests  1 passed | 25 skipped  ← vitest 5 认的叶子名
 *
 *   同一版 runner 在 dry run 里用同一套 id 建覆盖归属，所以「归属到哪几个测试」
 *   也跟着错（sign.ts 的变异体被归到 courseware 的测试文件上）。
 *
 * 这里怎么修：
 *   上游 runner 的 run() 用 testIds 同时算出 testNamePattern 和 testFilesToRun。
 *   把 testIds 清空 → 不设 testNamePattern、不指定测试文件 → 在沙箱里跑该跑的
 *   全部测试，变异体死活由真实测试结果决定。
 *
 * 代价与边界：
 *   - 每个变异体跑全量测试（只对变更文件跑时耗时见 stryker.config.mjs；
 *     用 --testFiles 之类的进一步优化就没了）。
 *   - 覆盖归属数据仍然错，但既然不拿它挑测试，就不影响死活判定；
 *     NoCoverage 分类可能不准，所以报告里以 killed/survived 为准。
 *
 * 只用官方插件 API：拿上游插件描述符（kind/name/factory），替换 factory 为
 * 「先建上游 runner 实例，再覆写 run()」。不 import @stryker-mutator/api，
 * 因为它不是本仓库的直接依赖（pnpm 下解析不到）。
 */

import {
  strykerPlugins as upstreamPlugins,
  strykerValidationSchema as upstreamSchema,
} from '@stryker-mutator/vitest-runner';

const [upstream] = upstreamPlugins;

/** 与上游 factory 同样的注入元数据，让 Stryker 把 injector 传进来。 */
const wrapperFactory = (injector) => {
  const runner = upstream.factory(injector);
  const run = runner.run.bind(runner);
  runner.run = (options = {}) => run({ ...options, testIds: [] });
  return runner;
};
wrapperFactory.inject = upstream.factory.inject;

export const strykerPlugins = [{ ...upstream, factory: wrapperFactory }];

/* 插件自身的配置 schema（vitest.related / vitest.configFile）沿用上游。 */
export const strykerValidationSchema = upstreamSchema;

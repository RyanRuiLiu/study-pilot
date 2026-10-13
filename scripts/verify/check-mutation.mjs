/*
 * 变异测试适配层（Stryker + Vitest）。
 *
 * 与 check-knip / check-eslint 同一个形状：把「工具结果」映射成
 * 「通过/失败 <名称>」。这里唯一的判断是「报告读不读得到」——变异分数高低由
 * stryker.config.mjs 的 thresholds 决定，本脚本只把分数写进 detail 供人看。
 *
 * 为什么不在这里跑 Stryker：变异测试是重操作（本仓 mutate 范围内 233 个文件，
 * 按实测每个变异体跑一遍全量测试，全量跑以小时计），把它塞进门禁脚本里不合适。
 * 报告由 `pnpm mutation`（= `stryker run`）产出在 reports/mutation/mutation.json，
 * 本脚本只做格式转换。
 *
 * report-only：现在**不进** check-all。接进去之前必须先解决两件事，见任务报告：
 *   1. 报告的产生时机（check-all 是逐个脚本 spawn，不会先跑 pnpm mutation）；
 *   2. 假存活（vitest runner 与 vitest 5 的兼容问题，部分变异体报告 testsCompleted=0）。
 *
 * 用法：node scripts/verify/check-mutation.mjs
 */

import { readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createChecker } from './report.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const REPORT = join(ROOT, 'reports', 'mutation', 'mutation.json');
const { record, finish } = createChecker();

try {
  const mutants = Object.values(JSON.parse(readFileSync(REPORT, 'utf8')).files).flatMap(
    (file) => file.mutants,
  );
  if (mutants.length === 0) throw new Error('报告里没有任何变异体');
  /* Timeout / RuntimeError 也算「测试发现了问题」，与 Stryker 的 mutation score 口径一致。 */
  const detected = mutants.filter((mutant) =>
    ['Killed', 'Timeout', 'RuntimeError', 'CompileError'].includes(mutant.status),
  ).length;
  const score = ((detected / mutants.length) * 100).toFixed(1);
  record(
    '变异测试跑通并产出报告（stryker）',
    true,
    `变异分数 ${score}%（被发现的变异体 ${detected}/${mutants.length}），报告 ${relative(ROOT, REPORT).replace(/\\/g, '/')}`,
  );
} catch (error) {
  record('变异测试跑通并产出报告（stryker）', false, `读不到报告：${error.message}（先跑 pnpm mutation）`);
}

finish();

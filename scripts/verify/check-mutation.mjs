/*
 * 变异测试适配层（Stryker + Vitest，report-only）。
 *
 * 与 check-knip / check-eslint 同一个形状：跑工具，把结果映射成
 * 「通过/失败 <名称>」。这里只报「跑没跑成、分数多少、活下来几个」，
 * **不因为分数低判失败**（stryker.config.mjs 的 thresholds.break 是 null，
 * 这一层就该是报告性的）。
 *
 * 为什么只跑变更文件：变异测试是重操作（本仓 mutate 范围 74 个文件），
 * 全量一次以小时计，塞进门禁不现实。这里只跑「相对 HEAD 变更过、且在
 * mutate 范围内」的生产代码；没有变更文件就跳过（门禁保持秒级）。
 * 超过 MAX_CHANGED_FILES 个也跳过：那种情况单独跑 `pnpm mutation` 更合适，
 * 免得每次门禁都等几分钟。
 *
 * 范围规则与 stryker.config.mjs 的 STRYKER_SINCE 分支一致（那里用 git diff
 * 算同一个集合）；两边都改了的话要一起改。
 *
 * 用法：node scripts/verify/check-mutation.mjs
 */

import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createChecker } from './report.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const REPORT = join(ROOT, 'reports', 'mutation', 'mutation.json');
const NAME = '变异测试（变更文件，stryker）';
const MAX_CHANGED_FILES = 3;
const { record, finish } = createChecker();

/** 相对 HEAD 变更过的生产代码文件（与 stryker.config.mjs 同一套规则）。 */
function changedProductionFiles() {
  const run = spawnSync(
    'git',
    ['diff', '--name-only', '--diff-filter=ACMR', 'HEAD', '--', 'packages', 'apps'],
    { cwd: ROOT, encoding: 'utf8' },
  );
  return (run.stdout ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter(
      (file) =>
        /^packages\/[^/]+\/src\/.*\.ts$/.test(file) || /^apps\/extension\/src\/.*\.ts$/.test(file),
    );
}

const files = changedProductionFiles();

if (files.length === 0) {
  record(NAME, true, '无变更的生产代码文件，跳过');
} else if (files.length > MAX_CHANGED_FILES) {
  record(
    NAME,
    true,
    `变更的生产代码文件 ${files.length} 个（上限 ${MAX_CHANGED_FILES}），跳过；要跑请用 pnpm mutation`,
  );
} else {
  /*
   * `--mutate` 直接在命令行给文件列表：只跑这几个文件，也就用不着配置里的
   * STRYKER_SINCE 分支（那条路径在变更集为空时会抛错，这里是显式列表）。
   * `--reporters json`：门禁只取机器可读的结果。
   */
  const run = spawnSync(
    process.execPath,
    [
      join(ROOT, 'node_modules', '@stryker-mutator', 'core', 'bin', 'stryker.js'),
      'run',
      '--mutate',
      files.join(','),
      '--reporters',
      'json',
    ],
    { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
  );

  const output = `${run.stdout ?? ''}${run.stderr ?? ''}`;
  if (run.status !== 0) {
    const tail = output.trim().split('\n').slice(-2).join(' ').slice(0, 200);
    record(NAME, false, `stryker 退出码 ${run.status}：${tail}`);
  } else {
    try {
      const mutants = Object.values(JSON.parse(readFileSync(REPORT, 'utf8')).files).flatMap(
        (file) => file.mutants,
      );
      /* Timeout / RuntimeError 也算「测试发现了问题」，与 Stryker 的分数口径一致。 */
      const detected = mutants.filter((mutant) =>
        ['Killed', 'Timeout', 'RuntimeError', 'CompileError'].includes(mutant.status),
      ).length;
      const survived = mutants.filter((mutant) => mutant.status === 'Survived').length;
      const score = mutants.length === 0 ? 'n/a' : ((detected / mutants.length) * 100).toFixed(1);
      record(
        NAME,
        true,
        `变异分数 ${score}%（发现 ${detected}/${mutants.length}，存活 ${survived}），文件 ${files.length} 个，报告 ${relative(ROOT, REPORT).replace(/\\/g, '/')}`,
      );
    } catch (error) {
      record(NAME, false, `读不到报告：${error.message}`);
    }
  }
}

finish();

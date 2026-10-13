/*
 * 依赖版本一致（syncpack）。
 *
 * 此前「版本号」那一段是自写的：用正则读 7 个文件再比较。它有两个毛病——
 * 真正的风险（同一依赖在不同包里被写成不同版本）它看不到，而它自己重载的
 * 正则（/version:\s*'([^']+)'/）还会误匹配 minimum_chrome_version。
 * syncpack 是这件事的标准工具，默认策略就是「同一依赖在所有包里用同一个
 * specifier」，并且认识 workspace 协议。
 *
 * 两处与任务描述不同，都是实跑后的结论：
 *   1. v15 已把 list-mismatches 合并进 lint（前者运行即 exit 1），故用 lint；
 *   2. syncpack 无法比较各包自身的 version（local 类型下每个包是独立依赖名，
 *      不同名之间永不比较），那条不变量改由 check-version-literal.mjs 的
 *      结构断言守着。相应地，配置里用 `dependencyTypes: ["!local"]` 把
 *      「各包自身的 version」这类实例排除在检查之外——private 包不声明
 *      version 是刻意的，不排除会被报成 VERSION_IS_MISSING。
 *
 * 用法：node scripts/verify/check-syncpack.mjs
 */

import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createChecker, head } from './report.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { record, finish } = createChecker();

const run = spawnSync(
  process.execPath,
  [
    join(ROOT, 'node_modules', 'syncpack', 'index.cjs'),
    'lint',
    '--config',
    join(ROOT, 'scripts', 'verify', 'syncpack.config.json'),
  ],
  { cwd: ROOT, encoding: 'utf8' },
);

const output = `${run.stdout ?? ''}${run.stderr ?? ''}`;
const ok = run.status === 0;

/*
 * 只挑「真正的问题」那几行：✘ 是 mismatch，! 是信息性状态（如
 * VERSION_IS_MISSING），把后者当失败原因会指错方向。
 */
record(
  '同一依赖在各包版本一致（syncpack）',
  ok,
  ok ? '' : head(output, /[✘✗×]/) || head(output, /Issues found|error/i) || head(output),
);

finish();

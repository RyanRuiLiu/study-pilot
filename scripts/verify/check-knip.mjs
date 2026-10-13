/*
 * 未使用的导出、文件与依赖（knip）。
 *
 * 此前审计估出「约 50 处符号只在自己文件里用却写着 export」。这类判断靠人看不
 * 现实，交给 knip；配置在 scripts/verify/knip.jsonc：
 *   - entry：被 node 直接执行的脚本是入口，不是被 import 的库；
 *   - ignoreDependencies：用 `node node_modules/<tool>` 调用的 CLI 工具
 *     （syncpack / remark-cli / remark-validate-links），knip 看不到命令行调用。
 *
 * 门禁项名保留「导出」字样：真正被清掉的就是那些多余的 export。
 * 判断标准不在这个脚本里——哪些算未使用由 knip 说，这里只把结果映射成
 * 「通过/失败 <名称>」。
 *
 * 用法：node scripts/verify/check-knip.mjs
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
    join(ROOT, 'node_modules', 'knip', 'bin', 'knip.js'),
    '--config',
    join(ROOT, 'scripts', 'verify', 'knip.jsonc'),
    '--no-progress',
  ],
  { cwd: ROOT, encoding: 'utf8' },
);

const output = `${run.stdout ?? ''}${run.stderr ?? ''}`;
const ok = run.status === 0;

record(
  '没有未使用的导出、文件与依赖（knip）',
  ok,
  ok ? '' : head(output, /Unused|Unlisted|Unresolved|^\S+\s+\S+\.(ts|mjs|tsx)\b/i, 6) || head(output),
);

finish();

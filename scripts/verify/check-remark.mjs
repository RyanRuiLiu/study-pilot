/*
 * 文档链接与路径引用（remark + remark-validate-links）。
 *
 * 此前是两段自写正则：一段验 `[文字](目标)` 的目标文件存在，另一段验反引号里
 * 形如 `docs/x.md` 的路径存在。两段都只看「文件在不在」，看不到锚点，也看不全
 * 链接的各种写法。remark-validate-links 是这件事的标准插件：它校验 markdown
 * 链接与图片指向的本地文件、锚点、以及引用定义——比原来两段合起来更全。
 *
 * 因此文档里提到的仓库内文件现在都写成链接（链接文字仍是路径），由这一个
 * 插件统一负责；两条自写段已删。
 *
 * 跳过的是产物与调试目录（与门禁其它地方同一份清单）：里面的 md 是抓下来或
 * 生成的材料，不是项目内容。
 *
 * 用法：node scripts/verify/check-remark.mjs
 */

import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createChecker, head } from './report.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { record, finish } = createChecker();

const IGNORES = [
  'node_modules/**',
  '.reverse/**',
  '.probe/**',
  '.output/**',
  '.wxt/**',
  'dist/**',
  '.dev-profile/**',
  '.cdp-profile/**',
  '.tmp-profile/**',
  /*
   * 变异测试的沙箱：整份仓库的副本，里面的 md 不是项目文档。
   * 它只在跑 Stryker 时存在，但门禁不能因为「另一个进程正在跑测试」变红。
   * 沙箱位置见 stryker.config.mjs 的 tempDirName。
   */
  '.stryker-tmp/**',
];

const args = [
  join(ROOT, 'node_modules', 'remark-cli', 'cli.js'),
  '.',
  '--frail',
  '--quiet',
  '--no-color',
  '--use',
  'remark-validate-links',
];
for (const pattern of IGNORES) args.push('--ignore-pattern', pattern);

const run = spawnSync(process.execPath, args, { cwd: ROOT, encoding: 'utf8' });
const output = `${run.stdout ?? ''}${run.stderr ?? ''}`;
const ok = run.status === 0;

record(
  '文档链接与引用的路径都有效（remark）',
  ok,
  ok ? '' : head(output, /warning|error/i) || head(output),
);

finish();

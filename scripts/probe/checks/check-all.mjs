/*
 * 一条命令跑完全部门禁，并核对「门禁项有没有被悄悄删掉」。
 *
 * 为什么需要跑全：门禁是分开的三个脚本，此前我只跑 check-release 就以为
 * 「全绿」——而 check-copy 当时已经因为文件清单过期跑不起来。脚本各自正确，
 * 但没人负责把它们都跑一遍，漏跑不会报错。
 *
 * 为什么需要快照：脚本被改动时少一项、或改个名字，不会有人注意。本会话就
 * 发生过一次——清理代码时误删了两整段检查，是我自己数项数才发现的。因此把
 * 「该有哪些检查项」写进 expected-checks.json：运行结果与它不一致即失败。
 * 要删门禁，就得同时改快照，而这一步在 diff 里看得见——这就是它存在的意义。
 */

import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));

/*
 * 全部门禁脚本。加一个就多一行，同时同步快照。
 *
 * 适配脚本在 scripts/verify/ 下，用相对路径写：它们的唯一职责是把标准工具
 * （eslint / syncpack / remark / knip…）的结果转成「通过/失败 <名称>」。
 * 快照的键用文件名，与放在哪个目录无关。
 */
const SCRIPTS = [
  'check-release.mjs',
  'check-copy.mjs',
  'check-privacy.mjs',
  '../../verify/check-syncpack.mjs',
  '../../verify/check-version-literal.mjs',
];

const expected = JSON.parse(readFileSync(join(HERE, 'expected-checks.json'), 'utf8'));
const problems = [];

for (const name of SCRIPTS) {
  /* 快照的键是文件名，脚本放在 checks/ 还是 verify/ 不影响它。 */
  const key = basename(name);
  /*
   * 捕获输出而不是 stdio: 'inherit'：门禁自己打印的分项要原样透传（不在这里
   * 二次加工），同时需要解析出「哪些项真的跑过了」——只有运行结果说得准，
   * 解析源码会漏掉循环生成的检查项。
   */
  const run = spawnSync(process.execPath, [join(HERE, name)], { encoding: 'utf8' });
  process.stdout.write(run.stdout ?? '');
  process.stderr.write(run.stderr ?? '');

  if (run.status !== 0) problems.push(`${key} 未通过`);

  const actual = ((run.stdout ?? '') + (run.stderr ?? ''))
    .split('\n')
    .map((line) => /^(通过|失败)\s+(.+)$/.exec(line.trim()))
    .filter(Boolean)
    .map((match) => match[2].replace(/\s{2,}.*$/, '').trim());

  const want = expected[key] ?? [];
  const missing = want.filter((label) => !actual.includes(label));
  const added = actual.filter((label) => !want.includes(label));

  if (missing.length > 0) problems.push(`${key} 少了检查项：${missing.join(' / ')}`);
  if (added.length > 0) problems.push(`${key} 多了检查项（需同步快照）：${added.join(' / ')}`);

  console.log('');
}

if (problems.length > 0) {
  console.error('门禁未通过：');
  for (const problem of problems) console.error('  - ' + problem);
  process.exit(1);
}

const total = SCRIPTS.reduce((sum, name) => sum + (expected[basename(name)]?.length ?? 0), 0);
console.log(`全部门禁通过：${SCRIPTS.length} 个脚本、${total} 项，且检查项与快照一致。`);

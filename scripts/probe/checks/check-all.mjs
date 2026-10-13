/*
 * 一条命令跑完全部门禁。
 *
 * 为什么需要它：门禁是分开的三个脚本，此前我只跑 check-release 就以为
 * 「全绿」——而 check-copy 当时已经因为文件清单过期跑不起来了。
 * 分开的脚本各自正确，但**没人负责把它们都跑一遍**，漏跑不会报错。
 *
 * 用法：node scripts/probe/checks/check-all.mjs
 */

import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));

/** 全部门禁脚本。加一个就多一行，别的地方不用改。 */
const CHECKS = ['check-release.mjs', 'check-copy.mjs', 'check-privacy.mjs'];

const failed = [];

for (const name of CHECKS) {
  /*
   * stdio: 'inherit' 而不是捕获输出：门禁自己会打印「通过/失败」的分项，
   * 由它们直接写到终端，不在这里二次加工——加工一次就多一处可能失真。
   * 父进程只用退出码判断成败。
   */
  const result = spawnSync(process.execPath, [join(HERE, name)], { stdio: 'inherit' });
  if (result.status !== 0) failed.push(name);
  console.log('');
}

if (failed.length > 0) {
  console.error(`门禁未通过：${failed.join(' ')}`);
  process.exit(1);
}

console.log(`全部门禁通过（${CHECKS.length} 个脚本）。`);

/*
 * 隐私政策是否覆盖了申请的全部权限。
 *
 * 商店审查会逐条比对申请与说明。漏掉一条的代价是审核被退回，
 * 而这类遗漏很难靠肉眼发现——权限写在 manifest 里，说明写在另一个文件里，
 * 两边不会同时看到。加了 alarms 之后就漏过一次。
 *
 * 顺带核对主机权限。它在隐私政策里是按域名说明的，措辞与权限名不同，
 * 因此单独判而不是复用上面那段。
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..');

const manifest = JSON.parse(
  readFileSync(join(ROOT, 'apps/extension/.output/chrome-mv3/manifest.json'), 'utf8'),
);
const privacy = readFileSync(join(ROOT, 'PRIVACY.md'), 'utf8');

let failed = 0;
const permissions = manifest.permissions ?? [];
const hosts = manifest.host_permissions ?? [];

console.log('=== 权限 ===');
for (const permission of permissions) {
  const ok = privacy.includes('`' + permission + '`');
  if (!ok) failed++;
  console.log((ok ? '通过  ' : '失败  ') + permission + (ok ? '' : '  隐私政策里没有说明'));
}

console.log('');
console.log('=== 主机权限 ===');
for (const host of hosts) {
  // 隐私政策里写的是域名，不是权限串
  const domain = host.replace(/^\*:\/\//, '').replace(/\/\*$/, '');
  const ok = privacy.includes(domain);
  if (!ok) failed++;
  console.log((ok ? '通过  ' : '失败  ') + host + (ok ? '' : '  隐私政策里没有出现 ' + domain));
}

const total = permissions.length + hosts.length;
console.log('');
console.log(`共 ${total} 项，失败 ${failed} 项。`);
process.exit(failed === 0 ? 0 : 1);

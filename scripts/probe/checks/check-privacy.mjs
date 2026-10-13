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

console.log('');
console.log('=== 可选主机权限 ===');
/*
 * 可选主机权限是「声明了但未获授权」的：只有用户填写的 AI 接口地址会被真正申请。
 * 这里判两件事：
 *   1. 隐私政策必须说明它会向用户填写的地址发请求（措辞里要出现 AI 与可选）；
 *   2. 声明只能是通配——若是固定域名，说明代码里塞了厂商预设，与「不内置厂商」相悖。
 */
const optionalHosts = manifest.optional_host_permissions ?? [];
for (const host of optionalHosts) {
  const wildcard = host === '*://*/*';
  const described =
    /AI/.test(privacy) && /可选|按需|用户填写/.test(privacy);
  if (!wildcard || !described) failed++;
  console.log(
    (wildcard && described ? '通过  ' : '失败  ') +
      host +
      (wildcard ? '' : '  声明必须是通配，固定域名意味着内置了厂商') +
      (described ? '' : '  隐私政策没有说明「按需申请、发给用户填写的地址」'),
  );
}

const total = permissions.length + hosts.length + optionalHosts.length;
console.log('');
console.log(`共 ${total} 项，失败 ${failed} 项。`);
process.exit(failed === 0 ? 0 : 1);

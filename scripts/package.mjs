/*
 * 打包扩展，产出可以直接安装的目录与一个归档 zip。
 *
 * 不要用 `wxt zip` 的原因：它把 zip 作为唯一产物，而 Chrome 只能从
 * **解压后的目录**加载扩展，装的时候还得先手动解压一次，多一步且容易出错。
 * 这里直接产出两样：
 *   dist/study-pilot/          解压好的目录，装的就是它
 *   dist/study-pilot-<版本>.zip 归档用，也便于拷到别的机器
 *
 * 用法：node scripts/package.mjs
 */

import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createRequire } from 'node:module';

const ROOT = resolve(import.meta.dirname, '..');
const EXT = resolve(ROOT, 'apps/extension');
const OUT = resolve(EXT, '.output/chrome-mv3');
const DIST = resolve(ROOT, 'dist');

const require = createRequire(import.meta.url);

/** 从 manifest 读版本号，避免版本号写两处而不一致。 */
function readVersion() {
  const manifest = JSON.parse(readFileSync(resolve(OUT, 'manifest.json'), 'utf8'));
  return manifest.version;
}

console.log('构建…');
execFileSync('pnpm', ['--filter', '@study-pilot/extension', 'build'], {
  cwd: ROOT,
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

if (!existsSync(OUT)) {
  console.error(`构建产物不存在：${OUT}`);
  process.exit(1);
}

const version = readVersion();
const target = resolve(DIST, 'study-pilot');
const zipPath = resolve(DIST, `study-pilot-${version}.zip`);

console.log('整理产物…');
/*
 * 只清这个脚本自己产出的两项。
 *
 * 早先清的是整个 dist，那会连带删掉不是它生成的东西——商店列表用的
 * 图像也放在 dist 下，一次重新打包就把它们清掉了，而报错要到上传时
 * 才发现文件不在了。
 */
rmSync(target, { recursive: true, force: true });
rmSync(zipPath, { force: true });
mkdirSync(DIST, { recursive: true });
cpSync(OUT, target, { recursive: true });

/*
 * 归档 zip 用系统自带的压缩命令生成，不额外引入依赖。
 * 只打包目录内容，不打顶层文件夹——解压后直接就是扩展根目录。
 */
console.log('生成归档…');
if (process.platform === 'win32') {
  execFileSync(
    'powershell',
    ['-NoProfile', '-Command', `Compress-Archive -Path '${target}\\*' -DestinationPath '${zipPath}' -Force`],
    { stdio: 'inherit' },
  );
} else {
  execFileSync('zip', ['-r', '-q', zipPath, '.'], { cwd: target, stdio: 'inherit' });
}

console.log('');
console.log(`完成。版本 ${version}`);
console.log(`  安装用目录：${target}`);
console.log(`  归档：      ${zipPath}`);
console.log('');
console.log('安装步骤：');
console.log('  1. 打开 chrome://extensions');
console.log('  2. 打开右上角「开发者模式」');
console.log('  3. 点「加载已解压的扩展程序」，选择上面那个目录');

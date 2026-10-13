/*
 * 结构断言：全仓的版本字面量只允许有一个。
 *
 * 这不是规则引擎，是一条胶水断言。此前的做法是「把 7 处版本读出来比较」，
 * 检查的是「重复是否一致」；syncpack v15 覆盖不到包自身的 version
 * （local 类型下每个包是独立依赖名，不同名之间永不比较），所以换一个方向：
 * 与其检查重复是否一致，不如让第二个重复不存在——唯一来源本来就是这套仓库
 * 的主约束。版本只写在会被发布的那一个 package.json 里，其余 private 包不声明。
 *
 * 用法：node scripts/verify/check-version-literal.mjs
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createChecker } from './report.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { record, finish } = createChecker();

/** 根与所有工作区包的 package.json。 */
function packageJsonFiles() {
  const files = [join(ROOT, 'package.json')];
  for (const group of ['apps', 'packages']) {
    for (const name of readdirSync(join(ROOT, group))) {
      const file = join(ROOT, group, name, 'package.json');
      if (existsSync(file)) files.push(file);
    }
  }
  return files;
}

const rel = (path) => relative(ROOT, path).replace(/\\/g, '/');

const declared = packageJsonFiles()
  .map((file) => ({ file: rel(file), version: JSON.parse(readFileSync(file, 'utf8')).version }))
  .filter((entry) => typeof entry.version === 'string');

record(
  '版本号只有一个来源（package.json）',
  declared.length === 1,
  declared.length === 1
    ? `${declared[0].file} = ${declared[0].version}`
    : declared.map((entry) => `${entry.file} = ${entry.version}`).join('  ') || '一处都没有',
);

finish();

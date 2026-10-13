/*
 * 源码注释里引用的文档路径与节号。
 *
 * 为什么需要这条：remark 只看 markdown 里的链接，knip 不看注释，于是
 * 「注释里写着 docs/platforms/courseware.md」这种漂移没有任何门禁盯得住——
 * 文件被合并、改名、拆章之后，注释照旧指向一份不存在的文档或一个不存在的节号，
 * 而读代码的人会照着它去找。本条只用「文件在不在、节号在不在」两个判据，
 * 不判断内容是否对得上（那只能靠人读）。
 *
 * 用法：node scripts/verify/check-doc-refs.mjs
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createChecker } from './report.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { record, finish } = createChecker();

const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  '.reverse',
  '.probe',
  '.output',
  '.wxt',
  'dist',
  '.stryker-tmp',
  '.dev-profile',
  '.cdp-profile',
  '.tmp-profile',
]);

/** 递归收集 .ts 源码（注释里的文档引用都写在这里）。 */
function collectSources(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectSources(full));
    else if (entry.name.endsWith('.ts')) out.push(full);
  }
  return out;
}

/** 从文档里取出全部节号（标题形如 `## 3. 凭证`、`### 7.10 题目与…`）。 */
function sectionsOf(file) {
  const numbers = new Set();
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const match = /^#{2,6}\s+(\d+(?:\.\d+)*)[.\s、]/.exec(line.trim());
    if (match) numbers.add(match[1]);
  }
  return numbers;
}

/** 目标是不是一个存在的文件（不存在、目录、权限问题都算「没有」）。 */
function isFile(path) {
  try {
    return statSync(path).isFile();
  } catch {
    return false;
  }
}

/*
 * 节号有两种写法：`第 3 节` / `第 7.5/7.8 节`，以及紧跟在路径后面的裸号
 * `mooc.md 3.1）`。只认这两种，避免把注释里的版本号当成节号。
 */
const SECTION = /第\s*(\d+(?:\.\d+)*(?:\s*\/\s*\d+(?:\.\d+)*)*)\s*节/g;
const BARE = /^\s+(\d+(?:\.\d+)+)(?=\s*[）)。，、])/;
const REF = /docs\/[A-Za-z0-9._/-]+\.md/g;

const FILES = [...collectSources(join(ROOT, 'apps')), ...collectSources(join(ROOT, 'packages'))];
const problems = [];
let checked = 0;

for (const file of FILES) {
  const text = readFileSync(file, 'utf8');
  for (const [index, line] of text.split('\n').entries()) {
    for (const match of line.matchAll(REF)) {
      checked += 1;
      const target = join(ROOT, match[0]);
      const where = `${relative(ROOT, file)}:${index + 1}`;
      if (!isFile(target)) {
        problems.push(`${where} 指向不存在的 ${match[0]}`);
        continue;
      }
      const sections = sectionsOf(target);
      const rest = line.slice(match.index + match[0].length);
      const wanted = new Set();
      for (const ref of rest.matchAll(SECTION)) {
        for (const number of ref[1].split('/')) wanted.add(number.trim());
      }
      const bare = BARE.exec(rest);
      if (bare) wanted.add(bare[1]);
      for (const number of wanted) {
        if (!sections.has(number)) problems.push(`${where} 引用 ${match[0]} 第 ${number} 节，而该文件没有这一节`);
      }
    }
  }
}

record('源码注释引用的文档与节号都存在（doc-refs）', problems.length === 0, problems.slice(0, 3).join('  '));
console.log(`（检查了 ${checked} 处注释里的文档引用）`);

finish();

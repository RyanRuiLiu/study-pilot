/*
 * 把测试样本里的真实身份信息换成占位值。
 *
 * 样本取自真实账号，`evaluatorId` / `answererId` 这类字段带着本人的账号 id，
 * 而 cookie 里还有手机号与邮箱。它们对测试没有任何作用——测试断言的是
 * 「按结构 id 能不能匹配上」，用户 id 只是一个原样透传的值。
 * 留在仓库里则会让任何人都能把样本关联到具体账号。
 *
 * 真实值从命令行传入，不写在这个文件里
 * ------------------------------------
 * 这个脚本本身也在仓库里。把真实 id 写进替换表，等于脱敏工具自己成了
 * 泄露源——它每运行一次，就把那串数字再写进工作区一遍。
 *
 * 因此这里只保留可以从样本本身推断出来的通用模式（邮箱形态），
 * 具体的值由调用者临时给出：
 *
 *   node scripts/probe/maintain/purge-identity.mjs \
 *     --user-id 1234567890 --phone 13800000000 [--check]
 *
 * 也可以一次给多个：--phone 13800000000 --phone 13900000000。
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = join(import.meta.dirname, '../../..');
const CHECK_ONLY = process.argv.includes('--check');

/** 收集所有 --key value 形式的值。 */
function collect(flag) {
  const out = [];
  const argv = process.argv;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === flag && argv[i + 1]) out.push(argv[++i]);
  }
  return out;
}

/** 转义正则里的元字符。 */
function escapeRe(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const REPLACEMENTS = [];

// 用户 id 换成 1：样本里它只是个透传值，换成什么都不影响断言
for (const id of collect('--user-id')) {
  if (!/^\d+$/.test(id)) {
    console.error(`--user-id 必须是数字：${id}`);
    process.exit(2);
  }
  REPLACEMENTS.push({ pattern: new RegExp(escapeRe(id), 'g'), replacement: '1', label: '用户 id' });
}

// 手机号换成不可拨通的占位号
for (const phone of collect('--phone')) {
  if (!/^\d{11}$/.test(phone)) {
    console.error(`--phone 必须是 11 位数字：${phone}`);
    process.exit(2);
  }
  REPLACEMENTS.push({
    pattern: new RegExp(escapeRe(phone), 'g'),
    replacement: '10000000000',
    label: '手机号',
  });
}

/*
 * 邮箱前缀。
 *
 * 这一条不需要传参：STUDY_INFO 的值形态固定为 "yd.<16 位十六进制>@163.com|..."，
 * 从样本本身就能认出来，不依赖具体是谁的。
 */
REPLACEMENTS.push({
  pattern: /yd\.[0-9a-f]{16}@163\.com/g,
  replacement: 'user@example.com',
  label: '邮箱',
});

if (REPLACEMENTS.length === 0) {
  console.log('只检查邮箱形态。要一并处理用户 id 与手机号，请传 --user-id 与 --phone。');
}

/** 只处理这些目录下的文本文件。 */
const TARGET_DIRS = ['apps', 'packages', 'fixtures', 'docs', 'scripts'];
const TEXT_EXT = /\.(ts|mts|mjs|js|json|md|txt|dwr)$/;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (/node_modules|\.git$|\.output|\.wxt|\.probe|dist/.test(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (TEXT_EXT.test(name)) out.push(p);
  }
  return out;
}

let hits = 0;
let changed = 0;

for (const dir of TARGET_DIRS) {
  for (const file of walk(join(ROOT, dir))) {
    const original = readFileSync(file, 'utf8');
    let next = original;
    const found = [];

    for (const { pattern, replacement, label } of REPLACEMENTS) {
      const matches = next.match(pattern);
      if (matches) {
        found.push(`${label} ×${matches.length}`);
        next = next.replace(pattern, replacement);
      }
    }

    if (found.length === 0) continue;

    const rel = relative(ROOT, file).replace(/\\/g, '/');
    console.log(`${CHECK_ONLY ? '发现' : '已替换'}  ${rel}  ${found.join('  ')}`);
    hits++;

    if (!CHECK_ONLY && next !== original) {
      writeFileSync(file, next);
      changed++;
    }
  }
}

console.log('');
if (hits === 0) {
  console.log('没有发现需要清理的身份信息。');
} else if (CHECK_ONLY) {
  console.log(`${hits} 个文件含有身份信息。去掉 --check 执行替换。`);
} else {
  console.log(`${changed} 个文件已改写。`);
}

console.log('');
console.log('注意：这里只处理工作区。如果那些值曾经提交过，它们仍在 git 历史里，');
console.log('开仓前需要重写历史，或者改用新建仓库的方式。');

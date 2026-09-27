#!/usr/bin/env node
/**
 * 样本脱敏工具。
 *
 * 为什么需要：真实抓包里一定带身份字段（answererId / memberId / realName …）。
 * 这些样本要入库、要交接给下一位开发者，就不能带着真实身份走。
 *
 * 原则：
 *   - 只替换**身份类字段的值**，不动题目 id、选项 id、aid、tid 等结构性 id，
 *     否则样本就不能用于结构验证与回放了。
 *   - 替换为固定值而不是随机值，保证同一个人的字段在多个样本里一致，
 *     样本之间的关联关系不会被破坏。
 *   - 幂等：重复运行结果不变。
 *
 * 用法：
 *   node scripts/probe/inspect/redact.mjs <文件或目录> [更多路径…]
 *   node scripts/probe/inspect/redact.mjs --check <路径>     # 只报告，不修改
 */

import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

/** 身份字段 -> 固定替换值。 */
const ID_FIELDS = {
  answererId: 1000000001,
  memberId: 1000000001,
  userId: 1000000001,
  evaluatorId: 1000000001,
  studentId: 1000000001,
};

const TEXT_FIELDS = {
  realName: '\u793a\u4f8b\u7528\u6237',
  userName: '\u793a\u4f8b\u7528\u6237',
  email: 'user@example.com',
  mobile: '13800000000',
  phone: '13800000000',
};

const TEXT_EXT = new Set(['.json', '.jsonl', '.html', '.htm', '.har', '.txt']);

function redactJsonText(text) {
  let out = text;
  let hits = 0;
  for (const [field, value] of Object.entries(ID_FIELDS)) {
    // 值可能是数字或字符串（含引号），两种都覆盖
    out = out.replace(
      new RegExp(`("${field}"\\s*:\\s*)(-?\\d+|"[^"]*")`, 'g'),
      (_m, p1) => {
        hits++;
        return `${p1}${value}`;
      },
    );
  }
  for (const [field, value] of Object.entries(TEXT_FIELDS)) {
    out = out.replace(
      new RegExp(`("${field}"\\s*:\\s*)"[^"]*"`, 'g'),
      (_m, p1) => {
        hits++;
        return `${p1}${JSON.stringify(value)}`;
      },
    );
  }
  return { out, hits };
}

async function walk(target) {
  const s = await stat(target);
  if (s.isFile()) return [target];
  const entries = await readdir(target, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = path.join(target, e.name);
    if (e.isDirectory()) files.push(...(await walk(p)));
    else if (TEXT_EXT.has(path.extname(e.name).toLowerCase())) files.push(p);
  }
  return files;
}

const argv = process.argv.slice(2);
const checkOnly = argv[0] === '--check';
const targets = checkOnly ? argv.slice(1) : argv;

if (targets.length === 0) {
  console.error('用法: node scripts/probe/inspect/redact.mjs [--check] <文件或目录> ...');
  process.exit(2);
}

let totalHits = 0;
let totalFiles = 0;
let changedFiles = 0;

for (const target of targets) {
  for (const file of await walk(target)) {
    totalFiles++;
    const original = await readFile(file, 'utf8');
    const { out, hits } = redactJsonText(original);
    if (hits === 0) continue;
    totalHits += hits;
    if (out !== original) {
      changedFiles++;
      if (!checkOnly) await writeFile(file, out);
      const rel = path.relative(process.cwd(), file);
      console.log(`${checkOnly ? '[需要脱敏]' : '[已脱敏]'} ${rel}  (${hits} 处)`);
    }
  }
}

console.log(
  `\n扫描 ${totalFiles} 个文件，命中 ${totalHits} 处` +
    (checkOnly ? '（未修改）' : `，改写 ${changedFiles} 个文件`),
);

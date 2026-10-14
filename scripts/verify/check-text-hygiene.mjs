/*
 * 文本卫生：把「编辑器悄悄改坏文本」这一类问题变成机器检查。
 *
 * 为什么需要它：`.gitattributes`（`* text=auto eol=lf`）只在 git 检出与入库时
 * 生效，管不住编辑器/脚本直接写进工作区的字节；`.editorconfig` 只对愿意读它的
 * 编辑器有效。于是同一类问题反复出现，靠人记是记不住的：
 *   - 换行符：Windows 编辑器写成 CRLF，diff 整文件抖动、按文本匹配的脚本对不上；
 *   - 控制字符：把 `` `f `` 当转义写出过 U+000C（换页符），肉眼看不出；
 *   - BOM / 结尾换行：随编辑器而定；
 *   - 隐形字符：零宽空格之类混进代码，读起来一模一样。
 *
 * 判据不是「好看」：CRLF 与 BOM 会让任何按字节比较的工具（构建、diff、脚本
 * 里的字符串替换）产生与内容无关的差异；控制字符与隐形字符则会让同一段代码
 * 在两台机器上行为不同。这些都是能机器判定的事实，因此写成门禁。
 *
 * 用法：node scripts/verify/check-text-hygiene.mjs
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createChecker } from './report.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { record, finish } = createChecker();

/** 不看的地方：产物、依赖、探测材料、抓取样本。 */
const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  '.output',
  '.wxt',
  '.probe',
  '.reverse',
  'coverage',
  '.stryker-tmp',
  'dist',
  'reports',
]);

/** 只看文本文件。二进制按扩展名排除。 */
const TEXT_EXT = [
  '.ts', '.tsx', '.mjs', '.cjs', '.js', '.json', '.jsonc', '.css', '.html',
  '.md', '.yml', '.yaml', '.txt', '.editorconfig', '.gitattributes', '.gitignore',
];
const BINARY_EXT = ['.png', '.jpg', '.jpeg', '.gif', '.ico', '.woff', '.woff2', '.zip', '.pdf'];

/** 代码文件（隐形空白在这里一律不许出现；Markdown 允许 U+00A0 做排版）。 */
const CODE_EXT = ['.ts', '.tsx', '.mjs', '.cjs', '.js', '.json', '.jsonc', '.css', '.html', '.yml', '.yaml'];

function collect(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      collect(path, out);
      continue;
    }
    if (BINARY_EXT.some((ext) => name.endsWith(ext))) continue;
    if (!TEXT_EXT.some((ext) => name.endsWith(ext)) && !name.startsWith('.')) continue;
    out.push(path);
  }
  return out;
}

const files = collect(ROOT);
const rel = (path) => relative(ROOT, path).replace(/\\/g, '/');

/** 逐项检查，收集前几个违例（全部列出会淹掉输出）。 */
function scan(predicate) {
  const offenders = [];
  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    const detail = predicate(text, file);
    if (detail !== null) offenders.push(`${rel(file)}${detail ? `（${detail}）` : ''}`);
  }
  return offenders;
}

function report(name, offenders, okDetail) {
  record(
    name,
    offenders.length === 0,
    offenders.length === 0
      ? `${okDetail}（检查 ${files.length} 个文件）`
      : `${offenders.length} 处：${offenders.slice(0, 3).join('；')}`,
  );
}

// 1) 换行符
report(
  '文本文件一律 LF（没有 CRLF）',
  scan((text) => (text.includes('\r\n') ? `${(text.match(/\r\n/g) ?? []).length} 处 CRLF` : null)),
  '全部 LF',
);

// 2) 控制字符：只允许 \n 与 \t
report(
  '文本文件不含控制字符（\\n 与 \\t 除外）',
  scan((text) => {
    const bad = new Set();
    for (const ch of text) {
      const code = ch.codePointAt(0) ?? 0;
      const allowed = code === 0x0a || code === 0x09;
      const control = code <= 0x1f || code === 0x7f;
      if (control && !allowed) bad.add(`U+${code.toString(16).toUpperCase().padStart(4, '0')}`);
    }
    return bad.size === 0 ? null : [...bad].join(',');
  }),
  '没有控制字符',
);

// 3) BOM 与结尾换行
report(
  '文本文件不带 BOM，且以换行结尾',
  scan((text) => {
    if (text.startsWith('\uFEFF')) return '开头有 BOM';
    if (text.length > 0 && !text.endsWith('\n')) return '结尾没有换行';
    return null;
  }),
  'BOM 与结尾换行都合规',
);

// 4) 代码文件里的隐形字符
report(
  '代码文件不含隐形字符（零宽、非断行空格等）',
  scan((text, file) => {
    if (!CODE_EXT.some((ext) => file.endsWith(ext))) return null;
    const found = text.match(/[\u00A0\u200B-\u200D\u2060\uFEFF\u3000]/g);
    if (found === null) return null;
    const codes = [...new Set(found.map((ch) => `U+${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`))];
    return codes.join(',');
  }),
  '没有隐形字符',
);

finish();

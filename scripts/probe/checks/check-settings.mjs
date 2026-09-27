/*
 * 设置项与实际行为是否对得上。
 *
 * 查两类问题，它们都会骗过肉眼：
 *
 *   假开关   设置页有一个开关，但业务逻辑从没读过它。用户拨动了它，
 *            界面上状态也变了，而没有任何行为跟着变。
 *            deadlineBadge 就这样存在过一段时间。
 *
 *   死设置   设置了默认值，但从没有地方引用。通常是重构后忘了接上。
 *
 * 判据是「开关所属的那个模块名是否出现在设置页与 schema 之外」。
 * 为什么不查叶子名：嵌套开关的叶子都叫 enabled，同名同姓，
 * 数出来的次数是它们的总和，于是每一个看起来都有人读。
 * 而模块名（autoQuiz、deadlineBadge）是唯一的，查它才说明问题。
 *
 * 解析 DEFAULT_SETTINGS 时逐字符扫而不是按行处理：对象可能写在一行里
 * （`quizHelper: { enabled: true },`），按行切会让花括号对不上，
 * 路径就会串成 `foreground.quizHelper.homeworkAnswers...` 这样。
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..');

function collect(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (/node_modules|\.wxt|\.output|^dist$/.test(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) collect(full, out);
    else if (/\.ts$/.test(name)) out.push(full);
  }
  return out;
}

const ALL = [
  ...collect(join(ROOT, 'apps/extension/src')),
  ...collect(join(ROOT, 'apps/extension/entrypoints')),
  ...collect(join(ROOT, 'packages')),
].map((f) => ({
  rel: relative(ROOT, f).replace(/\\/g, '/'),
  text: readFileSync(f, 'utf8'),
}));

const DEFINITION = 'apps/extension/src/settings/schema.ts';
const STORAGE = 'apps/extension/src/settings/storage.ts';
const UI = [
  'apps/extension/entrypoints/options/main.ts',
  'apps/extension/entrypoints/popup/main.ts',
];

const schemaText = ALL.find((f) => f.rel === DEFINITION).text;

/** 去掉注释，免得注释里的花括号干扰解析。 */
function stripComments(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
}

/**
 * 从 DEFAULT_SETTINGS 里抽出所有布尔字段的完整路径。
 *
 * 逐字符扫：遇到 `名字:` 后跟 `{` 就压栈；`}` 出栈；
 * `名字: true|false` 就记一条路径。
 */
function extractBooleans(source) {
  const start = source.indexOf('export const DEFAULT_SETTINGS');
  if (start < 0) return null;
  const text = stripComments(source.slice(start));

  const paths = [];
  const stack = [];
  let i = 0;
  let pendingKey = null;

  while (i < text.length) {
    const ch = text[i];

    if (ch === '{') {
      if (pendingKey !== null) stack.push(pendingKey);
      pendingKey = null;
      i++;
      continue;
    }

    if (ch === '}') {
      stack.pop();
      pendingKey = null;
      i++;
      continue;
    }

    // 匹配 `名字:` 之后跳过空白，看下一个字符是 { 还是值
    if (/[A-Za-z_$]/.test(ch)) {
      const m = /^([A-Za-z_$][\w$]*)\s*:/.exec(text.slice(i));
      if (m) {
        const key = m[1];
        i += m[0].length;
        // 跳过空白
        while (i < text.length && /\s/.test(text[i])) i++;
        const next = text[i];

        if (next === '{') {
          pendingKey = key;
          continue;
        }

        const lit = /^(true|false)\b/.exec(text.slice(i));
        if (lit && stack.length > 0) {
          paths.push([...stack, key].join('.'));
          i += lit[0].length;
          continue;
        }
        continue;
      }
    }

    i++;
  }

  return paths;
}

const paths = extractBooleans(schemaText);
if (paths === null) {
  console.error('未找到 DEFAULT_SETTINGS，schema 结构变了，这个检查需要跟着改');
  process.exit(1);
}

/** 开关所属的模块名。顶层开关（enabled）没有父级。 */
function moduleOf(path) {
  const parts = path.split('.');
  return parts.length >= 2 ? parts[parts.length - 2] : null;
}

console.log('=== 开关是否被业务逻辑读取 ===');
let suspects = 0;

for (const path of paths) {
  const module = moduleOf(path);

  if (module === null) {
    const readers = ALL.filter(
      (f) => !UI.includes(f.rel) && f.rel !== DEFINITION && new RegExp(`\\b${path}\\b`).test(f.text),
    );
    const ok = readers.length > 0;
    if (!ok) suspects++;
    console.log(`  ${ok ? '通过' : '可疑'}  ${path}${ok ? '' : '  没有任何逻辑读它'}`);
    continue;
  }

  const readers = ALL.filter(
    (f) =>
      !UI.includes(f.rel) &&
      f.rel !== DEFINITION &&
      f.rel !== STORAGE &&
      new RegExp(`\\b${module}\\b`).test(f.text),
  );

  if (readers.length === 0) {
    console.log(`  可疑  ${path}  界面能拨，但 ${module} 在业务逻辑里从未出现`);
    suspects++;
  } else {
    const where = readers.map((r) => r.rel.split('/').pop()).join(' ');
    console.log(`  通过  ${path}  ← ${where}`);
  }
}

/*
 * 反向查：代码里读了但 schema 里没有的设置。
 * 这类通常是重构后遗留的旧字段，读到的是 undefined，
 * 行为会退化成默认分支而不报错——比假开关更隐蔽。
 */
console.log('');
console.log('=== 行为里读取但 schema 未定义的设置 ===');
const accesses = new Set();
for (const { text } of ALL) {
  for (const m of text.matchAll(/mooc\.(?:background|foreground)\.(\w+)/g)) accesses.add(m[1]);
}

const NOT_FIELDS = new Set(['background', 'foreground']);
let missing = 0;
for (const field of [...accesses].sort()) {
  if (NOT_FIELDS.has(field)) continue;
  if (!new RegExp(`\\b${field}\\b`).test(schemaText)) {
    console.log(`  缺失  ${field}  代码在读，schema 里没有`);
    missing++;
  }
}
if (missing === 0) console.log('  （无）');

console.log('');
console.log(`可疑开关 ${suspects} 处，未定义设置 ${missing} 处。`);
process.exit(suspects + missing === 0 ? 0 : 1);

/*
 * 列出界面上所有面向用户的文案。
 *
 * 用途是通读一遍，检查措辞是否得体、是否与功能一致、有没有不该出现的说法。
 * 逐条人工审，而不是靠正则挑关键词——措辞问题大多是「说得过了」或
 * 「说得含糊」，两者都没有固定的可疑词。
 *
 * 用法：node scripts/probe/maintain/dump-copy.mjs
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = join(import.meta.dirname, '../../..');

/** 界面代码所在位置。 */
const TARGETS = [
  'apps/extension/entrypoints/options/main.ts',
  'apps/extension/entrypoints/options/index.html',
  'apps/extension/entrypoints/popup/main.ts',
  'apps/extension/entrypoints/popup/index.html',
  'apps/extension/src/features',
  'apps/extension/src/background/reminder.ts',
  'apps/extension/src/background/work-status.ts',
  'apps/extension/src/platform/messaging.ts',
];

/** 中文串。够长才收录，滤掉单字与纯符号。 */
const CJK = /[\u4e00-\u9fa5]/;

function walk(p, out = []) {
  const st = statSync(p);
  if (st.isDirectory()) {
    for (const name of readdirSync(p)) walk(join(p, name), out);
  } else if (/\.(ts|html)$/.test(p) && !/\.test\.ts$/.test(p)) {
    out.push(p);
  }
  return out;
}

const files = TARGETS.flatMap((t) => {
  const full = join(ROOT, t);
  try {
    return walk(full);
  } catch {
    return [];
  }
});

let total = 0;

for (const file of files) {
  const rel = relative(ROOT, file).replace(/\\/g, '/');
  const lines = readFileSync(file, 'utf8').split('\n');
  const found = [];

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    // 跳过注释行：注释是给开发者看的，不算界面文案
    if (trimmed.startsWith('*') || trimmed.startsWith('//') || trimmed.startsWith('/*')) return;

    for (const m of line.matchAll(/'([^'\\]{2,})'|"([^"\\]{2,})"|>([^<>{}]{2,})</g)) {
      const text = m[1] ?? m[2] ?? m[3] ?? '';
      if (!CJK.test(text)) continue;
      // 滤掉纯标点、模板片段
      if (/^[\s、。，：；（）「」\/·—…]+$/.test(text)) continue;
      found.push({ line: i + 1, text: text.trim() });
    }
  });

  if (found.length === 0) continue;

  console.log(`\n── ${rel}  (${found.length} 条)`);
  for (const { line, text } of found) {
    console.log(`  ${String(line).padStart(4)}  ${text}`);
    total++;
  }
}

console.log(`\n\n共 ${total} 条界面文案，分布在 ${files.length} 个文件里。`);
console.log('');
console.log('通读时看三件事：');
console.log('  1. 有没有把话说过了——宣称、保证、与平台有关联的暗示');
console.log('  2. 有没有说得含糊——用户看不出这条到底做什么');
console.log('  3. 同一样东西在不同地方是否用了同一个说法');

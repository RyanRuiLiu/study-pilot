/*
 * 核对 HTML / TS 里用到的类名是否都有对应样式。
 *
 * 改样式时最容易出的错是删掉某条规则，而某个元素还在用它——
 * 页面不报错，只是那一块没样式，很难一眼看出来。
 *
 * 用法：node scripts/probe/checks/check-classes.mjs
 */

import { readFileSync } from 'node:fs';

/** 收集 CSS 里定义过的所有类名。 */
function definedClasses(css) {
  const out = new Set();
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '');
  for (const m of clean.matchAll(/\.([a-zA-Z][\w-]*)/g)) out.add(m[1]);
  return out;
}

/** 收集源码里用到的类名：className = '...'、classList.add(...)、class="..."。 */
function usedClasses(source) {
  const out = new Set();
  for (const m of source.matchAll(/className\s*=\s*'([^']+)'/g)) {
    for (const c of m[1].split(/\s+/)) if (c) out.add(c);
  }
  for (const m of source.matchAll(/classList\.(?:add|toggle|remove)\(([^)]*)\)/g)) {
    for (const q of m[1].matchAll(/'([^']+)'/g)) {
      for (const c of q[1].split(/\s+/)) if (c) out.add(c);
    }
  }
  for (const m of source.matchAll(/class="([^"]+)"/g)) {
    for (const c of m[1].split(/\s+/)) if (c) out.add(c);
  }
  return out;
}

const results = [];
const record = (name, ok, detail) => {
  results.push({ name, ok, detail });
  console.log(`${ok ? '通过' : '失败'}  ${name}${detail ? `  ${detail}` : ''}`);
};

const pairs = [
  {
    label: '弹窗',
    css: ['apps/extension/src/ui/tokens.css', 'apps/extension/entrypoints/popup/style.css'],
    sources: ['apps/extension/entrypoints/popup/index.html', 'apps/extension/entrypoints/popup/main.ts'],
  },
  {
    label: '设置页',
    css: ['apps/extension/src/ui/tokens.css', 'apps/extension/entrypoints/options/style.css'],
    sources: [
      'apps/extension/entrypoints/options/index.html',
      'apps/extension/entrypoints/options/main.ts',
    ],
  },
];

/*
 * 这些类名不来自 CSS：
 *   f-dn        —— 通用隐藏类，在各自的样式文件里定义
 *   动态拼接的  —— 如 `details-status ${statusClass()}` 会产出 ok / active / warn
 * 因此单独列出，避免误报。
 */
const DYNAMIC = new Set(['ok', 'active', 'warn', 'is-on', 'is-off', 'is-error', 'is-current', 'err', 'is-urgent']);

for (const pair of pairs) {
  console.log(`\n=== ${pair.label} ===`);

  const defined = new Set();
  for (const f of pair.css) {
    for (const c of definedClasses(readFileSync(f, 'utf8'))) defined.add(c);
  }

  const used = new Set();
  for (const f of pair.sources) {
    for (const c of usedClasses(readFileSync(f, 'utf8'))) used.add(c);
  }

  const missing = [...used].filter((c) => !defined.has(c) && !DYNAMIC.has(c)).sort();
  record(
    `${pair.label}：用到的类都有样式`,
    missing.length === 0,
    missing.length ? `缺 ${missing.join(', ')}` : `${used.size} 个类均有定义`,
  );

  if (missing.length > 0) {
    console.log(`  未找到样式的类：`);
    for (const c of missing) {
      // 指出出现在哪个文件，便于定位
      const where = pair.sources.filter((f) => readFileSync(f, 'utf8').includes(c));
      console.log(`    .${c}  ← ${where.map((w) => w.split('/').pop()).join(', ')}`);
    }
  }
}

console.log('');
const failed = results.filter((r) => !r.ok);
console.log(`共 ${results.length} 项，通过 ${results.length - failed.length} 项，失败 ${failed.length} 项。`);

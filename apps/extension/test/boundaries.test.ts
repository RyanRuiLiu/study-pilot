/*
 * 架构适应度函数（fitness function）：把分层规则写成能自动跑的检查。
 *
 * 为什么要它：六边形架构原文里说得很直白——「没有检测承诺是否被违反的手段，
 * 过几年新的一层又堆满了业务逻辑」。规则只写在注释里靠人记，等于没有规则；
 * 而 AI 改代码时更不会记得。
 *
 * 为什么放在这个包的测试里：仓库的测试入口是各包的 vitest（`pnpm -r test`），
 * 没有根级 runner。规则是仓库级的，先挂在这里跑；将来若有根级 runner，整文件搬过去即可。
 *
 * 检查手段：**先把注释与字符串内容剥掉再找关键字**。平台源码的注释里出现过
 * `window.md5`、`document.cookie` 这类引用（引用平台自己的 JS），直接 grep 会假红。
 *
 * 已知局限（写在这里而不是假装没有）：
 *   - 模板字符串里 `${...}` 的内容也会被剥掉，因此写在插值里的 `browser.` 查不出来；
 *   - 只认 `from '...'` 与 `import('...')` 两种取模块的写法。
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { describe, expect, it } from 'vitest';

/* ---------- 找仓库根：从当前工作目录往上找到 pnpm-workspace.yaml ---------- */
function findRepoRoot(): string {
  let dir = process.cwd();
  for (let depth = 0; depth < 6; depth += 1) {
    try {
      if (statSync(join(dir, 'pnpm-workspace.yaml')).isFile()) return dir;
    } catch {
      // 继续往上
    }
    dir = resolve(dir, '..');
  }
  throw new Error('找不到仓库根（pnpm-workspace.yaml）');
}

const repoRoot = findRepoRoot();
const SKIP = new Set(['node_modules', '.output', '.wxt', 'dist']);

/**
 * 该不该跳过这个目录项。
 *
 * 点开头的一律跳过：项目内容不住在点目录里，而 `.probe/` 下是一个真的
 * Chromium profile（成千上万个文件、锁文件、坏软链）。拿它当「项目源码」扫，
 * 一是白扫一遍，二是 `statSync` 撞上断链会让这条门禁整个崩掉——
 * 门禁该在违规时红，不该在路过调试目录时红。
 */
function skipped(name: string): boolean {
  return SKIP.has(name) || name.startsWith('.');
}

/** 取条目类型；断链/权限问题按「不是目录，也不是 .ts 源文件」处理，不让扫描崩掉。 */
function isDirectory(full: string): boolean {
  try {
    return statSync(full).isDirectory();
  } catch {
    return false;
  }
}

function listFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    if (skipped(entry)) continue;
    const full = join(dir, entry);
    if (isDirectory(full)) out.push(...listFiles(full));
    else if (full.endsWith('.ts')) out.push(full);
  }
  return out;
}

function listDirs(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    if (skipped(entry)) continue;
    const full = join(dir, entry);
    if (isDirectory(full)) out.push(full);
  }
  return out;
}

/** 剥掉注释与字符串内容（保留引号本身，便于另行解析模块说明符）。 */
function stripNoise(code: string): string {
  let out = '';
  let i = 0;
  let mode: 'code' | 'line' | 'block' | 'single' | 'double' | 'template' = 'code';
  while (i < code.length) {
    const char = code[i] ?? '';
    const next = code[i + 1] ?? '';
    if (mode === 'code') {
      if (char === '/' && next === '/') { mode = 'line'; i += 2; continue; }
      if (char === '/' && next === '*') { mode = 'block'; i += 2; continue; }
      if (char === "'" || char === '"' || char === '`') {
        mode = char === "'" ? 'single' : char === '"' ? 'double' : 'template';
        out += char;
        i += 1;
        continue;
      }
      out += char;
      i += 1;
      continue;
    }
    if (mode === 'line') {
      if (char === '\n') { mode = 'code'; out += '\n'; }
      i += 1;
      continue;
    }
    if (mode === 'block') {
      if (char === '*' && next === '/') { mode = 'code'; i += 2; } else i += 1;
      continue;
    }
    if (mode === 'single' || mode === 'double') {
      if (char === '\\') { i += 2; continue; }
      const closing = mode === 'single' ? "'" : '"';
      if (char === closing) { out += char; mode = 'code'; }
      i += 1;
      continue;
    }
    // template：整体剥掉（含 ${...}，见文件头的已知局限）
    if (char === '\\') { i += 2; continue; }
    if (char === '`') { out += char; mode = 'code'; }
    i += 1;
  }
  return out;
}

function specifiersOf(code: string): string[] {
  const specs: string[] = [];
  for (const match of code.matchAll(/from\s+['"]([^'"]+)['"]/g)) {
    if (match[1] !== undefined) specs.push(match[1]);
  }
  for (const match of code.matchAll(/import\(\s*['"]([^'"]+)['"]\s*\)/g)) {
    if (match[1] !== undefined) specs.push(match[1]);
  }
  return specs;
}

function inside(child: string, parent: string): boolean {
  const rel = relative(parent, child);
  return rel !== '' && !rel.startsWith('..') && !rel.startsWith(`..${sep}`);
}

const packagesDir = join(repoRoot, 'packages');
const appsDir = join(repoRoot, 'apps');
const packageDirs = listDirs(packagesDir);
const packageFiles = listFiles(packagesDir);
const appFiles = listFiles(appsDir);

/* R5 的例外集合。当前为空——出现过例外时在这里登记并写明为什么。 */
const R5_ALLOWED = new Set<string>();

describe('分层边界（机械核对，不靠人记）', () => {
  it('R1 包内不出现浏览器/Node 宿主的全局，也不 import wxt', () => {
    const violations: string[] = [];
    for (const file of packageFiles) {
      const code = readFileSync(file, 'utf8');
      const stripped = stripNoise(code);
      const match = stripped.match(/\b(browser|chrome|window|document)\s*[.(]/);
      if (match) violations.push(`${relative(repoRoot, file)} 用了 ${match[0]}`);
      if (specifiersOf(code).some((spec) => spec === 'wxt' || spec.startsWith('wxt/'))) {
        violations.push(`${relative(repoRoot, file)} import 了 wxt`);
      }
    }
    expect(violations).toEqual([]);
  });

  it('R2 包的相对 import 不许跑出本包，也不许指向 apps', () => {
    const violations: string[] = [];
    for (const pkg of packageDirs) {
      for (const file of listFiles(pkg)) {
        for (const spec of specifiersOf(readFileSync(file, 'utf8'))) {
          if (spec.includes('apps/')) {
            violations.push(`${relative(repoRoot, file)} → ${spec}`);
            continue;
          }
          if (!spec.startsWith('.')) continue;
          if (!inside(resolve(dirname(file), spec), pkg)) {
            violations.push(`${relative(repoRoot, file)} → ${spec}（跑出本包）`);
          }
        }
      }
    }
    expect(violations).toEqual([]);
  });

  it('R3 应用层不认识任何厂商', () => {
    const applicationDir = join(packagesDir, 'application');
    const violations: string[] = [];
    for (const file of listFiles(applicationDir)) {
      const text = `${readFileSync(file, 'utf8')}`;
      for (const word of ['platform-mooc', 'platform-zhs', 'icourse163']) {
        if (stripNoise(text).includes(word) || specifiersOf(text).some((spec) => spec.includes(word))) {
          violations.push(`${relative(repoRoot, file)} 提到 ${word}`);
        }
      }
    }
    expect(violations).toEqual([]);
  });

  it('R4 厂商适配器不直接用宿主全局（宿主能力由端口注入）', () => {
    const adaptersDir = join(appsDir, 'extension', 'src', 'adapters');
    const violations: string[] = [];
    for (const file of listFiles(adaptersDir)) {
      const match = stripNoise(readFileSync(file, 'utf8')).match(/\bbrowser\s*[.(]/);
      if (match) violations.push(`${relative(repoRoot, file)} 用了 ${match[0]}`);
    }
    expect(violations).toEqual([]);
  });

  it('R5 各载体之间互不依赖（相对 import 不许跑出自己的 app）', () => {
    const violations: string[] = [];
    for (const app of listDirs(appsDir)) {
      for (const file of listFiles(app)) {
        if (R5_ALLOWED.has(relative(repoRoot, file).split(sep).join('/'))) continue;
        for (const spec of specifiersOf(readFileSync(file, 'utf8'))) {
          if (!spec.startsWith('.')) continue;
          if (!inside(resolve(dirname(file), spec), app)) {
            violations.push(`${relative(repoRoot, file)} → ${spec}（跑出本载体）`);
          }
        }
      }
    }
    expect(violations).toEqual([]);
  });

  it('R7 文件级循环为 0', () => {
    const files = [...packageFiles, ...appFiles];
    const graph = new Map<string, string[]>();
    for (const file of files) {
      const targets: string[] = [];
      for (const spec of specifiersOf(readFileSync(file, 'utf8'))) {
        if (!spec.startsWith('.')) continue;
        const base = resolve(dirname(file), spec);
        for (const candidate of [base, `${base}.ts`, join(base, 'index.ts')]) {
          if (files.includes(candidate)) {
            targets.push(candidate);
            break;
          }
        }
      }
      graph.set(file, targets);
    }

    const state = new Map<string, 'visiting' | 'done'>();
    const found: string[] = [];
    const walk = (file: string, trail: string[]): void => {
      if (state.get(file) === 'done') return;
      if (state.get(file) === 'visiting') {
        found.push([...trail.slice(trail.indexOf(file)), file].map((f) => relative(repoRoot, f)).join(' → '));
        return;
      }
      state.set(file, 'visiting');
      for (const next of graph.get(file) ?? []) walk(next, [...trail, file]);
      state.set(file, 'done');
    };
    for (const file of files) walk(file, []);
    expect(found).toEqual([]);
  });
});

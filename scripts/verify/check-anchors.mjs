/*
 * 页面锚点：源码里指向某个页面的 #anchor，必须在那个页面的 HTML 里有对应 id。
 *
 * 为什么需要这条：remark 只看 markdown 链接，eslint 与 knip 不看字符串，
 * 于是「点通知落到 options.html#details」这类跳转在内容搬家之后会静默失效——
 * 锚点不存在时浏览器不报错，只是停在页面顶部，谁都不会发现。本条只判
 * 「id 在不在」，不判断跳到那里是否合适（那只能靠人读）。
 *
 * 两类判据：
 *   1. 写死页面的引用 `dashboard.html#platforms`（代码或注释里都算），
 *      目标页面必须有这个 id，页面本身也得存在。
 *   2. 页面按 id 取元素：`required<...>('#x')` 与 `getElementById('x')`。
 *      文件在 entrypoints/<页>/ 下时，id 必须在该页自己的 HTML 里；
 *      文件在 src/ 或别处时（例如后台的通知点击），在某个页面里有即可。
 *
 * 颜色字面量（#98a2b3）不是锚点，按十六进制形态排除。
 *
 * 用法：node scripts/verify/check-anchors.mjs
 */

import { readFileSync, readdirSync } from 'node:fs';
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

function collect(dir, extensions, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) collect(full, extensions, out);
    else if (extensions.some((extension) => entry.name.endsWith(extension))) out.push(full);
  }
  return out;
}

const rel = (file) => relative(ROOT, file).replace(/\\/g, '/');

/** 十六进制颜色不是锚点。 */
const HEX = /^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

// ---------- 每个页面有哪些 id ----------

const ENTRYPOINTS = join(ROOT, 'apps', 'extension', 'entrypoints');
/** 页面名（options / dashboard / popup…）→ 该页 HTML 里的 id 集合。 */
const PAGES = new Map();

for (const file of collect(ENTRYPOINTS, ['.html'])) {
  /*
   * 页面名取 entrypoints 下的第一段目录名，不取文件名：WXT 的入口是
   * entrypoints/options/index.html → 构建出 options.html，三个页面都叫 index.html。
   */
  const page = relative(ENTRYPOINTS, file).replace(/\\/g, '/').split('/')[0].replace(/\.html$/, '');
  const ids = PAGES.get(page) ?? new Set();
  for (const match of readFileSync(file, 'utf8').matchAll(/\bid="([^"]+)"/g)) ids.add(match[1]);
  PAGES.set(page, ids);
}

const ANY_PAGE = new Set([...PAGES.values()].flatMap((ids) => [...ids]));
const problems = [];
let anchors = 0;
let lookups = 0;

// ---------- 1. 写死页面的锚点 ----------

const PAGE_ANCHOR = /([A-Za-z0-9_-]+)\.html#([A-Za-z0-9_-]+)/g;

const SOURCES = [
  ...collect(join(ROOT, 'apps', 'extension'), ['.ts', '.html']),
];

for (const file of SOURCES) {
  const text = readFileSync(file, 'utf8');
  for (const [index, line] of text.split('\n').entries()) {
    for (const match of line.matchAll(PAGE_ANCHOR)) {
      anchors += 1;
      const [, page, id] = match;
      const where = `${rel(file)}:${index + 1}`;
      const ids = PAGES.get(page);
      if (!ids) problems.push(`${where} 指向不存在的页面 ${page}.html`);
      else if (!ids.has(id)) problems.push(`${where} 指向 ${page}.html#${id}，而该页没有这个 id`);
    }
  }
}

// ---------- 2. 按 id 取元素 ----------

const ID_LITERAL = /'#([A-Za-z0-9_-]+)'/g;
const BY_ID = /getElementById\(\s*'([A-Za-z0-9_-]+)'\s*\)/g;

for (const file of SOURCES.filter((name) => name.endsWith('.ts'))) {
  const text = readFileSync(file, 'utf8');
  const loaded = rel(file);

  /*
   * 这一处该在哪一页里：文件在 entrypoints/<页>/ 下就认那一页，
   * 否则（src/ 下的后台代码等）只要某个页面有就行。
   */
  const owner = /^apps\/extension\/entrypoints\/([^/]+)\//.exec(loaded);
  const scope = owner ? (PAGES.get(owner[1]) ?? new Set()) : ANY_PAGE;
  const scopeName = owner ? `${owner[1]}.html` : '任一页面';

  const claimed = new Set();
  for (const match of text.matchAll(ID_LITERAL)) {
    const literal = `#${match[1]}`;
    if (!HEX.test(literal)) claimed.add(match[1]);
  }
  for (const match of text.matchAll(BY_ID)) claimed.add(match[1]);

  for (const id of claimed) {
    lookups += 1;
    if (!scope.has(id)) problems.push(`${loaded} 取元素 #${id}，而 ${scopeName} 没有这个 id`);
  }
}

record(
  '源码里的页面锚点都指向存在的 id（anchors）',
  problems.length === 0,
  problems.slice(0, 3).join('  '),
);
console.log(`（检查了 ${anchors} 处页面锚点、${lookups} 处按 id 取元素，共 ${PAGES.size} 个页面）`);

finish();

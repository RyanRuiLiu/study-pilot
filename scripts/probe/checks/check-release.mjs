/*
 * 发布前检查。
 *
 * 把「能不能开仓、能不能上架」这件事拆成可自动核对的项目。
 * 这些都是人眼容易漏、而漏了代价不小的：一个 AI 腔的词、一个指向
 * 不存在文件的链接、一处没删干净的身份信息。
 *
 * 用法：node scripts/probe/checks/check-release.mjs
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..');

/*
 * 扫描时要跳过的目录。
 *
 * .dev-profile 是调试用的浏览器 profile，里面装着浏览器自带扩展的源码，
 * 与项目无关；它已被 git 忽略，但会占几百兆。不排除它就会把
 * 「Edge Shopping 的代码里有手机号」当成我们的问题报出来。
 */
const SKIP_DIRS = /node_modules|\.git$|\.wxt|\.output|^dist$|\.probe|\.dev-profile|\.cdp-profile|\.tmp-profile/;

const results = [];
const record = (name, ok, detail) => {
  results.push({ name, ok, detail });
  console.log(`${ok ? '通过' : '失败'}  ${name}${detail ? `  ${detail}` : ''}`);
};

function collect(dir, filter, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.test(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) collect(p, filter, out);
    else if (filter(name)) out.push(p);
  }
  return out;
}

const rel = (p) => relative(ROOT, p).replace(/\\/g, '/');

// ---------- 1. 必需文件 ----------

console.log('=== 开仓必需的文件 ===');

const REQUIRED = [
  ['README.md', '项目说明'],
  ['LICENSE', '许可'],
  ['PRIVACY.md', '隐私政策'],
  ['CHANGELOG.md', '更新记录'],
  ['package.json', '包定义'],
  ['.gitignore', '忽略规则'],
  ['.editorconfig', '编辑器约定'],
];

for (const [file, why] of REQUIRED) {
  record(`${why}（${file}）`, existsSync(join(ROOT, file)));
}

// ---------- 2. 身份信息 ----------

console.log('');
console.log('=== 身份信息 ===');

const TEXT = (n) => /\.(ts|mts|mjs|js|json|md|txt|dwr|html|css)$/.test(n);
const SOURCES = [
  ...collect(join(ROOT, 'apps'), TEXT),
  ...collect(join(ROOT, 'packages'), TEXT),
  ...collect(join(ROOT, 'docs'), TEXT),
  ...collect(join(ROOT, 'scripts'), TEXT),
];

// 不存在的目录跳过即可。fixtures 已从仓库移除，这里不再引用它

/*
 * 手机号与邮箱形态。
 *
 * 手机号只认「11 位、以 1 开头、且前后不是数字」的组合——平台返回的
 * 结构化 id 里常出现长数字，宽松匹配会把它们全报出来。
 */
/*
 * 占位手机号：后八位全零。
 *
 * 形如 13800000000、10000000000——脱敏工具与文档示例里用的就是这种。
 * 真实号码极少出现连续八个零的尾号，而占位号总是如此。
 *
 * 注意位数：11 位手机号是「1 + 第二三位 + 剩余八位」，
 * 写成 ^1[3-9]0{8}$ 会漏掉中间一位，于是 13800000000 判不出来。
 */
const PLACEHOLDER_PHONE = /^1[3-9]\d0{8}$/;

const PATTERNS = [
  {
    re: /(?<!\d)1[3-9]\d{9}(?!\d)/g,
    label: '手机号',
    skip: (value) => PLACEHOLDER_PHONE.test(value),
  },
  { re: /yd\.[0-9a-f]{16}@163\.com/g, label: '邮箱' },
  { re: /\buser-\d{6,}\b/g, label: '用户标识' },
];

const identityHits = [];
for (const file of SOURCES) {
  const text = readFileSync(file, 'utf8');
  for (const { re, label, skip } of PATTERNS) {
    const found = (text.match(re) ?? []).filter((v) => !skip?.(v));
    if (found.length > 0) identityHits.push(`${rel(file)} ${label} ×${found.length}`);
  }
}

record(
  '源码与文档里没有身份信息',
  identityHits.length === 0,
  identityHits.slice(0, 3).join('  '),
);

// ---------- 3. AI 腔与随意文案 ----------

console.log('');
console.log('=== 文案 ===');

const UI_FILES = [
  'apps/extension/entrypoints/options/main.ts',
  'apps/extension/entrypoints/options/index.html',
  'apps/extension/entrypoints/popup/main.ts',
  'apps/extension/entrypoints/popup/index.html',
  'apps/extension/src/background/reminder.ts',
  'apps/extension/src/background/work-status.ts',
  'apps/extension/src/background/to-messages.ts',
  'apps/extension/src/background/scheduler.ts',
  'apps/extension/src/platform/messaging.ts',
  'apps/extension/src/features/quiz-helper.ts',
  'apps/extension/src/features/quiz-stage.ts',
].map((p) => join(ROOT, p));

/** 从源码里取出用户可见的中文字符串。 */
function uiStrings(source) {
  const out = [];
  for (const m of source.matchAll(/'([^'\\\n]*[\u4e00-\u9fa5][^'\\\n]*)'/g)) out.push(m[1]);
  for (const m of source.matchAll(/`([^`\\\n]*[\u4e00-\u9fa5][^`\\\n]*)`/g)) out.push(m[1]);
  return out;
}

const AI_WORDS = ['无需', '即可', '意味着', '值得一提', '不仅', '而且', '让我们', '轻松', '优雅', '完美', '极致', '赋能'];
const aiHits = [];
for (const file of UI_FILES) {
  if (!existsSync(file)) continue;
  for (const text of uiStrings(readFileSync(file, 'utf8'))) {
    for (const word of AI_WORDS) {
      if (text.includes(word)) aiHits.push(`${word}：${text.slice(0, 30)}`);
    }
  }
}
record('界面文案没有 AI 腔', aiHits.length === 0, aiHits.slice(0, 3).join('  '));

const CASUAL_WORDS = ['搞定', '弄一下', '跑一轮', '看一下', '来一下', '点一下'];
const casualHits = [];
for (const file of UI_FILES) {
  if (!existsSync(file)) continue;
  for (const text of uiStrings(readFileSync(file, 'utf8'))) {
    for (const word of CASUAL_WORDS) {
      if (text.includes(word)) casualHits.push(`${word}：${text.slice(0, 30)}`);
    }
  }
}
record('界面文案没有口语化说法', casualHits.length === 0, casualHits.slice(0, 3).join('  '));

// ---------- 3b. 注释里的口语化 ----------

/*
 * 注释也会被阅读。口语化的说法在对话里没问题，写进代码就成了
 * 一份别人要长期维护的文档里不该有的语气。
 */
const COMMENT_CASUAL = ['凭什么', '礼貌', '没人看', '白占', '白跑', '懒得', '搞错', '搞定', '弄好', '点一下'];

const commentHits = [];
for (const file of [...collect(join(ROOT, 'apps'), TEXT), ...collect(join(ROOT, 'packages'), TEXT)]) {
  const lines = readFileSync(file, 'utf8').split('\n');
  for (const [i, line] of lines.entries()) {
    const t = line.trim();
    if (!/^(\/\/|\*|\/\*)/.test(t)) continue;
    for (const word of COMMENT_CASUAL) {
      if (t.includes(word)) commentHits.push(`${rel(file)}:${i + 1} ${word}`);
    }
  }
}
record('注释里没有口语化说法', commentHits.length === 0, commentHits.slice(0, 3).join('  '));

// ---------- 4. 遗留标记 ----------

console.log('');
console.log('=== 遗留内容 ===');

const MARKERS = /\b(TODO|FIXME|XXX|HACK)\b/;
const markerHits = [];
for (const file of [...collect(join(ROOT, 'apps'), TEXT), ...collect(join(ROOT, 'packages'), TEXT)]) {
  const text = readFileSync(file, 'utf8');
  for (const [i, line] of text.split('\n').entries()) {
    if (MARKERS.test(line)) markerHits.push(`${rel(file)}:${i + 1}`);
  }
}
record('源码里没有未处理的标记', markerHits.length === 0, markerHits.slice(0, 4).join('  '));

// ---------- 5. 文档链接 ----------

console.log('');
console.log('=== 文档 ===');

const MD_FILES = [
  ...collect(ROOT, (n) => n.endsWith('.md')),
];

const badLinks = [];
for (const file of MD_FILES) {
  const text = readFileSync(file, 'utf8');
  for (const m of text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
    const target = m[2];
    if (/^https?:|^#|^mailto:/.test(target)) continue;
    const [path] = target.split('#');
    if (path && !existsSync(join(dirname(file), path))) badLinks.push(`${rel(file)} → ${target}`);
  }
}
record('文档内部链接都有效', badLinks.length === 0, badLinks.slice(0, 3).join('  '));

// ---------- 6. 产物无关文件 ----------

console.log('');
console.log('=== 仓库整洁 ===');

const JUNK = ['node_modules', '.probe', 'apps/extension/.wxt', 'apps/extension/.output'];
const gitignore = readFileSync(join(ROOT, '.gitignore'), 'utf8');
const notIgnored = JUNK.filter((p) => !gitignore.includes(p.split('/').pop()));
record('构建与探测产物已忽略', notIgnored.length === 0, notIgnored.join('  '));

// ---------- 汇总 ----------

const failed = results.filter((r) => !r.ok);
console.log('');
console.log(`共 ${results.length} 项，通过 ${results.length - failed.length} 项，失败 ${failed.length} 项。`);
if (failed.length > 0) {
  console.log('');
  console.log('失败项：');
  for (const f of failed) console.log(`  ${f.name}  ${f.detail ?? ''}`);
}
process.exit(failed.length === 0 ? 0 : 1);

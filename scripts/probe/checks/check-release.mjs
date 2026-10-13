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

/*
 * 检查哪些文件里的界面文案。
 *
 * 这里**不维护文件清单**：清单会随目录重构而过期，而过期的表现是
 * 「检查照常通过、只是没检查到那些文件」——静默失效，比不检查更糟。
 * 因此按目录取全部源码与页面，宁可多一些误报（误报看得见，漏报看不见）。
 */
const UI_FILES = [
  ...collect(join(ROOT, 'apps', 'extension', 'entrypoints'), (n) => /\.(ts|html)$/.test(n)),
  ...collect(join(ROOT, 'apps', 'extension', 'src'), (n) => /\.(ts|html)$/.test(n)),
];

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

// ---------- 7. 文件长度 ----------

/*
 * 一个文件一个职责，超过 300 行必须拆。
 *
 * 这条规则不写在文档里靠人记：文档会在下一次重构后过期，而过期的规则
 * 比没有规则更坏事——照着它做会做错。这里直接判定。
 *
 */
console.log('');
console.log('=== 文件长度 ===');

const MAX_LINES = 300;

/*
 * 只判源码，不判测试：测试按被测模块聚合，一个模块一个测试文件本身就是
 * 「一个职责」，按用例数再拆只会把同一件事散到多处。测试文件也确实是长文，
 * 但它改动少、且读到哪一条只取决于失败的用例名。
 */
const longFiles = [];
for (const file of [...collect(join(ROOT, 'apps'), (n) => n.endsWith('.ts')), ...collect(join(ROOT, 'packages'), (n) => n.endsWith('.ts'))]) {
  if (/\.config\.ts$|d\.ts$/.test(file)) continue;
  if (/[\\/]test[\\/]/.test(file)) continue;
  const count = readFileSync(file, 'utf8').split('\n').length;
  if (count > MAX_LINES) longFiles.push(`${rel(file)} ${count} 行`);
}
record(`源码文件都在 ${MAX_LINES} 行以内`, longFiles.length === 0, longFiles.slice(0, 4).join('  '));


// ---------- 8. 文档里的路径引用 ----------
//
// 文档漂移最常见的形态是「路径还在、文件早已改名」。这不是靠少写文档能解决的：
// 只要文档提到路径，就必须能被核对。这里把提到的每个仓库内路径都验一遍，
// 过期的当场报出来——比约定「记得同步更新」可靠。

console.log('');
console.log('=== 文档引用 ===');

const PATH_TOKEN = /`((?:apps|packages|scripts|docs)\/[A-Za-z0-9_./-]+\.(?:ts|mjs|js|json|css|html|md))`/g;
const staleRefs = [];
for (const file of MD_FILES) {
  const text = readFileSync(file, 'utf8');
  for (const match of text.matchAll(PATH_TOKEN)) {
    if (!existsSync(join(ROOT, match[1]))) staleRefs.push(`${rel(file)} → ${match[1]}`);
  }
}
record('文档里引用的文件都存在', staleRefs.length === 0, staleRefs.slice(0, 5).join('  '));

// ---------- 9. 唯一来源 ----------
//
// 「同一知识只允许出现一次」是这套代码的主约束，但它靠自觉是守不住的：
// 复制一份常量表、再抄一遍联合类型，是改动时最省事、也最难发现的做法。
// 这里把「哪个符号归哪个文件」写成判定，别处再声明同名符号即失败。
//
// 注意只判声明（export const/type/interface/function），不判再导出——
// 从归属文件导出到别处（export * 或 export { X } from）是正当用法。

console.log('');
console.log('=== 唯一来源 ===');

const SINGLE_SOURCE = new Map([
  ['UNIT_TYPE', 'packages/platform-mooc/src/types.ts'],
  ['ENDPOINTS', 'packages/platform-mooc/src/endpoints.ts'],
  ['DWR_ENDPOINTS', 'packages/platform-mooc/src/endpoints.ts'],
  ['BEHAVIORS', 'packages/platform-mooc/src/courseware/index.ts'],
  ['SNAPSHOT_VERSION', 'apps/extension/src/background/mooc/snapshot/types.ts'],
  ['SETTINGS_VERSION', 'apps/extension/src/settings/schema/index.ts'],
  ['AI_TASKS', 'apps/extension/src/ai/index.ts'],
  ['GUIDANCE_LABEL', 'apps/extension/src/features/mooc/guidance/markers.ts'],
  ['ANSWER_MARK_ATTRIBUTE', 'apps/extension/src/features/mooc/guidance/markers.ts'],
  ['REJECTION_MESSAGES', 'apps/extension/src/platform/messaging/envelope.ts'],
  ['WORK_STATUS', 'apps/extension/src/platform/messaging/mooc.ts'],
  ['PendingKind', 'apps/extension/src/platform/messaging/mooc.ts'],
]);

const DECLARATION = /^export (?:const|type|interface|function|class) (\w+)/gm;
const misplaced = [];
for (const file of [...collect(join(ROOT, 'apps'), (n) => n.endsWith('.ts')), ...collect(join(ROOT, 'packages'), (n) => n.endsWith('.ts'))]) {
  const here = rel(file);
  for (const match of readFileSync(file, 'utf8').matchAll(DECLARATION)) {
    const home = SINGLE_SOURCE.get(match[1]);
    if (home && here !== home) misplaced.push(`${match[1]} 在 ${here}（应只在 ${home}）`);
  }
}
record('唯一来源的符号没有第二处声明', misplaced.length === 0, misplaced.slice(0, 4).join('  '));

// ---------- 11. 代码卫生 ----------
//
// 下面这几样都是「让报错消失」而不是「解决问题」的手法：加一个 any、屏蔽一行
// 类型检查、留一句 console.log。它们正是 AI 改动最容易引入的劣化，因为改完
// 报错确实没了。全部禁止——要把错误消掉，就得真的改对。
//
// 只判源码，不判测试：测试里出现非空断言是常见且可接受的写法。

console.log('');
console.log('=== 代码卫生 ===');

const SMELLS = [
  [/: any\b|as any\b|<any>/, '显式 any'],
  [/@ts-(?:ignore|expect-error|nocheck)/, '类型检查豁免'],
  [/eslint-disable/, 'lint 豁免'],
  [/\bdebugger\b/, 'debugger'],
  [/console\.(?:log|debug)\(/, '调试输出'],
  [/\w!\./, '非空断言'],
];

const smellHits = [];
for (const file of [
  ...collect(join(ROOT, 'apps'), (n) => n.endsWith('.ts')),
  ...collect(join(ROOT, 'packages'), (n) => n.endsWith('.ts')),
]) {
  if (/[\\/]test[\\/]/.test(file) || /\.test\.ts$/.test(file)) continue;
  const text = readFileSync(file, 'utf8');
  for (const [re, label] of SMELLS) {
    const found = text.match(new RegExp(re.source, 'g'));
    if (found) smellHits.push(`${rel(file)} ${label} ×${found.length}`);
  }
}
record('源码里没有「让报错消失」的手法', smellHits.length === 0, smellHits.slice(0, 4).join('  '));

const LAYER_RULES = [
  ['packages/core/', []],
  ['packages/transport/', ['@study-pilot/core']],
  ['packages/ai/', ['@study-pilot/core']],
  // platform-mooc 不认识 AI：模型能力由 app 侧以端口注入
  ['packages/platform-mooc/', ['@study-pilot/core', '@study-pilot/transport']],
];

const PACKAGE_IMPORT = /from '(@study-pilot\/[a-z-]+)/g;
const layerHits = [];
for (const file of [...collect(join(ROOT, 'packages'), (n) => n.endsWith('.ts'))]) {
  if (/[\\/]test[\\/]/.test(file)) continue;
  const here = rel(file);
  const rule = LAYER_RULES.find(([prefix]) => here.startsWith(prefix));
  if (!rule) continue;
  for (const match of readFileSync(file, 'utf8').matchAll(PACKAGE_IMPORT)) {
    if (!rule[1].includes(match[1])) layerHits.push(`${here} → ${match[1]}`);
  }
}
record('依赖方向没有反向', layerHits.length === 0, layerHits.slice(0, 4).join('  '));

// ---------- 12. 写入路径只在后台 ----------
//
// 内容脚本与后台是两个执行上下文，各自建的客户端各有节流器、互不知情。
// 写入只要散到两边，就可能并发打到平台并撞上并发限制（-2）。
// 因此写接口只允许出现在 src/background/ 下。

console.log('');
console.log('=== 写入路径 ===');

const WRITE_APIS = /\b(submitQuiz|saveDraft|submitEvaluation|completeUnit)\s*\(/;
const writeHits = [];
for (const file of [
  ...collect(join(ROOT, 'apps/extension/src/features'), (n) => n.endsWith('.ts')),
  ...collect(join(ROOT, 'apps/extension/entrypoints'), (n) => n.endsWith('.content.ts')),
]) {
  if (/[\\/]test[\\/]/.test(file)) continue;
  const text = readFileSync(file, 'utf8');
  if (WRITE_APIS.test(text)) writeHits.push(rel(file));
}
record('写接口只出现在后台', writeHits.length === 0, writeHits.slice(0, 4).join('  '));

/*
 * 内容脚本也不该建客户端：两个上下文各有一个节流器时互不知情，
 * 并发发请求会撞平台的并发限制。数据一律经消息向后台取。
 */
const contentScripts = collect(join(ROOT, 'apps/extension/entrypoints'), (n) => n.endsWith('.content.ts'));
const clientHits = contentScripts.filter((file) =>
  readFileSync(file, 'utf8').includes('createMoocClient'),
);
record('内容脚本不建客户端', clientHits.length === 0, clientHits.map(rel).join('  '));

// ---------- 13. 术语 ----------
//
// 「同一概念只用一种写法」。AI 改动最容易在这里漂移：新加一个模块时顺手
// 起个近义词（selfReview、learnUnit），于是同一件事出现两套词，之后每次改动
// 都要先猜用哪个。这里把唯一写法与已绝迹的别名都写下来——别名一旦回来即失败。
//
// 两处命名边界，不要照下面的表去"修"：
//   - 互评：平台接口层是它的叫法（MocEvaluateBean / getEvaluateDetail /
//     submitEvaluation），我们自己的概念用 review（AutoReviewSettings / reviewable）。
//     这是分层命名，不是分裂。
//   - 得分指导统一到 guidance（模块、设置键、函数名都是）；设置键原为
//     homeworkAnswers，改名时用 SETTINGS_VERSION 1 → 2 的迁移搬走了旧值，
//     因此 normalize 里还留着一处旧键的字面量——那是有意的，不是漏改。

console.log('');
console.log('=== 术语 ===');

const TERMS = [
  ['自评', 'selfEvaluate', /\bself(?:Review|Evaluation|Judge)\b/],
  ['课件单元', 'unit / CourseUnit', /\b(?:learn|lesson)Unit\b/],
  ['工作项', 'work / CourseWork', /\bworkItem\b/],
  ['待办（协议）', 'Pending*', /\b(?:todo|pending)List\b/],
  ['得分指导', 'guidance', /\b(?:referenceAnswer|answerKey)\b/],
  ['题库', 'Bank*（getQuizBank）', /\b(?:bankList|questionBank)\b/],
];

const termHits = [];
for (const file of [
  ...collect(join(ROOT, 'apps'), (n) => n.endsWith('.ts')),
  ...collect(join(ROOT, 'packages'), (n) => n.endsWith('.ts')),
]) {
  const text = readFileSync(file, 'utf8');
  for (const [concept, canonical, alias] of TERMS) {
    if (alias.test(text)) termHits.push(`${rel(file)} 用了「${concept}」的别名（应写 ${canonical}）`);
  }
}
record('同一概念没有第二种写法', termHits.length === 0, termHits.slice(0, 4).join('  '));

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
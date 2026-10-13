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
import { createChecker } from '../../verify/report.mjs';

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

const { record, finish } = createChecker();

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
//
// 原先这里自写正则验 `[文字](目标)` 的目标文件是否存在，第 8 段又自写一次验
// 反引号里的仓库路径。两段都只看「文件在不在」，锚点看不到。现在文档里提到的
// 仓库文件一律写成链接（链接文字仍是路径），由 remark + remark-validate-links
// 统一校验（见 scripts/verify/check-remark.mjs），两段自写实现都已删除。

// ---------- 6. 产物无关文件 ----------

console.log('');
console.log('=== 仓库整洁 ===');

const JUNK = ['node_modules', '.probe', 'apps/extension/.wxt', 'apps/extension/.output'];
const gitignore = readFileSync(join(ROOT, '.gitignore'), 'utf8');
const notIgnored = JUNK.filter((p) => !gitignore.includes(p.split('/').pop()));
record('构建与探测产物已忽略', notIgnored.length === 0, notIgnored.join('  '));

// ---------- 7. 文件长度 ----------
//
// 原先这里自写「读每个文件数行数、超过 300 行即失败」。规则与豁免（测试、
// *.config.ts、*.d.ts）现在都在 eslint.config.mjs 的 max-lines 里，
// 由 scripts/verify/check-eslint.mjs 映射成门禁项。

// ---------- 8. 文档里的路径引用 ----------
//
// 文档漂移最常见的形态是「路径还在、文件早已改名」。原先这里把反引号里
// 形如 `docs/x.md` 的路径逐个判存在——现在这些引用都写成了链接，由
// remark + remark-validate-links 校验（见 scripts/verify/check-remark.mjs）。

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
// 「让报错消失」而不是「解决问题」的手法：加一个 any、屏蔽一行类型检查、
// 留一句 console.log。原先这里是一组自写正则——正则会漏（`as any` 之外的写法、
// 带空格的注释），eslint 的官方规则不会。规则现在都在 eslint.config.mjs：
//   @typescript-eslint/no-explicit-any / no-non-null-assertion / ban-ts-comment、
//   no-console、no-debugger，以及 linterOptions.noInlineConfig（eslint-disable）。
// 由 scripts/verify/check-eslint.mjs 映射成门禁项。

console.log('');
console.log('=== 代码卫生 ===');
console.log('（由 eslint 标准规则负责，见 scripts/verify/check-eslint.mjs）');

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
// 「同一概念只用一种写法」。原先这里是一张自写 TERMS 表（概念 → 唯一写法 →
// 别名正则），别名散落各处时靠正则扫全文。现在换成 eslint 的 id-denylist：
// 别名都写在 eslint.config.mjs 的禁词表里，由 scripts/verify/check-eslint.mjs
// 映射成门禁项。
//
// 两处命名边界已随注释迁到 eslint.config.mjs（互评层的 evaluate/review 分工、
// 得分指导统一到 guidance 与 SETTINGS_VERSION 1 → 2 的迁移），信息没丢。

console.log('=== 术语 ===');
console.log('（由 eslint 的 id-denylist 负责，见 scripts/verify/check-eslint.mjs）');

// ---------- 14. 版本号 ----------
//
// 原先这里读 7 处版本再比较。它覆盖不到真正的风险（同一依赖在不同包里被写成
// 不同版本），而自己那条 /version:\s*'...'/ 还会误命中 minimum_chrome_version。
// 现在分成两半，都在 scripts/verify/ 下、都由标准工具负责：
//   - 依赖版本一致 → syncpack（check-syncpack.mjs）
//   - 版本字面量只剩一个来源 → 结构断言（check-version-literal.mjs）

// ---------- 15. 代做默认关闭 ----------
//
// 产品立场：**默认是助手，代做是显式开启的高级功能**。
//
// 「代做」指会代你向平台留下记录的动作：完成课件、提交测验、提交互评与自评、
// 把讨论内容发给模型并留言。这些动作**不可逆**（成绩标记删不掉、留言会留痕），
// 而默认开启意味着用户装完扩展就已经在写平台了——不知道自己同意了什么。
//
// 因此这里判定的是默认值：代做类开关必须是 false。助手类（本地填充、提示、
// 界面文案）保持默认开启，因为它们不改平台数据。

console.log('');
console.log('=== 代做默认关闭 ===');

const moocSchema = readFileSync(join(ROOT, 'apps/extension/src/settings/schema/mooc.ts'), 'utf8');
const aiSchema = readFileSync(join(ROOT, 'apps/extension/src/settings/schema/ai.ts'), 'utf8');

const writesOn = [];
for (const key of ['autoCourseware', 'autoQuiz', 'autoReview', 'autoSelfEvaluate']) {
  if (!new RegExp(`${key}:\\s*\\{[^}]*enabled:\\s*false`).test(moocSchema)) writesOn.push(key);
}
if (!/enabled:\s*false/.test(aiSchema)) writesOn.push('ai.enabled');

record('代你写平台的功能默认关闭', writesOn.length === 0, writesOn.join(' '));

// ---------- 汇总 ----------
//
// 输出格式与汇总由 scripts/verify/report.mjs 统一提供：
// check-all.mjs 按「通过/失败 <名称>」逐行解析，格式只能有一处定义。

finish();
/*
 * 文案自检。
 *
 * 检查界面上出现的说明文字是否：
 *   1. 与功能一致（提到「执行全部」时是否漏了某一项任务）
 *   2. 没有内部术语（批次、门禁、槽位之类）
 *   3. 没有口语化说法（未设、搞定、弄一下之类）
 *   4. 结尾标点统一
 *
 * 这不是通用检查，规则针对本项目已经踩过的问题而设。
 *
 * 用法：node scripts/probe/checks/check-copy.mjs
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

/** 项目根目录。本文件在 scripts/probe/checks/ 下，往上三层。 */
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');

/** 扫描时跳过的目录：产物与依赖里没有我们的文案。 */
const SKIP = /node_modules|\.output|\.wxt|\.git$|\\test\\|\/test\//;

/*
 * 扫哪些文件：**按目录取，不维护清单**。
 *
 * 先前这里是一份手写清单，模块改名或搬家之后它就过期了——而过期的表现
 * 是「检查照常跑，只是漏掉了那些文件」，与 check-release 曾经的问题同源。
 * 目录本身就是唯一来源，不必再同步。
 */
function collect(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (SKIP.test(path)) continue;
    if (statSync(path).isDirectory()) collect(path, out);
    else if (/\.(ts|html)$/.test(name)) out.push(relative(ROOT, path).replace(/\\/g, '/'));
  }
  return out;
}

const FILES = collect(join(ROOT, 'apps/extension'));

const results = [];
const record = (name, ok, detail) => {
  results.push({ name, ok, detail });
  console.log(`${ok ? '通过' : '失败'}  ${name}${detail ? `  ${detail}` : ''}`);
};

/** 取出一段代码里所有中文字符串字面量。 */
function chineseStrings(source) {
  const out = [];
  for (const m of source.matchAll(/'([^'\\\n]*[\u4e00-\u9fa5][^'\\\n]*)'/g)) {
    out.push({ text: m[1], index: m.index ?? 0 });
  }
  for (const m of source.matchAll(/`([^`\\\n]*[\u4e00-\u9fa5][^`\\\n]*)`/g)) {
    out.push({ text: m[1], index: m.index ?? 0 });
  }
  return out;
}

const sources = new Map();

/*
 * 先确认列出的文件都在。删了模块却忘了改这份清单时，直接抛 ENOENT
 * 会看不出是清单过期还是文件真丢了。
 */
for (const file of FILES) {
  /*
   * 注释不参与文案检查。
   *
   * 注释里常用反引号夹代码路径，而「两个反引号之间的中文」会被下面的提取规则
   * 当成界面文案——先前就因此把一句注释误报成术语泄漏。界面文案只可能出现在
   * 代码行里，因此按行剔除注释。
   */
  sources.set(
    file,
    readFileSync(join(ROOT, file), 'utf8')
      .split('\n')
      .filter((line) => !/^\s*(\*|\/\/|\/\*)/.test(line))
      .join('\n'),
  );
}

// ---------- 1. 内部术语 ----------

const JARGON = ['批次', '门禁', '槽位', '载荷', '落盘', '幂等', '节流', '兜底'];

console.log('=== 内部术语 ===');
let jargonHits = [];
for (const [file, source] of sources) {
  for (const item of chineseStrings(source)) {
    for (const word of JARGON) {
      if (item.text.includes(word)) {
        // 注释里的说明不算，只看会显示给用户的字符串
        jargonHits.push(`${file.split(/[\\/]/).pop()}：「${item.text}」含「${word}」`);
      }
    }
  }
}
record('界面文案不含内部术语', jargonHits.length === 0, jargonHits.slice(0, 6).join(' / '));

// ---------- 2. 口语化说法 ----------

const CASUAL = ['未设', '搞定', '弄一下', '一点', '蛮', '挺'];

console.log('');
console.log('=== 口语化说法 ===');
let casualHits = [];
for (const [file, source] of sources) {
  for (const item of chineseStrings(source)) {
    for (const word of CASUAL) {
      if (item.text.includes(word)) {
        casualHits.push(`${file.split(/[\\/]/).pop()}：「${item.text}」含「${word}」`);
      }
    }
  }
}
record('界面文案不含口语化说法', casualHits.length === 0, casualHits.slice(0, 6).join(' / '));

// ---------- 3. 与功能一致 ----------

console.log('');
console.log('=== 与功能一致 ===');

/*
 * 「立即执行」的说明不得再逐条罗列四类任务。
 *
 * 这里出过两次错：先是加了自动自评之后说明没跟上，
 * 后来改成按当前状态执行、不再区分任务类别，说明却仍在罗列。
 * 逐条罗列的写法天然会过时——每加一类任务就要记得改这一句。
 * 现在断言的是反面：它必须说的是「拉最新状态后执行」这件事本身。
 */
/*
 * 设置页的文案分散在 options/ 下的多个文件里（main + sections/*）。
 * 这里按目录取全部内容拼起来再匹配：写死某个文件会在切分之后失效。
 */
const options = FILES.filter((f) => f.startsWith('apps/extension/entrypoints/options/'))
  .map((f) => sources.get(f) ?? '')
  .join('\n');
const runAllRow = options.match(/'立即执行',\s*'([^']+)'/);
record(
  '「立即执行」说明不逐条罗列任务类别',
  !!runAllRow && !/(自动答题|自动互评|自动自评)/.test(runAllRow[1]),
  runAllRow ? runAllRow[1] : '(未找到)',
);

/*
 * 拒绝文案统一在 messaging.ts 的 REJECTION_MESSAGES 里，
 * 已由上面「界面文案」一节的检查覆盖，这里不重复断言。
 */

/* 分区说明不能提到已经移走的内容。单元明细已独立成区。 */
const executionDesc = options.match(/section\('execution',[^,]+,\s*'([^']+)'/);
record(
  '「执行与诊断」说明未提及已移出的单元明细',
  !!executionDesc && !executionDesc[1].includes('每个单元'),
  executionDesc ? executionDesc[1] : '(未找到)',
);

// ---------- 4. 标点 ----------

console.log('');
console.log('=== 标点 ===');

/* 分区说明用句号收尾，保持一排读下来节奏一致。 */
const sectionDescs = [...options.matchAll(/section\('[^']+',\s*'[^']+',\s*'([^']+)'/g)].map(
  (m) => m[1],
);
const noPeriod = sectionDescs.filter((d) => !d.endsWith('。'));
record('分区说明以句号收尾', noPeriod.length === 0, noPeriod.join(' / '));

/* 行内说明（row 第二参数）是短语，不该带句号。 */
const rowDescs = [...options.matchAll(/row\(\s*'[^']+',\s*'([^']*)'/g)].map((m) => m[1]);
const withPeriod = rowDescs.filter((d) => d.endsWith('。'));
record('设置项说明不带句号', withPeriod.length === 0, withPeriod.join(' / '));

console.log('');
const failed = results.filter((r) => !r.ok);
console.log(`共 ${results.length} 项，通过 ${results.length - failed.length} 项，失败 ${failed.length} 项。`);

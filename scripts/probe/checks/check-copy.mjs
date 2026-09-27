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

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** 项目根目录。本文件在 scripts/probe/checks/ 下，往上三层。 */
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');

const FILES = [
  'apps/extension/entrypoints/options/main.ts',
  'apps/extension/entrypoints/popup/main.ts',
  'apps/extension/src/background/task-plan.ts',
  'apps/extension/src/background/execute.ts',
  'apps/extension/src/background/reminder.ts',
  'apps/extension/src/platform/messaging.ts',
  'apps/extension/src/features/quiz-helper.ts',
];

/*
 * 先确认列出的文件都在。
 *
 * 删掉模块却忘了改这份清单时，直接抛 ENOENT 看不出是清单过期
 * 还是文件真的丢了——而这两种情况的处理方式完全不同。
 */
const missing = FILES.filter((f) => !existsSync(join(ROOT, f)));
if (missing.length > 0) {
  console.error('清单里的文件不存在：' + missing.join(' '));
  console.error('删掉模块之后要同步这份清单。');
  process.exit(1);
}

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
  sources.set(file, readFileSync(join(ROOT, file), 'utf8'));
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
const options = sources.get('apps/extension/entrypoints/options/main.ts');
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

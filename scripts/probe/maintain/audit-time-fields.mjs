/*
 * 时间字段审计。
 *
 * 起因：待办把「互评截止」当成「提交截止」显示，比真实截止晚一周。
 * 那是靠肉眼看出来的，这次改为系统排查——把所有涉及时间的用法列出来，
 * 逐个核对它取的是哪个字段、以及那是否就是它语义上该取的字段。
 *
 * 只做静态列举，不做判断；判断由人看这张表来下。
 *
 * 用法：node scripts/probe/maintain/audit-time-fields.mjs
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = join(import.meta.dirname, '../../..');

/** 时间字段名。含 test 对象里的，也含消息协议里的。 */
const FIELDS = [
  'deadline',
  'releaseTime',
  'evaluateStart',
  'evaluateEnd',
  'evaluateScoreReleaseTime',
  'startTime',
  'endTime',
  'submitDeadline',
  'evaluateDeadline',
];

/** 这些字段的界面文案，用来核对"用的字段"与"说的意思"是否一致。 */
const LABELS = {
  deadline: '提交截止（test.deadline）',
  releaseTime: '作业发布时间（test.releaseTime）',
  evaluateStart: '互评开始（test.evaluateStart）',
  evaluateEnd: '互评截止（test.evaluateEnd）',
  evaluateScoreReleaseTime: '成绩发布时间',
  startTime: '学期开始',
  endTime: '学期结束',
  submitDeadline: '消息里的提交截止',
  evaluateDeadline: '消息里的互评截止',
};

/** 递归收集源码文件。 */
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (/node_modules|\.git|\.output|\.wxt|dist|\.probe|\.reverse/.test(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(ts|mts)$/.test(name) && !/\.d\.ts$/.test(name)) out.push(p);
  }
  return out;
}

const files = walk(join(ROOT, 'packages'))
  .concat(walk(join(ROOT, 'apps')))
  .filter((f) => !/\.test\.ts$/.test(f));

/** 找出每个文件里用到这些字段的行。 */
const hits = [];
for (const file of files) {
  const source = readFileSync(file, 'utf8');
  const lines = source.split('\n');
  lines.forEach((line, i) => {
    // 跳过纯注释行
    const trimmed = line.trim();
    if (trimmed.startsWith('*') || trimmed.startsWith('//') || trimmed.startsWith('/*')) return;

    for (const field of FIELDS) {
      if (!new RegExp(`\\b${field}\\b`).test(line)) continue;
      hits.push({
        file: relative(ROOT, file).replace(/\\/g, '/'),
        line: i + 1,
        field,
        text: trimmed.slice(0, 96),
      });
      break;
    }
  });
}

console.log(`扫了 ${files.length} 个源文件，命中 ${hits.length} 处。\n`);

// 按文件分组输出
let currentFile = '';
for (const hit of hits) {
  if (hit.file !== currentFile) {
    currentFile = hit.file;
    console.log(`\n── ${hit.file}`);
  }
  console.log(`  ${String(hit.line).padStart(4)}  [${hit.field}]  ${hit.text}`);
}

console.log('\n\n=== 字段含义对照 ===');
for (const [field, label] of Object.entries(LABELS)) {
  console.log(`  ${field.padEnd(26)} ${label}`);
}

console.log('\n=== 要逐条核对的问题 ===');
console.log('  1. 显示给用户的每个时间，取的是不是它说的那个意思');
console.log('  2. 同一个判断在几处各写了一遍吗（改一处漏一处）');
console.log('  3. 有没有把「开始时间」当「截止时间」用，或反之');
console.log('  4. 排序依据与显示的时间是不是同一个字段');
console.log('  5. 判断「已过期」用的字段与显示的是否一致');

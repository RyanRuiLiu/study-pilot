/*
 * ESLint 适配层。
 *
 * 「文件长度」（以及后面接过来的代码卫生、术语、依赖方向）都是自写正则换成
 * 生态标准规则。规则本身写在仓库根的 eslint.config.mjs 里；这里只做一件事：
 * 跑一次 eslint，把报错按规则归到对应的门禁项，输出「通过/失败 <名称>」。
 *
 * 不做判断：什么算超长、什么算违规，全由 eslint.config.mjs 决定。
 * 这里只决定「哪些规则归哪一项」。
 */

import { spawnSync } from 'node:child_process';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createChecker } from './report.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { record, finish } = createChecker();

/** 跑 `eslint .`，返回所有文件的所有消息（含警告——警告也是门禁要拦的东西）。 */
function lint() {
  const run = spawnSync(
    process.execPath,
    [join(ROOT, 'node_modules', 'eslint', 'bin', 'eslint.js'), '.', '--format', 'json'],
    { cwd: ROOT, encoding: 'utf8', maxBuffer: 128 * 1024 * 1024 },
  );
  if (!run.stdout) return { error: run.stderr || `eslint 退出码 ${run.status}` };
  try {
    return {
      messages: JSON.parse(run.stdout).flatMap((file) =>
        file.messages.map((message) => ({
          ...message,
          file: relative(ROOT, file.filePath).replace(/\\/g, '/'),
        })),
      ),
    };
  } catch (error) {
    return { error: `eslint 输出不是 JSON：${String(error)}` };
  }
}

const result = lint();
if (result.error) {
  record('源码文件没有超过行数上限', false, result.error.slice(0, 200));
  record('ESLint 其余规则无报错', false, result.error.slice(0, 200));
  finish();
}

const messages = result.messages;

/*
 * 一项一条规则（或一组规则）。takes 决定这条消息归给哪一项，
 * 归不出去的消息落到「其余规则」——门禁不会因为没人认领就静默放过。
 */
const ITEMS = [
  {
    name: '源码文件没有超过行数上限',
    takes: (message) => message.ruleId === 'max-lines',
    detail: (message) => `${message.file}:${message.line} ${message.message}`,
  },
];

for (const item of ITEMS) {
  const hits = messages.filter(item.takes);
  record(item.name, hits.length === 0, hits.slice(0, 4).map(item.detail).join('  '));
}

const claimed = (message) => ITEMS.some((item) => item.takes(message));
const rest = messages.filter((message) => !claimed(message));
record(
  'ESLint 其余规则无报错',
  rest.length === 0,
  rest
    .slice(0, 4)
    .map((message) => `${message.file}:${message.line} ${message.ruleId ?? '（无规则）'} ${message.message}`)
    .join('  '),
);

finish();

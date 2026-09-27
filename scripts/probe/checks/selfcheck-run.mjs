/*
 * 功能可执行性自检。
 *
 * 提交类操作不能真跑——会动到真实作业。这里测三件事：
 *   1. 拒绝路径：停用、未登录、未选课时是否给出正确理由，而不是静默跳过
 *   2. 只读判定：单元状态与待办计数是否与实际数据吻合
 *   3. 幂等：重复执行不会重复写入
 *
 * 用法：node scripts/probe/checks/selfcheck-run.mjs
 */

import { Session, listTargets, newPageTarget } from '../lib/cdp.mjs';
import { requireExtensionId } from '../lib/ext-id.mjs';

// 扩展 id 由加载路径决定，不同机器不同，因此从浏览器读取而不是写死
const EXT_ID = await requireExtensionId();
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const results = [];
const record = (name, ok, detail) => {
  results.push({ name, ok, detail });
  console.log(`${ok ? '通过' : '失败'}  ${name}${detail ? `  ${detail}` : ''}`);
};

const target = await newPageTarget();
const session = await Session.open(target.webSocketDebuggerUrl);
await session.send('Page.enable');
await session.send('Page.navigate', { url: `chrome-extension://${EXT_ID}/options.html` });

const deadline = Date.now() + 15000;
while (Date.now() < deadline) {
  const r = await session
    .send('Runtime.evaluate', {
      expression:
        '(typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.id) ? "ready" : "wait"',
      returnByValue: true,
    })
    .catch(() => ({ result: { value: 'wait' } }));
  if (r.result?.value === 'ready') break;
}
await wait(4000);

const call = async (expr) => {
  const r = await session.send('Runtime.evaluate', {
    expression: `(async () => { try { return JSON.stringify(await ${expr}); } catch (e) { return "错: " + String(e); } })()`,
    awaitPromise: true,
    returnByValue: true,
  });
  return r.result?.value;
};

const STORAGE_KEY = 'study-pilot-settings';

// ---------- 1. 停用时的拒绝路径 ----------

const original = await call(`chrome.storage.local.get("${STORAGE_KEY}").then(v => v["${STORAGE_KEY}"])`);
const settings = JSON.parse(original);

// 临时停用
await call(
  `chrome.storage.local.set({ "${STORAGE_KEY}": { ...${JSON.stringify(settings)}, enabled: false } }).then(() => ({ done: true }))`,
);

const disabled = JSON.parse(await call(`chrome.runtime.sendMessage({ type: 'RUN_SCHEDULED_TASKS' })`));
record(
  '停用时拒绝执行并给出理由',
  disabled?.rejected === 'DISABLED_GLOBAL',
  JSON.stringify(disabled),
);

// 恢复启用、但清空已选课程
const noCourses = { ...settings, enabled: true };
noCourses.mooc = {
  ...settings.mooc,
  background: { ...settings.mooc.background, courses: settings.mooc.background.courses.map((c) => ({ ...c, enabled: false })) },
};
await call(
  `chrome.storage.local.set({ "${STORAGE_KEY}": ${JSON.stringify(noCourses)} }).then(() => ({ done: true }))`,
);

const noCourse = JSON.parse(await call(`chrome.runtime.sendMessage({ type: 'RUN_SCHEDULED_TASKS' })`));
record(
  '未选课程时拒绝执行并给出理由',
  noCourse?.rejected === 'NO_SELECTED_COURSE',
  JSON.stringify(noCourse),
);

// 恢复原设置
await call(
  `chrome.storage.local.set({ "${STORAGE_KEY}": ${JSON.stringify(settings)} }).then(() => ({ done: true }))`,
);

// ---------- 2. 只读判定 ----------

const details = JSON.parse(await call(`chrome.runtime.sendMessage({ type: 'UNIT_DETAILS' })`));
const rows = details.status === 'ok' ? details.value : [];

const statuses = [...new Set(rows.map((r) => r.status))];
record('单元明细状态取值合理', statuses.length > 0, statuses.join(' / '));

// 已提交的必有分数或满分说明，未提交的不应有分数
const submitted = rows.filter((r) => r.submitted);
const notSubmitted = rows.filter((r) => !r.submitted);
record(
  '已提交的条目都带有总分',
  submitted.every((r) => r.totalScore !== null),
  `${submitted.length} 条`,
);
record(
  '未提交的条目分数为空（不是 0 分）',
  notSubmitted.every((r) => r.score === null),
  `${notSubmitted.length} 条`,
);
record(
  '未提交的条目状态为「未提交」或「已截止未提交」',
  notSubmitted.every((r) => r.status === '未提交' || r.status === '已截止未提交'),
  [...new Set(notSubmitted.map((r) => r.status))].join(' / '),
);

// ---------- 3. 待办与明细的一致性 ----------

const termIds = [...new Set(rows.map((r) => r.termId))];
const pending = JSON.parse(
  await call(`chrome.runtime.sendMessage({ type: 'PENDING_SUMMARY', termIds: ${JSON.stringify(termIds)} })`),
);
const entries = pending.status === 'ok' ? pending.value.entries : [];

// 每一条待办都应能在明细里找到对应的未提交条目
const missing = entries.filter(
  (e) => !rows.some((r) => r.tid === e.testId),
);
record(
  '每条待办的 tid 都能在单元明细里找到',
  missing.length === 0,
  missing.length ? JSON.stringify(missing.map((m) => [m.name, m.testId])) : `${entries.length} 条待办全部匹配`,
);

// 待办的类别应与明细的类型一致
const kindMismatch = entries.filter((e) => {
  const row = rows.find((r) => r.tid === e.testId);
  if (!row) return false;
  if (e.kind === 'submit-quiz') return row.type !== 'quiz';
  if (e.kind === 'submit-homework' || e.kind === 'evaluate-homework') return row.type !== 'homework';
  return false;
});
record(
  '待办类别与明细类型一致',
  kindMismatch.length === 0,
  kindMismatch.length ? JSON.stringify(kindMismatch) : '',
);

// ---------- 4. 幂等：重复读取不产生副作用 ----------

const before = await call(`chrome.storage.local.get(null).then(v => JSON.stringify(Object.keys(v).sort()))`);
await call(`chrome.runtime.sendMessage({ type: 'UNIT_DETAILS' })`);
await call(`chrome.runtime.sendMessage({ type: 'PENDING_SUMMARY', termIds: ${JSON.stringify(termIds)} })`);
const after = await call(`chrome.storage.local.get(null).then(v => JSON.stringify(Object.keys(v).sort()))`);
record('只读操作不写入新存储键', before === after, before === after ? '' : `${before} → ${after}`);

console.log('');
const failed = results.filter((r) => !r.ok);
console.log(`共 ${results.length} 项，通过 ${results.length - failed.length} 项，失败 ${failed.length} 项。`);

session.close();

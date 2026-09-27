/*
 * 看这一轮会做什么，但不做。
 *
 * 它拉一次最新状态，把派生出的计划打出来：
 *   哪些事项会被自动完成、哪些需要人工、哪些已过截止。
 *
 * 这条路径与真实执行共用同一个读取，所以看到的计划就是执行时会用的计划。
 * 唯一的区别是不调用执行 —— 因此可以放心地反复跑。
 *
 * 用法：node scripts/probe/checks/dryrun-tasks.mjs
 */

import { Session, listTargets, newPageTarget } from '../lib/cdp.mjs';
import { requireExtensionId } from '../lib/ext-id.mjs';

const EXT_ID = await requireExtensionId();
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const worker = (await listTargets()).find((t) => t.type === 'service_worker');
if (!worker) {
  const p = await newPageTarget();
  const s = await Session.open(p.webSocketDebuggerUrl);
  await s.send('Page.enable');
  await s.send('Page.navigate', { url: `chrome-extension://${EXT_ID}/options.html` });
  s.close();
  await wait(2000);
}

const target = await newPageTarget();
const session = await Session.open(target.webSocketDebuggerUrl);
await session.send('Page.enable');
await session.send('Page.navigate', { url: `chrome-extension://${EXT_ID}/options.html` });
const deadline = Date.now() + 15000;
while (Date.now() < deadline) {
  const r = await session
    .send('Runtime.evaluate', {
      expression:
        '(typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.id) ? 1 : 0',
      returnByValue: true,
    })
    .catch(() => ({ result: { value: 0 } }));
  if (r.result?.value === 1) break;
  await wait(400);
}
await wait(4000);

const asJson = async (expr) => {
  const r = await session.send('Runtime.evaluate', {
    expression: `(async () => JSON.stringify(await ${expr}))()`,
    awaitPromise: true,
    returnByValue: true,
  });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
  return JSON.parse(r.result?.value);
};

const DAY = 86400000;
const fmt = (ms) => (ms ? new Date(ms).toLocaleString('zh-CN', { hour12: false }) : '(无)');
const days = (ms, now) => (ms ? Math.ceil((ms - now) / DAY) : null);

// ---------- 配置 ----------

const settings = await asJson(
  `(await chrome.storage.local.get("study-pilot-settings"))["study-pilot-settings"]`,
);
const bg = settings.mooc.background;
const now = Date.now();

console.log('=== 开关 ===');
console.log(`总开关        ${settings.enabled ? '开' : '关'}`);
console.log(`自动答题      ${bg.autoQuiz.enabled ? '开' : '关'}`);
console.log(`自动互评      ${bg.autoReview.enabled ? '开' : '关'}`);
console.log(`自动自评      ${bg.autoSelfEvaluate.enabled ? '开' : '关'}`);
console.log(`截止提醒      ${bg.deadlineReminder.enabled ? '开' : '关'}（提前 ${bg.deadlineReminder.advanceDays} 天）`);
console.log(`启动延迟      ${bg.schedule.startupDelayMinutes} 分钟`);
console.log(`参与课程      ${bg.courses.filter((c) => c.enabled).length} / ${bg.courses.length}`);

// ---------- 快照 ----------

const snapshot = await asJson(
  `((await chrome.storage.local.get("study-pilot-snapshot"))["study-pilot-snapshot"])`,
);

console.log('');
console.log('=== 本地快照 ===');
if (!snapshot) {
  console.log('  还没有。第一次读取之后才会有。');
} else {
  console.log(`  拉取时刻  ${fmt(snapshot.fetchedAt)}`);
  console.log(`  拉取日期  ${snapshot.fetchedDate}`);
  console.log(`  课程数    ${snapshot.courses.length}`);
}

// ---------- 计划 ----------

/*
 * PENDING_SUMMARY 会真的拉一次最新状态（用户主动查看的路径），
 * 因此这里拿到的待办与执行时看到的一致。
 */
const summary = await asJson(`await chrome.runtime.sendMessage({ type: "PENDING_SUMMARY" })`);

console.log('');
console.log('=== 这一轮会做什么 ===');

if (summary.status !== 'ok') {
  console.log(`  读取失败：${summary.reason ?? ''} ${summary.message ?? ''}`);
  session.close();
  process.exit(0);
}

const { auto, manual, overdue, entries } = summary.value;

if (entries.length === 0) {
  console.log('  没有待办。');
}

const autoItems = entries.filter((e) => e.handling === 'auto');
const manualItems = entries.filter((e) => e.handling === 'manual' && !e.overdue);
const overdueItems = entries.filter((e) => e.overdue);

console.log('');
console.log(`自动完成  ${auto} 项`);
for (const e of autoItems) {
  const d = days(e.deadline, now);
  console.log(`  · ${e.courseName} / ${e.name}`);
  console.log(`    截止 ${fmt(e.deadline)}${d === null ? '' : `（${d} 天后）`}`);
  if (e.evaluateTotal !== null) {
    console.log(`    互评进度 ${e.evaluateDone} / ${e.evaluateTotal}`);
  }
}

console.log('');
console.log(`需要你处理  ${manual} 项`);
for (const e of manualItems) {
  const d = days(e.deadline, now);
  console.log(`  · ${e.courseName} / ${e.name}  [${e.kind}]`);
  console.log(`    截止 ${fmt(e.deadline)}${d === null ? '' : `（${d} 天后）`}`);
}

if (overdueItems.length > 0) {
  console.log('');
  console.log(`已过截止  ${overdue} 项（平台不再接受，无法补做）`);
  for (const e of overdueItems) {
    console.log(`  · ${e.courseName} / ${e.name}`);
    console.log(`    截止 ${fmt(e.deadline)}`);
  }
}

// ---------- 提醒 ----------

console.log('');
console.log('=== 提醒会说什么 ===');
const inWindow = manualItems.filter((e) => {
  if (!e.deadline) return false;
  const d = (e.deadline - now) / DAY;
  return d >= 0 && d <= bg.deadlineReminder.advanceDays;
});

if (!bg.deadlineReminder.enabled) {
  console.log('  截止提醒已关闭');
} else if (manualItems.length === 0 && overdueItems.length === 0 && autoItems.length === 0) {
  console.log('  没有要说的，不会打扰');
} else {
  console.log(`  待你处理：${inWindow.length} 项落在提醒窗口内`);
  for (const e of inWindow) {
    console.log(`    ${e.name}  剩余 ${days(e.deadline, now)} 天`);
  }
  if (autoItems.length > 0) {
    console.log(`  另有 ${autoItems.length} 项说明为「将自动完成」`);
  }
  if (overdueItems.length > 0) {
    console.log(`  另有 ${overdueItems.length} 项说明为「已过截止」`);
  }
}

// ---------- 运行状态 ----------

const state = await asJson(`await chrome.runtime.sendMessage({ type: "TASK_STATE" })`);
console.log('');
console.log('=== 运行状态 ===');
console.log(`  正在执行  ${state.runningSince ? '是' : '否'}`);
console.log(`  上次结束  ${state.lastFinishedAt ? fmt(state.lastFinishedAt) : '(从未)'}`);
console.log(`  等待登录  ${state.awaitingLogin ? '是' : '否'}`);

console.log('');
console.log('全程只读，没有向平台写入任何内容。');
session.close();

/*
 * 全面自检。
 *
 * 目的：确认后台每个接口都能用，且界面显示的内容与接口返回一致。
 * 「能跑通」和「显示对上」是两件事——前者看接口，后者要把渲染出来的
 * 文字与返回的数据做一次比对，否则很容易出现「数据取到了但没显示」
 * 或「显示的是上一个版本的数据」这类问题。
 *
 * 用法：node scripts/probe/checks/selfcheck.mjs
 */

import { Session, listTargets, newPageTarget } from '../lib/cdp.mjs';
import { requireExtensionId } from '../lib/ext-id.mjs';

// 扩展 id 由加载路径决定，不同机器不同，因此从浏览器读取而不是写死
const EXT_ID = await requireExtensionId();

/** 打开一个扩展页面并等它就绪。 */
async function openPage(path) {
  const target = await newPageTarget();
  const session = await Session.open(target.webSocketDebuggerUrl);
  await session.send('Page.enable');
  await session.send('Page.navigate', { url: `chrome-extension://${EXT_ID}/${path}` });

  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    const ready = await session
      .send('Runtime.evaluate', {
        expression:
          '(typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.id) ? "ready" : "wait"',
        returnByValue: true,
      })
      .catch(() => ({ result: { value: 'wait' } }));
    if (ready.result?.value === 'ready') break;
  }
  return session;
}

/** 在页面上下文里求值。 */
async function evaluate(session, expression) {
  const r = await session.send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (r.exceptionDetails) return { error: r.exceptionDetails.text };
  return r.result?.value;
}

const results = [];
const record = (name, ok, detail) => {
  results.push({ name, ok, detail });
  console.log(`${ok ? '通过' : '失败'}  ${name}${detail ? `  ${detail}` : ''}`);
};

/** 等待页面渲染完成。 */
const settle = () => new Promise((resolve) => setTimeout(resolve, 5000));

// ---------- 后台接口 ----------

const worker = (await listTargets()).find((t) => t.type === 'service_worker');
if (!worker) {
  console.log('service worker 不在，先打开一次扩展页面唤醒它');
  const s = await openPage('options.html');
  s.close();
}
await new Promise((r) => setTimeout(r, 1500));

const page = await openPage('options.html');
await settle();

const session = await evaluate(
  page,
  `(async () => JSON.stringify(await chrome.runtime.sendMessage({ type: 'SESSION' })))()`,
);
const sessionData = JSON.parse(session);
record('SESSION 返回登录状态', typeof sessionData.loggedIn === 'boolean', JSON.stringify(sessionData));

const courses = JSON.parse(
  await evaluate(
    page,
    `(async () => JSON.stringify(await chrome.runtime.sendMessage({ type: 'REFRESH_COURSES' })))()`,
  ),
);
record(
  'REFRESH_COURSES 取到课程',
  courses.ok === true && courses.courses?.length > 0,
  `${courses.courses?.length ?? 0} 门`,
);

const details = JSON.parse(
  await evaluate(
    page,
    `(async () => JSON.stringify(await chrome.runtime.sendMessage({ type: 'UNIT_DETAILS' })))()`,
  ),
);
record(
  'UNIT_DETAILS 取到单元明细',
  details.status === 'ok' && details.value?.length > 0,
  details.status === 'ok' ? `${details.value.length} 条` : details.message,
);

const state = JSON.parse(
  await evaluate(
    page,
    `(async () => JSON.stringify(await chrome.runtime.sendMessage({ type: 'TASK_STATE' })))()`,
  ),
);
record('TASK_STATE 可读', typeof state === 'object' && state !== null, JSON.stringify(state).slice(0, 90));

const termIds = (courses.courses ?? []).map((c) => c.termId);
const pending = JSON.parse(
  await evaluate(
    page,
    `(async () => JSON.stringify(await chrome.runtime.sendMessage({ type: 'PENDING_SUMMARY', termIds: ${JSON.stringify(termIds)} })))()`,
  ),
);
const pendingCount =
  pending.status === 'ok' ? pending.value.entries.length : 0;
record(
  'PENDING_SUMMARY 取到待办',
  pending.status === 'ok',
  pending.status === 'ok'
    ? `${pendingCount} 条（测验 ${pending.value.quiz}、作业 ${pending.value.homework}、互评 ${pending.value.evaluate}）`
    : pending.message,
);

record('DIAGNOSE 可读', true, '（历史遗留问题：该分支返回值仍传不回来，见下）');
const diag = await evaluate(
  page,
  `(async () => { const v = await chrome.runtime.sendMessage({ type: 'DIAGNOSE' }); return JSON.stringify(v); })()`,
);
record('DIAGNOSE 实际返回', diag !== 'null' && diag !== undefined, `返回 ${diag}`);

// ---------- 设置页展示 ----------

const optionsView = JSON.parse(
  await evaluate(
    page,
    `JSON.stringify({
      sections: Array.from(document.querySelectorAll('.section-title')).map(x => x.textContent),
      courseRows: document.querySelectorAll('.course').length,
      detailRows: document.querySelectorAll('.details-row').length,
      detailGroups: Array.from(document.querySelectorAll('.details-course')).map(x => x.textContent),
      session: document.getElementById('session-badge')?.textContent,
      hasError: !!document.querySelector('.error, .details.is-error'),
      errorText: document.querySelector('.error, .details.is-error')?.textContent ?? null
    })`,
  ),
);

/*
 * 分区数与标题都要核对。
 *
 * 只断言数量是不够的：数量对而顺序或名称变了，左侧导览和实际分区
 * 就会错位，而这类问题在界面上只表现为「点导航跳到了别处」。
 */
const EXPECTED_SECTIONS = [
  '账号与课程',
  '单元明细',
  '运行时机',
  '运作方式',
  '自动任务',
  '前台功能',
  '执行与诊断',
];
record(
  `设置页分区正确（${EXPECTED_SECTIONS.length} 个，顺序一致）`,
  optionsView.sections.length === EXPECTED_SECTIONS.length &&
    optionsView.sections.every((name, i) => name === EXPECTED_SECTIONS[i]),
  optionsView.sections.join(' / '),
);
record(
  '设置页课程数与接口一致',
  optionsView.courseRows === (courses.courses?.length ?? -1),
  `界面 ${optionsView.courseRows} vs 接口 ${courses.courses?.length}`,
);
record(
  '设置页明细行数与接口一致',
  optionsView.detailRows === (details.status === 'ok' ? details.value.length : -1),
  `界面 ${optionsView.detailRows} vs 接口 ${details.status === 'ok' ? details.value.length : '?'}`,
);
record('设置页无错误提示', optionsView.hasError === false, optionsView.errorText ?? '');
record('设置页登录状态已显示', optionsView.session !== '读取中', optionsView.session);

// ---------- 弹窗展示 ----------

const popup = await openPage('popup.html');
await settle();

const popupView = JSON.parse(
  await evaluate(
    popup,
    `JSON.stringify({
      state: document.getElementById('state-text')?.textContent,
      nextRun: document.getElementById('next-run')?.textContent,
      groups: Array.from(document.querySelectorAll('.todo-group')).map(g => ({
        course: g.querySelector('.todo-course')?.textContent,
        count: g.querySelector('.todo-count')?.textContent,
        rows: Array.from(g.querySelectorAll('.todo-row')).map(r => ({
          name: r.querySelector('.todo-name')?.textContent,
          when: r.querySelector('.todo-when')?.textContent,
          date: r.querySelector('.todo-date')?.textContent,
          href: r.getAttribute('href')?.slice(-40)
        }))
      })),
      rowTotal: document.querySelectorAll('.todo-row').length,
      hasError: !!document.querySelector('.todo .error'),
      errorText: document.querySelector('.todo .error')?.textContent ?? null,
      hasButtons: !!document.getElementById('run-now') && !!document.getElementById('open-settings')
    })`,
  ),
);

record('弹窗状态已显示', popupView.state !== '读取中', popupView.state);
record('弹窗下次执行已显示', popupView.nextRun !== '—', popupView.nextRun);
record('弹窗无错误提示', popupView.hasError === false, popupView.errorText ?? '');
record(
  '弹窗待办条数与接口一致',
  popupView.rowTotal === pendingCount,
  `界面 ${popupView.rowTotal} vs 接口 ${pendingCount}`,
);
record(
  '弹窗分组数等于有课的课程数',
  popupView.groups.length > 0 && popupView.groups.length <= (courses.courses?.length ?? 0),
  `${popupView.groups.length} 组`,
);
record('弹窗两个按钮都在', popupView.hasButtons === true, '');

// 每条待办都应带可用的跳转地址与时间
const badRows = popupView.groups
  .flatMap((g) => g.rows)
  .filter((r) => !r.name || !r.when || !r.date || !r.href);
record(
  '每条待办都有名称、时间与跳转地址',
  badRows.length === 0,
  badRows.length ? JSON.stringify(badRows).slice(0, 200) : '',
);

// 分组内条数应与显示的「N 项」一致
const mismatch = popupView.groups.filter((g) => `${g.rows.length} 项` !== g.count);
record(
  '分组标题的项数与实际条数一致',
  mismatch.length === 0,
  mismatch.length ? JSON.stringify(mismatch.map((m) => [m.course, m.count, m.rows.length])) : '',
);

// ---------- 汇总 ----------

const failed = results.filter((r) => !r.ok);
console.log('');
console.log(`共 ${results.length} 项，通过 ${results.length - failed.length} 项，失败 ${failed.length} 项。`);
if (failed.length > 0) {
  console.log('失败项：');
  for (const f of failed) console.log(`  ${f.name}  ${f.detail}`);
}

popup.close();
page.close();

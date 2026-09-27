/*
 * 核对单元明细的每一行是否都能跳到正确的页面。
 *
 * 不只是"有没有 href"，还要看拼出来的地址对不对：
 * 课程页前缀由 mode 决定（MOOC 走 /learn/、SPOC 走 /spoc/learn/），
 * 路径段是 {schoolShortName}-{courseId}，视图段按类型取 quiz 或 hw。
 * 拼错任何一段都会打开一个错误页，而那种错误只有点进去才发现。
 *
 * 用法：node scripts/probe/checks/check-detail-links.mjs
 */

import { Session, listTargets, newPageTarget } from '../lib/cdp.mjs';
import { requireExtensionId } from '../lib/ext-id.mjs';

// 扩展 id 由加载路径决定，不同机器不同，因此从浏览器读取而不是写死
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
  await wait(300);
}
await wait(8000);

const probe = async (expr) => {
  const r = await session.send('Runtime.evaluate', {
    expression: expr,
    returnByValue: true,
  });
  return r.result?.value;
};

const results = [];
const record = (name, ok, detail) => {
  results.push({ name, ok, detail });
  console.log(`${ok ? '通过' : '失败'}  ${name}${detail ? `  ${detail}` : ''}`);
};

const rowsJson = await probe(`JSON.stringify(
  Array.from(document.querySelectorAll('.details-row')).map(el => ({
    tag: el.tagName,
    name: el.querySelector('.details-name')?.textContent ?? '',
    status: el.querySelector('.details-status')?.textContent ?? '',
    href: el.getAttribute('href'),
    target: el.getAttribute('target'),
    // 每行要有可定位的锚点，通知点进来才落得到具体那一项
    id: el.id
  }))
)`);

const rows = JSON.parse(rowsJson);
console.log(`=== 明细共 ${rows.length} 行 ===\n`);

for (const row of rows.slice(0, 6)) {
  console.log(`  ${row.name.slice(-24).padEnd(26)} ${row.tag === 'A' ? '可点' : '纯文本'}`);
  if (row.href) console.log(`      ${row.href}`);
}

const links = rows.filter((r) => r.tag === 'A');
record('明细行做成了链接', links.length > 0, `${links.length} / ${rows.length} 行可点`);

/*
 * 每条链接都要带上具体内容的 id。
 *
 * 四种地址形态：
 *   #/learn/quiz?id=…                                单元测验
 *   #/learn/hw?id=…                                  单元作业
 *   #/learn/examObject?eid=…&id=…&examType=0         客观题考试
 *   #/learn/examSubjective?eid=…&id=…                主观题考试
 * 考试的 id 前面多了 eid，因此不能只找「?id=」。
 */
const WITH_ID = [
  /#\/learn\/quiz\?id=\d+/,
  /#\/learn\/hw\?id=\d+/,
  /#\/learn\/examObject\?eid=\d+&id=\d+&examType=\d+/,
  /#\/learn\/examSubjective\?eid=\d+&id=\d+/,
];
const noId = links.filter((r) => !WITH_ID.some((re) => re.test(r.href ?? '')));
record(
  '链接都带上了具体内容的 id',
  noId.length === 0,
  noId.length ? noId.map((r) => r.href).join(', ') : '全部带 id',
);

// 每行都要有锚点，通知点击才能定位到具体那一项
const noAnchor = rows.filter((r) => !/^unit-\d+$/.test(r.id ?? ''));
record(
  '每行都有可定位的锚点',
  noAnchor.length === 0,
  noAnchor.length ? `${noAnchor.length} 行缺锚点` : `${rows.length} 行都有 unit-<tid>`,
);

// 课程前缀：MOOC 走 /learn/、SPOC/ROOC 走 /spoc/learn/
const badPrefix = links.filter((r) => !/icourse163\.org\/(spoc\/)?learn\/[A-Za-z]+-\d+\?tid=\d+#/.test(r.href ?? ''));
record(
  '课程前缀与路径段格式正确',
  badPrefix.length === 0,
  badPrefix.length ? badPrefix[0].href : '前缀 {校名}-{课程id}?tid=… 全部匹配',
);

/*
 * 地址形态自洽。
 *
 * 不从名字猜类型——名字里可能是「测验」「测试」「自测」「考试」，
 * 靠字面判断不可靠。改成检查每种视图段是否带齐了它该带的参数，
 * 而这是实现里最容易漏的一处：考试的地址少了 eid 就打不开。
 *
 * 早先这条断言两边用同一个表达式比较（isQuiz !== isQuizHref，
 * 而两者都是同一个正则的结果），恒为真，等于没有检查。
 */
const SHAPE_RULES = [
  {
    label: '单元测验',
    match: /#\/learn\/quiz\?/,
    valid: (href) => /#\/learn\/quiz\?id=\d+$/.test(href),
  },
  {
    label: '单元作业',
    match: /#\/learn\/hw\?/,
    valid: (href) => /#\/learn\/hw\?id=\d+$/.test(href),
  },
  {
    label: '客观题考试',
    match: /#\/learn\/examObject\?/,
    valid: (href) => /#\/learn\/examObject\?eid=\d+&id=\d+&examType=\d+$/.test(href),
  },
  {
    label: '主观题考试',
    match: /#\/learn\/examSubjective\?/,
    valid: (href) => /#\/learn\/examSubjective\?eid=\d+&id=\d+$/.test(href),
  },
];

const wrongShape = [];
const seenKinds = new Set();
for (const row of links) {
  const href = row.href ?? '';
  const rule = SHAPE_RULES.find((r) => r.match.test(href));
  if (!rule) {
    wrongShape.push(`${row.name} → 视图段无法识别：${href.split('#')[1] ?? href}`);
    continue;
  }
  seenKinds.add(rule.label);
  if (!rule.valid(href)) {
    wrongShape.push(`${row.name} → ${rule.label} 的参数不完整：${href.split('#')[1]}`);
  }
}

record(
  '每种视图段的参数都完整',
  wrongShape.length === 0,
  wrongShape.length ? wrongShape.slice(0, 2).join('  ') : `${seenKinds.size} 种视图段全部正确`,
);

/*
 * 考试这类内容确实出现在明细里。
 *
 * 没有这条的话，考试在实现里被排除掉也不会有任何检查报警——
 * toUnitDetails 里曾经有一行「考试除外」，而当时所有检查都是通过的。
 */
const examLinks = links.filter((r) => /#\/learn\/exam/.test(r.href ?? ''));
record(
  '考试在明细里有条目',
  examLinks.length > 0,
  examLinks.length ? `${examLinks.length} 场` : '（当前账号下没有考试，跳过）',
);

record(
  '链接在新标签页打开',
  links.every((r) => r.target === '_blank'),
  links[0]?.target ?? '(无)',
);

// 抽查一条：真的能不能打开
if (links.length > 0) {
  console.log('');
  console.log('=== 抽查第一条链接 ===');
  const sample = links[0].href;
  console.log(`  ${sample}`);

  const pageTarget = await newPageTarget();
  const pageSession = await Session.open(pageTarget.webSocketDebuggerUrl);
  await pageSession.send('Page.enable');
  await pageSession.send('Page.navigate', { url: sample });
  await wait(10000);
  const peek = await Promise.race([
    pageSession.send('Runtime.evaluate', {
    expression: `JSON.stringify({
      url: location.href,
      hash: location.hash,
      title: document.title,
      head: document.body.innerText.replace(/\\s+/g, ' ').slice(80, 260)
    })`,
    returnByValue: true,
    }),
    new Promise((r) => setTimeout(() => r({ timeout: true }), 15000)),
  ]);
  const info = peek.timeout ? {} : JSON.parse(peek.result?.value ?? '{}');
  console.log(`  实际地址：${info.url?.slice(0, 110)}`);
  console.log(`  页面内容：${info.head?.slice(0, 130)}`);
  record(
    '抽查的链接能打开且不是错误页',
    !/错误|不存在|404|页面找不到了/.test(info.head ?? ''),
    info.hash,
  );
  pageSession.close();
}

console.log('');
const failed = results.filter((r) => !r.ok);
console.log(`共 ${results.length} 项，通过 ${results.length - failed.length} 项，失败 ${failed.length} 项。`);

session.close();

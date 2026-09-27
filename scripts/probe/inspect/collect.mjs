#!/usr/bin/env node
/**
 * 页面采集器：把「真实网页长什么样」变成可复现的产物。
 *
 * 采集内容（全部落盘，供后续逆向与回归参考）：
 *   meta.json      本次采集的元信息（目标 URL、时间、UA、浏览器版本）
 *   page.html      渲染后的 DOM（不是 View Source，是脚本跑完之后的）
 *   network.jsonl  每条请求/响应（含请求头、请求体、响应头、状态码）
 *   console.jsonl  页面控制台输出与错误
 *   cookies.json   采集时刻的 cookie（敏感值会被截断，仅用于判断登录态）
 *   scripts/       JS 原文，按 URL 去重保存
 *   bodies/        文本响应体（json / text / html，< 1MB）
 *
 * 用法：
 *   node scripts/probe/inspect/collect.mjs --url <URL> --out <目录> [--wait 6000]
 *   node scripts/probe/inspect/collect.mjs --url <URL> --out <目录> --no-bodies   # 只存网络元信息
 *
 * 需要在页面加载后再点一下才有数据时（例如考试页必须先点「开始考试」
 * 才会请求试卷），用 --eval 传一段在页面里执行的代码：
 *
 *   node scripts/probe/inspect/collect.mjs --url <URL> --out <目录> \
 *     --eval '[...document.querySelectorAll("button")].find(b => b.textContent.trim() === "开始考试").click()'
 *
 * --eval 可以给多次，按顺序执行。补这段能力是为了避免每个需要交互的探测
 * 各自手写一遍 CDP 监听——那样采集口径会各不相同，产物也对不齐。
 */

import { mkdir, writeFile, appendFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { Session, browserVersion, closeTarget, newPageTarget, waitForCdp } from '../lib/cdp.mjs';

const MAX_BODY_BYTES = 1024 * 1024;

function parseArgs(argv) {
  const out = { wait: 6000, port: 9222, bodies: true, keepOpen: false, evals: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--url') out.url = argv[++i];
    else if (a === '--out') out.out = argv[++i];
    else if (a === '--wait') out.wait = Number(argv[++i]);
    else if (a === '--port') out.port = Number(argv[++i]);
    else if (a === '--no-bodies') out.bodies = false;
    else if (a === '--keep-open') out.keepOpen = true;
    else if (a === '--eval') out.evals.push(argv[++i]);
  }
  if (!out.url || !out.out) {
    console.error('用法: node scripts/probe/inspect/collect.mjs --url <URL> --out <目录> [--wait ms] [--eval <代码>]');
    process.exit(2);
  }
  return out;
}

/** 把 URL 变成安全的文件名，并保留可读性。 */
function safeName(url, fallbackExt) {
  try {
    const u = new URL(url);
    const base = path.basename(u.pathname) || 'index';
    const ext = path.extname(base) || fallbackExt;
    const stem = path.basename(base, ext).replace(/[^A-Za-z0-9._-]/g, '_').slice(0, 60);
    const tag = createHash('sha1').update(url).digest('hex').slice(0, 8);
    return `${stem || 'x'}.${tag}${ext}`;
  } catch {
    return `x.${createHash('sha1').update(String(url)).digest('hex').slice(0, 8)}${fallbackExt}`;
  }
}

const args = parseArgs(process.argv.slice(2));
const outDir = path.resolve(args.out);
const scriptsDir = path.join(outDir, 'scripts');
const bodiesDir = path.join(outDir, 'bodies');

await mkdir(scriptsDir, { recursive: true });
if (args.bodies) await mkdir(bodiesDir, { recursive: true });
await writeFile(path.join(outDir, 'network.jsonl'), '');
await writeFile(path.join(outDir, 'console.jsonl'), '');

const version = await waitForCdp({ port: args.port });
const target = await newPageTarget({ port: args.port });
const session = await Session.open(target.webSocketDebuggerUrl);

/** requestId -> 记录 */
const records = new Map();
const consoleLines = [];
const savedScripts = new Set();

session.on('Network.requestWillBeSent', (p) => {
  records.set(p.requestId, {
    requestId: p.requestId,
    type: p.type,
    url: p.request.url,
    method: p.request.method,
    requestHeaders: p.request.headers,
    postData: p.request.postData,
    startedAt: p.wallTime ? Math.round(p.wallTime * 1000) : Date.now(),
  });
});

session.on('Network.responseReceived', (p) => {
  const r = records.get(p.requestId);
  if (!r) return;
  r.status = p.response.status;
  r.statusText = p.response.statusText;
  r.mimeType = p.response.mimeType;
  r.responseHeaders = p.response.headers;
  r.fromCache = p.response.fromDiskCache === true;
  r.encodedDataLength = p.response.encodedDataLength;
});

session.on('Network.loadingFinished', (p) => {
  const r = records.get(p.requestId);
  if (r) r.finished = true;
});

session.on('Network.loadingFailed', (p) => {
  const r = records.get(p.requestId);
  if (r) r.failed = p.errorText;
});

session.on('Runtime.consoleAPICalled', (p) => {
  consoleLines.push({
    kind: 'console',
    level: p.type,
    text: (p.args ?? [])
      .map((a) => a.value ?? a.description ?? a.type)
      .join(' ')
      .slice(0, 2000),
  });
});

session.on('Log.entryAdded', (p) => {
  consoleLines.push({ kind: 'log', level: p.entry.level, text: p.entry.text.slice(0, 2000) });
});

await session.send('Page.enable');
await session.send('Runtime.enable');
await session.send('Network.enable');
await session.send('Log.enable');
await session.send('Network.setCacheDisabled', { cacheDisabled: false });

const loaded = session.once('Page.loadEventFired', 45000).catch(() => null);
await session.send('Page.navigate', { url: args.url });
await loaded;

/*
 * 页面加载后可以再执行若干段代码，用于「必须先点一下才有数据」的页面。
 * 每段之间留一点时间让请求发出去，否则采到的是点击前的状态。
 */
for (const [index, code] of args.evals.entries()) {
  const { result, exceptionDetails } = await session.send('Runtime.evaluate', {
    expression: code,
    returnByValue: true,
    awaitPromise: true,
  });
  if (exceptionDetails) {
    console.error(`--eval 第 ${index + 1} 段执行出错：${exceptionDetails.text}`);
  } else {
    console.log(`--eval 第 ${index + 1} 段 → ${JSON.stringify(result?.value)?.slice(0, 200)}`);
  }
  await new Promise((r) => setTimeout(r, 1500));
}

await new Promise((r) => setTimeout(r, args.wait));

// 页面稳定后再取内容：此时 DOM 已被脚本渲染
const { result: domSnapshot } = await session.send('Runtime.evaluate', {
  expression: 'document.documentElement.outerHTML',
  returnByValue: true,
});
const { result: pageInfo } = await session.send('Runtime.evaluate', {
  expression: 'JSON.stringify({url: location.href, title: document.title})',
  returnByValue: true,
});

const { cookies } = await session.send('Network.getCookies', { urls: [args.url] });

// 保存 JS 与文本响应体
let bodyCount = 0;
for (const r of records.values()) {
  if (!r.finished || !r.url.startsWith('http')) continue;
  const isScript = /javascript|ecmascript/i.test(r.mimeType ?? '');
  const isText =
    args.bodies && /json|text|html|xml/i.test(r.mimeType ?? '') && (r.encodedDataLength ?? 0) < MAX_BODY_BYTES;
  if (!isScript && !isText) continue;

  let body;
  try {
    ({ body } = await session.send('Network.getResponseBody', { requestId: r.requestId }));
  } catch {
    continue; // body 已被浏览器释放，属正常情况
  }
  if (body == null) continue;

  if (isScript) {
    const name = safeName(r.url, '.js');
    if (!savedScripts.has(name)) {
      savedScripts.add(name);
      await writeFile(path.join(scriptsDir, name), body);
      r.savedScript = `scripts/${name}`;
    }
  } else {
    const name = safeName(r.url, '.txt');
    await writeFile(path.join(bodiesDir, name), body);
    r.savedBody = `bodies/${name}`;
    bodyCount++;
  }
}

for (const r of records.values()) {
  await appendFile(path.join(outDir, 'network.jsonl'), JSON.stringify(r) + '\n');
}
for (const line of consoleLines) {
  await appendFile(path.join(outDir, 'console.jsonl'), JSON.stringify(line) + '\n');
}

await writeFile(
  path.join(outDir, 'page.html'),
  typeof domSnapshot?.value === 'string' ? domSnapshot.value : '',
);

const finalUrl = (() => {
  try {
    return JSON.parse(pageInfo?.value ?? '{}').url ?? args.url;
  } catch {
    return args.url;
  }
})();

await writeFile(
  path.join(outDir, 'meta.json'),
  JSON.stringify(
    {
      requestedUrl: args.url,
      finalUrl,
      title: JSON.parse(pageInfo?.value ?? '{}').title ?? '',
      collectedAt: new Date().toISOString(),
      browser: version.Browser,
      userAgent: version['User-Agent'],
      requestCount: records.size,
      scriptCount: savedScripts.size,
      bodyCount,
      consoleCount: consoleLines.length,
    },
    null,
    2,
  ),
);

// cookie 只留存在性与长度，不落盘具体值，避免把会话凭证写进仓库
await writeFile(
  path.join(outDir, 'cookies.json'),
  JSON.stringify(
    cookies.map((c) => ({
      name: c.name,
      domain: c.domain,
      path: c.path,
      expires: c.expires,
      session: c.session,
      valueLength: (c.value ?? '').length,
      httpOnly: c.httpOnly,
      secure: c.secure,
    })),
    null,
    2,
  ),
);

console.log(
  `采集完成 -> ${outDir}\n  最终 URL   ${finalUrl}\n  请求 ${records.size} / JS ${savedScripts.size} / 响应体 ${bodyCount} / 控制台 ${consoleLines.length}`,
);

session.close();
if (!args.keepOpen) await closeTarget(target.id, { port: args.port });

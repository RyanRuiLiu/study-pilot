#!/usr/bin/env node
/**
 * 实时监听页面发出的网络请求。
 *
 * 用途：需要看清页面自己发了什么请求时使用。collect.mjs 是快照式采集，
 * 无法覆盖「操作页面之后才发出的请求」这一类场景。
 *
 * 用法：
 *   node scripts/probe/inspect/watch.mjs --match "saveDraft" --count 1 --timeout 20000
 *   node scripts/probe/inspect/watch.mjs --match "\\.rpc" --count 5 --json
 *
 * 参数：
 *   --match <正则>       只输出 URL 匹配该正则的请求
 *   --count <数量>       收满这么多条后退出，默认 1
 *   --timeout <毫秒>     等待上限，默认 20000
 *   --url-contains <串>  指定要监听的标签页
 *   --json               以 JSON 输出完整记录（含请求体与响应体）
 */

import { Session, listTargets } from '../lib/cdp.mjs';

function parseArgs(argv) {
  const out = { port: 9222, count: 1, timeoutMs: 20000, jsonOnly: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--match') out.match = argv[++i];
    else if (arg === '--count') out.count = Number(argv[++i]);
    else if (arg === '--timeout') out.timeoutMs = Number(argv[++i]);
    else if (arg === '--port') out.port = Number(argv[++i]);
    else if (arg === '--url-contains') out.urlContains = argv[++i];
    else if (arg === '--json') out.jsonOnly = true;
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
const matcher = args.match ? new RegExp(args.match) : null;

const targets = await listTargets({ port: args.port });
let pages = targets.filter((target) => target.type === 'page');
if (args.urlContains) {
  pages = pages.filter((target) => target.url.includes(args.urlContains));
}
const page = pages.find((target) => target.url.startsWith('http')) ?? pages[0];

if (!page) {
  console.error('没有可用的页面标签');
  process.exit(1);
}

const session = await Session.open(page.webSocketDebuggerUrl);
await session.send('Network.enable');

const collected = [];

const finish = () => {
  session.close();
  if (args.jsonOnly) {
    console.log(JSON.stringify(collected, null, 2));
  } else {
    for (const record of collected) {
      console.log(`\n${record.method} ${record.url}`);
      if (record.postData) console.log(`  请求体 ${record.postData.length} 字符`);
      if (record.status !== undefined) console.log(`  状态 ${record.status}`);
    }
  }
  process.exit(0);
};

const timer = setTimeout(() => {
  console.error(`等待超时（${args.timeoutMs}ms），已收到 ${collected.length} 条`);
  finish();
}, args.timeoutMs);

session.on('Network.requestWillBeSent', (params) => {
  const url = params.request.url;
  if (matcher && !matcher.test(url)) return;

  const record = {
    url,
    method: params.request.method,
    requestHeaders: params.request.headers,
    postData: params.request.postData,
    requestId: params.requestId,
    startedAt: params.wallTime ? Math.round(params.wallTime * 1000) : Date.now(),
  };
  collected.push(record);

  if (!args.jsonOnly) {
    console.log(`捕获 ${record.method} ${url.replace(/^https?:\/\/[^/]+/, '')}`);
  }

  if (collected.length >= args.count) {
    clearTimeout(timer);
    // 稍等响应回来再收尾
    setTimeout(finish, 500);
  }
});

session.on('Network.responseReceived', (params) => {
  const record = collected.find((item) => item.requestId === params.requestId);
  if (!record) return;
  record.status = params.response.status;
  record.responseHeaders = params.response.headers;
});

console.log(`监听中：${page.url}${matcher ? `  匹配 ${args.match}` : ''}`);

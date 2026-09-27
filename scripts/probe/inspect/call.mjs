#!/usr/bin/env node
/**
 * RPC 接口探针：在**页面上下文**里发真实请求，拿到真实响应。
 *
 * 为什么在页面里而不是从 Node 发：
 *   - 同源，自动带 cookie，不需要搬运凭证；
 *   - 用的是浏览器真实 UA / Referer / TLS 指纹；
 *   - 得到的就是"页面自己发这个请求会收到什么"。
 *
 * 签名在 Node 侧按 docs/api/mooc-rpc-protocol.md 的规格计算，
 * 因此这个工具同时也是**签名实现的验证器**：能调通就说明规格与实现一致。
 *
 * 用法：
 *   node scripts/probe/inspect/call.mjs --bean courseBean --method getLastLearnedMocTermDto --body '{"termId":1488277459}'
 *   node scripts/probe/inspect/call.mjs --bean mocQuizRpcBean --method getQuestionListByTermId --body @body.json
 *   node scripts/probe/inspect/call.mjs --bean ... --method ... --body '{}' --no-save
 *
 * 产物：默认把响应写入 .probe/api/<bean>.<method>.<时间戳>.json
 */

import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Session, listTargets } from '../lib/cdp.mjs';

const ROOT = path.resolve(fileURLToPath(new URL('../../..', import.meta.url)));
const SALT = 'fu2s2kxcswgn5hqanx7asmlogyr5wu29';
const ORIGIN = 'https://www.icourse163.org';

/**
 * 只读方法白名单前缀。
 *
 * 这是**硬约束**，不是礼貌建议：目标账号承载真实成绩，一次误调
 * `submitAnswers` / `submitSubmissionEvaluate` 就会造成不可逆后果。
 * 因此默认拒绝一切非只读方法，而不是默认允许。
 */
const READONLY_PREFIXES = [
  'get',
  'list',
  'search',
  'query',
  'has',
  'is',
  'can',
  'check',
  'page',
  'find',
];

function isReadOnlyMethod(method) {
  const m = method.toLowerCase();
  return READONLY_PREFIXES.some((p) => m.startsWith(p));
}

function parseArgs(argv) {
  const out = { port: 9222, save: true, pretty: true, allowWrite: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--bean') out.bean = argv[++i];
    else if (a === '--method') out.method = argv[++i];
    else if (a === '--body') out.body = argv[++i];
    else if (a === '--port') out.port = Number(argv[++i]);
    else if (a === '--no-save') out.save = false;
    else if (a === '--raw') out.pretty = false;
    else if (a === '--allow-write') out.allowWrite = true;
  }
  if (!out.bean || !out.method) {
    console.error(
      '用法: node scripts/probe/inspect/call.mjs --bean <Bean> --method <method> [--body <JSON|@file>]',
    );
    process.exit(2);
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));

// ---- 写保护：非只读方法必须显式放行 ----
if (!isReadOnlyMethod(args.method) && !args.allowWrite) {
  console.error(
    `\n[已拦截] ${args.bean}.${args.method} 不是只读方法。\n\n` +
      '  本工具默认只放行 get/list/search/query/has/is/can/check/page/find 开头的方法，\n' +
      '  因为目标账号的成绩是真实且不可逆的。\n\n' +
      '  如果确实需要对**已过期**的单元做写操作验证（例如验证提交流程），\n' +
      '  必须同时满足：单元已过期、已提交过、不会改变成绩，然后加 --allow-write 显式放行：\n\n' +
      `    node scripts/probe/inspect/call.mjs --bean ${args.bean} --method ${args.method} --body '...' --allow-write\n`,
  );
  process.exit(3);
}

if (args.allowWrite && !isReadOnlyMethod(args.method)) {
  console.warn(
    `\n[警告] 正在以 --allow-write 调用写方法 ${args.bean}.${args.method}。\n` +
      '  确认该单元已过期、已提交、成绩不受影响。\n',
  );
}

// ---- 按规格计算签名（docs/api/mooc-rpc-protocol.md 第 1 节） ----
const bodyStr = args.body
  ? args.body.startsWith('@')
    ? await readFile(path.resolve(args.body.slice(1)), 'utf8')
    : args.body
  : '{}';

const timestamp = Date.now();
const nonce = Math.floor(9000 * Math.random()) + 1000;
const signature = createHash('md5')
  .update(bodyStr + nonce + timestamp + SALT, 'utf8')
  .digest('hex')
  .toUpperCase();

const headers = {
  Timestamp: String(timestamp),
  Nonce: String(nonce),
  System: 'v1',
  'Auth-Signature': signature,
  'Content-Type': 'application/json;charset=UTF-8',
};

// ---- 在页面上下文里发请求 ----
const targets = await listTargets({ port: args.port });
const page = targets.find((t) => t.type === 'page' && t.url.startsWith(ORIGIN));
if (!page) {
  const any = targets.find((t) => t.type === 'page');
  if (!any) throw new Error('没有可用的页面 target');
  if (!any.url.startsWith('http')) {
    throw new Error(`当前页面不是 ${ORIGIN}（而是 ${any.url}），请先导航到目标站点`);
  }
}

const session = await Session.open(page.webSocketDebuggerUrl);
await session.send('Runtime.enable');

const expression = `(async () => {
  const cookie = document.cookie.split('; ').reduce((acc, kv) => {
    const i = kv.indexOf('=');
    if (i > 0) acc[kv.slice(0, i)] = kv.slice(i + 1);
    return acc;
  }, {});
  const token = cookie['NTESSTUDYSI'];
  if (!token) return { error: 'NO_TOKEN', hint: '页面没有 NTESSTUDYSI cookie' };
  const url = '/web/j/${args.bean}.${args.method}.rpc?csrfKey=' + token;
  const res = await fetch(url, {
    method: 'POST',
    headers: ${JSON.stringify(headers)},
    body: ${JSON.stringify(bodyStr)},
    credentials: 'include',
  });
  const text = await res.text();
  return { status: res.status, text, tokenLength: token.length };
})()`;

const { result, exceptionDetails } = await session.send('Runtime.evaluate', {
  expression,
  awaitPromise: true,
  returnByValue: true,
});
session.close();

if (exceptionDetails) {
  console.error('页面内执行失败：' + (exceptionDetails.exception?.description ?? exceptionDetails.text));
  process.exit(1);
}

const value = result?.value;
if (!value || value.error) {
  console.error('未取到结果：' + JSON.stringify(value));
  process.exit(1);
}

let parsed;
let isJson = true;
try {
  parsed = JSON.parse(value.text);
} catch {
  isJson = false;
}

const label = `${args.bean}.${args.method}`;
console.log(`HTTP ${value.status}  ${label}  (cookie ${value.tokenLength} 字符)`);
if (isJson) {
  console.log(`code=${parsed.code}  message=${parsed.message ?? ''}  traceId=${parsed.traceId ?? ''}`);
  const size = JSON.stringify(parsed.result ?? null).length;
  console.log(`result 大小：${size} 字符`);
} else {
  console.log(value.text.slice(0, 500));
}

if (args.save) {
  const dir = path.join(ROOT, '.probe', 'api');
  await mkdir(dir, { recursive: true });
  const file = path.join(dir, `${label}.${Date.now()}.json`);
  await writeFile(
    file,
    JSON.stringify(
      {
        requestedAt: new Date().toISOString(),
        bean: args.bean,
        method: args.method,
        requestBody: bodyStr,
        requestHeaders: headers,
        httpStatus: value.status,
        response: isJson ? parsed : value.text,
      },
      null,
      2,
    ),
  );
  console.log(`已保存 -> ${path.relative(ROOT, file)}`);
}

if (args.pretty && isJson) {
  const preview = JSON.stringify(parsed.result ?? parsed, null, 2);
  console.log('\n--- result 预览（前 2000 字符）---');
  console.log(preview.slice(0, 2000));
}

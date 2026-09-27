#!/usr/bin/env node
/**
 * 在页面上下文中执行 JavaScript 并返回结果。
 *
 * 用途：验证页面结构、检查扩展是否注入、读取真实 DOM。
 * 返回值为 JSON 序列化后的结果，因此只适合返回可序列化的数据。
 *
 * 支持等待条件成立后再取值，避免用固定时长盲等：
 *   --wait-for <表达式>   轮询直到该表达式返回真值
 *   --timeout <毫秒>      等待上限，默认 30000
 *   --poll <毫秒>         轮询间隔，默认 250
 *
 * 注意：本工具不具备写保护，它能执行任意页面脚本。
 * 写操作的约束由 docs/development.md 规定，调用方自行遵守。
 * 需要调接口时请使用 call.mjs，那里有方法名白名单。
 *
 * 用法：
 *   node scripts/probe/inspect/eval.mjs --expression "document.title"
 *   node scripts/probe/inspect/eval.mjs --file probe.js
 *   node scripts/probe/inspect/eval.mjs --wait-for "!!document.querySelector('.j-startBtn')"
 *   node scripts/probe/inspect/eval.mjs --wait-for "<条件>" --expression "<取值>"
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Session, listTargets } from '../lib/cdp.mjs';

function parseArgs(argv) {
  const out = { port: 9222, jsonOnly: false, timeoutMs: 30000, pollMs: 250 };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--expression') out.expression = argv[++i];
    else if (arg === '--file') out.file = argv[++i];
    else if (arg === '--wait-for') out.waitFor = argv[++i];
    else if (arg === '--port') out.port = Number(argv[++i]);
    else if (arg === '--timeout') out.timeoutMs = Number(argv[++i]);
    else if (arg === '--poll') out.pollMs = Number(argv[++i]);
    else if (arg === '--json') out.jsonOnly = true;
    else if (arg === '--url-contains') out.urlContains = argv[++i];
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));

if (!args.expression && !args.file && !args.waitFor) {
  console.error(
    '用法: node scripts/probe/inspect/eval.mjs (--expression <脚本> | --file <路径> | --wait-for <条件>)',
  );
  process.exit(2);
}

const script = args.file ? await readFile(path.resolve(args.file), 'utf8') : args.expression;

const targets = await listTargets({ port: args.port });
const pages = targets.filter((target) => target.type === 'page');

if (args.urlContains) {
  const filtered = pages.filter((target) => target.url.includes(args.urlContains));
  if (filtered.length === 0) {
    console.error(`没有标签页的地址包含 ${args.urlContains}。当前标签：`);
    for (const target of pages) console.error(`  ${target.url}`);
    process.exit(1);
  }
  pages.length = 0;
  pages.push(...filtered);
}

const page = pages.find((target) => target.url.startsWith('http')) ?? pages[0];
if (!page) {
  console.error('没有可用的页面标签');
  process.exit(1);
}

const session = await Session.open(page.webSocketDebuggerUrl);
await session.send('Runtime.enable');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 执行脚本并返回其值。
 *
 * 两种调用形式：
 *   asExpression 为 true 时输入被视为**表达式**，自动补 return，适合单行条件判断；
 *   否则输入被视为**脚本**，需要自己写 return。
 */
async function evaluate(source, asExpression = false) {
  const body = asExpression ? `return (${source});` : source;
  const { result, exceptionDetails } = await session.send('Runtime.evaluate', {
    expression: `(async () => { ${body} })()`,
    awaitPromise: true,
    returnByValue: true,
  });

  if (exceptionDetails) {
    const description = exceptionDetails.exception?.description ?? exceptionDetails.text;
    throw new Error(description);
  }
  return result?.value;
}

try {
  // 先等待条件成立，再取值。避免用固定时长盲等。
  if (args.waitFor) {
    const deadline = Date.now() + args.timeoutMs;
    for (;;) {
      if (await evaluate(args.waitFor, true)) break;
      if (Date.now() > deadline) {
        console.error(`等待条件超时（${args.timeoutMs}ms）：${args.waitFor}`);
        process.exit(1);
      }
      await sleep(args.pollMs);
    }
  }

  if (script) {
    const value = await evaluate(script);
    if (args.jsonOnly) console.log(JSON.stringify(value, null, 2));
    else {
      console.log(`页面：${page.url}`);
      console.log(JSON.stringify(value, null, 2));
    }
  } else if (!args.jsonOnly) {
    console.log(`条件已成立：${args.waitFor}`);
    console.log(`页面：${page.url}`);
  }
} catch (error) {
  console.error(`页面内执行失败：${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
} finally {
  session.close();
}

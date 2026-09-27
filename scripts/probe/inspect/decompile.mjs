#!/usr/bin/env node
/**
 * 把线上 bundle 还原成可读源码。
 *
 * 背景：站点的 sourcemap 是空占位（sources 为空、mappings 为空），
 * 无法直接还原原始工程。但压缩代码只压缩了空白与局部变量名，
 * 模块内的函数名与字符串都保留原样，格式化之后可读性足够支撑后续开发。
 *
 * 产出的目录结构：
 *   <out>/<bundle 名>/index.js          格式化后的完整文件
 *   <out>/<bundle 名>/modules/<hash>.js 按 EDU 模块拆出的单独文件
 *   <out>/<bundle 名>/modules.json      模块索引：hash 到文件、依赖、特征符号
 *   <out>/INDEX.md                      总览，列出每个 bundle 与其中的模块
 *
 * 用法：
 *   node scripts/probe/inspect/decompile.mjs --capture .probe/raw/quiz --out .reverse
 *   node scripts/probe/inspect/decompile.mjs --url <bundle.js> --out .reverse
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import prettier from 'prettier';

function parseArgs(argv) {
  const out = { outDir: '.reverse' };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--capture') out.capture = argv[++i];
    else if (arg === '--url') out.url = argv[++i];
    else if (arg === '--out') out.outDir = argv[++i];
    else if (arg === '--include') out.include = new RegExp(argv[++i]);
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));

/** 第三方库不必逆向，逆向它们没有意义。 */
const SKIP_PATTERN = /polyv|NIMWEB|VIDEOPLAYER|jquery|echarts|hls\.js/i;

async function collectUrls() {
  if (args.url) return [args.url];
  if (!args.capture) {
    console.error('需要 --capture <采集目录> 或 --url <bundle 地址>');
    process.exit(2);
  }

  const lines = (await readFile(path.join(args.capture, 'network.jsonl'), 'utf8'))
    .split('\n')
    .filter(Boolean);

  const urls = new Set();
  for (const line of lines) {
    let record;
    try {
      record = JSON.parse(line);
    } catch {
      continue;
    }
    if (!/\.js(\?|$)/.test(record.url)) continue;
    urls.add(record.url);
  }
  return [...urls];
}

/**
 * 按 NEJ 的模块声明切分文件。
 *
 * 形态为 EDU("<hash>", function(...){ ... }, "<依赖 hash>", ...)。
 * 这里只做括号配对，不解析语义：从 EDU( 起找到配对的右括号即为模块结尾。
 */
function splitModules(source) {
  const modules = [];
  const marker = 'EDU(';

  let searchFrom = 0;
  while (true) {
    const start = source.indexOf(marker, searchFrom);
    if (start < 0) break;

    const hashMatch = /^EDU\(\s*"([0-9a-f]{8,})"/.exec(source.slice(start, start + 64));
    if (!hashMatch) {
      searchFrom = start + marker.length;
      continue;
    }

    // 从 EDU( 之后开始配对括号
    let depth = 1;
    let index = start + marker.length;
    let inString = null;
    let inRegex = false;
    let escaped = false;

    while (index < source.length && depth > 0) {
      const ch = source[index];

      if (escaped) {
        escaped = false;
      } else if (ch === '\\') {
        escaped = true;
      } else if (inString) {
        if (ch === inString) inString = null;
      } else if (inRegex) {
        if (ch === '[') {
          // 字符组内的 ] 不结束正则，简化处理为跳到组尾
          const close = source.indexOf(']', index);
          index = close < 0 ? index : close;
        } else if (ch === '/') {
          inRegex = false;
        }
      } else if (ch === '"' || ch === "'" || ch === '`') {
        inString = ch;
      } else if (ch === '/') {
        const next = source[index + 1];
        const prev = source[index - 1];
        if (next === '/' || next === '*') {
          // 注释，跳到结尾
          if (next === '/') {
            const nl = source.indexOf('\n', index);
            index = nl < 0 ? source.length : nl;
          } else {
            const end = source.indexOf('*/', index + 2);
            index = end < 0 ? source.length : end + 1;
          }
        } else if (/[=(,:[!&|?{};+\-*%<>~^]/.test(prev ?? '')) {
          inRegex = true;
        }
      } else if (ch === '(') {
        depth++;
      } else if (ch === ')') {
        depth--;
      }
      index++;
    }

    modules.push({
      hash: hashMatch[1],
      code: source.slice(start, index),
      start,
    });
    searchFrom = index;
  }

  return modules;
}

/** 取模块里出现的可识别符号，便于在索引里判断这个模块是做什么的。 */
function extractSymbols(code) {
  const symbols = new Set();

  for (const match of code.matchAll(/_?\$\$([A-Za-z_][A-Za-z0-9_]*)/g)) {
    symbols.add(match[1]);
  }
  for (const match of code.matchAll(/\/web\/j\/([A-Za-z]+\.[A-Za-z]+)\.rpc/g)) {
    symbols.add(match[1]);
  }
  for (const match of code.matchAll(/class="([^"]{2,40})"/g)) {
    symbols.add(match[1]);
  }

  return [...symbols].slice(0, 40);
}

const urls = (await collectUrls()).filter((url) => {
  if (SKIP_PATTERN.test(url)) return false;
  if (args.include && !args.include.test(url)) return false;
  return true;
});

if (urls.length === 0) {
  console.error('没有找到可逆向的脚本');
  process.exit(1);
}

await mkdir(args.outDir, { recursive: true });

const overview = [];

for (const url of urls) {
  const name = (url.split('?')[0].split('/').pop() ?? 'bundle.js').replace(/\.js$/, '');
  const shortName = name.replace(/_[0-9a-f]{16,}$/i, '') || name;

  process.stdout.write(`${shortName} … `);

  let source;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`跳过（HTTP ${response.status}）`);
      continue;
    }
    source = await response.text();
  } catch (error) {
    console.log(`跳过（${error.message}）`);
    continue;
  }

  const modules = splitModules(source);

  const formatted = await prettier.format(source, {
    parser: 'babel',
    printWidth: 100,
    semi: true,
    singleQuote: true,
    arrowParens: 'always',
  });

  const bundleDir = path.join(args.outDir, shortName);
  await mkdir(path.join(bundleDir, 'modules'), { recursive: true });
  await writeFile(path.join(bundleDir, 'index.js'), formatted, 'utf8');
  await writeFile(path.join(bundleDir, 'source-url.txt'), `${url}\n`, 'utf8');

  const index = [];
  for (const module of modules) {
    const moduleFile = path.join(bundleDir, 'modules', `${module.hash}.js`);
    let moduleCode = module.code;
    try {
      moduleCode = await prettier.format(module.code, {
        parser: 'babel',
        printWidth: 100,
        semi: true,
        singleQuote: true,
        arrowParens: 'always',
      });
    } catch {
      // 片段可能无法独立解析，保留原始形态
    }
    await writeFile(moduleFile, moduleCode, 'utf8');
    index.push({
      hash: module.hash,
      offset: module.start,
      length: module.code.length,
      file: `modules/${module.hash}.js`,
      symbols: extractSymbols(module.code),
    });
  }

  await writeFile(
    path.join(bundleDir, 'modules.json'),
    `${JSON.stringify(index, null, 2)}\n`,
    'utf8',
  );

  overview.push({ name: shortName, url, bytes: source.length, modules: index.length });
  console.log(`${(source.length / 1024).toFixed(0)} KB，${index.length} 个模块`);
}

const lines = [
  '# 逆向产物索引',
  '',
  '本目录由 `scripts/probe/inspect/decompile.mjs` 生成，内容是站点 bundle 的格式化结果与模块切分。',
  '它不入库，重新生成即可。',
  '',
  '| bundle | 大小 | 模块数 | 来源 |',
  '|---|---|---|---|',
  ...overview.map(
    (item) => `| ${item.name} | ${(item.bytes / 1024).toFixed(0)} KB | ${item.modules} | ${item.url} |`,
  ),
  '',
  '每个 bundle 目录下有：',
  '',
  '- `index.js`：格式化后的完整文件，全局搜索从这里开始。',
  '- `modules/<hash>.js`：按 NEJ 模块声明切出的单独文件。',
  '- `modules.json`：模块索引，含偏移、长度与模块内出现的关键符号。',
  '',
  '查找某个接口由哪个模块实现：',
  '',
  '```bash',
  'rg -l "mocQuizRpcBean.saveDraftAnswers" .reverse/*/modules/',
  'rg "\\"hash\\": \\"<模块 hash>\\"" .reverse/*/modules.json',
  '```',
  '',
];

await writeFile(path.join(args.outDir, 'INDEX.md'), lines.join('\n'), 'utf8');

console.log(`\n完成，产物位于 ${args.outDir}`);

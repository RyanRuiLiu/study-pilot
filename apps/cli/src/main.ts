/*
 * 命令行载体。
 *
 * 它的作用是证明「扩展只是一个载体」：核心用例与厂商装配都从包里取，
 * 扩展侧一行代码都不用——`@study-pilot/application` 给端口与用例，
 * `@study-pilot/platform-mooc` 给慕课的运行件（createMoocRuntime）。
 * 本目录只提供载体自己的四件事里的两件（配置文件、cookie 文件），
 * 另两件（状态存储、进度输出）等有写操作时再加——现在加就是没人用的假实现。
 *
 * 命令（都只读，不改平台上的任何数据）：
 *   courses [--select <termId>]   去平台读课程列表；--select 顺手把它勾上并写进配置
 *   pending                       读一遍并算出「要做什么」（可自动 / 需人工）
 *
 * 用法：
 *   node apps/cli/src/main.ts courses --cookies .probe/mooc-session.json --config .probe/cli-config.json
 *   node apps/cli/src/main.ts pending --cookies .probe/mooc-session.json --config .probe/cli-config.json
 */

import { createFileConfigStore } from './config-store.ts';
import { createHeaderFetch } from './fetch.ts';
import { createCookieFileHost, readSessionFile } from './host.ts';
import { createMoocRuntime } from '@study-pilot/platform-mooc';

const USAGE = `study-pilot（命令行载体，只读）

  courses [--select <termId>]   去平台读课程列表；--select 把它勾上并写进配置
  pending                       读一遍并算出要做什么（可自动 / 需人工）

可选参数：
  --cookies <file>   浏览器导出的会话文件（默认 .probe/mooc-session.json）
  --config  <file>   配置文件（默认 .probe/cli-config.json）
`;

interface Args {
  command: string;
  cookies: string;
  config: string;
  select: number | undefined;
}

function parseArgs(argv: string[]): Args {
  const args: Args = {
    command: argv[0] ?? '',
    cookies: '.probe/mooc-session.json',
    config: '.probe/cli-config.json',
    select: undefined,
  };
  for (let i = 1; i < argv.length; i += 1) {
    const flag = argv[i];
    const value = argv[i + 1];
    if (flag === '--cookies' && value !== undefined) {
      args.cookies = value;
      i += 1;
    } else if (flag === '--config' && value !== undefined) {
      args.config = value;
      i += 1;
    } else if (flag === '--select' && value !== undefined) {
      args.select = Number(value);
      i += 1;
    } else {
      throw new Error(`看不懂的参数：${flag ?? ''}`);
    }
  }
  return args;
}

async function main(): Promise<number> {
  let args: Args;
  try {
    args = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    console.error(USAGE);
    return 64;
  }
  if (args.command === '' || args.command === 'help' || args.command === '--help') {
    console.log(USAGE);
    return args.command === '' ? 64 : 0;
  }

  const config = createFileConfigStore(args.config);
  const session = readSessionFile(args.cookies);
  const runtime = createMoocRuntime({
    host: createCookieFileHost(session),
    config,
    fetch: createHeaderFetch(session),
    recordFailure: async (message) => {
      console.error(`[失败] ${message}`);
    },
    // 不注入文本生成器：讨论单元于是进人工（计划层按 hasTextGenerator 判断），执行层不假装成功
  });

  switch (args.command) {
    case 'courses': {
      const result = await runtime.refreshCourses();
      if (!result.ok) {
        console.error(`读取课程列表失败：${result.message}`);
        return 1;
      }
      if (result.courses.length === 0) {
        console.log('平台没有返回任何课程');
        return 0;
      }
      for (const course of result.courses) {
        const marker = course.termId === args.select ? ' ← 已勾选' : '';
        console.log(`${course.termId}\t${course.name}${marker}`);
      }
      if (args.select !== undefined) {
        /*
         * 勾选状态只改这一项：列表形状来自配置本身（刷新时已写回），因此这里不重造字段，
         * 只翻转 enabled——字段少一个都不会有编译错误，所以不手写结构体。
         */
        const current = await config.read();
        const courses = current.mooc.background.courses.map((course) => ({
          ...course,
          enabled: course.termId === args.select,
        }));
        if (!courses.some((course) => course.enabled)) {
          console.error(`平台返回的课程里没有 termId=${args.select as number}`);
          return 1;
        }
        await config.update({ mooc: { background: { courses } } });
        console.log(`\n已把 termId=${args.select as number} 写进 ${args.config}`);
      }
      return 0;
    }

    case 'pending': {
      const plan = await runtime.tasks().plan(Date.now());
      if (plan.needsLogin === true) {
        console.error('未登录：会话 cookie 已失效，请重新导出（scripts/probe/lib/cookies.mjs）');
        return 2;
      }
      if (plan.blocked === 'no-course') {
        console.error(`没有勾选课程：先跑 courses --select <termId>（配置：${args.config}）`);
        return 3;
      }
      const auto = plan.items.filter((item) => item.mode === 'auto');
      const manual = plan.items.filter((item) => item.mode !== 'auto');
      console.log(`可自动 ${auto.length} 项，需人工 ${manual.length} 项`);
      for (const item of auto) console.log(`  [自动] ${item.group} · ${item.title}`);
      for (const item of manual) console.log(`  [人工] ${item.group} · ${item.title}`);
      if (auto.length === 0 && manual.length === 0) {
        /*
         * 两项都是 0 只说明「读回来的数据里没有未完成的项」——四个自动开关关着时，
         * 待做但被关掉自动处理的项会进「需人工」，不会被丢掉，所以这里不会漏报。
         */
        console.log('（读回来的数据里没有未完成的项；四个自动开关是否打开，不影响这条结论）');
      }
      return 0;
    }

    default:
      console.error(`未知命令：${args.command}`);
      console.error(USAGE);
      return 64;
  }
}

/*
 * 载体的职责之一：把异常翻译成一句人话与一个退出码，而不是把栈甩给用户。
 * 会话文件缺 cookie、课程 id 不存在这类事都是用户能自己修的，因此不打印堆栈。
 */
process.exitCode = await main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  return 1;
});

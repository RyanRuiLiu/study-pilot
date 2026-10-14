/*
 * 命令行载体。
 *
 * 它的作用是证明「扩展只是一个载体」：核心用例与厂商装配都从包里取，
 * 扩展侧一行代码都不用——`@study-pilot/application` 给端口与用例，
 * `@study-pilot/platform-mooc` 给慕课的运行件（createMoocRuntime）。
 * 本目录只提供载体自己的四件事：配置文件、cookie 文件、状态文件、进度输出。
 *
 * 命令：
 *   courses [--select <termId>]   去平台读课程列表；--select 把它勾上并写进配置（只读平台）
 *   pending                       读一遍并算出「要做什么」（可自动 / 需人工），只读
 *   run [--yes] [--kind ...] [--course ...]   预演这一轮会做什么；**加 --yes 才真的执行**（会写平台）
 *
 * 为什么 run 默认是预演：写平台会改账号上的学习记录，且不可撤销。所以默认只把「要做什么」
 * 摆出来，真正动手必须显式给 --yes——这就是本载体的授权规则（扩展那边等价的是用户点按钮）。
 *
 * 用法：
 *   node apps/cli/src/main.ts pending --cookies .probe/mooc-session.json --config .probe/cli-config.json
 *   node apps/cli/src/main.ts run --yes --cookies .probe/mooc-session.json --config .probe/cli-config.json
 */

import { createRunner, type RoundResult } from '@study-pilot/application';
import { createMoocRuntime } from '@study-pilot/platform-mooc';
import { createFileConfigStore } from './config-store.ts';
import { createHeaderFetch } from './fetch.ts';
import { createCookieFileHost, readSessionFile } from './host.ts';
import { createStdoutProgress } from './progress.ts';
import { createFileTaskStore } from './task-store.ts';

const USAGE = `study-pilot（命令行载体）

  courses [--select <termId>]   去平台读课程列表；--select 把它勾上并写进配置（只读平台）
  pending                       读一遍并算出要做什么（能做 / 需人工），只读
  run [--yes]                   预演这一轮；加 --yes 才真的执行（会写平台）

可选参数：
  --cookies <file>   浏览器导出的会话文件（默认 .probe/mooc-session.json）
  --config  <file>   配置文件（默认 .probe/cli-config.json）
  --state   <file>   运行状态文件（默认 .probe/cli-state.json）
  --kind    <类,...> run 的范围：只做这些类别（courseware / quiz / review / self / homework / exam）
  --course  <课程名> run 的范围：只做这一门课
  --yes              run 的授权旗标：没有它只预演，不写平台
`;

interface Args {
  command: string;
  cookies: string;
  config: string;
  state: string;
  select: number | undefined;
  kinds: string[] | undefined;
  course: string | undefined;
  yes: boolean;
}

function parseArgs(argv: string[]): Args {
  const args: Args = {
    command: argv[0] ?? '',
    cookies: '.probe/mooc-session.json',
    config: '.probe/cli-config.json',
    state: '.probe/cli-state.json',
    select: undefined,
    kinds: undefined,
    course: undefined,
    yes: false,
  };
  for (let i = 1; i < argv.length; i += 1) {
    const flag = argv[i];
    const value = argv[i + 1];
    if (flag === '--yes') {
      args.yes = true;
    } else if (flag === '--kind' && value !== undefined) {
      args.kinds = value.split(',').filter((kind) => kind !== '');
      i += 1;
    } else if (flag === '--course' && value !== undefined) {
      args.course = value;
      i += 1;
    } else if (flag === '--cookies' && value !== undefined) {
      args.cookies = value;
      i += 1;
    } else if (flag === '--config' && value !== undefined) {
      args.config = value;
      i += 1;
    } else if (flag === '--state' && value !== undefined) {
      args.state = value;
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

/** 一轮的结局 → 输出与退出码。命令行的「一句话」在这里，判断不在这里（用例说了算）。 */
function reportRound(result: RoundResult, configPath: string): number {
  switch (result.status) {
    case 'rejected':
      console.error('正在执行：状态文件说上一轮还没结束（等一会儿，或删掉状态文件重试）');
      return 4;
    case 'not-logged-in':
      console.error('未登录：会话 cookie 已失效，请重新导出（scripts/probe/lib/cookies.mjs）');
      return 2;
    case 'no-course':
      console.error(`没有勾选课程：先跑 courses --select <termId>（配置：${configPath}）`);
      return 3;
    case 'nothing-to-do':
      console.log('没有可执行的事项');
      return 0;
    case 'finished': {
      console.log(`完成 ${result.done} 项，需你处理 ${result.manual} 项`);
      for (const failure of result.failed) console.error(`  ✗ ${failure.name}：${failure.detail}`);
      return result.failed.length > 0 ? 1 : 0;
    }
    case 'failed':
      console.error(`这一轮失败：${result.message}`);
      return 1;
  }
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
        const courses = current.mooc.courses.map((course) => ({
          ...course,
          enabled: course.termId === args.select,
        }));
        if (!courses.some((course) => course.enabled)) {
          console.error(`平台返回的课程里没有 termId=${args.select as number}`);
          return 1;
        }
        await config.update({ mooc: { courses } });
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
      console.log(`能做 ${auto.length} 项，需人工 ${manual.length} 项`);
      for (const item of auto) console.log(`  [能做] ${item.group} · ${item.title}`);
      for (const item of manual) console.log(`  [需人工] ${item.group} · ${item.title}`);
      if (auto.length === 0 && manual.length === 0) {
        console.log('（读回来的数据里没有未完成的项）');
      }
      return 0;
    }

    case 'run': {
      // 范围（--kind / --course）。给了就在预演与执行两侧同样生效——预演要如实
      // 反映加 --yes 后会做什么，否则那个「摆出来给你看」的意义就没了
      const selection =
        args.kinds !== undefined || args.course !== undefined
          ? { kinds: args.kinds, group: args.course }
          : undefined;

      if (!args.yes) {
        /* 预演：读一遍，把「要做什么」摆出来，一个字都不写平台 */
        const plan = await runtime.tasks().plan(Date.now());
        if (plan.needsLogin === true) {
          console.error('未登录：会话 cookie 已失效，请重新导出（scripts/probe/lib/cookies.mjs）');
          return 2;
        }
        if (plan.blocked === 'no-course') {
          console.error(`没有勾选课程：先跑 courses --select <termId>（配置：${args.config}）`);
          return 3;
        }
        const inScope = (item: { kind: string; group: string }): boolean =>
          (args.kinds === undefined || args.kinds.includes(item.kind)) &&
          (args.course === undefined || item.group === args.course);
        const auto = plan.items.filter((item) => item.mode === 'auto' && inScope(item));
        const manual = plan.items.filter((item) => item.mode !== 'auto' && inScope(item));
        console.log(`预演（没有写平台）：这一轮会做 ${auto.length} 项，另有 ${manual.length} 项需你处理`);
        for (const item of auto) console.log(`  [将做] ${item.group} · ${item.title}`);
        for (const item of manual) console.log(`  [需人工] ${item.group} · ${item.title}`);
        console.log(
          auto.length === 0
            ? '没有要做的事，因此加不加 --yes 都不会写平台。'
            : '确认无误后加 --yes 真的执行（会改账号上的学习记录，不可撤销）。',
        );
        return 0;
      }

      /*
       * 真的执行：状态落文件、进度打到标准输出。
       * 用例自己判「能不能开始」（状态文件里的中断标记 / 本进程认领），这里不重复判。
       */
      const runner = createRunner({
        platforms: () => [runtime.tasks()],
        tasks: createFileTaskStore(args.state),
        progress: createStdoutProgress(),
      });
      return reportRound(await runner.runRound(selection), args.config);
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

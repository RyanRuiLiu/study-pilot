/*
 * 命令行载体。
 *
 * 它的作用是证明「扩展只是一个载体」：核心用例与两个平台的装配都从包里取，
 * 扩展侧一行代码都不用——`@study-pilot/application` 给端口与用例，
 * `@study-pilot/platform-mooc` / `@study-pilot/platform-zhs` 各给自家的运行件。
 * 本目录只提供载体自己的四件事：配置文件、cookie 文件、状态文件、进度输出。
 *
 * 两个平台的待遇与扩展侧一致（对照 extension 的 background.ts 装配）：
 * 同一份会话文件里各取各的 cookie（host.ts）、各出各的请求头（fetch.ts），
 * `run` 的 platforms() 两家都给——命令默认两家都读，`--platform` 收窄。
 *
 * 命令：
 *   courses [--platform <id>] [--select <id>]   去平台读课程列表；--select 勾上那门课（写进配置）
 *   pending [--platform <id>]                   读一遍并算出「要做什么」（可自动 / 需人工），只读
 *   run [--platform <id>] [--yes]               预演这一轮会做什么；**加 --yes 才真的执行**（会写平台）
 *
 * 为什么 run 默认是预演：写平台会改账号上的学习记录，且不可撤销。所以默认只把「要做什么」
 * 摆出来，真正动手必须显式给 --yes——这就是本载体的授权规则（扩展那边等价的是用户点按钮）。
 *
 * 用法：
 *   node apps/cli/src/main.ts pending --cookies .probe/browser-session.json --config .probe/cli-config.json
 *   node apps/cli/src/main.ts run --yes --platform zhihuishu --cookies .probe/browser-session.json --config .probe/cli-config.json
 */

import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRunner, type PlatformTasks, type RoundResult } from '@study-pilot/application';
import {
  BROWSER_USER_AGENT as MOOC_USER_AGENT,
  createMoocRuntime,
  SessionExpiredError,
} from '@study-pilot/platform-mooc';
import {
  BROWSER_USER_AGENT as ZHS_USER_AGENT,
  createZhsRuntime,
} from '@study-pilot/platform-zhs';
import { createFileConfigStore } from './config-store.ts';
import { createHeaderFetch } from './fetch.ts';
import { createCookieFileHost, readSessions, type Sessions } from './host.ts';
import { createStdoutProgress } from './progress.ts';
import { createFileTaskStore } from './task-store.ts';

/*
 * 默认的会话/配置/状态路径按**仓库根**解析，不按当前目录。
 *
 * 按 cwd 解析时，从 apps/cli 里跑就变成找 apps/cli/.probe/——用户看到的是一句
 * 甩着绝对路径的 ENOENT，而他要的其实是仓库根那份。向上找到 pnpm-workspace.yaml
 * 所在的目录为止：源码跑（apps/cli/src）与打包产物跑（apps/cli/dist）都能落到同一个根。
 */
const REPO_ROOT = findRepoRoot();

function findRepoRoot(): string {
  for (const start of [dirname(fileURLToPath(import.meta.url)), process.cwd()]) {
    let dir = start;
    for (let depth = 0; depth < 8; depth += 1) {
      if (existsSync(join(dir, 'pnpm-workspace.yaml'))) return dir;
      const parent = dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  }
  return process.cwd();
}

const USAGE = `study-pilot（命令行载体）

  courses [--platform <id>] [--select <id>]   去平台读课程列表；--select 勾上那门课（写进配置）
  pending [--platform <id>]                   读一遍并算出要做什么（能做 / 需人工），只读
  run [--platform <id>] [--yes]               预演这一轮；加 --yes 才真的执行（会写平台）

可选参数：
  --cookies <file>   浏览器导出的会话文件（默认 .probe/browser-session.json）
  --config  <file>   配置文件（默认 .probe/cli-config.json）
  --state   <file>   运行状态文件（默认 .probe/cli-state.json）
  --platform <id>    只做这个平台：mooc / zhihuishu（默认两家都读）
  --kind    <类,...> run 的范围：只做这些类别（取值由平台定义：mooc 是
                     courseware / quiz / review / self / homework / exam，zhihuishu 是 courseware）
  --course  <课程名> run 的范围：只做这一门课
  --yes              run 的授权旗标：没有它只预演，不写平台
`;

interface Args {
  command: string;
  cookies: string;
  config: string;
  state: string;
  platform: string | undefined;
  select: number | undefined;
  kinds: string[] | undefined;
  course: string | undefined;
  yes: boolean;
}

function parseArgs(argv: string[]): Args {
  const args: Args = {
    command: argv[0] ?? '',
    cookies: join(REPO_ROOT, '.probe/browser-session.json'),
    config: join(REPO_ROOT, '.probe/cli-config.json'),
    state: join(REPO_ROOT, '.probe/cli-state.json'),
    platform: undefined,
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
    } else if (flag === '--platform' && value !== undefined) {
      args.platform = value;
      i += 1;
    } else if (flag === '--select' && value !== undefined) {
      const selected = Number(value);
      if (!Number.isInteger(selected)) throw new Error(`--select 要的是课程 id（整数），收到的是：${value}`);
      args.select = selected;
      i += 1;
    } else {
      throw new Error(`看不懂的参数：${flag ?? ''}`);
    }
  }
  return args;
}

/** 一家平台在本载体里露出的最小面：跑一轮的能力 + 会话文件里有没有它的 cookie。 */
interface CarrierPlatform {
  id: string;
  name: string;
  tasks: () => PlatformTasks;
  /** 会话文件里有没有这门平台的 cookie（没有就没登录，courses 直接说明白） */
  hasCookies: boolean;
}

/** 按 --platform 收窄；给了不认识的值回 null（调用方给一句人话）。 */
function pickPlatforms(platforms: CarrierPlatform[], id: string | undefined): CarrierPlatform[] | null {
  if (id === undefined) return platforms;
  const hit = platforms.filter((platform) => platform.id === id);
  return hit.length > 0 ? hit : null;
}

/** 一轮的结局 → 输出与退出码。命令行的「一句话」在这里，判断不在这里（用例说了算）。 */
function reportRound(result: RoundResult, configPath: string): number {
  switch (result.status) {
    case 'rejected':
      console.error('正在执行：状态文件说上一轮还没结束（等一会儿，或删掉状态文件重试）');
      return 4;
    case 'not-logged-in':
      console.error('未登录：会话 cookie 已失效，请重新导出（pnpm probe state export）');
      return 2;
    case 'no-course':
      console.error(`没有勾选课程：先跑 courses --select <id>（配置：${configPath}）`);
      return 3;
    case 'nothing-to-do':
      console.log('没有可执行的事项');
      return 0;
    case 'finished': {
      console.log(`完成 ${result.done} 项，需手动处理 ${result.manual} 项`);
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
  /*
   * 会话文件读不到是最常见的第一步失败。甩一句带着绝对路径的 ENOENT 帮不上人——
   * 要说清这个文件是哪来的、怎么生成。退出码用 2（与「未登录」同一个），
   * 脚本里据此就能区分「没登录态」与「跑挂了」。
   */
  let sessions: Sessions;
  try {
    sessions = readSessions(args.cookies);
  } catch {
    console.error(
      `读不到会话文件：${args.cookies}\n  先在浏览器里登录平台，再导出登录态：pnpm probe state export`,
    );
    return 2;
  }
  const mooc = createMoocRuntime({
    host: createCookieFileHost(sessions.mooc),
    config,
    // 慕课必须把 Origin/Referer 指向平台域名（实测事实，见 fetch.ts 文件头）
    fetch: createHeaderFetch(sessions.mooc, { userAgent: MOOC_USER_AGENT, rewriteOrigin: true }),
    recordFailure: async (message) => {
      console.error(`[失败] ${message}`);
    },
    // 不注入文本生成器：讨论单元于是进人工（计划层按 hasTextGenerator 判断），执行层不假装成功
  });
  const zhihuishu = createZhsRuntime({
    config,
    // 智慧树不改写 Origin（实测直连即 200，见 platform-zhs 的 net-rules.ts）
    fetch: createHeaderFetch(sessions.zhihuishu, { userAgent: ZHS_USER_AGENT, rewriteOrigin: false }),
    readCookie: createCookieFileHost(sessions.zhihuishu).readCookie,
  });

  const platforms: CarrierPlatform[] = [
    {
      id: 'mooc',
      name: '中国大学 MOOC',
      tasks: mooc.tasks,
      hasCookies: Object.keys(sessions.mooc.cookies).length > 0,
    },
    {
      id: 'zhihuishu',
      name: '智慧树',
      tasks: zhihuishu.tasks,
      hasCookies: Object.keys(sessions.zhihuishu.cookies).length > 0,
    },
  ];

  const targets = pickPlatforms(platforms, args.platform);
  if (targets === null) {
    console.error(`--platform 只认：${platforms.map((platform) => platform.id).join(' / ')}`);
    return 64;
  }

  switch (args.command) {
    case 'courses': {
      const multi = targets.length > 1;
      /** 刷新成功过的平台 → `--select` 的定位用（不给 --select 就是空跑一遍） */
      const refreshed = new Map<string, number[]>();
      /** 读不到的家数。一家读不到不把另一家一起带走，但退出码要如实反映 */
      let unreadable = 0;

      for (const target of targets) {
        if (multi) console.log(`${target.name}：`);
        if (!target.hasCookies) {
          console.log('  未登录（会话文件里没有该平台的 cookie，先跑 pnpm probe state export）');
          unreadable += 1;
          continue;
        }
        /*
         * 每家都试完，最后再定退出码。
         *
         * 慕课的会话失效是**抛**出来的（refreshCourses 抛 SessionExpiredError，编排层据此
         * 决定续期重读）。这一层不接住，异常就会越过整个循环：第二家连一次都不试，而端给
         * 用户的是那句内部文案——session.ts 的注释明令它不该出现在人前。
         *
         * 这里不接续期：本载体拿的是会话文件的**快照**，没有活的 cookie jar，换发出来的新
         * cookie 无处落地（`mooc.renew` 在这个载体上结构性不可用）。所以救不回来是本机的
         * 事实，唯一的出路就是重新导出一次登录态。
         */
        try {
          if (target.id === 'mooc') {
            const result = await mooc.refreshCourses();
            if (!result.ok) {
              console.log(`  ${result.message}`);
              unreadable += 1;
              continue;
            }
            // 勾选状态在配置里（刷新只写平台事实、沿用勾选），标记以配置为准
            const settings = await config.read();
            const enabled = new Set(settings.mooc.courses.filter((c) => c.enabled).map((c) => c.termId));
            refreshed.set('mooc', result.courses.map((course) => course.termId));
            for (const course of result.courses) {
              console.log(`  ${course.termId}\t${course.name}${enabled.has(course.termId) ? ' ← 已勾选' : ''}`);
            }
          } else {
            const result = await zhihuishu.refreshCourses();
            if (!result.ok) {
              console.log(`  ${result.message}`);
              unreadable += 1;
              continue;
            }
            // 智慧树的刷新直接返回合并后的课程（含 enabled），标记取它即可
            refreshed.set('zhihuishu', result.courses.map((course) => course.courseId));
            for (const course of result.courses) {
              console.log(`  ${course.courseId}\t${course.name}${course.enabled ? ' ← 已勾选' : ''}`);
            }
          }
        } catch (error) {
          console.log(
            error instanceof SessionExpiredError
              ? '  平台会话已失效（服务端已不认这份登录态），重新导出一次：pnpm probe state export'
              : `  读取失败：${error instanceof Error ? error.message : String(error)}`,
          );
          unreadable += 1;
        }
      }

      if (args.select === undefined) return unreadable > 0 ? 1 : 0;

      const select = args.select;
      const hits = [...refreshed.entries()].filter(([, ids]) => ids.includes(select));
      if (hits.length === 0) {
        console.error(`\n这次读回来的课程里没有 id=${select}（先不加 --select 看一遍列表）`);
        return 1;
      }
      if (hits.length > 1) {
        console.error(`\nid=${select} 在两家平台的列表里都有——请加 --platform 指明是哪家`);
        return 1;
      }

      /*
       * 勾选的落点各平台各说各的：
       *   慕课   —— 单选模型（课程卡片上一次只有一门参与），勾上这门即取消其余；
       *   智慧树 —— 多选模型（每门课一个开关），--select 是**切换**（再跑一次即反向），
       *             这是命令行里唯一能同时表达「勾上」与「取消」的动作。
       * 写回都只动自己那一段配置，不整份回写。
       */
      const current = await config.read();
      if (hits[0][0] === 'mooc') {
        const courses = current.mooc.courses.map((course) => ({
          ...course,
          enabled: course.termId === select,
        }));
        if (!courses.some((course) => course.enabled)) {
          console.error(`\n配置里没有 termId=${select}`);
          return 1;
        }
        await config.update({ mooc: { courses } });
        console.log(`\n已把 termId=${select} 写进 ${args.config}`);
      } else {
        const course = current.zhihuishu.courses.find((entry) => entry.courseId === select);
        if (course === undefined) {
          console.error(`\n配置里没有 courseId=${select}`);
          return 1;
        }
        const courses = current.zhihuishu.courses.map((entry) =>
          entry.courseId === select ? { ...entry, enabled: !entry.enabled } : entry,
        );
        await config.update({ zhihuishu: { courses } });
        console.log(`\n已${course.enabled ? '取消勾选' : '勾选'} courseId=${select}（再跑一次 --select 可反向切换）`);
      }
      return 0;
    }

    case 'pending': {
      const lines: string[] = [];
      let auto = 0;
      let manual = 0;
      let planned = 0;
      let errored = 0;
      let allNeedsLogin = true;
      let allNoCourse = true;

      for (const target of targets) {
        /*
         * 一家读失败不拦另一家：plan() 是会抛的（智慧树的 HTTP 401 就以异常回来），
         * 不接住就会冲出整个循环——排在后面的那家连一次都不试，下面的聚合判据也没机会算。
         */
        try {
          const plan = await target.tasks().plan(Date.now());
          if (plan.needsLogin === true) {
            console.error(`未登录：${target.name}（会话 cookie 已失效，重新导出：pnpm probe state export）`);
            continue;
          }
          allNeedsLogin = false;
          if (plan.blocked === 'no-course') {
            console.error(`没有勾选课程：${target.name}（先跑 courses --select <id>）`);
            continue;
          }
          allNoCourse = false;
          planned += 1;
          for (const item of plan.items) {
            if (item.mode === 'auto') auto += 1;
            else manual += 1;
            // 平台名放前缀：两家的项混在一张表里，同名课程也分得清谁家的
            lines.push(`  [${item.mode === 'auto' ? '能做' : '需人工'}] ${target.name} · ${item.group} · ${item.title}`);
          }
        } catch (error) {
          console.error(
            `读取失败：${target.name}（${error instanceof Error ? error.message : String(error)}）`,
          );
          errored += 1;
          // 抛错说明不了「没登录」也说明不了「没勾课」，两家都别按 blanket 结论报
          allNeedsLogin = false;
          allNoCourse = false;
        }
      }

      // 所有点名的平台都卡在同一件事上才用退出码表达（部分可用按 0 走，缺的那家已在 stderr 说明）
      if (allNeedsLogin) return 2;
      if (allNoCourse) return 3;
      // 有一家在读取上真失败了：只读命令也没交出完整答案，按失败报（与 courses 同一口径）
      if (errored > 0) return 1;

      console.log(`能做 ${auto} 项，需人工 ${manual} 项`);
      for (const line of lines) console.log(line);
      if (lines.length === 0 && planned > 0) console.log('（读回来的数据里没有未完成的项）');
      return 0;
    }

    case 'run': {
      /*
       * 范围（--platform / --kind / --course）。给了就在预演与执行两侧同样生效——
       * 预演要如实反映加 --yes 后会做什么，否则那个「摆出来给你看」的意义就没了。
       */
      const selection =
        args.platform !== undefined || args.kinds !== undefined || args.course !== undefined
          ? {
              ...(args.platform !== undefined ? { platformId: args.platform } : {}),
              ...(args.kinds !== undefined ? { kinds: args.kinds } : {}),
              ...(args.course !== undefined ? { group: args.course } : {}),
            }
          : undefined;

      if (!args.yes) {
        /* 预演：读一遍，把「要做什么」摆出来，一个字都不写平台 */
        let auto = 0;
        let manual = 0;
        let errored = 0;
        let allNeedsLogin = true;
        let allNoCourse = true;
        /** 这一轮平台真给出的类别。--kind 拼错时用它回话（取值由各平台定义，这里不另立词表） */
        const seenKinds = new Set<string>();
        /** 这一轮平台真给出的课程名，给 --course 拼错时用 */
        const seenGroups = new Set<string>();
        for (const target of targets) {
          /* 与 pending 同一条规矩：一家抛错不拦另一家（plan() 以异常回 401 这类失败） */
          try {
            const plan = await target.tasks().plan(Date.now(), selection);
            if (plan.needsLogin === true) {
              console.error(`未登录：${target.name}（会话 cookie 已失效，重新导出：pnpm probe state export）`);
              continue;
            }
            allNeedsLogin = false;
            if (plan.blocked === 'no-course') {
              console.error(`没有勾选课程：${target.name}（先跑 courses --select <id>）`);
              continue;
            }
            allNoCourse = false;
            for (const item of plan.items) {
              seenKinds.add(item.kind);
              seenGroups.add(item.group);
            }
            const inScope = (item: { kind: string; group: string }): boolean =>
              (args.kinds === undefined || args.kinds.includes(item.kind)) &&
              (args.course === undefined || item.group === args.course);
            const targetAuto = plan.items.filter((item) => item.mode === 'auto' && inScope(item));
            const targetManual = plan.items.filter((item) => item.mode !== 'auto' && inScope(item));
            auto += targetAuto.length;
            manual += targetManual.length;
            for (const item of targetAuto) console.log(`  [将做] ${target.name} · ${item.group} · ${item.title}`);
            for (const item of targetManual) console.log(`  [需人工] ${target.name} · ${item.group} · ${item.title}`);
          } catch (error) {
            console.error(
              `读取失败：${target.name}（${error instanceof Error ? error.message : String(error)}）`,
            );
            errored += 1;
            allNeedsLogin = false;
            allNoCourse = false;
          }
        }
        /*
         * 退出码与 pending、run --yes 同一口径：所有点名的平台都卡在同一件事上，才用 2/3 说话。
         * 预演原先不分情况一律回 0——「连平台都读不到」也被报成「一切正常」，
         * 脚本据此加 --yes 时会以为那一轮只是无事可做。
         */
        if (allNeedsLogin) return 2;
        if (allNoCourse) return 3;
        if (errored > 0) return 1;

        /*
         * 范围收窄打错了字要说一句。类别与课程名的取值都由平台定义，本载体不另立词表，
         * 所以这里不校验拼写，只看「本轮一个都没匹配上」这个事实——否则预演只会报
         * 「会做 0 项」，看着像确实没活，而真实原因是 --kind / --course 写错了。
         */
        if (args.kinds !== undefined && seenKinds.size > 0) {
          const unmatched = args.kinds.filter((kind) => !seenKinds.has(kind));
          if (unmatched.length > 0) {
            console.error(
              `这些类别本轮一个都没有：${unmatched.join(' / ')}（本轮出现的类别：${[...seenKinds].sort().join(' / ')}）`,
            );
          }
        }
        if (args.course !== undefined && seenGroups.size > 0 && !seenGroups.has(args.course)) {
          console.error(
            `本轮没有这门课：${args.course}（本轮出现的课程：${[...seenGroups].sort().join(' / ')}）`,
          );
        }

        console.log(`预演（没有写平台）：这一轮会做 ${auto} 项，另有 ${manual} 项需手动处理`);
        console.log(
          auto === 0
            ? '没有要做的事，因此加不加 --yes 都不会写平台。'
            : '确认无误后加 --yes 真的执行（会改账号上的学习记录，不可撤销）。',
        );
        return 0;
      }

      /*
       * 真的执行：状态落文件、进度打到标准输出。
       * 用例自己判「能不能开始」（状态文件里的中断标记 / 本进程认领），这里不重复判；
       * 两家平台都交给用例（与扩展侧同一个 platforms() 形状），范围由 selection 收窄。
       */
      const runner = createRunner({
        platforms: () => [mooc.tasks(), zhihuishu.tasks()],
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

/*
 * 载体无关的证明：策略层只认端口，喂它假端口就能跑完「入会话 → 读 → 计划」。
 *
 * 做法：把 `globalThis.browser` 换成一个**碰一下就抛异常**的代理，再用假的
 * HostCapabilities / ConfigPort / 客户端把 `createMoocTasks` 装起来。策略层只要
 * 有一处真去碰宿主全局，这里立刻红——不靠人记得「不要用 browser」。
 *
 * 与 node-live.test.ts 的分工：
 *   node-live    真网络能读（用浏览器导出的 cookie 直连平台）
 *   本文件       不碰宿主也能跑（端口全部由测试提供）
 * 两条都不需要浏览器。
 */

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { DEFAULT_SETTINGS, type ConfigPort, type HostCapabilities, type Settings } from '@study-pilot/application';
import { createMoocRuntime, createMoocTasks, type MoocRunDeps } from '../src/index.ts';
import { SessionExpiredError } from '../src/policy/session.ts';
import type { Snapshot, SnapshotCourse, SnapshotWork } from '../src/policy/read/types.ts';

const DAY = 24 * 60 * 60 * 1000;
const NOW = 1_700_000_000_000;

/** 一份「有一个待做测验」的读取结果。字段与 read/types.ts 一一对应。 */
function snapshotWithQuiz(tid: number): Snapshot {
  const work: SnapshotWork = {
    tid,
    name: `单元 ${tid}`,
    chapterName: '第1章',
    examId: null,
    type: 'quiz',
    submitted: false,
    deadline: NOW + 3 * DAY,
    evaluateStart: null,
    evaluateEnd: null,
    evaluateScoreRelease: null,
    score: null,
    totalScore: 100,
    reviewable: false,
    evaluateDone: null,
    evaluateTotal: null,
    selfDone: null,
  };
  const course: SnapshotCourse = {
    termId: 1,
    courseId: 100,
    schoolShortName: 'UNI',
    mode: 0,
    courseName: '测试课程',
    works: [work],
    units: [],
  };
  return { courses: [course] };
}

/** 开关只开自动测验，其余关闭：这样「计划里有这一项」本身就是开关生效的证据。 */
function settingsWithQuizOn(): Settings {
  return {
    ...DEFAULT_SETTINGS,
    mooc: {
      ...DEFAULT_SETTINGS.mooc,
      background: { ...DEFAULT_SETTINGS.mooc.background, autoQuiz: { enabled: true } },
    },
  };
}

/** 宿主能力：只回答两个 cookie。真实实现要读浏览器的 cookie 库，这里给常量。 */
const fakeHost: HostCapabilities = {
  whenRequestRulesReady: async () => {},
  readCookie: async (_origin, name) => {
    if (name === 'STUDY_INFO') return 'someone@example.com|8|42|1700000000000';
    if (name === 'NTESSTUDYSI') return 'token-abcdef';
    return '';
  },
};

const fakeConfig: ConfigPort = {
  read: async () => settingsWithQuizOn(),
  update: async () => settingsWithQuizOn(),
};

function deps(over: Partial<MoocRunDeps> = {}): MoocRunDeps {
  return {
    host: fakeHost,
    config: fakeConfig,
    client: {} as never,
    renew: async () => true,
    refreshCourses: async () => ({ ok: true, courses: [], byType: null }),
    loadSnapshot: async () => snapshotWithQuiz(1001),
    selectedCourses: () => [{ termId: 1, courseId: 100, schoolShortName: 'UNI', mode: 0, name: '测试课程' }],
    coursewareContext: () => ({}),
    recordFailure: async () => {},
    ...over,
  };
}

let originalBrowser: unknown;
let touched: string[];

beforeEach(() => {
  originalBrowser = (globalThis as { browser?: unknown }).browser;
  touched = [];
  (globalThis as { browser?: unknown }).browser = new Proxy(
    {},
    {
      get(_target, key) {
        touched.push(String(key));
        throw new Error(`策略层碰到了宿主全局：browser.${String(key)}`);
      },
    },
  );
});

afterEach(() => {
  (globalThis as { browser?: unknown }).browser = originalBrowser;
});

describe('策略层不碰宿主（只用端口）', () => {
  it('跑完一轮计划：会话从注入的 cookie 读、数据从注入的读取函数来', async () => {
    const tasks = createMoocTasks(deps());

    const plan = await tasks.plan(NOW);

    expect(touched).toEqual([]);
    expect(plan.needsLogin).toBeUndefined();
    expect(plan.items.map((item) => [item.id, item.mode, item.group, item.title])).toEqual([
      ['work-1001', 'auto', '测试课程', '单元 1001'],
    ]);
  });

  it('未登录时不发任何请求，如实回 needsLogin', async () => {
    const tasks = createMoocTasks(
      deps({ host: { ...fakeHost, readCookie: async () => '' } }),
    );

    const plan = await tasks.plan(NOW);

    expect(touched).toEqual([]);
    expect(plan).toEqual({ items: [], needsLogin: true });
  });

  it('没有勾选课程时不猜测，回 blocked', async () => {
    const tasks = createMoocTasks(deps({ selectedCourses: () => [] }));

    const plan = await tasks.plan(NOW);

    expect(touched).toEqual([]);
    expect(plan).toEqual({ items: [], blocked: 'no-course' });
  });

  it('会话在服务端已死、续期成功时：重读一次，不把失败交出去', async () => {
    let reads = 0;
    const tasks = createMoocTasks(
      deps({
        loadSnapshot: async () => {
          reads += 1;
          if (reads === 1) throw new SessionExpiredError();
          return snapshotWithQuiz(2002);
        },
        renew: async () => true,
      }),
    );

    const plan = await tasks.plan(NOW);

    expect(touched).toEqual([]);
    expect(reads).toBe(2);
    expect(plan.items.map((item) => item.id)).toEqual(['work-2002']);
  });

  it('会话死了且续期没成功时：回 needsLogin，不谎报数据', async () => {
    const tasks = createMoocTasks(
      deps({
        loadSnapshot: async () => {
          throw new SessionExpiredError();
        },
        renew: async () => false,
      }),
    );

    const plan = await tasks.plan(NOW);

    expect(touched).toEqual([]);
    expect(plan).toEqual({ items: [], needsLogin: true });
  });

  it('普通失败如实抛出，不伪装成登录问题', async () => {
    const tasks = createMoocTasks(
      deps({
        loadSnapshot: async () => {
          throw new Error('网络断了');
        },
      }),
    );

    await expect(tasks.plan(NOW)).rejects.toThrow('网络断了');
    expect(touched).toEqual([]);
  });
});

/*
 * 厂商装配（createMoocRuntime）也在包里，因此第二个载体不必抄那段装配。
 * 这一条只验它「给载体能力就能造出来」，不跑网络：读路径本身在上面那些用例里。
 */
describe('厂商装配不依赖任何 app 侧代码', () => {
  it('只给宿主能力与配置端口，就能造出运行件与外壳信号', () => {
    const notifier: string[] = [];
    const runtime = createMoocRuntime({
      host: fakeHost,
      config: fakeConfig,
      recordFailure: async (message) => {
        notifier.push(message);
      },
      // 故意不注入文本生成器：讨论单元于是进人工，执行层也不假装成功
    });

    expect(touched).toEqual([]);
    expect(runtime.wiring.id).toBe('mooc');
    // 登录信号必须是「登录后才下发」的那个，不能是访客也有的匿名 cookie
    expect(runtime.wiring.loginCookie).toEqual({ name: 'STUDY_INFO', domain: 'icourse163.org' });
    expect(runtime.wiring.requestRules.length).toBeGreaterThan(0);

    // 纯的那两样可以直接断言：勾选课程的映射、以及没有生成器时的上下文
    const settings = settingsWithQuizOn();
    expect(runtime.selectedCourses(settings)).toEqual([]);
    expect(runtime.coursewareContext(settings).generateText).toBeUndefined();

    // 平台实例现建，且装配交出来的那几个口都在
    expect(runtime.tasks().id).toBe('mooc');
    expect(typeof runtime.loadSnapshot).toBe('function');
    expect(typeof runtime.refreshCourses).toBe('function');
    expect(typeof runtime.renew).toBe('function');
  });
});

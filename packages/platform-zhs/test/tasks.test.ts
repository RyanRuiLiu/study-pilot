/* 计划与执行：项的形状、闭环成功路径、-12 整轮中止、写出前停止。 */

import { describe, expect, it } from 'vitest';
import type { ConfigPort, PlanItem, Settings } from '@study-pilot/application';
import type { ZhsClient } from '../src/client.ts';
import { ZhsApiError } from '../src/client.ts';
import { createZhsTasks, unitItemId } from '../src/policy/tasks.ts';
import { ZhsRoundHalt } from '../src/policy/execute.ts';
import type { CookieReader } from '../src/session.ts';

const SETTINGS: Settings = {
  version: 8,
  ai: { enabled: false, model: '', apiKey: '' },
  mooc: { courses: [], reviewComment: 'x', keepOverdueDays: 3 },
  zhihuishu: {
    courses: [
      {
        courseId: 1000009999,
        recruitId: 470001,
        secret: 'hex-secret',
        name: '示例课程甲',
        schoolName: '示例大学',
        startTime: 0,
        endTime: 0,
        enabled: true,
      },
      {
        courseId: 999,
        recruitId: 1,
        secret: 's',
        name: '没勾的课',
        schoolName: '另一所大学',
        startTime: 0,
        endTime: 0,
        enabled: false,
      },
    ],
  },
  ui: { activeTab: 'mooc' },
};

const config: ConfigPort = { read: async () => SETTINGS, update: async () => SETTINGS };

const CHAPTERS = {
  data: {
    videoChapterDtos: [
      {
        id: 2000000009,
        name: '第一章',
        videoLessons: [
          { id: 1, name: '已看的课', videoId: 111, videoSec: 100, videoSmallLessons: null },
          { id: 2, name: '没看的课', videoId: 222, videoSec: 175, videoSmallLessons: null },
        ],
      },
    ],
  },
};

/** 作业清单的默认响应：空表。多数用例不关心测验，测验用例显式登记它。 */
const EMPTY_HOMEWORK = { rt: { result: 'success', next: -1, studentHomeworkList: [] } };

/** 假 client：按接口名分派，可逐次覆盖；handler 能拿到载荷（分段类用例要验 it）。 */
function fakeClient(
  handlers: Partial<Record<string, (payload?: Record<string, unknown>) => unknown>>,
): ZhsClient {
  return {
    call: async (name, payload) => {
      const handler = handlers[name] ?? (name === 'examHomeworkList' ? () => EMPTY_HOMEWORK : undefined);
      if (handler === undefined) throw new Error(`假 client 没有登记 ${name}`);
      return handler(payload);
    },
  };
}

const SESSION_COOKIE = JSON.stringify({ realName: '测试', userId: 1, uuid: 'TESTuuid1' });
/** 会话读取的替身：登录态 = CASLOGC cookie（判据在 session.ts，形态见 session.test.ts）。 */
const readCookieLoggedIn: CookieReader = async () => SESSION_COOKIE;
const readCookieLoggedOut: CookieReader = async () => '';
const STUDY_INFO = (watch222: number) => ({
  data: {
    lesson: {
      '1': { watchState: 1, studyTotalTime: 100 },
      '2': { watchState: watch222, studyTotalTime: watch222 === 1 ? 175 : 0 },
    },
    lv: {},
  },
});

describe('plan', () => {
  it('没有勾选课程时给 blocked:no-course', async () => {
    const tasks = createZhsTasks({
      config: { read: async () => ({ ...SETTINGS, zhihuishu: { courses: [] } }), update: async () => SETTINGS },
      client: fakeClient({}),
      readCookie: readCookieLoggedIn,
    });
    expect(await tasks.plan(0)).toEqual({ items: [], blocked: 'no-course' });
  });

  it('未登录时 needsLogin（不做任何结构读取）', async () => {
    const tasks = createZhsTasks({
      config,
      client: fakeClient({}),
      readCookie: readCookieLoggedOut,
    });
    expect(await tasks.plan(0)).toEqual({ items: [], needsLogin: true });
  });

  it('只把未完成的单元排进队列，项的形状固定', async () => {
    const tasks = createZhsTasks({
      config,
      client: fakeClient({
        videoList: () => CHAPTERS,
        studyInfo: () => STUDY_INFO(0),
      }),
      readCookie: readCookieLoggedIn,
    });
    const plan = await tasks.plan(0);
    expect(plan.items).toHaveLength(1);
    const item = plan.items[0];
    expect(item.id).toBe(unitItemId({ videoId: 222, smallLessonId: 0 } as never));
    expect(item).toMatchObject({ group: '示例课程甲', title: '没看的课', mode: 'auto', kind: 'courseware' });
  });

  it('计划只产两类：课件与测验条目（期末与见面课场次永不进计划）', async () => {
    /*
     * PRIVACY 的那句「期末与正式考试不会被自动提交」靠这条钉住。
     * 期末那一族四个端点全是只读、policy/ 里零引用，所以计划只要碰它们，
     * 这个假 client 就会报「没有登记」；kinds 这一条把结果侧也钉住：
     * 计划项的类型集合不会悄悄长出第三类。
     */
    const tasks = createZhsTasks({
      config,
      client: fakeClient({
        videoList: () => CHAPTERS,
        studyInfo: () => STUDY_INFO(0),
      }),
      readCookie: readCookieLoggedIn,
    });
    const plan = await tasks.plan(0);
    expect(plan.items.length).toBeGreaterThan(0); // 空表会让下面那句白过
    const kinds = new Set(plan.items.map((entry) => entry.kind));
    for (const kind of kinds) expect(['courseware', 'quiz']).toContain(kind);
  });
});

describe('run', () => {
  /*
   * 有状态假 client：学情在「保存成功」后才翻成已看——
   * 计划阶段必须看到未完成（否则该单元根本不会排队），
   * 回读阶段才能看到完成（闭环才判成功）。
   * 快速模式：单元内零等待；服务端说验证（旗标/-12）→ 立即 ZhsRoundHalt 停轮。
   */
  interface RunHarness {
    tasks: ReturnType<typeof createZhsTasks>;
    setWrote: () => boolean;
  }
  function harness(
    overrides: Parameters<typeof fakeClient>[0] = {},
    options: { isSlideRounds?: number; saveFails?: number } = {},
  ): RunHarness {
    let watched = 0;
    let wrote = false;
    let gateLeft = options.isSlideRounds ?? 0;
    let failsLeft = options.saveFails ?? 0;
    const tasks = createZhsTasks({
      config,
      readCookie: readCookieLoggedIn,
      client: fakeClient({
        queryCourse: () => ({ code: 0, data: { isApply: 1 } }),
        prelearningNote: () => {
          if (gateLeft > 0) {
            gateLeft -= 1;
            return { code: 0, data: { isSlide: true, isFace: false, studiedLessonDto: { id: 987654 } } };
          }
          return { code: 0, data: { isSlide: false, isFace: false, studiedLessonDto: { id: 987654 } } };
        },
        saveStudyInterval: () => {
          if (failsLeft > 0) {
            failsLeft -= 1;
            throw new ZhsApiError(-12, '需要弹出滑块验证');
          }
          wrote = true;
          watched = 1;
          return { code: 0, data: { submitSuccess: true } };
        },
        videoList: () => CHAPTERS,
        studyInfo: () => STUDY_INFO(watched),
        ...overrides,
      }),
    });
    return { tasks, setWrote: () => wrote };
  }

  async function runOne(h: RunHarness, stopped = false): Promise<unknown> {
    const plan = await h.tasks.plan(0);
    return h.tasks.run(plan.items[0], async () => undefined, { stopped: () => stopped });
  }

  it('闭环成功：零等待（快速模式），数据仍为 1× 口径', async () => {
    const h = harness();
    const outcome = await runOne(h);
    expect(outcome).toMatchObject({ status: 'done' });
    expect(String((outcome as { message: string }).message)).toContain('175');
  });

  it('回读未确认完成时判 failed（不拿 200 当成功）', async () => {
    const h = harness({ studyInfo: () => STUDY_INFO(0) });
    const outcome = await runOne(h);
    expect(outcome).toMatchObject({ status: 'failed' });
  });

  it('超长视频分段上报：每段 ≤1600 秒，段间以服务端累计为下一段基准', async () => {
    /*
     * 实测边界（2026-10-17）：单份报告对 >30 分钟的视频不翻转完成；
     * 段长上限见 execute.ts 的 SEGMENT_SEC。这里用 2190 秒（36.5 分钟）：
     * 段1 报 1600 → 回读（服务端累计 1600）→ 段2 报 590 → 回读完成。
     */
    const LONG = 2190;
    let accumulated = 0;
    const saves: { y: number; ke: number; pos: string }[] = [];
    /** sdsew 的逆变换（XOR 是对合的，与 xorHexEncode 同式）——把十元数组解回来。 */
    const decode = (hex: string): string[] => {
      let text = '';
      for (let i = 0; i < hex.length; i += 2) {
        text += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16) ^ 'zzpttjd'.charCodeAt((i / 2) % 7));
      }
      return text.split(';');
    };
    const h = harness({
      videoList: () => ({
        data: {
          videoChapterDtos: [
            {
              id: 1,
              name: '第一章',
              videoLessons: [{ id: 2, name: '长课', videoId: 222, videoSec: LONG, videoSmallLessons: null }],
            },
          ],
        },
      }),
      studyInfo: () => ({
        data: {
          lesson: { '2': { watchState: accumulated >= LONG ? 1 : 0, studyTotalTime: accumulated } },
          lv: {},
        },
      }),
      saveStudyInterval: (payload) => {
        const parts = decode(String((payload as { sdsew: string }).sdsew));
        saves.push({ y: Number(parts[6]), ke: Number(parts[7]), pos: String(parts[8] ?? '') });
        accumulated = Number(parts[7]);
        return { code: 0, data: { submitSuccess: true } };
      },
    });
    const outcome = await runOne(h);
    expect(outcome).toMatchObject({ status: 'done' });
    expect(saves.map((s) => s.y)).toEqual([1600, 590]);
    expect(saves.map((s) => s.ke)).toEqual([1600, 2190]);
    // 位置在视频时间轴：段1 到 26:40，段2 到片尾 36:30
    expect(saves.map((s) => s.pos)).toEqual(['00:26:40', '00:36:30']);
  });

  it('prelearningNote 载荷与真实浏览器同形：子节带 lessonVideoId、无子节不带、isApply 用服务端的值', async () => {
    const notes: Record<string, unknown>[] = [];
    const h = harness({
      videoList: () => ({
        data: {
          videoChapterDtos: [
            {
              id: 9,
              name: '章',
              videoLessons: [
                {
                  id: 7,
                  name: '父',
                  videoId: 77,
                  videoSec: 100,
                  videoSmallLessons: [{ id: 8, name: '子', videoId: 88, videoSec: 50 }],
                },
                { id: 5, name: '单节', videoId: 55, videoSec: 60, videoSmallLessons: null },
              ],
            },
          ],
        },
      }),
      studyInfo: () => ({ data: { lesson: {}, lv: {} } }),
      prelearningNote: (payload) => {
        notes.push(payload ?? {});
        return { code: 0, data: { isSlide: false, isFace: false, studiedLessonDto: { id: 987654 } } };
      },
    });
    const plan = await h.tasks.plan(0);
    expect(plan.items).toHaveLength(2); // 子节 + 单节（都未完成）
    await h.tasks.run(plan.items[0], async () => undefined, { stopped: () => false });

    // 子节：lessonVideoId = 子节 id（金样本口径；站点 ee.lessonVideoId = A.id）
    expect(notes[0]).toEqual({
      ccCourseId: 1000009999,
      chapterId: 9,
      isApply: 1,
      lessonId: 7,
      lessonVideoId: 8,
      recruitId: 470001,
      videoId: 88,
    });
    // 无子节：站点 delete 该字段——wire 上不出现
    await h.tasks.run(plan.items[1], async () => undefined, { stopped: () => false });
    expect('lessonVideoId' in (notes[1] ?? {})).toBe(false);
    expect(notes[1]).toMatchObject({ lessonId: 5, videoId: 55, isApply: 1 });
  });

  it('isApply 按轮缓存：同一轮里再跑一个单元不再读 queryCourse', async () => {
    let asked = 0;
    const h = harness({
      queryCourse: () => {
        asked += 1;
        return { code: 0, data: { isApply: 1 } };
      },
    });
    const plan = await h.tasks.plan(0);
    // 同一轮内把同一项跑两次（缓存要跨单元复用，这里用两次 run 等价验证）
    await h.tasks.run(plan.items[0], async () => undefined, { stopped: () => false });
    await h.tasks.run(plan.items[0], async () => undefined, { stopped: () => false });
    expect(asked).toBe(1);
  });

  it('isSlide 旗标 = 服务端要求验证 → 立即 ZhsRoundHalt（短文案 + 下一步动作），不发任何写', async () => {
    const h = harness({}, { isSlideRounds: 1 });
    const err = await runOne(h).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(ZhsRoundHalt);
    // 文案：只陈述事实、短（去向与做法走 action，不写进句子）
    expect(String((err as Error).message)).toBe('需完成人机验证');
    // 动作：打开该课学习页（hex-secret 是 SETTINGS 里那门课的入口参数）
    expect((err as ZhsRoundHalt).action).toEqual({
      platformId: 'zhihuishu',
      label: '打开验证页',
      url: 'https://wisdom-mooc.zhihuishu.com/study/index?recruitAndCourseId=hex-secret',
    });
    expect(h.setWrote()).toBe(false);
  });

  it('保存撞 -12 = 服务端要求验证 → 立即 ZhsRoundHalt（不重试、不等待）', async () => {
    const h = harness({}, { saveFails: 1 });
    const err = await runOne(h).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(ZhsRoundHalt);
    expect(String((err as Error).message)).toBe('需完成人机验证');
  });

  it('回读撞 -12 同样停轮并带动作位（信号不因是回读就换个意思）', async () => {
    // 计划阶段那次回读要放行（不然这一项根本排不进队列），第二次——执行里的确认回读——才撞门
    let asked = 0;
    const h = harness({
      studyInfo: () => {
        asked += 1;
        if (asked === 1) return STUDY_INFO(0);
        throw new ZhsApiError(-12, '需要弹出滑块验证');
      },
    });
    const err = await runOne(h).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(ZhsRoundHalt);
    expect(String((err as Error).message)).toBe('需完成人机验证');
    expect((err as ZhsRoundHalt).action).toEqual({
      platformId: 'zhihuishu',
      label: '打开验证页',
      url: 'https://wisdom-mooc.zhihuishu.com/study/index?recruitAndCourseId=hex-secret',
    });
  });

  it('停止柄被按到 → skipped，且不发任何写', async () => {
    const h = harness();
    const outcome = await runOne(h, true);
    expect(outcome).toMatchObject({ status: 'skipped' });
    expect(h.setWrote()).toBe(false);
  });

  it('课程缺入口参数 → failed 且不发上报', async () => {
    const broken: Settings = {
      ...SETTINGS,
      zhihuishu: { courses: [{ ...SETTINGS.zhihuishu.courses[0], secret: '' }] },
    };
    const tasks = createZhsTasks({
      config: { read: async () => broken, update: async () => broken },
      client: fakeClient({}),
      readCookie: readCookieLoggedIn,
    });
    const item = {
      id: 'x',
      group: '示例课程甲',
      title: 't',
      mode: 'auto' as const,
      kind: 'courseware',
      payload: { course: broken.zhihuishu.courses[0], unit: { videoId: 1, smallLessonId: 0 } },
    };
    const outcome = await tasks.run(item, async () => undefined, { stopped: () => false });
    expect(outcome).toMatchObject({ status: 'failed' });
  });
});

describe('plan：单元测试项', () => {
  // 形态取自真机：examUrl 的 t1 就是清单条目的 id（这一条是「章节测验 ↔ 清单」的连接键）
  const EXAM_URL =
    '//onlineexamh5new.zhihuishu.com/stuExamWeb.html#/webExamList/dohomework/470001/AbCd0003/FfGh0004/1000009999/1001/0';
  const CHAPTERS_WITH_EXAM = {
    data: {
      videoChapterDtos: [
        {
          id: 2000000009,
          name: '第一章',
          videoLessons: [{ id: 1, name: '课', videoId: 111, videoSec: 100, videoSmallLessons: null }],
          studentExamDto: { id: 6200000002, state: 1, exam: { id: 61000001, type: 1 }, examUrl: EXAM_URL },
        },
      ],
    },
  };
  const item = (over: Record<string, unknown> = {}): Record<string, unknown> => ({
    id: 'AbCd0003',
    examId: 'FfGh0004',
    examName: '第一章单元测试',
    meetCourseType: 0,
    state: 1,
    cpOrderNumber: '第一章',
    score: null,
    totalScore: '100',
    ...over,
  });

  function planWith(pending: Array<Record<string, unknown>>, history: Array<Record<string, unknown>>) {
    const flags: number[] = [];
    const client = fakeClient({
      videoList: () => CHAPTERS_WITH_EXAM,
      studyInfo: () => ({ data: { lesson: { '1': { watchState: 1, studyTotalTime: 100 } }, lv: {} } }),
      examHomeworkList: (payload) => {
        const flag = Number((payload as { flag?: unknown } | undefined)?.flag);
        flags.push(flag);
        return { rt: { result: 'success', next: -1, studentHomeworkList: flag === 1 ? pending : history } };
      },
    });
    return { tasks: createZhsTasks({ config, client, readCookie: readCookieLoggedIn }), flags };
  }

  const quizzesOf = (items: ReadonlyArray<PlanItem>) => items.filter((entry) => entry.kind === 'quiz');

  it('未交且没动过的单元测试进计划，kind=quiz、id 认清单条目', async () => {
    const { tasks } = planWith([item()], []);
    const plan = await tasks.plan(0);
    const quiz = quizzesOf(plan.items);
    expect(quiz).toHaveLength(1);
    expect(quiz[0]).toMatchObject({
      id: 'zhs-quiz-AbCd0003',
      group: '示例课程甲',
      title: '第一章单元测试',
      mode: 'auto',
    });
    const payload = quiz[0]!.payload as { enter: string; totalScore: number | null };
    expect(payload.enter).toBe('fresh');
    expect(payload.totalScore).toBe(100); // 清单给的是字符串 "100"，归一成了数字
  });

  it('已交未满分的卷进计划，进法是 submitted（先申请重做，不重打第一枪）', async () => {
    const { tasks } = planWith([], [item({ state: 4, score: '60', totalScore: '100' })]);
    const quiz = quizzesOf((await tasks.plan(0)).items);
    expect(quiz).toHaveLength(1);
    expect((quiz[0]!.payload as { enter: string }).enter).toBe('submitted');
  });

  it('已交满分的卷不进计划', async () => {
    const { tasks } = planWith([], [item({ state: 4, score: '100', totalScore: '100' })]);
    expect(quizzesOf((await tasks.plan(0)).items)).toEqual([]);
  });

  it('未交页签里 state=5（已交过、重做已申请）进计划，进法是 redoOpen——直接接管，不再申请重做', async () => {
    const { tasks } = planWith([item({ state: 5 })], []);
    const quiz = quizzesOf((await tasks.plan(0)).items);
    expect(quiz).toHaveLength(1);
    const payload = quiz[0]!.payload as { enter: string; totalScore: number | null };
    expect(payload.enter).toBe('redoOpen');
    // state=5 的清单条目 score 为 null、totalScore 仍是 100（真机实测），神谕判据照常成立
    expect(payload.totalScore).toBe(100);
  });

  it('见面课测验与单元测试同一判据：没动过的进计划、进法一样', async () => {
    const { tasks } = planWith([item({ meetCourseType: 1 })], []);
    const quiz = quizzesOf((await tasks.plan(0)).items);
    expect(quiz).toHaveLength(1);
    expect((quiz[0]!.payload as { enter: string }).enter).toBe('fresh');
  });

  it('见面课测验重做已申请也进计划（平台的重做只按 examId 判，不分题型）', async () => {
    const { tasks } = planWith([item({ meetCourseType: 1, state: 5 })], []);
    const quiz = quizzesOf((await tasks.plan(0)).items);
    expect(quiz).toHaveLength(1);
    expect((quiz[0]!.payload as { enter: string }).enter).toBe('redoOpen');
  });

  it('见面课测验已交未满分也进计划——门槛在执行侧一处把（getIsObject ＋ 剩余次数）', async () => {
    const { tasks } = planWith([], [item({ meetCourseType: 1, state: 4, score: '60', totalScore: '100' })]);
    const quiz = quizzesOf((await tasks.plan(0)).items);
    expect(quiz).toHaveLength(1);
    expect((quiz[0]!.payload as { enter: string }).enter).toBe('submitted');
  });

  it('计划是只读的：两个页签都读，但绝不开卷', async () => {
    const { tasks, flags } = planWith([item()], []);
    await tasks.plan(0);
    expect([...flags].sort()).toEqual([1, 2]);

    // 把开卷做成地雷：计划阶段踩到就抛
    const mined = createZhsTasks({
      config,
      readCookie: readCookieLoggedIn,
      client: fakeClient({
        videoList: () => CHAPTERS_WITH_EXAM,
        studyInfo: () => ({ data: { lesson: {}, lv: {} } }),
        examHomeworkList: () => EMPTY_HOMEWORK,
        examDoHomework: () => {
          throw new Error('计划阶段不许开卷');
        },
      }),
    });
    // 计划照常产出（这一项是课件），关键是没有踩到 examDoHomework 那颗雷
    const plan = await mined.plan(0);
    expect(plan.items.map((entry) => entry.kind)).toEqual(['courseware']);
  });
});

/* 计划与执行：项的形状、闭环成功路径、-12 整轮中止、写出前停止。 */

import { describe, expect, it } from 'vitest';
import type { ConfigPort, Settings } from '@study-pilot/application';
import type { ZhsClient } from '../src/client.ts';
import { ZhsApiError } from '../src/client.ts';
import { createZhsTasks, unitItemId } from '../src/policy/tasks.ts';
import { ZhsRoundHalt } from '../src/policy/execute.ts';

const SETTINGS: Settings = {
  version: 8,
  ai: { enabled: false, model: '', apiKey: '' },
  mooc: { courses: [], reviewComment: 'x', keepOverdueDays: 3 },
  zhihuishu: {
    courses: [
      {
        courseId: 1000006163,
        recruitId: 473310,
        secret: 'hex-secret',
        name: '创造性思维与创新方法',
        schoolName: '同济大学',
        progressText: '0%',
        enabled: true,
      },
      {
        courseId: 999,
        recruitId: 1,
        secret: 's',
        name: '没勾的课',
        schoolName: 'X',
        progressText: '0%',
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
        id: 1000052029,
        name: '第一章',
        videoLessons: [
          { id: 1, name: '已看的课', videoId: 111, videoSec: 100, videoSmallLessons: null },
          { id: 2, name: '没看的课', videoId: 222, videoSec: 175, videoSmallLessons: null },
        ],
      },
    ],
  },
};

/** 假 client：按接口名分派，可逐次覆盖。 */
function fakeClient(handlers: Partial<Record<string, () => unknown>>): ZhsClient {
  return {
    call: async (name) => {
      const handler = handlers[name];
      if (handler === undefined) throw new Error(`假 client 没有登记 ${name}`);
      return handler();
    },
  };
}

const SESSION_OK = () => ({ code: 0, message: null, result: { uuid: 'TESTuuid1' } });
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
    });
    expect(await tasks.plan(0)).toEqual({ items: [], blocked: 'no-course' });
  });

  it('未登录时 needsLogin（不做任何结构读取）', async () => {
    const tasks = createZhsTasks({
      config,
      client: fakeClient({ loginUserInfo: () => ({ code: 401, result: null }) }),
    });
    expect(await tasks.plan(0)).toEqual({ items: [], needsLogin: true });
  });

  it('只把未完成的单元排进队列，项的形状固定', async () => {
    const tasks = createZhsTasks({
      config,
      client: fakeClient({
        loginUserInfo: SESSION_OK,
        videoList: () => CHAPTERS,
        studyInfo: () => STUDY_INFO(0),
      }),
    });
    const plan = await tasks.plan(0);
    expect(plan.items).toHaveLength(1);
    const item = plan.items[0];
    expect(item.id).toBe(unitItemId({ videoId: 222, smallLessonId: 0 } as never));
    expect(item).toMatchObject({ group: '创造性思维与创新方法', title: '没看的课', mode: 'auto', kind: 'courseware' });
  });
});

describe('run', () => {
  /*
   * 有状态假 client：学情在「保存成功」后才翻成已看——
   * 计划阶段必须看到未完成（否则该单元根本不会排队），
   * 回读阶段才能看到完成（闭环才判成功）。
   * 等待注入替身并记录：1× 节奏 = 声称 N 秒就等 N 秒壁钟。
   */
  interface RunHarness {
    tasks: ReturnType<typeof createZhsTasks>;
    waits: number[];
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
    const waits: number[] = [];
    const tasks = createZhsTasks({
      config,
      timing: {
        wait: async (ms) => {
          waits.push(ms);
        },
        gateCooldownMs: 5 * 60 * 1000,
        gateAttempts: 3,
      },
      client: fakeClient({
        loginUserInfo: SESSION_OK,
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
    return { tasks, waits, setWrote: () => wrote };
  }

  async function runOne(h: RunHarness, stopped = false): Promise<unknown> {
    const plan = await h.tasks.plan(0);
    return h.tasks.run(plan.items[0], async () => undefined, { stopped: () => stopped });
  }

  it('闭环成功，且等待 = 声称时长（1× 节奏）×1000', async () => {
    const h = harness();
    const outcome = await runOne(h);
    expect(outcome).toMatchObject({ status: 'done' });
    expect(String((outcome as { message: string }).message)).toContain('175');
    // 等待按段切（每段 ≤20 秒），总和必须等于 175 秒壁钟
    expect(h.waits.reduce((sum, ms) => sum + ms, 0)).toBe(175 * 1000);
    expect(h.waits.every((ms) => ms <= 20_000)).toBe(true);
  });

  it('回读未确认完成时判 failed（不拿 200 当成功）', async () => {
    const h = harness({ studyInfo: () => STUDY_INFO(0) });
    const outcome = await runOne(h);
    expect(outcome).toMatchObject({ status: 'failed' });
  });

  it('isSlide 门先挂后解 → 冷却一次后继续完成', async () => {
    const h = harness({}, { isSlideRounds: 1 });
    const outcome = await runOne(h);
    expect(outcome).toMatchObject({ status: 'done' });
    // 总等待 = 175 秒观看到点 + 一次 5 分钟冷却（冷却同样按段切）
    expect(h.waits.reduce((sum, ms) => sum + ms, 0)).toBe(175 * 1000 + 5 * 60 * 1000);
  });

  it('isSlide 门始终挂着 → 冷却重试到上限后抛 ZhsRoundHalt', async () => {
    const h = harness({}, { isSlideRounds: 99 });
    await expect(runOne(h)).rejects.toBeInstanceOf(ZhsRoundHalt);
    expect(h.setWrote()).toBe(false);
  });

  it('保存撞 -12 一次 → 冷却后重试成功', async () => {
    const h = harness({}, { saveFails: 1 });
    const outcome = await runOne(h);
    expect(outcome).toMatchObject({ status: 'done' });
    expect(h.waits.reduce((sum, ms) => sum + ms, 0)).toBe(175 * 1000 + 5 * 60 * 1000 + 175 * 1000);
  });

  it('保存持续 -12 → 抛 ZhsRoundHalt（整轮中止）', async () => {
    const h = harness({}, { saveFails: 99 });
    await expect(runOne(h)).rejects.toBeInstanceOf(ZhsRoundHalt);
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
    const tasks = createZhsTasks({ config: { read: async () => broken, update: async () => broken }, client: fakeClient({}) });
    const item = {
      id: 'x',
      group: '创造性思维与创新方法',
      title: 't',
      mode: 'auto' as const,
      kind: 'courseware',
      payload: { course: broken.zhihuishu.courses[0], unit: { videoId: 1, smallLessonId: 0 } },
    };
    const outcome = await tasks.run(item, async () => undefined, { stopped: () => false });
    expect(outcome).toMatchObject({ status: 'failed' });
  });
});

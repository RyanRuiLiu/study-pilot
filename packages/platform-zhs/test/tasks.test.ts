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
const UNITS_DONE_222 = {
  data: {
    videoChapterDtos: CHAPTERS.data.videoChapterDtos,
  },
};
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
   */
  interface RunHarness {
    tasks: ReturnType<typeof createZhsTasks>;
    watched: () => number;
    setWrote: () => boolean;
  }
  function harness(overrides: Parameters<typeof fakeClient>[0] = {}): RunHarness {
    let watched = 0;
    let wrote = false;
    const tasks = createZhsTasks({
      config,
      client: fakeClient({
        loginUserInfo: SESSION_OK,
        prelearningNote: () => ({ code: 0, data: { studiedLessonDto: { id: 987654 } } }),
        saveStudyInterval: () => {
          wrote = true;
          watched = 1;
          return { code: 0, data: { submitSuccess: true } };
        },
        videoList: () => CHAPTERS,
        studyInfo: () => STUDY_INFO(watched),
        ...overrides,
      }),
    });
    return { tasks, watched: () => watched, setWrote: () => wrote };
  }

  async function runOne(h: RunHarness, stopped = false): Promise<unknown> {
    const plan = await h.tasks.plan(0);
    return h.tasks.run(plan.items[0], async () => undefined, { stopped: () => stopped });
  }

  it('闭环成功：记录→上报→回读确认完成', async () => {
    const outcome = await runOne(harness());
    expect(outcome).toMatchObject({ status: 'done' });
    expect(String((outcome as { message: string }).message)).toContain('175');
  });

  it('回读未确认完成时判 failed（不拿 200 当成功）', async () => {
    const h = harness({ studyInfo: () => STUDY_INFO(0) });
    const outcome = await runOne(h);
    expect(outcome).toMatchObject({ status: 'failed' });
  });

  it('-12 易盾 → 抛 ZhsRoundHalt（整轮中止）', async () => {
    const h = harness({
      saveStudyInterval: () => {
        throw new ZhsApiError(-12, '需要验证');
      },
    });
    await expect(runOne(h)).rejects.toBeInstanceOf(ZhsRoundHalt);
  });

  it('停止柄在写前被看到时返回 skipped，不发任何写', async () => {
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

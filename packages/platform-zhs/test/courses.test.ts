/* 课程列表：响应解析、「只沿用勾选」的合并规则、刷新回写。 */

import { describe, expect, it } from 'vitest';
import { getShareCourses, mergeCourses, readCourseIsApply, refreshCourses } from '../src/courses.ts';
import { ZHS_SESSION_EXPIRED, ZhsAuthError } from '../src/client.ts';
import type { ZhsClient } from '../src/client.ts';
import type { ConfigPort, Settings, ZhihuishuCourse } from '@study-pilot/application';

function clientReturning(body: unknown): ZhsClient {
  return { call: async () => body };
}

describe('getShareCourses', () => {
  it('从 result.courseOpenDtos 取出课程事实（字段名对齐平台）', async () => {
    const briefs = await getShareCourses(
      clientReturning({
        code: 200,
        result: {
          totalCount: 1,
          courseOpenDtos: [
            {
              courseId: 1000000001,
              recruitId: 470001,
              courseName: '示例课程甲',
              schoolName: '示例大学',
              courseStartTime: 1789315200000,
              courseEndTime: 1795363199000,
              secret: 'aa55aa55aa55aa55aa55aa55aa55aa55aa55aa',
            },
          ],
        },
      }),
    );
    expect(briefs).toEqual([
      {
        courseId: 1000000001,
        recruitId: 470001,
        secret: 'aa55aa55aa55aa55aa55aa55aa55aa55aa55aa',
        name: '示例课程甲',
        schoolName: '示例大学',
        startTime: 1789315200000,
        endTime: 1795363199000,
      },
    ]);
  });

  it('缺 id 的畸形条目不进列表', async () => {
    const briefs = await getShareCourses(
      clientReturning({ code: 200, result: { courseOpenDtos: [{ courseName: '无 id' }] } }),
    );
    expect(briefs).toEqual([]);
  });

  it('课程超过一页时继续取下一页，不把第一页当全部', async () => {
    const pages: number[] = [];
    const client: ZhsClient = {
      call: async (_name, payload) => {
        const pageNo = (payload as { pageNo?: number }).pageNo ?? 0;
        pages.push(pageNo);
        const courseOpenDtos =
          pageNo === 1
            ? Array.from({ length: 50 }, (_, index) => ({
                courseId: index + 1,
                recruitId: 100 + index,
                courseName: `课程 ${index + 1}`,
              }))
            : [{ courseId: 51, recruitId: 151, courseName: '课程 51' }];
        return { code: 200, result: { totalCount: 51, courseOpenDtos } };
      },
    };

    const briefs = await getShareCourses(client);

    expect(briefs).toHaveLength(51);
    expect(pages).toEqual([1, 2]);
  });

  it('列表里的 null / 非对象条目跳过，不让空指针炸掉整个列表', async () => {
    const briefs = await getShareCourses(
      clientReturning({
        code: 200,
        result: {
          courseOpenDtos: [
            null,
            'x',
            { courseId: 1, recruitId: 2, secret: 's', courseName: '示例课程' },
          ],
        },
      }),
    );
    expect(briefs).toHaveLength(1);
    expect(briefs[0]?.courseId).toBe(1);
  });

  it('响应里没有 courseOpenDtos：抛错，不交空表冒充「这账号一门课都没选」', async () => {
    await expect(getShareCourses(clientReturning({ code: 200, result: {} }))).rejects.toThrow(
      /courseOpenDtos/,
    );
    await expect(getShareCourses(clientReturning({ code: 200 }))).rejects.toThrow(/courseOpenDtos/);
  });
});

describe('readCourseIsApply', () => {
  it('服务端给值就用（金样本实况：数字 1）', async () => {
    expect(await readCourseIsApply(clientReturning({ code: 0, data: { isApply: 1 } }), 'hex')).toBe(1);
  });

  it('服务端没给（0 / 缺字段 / 无 data）时回落站点自己的 "1"', async () => {
    expect(await readCourseIsApply(clientReturning({ code: 0, data: { isApply: 0 } }), 'hex')).toBe('1');
    expect(await readCourseIsApply(clientReturning({ code: 0, data: {} }), 'hex')).toBe('1');
    expect(await readCourseIsApply(clientReturning({ code: 0 }), 'hex')).toBe('1');
  });
});

describe('mergeCourses', () => {
  const fresh = [
    { courseId: 1, recruitId: 10, secret: 'a', name: '甲', schoolName: 'A 校', startTime: 100, endTime: 200 },
    { courseId: 2, recruitId: 20, secret: 'b', name: '乙', schoolName: 'B 校', startTime: 300, endTime: 400 },
  ];
  const existing: ZhihuishuCourse[] = [
    { courseId: 1, recruitId: 10, secret: 'old', name: '甲', schoolName: 'A 校', startTime: 100, endTime: 200, enabled: true },
  ];

  it('已勾课程沿用勾选，平台事实以新读的为准', () => {
    const merged = mergeCourses(existing, fresh);
    expect(merged[0]).toMatchObject({ courseId: 1, enabled: true, startTime: 100, secret: 'a' });
  });

  it('新出现的课程默认不勾（不把用户没同意过的课拖进范围）', () => {
    const merged = mergeCourses(existing, fresh);
    expect(merged[1]).toMatchObject({ courseId: 2, enabled: false });
  });

  it('用户取消过的勾选同样被沿用（不会因为刷新又勾回来）', () => {
    const merged = mergeCourses([{ ...existing[0], enabled: false }], fresh);
    expect(merged[0].enabled).toBe(false);
  });
});

describe('refreshCourses', () => {
  const SETTINGS: Settings = {
    version: 8,
    ai: { enabled: false, model: '', apiKey: '' },
    mooc: {
      courses: [],
      reviewComment: 'x',
      keepOverdueDays: 3,
      mobileAccount: '',
      mobilePassword: '',
      mobileAId: '',
      mobileUniqueId: '',
      mobileDeviceProfile: '',
    },
    zhihuishu: {
      courses: [
        {
          courseId: 1000000001,
          recruitId: 470001,
          secret: 'old',
          name: '示例课程甲',
          schoolName: '示例大学',
          startTime: 1767225600000,
          endTime: 1795363199000,
          enabled: true,
        },
      ],
    },
    ui: { activeTab: 'mooc' },
  };

  /** 记录 update 收到的补丁；read 一律回 SETTINGS。 */
  function trackingConfig(): { config: ConfigPort; updates: unknown[] } {
    const updates: unknown[] = [];
    return {
      updates,
      config: {
        read: async () => SETTINGS,
        update: async (patch) => {
          updates.push(patch);
          return SETTINGS;
        },
      },
    };
  }

  const openDtos = [
    {
      courseId: 1000000001,
      recruitId: 470001,
      courseName: '示例课程甲',
      schoolName: '示例大学',
      courseStartTime: 1789315200000,
      courseEndTime: 1795363199000,
      secret: 'new',
    },
    {
      courseId: 1000000002,
      recruitId: 470002,
      courseName: '示例课程乙',
      schoolName: '另一所大学',
      courseStartTime: 0,
      courseEndTime: 0,
      secret: 'x',
    },
  ];

  it('读通即写回合并结果：平台事实取新的、勾选沿用旧的', async () => {
    const { config, updates } = trackingConfig();
    const result = await refreshCourses(clientReturning({ code: 200, result: { courseOpenDtos: openDtos } }), config);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.courses).toMatchObject([
      { courseId: 1000000001, startTime: 1789315200000, secret: 'new', enabled: true },
      { courseId: 1000000002, enabled: false },
    ]);
    // 只动 zhihuishu.courses 一段，不整份回写
    expect(updates).toEqual([{ zhihuishu: { courses: result.courses } }]);
  });

  it('登录失效：reason=auth、文案是那句用户话，且一个字节都不写配置', async () => {
    const { config, updates } = trackingConfig();
    const failing: ZhsClient = {
      call: async () => {
        throw new ZhsAuthError(401);
      },
    };
    const result = await refreshCourses(failing, config);
    expect(result).toEqual({ ok: false, reason: 'auth', message: ZHS_SESSION_EXPIRED });
    expect(updates).toEqual([]);
  });

  it('平台没返回课程：如实报 no-courses，且一个字节都不写配置', async () => {
    const { config, updates } = trackingConfig();
    const result = await refreshCourses(clientReturning({ code: 200, result: { courseOpenDtos: [] } }), config);
    expect(result).toEqual({ ok: false, reason: 'no-courses', message: '平台没有返回任何课程' });
    expect(updates).toEqual([]);
  });

  it('读平台失败：报 fetch-failed 并带上平台/网络的原始措辞，不写配置', async () => {
    const { config, updates } = trackingConfig();
    const failing: ZhsClient = {
      call: async () => {
        throw new Error('智慧树接口 HTTP 500');
      },
    };
    const result = await refreshCourses(failing, config);
    expect(result).toEqual({ ok: false, reason: 'fetch-failed', message: '智慧树接口 HTTP 500' });
    expect(updates).toEqual([]);
  });
});

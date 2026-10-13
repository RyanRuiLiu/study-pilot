/*
 * 课件单元的完成。
 *
 * 报文取最小集：下面这几个字段是实测确认的必需集（其余字段逐个省过，
 * 见 docs/platforms/courseware.md 第 6 节）。写错任何一处，平台都只是
 * 「不记账」，界面上表现为单元又出现在下一轮计划里，很难定位。
 * 因此这里把每个类型的报文钉死，并钉住「不发送多余字段」。
 *
 * 报文里的值一律来自课程结构：测试用固定的结构样本，断言输出与之一致。
 */

import { describe, expect, it } from 'vitest';
import { md5hex } from '@study-pilot/core';
import { createThrottle } from '@study-pilot/transport';
import { createMoocClient } from '../src/client.ts';
import {
  COMPLETABLE_TYPES,
  UNIT_TYPE,
  buildUnitReport,
  completeUnit,
  getCourseStructure,
  isCompletable,
  isUnitComplete,
  type CourseUnit,
} from '../src/index.ts';

const TOKEN = 'e7f7a05b3c30492ab56fb86dd13a8a9d';

function unitOf(overrides: Partial<CourseUnit> = {}): CourseUnit {
  return {
    unitId: 1001,
    contentId: 2002,
    lessonId: 3003,
    lessonName: '1.1 课时',
    name: '示例单元',
    contentType: UNIT_TYPE.VIDEO,
    durationInSeconds: 500,
    completePercent: 0,
    viewStatus: 0,
    ...overrides,
  };
}

function clientCapturing(envelope: unknown = { code: 0, message: '', result: true }) {
  const calls: Array<{ path: string; body: unknown }> = [];
  const client = createMoocClient({
    fetch: (async (url: string, init?: RequestInit) => {
      calls.push({ path: new URL(url).pathname, body: JSON.parse(String(init?.body ?? '{}')) });
      return new Response(JSON.stringify(envelope), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }) as never,
    getToken: () => TOKEN,
    md5: md5hex,
    throttle: createThrottle({ minGapMs: 0 }),
  });
  return { client, calls };
}

describe('课件单元的报文', () => {
  it('视频：带上位置与本次学时，两个值都取自结构里的时长', () => {
    expect(buildUnitReport(unitOf())).toEqual({
      unitId: 1001,
      finished: true,
      contentType: UNIT_TYPE.VIDEO,
      videoTime: 500,
      learnedVideoTimeCount: 500,
    });
  });

  it('视频缺时长时不发报文——平台上没给这个数，就不编一个', () => {
    expect(buildUnitReport(unitOf({ durationInSeconds: null }))).toBeNull();
    expect(buildUnitReport(unitOf({ durationInSeconds: 0 }))).toBeNull();
  });

  it('文档、文本、随堂测验、讨论：只报单元与类型', () => {
    for (const contentType of [
      UNIT_TYPE.PDF,
      UNIT_TYPE.TEXT,
      UNIT_TYPE.QUESTION,
      UNIT_TYPE.DISCUSS,
    ]) {
      expect(buildUnitReport(unitOf({ contentType }))).toEqual({
        unitId: 1001,
        finished: true,
        contentType,
      });
    }
  });

  it('不发送实测确认多余的字段', () => {
    const dto = buildUnitReport(unitOf()) ?? {};
    for (const key of ['courseId', 'lessonId', 'videoId', 'termId', 'userId', 'index', 'duration', 'action']) {
      expect(Object.hasOwn(dto, key)).toBe(false);
    }
  });

  it('完成判据看 completePercent：部分学习的视频 viewStatus 已是 5，但没学完', () => {
    expect(isUnitComplete(unitOf({ completePercent: 0.32, viewStatus: 5 }))).toBe(false);
    expect(isUnitComplete(unitOf({ completePercent: 1, viewStatus: 5 }))).toBe(true);
  });

  it('可上报的类型集合包含五种已实测类型', () => {
    expect([...COMPLETABLE_TYPES].sort((a, b) => a - b)).toEqual([1, 3, 4, 5, 6]);
  });

  it('能不能上报：看类型，也看报文构不构得出来', () => {
    expect(isCompletable(unitOf())).toBe(true);
    expect(isCompletable(unitOf({ contentType: UNIT_TYPE.PDF }))).toBe(true);
    // 视频没有时长：构不出报文，计划不该收下它
    expect(isCompletable(unitOf({ durationInSeconds: null }))).toBe(false);
    // 未实测的类型不猜
    expect(isCompletable(unitOf({ contentType: UNIT_TYPE.LIVE }))).toBe(false);
  });
});

describe('上报一次单元完成', () => {
  it('走 saveMocContentLearn，报文放在 dto 里', async () => {
    const { client, calls } = clientCapturing();
    const result = await completeUnit(client, unitOf());

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe('reported');
    expect(calls).toHaveLength(1);
    expect(calls[0]?.path).toBe('/web/j/courseRpcBean.saveMocContentLearn.rpc');
    expect(calls[0]?.body).toEqual({
      dto: {
        unitId: 1001,
        finished: true,
        contentType: UNIT_TYPE.VIDEO,
        videoTime: 500,
        learnedVideoTimeCount: 500,
      },
    });
  });

  it('缺数据的单元返回 skipped，不发请求', async () => {
    const { client, calls } = clientCapturing();
    const result = await completeUnit(client, unitOf({ durationInSeconds: null }));

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe('skipped');
    expect(calls).toHaveLength(0);
  });

  it('平台报错时如实透出，不当作已完成', async () => {
    const { client } = clientCapturing({ code: -1, message: '参数错误', result: null });
    const result = await completeUnit(client, unitOf());

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.kind).toBe('api');
  });
});

describe('结构里的课件单元', () => {
  it('从 lessons[].units[] 读出单元，章节下的同名位置不读', async () => {
    const { client } = clientCapturing({
      code: 0,
      message: '',
      result: {
        mocTermDto: {
          id: 1488277459,
          courseId: 1467539170,
          courseName: '示例课',
          // 曾经写错的位置：单元不在章节下。这里刻意放一个，断言它被忽略
          units: [{ id: 9999, contentType: 1 }],
          chapters: [
            {
              id: 1,
              name: '第一章',
              lessons: [
                {
                  id: 3003,
                  name: '1.1 课时',
                  units: [
                    {
                      id: 1001,
                      contentId: 2002,
                      contentType: 1,
                      name: '示例视频',
                      durationInSeconds: 500,
                      completePercent: 0.5,
                      viewStatus: 5,
                    },
                    { id: 0, contentType: 3 },
                  ],
                },
              ],
            },
          ],
        },
      },
    });

    const structure = await getCourseStructure(client, 1488277459);

    expect(structure.ok).toBe(true);
    if (!structure.ok) return;
    expect(structure.value.units).toEqual([
      {
        unitId: 1001,
        contentId: 2002,
        lessonId: 3003,
        lessonName: '1.1 课时',
        name: '示例视频',
        contentType: 1,
        durationInSeconds: 500,
        completePercent: 0.5,
        viewStatus: 5,
      },
    ]);
  });
});

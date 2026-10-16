/* 任务树合并：拍平（含子节位次映射）、学情两表合并、学情请求载荷。 */

import { describe, expect, it } from 'vitest';
import { getCourseUnits } from '../src/structure.ts';
import type { ZhsClient } from '../src/client.ts';

/** 造一个按接口名分派响应的假 client，并记录每次调用的载荷。 */
function fakeClient(responses: Record<string, unknown>): { client: ZhsClient; calls: Array<{ name: string; payload: unknown }> } {
  const calls: Array<{ name: string; payload: unknown }> = [];
  const client: ZhsClient = {
    call: async (name, payload) => {
      calls.push({ name, payload });
      const response = responses[name];
      if (response === undefined) throw new Error(`假 client 没有登记 ${name}`);
      return response;
    },
  };
  return { client, calls };
}

const CHAPTERS = {
  data: {
    videoChapterDtos: [
      {
        id: 1000051922,
        name: '导论',
        videoLessons: [
          { id: 1000057846, name: '导论', videoId: 66907961, videoSec: 501, videoSmallLessons: null },
        ],
      },
      {
        id: 1000051930,
        name: '创业是什么？',
        videoLessons: [
          {
            id: 1000057854,
            name: '大学生该不该创业？',
            videoId: null,
            videoSec: null,
            videoSmallLessons: [
              { id: 1000053723, name: '大学生该不该创业？（上）', videoId: 66908177, videoSec: 680 },
              { id: 1000053724, name: '大学生该不该创业？（下）', videoId: 66908178, videoSec: 500 },
            ],
          },
        ],
      },
      { id: 1000051932, name: '创新的机会', videoLessons: [] },
    ],
  },
};

const STUDY_INFO = {
  data: {
    lesson: {
      '1000057846': { watchState: 1, studyTotalTime: 408 },
    },
    lv: {
      '1000053723': { watchState: 0, studyTotalTime: 0 },
      '1000053724': { watchState: 1, studyTotalTime: 500 },
    },
  },
};

describe('getCourseUnits', () => {
  it('拍平章节并有子节位次映射（子节：lessonId=父、smallLessonId=自己）', async () => {
    const { client } = fakeClient({ videoList: CHAPTERS, studyInfo: STUDY_INFO });
    const units = await getCourseUnits(client, { recruitAndCourseId: 'hex', recruitId: 473301 });
    expect(units).toHaveLength(3);
    expect(units[0]).toMatchObject({ lessonId: 1000057846, smallLessonId: 0, videoId: 66907961, sec: 501 });
    expect(units[1]).toMatchObject({ lessonId: 1000057854, smallLessonId: 1000053723, sec: 680 });
    expect(units[2]).toMatchObject({ lessonId: 1000057854, smallLessonId: 1000053724, sec: 500 });
  });

  it('两表合并出完成状态与累计秒（lesson + lv）', async () => {
    const { client } = fakeClient({ videoList: CHAPTERS, studyInfo: STUDY_INFO });
    const units = await getCourseUnits(client, { recruitAndCourseId: 'hex', recruitId: 473301 });
    expect(units[0]).toMatchObject({ done: true, studyTotalTime: 408 });
    expect(units[1]).toMatchObject({ done: false, studyTotalTime: 0 });
    expect(units[2]).toMatchObject({ done: true, studyTotalTime: 500 });
  });

  it('学情请求载荷与真实浏览器同形：lessonIds 含全部父课时（含有子节的），子节表非空才附', async () => {
    const { client, calls } = fakeClient({ videoList: CHAPTERS, studyInfo: STUDY_INFO });
    await getCourseUnits(client, { recruitAndCourseId: 'hex', recruitId: 473301 });
    const info = calls.find((c) => c.name === 'studyInfo');
    expect(info?.payload).toEqual({
      // 金样本解密实证：站点对每个 videoLesson 都进 lessonIds（59/59）
      lessonIds: [1000057846, 1000057854],
      recruitId: 473301,
      lessonVideoIds: [1000053723, 1000053724],
    });
  });

  it('没有子节的课不带 lessonVideoIds（站点语义：空数组不上线）', async () => {
    const plain = {
      data: {
        videoChapterDtos: [
          { id: 1, name: '章', videoLessons: [{ id: 7, name: '课', videoId: 77, videoSec: 100, videoSmallLessons: null }] },
        ],
      },
    };
    const { client, calls } = fakeClient({ videoList: plain, studyInfo: { data: { lesson: {}, lv: {} } } });
    await getCourseUnits(client, { recruitAndCourseId: 'hex', recruitId: 1 });
    const info = calls.find((c) => c.name === 'studyInfo');
    expect(info?.payload).toEqual({ lessonIds: [7], recruitId: 1 });
  });

  it('学情缺项时按未完成、零累计处理（新课时在平台上正是这个状态）', async () => {
    const { client } = fakeClient({ videoList: CHAPTERS, studyInfo: { data: { lesson: {}, lv: {} } } });
    const units = await getCourseUnits(client, { recruitAndCourseId: 'hex', recruitId: 1 });
    expect(units.every((unit) => unit.done === false && unit.studyTotalTime === 0)).toBe(true);
  });
});

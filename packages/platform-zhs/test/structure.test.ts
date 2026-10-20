/* 任务树合并：拍平（含子节位次映射）、学情两表合并、学情请求载荷。 */

import { describe, expect, it } from 'vitest';
import { chapterExams, getCourseUnits, readCourseChapters } from '../src/structure.ts';
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
        id: 2000000001,
        name: '示例绪论',
        videoLessons: [
          { id: 3000000001, name: '示例绪论', videoId: 500000001, videoSec: 501, videoSmallLessons: null },
        ],
      },
      {
        id: 2000000002,
        name: '示例章节一？',
        videoLessons: [
          {
            id: 3000000002,
            name: '示例课时甲',
            videoId: null,
            videoSec: null,
            videoSmallLessons: [
              { id: 4000000001, name: '示例课时甲（上）', videoId: 500000002, videoSec: 680 },
              { id: 4000000002, name: '示例课时甲（下）', videoId: 500000003, videoSec: 500 },
            ],
          },
        ],
      },
      { id: 2000000003, name: '示例章节二', videoLessons: [] },
    ],
  },
};

const STUDY_INFO = {
  data: {
    lesson: {
      '3000000001': { watchState: 1, studyTotalTime: 408 },
    },
    lv: {
      '4000000001': { watchState: 0, studyTotalTime: 0 },
      '4000000002': { watchState: 1, studyTotalTime: 500 },
    },
  },
};

describe('readCourseChapters', () => {
  it('响应里没有 videoChapterDtos：抛错，不交空表冒充「这门课没有章节」', async () => {
    // 空表会让课件、章节测验、进度全都不进计划，而一句错误也不说
    const empty = fakeClient({ videoList: { code: 200, data: {} } });
    await expect(
      readCourseChapters(empty.client, { recruitAndCourseId: 'abc', recruitId: 1 }),
    ).rejects.toThrow(/videoChapterDtos/);

    const noData = fakeClient({ videoList: { code: 200 } });
    await expect(
      readCourseChapters(noData.client, { recruitAndCourseId: 'abc', recruitId: 1 }),
    ).rejects.toThrow(/videoChapterDtos/);
  });

  it('真·空章节表照原样交出（那是这门课的结构确实没有章节）', async () => {
    const ok = fakeClient({ videoList: { code: 200, data: { videoChapterDtos: [] } } });
    await expect(
      readCourseChapters(ok.client, { recruitAndCourseId: 'abc', recruitId: 1 }),
    ).resolves.toEqual([]);
  });
});

describe('getCourseUnits', () => {
  it('拍平章节并有子节位次映射（子节：lessonId=父、smallLessonId=自己）', async () => {
    const { client } = fakeClient({ videoList: CHAPTERS, studyInfo: STUDY_INFO });
    const units = await getCourseUnits(client, { recruitAndCourseId: 'hex', recruitId: 470001 });
    expect(units).toHaveLength(3);
    expect(units[0]).toMatchObject({ lessonId: 3000000001, smallLessonId: 0, videoId: 500000001, sec: 501 });
    expect(units[1]).toMatchObject({ lessonId: 3000000002, smallLessonId: 4000000001, sec: 680 });
    expect(units[2]).toMatchObject({ lessonId: 3000000002, smallLessonId: 4000000002, sec: 500 });
  });

  it('两表合并出完成状态与累计秒（lesson + lv）', async () => {
    const { client } = fakeClient({ videoList: CHAPTERS, studyInfo: STUDY_INFO });
    const units = await getCourseUnits(client, { recruitAndCourseId: 'hex', recruitId: 470001 });
    expect(units[0]).toMatchObject({ done: true, studyTotalTime: 408 });
    expect(units[1]).toMatchObject({ done: false, studyTotalTime: 0 });
    expect(units[2]).toMatchObject({ done: true, studyTotalTime: 500 });
  });

  it('学情请求载荷与真实浏览器同形：lessonIds 含全部父课时（含有子节的），子节表非空才附', async () => {
    const { client, calls } = fakeClient({ videoList: CHAPTERS, studyInfo: STUDY_INFO });
    await getCourseUnits(client, { recruitAndCourseId: 'hex', recruitId: 470001 });
    const info = calls.find((c) => c.name === 'studyInfo');
    expect(info?.payload).toEqual({
      // 金样本解密实证：站点对每个 videoLesson 都进 lessonIds（59/59）
      lessonIds: [3000000001, 3000000002],
      recruitId: 470001,
      lessonVideoIds: [4000000001, 4000000002],
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

  it('传入已读的章节表就不再读 videolist（每门课一次结构读取）', async () => {
    const { client, calls } = fakeClient({ videoList: CHAPTERS, studyInfo: STUDY_INFO });
    const chapters = await readCourseChapters(client, { recruitAndCourseId: 'hex', recruitId: 1 });
    await getCourseUnits(client, { recruitAndCourseId: 'hex', recruitId: 1 }, chapters);
    expect(calls.filter((c) => c.name === 'videoList')).toHaveLength(1);
  });
});

describe('chapterExams', () => {
  // 形态取自实测样本 .probe/zhs-ctm-videolist.json（第一章）
  const withExams = [
    {
      id: 2000000009,
      name: '第一章',
      videoLessons: [{ id: 3000000001, name: '示例绪论', videoId: 500000001, videoSec: 501 }],
      studentExamDto: {
        id: 6200000002,
        state: 1,
        exam: { id: 61000001, type: 1 },
        examUrl: '//onlineexamh5new.zhihuishu.com/stuExamWeb.html#/webExamList/dohomework/470001/AbCd0003/FfGh0004/1000009999/1001/0',
      },
    },
  ];

  it('四个 id 都取到：路线段给 8 字符串，DTO 给数字那对', () => {
    expect(chapterExams(withExams)).toEqual([
      {
        chapterName: '第一章',
        listId: 'AbCd0003',
        examKey: 'FfGh0004',
        examId: 61000001,
        stuExamId: 6200000002,
        schoolId: 1001,
        lessonId: 3000000001,
      },
    ]);
  });

  it('没有 studentExamDto 的章节不进表', () => {
    expect(chapterExams([{ id: 1, name: '第二章' }])).toEqual([]);
  });

  it('已交章节的 checkHomework 路由同样解析（段位与 dohomework 一致，末尾少一个 N）', () => {
    const done = [
      {
        ...withExams[0],
        studentExamDto: {
          ...withExams[0]!.studentExamDto,
          state: 4,
          examUrl:
            '//onlineexamh5new.zhihuishu.com/stuExamWeb.html#/webExamList/checkHomework/470001/AbCd0003/FfGh0004/1000009999/1001',
        },
      },
    ];
    expect(chapterExams(done)).toEqual([
      {
        chapterName: '第一章',
        listId: 'AbCd0003',
        examKey: 'FfGh0004',
        examId: 61000001,
        stuExamId: 6200000002,
        schoolId: 1001,
        lessonId: 3000000001,
      },
    ]);
  });

  it('examUrl 形态不符（两个路由词都找不到）跳过，不去猜', () => {
    const broken = [{ ...withExams[0], studentExamDto: { ...withExams[0]!.studentExamDto, examUrl: 'https://example.com/x' } }];
    expect(chapterExams(broken)).toEqual([]);
  });

  it('数字 id 缺失（exam.id 不在）跳过——神谕没有入参就不能用', () => {
    const broken = [{ ...withExams[0], studentExamDto: { id: 6200000002, examUrl: withExams[0]!.studentExamDto.examUrl } }];
    expect(chapterExams(broken)).toEqual([]);
  });
});

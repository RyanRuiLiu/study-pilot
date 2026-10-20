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
        id: 9000000005,
        name: '导论',
        videoLessons: [
          { id: 9000000011, name: '导论', videoId: 90000003, videoSec: 501, videoSmallLessons: null },
        ],
      },
      {
        id: 9000000006,
        name: '示例问题乙？',
        videoLessons: [
          {
            id: 9000000012,
            name: '示例问题丙？',
            videoId: null,
            videoSec: null,
            videoSmallLessons: [
              { id: 9000000009, name: '示例问题丙？（上）', videoId: 90000004, videoSec: 680 },
              { id: 9000000010, name: '示例问题丙？（下）', videoId: 90000005, videoSec: 500 },
            ],
          },
        ],
      },
      { id: 9000000007, name: '创新的机会', videoLessons: [] },
    ],
  },
};

const STUDY_INFO = {
  data: {
    lesson: {
      '9000000011': { watchState: 1, studyTotalTime: 408 },
    },
    lv: {
      '9000000009': { watchState: 0, studyTotalTime: 0 },
      '9000000010': { watchState: 1, studyTotalTime: 500 },
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
    const units = await getCourseUnits(client, { recruitAndCourseId: 'hex', recruitId: 900003 });
    expect(units).toHaveLength(3);
    expect(units[0]).toMatchObject({ lessonId: 9000000011, smallLessonId: 0, videoId: 90000003, sec: 501 });
    expect(units[1]).toMatchObject({ lessonId: 9000000012, smallLessonId: 9000000009, sec: 680 });
    expect(units[2]).toMatchObject({ lessonId: 9000000012, smallLessonId: 9000000010, sec: 500 });
  });

  it('两表合并出完成状态与累计秒（lesson + lv）', async () => {
    const { client } = fakeClient({ videoList: CHAPTERS, studyInfo: STUDY_INFO });
    const units = await getCourseUnits(client, { recruitAndCourseId: 'hex', recruitId: 900003 });
    expect(units[0]).toMatchObject({ done: true, studyTotalTime: 408 });
    expect(units[1]).toMatchObject({ done: false, studyTotalTime: 0 });
    expect(units[2]).toMatchObject({ done: true, studyTotalTime: 500 });
  });

  it('学情请求载荷与真实浏览器同形：lessonIds 含全部父课时（含有子节的），子节表非空才附', async () => {
    const { client, calls } = fakeClient({ videoList: CHAPTERS, studyInfo: STUDY_INFO });
    await getCourseUnits(client, { recruitAndCourseId: 'hex', recruitId: 900003 });
    const info = calls.find((c) => c.name === 'studyInfo');
    expect(info?.payload).toEqual({
      // 金样本解密实证：站点对每个 videoLesson 都进 lessonIds（59/59）
      lessonIds: [9000000011, 9000000012],
      recruitId: 900003,
      lessonVideoIds: [9000000009, 9000000010],
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
      id: 9000000008,
      name: '第一章',
      videoLessons: [{ id: 9000000011, name: '导论', videoId: 90000003, videoSec: 501 }],
      studentExamDto: {
        id: 9000000037,
        state: 1,
        exam: { id: 90000006, type: 1 },
        examUrl: '//onlineexamh5new.zhihuishu.com/stuExamWeb.html#/webExamList/dohomework/900004/DEMOc003/DEMOd004/9000000002/9001/0',
      },
    },
  ];

  it('四个 id 都取到：路线段给 8 字符串，DTO 给数字那对', () => {
    expect(chapterExams(withExams)).toEqual([
      {
        chapterName: '第一章',
        listId: 'DEMOc003',
        examKey: 'DEMOd004',
        examId: 90000006,
        stuExamId: 9000000037,
        schoolId: 9001,
        lessonId: 9000000011,
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
            '//onlineexamh5new.zhihuishu.com/stuExamWeb.html#/webExamList/checkHomework/900004/DEMOc003/DEMOd004/9000000002/9001',
        },
      },
    ];
    expect(chapterExams(done)).toEqual([
      {
        chapterName: '第一章',
        listId: 'DEMOc003',
        examKey: 'DEMOd004',
        examId: 90000006,
        stuExamId: 9000000037,
        schoolId: 9001,
        lessonId: 9000000011,
      },
    ]);
  });

  it('examUrl 形态不符（两个路由词都找不到）跳过，不去猜', () => {
    const broken = [{ ...withExams[0], studentExamDto: { ...withExams[0]!.studentExamDto, examUrl: 'https://example.com/x' } }];
    expect(chapterExams(broken)).toEqual([]);
  });

  it('数字 id 缺失（exam.id 不在）跳过——神谕没有入参就不能用', () => {
    const broken = [{ ...withExams[0], studentExamDto: { id: 9000000037, examUrl: withExams[0]!.studentExamDto.examUrl } }];
    expect(chapterExams(broken)).toEqual([]);
  });
});

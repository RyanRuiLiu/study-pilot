/*
 * 待办里的单元测试那一类：收集判据、与执行侧同源、读不成如实上报。
 *
 * 这一层没有 DOM，纯接口替身就能核对——判据错了界面上就会多列或少列，
 * 而那正是「可执行但看不见」那类缺陷的入口。
 */

import { describe, expect, it } from 'vitest';
import { collectQuizzes, collectUnits } from '../src/adapters/zhihuishu/messages/reads.ts';
import type { ZhihuishuCourse } from '@study-pilot/application';
import type { ZhsClient } from '@study-pilot/platform-zhs';

const COURSE: ZhihuishuCourse = {
  courseId: 9000000002,
  recruitId: 900004,
  secret: 'hex-secret',
  name: '示例课程己',
  schoolName: '示例大学',
  startTime: 0,
  endTime: 0,
  enabled: true,
};

/** 章节表：只给一章，带 studentExamDto（listId 必须与清单条目对上）。 */
const CHAPTERS = {
  data: {
    videoChapterDtos: [
      {
        id: 9000000008,
        name: '第三章',
        videoLessons: [{ id: 1000058308, name: '课', videoId: 1, videoSec: 100, videoSmallLessons: null }],
        studentExamDto: {
          id: 9000000036,
          state: 1,
          exam: { id: 90000007, type: 1 },
          examUrl:
            '//onlineexamh5new.zhihuishu.com/stuExamWeb.html#/webExamList/dohomework/900004/DEMOa001/DEMOb002/9000000002/9001/0',
        },
      },
    ],
  },
};

const ITEM = (over: Record<string, unknown> = {}): Record<string, unknown> => ({
  id: 'DEMOa001',
  examId: 'DEMOb002',
  examName: '第三章单元测试',
  meetCourseType: 0,
  state: 1,
  cpOrderNumber: '第三章',
  score: null,
  totalScore: '100',
  ...over,
});

function fakeClient(overrides: Partial<Record<string, unknown>> = {}, failOn?: string): ZhsClient {
  return {
    call: async (name) => {
      if (name === failOn) throw new Error('平台拒绝了这次读取');
      const table: Record<string, unknown> = {
        videoList: CHAPTERS,
        // 收集路径先走单元那一遍（videolist + 学情），章节表由它交出复用
        studyInfo: { data: { lesson: {}, lv: {} } },
        examHomeworkList: { rt: { result: 'success', next: -1, studentHomeworkList: [ITEM(), ...(overrides.list as [] ?? [])] } },
      };
      if (!(name in table)) throw new Error(`假 client 没有登记 ${name}`);
      return table[name];
    },
  };
}

/** 走一遍真实的收集路径（章节表由单元那一遍交出复用），拿到喂给测验那一步的入参。 */
async function oneCourse(client: ZhsClient, course: ZhihuishuCourse = COURSE) {
  const [collected] = await collectUnits(client, [course]);
  return collected!;
}

describe('collectQuizzes', () => {
  it('列出未交且没动过的单元测试（与执行侧同一条判据）', async () => {
    const [result] = await collectQuizzes(fakeClient(), [await oneCourse(fakeClient())]);
    expect(result!.unreadReason).toBeNull();
    expect(result!.items.map((item) => item.examName)).toEqual(['第三章单元测试']);
  });

  it('已交 / 状态非 1 / 见面课测验都不列', async () => {
    const client: ZhsClient = {
      call: async (name) => {
        if (name === 'videoList') return CHAPTERS;
        return {
          rt: {
            studentHomeworkList: [
              ITEM({ id: 'a', state: 4 }),
              ITEM({ id: 'b', state: 5 }),
              ITEM({ id: 'c', meetCourseType: 1 }),
            ],
          },
        };
      },
    };
    const [result] = await collectQuizzes(client, [await oneCourse(client)]);
    expect(result!.items).toEqual([]);
  });

  it('对不上章节的条目不列（拿不到数字卷号就执行不了，列出来是空头支票）', async () => {
    const client: ZhsClient = {
      call: async (name) => {
        if (name === 'videoList') return CHAPTERS;
        return { rt: { studentHomeworkList: [ITEM({ id: '不在章节表里的id' })] } };
      },
    };
    const [result] = await collectQuizzes(client, [await oneCourse(client)]);
    expect(result!.items).toEqual([]);
  });

  it('读不成如实带原因回来，不静默少列', async () => {
    const [result] = await collectQuizzes(fakeClient({}, 'examHomeworkList'), [await oneCourse(fakeClient({}, 'examHomeworkList'))]);
    expect(result!.items).toEqual([]);
    expect(result!.unreadReason).toBe('平台拒绝了这次读取');
  });

  it('缺入口参数的课直接跳过，不当作失败', async () => {
    const [result] = await collectQuizzes(fakeClient(), [await oneCourse(fakeClient(), { ...COURSE, secret: '' })]);
    expect(result!.items).toEqual([]);
    expect(result!.unreadReason).toBeNull();
  });
});

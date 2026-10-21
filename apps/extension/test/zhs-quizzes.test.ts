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
  courseId: 1000009999,
  recruitId: 470001,
  secret: 'hex-secret',
  name: '示例课程甲',
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
        id: 2000000009,
        name: '第三章',
        videoLessons: [{ id: 1000058308, name: '课', videoId: 1, videoSec: 100, videoSmallLessons: null }],
        studentExamDto: {
          id: 6200000001,
          state: 1,
          exam: { id: 61000002, type: 1 },
          examUrl:
            '//onlineexamh5new.zhihuishu.com/stuExamWeb.html#/webExamList/dohomework/470001/AbCd0001/FfGh0002/1000009999/1001/0',
        },
      },
    ],
  },
};

const ITEM = (over: Record<string, unknown> = {}): Record<string, unknown> => ({
  id: 'AbCd0001',
  examId: 'FfGh0002',
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

  it('判据与执行侧同源：已交（state=4）不列，重做已申请（state=5）照列，见面课测验同判据', async () => {
    /*
     * 这一组曾经把三条都断言成「不列」，而它们只是 **id 对不上章节** 才没进表——
     * 标题说的判据一条都没被验到。state=5 是「重做已申请、新答卷未交」，
     * `needsWork` 收它、计划也收它；见面课测验与单元测试在同一个清单、同一套
     * state 里，执行侧从不按题型分（见 tasks.ts ① 的注释）。这里逐条钉死，
     * 夹具的 id 都取章节表里的那一个，避免再被「对不上章节」掩盖。
     */
    const itemsOf = async (over: Record<string, unknown>) => {
      const client: ZhsClient = {
        call: async (name) => {
          if (name === 'videoList') return CHAPTERS;
          return { rt: { studentHomeworkList: [ITEM(over)] } };
        },
      };
      const [result] = await collectQuizzes(client, [await oneCourse(client)]);
      return result!.items;
    };

    expect(await itemsOf({ state: 4 })).toEqual([]);
    expect(await itemsOf({ state: 5 })).toHaveLength(1);
    expect(await itemsOf({ meetCourseType: 1 })).toHaveLength(1);
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

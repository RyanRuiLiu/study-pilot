/*
 * 设置页「课程任务」：成绩构成组件的计数与两种降级。
 *
 * 计数是用户会照着做决定的数（「还剩多少没完成」），所以判据要在这一层钉住：
 * 分母漏掉已交页签会让进度永远到不了满分；把读失败变成 0/0 会让人以为
 * 这门课没有测试。两种都是「界面看起来正常，数字是错的」，最难在生产里发现。
 */

import { describe, expect, it } from 'vitest';
import { countUnitTests, reportPageUrl } from '../src/adapters/zhihuishu/messages/reads.ts';
import { zhsCourseTasksCommand } from '../src/adapters/zhihuishu/messages/course-tasks.ts';
import type { ZhsCourseTaskSummary } from '../src/adapters/zhihuishu/messages/payload.ts';
import type { ZhsMessageDeps } from '../src/adapters/zhihuishu/messages/deps.ts';
import type { QueryOutcome } from '../src/protocol.ts';
import type { ZhsExamListItem } from '@study-pilot/platform-zhs';

/** 一条作业清单条目：只给本测试用得到的字段。 */
function item(over: Partial<ZhsExamListItem> = {}): ZhsExamListItem {
  return {
    id: 'a',
    examId: 'x',
    examName: '第一章单元测试',
    meetCourseType: 0,
    state: 1,
    score: null,
    totalScore: 100,
    chapterName: '第一章',
    problemNum: 50,
    deadline: null,
    ...over,
  };
}

describe('countUnitTests', () => {
  it('两页签合计：分母含已交的那些（只在未交页签里数就到不了满分）', () => {
    const counted = countUnitTests({
      pending: [item({ id: 'a' }), item({ id: 'b' })],
      submitted: [item({ id: 'c', state: 4 })],
    });
    expect(counted).toEqual({ done: 1, total: 3 });
  });

  it('只数单元测试：见面课测验是另一个组件', () => {
    const counted = countUnitTests({
      pending: [item({ id: 'a' })],
      submitted: [item({ id: 'm', state: 4, meetCourseType: 1 })],
    });
    expect(counted).toEqual({ done: 0, total: 1 });
  });

  it('同一 id 出现在两页签时只算一次，且以已交页签为准', () => {
    const counted = countUnitTests({
      pending: [item({ id: 'a' }), item({ id: 'b' })],
      submitted: [item({ id: 'a', state: 4 })],
    });
    expect(counted).toEqual({ done: 1, total: 2 });
  });

  it('两页签都空时是 0/0（不是 0/1 之类凑出来的形状）', () => {
    expect(countUnitTests({ pending: [], submitted: [] })).toEqual({ done: 0, total: 0 });
  });
});

describe('reportPageUrl', () => {
  it('指向平台成绩分析页，带上两个必需参数', () => {
    expect(reportPageUrl(473310, 1000006163)).toBe(
      'https://stuonline.zhihuishu.com/stuonline/stuLearnReportNew/index?recruitId=473310&courseId=1000006163',
    );
  });
});

/* ---------- 处理器：两种降级各走一遍 ---------- */

const COURSE = {
  courseId: 1000006163,
  recruitId: 473310,
  secret: 'hex-secret',
  name: '创造性思维与创新方法',
  schoolName: '大连民族大学',
  progressText: '83.2%',
  enabled: true,
};

const CHAPTERS = {
  data: {
    videoChapterDtos: [
      {
        id: 1,
        name: '第一章',
        videoLessons: [
          { id: 11, name: '课一', videoId: 1, videoSec: 100, videoSmallLessons: null },
          { id: 12, name: '课二', videoId: 2, videoSec: 200, videoSmallLessons: null },
        ],
        studentExamDto: null,
      },
    ],
  },
};

/**
 * 假 client：结构那一遍照常，作业清单按 flag 分。
 *
 * `failExam` 让作业清单那一族抛错——用来走「只有测试读不成」那条降级。
 */
function fakeDeps(failExam = false): ZhsMessageDeps {
  return {
    config: {
      read: async () => ({ zhihuishu: { courses: [COURSE] } }),
    } as unknown as ZhsMessageDeps['config'],
    readCookie: async () => JSON.stringify({ uuid: 'dev-1' }),
    refreshCourses: async () => ({ ok: true, courses: [COURSE] }),
    client: {
      call: async (name: string, params: Record<string, unknown>) => {
        if (name === 'videoList') return CHAPTERS;
        // 学情表按 **lessonId** 索引（见 structure.ts 的 marks）：11 = 上面第一节课
        if (name === 'studyInfo') return { data: { lesson: { 11: { watchState: 1 } }, lv: {} } };
        if (name === 'examHomeworkList') {
          if (failExam) throw new Error('平台拒绝了这次读取');
          return params.flag === 2
            ? { rt: { studentHomeworkList: [{ id: 'c', examId: 'z', examName: '第三章单元测试', meetCourseType: 0, state: 4, score: '100', totalScore: '100', cpOrderNumber: '第三章' }] } }
            : { rt: { studentHomeworkList: [{ id: 'b', examId: 'y', examName: '第二章单元测试', meetCourseType: 0, state: 1, score: null, totalScore: '100', cpOrderNumber: '第二章' }] } };
        }
        throw new Error(`假 client 没有登记 ${name}`);
      },
    } as unknown as ZhsMessageDeps['client'],
  };
}

async function run(deps: ZhsMessageDeps): Promise<QueryOutcome<ZhsCourseTaskSummary>> {
  let out: QueryOutcome<ZhsCourseTaskSummary> | undefined;
  await zhsCourseTasksCommand(deps)({ type: 'ZHS_COURSE_TASKS' }, (response) => {
    out = response as QueryOutcome<ZhsCourseTaskSummary>;
  });
  if (out === undefined) throw new Error('处理器没有回响应');
  return out;
}

describe('zhsCourseTasksCommand', () => {
  it('报出视频与测试两半，待完成数是两半之和', async () => {
    const outcome = await run(fakeDeps());
    expect(outcome.status).toBe('ok');
    const [course] = (outcome as { value: ZhsCourseTaskSummary }).value.courses;
    expect(course!.video).toEqual({ done: 1, total: 2 });
    expect(course!.quiz).toEqual({ done: 1, total: 2 });
    // 视频未看 1 + 测试未交 1
    expect(course!.pending).toBe(2);
    expect(course!.quizUnreadReason).toBeNull();
  });

  it('测试那两页签读不成：视频照常报数，测试给原因，不拿 0/0 冒充', async () => {
    const outcome = await run(fakeDeps(true));
    const [course] = (outcome as { value: ZhsCourseTaskSummary }).value.courses;
    expect(course!.video).toEqual({ done: 1, total: 2 });
    expect(course!.quizUnreadReason).toBe('平台拒绝了这次读取');
    // 待完成里只算视频那半——少算的部分由 quizUnreadReason 明说
    expect(course!.pending).toBe(1);
  });

  it('每门课都给出成绩分析页的地址（读不到结构也给，那门课仍打得开）', async () => {
    const outcome = await run(fakeDeps());
    const [course] = (outcome as { value: ZhsCourseTaskSummary }).value.courses;
    expect(course!.reportUrl).toContain('stuLearnReportNew');
    expect(course!.reportUrl).toContain('recruitId=473310');
  });
});

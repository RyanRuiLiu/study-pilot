/*
 * ZHS_COURSE_TASKS：每门勾选课程的成绩构成组件进度（只读）。
 *
 * 「课程任务」是设置页那张卡的名字，也是这个命令的名字——**没有「课件」一说**：
 * 智慧树的任务不套慕课那套「课件/待办」二分，它的组件由平台自己给
 * （设计文档 §2：按成绩构成组织；组件与官方口径见 §1.2）。
 *
 * 每门课要两样读：结构（视频单元的完成数）＋ 作业清单的两个页签（测试的完成数）。
 * 结构与待办那一遍同源（都走 `collectUnits`）；作业清单另读一次两页签——
 * 待办只列「执行会动的」，**进度要的是全部**。同一份判据两处用，
 * 进度就永远到不了满分。
 *
 * 两样读各有各的失败：结构读不成 → 整门课 unread；只有测试那两页签读不成 →
 * 视频那半照常报数，测试那半给原因。**不许把读失败悄悄变成 0/0**：
 * 那会让人以为这门课没有测试。
 *
 * 未登录与读取失败分开说（与慕课同一条）：未登录不是出错，是少做了一步，
 * 界面据此给去处；失败给原因。
 */

import type { MessageHandler, QueryOutcome } from '../../../protocol.ts';
import type { ZhihuishuCourse } from '@study-pilot/application';
import { readSession, selectedCourses } from '@study-pilot/platform-zhs';
import type { ZhsMessageDeps } from './deps.ts';
import type { ZhsCourseTask, ZhsCourseTaskSummary, ZhsResponseMap } from './payload.ts';
import { collectUnits, countUnitTests, readCourseExams, reportPageUrl } from './reads.ts';

/**
 * 整门课都没读成时那份：数字一律 0 且 unread 为真。
 *
 * 数字给 0 是形状需要（每个字段都得有值），**界面按 unread 关掉数字位**——
 * 这才是「不拿全 0 冒充这门课没有内容」的落点。成绩分析页仍给：
 * 读不到结构不代表那门课打不开。
 */
function unreadCourse(course: ZhihuishuCourse): ZhsCourseTask {
  return {
    courseId: course.courseId,
    courseName: course.name,
    reportUrl: reportPageUrl(course.recruitId, course.courseId),
    video: { done: 0, total: 0 },
    quiz: { done: 0, total: 0 },
    quizUnreadReason: null,
    pending: 0,
    unread: true,
  };
}

export function zhsCourseTasksCommand(deps: ZhsMessageDeps): MessageHandler {
  return async (_request, sendResponse) => {
    const respond = (outcome: QueryOutcome<ZhsCourseTaskSummary>): void => {
      sendResponse(outcome satisfies ZhsResponseMap['ZHS_COURSE_TASKS']);
    };

    const session = await readSession(deps.readCookie);
    if (!session.loggedIn) {
      respond({ status: 'error', message: '未登录', reason: 'NOT_LOGGED_IN' });
      return;
    }

    try {
      const settings = await deps.config.read();
      const enabled = selectedCourses(settings);
      const collected = await collectUnits(deps.client, enabled);

      let pendingTotal = 0;
      const courses: ZhsCourseTask[] = [];
      for (const entry of collected) {
        const { course } = entry;
        if (entry.unreadReason !== null) {
          courses.push(unreadCourse(course));
          continue;
        }

        const videoDone = entry.units.filter((unit) => unit.done).length;

        let quiz = { done: 0, total: 0 };
        let quizUnreadReason: string | null = null;
        try {
          quiz = countUnitTests(await readCourseExams(deps.client, course));
        } catch (error) {
          quizUnreadReason = error instanceof Error ? error.message : String(error);
        }

        /*
         * 待完成 = 视频未看 + 单元测试未交。测试没读成时这一项**只算视频那半**，
         * 少算的部分由 quizUnreadReason 明说——宁可让人看见「有一半没读到」，
         * 也不要端一个假装完整的数出来。
         */
        const pending =
          entry.units.length - videoDone + (quizUnreadReason === null ? quiz.total - quiz.done : 0);
        pendingTotal += pending;

        courses.push({
          courseId: course.courseId,
          courseName: course.name,
          reportUrl: reportPageUrl(course.recruitId, course.courseId),
          video: { done: videoDone, total: entry.units.length },
          quiz,
          quizUnreadReason,
          pending,
        });
      }
      respond({ status: 'ok', value: { courses, pendingTotal } });
    } catch (error) {
      respond({ status: 'error', message: error instanceof Error ? error.message : String(error) });
    }
  };
}

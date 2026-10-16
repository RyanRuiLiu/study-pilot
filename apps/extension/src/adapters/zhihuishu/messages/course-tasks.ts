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
import { collectUnits, countNotFullUnitTests, countUnitTests, readCourseExams, readFinalExam } from './reads.ts';
import { examListUrl, reportPageUrl, studyPageUrl } from '../pages.ts';

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
    quizNotFull: 0,
    quizUnreadReason: null,
    finalExam: null,
    finalExamNote: null,
    examListUrl: examListUrl(course.recruitId),
    studyUrl: studyPageUrl(course.secret),
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

      /*
       * `complete` = 这门课的每一半都读到了。只要有课没读全，汇总数就**不报**
       * （给 null）——那时它只是一个下界，报出去等于把「有东西没读到」折成
       * 一个看起来确定的数。哪一门、哪一半没读到，由各自的卡说清。
       */
      let pendingTotal = 0;
      /** 有课没读全：汇总数这时只是下界，不报出去（见 respond 处） */
      let partial = false;
      const courses: ZhsCourseTask[] = [];
      for (const entry of collected) {
        const { course } = entry;
        if (entry.unreadReason !== null) {
          partial = true;
          courses.push(unreadCourse(course));
          continue;
        }

        const videoDone = entry.units.filter((unit) => unit.done).length;

        let quiz = { done: 0, total: 0 };
        let quizNotFull = 0;
        let quizUnreadReason: string | null = null;
        try {
          const tabs = await readCourseExams(deps.client, course);
          quiz = countUnitTests(tabs);
          quizNotFull = countNotFullUnitTests(tabs);
        } catch (error) {
          quizUnreadReason = error instanceof Error ? error.message : String(error);
          partial = true;
        }

        /*
         * 期末考试：与待办共用一份读取（reads.ts 的 readFinalExam）——先问形态，
         * 只有「在线」那条分支才在这条接口上；读不到就如实说，不让空着替数据说话。
         */
        let finalExam: ZhsCourseTask['finalExam'] = null;
        let finalExamNote: string | null = null;
        try {
          const reading = await readFinalExam(deps.client, course);
          finalExamNote = reading.note;
          if (reading.exam !== null) {
            finalExam = {
              examName: reading.exam.examName,
              state: reading.exam.state,
              startAt: reading.exam.startAt,
              endAt: reading.exam.endAt,
              remainCount: reading.exam.remainCount,
            };
          }
        } catch (error) {
          finalExamNote = `期末读取失败：${error instanceof Error ? error.message : String(error)}`;
          partial = true;
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
          quizNotFull,
          quizUnreadReason,
          finalExam,
          finalExamNote,
          examListUrl: examListUrl(course.recruitId),
          studyUrl: studyPageUrl(course.secret),
          pending,
        });
      }
      respond({ status: 'ok', value: { courses, pendingTotal: partial ? null : pendingTotal } });
    } catch (error) {
      respond({ status: 'error', message: error instanceof Error ? error.message : String(error) });
    }
  };
}

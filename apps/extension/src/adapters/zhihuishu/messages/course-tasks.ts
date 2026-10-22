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
import {
  chapterExams,
  getMeetSessions,
  HOMEWORK_STATE,
  needsWork,
  probeSession,
  quizItemId,
  readSession,
  selectedCourses,
  unitItemId,
  ZHS_SESSION_EXPIRED,
  ZhsAuthError,
} from '@study-pilot/platform-zhs';
import type { ZhsMessageDeps } from './deps.ts';
import type { ZhsCourseTask, ZhsCourseTaskSummary, ZhsResponseMap } from './payload.ts';
import { collectUnits, countMeetQuizzes, countNotFullUnitTests, countUnitTests, readCourseExams, readFinalExam } from './reads.ts';
import { examListUrl, studyPageUrl } from '../pages.ts';

/**
 * 整门课都没读成时那份：数字一律 0 且 unread 为真。
 *
 * 数字给 0 是形状需要（每个字段都得有值），**界面按 unread 关掉数字位**——
 * 这才是「不拿全 0 冒充这门课没有内容」的落点。成绩分析页仍给：
 * 读不到结构不代表那门课打不开。
 */
async function unreadCourse(course: ZhihuishuCourse): Promise<ZhsCourseTask> {
  return {
    courseId: course.courseId,
    recruitId: course.recruitId,
    courseName: course.name,
    video: { done: 0, total: 0 },
    videoItemIds: [],
    quiz: { done: 0, total: 0 },
    quizItemIds: [],
    quizNotFull: 0,
    meet: { done: 0, total: 0 },
    meetSessions: null,
    meetSessionsNote: null,
    quizUnreadReason: null,
    finalExam: null,
    finalExamNote: null,
    examListUrl: await examListUrl(course.recruitId, studyPageUrl(course.secret)),
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
    /*
     * 先问服务端再动手读：cookie 在、会话已死时，逐课去读要几秒，读完才整块清空——
     * 界面上就是「先闪出一堆内容再消失」。判定放在最前，卡片从骨架直接落到终态。
     */
    if ((await probeSession(deps.client)) === 'auth') {
      respond({ status: 'error', message: ZHS_SESSION_EXPIRED, reason: 'NOT_LOGGED_IN' });
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
          courses.push(await unreadCourse(course));
          continue;
        }

        const videoDone = entry.units.filter((unit) => unit.done).length;
        // 与计划同一条判据：没看完的视频单元都进课件项（id 取名规则在平台包里）
        const videoItemIds = entry.units.filter((unit) => !unit.done).map(unitItemId);

        let quiz = { done: 0, total: 0 };
        let quizItemIds: string[] = [];
        let quizNotFull = 0;
        let meet = { done: 0, total: 0 };
        let quizUnreadReason: string | null = null;
        try {
          const tabs = await readCourseExams(deps.client, course);
          quiz = countUnitTests(tabs);
          quizNotFull = countNotFullUnitTests(tabs);
          meet = countMeetQuizzes(tabs);
          /*
           * 这一行的「执行」按条目 id 收窄（按课程名会把同名学期一起做）。
           * id 集合必须与计划一致：未交页签里我们接手的，加上已交未满分的重做卷；
           * 两处都要求章节对得上（拿不到数字卷号的不做）。
           */
          const known = new Set(chapterExams(entry.chapters).map((exam) => exam.listId));
          const actionable = [
            ...tabs.pending.filter((item) => known.has(item.id) && needsWork(item)),
            ...tabs.submitted.filter(
              (item) =>
                known.has(item.id) &&
                item.state === HOMEWORK_STATE.submitted &&
                item.score !== null &&
                item.totalScore !== null &&
                item.score < item.totalScore,
            ),
          ];
          quizItemIds = [...new Set(actionable.map(quizItemId))];
        } catch (error) {
          quizUnreadReason = error instanceof Error ? error.message : String(error);
          partial = true;
        }

        /*
         * 见面课场次（模块 4）：只读 + 提醒。考勤的口径是「看直播/回放满 80%」
         * （Ryan 2026-10-17 给的学校要求），所以这一格报的是「还有几场没开始」，
         * 签到开关原样带出、不解释。读不到就如实说，不拿 0 场冒充。
         */
        let meetSessions: ZhsCourseTask['meetSessions'] = null;
        let meetSessionsNote: string | null = null;
        try {
          const sessions = await getMeetSessions(deps.client, course.recruitId);
          meetSessions = {
            total: sessions.length,
            upcoming: sessions.filter((session) => session.status === 1).length,
          };
        } catch (error) {
          /*
           * **不置 partial**：场次不参与「待完成」那两个数（它只是提醒），
           * 读不到它不该把卡头的「可代为完成 N 项」一起打掉——那会拿一件小事
           * 冒充整门课没读全。原因写进 meetSessionsNote，见面课那一行如实说。
           */
          meetSessionsNote = `见面课场次读取失败：${error instanceof Error ? error.message : String(error)}`;
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
          recruitId: course.recruitId,
          courseName: course.name,
          video: { done: videoDone, total: entry.units.length },
          videoItemIds,
          quiz,
          quizItemIds,
          quizNotFull,
          meet,
          meetSessions,
          meetSessionsNote,
          quizUnreadReason,
          finalExam,
          finalExamNote,
          examListUrl: await examListUrl(course.recruitId, studyPageUrl(course.secret)),
          studyUrl: studyPageUrl(course.secret),
          pending,
        });
      }
      respond({ status: 'ok', value: { courses, pendingTotal: partial ? null : pendingTotal } });
    } catch (error) {
      // 账号级的登录失效：与「账号与课程」卡同一句话、同一个 reason
      if (error instanceof ZhsAuthError) {
        respond({ status: 'error', message: ZHS_SESSION_EXPIRED, reason: 'NOT_LOGGED_IN' });
        return;
      }
      respond({ status: 'error', message: error instanceof Error ? error.message : String(error) });
    }
  };
}

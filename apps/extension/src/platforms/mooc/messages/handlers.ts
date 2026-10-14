/*
 * 慕课的消息处理器表（后台半边）。
 *
 * 从 `src/background/messages/router.ts` 按原有分支搬出：SESSION / COURSES /
 * REFRESH_COURSES / SUBMIT_QUIZ / UNIT_QUESTIONS / DASHBOARD，以及查询类的兜底。
 * 外壳只按请求 type 分发，不认识其中任何一条的业务——它们是慕课的事。
 *
 * 唯一留在外壳的是 RUN_SCHEDULED_TASKS（手动执行一轮）：那是**调度**，
 * 由外壳统一做，走的是同一个 PlatformTasks 契约，见 background/messages/router.ts。
 */

import {
  COURSE_TYPE,
  getCourses,
} from '@study-pilot/platform-mooc';
import type { BackgroundRequest, MessageHandler, MessageHandlers } from '../../../platform/messaging';
import type { MoocMessageDeps } from './deps.ts';
import { ensureSession, renewSession } from '../../../platform/mooc/session';
import { getSettings } from '../../../settings';
import { recoveryFailure, withSessionRecovery } from '../recovery.ts';
import { handleDashboard } from './dashboard.ts';
import { handleUnitQuestions } from './papers.ts';
import { handleQuery } from './queries.ts';
import { handleSubmitQuiz } from './quiz.ts';

/**
 * 登录状态必须问过服务端才算数。
 *
 * 本地 cookie 只能证明「过去某一刻登录过」。浏览器长期驻留（启动加速、
 * 后台运行）会让会话级 cookie 活过服务端会话的寿命，此时照读 cookie 必然
 * 误报「已登录」——设置页的登录行于是与课程区各说各话。课程列表的未登录
 * 形态（result 为 null）是服务端的表态，拿它当判据：可疑时先续期一次，
 * 仍可疑才如实报未登录。pageSize 压到 1，这次探问只为「认不认得我」。
 */
function sessionHandler(deps: MoocMessageDeps): MessageHandler {
  return async (_request, sendResponse) => {
    const session = await ensureSession();
    if (!session.loggedIn) {
      sendResponse(session);
      return;
    }

    const probe = await getCourses(deps.client, { courseType: COURSE_TYPE.MOOC, pageSize: 1 });
    if (probe.ok || probe.error.kind !== 'auth') {
      sendResponse(session);
      return;
    }

    const { renewed, session: renewedSession } = await renewSession();
    if (renewed) {
      const afterRenewal = await getCourses(deps.client, {
        courseType: COURSE_TYPE.MOOC,
        pageSize: 1,
      });
      if (afterRenewal.ok || afterRenewal.error.kind !== 'auth') {
        sendResponse(renewedSession);
        return;
      }
    }

    sendResponse({ loggedIn: false, userId: 0, token: session.token });
  };
}

export function moocHandlers(deps: MoocMessageDeps): MessageHandlers {
  return {
    SESSION: sessionHandler(deps),

    COURSES: async (_request, sendResponse) => {
      const settings = await getSettings();
      sendResponse(
        settings.mooc.background.courses.map((course) => ({
          courseId: 0,
          name: course.name,
          termId: course.termId,
          startTime: null,
          endTime: null,
          publishStatus: null,
        })),
      );
    },

    /**
     * 主动点「读取课程列表」时总是去平台拿最新的。
     *
     * 长时间闲置后 cookie 可能还活着而服务端会话已死——那种时候平台回的是
     * 未登录形态的空数据。refreshCourses 遇到该形态会抛 SessionExpiredError，
     * 编排随即续期并重读一次；确认救不回来才报 NOT_LOGGED_IN，前台据此显示
     * 登录入口，不再让「刷新加载不出」只能靠用户自己开官网破案。
     */
    REFRESH_COURSES: async (_request, sendResponse) => {
      const session = await ensureSession();
      if (!session.loggedIn) {
        sendResponse({ ok: false, reason: 'NOT_LOGGED_IN' });
        return;
      }

      const outcome = await withSessionRecovery(() => deps.refreshCourses(), deps.renew);
      if (!outcome.ok) {
        const failure = recoveryFailure(outcome);
        sendResponse({ ok: false, reason: failure.reason ?? 'FETCH_FAILED', message: failure.message });
        return;
      }
      const result = outcome.value;
      if (!result.ok) {
        // 失败原因必须带回去，否则前台只能显示一个笼统的失败
        sendResponse({ ok: false, reason: 'FETCH_FAILED', message: result.message });
        return;
      }
      sendResponse(
        result.courses.length > 0
          ? { ok: true, courses: result.courses }
          : { ok: false, reason: 'NO_SELECTED_COURSE' },
      );
    },

    /**
     * 提交单元测验。前台点「提交答案」也走这里——内容脚本不持有写接口，
     * 否则写入会散到两个上下文，而它们的节流器互不知情。
     */
    SUBMIT_QUIZ: async (request, sendResponse) => {
      const quiz = request as Extract<BackgroundRequest, { type: 'SUBMIT_QUIZ' }>;
      sendResponse(await handleSubmitQuiz(deps, quiz.quizId, quiz.termId));
    },

    // 得分指导要的题目：取数集中在后台，前台只拿结果
    UNIT_QUESTIONS: async (request, sendResponse) => {
      const questions = request as Extract<BackgroundRequest, { type: 'UNIT_QUESTIONS' }>;
      sendResponse(await handleUnitQuestions(deps, questions.kind, questions.tid));
    },

    // 看板数据：只读快照，不发平台请求
    DASHBOARD: async (_request, sendResponse) => {
      sendResponse(await handleDashboard(deps));
    },

    // 查询类请求在 queries.ts：它们只读，共用会话与快照读取
    '*': async (request, sendResponse) => {
      const handled = await handleQuery(deps, request, sendResponse);
      if (!handled) sendResponse(undefined);
    },
  };
}

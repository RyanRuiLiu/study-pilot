/*
 * 消息路由：把前台的请求分派到各自的分支。
 *
 * 从 entrypoints/background.ts 移出。入口创建「外部世界的东西」（客户端、
 * 会话、快照读取）并经 deps 传入；本模块不认识它们的来历。
 *
 * 分发约定：请求对象的 `type` 即分支名，响应形状由 messaging 的 ResponseMap
 * 定义；未识别的请求回 undefined，前台据此报「后台无响应」。
 *
 * 路由体是从入口原样搬过来的，只在函数开头把 deps 解构成同名局部变量——
 * 逐处改写标识符既费事又容易改错，而解构让搬过来的代码一个字都不用动。
 */

import {
  COURSE_TYPE,
  getCourses,
  type CourseSummary,
  type CoursewareContext,
  type MoocClient,
} from '@study-pilot/platform-mooc';
import { getSettings, type Settings } from '../../settings';
import { ensureSession, renewSession } from '../../platform/mooc/session';
import type { BackgroundRequest } from '../../platform/messaging';
import { executeActions } from '../mooc/execute';
import { type InspectCourse, type Snapshot } from '../mooc/snapshot';
import { derivePlan } from '../mooc/task-plan';
import {
  beginRun,
  canStartRun,
  finishRun,
  getTaskState,
  touchRun,
} from '../runtime/scheduler';
import { recoveryFailure, withSessionRecovery } from '../runtime/session-recovery';
import { handleQuery } from './queries.ts';
import { handleUnitQuestions } from './papers.ts';
import { handleDashboard } from './overview.ts';
import { handleSubmitQuiz } from './quiz.ts';

/** 回响应给前台。形状由 messaging 的 ResponseMap 约束，这里只要求可调用。 */
export type SendResponse = (response?: unknown) => void;

/** 入口创建、由本模块使用的那些东西。 */
export interface RouterDeps {
  client: MoocClient;
  /** 会话续期；返回是否真的续上了 */
  renew: () => Promise<boolean>;
  refreshCourses: () => Promise<
    | { ok: true; courses: CourseSummary[]; byType: unknown }
    | { ok: false; message: string; byType?: unknown }
  >;
  loadSnapshot: (courses: InspectCourse[], userId: number) => Promise<Snapshot>;
  selectedCourses: (settings: Settings) => InspectCourse[];
  coursewareContext: (settings: Settings) => CoursewareContext;
}

export function registerMessageHandler(deps: RouterDeps): void {
  const { client, renew, refreshCourses, loadSnapshot, selectedCourses, coursewareContext } = deps;
  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    const request = message as BackgroundRequest | undefined;

    void (async () => {
      switch (request?.type) {
        case 'SESSION': {
          /*
           * 登录状态必须问过服务端才算数。
           *
           * 本地 cookie 只能证明「过去某一刻登录过」。浏览器长期驻留
           * （启动加速、后台运行）会让会话级 cookie 活过服务端会话的寿命，
           * 此时照读 cookie 必然误报「已登录」——设置页的登录行于是与
           * 课程区各说各话，用户看到的「已登录」其实早已失效。
           *
           * 课程列表的未登录形态（result 为 null）是服务端的表态，拿它当
           * 判据：可疑时先续期一次，仍可疑才如实报未登录。
           * pageSize 压到 1，这次探问只为「认不认得我」，不为数据。
           */
          const session = await ensureSession();
          if (!session.loggedIn) {
            sendResponse(session);
            break;
          }

          const probe = await getCourses(client, { courseType: COURSE_TYPE.MOOC, pageSize: 1 });
          if (probe.ok || probe.error.kind !== 'auth') {
            sendResponse(session);
            break;
          }

          const { renewed, session: renewedSession } = await renewSession();
          if (renewed) {
            const afterRenewal = await getCourses(client, {
              courseType: COURSE_TYPE.MOOC,
              pageSize: 1,
            });
            if (afterRenewal.ok || afterRenewal.error.kind !== 'auth') {
              sendResponse(renewedSession);
              break;
            }
          }

          sendResponse({ loggedIn: false, userId: 0, token: session.token });
          break;
        }

        case 'COURSES': {
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
          break;
        }

        case 'REFRESH_COURSES': {
          const session = await ensureSession();
          if (!session.loggedIn) {
            sendResponse({ ok: false, reason: 'NOT_LOGGED_IN' });
            break;
          }
          /*
           * 主动点「读取课程列表」时总是去平台拿最新的。
           *
           * 长时间闲置后 cookie 可能还活着而服务端会话已死——那种时候
           * 平台回的是未登录形态的空数据。refreshCourses 遇到该形态会抛
           * SessionExpiredError，编排随即续期并重读一次；确认救不回来才报
           * NOT_LOGGED_IN，前台据此显示登录入口，不再让「刷新加载不出」
           * 只能靠用户自己开官网破案。
           */
          const outcome = await withSessionRecovery(() => refreshCourses(), renew);
          if (!outcome.ok) {
            const failure = recoveryFailure(outcome);
            sendResponse({
              ok: false,
              reason: failure.reason ?? 'FETCH_FAILED',
              message: failure.message,
            });
            break;
          }
          const result = outcome.value;
          if (!result.ok) {
            // 失败原因必须带回去，否则前台只能显示一个笼统的失败
            sendResponse({ ok: false, reason: 'FETCH_FAILED', message: result.message });
            break;
          }
          sendResponse(
            result.courses.length > 0
              ? { ok: true, courses: result.courses }
              : { ok: false, reason: 'NO_SELECTED_COURSE' },
          );
          break;
        }


        case 'RUN_SCHEDULED_TASKS': {
          /*
           * 手动执行：与自动执行走同一条路径，只是不受「今天拉过没有」约束。
           *
           * 先把状态清干净——用户点这个按钮的意图就是「现在去做」，
           * 不该因为上次被中断的标志而拒绝，也不该沿用挂起状态。
           * 但正在执行的判定要保留：并发起两轮会重复写平台。
           */
          const manualState = await getTaskState();
          if (!canStartRun(manualState)) {
            sendResponse({ ok: false, reason: 'ALREADY_RUNNING' });
            break;
          }

          const manualSession = await ensureSession();
          if (!manualSession.loggedIn) {
            sendResponse({ ok: false, reason: 'NOT_LOGGED_IN' });
            break;
          }

          const manualSettings = await getSettings();
          const manualCourses = selectedCourses(manualSettings);
          if (manualCourses.length === 0) {
            sendResponse({ ok: false, reason: 'NO_SELECTED_COURSE' });
            break;
          }

          const manualNow = Date.now();
          await beginRun(manualNow);
          try {
            // 与自动执行同一套：每一步之前刷心跳，理由见 autoRun 里的说明
            await touchRun();
            await refreshCourses().catch(() => undefined);

            await touchRun();
            /*
             * 与自动执行同一条恢复路径：失效会话在手动执行时同样要先
             * 续期，否则拉回的是空快照，「没有可自动完成的事项」会变成
             * 一个看似正常的假结论。
             */
            const manualOutcome = await withSessionRecovery(
              () => loadSnapshot(manualCourses, manualSession.userId),
              renew,
            );
            if (!manualOutcome.ok) {
              const manualFailure = recoveryFailure(manualOutcome);
              sendResponse({
                ok: false,
                reason: manualFailure.reason ?? 'FETCH_FAILED',
                message: manualFailure.message,
              });
              break;
            }
            const manualSnapshot = manualOutcome.value;
            const manualPlan = derivePlan(manualSnapshot, manualSettings, manualNow);

            if (manualPlan.auto.length === 0) {
              sendResponse({
                ok: true,
                done: 0,
                manual: manualPlan.manual.length,
                message: '没有可自动完成的事项',
              });
              break;
            }

            const results = await executeActions(
              client,
              manualPlan.auto,
              manualSession.userId,
              manualSettings.mooc.background.autoReview.comment,
              () => touchRun(),
              coursewareContext(manualSettings),
            );

            const done = results.filter((r) => r.status === 'done').length;
            const failed = results.filter((r) => r.status === 'failed');
            sendResponse({
              ok: true,
              done,
              manual: manualPlan.manual.length,
              failed: failed.map((r) => ({ name: r.name, detail: r.detail })),
            });
          } finally {
            await finishRun();
          }
          break;
        }

        case 'SUBMIT_QUIZ': {
          /*
           * 提交单元测验。前台点「提交答案」也走这里——内容脚本不持有写接口，
           * 否则写入会散到两个上下文，而它们的节流器互不知情。
           */
          sendResponse(await handleSubmitQuiz(deps, request.quizId, request.termId));
          break;
        }

        case 'UNIT_QUESTIONS': {
          // 得分指导要的题目：取数集中在后台，前台只拿结果
          sendResponse(await handleUnitQuestions(deps, request.kind, request.tid));
          break;
        }

        case 'DASHBOARD': {
          // 看板数据：只读快照，不发平台请求
          sendResponse(await handleDashboard(deps));
          break;
        }

        default: {
          /*
           * 查询类请求在 messages/queries.ts：它们只读，共用会话与快照读取。
           * 本文件只留会改变状态的分支（登录态探问、课程刷新、执行）。
           */
          const handled = await handleQuery(deps, request, sendResponse);
          if (!handled) sendResponse(undefined);
        }
      }
    })().catch((error: unknown) => {
      /*
       * 兜底响应只能报「失败」，不能报「未登录」。
       *
       * 曾经这里把任何异常都包成 NOT_LOGGED_IN：一个与登录毫无关系的
       * 存储异常会让界面显示「尚未登录」，用户于是去重复登录——
       * 症状被替换成了另一个错误答案。未登录只能由明确判定它的分支返回。
       */
      sendResponse({ ok: false, reason: 'FETCH_FAILED', message: String(error) });
    });

    // 异步响应，保持消息通道打开
    return true;
  });
}
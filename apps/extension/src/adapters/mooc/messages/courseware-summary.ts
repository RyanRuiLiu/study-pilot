/*
 * 设置页一次读取：课件进度（每门课的完成计数）+ 待交计数。
 *
 * 两者由**同一份快照**现算：账号与课程卡里的状态行与课件区要的是同一份
 * 事实，因此合成一个响应、页面只发一条消息。先前它们是两条消息各读一遍
 * 六门课，又在同一条串行节流上排队，设置页一开要等 4 秒多（实测 2026-10-15）。
 *
 * 与单元明细（UNIT_DETAILS）同样共用 loadSnapshot：界面上的数字与真正的
 * 执行用同一份判据。未登录时不往下走，原因与其余读取相同。
 */

import { aiTextAvailable } from '../../../ai/permission.ts';
import type { MessageHandler } from '../../../protocol.ts';
import { getSettings } from '../../../settings';
import {
  derivePlan,
  ensureSession,
  recoveryFailure,
  summarizeCourseware,
  withSessionRecovery,
} from '@study-pilot/platform-mooc';
import { toPendingSummary } from '../to-messages';
import type { MoocMessageDeps } from './deps.ts';
import type { MoocResponseMap } from './payload.ts';

export function coursewareSummaryCommand(deps: MoocMessageDeps): MessageHandler {
  return async (_request, sendResponse) => {
    const settings = await getSettings();
    const session = await ensureSession(deps.host, deps.client.send, deps.client.origin);

    if (!session.loggedIn) {
      sendResponse({
        status: 'error',
        reason: 'NOT_LOGGED_IN',
        message: '未登录',
      } satisfies MoocResponseMap['MOOC_COURSEWARE_SUMMARY']);
      return;
    }

    try {
      const courses = deps.selectedCourses(settings);
      const outcome = await withSessionRecovery(
        () => deps.loadSnapshot(courses, session.userId),
        deps.renew,
      );
      if (!outcome.ok) {
        sendResponse({ status: 'error', ...recoveryFailure(outcome) } satisfies MoocResponseMap['MOOC_COURSEWARE_SUMMARY']);
        return;
      }

      // AI 能力判定只做一次，课件计数与计划判据共用（都是纯函数）
      const textAvailable = await aiTextAvailable(settings);

      /*
       * 按课程列表逐门对齐：读不到结构的课（从未学过、平台不回结构）
       * 补一行「读不到」，而不是静默消失——用户勾了它，就该看见它为什么是空的。
       */
      const progress = summarizeCourseware(outcome.value, textAvailable);
      const rows = courses.map(
        (course) =>
          progress.find((entry) => entry.courseName === course.name) ?? {
            courseName: course.name,
            done: 0,
            total: 0,
            pending: 0,
            cannot: 0,
            needsAi: 0,
            unread: true,
          },
      );

      /*
       * 待交计数同船带走：状态行的「待交 N 项」与弹窗待办列表是同一套判据
       * （derivePlan + toPendingSummary），这里只取两项计数。
       */
      const pending = toPendingSummary(
        derivePlan(outcome.value, settings, Date.now(), textAvailable),
        settings.mooc.keepOverdueDays,
      );

      sendResponse({
        status: 'ok',
        value: { courses: rows, pending: { auto: pending.auto, manual: pending.manual } },
      } satisfies MoocResponseMap['MOOC_COURSEWARE_SUMMARY']);
    } catch (error) {
      sendResponse({
        status: 'error',
        message: error instanceof Error ? error.message : String(error),
      } satisfies MoocResponseMap['MOOC_COURSEWARE_SUMMARY']);
    }
  };
}

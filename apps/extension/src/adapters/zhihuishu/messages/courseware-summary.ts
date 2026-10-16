/*
 * ZHS_COURSEWARE_SUMMARY：每门勾选课程的完成计数（只读）。
 *
 * 未登录与读取失败分开说（与慕课同一条）：未登录不是出错，是少做了一步，
 * 界面据此给去处；失败给原因。
 */

import type { MessageHandler, QueryOutcome } from '../../../protocol.ts';
import { readSession } from '@study-pilot/platform-zhs';
import type { ZhsMessageDeps } from './deps.ts';
import type { ZhsCoursewareSummary, ZhsResponseMap } from './payload.ts';
import { collectUnits } from './reads.ts';

export function zhsCoursewareSummaryCommand(deps: ZhsMessageDeps): MessageHandler {
  return async (_request, sendResponse) => {
    const respond = (outcome: QueryOutcome<ZhsCoursewareSummary>): void => {
      sendResponse(outcome satisfies ZhsResponseMap['ZHS_COURSEWARE_SUMMARY']);
    };

    const session = await readSession(deps.readCookie);
    if (!session.loggedIn) {
      respond({ status: 'error', message: '未登录', reason: 'NOT_LOGGED_IN' });
      return;
    }

    try {
      const settings = await deps.config.read();
      const enabled = settings.zhihuishu.courses.filter((course) => course.enabled);
      const collected = await collectUnits(deps.client, enabled);

      let pendingTotal = 0;
      const courses = collected.map((entry) => {
        if (entry.unreadReason !== null) {
          return {
            courseId: entry.course.courseId,
            courseName: entry.course.name,
            done: 0,
            total: 0,
            pending: 0,
            unread: true,
          };
        }
        const done = entry.units.filter((unit) => unit.done).length;
        const pending = entry.units.length - done;
        pendingTotal += pending;
        return {
          courseId: entry.course.courseId,
          courseName: entry.course.name,
          done,
          total: entry.units.length,
          pending,
        };
      });
      respond({ status: 'ok', value: { courses, pendingTotal } });
    } catch (error) {
      respond({ status: 'error', message: error instanceof Error ? error.message : String(error) });
    }
  };
}

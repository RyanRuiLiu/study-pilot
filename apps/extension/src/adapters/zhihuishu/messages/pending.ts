/*
 * ZHS_PENDING_SUMMARY：待办 = 全部未完成的视频单元（按课程归拢、章节自然序）。
 *
 * 智慧树的单元没有截止时间概念（学习窗口由课程整体规定），因此这里不做
 * 任何时间过滤——列出来的就是「这门课还剩哪些没看」，一条不落。
 */

import type { MessageHandler, QueryOutcome } from '../../../protocol.ts';
import { readSession, selectedCourses, unitItemId } from '@study-pilot/platform-zhs';
import type { ZhsMessageDeps } from './deps.ts';
import type { ZhsPendingEntry, ZhsPendingSummary, ZhsResponseMap, ZhsUnreadCourse } from './payload.ts';
import { collectUnits } from './reads.ts';

export function zhsPendingCommand(deps: ZhsMessageDeps): MessageHandler {
  return async (_request, sendResponse) => {
    const respond = (outcome: QueryOutcome<ZhsPendingSummary>): void => {
      sendResponse(outcome satisfies ZhsResponseMap['ZHS_PENDING_SUMMARY']);
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

      const entries: ZhsPendingEntry[] = [];
      const unreadCourses: ZhsUnreadCourse[] = [];
      for (const { course, units, unreadReason } of collected) {
        /*
         * 读不到的课必须被看见：它们的单元进不了 entries，若这里不记一笔，
         * 界面就会得出「这门课没有要看的」这个错误结论（课件卡对同一份读取
         * 结果报「未读取到内容」，待办这边曾经静默吞掉）。
         */
        if (unreadReason !== null) {
          unreadCourses.push({ courseName: course.name, reason: unreadReason });
          continue;
        }
        for (const unit of units) {
          if (unit.done) continue;
          entries.push({
            itemId: unitItemId(unit),
            courseName: course.name,
            chapterName: unit.chapterName,
            name: unit.name,
            sec: unit.sec,
          });
        }
      }
      respond({
        status: 'ok',
        value: { fetchedAt: Date.now(), total: entries.length, entries, unreadCourses },
      });
    } catch (error) {
      respond({ status: 'error', message: error instanceof Error ? error.message : String(error) });
    }
  };
}

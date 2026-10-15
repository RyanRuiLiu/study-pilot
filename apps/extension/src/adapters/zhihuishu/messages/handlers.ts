/*
 * 智慧树的消息处理器表。与慕课同一条组织：一条命令一个文件，这里只拼表。
 * 外壳自己的命令（跑一轮、任务状态）不在这张表里；`*` 兜底由慕课表提供
 * （合并顺序在 background，见那里的说明）。
 */

import type { MessageHandlers } from '../../../protocol.ts';
import type { ZhsMessageDeps } from './deps.ts';
import { zhsCoursewareSummaryCommand } from './courseware-summary.ts';
import { zhsCoursesCommand } from './courses.ts';
import { zhsPendingCommand } from './pending.ts';
import { zhsRefreshCoursesCommand } from './refresh-courses.ts';
import { zhsSessionCommand } from './session.ts';

export function zhihuishuHandlers(deps: ZhsMessageDeps): Omit<MessageHandlers, '*'> {
  return {
    ZHS_SESSION: zhsSessionCommand(deps),
    ZHS_COURSES: zhsCoursesCommand(deps),
    ZHS_REFRESH_COURSES: zhsRefreshCoursesCommand(deps),
    ZHS_COURSEWARE_SUMMARY: zhsCoursewareSummaryCommand(deps),
    ZHS_PENDING_SUMMARY: zhsPendingCommand(deps),
  };
}

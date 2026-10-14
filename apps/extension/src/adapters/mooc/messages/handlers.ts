/*
 * 慕课的消息处理器表。
 *
 * 每条命令的实现在同目录的一个文件里，这里只把它们拼成一张表——外壳按 type 分发，
 * 平台实现自己那几条。曾经这些分支挤在 handlers.ts 与 queries.ts 两个文件里，
 * 一个文件管十来个命令，改哪条都要先读完两百行。
 *
 * 外壳自己的命令（手动跑一轮）不在这张表里：那是调度，见 background。
 */

import type { MessageHandlers } from '../../../protocol.ts';
import type { MoocMessageDeps } from './deps.ts';
import { coursewareSummaryCommand } from './courseware-summary.ts';
import { coursesCommand } from './courses.ts';
import { pendingCommand } from './pending.ts';
import { refreshCoursesCommand } from './refresh-courses.ts';
import { sessionCommand } from './session.ts';
import { taskStateCommand } from './task-state.ts';
import { unitDetailsCommand } from './unit-details.ts';

export function moocHandlers(deps: MoocMessageDeps): MessageHandlers {
  return {
    SESSION: sessionCommand(deps),
    COURSES: coursesCommand(),
    REFRESH_COURSES: refreshCoursesCommand(deps),
    PENDING_SUMMARY: pendingCommand(deps),
    UNIT_DETAILS: unitDetailsCommand(deps),
    COURSEWARE_SUMMARY: coursewareSummaryCommand(deps),
    TASK_STATE: taskStateCommand(deps),
    // 不是本平台的命令：交回外壳，由它决定怎么回（undefined 表示没人处理）
    '*': async (_request, sendResponse) => sendResponse(undefined),
  };
}

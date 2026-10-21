/*
 * 智慧树的消息处理器表。与慕课同一条组织：一条命令一个文件，这里只拼表。
 * 外壳自己的命令（跑一轮、任务状态）不在这张表里；没人认领的 type 由
 * 外壳的路由自己回「处理不了」，平台表里没有兜底那格。
 */

import type { MessageHandler, MessageHandlers } from '../../../protocol.ts';
import type { ZhsResponseMap } from './payload.ts';
import type { ZhsMessageDeps } from './deps.ts';
import { zhsCourseTasksCommand } from './course-tasks.ts';
import { zhsCoursesCommand } from './courses.ts';
import { zhsPendingCommand } from './pending.ts';
import { zhsRefreshCoursesCommand } from './refresh-courses.ts';
import { zhsSessionCommand } from './session.ts';

export function zhihuishuHandlers(deps: ZhsMessageDeps): Omit<MessageHandlers, '*'> {
  // satisfies：响应映射里加一条而这里忘记登记，typecheck 立刻报缺键
  return {
    ZHS_SESSION: zhsSessionCommand(deps),
    ZHS_COURSES: zhsCoursesCommand(deps),
    ZHS_REFRESH_COURSES: zhsRefreshCoursesCommand(deps),
    ZHS_COURSE_TASKS: zhsCourseTasksCommand(deps),
    ZHS_PENDING_SUMMARY: zhsPendingCommand(deps),
  } satisfies { [K in keyof ZhsResponseMap]: MessageHandler };
}

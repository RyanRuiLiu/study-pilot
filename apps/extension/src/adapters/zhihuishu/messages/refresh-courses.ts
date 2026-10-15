/*
 * ZHS_REFRESH_COURSES：去平台重新拉一次课程列表并写回配置。
 *
 * 合并规则在平台包里（mergeCourses）：新读的平台事实覆盖旧值，
 * 勾选沿用用户做过的——刷新不会把用户没同意过的课拖进任务范围，
 * 也不会把用户取消过的课勾回来。
 *
 * 失败原因必须带回去（同慕课的教训）：未登录与读取失败分开说，
 * 界面把失败如实落进区域，不能只显示一个笼统的「失败」。
 */

import type { MessageHandler } from '../../../protocol.ts';
import { getShareCourses, mergeCourses, readSession } from '@study-pilot/platform-zhs';
import type { ZhsMessageDeps } from './deps.ts';
import type { ZhsResponseMap } from './payload.ts';

export function zhsRefreshCoursesCommand(deps: ZhsMessageDeps): MessageHandler {
  return async (_request, sendResponse) => {
    const session = await readSession(deps.client);
    if (!session.loggedIn) {
      sendResponse({ ok: false, reason: 'NOT_LOGGED_IN' } satisfies ZhsResponseMap['ZHS_REFRESH_COURSES']);
      return;
    }

    let fresh;
    try {
      fresh = await getShareCourses(deps.client);
    } catch (error) {
      sendResponse({
        ok: false,
        reason: 'FETCH_FAILED',
        message: error instanceof Error ? error.message : String(error),
      } satisfies ZhsResponseMap['ZHS_REFRESH_COURSES']);
      return;
    }
    if (fresh.length === 0) {
      // 空列表要带上自己的说法：界面把结果如实落进区域，不交给它一个裸原因
      sendResponse({
        ok: false,
        reason: 'NO_SELECTED_COURSE',
        message: '平台没有返回任何课程',
      } satisfies ZhsResponseMap['ZHS_REFRESH_COURSES']);
      return;
    }

    const settings = await deps.config.read();
    const courses = mergeCourses(fresh, settings.zhihuishu.courses);
    await deps.config.update({ zhihuishu: { courses } });
    sendResponse({ ok: true, courses } satisfies ZhsResponseMap['ZHS_REFRESH_COURSES']);
  };
}

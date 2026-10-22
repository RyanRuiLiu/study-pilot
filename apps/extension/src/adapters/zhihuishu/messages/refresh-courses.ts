/*
 * ZHS_REFRESH_COURSES：去平台重新拉一次课程列表并写回配置。
 *
 * 读取、合并与回写都在平台包里（`refreshCourses`，与慕课同一位置同一件事）；
 * 这里只做本载体负责的两件：登录判定（NOT_LOGGED_IN 是界面的说法，平台不认）
 * 与把失败原因翻成响应形状。
 *
 * 失败原因必须带回去（同慕课的教训）：未登录与读取失败分开说，
 * 界面把失败如实落进区域，不能只显示一个笼统的「失败」。
 */

import type { MessageHandler } from '../../../protocol.ts';
import { readSession } from '@study-pilot/platform-zhs';
import type { ZhsMessageDeps } from './deps.ts';
import type { ZhsResponseMap } from './payload.ts';

export function zhsRefreshCoursesCommand(deps: ZhsMessageDeps): MessageHandler {
  return async (_request, sendResponse) => {
    const session = await readSession(deps.readCookie);
    if (!session.loggedIn) {
      sendResponse({ ok: false, reason: 'NOT_LOGGED_IN' } satisfies ZhsResponseMap['ZHS_REFRESH_COURSES']);
      return;
    }

    const result = await deps.refreshCourses();
    if (!result.ok) {
      sendResponse({
        ok: false,
        /*
         * auth 走「未登录」那一条：界面上的处置是同一个（给出登录指引），
         * 差的是说法——「登录已失效，需重新登录智慧树」比「读取失败」更接近事实。
         */
        reason:
          result.reason === 'no-courses'
            ? 'NO_SELECTED_COURSE'
            : result.reason === 'auth'
              ? 'NOT_LOGGED_IN'
              : 'FETCH_FAILED',
        message: result.message,
      } satisfies ZhsResponseMap['ZHS_REFRESH_COURSES']);
      return;
    }

    sendResponse({ ok: true, courses: result.courses } satisfies ZhsResponseMap['ZHS_REFRESH_COURSES']);
  };
}

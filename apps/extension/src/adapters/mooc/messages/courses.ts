/*
 * 已保存的课程列表（只读本地配置，不联网）。
 *
 * 只回课程名与 termId：界面点「打开课程」需要的定位信息在设置里（courseId、
 * schoolShortName），由设置那条路径给，这里不重复搬运。
 */

import type { MessageHandler } from '../../../protocol.ts';
import { getSettings } from '../../../settings';
import type { MoocResponseMap } from './payload.ts';

export function coursesCommand(): MessageHandler {
  return async (_request, sendResponse) => {
    const settings = await getSettings();
    sendResponse(
      settings.mooc.courses.map((course) => ({
        courseId: 0,
        name: course.name,
        termId: course.termId,
        startTime: null,
        endTime: null,
        publishStatus: null,
      })) satisfies MoocResponseMap['COURSES'],
    );
  };
}

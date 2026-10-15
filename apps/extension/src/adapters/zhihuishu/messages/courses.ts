/* ZHS_COURSES：读取已保存的课程列表（只读本地配置，不联网）。 */

import type { MessageHandler } from '../../../protocol.ts';
import type { ZhsMessageDeps } from './deps.ts';
import type { ZhsResponseMap } from './payload.ts';

export function zhsCoursesCommand(deps: ZhsMessageDeps): MessageHandler {
  return async (_request, sendResponse) => {
    const settings = await deps.config.read();
    sendResponse(settings.zhihuishu.courses satisfies ZhsResponseMap['ZHS_COURSES']);
  };
}

/*
 * 发一条示例通知。
 *
 * 桌面通知是否真的送达不由扩展决定——系统可能把它静音、可能没授权限、可能被专注模式
 * 挡住。给一个手动入口，用户才能自己确认，而不是遇到「设了提醒却从没收到过」时只能猜。
 *
 * 内容取自当前账号的真实待办，用与实际检查同一套措辞，因此看到的就是真会收到的那种。
 */

import type { MessageHandler } from '../../../protocol.ts';
import { getSettings } from '../../../settings';
import { readSnapshot } from '../read';
import { notifySample } from '../reminder';
import type { MoocMessageDeps } from './deps.ts';
import type { MoocResponseMap } from './payload.ts';

export function notifySampleCommand(deps: MoocMessageDeps): MessageHandler {
  return async (_request, sendResponse) => {
    const [snapshot, settings] = await Promise.all([readSnapshot(), getSettings()]);
    sendResponse({
      ok: true,
      hasContent: await notifySample(deps.host, snapshot, settings),
    } satisfies MoocResponseMap['NOTIFY_SAMPLE']);
  };
}

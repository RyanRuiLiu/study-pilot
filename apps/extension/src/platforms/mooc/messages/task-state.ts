/*
 * 后台此刻的状态：原始状态 + 由后台判定的人话结论。
 *
 * 状态与判据一起给。界面不自己拿 `runningSince !== null` 猜「在不在跑」：那个字段在
 * 浏览器被强杀后会留着没人清，猜出来是「正在执行」，而实际什么都没发生。
 * 判据归后台（scheduler.liveRunState），界面只负责显示。
 *
 * 它是外壳的命令（形状在 src/messages.ts 的 ShellRequest），实现留在这里是因为
 * 它要用平台注入的 shell 端口；外壳的路由把它分发到这里。
 */

import type { MessageHandler } from '../../../protocol.ts';
import type { MoocMessageDeps } from './deps.ts';
import type { MoocResponseMap } from './payload.ts';

export function taskStateCommand(deps: MoocMessageDeps): MessageHandler {
  return async (_request, sendResponse) => {
    const { state, live } = await deps.shell.runState();
    sendResponse({ state, live } satisfies MoocResponseMap['TASK_STATE']);
  };
}

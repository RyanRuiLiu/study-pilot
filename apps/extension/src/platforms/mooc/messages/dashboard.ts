/*
 * 看板的数据：把本地快照**原样**交给界面。
 *
 * 刻意不做任何"翻译"：以前会把快照映射成中立模型，同一条信息在快照、适配层、
 * 中立模型三处各有一份形状，改一处要跟着改三处。平台自己的字段就是界面要的东西。
 *
 * 不发请求（设计如此），因此只读快照；数据有多旧由 fetchedAt 如实带回。
 */

import type { MessageHandler } from '../../../protocol.ts';
import { readSnapshot } from '../read';
import type { MoocResponseMap } from './payload.ts';

export function dashboardCommand(): MessageHandler {
  return async (_request, sendResponse) => {
    const snapshot = await readSnapshot();
    // 还没读过平台数据不是失败，是「还没跑过」；用 null 表示，不伪造空快照
    sendResponse({ status: 'ok', value: snapshot } satisfies MoocResponseMap['DASHBOARD']);
  };
}

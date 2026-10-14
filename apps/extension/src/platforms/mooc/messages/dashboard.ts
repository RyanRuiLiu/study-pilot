/*
 * 看板的数据：把本地快照**原样**交给看板。
 *
 * 这里刻意不做任何"翻译"：以前会把快照映射成中立模型，于是同一条信息在
 * 快照、适配层、中立模型三处各有一份形状，改一处要跟着改三处。
 * 平台自己的字段（submitted、completePercent、contentType…）就是看板要的东西。
 *
 * 看板自己不发请求（设计如此），因此只读快照；数据有多旧由 `fetchedAt` 如实带回。
 * 单元明细是唯一的例外——它要平台的状态文案，由用户按「读取最新明细」显式触发
 * （走 UNIT_DETAILS），不在这条查询里。
 */

import type { QueryOutcome } from '../../../browser/messaging';
import { readSnapshot, type Snapshot } from '../read';
import type { MoocMessageDeps } from './deps.ts';

export async function handleDashboard(_deps: MoocMessageDeps): Promise<QueryOutcome<Snapshot | null>> {
  const snapshot = await readSnapshot();
  // 还没读过平台数据不是失败，是「还没跑过」；用 null 表示，不伪造一份带版本号的空快照
  return { status: 'ok', value: snapshot };
}

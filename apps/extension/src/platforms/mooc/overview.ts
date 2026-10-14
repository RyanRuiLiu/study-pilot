/*
 * 慕课交给概览的数据（前台半边）。
 *
 * 概览的表格、左树、排序与无障碍属性都由壳层画（见 `entrypoints/options/overview.ts`），
 * 这里只把快照读成契约里的行：格子里的字由本平台算好，壳层只按 `mode` 与 `state`
 * 两个枚举上色排序，不再解释任何慕课字段。
 * 单元明细不再单独成块——它的得分就是这张表的得分列，
 * 原来那两处「上次读取」与两个「重读」按钮也随之一并收拢。
 *
 * 数据只读本地快照：打开概览不该顺手请求平台（隐私承诺里写着「打开看板不会向平台
 * 发请求」）。要读平台只有 `refresh()` 那一个显式动作。
 */

import { sendToBackground } from '../../browser/messaging';
import type { DataSource, OverviewRow, PlatformOverview, PlatformViews } from '../types.ts';
import { boardItems, type BoardItem } from './board.ts';

const ID = 'mooc';
const NAME = '中国大学 MOOC';

function toRow(item: BoardItem): OverviewRow {
  return {
    id: item.id,
    course: item.course,
    title: item.title,
    kind: item.kind,
    mode: item.mode,
    state: item.state,
    status: item.review === undefined ? item.status : `${item.status}（${item.review}）`,
    statusDetail: item.statusDetail,
    dueAt: item.due,
    due: item.dueLabel,
    score: item.scoreLabel,
    href: item.href ?? '',
  };
}

/** 读本地快照并成行。失败与「还没读过」都如实交出去，不伪造一份空数据。 */
async function read(): Promise<PlatformOverview> {
  const outcome = await sendToBackground({ type: 'DASHBOARD' });
  if (outcome.status !== 'ok') {
    return { id: ID, name: NAME, source: { error: outcome.message }, rows: [] };
  }
  const snapshot = outcome.value;
  if (snapshot === null) {
    return { id: ID, name: NAME, source: { at: 0 }, rows: [] };
  }
  return {
    id: ID,
    name: NAME,
    source: { at: snapshot.fetchedAt },
    rows: snapshot.courses.flatMap((course) => boardItems(course)).map(toRow),
  };
}

/**
 * 向平台读一次最新数据。
 *
 * 走后台的 UNIT_DETAILS：它会读平台并顺手把快照写回去，因此读完成概览再读一次
 * 本地快照就能拿到新数字。返回这份数据的来源，让壳层如实显示成功或失败。
 */
async function refresh(): Promise<DataSource> {
  const outcome = await sendToBackground({ type: 'UNIT_DETAILS' });
  if (outcome.status !== 'ok') return { error: outcome.message };
  return (await read()).source;
}

export const moocOverview: PlatformViews = {
  id: ID,
  name: NAME,
  overview: read,
  refresh,
};

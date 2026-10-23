/*
 * 见面课观看/考勤（在线观看型）。
 *
 * 2026-10-23 真机实测：
 *   · 场次 `signOpenStatus=2` 表示「在线观看」，学校口径是看直播/回放满 80% 得考勤分，
 *     **没有单独的签到按钮**（页面原话：无需另外签到）。
 *   · 播放器用 `setWatchHistorySecret` 上报 `relativeTime`；服务端把秒数记入观看历史，
 *     `getWatchHistory` 返回逗号列表，出现 `#` 即观看完成，页面显示「签到已完成」。
 *   · `paramSecret` 是 XOR-hex（key `zhihuishu`），网关再按 module 9 加密成 `secretStr`；
 *     本包直接走同一条签名链（`client.call`），不依赖页面。
 *
 * 不做的事：见面课测验只有一次机会，和期末一致，不自动提交；现场签到型场次也不自动。
 */

import type { RunControl, RunOutcome } from '@study-pilot/application';
import type { ZhsClient } from './client.ts';
import { meetParamSecret } from './sign.ts';
import type { ZhsMeetSession } from './meet.ts';

/** 观看历史：逗号分隔的秒数；`#` = 已完成。 */
export async function readMeetWatchHistory(
  client: ZhsClient,
  liveCourseId: string,
  userId: number,
): Promise<string> {
  const body = (await client.call('meetWatchHistory', {
    courseId: liveCourseId,
    userId,
  })) as { rt?: unknown };
  return typeof body.rt === 'string' ? body.rt : '';
}

/**
 * 把一场回放看到片尾（按场次起止时长上报，服务端超过 80% 即给考勤）。
 *
 * `watchType=2` 是回放页自己的取值（vod_room.js）；直播页的取值另测。
 * 历史里已有 `#` 直接算完成；已有秒数跳过，只补缺口。
 */
export async function watchMeetReplay(
  client: ZhsClient,
  session: ZhsMeetSession,
  input: { recruitId: number; userId: number },
  control: RunControl = { stopped: () => false },
): Promise<RunOutcome> {
  if (session.signOpenStatus !== 2) {
    return { status: 'skipped', message: '现场签到型场次，需人工完成' };
  }
  if (session.replayUrl === null) return { status: 'skipped', message: '这场没有回放地址' };
  if (session.liveCourseId === null || session.videoId === null) {
    return { status: 'failed', message: '场次缺少 liveCourseId/videoId，无法上报观看进度' };
  }
  if (session.startAt === null || session.endAt === null || session.endAt <= session.startAt) {
    return { status: 'failed', message: '场次缺少有效起止时间，无法确定观看时长' };
  }

  const history = await readMeetWatchHistory(client, session.liveCourseId, input.userId);
  if (history.split(',').includes('#')) return { status: 'done', message: '已确认考勤完成（历史为 #）' };

  const seen = new Set(history.split(',').filter((value) => value !== ''));
  const totalSec = Math.floor((session.endAt - session.startAt) / 1000);
  let sent = 0;
  for (let relativeTime = 60; relativeTime <= totalSec; relativeTime += 60) {
    if (control.stopped()) return { status: 'skipped', message: '已停止' };
    if (seen.has(String(relativeTime))) continue;
    await client.call('meetSetWatch', {
      paramSecret: meetParamSecret([
        input.recruitId,
        session.liveCourseId,
        input.userId,
        relativeTime,
        2,
        session.videoId,
      ]),
      jsonpCallBack: 'jsonpCallBack',
    });
    sent += 1;
  }

  const fresh = await readMeetWatchHistory(client, session.liveCourseId, input.userId);
  if (fresh.split(',').includes('#')) {
    return { status: 'done', message: `已观看至片尾（补充 ${sent} 个进度点，考勤完成）` };
  }
  return {
    status: 'failed',
    message: `已上报 ${sent} 个进度点，但平台未返回完成标记（当前历史：${fresh || '空'}）`,
  };
}

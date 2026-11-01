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
 * 2026-11-01 与回放页源码（`vod_room.js`，HAR 镜像在 `.probe/meet-vod-room/`）逐字段核对，
 * 把这条链的两处口径订正：
 *   · 载荷第 4 格 `relativeTime` 是**分钟**（源码 `Math.floor(relativeTime / 60) + 1`），
 *     不是秒；它落在房间那条「各段时长按顺序接起来」的绝对分钟轴上。
 *   · 第 6 格是**当前那一段视频的单个 id**（源码 `curVideoId`）。一个房间有几段不固定，
 *     80% 还逐段判（`getEffectWatchTime()`：`(该段已看分钟 / 该段总分钟) * 100 < 80`），
 *     所以每段都要各自报满自己那段——把场次 `videoId` 那个逗号整串送上去，服务端查不到
 *     视频，回 `code=-1`「服务器暂无回应，请稍后重试」（实测对照：整串被拒、单 id 落库）。
 *
 * 不做的事：见面课测验只有一次机会，和期末一致，不自动提交；现场签到型场次也不自动。
 */

import type { RunControl, RunOutcome } from '@study-pilot/application';
import type { ZhsClient } from './client.ts';
import { meetParamSecret } from './sign.ts';
import { getMeetVideos, type ZhsMeetSession, type ZhsMeetVideo } from './meet.ts';

/** 观看历史：逗号分隔的分钟；`#` = 已完成。 */
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

/** 一段视频在房间分钟轴上占的区间：要报的分钟是 `(startMin, endMin]`。 */
interface RoomSpan {
  videoId: string;
  startMin: number;
  endMin: number;
}

/**
 * 各段时长 → 一条分钟轴（算法与回放页的 `everyVideoStartEndTime()` 逐字一致）：
 * 第一段 `0 .. ceil(时长/60)`；其后每段从前一段的 `end` 起，`ceil((前end*60+时长)/60)` 收。
 */
function roomSpans(videos: readonly ZhsMeetVideo[]): RoomSpan[] {
  const spans: RoomSpan[] = [];
  let end = 0;
  videos.forEach((video, index) => {
    const start = index === 0 ? 0 : end;
    end =
      index === 0
        ? Math.ceil(video.durationSec / 60)
        : Math.ceil((start * 60 + video.durationSec) / 60);
    spans.push({ videoId: video.id, startMin: start, endMin: end });
  });
  return spans;
}

/**
 * 把一场回放看完：逐段补齐各自区间里缺的分钟，回读历史看 `#`。
 *
 * `watchType=2` 是回放页自己的取值（vod_room.js）；直播页的取值另测。
 * 历史里已有的分钟跳过——平台原话「重复播放不记录进签到进度」，补报也不涨进度。
 *
 * `heartbeat` 每个进度点敲一次：一场要发几十个写点（2026-11-01 实测一场两段 = 91 个，
 * 写侧节流 200ms → 单项十几到几十秒），而外壳的「还在跑」判据是 120 秒没心跳就判中断
 * （application 的 `state.ts`）。不敲的话界面会钉着一句不动的「正在执行」，跑久了还会
 * 被读成「上次执行中断」——这一项与课件不同（课件单元内无长等待，见 policy/tasks.ts）。
 */
export async function watchMeetReplay(
  client: ZhsClient,
  session: ZhsMeetSession,
  input: { recruitId: number; userId: number },
  control: RunControl,
  heartbeat: () => Promise<void>,
): Promise<RunOutcome> {
  if (session.signOpenStatus !== 2) {
    return { status: 'skipped', message: '现场签到型场次，需人工完成' };
  }
  if (session.replayUrl === null) return { status: 'skipped', message: '这场没有回放地址' };
  if (session.liveCourseId === null) {
    return { status: 'failed', message: '场次缺少 liveCourseId，无法上报观看进度' };
  }

  const history = await readMeetWatchHistory(client, session.liveCourseId, input.userId);
  if (history.split(',').includes('#')) return { status: 'done', message: '已确认考勤完成（历史为 #）' };

  const videos = await getMeetVideos(client, session.liveCourseId);
  const seen = new Set(history.split(',').filter((value) => value !== ''));
  let sent = 0;
  for (const span of roomSpans(videos)) {
    for (let minute = span.startMin + 1; minute <= span.endMin; minute += 1) {
      if (control.stopped()) return { status: 'skipped', message: '已停止' };
      await heartbeat();
      if (seen.has(String(minute))) continue;
      await client.call('meetSetWatch', {
        paramSecret: meetParamSecret([
          input.recruitId,
          session.liveCourseId,
          input.userId,
          minute,
          2,
          span.videoId,
        ]),
        jsonpCallBack: 'jsonpCallBack',
      });
      sent += 1;
    }
  }

  const fresh = await readMeetWatchHistory(client, session.liveCourseId, input.userId);
  if (fresh.split(',').includes('#')) {
    return { status: 'done', message: `已看完 ${videos.length} 段（补报 ${sent} 个进度点，考勤完成）` };
  }
  return {
    status: 'failed',
    message: `已上报 ${sent} 个进度点（${videos.length} 段），但平台未返回完成标记（当前历史：${fresh || '空'}）`,
  };
}

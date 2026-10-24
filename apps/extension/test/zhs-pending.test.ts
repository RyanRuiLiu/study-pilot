/*
 * 智慧树待办里的见面课：只列「已开始且没完成」的，且按能不能代做分开。
 *
 * 这里钉住四件事：
 *   - 已结束、有回放、历史没有 `#` → 自动项（带执行按钮）；
 *   - 历史已有 `#`、未开播、已结束但没回放 → 不进待办；
 *   - 直播中的在线场次、进行中的现场签到 → 手动项（`manual`），不摆执行按钮；
 *   - 已结束的现场签到不再列：平台没给完成状态，不能永久挂在待办里。
 */

import { describe, expect, it } from 'vitest';
import { zhsPendingCommand } from '../src/adapters/zhihuishu/messages/pending.ts';
import type { ZhsPendingSummary } from '../src/adapters/zhihuishu/messages/payload.ts';
import type { ZhsMessageDeps } from '../src/adapters/zhihuishu/messages/deps.ts';
import type { QueryOutcome } from '../src/protocol.ts';

const COURSE = {
  courseId: 1000009999,
  recruitId: 470001,
  secret: 'hex-secret',
  name: '示例课程甲',
  schoolName: '示例大学',
  startTime: 0,
  endTime: 0,
  enabled: true,
};

const CHAPTERS = {
  data: {
    videoChapterDtos: [
      {
        id: 1,
        name: '第一章',
        videoLessons: [
          { id: 11, name: '课一', videoId: 1, videoSec: 100, videoSmallLessons: null },
          { id: 12, name: '课二', videoId: 2, videoSec: 200, videoSmallLessons: null },
        ],
      },
    ],
  },
};

function meet(over: Record<string, unknown>): Record<string, unknown> {
  return {
    taskId: 'm',
    taskName: '见面课',
    taskStatus: '3',
    startTime: '2026-10-08 18:30:00',
    endTime: '2026-10-08 20:00:00',
    replayCourseUrl: '//lc.zhihuishu.com/live/vod_room.html?liveId=1',
    liveCourseUrl: '//lc.zhihuishu.com/live/live_room.html?liveId=1',
    liveCourseId: 'lc-1',
    videoId: 'v-1',
    signOpenStatus: '2',
    askLeaveStatus: '0',
    ...over,
  };
}

const SESSIONS = [
  meet({ taskId: 'A', taskName: '已结束的回放' }),
  meet({ taskId: 'B', taskName: '已看完的回放', liveCourseId: 'lc-2' }),
  meet({ taskId: 'C', taskName: '未开播', taskStatus: '1', liveCourseId: 'lc-3' }),
  meet({ taskId: 'D', taskName: '正在直播', taskStatus: '2', liveCourseId: 'lc-4' }),
  meet({
    taskId: 'E',
    taskName: '现场签到',
    taskStatus: '2',
    signOpenStatus: '1',
    liveCourseId: 'lc-5',
  }),
  meet({
    taskId: 'F',
    taskName: '已结束的现场',
    signOpenStatus: '1',
    liveCourseId: 'lc-6',
  }),
  meet({
    taskId: 'G',
    taskName: '已结束还没回放',
    replayCourseUrl: '',
    liveCourseId: 'lc-7',
  }),
  meet({ taskId: 'H', taskName: '考勤方式没读到', signOpenStatus: null, liveCourseId: 'lc-8' }),
];

function fakeDeps(): ZhsMessageDeps {
  return {
    config: {
      read: async () => ({ zhihuishu: { courses: [COURSE] } }),
    } as unknown as ZhsMessageDeps['config'],
    readCookie: async () => JSON.stringify({ uuid: 'dev-1', userId: 42 }),
    refreshCourses: async () => ({ ok: true, courses: [COURSE] }),
    client: {
      call: async (name: string, params: Record<string, unknown>) => {
        if (name === 'loginUserInfo') return {};
        if (name === 'videoList') return CHAPTERS;
        if (name === 'studyInfo') return { data: { lesson: { 11: { watchState: 1 } }, lv: {} } };
        if (name === 'examHomeworkList') return { rt: { studentHomeworkList: [] } };
        if (name === 'examType') return { rt: 0 };
        if (name === 'meetSessions') return { maps: SESSIONS };
        if (name === 'meetWatchHistory') {
          // B 已看完；其余场次历史为空
          return { rt: params.courseId === 'lc-2' ? '#' : '' };
        }
        throw new Error(`假 client 没有登记 ${name}`);
      },
    } as unknown as ZhsMessageDeps['client'],
  };
}

async function run(deps: ZhsMessageDeps): Promise<ZhsPendingSummary> {
  let out: QueryOutcome<ZhsPendingSummary> | undefined;
  await zhsPendingCommand(deps)({ type: 'ZHS_PENDING_SUMMARY' }, (response) => {
    out = response as QueryOutcome<ZhsPendingSummary>;
  });
  if (out === undefined) throw new Error('处理器没有回响应');
  if (out.status !== 'ok') throw new Error(`处理器返回 ${out.status}`);
  return out.value;
}

describe('待办里的见面课', () => {
  it('只列已开始且没完成的；能回放的进自动，直播中/现场进手动', async () => {
    const summary = await run(fakeDeps());
    const meetEntries = summary.entries.filter((entry) => entry.kind === 'meetWatch');
    expect(meetEntries.map((entry) => entry.itemId)).toEqual([
      'zhs-meet-A',
      'zhs-meet-D',
      'zhs-meet-E',
    ]);

    const [replay, live, onsite] = meetEntries;
    // 已结束 + 有回放 + 没看完：可代做
    expect(replay!.status).toBe('未观看');
    expect(replay!.manual).toBeUndefined();
    expect(replay!.href).toContain('vod_room.html');
    expect(replay!.sec).toBe(5400);
    // 正在直播：本人看
    expect(live!.status).toBe('直播中');
    expect(live!.manual).toBe(true);
    expect(live!.href).toContain('live_room.html');
    // 现场签到：本人到场
    expect(onsite!.status).toBe('现场签到');
    expect(onsite!.manual).toBe(true);
  });

  it('历史读取失败仍把可回放场次列出来，交给执行侧再判', async () => {
    const deps = fakeDeps();
    const call = (deps.client as unknown as { call: (...args: unknown[]) => Promise<unknown> }).call;
    (deps.client as unknown as { call: unknown }).call = async (
      name: string,
      params: Record<string, unknown>,
    ) => {
      if (name === 'meetWatchHistory') throw new Error('历史暂时读不到');
      return call(name, params);
    };

    const summary = await run(deps);
    const replay = summary.entries.find((entry) => entry.itemId === 'zhs-meet-A');
    expect(replay?.status).toBe('未完成');
    expect(replay?.manual).toBeUndefined();
  });
});

import { describe, expect, it } from 'vitest';
import type { RunControl } from '@study-pilot/application';
import type { ZhsClient } from '../src/client.ts';
import type { ZhsMeetSession } from '../src/meet.ts';
import { readMeetWatchHistory, watchMeetReplay } from '../src/meet-watch.ts';

const NEVER_STOPPED: RunControl = { stopped: () => false };
const NO_BEATS = async (): Promise<void> => {};

function session(overrides: Partial<ZhsMeetSession> = {}): ZhsMeetSession {
  return {
    taskId: 'm1',
    name: '第一次见面课',
    status: 3,
    startAt: new Date(2026, 9, 8, 18, 30, 0).getTime(),
    endAt: new Date(2026, 9, 8, 20, 0, 0).getTime(),
    replayUrl: 'https://lc.zhihuishu.com/live/vod_room.html?liveId=1',
    liveUrl: null,
    examId: null,
    quizStatus: null,
    liveCourseId: '1001',
    signOpenStatus: 2,
    askLeaveStatus: null,
    ...overrides,
  };
}

/**
 * 上报载荷第六格的明文（`paramSecret` 是 XOR-hex，key `zhihuishu`，与 `sign.ts` 的
 * 编码器互逆）——测试要断言「哪一分钟、带哪一段的 id」，不看密文。
 */
function decodeParamSecret(secret: string): string[] {
  const key = 'zhihuishu';
  let text = '';
  for (let i = 0; i < secret.length; i += 2) {
    text += String.fromCharCode(parseInt(secret.slice(i, i + 2), 16) ^ key.charCodeAt(i / 2 % key.length));
  }
  return text.split(';');
}

interface FakeOptions {
  /** 进场的观看历史（逗号分钟，或 `#`） */
  history: string;
  /** 房间里的视频段（形态取自 2026-11-01 真机 getVideosByLiveId 响应，值合成） */
  videos: Array<{ id: number; duration: number; sort: number }>;
  /** 报满这么多个点后平台才写 `#`；null = 这一轮始终不给完成标记 */
  completesAfter: number | null;
}

function fakeClient(options: FakeOptions): { client: ZhsClient; reports: string[][] } {
  let history = options.history;
  let sent = 0;
  const reports: string[][] = [];
  const client: ZhsClient = {
    call: async (name, payload = {}) => {
      if (name === 'meetWatchHistory') return { status: '200', rt: history };
      if (name === 'meetVideos') return options.videos;
      if (name === 'meetSetWatch') {
        const plain = decodeParamSecret(String(payload.paramSecret ?? ''));
        reports.push(plain);
        sent += 1;
        if (options.completesAfter === null) return { status: '200', rt: false };
        if (sent >= options.completesAfter) history = '#';
        return { status: '200', rt: true };
      }
      throw new Error(`unexpected ${name}`);
    },
  };
  return { client, reports };
}

/** 一段 3592 秒 + 一段 1848 秒：接成的分钟轴是 1..60 与 61..91（真机那场的真实时长）。 */
const TWO_VIDEOS = [
  { id: 2001, duration: 3592, sort: 0 },
  { id: 2002, duration: 1848, sort: 9 },
];

describe('readMeetWatchHistory', () => {
  it('返回平台 rt 字符串；缺字段给空串', async () => {
    const { client } = fakeClient({ history: '60,120', videos: [], completesAfter: null });
    await expect(readMeetWatchHistory(client, '1001', 1)).resolves.toBe('60,120');
  });
});

describe('watchMeetReplay', () => {
  it('两段视频的房间：逐段各报自己那段，第一段 1..60、第二段 61..91', async () => {
    const { client, reports } = fakeClient({ history: '', videos: TWO_VIDEOS, completesAfter: 91 });
    const outcome = await watchMeetReplay(client, session(), { recruitId: 7, userId: 2 }, NEVER_STOPPED, NO_BEATS);

    expect(outcome.status).toBe('done');
    // 轴长来自两段真实时长（91 分），不是直播起止（18:30–20:00 = 90 分）
    expect(reports).toHaveLength(91);
    expect(reports[0]).toEqual(['7', '1001', '2', '1', '2', '2001']);
    expect(reports[59]).toEqual(['7', '1001', '2', '60', '2', '2001']);
    // 换段：第 61 分钟带的是第二段的 id，不是整串、也不是第一段
    expect(reports[60]).toEqual(['7', '1001', '2', '61', '2', '2002']);
    expect(reports[90]).toEqual(['7', '1001', '2', '91', '2', '2002']);
    const minutes = reports.map((plain) => Number(plain[3]));
    expect(new Set(minutes).size).toBe(91);
    expect(reports.every((plain) => plain[5] === '2001' || plain[5] === '2002')).toBe(true);
  });

  it('单段房间：按这段自己的时长报（10 分钟 600 秒 → 1..10）', async () => {
    const { client, reports } = fakeClient({
      history: '',
      videos: [{ id: 3001, duration: 600, sort: 0 }],
      completesAfter: 10,
    });
    const outcome = await watchMeetReplay(client, session(), { recruitId: 7, userId: 2 }, NEVER_STOPPED, NO_BEATS);
    expect(outcome.status).toBe('done');
    expect(reports.map((plain) => plain[3])).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
    expect(reports.every((plain) => plain[5] === '3001')).toBe(true);
  });

  it('历史里已有的分钟跳过——平台原话「重复播放不记录进签到进度」', async () => {
    const firstVideoMinutes = Array.from({ length: 60 }, (_, i) => String(i + 1)).join(',');
    const { client, reports } = fakeClient({
      history: firstVideoMinutes,
      videos: TWO_VIDEOS,
      completesAfter: 31,
    });
    const outcome = await watchMeetReplay(client, session(), { recruitId: 7, userId: 2 }, NEVER_STOPPED, NO_BEATS);

    expect(outcome.status).toBe('done');
    // 第一段 60 分钟全在历史里，只剩第二段 61..91
    expect(reports).toHaveLength(31);
    expect(reports[0]?.[3]).toBe('61');
    expect(reports[0]?.[5]).toBe('2002');
  });

  it('历史已有 #：直接完成，不读段表也不上报', async () => {
    const { client, reports } = fakeClient({ history: '#', videos: TWO_VIDEOS, completesAfter: 0 });
    const outcome = await watchMeetReplay(client, session(), { recruitId: 1, userId: 2 }, NEVER_STOPPED, NO_BEATS);
    expect(outcome.status).toBe('done');
    expect(reports).toHaveLength(0);
  });

  it('平台不写 #：如实失败，并说清报了几段几个点', async () => {
    const { client } = fakeClient({ history: '', videos: TWO_VIDEOS, completesAfter: null });
    const outcome = await watchMeetReplay(client, session(), { recruitId: 7, userId: 2 }, NEVER_STOPPED, NO_BEATS);
    expect(outcome.status).toBe('failed');
    expect(outcome.message).toContain('已上报 91 个进度点（2 段）');
  });

  it('每个进度位敲一次心跳：一场几十个写点不能靠外壳 120 秒的判中断硬撑', async () => {
    const { client } = fakeClient({ history: '', videos: TWO_VIDEOS, completesAfter: 91 });
    let beats = 0;
    const outcome = await watchMeetReplay(client, session(), { recruitId: 7, userId: 2 }, NEVER_STOPPED, async () => {
      beats += 1;
    });
    expect(outcome.status).toBe('done');
    expect(beats).toBe(91);
  });

  it('现场签到型：跳过，不碰观看接口', async () => {
    const { client, reports } = fakeClient({ history: '', videos: TWO_VIDEOS, completesAfter: null });
    const outcome = await watchMeetReplay(
      client,
      session({ signOpenStatus: 1 }),
      { recruitId: 1, userId: 2 },
      NEVER_STOPPED,
      NO_BEATS,
    );
    expect(outcome.status).toBe('skipped');
    expect(reports).toHaveLength(0);
  });

  it('没有回放地址：跳过', async () => {
    const { client, reports } = fakeClient({ history: '', videos: TWO_VIDEOS, completesAfter: null });
    const outcome = await watchMeetReplay(
      client,
      session({ replayUrl: null }),
      { recruitId: 1, userId: 2 },
      NEVER_STOPPED,
      NO_BEATS,
    );
    expect(outcome.status).toBe('skipped');
    expect(reports).toHaveLength(0);
  });

  it('缺 liveCourseId：失败，且一次接口都不发', async () => {
    const { client, reports } = fakeClient({ history: '', videos: TWO_VIDEOS, completesAfter: null });
    const outcome = await watchMeetReplay(
      client,
      session({ liveCourseId: null }),
      { recruitId: 1, userId: 2 },
      NEVER_STOPPED,
      NO_BEATS,
    );
    expect(outcome.status).toBe('failed');
    expect(reports).toHaveLength(0);
  });

  it('停止后不再发新的进度点', async () => {
    const calls: string[] = [];
    let stopped = false;
    const control: RunControl = { stopped: () => stopped };
    const client: ZhsClient = {
      call: async (name) => {
        calls.push(name);
        if (name === 'meetWatchHistory') {
          stopped = true;
          return { status: '200', rt: '' };
        }
        if (name === 'meetVideos') return TWO_VIDEOS;
        throw new Error('should not set');
      },
    };
    const outcome = await watchMeetReplay(client, session(), { recruitId: 1, userId: 2 }, control, NO_BEATS);
    expect(outcome.status).toBe('skipped');
    expect(calls).toEqual(['meetWatchHistory', 'meetVideos']);
  });
});

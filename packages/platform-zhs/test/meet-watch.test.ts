import { describe, expect, it } from 'vitest';
import type { RunControl } from '@study-pilot/application';
import type { ZhsClient } from '../src/client.ts';
import type { ZhsMeetSession } from '../src/meet.ts';
import { readMeetWatchHistory, watchMeetReplay } from '../src/meet-watch.ts';

const NEVER_STOPPED: RunControl = { stopped: () => false };

function session(overrides: Partial<ZhsMeetSession> = {}): ZhsMeetSession {
  return {
    taskId: 'm1',
    name: '第一次见面课',
    status: 3,
    startAt: new Date(2026, 9, 8, 18, 30, 0).getTime(),
    endAt: new Date(2026, 9, 8, 18, 32, 0).getTime(),
    replayUrl: 'https://lc.zhihuishu.com/live/vod_room.html?liveId=1',
    liveUrl: null,
    examId: null,
    quizStatus: null,
    liveCourseId: '1001',
    videoId: '2001',
    signOpenStatus: 2,
    askLeaveStatus: null,
    ...overrides,
  };
}

function fakeClient(historyStart: string): { client: ZhsClient; calls: string[] } {
  const calls: string[] = [];
  let history = historyStart;
  const client: ZhsClient = {
    call: async (name) => {
      calls.push(name);
      if (name === 'meetWatchHistory') return { status: '200', rt: history };
      if (name === 'meetSetWatch') {
        history = '#';
        return { status: '200', rt: true };
      }
      throw new Error(`unexpected ${name}`);
    },
  };
  return { client, calls };
}

describe('readMeetWatchHistory', () => {
  it('返回平台 rt 字符串；缺字段给空串', async () => {
    const { client } = fakeClient('60,120');
    await expect(readMeetWatchHistory(client, '1001', 1)).resolves.toBe('60,120');
  });
});

describe('watchMeetReplay', () => {
  it('在线观看型：补进度到片尾，历史出现 # 即完成', async () => {
    const { client, calls } = fakeClient('');
    const outcome = await watchMeetReplay(client, session(), { recruitId: 1, userId: 2 }, NEVER_STOPPED);
    expect(outcome.status).toBe('done');
    expect(calls.filter((name) => name === 'meetSetWatch')).toHaveLength(2);
    expect(calls.filter((name) => name === 'meetWatchHistory')).toHaveLength(2);
  });

  it('历史已有 #：直接完成，不重复上报', async () => {
    const { client, calls } = fakeClient('#');
    const outcome = await watchMeetReplay(client, session(), { recruitId: 1, userId: 2 }, NEVER_STOPPED);
    expect(outcome.status).toBe('done');
    expect(calls).toEqual(['meetWatchHistory']);
  });

  it('现场签到型：跳过，不碰观看接口', async () => {
    const { client, calls } = fakeClient('');
    const outcome = await watchMeetReplay(
      client,
      session({ signOpenStatus: 1 }),
      { recruitId: 1, userId: 2 },
      NEVER_STOPPED,
    );
    expect(outcome.status).toBe('skipped');
    expect(calls).toHaveLength(0);
  });

  it('停止后不再发新的进度点', async () => {
    const { client, calls } = fakeClient('');
    let stopped = false;
    const control: RunControl = { stopped: () => stopped };
    // 第一次读历史后停：循环不会再发 set
    const wrapped: ZhsClient = {
      call: async (name) => {
        calls.push(name);
        if (name === 'meetWatchHistory') {
          stopped = true;
          return { status: '200', rt: '' };
        }
        throw new Error('should not set');
      },
    };
    const outcome = await watchMeetReplay(wrapped, session(), { recruitId: 1, userId: 2 }, control);
    expect(outcome.status).toBe('skipped');
    expect(calls).toEqual(['meetWatchHistory']);
    void client;
  });
});

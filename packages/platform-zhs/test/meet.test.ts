import { describe, expect, it } from 'vitest';
import type { ZhsClient } from '../src/client.ts';
import { getMeetVideos, normalizeMeetSessions, normalizeMeetVideos } from '../src/meet.ts';

/** 形态取自 2026-10-17 真机抓包的一条（裁到用到的字段，id 与地址换成合成样例）。 */
const SESSION = {
  taskId: '1100001',
  taskName: '第一次见面课',
  taskType: '1',
  taskStatus: '3',
  startTime: '2026-10-08 18:30:00',
  endTime: '2026-10-08 20:00:00',
  courseEndTime: '2026-12-27 23:59:59',
  liveCourseUrl: '//lc.zhihuishu.com/live/live_room.html?t=1798387199000&liveId=13000001',
  replayCourseUrl: '//lc.zhihuishu.com/live/vod_room.html?t=1798387199000&liveId=13000001',
  // 真机形态：房间里有几段视频不固定，这个字段是各段 id 拼的逗号串（2026-11-01 实测四场都是两值）
  videoId: '80000001,80000002',
  examH5Url: 'https://onlineexamh5new.zhihuishu.com/stuExamWeb.html#/webExamList/dohomework/470001/x/y/1000009999/5067/1',
  examId: 'M9n0P1q2',
  meetCourseExamStatus: '1',
  liveCourseId: '13000001',
  signOpenStatus: '2',
  askLeaveStatus: '0',
};

describe('normalizeMeetSessions', () => {
  it('形态符合：取到主题、状态、起止与回放地址', () => {
    const [session] = normalizeMeetSessions({ maps: [SESSION] });
    expect(session).toMatchObject({
      taskId: '1100001',
      name: '第一次见面课',
      status: 3,
      examId: 'M9n0P1q2',
      quizStatus: 1,
      liveCourseId: '13000001',
      signOpenStatus: 2,
    });
    // 段表不进场次：整串送进上报载荷会被服务端判成「查不到这个视频」（code=-1）
    expect(session).not.toHaveProperty('videoId');
    expect(session?.replayUrl).toBe('https://lc.zhihuishu.com/live/vod_room.html?t=1798387199000&liveId=13000001');
    expect(session?.startAt).toBe(new Date(2026, 9, 8, 18, 30, 0).getTime());
  });

  it('响应里没有 maps → 抛错，不拿空表冒充「这门课没有场次」', () => {
    expect(() => normalizeMeetSessions({ code: -1 })).toThrow(/没有 maps/);
    expect(() => normalizeMeetSessions(null)).toThrow(/没有 maps/);
  });

  it('空列表是结论：真·空数组给空表', () => {
    expect(normalizeMeetSessions({ maps: [] })).toEqual([]);
  });

  it('平台给的地址只放行自家 https：外域/非 https/畸形一律 null', () => {
    const [session] = normalizeMeetSessions({
      maps: [
        {
          ...SESSION,
          replayCourseUrl: 'javascript:alert(1)',
          liveCourseUrl: 'https://evil.example.com/live_room.html?liveId=1',
        },
      ],
    });
    expect(session?.replayUrl).toBeNull();
    expect(session?.liveUrl).toBeNull();
  });

  it('没有 examH5Url 这个字段：dohomework 入口（打开即开卷）不进通用载荷', () => {
    const [session] = normalizeMeetSessions({ maps: [SESSION] });
    expect(session).not.toHaveProperty('quizUrl');
  });
});

/** 形态取自 2026-11-01 真机 `getVideosByLiveId` 的响应（一个房间两段），值已合成。 */
const VIDEOS = [
  {
    duration: 3592,
    name: '示例段甲.mp4',
    thumbnailPath: 'https://image.zhihuishu.com/screenshot/zhs/livecourse/demo/甲.jpg',
    id: 100000001,
    sort: 0,
    watchCount: 115421,
  },
  {
    duration: 1848,
    name: '示例段乙.mp4',
    thumbnailPath: 'https://image.zhihuishu.com/screenshot/zhs/livecourse/demo/乙.jpg',
    id: 100000002,
    sort: 9,
    watchCount: 115421,
  },
];

describe('normalizeMeetVideos', () => {
  it('取 id 与时长；平台这里的 id 是数字，收成字符串', () => {
    expect(normalizeMeetVideos(VIDEOS)).toEqual([
      { id: '100000001', durationSec: 3592 },
      { id: '100000002', durationSec: 1848 },
    ]);
  });

  it('响应不是列表 → 抛错，不拿空表冒充「这房间没有视频」', () => {
    expect(() => normalizeMeetVideos(null)).toThrow(/不是一个列表/);
    expect(() => normalizeMeetVideos({ rt: VIDEOS })).toThrow(/不是一个列表/);
  });

  it('缺 id 或缺时长 → 抛错：轴算不出来就不许带着半截数据去上报', () => {
    expect(() => normalizeMeetVideos([{ duration: 600 }])).toThrow(/没有 id/);
    expect(() => normalizeMeetVideos([{ id: 100000001 }])).toThrow(/没有有效时长/);
    expect(() => normalizeMeetVideos([{ id: 100000001, duration: 0 }])).toThrow(/没有有效时长/);
    expect(() => normalizeMeetVideos([null])).toThrow(/不是对象/);
  });
});

describe('getMeetVideos', () => {
  it('用场次的 liveCourseId 当 liveId 发（参数名钉死，别漂）', async () => {
    const sent: Array<{ name: string; payload?: Record<string, unknown> }> = [];
    const client: ZhsClient = {
      call: async (name, payload) => {
        sent.push({ name, payload });
        return VIDEOS;
      },
    };
    await expect(getMeetVideos(client, '13000001')).resolves.toHaveLength(2);
    expect(sent).toEqual([{ name: 'meetVideos', payload: { liveId: '13000001' } }]);
  });
});

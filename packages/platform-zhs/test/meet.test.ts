import { describe, expect, it } from 'vitest';
import { normalizeMeetSessions } from '../src/meet.ts';

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
  videoId: '80000001',
  examH5Url: 'https://onlineexamh5new.zhihuishu.com/stuExamWeb.html#/webExamList/dohomework/470001/x/y/1000009999/5067/1',
  examId: 'M9n0P1q2',
  meetCourseExamStatus: '1',
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
    });
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

/*
 * 见面课场次（模块 4）：只读 + 提醒。
 *
 * 数据源是见面课页自己那条接口（`/onlineSchool/json/teachMeeting/listTeachMeetingStu`，
 * 2026-10-17 抓包读出来的路径，FINDINGS 里记的 stuonline 域那条是错的）。
 * 每场带：主题、状态、起止时刻、直播与回放房间地址、见面课测验入口（`examH5Url`，
 * dohomework 路由、尾参 /1——**打开即开卷**，这里只带出来，不替谁点它）、测验状态。
 *
 * 考勤：Ryan 2026-10-17 给的学校口径是「看直播或回放满 80% 即得考勤分，无需签到」，
 * 所以这一项的**动作是看回放**（`replayCourseUrl`），不是签到——签到那套
 * （`signOpenStatus`/`askLeaveStatus`）原样带出，只作展示。
 */

import type { ZhsClient } from './client.ts';
import { parsePlatformTime } from './exam-list.ts';

/** 一场见面课（读取那一刻的样子）。取不到的字段给 null——不猜。 */
export interface ZhsMeetSession {
  taskId: string;
  /** 场次主题（条目名，与作业清单里见面课测验的条目名同一个） */
  name: string;
  /** `taskStatus`：3 = 已结束、1 = 未开始（实测的两个值，其余原样带出） */
  status: number;
  startAt: number | null;
  endAt: number | null;
  /** 回放房间（`lc.zhihuishu.com/live/vod_room.html?...`）——考勤就看它 */
  replayUrl: string | null;
  /** 直播房间 */
  liveUrl: string | null;
  /** 见面课测验入口（**dohomework 路由，打开即开卷**；只带出来，不自动点） */
  quizUrl: string | null;
  /** 测验卷 id */
  examId: string | null;
  /** 测验状态（平台原始值：1 = 未交，其余原样） */
  quizStatus: number | null;
}

function str(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function num(value: unknown): number | null {
  const parsed = typeof value === 'string' ? Number(value) : value;
  return typeof parsed === 'number' && Number.isFinite(parsed) ? parsed : null;
}

/** `maps[]` → 场次表（纯函数，可离线核对形态）。 */
export function normalizeMeetSessions(rt: unknown): ZhsMeetSession[] {
  const maps = (rt as { maps?: unknown } | null | undefined)?.maps;
  if (!Array.isArray(maps)) return [];
  return maps
    .filter((entry): entry is Record<string, unknown> => entry !== null && typeof entry === 'object')
    .map((entry) => ({
      taskId: str(entry.taskId),
      name: str(entry.taskName),
      status: num(entry.taskStatus) ?? 0,
      startAt: parsePlatformTime(entry.startTime),
      endAt: parsePlatformTime(entry.endTime),
      replayUrl: str(entry.replayCourseUrl) === '' ? null : str(entry.replayCourseUrl),
      liveUrl: str(entry.liveCourseUrl) === '' ? null : str(entry.liveCourseUrl),
      quizUrl: str(entry.examH5Url) === '' ? null : str(entry.examH5Url),
      examId: str(entry.examId) === '' ? null : str(entry.examId),
      quizStatus: num(entry.meetCourseExamStatus),
    }))
    .filter((session) => session.taskId !== '');
}

/** 读一门课的见面课场次（一页给足；场次按「次」算，几十场封顶）。 */
export async function getMeetSessions(client: ZhsClient, recruitId: number): Promise<ZhsMeetSession[]> {
  const body = await client.call('meetSessions', {
    recruitId,
    'page.pageNo': 0,
    'page.pageSize': 50,
  });
  return normalizeMeetSessions(body);
}

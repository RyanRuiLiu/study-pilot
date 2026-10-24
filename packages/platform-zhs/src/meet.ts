/*
 * 见面课场次（模块 4）：读取场次 + 在线回放观看。
 *
 * 数据源是见面课页自己那条接口（`/onlineSchool/json/teachMeeting/listTeachMeetingStu`，
 * 2026-10-17 抓包读出来的路径）。
 * 每场带：主题、状态、起止时刻、直播与回放房间地址（两个都过 `safeUrl`）、测验状态。
 * **不带 `examH5Url`**：那是 dohomework 路由（打开即开卷），没人用它之前不摆进通用
 * 字段——摆了就等着哪天被谁顺手塞进 href。执行侧要用时按模块 2 的入口参数单独接。
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
  /** `taskStatus`：1 = 未开始、2 = 进行中、3 = 已结束、4 = 提前 30 分钟预播（页面源码口径，其余原样带出） */
  status: number;
  startAt: number | null;
  endAt: number | null;
  /** 回放房间（`lc.zhihuishu.com/live/vod_room.html?...`）——考勤就看它 */
  replayUrl: string | null;
  /** 直播房间 */
  liveUrl: string | null;
  /** 测验卷 id */
  examId: string | null;
  /** 测验状态（平台原始值：1 = 未交，其余原样） */
  quizStatus: number | null;
  /** 直播/回放房间的业务 id（观看进度上报用） */
  liveCourseId: string | null;
  /** 直播/回放的视频 id（观看进度上报用） */
  videoId: string | null;
  /** 考勤方式：2 = 在线观看（看满 80%）；其余原样（现场等） */
  signOpenStatus: number | null;
  /** 请假状态（只作展示） */
  askLeaveStatus: number | null;
}

function str(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function num(value: unknown): number | null {
  const parsed = typeof value === 'string' ? Number(value) : value;
  return typeof parsed === 'number' && Number.isFinite(parsed) ? parsed : null;
}

/**
 * 平台给的地址只放行**自家的 https**（回放/直播房间、测验入口都在这几个域上）。
 *
 * 不校验就原样带出去，等于把平台响应当成可信字符串往界面上送——今晚要拿
 * `replayUrl` 做「看回放」的落点，那个 href 必须是自家地址。放行判据写死：
 * `https:` ＋ 主机名以 `.zhihuishu.com` 结尾（或就是它）。
 */
function safeUrl(value: unknown): string | null {
  const text = str(value);
  if (text === '') return null;
  const normalized = text.startsWith('//') ? `https:${text}` : text;
  try {
    const url = new URL(normalized);
    const host = url.hostname;
    const firstParty = host === 'zhihuishu.com' || host.endsWith('.zhihuishu.com');
    return url.protocol === 'https:' && firstParty ? url.toString() : null;
  } catch {
    return null;
  }
}

/**
 * 信封 → 场次表（纯函数，可离线核对形态）。
 *
 * 形态不符**抛错**，不返回空表：空表的意思是「这门课没有见面课场次」，那是结论，
 * 不能拿它冒充「我没读懂平台回了什么」——后者要一路说到界面上去（调用方的
 * catch 会写成「见面课场次读取失败：…」）。真·空数组才给空表。
 */
export function normalizeMeetSessions(body: unknown): ZhsMeetSession[] {
  const maps = (body as { maps?: unknown } | null | undefined)?.maps;
  if (!Array.isArray(maps)) throw new Error('见面课场次：响应里没有 maps 列表');
  return maps
    .filter((entry): entry is Record<string, unknown> => entry !== null && typeof entry === 'object')
    .map((entry) => ({
      taskId: str(entry.taskId),
      name: str(entry.taskName),
      status: num(entry.taskStatus) ?? 0,
      startAt: parsePlatformTime(entry.startTime),
      endAt: parsePlatformTime(entry.endTime),
      replayUrl: safeUrl(entry.replayCourseUrl),
      liveUrl: safeUrl(entry.liveCourseUrl),
      examId: str(entry.examId) === '' ? null : str(entry.examId),
      quizStatus: num(entry.meetCourseExamStatus),
      liveCourseId: str(entry.liveCourseId) === '' ? null : str(entry.liveCourseId),
      videoId: str(entry.videoId) === '' ? null : str(entry.videoId),
      signOpenStatus: num(entry.signOpenStatus),
      askLeaveStatus: num(entry.askLeaveStatus),
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

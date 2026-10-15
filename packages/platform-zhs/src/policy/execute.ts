/*
 * 单个视频单元的完成流程（「最短时间」的执行形态）。
 *
 *   ① prelearningNote   打开课时 → 拿学习记录 id（上报的 zwsds 用料）；
 *   ② saveStudyInterval 提交「原倍速完整观看」的上报（见 report.ts 的口径）；
 *   ③ 回读 queryStuyInfo **确认完成**——不拿「请求 200」当成功：
 *      watchState=1 且累计时长 ≥ 视频时长，才算做完这一条。
 *
 * 终止条件（抛错即整轮中止，见 application/round.ts 的语义）：
 *   - 服务端返回 -12（网易易盾人机验证）或 -10（多端播放警告）——
 *     这两者是「这个账号现在不该继续自动化」的信号，继续把余下的项跑完
 *     只会加重风险；如实抛错、让这一轮停下并由界面转达。
 *   其余失败（-1/-5/网络）按单项失败返回，余下项继续——那类失败重复出现
 *   本身就是症状，会在界面上一眼看出来。
 */

import type { RunControl, RunOutcome } from '@study-pilot/application';
import { ZhsApiError, type ZhsClient } from '../client.ts';
import { buildStudyReport } from '../report.ts';
import { getCourseUnits, type ZhsUnit } from '../structure.ts';

/** 需要整轮停止的平台信号（-12 易盾 / -10 多端）。抛它就是中止这一轮。 */
export class ZhsRoundHalt extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ZhsRoundHalt';
  }
}

export interface ExecuteUnitInput {
  /** 课程入口参数（即课程记录里的 secret） */
  recruitAndCourseId: string;
  courseId: number;
  recruitId: number;
  unit: ZhsUnit;
  /** 设备号（getLoginUserInfo 取回；token 用料） */
  deviceUuid: string;
}

export async function executeUnit(
  client: ZhsClient,
  input: ExecuteUnitInput,
  control: RunControl,
): Promise<RunOutcome> {
  const { unit } = input;

  if (control.stopped()) return { status: 'skipped', message: '已停止' };

  // ① 打开课时，取学习记录 id
  const opened = (await client.call('prelearningNote', {
    ccCourseId: input.courseId,
    chapterId: unit.chapterId,
    isApply: 1,
    lessonId: unit.lessonId,
    recruitId: input.recruitId,
    videoId: unit.videoId,
  })) as { data?: { studiedLessonDto?: { id?: unknown } | null } | null };
  const recordId = opened.data?.studiedLessonDto?.id;
  if (typeof recordId !== 'number' && typeof recordId !== 'string') {
    return { status: 'failed', message: '未取到学习记录（prelearningNote 响应里没有 studiedLessonDto.id）' };
  }

  // ② 写前最后一个安全点
  if (control.stopped()) return { status: 'skipped', message: '已停止' };

  const report = buildStudyReport({
    unit,
    courseId: input.courseId,
    recruitId: input.recruitId,
    baseSec: unit.studyTotalTime,
    recordId,
    deviceUuid: input.deviceUuid,
  });
  try {
    await client.call('saveStudyInterval', { ...report });
  } catch (error) {
    if (error instanceof ZhsApiError && (error.code === -12 || error.code === -10)) {
      throw new ZhsRoundHalt(
        error.code === -12
          ? '触发人机验证（易盾），本轮已停止；稍后请在浏览器里正常使用一次课程再试'
          : '平台提示多端播放（-10），本轮已停止；请先关闭其他正在学习的窗口',
      );
    }
    return { status: 'failed', message: error instanceof Error ? error.message : String(error) };
  }

  // ③ 回读确认（闭环；读的是全课程口径，与计划时同一条路径）
  const units = await getCourseUnits(client, {
    recruitAndCourseId: input.recruitAndCourseId,
    recruitId: input.recruitId,
  });
  const fresh = units.find(
    (entry) => entry.videoId === unit.videoId && entry.smallLessonId === unit.smallLessonId,
  );
  if (fresh?.done === true && fresh.studyTotalTime >= unit.sec) {
    return { status: 'done', message: `已确认完成（累计观看 ${fresh.studyTotalTime} 秒）` };
  }
  return {
    status: 'failed',
    message: `上报已发送，但回读未确认完成（当前 watchState=${fresh?.done === true ? 1 : 0}）`,
  };
}

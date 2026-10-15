/*
 * 单个视频单元的执行（「1× 真人观看」的纯接口形态，2026-10-16 定稿）。
 *
 * 服务端能核对的只有时间事实：**声称看了 N 秒，就必须有 ≥N 秒的壁钟从
 * 「打开这节课」之后流过**——prelearningNote 就是对表点（它同时创建/返回
 * 学习记录）。因此流程是：
 *
 *   ① 打开课时（prelearningNote），同时读平台的验证旗标：
 *      `isSlide` / `isFace` 为真 = 平台要求先完成一次验证（滑块/人脸）。
 *      实测（2026-10-16）：这是一道**账号级的门**——被风控挂起后，所有课的
 *      保存都回 -12「需要弹出滑块验证」，纯接口无法自行完成人机验证（也不该
 *      由本工具去规避）。处置 = 冷却等待后重试：平台的门可能随时间解除；
 *      连续多次仍不解除就如实失败，把事实交给使用者。
 *   ② 等满与声称等长的壁钟秒（1×，期间定期心跳、每个安全点可停止）。
 *   ③ 一次性提交完整观看报告（mooc 式单报；口径见 report.ts）。
 *   ④ 回读 queryStuyInfo 确认 watchState=1——不拿 200 当成功。
 *
 * 保存遇 -12/-10 与旗标门同路处置（冷却重试）；重试仍拒 → ZhsRoundHalt
 * 中止整轮（继续跑只会反复撞同一道门，加重风控记分）。
 */

import type { RunControl, RunOutcome } from '@study-pilot/application';
import { ZhsApiError, type ZhsClient } from '../client.ts';
import { buildStudyReport } from '../report.ts';
import { getCourseUnits, type ZhsUnit } from '../structure.ts';

/** 需要整轮停止的平台信号（重试仍被拒时抛出）。 */
export class ZhsRoundHalt extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ZhsRoundHalt';
  }
}

/** 冷却等待的默认时长：平台门通常不会立刻解除，太短的重试只是白撞。 */
export const GATE_COOLDOWN_MS = 30 * 60 * 1000;
/** 同一次执行内对一道门的重试次数（含首次尝试）。 */
export const GATE_ATTEMPTS = 3;
/** 心跳与停止检查的粒度（等待被切成这样的小段）。 */
const WAIT_CHUNK_MS = 20_000;

export interface ExecuteUnitInput {
  recruitAndCourseId: string;
  courseId: number;
  recruitId: number;
  unit: ZhsUnit;
  /** 设备号（getLoginUserInfo 取回；token 用料） */
  deviceUuid: string;
}

/** 时序参数：默认值生产使用，测试注入小值/替身。 */
export interface ExecuteTiming {
  wait?: (ms: number) => Promise<void>;
  gateCooldownMs?: number;
  gateAttempts?: number;
}

const realWait = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/** 带心跳与停止点的长等待：切成小段，段间刷新心跳、检查停止。 */
async function pacedWait(
  totalMs: number,
  wait: (ms: number) => Promise<void>,
  heartbeat: () => Promise<void>,
  control: RunControl,
): Promise<boolean> {
  let left = totalMs;
  while (left > 0) {
    if (control.stopped()) return false;
    const chunk = Math.min(left, WAIT_CHUNK_MS);
    await wait(chunk);
    left -= chunk;
    await heartbeat();
  }
  return true;
}

/** 平台侧「需要先过验证」的信号（旗标或 -12/-10 拒绝）。 */
function gateSignalOf(openData: { isSlide?: unknown; isFace?: unknown } | null | undefined): string | null {
  if (openData?.isSlide === true) return '平台要求完成一次滑块验证';
  if (openData?.isFace === true) return '平台要求完成一次人脸验证';
  return null;
}

function isGateRejection(error: unknown): error is ZhsApiError {
  return error instanceof ZhsApiError && (error.code === -12 || error.code === -10);
}

export async function executeUnit(
  client: ZhsClient,
  input: ExecuteUnitInput,
  control: RunControl,
  heartbeat: () => Promise<void>,
  timing: ExecuteTiming = {},
): Promise<RunOutcome> {
  const wait = timing.wait ?? realWait;
  const cooldownMs = timing.gateCooldownMs ?? GATE_COOLDOWN_MS;
  const attempts = timing.gateAttempts ?? GATE_ATTEMPTS;
  const { unit } = input;

  let lastGate = '';
  // 无限循环 + 内部出口：每个分支要么返回要么抛，循环外没有「兜底返回」
  for (let attempt = 1; ; attempt++) {
    if (control.stopped()) return { status: 'skipped', message: '已停止' };

    // ① 打开课时，读记录 id 与验证旗标
    let opened: { data?: { studiedLessonDto?: { id?: unknown } | null; isSlide?: unknown; isFace?: unknown } | null };
    try {
      opened = (await client.call('prelearningNote', {
        ccCourseId: input.courseId,
        chapterId: unit.chapterId,
        isApply: 1,
        lessonId: unit.lessonId,
        recruitId: input.recruitId,
        videoId: unit.videoId,
      })) as typeof opened;
    } catch (error) {
      if (isGateRejection(error)) {
        lastGate = error.message || '平台拒绝了打开请求';
        if (attempt < attempts) {
          const ok = await pacedWait(cooldownMs, wait, heartbeat, control);
          if (!ok) return { status: 'skipped', message: '已停止' };
          continue;
        }
        throw new ZhsRoundHalt(`${lastGate}（冷却 ${Math.round(cooldownMs / 60000)} 分钟 ×${attempts} 次仍未解除），本轮已停止`);
      }
      return { status: 'failed', message: error instanceof Error ? error.message : String(error) };
    }

    const gate = gateSignalOf(opened.data);
    if (gate !== null) {
      lastGate = gate;
      if (attempt < attempts) {
        // 门挂着：等它自行解除再重试（纯接口不做验证规避）
        const ok = await pacedWait(cooldownMs, wait, heartbeat, control);
        if (!ok) return { status: 'skipped', message: '已停止' };
        continue;
      }
      throw new ZhsRoundHalt(`${gate}（冷却 ${Math.round(cooldownMs / 60000)} 分钟 ×${attempts} 次仍未解除），本轮已停止`);
    }

    const recordId = opened.data?.studiedLessonDto?.id;
    if (typeof recordId !== 'number' && typeof recordId !== 'string') {
      return { status: 'failed', message: '未取到学习记录（prelearningNote 响应里没有 studiedLessonDto.id）' };
    }

    // ② 等满所声称长度的壁钟秒（1×）
    const kept = await pacedWait(unit.sec * 1000, wait, heartbeat, control);
    if (!kept) return { status: 'skipped', message: '已停止' };
    if (control.stopped()) return { status: 'skipped', message: '已停止' };

    // ③ 一次性完整观看报告
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
      if (isGateRejection(error)) {
        lastGate = error instanceof Error ? error.message : '平台拒绝了保存';
        if (attempt < attempts) {
          const ok = await pacedWait(cooldownMs, wait, heartbeat, control);
          if (!ok) return { status: 'skipped', message: '已停止' };
          continue;
        }
        throw new ZhsRoundHalt(`${lastGate}（冷却 ${Math.round(cooldownMs / 60000)} 分钟 ×${attempts} 次仍未解除），本轮已停止`);
      }
      return { status: 'failed', message: error instanceof Error ? error.message : String(error) };
    }

    // ④ 回读确认
    const units = await getCourseUnits(client, {
      recruitAndCourseId: input.recruitAndCourseId,
      recruitId: input.recruitId,
    });
    const fresh = units.find(
      (entry) => entry.videoId === unit.videoId && entry.smallLessonId === unit.smallLessonId,
    );
    if (fresh?.done === true) {
      return { status: 'done', message: `已确认完成（累计观看 ${fresh.studyTotalTime} 秒）` };
    }
    return {
      status: 'failed',
      message: '上报已发送，但回读未确认完成（watchState 未变为已完成）',
    };
  }
}

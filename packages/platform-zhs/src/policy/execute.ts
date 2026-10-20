/*
 * 单个视频单元的执行（「1× 数据 + 快速完成」的纯接口形态；2026-10-16 定稿，
 * 2026-10-17 起节奏改快——数据口径不变，过程不做真实时长等待）。
 *
 * 数据口径（report.ts）：按 1× 真人观看生成——时长、序列、位置全部自洽。
 * 提交节奏：不等待真实时长（长视频按段上报）；出站仍走客户端的通用节流
 * （请求间最小间隔，见 client.ts）——服务端给出什么信号就如实处理。
 *
 * 实测备忘（2026-10-17 真机）：快速连发下单个单元被服务端完整接受——32 个单元
 * 约 1 秒/个全部 submitSuccess + watchState=1（服务端不核对「声称秒数 vs 壁钟」）；
 * 连续第 33 个起账号级风控门亮起（-12 / isSlide）。触发因子是**频率 / 连发量**
 * （10-16 亦实测：一分钟 8 次连发即触发）。门开启后的处置 = **立即停轮、如实
 * 告知**——不再静默冷却重试（实测门不会短时自解，静默等待只会让界面像卡死）。
 * 解除靠使用者在浏览器完成一次验证——验证在站点自己的学习页完成（方案 C，
 * 2026-10-17 定案：扩展页内嵌 SDK 被 Chrome 政策禁止、站点无独立验证页）；
 * 本轮已完成的单元都已保存，重新执行会从剩下的单元继续。
 *
 *   ① 打开课时（prelearningNote）：isSlide / isFace 为真 = 平台要求先完成一次
 *      验证（滑块/点选）；保存撞 -12（易盾人机验证）/ -10（多端播放警告）同样
 *      整轮中止——两种都是「这个账号现在不该继续自动化」的信号。
 *   ② 提交观看报告（口径见 report.ts）：短视频一份报完；长视频按 SEGMENT_SEC
 *      分段，段间以服务端累计秒为下一段基准（实测边界见 SEGMENT_SEC 注释）。
 *   ③ 回读 queryStuyInfo 确认 watchState=1——不拿 200 当成功。
 */

import type { RunControl, RunFailureAction, RunOutcome } from '@study-pilot/application';
import { ZhsApiError, type ZhsClient } from '../client.ts';
import { studyPageUrl } from '../pages.ts';
import { buildStudyReport } from '../report.ts';
import { getCourseUnits, type ZhsUnit } from '../structure.ts';

/**
 * 需要整轮停止的平台信号（立即停轮；使用者完成验证后重新执行）。
 *
 * `action` 是给界面的「下一步」：平台才知道去向，外壳原样呈现成一个跳转钮
 * （约定见 @study-pilot/application 的 RunFailureAction）。
 */
export class ZhsRoundHalt extends Error {
  readonly action: RunFailureAction | null;
  constructor(message: string, action: RunFailureAction | null = null) {
    super(message);
    this.name = 'ZhsRoundHalt';
    this.action = action;
  }
}

export interface ExecuteUnitInput {
  recruitAndCourseId: string;
  courseId: number;
  recruitId: number;
  unit: ZhsUnit;
  /** 设备号（CASLOGC cookie 取回；token 用料） */
  deviceUuid: string;
  /** 课程入口数据里的 isApply（queryCourse 读回；由计划层按轮缓存后传入） */
  isApply: number | string;
}

/**
 * 被拒的验证类信号 → 给人看的文案。
 *
 * -12 = 网易易盾人机验证（实测：页面加载易盾 SDK 与滑块题图）；
 * -10 = 多端播放警告（摸底记录）。两者都按整轮中止处理——继续跑只会加重风控；
 * 下一步都是到学习页：-12 拖滑块，-10 按平台提示处理（先关掉其他正在学习的窗口）。
 */
function rejectionHaltMessage(error: ZhsApiError): string {
  return error.code === -10
    ? '检测到多端播放，关闭其他窗口后重试'
    : gateHaltMessage('人机验证');
}

/** 平台侧「需要先过验证」的信号（旗标；文案里作为验证种类的名字）。 */
function gateSignalOf(openData: { isSlide?: unknown; isFace?: unknown } | null | undefined): string | null {
  if (openData?.isSlide === true) return '人机验证';
  if (openData?.isFace === true) return '人脸验证';
  return null;
}

function isGateRejection(error: unknown): error is ZhsApiError {
  return error instanceof ZhsApiError && (error.code === -12 || error.code === -10);
}

/**
 * 验证页地址：该课的学习页（站点自身地址形态；2026-10-17 金样本实测——
 * 在该页任意点开一个课时即弹出验证，站点自己完成后续校验）。
 *
 * 串的构造走 `pages.ts` 的 `studyPageUrl`（那里是全包唯一写这个地址的地方），
 * 这里只回答「验证该把人送去哪个页面」。
 */
function verifyPageUrl(recruitAndCourseId: string): string {
  return studyPageUrl(recruitAndCourseId);
}

/**
 * 门的停轮文案（界面与 CLI 共用同一句）：**只说事实，短**——状态行一行放得下。
 * 「下一步」不写进句子里，走 action 结构化字段（按钮与去处由界面呈现；
 * 去处只存在于站点学习页，全量源码检索无独立验证 URL）。
 */
export function gateHaltMessage(signal: string): string {
  return `需完成${signal}`;
}

/** 门的「下一步」：打开该课学习页（新标签页）完成验证。文案按 README 动作词习惯。 */
export function gateAction(recruitAndCourseId: string): RunFailureAction {
  return { platformId: 'zhihuishu', label: '打开验证页', url: verifyPageUrl(recruitAndCourseId) };
}

/**
 * 单份观看报告的时长上限（秒）。
 *
 * 实测（2026-10-17，同一门课 81 个单元）：仅有的两个 >30 分钟的视频
 * （36.5 / 35.1 分钟）单份报告后回读不翻转完成；其余全部单报通过，
 * 已实测通过的最大单报时长为 1644 秒。取 1600——落在已实测通过的安全区内。
 */
const SEGMENT_SEC = 1600;

export async function executeUnit(
  client: ZhsClient,
  input: ExecuteUnitInput,
  control: RunControl,
): Promise<RunOutcome> {
  const { unit } = input;
  const action = gateAction(input.recruitAndCourseId);
  if (control.stopped()) return { status: 'skipped', message: '已停止' };

  // ① 打开课时，读记录 id 与验证旗标。
  //    载荷与真实浏览器同形（2026-10-16 金样本解密核对）：字段就这六个，
  //    子节课时再加 lessonVideoId（= 子节 id，站点 `ee.lessonVideoId = A.id`）；
  //    无子节时为 0 且站点会 delete——wire 上不出现，我们同样不带。
  const note: Record<string, unknown> = {
    ccCourseId: input.courseId,
    chapterId: unit.chapterId,
    isApply: input.isApply,
    lessonId: unit.lessonId,
    recruitId: input.recruitId,
    videoId: unit.videoId,
  };
  if (unit.smallLessonId !== 0) note.lessonVideoId = unit.smallLessonId;
  let opened: { data?: { studiedLessonDto?: { id?: unknown } | null; isSlide?: unknown; isFace?: unknown } | null };
  try {
    opened = (await client.call('prelearningNote', note)) as typeof opened;
  } catch (error) {
    if (isGateRejection(error)) {
      throw new ZhsRoundHalt(rejectionHaltMessage(error), action);
    }
    return { status: 'failed', message: error instanceof Error ? error.message : String(error) };
  }

  const gate = gateSignalOf(opened.data);
  if (gate !== null) throw new ZhsRoundHalt(gateHaltMessage(gate), action);

  const recordId = opened.data?.studiedLessonDto?.id;
  if (typeof recordId !== 'number' && typeof recordId !== 'string') {
    return { status: 'failed', message: '未取到学习记录（prelearningNote 响应里没有 studiedLessonDto.id）' };
  }

  // ② 安全点：上报前检查停止（快速模式：不等真实时长、也不自设限流）
  if (control.stopped()) return { status: 'skipped', message: '已停止' };

  /*
   * ③ 观看报告：短视频一份报完；超过 SEGMENT_SEC 的长视频**分段报**。
   *
   * 段间以服务端累计秒为下一段的基准（不猜累计规则）：报一段 → 回读学情 →
   * 累计没涨就如实失败（不重试、不兜底）；涨了就接着报下一段。
   * 对 ≤SEGMENT_SEC 的单元，第一段即全长——行为与单份报告逐字相同。
   */
  let base = unit.studyTotalTime;
  while (true) {
    const segment = Math.min(SEGMENT_SEC, unit.sec - (base - unit.studyTotalTime));
    const report = buildStudyReport({
      unit,
      courseId: input.courseId,
      recruitId: input.recruitId,
      baseSec: base,
      recordId,
      deviceUuid: input.deviceUuid,
      lengthSec: segment,
      // 本段在视频轴上的起点 = 已声称看过的视频秒数（累计轴与视频轴在本工具里同步推进）
      videoFromSec: base - unit.studyTotalTime,
    });
    try {
      await client.call('saveStudyInterval', { ...report });
    } catch (error) {
      if (isGateRejection(error)) {
        throw new ZhsRoundHalt(rejectionHaltMessage(error), action);
      }
      return { status: 'failed', message: error instanceof Error ? error.message : String(error) };
    }

    // 报满全长即收（短视频在第一段就到此；只有长视频才继续下面的段间回读）
    if (base - unit.studyTotalTime + segment >= unit.sec) break;
    if (control.stopped()) return { status: 'skipped', message: '已停止' };

    const interim = await readUnit(client, input, unit);
    if (interim === null || interim.studyTotalTime <= base) {
      return { status: 'failed', message: '分段上报后回读未计入（累计观看未增长）' };
    }
    base = interim.studyTotalTime;
  }

  // ④ 回读确认
  const fresh = await readUnit(client, input, unit);
  if (fresh?.done === true) {
    return { status: 'done', message: `已确认完成（累计观看 ${fresh.studyTotalTime} 秒）` };
  }
  return {
    status: 'failed',
    message: '已上报，回读未确认完成（watchState 未变化）',
  };
}

/** 回读这个单元的最新学情（done 与累计秒）；结构里找不到就是 null。 */
async function readUnit(
  client: ZhsClient,
  input: ExecuteUnitInput,
  unit: ZhsUnit,
): Promise<ZhsUnit | null> {
  const units = await getCourseUnits(client, {
    recruitAndCourseId: input.recruitAndCourseId,
    recruitId: input.recruitId,
  });
  return units.find((entry) => entry.videoId === unit.videoId && entry.smallLessonId === unit.smallLessonId) ?? null;
}

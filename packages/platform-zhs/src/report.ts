/*
 * 完成上报的载荷组装（全包唯一一处）。
 *
 * 形态逐字段来自 2026-10-16 的真机金样本（saveDatabaseIntervalTimeV2，真播并提交成功），
 * 并在沙箱课《创造性思维》上实测闭环通过（submitSuccess → 回读 watchState=1）：
 *
 *   sdsew = XOR-hex( [recruitId, lessonId, smallLessonId, videoId, chapterId,
 *                     studyStatus, y, Ke, 位置HH:MM:SS, uuid+"zhs"] )   ← join(';') 后逐字符异或
 *   ewssw = 时间证明序列（buildSeries，见 sign.ts；首拍 base+1，每 2 秒一拍）
 *   zwsds = base64(studiedLessonDto.id)（prelearningNote 取回的记录 id）
 *
 * 口径（Ryan 定）：**原倍速完整观看**——y（本次增量）= 视频时长、
 * Ke = 既有累计 + 视频时长（≥ 视频时长必成立）、位置 = 片尾、序列按 1× 全程生成。
 * 不做倍速数字、不做部分时长。
 *
 * studyStatus：金样本（进行中）为 0，照此提交实测通过；完成态另有语义的
 * 可能性留待真机观测（若服务端开始按它区分，这里会最先看到差别）。
 */

import { buildSeries, formatPosition, xorHexEncode } from './sign.ts';
import type { ZhsUnit } from './structure.ts';

export interface StudyReport {
  ewssw: string;
  sdsew: string;
  zwsds: string;
  courseId: number;
}

export interface StudyReportInput {
  unit: ZhsUnit;
  courseId: number;
  recruitId: number;
  /** 平台上该单元已有的累计观看秒（queryStuyInfo 读回；未看过为 0） */
  baseSec: number;
  /** prelearningNote 取回的学习记录 id */
  recordId: string | number;
  /** getLoginUserInfo 取回的设备号（token = uuid + "zhs"） */
  deviceUuid: string;
}

export function buildStudyReport(input: StudyReportInput): StudyReport {
  const { unit } = input;
  const y = unit.sec;
  const ke = input.baseSec + unit.sec;
  const array = [
    input.recruitId,
    unit.lessonId,
    unit.smallLessonId,
    unit.videoId,
    unit.chapterId,
    0,
    y,
    ke,
    formatPosition(unit.sec),
    `${input.deviceUuid}zhs`,
  ];
  return {
    ewssw: buildSeries(input.baseSec, unit.sec),
    sdsew: xorHexEncode(array),
    // 记录 id 是十进制字符串，base64 其 UTF-8 字节（ASCII 下等同按字符编码）
    zwsds: btoa(String(input.recordId)),
    courseId: input.courseId,
  };
}

/* 上报组装的机械核对：字段序、Ke/y/位置口径、token 形态、序列与 zwsds。 */

import { describe, expect, it } from 'vitest';
import { buildStudyReport } from '../src/report.ts';
import type { ZhsUnit } from '../src/structure.ts';

const UNIT: ZhsUnit = {
  videoId: 90000002,
  lessonId: 9000000013,
  smallLessonId: 0,
  chapterId: 9000000007,
  chapterName: '创新的机会',
  name: '示例选项己',
  sec: 175,
  done: false,
  studyTotalTime: 0,
};

/** xorHex 的逆（测试内自备）。 */
function decodeSdsew(hex: string): string[] {
  let text = '';
  for (let i = 0; i < hex.length; i += 2) {
    text += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16) ^ 'zzpttjd'.charCodeAt((i / 2) % 7));
  }
  return text.split(';');
}

describe('buildStudyReport', () => {
  it('sdsew 十字段与顺序：recruitId, lessonId, smallLessonId, videoId, chapterId, studyStatus, y, Ke, 位置, token', () => {
    const report = buildStudyReport({
      unit: UNIT,
      courseId: 9000000001,
      recruitId: 900003,
      baseSec: 0,
      recordId: 90000000002,
      deviceUuid: 'TESTuuid',
    });
    expect(decodeSdsew(report.sdsew)).toEqual([
      '900003',
      '9000000013',
      '0',
      '90000002',
      '9000000007',
      '0',
      '175',
      '175',
      '00:02:55',
      'TESTuuidzhs',
    ]);
  });

  it('完整观看口径：y=视频时长、Ke=既有累计+时长、位置=片尾', () => {
    const report = buildStudyReport({
      unit: UNIT,
      courseId: 1,
      recruitId: 2,
      baseSec: 408,
      recordId: 1,
      deviceUuid: 'u',
    });
    const fields = decodeSdsew(report.sdsew);
    expect(fields[6]).toBe('175'); // y
    expect(fields[7]).toBe('583'); // 408 + 175 ≥ 视频时长
    expect(fields[8]).toBe('00:02:55');
  });

  it('zwsds = base64(记录 id 十进制串)', () => {
    const report = buildStudyReport({
      unit: UNIT,
      courseId: 1,
      recruitId: 2,
      baseSec: 0,
      recordId: '90000000001',
      deviceUuid: 'u',
    });
    expect(atob(report.zwsds)).toBe('90000000001');
  });

  it('序列末端与最终累计秒自洽（floor(Ke/5)+2）且以 0,1 起手', () => {
    const report = buildStudyReport({
      unit: UNIT,
      courseId: 1,
      recruitId: 2,
      baseSec: 408,
      recordId: 1,
      deviceUuid: 'u',
    });
    const series = report.ewssw.split(',');
    expect(series[0]).toBe('0');
    expect(series[1]).toBe('1');
    expect(Number(series[series.length - 1])).toBe(Math.floor(583 / 5) + 2);
  });

  it('子节视频走 smallLessonId（父课时做 lessonId）', () => {
    const child: ZhsUnit = { ...UNIT, lessonId: 9000000012, smallLessonId: 9000000009 };
    const report = buildStudyReport({
      unit: child,
      courseId: 1,
      recruitId: 2,
      baseSec: 0,
      recordId: 1,
      deviceUuid: 'u',
    });
    const fields = decodeSdsew(report.sdsew);
    expect(fields[1]).toBe('9000000012');
    expect(fields[2]).toBe('9000000009');
  });
});

/* 上报组装的机械核对：字段序、Ke/y/位置口径、token 形态、序列与 zwsds。 */

import { describe, expect, it } from 'vitest';
import { buildStudyReport } from '../src/report.ts';
import type { ZhsUnit } from '../src/structure.ts';

/** 合成样例：位数与真机一致（字段的形态是这里的被测点），值不来自任何真实课程。 */
const UNIT: ZhsUnit = {
  videoId: 66000001,
  lessonId: 1000050001,
  smallLessonId: 0,
  chapterId: 1000050002,
  chapterName: '示例章',
  name: '示例课时',
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
      courseId: 1000009999,
      recruitId: 470001,
      baseSec: 0,
      recordId: 13000000001,
      deviceUuid: 'TESTuuid',
    });
    expect(decodeSdsew(report.sdsew)).toEqual([
      '470001',
      '1000050001',
      '0',
      '66000001',
      '1000050002',
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
      recordId: '13000000002',
      deviceUuid: 'u',
    });
    expect(atob(report.zwsds)).toBe('13000000002');
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
    const child: ZhsUnit = { ...UNIT, lessonId: 1000050003, smallLessonId: 1000050004 };
    const report = buildStudyReport({
      unit: child,
      courseId: 1,
      recruitId: 2,
      baseSec: 0,
      recordId: 1,
      deviceUuid: 'u',
    });
    const fields = decodeSdsew(report.sdsew);
    expect(fields[1]).toBe('1000050003');
    expect(fields[2]).toBe('1000050004');
  });
});

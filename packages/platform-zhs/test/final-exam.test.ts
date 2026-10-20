/*
 * 期末考试条目的归一。
 *
 * 样本是真机回包（2026-10-17，示例课程乙，`pnpm probe zhs --endpoint finalExam`）：
 * id/examId 是字符串、totalScore 是字符串、时间窗字段叫 endDate、剩余机会叫
 * faStudentExamRemainCount——按数字处理会在开考/交卷时报参数错，所以逐条钉住。
 */

import { describe, expect, it } from 'vitest';
import { EXAM_FORM, normalizeFinalExam } from '../src/final-exam.ts';

/** 真机样本逐字（只截掉与本模块无关的字段）。 */
const sample = [
  {
    id: '5JEbmXP3',
    state: 1,
    score: null,
    startTime: '2026-11-23 00:00:00',
    endDate: '2026-11-29 23:59:59',
    faStudentExamRemainCount: 1,
    courseId: 9000000003,
    courseName: '示例课程乙',
    examId: 'wDlL1OAw',
    examName: '示例课程乙教程考试',
    problemNum: 60,
    examUserName: '示例教师甲',
    totalScore: '100',
    limitTime: 90,
  },
];

describe('normalizeFinalExam', () => {
  it('字符串 id 原样保留（不是数字，别转）', () => {
    const [exam] = normalizeFinalExam(sample);
    expect(exam?.id).toBe('5JEbmXP3');
    expect(exam?.examId).toBe('wDlL1OAw');
  });

  it('时间窗解析成毫秒（本地时间口径，与作业清单同一条解析）', () => {
    const [exam] = normalizeFinalExam(sample);
    expect(exam?.startAt).toBe(new Date(2026, 10, 23, 0, 0, 0).getTime());
    expect(exam?.endAt).toBe(new Date(2026, 10, 29, 23, 59, 59).getTime());
  });

  it('剩余机会取 faStudentExamRemainCount；总分按字符串带出', () => {
    const [exam] = normalizeFinalExam(sample);
    expect(exam?.remainCount).toBe(1);
    expect(exam?.totalScore).toBe('100');
    expect(exam?.problemNum).toBe(60);
    expect(exam?.limitTime).toBe(90);
  });

  it('真·空数组才给空表；形态不符抛错（不冒充「这门课没有期末」）', () => {
    expect(normalizeFinalExam([])).toEqual([]);
    expect(() => normalizeFinalExam(null)).toThrow(/不是列表/);
    expect(() => normalizeFinalExam({})).toThrow(/不是列表/);
  });

  it('缺字段的条目给默认值（不猜）', () => {
    const [exam] = normalizeFinalExam([{ id: 'x' }]);
    expect(exam?.examId).toBe('');
    expect(exam?.remainCount).toBe(0);
    expect(exam?.startAt).toBeNull();
  });

  it('形态枚举与实测一致', () => {
    expect(EXAM_FORM).toEqual({ online: 1, room: 2, offline: 3 });
  });
});

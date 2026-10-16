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

  it('时间窗取 startTime/endDate 两个字段，原样带出', () => {
    const [exam] = normalizeFinalExam(sample);
    expect(exam?.startTime).toBe('2026-11-23 00:00:00');
    expect(exam?.endTime).toBe('2026-11-29 23:59:59');
  });

  it('剩余机会取 faStudentExamRemainCount；总分按字符串带出', () => {
    const [exam] = normalizeFinalExam(sample);
    expect(exam?.remainCount).toBe(1);
    expect(exam?.totalScore).toBe('100');
    expect(exam?.problemNum).toBe(60);
    expect(exam?.limitTime).toBe(90);
  });

  it('空表与坏形状都回空数组，不抛', () => {
    expect(normalizeFinalExam([])).toEqual([]);
    expect(normalizeFinalExam(null)).toEqual([]);
    expect(normalizeFinalExam({})).toEqual([]);
  });

  it('缺字段的条目给默认值（不猜）', () => {
    const [exam] = normalizeFinalExam([{ id: 'x' }]);
    expect(exam?.examId).toBe('');
    expect(exam?.remainCount).toBe(0);
    expect(exam?.startTime).toBe('');
  });

  it('形态枚举与实测一致', () => {
    expect(EXAM_FORM).toEqual({ online: 1, room: 2, offline: 3 });
  });
});

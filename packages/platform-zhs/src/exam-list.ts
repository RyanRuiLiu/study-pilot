/*
 * 作业清单（考试族的入口表）。
 *
 * 平台事实（2026-10-16 真机实测，FINDINGS §二十一；报文形态见
 * `.probe/zhs-exam-list/trace.har`）：
 *   - 接口 `student/getStudentHomework`，载荷 `{recruitId, courseId, flag, pageSize, pageNum, dateFormate}`
 *     ——`dateFormate` 由 client 的签名封装按族补，这里不传；
 *   - **页签由 flag 分**，官方名「未提交（flag=1）/ 已提交（flag=2）」；
 *   - `pageSize: 100` 一页取全（实测：最大的一门课 13 条）；
 *   - **一个列表两类条目**：`meetCourseType` 0 = 单元测试（`cpOrderNumber` 是章节名）、
 *     1 = 见面课测验（条目名 = 场次名，`cpOrderNumber` 为 null）；
 *   - 状态 `state`：1 = 未提交、4 = 已提交（实测唯二值）。
 *
 * 归一与读取分开：`normalizeHomeworkList` 是纯函数（可离线核对形态），
 * `getExamList` 只负责发一次请求。取不到的字段一律给 null——**不猜**。
 */

import type { ZhsClient } from './client.ts';

/** `meetCourseType` 的两个实测取值。 */
export const MEET_COURSE_TYPE = {
  unitTest: 0,
  meetingQuiz: 1,
} as const;

/** `state` 的两个实测取值。 */
export const HOMEWORK_STATE = {
  unsubmitted: 1,
  submitted: 4,
} as const;

export interface ZhsExamListItem {
  /** 清单条目 id——lookHomework 的 `studentExamId` 用料 */
  id: string;
  /** 8 字符串 examId（dohomework 路由的 t2 用料） */
  examId: string;
  examName: string;
  /** 0 = 单元测试；1 = 见面课测验 */
  meetCourseType: number;
  /** 1 = 未提交；4 = 已提交 */
  state: number;
  score: number | null;
  totalScore: number | null;
  /** 章节名（单元测试有；见面课测验为 null） */
  chapterName: string | null;
}

/**
 * 把 `student/getStudentHomework` 的响应归一成条目表。
 *
 * 形状不对（`rt` 不是对象、`studentHomeworkList` 不是数组）时返回**空表**——
 * 这是「平台没给数据」而不是「这门课没有作业」，调用方拿空表就该什么都没做，
 * 于是这个区分不影响行为，但不要去编一条假记录出来。
 */
export function normalizeHomeworkList(rt: unknown): ZhsExamListItem[] {
  const list = (rt as { studentHomeworkList?: unknown } | null | undefined)?.studentHomeworkList;
  if (!Array.isArray(list)) return [];

  const items: ZhsExamListItem[] = [];
  for (const entry of list as Array<Record<string, unknown> | null>) {
    if (entry === null || typeof entry !== 'object') continue;
    const id = str(entry.id);
    if (id === '') continue; // 没有 id 就用不了（lookHomework 认它）——跳过，不占位
    items.push({
      id,
      examId: str(entry.examId),
      examName: str(entry.examName),
      meetCourseType: num(entry.meetCourseType),
      state: num(entry.state),
      score: numberLike(entry.score),
      totalScore: numberLike(entry.totalScore),
      chapterName: str(entry.cpOrderNumber) === '' ? null : str(entry.cpOrderNumber),
    });
  }
  return items;
}

/** 读一个页签（未提交 / 已提交）。一次请求取全（`pageSize: 100`）。 */
export async function getExamList(
  client: ZhsClient,
  input: { recruitId: number; courseId: number; submitted: boolean },
): Promise<ZhsExamListItem[]> {
  const body = (await client.call('examHomeworkList', {
    recruitId: input.recruitId,
    courseId: input.courseId,
    flag: input.submitted ? 2 : 1,
    pageSize: 100,
    pageNum: 1,
  })) as { rt?: unknown };
  return normalizeHomeworkList(body.rt);
}

function str(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function num(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

/**
 * 分值之类的可选数字：取不到给 null（**不是 0**——0 分和「没给分」是两件事）。
 *
 * **必须同时认字符串**：清单的 `score` / `totalScore` 实测是**字符串**
 * （`"10"` / `"100"`，2026-10-17 全量核对 46 个条目字段集），而 `state` /
 * `meetCourseType` 是数字。同一个响应里类型不统一是平台事实，不是笔误。
 */
function numberLike(value: unknown): number | null {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

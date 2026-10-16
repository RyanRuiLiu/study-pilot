/*
 * 期末考试条目（taurus 族）。
 *
 * 平台事实（2026-10-16/17，三路取证：考试应用源码 + 真机 HAR + 刚才的实测直调）：
 *
 *   - 调用链：先 `exam/getExamType` 拿 1（在线）才调 `student/getStudentFinalExam`
 *     （源码 stuExamWeb 的分支：在线 getStudentFinalExamN、机房 getStudentRoomExamN、
 *     线下 getStudentOfflineExamN——所以「这门课有没有期末」必须先问形态，
 *     在读不到的课上「没有期末」与「期末不在这个接口」长得一样）；
 *   - 载荷 `{courseId, recruitId, flag}`，**少 flag 会被拒**；
 *   - 宿主 `taurusexam-api.zhihuishu.com`（源码常量 serectExamT），
 *     路径 `/taurusExam/gateway/t/v1/...`（源码 taurusExam + serectPath），
 *     与 HAR 的实请求逐字一致（.probe/zhs-exam-psy/trace.har，同日 5 条全 200）；
 *   - **签名模块号是 exam（3），不是 taurus（5）**：考试应用的 postFetch 对这条族
 *     不传 `type`，于是走 `getK()`→`labc(3)`；`labc(5)` 只在传 `type=1` 的那条
 *     路径上（stuExamWeb.js:106-118 与各端点定义处）。**用 5 会被网关回 404**
 *     （Tomcat 错误页）——实测：在浏览器里发一条假密文同样 404，所以这与
 *     Origin/Referer 无关，是密文解不开。2026-10-17 之前记录里的「404 卡点」即此。
 *   - `id` / `examId` 是**字符串**（实测 `5JEbmXP3` / `wDlL1OAw`），别按数字处理。
 */

import type { ZhsClient } from './client.ts';

/** 考试形态（`exam/getExamType`）。只有 `online` 那条分支会取期末。 */
export const EXAM_FORM = {
  online: 1,
  room: 2,
  offline: 3,
} as const;

/** 一条期末考试。取不到的字段一律给 null——不猜。 */
export interface ZhsFinalExam {
  /** 条目 id（字符串） */
  id: string;
  /** 考试 id（字符串；开考与交卷要用它） */
  examId: string;
  examName: string;
  /** 1=未提交（实测；其余取值未见，如实原样带出） */
  state: number;
  courseId: number;
  courseName: string;
  /** 题数与总分（总分是字符串，实测 `"100"`） */
  problemNum: number;
  totalScore: string;
  /** 限时（分钟） */
  limitTime: number;
  /** 开考窗口（平台的本地时间字符串，原样带出，不猜时区） */
  startTime: string;
  endTime: string;
  /** 剩余机会（实测 1；0 表示没有机会了） */
  remainCount: number;
  /** 出卷老师（成绩页那套叫法：examUserName） */
  teacherName: string;
}

function str(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function num(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

/** 把 `rt` 归一成条目表。纯函数，可离线核对形态。 */
export function normalizeFinalExam(rt: unknown): ZhsFinalExam[] {
  if (!Array.isArray(rt)) return [];
  return rt.map((raw) => {
    const item = (raw ?? {}) as Record<string, unknown>;
    return {
      id: str(item.id),
      examId: str(item.examId),
      examName: str(item.examName),
      state: num(item.state),
      courseId: num(item.courseId),
      courseName: str(item.courseName),
      problemNum: num(item.problemNum),
      totalScore: str(item.totalScore),
      limitTime: num(item.limitTime),
      startTime: str(item.startTime),
      endTime: str(item.endDate),
      remainCount: num(item.faStudentExamRemainCount),
      teacherName: str(item.examUserName),
    };
  });
}

/** 读这门课的考试形态（1=在线 2=机房 3=线下）。 */
export async function getExamForm(
  client: ZhsClient,
  input: { recruitId: number; courseId: number },
): Promise<number> {
  const body = (await client.call('examType', {
    recruitId: input.recruitId,
    courseId: input.courseId,
  })) as { rt?: unknown };
  return num(body.rt);
}

/**
 * 读这门课的期末考试条目。
 *
 * `flag` 与作业清单同口径（1=未提交页签 / 2=已提交页签，真机实测同一接口族）。
 * 只在 `getExamForm === 1`（在线）时有意义——调用方先问形态。
 */
export async function getFinalExam(
  client: ZhsClient,
  input: { recruitId: number; courseId: number; submitted?: boolean },
): Promise<ZhsFinalExam[]> {
  const body = (await client.call('finalExam', {
    courseId: input.courseId,
    recruitId: input.recruitId,
    flag: input.submitted === true ? 2 : 1,
  })) as { rt?: unknown };
  return normalizeFinalExam(body.rt);
}

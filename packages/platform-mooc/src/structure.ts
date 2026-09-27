/**
 * 课程结构解析。
 *
 * 数据来源：`courseBean.getLastLearnedMocTermDto`，一次请求即可拿到全部单元，
 * 且每个单元的 `test` 对象已经包含判定所需的全部字段（截止时间、互评窗口、
 * 尝试次数、得分）。因此「枚举 + 判定」不需要逐单元再发请求，
 * 这一点对限流敏感的接口很重要。
 *
 * 结构位置（实测）：
 * ```
 * result.mocTermDto.chapters[].
 *   quizs[]      单元测验
 *   homeworks[]  单元作业
 *   exam         章节内的考试。实测恒为 null
 * result.mocTermDto.exams[]    考试。真正的位置
 * ```
 *
 * 考试为什么在顶层而不在章节里
 * ----------------------------
 * 考试不属于任何章节，它挂在学期上。每一场考试由两部分构成，各自有独立的
 * tid，各自是一份答卷：
 *
 *   objectTest   客观题部分，`type: 2`
 *   subjectTest  主观题部分，`type: 3`
 *
 * 一门课可以只有其中一种。两部分都在时按两条工作项处理——它们的答题页、
 * 取卷接口参数、判决条件都各自独立，合并成一条会丢掉一半信息。
 */

import { ok, type Result } from '@study-pilot/core';
import type { TransportError } from '@study-pilot/transport';
import type { MoocClient } from './client.ts';
import { ENDPOINTS } from './endpoints.ts';
import type { CourseStructure, CourseWork, WorkStatus, WorkTest, WorkType } from './types.ts';

interface RawChapter {
  id?: number;
  name?: string | null;
  quizs?: Array<Record<string, unknown>> | null;
  homeworks?: Array<Record<string, unknown>> | null;
  exam?: Record<string, unknown> | null;
}

/** 一场考试。两部分各自可能为 null。 */
interface RawExam {
  id?: number;
  name?: string | null;
  deadline?: number | null;
  totalScore?: number | null;
  userScore?: number | null;
  objectTest?: WorkTest | null;
  subjectTest?: WorkTest | null;
}

interface RawTermDto {
  id?: number;
  courseId?: number | null;
  courseName?: string | null;
  chapters?: RawChapter[] | null;
  exams?: RawExam[] | null;
}

interface StructurePayload {
  mocTermDto?: RawTermDto | null;
}

/**
 * 把一个章节子节点转成归一化的工作项。
 * `test` 缺失或没有 id 时返回 null——这类节点无法用于任何后续接口。
 */
function toWork(
  node: Record<string, unknown>,
  type: WorkType,
  chapter: RawChapter,
  chapterIndex: number,
): CourseWork | null {
  const test = (node.test ?? {}) as WorkTest;
  const tid = Number(test.id ?? node.contentId ?? 0);
  if (!tid) return null;

  return {
    tid,
    type,
    name: String(test.name ?? node.name ?? ''),
    chapterId: Number(chapter.id ?? 0),
    chapterName: String(chapter.name ?? ''),
    chapterIndex,
    test,
  };
}

/**
 * 把考试的一部分转成工作项。
 *
 * 章节名用考试本身的名字：考试不在任何章节之下，而界面上的分组需要一个
 * 归属。用它的名字作分组名，用户看到的就是「期末考试预演」这一类，
 * 与考试列表页的分组一致。
 *
 * 名称优先取 part 上的：实测两者不同——考试叫「期末测试」，
 * 而它的客观题部分叫「大学物理期末网络测试」。后者才是答卷页上显示的名字，
 * 也是用户能对上号的那个。
 */
function examToWork(part: WorkTest, exam: RawExam, isObjective: boolean): CourseWork | null {
  const tid = Number(part.id ?? 0);
  if (!tid) return null;

  return {
    tid,
    type: isObjective ? 'exam-objective' : 'exam-subjective',
    name: String(part.name ?? exam.name ?? ''),
    chapterId: Number(exam.id ?? 0),
    /*
     * 考试的归属名留空。
     *
     * 明细行把归属名与名称拼起来显示（「第3章 · 单元作业」），
     * 而考试的两级名字几乎重复：考试叫「期末考试预演」、它的主观题部分
     * 叫「电路期末考试预演」，拼出来是「期末考试预演 · 电路期末考试预演」。
     * 部分名更具体、更能对上号，因此只显示它。
     */
    chapterName: '',
    chapterIndex: 0,
    // examId 用于拼答卷页地址：考试的两部分共用同一个考试 id
    examId: Number(exam.id ?? 0),
    test: part,
  };
}

export async function getCourseStructure(
  client: MoocClient,
  termId: number,
): Promise<Result<CourseStructure, TransportError>> {
  const payload = await client.rpc.call<StructurePayload>(
    ENDPOINTS.courseStructure.bean,
    ENDPOINTS.courseStructure.method,
    { termId },
  );
  if (!payload.ok) return payload;

  const dto = payload.value?.mocTermDto ?? {};
  const chapters = dto.chapters ?? [];
  const works: CourseWork[] = [];

  chapters.forEach((chapter, index) => {
    for (const node of chapter.quizs ?? []) {
      const work = toWork(node, 'quiz', chapter, index);
      if (work) works.push(work);
    }
    for (const node of chapter.homeworks ?? []) {
      const work = toWork(node, 'homework', chapter, index);
      if (work) works.push(work);
    }
    /*
     * 实测各章节的这个字段都是 null，考试在顶层 exams 里。
     *
     * 保留这段是为了兼容平台把考试挪回章节的情形。那种节点看不出是
     * 客观题还是主观题，按客观题处理——它至少能挂上做题助手，
     * 而主观题的处理依赖 eid 拼地址，这里拿不到。
     */
    if (chapter.exam) {
      const work = toWork(chapter.exam, 'exam-objective', chapter, index);
      if (work) works.push(work);
    }
  });

  for (const exam of dto.exams ?? []) {
    if (exam.objectTest) {
      const work = examToWork(exam.objectTest, exam, true);
      if (work) works.push(work);
    }
    if (exam.subjectTest) {
      const work = examToWork(exam.subjectTest, exam, false);
      if (work) works.push(work);
    }
  }

  return ok({
    termId: Number(dto.id ?? termId),
    courseId: Number(dto.courseId ?? 0),
    courseName: String(dto.courseName ?? ''),
    works,
  });
}

/**
 * 由 `test` 字段派生状态。
 *
 * 判据说明：
 *   - 支持互评：`enableEvaluation === true` 且 `evaluateJudgeType != null`。
 *     只判断前者不够——存在 `enableEvaluation` 为 true 但 `evaluateJudgeType`
 *     为 null 的节点，那种情况实际没有互评入口。
 *
 *   - 已提交：`usedTryCount > 0` 或 `userScore != null`。两者都可能单独缺失，
 *     所以取「或」而不是「与」。
 *
 *   - 考试不报 `usedTryCount`，它用 `userSubmitStatus`（1 为已提交，
 *     null 或 0 为未提交）。两种字段名都要认，否则考试永远显示「未提交」——
 *     而做过之后页面上会显示成绩，两处对不上。
 *
 *   - 考试的 `trytime` 相当于作业的 `totalTryCount`，同义不同名。
 */
export function deriveStatus(work: CourseWork, now: number = Date.now()): WorkStatus {
  const test = work.test;
  const start = test.evaluateStart ?? null;
  const end = test.evaluateEnd ?? null;

  const usedTries = Number(test.usedTryCount ?? 0);
  const submitStatus = Number(test.userSubmitStatus ?? 0);

  return {
    reviewable: test.enableEvaluation === true && test.evaluateJudgeType != null,
    submitted: usedTries > 0 || submitStatus > 0 || test.userScore != null,
    reviewOpen: start !== null && end !== null && now >= start && now <= end,
    overdue: test.deadline != null && now > test.deadline,
  };
}

/**
 * 筛选出当前可以提交互评的作业：支持互评，且互评窗口尚未关闭。
 * 不检查「已提交」——一份作业可以评多个人，评过之后仍可继续评。
 */
export function filterReviewable(
  works: CourseWork[],
  now: number = Date.now(),
): CourseWork[] {
  return works.filter((work) => {
    const status = deriveStatus(work, now);
    return status.reviewable && !(work.test.evaluateEnd != null && now > work.test.evaluateEnd);
  });
}

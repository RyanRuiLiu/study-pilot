/*
 * 作业清单（考试族的入口表）。
 *
 * 平台事实（2026-10-16 真机实测，FINDINGS §二十一；报文形态见
 * `.probe/zhs-exam-list/trace.har`）：
 *   - 接口 `student/getStudentHomework`，载荷 `{recruitId, courseId, flag, pageSize, pageNum, dateFormate}`
 *     ——`dateFormate` 由 client 的签名封装按族补，这里不传；
 *   - **页签由 flag 分**，官方名「未提交（flag=1）/ 已提交（flag=2）」；
 *   - `pageSize: 100` 一页取全（实测：最大的一门课 13 条）；
 *   - **页号是 0 基**：实测 `pageNum=1` 回空表、`pageNum=0` 才出条目；
 *   - **一个列表两类条目**：`meetCourseType` 0 = 单元测试（`cpOrderNumber` 是章节名）、
 *     1 = 见面课测验（条目名 = 场次名，`cpOrderNumber` 为 null）；
 *   - **`flag` 页签才判「交没交」，别拿 `state` 猜**：2026-10-17 真机在沙箱课看到
 *     `state` 至少三值——1（未动）、4（已交，落在「已提交」页签）、5（重做过的那卷，
 *     落在「未提交」页签且 `score` 为 null）。所以「要不要做」的判据是
 *     `flag=1 页签 && state === 1`，其余状态一律**如实呈现、不动手**。
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

/**
 * `state` 的实测取值。
 *
 * 5 的语义原是「待查」，2026-10-17 真机查明（沙箱课）：`examRedoNum` 对那一条
 * 回 `rt=2`（已用掉 2 次重做），而同一门课 `state=1` 的卷回 `rt=0`。
 * 所以 5 = **已交过、重做也已申请、新答卷还没交**，不是没动过的卷。
 */
export const HOMEWORK_STATE = {
  /** 未动过 */
  untouched: 1,
  /** 已提交（落在 flag=2 页签） */
  submitted: 4,
  /**
   * 已交过、重做已申请、新答卷未交：落在 flag=1 页签、`score` 为 null。
   *
   * **不进 `isActionable`**：它不是「没动过」，对它动手等于替人开着一半的答卷作答。
   * 但也不该从此消失——`plan()` 目前两边都不收，这类卷会静默搁浅
   * （见设计文档 §7 的未决项；沙箱课现有一条真实样本）。
   */
  redone: 5,
} as const;

/** 这一条是不是「可以动手做」的（未交页签 + 未动过）。其余状态只呈现、不写。 */
export function isActionable(item: ZhsExamListItem): boolean {
  return item.state === HOMEWORK_STATE.untouched;
}

/**
 * 这一条该不该**进待办与计划**——即「我们接手做」的那些（未交页签里）。
 *
 * 与 `isActionable` 分开：那个问的是「平台标它没动过吗」，这个问的是「我们做不做」。
 * 两者只差 `state=5`：已交过、重做已申请、新答卷没交——它不是没动过的卷，
 * 但 Ryan 定了口径（2026-10-17）：**按没做过一样对待，直接接管**，
 * 于是它进计划（走 `redoOpen` 那条路，不再申请重做）。
 *
 * 待办与计划**共用这一个判据**：两处各写一遍，界面就会多列或少列。
 */
export function needsWork(item: ZhsExamListItem): boolean {
  return item.state === HOMEWORK_STATE.untouched || item.state === HOMEWORK_STATE.redone;
}

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
  /** 题数（实测数字，如 50） */
  problemNum: number | null;
  /**
   * 截止时刻（毫秒）。
   *
   * 平台给的是**本地时间字符串** `"2027-01-20 23:59:59"`（不是时间戳，2026-10-17 实测），
   * 这里就地解析成毫秒——外壳的时间列只认毫秒（慕课那份 `deadline` 就是毫秒），
   * 两边必须同一形态才谈得上对齐。解析不出给 null（**不拿当前时间凑**）。
   */
  deadline: number | null;
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
      problemNum: numberLike(entry.problemNum),
      deadline: parsePlatformTime(entry.endDate),
    });
  }
  return items;
}

/**
 * 一次请求的页大小。
 *
 * 「一页取全」是**实测结论**（最大的一门课 20 条，一门课二十章），不是保证：
 * 响应里没有可信的总数（`rt` 只有 `result / next / studentHomeworkList`，
 * 而 `next` 的语义没实测过——17 条和 3 条都回 `-1`，分不出「到底了」还是「恒为 -1」）。
 * 所以取回来自查：**不足一页才算全**（见 `ExamListPage.complete`）。
 */
export const EXAM_LIST_PAGE_SIZE = 100;

/** 一个页签的一次读取结果。 */
export interface ExamListPage {
  items: ZhsExamListItem[];
  /**
   * 这一页是不是全部。
   *
   * 恰好满页时**不敢说全**：平台可能还有下一页，而总数不可信。宁可让人看见
   * 「没读全」，也不要把截断的清单当完整的用——那会让进度分母偏小、
   * 让计划漏掉应该做的卷，两种错误都不会自己冒出来。
   */
  complete: boolean;
}

/** 读一个页签（未提交 / 已提交）。一次请求取全（`pageSize: 100`）。 */
export async function getExamList(
  client: ZhsClient,
  input: { recruitId: number; courseId: number; submitted: boolean },
): Promise<ExamListPage> {
  const body = (await client.call('examHomeworkList', {
    recruitId: input.recruitId,
    courseId: input.courseId,
    flag: input.submitted ? 2 : 1,
    pageSize: EXAM_LIST_PAGE_SIZE,
    // 页号是 **0 基**：实测 pageNum=1 回空表，pageNum=0 才出条目
    // （真机脚本 eval-replay.js 用的就是 0）。别按 1 基的直觉改回来。
    pageNum: 0,
  })) as { rt?: unknown };
  const items = normalizeHomeworkList(body.rt);
  return { items, complete: items.length < EXAM_LIST_PAGE_SIZE };
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
/**
 * 把平台的本地时间字符串解析成毫秒。
 *
 * 实测形态：`"2027-01-20 23:59:59"`（`endDate` / `startTime` 都是这个格式，2026-10-17）。
 * 串里不带时区，按**本地时间**解析——平台自己的显示语义就是本地时间，换时区解释会差几小时。
 * 形态不符或解析出 NaN 一律给 null：宁可在界面上留空，也不要一个错的时间。
 */
export function parsePlatformTime(value: unknown): number | null {
  if (typeof value !== 'string') return null;
  const matched = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})$/.exec(value.trim());
  if (matched === null) return null;
  const [, year, month, day, hour, minute, second] = matched;
  const parsed = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second),
  ).getTime();
  return Number.isFinite(parsed) ? parsed : null;
}

function numberLike(value: unknown): number | null {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

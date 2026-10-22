/*
 * 智慧树的读取原语：按勾选的课程收集单元表。
 *
 * 课程任务（每门课一行组件）与待办（逐单元一条）看的是**同一份读取结果**——
 * 都由这里收一次，上层各自映射。各读各的会让设置页一开就发两遍同样的请求，
 * 而两处显示的是同一件事（慕课那边靠 CoursewareSummary 合并也是这个理由）。
 *
 * 一门课读不成（缺入口参数、平台拒绝）不牵连其他课：如实记成 unread，
 * 由各自的呈现层决定怎么说——不拿空数据冒充「这门课没有内容」。
 */

import type { ZhihuishuCourse } from '@study-pilot/application';
import { ZhsAuthError } from '@study-pilot/platform-zhs';
import {
  chapterExams,
  getCourseUnits,
  getExamList,
  MEET_COURSE_TYPE,
  needsWork,
  quizItemId,
  readCourseChapters,
  unitItemId,
  type ZhsClient,
  type ZhsChapterNode,
  type ZhsExamListItem,
  type ZhsUnit,
  EXAM_FORM,
  getExamForm,
  getFinalExam,
  type ZhsFinalExam,
} from '@study-pilot/platform-zhs';

export interface CourseUnits {
  course: ZhihuishuCourse;
  /** 读成时为单元表；unread 为 true 时是空数组 */
  units: ZhsUnit[];
  /**
   * 这次读到的章节原始表。**交给下游复用**——测验那一类要从同一份表里取
   * 数字卷号（`chapterExams`），再读一遍等于每门课多付一次读费，
   * 而本仓的口径是「每门课一次结构读取」。读不成时为空数组。
   */
  chapters: ZhsChapterNode[];
  /** 这门课没读成的原因（界面如实显示；读成时为 null） */
  unreadReason: string | null;
}

export async function collectUnits(
  client: ZhsClient,
  courses: ZhihuishuCourse[],
): Promise<CourseUnits[]> {
  /*
   * 逐课**并行**：每门课各读各的结构，互不依赖；串行会让「读 5 门课」
   * 变成 5 倍的等待。列表顺序由 Promise.all 保持，与传入一致。
   */
  return Promise.all(
    courses.map(async (course): Promise<CourseUnits> => {
      if (course.secret.length === 0) {
        return { course, units: [], chapters: [], unreadReason: '缺少课程入口参数，先读取课程列表' };
      }
      try {
        const chapters = await readCourseChapters(client, {
          recruitAndCourseId: course.secret,
          recruitId: course.recruitId,
        });
        const units = await getCourseUnits(
          client,
          { recruitAndCourseId: course.secret, recruitId: course.recruitId },
          chapters,
        );
        return { course, units, chapters, unreadReason: null };
      } catch (error) {
        // 登录失效是账号级的事实：不按「这门课读不成」记，抛给上层按未登录回话
        if (error instanceof ZhsAuthError) throw error;
        return {
          course,
          units: [],
          chapters: [],
          unreadReason: error instanceof Error ? error.message : String(error),
        };
      }
    }),
  );
}

/** 按课程分组的单元条目（待办与课程任务共用的形状）。 */
export { unitItemId };

/** 一门课里还没做的单元测试（待办里与教程视频并列的那一类）。 */
export interface CourseQuiz {
  course: ZhihuishuCourse;
  /** 读成时为条目表；读不成时为空数组 */
  items: ZhsExamListItem[];
  /** 这门课的测验没读成的原因（读成时为 null）——**失败必须被看见**，不静默少列 */
  unreadReason: string | null;
}

export async function collectQuizzes(
  client: ZhsClient,
  collected: readonly CourseUnits[],
): Promise<CourseQuiz[]> {
  /*
   * 逐课**并行**（与 collectUnits 同一条规则）：每门课只读一次未交页签，
   * 互不依赖；串行会让 N 门课变成 N 倍的等待。顺序由 Promise.all 保持。
   */
  return Promise.all(
    collected.map(async ({ course, chapters, unreadReason }): Promise<CourseQuiz> => {
      // 视频那一遍就没读成的课，这里也没什么可做的（原因已由那一遍报出）
      if (unreadReason !== null) return { course, items: [], unreadReason: null };
      try {
        const known = new Set(chapterExams(chapters).map((exam) => exam.listId));
        const page = await getExamList(client, {
          recruitId: course.recruitId,
          courseId: course.courseId,
          submitted: false,
        });
        // 取不全与读不成同等对待：半份清单列出来的待办是**假的待办**（少列的那些不会自己说话）
        if (!page.complete) throw new Error('作业清单超过一页，未取全');
        return {
          course,
          /*
           * 两类**同一判据、同一处**：单元测试（`meetCourseType=0`）与见面课测验（`=1`）
           * 本来就在同一个列表、同一个页签、同一套 state（FINDINGS §二十一），
           * 而且平台的**重做**也只按 `examId` 判、不分题型
           * （源码 `9.c58d…js:11803`：`getIsObject(examId)` ＋ `3 - redoNum(examId).rt > 0`，
           *  全流程没有任何 meetCourseType 分支）。既然平台不分，我们也不分。
           * `known` 那道闸与 `plan()` 用的是同一个键（章节路由段），两页才会列一样的卷。
           */
          items: page.items.filter((item) => known.has(item.id) && needsWork(item)),
          unreadReason: null,
        };
      } catch (error) {
        if (error instanceof ZhsAuthError) throw error;
        return {
          course,
          items: [],
          unreadReason: error instanceof Error ? error.message : String(error),
        };
      }
    }),
  );
}

/** 单元测试条目的计划项 id（与执行侧同一份取名规则）。 */
export { quizItemId };

/** 一门课两个页签的作业条目（未交 / 已交）。 */
export interface CourseExamTabs {
  /** 未交页签（flag=1） */
  pending: ZhsExamListItem[];
  /** 已交页签（flag=2） */
  submitted: ZhsExamListItem[];
}

/**
 * 读一门课的两个页签。
 *
 * 与 `collectQuizzes` 分开：那份只列**执行会动的**（未交页签 + `needsWork` + 章节对得上），
 * 供待办用；这一份要的是**全部单元测试**，供「学习进度·测试」计数。
 * 判据不同——拿执行范围去报进度，进度就永远不是真的进度。
 */
export async function readCourseExams(
  client: ZhsClient,
  course: ZhihuishuCourse,
): Promise<CourseExamTabs> {
  const base = { recruitId: course.recruitId, courseId: course.courseId };
  const pending = await getExamList(client, { ...base, submitted: false });
  const submitted = await getExamList(client, { ...base, submitted: true });
  /*
   * 取不全就**当这次没读成**：截断的清单会让分母偏小，进度看起来比实际好，
   * 而且这种错不会自己冒出来。抛出去由调用方按「读不成」处理（给原因、关掉数字位），
   * 不许悄悄拿半份数据算一个像模像样的数。
   */
  if (!pending.complete || !submitted.complete) {
    throw new Error('作业清单超过一页，未取全');
  }
  return { pending: pending.items, submitted: submitted.items };
}

/**
 * 按题型统计「已交 / 全部」。
 *
 * 两件事在这里定死：
 *   - **按条目 id 去重**（两个页签各算一次会把分母撑大）。真机实测（2026-10-17，沙箱课）
 *     两页签不重叠：未交 17 条（含 1 条 `state=5`）＋ 已交 3 条 ＝ 20 条，正好二十章。
 *     同一 id 若真同时出现，以**已交页签**为准（那才是平台判的交没交）。
 *
 * 单元测试与见面课测验只在题型上不同，因此共用这一份；分开写两份同构代码，
 * 下一次改「去重规则」时必然漏一处。
 */
function countByType(tabs: CourseExamTabs, type: number): { done: number; total: number } {
  const ofType = (items: readonly ZhsExamListItem[]): ZhsExamListItem[] =>
    items.filter((item) => item.meetCourseType === type);
  const ids = new Set([...ofType(tabs.pending), ...ofType(tabs.submitted)].map((item) => item.id));
  const doneIds = new Set(ofType(tabs.submitted).map((item) => item.id));
  return { done: doneIds.size, total: ids.size };
}

/**
 * 单元测试的完成计数（纯函数：两个页签 → 分数）。
 *
 * 只数 `meetCourseType=0`：见面课测验是另一个组件，混进来会让「学习进度·测试」
 * 变成两样东西的和。去重与「以已交为准」的规则见 `countByType`。
 */
export function countUnitTests(tabs: CourseExamTabs): { done: number; total: number } {
  return countByType(tabs, MEET_COURSE_TYPE.unitTest);
}

/**
 * 见面课测验的「已交 / 全部」：与单元测试同一份清单里的另一类条目
 * （`meetCourseType=1`，条目名 = 场次名）。去重与判据同 `countByType`。
 */
export function countMeetQuizzes(tabs: CourseExamTabs): { done: number; total: number } {
  return countByType(tabs, MEET_COURSE_TYPE.meetingQuiz);
}

/**
 * 已交单元测试里**未满分**的卷数。
 *
 * 直接数已交页签条目自带的 score/totalScore（平台在清单里就给了）——
 * 不逐卷去读 examRedoNum：那是「还能不能重做」的问题，属执行前的闸（execute-exam），
 * 这里回答的是「还是不是满分」，两个问题别混成一个（设计文档 §2.1 的两个口径）。
 * 分数缺失（null）的条目**不计入**：读不到就别说它未满分。
 */
export function countNotFullUnitTests(tabs: CourseExamTabs): number {
  return tabs.submitted.filter(
    (item) =>
      item.meetCourseType === MEET_COURSE_TYPE.unitTest &&
      item.score !== null &&
      item.totalScore !== null &&
      item.totalScore > 0 &&
      item.score < item.totalScore,
  ).length;
}

/*
 * 期末考试：一份读取，两处使用（待办与课程任务卡走同一个函数——两处各读一遍
 * 就会各自漂移出不同的空/失败措辞，那正是本仓要消灭的）。
 *
 * 先问形态（只有「在线」那条分支才在这条接口上，机房/线下读不到），再读条目。
 * 全程只读：`getStudentFinalExam` 不建任何答卷（对照 §5 的 dohomework 那条界）。
 */
export interface FinalExamReading {
  /** 读到的那一条（一门课目前实测最多一条）；没有/不适用时为 null */
  exam: ZhsFinalExam | null;
  /** 考试形态（1=在线 2=机房 3=线下；读不到为 0）。待办据此区分「机房/线下也有考试」与「没有期末」 */
  form: number;
  /** 读不到或不适用时的如实一句（可用时为 null） */
  note: string | null;
}

export async function readFinalExam(
  client: ZhsClient,
  course: Pick<ZhihuishuCourse, 'recruitId' | 'courseId'>,
): Promise<FinalExamReading> {
  const form = await getExamForm(client, { recruitId: course.recruitId, courseId: course.courseId });
  if (form === EXAM_FORM.room) return { exam: null, form, note: '期末考试在机房进行，这里读不到' };
  if (form === EXAM_FORM.offline) return { exam: null, form, note: '期末考试为线下考试，这里读不到' };
  if (form !== EXAM_FORM.online) return { exam: null, form, note: '未读取到这门课的考试形态' };

  const list = await getFinalExam(client, { recruitId: course.recruitId, courseId: course.courseId });
  const first = list[0] ?? null;
  return first === null
    ? { exam: null, form, note: '这门课没有期末考试' }
    : { exam: first, form, note: null };
}

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
import {
  chapterExams,
  getCourseUnits,
  getExamList,
  isActionable,
  MEET_COURSE_TYPE,
  quizItemId,
  readCourseChapters,
  unitItemId,
  type ZhsClient,
  type ZhsChapterNode,
  type ZhsExamListItem,
  type ZhsUnit,
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
  const results: CourseUnits[] = [];
  for (const course of courses) {
    if (course.secret.length === 0) {
      results.push({ course, units: [], chapters: [], unreadReason: '缺少课程入口参数，先读取课程列表' });
      continue;
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
      results.push({ course, units, chapters, unreadReason: null });
    } catch (error) {
      results.push({
        course,
        units: [],
        chapters: [],
        unreadReason: error instanceof Error ? error.message : String(error),
      });
    }
  }
  return results;
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

/**
 * 收集每门课的**未做单元测试**。
 *
 * 判据与执行侧同源（`isActionable`：未交页签里 `state=1`），所以列出来的
 * 就是执行会动的那一批；章节结构用来确认这卷能被执行（拿不到数字卷号的
 * 不做，与 `plan()` 同一条门槛）。
 *
 * 读不成不牵连其他课（与 `collectUnits` 同一条边界），但**读不成这件事本身
 * 要如实带回去**——课程可能视频读得到、测验读不到，那时只有这里知道。
 */
export async function collectQuizzes(
  client: ZhsClient,
  collected: readonly CourseUnits[],
): Promise<CourseQuiz[]> {
  const results: CourseQuiz[] = [];
  for (const { course, chapters, unreadReason } of collected) {
    // 视频那一遍就没读成的课，这里也没什么可做的（原因已由那一遍报出）
    if (unreadReason !== null) {
      results.push({ course, items: [], unreadReason: null });
      continue;
    }
    try {
      const known = new Set(chapterExams(chapters).map((exam) => exam.listId));
      const pending = await getExamList(client, {
        recruitId: course.recruitId,
        courseId: course.courseId,
        submitted: false,
      });
      results.push({
        course,
        // 只列**单元测试**（meetCourseType=0）；见面课测验属另一类，本期不做
        items: pending.filter((item) => item.meetCourseType === 0 && isActionable(item) && known.has(item.id)),
        unreadReason: null,
      });
    } catch (error) {
      results.push({
        course,
        items: [],
        unreadReason: error instanceof Error ? error.message : String(error),
      });
    }
  }
  return results;
}

/** 单元测试条目的计划项 id（与执行侧同一份取名规则）。 */
export { quizItemId };

/**
 * 平台成绩分析页（点课名打开）。
 *
 * 地址取自 FINDINGS §二十二 记的真实入口 `stuonline /stuLearnReportNew/index?recruitId=&courseId=`，
 * 不拼猜测的域名——那个域在本项目的记录里有据（`stuonline.zhihuishu.com`）。
 */
export function reportPageUrl(recruitId: number, courseId: number): string {
  return `https://stuonline.zhihuishu.com/stuonline/stuLearnReportNew/index?recruitId=${recruitId}&courseId=${courseId}`;
}

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
 * 与 `collectQuizzes` 分开：那份只列**执行会动的**（未交页签 + `state=1` + 章节对得上），
 * 供待办用；这一份要的是**全部单元测试**，供「学习进度·测试」计数。
 * 判据不同——拿执行范围去报进度，进度就永远不是真的进度。
 */
export async function readCourseExams(
  client: ZhsClient,
  course: ZhihuishuCourse,
): Promise<CourseExamTabs> {
  const base = { recruitId: course.recruitId, courseId: course.courseId };
  const [pending, submitted] = [
    await getExamList(client, { ...base, submitted: false }),
    await getExamList(client, { ...base, submitted: true }),
  ];
  return { pending, submitted };
}

/**
 * 单元测试的完成计数（纯函数：两个页签 → 分数）。
 *
 * 两件事都在这里定死：
 *   - **只数单元测试**（`meetCourseType=0`）——见面课测验是另一个组件，
 *     混进来会让「学习进度·测试」变成两样东西的和；
 *   - **按条目 id 去重**。真机实测（2026-10-17，沙箱课）两页签不重叠：
 *     未交 17 条（含 1 条 `state=5`）＋ 已交 3 条 ＝ 20 条，正好二十章。
 *     去重是防「重做留下第二条目」把分母撑大——数错不如数稳。
 *     同一 id 若真同时出现，以**已交页签**为准（那才是平台判的交没交）。
 */
export function countUnitTests(tabs: CourseExamTabs): { done: number; total: number } {
  const unitTests = (items: readonly ZhsExamListItem[]): ZhsExamListItem[] =>
    items.filter((item) => item.meetCourseType === MEET_COURSE_TYPE.unitTest);

  const ids = new Set<string>();
  for (const item of [...unitTests(tabs.pending), ...unitTests(tabs.submitted)]) ids.add(item.id);

  const doneIds = new Set<string>();
  for (const item of unitTests(tabs.submitted)) doneIds.add(item.id);

  // 已交页签里的条目必然也在 ids 里（它就是那么进去的），所以直接取大小
  return { done: doneIds.size, total: ids.size };
}

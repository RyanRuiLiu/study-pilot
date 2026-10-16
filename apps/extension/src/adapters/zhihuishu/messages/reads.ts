/*
 * 智慧树的读取原语：按勾选的课程收集单元表。
 *
 * 课件概要（每门课一行）与待办（逐单元一条）看的是**同一份读取结果**——
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

/** 按课程分组的单元条目（待办与课件共用的形状）。 */
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

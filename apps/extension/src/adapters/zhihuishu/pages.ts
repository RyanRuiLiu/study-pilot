/*
 * 智慧树的页面地址：一处拼，界面各处共用。
 *
 * 点击落点必须统一——同一件事在待办里点开的是哪一页，在设置页的课程任务里
 * 也必须是那一页。两处各拼一遍字符串，迟早会漂移成两个落点。
 *
 * 三条落点各自的事实来源：
 *   - 学习页（教程视频行）：`wisdom-mooc /study/index?recruitAndCourseId=`——
 *     `recruitAndCourseId` 就是课程密文（`course.secret`），FINDINGS 记录并实测；
 *   - **作业考试列表页**（单元测试行、期末考试行）：`exam.zhihuishu.com
 *     /onlineExam/studentExam/stuExam?recruitId=`（FINDINGS 记的另一考试入口）。
 *     **点这一页不是点开考那一卷**：`dohomework` 路由一打开就在服务端建答卷
 *     （设计文档 §5），列表页则不会——「列着全部测试的那个页面」才是落点；
 *   - 成绩分析页（课名）：在 `@study-pilot/platform-zhs` 的 `reportPageUrl`（reads 侧），
 *     那一条由数据层给出，界面不自己拼。
 */

/** 学习页：教程视频那几行的落点。 */
export function studyPageUrl(recruitAndCourseId: string): string {
  return `https://wisdom-mooc.zhihuishu.com/study/index?recruitAndCourseId=${encodeURIComponent(recruitAndCourseId)}`;
}

/** 作业考试列表页：单元测试与期末考试那几行的落点（点开不建答卷）。 */
export function examListUrl(recruitId: number): string {
  return `https://exam.zhihuishu.com/onlineExam/studentExam/stuExam?recruitId=${recruitId}`;
}

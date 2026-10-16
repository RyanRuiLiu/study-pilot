/*
 * 智慧树的页面地址：一处拼，界面各处共用。
 *
 * 点击落点必须统一——同一件事在待办里点开的是哪一页，在设置页的课程任务里
 * 也必须是那一页。两处各拼一遍字符串，迟早会漂移成两个落点。
 *
 * 三条落点各自的事实来源：
 *   - 学习页（教程视频行）：`wisdom-mooc /study/index?recruitAndCourseId=`——
 *     `recruitAndCourseId` 就是课程密文（`course.secret`），FINDINGS 记录并实测；
 *   - **作业考试列表页**（单元测试行、期末考试行）：`onlineexamh5new.zhihuishu.com
 *     /stuExamWeb.html#/webExamList?recruitId=<加密 token>&fromUrl=<学习页>`——
 *     2026-10-17 按平台自己给出的链接逐段核过（token 反解出数字 recruitId、host 与
 *     `fromUrl` 都对齐）。**点这一页不是点开考那一卷**：`dohomework` 路由一打开就在
 *     服务端建答卷（设计文档 §5），列表页则不会——「列着全部测试的那个页面」才是落点；
 *   - 成绩分析页（课名）：FINDINGS §二十二 记的真实入口
 *     `stuonline /stuLearnReportNew/index?recruitId=&courseId=`（学习页菜单第 4 项）。
 */

/** 学习页：教程视频那几行的落点。 */
import { encryptRecruitId } from '@study-pilot/platform-zhs';

/** 学习页：教程视频那几行的落点。 */
export function studyPageUrl(recruitAndCourseId: string): string {
  return `https://wisdom-mooc.zhihuishu.com/study/index?recruitAndCourseId=${encodeURIComponent(recruitAndCourseId)}`;
}

/**
 * 作业考试列表页：单元测试与期末考试那几行的落点（点开不建答卷）。
 *
 * 两个参数都取平台自己的写法（2026-10-17 按平台给出的链接核过，不拼猜测的形状）：
 *   - `recruitId` 是**加密 token**（`encryptRecruitId`，即平台那个 `ys`），不是数字；
 *   - `fromUrl` 是这一页的「返回」去处——平台给的是这门课的学习页，所以照给。
 */
export async function examListUrl(recruitId: number, studyUrl: string): Promise<string> {
  const token = encodeURIComponent(await encryptRecruitId(recruitId));
  return `https://onlineexamh5new.zhihuishu.com/stuExamWeb.html#/webExamList?recruitId=${token}&fromUrl=${encodeURIComponent(studyUrl)}`;
}

/** 成绩分析页：课名的落点（组件口径的唯一事实源，见 FINDINGS §二十二）。 */
export function reportPageUrl(recruitId: number, courseId: number): string {
  return `https://stuonline.zhihuishu.com/stuonline/stuLearnReportNew/index?recruitId=${recruitId}&courseId=${courseId}`;
}

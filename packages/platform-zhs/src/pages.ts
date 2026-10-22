/*
 * 智慧树的页面地址：一处拼，执行侧与界面共用。
 *
 * 为什么要收进包里：**执行侧也要用**——撞门时给的「下一步」去处就是一个页面地址
 * （考试族要去作业考试页人工过那一次验证）。先前只写在扩展的界面层，执行侧拼不了，
 * 两处各拼一遍迟早漂移成两个落点。
 *
 * 三条落点各自的事实来源：
 *   - 学习页（教程视频行）：`wisdom-mooc /study/index?recruitAndCourseId=`——
 *     `recruitAndCourseId` 就是课程密文；FINDINGS 记录并实测；
 *   - **作业考试列表页**（单元测试行、期末考试行、作答撞门的去处）：
 *     `onlineexamh5new.zhihuishu.com/stuExamWeb.html#/webExamList?recruitId=<加密 token>
 *     &fromUrl=<学习页>`——2026-10-17 按平台自己给出的链接逐段核过。**点这一页不是
 *     点开考那一卷**：`dohomework` 路由一打开就在服务端建答卷（设计文档 §5）；
 *   - 见面课页：新版（V2，Ryan 指出旧版 `online.zhihuishu.com/...` 不用）；
 *   - 成绩分析页：FINDINGS §二十二 记的真实入口（学习页菜单第 4 项）。
 */

import { encryptRecruitId } from './sign.ts';

/** 站点首页的源：读会话 cookie 的锚点（session.ts）。 */
export const ZHS_SITE_ORIGIN = 'https://www.zhihuishu.com';

/**
 * 「去登录」的去处：登录中心本身（2026-10-23 实测）。
 *
 * 不再指向首页：首页会用 localStorage 里的 userId 画出「已登录」，哪怕服务端
 * 会话已经失效——用户在那里既看不出问题，也找不到登录入口。
 * 取值（2026-10-23 Ryan 定）：学生首页 `onlineweb.zhihuishu.com/onlinestuh5`。
 * 实测该页在未登录时会 302 到登录中心，登录后就是学生首页（课程与见面课都在这里）；
 * 首页与登录中心二选一时选它：用户落地即看到自己的课，而不是一个中转页。
 */
export const ZHS_LOGIN_URL = 'https://onlineweb.zhihuishu.com/onlinestuh5';

/** 学习页：教程视频那几行的落点，也是撞门时的去处（账号级挂起在那儿过一次验证）。 */
export function studyPageUrl(recruitAndCourseId: string): string {
  return `https://wisdom-mooc.zhihuishu.com/study/index?recruitAndCourseId=${encodeURIComponent(recruitAndCourseId)}`;
}

/**
 * 作业考试列表页：单元测试与期末考试那几行的落点、作答撞门时的去处（点开不建答卷）。
 *
 * 两个参数都取平台自己的写法：`recruitId` 是**加密 token**（`encryptRecruitId`，
 * 即平台那个 `ys`），不是数字；`fromUrl` 是这一页的「返回」去处——平台给的是
 * 这门课的学习页，所以照给。
 */
export async function examListUrl(recruitId: number, studyUrl: string): Promise<string> {
  const token = encodeURIComponent(await encryptRecruitId(recruitId));
  return `https://onlineexamh5new.zhihuishu.com/stuExamWeb.html#/webExamList?recruitId=${token}&fromUrl=${encodeURIComponent(studyUrl)}`;
}

/**
 * 见面课页：新版（V2）。Ryan 2026-10-17 指出旧版
 * `online.zhihuishu.com/onlineSchool/teachMeeting/stuList` 不用。
 * 实名从站点自己的代码里读出（与 FINDINGS §7 记的 `stuListV2` 一致）。
 */
export function meetPageUrl(recruitId: number): string {
  return `https://stuonline.zhihuishu.com/stuonline/teachMeeting/stuListV2?recruitId=${recruitId}`;
}

/** 成绩分析页（FINDINGS §二十二 的真实入口；学习页菜单第 4 项）。 */
export function reportPageUrl(recruitId: number, courseId: number): string {
  return `https://stuonline.zhihuishu.com/stuonline/stuLearnReportNew/index?recruitId=${recruitId}&courseId=${courseId}`;
}

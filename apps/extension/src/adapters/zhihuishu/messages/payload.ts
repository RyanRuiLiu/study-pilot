/*
 * 智慧树的消息载荷与命令形状。
 *
 * 与慕课那份同一条边界：类型与智慧树的字段绑定，归平台所有；
 * 外壳的通用部分（查询结果、拒绝原因、处理器签名）在 src/protocol.ts。
 *
 * **请求键带 `ZHS_` 前缀**：两个平台共用一个消息路由表，请求的 type 同时是
 * 响应映射的键——键即契约，必须全局唯一。慕课那份同样带 `MOOC_` 前缀
 * （2026-10-16 平权改名）：不为「谁先接入」留命名上的先后。
 */

import type { QueryOutcome, JobRejection } from '../../../protocol.ts';
import type { ZhihuishuCourse } from '@study-pilot/application';

/**
 * 待办条目的类别。取值是**机器值**，界面上的组名（措辞的唯一源在弹窗侧）
 * 按它映射——平台包只负责说「这是哪一类」，不负责怎么称呼它。
 *
 * 与 `PlanItem.kind` 同一套取值（计划里就是这么标的），所以待办与执行范围
 * 天然对得上。智慧树的成绩构成有四类，四类都落成机器值；执行目前只覆盖前两类。
 */
export type ZhsPendingKind = 'courseware' | 'quiz' | 'meetWatch' | 'meetQuiz' | 'finalExam';

/** 设置页与弹窗里的一条待办。 */
export interface ZhsPendingEntry {
  /** 计划项 id（执行侧的唯一凭据，取名规则在平台包里） */
  itemId: string;
  /** 类别：教程视频 / 单元测试 / 见面课测验 / 期末考试（组名在弹窗侧映射） */
  kind: ZhsPendingKind;
  courseName: string;
  chapterName: string;
  /** 单元名 */
  name: string;
  /**
   * 阶段徽标文案（行 1 跟在名称后）。与慕课同一位置、同一角色：
   * 慕课是平台的提交状态（「未提交」），智慧树这边视频用「未学习」、
   * 测试用平台页签的原文「未提交」。
   */
  status: string;
  /**
   * 这一条在平台上的落点（整行点击打开；与慕课的 `href` 同角色）。
   *
   * **测验的落点是列表页，不是那一卷**：平台的 dohomework 地址一打开就建答卷
   * （设计文档 §5：任何读取路径不得顺手开卷），所以点测验只能到作业考试列表，
   * 由使用者在平台上自己点进具体那一卷。
   */
  href: string;
  /**
   * 截止时刻（毫秒）——**外壳时间列的唯一输入**。
   *
   * 与慕课的 `deadline` 同角色：行 1 右的「剩余时间」与行 2 右的「具体日期」
   * 都由它派生。单元测试有（平台的 `endDate`）；教程视频暂无——学习窗口由课程
   * 整体规定，那个数据还没接，此处为 null，界面上两格如实留空。
   */
  deadline: number | null;
  /**
   * 视频时长（秒）。**只有教程视频有**——单元测试没有时长，
   * 给 0 并在渲染侧据此不显示该位置（不拿 0 冒充「0 分钟」）。
   */
  sec: number;
  /**
   * 开考时刻（毫秒）——**只有期末考试有**。
   *
   * 它没开考时，行 1 右该说「M-D 开考」而不是「剩余多少天到截止」：
   * 后者会让人以为现在就能做。没开的期末由渲染侧据它与当前时刻切换措辞。
   */
  opensAt: number | null;
}

/** 一门课没读成的事实（待办里如实呈现，不静默消失——见 pending.ts）。 */
export interface ZhsUnreadCourse {
  courseName: string;
  reason: string;
}

/** 待办汇总。 */
export interface ZhsPendingSummary {
  /** 读取时刻（毫秒） */
  fetchedAt: number;
  /** 未完成单元总数（与 entries.length 相同，单独给出避免界面重算） */
  total: number;
  entries: ZhsPendingEntry[];
  /** 没读成的课：它们的单元不在 entries 里，但「读不到」这件事必须被看见 */
  unreadCourses: ZhsUnreadCourse[];
}

/**
 * 一门课的**成绩构成组件清单**（设计文档 §2 定案：按成绩构成组织）。
 *
 * 平台把每门课的成绩摊成若干组件（学习进度 / 平时测试 / 见面课 / 期末…），
 * 设置页按同一套组件报进度——**没有「课件」这个说法**：智慧树的任务不套慕课
 * 那套「课件/待办」二分，它的组件是平台自己给的（成绩分析页的原文口径）。
 *
 * 四块都填了实数据：教程/测试/见面课观看接执行（模块 1/2/4），期末接只读展示
 * （模块 6 的读半）。数据没接上的那一块**不给空行占位**——摆一行填不出的组件，
 * 人会以为那些是零。
 */
export interface ZhsCourseTask {
  courseId: number;
  /** 报名（学期）id——见面课页那类落点要以它为单位 */
  recruitId: number;
  courseName: string;
  /** 学习进度·教程：已完成的视频单元 / 全部视频单元 */
  video: { done: number; total: number };
  /**
   * 这一行「执行」要做的课件项 id（未完成的视频单元，取名规则在平台包）。
   * 按 id 而不是课程名收窄：同名课程（重选/不同报名）会把另一门一起做掉。
   */
  videoItemIds: string[];
  /**
   * 学习进度·测试：已交单元测试 / 全部单元测试。
   *
   * 总数是**未交与已交两页签合计**——只在未交页签里数会把交过的那些漏掉，
   * 进度就永远到不了满分。已完成数只认已交页签（平台的 flag 页签才判交没交，
   * 别拿 state 猜，见 exam-list.ts）。
   */
  quiz: { done: number; total: number };
  /**
   * 这一行「执行」要做的单元测试项 id：未交页签里我们接手的 + 已交未满分的重做卷，
   * 且章节对得上（与计划同一条门槛）。同样按 id 收窄，避免同名课程串到别家。
   */
  quizItemIds: string[];
  /**
   * 已交单元测试里**未满分**的卷数。
   *
   * 成绩取自已交页签条目自带的 score/totalScore 两个字段（平台在清单里就给了，
   * 不再逐卷多发一次请求）。与 `quiz.done` 一起构成设计文档 §2.1 要的两个口径：
   * 「已交 3/20 · 其中 1 卷未满分」——进度问「交没交」，这一项问「还是不是满分」。
   * 测试那两页签没读成时给 0，由 `quizUnreadReason` 明说那一行整体不可信。
   */
  quizNotFull: number;
  /** 见面课测验：已交 / 全部（与单元测试同一份清单里的另一类条目） */
  meet: { done: number; total: number };
  /**
   * 见面课场次：总场次、未开始场次与可自动观看的回放场次。
   * 考勤按学校口径是「看直播或回放满 80%」（Ryan 2026-10-17），在线观看型
   * 由执行侧上报观看进度；现场签到型不自动。
   */
  meetSessions: { total: number; upcoming: number; watchable: number } | null;
  /** 这一行「执行」要做的见面课观看项 id（在线观看 + 已结束 + 有回放）。 */
  meetWatchItemIds: string[];
  /** 场次没读成的原因（读成了是 null） */
  meetSessionsNote: string | null;
  /**
   * 期末考试（taurus 族）。读不到、或这门课的考试形态不是在线（机房/线下
   * 不走这条接口）时为 null——原因在 `finalExamNote`。
   */
  finalExam: {
    examName: string;
    /** 1 = 未提交（实测；其余取值原样带出） */
    state: number;
    /** 开考/结束时刻（毫秒；解析不出为 null） */
    startAt: number | null;
    endAt: number | null;
    /** 剩余机会 */
    remainCount: number;
  } | null;
  /** 期末那一栏读不到/不适用时的如实一句（可用时为 null） */
  finalExamNote: string | null;
  /** 作业考试列表页：单元测试与期末两块的落点（点开不建答卷，见 pages.ts） */
  examListUrl: string;
  /** 学习页：教程视频那块的落点 */
  studyUrl: string;
  /**
   * 测试那两页签没读成的原因（读成时为 null）。
   *
   * 与 `unread` 是两件事：`unread` 是整门课的结构没读到，这个是结构读到了、
   * 只有作业清单那两页签失败——那时视频那半照常报数，**测试这一行按本字段
   * 关掉数字位**，不拿 0/0 冒充「这门课没有测试」。
   */
  quizUnreadReason: string | null;
  /** 这门课还剩多少项没完成（视频未看 + 单元测试未交）。状态行用 */
  pending: number;
  /**
   * 这门课的结构没读成（缺入口参数或平台读取失败）。
   * 数字不显示、执行禁用——不拿全 0 冒充「这门课没有内容」。
   */
  unread?: boolean;
}

/** 课程任务概要：每门课一份组件清单 + 汇总计数。 */
export interface ZhsCourseTaskSummary {
  courses: ZhsCourseTask[];
  /**
   * 待完成总数（状态行用）。
   *
   * **有课没读全时是 null**（结构没读到，或测试那两页签没读到）——那时这个数只是
   * 一个下界，报出去就成了「读失败被折成一个确定的数」，正是本仓禁的那种静默降级。
   * 读不全的课在各自的卡里说清自己哪一半没读到，头部则不报这个数。
   */
  pendingTotal: number | null;
}

/** 登录态（界面只需要知道能不能读）。 */
export interface ZhsSessionView {
  loggedIn: boolean;
  /** 有 cookie 但服务端不认（401/403）：界面上说「登录已失效」，不说「未登录」 */
  expired?: true;
}

// ---------- 本平台的命令 ----------

export type ZhsRequest =
  /** 查询当前登录态（不返回设备号——它只属于上报载荷，界面不需要） */
  | { type: 'ZHS_SESSION' }
  /** 读取已保存的课程列表（只读本地配置） */
  | { type: 'ZHS_COURSES' }
  /** 去平台重新拉一次课程列表并写回配置（勾选沿用用户做过的） */
  | { type: 'ZHS_REFRESH_COURSES' }
  /** 课程任务：每门课的成绩构成组件进度（只读） */
  | { type: 'ZHS_COURSE_TASKS' }
  /** 待办：未完成的教程视频、单元测试/见面课测验，以及期末考试（后两类只读展示） */
  | { type: 'ZHS_PENDING_SUMMARY' };

export interface ZhsResponseMap {
  ZHS_SESSION: ZhsSessionView;
  ZHS_COURSES: ZhihuishuCourse[];
  ZHS_REFRESH_COURSES:
    | { ok: true; courses: ZhihuishuCourse[] }
    | { ok: false; reason: JobRejection; message?: string };
  ZHS_COURSE_TASKS: QueryOutcome<ZhsCourseTaskSummary>;
  ZHS_PENDING_SUMMARY: QueryOutcome<ZhsPendingSummary>;
}

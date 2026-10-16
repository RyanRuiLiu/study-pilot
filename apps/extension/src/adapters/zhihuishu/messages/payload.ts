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
 * 天然对得上。智慧树的成绩构成有四类，这里先落前两类可执行的两类。
 */
export type ZhsPendingKind = 'courseware' | 'quiz';

/** 设置页与弹窗里的一条待办。 */
export interface ZhsPendingEntry {
  /** 计划项 id（执行侧的唯一凭据，取名规则在平台包里） */
  itemId: string;
  /** 类别：教程视频 / 单元测试（组名在弹窗侧映射） */
  kind: ZhsPendingKind;
  courseName: string;
  chapterName: string;
  /** 单元名 */
  name: string;
  /**
   * 视频时长（秒）。**只有教程视频有**——单元测试没有时长，
   * 给 0 并在渲染侧据此不显示该位置（不拿 0 冒充「0 分钟」）。
   */
  sec: number;
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

/** 一门课的课件进度（与课件区显示的是同一份判据）。 */
export interface ZhsCoursewareProgress {
  courseId: number;
  courseName: string;
  /** 已完成的单元数 */
  done: number;
  /** 单元总数 */
  total: number;
  /** 未完成且可执行的数量（= total - done） */
  pending: number;
  /**
   * 这门课的结构没读成（缺入口参数或平台读取失败）。
   * 数字不显示、执行禁用——不拿全 0 冒充「这门课没有内容」。
   */
  unread?: boolean;
}

/** 课件概要：每门课一行 + 汇总计数。 */
export interface ZhsCoursewareSummary {
  courses: ZhsCoursewareProgress[];
  /** 待完成单元总数（状态行用） */
  pendingTotal: number;
}

/** 登录态（界面只需要知道能不能读）。 */
export interface ZhsSessionView {
  loggedIn: boolean;
}

// ---------- 本平台的命令 ----------

export type ZhsRequest =
  /** 查询当前登录态（不返回设备号——它只属于上报载荷，界面不需要） */
  | { type: 'ZHS_SESSION' }
  /** 读取已保存的课程列表（只读本地配置） */
  | { type: 'ZHS_COURSES' }
  /** 去平台重新拉一次课程列表并写回配置（勾选沿用用户做过的） */
  | { type: 'ZHS_REFRESH_COURSES' }
  /** 课件进度：每门课的完成计数（只读） */
  | { type: 'ZHS_COURSEWARE_SUMMARY' }
  /** 待办：全部未完成的视频单元 */
  | { type: 'ZHS_PENDING_SUMMARY' };

export interface ZhsResponseMap {
  ZHS_SESSION: ZhsSessionView;
  ZHS_COURSES: ZhihuishuCourse[];
  ZHS_REFRESH_COURSES:
    | { ok: true; courses: ZhihuishuCourse[] }
    | { ok: false; reason: JobRejection; message?: string };
  ZHS_COURSEWARE_SUMMARY: QueryOutcome<ZhsCoursewareSummary>;
  ZHS_PENDING_SUMMARY: QueryOutcome<ZhsPendingSummary>;
}

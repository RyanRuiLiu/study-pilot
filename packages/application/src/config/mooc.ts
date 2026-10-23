/*
 * 慕课平台（icourse163.org）的设置。
 *
 * 与 AI 设置分文件：这一份随平台走，换平台时新增一个同级的平台文件，
 * 不动 `index.ts` 里的根类型。
 *
 * 这里一个「允许做什么」的开关都没有，这是有意的。
 *
 * 早先有总开关与四个 auto* 开关，它们服务于后台自动执行——那是
 * 「时钟替你决定何时动手」的世界，开关是预授权：现在不点，将来它自己做。
 * 现在动手的人是你，点哪一类就做哪一类，**点击那一刻就是授权**，
 * 配置里不需要预授权位。设置里于是只剩三种东西：参与哪些课程、
 * 互评时说什么、过期项留几天。
 */

/**
 * 参与任务的课程。
 *
 * 这里的字段在写入时就归一化好了，读取侧不需要再判空：
 * 接口返回 null 的数值字段（课时数、选课人数、学期时间）在写入时转为 0，
 * 展示时按「大于 0 才显示」处理。
 *
 * 契约：
 *   - shortName 是课程地址的路径段，没有它拼不出可用的链接；
 *   - mode 决定学习页前缀（/learn/ 或 /spoc/learn/）；
 *   - 时间与计数为 0 表示平台未提供该数据。
 */
export interface SelectedCourse {
  /** 课程 id */
  courseId: number;
  /** 学期 id。任务全部以它为单位 */
  termId: number;
  name: string;
  /** 课程简称，课程地址的路径段 */
  shortName: string;
  /** 课程模式：0 MOOC、10/15/20 SPOC、30 ROOC。缺失时为 -1，表示平台未提供 */
  mode: number;
  /** 开课学校 */
  schoolName: string;
  /** 学校简称，课程页地址的路径段前缀（如 NTU） */
  schoolShortName: string;
  /** 封面图 */
  coverUrl: string;
  /** 学期开始时间，0 表示未提供 */
  startTime: number;
  /** 学期结束时间，0 表示未提供 */
  endTime: number;
  /** 课时数，0 表示未提供 */
  lessonsCount: number;
  /** 已选人数，0 表示未提供 */
  enrollCount: number;
  /**
   * 当前账号是否已选这门课（平台字段 hasEnroll）。
   * 未选课的课平台不会给结构，读取范围因此把它排除；旧记录缺这个字段时按 true。
   */
  hasEnroll?: boolean;
  /** 是否参与任务 */
  enabled: boolean;
}

/** 慕课平台。当前接入的是 icourse163.org。 */
export interface MoocSettings {
  /** 参与任务的课程 */
  courses: SelectedCourse[];
  /**
   * 互评提交时填写的评语。平台要求这项非空。
   *
   * 这句话是用户指定的措辞，不是随手填的模板。它是一句鼓励，没有对
   * 作业质量下事实判断——被评的同学不会从中读到一个扩展替人得出的结论，
   * 这也是它比「完成认真、格式规范」那类话更站得住的理由：
   * 扩展没读过那份作业，本来就没有资格评价它做到什么程度。
   *
   * 改这里要连带改设置页的标注，以及 normalize 的兜底（留空退回这一句）。
   */
  reviewComment: string;
  /**
   * 已过截止的事项在待办里保留几天。
   *
   * 过期项的作用是让用户知道自己漏了什么，说一次就够。挂太久会攒出
   * 几十条不会被查看的记录，把真正要做的事挤下去。
   *
   * 默认 3 天：够长到不容易漏看，又短到不会累积。
   * 想看更早的可以去看单元明细，那里列全部单元且带得分，不受这个设置影响。
   */
  keepOverdueDays: number;
}

export const DEFAULT_MOOC: MoocSettings = {
  courses: [],
  reviewComment: '非常棒，继续努力！',
  keepOverdueDays: 3,
};

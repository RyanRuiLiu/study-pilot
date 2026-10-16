/**
 * MOOC 领域类型。
 *
 * 定义原则：
 *   - 只声明**业务真正读取**的字段，其余靠索引签名兜住，不追求与服务端逐一对应；
 *   - 服务端字段会随发版增减，所以索引签名是必要的而不是偷懒；
 *   - 可选性从严：没有证据表明一定存在的字段一律标 `?`，
 *     宁可让调用方处理 undefined，也不要写一个会在运行时炸掉的必填字段。
 *
 * 字段来源：实测调用。抓取产物不入库，结论只写在这里。
 */

/** 课程概要（`getMyLearnedCoursePanelList` 的一行）。 */
export interface CourseSummary {
  courseId: number;
  name: string;
  /** 课程简称，形如 NTU021 */
  shortName: string;
  /** 学期 id。后台任务全部以它为单位 */
  termId: number;
  /** 课程模式：0 MOOC、10 SPOC 同步、15 SPOC 异步、20 SPOC 独立、30 ROOC */
  mode: number | null;
  /**
   * 条目上的产品类型（平台枚举 COURSE_PRODUCT_TYPE：1 课程、2 考研、
   * 3 专栏、308 教材）。注意与请求参数的 courseType（1|2，MOOC/SPOC 分页维度）
   * 同名不同义——这一点是读平台源码（站点 bundle 里的 COURSE_PRODUCT_TYPE）确认的。
   */
  courseType: number | null;
  /**
   * 当前账号是否已选这门课（服务端字段 termPanel.hasEnroll）。
   * 平台只对已选课的课给结构（官方客户端据此选读取路径，见 structure.ts）。
   * 平台未提供时按 true——不凭缺失把课排除掉。
   */
  hasEnroll: boolean;
  /** 开课学校 */
  schoolName: string;
  /** 学校简称，课程页地址的路径段前缀（如 NTU） */
  schoolShortName: string;
  /** 封面图地址 */
  coverUrl: string;
  startTime: number | null;
  endTime: number | null;
  publishStatus: number | null;
  /** 课时数 */
  lessonsCount: number | null;
  /** 已选人数 */
  enrollCount: number | null;
}


// ---------- 课程结构 ----------

export type WorkType = 'quiz' | 'homework' | 'exam-objective' | 'exam-subjective';

/**
 * 单元挂载的 `test` 对象。判定互评与完成状态所需的字段都在这里，
 * 因此「枚举 + 判定」只需一次 `getLastLearnedMocTermDto` 请求。
 */
export interface WorkTest {
  id: number;
  type?: number | null;
  name?: string | null;
  /** 截止时间（毫秒） */
  deadline?: number | null;
  releaseTime?: number | null;
  /** 互评窗口起点（毫秒） */
  evaluateStart?: number | null;
  /** 互评窗口终点（毫秒） */
  evaluateEnd?: number | null;
  /** 是否支持互评 */
  enableEvaluation?: boolean | null;
  /** 互评方式。非 null 才可能真正开启互评 */
  evaluateJudgeType?: number | null;
  /** 用过的尝试次数。大于 0 表示做过 */
  usedTryCount?: number | null;
  /** 总尝试次数上限 */
  totalTryCount?: number | null;
  /**
   * 提交状态。考试用它表示做没做，1 为已提交。
   *
   * 考试不报 `usedTryCount`，只给这个字段；作业反过来。
   * 因此判断「做过没有」要把两者都算上——否则考试永远显示未提交，
   * 而它已有成绩。
   */
  userSubmitStatus?: number | null;
  /** 用户得分。非 null 表示已判分 */
  userScore?: number | null;
  totalScore?: number | null;
  /**
   * 考试的满分，按题型分开。
   *
   * 考试不用 `totalScore`：主观题部分报 `sbjTotalScore`、客观题部分报
   * `objTotalScore`，两者的 `totalScore` 都是 null。只读 `totalScore`
   * 会让考试显示不出满分——有分数却写不成「100 / 100」。
   */
  sbjTotalScore?: number | null;
  objTotalScore?: number | null;
  scorePubStatus?: number | null;
  [key: string]: unknown;
}

/** 归一化后的单元工作项。 */
export interface CourseWork {
  /** 工作 id，即各接口的 `tid` */
  tid: number;
  type: WorkType;
  name: string;
  chapterId: number;
  chapterName: string;
  /** 章节序号，从 0 开始 */
  chapterIndex: number;
  /**
   * 考试自身的 id，仅考试有。
   *
   * 考试的两部分（客观题与主观题）共用这一个 id，答卷页地址需要它。
   * 其他类型没有这个概念，为 undefined。
   */
  examId?: number;
  test: WorkTest;
}

/**
 * 课件单元类型。出处 `core/index.js:20203-20215`（`edu.u.CONST`）。
 *
 * 这是全项目唯一的类型编号来源：结构解析、行为注册、设置文案都引用它，
 * 不允许在别处再抄一份数字。
 */
export const UNIT_TYPE = {
  VIDEO: 1,
  VIDEO_SRT: 2,
  PDF: 3,
  TEXT: 4,
  QUESTION: 5,
  DISCUSS: 6,
  LIVE: 7,
  COLUMN_CONTENT: 8,
  RELATED_LIVE: 9,
  MUSIC_VIDEO: 10,
  MUSIC_EXERCISE: 11,
  MUSIC_HOMEWORK: 12,
  INTERACTIVE_COURSEWARE: 15,
} as const;

/**
 * 课件单元。
 *
 * 与 `CourseWork` 是两套东西：工作项是「要交的作业/测验/考试」，
 * 课件单元是「要看的内容」——视频、文档、文本、随堂测验、讨论。
 * 两者的取值重叠而含义不同（单元 3 是文档，工作项 3 是作业），不能混用。
 *
 * 位置：`chapters[].lessons[].units[]`。
 */
export interface CourseUnit {
  /** 单元 id。上报时报作 `unitId` */
  unitId: number;
  /** 资源 id。视频是视频 id，文档是文档 id */
  contentId: number;
  /** 所属学期。取题库等按学期维度的数据要用它 */
  termId: number;
  /** 所属课时 id */
  lessonId: number;
  lessonName: string;
  name: string;
  /** `UNIT_TYPE` 的取值 */
  contentType: number;
  /** 视频总时长（秒）。其它类型为 null */
  durationInSeconds: number | null;
  /** 完成度。视频为「已学秒数 ÷ 总时长」，其余类型为 0 或 1 */
  completePercent: number;
  /** 0 未学；5 已学（部分学习也是 5） */
  viewStatus: number;
}

export interface CourseStructure {
  termId: number;
  courseId: number;
  courseName: string;
  works: CourseWork[];
  units: CourseUnit[];
}

/**
 * 由 `test` 字段派生的**事实标志**。
 *
 * 与 app 消息层那个 `WorkStatus`（界面上一句状态文案，如「互评阶段」）不是一回事：
 * 这里是四个布尔判据，供计划与文案层各自去解释。两者曾经同名，读代码的人
 * 要靠所在文件才能分辨是哪个，因此这个叫 `WorkFlags`。
 */
export interface WorkFlags {
  /** 支持互评：`enableEvaluation === true` 且 `evaluateJudgeType != null` */
  reviewable: boolean;
  /** 已提交过：`usedTryCount > 0` 或 `userScore != null` */
  submitted: boolean;
  /** 互评窗口尚未关闭 */
  reviewOpen: boolean;
  /** 已过截止时间 */
  overdue: boolean;
}


// 地址与试卷类型已按域移出，这里保持唯一出口，导入方不受影响
export * from './course-url.ts';
export * from './paper-types.ts';

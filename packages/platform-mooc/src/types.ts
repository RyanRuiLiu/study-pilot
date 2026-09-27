/**
 * MOOC 领域类型。
 *
 * 定义原则：
 *   - 只声明**业务真正读取**的字段，其余靠索引签名兜住，不追求与服务端逐一对应；
 *   - 服务端字段会随发版增减，所以索引签名是必要的而不是偷懒；
 *   - 可选性从严：没有证据表明一定存在的字段一律标 `?`，
 *     宁可让调用方处理 undefined，也不要写一个会在运行时炸掉的必填字段。
 *
 * 字段来源：实测调用。抓取产物不入库，结论记录在 docs/platforms/mooc.md。
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
  /** 1 MOOC、2 SPOC。与 mode 不同，这是接口的分页维度 */
  courseType: number | null;
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

/** 课程模式。取值与源码 `edu.u.CONST` 一致。用于展示与拼接学习页地址。 */
export const COURSE_MODE = {
  MOOC: 0,
  SPOC_SYNC: 10,
  SPOC_ASYNC: 15,
  SPOC_ONLY: 20,
  ROOC: 30,
} as const;

/**
 * 学习页的地址前缀。
 *
 * MOOC 走 `/learn/`，其余（SPOC 与 ROOC）走 `/spoc/learn/`。
 * 两种前缀的页面结构一致，但地址不同，拼链接必须按 mode 区分。
 */
export function learnPagePrefix(mode: number): string {
  return mode === COURSE_MODE.MOOC ? '/learn/' : '/spoc/learn/';
}

/**
 * 拼课程页地址。
 *
 * 路径段是 **学校简称 + '-' + 课程 id**，不是课程自己的 shortName。
 * 实测对照：
 *
 *   模拟电子技术  course.shortName=NTU021  course.id=1001753142
 *                 实际地址 /learn/NTU-1001753142?tid=1487834456
 *   电路          course.shortName=202004  course.id=1459925161
 *                 实际地址 /learn/NTU-1459925161?tid=1476486462
 *
 * 学校简称取自 schoolPanel.shortName（该账号为 NTU）。
 * 用课程 shortName 会拼出打不开的地址。
 */
export function coursePageUrl(course: {
  courseId: number;
  schoolShortName: string;
  mode: number;
  termId: number;
}): string {
  const prefix = learnPagePrefix(course.mode);
  return `https://www.icourse163.org${prefix}${course.schoolShortName}-${course.courseId}?tid=${course.termId}`;
}

/**
 * 拼具体测验、作业或考试的地址。
 *
 * 课程页内部用 hash 路由，实测页面上的链接形如：
 *
 *   <a href="#/learn/quiz?id=1258534384">   测验
 *   <a href="#/learn/hw?id=1258531391">     作业
 *
 * 其中的 id 就是接口返回的 testId（作业的互评也在 hw 页面里进行）。
 *
 * 考试的地址多一个 eid
 * --------------------
 * 考试由两部分构成，各自的答卷页路由不同，两者都要带上考试自身（而非部分）
 * 的 id：
 *
 *   #/learn/examObject?eid={examId}&id={tid}&examType=0   客观题
 *   #/learn/examSubjective?eid={examId}&id={tid}          主观题
 *
 * examType 在客观题是 0，主观题实测为 null——字面量 "null" 拼进去反而
 * 打不开，所以只在有值时附加。eid 缺失时退回到考试列表页：那仍然能把
 * 用户送到正确的地方，比给一个打不开的地址好。
 */
export function workPageUrl(
  course: {
    courseId: number;
    schoolShortName: string;
    mode: number;
    termId: number;
  },
  kind: 'quiz' | 'homework' | 'exam-objective' | 'exam-subjective',
  testId: number,
  examId?: number,
): string {
  const base = coursePageUrl(course);

  if (kind === 'exam-objective' || kind === 'exam-subjective') {
    if (!examId) return `${base}#/learn/examlist`;
    const route = kind === 'exam-objective' ? 'examObject' : 'examSubjective';
    const type = kind === 'exam-objective' ? '&examType=0' : '';
    return `${base}#/learn/${route}?eid=${examId}&id=${testId}${type}`;
  }

  const section = kind === 'quiz' ? 'quiz' : 'hw';
  return `${base}#/learn/${section}?id=${testId}`;
}

/**
 * 课程模式的展示名。
 *
 * 文案沿用平台的分类叫法，不自创。
 * 未提供模式时返回空串——调用方据此省略这一项，而不是显示一个占位词。
 */
export function describeCourseMode(mode: number): string {
  switch (mode) {
    case COURSE_MODE.MOOC:
      return 'MOOC';
    case COURSE_MODE.SPOC_SYNC:
      return 'SPOC 同步';
    case COURSE_MODE.SPOC_ASYNC:
      return 'SPOC 异步';
    case COURSE_MODE.SPOC_ONLY:
      return 'SPOC 独立';
    case COURSE_MODE.ROOC:
      return 'ROOC';
    default:
      return '';
  }
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

export interface CourseStructure {
  termId: number;
  courseId: number;
  courseName: string;
  works: CourseWork[];
}

/** 由 `test` 字段派生的状态。 */
export interface WorkStatus {
  /** 支持互评：`enableEvaluation === true` 且 `evaluateJudgeType != null` */
  reviewable: boolean;
  /** 已提交过：`usedTryCount > 0` 或 `userScore != null` */
  submitted: boolean;
  /** 互评窗口尚未关闭 */
  reviewOpen: boolean;
  /** 已过截止时间 */
  overdue: boolean;
}

// ---------- 测验 ----------

/** 测验提交状态（`getQuizInfo` 的 `targetAnswerform`）。 */
export interface QuizAnswerForm {
  id?: number;
  tid?: number;
  aid?: number;
  /** 提交时间。大于 0 表示已提交 */
  submitTime?: number | null;
  score?: number | null;
  finalScore?: number | null;
  totalScore?: number | null;
  answererId?: number | null;
  submitType?: number | null;
  [key: string]: unknown;
}

/** `getQuizInfo` 的响应体。 */
export interface QuizInfo {
  tid: number;
  termId?: number;
  /** 当前用户的答题表单；从未作答时为 null */
  targetAnswerform?: QuizAnswerForm | null;
  deadline?: number | null;
  totalTryCount?: number | null;
  usedTryCount?: number | null;
  questionCount?: number | null;
  canRetake?: boolean | null;
  evaluateStart?: number | null;
  evaluateEnd?: number | null;
  [key: string]: unknown;
}

/** 试卷选项。`answer` 在取卷阶段恒为 null，只在题库里有真值。 */
export interface PaperOption {
  id: number | string;
  content?: string;
  answer?: boolean | null;
  [key: string]: unknown;
}

/** 试卷题目。注意它的 `id` 与题库题目的 `id` **不属于同一空间**。 */
export interface PaperQuestion {
  id: number;
  type?: number;
  /** 题目在卷面中的序号，从 0 开始。页面题号从 1 开始，两者相差 1 */
  position?: number | null;
  score?: number | null;
  title?: string;
  plainTextTitle?: string;
  optionDtos?: PaperOption[] | null;
  judgeDtos?: JudgeDto[] | null;
  [key: string]: unknown;
}

/** 用户答案项，保存草稿时使用。 */
export interface PaperAnswer {
  qid: number;
  type?: number;
  /** 选中的选项 id（试卷侧的 id，不是题库侧的） */
  optIds: Array<number | string>;
  time?: number;
}

/** 测验试卷（`getOpenQuizPaperDto`）。 */
export interface QuizPaper {
  tid: number;
  tname?: string | null;
  aid?: number | null;
  submitStatus?: number | null;
  type?: number | null;
  /** 写操作字段：提交时必须置为 null，答案由服务端从草稿读取 */
  answers?: PaperAnswer[] | null;
  /** 写操作字段：提交时为 1 */
  submitType?: number | null;
  objectiveQList?: PaperQuestion[] | null;
  subjectiveQList?: PaperQuestion[] | null;
  [key: string]: unknown;
}

// ---------- 题库 ----------

/**
 * 题库题目（`getQuestionListByTermId`）。
 * 与试卷题目的区别：这里带 `stdAnswer` 与选项的正确答案标记。
 */
export interface BankQuestion {
  id: number;
  type: number;
  title?: string;
  plainTextTitle?: string;
  stdAnswer?: string | null;
  optionDtos?: PaperOption[] | null;
  [key: string]: unknown;
}

/** 题型编号。来自上一代笔记，样本中的取值与之一致。 */
export const QUESTION_TYPE = {
  SINGLE: 1,
  MULTIPLE: 2,
  FILL_BLANK: 3,
  TRUE_FALSE: 4,
  SUBJECTIVE: 10,
} as const;

// ---------- 作业 ----------

/** 评分点。`msg` 是富文本，内含参考答案图片与评分标准文字。 */
export interface JudgeDto {
  id?: number;
  msg?: string | null;
  maxScore?: number | null;
  refScore?: number | null;
  [key: string]: unknown;
}

/** 作业信息（`getOpenHomeworkInfo`）。 */
export interface HomeworkInfo {
  tid: number;
  aid?: number;
  name?: string;
  /** 截止时间。当前时间早于它时处于提交阶段 */
  deadline?: number | null;
  evaluateStart?: number | null;
  evaluateEnd?: number | null;
  /** 成绩发布时间。当前时间不早于它时进入成绩阶段 */
  evaluateScoreReleaseTime?: number | null;
  enableEvaluation?: boolean | null;
  [key: string]: unknown;
}

/** 作业答卷（`getOpenHomeworkPaperDto`）。 */
export interface HomeworkPaper {
  tid: number;
  aid?: number;
  objectiveQList?: PaperQuestion[] | null;
  subjectiveQList?: PaperQuestion[] | null;
  [key: string]: unknown;
}

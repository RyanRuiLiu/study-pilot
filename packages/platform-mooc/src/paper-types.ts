/**
 * 试卷、题库与作业的类型。
 *
 * 从 `types.ts` 移出：这些是「一次作答/评分要用到的东西」，
 * 与课程结构的类型不是同一批。对外仍从 `types.ts` 导出，导入方不必改。
 */

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
  /** 卷面总分（实测 getQuizInfo 顶层带它；面板上显示「总分：」用）。 */
  totalScore?: number | null;
  /** 测验名。 */
  name?: string | null;
  evaluateStart?: number | null;
  evaluateEnd?: number | null;
  [key: string]: unknown;
}

/**
 * 题型与编号。**唯一出处是学习端源码**（core.js 的 CONST 常量区，
 * 2026-10-17 从 `pnpm probe src` 的镜像逐字核对）：
 *
 *   TYPE_OBJECTIVE_SINGLE: 1、TYPE_OBJECTIVE_MULTI: 2、TYPE_OBJECTIVE_FILLBLANK: 3、
 *   TYPE_OBJECTIVE_JUDGE: 4、TYPE_OBJECTIVE_RICHTEXT: 5、
 *   TYPE_SUBJECTIVE_OJ: 7（编程题）、TYPE_SUBJECTIVE_NORMAL: 10（主观题）。
 *
 * 学习端的界面文案只标了客观四型（KEY_LEARN_QUESTION_TYPE_SINGLE/MULTIPLE/JUDGE/FILL）；
 * 客观四型的答案都在卷面自身（选项正确标记或 stdAnswer）。其余编号在实测卷面中未出现，
 * 一旦出现且取不到答案，按 unresolved 如实失败——不猜（题型以服务端/源码为准）。
 */
export const QUESTION_TYPE = {
  single: 1,
  multi: 2,
  fillblank: 3,
  judge: 4,
  richtext: 5,
  oj: 7,
  subjective: 10,
} as const;

/**
 * 试卷选项。取卷带 `withStdAnswerAndAnalyse: true` 时 `answer` 就是正确性标记
 * （2026-10-17 实测多门课；与旧题库口径抽样核对 14/14 吻合）。
 */
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
  /**
   * 填空类的标准答案文本（取卷带 withStdAnswerAndAnalyse 时下发；2026-10-17 实测）。
   * 选择类为 null——它们的答案在选项的正确性标记上。
   */
  stdAnswer?: string | null;
  [key: string]: unknown;
}

/** 用户答案项（提交载荷与回读的形状，真机提交取证 2026-10-17）。 */
export interface PaperAnswer {
  qid: number;
  type?: number;
  /** 选择类的选中选项 id；填空类为 null */
  optIds: Array<number | string> | null;
  /** 填空类的作答文本（形状取自真机提交回读：「时间」） */
  content?: { content: string; attachments: null } | null;
  time?: number | null;
}

/** 测验试卷（`getOpenQuizPaperDto`）。 */
export interface QuizPaper {
  tid: number;
  tname?: string | null;
  aid?: number | null;
  submitStatus?: number | null;
  type?: number | null;
  /**
   * 写操作字段：提交时原样带上——submitQuiz 只补 submitType，清空它就没有答案可交了
   * （页面源码的 `_$submitAnswers` 也只清理 content 里的 emoji；真机提交取证 2026-10-17）。
   */
  answers?: PaperAnswer[] | null;
  /** 写操作字段：提交时为 1 */
  submitType?: number | null;
  objectiveQList?: PaperQuestion[] | null;
  subjectiveQList?: PaperQuestion[] | null;
  [key: string]: unknown;
}

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

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

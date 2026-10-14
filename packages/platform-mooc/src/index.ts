/**
 * `@study-pilot/platform-mooc`：学习平台 领域层。
 *
 * 职责边界：
 *   - 本包知道「MOOC 的接口长什么样、业务规则是什么」；
 *   - 本包**不知道**自己运行在浏览器还是 Node，凭证与 fetch 由调用方注入；
 *   - 本包不含任何 DOM 操作，页面结构契约单独放在 app 侧。
 *
 * 依赖方向：`platform-mooc` → `transport` → `core`。
 *
 * 平台事实与取证位置记录在 docs/platforms/mooc.md，
 * 改动任何协议细节之前请先核对那份文档。
 */

export {
  createMoocClient,
  MOOC_ORIGIN,
  type MoocClient,
  type MoocClientOptions,
} from './client.ts';

export {
  ENDPOINTS,
  DWR_ENDPOINTS,
  COURSE_TYPE,
  type CourseType,
  type Endpoint,
} from './endpoints.ts';

export * from './types.ts';

export { getCourses, getCoursesWithTrace, getAllCourses, type GetCoursesOptions } from './courses.ts';

export {
  getCourseStructure,
  deriveStatus,
  filterReviewable,
} from './structure.ts';

export {
  BEHAVIORS,
  isUnitComplete,
  isCompletable,
  completeUnit,
  type BehaviorOutcome,
  type CoursewareCapabilities,
  type CoursewareContext,
  type TextGenerator,
  type UnitBehavior,
} from './courseware/index.ts';

export {
  getEvaluationDetail,
  countDwrArray,
  type EvaluationProgress,
} from './review.ts';

export {
  getQuizInfo,
  getOpenQuizInfo,
  getQuizBank,
  getQuizPaper,
  buildAnswerIndex,
  buildAnswers,
  saveDraft,
  submitQuiz,
  type AnswerIndex,
  type OpenQuizInfo,
  type BuildAnswersResult,
} from './quiz.ts';

/*
 * 策略层：慕课自己的判断与流程（会话、读取、计划、执行）。
 *
 * 与接口层同一个包，因为它们是同一家厂商的事实。两半的分工只有一条：
 * 接口层是「怎么把请求发出去」，策略层是「请求什么、拿到之后怎么判断」。
 * 这里只做转发：导入方从包的门进来，不必知道内部怎么分层。
 */
export * from './policy/read/index.ts';
export * from './policy/plan/index.ts';
export * from './policy/execute/index.ts';
export * from './policy/execute/work.ts';
export * from './policy/execute/bank.ts';
export * from './policy/session.ts';
export * from './policy/recovery.ts';
export * from './policy/net-rules.ts';
export * from './policy/course-selection.ts';
export * from './policy/sync.ts';
export * from './policy/tasks.ts';

export {
  getHomeworkInfo,
  getHomeworkPaper,
  currentEvaluatePhase,
  HOMEWORK_PHASE,
  type HomeworkPhase,
  buildEvaluationItems,
  nextSubmission,
  submitEvaluation,
  type EvaluationItem,
  type NextSubmission,
  type SubmissionProgress,
} from './review.ts';

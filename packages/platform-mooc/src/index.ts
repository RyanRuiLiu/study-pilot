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

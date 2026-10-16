/**
 * `@study-pilot/platform-zhs`：智慧树共享课 领域层。
 *
 * 职责边界与 platform-mooc 同一条：本包知道「智慧树的接口长什么样、业务规则是什么」，
 * 不知道自己运行在浏览器还是 Node（fetch 与 cookie 由调用方注入），不含任何 DOM 操作。
 *
 * 依赖方向：`platform-zhs` → `transport`（只用节流）→ 无。签名在包内自实现
 * （见 sign.ts 的说明：平台的签名协议逆向自客户端源码并已实测验证）。
 *
 * 平台事实一律写在它约束的那段代码旁（每条结论注明实测或源码来源），
 * 改动协议细节之前先读那一段。
 */

export {
  ZHS_SIGNING_PUBLIC_KEY,
  rsaPublicEncrypt,
  recoverCKey,
  aesEncrypt,
  xorHexEncode,
  buildSeries,
  formatPosition,
  wrapSignedBody,
  type StampField,
} from './sign.ts';

export {
  ZHS_HOSTS,
  ZHS_MODULE,
  ZHS_ENDPOINTS,
  type ZhsHost,
  type ZhsEndpoint,
  type ZhsEndpointName,
} from './endpoints.ts';

export {
  createZhsClient,
  BROWSER_USER_AGENT,
  ZhsHttpError,
  ZhsApiError,
  type ZhsClient,
  type ZhsClientOptions,
} from './client.ts';

export { readSession, type ZhsSession, type CookieReader } from './session.ts';

export { getShareCourses, mergeCourses, refreshCourses, selectedCourses, type ZhsCourseBrief } from './courses.ts';

export { getCourseUnits, type ZhsUnit } from './structure.ts';

export { buildStudyReport, type StudyReport, type StudyReportInput } from './report.ts';

export {
  MIN_ATTEMPTS_FOR_PROBE,
  answerKeyFromPopupExam,
  coverageOf,
  matchPaper,
  mergeKeys,
  normalizeQuestionText,
  planAnswering,
  type AnswerKey,
  type AnswerKeyEntry,
  type AnswerPlan,
  type KeyMatch,
  type PaperOption,
  type PaperQuestion,
  type PlannedAnswer,
  type PopupExamQuestion,
} from './exam-answers.ts';

export { ZHS_REQUEST_RULES } from './policy/net-rules.ts';
export { createZhsRuntime, type ZhsRuntime, type ZhsRuntimeEnv } from './runtime.ts';
export { executeUnit, ZhsRoundHalt, type ExecuteUnitInput } from './policy/execute.ts';
export { createZhsTasks, unitItemId, type ZhsRunDeps } from './policy/tasks.ts';

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
 * 平台事实一律写在它约束的那段代码旁（每条结论都注明是实测还是来自平台源码），
 * 改动协议细节之前先读那一段。
 */

export {
  createMoocClient,
  MOOC_LOGIN_URL,
  MOOC_ORIGIN,
  BROWSER_USER_AGENT,
  type MoocClient,
  type MoocClientOptions,
} from './client.ts';

export {
  ENDPOINTS,
  DWR_ENDPOINTS,
  MOBILE_ENDPOINTS,
  COURSE_TYPE,
  type CourseType,
  type Endpoint,
} from './endpoints.ts';

export * from './types.ts';

export { getCourses, getAllCourses, type GetCoursesOptions } from './courses.ts';
export {
  MOOC_SESSION_EXPIRED,
  MOOC_MOBILE_CODE_SESSION_KILLED,
  MOOC_MOBILE_SESSION_EXPIRED,
  sessionExpired,
} from './auth.ts';

export {
  getCourseStructure,
  deriveStatus,
} from './structure.ts';

export {
  BEHAVIORS,
  isUnitComplete,
  isCompletable,
  completeUnit,
  DISCUSS_REPLY_MAX_CHARS,
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
  getQuizPaper,
  buildAnswers,
  hasAnswer,
  answerAndSubmitQuiz,
  buildFillIndex,
  mergeMobileAnswers,
  paperHasAllAnswers,
  saveDraft,
  submitQuiz,
  type BuildAnswersResult,
  type BuildAnswersOptions,
  type AnswerIndex,
  type FillAnswers,
} from './quiz.ts';

export {
  getMobileQuizPaper,
  fetchMobToken,
  exchangeUrsTokenForMobToken,
  loginMobileSession,
  MOBILE_APP_ID,
  type MobilePaperClient,
} from './mobile-paper.ts';
export {
  fetchQrLoginCode,
  pollQrLoginStatus,
  confirmQrLogin,
  QR_SCAN_STATUS,
  type QrCode,
  type QrScanStatus,
} from './qr-login.ts';
export { QR_LOGIN_ENDPOINTS } from './endpoints.ts';

/*
 * 网易 URS（账号级登录）：目前只落了信封与算法层（SM4 + RSA PKCS#1）。
 * 登录流程尚未实现——还缺两把 App 密钥（libnedat 从 key_private_urs.dat /
 * key_public_urs.dat 解出）与账密登录载荷字段的一次真机确认，见 urs/endpoints.ts 注释。
 */
export {
  URS_ACCESS_ID,
  URS_ENDPOINTS,
  URS_HOSTS,
  URS_PRODUCT,
} from './urs/endpoints.ts';
export { buildUrsHeaders, decryptUrsResponse, type UrsHeaders } from './urs/envelope.ts';
export { parseRsaPrivateKey, parseRsaPublicKey, rsaPkcs1Decrypt, rsaPkcs1Encrypt } from './urs/pkcs1.ts';
export { sm4CbcDecrypt, sm4CbcEncrypt } from './urs/sm4.ts';
export {
  loginUrsByPassword,
  buildUrsPasswordParams,
  URS_CLIENT_ID,
  URS_LOGIN_ORIGIN,
  URS_PASSWORD_LOGIN_PATH,
  type UrsPasswordCredentials,
  type UrsSession,
} from './urs/password-login.ts';
export { aes128EcbDecryptHex, aes128EcbEncryptHex, aesKeyFromHex } from './urs/aes.ts';

/*
 * 策略层：慕课自己的判断与流程（会话、读取、计划、执行）。
 *
 * 与接口层同一个包，因为它们是同一家厂商的事实。两半的分工只有一条：
 * 接口层是「怎么把请求发出去」，策略层是「请求什么、拿到之后怎么判断」。
 * 这里只做转发：导入方从包的门进来，不必知道内部怎么分层。
 */
export * from './ids.ts';
export * from './policy/read/index.ts';
export * from './policy/plan/index.ts';
export * from './policy/execute/index.ts';
export * from './policy/execute/work.ts';
export * from './policy/session.ts';
export * from './policy/recovery.ts';
export * from './policy/net-rules.ts';
export * from './policy/course-selection.ts';
export * from './policy/sync.ts';
export * from './policy/tasks.ts';
export * from './policy/assembly.ts';

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

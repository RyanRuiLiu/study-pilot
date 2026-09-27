/**
 * `@study-pilot/transport`：与平台无关的 HTTP 协议层。
 *
 * 职责边界：
 *   - 本包知道「怎么把请求发出去」：签名、csrfKey、节流、错误分类、重试；
 *   - 本包**不知道**任何业务语义：不认识课程、测验、作业、互评。
 *
 * 依赖方向：`transport` → `core`。运行环境要求只有 `fetch` 与 `AbortSignal`，
 * 不碰 DOM、不碰 cookie（凭证由调用方通过 `getToken` 注入）。
 */

export {
  SIGN_SALT,
  SIGN_SYSTEM,
  JSON_CONTENT_TYPE,
  serializeForSign,
  randomNonce,
  makeSignature,
  buildAuthHeaders,
  type AuthHeaders,
  type BuildAuthHeadersOptions,
} from './sign.ts';

export {
  createThrottle,
  DEFAULT_MIN_GAP_MS,
  type Throttle,
  type ThrottleOptions,
} from './throttle.ts';

export {
  createRpcClient,
  pendingCount,
  type RpcClient,
  type RpcClientOptions,
  type RpcEnvelope,
  type FetchLike,
  type TokenProvider,
} from './rpc.ts';

export {
  CONCURRENCY_LIMIT_CODE,
  networkError,
  httpError,
  parseError,
  apiError,
  type TransportError,
  type TransportErrorKind,
} from './errors.ts';

export {
  createDwrClient,
  DwrEncoder,
  DWR_CONTENT_TYPE,
  isDwrSuccess,
  extractDwrPayload,
  type DwrClient,
  type DwrClientOptions,
  type DwrResponse,
} from './dwr.ts';

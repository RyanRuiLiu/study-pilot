/**
 * AI 调用的失败形态。
 *
 * 与平台的接口不同，这里没有服务端的错误码可依赖：失败原因分成「配置不对」
 * 「网络不通」「对方返回非 2xx」「返回体读不懂」「超时」「内容为空」几类，
 * 调用方据此决定是提示用户去改设置，还是退回固定文案。
 *
 * 消息里**不得出现密钥**：错误会进日志与运行记录，密钥只应存在于设置里。
 */
export type AiErrorKind =
  | 'config'
  | 'network'
  | 'http'
  | 'parse'
  | 'timeout'
  | 'empty';

export interface AiError {
  kind: AiErrorKind;
  message: string;
  /** 仅 `http` 类有：HTTP 状态码。调用方据此决定要不要重试（5xx/429 值得） */
  status?: number;
}

export function aiError(kind: AiErrorKind, message: string, status?: number): AiError {
  return status === undefined ? { kind, message } : { kind, message, status };
}

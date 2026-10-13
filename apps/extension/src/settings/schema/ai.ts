/*
 * AI 设置。
 *
 * 不内置任何厂商：地址、模型、密钥都由用户填。默认全空且关闭——
 * 只有用户明确开启并授权后，扩展才会向那个地址发请求。
 *
 * 密钥只存在本机（`chrome.storage.local`），不参与同步、不进日志与导出。
 */

export interface AiSettings {
  enabled: boolean;
  /** 接口地址，允许带或不带 /v1（归一化见 packages/ai 的 chatEndpoint） */
  baseUrl: string;
  model: string;
  apiKey: string;
}

export const DEFAULT_AI: AiSettings = {
  enabled: false,
  baseUrl: '',
  model: '',
  apiKey: '',
};

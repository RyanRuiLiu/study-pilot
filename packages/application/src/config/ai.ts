/*
 * AI 设置。
 *
 * **接口地址钉死在智谱**（open.bigmodel.cn，见 AI_BASE_URL）：智谱有免费模型
 * （glm-4-flash），把地址固定之后——扩展只向这一个域名发 AI 请求，主机权限
 * 得以在清单里静态声明（安装即授权），不再有「按需申请权限」那一步；
 * 用户要准备的只剩一把密钥。模型仍可改：同一个平台下的其它模型（有免费的，
 * 也有计费的），默认给免费的那个。
 *
 * 密钥只存在本机（`chrome.storage.local`），不参与同步、不进日志与导出。
 */

export interface AiSettings {
  enabled: boolean;
  model: string;
  apiKey: string;
}

/**
 * 唯一的 AI 出口。OpenAI 兼容协议，`chatEndpoint` 会接上 /chat/completions。
 * 改这里等于换平台：wxt.config.ts 的主机权限、设置页的申请入口、README 要一起改。
 */
export const AI_BASE_URL = 'https://open.bigmodel.cn/api/paas/v4';

/** 默认模型：智谱的免费档。 */
export const AI_DEFAULT_MODEL = 'glm-4-flash';

export const DEFAULT_AI: AiSettings = {
  enabled: false,
  model: AI_DEFAULT_MODEL,
  apiKey: '',
};

/**
 * `@study-pilot/ai`：模型调用层。
 *
 * 职责边界：
 *   - 知道「怎么把一段对话发给模型、怎么把文本取回来」；
 *   - **不知道**业务：不认识课件、讨论、题目，也不持有提示词；
 *   - 不读设置、不读存储、不碰 DOM：地址与密钥由调用方注入；
 *   - 依赖 `core`，并从 `transport` 只取两件与模型无关的机械件（出站超时表与那句
 *     超时文案，见 chat.ts）。两层的业务面互不认识；平台那份请求配额也不适用于
 *     模型调用，两者互不影响。
 *
 * 提示词与输出校验属于用例层，放在 app 侧（`apps/extension/src/ai/`）。
 */

export { createChatClient, type ChatClient, type ChatClientOptions, type ChatMessage } from './chat.ts';
export { chatEndpoint, chatOrigin } from './endpoint.ts';
export { aiError, type AiError, type AiErrorKind } from './errors.ts';

/**
 * OpenAI 兼容的对话调用。
 *
 * 只认一种协议：`POST {baseUrl}/chat/completions`（地址末尾已带 `/v<N>` 时直接接上，
 * 否则补 `/v1`，见 endpoint.ts），`Authorization: Bearer <密钥>`，
 * 取 `choices[0].message.content`。
 *
 * 三个入参里只有**模型与密钥**来自用户在设置页填的那两格；`baseUrl` 不是用户填的——
 * 扩展侧唯一的来源是 application 的 `AI_BASE_URL`（地址钉死一家，见 config/ai.ts 的说明，
 * 主机权限也据此在 wxt.config.ts 里静态声明）。本模块不认识「厂商」这个概念，
 * 换地址就是换一个 `baseUrl` 字符串，这里没有预置表可漂移。
 *
 * 与 `transport` 的分工：那层说「平台接口怎么发」，这层说「模型接口怎么发」。
 * 这层从 transport 只取两样与「模型」无关的机械件：出站超时的表与那句文案。
 * 两层都不认识业务概念（课件、讨论、题目）。
 *
 * 失败一律经 `Result` 表达，且错误消息里**不含密钥**：它会进日志与运行记录。
 */

import { err, ok, type FetchLike, type Result } from '@study-pilot/core';
import { startOutboundTimeout, timeoutMessage } from '@study-pilot/transport';
import { chatEndpoint } from './endpoint.ts';
import { aiError, type AiError } from './errors.ts';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * 内部常量：超时、最大 token、温度。
 *
 * 不做成设置项——设置页已经要填地址、模型、密钥三样，再堆旋钮只会让人不敢动。
 * 需要调的时候改这一处，全部调用方一起变。
 */
const TIMEOUT_MS = 30_000;
const MAX_TOKENS = 600;
const TEMPERATURE = 0.6;

export interface ChatClientOptions {
  /** 接口地址。允许带或不带版本段；扩展侧唯一来源是 application 的 `AI_BASE_URL` */
  baseUrl: string;
  model: string;
  apiKey: string;
  fetch: FetchLike;
  /** 仅测试需要改 */
  timeoutMs?: number;
  maxTokens?: number;
  temperature?: number;
}

export interface ChatClient {
  /** 发一轮对话，返回助手文本。失败经 `Result` 返回，不抛异常。 */
  complete(messages: ChatMessage[]): Promise<Result<string, AiError>>;
}

function describe(cause: unknown): string {
  return cause instanceof Error ? cause.message : String(cause);
}

export function createChatClient(options: ChatClientOptions): ChatClient {
  const timeoutMs = options.timeoutMs ?? TIMEOUT_MS;
  const maxTokens = options.maxTokens ?? MAX_TOKENS;
  const temperature = options.temperature ?? TEMPERATURE;

  return {
    async complete(messages) {
      const endpoint = chatEndpoint(options.baseUrl);
      if (!endpoint.ok) return endpoint;
      if (!options.apiKey.trim()) return err(aiError('config', '未填写密钥'));
      if (!options.model.trim()) return err(aiError('config', '未填写模型名'));

      const timeout = startOutboundTimeout(timeoutMs);
      /*
       * 超时与断网要分开判：`timedOut()` 是我们自己掐的，说明「等太久」；
       * 其余抛异常才是连不上。这一句只写一处，因为「发出请求」与「读完返回体」
       * 两段都可能被掐（表的机械部分在 transport/timeout.ts，与两条平台链共用）。
       */
      const failure = (cause: unknown): AiError =>
        timeout.timedOut() ? aiError('timeout', timeoutMessage(timeoutMs)) : aiError('network', describe(cause));

      // 上界罩住「请求 + 读体」全过程：清表早于读完，连接建立后 body 卡住就没有回话了
      try {
        let response: Response;
        try {
          response = await options.fetch(endpoint.value, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${options.apiKey.trim()}`,
            },
            body: JSON.stringify({
              model: options.model.trim(),
              messages,
              max_tokens: maxTokens,
              temperature,
              stream: false,
            }),
            signal: timeout.signal,
          });
        } catch (cause) {
          return err(failure(cause));
        }
        if (!response.ok) {
          /*
           * 带上响应体的一小段：401 与 429 的处理完全不同，只报状态码不够用。
           * 截断到 200 字符，任何情况下都不包含密钥（密钥只在请求头里）。
           */
          let snippet: string;
          try {
            snippet = (await response.text()).replace(/\s+/g, ' ').slice(0, 200);
          } catch {
            snippet = '';
          }
          return err(
            aiError(
              'http',
              `接口返回 ${response.status}${snippet ? `：${snippet}` : ''}`,
              response.status,
            ),
          );
        }

        let text: string;
        try {
          text = await response.text();
        } catch (cause) {
          return err(failure(cause));
        }

        let parsed: unknown;
        try {
          parsed = JSON.parse(text);
        } catch {
          return err(aiError('parse', '返回体不是合法 JSON'));
        }

        const content = (parsed as { choices?: Array<{ message?: { content?: unknown } }> })
          ?.choices?.[0]?.message?.content;
        if (typeof content !== 'string' || !content.trim()) {
          return err(aiError('empty', '返回内容为空'));
        }
        return ok(content.trim());
      } finally {
        timeout.dispose();
      }
    },
  };
}

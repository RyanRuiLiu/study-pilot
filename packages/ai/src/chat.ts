/**
 * OpenAI 兼容的对话调用。
 *
 * 只认一种协议：`POST {baseUrl}/v1/chat/completions`，`Authorization: Bearer <密钥>`，
 * 取 `choices[0].message.content`。**不内置任何厂商预置**——地址、模型、密钥都由
 * 用户在设置里填，因此厂商改名或换地址都不需要改代码，也不存在预置表漂移的问题。
 *
 * 与 `transport` 的分工：那层说「平台接口怎么发」，这层说「模型接口怎么发」。
 * 两者都只依赖 `core`，都不认识业务概念（课件、讨论、题目）。
 *
 * 失败一律经 `Result` 表达，且错误消息里**不含密钥**：它会进日志与通知。
 */

import { err, ok, type FetchLike, type Result } from '@study-pilot/core';
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
  /** 用户填写的接口地址，允许带或不带 `/v1` */
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

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);

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
          signal: controller.signal,
        });
      } catch (cause) {
        return err(
          controller.signal.aborted
            ? aiError('timeout', `请求超过 ${Math.round(timeoutMs / 1000)} 秒未返回`)
            : aiError('network', describe(cause)),
        );
      } finally {
        clearTimeout(timer);
      }

      if (!response.ok) {
        /*
         * 带上响应体的一小段：401 与 429 的处理完全不同，只报状态码不够用。
         * 截断到 200 字符，任何情况下都不包含密钥（密钥只在请求头里）。
         */
        let snippet = '';
        try {
          snippet = (await response.text()).replace(/\s+/g, ' ').slice(0, 200);
        } catch {
          snippet = '';
        }
        return err(aiError('http', `接口返回 ${response.status}${snippet ? `：${snippet}` : ''}`));
      }

      let text: string;
      try {
        text = await response.text();
      } catch (cause) {
        return err(aiError('network', describe(cause)));
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
    },
  };
}

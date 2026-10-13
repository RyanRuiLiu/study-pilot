/*
 * AI 用例层。
 *
 * 分工：
 *   packages/ai      怎么把一次对话发出去（协议、超时、失败分类）
 *   ai/tasks/*.ts    每个用例的提示词与输出解析
 *   本文件           把设置、权限、重试与任务表接起来，产出 platform-mooc 认识的
 *                    `TextGenerator` 端口
 *
 * 「只有一处来源」的几件事都在这里：
 *   - 是否具备文本能力（`hasTextGenerator`）——计划层用它决定讨论单元进不进计划；
 *   - 重试策略（`RETRYABLE`）——重试哪些、几次、退避多久；
 *   - 任务表（`AI_TASKS`）——新增 AI 用途只需加一个任务模块并登记一行。
 *
 * 密钥只在这里被读出来交给客户端，绝不进日志、不进错误消息。
 */

import { createChatClient, type AiError } from '@study-pilot/ai';
import type { TextGenerator } from '@study-pilot/platform-mooc';
import type { Settings } from '../settings';
import { discussReplyTask, type AiTask } from './tasks/discuss-reply.ts';

/**
 * 任务表：任务 id → 提示词与解析。新增用途只改这里。
 *
 * @public 门禁（scripts/probe/checks/check-release.mjs 的 SINGLE_SOURCE 表）按
 * 名字引用它，静态分析看不到这种引用；knip 的 @public 标签是这种「对外契约」
 * 的标准标记，去掉标签会被当成未使用导出报出来。
 */
export const AI_TASKS: Record<string, AiTask> = {
  'discuss-reply': discussReplyTask,
};

/** 总尝试次数（首次 + 重试 2 次）。 */
const MAX_ATTEMPTS = 3;

/**
 * 哪些失败值得重试。
 *
 * 网络与超时重试自不必说；5xx/429 是对方临时故障；`parse`/`empty` 是模型这次
 * 没按格式来——再要一次很可能就好了。**配置类错误不重试**：地址填错、密钥不对，
 * 重试多少次都是同样的结果，只会让用户多等。
 */
function retryable(error: AiError): boolean {
  if (error.kind === 'config') return false;
  if (error.kind === 'http') {
    const status = error.status ?? 0;
    return status >= 500 || status === 429;
  }
  return true;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** 设置里是否已经填齐 AI 的必要信息。计划层与生成器共用这一处判断。 */
export function hasTextGenerator(settings: Settings): boolean {
  const { enabled, baseUrl, model, apiKey } = settings.ai;
  return enabled && baseUrl.trim() !== '' && model.trim() !== '' && apiKey.trim() !== '';
}

/**
 * 由设置造出文本生成器。填不齐或缺开关时返回 undefined——
 * 讨论单元于是不进计划，用户看到的是「需要自己处理」。
 */
export function createTextGenerator(settings: Settings): TextGenerator | undefined {
  if (!hasTextGenerator(settings)) return undefined;

  const chat = createChatClient({
    baseUrl: settings.ai.baseUrl,
    model: settings.ai.model,
    apiKey: settings.ai.apiKey,
    fetch: (input, init) => fetch(input, init),
  });

  return async ({ task, input }) => {
    const spec = AI_TASKS[task];
    if (!spec) return { ok: false, reason: `未登记的 AI 任务：${task}` };

    let lastReason = '未知错误';
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
      const result = await chat.complete(spec.messages(input));
      if (result.ok) {
        const text = spec.parse(result.value);
        if (text) return { ok: true, text };
        lastReason = '返回内容读不出可用的留言';
      } else {
        lastReason = `${result.error.kind}：${result.error.message}`;
        if (!retryable(result.error)) return { ok: false, reason: lastReason };
      }
      if (attempt < MAX_ATTEMPTS) await sleep(600 * attempt);
    }
    return { ok: false, reason: `${lastReason}（已重试 ${MAX_ATTEMPTS} 次）` };
  };
}

/**
 * 用当前设置发一次最小请求，确认地址、模型与密钥可用。
 *
 * 这是**诊断**，不是功能的另一条路径：它不产出任何要发到平台的内容，
 * 也不写任何状态。诊断结果如实回报，方便用户自己判断配置对不对。
 */
export async function testAiConnection(
  settings: Settings,
): Promise<{ ok: true; text: string } | { ok: false; reason: string }> {
  if (!hasTextGenerator(settings)) {
    return { ok: false, reason: '地址、模型、密钥未填齐，或 AI 未开启' };
  }

  const chat = createChatClient({
    baseUrl: settings.ai.baseUrl,
    model: settings.ai.model,
    apiKey: settings.ai.apiKey,
    fetch: (input, init) => fetch(input, init),
  });

  const result = await chat.complete([{ role: 'user', content: '只回复两个字：可用' }]);
  return result.ok
    ? { ok: true, text: result.value }
    : { ok: false, reason: `${result.error.kind}：${result.error.message}` };
}


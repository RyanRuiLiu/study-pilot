/*
 * AI 任务的提示词契约。
 *
 * 钉住两条：
 *   1. 讨论回复的字数上限**交给模型**（写在系统提示词里），且与发布前的校验
 *      共用 platform-mooc 的 DISCUSS_REPLY_MAX_CHARS 这一个常量——该值的来历
 *      见 discuss.ts 注释：平台没有下发讨论回复的字数限制，这是我们的产品参数。
 *   2. 任务输入原样进入用户消息：讨论题的组织在调用方（courseware/discuss.ts），
 *      提示词层先前多拼过一次前缀，实际发出去成了双前缀——这里不放它回来。
 */

import { describe, expect, it } from 'vitest';
import { DISCUSS_REPLY_MAX_CHARS } from '@study-pilot/platform-mooc';
import { discussReplyTask } from '../src/ai/tasks/discuss-reply.ts';

describe('讨论回复提示词', () => {
  it('把字数上限交给模型，且与发布前校验同一个数', () => {
    const messages = discussReplyTask.messages('讨论题：如何区分示例概念甲与示例概念乙？');
    const system = messages.find((message) => message.role === 'system')?.content ?? '';
    expect(system).toContain(String(DISCUSS_REPLY_MAX_CHARS));
  });

  it('任务输入原样进入用户消息，不再包一层', () => {
    const input = '讨论题：如何区分示例概念甲与示例概念乙？';
    const messages = discussReplyTask.messages(input);
    expect(messages.find((message) => message.role === 'user')?.content).toBe(input);
  });
});

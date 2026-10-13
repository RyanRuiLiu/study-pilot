import type { ChatMessage } from '@study-pilot/ai';

/**
 * 用 AI 写一条讨论留言。
 *
 * 输出格式**只有一个**：模型必须返回 `{"reply":"…"}`。
 * 不认其它形态——模型偶尔会包一层代码块或给纯文本，那是它没守格式；
 * 重试由调用方负责（`ai/index.ts` 的 MAX_ATTEMPTS），仍不守格式就判失败，
 * 人工处理。**没有「拿整段文本当留言用」这条旁路**：一旦存在，
 * 模型返回的东西就会在无人察觉的情况下变样。
 *
 * 允许的容错只有解析卫生：去掉首尾空白与代码块围栏——它们不改变内容。
 */
export interface AiTask {
  /** 由任务输入构造对话 */
  messages(input: string): ChatMessage[];
  /** 从模型输出里取出留言；不符合唯一格式时返回 null */
  parse(content: string): string | null;
}

const SYSTEM = [
  '你在课程讨论区参与讨论。',
  '根据给定的讨论题，用第一人称写一句 20~80 字的留言：只谈你自己的理解或疑问，',
  '不评价他人、不写链接、不加标题、不使用表情。',
  '只输出 JSON，形如 {"reply":"……"}，不要输出其它内容。',
].join('');

function parseReply(content: string): string | null {
  const cleaned = content
    .trim()
    .replace(/^```(?:json)?\n?/i, '')
    .replace(/\n?```$/, '')
    .trim();

  try {
    const parsed = JSON.parse(cleaned) as { reply?: unknown };
    if (typeof parsed.reply !== 'string' || !parsed.reply.trim()) return null;
    return parsed.reply.trim();
  } catch {
    return null;
  }
}

export const discussReplyTask: AiTask = {
  messages: (input) => [
    { role: 'system', content: SYSTEM },
    { role: 'user', content: `讨论题：${input}` },
  ],
  parse: parseReply,
};

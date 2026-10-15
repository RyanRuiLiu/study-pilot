import type { ChatMessage } from '@study-pilot/ai';
import { DISCUSS_REPLY_MAX_CHARS } from '@study-pilot/platform-mooc';

/**
 * 用 AI 写一条讨论留言。
 *
 * 提示词只有两句：场景 + 一条要求。实测（2026-10-15，glm-4-flash，
 * 四组真实请求对比）：「简短」与「直接写内容本身」两处不能省——
 * 去掉后模型会带上「留言内容：」「留言如下：」这类前缀、并写成两三倍长；
 * 加上后两次输出都是干净正文。
 *
 * 字数上限**明确写给模型**（不只在发布前拒收）：平台没有下发讨论回复的
 * 字数限制（查证见 courseware/discuss.ts 的 DISCUSS_REPLY_MAX_CHARS 注释），
 * 该值是我们的产品参数，与发布前的校验（sanitize）共用同一个常量。
 * 其余真正会出事的东西（链接、代码块）仍由发布前校验兜底，提示词不重复站岗。
 *
 * 解析只做包装的卫生处理（代码块围栏、外层引号），不改变内容本身。
 * 输出为空判失败，重试由调用方负责（ai/index.ts 的 MAX_ATTEMPTS）。
 */
export interface AiTask {
  /** 由任务输入构造对话。输入是完整的一段话，这里不加工 */
  messages(input: string): ChatMessage[];
  /** 从模型输出里取出留言；取不出内容时返回 null */
  parse(content: string): string | null;
}

const SYSTEM = [
  '你在课程讨论区参与讨论。',
  `根据讨论题写一条简短的留言（不超过 ${DISCUSS_REPLY_MAX_CHARS} 字），用自己的话说想法，直接写内容本身。`,
].join('');

/** 去掉模型常见的包装：整段代码块、包裹全文的引号。 */
function unwrap(content: string): string {
  const unfenced = content
    .trim()
    .replace(/^```[a-z]*\n?/i, '')
    .replace(/\n?```$/, '')
    .trim();
  return unfenced.replace(/^[“"']([\s\S]*)[”"']$/, '$1').trim();
}

export const discussReplyTask: AiTask = {
  // 输入由调用方组织好（讨论题、课时…），这里原样透传——
  // 先前这里再拼一次「讨论题：」，而调用方已经拼过，实际发出去是双前缀
  messages: (input) => [
    { role: 'system', content: SYSTEM },
    { role: 'user', content: input },
  ],
  parse: (content) => {
    const text = unwrap(content);
    return text === '' ? null : text;
  },
};

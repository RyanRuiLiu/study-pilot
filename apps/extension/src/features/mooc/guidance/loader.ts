/*
 * 生产用的取卷实现：让后台去取。
 *
 * 与注入逻辑分开，是为了让 index.ts 可以在 Node 测试里直接跑——
 * 这个文件一导入就带上消息与存储模块，那是浏览器环境的东西。
 *
 * 内容脚本不建客户端：两个上下文各有一个节流器时互不知情，
 * 并发发请求会撞上平台的并发限制。取数集中在后台，节流也只有一处。
 */

import { sendToBackground } from '../../../messages.ts';
import type { AnswerLoader } from './answers.ts';
import type { QuestionLoader } from './index.ts';

/** 取不到时返回 null，由调用方决定不注入。 */
export const loadQuestions: QuestionLoader = async (tid) => {
  const outcome = await sendToBackground({ type: 'MOOC_HOMEWORK_PAPER', tid });
  return outcome.status === 'ok' ? outcome.value : null;
};

/** 「查看答案」的取数：后台读一份既有答卷（只读；从未作答时如实失败）。 */
export const loadAnswers: AnswerLoader = async (tid) => {
  const outcome = await sendToBackground({ type: 'MOOC_PAPER_ANSWERS', tid });
  return outcome.status === 'ok' ? outcome.value : null;
};

/*
 * 生产用的取卷实现：让后台去取。
 *
 * 与注入逻辑分开，是为了让 index.ts 可以在 Node 测试里直接跑——
 * 这个文件一导入就带上消息与存储模块，那是浏览器环境的东西。
 *
 * 内容脚本不建客户端：两个上下文各有一个节流器时互不知情，
 * 并发发请求会撞上平台的并发限制。取数集中在后台，节流也只有一处。
 *
 * 同一份卷在一个页面里只取一次
 * -------------------------------
 * 页面每变动一次注入模块就重新评估一遍。若每次都向后台取，一次渲染会打出
 * 十几轮请求（每轮两三个接口），既慢，又会和页面自己的取数一起撞上平台的
 * 并发限制——实测回包 `code -2「并发限制，请稍后再试」`，块便晚到、缺块、
 * 在重渲染后闪烁。这里把成功的取数按「用途 + 卷」记下来，在途的请求也共用：
 * 之后每一轮评估立即拿到同一份数据。失败不缓存，下一次评估会重新取。
 */

import { sendToBackground } from '../../../messages.ts';
import type { AnswersView } from '@study-pilot/platform-mooc';
import type { AnswerLoader } from './answers.ts';
import type { QuestionLoader } from './index.ts';

/** 同一份数据只取一次：在途的 Promise 与成功的结果都按 key 共用。 */
function oncePerPaper<T>(
  keyOf: (tid: number) => string,
  load: (tid: number) => Promise<T | null>,
): (tid: number) => Promise<T | null> {
  const cache = new Map<string, Promise<T | null>>();

  return (tid) => {
    const key = keyOf(tid);
    const hit = cache.get(key);
    if (hit !== undefined) return hit;

    const pending = load(tid).then(
      (value) => {
        if (value === null) cache.delete(key);
        return value;
      },
      (error: unknown) => {
        cache.delete(key);
        throw error;
      },
    );
    cache.set(key, pending);
    return pending;
  };
}

/** 取不到时返回 null，由调用方决定不注入。 */
export const loadQuestions: QuestionLoader = oncePerPaper(
  (tid) => `homework:${tid}`,
  async (tid) => {
    const outcome = await sendToBackground({ type: 'MOOC_HOMEWORK_PAPER', tid });
    return outcome.status === 'ok' ? outcome.value : null;
  },
);

/** 「查看答案」的取数：后台去读页面正在看的那份卷与该卷的答案（只读）。 */
function makeAnswerLoader(view: AnswersView): AnswerLoader {
  return oncePerPaper(
    (tid) => `answers:${view}:${tid}`,
    async (tid) => {
      const outcome = await sendToBackground({ type: 'MOOC_PAPER_ANSWERS', tid, view });
      return outcome.status === 'ok' ? outcome.value : null;
    },
  );
}

/** 作答页（页面显示当前这次作答的卷）。 */
export const loadAnswersCurrent = makeAnswerLoader('answering');

/** 查看页（页面显示已提交的那份卷）。 */
export const loadAnswersSubmitted = makeAnswerLoader('review');

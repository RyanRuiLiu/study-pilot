/*
 * MOOC 学习页内容脚本：测验页挂做题助手，主观题页注入得分指导。
 *
 * 只做装配：解析路由、按条件调用注入模块，并监听页面变化。
 * 注入逻辑在 src/features/mooc/（guidance/ 得分指导、quiz/ 做题助手），
 * 取数经消息转给后台；内容脚本不建客户端——两个上下文各有一个节流器时
 * 互不知情，并发发请求会撞上平台的并发限制。
 *
 * 路由模型（实测）：课程学习页是 hash 路由的单页应用，
 *   /learn/{course}?tid={termId}#/learn/{view}?id={id}
 * 因此只在首次加载时判断一次是不够的，必须监听 hashchange。
 *
 * 页面内容是异步渲染的，而且做题页在点击开始测验之前根本没有题目：
 *   进入测验页 -> 停留在开考前页面 -> 用户点击开始 -> 题目才渲染
 * 所以不能只在挂载时判断一次，也不能只等固定时长。这里用一个常驻的
 * MutationObserver，任何 DOM 变化都重新评估一次；各模块本身幂等，重复调用无副作用。
 *
 * 观察范围必须包含属性变化：页面在阶段之间切换靠的是增删 `f-dn` 类名，
 * 子节点并没有变化，只观察 childList 会漏掉这次切换，面板会一直停在「尚未开始测验」。
 *
 * 路由分派见 apply()：
 *   测验页（#/learn/quiz 与 #/learn/examObject）——做题助手（单元测验与客观题
 *     考试共用，0.3.1 起如此：取卷接口与页面结构都一致）；面板只在用户点击时动作。
 *   主观题页（#/learn/hw 与 #/learn/examSubjective）——得分指导（评分依据）。
 */

import { parseWorkLocation } from '@study-pilot/platform-mooc';
import { injectGuidance, removeGuidance } from '../src/features/mooc/guidance/index.ts';
import { loadQuestions } from '../src/features/mooc/guidance/loader.ts';
import { removeQuizHelper, showQuizHelper } from '../src/features/mooc/quiz/index.ts';

/** DOM 变化后延迟评估的时间，用于合并连续变动。 */
const DEBOUNCE_MS = 400;

export default defineContentScript({
  matches: ['*://*.icourse163.org/learn/*', '*://*.icourse163.org/spoc/learn/*'],
  runAt: 'document_idle',

  main() {
    function apply(): void {
      const location = parseWorkLocation(window.location.href);

      /*
       * 做题助手：单元测验与客观题考试共用（取卷都走 getOpenQuizPaperDto、
       * 页面结构一致，不需要两套实现）。填充是页面点击（看得见），提交走接口
       * （与一键执行同一份实现）——两者都由用户点击触发，扩展不做自动执行。
       */
      const isObjective = location.view === 'quiz' || location.view === 'exam-objective';
      if (isObjective && location.contentId !== null) {
        showQuizHelper({ termId: location.termId, quizId: location.contentId });
      } else {
        removeQuizHelper();
      }

      /*
       * 主观题页（作业与主观题考试共用）：得分指导（评分点）。
       *
       * 页面自己已经列出评分依据的题目不重复注入：给别人打分的互评页面上每题
       * 都有「得分指导」。这个判断由注入模块逐题做，依据是页面内容而不是类名。
       */
      if (
        (location.view === 'homework' || location.view === 'exam-subjective') &&
        location.contentId !== null
      ) {
        void injectGuidance(loadQuestions, location.contentId).catch(() => undefined);
        return;
      }
      removeGuidance();
    }

    let timer: number | null = null;

    function schedule(): void {
      if (timer !== null) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        timer = null;
        apply();
      }, DEBOUNCE_MS);
    }

    const observer = new MutationObserver(schedule);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    });

    window.addEventListener('hashchange', schedule);

    apply();
  },
});

/*
 * MOOC 页面内容脚本。
 *
 * 只做装配：解析路由、读取配置、按条件调用功能模块，并监听配置与页面变化。
 * 功能逻辑位于 src/features/。
 *
 * 路由模型（实测）：课程学习页是 hash 路由的单页应用，
 *   /learn/{course}?tid={termId}#/learn/{view}?id={id}
 * 因此只在首次加载时判断一次是不够的，必须监听 hashchange。
 *
 * 页面内容是异步渲染的，而且做题页在点击开始测验之前根本没有题目：
 *   进入测验页 -> 停留在开考前页面 -> 用户点击开始 -> 题目才渲染
 * 所以不能只在挂载时判断一次，也不能只等待固定的时长。
 * 这里用一个常驻的 MutationObserver，任何 DOM 变化都重新评估一次，
 * 各功能模块本身是幂等的，重复调用没有副作用。
 *
 * 观察范围必须包含属性变化。页面在两个阶段之间切换靠的是增删 `f-dn` 类名
 * （源码中的 `_$addClassName` / `_$delClassName`），子节点并没有变化，
 * 只观察 childList 会漏掉这次切换，面板就会一直停在「尚未开始测验」。
 */

import { getSettings, watchSettings, type Settings } from '../src/settings';
import { parseWorkLocation } from '@study-pilot/platform-mooc';
import {
  injectGuidance,
  loadQuestions,
  removeGuidance,
  removeQuizHelper,
  showQuizHelper,
} from '../src/features';

/** DOM 变化后延迟评估的时间，用于合并连续变动。 */
const DEBOUNCE_MS = 400;

export default defineContentScript({
  matches: ['*://*.icourse163.org/learn/*', '*://*.icourse163.org/spoc/learn/*'],
  runAt: 'document_idle',

  async main() {
    /*
     * 这里不建客户端。
     *
     * 内容脚本要的平台数据一律经消息向后台取：两个上下文各建一个客户端时，
     * 各自都有一个节流器而互不知情，并发发请求会撞上平台的并发限制。
     * 现在全项目只有一个节流器，在后台那一个客户端里。
     */

    let settings: Settings = await getSettings();

    /**
     * 按当前路由与配置应用前台功能。
     * 幂等：重复调用不会产生额外效果，因此可以被观察器反复触发。
     */
    function apply(): void {
      const location = parseWorkLocation(window.location.href);
      const enabled = settings.enabled;
      const foreground = settings.mooc.foreground;

      /*
       * 客观题作答页：单元测验与客观题考试共用做题助手。
       *
       * 两者在服务端是同一种东西——取卷都走 getOpenQuizPaperDto，
       * 页面结构也一致，因此不需要两套实现。区别只在题库：
       * 单元测验的题目来自整门课的固定题库，而考试是随机抽题
       * （实测 isRandom 为 true），题库未必覆盖得到。
       * 覆盖不到时助手会自己说明，不会提交空白。
       */
      const isObjective =
        location.view === 'quiz' || location.view === 'exam-objective';

      if (
        enabled &&
        foreground.quizHelper.enabled &&
        isObjective &&
        location.contentId !== null
      ) {
        showQuizHelper({
          termId: location.termId,
          quizId: location.contentId,
        });
      } else {
        removeQuizHelper();
      }

      /*
       * 主观题作答页：单元作业与主观题考试共用得分指导。
       *
       * 两者的题目结构相同（.u-questionItem / .qaDescription / .j-answer），
       * 取卷接口不同但返回的 judgeDtos 同构，因此注入逻辑共用。
       *
       * 页面自己已经列出评分依据的题目不重复注入：给别人打分的互评页面上每题
       * 都有「得分指导」。这个判断由功能模块逐题做，依据是页面内容而不是类名。
       */
      const isSubjective =
        location.view === 'homework' || location.view === 'exam-subjective';

      if (
        enabled &&
        foreground.guidance.enabled &&
        isSubjective &&
        location.contentId !== null
      ) {
        const kind = location.view === 'exam-subjective' ? 'exam' : 'homework';
        void injectGuidance(loadQuestions, location.contentId, kind).catch(() => undefined);
      } else {
        removeGuidance();
      }
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

    watchSettings((next) => {
      settings = next;
      schedule();
    });

    apply();
  },
});

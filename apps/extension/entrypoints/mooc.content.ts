/*
 * MOOC 学习页内容脚本：作业页注入得分指导，答卷查看页（测验成绩/考试）注入「查看答案」。
 *
 * 只做装配：解析路由、按条件调用注入模块，并监听页面变化。
 * 注入逻辑在 src/features/mooc/guidance/，取数经消息转给后台。
 *
 * 路由模型（实测）：课程学习页是 hash 路由的单页应用，
 *   /learn/{course}?tid={termId}#/learn/{view}?id={id}
 * 因此只在首次加载时判断一次是不够的，必须监听 hashchange。
 *
 * 页面内容是异步渲染的，所以不能只在挂载时判断一次，也不能只等固定时长。
 * 这里用一个常驻的 MutationObserver，任何 DOM 变化都重新评估一次，
 * 注入模块本身是幂等的，重复调用没有副作用。
 *
 * 观察范围必须包含属性变化：页面在阶段之间切换靠的是增删 `f-dn` 类名，
 * 子节点并没有变化，只观察 childList 会漏掉这次切换。
 *
 * 路由分派见 apply()：作业页（#/learn/hw）得分指导；答卷查看类页面
 * （#/learn/quizscore、#/learn/examObject(Score) 与主观考试页）「查看答案」——
 * 数据都取自**既有答卷**（只读）。「开始考试」的副作用点（考试同意页）不碰：
 * 未开始的考试根本进不了这些路由。
 */

import { parseWorkLocation } from '@study-pilot/platform-mooc';
import { injectAnswers, removeAnswers } from '../src/features/mooc/guidance/answers.ts';
import { injectGuidance, removeGuidance } from '../src/features/mooc/guidance/index.ts';
import { loadAnswers, loadQuestions } from '../src/features/mooc/guidance/loader.ts';

/** DOM 变化后延迟评估的时间，用于合并连续变动。 */
const DEBOUNCE_MS = 400;

export default defineContentScript({
  matches: ['*://*.icourse163.org/learn/*', '*://*.icourse163.org/spoc/learn/*'],
  runAt: 'document_idle',

  main() {
    /*
     * 这里不建客户端：要的平台数据一律经消息向后台取。
     * 内容脚本与后台各建一个客户端时，各自都有一个节流器而互不知情，
     * 并发发请求会撞上平台的并发限制。
     */

    function apply(): void {
      const location = parseWorkLocation(window.location.href);

      if (location.view === 'homework' && location.contentId !== null) {
        // 作业页：得分指导（评分点）。答案块清掉，两类页面各归各的。
        removeAnswers();
        void injectGuidance(loadQuestions, location.contentId).catch(() => undefined);
        return;
      }
      removeGuidance();

      /*
       * 答卷查看类页面（测验成绩 / 考试的客观查看）：注入「查看答案」。
       * 数据是既有答卷（只读）。主观题考试页（exam-subjective）走的是作业管线
       * 同款的评分点数据——已开始/已提交之后取那是纯读；未开始的考试页不存在
       * 这个路由（进入前先在同意页点了「开始考试」），因此不会误开考试。
       */
      if (location.view === 'exam-subjective' && location.contentId !== null) {
        void injectGuidance(loadQuestions, location.contentId).catch(() => undefined);
        void injectAnswers(loadAnswers, location.contentId).catch(() => undefined);
        return;
      }
      if (
        (location.view === 'quiz-score' || location.view === 'quiz' ||
          location.view === 'exam-objective' || location.view === 'exam-score') &&
        location.contentId !== null
      ) {
        void injectAnswers(loadAnswers, location.contentId).catch(() => undefined);
        return;
      }
      removeAnswers();
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

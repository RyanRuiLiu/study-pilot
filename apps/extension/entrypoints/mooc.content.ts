/*
 * MOOC 作业页内容脚本：注入得分指导。
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
 * 只处理作业页（#/learn/hw）。主观题考试页暂不注入：它的取卷会在服务端
 * 创建答卷（等价于点「开始考试」），那是有副作用的动作，风险想清楚再说。
 */

import { parseWorkLocation } from '@study-pilot/platform-mooc';
import { injectGuidance, removeGuidance } from '../src/features/mooc/guidance/index.ts';
import { loadQuestions } from '../src/features/mooc/guidance/loader.ts';

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
        void injectGuidance(loadQuestions, location.contentId).catch(() => undefined);
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

    apply();
  },
});

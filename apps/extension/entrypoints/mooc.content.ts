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

import { md5hex } from '@study-pilot/core';
import { createMoocClient } from '@study-pilot/platform-mooc';
import { getSettings, watchSettings, type Settings } from '../src/settings';
import { readTokenFromDocument } from '../src/platform/mooc-session';
import { parseMoocLocation } from '../src/platform/mooc-url';
import {
  injectHomeworkAnswers,
  removeHomeworkAnswers,
  removeQuizHelper,
  showQuizHelper,
} from '../src/features';

/** DOM 变化后延迟评估的时间，用于合并连续变动。 */
const DEBOUNCE_MS = 400;

export default defineContentScript({
  matches: ['*://*.icourse163.org/learn/*', '*://*.icourse163.org/spoc/learn/*'],
  runAt: 'document_idle',

  async main() {
    const client = createMoocClient({
      fetch: (input, init) => window.fetch(input, init),
      // 内容脚本读的是 document.cookie，而不是 browser.cookies，
      // 后者在此环境不可用。原因见 mooc-session.ts 的说明。
      getToken: readTokenFromDocument,
      md5: md5hex,
    });

    let settings: Settings = await getSettings();

    /**
     * 按当前路由与配置应用前台功能。
     * 幂等：重复调用不会产生额外效果，因此可以被观察器反复触发。
     */
    function apply(): void {
      const location = parseMoocLocation(window.location.href);
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
          client,
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
       * 互评评分页不挂注入。评分页与列表页的 URL 完全相同
       * （都是 #/learn/hw?id=...），页面靠切换 DOM 进入评分态，
       * 因此只能看 DOM：
       *   列表态  有 .listtable，无 .u-evaluateItem
       *   评分态  无 .listtable，有 .u-evaluateItem 与 .u-questionItem
       * 评分时用户要专注给同学打分，注入的内容会干扰阅读。
       */
      const reviewing = document.querySelector('.u-evaluateItem') !== null;

      const isSubjective =
        location.view === 'homework' || location.view === 'exam-subjective';

      if (
        enabled &&
        foreground.homeworkAnswers.enabled &&
        isSubjective &&
        location.contentId !== null &&
        !reviewing
      ) {
        const kind = location.view === 'exam-subjective' ? 'exam' : 'homework';
        void injectHomeworkAnswers(client, location.contentId, kind).catch(() => undefined);
      } else {
        removeHomeworkAnswers();
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

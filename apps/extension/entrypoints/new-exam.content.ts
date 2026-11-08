/*
 * 新版考试答卷页（/mooc/main/newExam）的内容脚本。
 *
 * 与学习页（mooc.content.ts）分属两个站点区：这里是 react_mooc 独立应用，
 * 路由与 DOM 都不同。URL 带齐三个参数（官方「进入」按钮拼的形态）：
 *   eid  考试 id（取卷入口）
 *   tid  学期 id（填充索引的 termId）
 * 页面是异步渲染的（题目在 getPaper 之后出现），与学习页同一条经验：
 * MutationObserver 常驻重评估，模块自身幂等（面板有 id、评块有标记，重复挂载无副作用）。
 */

import { mountNewExamHelper } from '../src/features/mooc/new-exam/index.ts';

export default defineContentScript({
  matches: ['*://*.icourse163.org/mooc/main/newExam*'],
  runAt: 'document_idle',

  main() {
    const params = new URLSearchParams(window.location.search);
    const examId = Number(params.get('eid'));
    const termId = Number(params.get('tid'));
    if (!Number.isFinite(examId) || examId <= 0) return;

    // tid 缺失只影响填充（评分标准照常展示）：填充按钮点下时如实报错即可
    const termIdSafe = Number.isFinite(termId) && termId > 0 ? termId : 0;

    let timer: number | null = null;
    const schedule = (): void => {
      if (timer !== null) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        timer = null;
        if (document.querySelector('[class*="index-module__questionBody"]') === null) return;
        if (document.getElementById('study-pilot-new-exam-panel') !== null) return;
        void mountNewExamHelper(examId, termIdSafe);
      }, 400);
    };

    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });
    schedule();
  },
});

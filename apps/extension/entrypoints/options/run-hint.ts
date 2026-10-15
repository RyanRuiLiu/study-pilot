/*
 * 页面右上角的运行提示（与 tab 条同一行、最右）。
 *
 * 待办那几类（测验/作业/互评/自评/考试）在执行时，状态**不蹭课件板块**——
 * 由这一处顶上来：与弹窗状态行、课件行明细同一句 progressLine，
 * 跑在哪门课、做到哪一项都说得清楚。
 *
 * 课件类的轮次不在这里报：它的落点是课件行自己（有明细也有「停止」，
 * 见 courseware.ts），两处都说就成了重复。
 * 任何 tab 下都可见（页面级，不在某个板块里）。
 */

import { subscribeRunState } from '../../src/ui-bridge';
import { isRunning, progressTextOf, runningItem } from '../../src/ui/run-view.ts';

const hintEl = document.getElementById('run-hint');

export function watchRunHint(): void {
  if (hintEl === null) return;

  subscribeRunState((state) => {
    const step = runningItem(state);
    // 待办类（或还没进到某一项）：上线；课件类：让给课件行；空闲：收起
    const show = isRunning(state) && (step === null || step.kind !== 'courseware');
    const text = show ? progressTextOf(state) : '';
    hintEl.textContent = text;
    hintEl.hidden = text === '';
  });
}

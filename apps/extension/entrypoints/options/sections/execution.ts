/*
 * 设置区：execution。
 *
 * 手动执行不在这一区：动作留在弹窗（整轮）与看板（按课程），
 * 设置页只回答「它现在怎么样、需要时怎么复位」。
 */

import { progressView, resetProgress } from '../run-views.ts';

import { row, button, platform, section } from '../ui.ts';

export function executionSection(): HTMLElement {
  return section('execution', '执行与诊断', '查看运行状态，必要时重置。手动执行在弹窗和看板里。', [
    platform('运行状态', '中断可续', [
      progressView(),
    ]),
    platform('需要时用', '只读', [
      row(
        '打开看板',
        '各平台各课程的任务一览。只读本地快照，打开它不会向平台发请求',
        button('打开看板', () => {
          void browser.tabs.create({ url: browser.runtime.getURL('/dashboard.html') });
        }),
      ),
      row(
        '重置状态',
        '清除执行中断的标记，让下一轮当作全新开始。不会改动平台上的任何数据',
        button('重置状态', () => {
          void resetProgress();
        }),
      ),
    ]),
  ]);
}

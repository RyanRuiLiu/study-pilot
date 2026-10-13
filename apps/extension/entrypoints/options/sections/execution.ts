/*
 * 设置区：execution。
 *
 * 手动执行不在这一区：动作留在弹窗（整轮）里，
 * 设置页只回答「它现在怎么样、需要时怎么复位」。
 */

import { progressView, resetProgress } from '../run-views.ts';

import { row, button, platform, section } from '../../../src/ui/form.ts';

export function executionSection(): HTMLElement {
  return section('execution', '执行与诊断', '查看运行状态，必要时重置。手动执行在弹窗里。', [
    platform('运行状态', '中断可续', [
      progressView(),
    ]),
    platform('需要时用', '只读', [
      row(
        '打开看板',
        '各平台各课程的任务一览。打开时只读本地快照，明细要你点「读取最新明细」才读平台',
        button({
          label: '打开看板',
          variant: 'primary',
          onClick: () => {
            void browser.tabs.create({ url: browser.runtime.getURL('/dashboard.html') });
          },
        }),
      ),
      row(
        '重置状态',
        '清除执行中断的标记，让下一轮当作全新开始。不会改动平台上的任何数据',
        button({
          label: '重置状态',
          variant: 'primary',
          onClick: () => {
            void resetProgress();
          },
        }),
      ),
    ]),
  ]);
}

/*
 * 设置区：execution。
 *
 * 从 options/main.ts 的 render() 搬出；表达式原样，只在开头取一次配置。
 */

import { progressView, resetProgress, runAll } from '../run-views.ts';

import { row, button, platform, section } from '../ui.ts';
import { current } from '../state.ts';

export function executionSection(): HTMLElement {
  return section('execution', '执行与诊断', '手动运行一次，并查看运行状态。', [
      platform('手动执行', '按需触发', [
        row(
          '立即执行',
          '拉取最新数据，把能自动完成的做完。与自动检查走同一流程，只是不等时机',
          button('开始执行', () => {
            void runAll();
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
      platform('运行状态', '中断可续', [
        progressView(),
      ]),
      platform('看板', '只读', [
        row(
          '打开看板',
          '各平台各课程的任务一览。只读本地快照，打开它不会向平台发请求',
          button('打开看板', () => {
            void browser.tabs.create({ url: browser.runtime.getURL('/dashboard.html') });
          }),
        ),
      ]),
    ]);
}
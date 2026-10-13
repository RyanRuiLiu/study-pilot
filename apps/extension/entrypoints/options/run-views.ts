/*
 * 运行状态视图与手动执行。
 *
 * 从 options/main.ts 搬出（原先紧邻在一起）。它们只依赖「消息协议 + 提示条 +
 * 重渲染」，因此可以独立成模块，不必与入口互相引用。
 */

import { REJECTION_MESSAGES, sendToBackground, type JobRejection } from '../../src/platform/messaging';
import { describeRunState } from '../../src/background/runtime/scheduler';
import { signalContentReady } from './unit-details.ts';
import { render, toast } from './state.ts';
/**
 * 运行状态视图。
 *
 * 只回答「上次什么时候检查的、现在是不是正在跑」。
 * 不再列出「已完成多少项」「待处理什么」——那两样在待办与单元明细里
 * 各有更准确的呈现，而它们是按当下重新算出来的；
 * 状态里那份是上一轮的快照，两者并列会让用户看到不一致的两套说法。
 */
export function progressView(): HTMLElement {
  const box = document.createElement('div');
  box.className = 'sp-progress';
  box.id = 'progress-view';
  box.textContent = '正在读取…';

  void sendToBackground({ type: 'TASK_STATE' })
    .then((status) => {
      box.textContent = describeRunState(status.state);
      signalContentReady();
    })
    .catch(() => {
      box.textContent = '读取状态失败';
      signalContentReady();
    });

  return box;
}

/**
 * 手动执行一轮。
 *
 * 与定时检查执行的是同一套流程，只是不等时机。
 * 后台会先拉最新状态再决定做什么，因此这里不需要预先判断
 * 「有没有可做的」——那需要一份同样新鲜的数据，而拉取本身就在后台做。
 */
export async function runAll(): Promise<void> {
  toast('正在执行');

  const result = (await sendToBackground({ type: 'RUN_SCHEDULED_TASKS' })) as
    | {
        ok?: boolean;
        reason?: JobRejection;
        done?: number;
        manual?: number;
        message?: string;
        failed?: Array<{ name: string; detail: string }>;
      }
    | undefined;

  if (!result || result.ok === false) {
    toast(result?.reason ? REJECTION_MESSAGES[result.reason] : '执行失败');
    return;
  }

  if (result.message) {
    toast(result.message);
    render();
    return;
  }

  const failed = result.failed ?? [];
  const parts = [`完成 ${result.done ?? 0} 项`];
  if (failed.length > 0) parts.push(`${failed.length} 项失败`);
  if ((result.manual ?? 0) > 0) parts.push(`${result.manual} 项待你处理`);
  toast(parts.join('，'));

  render();
}

export async function resetProgress(): Promise<void> {
  await sendToBackground({ type: 'RESET_TASK_STATE' });
  toast('已重置执行状态');
  render();
}

/*
 * 「立即执行」按钮：发一次执行请求，把结果显示在状态行。
 *
 * 按钮文字始终是「执行」，不随状态变化。
 *
 * 先前点下去改成「执行中」、结束后又改成「立即执行」，字数从 2 变 3 再变 4，
 * 而旁边按钮与开关宽度固定，于是整排按钮在点击过程中被推着左右移动。
 * 执行中的信息交给状态位表达，按钮只负责「可以点」与「不能点」。
 */

import { REJECTION_MESSAGES, type JobRejection } from '../../src/platform/messaging';
import { getSettings, type Settings } from '../../src/settings';
import { setRunEnabled, showBusy, showResult } from './status.ts';

/** 手动执行是否正在进行。它优先于轮询读到的状态。 */
let manualRunning = false;

export function isManualRunning(): boolean {
  return manualRunning;
}

/** 执行结果的消息形状。字段可能缺失，逐项判。 */
interface RunSummary {
  ok?: boolean;
  reason?: string;
  done?: number;
  manual?: number;
  message?: string;
  failed?: Array<{ name: string; detail: string }>;
}

/**
 * 执行一次，并把结果写到状态行。
 *
 * 结束时用 `onFinished` 让入口重读待办：执行会改动平台状态，
 * 而待办列表是执行前读的。
 */
export async function runNow(onFinished: (settings: Settings) => void): Promise<void> {
  manualRunning = true;
  setRunEnabled(false);
  showBusy('正在执行');

  const settings = await getSettings();

  try {
    const result = (await browser.runtime.sendMessage({
      type: 'RUN_SCHEDULED_TASKS',
    })) as RunSummary | undefined;

    if (result?.ok === false) {
      /*
       * 被拒绝的原因要具体。「正在执行」这类由并发导致的拒绝
       * 不必报错色——它不是出错，只是时机不对。
       */
      const reason = result.reason as JobRejection | undefined;
      showResult(reason ? REJECTION_MESSAGES[reason] : '未执行', reason !== 'ALREADY_RUNNING');
      return;
    }

    if (result) {
      if (result.message) {
        // 「没有可自动完成的事项」属于正常结果，不用错误色
        showResult(result.message, false);
        return;
      }
      const failed = result.failed ?? [];
      const parts = [`完成 ${result.done ?? 0} 项`];
      if (failed.length > 0) parts.push(`${failed.length} 项失败`);
      if ((result.manual ?? 0) > 0) parts.push(`${result.manual} 项待你处理`);
      showResult(parts.join('，'), failed.length > 0);
    }
  } catch (error) {
    showResult(error instanceof Error ? error.message : '执行失败', true);
  } finally {
    manualRunning = false;
    setRunEnabled(settings.enabled);
    onFinished(settings);
  }
}

/*
 * 「立即执行」按钮：发一次执行请求，把结果写到状态行。
 *
 * 按钮文字始终是「立即执行」，不随状态变化。
 *
 * 先前点下去改成「执行中」、结束后又改回来，字数从 2 变 3 再变 4，
 * 而这一排控件宽度固定，于是整排被推着左右移动。
 * 执行中的信息交给状态行，按钮只负责「可以点」与「不能点」。
 */

import { REJECTION_MESSAGES, type JobRejection } from '../../src/platform/messaging';
import { getSettings } from '../../src/settings';
import type { Tone } from '../../src/ui';

/** 执行期间要写状态行、控按钮、结束后让入口重读清单，因此由入口传进来。 */
export interface RunHandles {
  setStatus: (text: string, tone: Tone) => void;
  setEnabled: (enabled: boolean) => void;
  /** 执行会改动平台状态，而清单是执行之前读的，结束后要重读一次 */
  refresh: () => Promise<void>;
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

/** 执行一次，并把结果写到状态行。 */
export async function runNow(handles: RunHandles): Promise<void> {
  const settings = await getSettings();
  handles.setEnabled(false);
  handles.setStatus('正在执行', 'busy');

  let text = '未执行';
  let tone: Tone = 'idle';

  try {
    const result = (await browser.runtime.sendMessage({
      type: 'RUN_SCHEDULED_TASKS',
    })) as RunSummary | undefined;

    if (result?.ok === false) {
      /*
       * 被拒绝的原因要具体。「正在执行」这类由并发导致的拒绝不必报错色——
       * 它不是出错，只是时机不对。
       */
      const rejection = result.reason as JobRejection | undefined;
      text = rejection ? REJECTION_MESSAGES[rejection] : '未执行';
      tone = rejection === 'ALREADY_RUNNING' ? 'idle' : 'error';
    } else if (result) {
      if (result.message) {
        // 「没有可自动完成的事项」属于正常结果，不用错误色
        text = result.message;
      } else {
        const failed = result.failed ?? [];
        const parts = [`完成 ${result.done ?? 0} 项`];
        if (failed.length > 0) parts.push(`${failed.length} 项失败`);
        if ((result.manual ?? 0) > 0) parts.push(`${result.manual} 项待你处理`);
        text = parts.join('，');
        tone = failed.length > 0 ? 'error' : 'idle';
      }
    }
  } catch (error) {
    text = error instanceof Error ? error.message : '执行失败';
    tone = 'error';
  }

  // 先重读再写结果：重读会重画状态行，顺序反过来结果会被它覆盖
  await handles.refresh();
  handles.setStatus(text, tone);
  handles.setEnabled(settings.enabled);
}

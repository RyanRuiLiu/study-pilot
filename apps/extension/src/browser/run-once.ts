/*
 * 「立即执行」：发一次执行请求，把结果写到界面上。
 *
 * 弹窗与主页面顶栏各有一个这个按钮，走的是同一段流程，因此实现只有一份：
 * 差别通过 handles 交进来（弹窗写状态行，主页面弹提示条）。
 *
 * 按钮文字始终是「立即执行」，不随状态变化。
 *
 * 先前点下去改成「执行中」、结束后又改回来，字数从 2 变 3 再变 4，
 * 而这一排控件宽度固定，于是整排被推着左右移动。
 * 执行中的信息交给状态行，按钮只负责「可以点」与「不能点」。
 */

import { REJECTION_MESSAGES, sendToBackground } from './messaging';
import { getSettings } from '../settings';
/** 提示语气的三态；界面层也用它，但这里只定义、不依赖界面。 */
export type Tone = 'idle' | 'busy' | 'error';

/** 执行期间要写状态行、控按钮、结束后让入口重读清单，因此由入口传进来。 */
export interface RunHandles {
  setStatus: (text: string, tone: Tone) => void;
  setEnabled: (enabled: boolean) => void;
  /** 执行会改动平台状态，而清单是执行之前读的，结束后要重读一次 */
  refresh: () => Promise<void>;
}

/** 执行一次，并把结果写到状态行。 */
export async function runNow(handles: RunHandles): Promise<void> {
  const settings = await getSettings();
  handles.setEnabled(false);
  handles.setStatus('正在执行', 'busy');

  // 四种结局（被拒 / 无事可做 / 有计数 / 抛错）都会写 text，因此不给初值；
  // tone 的初值用得上：「没有可自动完成的事项」是正常结果，保持中性色。
  let text: string;
  let tone: Tone = 'idle';

  try {
    /*
     * 走 `sendToBackground` 而不是裸 `sendMessage`：响应形状由协议
     * （`ResponseMap`）在编译期约束。这里曾自己声明了一份本地 `RunSummary`
     * 再 `as` 上去，于是后台改了字段、前台不会红，只会读到 undefined
     * 再用 `?? 0` 兜住——数字看着对，实际是空的。
     */
    const result = await sendToBackground({ type: 'RUN_SCHEDULED_TASKS' });

    if (result.ok === false) {
      /*
       * 被拒绝的原因要具体。「正在执行」这类由并发导致的拒绝不必报错色——
       * 它不是出错，只是时机不对。
       */
      text = REJECTION_MESSAGES[result.reason];
      tone = result.reason === 'ALREADY_RUNNING' ? 'idle' : 'error';
    } else if (result.message) {
      // 「没有可自动完成的事项」属于正常结果，不用错误色
      text = result.message;
    } else {
      const parts = [`完成 ${result.done} 项`];
      if (result.failed) parts.push(`${result.failed.length} 项失败`);
      if (result.manual > 0) parts.push(`${result.manual} 项待你处理`);
      text = parts.join('，');
      tone = result.failed ? 'error' : 'idle';
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

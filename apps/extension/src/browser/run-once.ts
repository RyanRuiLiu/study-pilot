/*
 * 「执行一轮」：发一次执行请求，把结果写到界面上。
 *
 * 弹窗的「全部执行」与设置页的「执行」走的是同一段流程，因此实现只有一份：
 * 差别通过 handles 交进来（弹窗写状态行，设置页写区块里的结果文字），
 * 范围通过 scope 传下去（弹窗要待办那几类，课件页只要 courseware）。
 *
 * 按钮文字始终不变，不随状态变化。先前点下去改成「执行中」、结束后又改回来，
 * 字数从 2 变 3 再变 4，而这一排控件宽度固定，于是整排被推着左右移动。
 * 执行中的信息交给状态位表达，按钮只负责「可以点」与「不能点」。
 */

import { REJECTION_MESSAGES, sendToBackground } from '../messages.ts';
import { stoppedLine } from '../ui/run-view.ts';
/** 提示语气的三态；界面层也用它，但这里只定义、不依赖界面。 */
export type Tone = 'idle' | 'busy' | 'error';

/**
 * 执行范围：类别、课程与具体条目。原样转给后台，判据见 application 的 RunSelection。
 * 类别取值由平台定义（慕课是 quiz / review / self / homework / exam / courseware）。
 */
export interface RunScope {
  kinds?: string[];
  group?: string;
  /** 只做这几项（计划项 id）。弹窗上「单独完成这一条」用它 */
  ids?: string[];
}

/** 执行期间要写状态、控按钮、结束后让入口重读清单，因此由入口传进来。 */
export interface RunHandles {
  setStatus: (text: string, tone: Tone) => void;
  setEnabled: (enabled: boolean) => void;
  /** 执行会改动平台状态，而清单是执行之前读的，结束后要重读一次 */
  refresh: () => Promise<void>;
}

/** 执行一次，并把结果写到状态上。 */
export async function runNow(handles: RunHandles, scope?: RunScope): Promise<void> {
  handles.setEnabled(false);
  handles.setStatus('正在执行', 'busy');

  // 四种结局（被拒 / 无事可做 / 有计数 / 抛错）都会写 text，因此不给初值；
  // tone 的初值用得上：「没有可执行的事项」是正常结果，保持中性色。
  let text: string;
  let tone: Tone = 'idle';

  try {
    /*
     * 走 `sendToBackground` 而不是裸 `sendMessage`：响应形状由协议
     * （`ResponseMap`）在编译期约束。这里曾自己声明了一份本地 `RunSummary`
     * 再 `as` 上去，于是后台改了字段、前台不会红，只会读到 undefined
     * 再用 `?? 0` 兜住——数字看着对，实际是空的。
     */
    const result = await sendToBackground({
      type: 'RUN_SCHEDULED_TASKS',
      ...(scope?.kinds !== undefined ? { kinds: scope.kinds } : {}),
      ...(scope?.group !== undefined ? { group: scope.group } : {}),
      ...(scope?.ids !== undefined ? { ids: scope.ids } : {}),
    });

    if (result.ok === false) {
      /*
       * 被拒绝的原因要具体。「正在执行」这类由并发导致的拒绝不必报错色——
       * 它不是出错，只是时机不对。
       */
      text = REJECTION_MESSAGES[result.reason];
      tone = result.reason === 'ALREADY_RUNNING' ? 'idle' : 'error';
    } else if (result.message) {
      // 「没有可执行的事项」属于正常结果，不用错误色
      text = result.message;
    } else {
      const failed = result.failed ?? [];
      const parts: string[] = [];
      /*
       * 「完成 0 项」不成话：一件都没完成时就别报数，只说发生了什么。
       * 停止的收尾句与弹窗、设置页共用同一份措辞（见 ui/run-view）。
       */
      if (result.stopped) {
        parts.push(stoppedLine(result.done));
      } else if (result.done > 0 || failed.length === 0) {
        parts.push(`完成 ${result.done} 项`);
      }
      /*
       * 课件没上报成不算「失败」——它低风险、下一次读到还会再做，
       * 说「未完成」就够，也不该染上错误色。要交的东西（测验/作业）才是
       * 失败，而且要说清是谁：只说「N 项失败」，用户还得自己回去找。
       */
      const misses = failed.filter((item) => item.kind === 'courseware').length;
      const realFailures = failed.filter((item) => item.kind !== 'courseware');
      if (misses > 0) parts.push(`${misses} 项未完成`);
      if (realFailures.length > 0) {
        const names = realFailures.slice(0, 2).map((item) => item.name).join('、');
        parts.push(
          realFailures.length > 2 ? `失败：${names} 等 ${realFailures.length} 项` : `失败：${names}`,
        );
      }
      if (result.manual > 0) parts.push(`${result.manual} 项需手动处理`);
      text = parts.join('，');
      tone = realFailures.length > 0 ? 'error' : 'idle';
    }
  } catch (error) {
    text = error instanceof Error ? error.message : '执行失败';
    tone = 'error';
  }

  /*
   * 先把结果说出来，再重读。
   *
   * 重读是网络往返（一两秒），等完再报会让「点完没反应」；而重读本身
   * 不再写结果位（各页已把结果与进度分开），先报不会被覆盖。
   * 按钮的复位仍等重读完成——那一小段时间里别让第二个动作挤进来。
   */
  handles.setStatus(text, tone);
  await handles.refresh();
  handles.setEnabled(true);
}

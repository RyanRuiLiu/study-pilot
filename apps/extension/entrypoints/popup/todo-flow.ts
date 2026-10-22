/*
 * 弹窗待办区的**状态机**（两平台共用，唯一实现）。
 *
 * 两平台在「取数—判状态—落页面」这一步本来一模一样：先读会话与配置，
 * 未登录给去处，没勾课程给下一步，读失败如实说，空列表给空态，最后分组。
 * 各写一份的结果是措辞与次序迟早分叉（历史上「登录已失效说成尚未选择课程」
 * 就出在这里）。差异只有三样，由调用方给：
 *   · 从哪读（会话、配置、待办）；
 *   · 「有没有勾课程」怎么判；
 *   · 拿到数据后怎么画（分组与逐行，各平台的数据形态不同）。
 *
 * 分组与逐行**留在各自文件**：那是平台数据的形状，不是外壳的状态。
 */

import type { QueryOutcome } from '../../src/protocol.ts';
import type { TodoArea } from './todo-area.ts';
import { errorText } from '../../src/ui/format.ts';

export interface TodoFlow<TEntry, TValue extends { entries: TEntry[] }> {
  readSession: () => Promise<{ loggedIn: boolean; expired?: true }>;
  readSettings: () => Promise<unknown>;
  /** 配置里有没有勾选任何课程（两平台的配置形状不同，判据由调用方给） */
  hasSelectedCourses: (settings: unknown) => boolean;
  readPending: () => Promise<QueryOutcome<TValue>>;
  /** 未登录 / 登录失效两句（同一对句子，与设置页一致） */
  loginMissingText: string;
  loginExpiredText: string;
  /** 非空时怎么画（分组与逐行由调用方负责） */
  show: (value: TValue) => void;
}

export async function renderTodoFlow<TEntry, TValue extends { entries: TEntry[] }>(
  area: TodoArea<TEntry>,
  flow: TodoFlow<TEntry, TValue>,
): Promise<void> {
  let session: { loggedIn: boolean; expired?: true };
  let settings: unknown;
  try {
    // 两次读都要护住：消息通道断（后台重启）时是 reject，先前会落成未处理的异常、弹窗空白
    [session, settings] = await Promise.all([flow.readSession(), flow.readSettings()]);
  } catch (error) {
    area.error(errorText(error));
    return;
  }

  /*
   * **未登录先于「没勾课程」判**：没登录时什么都做不了，而「没勾课程」是下一步的事。
   * 顺序反了会把人指向一个他到了也做不成事的地方。
   */
  if (!session.loggedIn) {
    area.loginPrompt(session.expired ? flow.loginExpiredText : flow.loginMissingText);
    return;
  }

  if (!flow.hasSelectedCourses(settings)) {
    area.write([area.note('todo-empty', '尚未选择参与任务的课程，在「更多」中读取并勾选。')]);
    return;
  }

  let outcome: QueryOutcome<TValue>;
  try {
    /*
     * 不传课程列表：后台从配置里自己取。前台传过去的那份可能比存储里的旧，
     * 而「读哪些课」以配置为准才不会两边不一致。
     */
    outcome = await flow.readPending();
  } catch (error) {
    area.error(errorText(error));
    return;
  }

  if (outcome.status === 'error') {
    // 未登录与读取失败分开说：未登录不是出错，是少做了一步
    if (outcome.reason === 'NOT_LOGGED_IN') area.loginPrompt(flow.loginExpiredText);
    else area.error(outcome.message);
    return;
  }

  if (outcome.value.entries.length === 0) {
    area.write([area.note('todo-empty', '暂无待办。')]);
    return;
  }

  flow.show(outcome.value);
}

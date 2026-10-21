/*
 * 智慧树「账号与课程」卡头里的状态行（标题右侧，与读取按钮同一行）。
 *
 *   账号与课程   已登录 · 2 门课程参与 · 可代为完成 137 项   [读取课程列表]
 *
 * 与慕课那份同一条规则：只负责**加载完成后的状态**；读取期间立骨架、
 * 失败与未登录保持空白（那句话在内容区出现一次，见 zhihuishu-courses.ts）。
 *
 * 数字与课程任务卡共用同一条平台读取（ZHS_COURSE_TASKS），不另发消息；
 * 读不到时头部只留本地事实（已登录 · N 门参与），失败细节由课程任务卡自己报。
 */

import { getZhsCourseTasks, getZhsSession, getSettings } from '../../src/ui-bridge.ts';
import type { ZhsCourseTaskSummary, QueryOutcome } from '../../src/ui-bridge.ts';

/**
 * 卡头状态行立刻进入等待（骨架守位）。
 * 两处调用：本行自己的重读（renderZhsStatusLine 内部），以及
 * 「读取课程列表」点击那一刻——三块区域要同一刻进入等待。
 */
export function markZhsStatusLineLoading(): void {
  const el = document.getElementById('zhs-session-text');
  if (el === null) return;
  el.textContent = '';
  el.classList.add('is-loading');
}

export async function renderZhsStatusLine(
  tasksRead?: Promise<QueryOutcome<ZhsCourseTaskSummary>>,
): Promise<void> {
  const el = document.getElementById('zhs-session-text');
  if (el === null) return;

  /**
   * 落定：写文字并**撤掉骨架**——所有出口都走这里。
   *
   * 原先三条早退路径只写文字、不撤 `is-loading`，而骨架是**点击「读取课程列表」
   * 那一刻**就立起来的（`markZhsStatusLineLoading`），于是那三条路走完，
   * 骨架就永远留在卡头。其中「未登录」最常撞上：**越是不该有骨架的时候，
   * 越留着骨架**。统一出口是唯一不会再漏的形状（弹窗待办区的 `write` 同理）。
   */
  const settle = (text: string): void => {
    el.classList.remove('is-loading');
    el.textContent = text;
  };

  let loggedIn = false;
  let enabled = 0;
  try {
    const [session, settings] = await Promise.all([getZhsSession(), getSettings()]);
    loggedIn = session.loggedIn;
    enabled = settings.zhihuishu.courses.filter((course) => course.enabled).length;
  } catch {
    settle('');
    return;
  }

  // 未登录：卡头空白，指引（含「前往登录」按钮）在内容区
  if (!loggedIn) {
    settle('');
    return;
  }

  if (enabled === 0) {
    settle('已登录 · 未选择课程');
    return;
  }

  // 要等平台读取了：先在最终位置立起骨架，落定后同一刻换成文字
  markZhsStatusLineLoading();

  const parts = ['已登录', `${enabled} 门课程参与`];
  let tasks: QueryOutcome<ZhsCourseTaskSummary>;
  try {
    tasks = await (tasksRead ?? getZhsCourseTasks());
  } catch {
    /*
     * 消息通道断了（后台重启、端口失效）是 reject，不是 error 结果；
     * 这条路径没有出口的话骨架会留在卡头。与慕课那份同一处置：只留本地事实。
     */
    settle(parts.join(' · '));
    return;
  }
  if (tasks.status === 'ok' && tasks.value.pendingTotal !== null) {
    const pending = tasks.value.pendingTotal;
    /*
     * 措辞取常用句里的「可代为完成」（CONTRIBUTING「界面语言与文案」）：
     * 这一个数把视频与测试两类合在一起说，用「待学」会把测试排除在外。
     *
     * 读不全时（pendingTotal 为 null）**这一格不报数**——那个数那时只是下界，
     * 报出去就是一个看起来确定的谎。哪一门哪一半没读到，课程任务卡里逐门说清。
     */
    parts.push(pending === 0 ? '暂无待完成' : `可代为完成 ${pending} 项`);
  }

  settle(parts.join(' · '));
}

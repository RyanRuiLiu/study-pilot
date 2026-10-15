/*
 * 扩展弹窗（入口）。
 *
 * 数据来源：
 *   状态行   后台的 getTaskState（本地状态，不联网）+ 运行状态的推送
 *   待办     后台现读现算：能替你做的那部分标出来，其余交给你
 *
 * 两者都只从 src/ui-bridge.ts 取——界面唯一的取数入口，不 import
 * src/adapters、src/background、src/browser、src/settings。
 *
 * 样式分两层引入：tokens（取值）、本页布局。
 * 必须通过 import 引入，不能用 HTML 的 <link>——构建后源路径不会被
 * 打包器改写，会变成死链，页面于是回退到浏览器默认样式。
 *
 * 分工：元素引用见 elements.ts，状态行与跟随见 status.ts，
 * 待办渲染见 todo.ts；本文件只做装配。
 */

import '../../src/ui/tokens.css';
import './style.css';

import { runNow } from '../../src/ui-bridge';
import { PENDING_KINDS } from '../../src/ui/scopes.ts';
import { runBtn, settingsBtn } from './elements.ts';
import { renderState, setFollowIdleHandler, setRunning, showStatus, watchRunState } from './status.ts';
import { renderTodo } from './todo.ts';

async function init(): Promise<void> {
  watchRunState();
  setFollowIdleHandler(() => {
    void renderTodo();
  });

  /*
   * 状态行先在本地画出（不联网，快），待办随后异步到来。
   *
   * 待办只拉一次：现在的界面不缓存任何平台数据，每次渲染就是一次真实
   * 网络往返，拉两遍纯属浪费。数据到达前那一句「正在获取最新数据」
   * 就是给这段等待的，不必再画一遍旧数据。
   */
  await renderState();
  void renderTodo();

  runBtn?.addEventListener('click', () => {
    /*
     * 按钮文字始终是「全部执行」，不随状态变化。
     * 先前点下去改成「执行中」、结束后又改回来，字数从 2 变 3 再变 4，
     * 而旁边按钮宽度固定，于是整排按钮在点击过程中被推着左右移动。
     * 执行中的信息交给状态行表达，按钮只负责「可以点」与「不能点」。
     *
     * 范围只发待办那几类（PENDING_KINDS）：课件不在这里点——
     * 它没有截止时间，属于设置页的「课件」区。
     */
    void runNow(
      {
        setStatus: showStatus,
        setEnabled: (enabled) => setRunning(!enabled),
        refresh: () => renderTodo(),
      },
      { kinds: PENDING_KINDS },
    );
  });

  settingsBtn?.addEventListener('click', () => {
    void browser.runtime.openOptionsPage();
    window.close();
  });
}

void init();

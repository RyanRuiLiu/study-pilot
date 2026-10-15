/*
 * 扩展弹窗（入口）。
 *
 * 数据来源：
 *   状态行   后台的 getTaskState（本地状态，不联网）+ 运行状态的推送——全局，不分 tab
 *   待办     当前 tab 的平台现读现算：能替你做的那部分标出来，其余交给你
 *
 * 平台 tab（慕课/智慧树）由 src/ui/tabs.ts 装配：打开只读默认平台的那一家，
 * 切到没读过的平台才取数——一次打开最多读一家（规格第 13 节）。
 *
 * 两者都只从 src/ui-bridge.ts 取——界面唯一的取数入口，不 import
 * src/adapters、src/background、src/browser、src/settings。
 *
 * 样式分三层引入：tokens（取值）、本页布局、共享组件。
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
import { initTabs } from '../../src/ui/tabs.ts';
import { runBtn, settingsBtn } from './elements.ts';
import {
  renderState,
  setFollowIdleHandler,
  setRunning,
  setRunScope,
  showStatus,
  watchRunState,
} from './status.ts';
import { renderTodo } from './todo.ts';
import { renderZhsTodo } from './zhihuishu-todo.ts';

/** 当前 tab 的平台（'mooc' / 'zhihuishu'）：执行范围与收尾重读都按它分流。 */
let currentPlatform = 'mooc';

async function init(): Promise<void> {
  watchRunState();
  // 执行结束后重读当前 tab 的清单（切过 tab 就以新 tab 为准）
  setFollowIdleHandler(() => {
    void (currentPlatform === 'zhihuishu' ? renderZhsTodo() : renderTodo());
  });

  /*
   * 状态行先在本地画出（不联网，快），执行状态是全局的、不随 tab。
   * 待办只拉一次：现在的界面不缓存任何平台数据，每次渲染就是一次真实
   * 网络往返，拉两遍纯属浪费。数据到达前那三条骨架就是给这段等待的。
   */
  await renderState();

  await initTabs({
    onFirstActivate: (id) => {
      if (id === 'mooc') void renderTodo();
      if (id === 'zhihuishu') void renderZhsTodo();
    },
    onActivate: (id) => {
      if (id === 'mooc' || id === 'zhihuishu') currentPlatform = id;
      // 「全部执行」作用于当前 tab 的平台；两个平台都已有可执行内容
      setRunScope(id === 'mooc' || id === 'zhihuishu');
    },
  });

  runBtn?.addEventListener('click', () => {
    /*
     * 按钮文字始终是「全部执行」，不随状态变化（理由见上方注释）。
     *
     * 范围按当前 tab 的平台给，且**点名平台**：两平台共存后，类别名不保证
     * 互斥（「courseware」两家都用），不点名会把另一家的范围内事项也做掉。
     *
     *   慕课：只发待办那几类（PENDING_KINDS）——课件不在这里点，属于设置页；
     *   智慧树：它的待办就是全部未完成单元，平台内没有别的类别。
     */
    const scope =
      currentPlatform === 'zhihuishu'
        ? { platformId: 'zhihuishu' }
        : { platformId: 'mooc', kinds: PENDING_KINDS };
    void runNow(
      {
        setStatus: showStatus,
        setEnabled: (enabled) => setRunning(!enabled),
        refresh: () => (currentPlatform === 'zhihuishu' ? renderZhsTodo() : renderTodo()),
      },
      scope,
    );
  });

  settingsBtn?.addEventListener('click', () => {
    void browser.runtime.openOptionsPage();
    window.close();
  });
}

void init();

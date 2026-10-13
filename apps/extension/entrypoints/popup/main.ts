/*
 * 扩展弹窗（入口）。
 *
 * 数据来源：
 *   调度状态   后台的 TASK_STATE（本地持久化）
 *   待办明细   后台按当前状态派生：能自动做的标出来，其余交给用户
 *   总开关     settings.enabled
 *
 * 样式分三层引入：tokens（取值）、base（通用元素）、本页布局。
 * 必须通过 import 引入，不能用 HTML 的 <link>——构建后源路径不会被
 * 改写，会变成死链，页面于是回退到浏览器默认样式。
 *
 * 分工：元素引用见 `elements.ts`，状态行与跟随见 `status.ts`，
 * 待办渲染见 `todo.ts`，立即执行见 `run.ts`；本文件只做装配。
 */

import '../../src/ui/tokens.css';
import './style.css';

import { watchSettings } from '../../src/settings';
import { settingsBtn, runBtn } from './elements.ts';
import { isManualRunning, runNow } from './run.ts';
import { renderState, setFollowIdleHandler } from './status.ts';
import { renderTodo } from './todo.ts';

/** 渲染状态行与待办。两者都要读一次配置，因此合成一步。 */
async function refresh(options: { justClicked?: boolean } = {}): Promise<void> {
  const { settings } = await renderState(options);
  await renderTodo(settings);
}

async function init(): Promise<void> {
  /*
   * 先渲染状态与现有待办，再去后台拉最新。
   *
   * 不 await 拉取的原因：弹窗是点开就走的界面，用户常在数据回来之前
   * 就把它关掉，那时这个 await 永远等不到结果，界面反而一直空着。
   * 先把已有的画出来，拉回来再重画一次——短暂看到旧数据，好过白屏。
   */
  await refresh({ justClicked: isManualRunning() });
  void refresh();

  /*
   * 三种触发路径都让待办重新读一次：
   *   打开弹窗   用户明确要看，后台会无条件拉最新并更新快照
   *   刷新课程   课程勾选可能刚变过
   *   执行结束   由状态行的跟随在结束时触发（这里注册回调）
   */
  setFollowIdleHandler((settings) => {
    void renderTodo(settings);
  });

  watchSettings(() => {
    void refresh();
  });

  runBtn?.addEventListener('click', () => {
    void runNow((settings) => {
      void renderTodo(settings);
    });
  });

  settingsBtn?.addEventListener('click', () => {
    void browser.runtime.openOptionsPage();
    window.close();
  });
}

void init();

/*
 * 扩展弹窗（入口）。
 *
 * 数据来源：
 *   状态行   后台的 getTaskState（本地状态，不联网）+ 运行状态的推送；
 *            按当前 tab 的平台呈现（两家的状态互相独立）
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

import { getSession, getZhsSession, runNow } from '../../src/ui-bridge.ts';
import { PENDING_KINDS } from '../../src/ui/scopes.ts';
import { initTabs } from '../../src/ui/tabs.ts';
import { runBtn, settingsBtn } from './elements.ts';
import {
  renderState,
  setFollowIdleHandler,
  setRunning,
  setRunScope,
  setStatusPlatform,
  statusWriterFor,
  watchRunState,
} from './status.ts';
import { renderTodo, showMoocLogin } from './todo.ts';
import { renderZhsTodo, showZhsLogin } from './zhihuishu-todo.ts';

/** 当前 tab 的平台（'mooc' / 'zhihuishu'）：执行范围与收尾重读都按它分流。 */
let currentPlatform = 'mooc';
/** 别家跑完、但这家的清单还没重读（切回去时补一次，不拿运行前的数据充数）。 */
const dirty = new Set<string>();

/**
 * 首帧把两个 tab 的登录态落定。
 *
 * 弹窗一次只读当前 tab 的待办（规格第 13 节），另一家的骨架会留到第一次切换——
 * 那时才换成「未登录」，看起来像闪了一下。这里只读会话（cookie ＋ 必要的服务端
 * 探问），不读待办；未登录的那家当场换成指引。
 */
const settledLoggedOut = new Set<string>();

async function settleLoginStates(): Promise<void> {
  const [mooc, zhs] = await Promise.all([getSession(), getZhsSession()]);
  /*
   * 只结算**还没露出来**的那个面板：当前 tab 由它自己的流程写，这里再写一遍
   * 就会把已出现的内容换掉。切走前若结算已完成，切回来时也不会重跑。
   */
  if (!mooc.loggedIn && document.getElementById('panel-mooc')?.hidden !== false) {
    showMoocLogin(mooc);
    settledLoggedOut.add('mooc');
  }
  if (!zhs.loggedIn && document.getElementById('panel-zhihuishu')?.hidden !== false) {
    showZhsLogin(zhs);
    settledLoggedOut.add('zhihuishu');
  }
}

function renderFor(platformId: string): void {
  void (platformId === 'zhihuishu' ? renderZhsTodo() : renderTodo());
}

async function init(): Promise<void> {
  watchRunState();
  /*
   * 执行结束后重读**跑完的那一家**的清单。别处发起的轮次可能在当前 tab 之外
   * （开着弹窗切去看另一家，这一家跑完了）——那时记成脏，切回去再读；
   * 只重读当前 tab 会把另一家的旧清单留在页面上。
   */
  setFollowIdleHandler((platformId) => {
    if (platformId === currentPlatform) renderFor(platformId);
    else dirty.add(platformId);
  });

  /*
   * 状态行先在本地画出（不联网，快），执行状态是全局的、不随 tab。
   * 待办只拉一次：现在的界面不缓存任何平台数据，每次渲染就是一次真实
   * 网络往返，拉两遍纯属浪费。数据到达前那三条骨架就是给这段等待的。
   */
  await renderState();
  // 与当前 tab 的取数并行，不占它的等待时间
  void settleLoginStates();

  await initTabs({
    onFirstActivate: (id) => {
      dirty.delete(id);
      /*
       * 首帧已经落定为「未登录」的 tab 不再重跑一遍：同一份内容写两次，
       * 会把已经出现的内容再闪一次（结算在启动时、激活时各一次）。
       * 登录态变了会重开弹窗，那时重新判定。
       */
      if (id === 'mooc' || id === 'zhihuishu') {
        if (settledLoggedOut.has(id)) return;
        renderFor(id);
      }
    },
    onActivate: (id) => {
      if (id === 'mooc' || id === 'zhihuishu') currentPlatform = id;
      // 状态行按当前 tab 的平台呈现（平台状态相互独立，问谁答谁）
      setStatusPlatform(currentPlatform);
      // 「全部执行」作用于当前 tab 的平台；两个平台都已有可执行内容
      setRunScope(id === 'mooc' || id === 'zhihuishu');
      /*
       * 切回一个「别家跑完时记脏」的平台：补一次重读。
       * 放进微任务——首次激活时 onFirstActivate 紧跟着同步执行，会自己读一遍；
       * 这里等它先清掉脏标记，避免同一份数据读两次。
       */
      const target = id;
      queueMicrotask(() => {
        if (dirty.delete(target)) renderFor(target);
      });
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
     *   智慧树：不套慕课的「待办/课件」二分（设计文档 §3 模块 5），只点名平台；
     *     它的待办现在有两类（教程视频与单元测试），两类都该被这一轮做掉。
     */
    /*
     * 平台在点击这一刻定下：执行到一半切走 tab 时，结果句与收尾重读仍要归
     * 发起的那一家（`currentPlatform` 在完成时可能已经变了）。
     */
    const platform = currentPlatform === 'zhihuishu' ? 'zhihuishu' : 'mooc';
    const scope = platform === 'zhihuishu' ? { platformId: 'zhihuishu' } : { platformId: 'mooc', kinds: PENDING_KINDS };
    // 结果只写回发起平台的状态行（切走 tab 后那行归那家管；见 statusWriterFor）
    void runNow(
      {
        setStatus: statusWriterFor(platform),
        setEnabled: (enabled) => setRunning(!enabled, platform),
        refresh: () => (platform === 'zhihuishu' ? renderZhsTodo() : renderTodo()),
      },
      scope,
    );
  });

  settingsBtn?.addEventListener('click', () => {
    // 打开失败（扩展正在重载）没有可显示的地方；别让它落成未处理拒绝
    void browser.runtime.openOptionsPage().catch(() => undefined);
    window.close();
  });
}

void init();

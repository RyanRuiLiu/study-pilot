/**
 * 扩展后台（Service Worker）。
 *
 * 本文件只做装配：创建平台、注册消息路由与运行状态推送通道。
 * 任务逻辑位于 `src/background/` 与各平台。
 *
 * 运行模型：只有人点按钮时才执行（弹窗的「立即执行」、设置页的「快速完成」、
 * 命令行的 run）——这里没有任何自动触发，没有闹钟，也没有定时检查。
 * 「此刻能不能开始」与「跑一轮」的流程在 @study-pilot/application
 * （state.ts 是判据，round.ts 是用例）。
 */

import { createRunner, liveRunState } from '@study-pilot/application';
import { createMoocPlatform } from '../src/adapters/mooc/platform.ts';
import { whenNetRulesReady } from '../src/browser/net-rules';
import { browserCapabilities } from '../src/browser/capabilities.ts';
import { registerMessageHandler } from '../src/background/messages/router';
import { attachRunStatePort, progressStore } from '../src/background/runtime/run-state';
import { getTaskState, recordRunFailure, taskStore } from '../src/background/runtime/task-state';
import { configStore } from '../src/settings';

export default defineBackground(() => {
  /*
   * 平台。外壳只调工厂，不碰平台的内部实现（read / plan / execute / 处理器）。
   *
   * 将来加第二个平台：再调一次它自己的工厂，把它并进 handlers 与 platforms 清单。
   */
  const mooc = createMoocPlatform({
    host: browserCapabilities,
    config: configStore,
    shell: {
      runState: async () => {
        const state = await getTaskState();
        return { state, live: liveRunState(state) };
      },
      recordFailure: (message: string) => recordRunFailure(message),
    },
  });

  // 回调内包一层 try/catch 是有必要的：生产构建会把 console 替换为空函数，
  // 回调抛出异常时不会有任何输出，表现只是「监听器一个都没注册」。
  try {
    /*
     * 先把请求头规则装上，再注册其余逻辑。
     *
     * 必须在这里主动装，不能等第一个请求到了才懒装：
     * updateDynamicRules 是异步提交给浏览器网络栈的，它 resolve 时
     * 规则未必已经挂上。等第一个请求时才装，那个请求仍会带着扩展的
     * Origin 出去，被平台回「非法跨域请求」。
     *
     * 表现为「手动打开一次 MOOC 页面之后就好了」——那次访问唤醒了
     * service worker，规则在那之后才真正生效。
     *
     * 不 await：注册监听器不该被网络的异步性拖住。规则安装与
     * 监听器注册并发进行，两者互不依赖；真正要发请求时，
     * 客户端里仍会 await whenNetRulesReady() 兜一次底。
     */
    void whenNetRulesReady(mooc.wiring.requestRules);

    // 运行状态的推送通道：页面打开时连上，关掉时自动断开，不需要轮询
    browser.runtime.onConnect.addListener(attachRunStatePort);
  } catch (error) {
    /*
     * 监听器一个都没注册上时，唯一能看见这件事的地方是界面。
     *
     * 生产构建把 console 换成空函数，所以这里不能只打印：失败记进运行状态，
     * 由弹窗如实显示（与「上一次执行出错」共用同一条 `lastError`）。
     */
    void recordRunFailure(error instanceof Error ? error.message : String(error));
  }

  /*
   * 「跑一轮」用例 + 本载体的两个端口实现。
   *
   * 消息路由拿到的是这个 runner：它不认识存储，也不认识平台实例是谁造的。
   * 平台实例每次现建，本轮状态不跨轮残留。
   */
  const runner = createRunner({
    platforms: () => [mooc.tasks()],
    tasks: taskStore,
    progress: progressStore,
  });

  registerMessageHandler({ handlers: mooc.handlers, runner });
});

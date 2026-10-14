/**
 * 扩展后台（Service Worker）。
 *
 * 本文件只做装配：创建客户端、注册消息路由与启动触发。
 * 任务逻辑位于 `src/background/`，配置门禁由任务自身强制。
 *
 * 运行模型：每周指定日的首次浏览器启动时执行一次。判定与进度记录在
 * `src/background/scheduler.ts`，一轮的完整流程在 `src/background/run-tasks.ts`。
 */





import { ensureAlarm } from '../src/background/runtime/alarms';
import { whenNetRulesReady } from '../src/browser/net-rules';


import { liveRunState } from '@study-pilot/application';
import { getTaskState, recordRunFailure } from '../src/background/runtime/task-state';
import { attachRunStatePort } from '../src/background/runtime/run-state';
import { registerMessageHandler } from '../src/background/messages/router';
import { createMoocPlatform } from '../src/adapters/mooc/platform.ts';
import { browserCapabilities } from '../src/browser/capabilities.ts';
import { configStore } from '../src/settings';
import { registerBackgroundWiring } from '../src/background/wiring';





export default defineBackground(() => {
  /*
   * 平台。外壳只调工厂，不碰平台的内部实现（read / plan / execute / 处理器）。
   *
   * 将来加第二个平台：再调一次它自己的工厂，把它并进 handlers、wiring 与 platforms 清单。
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

    /*
     * 周期检查的安装时机有三个，缺一个都会漏：
     *
     *   onInstalled   装好扩展的那一刻。此时浏览器不会重启，
     *                 onStartup 不会触发，不定时器就永远建不起来
     *   onStartup     每次浏览器启动。重建一次，顺带修正可能被清掉的定时器
     *   这里          后台被唤醒时。MV3 的 service worker 会被回收再拉起，
     *                 拉起后内存里的东西都没了，而定时器本身是持久的，
     *                 所以这里只是兜底
     *
     * ensureAlarm 是幂等的（先清后建），重复调用没有副作用。
     */
    void ensureAlarm();
    // 运行状态的推送通道：页面打开时连上，关掉时自动断开，不需要轮询
    browser.runtime.onConnect.addListener(attachRunStatePort);
  } catch (error) {
    /*
     * 监听器一个都没注册上时，唯一能看见这件事的地方是界面。
     *
     * 生产构建把 console 换成空函数，所以这里不能只打印：失败记进运行状态，
     * 由弹窗如实显示（判据与自动执行的失败共用同一条 `lastError`）。
     */
    void recordRunFailure(error instanceof Error ? error.message : String(error));
  }

  /*
   * 客户端与其余协作方。
   *
   * 传进各模块后，它们不认识这些值的来历；入口只负责把它们配好。
   */

  registerMessageHandler({
    handlers: mooc.handlers,
    platforms: () => [mooc.tasks()],
  });
  registerBackgroundWiring({ platforms: () => [mooc.tasks()], wiring: [mooc.wiring] });
});

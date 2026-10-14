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
import { whenNetRulesReady } from '../src/background/net-rules';


import { getTaskState, liveRunState } from '../src/background/runtime/scheduler';
import { registerMessageHandler } from '../src/background/messages/router';
import { createMoocPlatform } from '../src/platforms/mooc/platform.ts';
import { registerBackgroundWiring } from '../src/background/wiring';





export default defineBackground(() => {
  // 回调内包一层 try/catch 是有必要的：生产构建会把 console 替换为空函数，
  // 回调抛出异常时不会有任何输出，表现只是「监听器一个都没注册」。
  // 把原因落到 storage，出问题时可以查出来。
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
    void whenNetRulesReady();
    void browser.storage.local.remove('backgroundError');

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
  } catch (error) {
    const detail =
      error instanceof Error
        ? `${error.name}: ${error.message}\n${error.stack ?? ''}`
        : String(error);
    void browser.storage.local.set({ backgroundError: detail });
  }

  /*
   * 客户端与其余协作方。
   *
   * 传进各模块后，它们不认识这些值的来历；入口只负责把它们配好。
   */
  /*
   * 平台。外壳只调工厂，不碰平台的内部实现（read / plan / execute / 处理器）。
   *
   * 将来加第二个平台：再调一次它自己的工厂，把它并进 handlers 与 platforms 清单。
   */
  const mooc = createMoocPlatform({
    shell: {
      runState: async () => {
        const state = await getTaskState();
        return { state, live: liveRunState(state) };
      },
    },
  });

  registerMessageHandler({
    handlers: mooc.handlers,
    platforms: () => [mooc.tasks()],
  });
  registerBackgroundWiring({ platforms: () => [mooc.tasks()] });
});
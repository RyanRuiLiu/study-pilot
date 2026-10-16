/**
 * 扩展后台（Service Worker）。
 *
 * 本文件只做装配：创建平台、注册消息路由与运行状态推送通道。
 * 任务逻辑位于 `src/background/` 与各平台。
 *
 * 运行模型：只有人点按钮时才执行（弹窗的「全部执行」、设置页的「执行」、
 * 命令行的 run）——这里没有任何自动触发，没有闹钟，也没有定时检查。
 * 「此刻能不能开始」与「跑一轮」的流程在 @study-pilot/application
 * （state.ts 是判据，round.ts 是用例）。
 */

import { createRunner, liveRunState } from '@study-pilot/application';
import { createMoocPlatform } from '../src/adapters/mooc/platform.ts';
import { createZhihuishuPlatform } from '../src/adapters/zhihuishu/platform.ts';
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
   * 第二个平台（智慧树）就是这么加进来的：调它的工厂，把它并进
   * handlers 与 platforms 清单。消息类型带 ZHS_ 前缀，与慕课的命令互不相撞；
   * 没人认领的 type 由路由自己回「处理不了」（兜底不挂在任何平台的表上）。
   */
  const mooc = createMoocPlatform({
    host: browserCapabilities,
    config: configStore,
    shell: {
      recordFailure: (message: string) => recordRunFailure(message),
    },
  });

  const zhihuishu = createZhihuishuPlatform({ config: configStore });

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
    // 规则表合并交给载体：智慧树那一份是空的（实测不需要改写，见其 net-rules 注释）
    void whenNetRulesReady([...mooc.wiring.requestRules, ...zhihuishu.wiring.requestRules]);

    // 运行状态的推送通道：页面打开时连上，关掉时自动断开，不需要轮询
    browser.runtime.onConnect.addListener(attachRunStatePort);
  } catch (error) {
    /*
     * 监听器一个都没注册上时，唯一能看见这件事的地方是界面。
     *
     * 生产构建把 console 换成空函数，所以这里不能只打印：失败记进运行状态
     * （记在 shell 名下，页面级状态行在当前平台无失败时会呈现它）。
     */
    void recordRunFailure(error instanceof Error ? error.message : String(error));
  }

  /*
   * 「跑一轮」用例 + 本载体的两个端口实现。
   *
   * 消息路由拿到的是这个 runner：它不认识存储，也不认识平台实例是谁造的。
   * 平台实例每次现建，本轮状态不跨轮残留。范围里的 platformId 决定这一轮
   * 实际用到哪几家（见 application/round.ts）。
   */
  const runner = createRunner({
    platforms: () => [mooc.tasks(), zhihuishu.tasks()],
    tasks: taskStore,
    progress: progressStore,
  });

  /*
   * 处理器合并：两平台的表平权并进来（各自只带自己前缀的键，互不覆盖），
   * 外壳自己的命令（TASK_STATE 等）由这里补——它不属于任何平台。
   */
  registerMessageHandler({
    handlers: {
      ...mooc.handlers,
      ...zhihuishu.handlers,
      TASK_STATE: async (request, sendResponse) => {
        // 协议里 platformId 是必填（messages.ts 的 ShellRequest）；表内的 request 是宽松型，这里按契约收窄
        const { platformId } = request as { platformId: string };
        const state = await getTaskState();
        // 状态按平台独立：判据只问请求点名的那家（界面问谁答谁）
        sendResponse({ state, live: liveRunState(state, platformId) });
      },
    },
    runner,
  });
});

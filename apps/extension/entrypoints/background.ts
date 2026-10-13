/**
 * 扩展后台（Service Worker）。
 *
 * 本文件只做装配：创建客户端、注册消息路由与启动触发。
 * 任务逻辑位于 `src/background/`，配置门禁由任务自身强制。
 *
 * 运行模型：每周指定日的首次浏览器启动时执行一次。判定与进度记录在
 * `src/background/scheduler.ts`，一轮的完整流程在 `src/background/run-tasks.ts`。
 */

import {
  type CoursewareContext,
} from '@study-pilot/platform-mooc';
import { createTextGenerator } from '../src/ai';


import { type Settings } from '../src/settings';


import { ensureAlarm } from '../src/background/runtime/alarms';
import { whenNetRulesReady } from '../src/background/net-rules';


import {
  type InspectCourse,
} from '../src/background/mooc/snapshot';
import { registerMessageHandler } from '../src/background/messages/router';
import { registerBackgroundWiring } from '../src/background/wiring';
import { createPlatformClient, loadSnapshot, refreshCourses } from '../src/background/platform-sync';




/**
 * 课件行为的上下文。
 *
 * 只有一处来源：设置里的 AI 配置。没配齐时 `generateText` 为 undefined，
 * 而讨论单元本来就不会进计划（`isCompletable` 的 `needs:'text'`），
 * 所以这里不做任何替代——真到了执行层而没有生成器，行为会如实返回失败。
 */
function coursewareContext(settings: Settings): CoursewareContext {
  return { generateText: createTextGenerator(settings) };
}

/**
 * 当前勾选参与任务的课程。
 *
 * 只取已勾选且带完整定位信息的：拼跳转地址需要 courseId 与 schoolShortName，
 * 缺了它们的课程能读但点不进去，列出来只会让用户多点一次空链接。
 */
function selectedCourses(settings: Settings): InspectCourse[] {
  return settings.mooc.background.courses
    .filter((course) => course.enabled)
    .map((course) => ({
      termId: course.termId,
      courseId: course.courseId,
      schoolShortName: course.schoolShortName,
      mode: course.mode,
      name: course.name,
    }));
}


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
  const { client, renew } = createPlatformClient();

  /** 执行一轮所需的协作方。传进 run-tasks 后，那边不认识它们的来历。 */
  const runDeps = {
    client,
    renew,
    refreshCourses: () => refreshCourses(client),
    loadSnapshot: (courses: InspectCourse[], userId: number) => loadSnapshot(client, courses, userId),
    selectedCourses,
    coursewareContext,
  };

  registerMessageHandler(runDeps);
  registerBackgroundWiring(runDeps);
});
/**
 * 扩展后台（Service Worker）。
 *
 * 本文件只做装配：创建客户端、注册消息路由与启动触发。
 * 任务逻辑位于 `src/background/`，配置门禁由任务自身强制。
 *
 * 运行模型：每周指定日的首次浏览器启动时执行一次。判定与进度记录在
 * `src/background/scheduler.ts`，一次批次的完整流程在 `src/background/run-tasks.ts`。
 */

import { md5hex } from '@study-pilot/core';
import {
  COURSE_TYPE,
  createMoocClient,
  type CourseType,
  type CoursewareContext,
  currentEvaluatePhase,
  deriveStatus,
  getCourseStructure,
  getCourses,
  getCoursesWithTrace,
  getEvaluationDetail,
  type CourseSummary,
} from '@study-pilot/platform-mooc';
import { createTextGenerator } from '../src/ai';
import {
  ensureSession,
  readToken,
  renewSession,
  SessionExpiredError,
} from '../src/platform/mooc/session';
import { getSettings, updateSettings, watchSettings, type Settings } from '../src/settings';
import {
  NOTIFICATION_PREFIX,
  composeNotice,
  noticeSettingsOf,
  notify,
  notifySample,
} from '../src/background/mooc/reminder';
import { executeActions } from '../src/background/mooc/execute';
import { mergeCourses } from '../src/background/mooc/course-selection';
import { clearAlarm, ensureAlarm, isCheckAlarm } from '../src/background/runtime/alarms';
import { listNetRules, whenNetRulesReady } from '../src/background/net-rules';
import {
  beginRun,
  canStartRun,
  clearAwaitingLogin,
  finishRun,
  getTaskState,
  liveRunState,
  markAwaitingLogin,
  resetState,
  touchRun,
} from '../src/background/runtime/scheduler';
import {
  fetchedToday,
  inspect,
  readSnapshot,
  writeSnapshot,
  type InspectCourse,
  type Snapshot,
} from '../src/background/mooc/snapshot';
import { derivePlan, shouldRefresh } from '../src/background/mooc/task-plan';
import { registerMessageHandler } from '../src/background/messages/router';
import { autoRun } from '../src/background/run-tasks';
import {
  recoveryFailure,
  withSessionRecovery,
} from '../src/background/runtime/session-recovery';
import { toPendingSummary, toUnitDetails } from '../src/background/mooc/to-messages';
import type { BackgroundRequest } from '../src/platform/messaging';


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

    register();
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

  function register(): void {
  /*
   * 平台以 Origin 判定来源，规则未生效时会回这句话。
   * 拿它当作「规则还没挂上网络栈」的信号。
   */
  const ORIGIN_REJECTION = '非法跨域';

  /**
   * 判断响应是不是「规则未生效」导致的回绝。
   *
   * 读的是克隆体，不消耗调用方的响应流。
   * 只在状态码可疑时才读正文，正常响应不付这个代价。
   */
  async function looksLikeOriginRejection(res: Response): Promise<boolean> {
    if (res.status !== 403 && res.status !== 200) return false;
    try {
      const text = await res.clone().text();
      return text.includes(ORIGIN_REJECTION);
    } catch {
      return false;
    }
  }

  const client = createMoocClient({
    /*
     * 出站请求的第一步是确保改写 Origin 的规则已生效。
     *
     * whenNetRulesReady 只保证「规则已提交」，不保证「已挂上网络栈」——
     * updateDynamicRules 是异步提交的。规则还没生效时发出去的请求会带着
     * 扩展自身的 Origin，被平台回「非法跨域请求」。
     * 实测这表现为：装好后第一次读取失败，要手动打开一次 MOOC 页面，
     * 等 service worker 被唤醒、规则真正生效之后才正常。
     *
     * 因此这里再加一层：命中那个回绝就等一拍重发一次。
     * 重发时规则一定已生效，不必猜要等多久——第一次失败本身就是判据。
     */
    fetch: async (input, init) => {
      await whenNetRulesReady();
      const first = await fetch(input, init);
      if (!(await looksLikeOriginRejection(first))) return first;

      await new Promise((resolve) => setTimeout(resolve, 400));
      return fetch(input, init);
    },
    getToken: readToken,
    md5: md5hex,
  });

  /**
   * 会话续期，供各读取路径在见到未登录形态后调用。
   *
   * 返回布尔而不是会话对象：调用点关心的只有「换到没有」，
   * 换到之后一律重新读数据，而不是拿旧对象接着用。
   */
  const renew = async (): Promise<boolean> => (await renewSession()).renewed;



  /**
   * 从平台拉取课程列表并写回配置，保留用户已有的勾选状态。
   *
   * 返回失败原因而不是空数组——把错误吞掉会让前台只能显示一个笼统的失败，
   * 排查时无从下手。
   *
   * 不做任何「多久之内不重复请求」的判断。节流由调用方负责，
   * 而且调用方本来就有更准确的依据：
   *   自动任务走 runBatchIfDue，它按 lastRunDate 判断今天是否已跑过；
   *   主动打开弹窗或设置页则是用户当下想看最新状态，本来就该请求。
   * 在数据层再加一层日期缓存，只是把同一个判断做两遍，
   * 还会出现两处判断不一致的隐患。
   */
  async function refreshCourses(): Promise<
    | { ok: true; courses: CourseSummary[]; byType: unknown }
    | { ok: false; message: string; byType?: unknown }
  > {
    // 两类课程要分别请求再合并：只取一类会漏掉另一类
    const mooc = await getCourses(client, { courseType: COURSE_TYPE.MOOC });
    const spoc = await getCourses(client, { courseType: COURSE_TYPE.SPOC });

    // 逐类型的结果一并回传：出现「课程少了」时能立刻看出缺的是哪一类、
    // 是请求失败还是返回为空。
    const byType = {
      mooc: mooc.ok
        ? { ok: true, count: mooc.value.length, names: mooc.value.map((c) => c.name) }
        : { ok: false, message: `${mooc.error.kind} ${mooc.error.message}` },
      spoc: spoc.ok
        ? { ok: true, count: spoc.value.length, names: spoc.value.map((c) => c.name) }
        : { ok: false, message: `${spoc.error.kind} ${spoc.error.message}` },
    };

    if (!mooc.ok || !spoc.ok) {
      /*
       * 未登录形态必须**抛** SessionExpiredError，不能当返回值交回。
       *
       * withSessionRecovery 靠异常识别「会话死了」；返回值通道它只能读成
       * 正常完成——曾把 auth 失败放在 { ok:false, auth:true } 里交回，
       * 结果编排一次都没有续期，首次失败就报「未登录」，注释里写的
       * 「续期重读」是没发生的。两类课程任一是未登录形态即视为会话
       * 失效：死会话下两类必然都是这个形态；续期后重读再失败的会以
       * 普通失败上报。
       */
      const authLost =
        (!mooc.ok && mooc.error.kind === 'auth') || (!spoc.ok && spoc.error.kind === 'auth');
      if (authLost) throw new SessionExpiredError();

      const message = !mooc.ok ? `MOOC：${byType.mooc.message}` : `SPOC：${byType.spoc.message}`;
      return { ok: false, message, byType };
    }

    const courses = [...mooc.value, ...spoc.value];
    if (courses.length === 0) {
      return { ok: false, message: '两类课程都为空', byType };
    }

    /*
     * 合并时只沿用用户自己做过的勾选，新出现的课程一律不勾。
     * 规则与理由在 `src/background/course-selection.ts`。
     *
     * 写入只带 courses 一条路径，不整份回写。
     *
     * 这里曾经是「读配置 → 发两次网络请求 → 把几秒前读到的那份整体写回」。
     * 那几秒里用户可能刚在设置页拨了开关，或者别的入口改了配置，于是那些
     * 改动被这份旧数据抹掉——不报错，用户看到的是「设置自己变回去了」。
     * 现在合并基准是存储里的当前值（updateSettings），只动 courses。
     */
    const settings = await getSettings();

    await updateSettings({
      mooc: {
        background: {
          courses: mergeCourses(settings.mooc.background.courses, courses),
        },
      },
    });

    return { ok: true, courses, byType };
  }

  /**
   * 浏览器启动时判断是否该执行一次批次。
   *
   * 启动瞬间后台线程仍在初始化，按配置延迟一小段时间再开始，
   * 避免与页面加载争抢网络与 CPU。
   *
   * 未登录时不跳过而是挂起：登录凭证是会话级 cookie，关浏览器即失效，
   * 而触发时机恰是启动那一刻，用户通常还没登录。挂起之后由 cookie 变化
   * 触发补执行，见下方 onChanged。
   */
  /**
   * 拉取平台最新状态并落盘快照。
   *
   * 这是**唯一**更新快照的入口。自动执行与手动打开都走它，因此快照永远
   * 反映最近一次读取——不会出现「弹窗看到的是新数据、启动判断用的是旧数据」。
   *
   * 两个调用时机对它的要求不同，但都通过调用方决定「要不要调」来表达：
   *   自动执行   由 shouldRefresh 决定，可能整轮都不调
   *   手动打开   无条件调，用户明确表达了现在想看
   */
  async function loadSnapshot(courses: InspectCourse[], userId: number): Promise<Snapshot> {
    const snapshot = await inspect(client, courses, userId);
    await writeSnapshot(snapshot);
    return snapshot;
  }

  /*
   * 自动执行一轮：检查、按需执行、提醒。
   *
   * 三步的边界刻意分开，因为它们各自的条件不同：
   *
   *   检查   读快照决定「值不值得拉最新的」。多数启动在这里就结束了，
   *          一个请求都不发——本地快照说没事，且今天已经全量拉过。
   *
   *   拉取   只在这一步才发请求。判断「该做什么」必须基于刚拉回的数据，
   *          不能基于快照：快照里的「未提交」可能你昨天在手机上做了，
   *          而执行是不可逆的，不能拿过期数据去写平台。
   *
   *   执行   计划里有能自动完成的事才做。这是唯一会写平台的地方。
   *
   *   提醒   最后一步报「做完之后还剩什么」。放在执行之后是必须的：
   *          反过来的话，通知刚发出去就可能有几项被自动做掉了。
   */
  /**
   * 自动执行一轮。
   *
   * 三个触发点共用它：浏览器启动、周期 alarm、登录后的补执行。
   * 区别只在启动延迟那一项——alarm 触发时用户已经在用浏览器了，
   * 再延迟没有意义。
   */
  /** 执行一轮所需的协作方。传进 run-tasks 后，那边不认识它们的来历。 */
  const runDeps = {
    client,
    renew,
    refreshCourses,
    loadSnapshot,
    selectedCourses,
    coursewareContext,
  };

  registerMessageHandler({
    client,
    renew,
    refreshCourses,
    loadSnapshot,
    selectedCourses,
    coursewareContext,
  });
  }
});
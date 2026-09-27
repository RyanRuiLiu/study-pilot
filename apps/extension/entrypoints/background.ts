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
  currentEvaluatePhase,
  deriveStatus,
  getCourseStructure,
  getCourses,
  getCoursesWithTrace,
  getEvaluationDetail,
  type CourseSummary,
} from '@study-pilot/platform-mooc';
import { ensureSession, readToken } from '../src/platform/mooc-session';
import { getSettings, saveSettings, watchSettings, type Settings } from '../src/settings';
import {
  NOTIFICATION_ID,
  SAMPLE_NOTIFICATION_ID,
  composeNotice,
  noticeSettingsOf,
  notify,
  notifySample,
} from '../src/background/reminder';
import { executeActions } from '../src/background/execute';
import { mergeCourses } from '../src/background/course-selection';
import { clearAlarm, ensureAlarm, isCheckAlarm } from '../src/background/alarms';
import { listNetRules, whenNetRulesReady } from '../src/background/net-rules';
import {
  beginRun,
  canStartRun,
  clearAwaitingLogin,
  finishRun,
  getTaskState,
  markAwaitingLogin,
  resetState,
} from '../src/background/scheduler';
import {
  fetchedToday,
  inspect,
  readSnapshot,
  writeSnapshot,
  type InspectCourse,
  type Snapshot,
} from '../src/background/snapshot';
import { derivePlan, shouldRefresh } from '../src/background/task-plan';
import { toPendingSummary, toUnitDetails } from '../src/background/to-messages';
import type { BackgroundRequest } from '../src/platform/messaging';

/** 平台的登录凭证 cookie。出现即表示登录成功。 */
const LOGIN_COOKIE = 'NTESSTUDYSI';

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

/**
 * 本地已有快照是否算「今天拉过」。
 *
 * 读失败不当作拉过：否则一次存储异常会让今天再也不会重新拉取，
 * 而用户看不到任何异常——只是所有判断都基于越来越旧的数据。
 */
async function snapshotIsFresh(now: number): Promise<boolean> {
  try {
    return fetchedToday(await readSnapshot(), now);
  } catch {
    return false;
  }
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

    if (!mooc.ok) return { ok: false, message: `MOOC：${byType.mooc.message}` };
    if (!spoc.ok) return { ok: false, message: `SPOC：${byType.spoc.message}` };

    const courses = [...mooc.value, ...spoc.value];
    if (courses.length === 0) {
      return { ok: false, message: '两类课程都为空', byType };
    }

    /*
     * 合并时只沿用用户自己做过的勾选，新出现的课程一律不勾。
     * 规则与理由在 `src/background/course-selection.ts`。
     */
    const settings = await getSettings();

    await saveSettings({
      ...settings,
      mooc: {
        ...settings.mooc,
        background: {
          ...settings.mooc.background,
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
  async function autoRun(reason: 'startup' | 'alarm' | 'login'): Promise<void> {
    const settings = await getSettings();
    if (!settings.enabled) return;

    const state = await getTaskState();
    if (!canStartRun(state)) return;

    const session = await ensureSession();
    if (!session.loggedIn) {
      await markAwaitingLogin();
      return;
    }
    await clearAwaitingLogin();

    const courses = selectedCourses(settings);
    if (courses.length === 0) return;

    /*
     * 启动延迟。
     *
     * 只对浏览器启动生效：它存在的意义是错开启动时的资源争抢。
     * alarm 触发时浏览器早已启动完毕，登录后的补偿执行更是已经晚了一步，
     * 这两种情况下再等只会让它更晚。
     */
    if (reason === 'startup') {
      const delayMs = Math.max(0, settings.mooc.background.schedule.startupDelayMinutes) * 60_000;
      if (delayMs > 0) await new Promise((resolve) => setTimeout(resolve, delayMs));
    }

    const now = Date.now();
    const advanceDays = settings.mooc.background.deadlineReminder.advanceDays;

    // 读快照。读不出来就当作没有，会走拉取分支
    let snapshot: Snapshot | null = null;
    try {
      snapshot = await readSnapshot();
    } catch {
      snapshot = null;
    }

    const fresh = await snapshotIsFresh(now);

    if (!shouldRefresh(snapshot, settings, fresh, now)) {
      /*
       * 不必拉取：快照说没有能自动完成的事，且今天已经全量看过。
       * 用快照出提醒后结束——截止时间一旦发布就不会变，
       * 所以快照里的它是可靠的；而"是否已完成"会变，所以只报未完成的。
       */
      await notify(composeNotice(derivePlan(snapshot!, settings, now), [], noticeSettingsOf(settings), now));
      return;
    }

    await beginRun(now);
    try {
      // 课程列表先刷新：勾选的课程可能变动，而后续读取按它进行
      await refreshCourses().catch(() => undefined);

      const latest = await loadSnapshot(courses, session.userId);

      const plan = derivePlan(latest, settings, now);

      /*
       * 执行并只发一次通知。
       *
       * 结果要与计划一起交给通知：计划是执行之前算的，里面写着「将自动完成」，
       * 而执行之后那些事已经完成了。只用计划组织通知，用户会以为它们还没做；
       * 分两次发（执行后一次、再补一次）则会把同一件事说两遍。
       */
      const results =
        plan.auto.length > 0
          ? await executeActions(
              client,
              plan.auto,
              session.userId,
              settings.mooc.background.autoReview.comment,
            )
          : [];

      await notify(composeNotice(plan, results, noticeSettingsOf(settings), now));
    } finally {
      await finishRun();
    }
  }

  /*
   * 周期检查：安装时建一次。
   *
   * 单独用 onInstalled 而不是只放在启动流程里：装好扩展的那一刻浏览器
   * 不会重启，onStartup 不会触发，如果只在那里建定时器，
   * 用户装完之后得重启一次浏览器才会开始工作。
   */
  browser.runtime.onInstalled.addListener(() => {
    void ensureAlarm();
  });

  /*
   * 总开关变化时同步定时器。
   *
   * 关掉总开关之后不该再有后台活动，包括这个定时空转。
   * autoRun 进来会检查开关并立刻返回，所以空转本身无害；
   * 但一个「已关闭却仍在定时唤醒」的扩展会让用户怀疑它到底停了没有，
   * 而定时器的建与清本来就是一句话的事。
   */
  watchSettings((next) => {
    if (next.enabled) void ensureAlarm();
    else void clearAlarm();
  });

  browser.runtime.onStartup.addListener(() => {
    void ensureAlarm();
    void autoRun('startup').catch((error: unknown) => {
      void browser.storage.local.set({
        backgroundError: error instanceof Error ? error.message : String(error),
      });
    });
  });

  /*
   * 周期检查。
   *
   * 这是「作业刚发布、浏览器正开着」这一情况下唯一的执行时机。
   * 没有它，界面只能说「下次启动浏览器时处理」——而用户会问
   * 做作业不该依赖重启浏览器。
   *
   * 间隔见 alarms.ts。监听器本身不做判断，交给 autoRun：
   * 它自己会看总开关、是否正在执行、有没有登录、以及值不值得拉取。
   */
  browser.alarms.onAlarm.addListener((alarm) => {
    if (!isCheckAlarm(alarm)) return;
    void autoRun('alarm').catch(() => undefined);
  });

  /**
   * 登录后补执行。
   *
   * 只观察 NTESSTUDYSI——它是平台的登录凭证，出现即表示登录成功。
   * 挂起标记不存在时这里不做任何事，因此日常浏览网页不会误触发。
   */
  browser.cookies.onChanged.addListener((change) => {
    if (change.cookie.name !== LOGIN_COOKIE) return;
    if (change.cookie.domain && !change.cookie.domain.includes('icourse163.org')) return;

    void (async () => {
      if (change.removed) return;
      const state = await getTaskState();
      if (!state.awaitingLogin) return;
      await autoRun('login');
    })();
  });

  /*
   * 点击通知直接落到设置页的单元明细。
   *
   * 通知说的就是「哪几项要处理」，点进去自然该看到那份清单，
   * 而不是设置页顶部再自己往下找。
   * openOptionsPage 不接受锚点，只能用 tabs.create 指定完整地址；
   * tabs.create 不需要额外权限。
   */
  browser.notifications.onClicked.addListener((notificationId) => {
    /*
     * 工作总结与示例通知都送到单元明细。
     *
     * 早先这里按 `startsWith('deadline-reminder')` 判断要不要带锚点，
     * 而通知 id 是固定的 `study-pilot-summary`——条件永远为假，
     * 锚点一次都没生效过，用户点通知总是落在设置页顶部。
     *
     * 三类通知的去处现在直接写清楚：
     *   工作总结与示例通知 → 单元明细，用户能对着看是哪一项
     *   示例通知也去这里   → 它展示的就是明细里的内容
     */
    const anchor = notificationId === NOTIFICATION_ID || notificationId === SAMPLE_NOTIFICATION_ID
      ? '#details'
      : '';
    const url = browser.runtime.getURL(`/options.html${anchor}`);
    void browser.tabs.create({ url });
  });

  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    const request = message as BackgroundRequest | undefined;

    void (async () => {
      switch (request?.type) {
        case 'SESSION':
          sendResponse(await ensureSession());
          break;

        case 'COURSES': {
          const settings = await getSettings();
          sendResponse(
            settings.mooc.background.courses.map((course) => ({
              courseId: 0,
              name: course.name,
              termId: course.termId,
              startTime: null,
              endTime: null,
              publishStatus: null,
            })),
          );
          break;
        }

        case 'REFRESH_COURSES': {
          const session = await ensureSession();
          if (!session.loggedIn) {
            sendResponse({ ok: false, reason: 'NOT_LOGGED_IN' });
            break;
          }
          // 主动点「读取课程列表」时总是去平台拿最新的
          const result = await refreshCourses();
          if (!result.ok) {
            // 失败原因必须带回去，否则前台只能显示一个笼统的失败
            sendResponse({ ok: false, reason: 'FETCH_FAILED', message: result.message });
            break;
          }
          sendResponse(
            result.courses.length > 0
              ? { ok: true, courses: result.courses }
              : { ok: false, reason: 'NO_SELECTED_COURSE' },
          );
          break;
        }


        case 'RUN_SCHEDULED_TASKS': {
          /*
           * 手动执行：与自动执行走同一条路径，只是不受「今天拉过没有」约束。
           *
           * 先把状态清干净——用户点这个按钮的意图就是「现在去做」，
           * 不该因为上次被中断的标志而拒绝，也不该沿用挂起状态。
           * 但正在执行的判定要保留：并发起两轮会重复写平台。
           */
          const manualState = await getTaskState();
          if (!canStartRun(manualState)) {
            sendResponse({ ok: false, reason: 'ALREADY_RUNNING' });
            break;
          }

          const manualSession = await ensureSession();
          if (!manualSession.loggedIn) {
            sendResponse({ ok: false, reason: 'NOT_LOGGED_IN' });
            break;
          }

          const manualSettings = await getSettings();
          const manualCourses = selectedCourses(manualSettings);
          if (manualCourses.length === 0) {
            sendResponse({ ok: false, reason: 'NO_SELECTED_COURSE' });
            break;
          }

          const manualNow = Date.now();
          await beginRun(manualNow);
          try {
            await refreshCourses().catch(() => undefined);
            const manualSnapshot = await loadSnapshot(manualCourses, manualSession.userId);
            const manualPlan = derivePlan(manualSnapshot, manualSettings, manualNow);

            if (manualPlan.auto.length === 0) {
              sendResponse({
                ok: true,
                done: 0,
                manual: manualPlan.manual.length,
                message: '没有可自动完成的事项',
              });
              break;
            }

            const results = await executeActions(
              client,
              manualPlan.auto,
              manualSession.userId,
              manualSettings.mooc.background.autoReview.comment,
            );

            const done = results.filter((r) => r.status === 'done').length;
            const failed = results.filter((r) => r.status === 'failed');
            sendResponse({
              ok: true,
              done,
              manual: manualPlan.manual.length,
              failed: failed.map((r) => ({ name: r.name, detail: r.detail })),
            });
          } finally {
            await finishRun();
          }
          break;
        }

        case 'PENDING_SUMMARY': {
          /*
           * 成功与失败必须分开返回。
           *
           * 曾经的做法是「取不到就当作 0」，前台于是显示「暂无待办」——
           * 而真实情况可能是请求被拒。这两种状态对用户的含义完全不同，
           * 混在一起会让问题被掩盖。
           */
          const settingsForPending = await getSettings();
          const pendingSession = await ensureSession();

          /*
           * 未登录时不往下走。
           *
           * 平台的接口以用户为维度，拿 userId = 0 去查得到的是「查不到」
           * 而不是「没登录」，用户看到的就是一句笼统的失败，会以为网络有问题。
           * 这里把它与真正的失败分开，前台据此提示去登录。
           */
          if (!pendingSession.loggedIn) {
            sendResponse({ status: 'error', reason: 'NOT_LOGGED_IN', message: '尚未登录慕课平台' });
            return;
          }

          const coursesForPending = selectedCourses(settingsForPending);

          try {
            /*
             * 用户主动打开弹窗就是「现在想看看有什么要做」。
             * 因此这里无条件拉最新并更新快照——不受「今天是否已拉过」约束。
             * 那条约束只用于浏览器启动时的自动触发，目的是省请求；
             * 用户明确表达了想看，省这一步就违背了他的意图。
             */
            const snapshot = await loadSnapshot(coursesForPending, pendingSession.userId);
            sendResponse({
              status: 'ok',
              value: toPendingSummary(
                derivePlan(snapshot, settingsForPending),
                settingsForPending.mooc.background.schedule.keepOverdueDays,
              ),
            });
          } catch (error) {
            sendResponse({
              status: 'error',
              message: error instanceof Error ? error.message : String(error),
            });
          }
          break;
        }

        /*
     * 发一条示例通知。
     *
     * 桌面通知是否真的送达，不由扩展决定——系统可能把它静音、可能没授予
     * 权限、可能被专注模式挡住。给一个手动入口，用户才能自己确认，
     * 而不是遇到「设了提醒却从没收到过」时只能猜。
     *
     * 内容取自当前账号的真实待办，用与实际检查同一套措辞，
     * 因此看到的就是真正会收到的那种通知。
     */
    case 'NOTIFY_SAMPLE': {
      const [snapshot, settings] = await Promise.all([readSnapshot(), getSettings()]);
      return { ok: true, hasContent: await notifySample(snapshot, settings) };
    }

    case 'UNIT_DETAILS': {
          /*
           * 同样是成功与失败分开：没有任何单元（比如尚未勾选课程）
           * 与「逐个课程读取时出错」是两件事。
           */
          const settings = await getSettings();
          const session = await ensureSession();

          /*
           * 未登录时不往下走。原因与待办汇总相同：拿 userId = 0 去查
           * 得到的是「查不到」，会被当成读取失败，而真实原因是没登录。
           */
          if (!session.loggedIn) {
            sendResponse({ status: 'error', reason: 'NOT_LOGGED_IN', message: '尚未登录慕课平台' });
            return;
          }

          try {
            /*
             * 与待办汇总一样：用户主动打开设置页就是现在想看，
             * 无条件拉最新并更新快照。
             *
             * 这里与待办汇总共用 loadSnapshot，因此打开设置页之后，
             * 快照也是新的 —— 下一次浏览器启动的自动判断会基于它。
             * 若两处各拉各的，就会出现「弹窗看到的是新数据、
             * 启动判断用的是旧数据」这种说不清的状态。
             */
            const snapshot = await loadSnapshot(selectedCourses(settings), session.userId);
            sendResponse({ status: 'ok', value: toUnitDetails(snapshot) });
          } catch (error) {
            sendResponse({
              status: 'error',
              message: error instanceof Error ? error.message : String(error),
            });
          }
          break;
        }

        case 'DIAGNOSE': {
          /*
           * 诊断入口：把后台看到的关键状态一次性返回，便于排查
           * 「接口能通但界面拿不到数据」这类问题。
           *
           * 每一步单独兜底，任一环节异常都不该让整条诊断失效。
           * 两类课程分别取，因为「缺课程」经常只缺其中一类。
           */
          const session = await ensureSession();
          const settings = await getSettings();

          const trace = async (courseType: CourseType) => {
            try {
              const t = await getCoursesWithTrace(client, { courseType });
              const envelope = t.envelope as { result?: unknown[]; pagination?: unknown } | undefined;
              return {
                request: t.request,
                error: t.error ?? null,
                rawCount: t.rawCount ?? null,
                parsedCount: t.parsedCount ?? null,
                hasEnvelope: envelope !== undefined,
                envelopeResultIsArray: Array.isArray(envelope?.result),
                hasPagination: envelope?.pagination !== undefined,
              };
            } catch (error) {
              return { error: `抛出: ${error instanceof Error ? error.message : String(error)}` };
            }
          };

          const [moocTrace, spocTrace] = [await trace(1), await trace(2)];

          let ruleCount: number | string = 0;
          try {
            ruleCount = (await listNetRules()).length;
          } catch (error) {
            ruleCount = `抛出: ${error instanceof Error ? error.message : String(error)}`;
          }

          sendResponse({
            session: {
              loggedIn: session.loggedIn,
              userId: session.userId,
              tokenLength: session.token.length,
            },
            netRules: ruleCount,
            selectedCourses: settings.mooc.background.courses.length,
            mooc: moocTrace,
            spoc: spocTrace,
          });
          break;
        }

        case 'TASK_STATE':
          sendResponse(await getTaskState());
          break;

        case 'RESET_TASK_STATE':
          await resetState();
          sendResponse({ ok: true });
          break;

        default:
          sendResponse(undefined);
      }
    })().catch((error: unknown) => {
      sendResponse({ ok: false, reason: 'NOT_LOGGED_IN', message: String(error) });
    });

    // 异步响应，保持消息通道打开
    return true;
  });
  }
});

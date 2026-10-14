/*
 * 后台的启动装配：安装时建定时器、总开关变化时同步、启动与闹钟触发执行、
 * 以及登录状态变化时的处理。
 *
 * 从 entrypoints/background.ts 移出（它原本在 autoRun 之后）。主体原样搬运，
 * 开头把 deps 解构成同名局部变量。
 */

import { clearAlarm, ensureAlarm, isCheckAlarm } from './runtime/alarms';
import { watchSettings } from '../settings';
import { getTaskState } from './runtime/scheduler';
import type { PlatformTasks, PlatformWiring } from '../platforms/types.ts';
import { autoRun } from './run-tasks.ts';

/**
 * 装配只需要「有哪些平台」与「各平台的信号」。
 * 装配层知道平台清单，调度层与外壳都不认识它们。
 */
export interface WiringDeps {
  platforms: () => PlatformTasks[];
  /** 各平台的信号（登录 cookie、通知前缀）。外壳按清单遍历，不认平台名字 */
  wiring: PlatformWiring[];
}

export function registerBackgroundWiring(deps: WiringDeps): void {
  // 要跑哪些平台由装配层给出（调度层不认识它们）；实例由各平台的工厂现建
  const runOnce = (): Promise<void> => autoRun({ platforms: deps.platforms });
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

  /*
   * 浏览器启动时检查一次。
   *
   * `autoRun` 自己把失败记进运行状态（见 run-tasks.ts），因此这里不需要
   * `.catch`：从前那两个吞掉异常的 catch 是「后台静默失败」的最后一环——
   * 抛出来没人接，接了也不说，用户只能看到「今天什么都没发生」。
   */
  browser.runtime.onStartup.addListener(() => {
    void ensureAlarm();
    void runOnce();
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
    void runOnce();
  });

  /**
   * 登录后补执行。
   *
   * 只观察各平台声明的**登录凭证 cookie**（缺省表示该平台没有这种信号）。
   * 挂起标记不存在时这里不做任何事，因此日常浏览网页不会误触发。
   *
   * 为什么由平台声明而不是外壳写死 cookie 名：名字与"它是不是登录凭证"都是
   * 平台的实测结论，外壳无从判断。慕课这里踩过一次：匿名会话 cookie 在访客
   * 状态下也有，拿它当信号会在没人登录时补跑一轮。
   */
  browser.cookies.onChanged.addListener((change) => {
    const matched = deps.wiring.some((platform) => {
      const expected = platform.loginCookie;
      if (expected === undefined) return false;
      if (change.cookie.name !== expected.name) return false;
      return !change.cookie.domain || change.cookie.domain.includes(expected.domain);
    });
    if (!matched) return;

    void (async () => {
      if (change.removed) return;
      const state = await getTaskState();
      if (!state.awaitingLogin) return;
      await runOnce();
    })();
  });

  /*
   * 点击通知落到主页面。
   *
   * 通知说的就是「哪几项要处理」，点进去自然该看到那份清单。锚点固定 `#overview`：
   * 单元明细已经并进概览的那张表，而概览是主页面的第一个标签——两类通知落同一处，
   * 不需要按通知种类分锚点，外壳也就不需要知道这条通知来自哪个平台
   * （`notificationPrefix` 这个字段因此删掉了）。
   *
   * 早先这里按 `startsWith('deadline-reminder')` 判断要不要带锚点，而通知 id
   * 是固定的 `study-pilot-summary`——条件永远为假，锚点一次都没生效过。
   *
   * openOptionsPage 不接受锚点，只能用 tabs.create 指定完整地址；
   * tabs.create 不需要额外权限。
   */
  browser.notifications.onClicked.addListener(() => {
    void browser.tabs.create({ url: browser.runtime.getURL('/options.html#overview') });
  });

  /*
   * 消息路由在 src/background/messages/router.ts。
   *
   * 传进去的是入口创建的那些东西（客户端、会话续期、快照读取）；
   * 路由本身不认识它们的来历。
   */
}

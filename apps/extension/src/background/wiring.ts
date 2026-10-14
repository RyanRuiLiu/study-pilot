/*
 * 后台的启动装配：安装时建定时器、总开关变化时同步、启动与闹钟触发执行、
 * 以及登录状态变化时的处理。
 *
 * 触发属于载体：什么时候该跑是这里的知识（浏览器启动、定时、登录后补跑）。
 * 「跑一轮」本身不在这里——它是 @study-pilot/application 的 runRound 用例，
 * 装配层把接好端口的 runner 交进来。
 */

import { clearAlarm, ensureAlarm, isCheckAlarm } from './runtime/alarms';
import { watchSettings } from '../settings';
import { getTaskState } from './runtime/task-state';
import type { PlatformWiring } from '@study-pilot/application';

/**
 * 装配需要「跑一轮」这个动作，与「各平台的信号」。
 * 载体不认识平台实例是谁造的，也不认识平台名字。
 */
export interface WiringDeps {
  /** 跑一轮（自动）。返回的结局没人等，失败由用例自己记进状态 */
  runRound: () => Promise<unknown>;
  /** 各平台的信号（登录凭证 cookie）。外壳按清单遍历，不认平台名字 */
  wiring: PlatformWiring[];
}

export function registerBackgroundWiring(deps: WiringDeps): void {
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
   * runRound 进来会检查开关并立刻返回，所以空转本身无害；
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
   * 用例自己把失败记进状态，因此这里不需要 `.catch`：从前那两个吞掉异常的
   * catch 是「后台静默失败」的最后一环——抛出来没人接，接了也不说，
   * 用户只能看到「今天什么都没发生」。
   */
  browser.runtime.onStartup.addListener(() => {
    void ensureAlarm();
    void deps.runRound();
  });

  /*
   * 周期检查。
   *
   * 这是「作业刚发布、浏览器正开着」这一情况下唯一的执行时机。
   * 没有它，界面只能说「下次启动浏览器时处理」——而用户会问
   * 做作业不该依赖重启浏览器。
   *
   * 间隔见 alarms.ts。监听器本身不做判断，交给用例：
   * 它自己会看总开关、是否正在执行、有没有登录。
   */
  browser.alarms.onAlarm.addListener((alarm) => {
    if (!isCheckAlarm(alarm)) return;
    void deps.runRound();
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
      await deps.runRound();
    })();
  });

  /*
   * 消息路由在 src/background/messages/router.ts。它拿到的是同一张处理器表与同一个 runner。
   */
}

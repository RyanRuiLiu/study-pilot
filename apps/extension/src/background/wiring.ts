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
import { NOTIFICATION_PREFIX } from './mooc/reminder';
import { autoRun, type RunDeps } from './run-tasks.ts';
/** 平台的登录凭证 cookie。出现即表示登录成功。 */
const LOGIN_COOKIE = 'NTESSTUDYSI';

/*
 * 装配所需的依赖与 run-tasks 完全一致，因此直接复用它的类型，
 * 不再声明一个空接口——空接口与超类型等价，多一层只会让人以为这里会加东西。
 */
export type WiringDeps = RunDeps;

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
    void autoRun(deps, 'startup').catch((error: unknown) => {
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
    void autoRun(deps, 'alarm').catch(() => undefined);
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
      await autoRun(deps, 'login');
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
     * 判据现在跟着 id 的生成规则走，而不是跟着某一个具体值走：
     * 发送用的 id 每次都不一样（前缀加时间戳，见 reminder.ts），
     * 任何等值比较都会立刻失效——这个坑不能踩第二次。
     */
    const anchor = notificationId.startsWith(NOTIFICATION_PREFIX) ? '#details' : '';
    const url = browser.runtime.getURL(`/options.html${anchor}`);
    void browser.tabs.create({ url });
  });

  /*
   * 消息路由在 src/background/messages/router.ts。
   *
   * 传进去的是入口创建的那些东西（客户端、会话续期、快照读取）；
   * 路由本身不认识它们的来历。
   */
}
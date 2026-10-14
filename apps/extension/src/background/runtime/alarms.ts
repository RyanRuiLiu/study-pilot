/*
 * 周期检查。
 *
 * 后台原先只在浏览器启动时触发，于是「作业刚发布、浏览器正开着」的
 * 情况下没有检查机会。MV3 的 service worker 不能常驻，alarms 是官方
 * 为此提供的定时唤醒机制。
 *
 * 它是检查机会而非请求频率：每轮进来先看有没有可自动完成的项，
 * 多数轮次不发任何请求。间隔由设置给出，见 checkIntervalMinutes。
 *
 * alarm 只在浏览器运行时触发。关闭期间不发请求，重新打开时会立刻
 * 检查一次，把落下的补上。
 */

import { getSettings } from '../../settings';

/** alarm 名称。固定值：名称固定才能让「已装好且间隔正确」这一判据成立。 */
import { KEYS } from '../../keys.ts';

const ALARM_NAME = KEYS.checkAlarm;

/**
 * 确保周期检查已装好，且间隔与设置一致。
 *
 * 只在「没有 alarm」或「间隔变了」时创建。官方文档写明同名再 `create` 会
 * **取消旧的并由新的重新计时**，而这个函数每次后台被唤醒都要调用一次：
 * 一个醒得比检查间隔更频繁的浏览器（打开一次平台页面就是一次）会把这次
 * 检查永远推到下一个周期之后，看起来就像「定时检查不工作」。
 *
 * alarms 是清单里声明过的权限，因此不再包 try/catch：真出错要让人看见，
 * 静默返回等于把「定时检查已经死了」藏起来。
 */
export async function ensureAlarm(): Promise<void> {
  const minutes = (await getSettings()).schedule.checkIntervalMinutes;
  const existing = await browser.alarms.get(ALARM_NAME);
  if (existing?.periodInMinutes === minutes) return;
  browser.alarms.create(ALARM_NAME, { periodInMinutes: minutes });
}

/**
 * 关掉周期检查。
 *
 * 总开关关闭时调用。定时空转本身无害——每轮进来自查一次就返回——
 * 但一个已关闭却仍在定时唤醒的扩展会让人怀疑它到底停了没有。
 */
export async function clearAlarm(): Promise<void> {
  await browser.alarms.clear(ALARM_NAME);
}

/** 这个 alarm 是不是我们的。监听器里用它过滤。 */
export function isCheckAlarm(alarm: { name: string }): boolean {
  return alarm.name === ALARM_NAME;
}

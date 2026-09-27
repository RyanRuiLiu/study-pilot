/*
 * 周期检查。
 *
 * 后台原先只在浏览器启动时触发，于是「作业刚发布、浏览器正开着」的
 * 情况下没有检查机会。MV3 的 service worker 不能常驻，alarms 是官方
 * 为此提供的定时唤醒机制。
 *
 * 它是检查机会而非请求频率：每轮进来先读本地快照判断值不值得拉取，
 * 多数轮次不发任何请求。间隔由设置给出，见 checkIntervalMinutes。
 *
 * alarm 只在浏览器运行时触发。关闭期间不发请求，重新打开时会立刻
 * 检查一次，把落下的补上。
 */

import { getSettings } from '../settings';

/** alarm 名称。固定值，重复创建时先按名字清掉，保证幂等。 */
const ALARM_NAME = 'study-pilot-check';

/**
 * 确保周期检查已安装。
 *
 * 幂等：先清掉同名的再建，因此每次启动与每次改设置都可以调用。
 * 间隔从设置里取，用户改过之后要重建才会生效。
 *
 * 失败时不抛错。装不上只是退回到「仅启动时检查」，功能仍可用，
 * 不该因此让整个后台起不来。
 */
export async function ensureAlarm(): Promise<void> {
  try {
    const settings = await getSettings();
    const minutes = settings.mooc.background.schedule.checkIntervalMinutes;
    await browser.alarms.clear(ALARM_NAME);
    browser.alarms.create(ALARM_NAME, { periodInMinutes: minutes });
  } catch {
    // 缺 alarms 权限时走到这里。不阻断其它功能
  }
}

/**
 * 关掉周期检查。
 *
 * 总开关关闭时调用。定时空转本身无害——每轮进来自查一次就返回——
 * 但一个已关闭却仍在定时唤醒的扩展会让人怀疑它到底停了没有。
 */
export async function clearAlarm(): Promise<void> {
  try {
    await browser.alarms.clear(ALARM_NAME);
  } catch {
    // 同上，不阻断
  }
}

/** 这个 alarm 是不是我们的。监听器里用它过滤。 */
export function isCheckAlarm(alarm: { name: string }): boolean {
  return alarm.name === ALARM_NAME;
}

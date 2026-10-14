/*
 * 调度的配置（app 级）。
 *
 * 原先挂在 `settings.mooc.background.schedule` 下：只有一个平台时放哪儿都无所谓。
 * 但调度是**跨平台**的（触发见 apps/extension/src/background/wiring.ts，用例见
 * packages/application/src/round.ts：什么时候跑、跑哪些平台），
 * 配置跟着平台走会让第二个平台无处安放，也会把「多久检查一次」变成
 * 「慕课多久检查一次」。因此提升到顶层；旧位置由 `normalize` 迁移（版本 3）。
 *
 * 早先还有「只在指定星期几执行」的配置，已经去掉：新作业按天出现，一天一次足够，
 * 而挑星期几会让用户在其余几天什么都等不到，且无从判断原因。
 */

export interface ScheduleSettings {
  /**
   * 运行期间的检查间隔，单位分钟。
   *
   * 这只是「多久去看一眼本地数据」，不是「多久发一次请求」——检查本身不发请求，
   * 是否拉取由另一套判据决定。因此调小它不会让请求变多，只会让「有新作业了」
   * 这件事被发现得更早。
   *
   * 默认 30 分钟：作业按周发布，这个频率已经远高于需要；而浏览器可能一连开很久
   * 不关，没有它就只能等下次启动。可调范围见设置页（最低 5 分钟，浏览器对定时任务
   * 本身有 30 秒下限）。
   */
  checkIntervalMinutes: number;

  /**
   * 已过截止的事项在待办里保留几天。
   *
   * 过期项的作用是让用户知道自己漏了什么，说一次就够。挂太久会攒出几十条
   * 不会被查看的记录，把真正要做的事挤下去。
   *
   * 默认 3 天：够长到不容易漏看，又短到不会累积。
   * 想看更早的可以去看单元明细，那里列全部单元且带得分，不受这个设置影响。
   */
  keepOverdueDays: number;
}

export const DEFAULT_SCHEDULE: ScheduleSettings = {
  checkIntervalMinutes: 30,
  keepOverdueDays: 3,
};

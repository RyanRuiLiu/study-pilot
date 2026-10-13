/*
 * 设置区：schedule。
 *
 * 从 options/main.ts 的 render() 搬出；表达式原样，只在开头取一次配置。
 */

import { row, numberInput, platform, section } from '../ui.ts';
import { bindSetting } from '../settings-write.ts';
import { lastRunHint } from '../session-row.ts';
import { current } from '../state.ts';

export function scheduleSection(): HTMLElement {
  const mooc = current.mooc;
  return section('schedule', '运行时机', '决定后台什么时候检查，以及检查之后什么时候真的去拉取。', [
      platform('检查', '', [
        row(
          '运行期间检查间隔',
          '浏览器开着时每隔多少分钟检查一次。检查只读本地数据、不发请求，调小它不会增加网络负担。可设 5 到 360 分钟',
          numberInput(mooc.background.schedule.checkIntervalMinutes, 5, 360, '分钟', bindSetting<number>('mooc.background.schedule.checkIntervalMinutes')),
        ),
        row(
          '启动延迟',
          '启动后等待多少分钟再开始检查，0 表示立即开始，可设 0 到 30 分钟。运行期间的定时检查不受它影响',
          numberInput(mooc.background.schedule.startupDelayMinutes, 0, 30, '分钟', bindSetting<number>('mooc.background.schedule.startupDelayMinutes')),
        ),
        row('上次运行', '最近一次运行的时间。这一轮无事可做时也计入', lastRunHint()),
      ]),
      platform('过期事项', '', [
        row(
          '保留天数',
          '已过截止的事项在待办里再显示几天，可设 0 到 90 天，0 表示立刻不再显示。它们不影响完成，列在这里是让你知道自己漏了什么',
          numberInput(mooc.background.schedule.keepOverdueDays, 0, 90, '天', bindSetting<number>('mooc.background.schedule.keepOverdueDays')),
        ),
      ]),
    ]);
}
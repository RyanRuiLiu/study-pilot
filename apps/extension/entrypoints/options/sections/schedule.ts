/*
 * 设置区：运行时机（app 级）。
 *
 * 调度是跨平台的：多久检查一次、过期项保留几天，与哪个平台无关。
 * 因此这一节属于外壳，配置也在 `settings` 顶层（见 src/settings/schema/schedule.ts）。
 *
 * 早先这里还有一行「上次运行」：它由慕课的登录行模块提供，而运行时机不是慕课的事。
 * 那个时刻在看板与弹窗里都能看到（「上次读取」），这里不再重复。
 */

import { bindSetting } from '../../../src/settings/page-write.ts';
import { current } from '../../../src/settings/page-state.ts';
import { numberInput, platform, row, section } from '../../../src/ui/form.ts';

export function scheduleSection(): HTMLElement {
  const schedule = current.schedule;

  return section('schedule', '运行时机', '决定后台什么时候检查，以及检查之后什么时候真的去拉取。', [
    platform('检查', '', [
      row(
        '运行期间检查间隔',
        '浏览器开着时每隔多少分钟检查一次。检查只读本地数据、不发请求，调小它不会增加网络负担。可设 5 到 360 分钟',
        numberInput(
          schedule.checkIntervalMinutes,
          5,
          360,
          '分钟',
          bindSetting<number>('schedule.checkIntervalMinutes'),
        ),
      ),
    ]),
    platform('过期事项', '', [
      row(
        '保留天数',
        '已过截止的事项在待办里再显示几天，可设 0 到 90 天，0 表示立刻不再显示。它们不影响完成，列在这里是让你知道自己漏了什么',
        numberInput(
          schedule.keepOverdueDays,
          0,
          90,
          '天',
          bindSetting<number>('schedule.keepOverdueDays'),
        ),
      ),
    ]),
  ]);
}

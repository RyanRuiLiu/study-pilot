/*
 * 设置区：运行时机（外壳级）。
 *
 * 调度是跨平台的：多久检查一次、过期项保留几天，与哪个平台无关。
 * 两项都是官方数字输入框，label 与 help-text 写在控件自己身上。
 */

import { bindSetting } from '../../../src/settings/page-write.ts';
import { current } from '../../../src/settings/page-state.ts';
import { numberInput } from '../../../src/ui/form.ts';
import type { SettingsSection } from '../../../src/platforms/types.ts';

export function scheduleSection(): SettingsSection {
  const schedule = current.schedule;

  return {
    id: 'schedule',
    title: '运行时机',
    description: '决定后台什么时候检查。检查只读本地数据、不发请求，调小间隔不会增加网络负担。',
    controls: [
      numberInput({
        label: '检查间隔',
        help: '浏览器开着时每隔多少分钟检查一次，可设 5 到 360 分钟',
        value: schedule.checkIntervalMinutes,
        min: 5,
        max: 360,
        unit: '分钟',
        onChange: bindSetting<number>('schedule.checkIntervalMinutes'),
      }),
      numberInput({
        label: '过期事项保留天数',
        help: '已过截止的事项在待办里再显示几天，可设 0 到 90 天；0 表示立刻不再显示。它们不影响完成，列在这里是让你知道自己漏了什么',
        value: schedule.keepOverdueDays,
        min: 0,
        max: 90,
        unit: '天',
        onChange: bindSetting<number>('schedule.keepOverdueDays'),
      }),
    ],
  };
}

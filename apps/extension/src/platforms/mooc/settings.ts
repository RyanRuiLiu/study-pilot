/*
 * 慕课在设置页里的分区（设置页半边）。
 *
 * 这三节是慕课自己的说法与开关：账号与课程、自动任务、前台功能。
 * 外壳只负责把它们排进设置页并参与同一套左侧导航，不认识其中任何字段。
 * 配置的读写走 app 层的 src/settings（外壳与平台共用）。
 */

import type { PlatformSettings } from '../types.ts';
import { accountSection } from './settings/account.ts';
import { foregroundSection } from './settings/foreground.ts';
import { syncSessionBadge } from './settings/session-row.ts';
import { tasksSection } from './settings/tasks.ts';

export const moocSettings: PlatformSettings = {
  id: 'mooc',
  name: '中国大学 MOOC',
  render: () => [accountSection(), tasksSection(), foregroundSection()],
  // 登录行由 accountSection 渲染时注册的钩子刷新（外壳只负责喊一声）
  onLoginChanged: () => {
    syncSessionBadge?.();
  },
};

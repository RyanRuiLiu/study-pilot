/*
 * 配置（扩展侧的门）。
 *
 * 形状、默认值、规范化与迁移在 @study-pilot/application（纯逻辑，测试可直接调，
 * 碰不到浏览器）；本文件接上另一半：落到浏览器存储上。
 *
 * 两半合成一个门，是为了调用方只认一个地方——平台适配器、消息处理器、界面
 * 都从这里取配置，不各自去 package 与 storage 里各拼一半。
 */
export type {
  AiSettings,
  MoocSettings,
  ScheduleSettings,
  SelectedCourse,
  Settings,
} from '@study-pilot/application';
export {
  DEFAULT_AI,
  DEFAULT_MOOC,
  DEFAULT_SCHEDULE,
  DEFAULT_SETTINGS,
  SETTINGS_VERSION,
  mergeWithBase,
  normalize,
} from '@study-pilot/application';
export { configStore, getSettings, resetSettings, updateSettings, watchSettings } from './storage.ts';

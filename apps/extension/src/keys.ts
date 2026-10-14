/*
 * 存储键与通知前缀——同一份存储的字符串只在这里写一次。
 *
 * 为什么单独一处：这些字符串是"契约"，改了就得在同一刻改掉所有使用点；
 * 散在六个文件里时，漏改一个的后果是静默的（读到的永远是默认值）。
 * 键的名字带 `study-pilot` 前缀，避免与同域下别的扩展撞车。
 */

export const KEYS = {
  /** 配置（wxt storage 的 local 前缀） */
  settings: 'local:study-pilot-settings',
  /** 最近一次读到的平台快照 */
  snapshot: 'local:study-pilot-snapshot',
  /** 后台任务状态（防重入与挂起标记） */
  taskState: 'study-pilot:task-state',
  /** 运行状态（进度、逐项记录、最近几轮） */
  runState: 'study-pilot:run-state',
  /** 定时检查的闹钟名 */
  checkAlarm: 'study-pilot-check',
  /** 通知 id 的前缀（清旧通知时按它匹配） */
  notificationPrefix: 'study-pilot-',
} as const;

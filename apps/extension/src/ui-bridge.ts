/*
 * 界面唯一的取数入口。
 *
 * ============================ 唯一的约定 ============================
 *
 * 界面（entrypoints/popup、entrypoints/options，将来由设计者重写）**只从本文件取数**：
 * 不 import src/adapters、src/background、src/browser、src/settings。
 *
 * 为什么只有这一条：界面与核心的边界只要靠人记，就一定会漏；写成"唯一入口"之后，
 * 界面换人重写时核心一行都不用动，核心脱离浏览器跑时界面也不用知道。
 *
 * 本文件是"平台中立"的：它只说"要待办 / 要运行状态 / 要设置"，不认识慕课字段。
 * 平台专有的载荷（快照、题库、卷面）由平台自己的消息类型描述，按需从这里透出。
 * ==================================================================
 *
 * 每条都是后台消息或运行状态的薄包装，没有自己的状态、没有缓存、不做二次加工。
 */

import { sendToBackground } from './messages.ts';
import { runNow as runOnce } from './browser/run-once.ts';
import { subscribeRunState } from './browser/run-feed.ts';
import { getSettings, updateSettings } from './settings';

// 视图模型：界面需要认识的就这几个形状
export type { PendingEntry, PendingSummary, UnitDetail } from './messages.ts';
export type { QueryOutcome } from './messages.ts';
export type { Snapshot } from './messages.ts';
export type { CoursewareProgress, CoursewareSummary } from './messages.ts';
export type { RunState } from './messages.ts';
export type { Tone } from './browser/run-once.ts';
export type { Settings } from './settings';

/** 登录状态（是否登录、用户 id、会话令牌）。 */
export function getSession() {
  return sendToBackground({ type: 'SESSION' });
}

/** 已保存的课程列表（不联网）。 */
export function getCourses() {
  return sendToBackground({ type: 'COURSES' });
}

/** 去平台读一次课程列表并写回配置。只读，不改平台上的任何数据。 */
export function refreshCourses() {
  return sendToBackground({ type: 'REFRESH_COURSES' });
}

/** 要交的东西：测验、作业、互评、自评、考试。未登录 / 读取失败如实返回。 */
export function getPending() {
  return sendToBackground({ type: 'PENDING_SUMMARY' });
}

/** 全部单元明细，逐门课从平台读一次。 */
export function getUnitDetails() {
  return sendToBackground({ type: 'UNIT_DETAILS' });
}

/** 课件进度：每门课的已学 / 总数与可做数（只读，供课件区显示）。 */
export function getCourseware() {
  return sendToBackground({ type: 'COURSEWARE_SUMMARY' });
}

/** 后台此刻在不在跑、上一轮记下的失败。 */
export function getTaskState() {
  return sendToBackground({ type: 'TASK_STATE' });
}

/** 运行状态的当前快照。 */
export function getRunState() {
  return sendToBackground({ type: 'RUN_STATE' });
}

/**
 * 立刻执行一轮。
 *
 * 三个回调都由界面决定怎么显示：状态文字、按钮可用性、结束后要不要重读数据。
 * 写入只发生在后台（见 README 的约定），界面只是发起。
 */
export function runNow(
  handlers: {
    setStatus: (text: string, tone: 'idle' | 'busy' | 'error') => void;
    setEnabled: (enabled: boolean) => void;
    /** 结束后要不要重读数据；界面里是同步的一行也允许 */
    refresh: () => void | Promise<void>;
  },
  /** 执行范围：类别、课程与具体条目。课件区给 kinds: ['courseware']；弹窗单条给 ids；不给表示全部 */
  scope?: { kinds?: string[]; group?: string; ids?: string[] },
): Promise<void> {
  return runOnce({ ...handlers, refresh: async () => handlers.refresh() }, scope);
}

/**
 * 请求停止正在执行的一轮：不再发新的写请求，长动作在下一个安全点中断，
 * 正在飞的请求落地即止。返回是否真有在跑的一轮；
 * 发起那一轮的人会照常收到结果（带 stopped 标记）。
 */
export function stopRun() {
  return sendToBackground({ type: 'STOP_RUN' });
}

/** 订阅运行状态推送。返回退订函数。 */
export { subscribeRunState };

/** 平台状态的说法（未提交 / 互评阶段 / …）。界面按它决定显示什么，不自创字符串。 */
export { WORK_STATUS } from './messages.ts';

/** 读配置（含各平台的设置）。 */
export { getSettings };

/** 写配置的某一项，返回写入后的完整配置。 */
export { updateSettings };

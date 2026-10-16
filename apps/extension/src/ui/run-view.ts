/*
 * 运行的「视图语言」：从运行状态快照读出什么在跑，并说成人话。
 *
 * 弹窗与设置页共用这一份——先前各自实现，已经漂移过：「正在执行 x/y」
 * 有好几种拼法，「已停止」的完成数两处算法不同，「正在停止」两处各写各的。
 * 现在读取与措辞收在这里，页面只决定放在哪显示。
 *
 * 两页共享的停止交互协议（顺序固定，展示各页自理）：
 *   点击停止 → 立刻显示「正在停止…」并禁用按钮 → stopRun(platformId)
 *   → 确实停到了（stopped）→ 记下「停过」，收尾时补一句
 *   → 没停到（多半刚好跑完）→ 撤销停止态，整行/整行还原
 *
 * 「谁发起的谁收尾」：本页发起的轮次，收尾文案归 runNow 的结果；
 * 别处发起的，观察者只有在用户于本页按过停止时才补一句，且不与发起方重复。
 */

// 类型从模型源头取，不绕 ui-bridge：ui-bridge 会引到 run-once，而 run-once 要引这里
// （run-once → run-view → ui-bridge → run-once 的环，边界测试 R7 会拦下）
import type { RunState } from '@study-pilot/application';

/** 快照里正在跑的那一项。 */
export interface RunningItem {
  /** 它属于哪门课（PlanItem.group，界面上是课程名） */
  course: string;
  /** 单元/作业名 */
  title: string;
  /** 类别（quiz / … / courseware）。界面按它分流显示：课件类进课件行，待办类进页面运行提示 */
  kind: string;
  finished: number;
  /** 本轮计划要做的项数 */
  total: number;
}

/**
 * 读出某平台正在跑的那一项；该平台没在跑（或还没进到第一项）返回 null。
 *
 * 各平台的课件行必须用这一支：两平台共存后，「courseware」这个类别名两家都在用，
 * 全局取法会把智慧树正在跑的单元画到慕课的课件行上。
 */
export function platformRunningItem(state: RunState | null, platformId: string): RunningItem | null {
  const platform = state?.platforms.find((entry) => entry.id === platformId);
  if (platform === undefined || platform.state !== 'running') return null;
  const item = platform.items.find((entry) => entry.status === 'running');
  if (item === undefined) return null;
  return {
    course: item.course,
    title: item.title,
    kind: item.kind,
    finished: platform.finished,
    total: platform.total,
  };
}

/**
 * 读出正在跑的那一项（不分平台，取第一个有在跑项的）。
 * 页面级的提示用它（「正在执行…」说的是这一页正在发生的事，与谁家的无关）；
 * 按平台归位的显示（各课件行）用 platformRunningItem。
 */
export function runningItem(state: RunState | null): RunningItem | null {
  if (state === null) return null;
  for (const platform of state.platforms) {
    const item = platformRunningItem(state, platform.id);
    if (item !== null) return item;
  }
  return null;
}

/** 进度一句话：「正在执行 3/7 · 第6章 单元作业」。 */
export function progressLine(step: RunningItem): string {
  return `正在执行 ${step.finished}/${step.total} · ${step.title}`;
}

/** 此刻有没有一轮在跑——界面判断「在不在跑」的唯一判据（弹窗与设置页共用）。 */
export function isRunning(state: RunState | null): boolean {
  return state !== null && state.platforms.some((platform) => platform.state === 'running');
}

/** 某平台此刻在不在跑（弹窗状态行与平台卡片按它收窄；平台之间互不影响）。 */
export function isPlatformRunning(state: RunState | null, platformId: string): boolean {
  const platform = state?.platforms.find((entry) => entry.id === platformId);
  return platform !== undefined && platform.state === 'running';
}

/** 进度一句话；有一项在跑就报它（progressLine），还没进到某一项就报到哪算哪。 */
export function progressTextOf(state: RunState | null): string {
  const step = runningItem(state);
  if (step !== null) return progressLine(step);
  const platforms = state?.platforms ?? [];
  const total = platforms.reduce((sum, platform) => sum + platform.total, 0);
  if (total === 0) return '正在执行';
  const finished = platforms.reduce((sum, platform) => sum + platform.finished, 0);
  return `正在执行 ${finished}/${total}`;
}

/** 进度一句话（单平台）：弹窗状态行按当前 tab 的平台收窄时用。 */
export function platformProgressText(state: RunState | null, platformId: string): string {
  const step = platformRunningItem(state, platformId);
  if (step !== null) return progressLine(step);
  const platform = state?.platforms.find((entry) => entry.id === platformId);
  if (platform === undefined || platform.total === 0) return '正在执行';
  return `正在执行 ${platform.finished}/${platform.total}`;
}

/** 「停止」按下后、收尾完成前显示的那句话。 */
export const STOPPING_TEXT = '正在停止…';

/** 停止收尾的一句话；完成数是 0（或数不到）时只说「已停止」。 */
export function stoppedLine(done: number): string {
  return done > 0 ? `已停止：完成 ${done} 项` : '已停止';
}

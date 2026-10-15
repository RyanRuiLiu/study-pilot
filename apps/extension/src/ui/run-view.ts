/*
 * 运行的「视图语言」：从运行状态快照读出什么在跑，并说成人话。
 *
 * 弹窗与设置页共用这一份——先前各自实现，已经漂移过：「正在执行 x/y」
 * 有好几种拼法，「已停止」的完成数两处算法不同，「正在停止」两处各写各的。
 * 现在读取与措辞收在这里，页面只决定放在哪显示。
 *
 * 两页共享的停止交互协议（顺序固定，展示各页自理）：
 *   点击停止 → 立刻显示「正在停止…」并禁用按钮 → stopRun()
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
 * 读出正在跑的那一项；没有项在跑（空闲、或还没进到第一项）返回 null。
 * 多平台时取第一个有在跑项的——当前只有一个平台，到真有第二个再谈怎么汇合。
 */
export function runningItem(state: RunState | null): RunningItem | null {
  if (state === null) return null;
  for (const platform of state.platforms) {
    if (platform.state !== 'running') continue;
    const item = platform.items.find((entry) => entry.status === 'running');
    if (item !== undefined) {
      return {
        course: item.course,
        title: item.title,
        kind: item.kind,
        finished: platform.finished,
        total: platform.total,
      };
    }
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

/** 「停止」按下后、收尾完成前显示的那句话。 */
export const STOPPING_TEXT = '正在停止…';

/** 停止收尾的一句话；完成数是 0（或数不到）时只说「已停止」。 */
export function stoppedLine(done: number): string {
  return done > 0 ? `已停止：完成 ${done} 项` : '已停止';
}

/*
 * 本进程内的一轮认领。
 *
 * 跨进程的持久判据不在这里：`canStartRun` / `liveRunState` 与状态的迁移规则都在
 * @study-pilot/application 的 state.ts（纯函数，可见即可测）。
 *
 * 这一道是同一个 worker 内的同步闸门：「检查标记 → 落标记」之间隔着网络 await，
 * 闹钟、登录变化与手动按钮可以一起穿过那个窗口，然后并发起两轮去写平台。
 * 持久标记防不住同一进程内的并发。
 */

let claimedHere = false;

/** 认领本进程的这一轮。已经被占了就返回 false，调用方直接退出。 */
export function claimRun(): boolean {
  if (claimedHere) return false;
  claimedHere = true;
  return true;
}

/** 释放认领。与 `claimRun` 成对出现在 try/finally 里。 */
export function releaseRun(): void {
  claimedHere = false;
}

/*
 * 「这一刻能不能开始一轮」的判据。
 *
 * 这个文件是纯的：只把一份 TaskState 读成结论，不碰存储、不碰浏览器，
 * 因此可以在 Node 里直接测。持久状态本身在 task-state.ts。
 *
 * 运行模型：**浏览器每次启动时检查一遍**，能做就做，一天至少完整检查一次。
 * MV3 的后台服务工作线程随时可能被回收，因此触发靠 browser.runtime.onStartup，
 * 不靠常驻定时器。
 */

import type { LiveRunState, TaskState } from '../../protocol.ts';

/**
 * 心跳超时。
 *
 * 取两分钟：单个动作（一次接口调用）通常几秒内返回，一轮完整执行里
 * 每一步之前都会刷新心跳，两分钟没动静只能是线程已经不在了。
 * 宁可多等一会儿也不要误报中断——误报会让用户以为扩展坏了。
 */
const HEARTBEAT_TIMEOUT_MS = 120_000;

/**
 * 由持久状态推出「此刻在做什么」。
 *
 * 这是**唯一**的判据：界面不自己拿 `runningSince !== null` 去猜。
 * 曾经弹窗就是这么猜的，于是浏览器被强杀之后，那个残留标记让弹窗一直
 * 显示「正在执行」，而实际什么都不会发生——状态与显示分离，用户无从判断。
 */
export function liveRunState(state: TaskState, now: number = Date.now()): LiveRunState {
  if (state.runningSince === null) {
    return state.awaitingLogin ? 'awaiting-login' : 'idle';
  }

  const beat = state.heartbeatAt ?? state.runningSince;
  return now - beat <= HEARTBEAT_TIMEOUT_MS ? 'running' : 'interrupted';
}

/**
 * 此刻是否可以开始一次自动执行。
 *
 * 只有「确实还在跑」才拦得住。中断的那一轮不算：它的线程早就不在了。
 * 判据曾经写成 `runningSince === null`，于是浏览器被强杀一次之后，那个没人
 * 清的残留标记会把后台永久锁死——每一轮 alarm 静默返回、手动执行永远回
 * ALREADY_RUNNING，而界面还在说「下次检查时接着做」。现在与界面共用
 * `liveRunState` 这一个判据，两边不会对同一份存储各说一套。
 */
export function canStartRun(state: TaskState, now: number = Date.now()): boolean {
  return liveRunState(state, now) !== 'running';
}

/**
 * 本进程内的一轮认领标记。
 *
 * `canStartRun` 看的是跨进程的持久标记，而「检查标记 → 落标记」之间隔着网络
 * await：闹钟、登录变化与手动按钮都在同一个 worker 里，可以一起穿过那个窗口，
 * 然后并发起两轮去写平台。持久标记防不住同一进程内的并发，这里补一道同步的。
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

/*
 * 后台任务的运行状态。
 *
 * 运行模型：**浏览器每次启动时检查一遍**，能做就做，一天至少完整检查一次。
 * MV3 的后台服务工作线程随时可能被回收，因此：
 *   - 触发靠 browser.runtime.onStartup，不靠常驻定时器；
 *   - 状态落盘到 browser.storage.local，不放在内存里。
 *
 * 这里只保留两件事：
 *   runningSince   这一轮的开始时刻（防重入用，不是断点——没做过的事不需要
 *                  「接着」，下一轮检查会重新从快照里看到它们）
 *   awaitingLogin  是否因未登录而挂起，等登录后补一次
 *
 * 早先还记过 lastRunDate、doneTids、pending 三样，现在都不需要了：
 * 执行与否由「快照里有没有可自动完成的项」决定，而快照每次都会更新，
 * 所以「今天跑过没有」不再是一个有意义的判据——它只会让新发布的作业
 * 在当天被跳过。同理，做过哪些也不必记，下一轮检查自然看不到它们。
 *
 * 判定逻辑写成纯函数以便测试。
 */


/** 存储键。集中在此，避免各处硬编码字符串。 */
const STATE_KEY = 'study-pilot:task-state';

/** 跨次运行保留的状态。 */
export interface TaskState {
  /**
   * 正在执行的一轮开始时间。非 null 表示上次运行没有正常结束——
   * 可能是正在跑，也可能是浏览器被强杀后留下的标记，两者要靠心跳区分。
   */
  runningSince: number | null;
  /**
   * 最近一次心跳。
   *
   * 执行线程活着的时候不断刷新它。MV3 的 worker 会被回收、浏览器会被强杀，
   * 那时 runningSince 还留在存储里没人清，而实际已经没有东西在跑了。
   * 只看 runningSince 会把「残留」误报成「正在执行」——用户于是等一个
   * 永远不会结束的动作，界面与事实分离。判据见 liveRunState。
   */
  heartbeatAt: number | null;
  /** 最近一次正常结束的时间 */
  lastFinishedAt: number | null;
  /**
   * 本轮因未登录而挂起，等待登录后补执行。
   *
   * 平台的登录凭证是会话级 cookie，关闭浏览器即失效。
   * 而触发时机恰是「浏览器启动」，那一刻用户通常还没登录，因此不能
   * 简单地跳过——那会让这一次执行机会白等到明天。这里记下挂起标记，
   * 登录后立刻补执行。
   */
  awaitingLogin: boolean;
  /**
   * 上一轮自动执行的失败原因；null 表示没有未交代清楚的失败。
   *
   * 后台一轮跑在 service worker 里，出错时既没有控制台可看（生产构建把 console
   * 换成空函数），也没有弹窗可等。不把这个记下来，「今天什么都没做」与
   * 「今天试了但失败了」在界面上长得一模一样。
   *
   * 一轮正常结束时由 `finishRun` 清掉：失败已经被这一轮的结果取代了。
   */
  lastError: string | null;
}

export const EMPTY_STATE: TaskState = {
  runningSince: null,
  heartbeatAt: null,
  lastFinishedAt: null,
  awaitingLogin: false,
  lastError: null,
};

/**
 * 心跳超时。
 *
 * 取两分钟：单个动作（一次接口调用）通常几秒内返回，一轮完整执行里
 * 每一步之前都会刷新心跳，两分钟没动静只能是线程已经不在了。
 * 宁可多等一会儿也不要误报中断——误报会让用户以为扩展坏了。
 */
const HEARTBEAT_TIMEOUT_MS = 120_000;

/** 后台此刻处于哪种状态。 */
export type LiveRunState = 'idle' | 'running' | 'interrupted' | 'awaiting-login';

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

// ---------- 状态读写 ----------

function storageArea() {
  return browser.storage.local;
}

async function readState(): Promise<TaskState> {
  const raw = await storageArea().get(STATE_KEY);
  return { ...EMPTY_STATE, ...((raw[STATE_KEY] as Partial<TaskState> | undefined) ?? {}) };
}

async function writeState(state: TaskState): Promise<void> {
  await storageArea().set({ [STATE_KEY]: state });
}

export async function getTaskState(): Promise<TaskState> {
  return readState();
}


/** 标记本轮开始。同时落下第一次心跳。 */
export async function beginRun(now: number = Date.now()): Promise<void> {
  const state = await readState();
  await writeState({ ...state, runningSince: now, heartbeatAt: now });
}

/**
 * 刷新心跳。执行过程中每一步之前调用，说明这一轮还活着。
 *
 * 已经结束的轮次不再续：一个迟到的回调不该把一个中断的标记又写活。
 */
export async function touchRun(now: number = Date.now()): Promise<void> {
  const state = await readState();
  if (state.runningSince === null) return;
  await writeState({ ...state, heartbeatAt: now });
}

/** 标记本轮结束。心跳一并清掉，免得下一轮被读成「还在跑」。 */
export async function finishRun(now: number = Date.now()): Promise<void> {
  const state = await readState();
  await writeState({
    ...state,
    runningSince: null,
    heartbeatAt: null,
    lastFinishedAt: now,
    awaitingLogin: false,
    // 这一轮正常结束了：上一轮的失败已经被它取代
    lastError: null,
  });
}

/**
 * 记下这一轮的失败原因。
 *
 * 自动执行跑在 service worker 里：没有可看的控制台（生产构建把 console 换成
 * 空函数），也没有正在等的界面。不记下来的话，「今天什么都没做」与
 * 「试了但失败了」在界面上完全一样，而后者用户本来可以当场处理
 * （重新登录、去设置里补地址）。
 */
export async function recordRunFailure(message: string, now: number = Date.now()): Promise<void> {
  const state = await readState();
  await writeState({ ...state, lastError: message, lastFinishedAt: now });
}

/** 标记本轮因未登录而挂起。 */
export async function markAwaitingLogin(): Promise<void> {
  const state = await readState();
  await writeState({ ...state, awaitingLogin: true });
}

/** 清除挂起标记。 */
export async function clearAwaitingLogin(): Promise<void> {
  const state = await readState();
  if (!state.awaitingLogin) return;
  await writeState({ ...state, awaitingLogin: false });
}
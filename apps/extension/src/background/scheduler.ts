/*
 * 后台任务的运行状态。
 *
 * 运行模型：**浏览器每次启动时检查一遍**，能做就做，一天至少完整检查一次。
 * MV3 的后台服务工作线程随时可能被回收，因此：
 *   - 触发靠 browser.runtime.onStartup，不靠常驻定时器；
 *   - 状态落盘到 browser.storage.local，不放在内存里。
 *
 * 这里只保留两件事：
 *   runningSince   上次执行是否还没结束（防重入，也是断点）
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
   * 正在执行的批次开始时间。非 null 表示上次运行没有正常结束——
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
}

export const EMPTY_STATE: TaskState = {
  runningSince: null,
  heartbeatAt: null,
  lastFinishedAt: null,
  awaitingLogin: false,
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

/** 本地日期键，格式 YYYY-MM-DD。按本地时区计算，跨时区不适用。 */
export function dateKey(now: number = Date.now()): string {
  const date = new Date(now);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** 把执行状态描述成可读文本，用于设置页。 */
export function describeRunState(state: TaskState, now: number = Date.now()): string {
  if (state.runningSince !== null) return '上次运行未结束，下次检查时接着完成';
  if (state.awaitingLogin) return '等待登录，登录后接着完成';
  if (state.lastFinishedAt === null) return '尚未执行过';

  /*
   * 说「上次运行」，不说「上次执行」或「已检查」。
   *
   * 「执行」在本项目里特指写平台那一步，而这里记的是整轮流程结束的时刻——
   * 多数轮次只做了检查、什么都没执行。用「执行」会让人以为平台上发生过什么。
   * 「检查」也不准，它只是整轮的第一步。
   *
   * 「运行」不指向其中任何一步，正好说明它是一整轮。
   *
   * 具体时刻精确到分钟：流程由浏览器启动与定时器触发，两次之间相隔多久
   * 取决于用户怎么用浏览器，因此这个时刻是有信息量的。
   */
  const time = new Date(state.lastFinishedAt);
  const hh = String(time.getHours()).padStart(2, '0');
  const mm = String(time.getMinutes()).padStart(2, '0');

  if (dateKey(state.lastFinishedAt) === dateKey(now)) {
    return `上次运行：今天 ${hh}:${mm}`;
  }

  return `上次运行：${time.getMonth() + 1}月${time.getDate()}日 ${hh}:${mm}`;
}

/**
 * 此刻是否可以开始一次自动执行。
 *
 * 只有一种情况不允许：上一轮还没结束。那说明浏览器在此期间被关掉过，
 * 此时应当接着做，而不是并发再起一轮。
 */
export function canStartRun(state: TaskState): boolean {
  return state.runningSince === null;
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

export async function resetState(): Promise<void> {
  await writeState(EMPTY_STATE);
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
  });
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

/** 本地星期，0 是周日，6 是周六。 */
export function weekday(now: number = Date.now()): number {
  return new Date(now).getDay();
}

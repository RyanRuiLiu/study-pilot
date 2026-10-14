/*
 * 运行状态：每个平台一条独立运行槽、逐项记录、最近几轮历史。
 *
 * 与 scheduler.ts 的分工
 * ---------------------
 * scheduler 只管一件事：这一轮能不能开始（防重入与中断判定）。它不描述进度。
 * 本文件管另一件事：**此刻每个平台在做什么、做到第几项、上一轮结果如何**，
 * 供界面显示。两者不重叠：一个决定要不要跑，一个说明跑成什么样。
 *
 * 为什么按平台分槽
 * ----------------
 * 各平台的执行互不干扰（各自的会话、各自的节流器）。汇成一条总进度会说谎：
 * A 平台跑完、B 平台才开始时，总进度会倒退。因此每个平台一条槽，
 * 界面按平台各显示一张卡，顶部只给一句「几个平台在跑」的聚合。
 *
 * 谁能写、谁能读
 * --------------
 * 只有执行面（run-tasks.ts）写；界面只读，并且不自己从别的字段推断状态。
 * 每次变化都同时做两件事：落盘（新打开的页面拿得到）与推送（已打开的页面即时更新）。
 */

/*
 * 界面端口。@wxt-dev/browser 没有导出可用的端口类型名，而这里只用到两个成员，
 * 因此按结构声明：比硬凑一个命名空间路径更准，也不随浏览器类型包版本失效。
 */
interface RunStatePort {
  /** 端口名。界面按 'run-state' 连接，这里用它过滤掉别的端口 */
  name: string;
  postMessage(message: unknown): void;
  onDisconnect: { addListener(listener: () => void): void };
}

/** 存储键。集中在此，避免各处硬编码字符串。 */
const KEY = 'study-pilot:run-state';

/** 逐项记录的一条。`running` 表示正在进行，其余都是终态。 */
type RunItemStatus = 'running' | 'done' | 'skipped' | 'failed';

interface RunItem {
  /** 所属平台，用于按平台分卡 */
  platformId: string;
  /** 课程名。界面按「课程 · 项目」显示，不让用户去猜 tid */
  course: string;
  title: string;
  status: RunItemStatus;
  /** 结果说明，来自执行面，原样显示不改写 */
  detail: string;
  at: number;
}

/** 一个平台此刻的运行状态。 */
interface PlatformRun {
  id: string;
  name: string;
  /** idle 空闲 · running 正在执行 · stopping 已请求停止，等当前项做完 */
  state: 'idle' | 'running' | 'stopping';
  startedAt: number | null;
  /** 本轮计划要做的项数与已做完的项数 */
  total: number;
  finished: number;
  /** 正在做的那一项；空闲时为 null */
  current: string | null;
  /** 本轮已完成的逐项记录，界面直接列出来 */
  items: RunItem[];
}

/** 一轮结束后留下的摘要。只存计数与摘要，不存逐项记录（那些在 items 里）。 */
interface RunRound {
  platformId: string;
  platformName: string;
  startedAt: number;
  finishedAt: number;
  done: number;
  skipped: number;
  failed: number;
  /** 失败摘要：第一条失败的原因，没有失败时为空串 */
  note: string;
  /** 这一轮是不是被停止的 */
  stopped: boolean;
}

/** 界面读的那一份运行状态快照。`PlatformRun.items` 等类型随它一起交出去。 */
export interface RunState {
  platforms: PlatformRun[];
  history: RunRound[];
}

/** 历史保留的轮数。有上限，不然存储会一直长。 */
const HISTORY_LIMIT = 20;

/** 空状态。首次运行与「这个平台还没跑过」都用它。 */
const EMPTY_RUN_STATE: RunState = { platforms: [], history: [] };

/** 一个平台没跑过时的样子。 */
function idlePlatform(id: string, name: string): PlatformRun {
  return { id, name, state: 'idle', startedAt: null, total: 0, finished: 0, current: null, items: [] };
}

async function read(): Promise<RunState> {
  const raw = await browser.storage.local.get(KEY);
  const stored = raw[KEY] as Partial<RunState> | undefined;
  return stored ? { ...EMPTY_RUN_STATE, ...stored } : { ...EMPTY_RUN_STATE };
}

/*
 * 已连接的页面。端口由界面在打开时建立、关闭时自动断开，
 * 因此这里不需要定时器，也不需要轮询。
 */
const ports = new Set<RunStatePort>();

import { RUN_STATE_PORT } from '../../protocol.ts';

/** 落盘并推送。每个变更函数都以它收尾，保证「看到的」与「存下的」是同一份。 */
async function publish(state: RunState): Promise<void> {
  await browser.storage.local.set({ [KEY]: state });
  for (const port of ports) port.postMessage(state);
}

/** 供界面取当前状态（端口建立时先回一份，之后靠推送）。 */
export async function getRunState(): Promise<RunState> {
  return await read();
}

/** 接上界面端口：先回一份现状，之后每次变化都推。 */
export function attachRunStatePort(port: RunStatePort): void {
  if (port.name !== RUN_STATE_PORT) return;
  ports.add(port);
  port.onDisconnect.addListener(() => {
    ports.delete(port);
  });
  void getRunState().then((state) => port.postMessage(state));
}

/** 把某个平台换成给定状态，其余平台保持原样。 */
async function withPlatform(next: PlatformRun): Promise<void> {
  const state = await read();
  const others = state.platforms.filter((p) => p.id !== next.id);
  await publish({ ...state, platforms: [...others, next] });
}

/** 开始一个平台的一轮：总数先落定，界面立刻能显示「0 / 7」。 */
export async function beginPlatform(id: string, name: string, total: number, now: number): Promise<void> {
  await withPlatform({ id, name, state: 'running', startedAt: now, total, finished: 0, current: null, items: [] });
}

/** 当前项变了：先记上一条的终态，再写下正在做的这一条。 */
export async function enterItem(id: string, name: string, item: { course: string; title: string }, now: number): Promise<void> {
  const state = await read();
  const run = state.platforms.find((p) => p.id === id) ?? idlePlatform(id, name);
  const settled = run.items.map((entry) => (entry.status === 'running' ? { ...entry, status: 'skipped' as const, detail: '未记录到结果' } : entry));
  await withPlatform({
    ...run,
    current: item.title,
    items: [...settled, { platformId: id, course: item.course, title: item.title, status: 'running', detail: '', at: now }],
  });
}

/** 一项做完：把那条 running 换成终态，并把计数加一。 */
export async function completeItem(id: string, name: string, item: { course: string; title: string }, status: Exclude<RunItemStatus, 'running'>, detail: string, now: number): Promise<void> {
  const state = await read();
  const run = state.platforms.find((p) => p.id === id) ?? idlePlatform(id, name);
  const entry: RunItem = { platformId: id, course: item.course, title: item.title, status, detail, at: now };
  const withoutCurrent = run.items.filter((existing) => existing.title !== item.title || existing.status !== 'running');
  await withPlatform({ ...run, current: null, finished: run.finished + 1, items: [...withoutCurrent, entry] });
}

/**
 * 一个平台跑完，落一条历史。
 *
 * 计数由调用方给（它手里就有全部结局），本模块不重复数一遍——
 * 同一件事在两处各数一次，就是以后对不上的开始。
 */
export async function finishPlatform(id: string, name: string, counts: { done: number; skipped: number; failed: number; note: string; stopped: boolean }, now: number): Promise<void> {
  const state = await read();
  const run = state.platforms.find((p) => p.id === id) ?? idlePlatform(id, name);
  const round: RunRound = {
    platformId: id,
    platformName: name,
    startedAt: run.startedAt ?? now,
    finishedAt: now,
    done: counts.done,
    skipped: counts.skipped,
    failed: counts.failed,
    note: counts.note,
    stopped: counts.stopped,
  };
  await publish({
    ...state,
    platforms: [...state.platforms.filter((p) => p.id !== id), idlePlatform(id, name)],
    history: [round, ...state.history].slice(0, HISTORY_LIMIT),
  });
}

/*
 * 停止：只记一个请求标记，由执行循环在**两项之间**去查。
 * 不在一项中间掐断——那会留下「卷已开、答案没交」这种半提交状态，
 * 而账号上的成绩是不可撤销的。
 */
const stopRequests = new Set<string>();

export async function requestStop(id: string): Promise<void> {
  stopRequests.add(id);
  const state = await read();
  const run = state.platforms.find((p) => p.id === id);
  if (run && run.state === 'running') await withPlatform({ ...run, state: 'stopping' });
}

export function isStopRequested(id: string): boolean {
  return stopRequests.has(id);
}

/** 一项做完后回收标记；返回是否确实收到过停止请求。 */
export function takeStopRequest(id: string): boolean {
  const had = stopRequests.has(id);
  stopRequests.delete(id);
  return had;
}

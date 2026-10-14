/*
 * 执行进度的存取与推送（载体侧）。
 *
 * 每一步该记什么在 @study-pilot/application 的 progress.ts（纯函数）。这里只有：
 *   1. 实现 ProgressPort：读一份、写一份并推给已打开的页面；
 *   2. 接界面端口（谁在看就推给谁）；
 *   3. 留几个顺手方法，供执行面按顺序调用。
 *
 * 界面端口用结构声明：@wxt-dev/browser 没有导出可用的端口类型名，而这里只用到
 * 两个成员，按结构声明比硬凑一个命名空间路径更准。
 */
interface RunStatePort {
  /** 端口名。界面按 'run-state' 连接，这里用它过滤掉别的端口 */
  name: string;
  postMessage(message: unknown): void;
  onDisconnect: { addListener(listener: () => void): void };
}

import {
  EMPTY_PROGRESS,
  beginPlatform as migrateBeginPlatform,
  completeItem as migrateCompleteItem,
  enterItem as migrateEnterItem,
  finishPlatform as migrateFinishPlatform,
  type ProgressPort,
  type RunItemStatus,
  type RunState,
} from '@study-pilot/application';
import { KEYS } from '../../keys.ts';
import { RUN_STATE_PORT } from '../../protocol.ts';

const KEY = KEYS.runState;

async function read(): Promise<RunState> {
  const raw = await browser.storage.local.get(KEY);
  const stored = raw[KEY] as Partial<RunState> | undefined;
  return stored ? { ...EMPTY_PROGRESS, ...stored } : { ...EMPTY_PROGRESS };
}

/*
 * 已连接的页面。端口由界面在打开时建立、关闭时自动断开，
 * 因此这里不需要定时器，也不需要轮询。
 */
const ports = new Set<RunStatePort>();

/** 落盘并推送。每个变更函数都以它收尾，保证「看到的」与「存下的」是同一份。 */
async function publish(state: RunState): Promise<void> {
  await browser.storage.local.set({ [KEY]: state });
  for (const port of ports) port.postMessage(state);
}

/** 进度端口：应用层与厂商适配器通过它读写，不直接碰存储。 */
export const progressStore: ProgressPort = { snapshot: read, publish };

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

/** 开始一个平台的一轮：总数先落定，界面立刻能显示「0 / 7」。 */
export async function beginPlatform(id: string, name: string, total: number, now: number): Promise<void> {
  await publish(migrateBeginPlatform(await read(), { id, name }, total, now));
}

/** 当前项变了：先记上一条的终态，再写下正在做的这一条。 */
export async function enterItem(
  id: string,
  name: string,
  item: { course: string; title: string },
  now: number,
): Promise<void> {
  await publish(migrateEnterItem(await read(), { id, name }, item, now));
}

/** 一项做完：把那条 running 换成终态，并把计数加一。 */
export async function completeItem(
  id: string,
  name: string,
  item: { course: string; title: string },
  status: Exclude<RunItemStatus, 'running'>,
  detail: string,
  now: number,
): Promise<void> {
  await publish(migrateCompleteItem(await read(), { id, name }, item, status, detail, now));
}

/** 一个平台跑完：换回空闲。 */
export async function finishPlatform(id: string, name: string): Promise<void> {
  await publish(migrateFinishPlatform(await read(), { id, name }));
}

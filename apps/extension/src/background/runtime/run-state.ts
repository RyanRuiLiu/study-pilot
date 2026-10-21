/*
 * 执行进度的存取与推送（载体侧）。
 *
 * 每一步该记什么在 @study-pilot/application 的 progress.ts（纯函数）。这里只有：
 *   1. 实现 ProgressPort：读一份、写一份并推给已打开的页面；
 *   2. 接界面端口（谁在看就推给谁）；
 *   3. 给界面留一个读口（端口建立时先回一份）。
 *
 * 界面端口用结构声明：@wxt-dev/browser 没有导出可用的端口类型名，而这里只用到
 * 两个成员，按结构声明比硬凑一个命名空间路径更准。
 */

import { EMPTY_PROGRESS, type ProgressPort, type RunState } from '@study-pilot/application';
import { KEYS } from '../../keys.ts';
import { RUN_STATE_PORT } from '../../protocol.ts';

interface RunStatePort {
  /** 端口名。界面按 'run-state' 连接，这里用它过滤掉别的端口 */
  name: string;
  postMessage(message: unknown): void;
  onDisconnect: { addListener(listener: () => void): void };
}

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

/**
 * 推一份给某个页面。页面恰好在推送这一刻关掉时 postMessage 会抛：
 * 丢掉这个端口即可——让异常穿出去会打断正在跑的那一轮（用户看到「执行失败」，
 * 真正原因只是有个标签页关了）。
 */
function push(port: RunStatePort, state: RunState): void {
  try {
    port.postMessage(state);
  } catch {
    ports.delete(port);
  }
}

/** 落盘并推送。应用层每变一次都经过它，保证「看到的」与「存下的」是同一份。 */
async function publish(state: RunState): Promise<void> {
  await browser.storage.local.set({ [KEY]: state });
  for (const port of ports) push(port, state);
}

/** 进度端口：应用层通过它读写，不直接碰存储。 */
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
  // 存储读失败（后台刚启动、存储不可用）时只是这一份快照没送到；
  // 之后的 publish 仍会推。不让它落成 service worker 里的未处理拒绝。
  void getRunState()
    .then((state) => push(port, state))
    .catch(() => undefined);
}

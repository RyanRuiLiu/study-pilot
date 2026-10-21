/*
 * 运行状态的订阅（页面侧共用）。
 *
 * 弹窗与主页面都读这一份：两处各自连一条端口的话，同一个变化会推两遍，
 * 而两边的取数时机不同，看到的就不是同一份快照。
 *
 * 只有一个来源：与后台建立 `run-state` 长连接，后台每次状态变化推一份完整快照过来。
 * 弹窗状态行与设置页的进度卡都读它，因此两处看到的永远是同一份数据，
 * 不存在一边在跑一边显示空闲。
 *
 * 不轮询：轮询要么慢（间隔内看不到变化），要么费（每秒读一次存储），
 * 而端口天生就是「有变化才说话」，页面关掉连接自动断，不需要清理定时器。
 */

import { RUN_STATE_PORT, type RunState } from '../messages.ts';

type Listener = (state: RunState) => void;

const listeners = new Set<Listener>();
let latest: RunState | null = null;
let port: ReturnType<typeof browser.runtime.connect> | null = null;

/** 建立（或复用）那条连接。第一个订阅者触发，之后大家都读同一份快照。 */
function ensurePort(): void {
  if (port !== null) return;
  port = browser.runtime.connect({ name: RUN_STATE_PORT });
  port.onMessage.addListener((message: unknown) => {
    latest = message as RunState;
    for (const listener of listeners) listener(latest);
  });
  // 后台被回收时连接会断；页面还开着就立刻重连（页面开着意味着要跟随状态），
  // 界面不会停在旧值上。断线重连不做延迟：再多一层退避只会让状态更新晚一拍。
  port.onDisconnect.addListener(() => {
    port = null;
    if (listeners.size > 0) ensurePort();
  });
}

/** 订阅运行状态，返回取消订阅。当前快照会立刻回一次，避免界面先空一下。 */
export function subscribeRunState(listener: Listener): () => void {
  listeners.add(listener);
  ensurePort();
  if (latest !== null) listener(latest);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && port !== null) {
      port.disconnect();
      port = null;
    }
  };
}

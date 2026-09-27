/**
 * 最小 Chrome DevTools Protocol 客户端。
 *
 * 零依赖：Node 22+ 自带 fetch 与全局 WebSocket，不需要 puppeteer/playwright。
 * 目的：让「探测真实网页」成为可复现的脚本，而不是一次性手工操作。
 *
 * 典型用法见 collect.mjs。
 */

const DEFAULT_PORT = 9222;

/** 浏览器级 HTTP 端点（/json/version、/json/list …）。 */
export async function fetchJson(path, { port = DEFAULT_PORT, timeoutMs = 8000 } = {}) {
  const res = await fetch(`http://127.0.0.1:${port}${path}`, {
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!res.ok) throw new Error(`CDP ${path} -> HTTP ${res.status}`);
  return res.json();
}

/** 列出全部可调试 target。 */
export function listTargets(opts) {
  return fetchJson('/json/list', opts);
}

/** 浏览器版本信息（含 webSocketDebuggerUrl）。 */
export function browserVersion(opts) {
  return fetchJson('/json/version', opts);
}

/** 轮询等待 CDP 端口就绪。 */
export async function waitForCdp({ port = DEFAULT_PORT, timeoutMs = 30000 } = {}) {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    try {
      return await browserVersion({ port, timeoutMs: 2000 });
    } catch {
      if (Date.now() > deadline) throw new Error(`CDP 端口 ${port} 在 ${timeoutMs}ms 内未就绪`);
      await new Promise((r) => setTimeout(r, 300));
    }
  }
}

/** 新建一个 about:blank 页面并返回其 target。 */
export async function newPageTarget({ port = DEFAULT_PORT } = {}) {
  const res = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' });
  if (!res.ok) throw new Error(`新建页面失败：HTTP ${res.status}`);
  return res.json();
}

/** 关闭 target。 */
export async function closeTarget(id, { port = DEFAULT_PORT } = {}) {
  await fetch(`http://127.0.0.1:${port}/json/close/${id}`, { method: 'PUT' }).catch(() => undefined);
}

/** 一条 CDP 会话（直连某个 page target 的 WebSocket）。 */
export class Session {
  #ws;
  #nextId = 0;
  #pending = new Map();
  #listeners = new Map();

  constructor(ws) {
    this.#ws = ws;
    ws.addEventListener('message', (ev) => this.#dispatch(ev.data));
  }

  /** 连接一个 target 的 webSocketDebuggerUrl。 */
  static async open(wsUrl) {
    const ws = new WebSocket(wsUrl);
    await new Promise((resolve, reject) => {
      ws.addEventListener('open', resolve, { once: true });
      ws.addEventListener('error', () => reject(new Error(`WebSocket 连接失败：${wsUrl}`)), {
        once: true,
      });
    });
    return new Session(ws);
  }

  /** 发送命令并等待结果。 */
  send(method, params = {}) {
    return this.#sendWith(++this.#nextId, method, params, undefined);
  }

  /**
   * 向一个已附加的子 target 发送命令。
   *
   * 需要先开启 Target.setAutoAttach（flatten: true）。用于在 service worker
   * 启动前就接管它，从而捕获启动异常——MV3 的 worker 崩溃后不会留下痕迹，
   * 只看它有没有注册监听器无法定位原因。
   */
  sendToTarget(sessionId, method, params = {}) {
    return this.#sendWith(++this.#nextId, method, params, sessionId);
  }

  #sendWith(id, method, params, sessionId) {
    return new Promise((resolve, reject) => {
      this.#pending.set(id, { resolve, reject });
      const payload = { id, method, params };
      if (sessionId) payload.sessionId = sessionId;
      try {
        this.#ws.send(JSON.stringify(payload));
      } catch (e) {
        this.#pending.delete(id);
        reject(e);
      }
    });
  }

  /** 订阅事件。返回取消订阅函数。 */
  on(event, handler) {
    if (!this.#listeners.has(event)) this.#listeners.set(event, new Set());
    this.#listeners.get(event).add(handler);
    return () => this.#listeners.get(event)?.delete(handler);
  }

  /** 订阅某个子 target 的事件。事件名形如 `${sessionId}:Runtime.exceptionThrown`。 */
  onTarget(sessionId, event, handler) {
    return this.on(`${sessionId}:${event}`, handler);
  }

  /** 等待某个事件首次到达（可带超时）。 */
  once(event, timeoutMs = 30000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        off();
        reject(new Error(`等待事件 ${event} 超时（${timeoutMs}ms）`));
      }, timeoutMs);
      const off = this.on(event, (params) => {
        clearTimeout(timer);
        off();
        resolve(params);
      });
    });
  }

  #dispatch(raw) {
    let msg;
    try {
      msg = JSON.parse(raw);
    } catch {
      return;
    }
    if (msg.id != null) {
      const slot = this.#pending.get(msg.id);
      if (!slot) return;
      this.#pending.delete(msg.id);
      if (msg.error) slot.reject(new Error(`${msg.error.message} (code ${msg.error.code})`));
      else slot.resolve(msg.result);
      return;
    }
    // flatten 模式下，附加到子 target 的事件带 sessionId，按 `sessionId:method` 分发
    const method = msg.sessionId ? `${msg.sessionId}:${msg.method}` : msg.method;
    const set = this.#listeners.get(method);
    if (!set) return;
    for (const handler of set) {
      try {
        handler(msg.params);
      } catch {
        // 单个订阅者报错不应影响其它订阅者
      }
    }
  }

  close() {
    try {
      this.#ws.close();
    } catch {
      // 忽略关闭异常
    }
  }
}

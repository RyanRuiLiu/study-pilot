/**
 * 出站请求节流。
 *
 * 平台对请求频率有限制，且**限制是全站统一的**，不按接口分散：
 * 平台自身的读请求（`.rpc`）与写请求（`.dwr`）共享同一条配额。
 * 因此所有出站请求必须走同一个节流器实例，不能各模块自己建一个。
 *
 * 间隔取 200ms、并发取 1，依据是**慕课**的实测：
 *
 * | 间隔 | 连续 5 次的结果 |
 * |---|---|
 * | 0ms | 2/5 成功 |
 * | 100ms | 3/5 成功 |
 * | 200ms | 5/5 成功 |
 * | 300ms | 5/5 成功 |
 *
 * 更早的版本沿用了上一代笔记里的 1000ms，没有实测依据。那个取值本身不会
 * 出错（服务端只是拒绝，客户端会退避重试），但会让批量操作慢得离谱——
 * 遍历六门课程的结构就要六秒，界面长时间停在「正在读取」。
 *
 * **并发与间隔按平台各自的事实取值**：上面这张表是慕课的；智慧树没有出现过
 * 服务端限流（2026-10-23 核对），因此它用更小的间隔与有限并发（见 client.ts）。
 * 默认值仍是慕课的 1/200——别的平台不声明就按最保守的来。
 */

export const DEFAULT_MIN_GAP_MS = 200;

export interface ThrottleOptions {
  /** 两次请求之间的最小间隔（毫秒）。缺省为 `DEFAULT_MIN_GAP_MS`；非有限数值会在构造时抛错。 */
  minGapMs?: number;
  /**
   * 同时在飞的最大请求数（缺省 1 ＝ 串行）。**只有平台自己实测过没有并发限制**时
   * 才允许大于 1；间隔仍按「相邻两次发起」计算，不因并发放宽。
   */
  concurrency?: number;
  /** 注入时钟，便于测试 */
  now?: () => number;
  /** 注入睡眠，便于测试 */
  sleep?: (ms: number) => Promise<void>;
}

export interface Throttle {
  /** 排队执行一次出站操作。缺省串行；声明了并发时最多 N 个在飞（见 concurrency）。 */
  run<T>(task: () => Promise<T>): Promise<T>;
  /** 当前队列长度（含正在执行的一个），用于诊断 */
  pending(): number;
}

const defaultSleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 创建串行节流器。
 *
 * 串行 + 间隔两件事都要做：
 *   - **串行**保证不存在并发请求（服务端的并发限制按并发数判定，不是按速率）；
 *   - **间隔**保证连续请求之间有最小静默期。
 * 只做其中一个都不够。
 *
 *  只给实测没有并发限制的平台用；间隔仍按相邻两次**发起**计算。
 */
export function createThrottle(options: ThrottleOptions = {}): Throttle {
  const minGapMs = options.minGapMs ?? DEFAULT_MIN_GAP_MS;
  /**
   * 间隔必须在构造时就是有限数值。
   *
   * 不校验的后果是静默退化：`minGapMs` 为 NaN 时 `wait` 也是 NaN，
   * `wait > 0` 恒为 false，于是每次都跳过等待——节流看起来在工作（请求仍串行），
   * 实际已经把间隔丢掉了，而平台判定限流的依据恰恰就是这个间隔。
   * 为 Infinity 时则恒为 true，第一个请求之后队列永久挂住。
   *
   * 选择抛错而不是回退 `DEFAULT_MIN_GAP_MS`：调用方是代码而不是用户，
   * NaN 只可能来自上游的计算或序列化错误；悄悄换成一个能用的值，
   * bug 会原样留在调用点，等到线上被平台封禁才暴露。
   * 只拦「非有限」这一种情况：0 是合法取值，表示显式关闭间隔。
   */
  if (!Number.isFinite(minGapMs)) {
    throw new TypeError(`minGapMs 必须是有限数值，实际收到 ${minGapMs}`);
  }
  const now = options.now ?? Date.now;
  const sleep = options.sleep ?? defaultSleep;
  const concurrency = options.concurrency ?? 1;
  if (!Number.isInteger(concurrency) || concurrency < 1) {
    throw new TypeError(`concurrency 必须是 >=1 的整数，实际收到 ${concurrency}`);
  }

  /** 起点按「相邻两次发起」排队；任务本身可并发，队列只负责发起时刻。 */
  let startChain: Promise<unknown> = Promise.resolve();
  let running = 0;
  const slotWaiters: Array<() => void> = [];

  const acquire = (): Promise<void> =>
    new Promise((resolve) => {
      if (running < concurrency) {
        running += 1;
        resolve();
        return;
      }
      slotWaiters.push(() => {
        running += 1;
        resolve();
      });
    });

  const release = (): void => {
    running -= 1;
    slotWaiters.shift()?.();
  };

  const waitTurn = (): Promise<void> => {
    const turn = startChain.then(async () => {
      const wait = lastStartedAt === null ? 0 : lastStartedAt + minGapMs - now();
      if (wait > 0) await sleep(wait);
      lastStartedAt = now();
    });
    startChain = turn.then(
      () => undefined,
      () => undefined,
    );
    return turn;
  };
  /**
   * 上一次请求的发起时刻。
   * 用 `null` 表示「还没有发出过请求」——首个请求不该等待任何间隔，
   * 若用 0 当初始值，首请求会平白等掉一整个 minGap。
   */
  let lastStartedAt: number | null = null;
  let pending = 0;

  return {
    run<T>(task: () => Promise<T>): Promise<T> {
      pending++;
      const run = (async () => {
        await acquire();
        try {
          await waitTurn();
          return await task();
        } finally {
          release();
        }
      })();
      return run.finally(() => {
        pending--;
      });
    },
    pending() {
      return pending;
    },
  };
}

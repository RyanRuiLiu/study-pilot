/**
 * 出站请求节流。
 *
 * 平台对请求频率有限制，且**限制是全站统一的**，不按接口分散：
 * 平台自身的读请求（`.rpc`）与写请求（`.dwr`）共享同一条配额。
 * 因此所有出站请求必须走同一个节流器实例，不能各模块自己建一个。
 *
 * 间隔取 200ms，依据是本项目的实测：
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
 */

export const DEFAULT_MIN_GAP_MS = 200;

export interface ThrottleOptions {
  /** 两次请求之间的最小间隔（毫秒） */
  minGapMs?: number;
  /** 注入时钟，便于测试 */
  now?: () => number;
  /** 注入睡眠，便于测试 */
  sleep?: (ms: number) => Promise<void>;
}

export interface Throttle {
  /** 排队执行一次出站操作。上一次未结束前不会开始下一次。 */
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
 */
export function createThrottle(options: ThrottleOptions = {}): Throttle {
  const minGapMs = options.minGapMs ?? DEFAULT_MIN_GAP_MS;
  const now = options.now ?? Date.now;
  const sleep = options.sleep ?? defaultSleep;

  let chain: Promise<unknown> = Promise.resolve();
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
      const run = chain.then(async () => {
        const wait =
          lastStartedAt === null ? 0 : lastStartedAt + minGapMs - now();
        if (wait > 0) await sleep(wait);
        lastStartedAt = now();
        return task();
      });
      // 无论成功失败都要把队列推进下去，否则一次失败会卡死后续所有请求
      chain = run.then(
        () => undefined,
        () => undefined,
      );
      return run.finally(() => {
        pending--;
      });
    },
    pending() {
      return pending;
    },
  };
}

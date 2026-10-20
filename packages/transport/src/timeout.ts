/*
 * 出站超时的机械部分：一只上界的表 + 一个 signal。
 *
 * 三处都要同一件事——给一次 fetch（**连读响应体**）设时间上界，到点掐掉，
 * 事后还能区分「是我们掐的」与「网络自己断了」：rpc、dwr 走 Result 契约，
 * 智慧树客户端抛 Error。分类留在各层（错误形状是各层自己的契约），
 * 机械部分合在这一处——同一段 setTimeout/AbortController/clearTimeout 抄三份，
 * 漏改一份的那份就没有上界，而这种缺失只在平台挂掉那天才露出来。
 */

export interface OutboundTimeout {
  /** 交给 `fetch` 的 `init.signal` */
  signal: AbortSignal;
  /** 到点没有。失败分类只看这个，不看 cause 是什么类型 */
  timedOut(): boolean;
  /** 收表：必须在 finally 里调，否则每次请求都留一只活到上界的表 */
  dispose(): void;
}

export function startOutboundTimeout(timeoutMs: number): OutboundTimeout {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return {
    signal: controller.signal,
    timedOut: () => controller.signal.aborted,
    dispose: () => clearTimeout(timer),
  };
}

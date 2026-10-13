/*
 * 平台契约：**调度层与展示外壳唯一认识的形状**。
 *
 * 分为后台与前台两部分，因为它们住在两个不同的地方：
 *   PlatformTasks  后台：能不能做、该做什么、怎么做（本文件）
 *   前台的看板半边等看板按平台分区时一并加入——**不预置用不到的类型**
 * 它只描述"外壳需要知道什么"，平台自己的字段一律放 payload，
 * 外壳不解释它——这是"平台各自独立、只统一调度与分壳"的最小接口。
 *
 * 本文件只有类型，运行时不产生任何代码，因此前后台两个 bundle 各自只包含
 * 自己那一半的实现。
 */

/** 调度层要的最小信息。payload 是平台自己的载荷，调度层原样交回平台的 run()。 */
export interface PlanItem {
  /** 平台内唯一；用于日志与去重，不要求跨平台唯一 */
  id: string;
  title: string;
  /**
   * 谁来做。
   *   auto      后台在本轮直接做完（调度层只会调用这些）
   *   assisted  需要人到场确认，调度层不动它
   *   manual    只能人工，调度层不动它
   */
  mode: 'auto' | 'assisted' | 'manual';
  payload: unknown;
}

export type RunOutcome = { status: 'done' | 'failed' | 'skipped'; message?: string };

/** 计划结果：要做什么 + 是否需要重新登录。 */
export interface PlanResult {
  items: PlanItem[];
  /**
   * 本轮发现会话失效（不是错误，是"需要人重新登录一次"）。
   * 调度层据此记下挂起状态，等用户下次在平台上活动后自动补做。
   */
  needsLogin?: boolean;
}

/** 后台半个契约。 */
export interface PlatformTasks {
  id: string;
  name: string;
  /** 前置条件（登录/会话）。调度层据此决定"等登录"还是继续 */
  isReady(): Promise<boolean>;
  /** 该做什么。调度层只执行 mode 为 auto 的项 */
  plan(now: number): Promise<PlanResult>;
  /** 做一件。失败如实返回，调度层不重试、不解释 */
  run(item: PlanItem, heartbeat: () => Promise<void>): Promise<RunOutcome>;
  /** 本轮收尾：组织通知等平台自己的事。没有要报的就什么都不做 */
  report(items: PlanItem[], outcomes: RunOutcome[], now: number): Promise<void>;
}

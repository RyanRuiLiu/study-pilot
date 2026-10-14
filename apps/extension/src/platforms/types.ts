/*
 * 平台契约：**调度层与展示外壳唯一认识的形状**。
 *
 * 分为后台与前台两部分，因为它们住在两个不同的地方：
 *   PlatformTasks  后台：能不能做、该做什么、怎么做
 *   PlatformViews  前台：看板里属于本平台的那一块
 * 两半都只描述"外壳需要知道什么"，平台自己的字段一律放 payload，
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
  /**
   * 什么都没做时说明原因，外壳据此给前台一句准确的话。
   * 「没勾课程」是平台才知道的事，外壳不该去猜。
   */
  blocked?: 'no-course';
}

/** 后台半个契约。 */
export interface PlatformTasks {
  id: string;
  name: string;
  /** 前置条件（登录/会话）。调度层据此决定"等登录"还是继续 */
  isReady(): Promise<boolean>;
  /**
   * 该做什么。调度层只执行 mode 为 auto 的项。
   *
   * `force` 用于手动执行：那时用户要的是「现在就去平台上拿最新的」，
   * 不受「今天已经拉过」的约束。
   */
  plan(now: number, options?: { force?: boolean }): Promise<PlanResult>;
  /** 做一件。失败如实返回，调度层不重试、不解释 */
  run(item: PlanItem, heartbeat: () => Promise<void>): Promise<RunOutcome>;
  /** 本轮收尾：组织通知等平台自己的事。没有要报的就什么都不做 */
  report(items: PlanItem[], outcomes: RunOutcome[], now: number): Promise<void>;
}

/**
 * 外壳要观察的平台信号。
 *
 * 外壳不认识任何平台的名字：cookie 叫什么、通知 id 什么前缀，都是平台自己的事。
 * 装配层把各平台的这一份交给外壳，外壳只按清单遍历。
 */
/** 一条请求头改写规则：把这些路径前缀的请求头指向该平台自己的源。 */
export interface NetRuleSet {
  /** 平台源，改写后的 Origin 与 Referer 都指向它 */
  origin: string;
  /**
   * 要覆盖的路径前缀（拼在域名之后的片段）。
   *
   * 用精确前缀而不是整站：放宽到整个域名会把图片、脚本等静态资源的 Origin
   * 一并改掉，没有必要。
   */
  paths: string[];
}

export interface PlatformWiring {
  id: string;
  /**
   * 登录凭证 cookie：它出现即表示登录成功，用于「挂起等登录」之后补跑一轮。
   * 缺省表示该平台没有这种信号，外壳便不观察 cookie。
   *
   * **必须是登录后才下发的那个**：匿名会话 cookie 在访客状态下也有，
   * 拿它当信号会在没人登录时误触发（慕课就踩过这个坑）。
   */
  loginCookie?: { name: string; domain: string };
  /** 通知 id 前缀：外壳据此判断这条通知来自哪个平台 */
  notificationPrefix: string;
  /** 需要改写请求头的规则；缺省表示该平台不需要 */
  requestRules?: NetRuleSet[];
}

/**
 * 设置页半边：本平台的设置分区。
 *
 * 分区里的控件与文案都是平台自己的（慕课有"账号与课程/自动任务/前台功能"），
 * 外壳只把它们排进设置页并参与同一套左侧导航。读写配置走 app 层的
 * `src/settings`（外壳与平台共用），因此平台不需要反向依赖外壳。
 */
export interface PlatformSettings {
  id: string;
  name: string;
  /** 渲染本平台的设置分区（可多节）。每节须是 `.sp-section`，带 id 与标题 */
  render(): HTMLElement[];
  /**
   * 登录状态可能变了：平台据此刷新自己分区里的登录行。
   *
   * 外壳不知道谁有登录行、长什么样，只在收到 NOT_LOGGED_IN 一类结果时喊一声。
   */
  onLoginChanged?(): void;
}

/** 前台半个契约：看板里属于本平台的那一块。 */
export interface PlatformViews {
  id: string;
  name: string;
  /**
   * 渲染本平台的分区：读自己的数据、画自己的筛选与明细，返回快照读取时刻
   * （0 表示还没读过）。外壳只提供容器与标题，不认识任何平台字段。
   */
  render(host: HTMLElement): Promise<number>;
}

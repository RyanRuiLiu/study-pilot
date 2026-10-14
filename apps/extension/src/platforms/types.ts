/*
 * 平台契约：**调度层与外壳唯一认识的形状**。
 *
 * 只描述"外壳需要知道什么"：能不能做、该做什么、怎么做（PlatformTasks），
 * 以及外壳要观察的信号与要提供的宿主能力（PlatformWiring / HostCapabilities）。
 * 平台自己的字段一律放 payload，外壳不解释它——这是"平台各自独立、只统一调度"
 * 的最小接口。
 *
 * 本文件只有类型，运行时不产生任何代码。
 */

/** 调度层要的最小信息。payload 是平台自己的载荷，调度层原样交回平台的 run()。 */
export interface PlanItem {
  /** 分组名（慕课就是课程名）。运行页按它把项归到课程下，调度层只当字符串用 */
  group: string;
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
   * 没有「要不要重新拉」的选项：每次调用都拿最新数据，不做任何缓存。
   */
  plan(now: number): Promise<PlanResult>;
  /** 做一件。失败如实返回，调度层不重试、不解释 */
  run(item: PlanItem, heartbeat: () => Promise<void>): Promise<RunOutcome>;

}

/**
 * 宿主能力：平台要浏览器/运行环境提供的那几件事。
 *
 * 定义在契约里而不是外壳里：外壳实现它、平台使用它，两边都只认这一份定义。
 * 平台内部因此不出现 browser.*，换宿主（命令行、测试替身）时只换实现。
 */
export interface HostCapabilities {
  /** 等请求头改写规则生效（规则由外壳安装） */
  whenRequestRulesReady: (rules: NetRuleSet[]) => Promise<void>;
  /** 读某个域名下的 cookie；没有或读失败都返回空串 */
  readCookie: (origin: string, name: string) => Promise<string>;
}

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

/**
 * 外壳要观察的平台信号。
 *
 * 外壳不认识任何平台的名字：cookie 叫什么都是平台自己的事。
 * 装配层把各平台的这一份交给外壳，外壳只按清单遍历。
 */
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
  /**
   * 需要改写请求头的规则；没有就传空数组。
   *
   * 刻意不是可选字段：可选意味着调用方要写 `?? []`，而规则安装是**全量替换**——
   * 一个忘了声明的平台会把别人的规则一起清掉。必填让这件事在编译期就要表态。
   */
  requestRules: NetRuleSet[];
}

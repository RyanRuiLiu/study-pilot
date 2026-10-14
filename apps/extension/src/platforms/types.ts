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
 * 外壳要观察的平台信号。
 *
 * 外壳不认识任何平台的名字：cookie 叫什么、通知 id 什么前缀，都是平台自己的事。
 * 装配层把各平台的这一份交给外壳，外壳只按清单遍历。
 */
/** 一条请求头改写规则：把这些路径前缀的请求头指向该平台自己的源。 */
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

/**
 * 设置页半边：本平台的设置分区。
 *
 * 分区里的控件与文案都是平台自己的（慕课有"账号与课程/自动任务/前台功能"），
 * 外壳只把它们排进设置页并参与同一套左侧导航。读写配置走 app 层的
 * `src/settings`（外壳与平台共用），因此平台不需要反向依赖外壳。
 */
/**
 * 一个设置分区：标题、这一段是干什么的、以及里面的控件。
 *
 * 控件自带 label 与 help-text（见 src/ui/form.ts），因此外面不再套一层
 * 「左标题说明 + 右控件」的自画行——那等于把组件自带的能力重做一遍。
 */
export interface SettingsSection {
  id: string;
  title: string;
  description: string;
  controls: HTMLElement[];
}

export interface PlatformSettings {
  id: string;
  name: string;
  /** 渲染本平台的设置分区（可多节）。每节须是 `.sp-section`，带 id 与标题 */
  render(): SettingsSection[];
}

/** 前台半个契约：看板里属于本平台的那一块。 */
/**
 * 一份数据的来源。
 *
 * 只有两种可能，因此用可辨识联合而不是「返回 0 表示没有，返回 -1 表示失败」：
 * 后者会把「还没读过」与「读失败」显示成同一句话，而用户能做的事完全不同
 * （前者等一轮执行，后者要去修登录或网络）。
 */
export type DataSource = { at: number } | { error: string };

/**
 * 概览里的一行。
 *
 * **这是显示形状，不是领域模型**：除 `mode` 与 `state` 外，每个字段都是
 * 「界面上要印出来的那串字」，由平台自己算好交出来。此前删掉的是把各平台字段
 * 硬压成一种领域形状的那一层（见 docs/specs 第 4 节），这里没有恢复它——
 * 慕课以外的平台想给「截止」换成别的说法，只要交另一串字，壳层不需要认识任何平台字段。
 *
 * `mode` 与 `state` 留成枚举而不是文字：壳层要按它们上色、排序、决定标签语气，
 * 跟着显示文字判断会在平台改了说法时静默失效。说法由壳层统一给（见 overview.ts 的标签表）。
 *
 * 壳层只用到四件事：按 `course` 与 `kind` 分组建树、按 `dueAt` 与 `state` 排序、
 * 按 `mode` 上标签、把 `href` 做成链接。
 */
export interface OverviewRow {
  /** 平台内唯一，用于行的 key */
  id: string;
  course: string;
  title: string;
  /** 类别标签，如「测验」「视频」 */
  kind: string;
  /** 谁来做。与 PlanItem.mode 同一套取值 */
  mode: 'auto' | 'assisted' | 'manual';
  /** 三态：未完成 / 已完成 / 已过截止。左缘色条按它上色 */
  state: 'todo' | 'done' | 'late';
  progress: string;
  /** 所属章节（课程内的分组名）。概览的左树与右侧分组都按它切 */
  group: string;
  /** 状态标签，如「未提交」「互评 2/5」 */
  status: string;
  /** 状态的补充说明，做成悬停提示；空串表示没有需要解释的 */
  statusDetail: string;
  /** 截止时间（毫秒），0 表示没有；只用于排序 */
  dueAt: number;
  /** 截止的显示文字，如「今天 20:00」；空串表示不显示 */
  due: string;
  /** 得分显示文字，如「20 / 20」；空串表示没有 */
  score: string;
  /** 去处；空串表示没有可跳转的页面 */
  href: string;
}

/** 一个平台交给概览的全部数据。 */
export interface PlatformOverview {
  id: string;
  name: string;
  /** 这份数据从哪来：读到的时刻（0 = 还没读过），或者为什么没读到 */
  source: DataSource;
  rows: OverviewRow[];
}

export interface PlatformViews {
  id: string;
  name: string;
  /**
   * 交出本平台在概览里的数据。
   *
   * 渲染归壳层（一棵树一张表），平台只负责把自己的快照读成行——
   * 这样第二个平台不需要重写一遍表格、排序与无障碍属性。
   */
  overview(): Promise<PlatformOverview>;
  /**
   * 向平台读一次最新数据并落盘，返回读到的时刻；0 表示读不到。
   *
   * 概览右上只有这一个动作。执行中由壳层禁用，避免与那一轮互相覆盖快照。
   */
  refresh(): Promise<DataSource>;
}

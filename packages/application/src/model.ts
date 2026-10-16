/*
 * 载体无关的模型。
 *
 * 这里只有形状，没有代码，也没有任何厂商字段：慕课的 courseId/tid 不许出现在这里。
 * 厂商自己的东西装进 `PlanItem.payload` 原样交回，别的层不解释它。
 *
 * 进这个文件的判据只有一条：**换一个载体（扩展、命令行、服务端）或换一个平台，
 * 这个形状都不用改**。凡是不满足这条的，说明它是厂商或载体的事实，不该放这。
 */

// ---------- 一轮要做什么 ----------

/** 调度要的最小信息。payload 是平台自己的载荷，调度原样交回平台的 run()。 */
export interface PlanItem {
  /** 分组名（慕课就是课程名）。运行页按它把项归到课程下，调度只当字符串用 */
  group: string;
  /** 平台内唯一；用于日志与去重，不要求跨平台唯一 */
  id: string;
  title: string;
  /**
   * 谁来做。
   *   auto      扩展在本轮直接做完（调度只会调用这些）
   *   assisted  需要人到场确认，调度不动它
   *   manual    只能人工，调度不动它
   */
  mode: 'auto' | 'assisted' | 'manual';
  /**
   * 类别。取值由平台定义（慕课是 quiz / review / self / homework / exam / courseware），
   * 核心不解释它，只按调用方给的范围筛选（见 round.ts 的选范围）。
   * 放核心是因为界面要能说「只做课件」「只做待办那几类」，而界面不许认识平台字段。
   */
  kind: string;
  payload: unknown;
}

export type RunOutcome = { status: 'done' | 'failed' | 'skipped'; message?: string };

/** 执行范围。什么都不给表示全部。 */
export interface RunSelection {
  /** 只做这些类别。取值由平台定义，本层只做字符串比较 */
  kinds?: string[];
  /** 只做这个课程（即 PlanItem.group） */
  group?: string;
  /** 只做这几项（PlanItem.id）。弹窗上「单独完成这一条」用它 */
  ids?: string[];
  /**
   * 只做这个平台（PlatformTasks.id）。
   *
   * 界面上的执行入口都带它：弹窗的「全部执行」作用于当前 tab 的平台、
   * 设置页每张卡的执行作用于那张卡的平台。没有它，一次点击会把所有平台
   * 的范围内事项都做掉——两平台共存后「课件的类别名」可能相同，
   * 单靠 kinds 分不开是谁家的课件。
   */
  platformId?: string;
}

/** 计划结果：要做什么 + 是否需要重新登录。 */
export interface PlanResult {
  items: PlanItem[];
  /**
   * 本轮发现会话失效（不是错误，是"需要人重新登录一次"）。
   * 调度据此如实收尾：本轮不做任何写入，用户重新登录后再点执行。
   */
  needsLogin?: boolean;
  /**
   * 什么都没做时说明原因，外壳据此给前台一句准确的话。
   * 「没勾课程」是平台才知道的事，外壳不该去猜。
   */
  blocked?: 'no-course';
}

// ---------- 跨次运行保留的那一份状态 ----------

/**
 * 失败的「下一步」动作：一个按钮文案 + 一个去处。
 *
 * 由**平台**提供（它才知道下一步是什么），外壳只搬运、不解释、不造句——
 * 平台在抛出的错误对象上附带 `action: { platformId, label, url }` 即被接住
 * （提取的约定与校验在 round.ts）；没有就是没有。
 */
export interface RunFailureAction {
  /** 动作所属平台（PlatformTasks.id，如 'zhihuishu'） */
  platformId: string;
  /** 按钮文案（平台的术语，如「打开验证页」） */
  label: string;
  /** 点击去处（新标签页打开） */
  url: string;
}

/** 外壳自己的留痕挂在这个键下（监听器注册失败这类非平台事件）。 */
export const SHELL_PLATFORM_ID = 'shell';

/** 一个平台最近一次失败的留痕。 */
export interface PlatformFailure {
  /** 失败原因（平台的措辞，外壳原样呈现） */
  message: string;
  /** 平台给的「下一步」；没有就是 null */
  action: RunFailureAction | null;
  /** 记录时刻 */
  at: number;
}

/** 一个平台自己的运行状态（两平台各一份）。 */
export interface PlatformRunState {
  /**
   * 该平台正在跑的一轮开始时间。非 null 表示上次运行没有正常结束——
   * 可能是正在跑，也可能是浏览器被强杀后留下的标记，两者要靠心跳区分。
   */
  runningSince: number | null;
  /**
   * 该平台最近一次心跳。
   *
   * 执行线程活着的时候不断刷新它。进程会被回收、浏览器会被强杀，那时
   * runningSince 还留在存储里没人清，而实际已经没有东西在跑了。
   * 只看 runningSince 会把「残留」误报成「正在执行」——判据见 liveRunState。
   */
  heartbeatAt: number | null;
  /** 该平台最近一次正常结束的时间 */
  lastFinishedAt: number | null;
  /** 该平台最近一次失败的留痕；null 表示没有 */
  failure: PlatformFailure | null;
}

/** 跨次运行保留的状态。 */
export interface TaskState {
  /**
   * 各平台自己的运行状态；键 = PlatformTasks.id（外壳自己的留痕记在 SHELL_PLATFORM_ID）。
   *
   * 为什么按平台拆：平台之间**相互独立**——一家在跑不占另一家的门（智慧树
   * 执行中慕课仍可执行），各自的失败只呈现给自己家、也只由自己家跑完一轮
   * 来清。并发闸门、心跳与「在跑吗」的判据全部按平台做（见 state.ts）；
   * 同一份存储上并发轮次的读改写由用例层串行化（round.ts 的队列）。
   */
  platforms: Record<string, PlatformRunState>;
}

/** 此刻处于哪种状态。 */
export type LiveRunState = 'idle' | 'running' | 'interrupted';

// ---------- 一轮的执行进度（给用户看的） ----------

/** 逐项记录的一条。`running` 表示正在进行，其余都是终态。 */
export type RunItemStatus = 'running' | 'done' | 'skipped' | 'failed';

export interface RunItem {
  /** 所属平台，用于按平台分卡 */
  platformId: string;
  /** 课程名。界面按「课程 · 项目」显示，不让用户去猜 id */
  course: string;
  title: string;
  /**
   * 类别（平台定义：慕课是 quiz / review / … / courseware）。
   * 界面按它分流显示——课件类的进度落在课件行，待办类的落在页面运行提示，
   * 不蹭别人的板块；核心自己仍然不解释取值。
   */
  kind: string;
  status: RunItemStatus;
  /** 结果说明，来自执行面，原样显示不改写 */
  detail: string;
  at: number;
}

/** 一个平台此刻的运行状态。 */
export interface PlatformRun {
  id: string;
  name: string;
  /** idle 空闲 · running 正在执行 */
  state: 'idle' | 'running';
  startedAt: number | null;
  /** 本轮计划要做的项数与已做完的项数 */
  total: number;
  finished: number;
  /** 正在做的那一项；空闲时为 null */
  current: string | null;
  /** 本轮已完成的逐项记录，界面直接列出来 */
  items: RunItem[];
}

/** 界面读的那一份运行状态快照。 */
export interface RunState {
  platforms: PlatformRun[];
}

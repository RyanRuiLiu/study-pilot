/*
 * 消息协议：请求/响应的形状、运行状态的形状、拒绝原因的说法。
 *
 * 为什么单独一层：这些东西**两端都要用**——外壳按它分发、平台按它实现、界面按它渲染。
 * 放在任何一边都会让另一边反向依赖，实测就是这样绕出了两个循环依赖
 * （messaging/envelope ↔ messaging/index，以及 run-state ↔ envelope ↔ index）。
 *
 * 这一层不认识平台：平台的载荷（快照、题库、卷面）不在这里。
 */

/** 失败的「下一步」动作（镜像 @study-pilot/application 的同名形状——见文件头「为什么单独一层」）。 */
export interface RunFailureAction {
  platformId: string;
  label: string;
  url: string;
}

/** 一个平台最近一次失败的留痕（镜像 application 的同名形状）。 */
export interface PlatformFailure {
  message: string;
  action: RunFailureAction | null;
  at: number;
}

/** 一个平台自己的运行状态（镜像 application 的同名形状）。 */
export interface PlatformRunState {
  runningSince: number | null;
  heartbeatAt: number | null;
  lastFinishedAt: number | null;
  failure: PlatformFailure | null;
}

/** 跨次运行保留的状态。 */
export interface TaskState {
  /**
   * 各平台自己的运行状态；键 = PlatformTasks.id（外壳自己的留痕记在 'shell'）。
   *
   * 平台之间相互独立：一家在跑不占另一家的门，各自的失败只呈现给自己家、
   * 也只由自己家跑完一轮来清。并发闸门、心跳与「在跑吗」的判据全部按平台做。
   */
  platforms: Record<string, PlatformRunState>;
}

/** 后台此刻处于哪种状态。 */
export type LiveRunState = 'idle' | 'running' | 'interrupted';



/**
 * 一次查询的结果。
 *
 * 显式区分「成功」与「失败」：成功时即使列表为空，也说明「确实没有东西」；
 * 失败时必须带上原因。用空数组表示失败会让用户以为「本来就没有」。
 *
 * reason 把「需要先去登录」从一般失败中分出来：这类失败重试多少次都一样。
 */
export type QueryOutcome<T> =
  | {
      status: 'ok';
      value: T;
    }
  | { status: 'error'; message: string; reason?: 'NOT_LOGGED_IN' };

/** 任务被拒绝的原因。后台自行校验，前台的检查只是提前提示。 */
export type JobRejection =
  | 'FETCH_FAILED'
  | 'NO_SELECTED_COURSE'
  | 'NOT_LOGGED_IN'
  | 'ALREADY_RUNNING'
  | 'NO_USER_ID';

/** 运行状态的推送通道名。定义在协议层：页面只 import 协议，不该依赖执行面。 */
export const RUN_STATE_PORT = 'run-state';

/** 拒绝原因对应的用户可读说明（对这个联合是穷尽的）。 */
export const REJECTION_MESSAGES: Record<JobRejection, string> = {
  NO_SELECTED_COURSE: '没有可执行的课程，请先选择参与任务的课程',
  NOT_LOGGED_IN: '尚未登录，请先在浏览器中登录课程平台的账号',
  ALREADY_RUNNING: '正在执行，请稍后再试',
  FETCH_FAILED: '请求平台失败',
  NO_USER_ID: '无法读取账号信息，请确认已登录后重试',
};


/** 手动执行一轮的响应。 */
export type RunScheduledTasksResponse =
  | {
      ok: true;
      done: number;
      manual: number;
      failed?: Array<{ name: string; kind: string; detail: string }>;
      /** 这一轮是人按了停止提前收的尾 */
      stopped?: boolean;
      message?: string;
    }
  /** message 是失败的具体原因；界面只按 reason 取文案，这个字段留给出错时排查 */
  | { ok: false; reason: JobRejection; message?: string };

/**
 * 一个消息处理器。
 *
 * 处理器由**平台**提供（外壳只按 type 分发），因此它拿到的是协议里的请求对象与
 * 回响应入口，不认识外壳的其它东西。请求的形状由各平台自己收窄。
 */
export type MessageHandler = (
  request: { type?: string },
  sendResponse: (response?: unknown) => void,
) => Promise<void>;

/** 宽松的回响应入口，只用于分发处那一层。 */
export type AnySendResponse = (response?: unknown) => void;

/**
 * 处理器表：按请求 type 索引。
 *
 * **没有 `*` 兜底这一格**：兜底是外壳的事（没人认领的 type 由路由自己回
 * 「处理不了」），不属于任何平台。先前兜底挂在平台的表上，
 * 两个平台共存时会变成「谁先装配谁兜底」的不对称。
 */
export type MessageHandlers = Record<string, MessageHandler>;

/** 后台此刻的状态：原始状态 + 由后台判定的人话结论。 */
export interface TaskStatus {
  state: TaskState;
  live: LiveRunState;
}

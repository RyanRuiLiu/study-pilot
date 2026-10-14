/*
 * 消息协议的通用部分：与平台无关的查询结果、拒绝原因与发送入口。
 *
 * 平台专属载荷在 `mooc.ts`；把请求与响应绑在一起的装配在 `index.ts`。
 * 这样分层的好处在第二阶段会兑现：加平台时只增一个载荷文件，
 * 这一层（信封、拒绝原因、发送入口）不需要改。
 */

import type { LiveRunState, TaskState } from '../../background/runtime/scheduler';
import type { BackgroundRequest, ResponseMap } from './index.ts';

/**
 * 一次查询的结果。
 *
 * 显式区分「成功」与「失败」：成功时即使列表为空，也说明「确实没有东西」；
 * 失败时必须带上原因。两者在界面上的呈现完全不同，不能混为一谈——
 * 用空数组表示失败会让用户以为「本来就没有」，排查时也无从下手。
 *
 * reason 把「需要先去登录」从一般失败中分出来：这类失败重试多少次都一样，
 * 只有用户去登录才能解决，界面上的说法与提供的去处也都不同。
 */
export type QueryOutcome<T> =
  | {
      status: 'ok';
      value: T;
      /**
       * 这一份数据是在后台正在执行时给出的。
       *
       * 执行那一轮自己就在写快照，此时重新拉取会与它互相覆盖，所以后台
       * 只回现有快照并带上这个标记；界面据此说明「数据可能是执行前的」，
       * 而不是让用户以为看到的就是最新。
       */
      running?: boolean;
    }
  | { status: 'error'; message: string; reason?: 'NOT_LOGGED_IN' };

/**
 * 任务被拒绝的原因。
 *
 * 后台任务自行校验这些条件，前台的检查只是提前给出提示，不作为判据。
 */
export type JobRejection =
  /** 请求平台失败，message 里带具体原因 */
  | 'FETCH_FAILED'
  /** 总开关关闭 */
  | 'DISABLED_GLOBAL'
  /** 该任务自身的开关关闭 */
  | 'DISABLED_TASK'
  /** 没有任何一门课程被勾选，或请求的课程都不在勾选范围内 */
  | 'NO_SELECTED_COURSE'
  /** 未登录 */
  | 'NOT_LOGGED_IN'
  /**
   * 已经有一轮在跑。
   *
   * 它不是错误，只是时机不对：浏览器刚启动时的自动执行可能正在进行。
   * 界面据此给出中性提示而不是错误色 —— 用户的动作没有问题，
   * 只是没必要再来一次。
   */
  | 'ALREADY_RUNNING'
  /** 已登录但读不到用户 id */
  | 'NO_USER_ID';

/** 拒绝原因对应的用户可读说明。 */
export const REJECTION_MESSAGES: Record<JobRejection, string> = {
  DISABLED_GLOBAL: '总开关已关闭，请先在设置中启用',
  DISABLED_TASK: '没有开启任何后台任务，请先在设置中打开至少一项',
  NO_SELECTED_COURSE: '没有可执行的课程，请先选择参与任务的课程',
  NOT_LOGGED_IN: '尚未登录慕课平台，请先在浏览器中登录',
  ALREADY_RUNNING: '正在执行，请稍后再试',
  FETCH_FAILED: '请求平台失败',
  NO_USER_ID: '无法读取账号信息，请确认已登录后重试',
};

/**
 * 一次自动执行的汇总。
 *
 * `pending` 是没能自动完成、仍需要用户处理的条目，带各自的原因。
 */
export interface RunScheduledTasksResponse {
  total: number;
  done: number;
  skipped: number;
  pending: Array<{ tid: number; name: string; reason: string }>;
  notified: boolean;
}

/**
 * 后台任务的持久状态。
 *
 * 直接复用 scheduler 的类型，避免两处定义漂移——界面按它渲染，
 * 字段少一个就会显示错。
 */
type TaskStateSnapshot = TaskState;

/**
 * 后台此刻的状态。
 *
 * `live` 由后台判定（见 scheduler.liveRunState），界面只负责显示。
 * 界面不自己拿 `state.runningSince !== null` 去猜：那个字段在浏览器被强杀后
 * 会留着没人清，猜的结果是弹窗一直显示「正在执行」，而实际什么都没发生。
 */
export interface TaskStatus {
  state: TaskStateSnapshot;
  live: LiveRunState;
}


type RequestOf<K extends BackgroundRequest['type']> = Extract<BackgroundRequest, { type: K }>;

/**
 * 向后台发送请求。
 *
 * 返回类型由 `type` 推导，因此调用方不需要写类型断言。
 */
export async function sendToBackground<K extends BackgroundRequest['type']>(
  request: RequestOf<K>,
): Promise<ResponseMap[K]> {
  const response = (await browser.runtime.sendMessage(request)) as ResponseMap[K] | undefined;
  if (response === undefined) {
    throw new Error(`后台未处理该请求：${request.type}`);
  }
  return response;
}

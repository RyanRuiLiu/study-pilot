/*
 * 消息协议的通用部分：与平台无关的查询结果、拒绝原因与发送入口。
 *
 * 平台专属载荷在 `mooc.ts`；把请求与响应绑在一起的装配在 `index.ts`。
 * 这样分层的好处在第二阶段会兑现：加平台时只增一个载荷文件，
 * 这一层（信封、拒绝原因、发送入口）不需要改。
 */

/* 协议的形状在 src/protocol.ts（两端都要用）；这里只做转出，调用方的 import 不变。 */
export * from '../../protocol.ts';

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

/*
 * 运行状态的推送通道名。
 *
 * 定义在协议层而不是执行面：页面只 import 协议，不该为了一个字符串去依赖
 * `src/background/`（那会把它整层的存储代码打进页面包，也违反分层方向）。
 */
export const RUN_STATE_PORT = 'run-state';

/** 拒绝原因对应的用户可读说明。 */
export const REJECTION_MESSAGES: Record<JobRejection, string> = {
  DISABLED_GLOBAL: '总开关已关闭，请先在设置中启用',
  DISABLED_TASK: '没有开启任何后台任务，请先在设置中打开至少一项',
  NO_SELECTED_COURSE: '没有可执行的课程，请先选择参与任务的课程',
  NOT_LOGGED_IN: '尚未登录，请先在浏览器里登录课程平台的账号',
  ALREADY_RUNNING: '正在执行，请稍后再试',
  FETCH_FAILED: '请求平台失败',
  NO_USER_ID: '无法读取账号信息，请确认已登录后重试',
};

/**
 * 拒绝原因的用户可读说法。
 *
 * 参数是协议里的 `JobRejection`，不是任意字符串：`REJECTION_MESSAGES` 对这个
 * 联合是穷尽的，新增一种原因时编译器会要求补文案。曾经调用点收 string 再加
 * `as keyof` 与 `?? 兜底`，等于把穷尽检查换成运行时猜——漏一种原因，
 * 界面显示「执行失败：DISABLED_TASK」这种内部术语。
 */
export function describeRejection(reason: JobRejection): string {
  return REJECTION_MESSAGES[reason];
}

/**
 * 手动执行一轮的响应。
 *
 * 这是**协议的一部分**：后台这么回，前台照这个读，类型由 `ResponseMap` 单向
 * 约束两端。曾经的形状（total/skipped/pending/notified）与实际发的内容早就
 * 不一致，而因为回响应入口收的是 `unknown`，谁也没报错——界面对不存在的字段
 * 读了一遍，靠 `?? 0` 兜住，看起来一切正常。
 *
 * `message` 用于「这一轮没有可自动完成的事项」那种**正常但无需计数**的结果；
 * 有计数时不带它。
 */
export type RunScheduledTasksResponse =
  | {
      ok: true;
      done: number;
      manual: number;
      failed?: Array<{ name: string; detail: string }>;
      message?: string;
    }
  | { ok: false; reason: JobRejection };



/* sendToBackground 放在 index.ts：它要用 ResponseMap，与协议类型同处装配点，避免循环。 */

/**
 * 前台与后台之间的消息协议。
 *
 * 用可辨识联合加响应类型映射，替代裸字符串消息。
 * 调用方在编译期即可知道每个请求的响应形状，改协议时漏改一处会被类型检查拦下。
 *
 * 约定：请求对象的 `type` 字段同时是 `ResponseMap` 的键，
 * 因此新增一个请求必须同时补一条响应类型，无法只改一半。
 */

import type { CourseSummary } from '@study-pilot/platform-mooc';
import type { MoocSession } from './mooc-session';

// ---------- 请求 ----------

/** 查询当前登录态。 */
export interface SessionRequest {
  type: 'SESSION';
}

/** 读取已保存的课程列表。 */
export interface CoursesRequest {
  type: 'COURSES';
}

/** 从平台重新拉取课程列表并写回配置。 */
export interface RefreshCoursesRequest {
  type: 'REFRESH_COURSES';
}

/** 执行一次自动互评。`termIds` 只能收窄范围，不能超出已勾选的课程。 */
/** 执行一次自动答题。 */
export type BackgroundRequest =
  | SessionRequest
  | CoursesRequest
  | RefreshCoursesRequest
  | { type: 'RUN_SCHEDULED_TASKS' }
  | { type: 'TASK_STATE' }
  | { type: 'RESET_TASK_STATE' }
  | { type: 'PENDING_SUMMARY' }
  | { type: 'DIAGNOSE' }
  | { type: 'UNIT_DETAILS' }
  | { type: 'NOTIFY_SAMPLE' };

import type { TaskState } from '../background/scheduler';

/** 诊断报告，一次性给出后台的关键状态。 */
export interface DiagnoseReport {
  session: { loggedIn: boolean; userId: number; tokenLength: number };
  /** 已安装的出站请求头规则条数；失败时为错误说明 */
  netRules: number | string;
  /** 配置里已勾选的课程数 */
  selectedCourses: number;
  /** 平台返回的课程数；失败时为错误说明 */
  fetchedCourses: number | string;
  fetchedNames: string[];
}

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
  | { status: 'ok'; value: T }
  | { status: 'error'; message: string; reason?: 'NOT_LOGGED_IN' };

/**
 * 单元状态。平台的叫法，不自创。
 *
 * 定义在这里而不是判断逻辑那一侧：它是消息里 status 字段的取值集合，
 * 前后台都得按同一套说法来。放在后台模块里的话，前台要用就得跨层导入，
 * 或者——更容易发生的事——直接在界面上写死字符串，
 * 那样后台改说法时界面会静默失效。
 */
export const WORK_STATUS = {
  /** 还没做，截止还没到 */
  UNSUBMITTED: '未提交',
  /** 还没做，但截止已过，平台上没法再做了 */
  OVERDUE: '已过截止未提交',
  /** 交了，互评期中且还没评够份数 */
  REVIEWING: '互评阶段',
  /** 交了，互评期中且已评够份数。分数此时已确定，只等公布 */
  REVIEWED: '互评已完成',
  /** 交了，互评期已过，成绩还没出 */
  WAITING: '等待成绩公布',
  /** 成绩已出 */
  SCORED: '成绩已公布',
} as const;

export type WorkStatus = (typeof WORK_STATUS)[keyof typeof WORK_STATUS];

/**
 * 待办类别。
 *
 * 互评与自评分开：前者是给同学的作业打分，后者是给自己的作业打分。
 * 两者虽然都在互评期开放、走同一套接口，但对用户是两件事，
 * 混成一类会让他点进去才发现评的是自己。
 */
export type PendingKind =
  | 'submit-quiz'
  | 'submit-homework'
  | 'evaluate-homework'
  | 'self-evaluate'
  | 'submit-exam';

/**
 * 待办事项。
 *
 * 一条待办要能回答两个问题，用户才不会困惑：
 *   这件事是什么         → kind
 *   它会被怎么处理       → handling
 *
 * handling 说明这一条会被怎么处理：自动完成，还是需要用户自己动手。
 * 只说「未提交」是不够的——用户看到那句话无从判断要不要管它。
 *
 * overdue 与 handling 是两个维度，不合并：一件已过截止的测验既不能自动处理，
 * 也不能由用户补做，平台就是不接受了。这种要说清楚，否则用户会一直等它被处理。
 *
 * 带上课程定位信息是为了能直接跳到对应页面：平台用
 * `#/learn/quiz?id=` 与 `#/learn/hw?id=` 定位具体测验与作业。
 */
export interface PendingEntry {
  /** 事项类别 */
  kind: PendingKind;
  /**
   * 这件事会被怎么处理。
   *   auto   扩展会在下次自动执行时完成，用户不必动手
   *   manual 只能由用户自己完成，扩展做不了
   */
  handling: 'auto' | 'manual';
  /**
   * 是否已经过了截止时间。
   *
   * 过期的测验平台不接受补做，因此它既不在 auto 里也不真的在 manual 里——
   * 保留在列表中是为了让用户知道漏了什么，而不是让他去点。
   */
  overdue: boolean;
  /** 测验或作业的 id，用于拼跳转地址 */
  testId: number;
  /** 课程名 */
  courseName: string;
  /** 所属章节 */
  chapterName: string;
  /** 名称 */
  name: string;
  /**
   * 考试自身的 id，仅考试有；拼答卷页地址用。
   *
   * 与详情里同名，理由相同：考试的两部分共用它，而它不属于任何单元。
   */
  examId: number | null;
  /**
   * 该单元当前的状态。
   *
   * 取值与设置页的单元明细**完全相同**：未提交 / 已过截止未提交 /
   * 互评阶段 / 等待互评完成 / 成绩已公布。两处由同一个函数算出。
   *
   * 先前这里是另一套说法（提交阶段 / 互评阶段 / 成绩公布阶段），
   * 与明细对不上：同一份作业在弹窗里写「提交阶段」、在明细里写「未提交」，
   * 用户会以为是两件不同的事。同一件事只能有一种说法。
   */
  status: string;
  /** 该状态的含义，用于悬停提示。与明细同源 */
  statusDetail: string;
  /**
   * 该看哪个截止时间。
   *
   * 由后台按这件事的性质算好：待提交的看提交截止，待互评的看互评截止。
   * 界面不再自己判断——先前两边各判一次，于是显示的时间与排序依据不一致。
   * 0 表示平台未提供。
   */
  deadline: number;
  /** 互评已完成份数；非互评类为 null */
  evaluateDone: number | null;
  /** 互评配额；非互评类为 null */
  evaluateTotal: number | null;
  /** 跳转所需的课程定位信息 */
  course: {
    courseId: number;
    schoolShortName: string;
    mode: number;
    termId: number;
  };
}

/** 待办汇总：计数用于概览，明细用于列表。 */
export interface PendingSummary {
  /** 能自动完成的条数 */
  auto: number;
  /** 只能人工完成的条数 */
  manual: number;
  /** 已过截止、平台不再接受的条数 */
  overdue: number;
  /** 明细列表，按截止时间升序 */
  entries: PendingEntry[];
}

/** 单个单元的明细，用于设置页的诊断视图。 */
export interface UnitDetail {
  termId: number;
  courseName: string;
  chapterName: string;
  tid: number;
  name: string;
  type: 'quiz' | 'homework' | 'exam-objective' | 'exam-subjective';
  /**
   * 考试自身的 id，仅考试有；拼答卷页地址用。
   *
   * 考试的两部分（客观题与主观题）共用这一个 id，而它不属于任何单元，
   * 只能随详情一起传过来。
   */
  examId: number | null;
  /** 状态描述，取自平台的说法 */
  status: string;
  /** 该状态的含义，用于悬停提示。四个说法之间的差别不是自明的 */
  statusDetail: string;
  submitted: boolean;
  score: number | null;
  totalScore: number | null;
  deadline: number | null;
  /**
   * 互评已完成的份数。只在处于互评阶段的作业上有值，其余为 null。
   *
   * 「互评阶段」这个状态本身不说明用户做到哪一步——一份未评与已评够，
   * 字面完全相同。带上进度才能把两者分开。
   */
  evaluateDone: number | null;
  /** 互评配额。与 evaluateDone 同时出现 */
  evaluateTotal: number | null;
  /**
   * 拼跳转地址用的课程前缀。
   *
   * 课程页地址形如 /learn/{schoolShortName}-{courseId}，MOOC 走 /learn/、
   * SPOC 走 /spoc/learn/。前台要能点进具体某一项作业，就必须带上这几个字段，
   * 否则只能显示一个不能点的名字。
   */
  courseId: number;
  schoolShortName: string;
  mode: number;
}

// ---------- 响应 ----------

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

export type JobResult<T> =
  | { ok: true; summary: T[] }
  | { ok: false; reason: JobRejection };

/** 自动互评的单条结果。 */
/** 自动答题的单条结果。 */
export interface RunScheduledTasksResponse {
  total: number;
  done: number;
  skipped: number;
  pending: Array<{ tid: number; name: string; reason: string }>;
  notified: boolean;
}

/** 后台任务的持久状态，用于设置页展示进度。 */
/**
 * 后台任务的持久状态。
 *
 * 直接复用 scheduler 的类型，避免两处定义漂移——
 * 界面按它渲染，字段少一个就会显示错。
 */
export type TaskStateSnapshot = TaskState;

export interface ResponseMap {
  SESSION: MoocSession;
  COURSES: CourseSummary[];
  REFRESH_COURSES:
    | { ok: true; courses: CourseSummary[] }
    | { ok: false; reason: JobRejection; message?: string };
  RUN_SCHEDULED_TASKS: RunScheduledTasksResponse;
  TASK_STATE: TaskStateSnapshot;
  RESET_TASK_STATE: { ok: true };
  PENDING_SUMMARY: QueryOutcome<PendingSummary>;
  DIAGNOSE: DiagnoseReport;
  UNIT_DETAILS: QueryOutcome<UnitDetail[]>;
  NOTIFY_SAMPLE: { ok: true; hasContent: boolean };
}

export type BackgroundResponse<K extends keyof ResponseMap> = ResponseMap[K];

// ---------- 发送 ----------

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

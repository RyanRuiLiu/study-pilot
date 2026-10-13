/*
 * 中立模型：与平台无关的课程与任务。
 *
 * 为什么要它：看板要跨平台展示「各平台 × 各课程 × 各任务」，它上面不能出现
 * `mocTermDto`、`contentType` 这类某平台专属字段。各平台提供 adapter 把自己的
 * 数据映射成这里的类型，看板只认这里。
 *
 * 三条刻意的约束：
 *   - `state` 只有三态。`doing`（正在跑）是**运行时**状态，属于后台的运行状态，
 *     写进模型会让看板出现「刷新几次都卡在 doing」的假象。
 *   - `mode` 直接回答「谁来做」，不设能力数组：三种取值与现有功能一一对上。
 *   - 任务是**不可变数据**，不带方法：判断与执行仍在各自的模块里。
 */

/** 平台。当前只有 mooc，但模型不假定这一点。 */
export interface Platform {
  id: string;
  name: string;
}

export interface Course {
  platformId: string;
  courseId: number;
  /** 学期 id。平台用它作为许多接口的维度；不是所有平台都有 */
  termId?: number;
  name: string;
}

/**
 * 任务类别。
 *
 * 覆盖现有六种课件单元与四类工作项。取值是**展示与分组**用的，
 * 不代表「能不能自动做」——那由 `mode` 回答。
 */
export type TaskKind =
  | 'video'
  | 'document'
  | 'text'
  | 'discuss'
  | 'quiz'
  | 'homework'
  | 'exam-objective'
  | 'exam-subjective'
  | 'peer-review'
  | 'self-review';

/**
 * 谁来做。
 *
 *   auto      后台独立完成，人工零介入
 *   assisted  后台生成、需要人在页面看一眼或确认（例如讨论留言要 AI 写）
 *   manual    平台侧只能人工（主观题抄写、上传图片），前台负责把材料摆到眼前
 */
export type TaskMode = 'auto' | 'assisted' | 'manual';

/** 做到哪了。没有 `doing`——见文件头说明。 */
export type TaskState = 'todo' | 'done' | 'failed';

export interface Task {
  /** 全局唯一 id，由 {@link taskId} 生成。看板用它做 key */
  id: string;
  platformId: string;
  courseId: number;
  kind: TaskKind;
  title: string;
  /** 截止时间（毫秒）。0 或缺失表示平台未提供 */
  dueAt?: number;
  score?: number;
  maxScore?: number;
  mode: TaskMode;
  state: TaskState;
  /**
   * 跳转地址。由各平台的 adapter 生成——看板不认识任何平台的地址拼法，
   * 只负责把它挂到链接上。缺失表示这件事没有可跳转的页面。
   */
  link?: string;
}

/**
 * 任务 id 的**唯一**生成处。
 *
 * 格式：`平台:课程:类别:本地 id`。看板要能稳定地跨刷新认出同一个任务，
 * 因此不能各模块自己拼——同一件事两处拼法不同就会出现重复行。
 */
export function taskId(
  platformId: string,
  courseId: number,
  kind: TaskKind,
  localId: number | string,
): string {
  return `${platformId}:${courseId}:${kind}:${localId}`;
}

/**
 * 看板要的全部数据。
 *
 * `fetchedAt` 是**读快照的时刻**，不是此刻：看板打开时不发请求（见设计文档），
 * 必须把「数据有多旧」如实告诉用户，而不是让他以为看到的是最新。
 * 0 表示还没有快照。
 *
 * 单元明细不在这个模型里：平台的状态文案、互评进度与成绩公布只有向平台读一次
 * 才有，因此它由用户在看板上显式点「读取最新明细」触发，不进这个只读快照的模型。
 */
export interface DashboardView {
  fetchedAt: number;
  courses: Course[];
  tasks: Task[];
}


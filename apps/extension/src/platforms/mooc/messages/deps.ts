/*
 * 慕课的消息处理器需要的外界能力。
 *
 * 与 `MoocRunDeps` 的差别是它多一组 `shell`：诊断要把「运行状态」与「已装的
 * 请求头规则条数」如实报出来，而这两样属于外壳。**由外壳注入、平台不反向 import**
 * —— 类型来自外壳（type-only，运行时不产生依赖），值是外壳给的。
 */

import type { CourseSummary, CoursewareContext, MoocClient } from '@study-pilot/platform-mooc';
import type { LiveRunState, TaskState } from '../../../background/runtime/scheduler';
import type { Settings } from '../../../settings';
import type { InspectCourse, Snapshot } from '../read';

export interface MoocMessageDeps {
  client: MoocClient;
  /** 会话续期；返回是否真的续上了 */
  renew: () => Promise<boolean>;
  refreshCourses: () => Promise<
    | { ok: true; courses: CourseSummary[]; byType: unknown }
    | { ok: false; message: string; byType?: unknown }
  >;
  loadSnapshot: (courses: InspectCourse[], userId: number) => Promise<Snapshot>;
  selectedCourses: (settings: Settings) => InspectCourse[];
  coursewareContext: (settings: Settings) => CoursewareContext;
  /** 外壳自己的能力。诊断要如实报告它们，因此由外壳注进来。 */
  shell: {
    /** 执行状态：原始状态 + 人话结论 */
    runState: () => Promise<{ state: TaskState; live: LiveRunState }>;
    /** 清掉执行状态（诊断里的「重置」） */
    resetRunState: () => Promise<void>;
    /** 已安装的请求头规则条数 */
    netRuleCount: () => Promise<number>;
  };
}

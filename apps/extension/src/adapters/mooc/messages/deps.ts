/*
 * 慕课的消息处理器需要的外界能力。
 *
 * 与 `MoocRunDeps` 的差别是它多一组 `shell`：凡属于外壳的东西（把失败记进
 * 运行状态）**由外壳注入，平台不反向 import 执行面**——类型是 type-only
 * （运行时不产生依赖），值是外壳给的。
 */

import type { CourseSummary, CoursewareContext, MoocClient } from '@study-pilot/platform-mooc';
import type { Settings } from '../../../settings';
import type { InspectCourse, Snapshot } from '@study-pilot/platform-mooc';
import type { HostCapabilities } from '@study-pilot/application';

export interface MoocMessageDeps {
  /** 宿主能力（cookie）——平台自己不碰 browser.*，由外壳实现 */
  host: HostCapabilities;
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
  /** 外壳自己的能力：把一轮的失败如实记进运行状态，由弹窗显示 */
  shell: {
    recordFailure: (message: string) => Promise<void>;
  };
}

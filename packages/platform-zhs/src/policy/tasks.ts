/*
 * 智慧树的平台实现（后台半边）。
 *
 * 与慕课同一条契约（application/ports.ts 的 PlatformTasks）：调度层只看到
 * PlanItem 与 RunOutcome，courseId/recruitId/lessonId 这些装进 payload 原样往返。
 *
 * 计划 = 「勾选的课程里，所有未完成的视频单元」，按章节自然序（平台里部分课程
 * 禁止跨章学习，自然序同时满足那种约束）。每门课两次读取：videolist + queryStuyInfo。
 */

import type {
  ConfigPort,
  PlanItem,
  PlanResult,
  PlatformTasks,
  RunControl,
  RunOutcome,
  RunSelection,
  Settings,
} from '@study-pilot/application';
import type { ZhihuishuCourse } from '@study-pilot/application';
import type { ZhsClient } from '../client.ts';
import { readSession } from '../session.ts';
import { getCourseUnits, type ZhsUnit } from '../structure.ts';
import { executeUnit, type ExecuteUnitInput } from './execute.ts';

/** 平台跑一轮需要的外界能力。由装配层创建后注入（与慕课同一形状）。 */
export interface ZhsRunDeps {
  config: ConfigPort;
  client: ZhsClient;
}

/** 单元项的 id 与标题取名（界面展示与「只做这一条」回传都用它，必须同一份）。 */
export function unitItemId(unit: ZhsUnit): string {
  return `zhs-unit-${unit.videoId}-${unit.smallLessonId}`;
}

/** payload 形状由本文件保证（plan 放进去，run 取出来）。 */
interface UnitPayload {
  course: ZhihuishuCourse;
  unit: ZhsUnit;
}

export function createZhsTasks(deps: ZhsRunDeps): PlatformTasks {
  return {
    id: 'zhihuishu',
    name: '智慧树',

    async isReady(): Promise<boolean> {
      return (await readSession(deps.client)).loggedIn;
    },

    async plan(_now: number, scope?: RunSelection): Promise<PlanResult> {
      const settings = await deps.config.read();
      const selected = selectedCourses(settings, scope);
      if (selected.length === 0) return { items: [], blocked: 'no-course' };

      const session = await readSession(deps.client);
      if (!session.loggedIn) return { items: [], needsLogin: true };

      const items: PlanItem[] = [];
      for (const course of selected) {
        const units = await getCourseUnits(deps.client, {
          recruitAndCourseId: course.secret,
          recruitId: course.recruitId,
        });
        for (const unit of units) {
          if (unit.done) continue;
          items.push({
            id: unitItemId(unit),
            group: course.name,
            title: unit.name,
            mode: 'auto',
            kind: 'courseware',
            payload: { course, unit } satisfies UnitPayload,
          });
        }
      }
      return { items };
    },

    async run(item: PlanItem, _heartbeat: () => Promise<void>, control: RunControl): Promise<RunOutcome> {
      const { course, unit } = item.payload as UnitPayload;
      if (course.secret.length === 0) {
        return { status: 'failed', message: '课程缺少入口参数，请先读取课程列表' };
      }
      const session = await readSession(deps.client);
      if (!session.loggedIn) return { status: 'failed', message: '未登录' };

      const input: ExecuteUnitInput = {
        recruitAndCourseId: course.secret,
        courseId: course.courseId,
        recruitId: course.recruitId,
        unit,
        deviceUuid: session.uuid,
      };
      return executeUnit(deps.client, input, control);
    },
  };
}

/** 参与且勾选的课程；scope.group 按课程名收窄（与界面上的「只做这门课」同一语义）。 */
function selectedCourses(settings: Settings, scope?: RunSelection): ZhihuishuCourse[] {
  const enabled = settings.zhihuishu.courses.filter((course) => course.enabled);
  if (scope?.group === undefined) return enabled;
  return enabled.filter((course) => course.name === scope.group);
}

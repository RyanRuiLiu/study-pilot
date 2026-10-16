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
} from '@study-pilot/application';
import type { ZhihuishuCourse } from '@study-pilot/application';
import type { ZhsClient } from '../client.ts';
import { readCourseIsApply, selectedCourses } from '../courses.ts';
import { readSession, type CookieReader } from '../session.ts';
import { getCourseUnits, type ZhsUnit } from '../structure.ts';
import { executeUnit, type ExecuteUnitInput } from './execute.ts';

/** 平台跑一轮需要的外界能力。由装配层创建后注入（与慕课同一形状）。 */
export interface ZhsRunDeps {
  config: ConfigPort;
  client: ZhsClient;
  /** 读 cookie 的宿主能力：会话判定的唯一来源（见 session.ts） */
  readCookie: CookieReader;
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
  /**
   * 每课一份 isApply（开课载荷用料）。真实页面每次加载读一次 queryCourse；
   * 我们按「一轮里每课一次」对齐——plan 开始时清空，同轮各单元共用一份。
   */
  const isApplyByCourse = new Map<number, Promise<number | string>>();

  function isApplyOf(course: ZhihuishuCourse): Promise<number | string> {
    let entry = isApplyByCourse.get(course.courseId);
    if (entry === undefined) {
      entry = readCourseIsApply(deps.client, course.secret);
      // 失败不进缓存（取钥先例）：下次调用应该重试，而不是永远拿到那个失败的 Promise
      entry.catch(() => isApplyByCourse.delete(course.courseId));
      isApplyByCourse.set(course.courseId, entry);
    }
    return entry;
  }

  return {
    id: 'zhihuishu',
    name: '智慧树',

    async isReady(): Promise<boolean> {
      return (await readSession(deps.readCookie)).loggedIn;
    },

    async plan(_now: number, scope?: RunSelection): Promise<PlanResult> {
      isApplyByCourse.clear();
      const settings = await deps.config.read();
      const selected = selectedCourses(settings, scope);
      if (selected.length === 0) return { items: [], blocked: 'no-course' };

      const session = await readSession(deps.readCookie);
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
      const session = await readSession(deps.readCookie);
      if (!session.loggedIn) return { status: 'failed', message: '未登录' };

      let isApply: number | string;
      try {
        isApply = await isApplyOf(course);
      } catch (error) {
        return { status: 'failed', message: error instanceof Error ? error.message : String(error) };
      }

      const input: ExecuteUnitInput = {
        recruitAndCourseId: course.secret,
        courseId: course.courseId,
        recruitId: course.recruitId,
        unit,
        deviceUuid: session.uuid,
        isApply,
      };
      // 快速模式：单元内无长等待，心跳交还给外壳自己的节奏
      return executeUnit(deps.client, input, control);
    },
  };
}


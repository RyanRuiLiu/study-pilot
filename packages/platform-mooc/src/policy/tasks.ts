/*
 * 慕课的平台实现（后台半边）。
 *
 * 这里拥有慕课的全部后台流程：会话、刷新课程、读最新数据（带会话恢复）、派生计划、
 * 执行。调度层只看到 PlanItem 与 RunOutcome，不认识 courseId、tid、
 * contentType 这些字段——它们是慕课的事，装进 payload 里交回这里。
 *
 * 从 src/background/run-tasks.ts 搬来，逻辑逐行保留；唯一变化是"谁调用谁"：
 * 以前后台直接写慕课的流程，现在平台把流程包成两个动作（plan / run）。
 */

import type { MoocClient } from '../client.ts';
import type { CoursewareContext } from '../courseware/index.ts';
import type { ConfigPort, HostCapabilities, Settings } from '@study-pilot/application';
import { ensureSession, SessionExpiredError } from './session.ts';
import { withSessionRecovery } from './recovery.ts';
import type { PlanItem, PlanResult, PlatformTasks, RunOutcome } from '@study-pilot/application';
import { executeActions } from './execute/index.ts';
import { derivePlan, type Plan } from './plan/index.ts';
import type { InspectCourse, Snapshot } from './read/index.ts';

/** 平台跑一轮需要的外界能力。全由入口创建后注入，平台自己不碰浏览器全局。 */
export interface MoocRunDeps {
  /** 宿主能力（cookie），由外壳实现；平台自己不碰 browser.* */
  host: HostCapabilities;
  /** 配置端口：配置的读写由载体提供，平台不直接碰存储 */
  config: ConfigPort;
  client: MoocClient;
  renew: () => Promise<boolean>;
  refreshCourses: () => Promise<
    | { ok: true; courses: unknown[]; byType: unknown }
    | { ok: false; message: string; byType?: unknown }
  >;
  loadSnapshot: (courses: InspectCourse[], userId: number) => Promise<Snapshot>;
  selectedCourses: (settings: Settings) => InspectCourse[];
  coursewareContext: (settings: Settings) => CoursewareContext;
  /** 失败记进外壳的运行状态（平台不反向依赖执行面，这是注入进来的端口） */
  recordFailure: (message: string) => Promise<void>;
}

/**
 * 项的 id：课件按单元、其余按工作项，两者字段不同，因此各自取名。
 *
 * id 是「哪一项的结果」的唯一凭据：`run` 按它落结果、`report` 按它取结果。
 * 这里少写一个插值（曾经两项都只回 `work-`），一轮里的工作项就会共用同一条
 * 结果，通知里「做了什么」全部错位到最后一项。
 */
function idOf(action: Plan['auto'][number]): string {
  return action.kind === 'courseware' ? `courseware-${action.unit.unitId}` : `work-${action.work.tid}`;
}

/** 项的标题：同样按类别取（课件用单元名，其余用工作项名）。 */
function titleOf(action: Plan['auto'][number]): string {
  return action.kind === 'courseware' ? action.unit.name : action.work.name;
}

/** 计划 → 调度层的项。做法与顺序都是慕课自己的判断，调度层只挑 auto 的执行。 */
function toItems(plan: Plan): PlanItem[] {
  return [
    ...plan.auto.map((action) => ({
      id: idOf(action),
      group: action.course.courseName,
      title: titleOf(action),
      mode: 'auto' as const,
      payload: action,
    })),
    ...plan.manual.map((item) => ({
      id: `manual-${item.work.tid}`,
      group: item.course.courseName,
      title: item.work.name,
      mode: 'manual' as const,
      payload: item,
    })),
  ];
}

export function createMoocTasks(deps: MoocRunDeps): PlatformTasks {
  return {
    id: 'mooc',
    name: '中国大学 MOOC',

    async isReady(): Promise<boolean> {
      return (await ensureSession(deps.host)).loggedIn;
    },

    async plan(now: number): Promise<PlanResult> {
      const settings = await deps.config.read();
      const courses = deps.selectedCourses(settings);
      if (courses.length === 0) return { items: [], blocked: 'no-course' };

      const session = await ensureSession(deps.host);
      if (!session.loggedIn) return { items: [], needsLogin: true };

      /*
       * 课程列表先刷新：勾选的课程可能变动，而后续读取按它进行。
       *
       * 刷新失败不中止本轮（本轮用的勾选来自设置），但**如实记下来**——
       * 从前这里是 `.catch(() => undefined)`，「少了一类课程」与「什么都没读到」
       * 在界面上与成功一模一样。
       *
       * 会话失效是例外：它留给下一步 `withSessionRecovery` 统一处置
       * （先续期再重读，救不回来才挂起等登录），这里不重复判一次。
       */
      let refreshFailure: string | null = null;
      try {
        const refreshed = await deps.refreshCourses();
        if (!refreshed.ok) refreshFailure = refreshed.message;
      } catch (error) {
        if (!(error instanceof SessionExpiredError)) {
          refreshFailure = error instanceof Error ? error.message : String(error);
        }
      }
      if (refreshFailure !== null) await deps.recordFailure(`课程列表未刷新：${refreshFailure}`);

      /*
       * 快照读取带会话恢复。
       *
       * 长时间闲置后的那次检查最容易撞上「cookie 还在、服务端会话已死」：
       * 此时平台回的是未登录形态的空数据，不恢复会话就会把空快照当事实，
       * 一整天不发通知也不报错。恢复不了则挂起等登录——沿用启动时
       * 未登录的同一机制，用户在平台上重新活动后自动补做。
       */
      const recovered = await withSessionRecovery(
        () => deps.loadSnapshot(courses, session.userId),
        deps.renew,
      );
      if (!recovered.ok) {
        if (recovered.kind === 'login') return { items: [], needsLogin: true };
        throw new Error(recovered.message);
      }

      const plan = derivePlan(recovered.value, settings, now);
      return { items: toItems(plan) };
    },

    async run(item: PlanItem, heartbeat: () => Promise<void>): Promise<RunOutcome> {
      const action = item.payload;
      // payload 是本平台 plan() 放进去的，形状由本文件保证
      const settings = await deps.config.read();
      const session = await ensureSession(deps.host);
      const [result] = await executeActions(
        deps.client,
        [action as Parameters<typeof executeActions>[1][number]],
        session.userId,
        settings.mooc.background.autoReview.comment,
        heartbeat,
        deps.coursewareContext(settings),
      );
      if (result === undefined) return { status: 'skipped', message: '没有可执行的动作' };

      return { status: result.status, message: result.detail };
    },

  };
}

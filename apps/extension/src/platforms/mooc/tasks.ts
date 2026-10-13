/*
 * 慕课的平台实现（后台半边）。
 *
 * 这里拥有慕课的全部后台流程：会话、刷新课程、读快照（带会话恢复）、派生计划、
 * 执行、组织通知。调度层只看到 PlanItem 与 RunOutcome，不认识 courseId、tid、
 * contentType 这些字段——它们是慕课的事，装进 payload 里交回这里。
 *
 * 从 src/background/run-tasks.ts 搬来，逻辑逐行保留；唯一变化是"谁调用谁"：
 * 以前后台直接写慕课的流程，现在平台把流程包成三个动作（plan / run / report）。
 */

import type { CoursewareContext, MoocClient } from '@study-pilot/platform-mooc';
import { ensureSession } from '../../platform/mooc/session';
import { withSessionRecovery } from './recovery.ts';
import { getSettings, type Settings } from '../../settings';
import type { PlanItem, PlanResult, PlatformTasks, RunOutcome } from '../types.ts';
import { executeActions, type ExecResult } from './execute';
import { derivePlan, shouldRefresh, type Plan } from './plan';
import { fetchedToday, readSnapshot, type InspectCourse, type Snapshot } from './read';
import { composeNotice, noticeSettingsOf, notify } from './reminder';

/** 平台跑一轮需要的外界能力。全由入口创建后注入，平台自己不碰浏览器全局。 */
export interface MoocRunDeps {
  client: MoocClient;
  renew: () => Promise<boolean>;
  refreshCourses: () => Promise<
    | { ok: true; courses: unknown[]; byType: unknown }
    | { ok: false; message: string; byType?: unknown }
  >;
  loadSnapshot: (courses: InspectCourse[], userId: number) => Promise<Snapshot>;
  selectedCourses: (settings: Settings) => InspectCourse[];
  coursewareContext: (settings: Settings) => CoursewareContext;
}

/**
 * 本地已有快照是否算「今天拉过」。
 *
 * 读失败不当作拉过：否则一次存储异常会让今天再也不会重新拉取，
 * 而用户看不到任何异常——只是所有判断都基于越来越旧的数据。
 */
async function snapshotIsFresh(now: number): Promise<boolean> {
  try {
    return fetchedToday(await readSnapshot(), now);
  } catch {
    return false;
  }
}

/** 项的 id：课件按单元、其余按工作项，两者字段不同，因此各自取名。 */
function idOf(action: Plan['auto'][number]): string {
  return action.kind === 'courseware' ? `courseware-` : `work-`;
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
      title: titleOf(action),
      mode: 'auto' as const,
      payload: action,
    })),
    ...plan.manual.map((item) => ({
      id: `manual-${item.work.tid}`,
      title: item.work.name,
      mode: 'manual' as const,
      payload: item,
    })),
  ];
}

export function createMoocTasks(deps: MoocRunDeps): PlatformTasks {
  /** 本轮的计划。report 要用它组织通知：计划是执行前算的，执行后有些项已经完成了。 */
  let planned: Plan | null = null;
  /** 本轮的执行结果，按项记下；payload 与结果都是慕课自己的形状。 */
  const results = new Map<string, ExecResult>();

  return {
    id: 'mooc',
    name: '中国大学 MOOC',

    async isReady(): Promise<boolean> {
      return (await ensureSession()).loggedIn;
    },

    async plan(now: number): Promise<PlanResult> {
      const settings = await getSettings();
      const courses = deps.selectedCourses(settings);
      if (courses.length === 0) return { items: [] };

      let snapshot: Snapshot | null;
      try {
        snapshot = await readSnapshot();
      } catch {
        snapshot = null;
      }

      /*
       * 快照为空时 shouldRefresh 必定为真（没有快照什么都判断不了），
       * 因此这里同时判空只是为了把这条不变式写进代码，让分支里拿到确定的非空类型。
       */
      if (snapshot !== null && !shouldRefresh(snapshot, settings, await snapshotIsFresh(now), now)) {
        /*
         * 不必拉取：快照说没有能自动完成的事，且今天已经全量看过。
         * 用快照出提醒后结束——截止时间一旦发布就不会变，
         * 所以快照里的它是可靠的；而"是否已完成"会变，所以只报未完成的。
         */
        const plan = derivePlan(snapshot, settings, now);
        planned = plan;
        await notify(composeNotice(plan, [], noticeSettingsOf(settings), now));
        return { items: toItems(plan) };
      }

      const session = await ensureSession();
      if (!session.loggedIn) return { items: [], needsLogin: true };

      // 课程列表先刷新：勾选的课程可能变动，而后续读取按它进行
      await deps.refreshCourses().catch(() => undefined);

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
      planned = plan;
      return { items: toItems(plan) };
    },

    async run(item: PlanItem, heartbeat: () => Promise<void>): Promise<RunOutcome> {
      const action = item.payload;
      // payload 是本平台 plan() 放进去的，形状由本文件保证
      const settings = await getSettings();
      const session = await ensureSession();
      const [result] = await executeActions(
        deps.client,
        [action as Parameters<typeof executeActions>[1][number]],
        session.userId,
        settings.mooc.background.autoReview.comment,
        heartbeat,
        deps.coursewareContext(settings),
      );
      if (result === undefined) return { status: 'skipped', message: '没有可执行的动作' };

      results.set(item.id, result);
      return { status: result.status, message: result.detail };
    },

    /**
     * 收尾通知。
     *
     * 结果要与计划一起交给通知：计划是执行之前算的，里面写着「将自动完成」，
     * 而执行之后那些事已经完成了。只用计划组织通知，用户会以为它们还没做；
     * 分两次发（执行后一次、再补一次）则会把同一件事说两遍。
     */
    async report(items: PlanItem[], outcomes: RunOutcome[], now: number): Promise<void> {
      const plan = planned;
      if (plan === null) return;
      planned = null;

      const done = items
        .map((item) => results.get(item.id))
        .filter((result): result is ExecResult => result !== undefined);
      results.clear();

      // 没有自动项、也没有失败项时不必打扰用户；计划本身会说明还剩什么
      if (done.length === 0 && outcomes.every((outcome) => outcome.status !== 'failed')) return;

      const settings = await getSettings();
      await notify(composeNotice(plan, done, noticeSettingsOf(settings), now));
    },
  };
}

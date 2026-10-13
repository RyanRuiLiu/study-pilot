/*
 * 自动执行一轮：拉最新、派生计划、执行、通知。
 *
 * 从 entrypoints/background.ts 移出。入口创建的东西（客户端、会话续期、
 * 课程刷新、快照读取、课程选取、课件上下文）经 deps 传入。
 *
 * 函数体是从入口原样搬过来的：开头把 deps 解构成同名局部变量，
 * 搬过来的代码因此一个字都不用改。
 */

import type { CoursewareContext, MoocClient } from '@study-pilot/platform-mooc';
import type { InspectCourse, Snapshot } from './mooc/snapshot';
import type { Settings } from '../settings';
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
import { getSettings } from '../settings';
import { ensureSession } from '../platform/mooc/session';
import { executeActions } from './mooc/execute';
import { composeNotice, noticeSettingsOf, notify } from './mooc/reminder';
import { fetchedToday, readSnapshot } from './mooc/snapshot';
import { derivePlan, shouldRefresh } from './mooc/task-plan';
import {
  beginRun,
  canStartRun,
  clearAwaitingLogin,
  finishRun,
  getTaskState,
  markAwaitingLogin,
  touchRun,
} from './runtime/scheduler';
import { withSessionRecovery } from './runtime/session-recovery';

export interface RunDeps {
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

export async function autoRun(deps: RunDeps): Promise<void> {
  const { client, renew, refreshCourses, loadSnapshot, selectedCourses, coursewareContext } = deps;
    const settings = await getSettings();
    if (!settings.enabled) return;

    const state = await getTaskState();
    if (!canStartRun(state)) return;

    const session = await ensureSession();
    if (!session.loggedIn) {
      await markAwaitingLogin();
      return;
    }
    await clearAwaitingLogin();

    const courses = selectedCourses(settings);
    if (courses.length === 0) return;

    /*
     * 立即开始，不等待。
     *
     * 此前这里有一项「启动延迟」（sleep 几分钟）供用户错开启动高峰，已经删掉：
     * 它对中断恢复没有任何作用——「接着做」与否由 scheduler 的 runningSince
     * 与心跳判定，与等待无关；而睡在 setTimeout 里时 MV3 可以把 worker 回收掉，
     * 那一次启动检查就丢了，静默地少跑一轮。
     */

    const now = Date.now();

    // 读快照。读不出来就当作没有，会走拉取分支
    let snapshot: Snapshot | null;
    try {
      snapshot = await readSnapshot();
    } catch {
      snapshot = null;
    }

    const fresh = await snapshotIsFresh(now);

    /*
     * 快照为空时 shouldRefresh 必定为真（没有快照什么都判断不了），
     * 因此这里同时判空只是为了把这条不变式写进代码，让分支里拿到确定的非空类型。
     */
    if (snapshot !== null && !shouldRefresh(snapshot, settings, fresh, now)) {
      /*
       * 不必拉取：快照说没有能自动完成的事，且今天已经全量看过。
       * 用快照出提醒后结束——截止时间一旦发布就不会变，
       * 所以快照里的它是可靠的；而"是否已完成"会变，所以只报未完成的。
       */
      await notify(composeNotice(derivePlan(snapshot, settings, now), [], noticeSettingsOf(settings), now));
      return;
    }

    await beginRun(now);
    /*
     * 因登录挂起的结论先记在这里，收尾之后才落盘。
     *
     * finishRun 会把 awaitingLogin 一并清掉（它假定本轮正常结束），
     * 若在 try 内落标记，会被本轮自己的收尾立刻抹掉——挂起就没人记得了。
     */
    let suspendedLogin = false;
    try {
      /*
       * 每一步之前刷新心跳。
       *
       * 一轮执行里有好几次网络往返。心跳过期会让界面把「正在跑」读成
       * 「上次没结束」——那是用户最容易被误导的地方，他会以为扩展卡住了，
       * 而实际上一切正常。刷心跳只是一次本地存储写入，相比一次接口调用
       * 可以忽略。
       */
      await touchRun();

      // 课程列表先刷新：勾选的课程可能变动，而后续读取按它进行
      await refreshCourses().catch(() => undefined);

      await touchRun();

      /*
       * 快照读取带会话恢复。
       *
       * 长时间闲置后的那次检查最容易撞上「cookie 还在、服务端会话已死」：
       * 此时平台回的是未登录形态的空数据，不恢复会话就会把空快照当事实，
       * 一整天不发通知也不报错。恢复不了则挂起等登录——沿用启动时
       * 未登录的同一机制，用户在平台上重新活动后自动补做。
       */
      const recovered = await withSessionRecovery(
        () => loadSnapshot(courses, session.userId),
        renew,
      );
      if (!recovered.ok) {
        if (recovered.kind !== 'login') throw new Error(recovered.message);
        suspendedLogin = true;
      } else {
        const latest = recovered.value;

        const plan = derivePlan(latest, settings, now);

        /*
         * 执行并只发一次通知。
         *
         * 结果要与计划一起交给通知：计划是执行之前算的，里面写着「将自动完成」，
         * 而执行之后那些事已经完成了。只用计划组织通知，用户会以为它们还没做；
         * 分两次发（执行后一次、再补一次）则会把同一件事说两遍。
         */
        const results =
          plan.auto.length > 0
            ? await executeActions(
                client,
                plan.auto,
                session.userId,
                settings.mooc.background.autoReview.comment,
                // 每完成一项刷一次心跳：一轮里可能有好几项，中间任何一项卡住
                // 都会让心跳过期，界面于是把「正在跑」读成「上次没结束」
                () => touchRun(),
                coursewareContext(settings),
              )
            : [];

        await notify(composeNotice(plan, results, noticeSettingsOf(settings), now));
      }
    } finally {
      await finishRun();
    }

    // 已在 beginRun 之后收尾完毕，此刻落挂起标记不会再被 finishRun 抹掉
    if (suspendedLogin) await markAwaitingLogin();
  }
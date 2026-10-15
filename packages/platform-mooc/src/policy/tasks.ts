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
import type { ConfigPort, HostCapabilities, RunControl, RunSelection, Settings } from '@study-pilot/application';
import { hasTextGenerator } from '@study-pilot/application';
import { BankCache } from './execute/bank.ts';
import { ensureSession, SessionExpiredError } from './session.ts';
import { withSessionRecovery } from './recovery.ts';
import type { PlanItem, PlanResult, PlatformTasks, RunOutcome } from '@study-pilot/application';
import { executeActions } from './execute/index.ts';
import { derivePlan, type ManualItem, type Plan } from './plan/index.ts';
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
  /**
   * AI 文本能力的**实测**判断。缺省按设置推断（hasTextGenerator）；
   * 载体加了自身条件时交进来——浏览器里主机权限可能被撤回，「设置齐」
   * 不等于「此刻可用」，而讨论单元进了队列就是一条必失败项。
   */
  textAvailable?: (settings: Settings) => Promise<boolean> | boolean;
  /** 失败记进外壳的运行状态（平台不反向依赖执行面，这是注入进来的端口） */
  recordFailure: (message: string) => Promise<void>;
}

/*
 * 计划项的 id：执行、结果归属与「只做这一条」的选择都靠它。
 *
 * id 是「哪一项的结果」的唯一凭据：`run` 按它落结果、`report` 按它取结果。
 * 必须两两不同——同一份作业的互评与自评是两条独立事项（kind 参与取名），
 * 同一个 tid 的两个人工原因也是两条（reason 参与取名）。旧写法只带 tid，
 * 同一份作业同时欠互评与自评时两条 id 会撞在一起：按条目执行时点一条，
 * 另一条会被一起做掉。
 *
 * 这三个构造函数导出：界面展示待办时要用同一份取名（entry.itemIds），
 * 点「执行」再原样发回来——两处各写一份取名规则必然漂移。
 * 界面会把同份作业的互评与自评合成一行、两条 id 一起发回：那是有意
 * 一起做（把「这一阶段」当成一件事）；id 仍各自唯一，逐项结果才分得开。
 */

/** 工作项（测验/互评/自评）。 */
export function workItemId(tid: number, kind: string): string {
  return `work-${tid}-${kind}`;
}

/** 课件单元。 */
export function coursewareItemId(unitId: number): string {
  return `courseware-${unitId}`;
}

/** 人工项（作业/考试/过期）。 */
export function manualItemId(tid: number, reason: string): string {
  return `manual-${tid}-${reason}`;
}

function idOf(action: Plan['auto'][number]): string {
  return action.kind === 'courseware'
    ? coursewareItemId(action.unit.unitId)
    : workItemId(action.work.tid, action.kind);
}

/** 项的标题：同样按类别取（课件用单元名，其余用工作项名）。 */
function titleOf(action: Plan['auto'][number]): string {
  return action.kind === 'courseware' ? action.unit.name : action.work.name;
}

/**
 * 人工项的原因 → 核心要的类别字符串。
 *
 * 与自动项的 kind 取同一套词：界面按类别筛执行范围、按类别算「待你处理」的
 * 计数，两半必须是同一个意思——否则「只做待办那几类」会漏掉人工项，
 * 数字也会对不上。
 */
const MANUAL_KINDS: Record<ManualItem['reason'], string> = {
  'homework-unsubmitted': 'homework',
  'homework-overdue': 'homework',
  'quiz-overdue': 'quiz',
  'review-overdue': 'review',
  'self-overdue': 'self',
  exam: 'exam',
  'exam-overdue': 'exam',
};

/** 计划 → 调度层的项。做法与顺序都是慕课自己的判断，调度层只挑 auto 的执行。 */
function toItems(plan: Plan): PlanItem[] {
  return [
    ...plan.auto.map((action) => ({
      id: idOf(action),
      group: action.course.courseName,
      title: titleOf(action),
      mode: 'auto' as const,
      kind: action.kind,
      payload: action,
    })),
    ...plan.manual.map((item) => ({
      id: manualItemId(item.work.tid, item.reason),
      group: item.course.courseName,
      title: item.work.name,
      mode: 'manual' as const,
      kind: MANUAL_KINDS[item.reason],
      payload: item,
    })),
  ];
}

export function createMoocTasks(deps: MoocRunDeps): PlatformTasks {
  /*
   * 题库缓存整轮一份：同一门课的题库在单元测验、随堂测验之间共用。
   * 放在这里（而不是每次执行现建）才真正有「缓存」的意思——见 bank.ts。
   */
  const bank = new BankCache();

  return {
    id: 'mooc',
    name: '中国大学 MOOC',

    async isReady(): Promise<boolean> {
      return (await ensureSession(deps.host)).loggedIn;
    },

    async plan(now: number, scope?: RunSelection): Promise<PlanResult> {
      const settings = await deps.config.read();
      const selected = deps.selectedCourses(settings);
      // 按范围收窄：只做某门课时不读别的课（每门课一次结构读取）
      const courses =
        scope?.group === undefined
          ? selected
          : selected.filter((course) => course.name === scope.group);
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
       *
       * 收窄的一轮跳过它：按课程（group）或按条目（ids，「单独完成这一条」）
       * 的一轮目标已定，刷新更新的是「勾选了哪些课」，对本次执行没有贡献——
       * 省两个请求与一个往返。
       */
      let refreshFailure: string | null = null;
      if (scope?.group === undefined && scope?.ids === undefined) {
        try {
          const refreshed = await deps.refreshCourses();
          if (!refreshed.ok) refreshFailure = refreshed.message;
        } catch (error) {
          if (!(error instanceof SessionExpiredError)) {
            refreshFailure = error instanceof Error ? error.message : String(error);
          }
        }
        if (refreshFailure !== null) await deps.recordFailure(`课程列表未刷新：${refreshFailure}`);
      }

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

      const textAvailable =
        deps.textAvailable !== undefined
          ? await deps.textAvailable(settings)
          : hasTextGenerator(settings);
      const plan = derivePlan(recovered.value, settings, now, textAvailable);
      return { items: toItems(plan) };
    },

    async run(item: PlanItem, heartbeat: () => Promise<void>, control: RunControl): Promise<RunOutcome> {
      const action = item.payload;
      // payload 是本平台 plan() 放进去的，形状由本文件保证
      const settings = await deps.config.read();
      const session = await ensureSession(deps.host);
      const [result] = await executeActions(
        deps.client,
        [action as Parameters<typeof executeActions>[1][number]],
        session.userId,
        settings.mooc.reviewComment,
        heartbeat,
        // 随堂测验（课件行为）也吃同一份题库缓存
        { ...deps.coursewareContext(settings), bank },
        control,
        bank,
      );
      if (result === undefined) return { status: 'skipped', message: '没有可执行的动作' };

      return { status: result.status, message: result.detail };
    },

  };
}

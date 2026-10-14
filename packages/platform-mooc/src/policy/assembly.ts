/*
 * 本厂商的装配：把「要跑一轮的平台」与「外壳要观察的信号」拼出来。
 *
 * 它属于厂商，不属于载体。客户端怎么建、哪些课程算勾选、讨论单元要不要文本能力，
 * 都是慕课的事实；载体只提供它自己拥有的那几样（宿主能力、配置端口、失败记账、
 * 文本生成器工厂）。放在包里之后，第二个载体（命令行、服务端）不必抄一遍这段装配——
 * 这正是「厂商装配留在 app 里」时会出现的问题：另一个 app 只能复制。
 *
 * 消息适配器要的那几样也一并交出去（host / client / renew / loadSnapshot / …），
 * 但**消息的形状不在这里**：那是各载体自己的事（扩展的消息契约在 apps/extension）。
 */

import type {
  ConfigPort,
  HostCapabilities,
  PlatformTasks,
  PlatformWiring,
  Settings,
} from '@study-pilot/application';
import type { CourseSummary } from '../types.ts';
import type { CoursewareContext, TextGenerator } from '../courseware/index.ts';
import type { MoocClient, MoocClientOptions } from '../client.ts';
import { createPlatformClient, loadSnapshot, refreshCourses, type PlatformClient } from './sync.ts';
import { createMoocTasks, type MoocRunDeps } from './tasks.ts';
import { MOOC_REQUEST_RULES } from './net-rules.ts';
import type { InspectCourse, Snapshot } from './read/index.ts';

/** 载体必须提供的东西。 */
export interface MoocCarrierDeps {
  host: HostCapabilities;
  config: ConfigPort;
  /** 把失败记进载体的运行状态（平台不反向依赖执行面，因此由载体注入） */
  recordFailure: (message: string) => Promise<void>;
  /**
   * 出站环境：不给就用全局 fetch（扩展那一侧靠 declarativeNetRequest 改写 Origin 与 Cookie）。
   * 没有那层改写的载体（命令行、服务端）交一个自己设头的 fetch。
   */
  fetch?: MoocClientOptions['fetch'];
  /**
   * 文本生成器工厂：讨论单元的留言要用它。
   *
   * 载体给不出就传 undefined——那些单元于是进人工（计划层按 hasTextGenerator 判断），
   * 执行层也不会假装成功。这里不做替代实现。
   */
  textGenerator?: (settings: Settings) => TextGenerator | undefined;
}

/** 本厂商的运行件。 */
export interface MoocRuntime {
  /** 要跑一轮时的平台实例（现建：平台自己的本轮状态不跨轮残留） */
  tasks: () => PlatformTasks;
  /** 外壳要观察的信号：登录凭证 cookie 与请求头规则 */
  wiring: PlatformWiring;
  host: HostCapabilities;
  client: MoocClient;
  renew: () => Promise<boolean>;
  refreshCourses: () => Promise<
    | { ok: true; courses: CourseSummary[]; byType: unknown }
    | { ok: false; message: string; byType?: unknown }
  >;
  loadSnapshot: (courses: InspectCourse[], userId: number) => Promise<Snapshot>;
  selectedCourses: (settings: Settings) => InspectCourse[];
  coursewareContext: (settings: Settings) => CoursewareContext;
}

/**
 * 当前勾选参与任务的课程。
 *
 * 只取已勾选且带完整定位信息的：拼跳转地址需要 courseId 与 schoolShortName，
 * 缺了它们的课程能读但点不进去，列出来只会让用户多点一次空链接。
 */
export function selectedCourses(settings: Settings): InspectCourse[] {
  return settings.mooc.background.courses
    .filter((course) => course.enabled)
    .map((course) => ({
      termId: course.termId,
      courseId: course.courseId,
      schoolShortName: course.schoolShortName,
      mode: course.mode,
      name: course.name,
    }));
}

export function createMoocRuntime(carrier: MoocCarrierDeps): MoocRuntime {
  const { client, renew }: PlatformClient = createPlatformClient(carrier.host, carrier.fetch);

  /*
   * 课件行为的上下文：只有一处来源——设置里的 AI 配置加上载体给的生成器工厂。
   * 没配齐时 generateText 为 undefined，而讨论单元本来就不会进计划
   * （`isCompletable` 的 needs:'text'），所以这里不做任何替代。
   */
  const coursewareContext = (settings: Settings): CoursewareContext => ({
    generateText: carrier.textGenerator?.(settings),
  });

  /*
   * 刷新课程列表。这里的类型写成具体形状：消息适配器要把 courses 交回界面。
   * MoocRunDeps 那边只关心 ok / message（平台不解释课程形状），所以那边声明得松，
   * 两边都从这一个闭包走，避免两处各写一份。
   */
  const refresh = async (): Promise<
    | { ok: true; courses: CourseSummary[]; byType: unknown }
    | { ok: false; message: string; byType?: unknown }
  > => refreshCourses(client, carrier.config);

  const runDeps: MoocRunDeps = {
    host: carrier.host,
    config: carrier.config,
    client,
    renew,
    refreshCourses: refresh,
    loadSnapshot: (courses, userId) => loadSnapshot(client, courses, userId),
    selectedCourses,
    coursewareContext,
    recordFailure: carrier.recordFailure,
  };

  return {
    host: carrier.host,
    client,
    renew,
    // 这里用具体形状的闭包，不用 runDeps 上的那份（那边声明得松，见上面的说明）
    refreshCourses: refresh,
    loadSnapshot: runDeps.loadSnapshot,
    selectedCourses,
    coursewareContext,
    tasks: () => createMoocTasks(runDeps),
    /*
     * 登录后才下发的是 STUDY_INFO 与 STUDY_SESS；NTESTUDYSI 在访客状态下也有，
     * 不能当登录信号（见本包 policy/session.ts 的 cookie 分工表）。
     */
    wiring: {
      id: 'mooc',
      loginCookie: { name: 'STUDY_INFO', domain: 'icourse163.org' },
      requestRules: MOOC_REQUEST_RULES,
    },
  };
}

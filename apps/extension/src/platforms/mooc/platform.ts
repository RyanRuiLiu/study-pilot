/*
 * 慕课的装配点。
 *
 * 外壳（`entrypoints/background.ts`）只调这一个函数，不再直接 import 平台的
 * read / plan / execute —— 那几样是慕课的内部实现，换平台时不该牵动外壳。
 *
 * 这里把平台需要的外界能力拼好后，交出两样东西：
 *   handlers  消息处理器表（交给外壳的路由）
 *   tasks()   要跑一轮时的平台实例（每次现建，避免本轮状态跨轮残留）
 */

import type { CoursewareContext } from '@study-pilot/platform-mooc';
import { createTextGenerator } from '../../ai';
import type { MessageHandlers } from '../../browser/messaging';
import type { PlatformWiring } from '../types.ts';
import type { Settings } from '../../settings';
import type { PlatformTasks } from '../types.ts';
import type { MoocMessageDeps } from './messages/deps.ts';
import type { MoocHost } from './host.ts';
import { moocHandlers } from './messages/handlers.ts';
import type { InspectCourse } from './read';
import { createPlatformClient, loadSnapshot, refreshCourses } from './sync.ts';
import { MOOC_REQUEST_RULES } from './net-rules.ts';
import { createMoocTasks } from './tasks.ts';

/**
 * 外壳给出的东西：只有它自己拥有的能力。
 *
 * host 是宿主能力（cookie 读取、系统通知）；客户端与会话续期由本平台自己建。
 */
export interface MoocEnv {
  host: MoocHost;
  shell: MoocMessageDeps['shell'];
}

/**
 * 课件行为的上下文。
 *
 * 只有一处来源：设置里的 AI 配置。没配齐时 `generateText` 为 undefined，
 * 而讨论单元本来就不会进计划（`isCompletable` 的 `needs:'text'`），
 * 所以这里不做任何替代——真到了执行层而没有生成器，行为会如实返回失败。
 */
function coursewareContext(settings: Settings): CoursewareContext {
  return { generateText: createTextGenerator(settings) };
}

/**
 * 当前勾选参与任务的课程。
 *
 * 只取已勾选且带完整定位信息的：拼跳转地址需要 courseId 与 schoolShortName，
 * 缺了它们的课程能读但点不进去，列出来只会让用户多点一次空链接。
 */
function selectedCourses(settings: Settings): InspectCourse[] {
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

export interface MoocPlatform {
  handlers: MessageHandlers;
  /** 要跑一轮时的平台实例（现建，见上面的说明） */
  tasks: () => PlatformTasks;
  /** 外壳要观察的信号：登录 cookie 与通知前缀 */
  wiring: PlatformWiring;
}

export function createMoocPlatform(env: MoocEnv): MoocPlatform {
  const { client, renew } = createPlatformClient(env.host);
  const deps: MoocMessageDeps = {
    host: env.host,
    client,
    renew,
    refreshCourses: () => refreshCourses(client),
    loadSnapshot: (courses, userId) => loadSnapshot(client, courses, userId),
    selectedCourses,
    coursewareContext,
    shell: env.shell,
  };


  return {
    handlers: moocHandlers(deps),
    tasks: () => createMoocTasks({ ...deps, recordFailure: env.shell.recordFailure }),
    /*
     * 登录后才下发的是 STUDY_INFO 与 STUDY_SESS；NTESTUDYSI 在访客状态下也有，
     * 不能当登录信号（见 src/platforms/mooc/session.ts 的 cookie 分工表）。
     */
    wiring: {
      id: 'mooc',
      loginCookie: { name: 'STUDY_INFO', domain: 'icourse163.org' },
      requestRules: MOOC_REQUEST_RULES,
    },
  };
}

/*
 * 与平台同步：客户端装配、课程列表刷新、快照拉取。
 *
 * 从 entrypoints/background.ts 移出。三件事同属一层——都需要「一个已配好的
 * 客户端」，且都在处理「会话可能失效」这件事。主体原样搬运，只把闭包里的
 * client 改成参数，因此函数体一个字都没动。
 */

import { md5hex } from '@study-pilot/core';
import { COURSE_TYPE, createMoocClient, getCourses, type CourseSummary, type MoocClient } from '@study-pilot/platform-mooc';
import { getSettings, updateSettings } from '../../settings';
import { readToken, renewSession, SessionExpiredError } from '../../platform/mooc/session';
import { inspect, writeSnapshot, type InspectCourse, type Snapshot } from './read';
import { mergeCourses } from './course-selection';
import { whenNetRulesReady } from '../../background/net-rules';
import { MOOC_REQUEST_RULES } from './net-rules.ts';

export interface PlatformClient {
  client: MoocClient;
  renew: () => Promise<boolean>;
}

export function createPlatformClient(): PlatformClient {
/*
 * 平台以 Origin 判定来源，规则未生效时会回这句话。
 * 拿它当作「规则还没挂上网络栈」的信号。
 */
const ORIGIN_REJECTION = '非法跨域';

/**
 * 判断响应是不是「规则未生效」导致的回绝。
 *
 * 读的是克隆体，不消耗调用方的响应流。
 * 只在状态码可疑时才读正文，正常响应不付这个代价。
 */
async function looksLikeOriginRejection(res: Response): Promise<boolean> {
  if (res.status !== 403 && res.status !== 200) return false;
  try {
    const text = await res.clone().text();
    return text.includes(ORIGIN_REJECTION);
  } catch {
    return false;
  }
}

const client = createMoocClient({
  /*
   * 出站请求的第一步是确保改写 Origin 的规则已生效。
   *
   * whenNetRulesReady 只保证「规则已提交」，不保证「已挂上网络栈」——
   * updateDynamicRules 是异步提交的。规则还没生效时发出去的请求会带着
   * 扩展自身的 Origin，被平台回「非法跨域请求」。
   * 实测这表现为：装好后第一次读取失败，要手动打开一次 MOOC 页面，
   * 等 service worker 被唤醒、规则真正生效之后才正常。
   *
   * 因此这里再加一层：命中那个回绝就等一拍重发一次。
   * 重发时规则一定已生效，不必猜要等多久——第一次失败本身就是判据。
   */
  fetch: async (input, init) => {
    await whenNetRulesReady(MOOC_REQUEST_RULES);
    const first = await fetch(input, init);
    if (!(await looksLikeOriginRejection(first))) return first;

    await new Promise((resolve) => setTimeout(resolve, 400));
    return fetch(input, init);
  },
  getToken: readToken,
  md5: md5hex,
});

/**
 * 会话续期，供各读取路径在见到未登录形态后调用。
 *
 * 返回布尔而不是会话对象：调用点关心的只有「换到没有」，
 * 换到之后一律重新读数据，而不是拿旧对象接着用。
 */
const renew = async (): Promise<boolean> => (await renewSession()).renewed;


  return { client, renew };
}

/**
 * 从平台拉取课程列表并写回配置，保留用户已有的勾选状态。
 *
 * 返回失败原因而不是空数组——把错误吞掉会让前台只能显示一个笼统的失败，
 * 排查时无从下手。
 *
 * 不做任何「多久之内不重复请求」的判断。节流由调用方负责，
 * 而且调用方本来就有更准确的依据：
 *   自动任务走 runBatchIfDue，它按 lastRunDate 判断今天是否已跑过；
 *   主动打开弹窗或设置页则是用户当下想看最新状态，本来就该请求。
 * 在数据层再加一层日期缓存，只是把同一个判断做两遍，
 * 还会出现两处判断不一致的隐患。
 */
export async function refreshCourses(client: MoocClient): Promise<
  | { ok: true; courses: CourseSummary[]; byType: unknown }
  | { ok: false; message: string; byType?: unknown }
> {
  // 两类课程要分别请求再合并：只取一类会漏掉另一类
  const mooc = await getCourses(client, { courseType: COURSE_TYPE.MOOC });
  const spoc = await getCourses(client, { courseType: COURSE_TYPE.SPOC });

  // 逐类型的结果一并回传：出现「课程少了」时能立刻看出缺的是哪一类、
  // 是请求失败还是返回为空。
  const byType = {
    mooc: mooc.ok
      ? { ok: true, count: mooc.value.length, names: mooc.value.map((c) => c.name) }
      : { ok: false, message: `${mooc.error.kind} ${mooc.error.message}` },
    spoc: spoc.ok
      ? { ok: true, count: spoc.value.length, names: spoc.value.map((c) => c.name) }
      : { ok: false, message: `${spoc.error.kind} ${spoc.error.message}` },
  };

  if (!mooc.ok || !spoc.ok) {
    /*
     * 未登录形态必须**抛** SessionExpiredError，不能当返回值交回。
     *
     * withSessionRecovery 靠异常识别「会话死了」；返回值通道它只能读成
     * 正常完成——曾把 auth 失败放在 { ok:false, auth:true } 里交回，
     * 结果编排一次都没有续期，首次失败就报「未登录」，注释里写的
     * 「续期重读」是没发生的。两类课程任一是未登录形态即视为会话
     * 失效：死会话下两类必然都是这个形态；续期后重读再失败的会以
     * 普通失败上报。
     */
    const authLost =
      (!mooc.ok && mooc.error.kind === 'auth') || (!spoc.ok && spoc.error.kind === 'auth');
    if (authLost) throw new SessionExpiredError();

    const message = !mooc.ok ? `MOOC：${byType.mooc.message}` : `SPOC：${byType.spoc.message}`;
    return { ok: false, message, byType };
  }

  const courses = [...mooc.value, ...spoc.value];
  if (courses.length === 0) {
    return { ok: false, message: '两类课程都为空', byType };
  }

  /*
   * 合并时只沿用用户自己做过的勾选，新出现的课程一律不勾。
   * 规则与理由在 `src/background/course-selection.ts`。
   *
   * 写入只带 courses 一条路径，不整份回写。
   *
   * 这里曾经是「读配置 → 发两次网络请求 → 把几秒前读到的那份整体写回」。
   * 那几秒里用户可能刚在设置页拨了开关，或者别的入口改了配置，于是那些
   * 改动被这份旧数据抹掉——不报错，用户看到的是「设置自己变回去了」。
   * 现在合并基准是存储里的当前值（updateSettings），只动 courses。
   */
  const settings = await getSettings();

  await updateSettings({
    mooc: {
      background: {
        courses: mergeCourses(settings.mooc.background.courses, courses),
      },
    },
  });

  return { ok: true, courses, byType };
}

/**
 * 浏览器启动时判断是否该执行一轮。
 *
 * 启动瞬间后台线程仍在初始化，按配置延迟一小段时间再开始，
 * 避免与页面加载争抢网络与 CPU。
 *
 * 未登录时不跳过而是挂起：登录凭证是会话级 cookie，关浏览器即失效，
 * 而触发时机恰是启动那一刻，用户通常还没登录。挂起之后由 cookie 变化
 * 触发补执行，见下方 onChanged。
 */
/**
 * 拉取平台最新状态并落盘快照。
 *
 * 这是**唯一**更新快照的入口。自动执行与手动打开都走它，因此快照永远
 * 反映最近一次读取——不会出现「弹窗看到的是新数据、启动判断用的是旧数据」。
 *
 * 两个调用时机对它的要求不同，但都通过调用方决定「要不要调」来表达：
 *   自动执行   由 shouldRefresh 决定，可能整轮都不调
 *   手动打开   无条件调，用户明确表达了现在想看
 */
export async function loadSnapshot(
  client: MoocClient,
  courses: InspectCourse[],
  userId: number,
): Promise<Snapshot> {
  const snapshot = await inspect(client, courses, userId);
  await writeSnapshot(snapshot);
  return snapshot;
}
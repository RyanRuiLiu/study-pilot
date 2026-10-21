/*
 * 共享课列表：读取与合并。
 *
 * 接口形态（2026-10-16 抓包解密核对）：
 *   POST student/course/share/queryShareCourseInfo（首页族 module 13）
 *   载荷 {status: 0, pageNo, pageSize}；响应 result.courseOpenDtos[]
 *   每条给出 courseId / recruitId / courseName / schoolName / progress / secret——
 *   secret 是学习页入口参数（十六进制串），执行与读取都要它。
 *
 * 合并规则与慕课同一条：**只沿用用户做过的勾选，新出现的课程一律不勾**——
 * 刷新一下就把用户没同意过的课拖进任务范围，是错的。
 */

import type { ConfigPort, RunSelection, Settings, ZhihuishuCourse } from '@study-pilot/application';
import type { ZhsClient } from './client.ts';

/** 平台给出的课程事实（读取那一刻的样子）。 */
export interface ZhsCourseBrief {
  courseId: number;
  recruitId: number;
  /** 学习页入口参数（十六进制串） */
  secret: string;
  name: string;
  schoolName: string;
  /** 开课区间（平台的 courseStartTime/courseEndTime）。0 表示平台没给 */
  startTime: number;
  endTime: number;
}

/** 读一次共享课（进行中）。分页给足一页——课程列表按「门」算，几十门封顶。 */
export async function getShareCourses(client: ZhsClient): Promise<ZhsCourseBrief[]> {
  const body = (await client.call('shareCourses', { status: 0, pageNo: 1, pageSize: 50 })) as {
    result?: { courseOpenDtos?: Array<Record<string, unknown>> | null } | null;
  };
  /*
   * 没有这个列表就抛错，不交空表：空表的意思会被读成「这账号一门共享课都没选」，
   * 而它更可能是平台回了别的形状。课程列表是刷新流程的第一步，这里静默下来
   * 后面每一步都建立在「没有课」这个假事实之上（同一口径见 meet.ts）。
   */
  const list = body.result?.courseOpenDtos;
  if (!Array.isArray(list)) {
    throw new Error('共享课列表：响应里没有 courseOpenDtos 列表（平台回的形状与预期不符）');
  }
  return list
    .filter((entry) => typeof entry.courseId === 'number' && typeof entry.recruitId === 'number')
    .map((entry) => ({
      courseId: entry.courseId as number,
      recruitId: entry.recruitId as number,
      secret: typeof entry.secret === 'string' ? entry.secret : '',
      name: typeof entry.courseName === 'string' ? entry.courseName : '',
      schoolName: typeof entry.schoolName === 'string' ? entry.schoolName : '',
      startTime: typeof entry.courseStartTime === 'number' ? entry.courseStartTime : 0,
      endTime: typeof entry.courseEndTime === 'number' ? entry.courseEndTime : 0,
    }));
}

/**
 * 课程的 isApply（开课载荷用料）。
 *
 * 真实页面开课前读 queryCourse（nt() 里 `R = ge.data.isApply …`），值取
 * `data.isApply`；站点语义：**truthy 才用，否则回落字符串 `"1"`**
 * （study-DhL5V96B.js：`R = ge.data.isApply ? ge.data.isApply : "1"`）。
 * 金样本实况：`data.isApply = 1`（数字）。
 */
export async function readCourseIsApply(
  client: ZhsClient,
  recruitAndCourseId: string,
): Promise<number | string> {
  const body = (await client.call('queryCourse', { recruitAndCourseId })) as {
    data?: { isApply?: unknown } | null;
  };
  const value = body.data?.isApply;
  if ((typeof value === 'number' && value !== 0) || (typeof value === 'string' && value !== '')) {
    return value;
  }
  return '1';
}

/**
 * 把新读到的列表并进用户的选择：已勾的沿用勾选，新课程补进来但不勾。
 *
 * 字段以新读的为准（开课区间、学校名这些是平台随学期变的），
 * 用户只拥有一个字段：enabled。
 */
export function mergeCourses(
  /** 配置里现有的那份（勾选状态从这里沿用）——参数序与慕课的 mergeCourses 一致 */
  existing: ZhihuishuCourse[],
  /** 平台此刻返回的那份（字段以它为准） */
  fresh: ZhsCourseBrief[],
): ZhihuishuCourse[] {
  const enabledByCourse = new Map(existing.map((course) => [course.courseId, course.enabled]));
  return fresh.map((brief) => ({
    courseId: brief.courseId,
    recruitId: brief.recruitId,
    secret: brief.secret,
    name: brief.name,
    schoolName: brief.schoolName,
    startTime: brief.startTime,
    endTime: brief.endTime,
    // 见过的课程沿用勾选；新课程默认不勾
    enabled: enabledByCourse.get(brief.courseId) ?? false,
  }));
}

/**
 * 从平台拉一次课程列表并写回配置（与慕课的 `refreshCourses` 同一件事）。
 *
 * 两个载体（扩展的消息处理器、命令行的 courses 命令）共用这一份实现；
 * 失败原因分两类返回，调用方原样翻成自己的说法（界面是 reason 码，命令行是一句话）：
 *   fetch-failed —— 读平台失败（网络、会话过期等，message 带平台给的措辞）；
 *   no-courses   —— 读通了但平台没返回课程（此时**不写配置**：空列表会把
 *                   用户已勾的课清掉，且那不是「课程列表变了」而是「这次没读到」）。
 *
 * 合并规则在 {@link mergeCourses}：新读的平台事实覆盖旧值，勾选沿用用户做过的。
 * 和慕课的教训一致：合并基准是读回来的**当前**配置（先 read 再 update），
 * 不整份回写——中间的几秒里用户可能刚在别处改过勾选。
 */
export async function refreshCourses(
  client: ZhsClient,
  config: ConfigPort,
): Promise<
  | { ok: true; courses: ZhihuishuCourse[] }
  | { ok: false; reason: 'fetch-failed' | 'no-courses'; message: string }
> {
  let fresh: ZhsCourseBrief[];
  try {
    fresh = await getShareCourses(client);
  } catch (error) {
    return {
      ok: false,
      reason: 'fetch-failed',
      message: error instanceof Error ? error.message : String(error),
    };
  }
  if (fresh.length === 0) {
    return { ok: false, reason: 'no-courses', message: '平台没有返回任何课程' };
  }

  const settings = await config.read();
  const courses = mergeCourses(settings.zhihuishu.courses, fresh);
  await config.update({ zhihuishu: { courses } });
  return { ok: true, courses };
}

/**
 * 参与且勾选的课程；`scope.group` 按课程名收窄（与界面上的「只做这门课」同一语义）。
 *
 * 计划层用它决定读哪些课，外壳的读取（课件概览、待办）也用它——同一谓词只有这一份，
 * 不再各自 `courses.filter(c => c.enabled)`。
 */
export function selectedCourses(settings: Settings, scope?: RunSelection): ZhihuishuCourse[] {
  const enabled = settings.zhihuishu.courses.filter((course) => course.enabled);
  if (scope?.group === undefined) return enabled;
  return enabled.filter((course) => course.name === scope.group);
}

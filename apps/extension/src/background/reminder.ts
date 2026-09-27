/*
 * 桌面通知。
 *
 * 只负责「说什么」，不负责「取什么」——数据由调用方从刚确认过的计划
 * 与刚拿到的执行结果里传入。
 *
 * 两类通知，各自受一个开关控制：
 *   作业截止   临近截止且还没完成，催用户去处理
 *   自动完成   后台替用户做了事，告知一声
 *
 * 为什么只有两类
 * --------------
 * 曾经还报过第三类「将自动完成」——把扩展打算做的事列给用户看。
 * 那不是提醒，是自我说明：用户既不需要为它做什么，也不关心扩展的待办清单。
 * 一条通知里混进不需要回应的内容，真正要处理的那条就被稀释了。
 *
 * 「已过截止」不单设开关。它不是提醒而是告知，且与做没做无关——
 * 一条已经错过的事，关掉提醒也不会让它变得没发生过。
 */

import { OVERDUE_REASONS, derivePlan, type Plan } from './task-plan';
import type { Snapshot } from './snapshot';
import type { ExecResult } from './execute';
import type { Settings } from '../settings';

/** 通知标识。同名通知会覆盖上一条，避免堆积。 */
export const NOTIFICATION_ID = 'study-pilot-summary';

/** 示例通知用单独的标识，免得被工作总结覆盖掉。 */
export const SAMPLE_NOTIFICATION_ID = 'study-pilot-sample';

const DAY_MS = 24 * 60 * 60 * 1000;

/** 通知正文最多列出的条目数，超出部分折叠为计数。 */
const MAX_LISTED = 5;

/** 一条通知的标题与正文。 */
export interface Notice {
  title: string;
  message: string;
}

/** 距离截止还有几天，向上取整。 */
function daysLeft(deadline: number, now: number): number {
  return Math.max(0, Math.ceil((deadline - now) / DAY_MS));
}

/** 给执行结果配一个说法。 */
const KIND_LABEL: Record<ExecResult['kind'], string> = {
  quiz: '答题',
  review: '互评',
  self: '自评',
};

/** 通知相关的配置。从设置里取，便于调用方只传需要的那部分。 */
export interface NoticeSettings {
  deadlineEnabled: boolean;
  advanceDays: number;
  completionEnabled: boolean;
}

/** 从完整设置里抽出通知需要的几项。 */
export function noticeSettingsOf(settings: Settings): NoticeSettings {
  const background = settings.mooc.background;
  return {
    deadlineEnabled: background.deadlineReminder.enabled,
    advanceDays: background.deadlineReminder.advanceDays,
    completionEnabled: background.completionNotice.enabled,
  };
}

/**
 * 组织通知内容。
 *
 * 无事可说、或两类的开关都关着时返回 null，由调用方决定不打扰用户。
 *
 * results 是这一轮实际做完的事。它不能省——只按计划组织通知会出现
 * 「通知说打算做，而那件事已经完成」这种对不上的情况，
 * 因为计划是执行之前算的。
 */
export function composeNotice(
  plan: Plan,
  results: ExecResult[],
  settings: NoticeSettings,
  now: number = Date.now(),
): Notice | null {
  const lines: string[] = [];

  // ---------- 自动完成 ----------

  const done = results.filter((r) => r.status === 'done');
  const failed = results.filter((r) => r.status === 'failed');
  // skipped 是「时机变了，这次不用做」，不是问题，不报

  if (settings.completionEnabled) {
    for (const item of done.slice(0, MAX_LISTED)) {
      const label = item.detail ? `（${item.detail}）` : '';
      lines.push(`已完成${KIND_LABEL[item.kind]}：${item.name}${label}`);
    }
    const afterDone = Math.max(0, MAX_LISTED - lines.length);
    for (const item of failed.slice(0, afterDone)) {
      lines.push(`未完成：${item.name}（${item.detail}）`);
    }
  }

  // ---------- 作业截止 ----------

  const overdue = plan.manual.filter((item) => OVERDUE_REASONS.has(item.reason));

  if (settings.deadlineEnabled) {
    /*
     * 临近截止的才提醒。
     *
     * 「临近」由 advanceDays 定义：距截止不足这么多天。再远的事项列出来
     * 只是噪声——一周后到期的东西天天提醒一遍，用户很快就会不再看通知。
     */
    const soon = plan.manual.filter((item) => {
      if (OVERDUE_REASONS.has(item.reason)) return false;
      if (item.deadline === null) return false;
      return item.deadline - now <= settings.advanceDays * DAY_MS;
    });

    const remaining = Math.max(0, MAX_LISTED - lines.length);
    for (const item of soon.slice(0, remaining)) {
      const days = item.deadline !== null ? daysLeft(item.deadline, now) : null;
      const when = days !== null ? `，剩余 ${days} 天` : '';
      lines.push(`需要你处理：${item.course.courseName} · ${item.work.name}${when}`);
    }

    // 过期项跟着截止提醒走：它也是截止相关的信息
    const afterManual = Math.max(0, MAX_LISTED - lines.length);
    for (const item of overdue.slice(0, afterManual)) {
      lines.push(`已过截止：${item.course.courseName} · ${item.work.name}`);
    }
  }

  if (lines.length === 0) return null;

  /*
   * 超出的折叠成一行计数。
   *
   * 通知正文有长度上限，列不下时不能截断——那样用户不知道还有多少。
   * 计数要把两类都算进来：只数其中一类会得出偏小甚至负的数字。
   */
  const counted =
    (settings.completionEnabled ? done.length + failed.length : 0) +
    (settings.deadlineEnabled
      ? plan.manual.filter((item) => {
          if (OVERDUE_REASONS.has(item.reason)) return true;
          if (item.deadline === null) return false;
          return item.deadline - now <= settings.advanceDays * DAY_MS;
        }).length
      : 0);

  const rest = counted - lines.length;
  if (rest > 0) lines.push(`另有 ${rest} 项`);

  // ---------- 标题 ----------

  /*
   * 标题按最该被知道的那件事来说。
   *
   * 先说做成了什么，其次说要你去做什么，再次说漏了什么。
   * 一个笼统的总数说明不了任何事——「3 项」既可能是做完了三件，
   * 也可能是三件都没做。
   */
  const title =
    settings.completionEnabled && done.length > 0
      ? `Study Pilot：已自动完成 ${done.length} 项`
      : settings.completionEnabled && failed.length > 0
        ? `Study Pilot：${failed.length} 项未能完成`
        : lines.some((l) => l.startsWith('需要你处理'))
          ? 'Study Pilot：有作业临近截止'
          : 'Study Pilot：有作业已过截止';

  return { title, message: lines.join('\n') };
}

/** 发出通知。内容为空时不打扰用户，返回 false。 */
export async function notify(notice: Notice | null): Promise<boolean> {
  if (notice === null) return false;

  await browser.notifications.create(NOTIFICATION_ID, {
    type: 'basic',
    iconUrl: browser.runtime.getURL('/icon/128.png'),
    title: notice.title,
    message: notice.message,
  });
  return true;
}

/**
 * 发一条示例通知。
 *
 * 与「测试通知」不同：测试通知只验证系统能不能收到，内容是一句固定的话；
 * 这条要让人看到**自己会收到什么样子**——所以内容取自当前账号的真实待办，
 * 用的是与实际检查同一套措辞。
 *
 * 数据由调用方传入而不是在这里读取：这个模块要保持是纯的（只决定说什么），
 * 顶层一旦导入碰浏览器的模块，测试就没法加载它了。
 *
 * 不改动任何状态，也不写平台。
 */
export async function notifySample(
  snapshot: Snapshot | null,
  settings: Settings,
  now: number = Date.now(),
): Promise<boolean> {
  const noticeSettings = noticeSettingsOf(settings);

  /*
   * 用真实的待办派生计划，但把自动项清空——示例通知不该暗示
   * 「已经替你做了什么」，那是执行之后才成立的事。
   */
  const plan = snapshot
    ? { ...derivePlan(snapshot, settings, now), auto: [] }
    : { auto: [], manual: [] };

  const notice = composeNotice(plan, [], noticeSettings, now);

  await browser.notifications.create(SAMPLE_NOTIFICATION_ID, {
    type: 'basic',
    iconUrl: browser.runtime.getURL('/icon/128.png'),
    title: notice?.title ?? 'Study Pilot：示例通知',
    message:
      notice?.message ??
      '当前没有需要提醒的事项。\n有作业临近截止时，这里会列出课程与剩余天数。',
  });

  return notice !== null;
}


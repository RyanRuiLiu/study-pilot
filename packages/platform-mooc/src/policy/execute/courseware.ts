/*
 * 课件单元的自动项。
 *
 * 一条请求就够（见 platform-mooc 的 courseware/），失败只影响这一个单元。
 * 这里的 `done` 表示「已上报」而非「平台已记账」：视频、文档、文本、随堂测验
 * 立即记账，讨论是延迟记账，真实结果由下一轮快照确认。
 */

import { completeUnit, type CoursewareContext } from '../../courseware/index.ts';
import type { MoocClient } from '../../client.ts';
import type { CoursewareAutoAction } from '../plan';
import type { ExecResult } from './types.ts';

export async function runCourseware(
  client: MoocClient,
  action: CoursewareAutoAction,
  courseware: CoursewareContext,
): Promise<ExecResult> {
  const base = { tid: action.unit.unitId, name: action.unit.name, kind: action.kind } as const;

  const result = await completeUnit(client, action.unit, courseware);
  if (!result.ok) {
    return { ...base, status: 'failed', detail: `上报失败：${result.error.message}` };
  }
  return result.value === 'skipped'
    ? { ...base, status: 'skipped', detail: '平台没给这个单元的数据，无法上报' }
    : { ...base, status: 'done', detail: '已上报，平台记入学习进度' };
}

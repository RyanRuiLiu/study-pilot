/*
 * 看板的数据：把本地快照映射成中立模型的课程与任务。
 *
 * 看板自己不发请求（设计文档第 7 节），因此这里只读快照；数据有多旧由
 * `fetchedAt` 如实带回，界面负责说明。
 */

import type { Course, DashboardView, Task } from '../../domain/task';
import type { QueryOutcome } from '../../platform/messaging';
import { toCourse, toTasks } from '../../platforms/index';
import { readSnapshot } from '../mooc/snapshot';
import type { RouterDeps } from './router.ts';

export async function handleDashboard(_deps: RouterDeps): Promise<QueryOutcome<DashboardView>> {
  const snapshot = await readSnapshot();
  if (!snapshot) {
    // 还没读过平台数据：这不是失败，是「还没跑过」
    return { status: 'ok', value: { fetchedAt: 0, courses: [], tasks: [] } };
  }

  const courses: Course[] = [];
  const tasks: Task[] = [];

  for (const course of snapshot.courses) {
    courses.push(toCourse(course));
    tasks.push(...toTasks(course));
  }

  return { status: 'ok', value: { fetchedAt: snapshot.fetchedAt, courses, tasks } };
}

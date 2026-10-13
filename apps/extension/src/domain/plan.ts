/*
 * 计划语义：从中立任务算出「接下来该做什么」。
 *
 * 为什么放在 domain 而不是后台：它是**纯判断**——只看任务的 `mode` 与 `state`，
 * 不碰平台、不碰设置结构。后台的执行面、看板、以及将来别的消费者用同一份，
 * 才不会出现「看板说 3 项待办、执行面只做了 2 项」这类两套算法。
 *
 * 与执行的分工：这里只回答「哪些事该自动做、先后如何」；
 * 具体怎么发请求、用什么 id，属于各平台的 adapter 与执行面。
 */

import type { Task, TaskMode } from './task';

export interface PlanSummary {
  /** 后台能独立完成、目前还没完成的 */
  auto: number;
  /** 需要人确认一眼的（例如讨论留言） */
  assisted: number;
  /** 只能人工做的 */
  manual: number;
  /** 上一次尝试失败、需要人看的 */
  failed: number;
  done: number;
}

/** 计数：按「谁来做」与「做到哪了」两个维度分开数，不合成一个数字。 */
export function summarize(tasks: Task[]): PlanSummary {
  const summary: PlanSummary = { auto: 0, assisted: 0, manual: 0, failed: 0, done: 0 };

  for (const task of tasks) {
    if (task.state === 'done') {
      summary.done += 1;
      continue;
    }
    if (task.state === 'failed') {
      summary.failed += 1;
      continue;
    }
    if (task.mode === 'auto') summary.auto += 1;
    else if (task.mode === 'assisted') summary.assisted += 1;
    else summary.manual += 1;
  }

  return summary;
}

/*
 * 排序：越"离自动完成越近"的越靠前，其次按截止时间。
 *
 * 未完成的任务里，用户最该先看的是「后台马上能替你做掉的」，然后才是
 * 「要你确认一眼的」「只能你自己做的」。已完成的排到最后——它们还在列表里
 * 是为了对照，不是为了看。
 */
const MODE_ORDER: Record<TaskMode, number> = { auto: 0, assisted: 1, manual: 2 };

export function orderTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((left, right) => {
    const byState = Number(left.state === 'done') - Number(right.state === 'done');
    if (byState !== 0) return byState;

    const byMode = MODE_ORDER[left.mode] - MODE_ORDER[right.mode];
    if (byMode !== 0) return byMode;

    // 没有截止时间的排在后面：它们不急
    const leftDue = left.dueAt ?? Number.MAX_SAFE_INTEGER;
    const rightDue = right.dueAt ?? Number.MAX_SAFE_INTEGER;
    if (leftDue !== rightDue) return leftDue - rightDue;

    // 最后按 id 稳定排序，避免每次渲染顺序抖动
    return left.id.localeCompare(right.id);
  });
}

/** 后台这一轮可以独立完成的任务（`auto` 且未完成、未失败）。 */
export function autoTasks(tasks: Task[]): Task[] {
  return tasks.filter((task) => task.mode === 'auto' && task.state === 'todo');
}

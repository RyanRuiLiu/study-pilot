/*
 * 计划项的 id 构造（唯一一份）。
 *
 * 界面展示待办时要用同一份取名（`entry.itemIds`），点「执行」再原样发回来；
 * 课件行的「执行」也用它把范围收窄到**这一门课**（按名字会把同名学期一起做）。
 * 两处各写一份取名规则必然漂移，因此单独成文件，plan、read 与界面共用。
 *
 * 放在根目录而不是 policy/ 下：read 层的课件计数也要产出同一批 id，
 * 而 read 不能反过来依赖 policy（会形成文件级循环）。
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

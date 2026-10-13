/*
 * 落盘：把设置改动写回存储。
 *
 * 从 options/main.ts 按原有分节搬出。
 */

import { getSettings, updateSettings, type Settings } from '../../src/settings';
import { current, render, setCurrent, toast } from './state.ts';


// ---------- 落盘 ----------

/*
 * 设置页只提交「被改动的那一条路径」，从不整份写回。
 *
 * 原因是这里持有的只是一份内存快照，而配置还有别的写入方：后台任务读取
 * 课程列表时会改写 `courses`，启动检查也会。整份提交等于「谁后写谁赢」——
 * 用户拨开关时会把后台刚写入的课程列表覆盖回旧的，后台也会把用户刚拨的
 * 开关覆盖回旧的。两边都不报错，用户看到的是「设置自己变回去了」，
 * 尤其在浏览器刚启动、后台正在跑的时候。
 */

/**
 * 落盘队列。
 *
 * 串行执行：连着拨两个开关会产生两次写入，谁先落到存储取决于调度，
 * 而最终结果必须是最新那次。排队之后顺序与用户的操作顺序一致。
 */
let writing: Promise<void> = Promise.resolve();

/**
 * 提交一份只含改动字段的 patch。
 *
 * 合并基准是**存储里的当前值**（见 updateSettings），不是内存快照，
 * 因此即使设置页手里的数据已经过时，也不会把别的字段带回去。
 */
export function writePatch(patch: unknown): Promise<void> {
  writing = writing
    .then(() => updateSettings(patch))
    .then((next) => {
      setCurrent(next);
    })
    .catch(() => undefined);
  return writing;
}

/** 按路径就地改内存。界面靠它做即时反馈，落盘见 bindSetting。 */
export function setPath(target: unknown, path: string, value: unknown): void {
  const parts = path.split('.');
  let node = target as Record<string, unknown>;
  for (let i = 0; i < parts.length - 1; i++) node = node[parts[i]] as Record<string, unknown>;
  node[parts[parts.length - 1]] = value;
}

/** 把一条路径展开成 patch 对象。 */
export function patchAt(path: string, value: unknown): Record<string, unknown> {
  const parts = path.split('.');
  const root: Record<string, unknown> = {};
  let node = root;
  for (const key of parts.slice(0, -1)) {
    const child: Record<string, unknown> = {};
    node[key] = child;
    node = child;
  }
  node[parts[parts.length - 1]] = value;
  return root;
}

/**
 * 把一个设置项接到控件上。
 *
 * 表单没有保存按钮，改动即时落盘。类型参数由调用处的初始值推导，
 * 因此布尔、数字、文本控件共用同一个包装。
 */
export function bindSetting<T>(path: string): (value: T) => void {
  return (value: T) => {
    setPath(current, path, value);
    void writePatch(patchAt(path, value));
  };
}

/**
 * 更新某门课程的勾选。
 *
 * 基准取的是**存储里的那份**课程列表，而不是设置页内存里的：课程列表会被
 * 后台任务整份重写（读取课程、启动检查都会），内存里的可能已经过时。
 * 基于旧数据写回，会把后台刚读到的课程覆盖掉。
 */
export async function toggleCourse(termId: number, enabled: boolean): Promise<void> {
  const latest = await getSettings();
  const courses = latest.mooc.background.courses.map((course) =>
    course.termId === termId ? { ...course, enabled } : course,
  );
  await writePatch({ mooc: { background: { courses } } });
}
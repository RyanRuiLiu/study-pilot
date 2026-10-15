/*
 * 执行进度的**迁移规则**（纯函数）。
 *
 * 每一步该记什么在这里；这份进度**送到哪**由 `ProgressPort` 的实现决定
 * （扩展送进存储并推给已打开的页面，命令行打到标准输出）。
 *
 * 为什么按平台分卡：各平台的执行互不干扰（各自的会话、各自的节流器）。
 * 汇成一条总进度会说谎：A 平台跑完、B 平台才开始时，总进度会倒退。
 */

import type { PlatformRun, RunItem, RunItemStatus, RunState } from './model.ts';

/** 空进度。首次运行与「这个平台还没跑过」都用它。 */
export const EMPTY_PROGRESS: RunState = { platforms: [] };

/** 一个平台没跑过时的样子。 */
function idlePlatform(id: string, name: string): PlatformRun {
  return { id, name, state: 'idle', startedAt: null, total: 0, finished: 0, current: null, items: [] };
}

/** 把某个平台换成给定状态，其余平台保持原样。 */
function withPlatform(state: RunState, next: PlatformRun): RunState {
  const others = state.platforms.filter((platform) => platform.id !== next.id);
  return { ...state, platforms: [...others, next] };
}

function platformOf(state: RunState, platform: { id: string; name: string }): PlatformRun {
  return state.platforms.find((entry) => entry.id === platform.id) ?? idlePlatform(platform.id, platform.name);
}

/** 开始一个平台的一轮：总数先落定，界面立刻能显示「0 / 7」。 */
export function beginPlatform(
  state: RunState,
  platform: { id: string; name: string },
  total: number,
  now: number,
): RunState {
  return withPlatform(state, {
    id: platform.id,
    name: platform.name,
    state: 'running',
    startedAt: now,
    total,
    finished: 0,
    current: null,
    items: [],
  });
}

/** 当前项变了：先记上一条的终态，再写下正在做的这一条。 */
export function enterItem(
  state: RunState,
  platform: { id: string; name: string },
  item: { course: string; title: string; kind: string },
  now: number,
): RunState {
  const run = platformOf(state, platform);
  const settled = run.items.map((entry) =>
    entry.status === 'running' ? { ...entry, status: 'skipped' as const, detail: '未记录到结果' } : entry,
  );
  return withPlatform(state, {
    ...run,
    current: item.title,
    items: [
      ...settled,
      {
        platformId: platform.id,
        course: item.course,
        title: item.title,
        kind: item.kind,
        status: 'running',
        detail: '',
        at: now,
      },
    ],
  });
}

/** 一项做完：把那条 running 换成终态，并把计数加一。 */
export function completeItem(
  state: RunState,
  platform: { id: string; name: string },
  item: { course: string; title: string; kind: string },
  status: Exclude<RunItemStatus, 'running'>,
  detail: string,
  now: number,
): RunState {
  const run = platformOf(state, platform);
  const entry: RunItem = {
    platformId: platform.id,
    course: item.course,
    title: item.title,
    kind: item.kind,
    status,
    detail,
    at: now,
  };
  const withoutCurrent = run.items.filter(
    (existing) => existing.title !== item.title || existing.status !== 'running',
  );
  return withPlatform(state, { ...run, current: null, finished: run.finished + 1, items: [...withoutCurrent, entry] });
}

/** 一个平台跑完：换回空闲。本轮的逐项记录只在这一轮进行时存在，界面靠推送看它。 */
export function finishPlatform(state: RunState, platform: { id: string; name: string }): RunState {
  return withPlatform(state, idlePlatform(platform.id, platform.name));
}

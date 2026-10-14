/*
 * 执行进度的输出（命令行载体）。
 *
 * 迁移规则在 @study-pilot/application 的 progress.ts；这里只决定这份进度**送到哪**——
 * 命令行打到标准输出，逐行报「开始 / 某项结果 / 收尾」。
 *
 * 进程内留一份最新快照：用例是「读一份 → 迁移 → 写一份」的写法，每一步都要能读回当前状态。
 * 逐项只打印一次（按 平台|标题|状态|时刻 去重），因为 publish 收到的是整份快照，不是增量。
 */

import {
  EMPTY_PROGRESS,
  type PlatformRun,
  type ProgressPort,
  type RunItem,
  type RunState,
} from '@study-pilot/application';

const MARK: Record<RunItem['status'], string> = {
  running: '…',
  done: '✓',
  skipped: '–',
  failed: '✗',
};

function itemLine(platform: PlatformRun, item: RunItem): string {
  const detail = item.detail === '' ? '' : `：${item.detail}`;
  return `  ${MARK[item.status]} ${platform.name} · ${item.course} · ${item.title}${detail}`;
}

export function createStdoutProgress(): ProgressPort {
  let state: RunState = EMPTY_PROGRESS;
  const printed = new Set<string>();

  return {
    snapshot: async () => state,
    publish: async (next) => {
      for (const platform of next.platforms) {
        const before = state.platforms.find((entry) => entry.id === platform.id);

        if (platform.state === 'running' && before?.startedAt !== platform.startedAt) {
          console.log(`▶ ${platform.name}：本轮 ${platform.total} 项`);
        }
        for (const item of platform.items) {
          const key = `${platform.id}|${item.title}|${item.status}|${item.at}`;
          if (printed.has(key)) continue;
          printed.add(key);
          console.log(itemLine(platform, item));
        }
        if (platform.state === 'idle' && before?.state === 'running') {
          console.log(`■ ${platform.name}：本轮结束（共完成 ${before.finished} 项）`);
        }
      }
      state = next;
    },
  };
}

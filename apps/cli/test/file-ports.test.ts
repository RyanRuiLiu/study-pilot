/*
 * 命令行载体的两个文件端口：状态文件与进度输出。
 *
 * 只测载体自己的那两件事（落盘/读回、逐行打印）；「跑一轮」的行为在
 * packages/application/test/round.test.ts 里验，不在这里重复。
 */

import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  EMPTY_STATE,
  beginPlatform,
  completeItem,
  enterItem,
  finishPlatform,
  type RunState,
} from '@study-pilot/application';
import { createStdoutProgress } from '../src/progress.ts';
import { createFileTaskStore } from '../src/task-store.ts';

const dirs: string[] = [];

afterEach(() => {
  for (const dir of dirs) rmSync(dir, { recursive: true, force: true });
  dirs.length = 0;
  vi.restoreAllMocks();
});

function tempFile(): string {
  const dir = mkdtempSync(join(tmpdir(), 'study-pilot-cli-'));
  dirs.push(dir);
  return join(dir, 'state.json');
}

describe('状态文件', () => {
  it('文件不存在时给空状态', async () => {
    expect(await createFileTaskStore(tempFile()).read()).toEqual(EMPTY_STATE);
  });

  it('写进去再读回来是同一份', async () => {
    const file = tempFile();
    const store = createFileTaskStore(file);
    const state = {
      ...EMPTY_STATE,
      platforms: {
        mooc: {
          runningSince: 123,
          heartbeatAt: null,
          lastFinishedAt: null,
          failure: { message: '上一轮失败', action: null, at: 1 },
        },
      },
    };

    await store.write(state);

    expect(await store.read()).toEqual(state);
    expect(JSON.parse(readFileSync(file, 'utf8'))).toEqual(state);
  });

  it('旧版本文件按新形状读取：旧顶层字段不入内，缺的平台字段以空补齐', async () => {
    const file = tempFile();
    writeFileSync(file, JSON.stringify({ runningSince: 5, lastError: '上一代字段' }));

    expect(await createFileTaskStore(file).read()).toEqual(EMPTY_STATE);
  });
});

describe('进度输出', () => {
  it('开始、逐项、收尾各一行；同一份进度推两次不重复打印', async () => {
    const lines: string[] = [];
    vi.spyOn(console, 'log').mockImplementation((...args: unknown[]) => {
      lines.push(args.join(' '));
    });
    const progress = createStdoutProgress();
    const platform = { id: 'mooc', name: '中国大学 MOOC' };

    let state: RunState = { platforms: [] };
    state = beginPlatform(state, platform, 1, 1);
    await progress.publish(state);
    state = enterItem(state, platform, { course: '测试课程', title: '单元 A', kind: 'quiz' }, 2);
    await progress.publish(state);
    state = completeItem(state, platform, { course: '测试课程', title: '单元 A', kind: 'quiz' }, 'done', '已学完', 3);
    await progress.publish(state);
    await progress.publish(state);
    state = finishPlatform(state, platform);
    await progress.publish(state);

    expect(lines.some((line) => line.includes('▶') && line.includes('本轮 1 项'))).toBe(true);
    expect(lines.filter((line) => line.includes('单元 A') && line.includes('✓')).length).toBe(1);
    expect(lines.some((line) => line.includes('■') && line.includes('共完成 1 项'))).toBe(true);
  });
});

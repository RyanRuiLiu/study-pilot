/*
 * 命令行的进度输出（StdoutProgress）。
 *
 * 只测「怎么打印」；「一轮怎么跑」的行为在 packages/application/test/round.test.ts 里验。
 */

import { describe, expect, it, vi } from 'vitest';
import {
  beginPlatform,
  completeItem,
  enterItem,
  finishPlatform,
  type RunState,
} from '@study-pilot/application';
import { createStdoutProgress } from '../src/progress.ts';

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

  it('同名单元在两门课里同刻完成：两条都打印（去重键带课程）', async () => {
    const lines: string[] = [];
    vi.spyOn(console, 'log').mockImplementation((...args: unknown[]) => {
      lines.push(args.join(' '));
    });
    const progress = createStdoutProgress();
    const platform = { id: 'mooc', name: '中国大学 MOOC' };
    const item = { title: '第一章单元测试', kind: 'quiz' };

    let state: RunState = beginPlatform({ platforms: [] }, platform, 2, 1);
    await progress.publish(state);
    state = enterItem(state, platform, { ...item, course: '甲课' }, 2);
    await progress.publish(state);
    state = completeItem(state, platform, { ...item, course: '甲课' }, 'done', '已提交', 3);
    await progress.publish(state);
    state = enterItem(state, platform, { ...item, course: '乙课' }, 3);
    await progress.publish(state);
    state = completeItem(state, platform, { ...item, course: '乙课' }, 'done', '已提交', 3);
    await progress.publish(state);

    expect(lines.filter((line) => line.includes('第一章单元测试') && line.includes('✓'))).toHaveLength(2);
  });
});
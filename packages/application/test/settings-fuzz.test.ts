/*
 * 配置规范化的随机形状检查。
 *
 * 存储里可能躺着任何历史数据：旧版本、手改坏的、半写入的、字段类型全错的。
 * normalize 的契约是**永远不抛**，并且输出始终是可用的 Settings（身份键是
 * 有限数字、enabled 是布尔、评语与模型非空、tab 取值合法）。
 * 这里用固定种子的伪随机 JSON 形状跑一批，再验证幂等（规范化两次与一次相同）。
 */

import { describe, expect, it } from 'vitest';
import { SETTINGS_VERSION, normalize } from '../src/index.ts';
import { ACTIVE_TABS } from '../src/config/index.ts';

function rng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

const next = rng(20261021);

function value(depth: number): unknown {
  const roll = next();
  if (depth <= 0 || roll < 0.35) {
    const primitives: unknown[] = [null, true, false, 0, 1, -1, NaN, Infinity, '', 'x', '2027-01-20'];
    return primitives[Math.floor(next() * primitives.length)];
  }
  if (roll < 0.65) {
    return Array.from({ length: Math.floor(next() * 4) }, () => value(depth - 1));
  }
  const object: Record<string, unknown> = {};
  const keys = ['mooc', 'zhihuishu', 'ai', 'ui', 'courses', 'enabled', 'termId', 'courseId', 'recruitId', 'reviewComment', 'model', 'activeTab', 'version', 'odd'];
  for (let i = 0; i < Math.floor(next() * 4); i += 1) {
    object[keys[Math.floor(next() * keys.length)] as string] = value(depth - 1);
  }
  return object;
}

function checkShape(settings: ReturnType<typeof normalize>): void {
  expect(settings.version).toBe(SETTINGS_VERSION);
  expect(Array.isArray(settings.mooc.courses)).toBe(true);
  expect(Array.isArray(settings.zhihuishu.courses)).toBe(true);
  expect(settings.mooc.reviewComment.trim().length).toBeGreaterThan(0);
  expect(settings.ai.model.trim().length).toBeGreaterThan(0);
  expect(Array.from(ACTIVE_TABS as readonly string[])).toContain(settings.ui.activeTab);
  for (const course of settings.mooc.courses) {
    expect(Number.isFinite(course.termId)).toBe(true);
    expect(typeof course.enabled).toBe('boolean');
  }
  for (const course of settings.zhihuishu.courses) {
    expect(Number.isFinite(course.courseId)).toBe(true);
    expect(Number.isFinite(course.recruitId)).toBe(true);
    expect(typeof course.enabled).toBe('boolean');
  }
}

describe('normalize 的随机形状', () => {
  it('任意输入都不抛，输出满足 Settings 的硬约束', () => {
    for (let i = 0; i < 1000; i += 1) {
      const input = value(4);
      expect(() => normalize(input), JSON.stringify(input)).not.toThrow();
      checkShape(normalize(input));
    }
  });

  it('幂等：规范化两次与一次结果相同', () => {
    for (let i = 0; i < 300; i += 1) {
      const once = normalize(value(4));
      expect(normalize(once)).toEqual(once);
    }
  });
});

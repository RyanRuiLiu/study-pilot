/**
 * 结果类型测试。
 *
 * 这些函数本身很简单，但它们是全部业务分支的基础：
 * 调用方判断成功与失败的方式统一走这里，所以边界行为要钉死。
 */

import { describe, expect, it } from 'vitest';
import { err, ok, unwrap } from '../src/result.ts';

describe('ok / err', () => {
  it('ok 标记成功并携带值', () => {
    const result = ok(42);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe(42);
  });

  it('err 标记失败并携带错误', () => {
    const result = err({ kind: 'network' as const, message: '断网' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.kind).toBe('network');
  });

  it('可以携带 undefined 值而不与失败混淆', () => {
    const result = ok<void>(undefined);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBeUndefined();
  });
});

describe('unwrap', () => {
  it('成功时返回值', () => {
    expect(unwrap(ok('值'))).toBe('值');
  });

  it('失败时抛出，且错误信息里带上原因', () => {
    const result = err({ kind: 'api' as const, code: 40001, message: '未登录' });
    expect(() => unwrap(result)).toThrow(/40001|未登录/);
  });
});

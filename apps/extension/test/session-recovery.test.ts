/*
 * 会话失效后的恢复编排。
 *
 * 编排本身不碰网络：读取与续期都是注入的假函数。这里锁的是状态机——
 * 什么时候重读、什么时候引导去登录、什么时候只报普通失败。
 * 它曾被设计成「任何异常都报未登录」，那种把症状换成另一个错误答案的
 * 旧行为在这里逐条封死。
 */

import { describe, expect, it, vi } from 'vitest';
import { withSessionRecovery } from '../src/platforms/mooc/recovery.ts';
import { SessionExpiredError } from '../src/platforms/mooc/session';

describe('withSessionRecovery', () => {
  it('第一次就成功：不碰续期，原样返回', async () => {
    const renew = vi.fn(async () => true);
    const outcome = await withSessionRecovery(async () => 42, renew);
    expect(outcome).toEqual({ ok: true, value: 42 });
    expect(renew).not.toHaveBeenCalled();
  });

  it('会话失效且续期失败：报 login，引导用户去重新登录', async () => {
    const renew = vi.fn(async () => false);
    const outcome = await withSessionRecovery(
      async () => {
        throw new SessionExpiredError();
      },
      renew,
    );
    expect(outcome).toEqual({
      ok: false,
      kind: 'login',
      message: '登录已失效，且自动恢复没有成功',
    });
  });

  it('会话失效但续期成功：重读一次并把结果交回去', async () => {
    let calls = 0;
    const outcome = await withSessionRecovery(
      async () => {
        calls++;
        if (calls === 1) throw new SessionExpiredError();
        return '重读到的数据';
      },
      async () => true,
    );
    expect(outcome).toEqual({ ok: true, value: '重读到的数据' });
  });

  it('续期成功却仍是未登录形态：报普通失败，不引导重复登录', async () => {
    const outcome = await withSessionRecovery(
      async () => {
        throw new SessionExpiredError();
      },
      async () => true,
    );
    expect(outcome.ok).toBe(false);
    if (!outcome.ok) {
      expect(outcome.kind).toBe('error');
      // 提示说的是「数据读不到」，不是「请重新登录」
      expect(outcome.message).toContain('会话已恢复');
    }
  });

  it('续期成功后换成别的错误：如实上报那个错误', async () => {
    let calls = 0;
    const outcome = await withSessionRecovery(
      async () => {
        calls++;
        if (calls === 1) throw new SessionExpiredError();
        throw new Error('网络断了');
      },
      async () => true,
    );
    expect(outcome).toEqual({ ok: false, kind: 'error', message: '网络断了' });
  });

  it('普通失败不触发续期，直接如实上报', async () => {
    const renew = vi.fn(async () => true);
    const outcome = await withSessionRecovery(
      async () => {
        throw new Error('HTTP 502');
      },
      renew,
    );
    expect(outcome).toEqual({ ok: false, kind: 'error', message: 'HTTP 502' });
    expect(renew).not.toHaveBeenCalled();
  });
});
